( function( $ ) {

	UAGBInlineNotice = {

		_run: function( attr, id ) {

			if ( $( id ).length === 0 ) {
				return;
			}

			var unique_id = attr['c_id'];
			var is_cookie = attr['cookies'];
			var cookies_days = attr['close_cookie_days'];
			var current_cookie = Cookies.get( 'uagb-notice-' + unique_id );

			if( 'undefined' === typeof current_cookie && true === is_cookie ){
				$( id ).show()
			}

			if ( attr['noticeDismiss'] !== '' ) {
				$( id + " .uagb-notice-dismiss" ).click( function() {
					if ( true === is_cookie && 'undefined' !== typeof current_cookie) {
						current_cookies = Cookies.set( 'uagb-notice-' + unique_id, true, { expires: cookies_days } );
					$( id ).addClass("uagb-notice__active").css('display' ,'none')
					}

					if( 'undefined' === typeof current_cookie && true === is_cookie ){
						current_cookies = Cookies.set( 'uagb-notice-' + unique_id, true, { expires: cookies_days } );
						$( id ).addClass("uagb-notice__active").css('display' ,'none')
					}

					if( false === is_cookie ){
						$( id ).addClass("uagb-notice__active").css('display' ,'none')
					}
				});
			}
		}
	}

} )( jQuery );