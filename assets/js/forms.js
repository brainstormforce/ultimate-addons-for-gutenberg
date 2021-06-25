( function ( $ ) {
	UAGBForms = {
		init( attr, id ) {
			$scope = $( id );
			$form = $scope.find( '.uagb-forms-main-form' );

			$submitButtonWrap = $form.find(
				'.uagb-forms-main-submit-button-wrap'
			);
			$submitButton = $form.find( '.uagb-forms-main-submit-button' );

			$phoneinput = $form.find( '.uagb-forms-phone-input' );
			$phoneinput.on( 'keypress', function ( e ) {
				const charCode = e.which ? e.which : e.keyCode;
				if ( charCode == 45 ) {
					return true;
				}
				if ( charCode > 31 && ( charCode < 48 || charCode > 57 ) ) {
					return false;
				}
				return true;
			} );

			const toggleinput = $form.find( '.uagb-forms-toggle-input' );

			toggleinput.on( 'change', function ( e ) {
				if ( this.checked ) {
					$( this ).val( $( this ).attr( 'data-truestate' ) );
				} else {
					$( this ).val( $( this ).attr( 'data-falsestate' ) );
				}
			} );

			//validation for checkbox if required.
			const requiredCheckboxes = $(
				'.uagb-forms-checkbox-wrap :checkbox[required]'
			);
			requiredCheckboxes.on( 'change', function ( e ) {
				const checkboxGroup = requiredCheckboxes.filter(
					'[name="' + $( this ).attr( 'name' ) + '"]'
				);
				const isChecked = checkboxGroup.is( ':checked' );
				checkboxGroup.each( function () {
					this.setCustomValidity( '' ); //remove all custom validity messages
				} );
				checkboxGroup.prop( 'required', ! isChecked );
			} );
			requiredCheckboxes.trigger( 'change' );

			//append recaptcha js when enabled.
			if (
				attr.reCaptchaEnable == true &&
				attr.reCaptchaType == 'v2' &&
				attr.reCaptchaSiteKeyV2
			) {
				$( 'head' ).append(
					' <script src="https://www.google.com/recaptcha/api.js"></script>'
				);
			} else if (
				attr.reCaptchaEnable == true &&
				attr.reCaptchaType == 'v3' &&
				attr.reCaptchaSiteKeyV3
			) {
				if ( attr.hidereCaptchaBatch ) {
					if (
						document.getElementsByClassName(
							'grecaptcha-badge'
						)[ 0 ] === undefined
					) {
						return;
					}
					const badge = document.getElementsByClassName(
						'grecaptcha-badge'
					)[ 0 ];
					badge.style.visibility = 'hidden';
				}
				const api = document.createElement( 'script' );
				api.type = 'text/javascript';
				api.src =
					'https://www.google.com/recaptcha/api.js?render=' +
					attr.reCaptchaSiteKeyV3;
				$( 'head' ).append( api );
			}

			//Ready Classes.
			const formscope = document.getElementsByClassName(
				'uagb-block-' + attr.block_id
			);
			const formWrapper = formscope[ 0 ].children;
			const sibling = formWrapper[ 0 ].children;

			for ( let index = 0; index < sibling.length; index++ ) {
				if (
					sibling[ index ].classList.contains( 'uag-col-2' ) &&
					sibling[ index + 1 ].classList.contains( 'uag-col-2' )
				) {
					const div = document.createElement( 'div' );
					div.className = 'uag-col-2-wrap uag-col-wrap-' + index;
					sibling[ index + 1 ].after( div );
					const wrapper_div = formscope[ 0 ].getElementsByClassName(
						'uag-col-wrap-' + index
					);
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
				}

				if (
					sibling[ index ].classList.contains( 'uag-col-3' ) &&
					sibling[ index + 1 ].classList.contains( 'uag-col-3' ) &&
					sibling[ index + 2 ].classList.contains( 'uag-col-3' )
				) {
					const div = document.createElement( 'div' );
					div.className = 'uag-col-3-wrap uag-col-wrap-' + index;
					sibling[ index + 2 ].after( div );
					const wrapper_div = formscope[ 0 ].getElementsByClassName(
						'uag-col-wrap-' + index
					);
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
				}

				if (
					sibling[ index ].classList.contains( 'uag-col-4' ) &&
					sibling[ index + 1 ].classList.contains( 'uag-col-4' ) &&
					sibling[ index + 2 ].classList.contains( 'uag-col-4' ) &&
					sibling[ index + 3 ].classList.contains( 'uag-col-4' )
				) {
					const div = document.createElement( 'div' );
					div.className = 'uag-col-4-wrap uag-col-wrap-' + index;
					sibling[ index + 3 ].after( div );
					const wrapper_div = formscope[ 0 ].getElementsByClassName(
						'uag-col-wrap-' + index
					);
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
				}
			}

			$form.on( 'submit', function ( e ) {
				e.preventDefault();
				const $this = $( this );
				if (
					attr.reCaptchaEnable == true &&
					attr.reCaptchaType == 'v3' &&
					attr.reCaptchaSiteKeyV3
				) {
					grecaptcha.ready( function () {
						grecaptcha
							.execute( attr.reCaptchaSiteKeyV3, {
								action: 'submit',
							} )
							.then( function ( token ) {
								if ( token ) {
									document.getElementById(
										'g-recaptcha-response'
									).value = token;
									UAGBForms._formSubmit( e, $this, attr );
								}
							} );
					} );
				} else {
					UAGBForms._formSubmit( e, $this, attr );
				}
			} );
		},

		_formSubmit( e, $form, attr ) {
			e.preventDefault();

			let uagab_captcha_keys, captcha_response;
			if (
				attr.reCaptchaEnable == true &&
				attr.reCaptchaType == 'v2' &&
				attr.reCaptchaSiteKeyV2
			) {
				captcha_response = $form[ 0 ].getElementsByClassName(
					'uagb-forms-recaptcha'
				)[ 0 ].value;
				if ( ! captcha_response ) {
					$( '.uagb-form-reacaptcha-error-' + attr.block_id ).html(
						'<p style="color:red !important" class="error-captcha">' +
							attr.captchaMessage +
							'</p>'
					);
					return false;
				}
				$( '.uagb-form-reacaptcha-error-' + attr.block_id ).html( '' );
				uagab_captcha_keys = {
					secret: attr.reCaptchaSecretKeyV2,
					sitekey: attr.reCaptchaSiteKeyV2,
				};
			}
			if (
				attr.reCaptchaEnable == true &&
				attr.reCaptchaType == 'v3' &&
				attr.reCaptchaSiteKeyV3
			) {
				uagab_captcha_keys = {
					secret: attr.reCaptchaSecretKeyV3,
					sitekey: attr.reCaptchaSiteKeyV3,
				};
				captcha_response = document.getElementById(
					'g-recaptcha-response'
				).value;
			}

			const originalSerialized = $( $form ).serializeArray();
			const postData = {};
			for ( let i = 0; i < originalSerialized.length; i++ ) {
				const inputname = originalSerialized[ i ].name;
				if ( originalSerialized[ i ].name.endsWith( '[]' ) ) {
					//For checkbox element
					var name = originalSerialized[ i ].name;
					name = name.substring( 0, name.length - 2 );
					if ( ! ( name in postData ) ) {
						postData[ name ] = [];
					}
					postData[ name ].push( originalSerialized[ i ].value );
				} else if ( originalSerialized[ i ].value.startsWith( '+' ) ) {
					//For phone element.

					var name = originalSerialized[ i ].name;
					name = name.substring( 0, name.length - 2 );
					if ( ! ( name in postData ) ) {
						postData[ name ] = [];
					}
					postData[ $( '#' + name ).html() ].push(
						originalSerialized[ i ].value
					);
				} else {
					postData[ $( '#' + inputname ).html() ] =
						originalSerialized[ i ].value;
				}
			}

			const after_submit_data = {
				to: attr.afterSubmitToEmail,
				cc: attr.afterSubmitCcEmail,
				bcc: attr.afterSubmitBccEmail,
				subject: attr.afterSubmitEmailSubject,
			};

			//add spiner to form button to show processing.
			$( '<span class="components-spinner"></span>' ).appendTo(
				$form.find( '.uagb-forms-main-submit-button-wrap' )
			);

			$.ajax( {
				type: 'POST',
				url: uagb_forms_data.ajax_url,
				data: {
					action: 'uagb_process_forms',
					nonce: uagb_forms_data.uagb_forms_ajax_nonce,
					form_data: postData,
					sendAfterSubmitEmail: attr.sendAfterSubmitEmail,
					after_submit_data,
					uagab_captcha_keys,
					captcha_response,
				},

				success( response ) {
					if ( 200 === response.data ) {
						if ( 'message' === attr.confirmationType ) {
							$(
								'[name="uagb-form-' + attr.block_id + '"]'
							).hide();
							$( '.uagb-forms-success-message-' + attr.block_id )
								.removeClass( 'uagb-forms-submit-message-hide' )
								.addClass( 'uagb-forms-success-message' );
						}

						if ( 'url' === attr.confirmationType ) {
							window.location.replace( attr.confirmationUrl );
						}
					} else if ( 400 === response.data ) {
						if ( 'message' === attr.confirmationType ) {
							$(
								'[name="uagb-form-' + attr.block_id + '"]'
							).hide();
							$( '.uagb-forms-failed-message-' + attr.block_id )
								.removeClass( 'uagb-forms-submit-message-hide' )
								.addClass( 'uagb-forms-failed-message' );
						}
					}
				},
			} );
		},
	};
} )( jQuery );
