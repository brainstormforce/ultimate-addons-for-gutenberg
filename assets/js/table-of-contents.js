( function( $ ) {

	var scroll = true
	var scroll_offset = 30
	var scroll_delay = 800
	var scroll_to_top = false
	var scroll_element = null

	var parseTocSlug = function( slug ) {

		// If not have the element then return false!
		if( ! slug ) {
			return slug;
		}

		var parsedSlug = slug.toString().toLowerCase()
			.replace(/\…+/g,'')                             // Remove multiple …
			.replace(/&(amp;)/g, '')					 	// Remove &
			.replace(/&(mdash;)/g, '')					 	// Remove long dash
			.replace(/\u2013|\u2014/g, '')				 	// Remove long dash
			.replace(/[&]nbsp[;]/gi, '-')                	// Replace inseccable spaces
			.replace(/\s+/g, '-')                        	// Replace spaces with -
			.replace(/[&\/\\#,^!+()$~%.\[\]'":*?<>{}@‘’”“|]/g, '')  // Remove special chars
			.replace(/\-\-+/g, '-')                      	// Replace multiple - with single -
			.replace(/^-+/, '')                          	// Trim - from start of text
			.replace(/-+$/, '');                         	// Trim - from end of text

		return decodeURI( encodeURIComponent( parsedSlug ) );
	};


	UAGBTableOfContents = {

		init: function() {

			$( document ).delegate( ".uagb-toc__list a", "click", UAGBTableOfContents._scroll )
			$( document ).delegate( ".uagb-toc__scroll-top", "click", UAGBTableOfContents._scrollTop )
			$( document ).delegate( '.uagb-toc__title-wrap', 'click', UAGBTableOfContents._toggleCollapse )
			$( document ).on( "scroll", UAGBTableOfContents._showHideScroll  )

		},

		_toggleCollapse: function( e ) {
			if ( $( this ).find( '.uag-toc__collapsible-wrap' ).length > 0 ) {
				let $root = $( this ).closest( '.wp-block-uagb-table-of-contents' )

				if ( $root.hasClass( 'uagb-toc__collapse' ) ) {
					$root.removeClass( 'uagb-toc__collapse' );
				} else {
					$root.addClass( 'uagb-toc__collapse' );
				}
			}
		},

		_showHideScroll: function( e ) {

			if ( null != scroll_element ) {

				if ( jQuery( window ).scrollTop() > 300 ) {
					if ( scroll_to_top ) {
						scroll_element.addClass( "uagb-toc__show-scroll" )
					} else {
						scroll_element.removeClass( "uagb-toc__show-scroll" )
					}
				} else {
					scroll_element.removeClass( "uagb-toc__show-scroll" )
				}
			}
		},

		/**
		 * Smooth To Top.
		 */
		_scrollTop: function( e ) {

			$( "html, body" ).animate( {
				scrollTop: 0
			}, scroll_delay )
		},

		/**
		 * Smooth Scroll.
		 */
		_scroll: function( e ) {

			if ( this.hash !== "" ) {

				var hash = this.hash
				var node = $( this ). closest( '.wp-block-uagb-table-of-contents' )

				scroll = node.data( 'scroll' )
				scroll_offset = node.data( 'offset' )
				scroll_delay = node.data( 'delay' )

				if ( scroll ) {

					var offset = $( decodeURIComponent( hash ) ).offset()

					if ( "undefined" != typeof offset ) {

						$( "html, body" ).animate( {
							scrollTop: ( offset.top - scroll_offset )
						}, scroll_delay )
					}
				}

			}
		},

		/**
		 * Alter the_content.
		 */
		_run: function( attr, id ) {

			var $this_scope = $( id );

			if ( $this_scope.find( '.uag-toc__collapsible-wrap' ).length > 0 ) {
				$this_scope.find( '.uagb-toc__title-wrap' ).addClass( 'uagb-toc__is-collapsible' );
			}

			var $headers = JSON.parse(attr.headerLinks);
			
			var allowed_h_tags = [];
			
			if ( undefined !== attr.mappingHeaders ) {

				attr.mappingHeaders.forEach(function(h_tag, index) { (h_tag === true ? allowed_h_tags.push('h' + (index+1)) : null);});
				var allowed_h_tags_str = ( null !== allowed_h_tags ) ? allowed_h_tags.join( ',' ) : '';
			}

			var all_header = ( undefined !== allowed_h_tags_str && '' !== allowed_h_tags_str ) ? $( 'body' ).find( allowed_h_tags_str ) : $( 'body' ).find('h1, h2, h3, h4, h5, h6' );

			if ( undefined !== $headers && 0 !== all_header.length ) {

				$headers.forEach(function (element, i) {
					
					let element_text = parseTocSlug(element.text);
					all_header.each( function (){

						let header = $( this );
						let header_text = parseTocSlug(header.text());

						if ( element_text.localeCompare(header_text) === 0 ) {
							header.before('<span id="' + header_text + '" class="uag-toc__heading-anchor"></span>');
						}
					});
				});
			}

			scroll_to_top = attr.scrollToTop

			scroll_element = $( ".uagb-toc__scroll-top" )
			if ( 0 == scroll_element.length ) {
				$( "body" ).append( "<div class=\"uagb-toc__scroll-top dashicons dashicons-arrow-up-alt2\"></div>" )
				scroll_element = $( ".uagb-toc__scroll-top" )
			}

			if ( scroll_to_top ) {
				scroll_element.addClass( "uagb-toc__show-scroll" )
			} else {
				scroll_element.removeClass( "uagb-toc__show-scroll" )
			}

			UAGBTableOfContents._showHideScroll()
		},
	}

	$( document ).ready(function() {
		UAGBTableOfContents.init()
	})


} )( jQuery )
