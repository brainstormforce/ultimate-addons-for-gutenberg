import React from 'react';
import { __ } from '@wordpress/i18n';

import { PanelBody, TextControl } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const { hidden_field_value } = attributes;

	const hiddenFieldSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<TextControl
					label={ __( 'Value', 'ultimate-addons-for-gutenberg' ) }
					value={ hidden_field_value }
					onChange={ ( new_hidden_field_value ) =>
						setAttributes( { new_hidden_field_value } )
					}
				/>
			</PanelBody>
		);
	};

	return (
		<>
			<InspectorControls>{ hiddenFieldSettings() }</InspectorControls>
		</>
	);
};
export default React.memo( Settings );
