import lazyLoader from '@Controls/lazy-loader';
import React, { Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import {
	BlockAlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl,
} from '@wordpress/components';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const {
		align,
		gap,
		stack,
		loadGoogleFonts,
		fontFamily,
		fontWeight,
		fontSubset,
	} = attributes;

	let loadBtnGoogleFonts;

	if ( loadGoogleFonts == true ) {
		const btnconfig = {
			google: {
				families: [
					fontFamily + ( fontWeight ? ':' + fontWeight : '' ),
				],
			},
		};

		loadBtnGoogleFonts = (
			<WebfontLoader config={ btnconfig }></WebfontLoader>
		);
	}

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<BaseControl>
					<BaseControl.VisualLabel>
						{ __( 'Alignment', 'ultimate-addons-for-gutenberg' ) }
					</BaseControl.VisualLabel>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) =>
							setAttributes( {
								align: value,
							} )
						}
						controls={ [ 'left', 'center', 'right', 'full' ] }
						isCollapsed={ false }
					/>
				</BaseControl>
				<h2>{ __( 'Spacing', 'ultimate-addons-for-gutenberg' ) }</h2>
				<RangeControl
					label={ __(
						'Gap Between Buttons',
						'ultimate-addons-for-gutenberg'
					) }
					value={ gap }
					onChange={ ( value ) => setAttributes( { gap: value } ) }
					help={ __(
						'Note: The gap between the buttons will seem larger in the editor, for better user edit experience. But at frontend the gap will be exactly what is set from here.',
						'ultimate-addons-for-gutenberg'
					) }
					min={ 0 }
					max={ 500 }
				/>
				<hr className="uagb-editor__separator" />
				<SelectControl
					label={ __( 'Stack on', 'ultimate-addons-for-gutenberg' ) }
					value={ stack }
					options={ [
						{
							value: 'none',
							label: __(
								'None',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'desktop',
							label: __(
								'Desktop',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'tablet',
							label: __(
								'Tablet',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'mobile',
							label: __(
								'Mobile',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) => setAttributes( { stack: value } ) }
					help={ __(
						'Note: Choose on what breakpoint the buttons will stack.',
						'ultimate-addons-for-gutenberg'
					) }
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Typography', 'ultimate-addons-for-gutenberg' ) }</h2>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: loadGoogleFonts,
						label: 'loadGoogleFonts',
					} }
					fontFamily={ { value: fontFamily, label: 'fontFamily' } }
					fontWeight={ { value: fontWeight, label: 'fontWeight' } }
					fontSubset={ { value: fontSubset, label: 'fontSubset' } }
					disableFontSize={ true }
					disableLineHeight={ true }
				/>
			</PanelBody>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			<InspectorControls>{ generalSettings() }</InspectorControls>

			{ loadBtnGoogleFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
