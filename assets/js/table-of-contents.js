( function ( $ ) {
	let scroll = true;
	let scroll_offset = 30;
	let scroll_delay = 800;
	let scroll_to_top = false;
	let scroll_element = null;

	const parseTocSlug = function ( slug ) {
		// If not have the element then return false!
		if ( ! slug ) {
			return slug;
		}

		const parsedSlug = slug
			.toString()
			.toLowerCase()
			.replace( /\…+/g, '' ) // Remove multiple …
			.replace( /\u2013|\u2014/g, '' ) // Remove long dash
			.replace( /&(amp;)/g, '' ) // Remove &
			.replace( /[&]nbsp[;]/gi, '-' ) // Replace inseccable spaces
			.replace( /[^a-z0-9 -_]/gi, '' ) // Keep only alphnumeric, space, -, _
			.replace( /&(mdash;)/g, '' ) // Remove long dash
			.replace( /\s+/g, '-' ) // Replace spaces with -
			.replace( /[&\/\\#,^!+()$~%.\[\]'":*?;-_<>{}@‘’”“|]/g, '' ) // Remove special chars
			.replace( /\-\-+/g, '-' ) // Replace multiple - with single -
			.replace( /^-+/, '' ) // Trim - from start of text
			.replace( /-+$/, '' ); // Trim - from end of text

		return decodeURI( encodeURIComponent( parsedSlug ) );
	};

	UAGBTableOfContents = {
		init() {
			$( document ).on(
				'click',
				'.uagb-toc__list a',
				UAGBTableOfContents._scroll
			);
			$( document ).on(
				'click',
				'.uagb-toc__scroll-top',
				UAGBTableOfContents._scrollTop
			);
			$( document ).on(
				'click',
				'.uagb-toc__title-wrap',
				UAGBTableOfContents._toggleCollapse
			);
			$( document ).on( 'scroll', UAGBTableOfContents._showHideScroll );
		},

		_toggleCollapse( e ) {
			if ( $( this ).find( '.uag-toc__collapsible-wrap' ).length > 0 ) {
				const $root = $( this ).closest(
					'.wp-block-uagb-table-of-contents'
				);

				if ( $root.hasClass( 'uagb-toc__collapse' ) ) {
					$root.removeClass( 'uagb-toc__collapse' );
				} else {
					$root.addClass( 'uagb-toc__collapse' );
				}
			}
		},

		_showHideScroll( e ) {
			if ( null != scroll_element ) {
				if ( jQuery( window ).scrollTop() > 300 ) {
					if ( scroll_to_top ) {
						scroll_element.addClass( 'uagb-toc__show-scroll' );
					} else {
						scroll_element.removeClass( 'uagb-toc__show-scroll' );
					}
				} else {
					scroll_element.removeClass( 'uagb-toc__show-scroll' );
				}
			}
		},

		/**
		 * Smooth To Top.
		 *
		 * @param e
		 */
		_scrollTop( e ) {
			$( 'html, body' ).animate(
				{
					scrollTop: 0,
				},
				800
			);
		},

		/**
		 * Smooth Scroll.
		 *
		 * @param e
		 */
		_scroll( e ) {
			if ( this.hash !== '' ) {
				const hash = this.hash;
				const node = $( this ).closest(
					'.wp-block-uagb-table-of-contents'
				);

				scroll = node.data( 'scroll' );
				scroll_offset = node.data( 'offset' );
				scroll_delay = node.data( 'delay' );

				if ( scroll ) {
					const offset = $( decodeURIComponent( hash ) ).offset();

					if ( 'undefined' !== typeof offset ) {
						$( 'html, body' ).animate(
							{
								scrollTop: offset.top - scroll_offset,
							},
							scroll_delay
						);
					}
				}
			}
		},

		/**
		 * Alter the_content.
		 *
		 * @param attr
		 * @param id
		 */
		_run( attr, id ) {
			const $this_scope = $( id );

			if ( $this_scope.find( '.uag-toc__collapsible-wrap' ).length > 0 ) {
				$this_scope
					.find( '.uagb-toc__title-wrap' )
					.addClass( 'uagb-toc__is-collapsible' );
			}

			const allowed_h_tags = [];
			let headerMappingHeaders = [];
			if ( undefined !== attr.mappingHeaders ) {
				attr.mappingHeaders.forEach( function ( h_tag, index ) {
					h_tag === true
						? allowed_h_tags.push( 'h' + ( index + 1 ) )
						: null;
				} );
				var allowed_h_tags_str =
					null !== allowed_h_tags ? allowed_h_tags.join( ',' ) : '';

				headerMappingHeaders = attr.mappingHeaders.filter(
					( header ) => header
				).length;
			}

			const all_header =
				undefined !== allowed_h_tags_str && '' !== allowed_h_tags_str
					? $( 'body' ).find( allowed_h_tags_str )
					: $( 'body' ).find( 'h1, h2, h3, h4, h5, h6' );

			if ( 0 !== all_header.length ) {
				const toc_list_wrap = $( '.uagb-toc__list-wrap' );

				all_header.each( function ( index, value ) {
					const header = $( this );
					let header_text = parseTocSlug( header.text() );

					if ( header_text.length < 1 ) {
						const list_heading = toc_list_wrap.find(
							'a:contains("' + header.text() + '")'
						);

						if ( list_heading.length > 0 ) {
							header_text = list_heading
								.attr( 'href' )
								.replace( /#/g, '' );
						}
					}

					header.before(
						'<span id="' +
							header_text +
							'" class="uag-toc__heading-anchor"></span>'
					);
				} );
			}

			scroll_to_top = attr.scrollToTop;

			const scrollToTopSvg =
				'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="26px" height="16.043px" viewBox="57 35.171 26 16.043" enable-background="new 57 35.171 26 16.043" xml:space="preserve"><path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z"/></svg>';

			scroll_element = $( '.uagb-toc__scroll-top' );
			if ( 0 == scroll_element.length ) {
				$( 'body' ).append(
					'<div class="uagb-toc__scroll-top"> ' +
						scrollToTopSvg +
						'</div>'
				);
				scroll_element = $( '.uagb-toc__scroll-top' );
			}

			if ( scroll_to_top ) {
				scroll_element.addClass( 'uagb-toc__show-scroll' );
			} else {
				scroll_element.removeClass( 'uagb-toc__show-scroll' );
			}

			UAGBTableOfContents._showHideScroll();
		},
	};

	$( document ).ready( function () {
		UAGBTableOfContents.init();
	} );
} )( jQuery );
