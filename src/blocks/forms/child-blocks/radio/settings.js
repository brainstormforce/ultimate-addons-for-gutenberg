import React from 'react';
import { __ } from '@wordpress/i18n';

import { PanelBody, ToggleControl } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const { radioRequired } = attributes;

	const radioInspectorControls = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<ToggleControl
					label={ __( 'Required', 'ultimate-addons-for-gutenberg' ) }
					checked={ radioRequired }
					onChange={ () =>
						setAttributes( { radioRequired: ! radioRequired } )
					}
				/>
			</PanelBody>
		);
	};

	return (
		<>
			<InspectorControls>{ radioInspectorControls() }</InspectorControls>
		</>
	);
};
export default React.memo( Settings );
