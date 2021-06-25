import React from 'react';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	ToggleControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const {
		acceptRequired,
		acceptText,
		showLink,
		linkLabel,
		link,
		linkInNewTab,
	} = attributes;

	const acceptInspectorControls = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<ToggleControl
					label={ __( 'Required', 'ultimate-addons-for-gutenberg' ) }
					checked={ acceptRequired }
					onChange={ () =>
						setAttributes( { acceptRequired: ! acceptRequired } )
					}
				/>
				<TextareaControl
					label={ __(
						'Acceptance Text',
						'ultimate-addons-for-gutenberg'
					) }
					help="Label to display as acceptance message."
					value={ acceptText }
					onChange={ ( value ) =>
						setAttributes( { acceptText: value } )
					}
				/>
				<ToggleControl
					label={ __(
						'Enable Privacy Link',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showLink }
					onChange={ () => setAttributes( { showLink: ! showLink } ) }
				/>

				{ showLink && (
					<>
						<hr className="uagb-editor__separator" />
						<TextControl
							label={ __(
								'Link Label',
								'ultimate-addons-for-gutenberg'
							) }
							value={ linkLabel }
							onChange={ ( value ) =>
								setAttributes( { linkLabel: value } )
							}
						/>
						<TextControl
							className="uagb-forms-editor-privacy-link"
							label={ __(
								'Link',
								'ultimate-addons-for-gutenberg'
							) }
							value={ link }
							onChange={ ( value ) =>
								setAttributes( { link: value } )
							}
							help={
								'' === link
									? __(
											'Enter a valid link.',
											'ultimate-addons-for-gutenberg'
									  )
									: ''
							}
						/>
						<ToggleControl
							label={ __(
								'Open in new tab',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ linkInNewTab }
							onChange={ () =>
								setAttributes( {
									linkInNewTab: ! linkInNewTab,
								} )
							}
						/>
					</>
				) }
			</PanelBody>
		);
	};

	return (
		<>
			<InspectorControls>{ acceptInspectorControls() }</InspectorControls>
		</>
	);
};

export default React.memo( Settings );
