( function( $ ) {

	$ = jQuery;
	var loadStatus = true;
	UAGBPostCarousel = {

		_setHeight: function( scope ) {
			
			var post_wrapper = scope.find(".slick-slide"),
				post_active = scope.find(".slick-slide.slick-active"),
				max_height = -1,
				wrapper_height = -1,
				post_active_height = -1;

			post_active.each( function( i ) {
				var this_height = $( this ).outerHeight(),
					blog_post = $( this ).find( ".uagb-post__inner-wrap" ),
					blog_post_height = blog_post.outerHeight();

				if( max_height < blog_post_height ) {
					max_height = blog_post_height
					post_active_height = max_height + 15
				}

				if ( wrapper_height < this_height ) {
					wrapper_height = this_height
				}
			})

			post_active.each( function( i ) {
				var selector = $( this ).find( ".uagb-post__inner-wrap" )
				selector.animate({ height: max_height }, { duration: 200, easing: "linear" })
			})

			scope.find(".slick-list").animate({ height: post_active_height }, { duration: 200, easing: "linear" })

			max_height = -1
			wrapper_height = -1

			post_wrapper.each(function() {

				var $this = jQuery( this ),
					selector = $this.find( ".uagb-post__inner-wrap" ),
					blog_post_height = selector.outerHeight()

				if ( $this.hasClass("slick-active") ) {
					return true
				}

				selector.css( "height", blog_post_height )
			})

		},
		_unSetHeight:function( scope ) {
			var post_wrapper = scope.find(".slick-slide"),
				post_active = scope.find(".slick-active")

			post_active.each( function( i ) {
				var selector = $( this ).find( ".uagb-post__inner-wrap" )
				selector.css( "height", "auto" )
			})

			post_wrapper.each(function() {
				var $this = jQuery( this ),
					selector = $this.find( ".uagb-post__inner-wrap" )
				if ( $this.hasClass("slick-active") ) {
					return true
				}
				selector.css( "height", "auto" )
			})

		},
	}
	UAGBPostMasonry = {
       
        _init : function( $attr, $selector ) {
            
            var count = 2;
            var windowHeight50 = jQuery( window ).outerHeight() / 1.25;
            var $scope = $( $selector );
            var loader = $scope.find( '.uagb-post-inf-loader' );

			$scope.find( '.is-masonry' ).isotope();

            if ( "scroll" === $attr.paginationEventType ) {

                $( window ).scroll( function () {
                    
                    if( ( $( window ).scrollTop() + windowHeight50 ) >= ( $scope.find( '.uagb-post__items:last' ).offset().top ) ) {
        
                        var $args = {
                            'page_number' : count
                        };
                        total = $scope.data( 'total' );
                        if( true == loadStatus ) {
                            
                            if ( count <= total ) {
                                loader.show();
                                UAGBPostMasonry._callAjax( $scope, $args, $attr, loader, false, count );
                                count++;
                                loadStatus = false;
                            }

                        }
                    }
                } );
            }
            if ( "button" === $attr.paginationEventType ) {
                $( document ).on( 'click', '.uagb-post-pagination-button', function( e ) {
					
					$scope = $( this ).closest( '.uagb-post-grid' );
					total = $scope.data( 'total' );
					var $args = {
						'total' : total,
                        'page_number' : count
                    };
					$scope.find('.uagb-post__load-more-wrap').hide();
                    if( true == loadStatus ) {
                        
                        if ( count <= total ) {
							loader.show();
                            UAGBPostMasonry._callAjax( $scope, $args, $attr, loader, true, count );
                            count++;
                            loadStatus = false;
                        }

                    }
                } );
            } 

        },
        _callAjax : function( $scope, $obj, $attr, loader, append = false, count ) {

            $.ajax({
                url: uagb_data.ajax_url,
                data: {
                    action: 'uagb_get_posts',
                    page_number : $obj.page_number,
                    attr : $attr,
                    nonce : uagb_data.uagb_masonry_ajax_nonce,
                },
                dataType: 'json',
                type: 'POST',
                success: function( data ) {
                    $scope.find( '.is-masonry' ).isotope( 'insert',$( data.data ));
                    loadStatus = true; 
					loader.hide();
					
					if ( true === append ) {
						$scope.find('.uagb-post__load-more-wrap').show();
					}

					if ( count == $obj.total ) {
						$scope.find('.uagb-post__load-more-wrap').hide();
					}
                }
            });
        }

    }

} )( jQuery )

// Set Carousel Height for Customiser.
function uagb_carousel_height(  id ) {
	var wrap            = jQuery("#block-"+id)
	var scope = wrap.find(".wp-block-uagb-post-carousel").find( ".is-carousel" )
	UAGBPostCarousel._setHeight( scope )
}

// Unset Carousel Height for Customiser.
function uagb_carousel_unset_height(  id ) {
	var wrap            = jQuery("#block-"+id)
	var scope = wrap.find(".wp-block-uagb-post-carousel").find( ".is-carousel" )
	UAGBPostCarousel._unSetHeight( scope )
}