/**
 * Customizer controls toggles
 *
 * @package Astra
 */

( function( $ ) {

	/**
	 * Helper class for the main Customizer interface.
	 *
	 * @since 1.0.0
	 * @class ASTCustomizer
	 */
	AstraNotices = {

		/**
		 * Initializes our custom logic for the Customizer.
		 *
		 * @since 1.0.0
		 * @function init
		 */
		init()
		{
			this._bind();
		},

		/**
		 * Binds events for the Astra Portfolio.
		 *
		 * @since 1.0.0
		 * @access private
		 * @function _bind
		 */
		_bind()
		{
			$( document ).on( "click", ".astra-notice-close", AstraNotices._dismissNoticeNew );
			$( document ).on( "click", ".astra-notice .notice-dismiss", AstraNotices._dismissNotice );
		},

		_dismissNotice( event ) {
			event.preventDefault();

			const repeat_notice_after = $( this ).parents( ".astra-notice" ).data( "repeat-notice-after" ) || "";
			const notice_id = $( this ).parents( ".astra-notice" ).attr( "id" ) || "";

			AstraNotices._ajax( notice_id, repeat_notice_after );
		},

		_dismissNoticeNew( event ) {
			event.preventDefault();

			const repeat_notice_after = $( this ).attr( "data-repeat-notice-after" ) || "";
			const notice_id = $( this ).parents( ".astra-notice" ).attr( "id" ) || "";

			const $el = $( this ).parents( ".astra-notice" );
			$el.fadeTo( 100, 0, function() {
				$el.slideUp( 100, function() {
					$el.remove();
				} );
			} );

			AstraNotices._ajax( notice_id, repeat_notice_after );

			const link   = $( this ).attr( "href" ) || "";
			const target = $( this ).attr( "target" ) || "";
			if ( "" !== link && "_blank" === target ) {
				window.open( link , "_blank" );
			}
		},

		_ajax( notice_id, repeat_notice_after ) {
			
			if ( "" === notice_id ) {
				return;
			}

			$.ajax( {
				url: ajaxurl,
				type: "POST",
				data: {
					action            : "astra-notice-dismiss",
					notice_id,
					repeat_notice_after : parseInt( repeat_notice_after ),
					nonce             : astraNotices._notice_nonce
				},
			} );

		}
	};

	$( function() {
		AstraNotices.init();
	} );
} )( jQuery );
