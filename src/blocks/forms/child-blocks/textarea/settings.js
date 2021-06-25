import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	TextControl,
} from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const { textareaRequired, rows, placeholder } = attributes;

	const textareaInspectorControls = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<ToggleControl
					label={ __( 'Required', 'ultimate-addons-for-gutenberg' ) }
					checked={ textareaRequired }
					onChange={ () =>
						setAttributes( {
							textareaRequired: ! textareaRequired,
						} )
					}
				/>
				<TextControl
					label={ __(
						'Placeholder',
						'ultimate-addons-for-gutenberg'
					) }
					value={ placeholder }
					onChange={ ( value ) =>
						setAttributes( { placeholder: value } )
					}
				/>
				<RangeControl
					label={ __(
						'Number of lines',
						'ultimate-addons-for-gutenberg'
					) }
					value={ rows }
					onChange={ ( value ) => setAttributes( { rows: value } ) }
					min={ 2 }
					max={ 10 }
					allowReset
				/>
			</PanelBody>
		);
	};

	return (
		<>
			<InspectorControls>
				{ textareaInspectorControls() }
			</InspectorControls>
		</>
	);
};
export default React.memo( Settings );
