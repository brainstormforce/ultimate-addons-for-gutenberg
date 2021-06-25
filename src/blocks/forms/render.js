import classnames from 'classnames';
import React, { useCallback, useLayoutEffect } from 'react';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

const ALLOWED_BLOCKS = [
	'uagb/forms-name',
	'uagb/forms-email',
	'uagb/forms-hidden',
	'uagb/forms-phone',
	'uagb/forms-textarea',
	'uagb/forms-url',
	'uagb/forms-select',
	'uagb/forms-radio',
	'uagb/forms-checkbox',
	'uagb/forms-toggle',
	'uagb/forms-date',
	'uagb/forms-accept',
];

import { InnerBlocks, RichText } from '@wordpress/block-editor';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const { attributes, setAttributes } = props;
	const {
		block_id,
		submitButtonText,
		formLabel,
		buttonSize,
		reCaptchaEnable,
		reCaptchaType,
		reCaptchaSecretKeyV2,
		reCaptchaSiteKeyV2,
	} = attributes;

	const onSubmitClick = useCallback( ( e ) => {
		e.preventDefault();
	} );

	const renderButtonHtml = () => {
		return (
			<button
				onClick={ onSubmitClick }
				className="uagb-forms-main-submit-button"
			>
				<RichText
					tagName="div"
					placeholder={ __(
						'Submit',
						'ultimate-addons-for-gutenberg'
					) }
					value={ submitButtonText }
					onChange={ ( value ) =>
						setAttributes( {
							submitButtonText: value,
						} )
					}
					className="uagb-forms-main-submit-button-text"
					multiline={ false }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/strikethrough',
					] }
				/>
			</button>
		);
	};

	return (
		<>
			<div
				className={ classnames(
					'uagb-forms__outer-wrap',
					`uagb-block-${ block_id }`,
					`uagb-forms__${ buttonSize }-btn`
				) }
			>
				<form
					className="uagb-forms-main-form"
					name={ `uagb-form-${ block_id }` }
				>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
					<div className="uagb-forms-form-hidden-data">
						{ reCaptchaEnable && (
							<input
								type="hidden"
								id="g-recaptcha-response"
								className="uagb-forms-recaptcha"
							/>
						) }
						<input
							type="hidden"
							name="uagb_forms_form_label"
							value={ formLabel }
						/>
						<input
							type="hidden"
							name="uagb_forms_form_id"
							value={ `uagb-form-${ block_id }` }
						/>
					</div>

					{ reCaptchaEnable &&
						'v2' === reCaptchaType &&
						reCaptchaSiteKeyV2 &&
						reCaptchaSecretKeyV2 && (
							<>
								<div
									className="g-recaptcha uagb-forms-field-set"
									data-sitekey={ reCaptchaSiteKeyV2 }
								></div>
								<div
									className={ `uagb-form-reacaptcha-error-${ block_id }` }
								></div>
							</>
						) }

					<div className="uagb-forms-main-submit-button-wrap">
						{ renderButtonHtml() }
					</div>
				</form>
			</div>
		</>
	);
};

export default React.memo( Render );
