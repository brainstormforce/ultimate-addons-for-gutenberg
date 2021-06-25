import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const {
		toggleRequired,
		toggleStatus,
		layout,
		trueValue,
		falseValue,
	} = attributes;

	const toggleInspectorControls = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<p className="uagb-settings-notice">
					{ __(
						'Leaving the toggle in On/Off state will set it as a default value on page load for the user.',
						'ultimate-addons-for-gutenberg'
					) }
				</p>

				<ToggleControl
					label={ __( 'Required', 'ultimate-addons-for-gutenberg' ) }
					checked={ toggleRequired }
					onChange={ () =>
						setAttributes( { toggleRequired: ! toggleRequired } )
					}
				/>
				<ToggleControl
					label={ __(
						'Default State',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ toggleStatus }
					help={
						toggleStatus
							? __( 'ON State', 'ultimate-addons-for-gutenberg' )
							: __( 'OFF State', 'ultimate-addons-for-gutenberg' )
					}
					onChange={ () =>
						setAttributes( { toggleStatus: ! toggleStatus } )
					}
				/>
				<TextControl
					label={ __(
						'True State',
						'ultimate-addons-for-gutenberg'
					) }
					value={ trueValue }
					onChange={ ( value ) =>
						setAttributes( { trueValue: value } )
					}
				/>
				<TextControl
					label={ __(
						'False State',
						'ultimate-addons-for-gutenberg'
					) }
					value={ falseValue }
					onChange={ ( value ) =>
						setAttributes( { falseValue: value } )
					}
				/>
				<SelectControl
					label={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
					value={ layout }
					onChange={ ( value ) => setAttributes( { layout: value } ) }
					options={ [
						{
							value: '',
							label: __(
								'Square',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'round',
							label: __(
								'Round',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
			</PanelBody>
		);
	};

	return (
		<>
			<InspectorControls>{ toggleInspectorControls() }</InspectorControls>
		</>
	);
};
export default React.memo( Settings );
