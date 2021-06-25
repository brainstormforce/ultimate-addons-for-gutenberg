import React from 'react';
import { __ } from '@wordpress/i18n';

import { PanelBody, ToggleControl } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const { checkboxRequired } = attributes;

	const checkboxInspectorControls = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<ToggleControl
					label={ __( 'Required', 'ultimate-addons-for-gutenberg' ) }
					checked={ checkboxRequired }
					onChange={ () =>
						setAttributes( {
							checkboxRequired: ! checkboxRequired,
						} )
					}
				/>
			</PanelBody>
		);
	};

	return (
		<>
			<InspectorControls>
				{ checkboxInspectorControls() }
			</InspectorControls>
		</>
	);
};

export default React.memo( Settings );
