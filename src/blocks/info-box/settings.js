import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';
import renderSVG from '@Controls/renderIcon';
import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';

$ = jQuery;

import {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';

let imageSizeOptions = [
	{
		value: 'thumbnail',
		label: __( 'Thumbnail', 'ultimate-addons-for-gutenberg' ),
	},
	{ value: 'medium', label: __( 'Medium', 'ultimate-addons-for-gutenberg' ) },
	{ value: 'full', label: __( 'Large', 'ultimate-addons-for-gutenberg' ) },
];

const Settings = ( props ) => {
	props = props.parentProps;
	const { setAttributes, attributes } = props;

	// Setup the attributes.
	const {
		headingAlign,
		headingColor,
		subHeadingColor,
		prefixColor,
		prefixFontSize,
		prefixFontSizeType,
		prefixFontSizeTablet,
		prefixFontSizeMobile,
		prefixFontFamily,
		prefixFontWeight,
		prefixFontSubset,
		prefixLineHeightType,
		prefixLineHeight,
		prefixLineHeightTablet,
		prefixLineHeightMobile,
		prefixLoadGoogleFonts,
		headingTag,
		headFontSize,
		headFontSizeType,
		headFontSizeTablet,
		headFontSizeMobile,
		headFontFamily,
		headFontWeight,
		headFontSubset,
		headLineHeightType,
		headLineHeight,
		headLineHeightTablet,
		headLineHeightMobile,
		headLoadGoogleFonts,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeTablet,
		subHeadFontSizeMobile,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadFontSubset,
		subHeadLineHeightType,
		subHeadLineHeight,
		subHeadLineHeightTablet,
		subHeadLineHeightMobile,
		subHeadLoadGoogleFonts,
		separatorWidthType,
		seperatorSpace,
		headSpace,
		subHeadSpace,
		icon,
		iconColor,
		iconSize,
		iconimgPosition,
		iconHover,
		iconimgBorderRadius,
		source_type,
		sourceAlign,
		seperatorPosition,
		seperatorStyle,
		seperatorWidth,
		seperatorColor,
		seperatorThickness,
		ctaType,
		ctaText,
		ctaLink,
		ctaTarget,
		ctaIcon,
		ctaIconPosition,
		ctaIconSpace,
		ctaLinkColor,
		ctaFontSize,
		ctaFontSizeType,
		ctaFontSizeMobile,
		ctaFontSizeTablet,
		ctaFontFamily,
		ctaFontWeight,
		ctaFontSubset,
		ctaLoadGoogleFonts,
		ctaBtnLinkColor,
		ctaLinkHoverColor,
		ctaBgHoverColor,
		ctaBgColor,
		ctaBtnVertPadding,
		ctaBtnHrPadding,
		ctaBorderStyle,
		ctaBorderColor,
		ctaBorderhoverColor,
		ctaBorderWidth,
		ctaBorderRadius,
		prefixSpace,
		iconLeftMargin,
		iconRightMargin,
		iconTopMargin,
		iconBottomMargin,
		iconImage,
		imageSize,
		imageWidth,
		imageWidthType,
		stack,
		showPrefix,
		showTitle,
		showDesc,
		inheritFromTheme,
	} = attributes;

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { iconImage: null } );
			return;
		}

		if ( ! media.type || 'image' !== media.type ) {
			setAttributes( { iconImage: null } );
			return;
		}
		if ( media.sizes ) {
			const new_img = getImageSize( media.sizes );
			imageSizeOptions = new_img;
		}
		setAttributes( { iconImage: media } );
	};

	const getImageSize = ( sizes ) => {
		const sizeArr = [];
		$.each( sizes, function ( index ) {
			const name = index;
			const p = { value: name, label: name };
			sizeArr.push( p );
		} );
		return sizeArr;
	};

	/*
	 * Event to set Image as null while removing.
	 */
	const onRemoveImage = () => {
		setAttributes( { iconImage: '' } );
	};

	if ( iconImage && iconImage.sizes ) {
		imageSizeOptions = getImageSize( iconImage.sizes );
	}
	let imageName = __( 'Select Image', 'ultimate-addons-for-gutenberg' );
	if ( iconImage ) {
		if ( iconImage.url == null || iconImage.url == '' ) {
			imageName = __( 'Select Image', 'ultimate-addons-for-gutenberg' );
		} else {
			imageName = __( 'Replace Image', 'ultimate-addons-for-gutenberg' );
		}
	}

	let loadPrefixGoogleFonts;
	let loadSubHeadGoogleFonts;
	let loadCtaGoogleFonts;
	let loadHeadGoogleFonts;

	if ( prefixLoadGoogleFonts == true ) {
		const prefixconfig = {
			google: {
				families: [
					prefixFontFamily +
						( prefixFontWeight ? ':' + prefixFontWeight : '' ),
				],
			},
		};

		loadPrefixGoogleFonts = (
			<WebfontLoader config={ prefixconfig }></WebfontLoader>
		);
	}

	if ( headLoadGoogleFonts == true ) {
		const headconfig = {
			google: {
				families: [
					headFontFamily +
						( headFontWeight ? ':' + headFontWeight : '' ),
				],
			},
		};

		loadHeadGoogleFonts = (
			<WebfontLoader config={ headconfig }></WebfontLoader>
		);
	}

	if ( subHeadLoadGoogleFonts == true ) {
		const subHeadconfig = {
			google: {
				families: [
					subHeadFontFamily +
						( subHeadFontWeight ? ':' + subHeadFontWeight : '' ),
				],
			},
		};

		loadSubHeadGoogleFonts = (
			<WebfontLoader config={ subHeadconfig }></WebfontLoader>
		);
	}

	if ( subHeadLoadGoogleFonts == true ) {
		const ctaconfig = {
			google: {
				families: [
					ctaFontFamily +
						( ctaFontWeight ? ':' + ctaFontWeight : '' ),
				],
			},
		};

		loadCtaGoogleFonts = (
			<WebfontLoader config={ ctaconfig }></WebfontLoader>
		);
	}

	const blockControls = () => {
		return (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ headingAlign }
					onChange={ ( value ) =>
						setAttributes( { headingAlign: value } )
					}
				/>
			</BlockControls>
		);
	};

	// Global Controls.
	const imageIconPanel = () => {
		return (
			<PanelBody
				title={ __( 'Image/Icon', 'ultimate-addons-for-gutenberg' ) }
			>
				<SelectControl
					label={ __(
						'Select Position',
						'ultimate-addons-for-gutenberg'
					) }
					value={ iconimgPosition }
					onChange={ ( value ) =>
						setAttributes( { iconimgPosition: value } )
					}
					options={ [
						{
							value: 'above-title',
							label: __(
								'Above Title',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'below-title',
							label: __(
								'Below Title',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'left-title',
							label: __(
								'Left of Title',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'right-title',
							label: __(
								'Right of Title',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'left',
							label: __(
								'Left of Text and Title',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'right',
							label: __(
								'Right of Text and Title',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ ( iconimgPosition == 'left' ||
					iconimgPosition == 'right' ) && (
					<SelectControl
						label={ __(
							'Stack on',
							'ultimate-addons-for-gutenberg'
						) }
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
						help={ __(
							'Note: Choose on what breakpoint the Info Box will stack.',
							'ultimate-addons-for-gutenberg'
						) }
						onChange={ ( value ) =>
							setAttributes( { stack: value } )
						}
					/>
				) }
				<hr className="uagb-editor__separator" />
				<SelectControl
					label={ __(
						'Select Source',
						'ultimate-addons-for-gutenberg'
					) }
					value={ source_type }
					onChange={ ( value ) =>
						setAttributes( { source_type: value } )
					}
					options={ [
						{
							value: 'icon',
							label: __(
								'Icon',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'image',
							label: __(
								'Image',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>

				{ iconimgPosition &&
					iconimgPosition !== 'above-title' &&
					iconimgPosition !== 'below-title' && (
						<SelectControl
							label={ __(
								'Vertical Alignment',
								'ultimate-addons-for-gutenberg'
							) }
							value={ sourceAlign }
							onChange={ ( value ) =>
								setAttributes( { sourceAlign: value } )
							}
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
						/>
					) }

				{ source_type == 'icon' && (
					<>
						<FontIconPicker
							icons={ wp.UAGBSvgIcons }
							renderFunc={ renderSVG }
							value={ icon }
							onChange={ ( value ) =>
								setAttributes( { icon: value } )
							}
							isMulti={ false }
							noSelectedPlaceholder={ __(
								'Select Icon',
								'ultimate-addons-for-gutenberg'
							) }
						/>
						<RangeControl
							label={ __(
								'Icon Size',
								'ultimate-addons-for-gutenberg'
							) }
							value={ iconSize }
							onChange={ ( value ) =>
								setAttributes( { iconSize: value } )
							}
							min={ 10 }
							max={ 300 }
							beforeIcon=""
							allowReset
						/>
						<TabPanel
							className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'normal',
									title: __(
										'Normal',
										'ultimate-addons-for-gutenberg'
									),
									className: 'uagb-normal-tab',
								},
								{
									name: 'hover',
									title: __(
										'Hover',
										'ultimate-addons-for-gutenberg'
									),
									className: 'uagb-focus-tab',
								},
							] }
						>
							{ ( tabName ) => {
								let tabout_icon;
								if ( 'normal' === tabName.name ) {
									tabout_icon = (
										<>
											<p className="uagb-setting-label">
												{ __(
													'Icon Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: iconColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ iconColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														iconColor: colorValue,
													} )
												}
												allowReset
											/>
										</>
									);
								} else {
									tabout_icon = (
										<>
											<p className="uagb-setting-label">
												{ __(
													'Icon Hover Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: iconHover,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ iconHover }
												onChange={ ( colorValue ) =>
													setAttributes( {
														iconHover: colorValue,
													} )
												}
												allowReset
											/>
										</>
									);
								}
								return <div>{ tabout_icon }</div>;
							} }
						</TabPanel>
					</>
				) }

				{ source_type == 'image' && (
					<>
						<BaseControl
							className="editor-bg-image-control"
							label={ __(
								'Image',
								'ultimate-addons-for-gutenberg'
							) }
							id={ __(
								'Image',
								'ultimate-addons-for-gutenberg'
							) }
						>
							<MediaUpload
								title={ __(
									'Select Image',
									'ultimate-addons-for-gutenberg'
								) }
								onSelect={ onSelectImage }
								allowedTypes={ [ 'image' ] }
								value={ iconImage }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ imageName }
									</Button>
								) }
							/>
							{ iconImage &&
								iconImage.url !== 'null' &&
								iconImage.url !== '' && (
									<Button
										className="uagb-rm-btn"
										onClick={ onRemoveImage }
										isLink
										isDestructive
									>
										{ __(
											'Remove Image',
											'ultimate-addons-for-gutenberg'
										) }
									</Button>
								) }
						</BaseControl>
						{ iconImage &&
							iconImage.url !== 'null' &&
							iconImage.url !== '' && (
								<>
									<SelectControl
										label={ __(
											'Image Size',
											'ultimate-addons-for-gutenberg'
										) }
										options={ imageSizeOptions }
										value={ imageSize }
										onChange={ ( value ) =>
											setAttributes( {
												imageSize: value,
											} )
										}
									/>
									<ToggleControl
										label={ __(
											'Custom Width',
											'ultimate-addons-for-gutenberg'
										) }
										checked={ imageWidthType }
										onChange={ () =>
											setAttributes( {
												imageWidthType: ! imageWidthType,
											} )
										}
										help={ __(
											'Turn this off to inherit the natural width of Image.',
											'ultimate-addons-for-gutenberg'
										) }
									/>
									{ imageWidthType && (
										<RangeControl
											label={ __(
												'Width (px)',
												'ultimate-addons-for-gutenberg'
											) }
											value={ imageWidth }
											onChange={ ( value ) =>
												setAttributes( {
													imageWidth: value,
												} )
											}
											min={ 0 }
											max={ 500 }
											beforeIcon=""
											allowReset
										/>
									) }
									<RangeControl
										label={ __(
											'Rounded Corners (px)',
											'ultimate-addons-for-gutenberg'
										) }
										value={ iconimgBorderRadius }
										onChange={ ( value ) =>
											setAttributes( {
												iconimgBorderRadius: value,
											} )
										}
										min={ 0 }
										max={ 500 }
										beforeIcon=""
										allowReset
									/>
								</>
							) }
					</>
				) }
			</PanelBody>
		);
	};

	// Typography settings.
	const typographySettings = () => {
		return (
			<PanelBody
				title={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __(
						'Enable Prefix',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showPrefix }
					onChange={ () =>
						setAttributes( { showPrefix: ! showPrefix } )
					}
				/>
				{ showPrefix && (
					<>
						<Suspense fallback={ lazyLoader() }>
							<TypographyControl
								label={ __(
									'Typography',
									'ultimate-addons-for-gutenberg'
								) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								loadGoogleFonts={ {
									value: prefixLoadGoogleFonts,
									label: 'prefixLoadGoogleFonts',
								} }
								fontFamily={ {
									value: prefixFontFamily,
									label: 'prefixFontFamily',
								} }
								fontWeight={ {
									value: prefixFontWeight,
									label: 'prefixFontWeight',
								} }
								fontSubset={ {
									value: prefixFontSubset,
									label: 'prefixFontSubset',
								} }
								fontSizeType={ {
									value: prefixFontSizeType,
									label: 'prefixFontSizeType',
								} }
								fontSize={ {
									value: prefixFontSize,
									label: 'prefixFontSize',
								} }
								fontSizeMobile={ {
									value: prefixFontSizeMobile,
									label: 'prefixFontSizeMobile',
								} }
								fontSizeTablet={ {
									value: prefixFontSizeTablet,
									label: 'prefixFontSizeTablet',
								} }
								lineHeightType={ {
									value: prefixLineHeightType,
									label: 'prefixLineHeightType',
								} }
								lineHeight={ {
									value: prefixLineHeight,
									label: 'prefixLineHeight',
								} }
								lineHeightMobile={ {
									value: prefixLineHeightMobile,
									label: 'prefixLineHeightMobile',
								} }
								lineHeightTablet={ {
									value: prefixLineHeightTablet,
									label: 'prefixLineHeightTablet',
								} }
							/>
						</Suspense>
						<p className="uagb-setting-label">
							{ __(
								'Prefix Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor: prefixColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ prefixColor }
							onChange={ ( colorValue ) =>
								setAttributes( { prefixColor: colorValue } )
							}
							allowReset
						/>
						<hr className="uagb-editor__separator" />
					</>
				) }

				<ToggleControl
					label={ __(
						'Enable Title',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showTitle }
					onChange={ () =>
						setAttributes( { showTitle: ! showTitle } )
					}
				/>
				{ showTitle && (
					<>
						<SelectControl
							label={ __(
								'Title Tag',
								'ultimate-addons-for-gutenberg'
							) }
							value={ headingTag }
							onChange={ ( value ) =>
								setAttributes( { headingTag: value } )
							}
							options={ [
								{ value: 'h1', label: __( 'H1' ) },
								{ value: 'h2', label: __( 'H2' ) },
								{ value: 'h3', label: __( 'H3' ) },
								{ value: 'h4', label: __( 'H4' ) },
								{ value: 'h5', label: __( 'H5' ) },
								{ value: 'h6', label: __( 'H6' ) },
							] }
						/>
						<Suspense fallback={ lazyLoader() }>
							<TypographyControl
								label={ __(
									'Typography',
									'ultimate-addons-for-gutenberg'
								) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								loadGoogleFonts={ {
									value: headLoadGoogleFonts,
									label: 'headLoadGoogleFonts',
								} }
								fontFamily={ {
									value: headFontFamily,
									label: 'headFontFamily',
								} }
								fontWeight={ {
									value: headFontWeight,
									label: 'headFontWeight',
								} }
								fontSubset={ {
									value: headFontSubset,
									label: 'headFontSubset',
								} }
								fontSizeType={ {
									value: headFontSizeType,
									label: 'headFontSizeType',
								} }
								fontSize={ {
									value: headFontSize,
									label: 'headFontSize',
								} }
								fontSizeMobile={ {
									value: headFontSizeMobile,
									label: 'headFontSizeMobile',
								} }
								fontSizeTablet={ {
									value: headFontSizeTablet,
									label: 'headFontSizeTablet',
								} }
								lineHeightType={ {
									value: headLineHeightType,
									label: 'headLineHeightType',
								} }
								lineHeight={ {
									value: headLineHeight,
									label: 'headLineHeight',
								} }
								lineHeightMobile={ {
									value: headLineHeightMobile,
									label: 'headLineHeightMobile',
								} }
								lineHeightTablet={ {
									value: headLineHeightTablet,
									label: 'headLineHeightTablet',
								} }
							/>
						</Suspense>
						<p className="uagb-setting-label">
							{ __(
								'Title Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor: headingColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ headingColor }
							onChange={ ( colorValue ) =>
								setAttributes( { headingColor: colorValue } )
							}
							allowReset
						/>
						<hr className="uagb-editor__separator" />
					</>
				) }
				<ToggleControl
					label={ __(
						'Enable Description',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showDesc }
					onChange={ () => setAttributes( { showDesc: ! showDesc } ) }
				/>
				{ showDesc && (
					<>
						<Suspense fallback={ lazyLoader() }>
							<TypographyControl
								label={ __(
									'Typography',
									'ultimate-addons-for-gutenberg'
								) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								loadGoogleFonts={ {
									value: subHeadLoadGoogleFonts,
									label: 'subHeadLoadGoogleFonts',
								} }
								fontFamily={ {
									value: subHeadFontFamily,
									label: 'subHeadFontFamily',
								} }
								fontWeight={ {
									value: subHeadFontWeight,
									label: 'subHeadFontWeight',
								} }
								fontSubset={ {
									value: subHeadFontSubset,
									label: 'subHeadFontSubset',
								} }
								fontSizeType={ {
									value: subHeadFontSizeType,
									label: 'subHeadFontSizeType',
								} }
								fontSize={ {
									value: subHeadFontSize,
									label: 'subHeadFontSize',
								} }
								fontSizeMobile={ {
									value: subHeadFontSizeMobile,
									label: 'subHeadFontSizeMobile',
								} }
								fontSizeTablet={ {
									value: subHeadFontSizeTablet,
									label: 'subHeadFontSizeTablet',
								} }
								lineHeightType={ {
									value: subHeadLineHeightType,
									label: 'subHeadLineHeightType',
								} }
								lineHeight={ {
									value: subHeadLineHeight,
									label: 'subHeadLineHeight',
								} }
								lineHeightMobile={ {
									value: subHeadLineHeightMobile,
									label: 'subHeadLineHeightMobile',
								} }
								lineHeightTablet={ {
									value: subHeadLineHeightTablet,
									label: 'subHeadLineHeightTablet',
								} }
							/>
						</Suspense>
						<p className="uagb-setting-label">
							{ __(
								'Description Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: subHeadingColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ subHeadingColor }
							onChange={ ( colorValue ) =>
								setAttributes( { subHeadingColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
			</PanelBody>
		);
	};

	// Separator settings.
	const seperatorSettings = () => {
		return (
			<PanelBody
				title={ __( 'Separator', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Position', 'ultimate-addons-for-gutenberg' ) }
					value={ seperatorPosition }
					onChange={ ( value ) =>
						setAttributes( { seperatorPosition: value } )
					}
					options={ [
						{
							value: 'after_icon',
							label: __(
								'After Icon/Image',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'after_prefix',
							label: __(
								'After Prefix',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'after_title',
							label: __(
								'After Title',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'after_desc',
							label: __(
								'After Description',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				<SelectControl
					label={ __( 'Style' ) }
					value={ seperatorStyle }
					onChange={ ( value ) =>
						setAttributes( { seperatorStyle: value } )
					}
					options={ [
						{
							value: 'none',
							label: __(
								'None',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'solid',
							label: __(
								'Solid',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'double',
							label: __(
								'Double',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'dashed',
							label: __(
								'Dashed',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'dotted',
							label: __(
								'Dotted',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'none' !== seperatorStyle && (
					<>
						<RangeControl
							label={ __(
								'Thickness',
								'ultimate-addons-for-gutenberg'
							) }
							value={ seperatorThickness }
							onChange={ ( value ) =>
								setAttributes( { seperatorThickness: value } )
							}
							min={ 0 }
							max={ 10 }
							beforeIcon=""
							allowReset
						/>
						<ButtonGroup
							className="uagb-size-type-field"
							aria-label={ __(
								'Size Type',
								'ultimate-addons-for-gutenberg'
							) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ separatorWidthType === 'px' }
								aria-pressed={ separatorWidthType === 'px' }
								onClick={ () =>
									setAttributes( {
										separatorWidthType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ separatorWidthType === '%' }
								aria-pressed={ separatorWidthType === '%' }
								onClick={ () =>
									setAttributes( { separatorWidthType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<RangeControl
							label={ __(
								'Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ seperatorWidth }
							onChange={ ( value ) =>
								setAttributes( { seperatorWidth: value } )
							}
							min={ 0 }
							max={ '%' == separatorWidthType ? 100 : 500 }
							beforeIcon=""
							allowReset
						/>
						<p className="uagb-setting-label">
							{ __(
								'Separator Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: seperatorColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ seperatorColor }
							onChange={ ( colorValue ) =>
								setAttributes( { seperatorColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
			</PanelBody>
		);
	};

	// Margin Settings.
	const marginSettings = () => {
		return (
			<PanelBody
				title={ __( 'Spacing', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				{ showPrefix && (
					<RangeControl
						label={ __(
							'Prefix Bottom Margin',
							'ultimate-addons-for-gutenberg'
						) }
						value={ prefixSpace }
						onChange={ ( value ) =>
							setAttributes( { prefixSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				) }
				{ showTitle && (
					<RangeControl
						label={ __(
							'Title Bottom Margin',
							'ultimate-addons-for-gutenberg'
						) }
						value={ headSpace }
						onChange={ ( value ) =>
							setAttributes( { headSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				) }
				{ 'none' !== seperatorStyle && (
					<RangeControl
						label={ __(
							'Separator Bottom Margin',
							'ultimate-addons-for-gutenberg'
						) }
						value={ seperatorSpace }
						onChange={ ( value ) =>
							setAttributes( { seperatorSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				) }
				{ showDesc && (
					<RangeControl
						label={ __(
							'Description Bottom Margin',
							'ultimate-addons-for-gutenberg'
						) }
						value={ subHeadSpace }
						onChange={ ( value ) =>
							setAttributes( { subHeadSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				) }
				<hr className="uagb-editor__separator" />
				<h2>
					{ __(
						'Image/Icon Margin (px)',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.left_margin }
					className={ 'uagb-margin-control' }
					value={ iconLeftMargin }
					onChange={ ( value ) =>
						setAttributes( { iconLeftMargin: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.right_margin }
					className={ 'uagb-margin-control' }
					value={ iconRightMargin }
					onChange={ ( value ) =>
						setAttributes( { iconRightMargin: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.top_margin }
					className={ 'uagb-margin-control' }
					value={ iconTopMargin }
					onChange={ ( value ) =>
						setAttributes( { iconTopMargin: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.bottom_margin }
					className={ 'uagb-margin-control' }
					value={ iconBottomMargin }
					onChange={ ( value ) =>
						setAttributes( { iconBottomMargin: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
			</PanelBody>
		);
	};
	const ctaSettings = () => {
		return (
			<PanelBody
				title={ __(
					'Call To Action',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Type', 'ultimate-addons-for-gutenberg' ) }
					value={ ctaType }
					onChange={ ( value ) =>
						setAttributes( { ctaType: value } )
					}
					options={ [
						{
							value: 'none',
							label: __(
								'None',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'text',
							label: __(
								'Text',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'button',
							label: __(
								'Button',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'all',
							label: __(
								'Complete Box',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ ( ctaType === 'text' || ctaType === 'button' ) && (
					<>
						<TextControl
							label={ __(
								'Text',
								'ultimate-addons-for-gutenberg'
							) }
							value={ ctaText }
							onChange={ ( value ) =>
								setAttributes( { ctaText: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Inherit from Theme',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ inheritFromTheme }
							onChange={ () =>
								setAttributes( {
									inheritFromTheme: ! inheritFromTheme,
								} )
							}
						/>
						{ ctaType === 'text' && (
							<TypographyControl
								label={ __(
									'Typography',
									'ultimate-addons-for-gutenberg'
								) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								loadGoogleFonts={ {
									value: ctaLoadGoogleFonts,
									label: 'ctaLoadGoogleFonts',
								} }
								fontFamily={ {
									value: ctaFontFamily,
									label: 'ctaFontFamily',
								} }
								fontWeight={ {
									value: ctaFontWeight,
									label: 'ctaFontWeight',
								} }
								fontSubset={ {
									value: ctaFontSubset,
									label: 'ctaFontSubset',
								} }
								fontSizeType={ {
									value: ctaFontSizeType,
									label: 'ctaFontSizeType',
								} }
								fontSize={ {
									value: ctaFontSize,
									label: 'ctaFontSize',
								} }
								fontSizeMobile={ {
									value: ctaFontSizeMobile,
									label: 'ctaFontSizeMobile',
								} }
								fontSizeTablet={ {
									value: ctaFontSizeTablet,
									label: 'ctaFontSizeTablet',
								} }
								disableLineHeight={ true }
							/>
						) }
						{ ! inheritFromTheme && ctaType === 'button' && (
							<TypographyControl
								label={ __(
									'Typography',
									'ultimate-addons-for-gutenberg'
								) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								loadGoogleFonts={ {
									value: ctaLoadGoogleFonts,
									label: 'ctaLoadGoogleFonts',
								} }
								fontFamily={ {
									value: ctaFontFamily,
									label: 'ctaFontFamily',
								} }
								fontWeight={ {
									value: ctaFontWeight,
									label: 'ctaFontWeight',
								} }
								fontSubset={ {
									value: ctaFontSubset,
									label: 'ctaFontSubset',
								} }
								fontSizeType={ {
									value: ctaFontSizeType,
									label: 'ctaFontSizeType',
								} }
								fontSize={ {
									value: ctaFontSize,
									label: 'ctaFontSize',
								} }
								fontSizeMobile={ {
									value: ctaFontSizeMobile,
									label: 'ctaFontSizeMobile',
								} }
								fontSizeTablet={ {
									value: ctaFontSizeTablet,
									label: 'ctaFontSizeTablet',
								} }
								disableLineHeight={ true }
							/>
						) }
					</>
				) }
				{ ctaType !== 'none' && (
					<>
						<TextControl
							label={ __(
								'Link',
								'ultimate-addons-for-gutenberg'
							) }
							value={ ctaLink }
							onChange={ ( value ) =>
								setAttributes( { ctaLink: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Open in new Window',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ ctaTarget }
							onChange={ () =>
								setAttributes( { ctaTarget: ! ctaTarget } )
							}
						/>
					</>
				) }
				{ ctaType !== 'all' && ctaType !== 'none' && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __(
								'Button Icon',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<FontIconPicker
							icons={ wp.UAGBSvgIcons }
							renderFunc={ renderSVG }
							value={ ctaIcon }
							onChange={ ( value ) =>
								setAttributes( { ctaIcon: value } )
							}
							isMulti={ false }
							noSelectedPlaceholder={ __(
								'Select Icon',
								'ultimate-addons-for-gutenberg'
							) }
						/>
						{ ctaIcon !== '' && (
							<>
								<SelectControl
									label={ __(
										'Icon Position',
										'ultimate-addons-for-gutenberg'
									) }
									value={ ctaIconPosition }
									onChange={ ( value ) =>
										setAttributes( {
											ctaIconPosition: value,
										} )
									}
									options={ [
										{
											value: 'before',
											label: __(
												'Before Text',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'after',
											label: __(
												'After Text',
												'ultimate-addons-for-gutenberg'
											),
										},
									] }
								/>
								<RangeControl
									label={ __(
										'Icon Spacing',
										'ultimate-addons-for-gutenberg'
									) }
									value={ ctaIconSpace }
									onChange={ ( value ) =>
										setAttributes( { ctaIconSpace: value } )
									}
									min={ 0 }
									max={ 50 }
									beforeIcon=""
									allowReset
								/>
							</>
						) }
						<hr className="uagb-editor__separator" />
					</>
				) }
				{ ! inheritFromTheme && ctaType == 'button' && (
					<>
						<h2>
							{ __(
								'Button Padding',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							value={ ctaBtnVertPadding }
							onChange={ ( value ) =>
								setAttributes( { ctaBtnVertPadding: value } )
							}
							min={ 0 }
							max={ 50 }
							className={ 'uagb-margin-control' }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							value={ ctaBtnHrPadding }
							onChange={ ( value ) =>
								setAttributes( { ctaBtnHrPadding: value } )
							}
							min={ 0 }
							max={ 50 }
							className={ 'uagb-margin-control' }
							allowReset
						/>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __(
								'Button Border',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<SelectControl
							label={ __(
								'Style',
								'ultimate-addons-for-gutenberg'
							) }
							value={ ctaBorderStyle }
							onChange={ ( value ) =>
								setAttributes( { ctaBorderStyle: value } )
							}
							options={ [
								{
									value: 'none',
									label: __(
										'None',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'solid',
									label: __(
										'Solid',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'double',
									label: __(
										'Double',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'dashed',
									label: __(
										'Dashed',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'dotted',
									label: __(
										'Dotted',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
						{ ctaBorderStyle !== 'none' && (
							<>
								<RangeControl
									label={ __(
										'Width',
										'ultimate-addons-for-gutenberg'
									) }
									value={ ctaBorderWidth }
									onChange={ ( value ) =>
										setAttributes( {
											ctaBorderWidth: value,
										} )
									}
									min={ 0 }
									max={ 10 }
									beforeIcon=""
									allowReset
								/>
							</>
						) }
						<RangeControl
							label={ __(
								'Rounded Corner',
								'ultimate-addons-for-gutenberg'
							) }
							value={ ctaBorderRadius }
							onChange={ ( value ) =>
								setAttributes( { ctaBorderRadius: value } )
							}
							min={ 0 }
							max={ 100 }
							beforeIcon=""
							allowReset
						/>
						<hr className="uagb-editor__separator" />
					</>
				) }
				{ ctaType === 'text' && (
					<TabPanel
						className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'normal',
								title: __(
									'Normal',
									'ultimate-addons-for-gutenberg'
								),
								className: 'uagb-normal-tab',
							},
							{
								name: 'hover',
								title: __(
									'Hover',
									'ultimate-addons-for-gutenberg'
								),
								className: 'uagb-focus-tab',
							},
						] }
					>
						{ ( tabName ) => {
							let tabout_1;
							if ( 'normal' === tabName.name ) {
								tabout_1 = (
									<>
										<p className="uagb-setting-label">
											{ __(
												'Text Color',
												'ultimate-addons-for-gutenberg'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: ctaLinkColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ ctaLinkColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													ctaLinkColor: colorValue,
												} )
											}
											allowReset
										/>
									</>
								);
							} else {
								tabout_1 = (
									<>
										<p className="uagb-setting-label">
											{ __(
												'Text Hover Color',
												'ultimate-addons-for-gutenberg'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: ctaLinkHoverColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ ctaLinkHoverColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													ctaLinkHoverColor: colorValue,
												} )
											}
											allowReset
										/>
									</>
								);
							}
							return <div>{ tabout_1 }</div>;
						} }
					</TabPanel>
				) }
				{ ! inheritFromTheme && ctaType == 'button' && (
					<TabPanel
						className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'normal',
								title: __(
									'Normal',
									'ultimate-addons-for-gutenberg'
								),
								className: 'uagb-normal-tab',
							},
							{
								name: 'hover',
								title: __(
									'Hover',
									'ultimate-addons-for-gutenberg'
								),
								className: 'uagb-focus-tab',
							},
						] }
					>
						{ ( tabName ) => {
							let tabout;
							if ( 'normal' === tabName.name ) {
								tabout = ctaNormalSettings();
							} else {
								tabout = ctaHoverSettings();
							}
							return <div>{ tabout }</div>;
						} }
					</TabPanel>
				) }
			</PanelBody>
		);
	};
	const ctaNormalSettings = () => {
		return (
			<>
				<p className="uagb-setting-label">
					{ __( 'Text Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: ctaBtnLinkColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ ctaBtnLinkColor }
					onChange={ ( colorValue ) =>
						setAttributes( { ctaBtnLinkColor: colorValue } )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Background Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: ctaBgColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ ctaBgColor }
					onChange={ ( colorValue ) =>
						setAttributes( { ctaBgColor: colorValue } )
					}
					allowReset
				/>
				{ ctaBorderStyle !== 'none' && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Border Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: ctaBorderColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ ctaBorderColor }
							onChange={ ( colorValue ) =>
								setAttributes( { ctaBorderColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
			</>
		);
	};
	const ctaHoverSettings = () => {
		return (
			<>
				<p className="uagb-setting-label">
					{ __(
						'Text Hover Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: ctaLinkHoverColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ ctaLinkHoverColor }
					onChange={ ( colorValue ) =>
						setAttributes( { ctaLinkHoverColor: colorValue } )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Background Hover Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: ctaBgHoverColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ ctaBgHoverColor }
					onChange={ ( colorValue ) =>
						setAttributes( { ctaBgHoverColor: colorValue } )
					}
					allowReset
				/>
				{ ctaBorderStyle !== 'none' && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Border Hover Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: ctaBorderhoverColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ ctaBorderhoverColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									ctaBorderhoverColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }
			</>
		);
	};

	return (
		<>
			{ ( iconimgPosition == 'above-title' ||
				iconimgPosition == 'below-title' ) &&
				blockControls() }
			<InspectorControls>
				{ imageIconPanel() }
				{ typographySettings() }
				{ seperatorSettings() }
				{ ctaSettings() }
				{ marginSettings() }
			</InspectorControls>
			<Suspense fallback={ lazyLoader() }>
				{ loadPrefixGoogleFonts }
				{ loadSubHeadGoogleFonts }
				{ loadCtaGoogleFonts }
				{ loadHeadGoogleFonts }
			</Suspense>
		</>
	);
};
export default React.memo( Settings );
