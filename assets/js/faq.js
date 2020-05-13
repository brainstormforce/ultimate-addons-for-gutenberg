( function( $ ) {

	UAGBFaq = {

		init: function() {

			$(".uagb-faq__wrap").find('.uagb-faq-child__outer-wrap:first-child').find('.uagb-faq-item').addClass('uagb-faq-item-active');

			$( document ).delegate( ".uagb-faq-questions-button", "click", UAGBFaq.faqButtonClick )
		},
		/**
		 * Smooth Scroll.
		 */
		faqButtonClick: function( e ) {

            var faqItem = $( this ).parent();
            
            if ( faqItem.hasClass('uagb-faq-item-active') ) {

                faqItem.removeClass('uagb-faq-item-active');
                faqItem.find('.uagb-content').slideUp( 'normal');
            } else {

                faqItem.addClass('uagb-faq-item-active');
                faqItem.find('.uagb-content').slideDown( 'normal');
            }
		},
	}

	$( document ).ready(function() {
		UAGBFaq.init()
	})


} )( jQuery )
