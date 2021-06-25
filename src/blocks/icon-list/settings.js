import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import ColumnResponsive from '@Components/typography/column-responsive';
import WebfontLoader from '@Components/typography/fontloader';
import TypographyControl from '@Components/typography';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
	ButtonGroup,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { attributes, setAttributes, deviceType, clientId } = props;

	const {
		align,
		gap,
		inner_gap,
		stack,
		icon_layout,
		iconPosition,
		size,
		sizeType,
		sizeMobile,
		sizeTablet,
		hideLabel,
		borderRadius,
		bgSize,
		border,
		fontSize,
		fontSizeType,
		fontSizeMobile,
		fontSizeTablet,
		fontFamily,
		fontWeight,
		fontSubset,
		lineHeight,
		lineHeightType,
		lineHeightMobile,
		lineHeightTablet,
		loadGoogleFonts,
	} = attributes;

	let googleFonts;

	if ( loadGoogleFonts == true ) {
		const hconfig = {
			google: {
				families: [
					fontFamily + ( fontWeight ? ':' + fontWeight : '' ),
				],
			},
		};

		googleFonts = <WebfontLoader config={ hconfig }></WebfontLoader>;
	}

	const sizeTypes = [
		{ key: 'px', name: __( 'px', 'ultimate-addons-for-gutenberg' ) },
		{ key: 'em', name: __( 'em', 'ultimate-addons-for-gutenberg' ) },
	];

	const sizeTypeControls = (
		<ButtonGroup
			className="uagb-size-type-field"
			aria-label={ __( 'Size Type', 'ultimate-addons-for-gutenberg' ) }
		>
			{ sizeTypes.map( ( { name, key } ) => (
				<Button
					key={ key }
					className="uagb-size-btn"
					isSmall
					isPrimary={ sizeType === key }
					aria-pressed={ sizeType === key }
					onClick={ () => setAttributes( { sizeType: key } ) }
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	);
	const blockControls = () => {
		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'left', 'center', 'right' ] }
				/>
			</BlockControls>
		);
	};
	const changeChildAttr = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			clientId
		);

		getChildBlocks.forEach( ( iconChild ) => {
			iconChild.attributes.hideLabel = value;
		} );
		setAttributes( { hideLabel: value } );
	};

	const generalSetting = () => {
		return (
			<InspectorControls>
				<PanelBody
					title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __(
							'Layout',
							'ultimate-addons-for-gutenberg'
						) }
						value={ icon_layout }
						options={ [
							{
								value: 'horizontal',
								label: __(
									'Horizontal',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'vertical',
								label: __(
									'Vertical',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { icon_layout: value } )
						}
					/>
					{ 'horizontal' == icon_layout && (
						<>
							<SelectControl
								label={ __( 'Stack on' ) }
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
								onChange={ ( value ) =>
									setAttributes( { stack: value } )
								}
								help={ __(
									'Note: Choose on what breakpoint the Icons will stack.',
									'ultimate-addons-for-gutenberg'
								) }
							/>
						</>
					) }
					<ToggleControl
						label={ __(
							'Hide Labels',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ hideLabel }
						onChange={ ( value ) => changeChildAttr( value ) }
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __(
							'Gap between Items',
							'ultimate-addons-for-gutenberg'
						) }
						value={ gap }
						onChange={ ( value ) =>
							setAttributes( { gap: value } )
						}
						help={ __(
							'Note: For better editing experience, the gap between items might look larger than applied.  Viewing in frontend will show the actual results.',
							'ultimate-addons-for-gutenberg'
						) }
						min={ 0 }
						max={ 100 }
					/>
					{ ! hideLabel && (
						<RangeControl
							label={ __(
								'Gap between Icon and Label',
								'ultimate-addons-for-gutenberg'
							) }
							value={ inner_gap }
							onChange={ ( value ) =>
								setAttributes( { inner_gap: value } )
							}
							min={ 0 }
							max={ 100 }
						/>
					) }
					<hr className="uagb-editor__separator" />
					<SelectControl
						label={ __(
							'Icon Alignment',
							'ultimate-addons-for-gutenberg'
						) }
						value={ iconPosition }
						options={ [
							{
								value: 'top',
								label: __(
									'Top',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'middle',
								label: __(
									'Middle',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { iconPosition: value } )
						}
						help={ __(
							'Note: This manages the Icon Position with respect to the Label.',
							'ultimate-addons-for-gutenberg'
						) }
					/>
					<ColumnResponsive />
					{ 'Desktop' === deviceType && (
						<>
							{ sizeTypeControls }
							<RangeControl
								label={ __( 'Icon Size' ) }
								value={ size }
								onChange={ ( value ) =>
									setAttributes( { size: value } )
								}
								min={ 0 }
								max={ 500 }
								allowReset
								initialPosition={ 40 }
							/>
						</>
					) }
					{ 'Tablet' === deviceType && (
						<>
							{ sizeTypeControls }
							<RangeControl
								label={ __( 'Size' ) }
								value={ sizeTablet }
								onChange={ ( value ) =>
									setAttributes( { sizeTablet: value } )
								}
								min={ 0 }
								max={ 500 }
								allowReset
								initialPosition={ 40 }
							/>
						</>
					) }
					{ 'Mobile' === deviceType && (
						<>
							{ sizeTypeControls }
							<RangeControl
								label={ __( 'Size' ) }
								value={ sizeMobile }
								onChange={ ( value ) =>
									setAttributes( { sizeMobile: value } )
								}
								min={ 0 }
								max={ 500 }
								allowReset
								initialPosition={ 40 }
							/>
						</>
					) }
					<hr className="uagb-editor__separator" />
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
						fontFamily={ {
							value: fontFamily,
							label: 'fontFamily',
						} }
						fontWeight={ {
							value: fontWeight,
							label: 'fontWeight',
						} }
						fontSubset={ {
							value: fontSubset,
							label: 'fontSubset',
						} }
						fontSizeType={ {
							value: fontSizeType,
							label: 'fontSizeType',
						} }
						fontSize={ { value: fontSize, label: 'fontSize' } }
						fontSizeMobile={ {
							value: fontSizeMobile,
							label: 'fontSizeMobile',
						} }
						fontSizeTablet={ {
							value: fontSizeTablet,
							label: 'fontSizeTablet',
						} }
						lineHeightType={ {
							value: lineHeightType,
							label: 'lineHeightType',
						} }
						lineHeight={ {
							value: lineHeight,
							label: 'lineHeight',
						} }
						lineHeightMobile={ {
							value: lineHeightMobile,
							label: 'lineHeightMobile',
						} }
						lineHeightTablet={ {
							value: lineHeightTablet,
							label: 'lineHeightTablet',
						} }
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __(
							'Background Size',
							'ultimate-addons-for-gutenberg'
						) }
						value={ bgSize }
						onChange={ ( value ) =>
							setAttributes( { bgSize: value } )
						}
						help={ __(
							'Note: Background Size option is useful when one adds background color to the icons.',
							'ultimate-addons-for-gutenberg'
						) }
						min={ 0 }
						max={ 500 }
					/>
					<RangeControl
						label={ __(
							'Border',
							'ultimate-addons-for-gutenberg'
						) }
						value={ border }
						onChange={ ( value ) =>
							setAttributes( { border: value } )
						}
						help={ __(
							'Note: Border option is useful when one adds border color to the icons.',
							'ultimate-addons-for-gutenberg'
						) }
						min={ 0 }
						max={ 10 }
					/>
					<RangeControl
						label={ __(
							'Border Radius',
							'ultimate-addons-for-gutenberg'
						) }
						value={ borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						help={ __(
							'Note: Border Radius option is useful when one adds background color to the icons.',
							'ultimate-addons-for-gutenberg'
						) }
						min={ 0 }
						max={ 500 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			{ blockControls() }
			{ generalSetting() }
			{ googleFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
