import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';
import renderSVG from '@Controls/renderIcon';
import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';
import {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { setAttributes, attributes } = props;

	// Setup the attributes.
	const {
		textAlign,
		titleColor,
		descColor,
		titleTag,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		titleLoadGoogleFonts,
		descFontSize,
		descFontSizeType,
		descFontSizeMobile,
		descFontSizeTablet,
		descFontFamily,
		descFontWeight,
		descFontSubset,
		descLineHeightType,
		descLineHeight,
		descLineHeightTablet,
		descLineHeightMobile,
		descLoadGoogleFonts,
		titleSpace,
		descSpace,
		ctaPosition,
		buttonAlign,
		ctaType,
		ctaText,
		ctaLink,
		ctaTarget,
		ctaIcon,
		ctaIconPosition,
		ctaIconSpace,
		ctaFontSize,
		ctaFontSizeType,
		ctaFontSizeMobile,
		ctaFontSizeTablet,
		ctaFontFamily,
		ctaFontWeight,
		ctaFontSubset,
		ctaLoadGoogleFonts,
		contentWidth,
		ctaBtnLinkColor,
		ctaBgHoverColor,
		ctaBgColor,
		ctaBtnVertPadding,
		ctaBtnHrPadding,
		ctaBorderStyle,
		ctaBorderColor,
		ctaBorderhoverColor,
		ctaBorderWidth,
		ctaBorderRadius,
		stack,
		ctaLeftSpace,
		ctaRightSpace,
		ctaLinkHoverColor,
		inheritFromTheme,
	} = attributes;

	let loadCtaGoogleFonts;
	let loadTitleGoogleFonts;
	let loadDescGoogleFonts;

	if ( ctaLoadGoogleFonts == true ) {
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

	if ( titleLoadGoogleFonts == true ) {
		const titleconfig = {
			google: {
				families: [
					titleFontFamily +
						( titleFontWeight ? ':' + titleFontWeight : '' ),
				],
			},
		};

		loadTitleGoogleFonts = (
			<WebfontLoader config={ titleconfig }></WebfontLoader>
		);
	}

	if ( descLoadGoogleFonts == true ) {
		const descconfig = {
			google: {
				families: [
					descFontFamily +
						( descFontWeight ? ':' + descFontWeight : '' ),
				],
			},
		};

		loadDescGoogleFonts = (
			<WebfontLoader config={ descconfig }></WebfontLoader>
		);
	}

	// Icon properties.
	const ctaIconProps = {
		icons: wp.UAGBSvgIcons,
		value: ctaIcon,
		onChange: ( value ) => {
			setAttributes( { ctaIcon: value } );
		},
		isMulti: false,
		renderFunc: renderSVG,
		noSelectedPlaceholder: __(
			'Select Icon',
			'ultimate-addons-for-gutenberg'
		),
	};

	// CTA settings.
	const ctaSettings = () => {
		return (
			<PanelBody
				title={ __( 'Button', 'ultimate-addons-for-gutenberg' ) }
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
						{ ctaType === 'button' && (
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
						) }

						{ ( ! inheritFromTheme && ctaType === 'button' ) ||
							( ctaType === 'text' && (
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
							) ) }
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
						<h2>{ __( 'Button Icon' ) }</h2>
						<FontIconPicker { ...ctaIconProps } />
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
					</>
				) }

				{ ctaType == 'button' && ! inheritFromTheme && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __(
								'Button Padding (px)',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ ctaBtnVertPadding }
							onChange={ ( value ) =>
								setAttributes( { ctaBtnVertPadding: value } )
							}
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ ctaBtnHrPadding }
							onChange={ ( value ) =>
								setAttributes( { ctaBtnHrPadding: value } )
							}
							min={ 0 }
							max={ 500 }
							beforeIcon=""
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
							label={ __( 'Style' ) }
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
								<RangeControl
									label={ __(
										'Rounded Corner',
										'ultimate-addons-for-gutenberg'
									) }
									value={ ctaBorderRadius }
									onChange={ ( value ) =>
										setAttributes( {
											ctaBorderRadius: value,
										} )
									}
									min={ 0 }
									max={ 100 }
									beforeIcon=""
									allowReset
								/>
							</>
						) }
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
								className: 'uagb-hover-tab',
							},
						] }
					>
						{ ( tabName ) => {
							let ctaTextTab;
							if ( 'normal' === tabName.name ) {
								ctaTextTab = ctaTextColor();
							} else {
								ctaTextTab = ctaTxtHoverColor();
							}
							return <div>{ ctaTextTab }</div>;
						} }
					</TabPanel>
				) }

				{ ctaType === 'button' && ! inheritFromTheme && (
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

	const ctaTextColor = () => {
		return (
			<>
				<p className="uagb-setting-label">
					{ __( 'CTA Text Color', 'ultimate-addons-for-gutenberg' ) }
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
			</>
		);
	};

	const ctaTxtHoverColor = () => {
		return (
			<>
				<p className="uagb-setting-label">
					{ __(
						'CTA Text Hover Color',
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
			</>
		);
	};

	// Typography settings.
	const typographySettings = () => {
		return (
			<PanelBody
				title={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<h2>{ __( 'Heading', 'ultimate-addons-for-gutenberg' ) }</h2>
				<SelectControl
					label={ __( 'Tag', 'ultimate-addons-for-gutenberg' ) }
					value={ titleTag }
					onChange={ ( value ) =>
						setAttributes( { titleTag: value } )
					}
					options={ [
						{
							value: 'h1',
							label: __( 'H1', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h2',
							label: __( 'H2', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h3',
							label: __( 'H3', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h4',
							label: __( 'H4', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h5',
							label: __( 'H5', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h6',
							label: __( 'H6', 'ultimate-addons-for-gutenberg' ),
						},
					] }
				/>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: titleLoadGoogleFonts,
						label: 'titleLoadGoogleFonts',
					} }
					fontFamily={ {
						value: titleFontFamily,
						label: 'titleFontFamily',
					} }
					fontWeight={ {
						value: titleFontWeight,
						label: 'titleFontWeight',
					} }
					fontSubset={ {
						value: titleFontSubset,
						label: 'titleFontSubset',
					} }
					fontSizeType={ {
						value: titleFontSizeType,
						label: 'titleFontSizeType',
					} }
					fontSize={ {
						value: titleFontSize,
						label: 'titleFontSize',
					} }
					fontSizeMobile={ {
						value: titleFontSizeMobile,
						label: 'titleFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: titleFontSizeTablet,
						label: 'titleFontSizeTablet',
					} }
					lineHeightType={ {
						value: titleLineHeightType,
						label: 'titleLineHeightType',
					} }
					lineHeight={ {
						value: titleLineHeight,
						label: 'titleLineHeight',
					} }
					lineHeightMobile={ {
						value: titleLineHeightMobile,
						label: 'titleLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: titleLineHeightTablet,
						label: 'titleLineHeightTablet',
					} }
				/>
				<p className="uagb-setting-label">
					{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: titleColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ titleColor }
					onChange={ ( colorValue ) =>
						setAttributes( { titleColor: colorValue } )
					}
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>
					{ __( 'Description', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: descLoadGoogleFonts,
						label: 'descLoadGoogleFonts',
					} }
					fontFamily={ {
						value: descFontFamily,
						label: 'descFontFamily',
					} }
					fontWeight={ {
						value: descFontWeight,
						label: 'descFontWeight',
					} }
					fontSubset={ {
						value: descFontSubset,
						label: 'descFontSubset',
					} }
					fontSizeType={ {
						value: descFontSizeType,
						label: 'descFontSizeType',
					} }
					fontSize={ {
						value: descFontSize,
						label: 'descFontSize',
					} }
					fontSizeMobile={ {
						value: descFontSizeMobile,
						label: 'descFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: descFontSizeTablet,
						label: 'descFontSizeTablet',
					} }
					lineHeightType={ {
						value: descLineHeightType,
						label: 'descLineHeightType',
					} }
					lineHeight={ {
						value: descLineHeight,
						label: 'descLineHeight',
					} }
					lineHeightMobile={ {
						value: descLineHeightMobile,
						label: 'descLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: descLineHeightTablet,
						label: 'descLineHeightTablet',
					} }
				/>
				<p className="uagb-setting-label">
					{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: descColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ descColor }
					onChange={ ( colorValue ) =>
						setAttributes( { descColor: colorValue } )
					}
					allowReset
				/>
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
				<RangeControl
					label={ __(
						'Heading Bottom Margin',
						'ultimate-addons-for-gutenberg'
					) }
					value={ titleSpace }
					onChange={ ( value ) =>
						setAttributes( { titleSpace: value } )
					}
					min={ 0 }
					max={ 500 }
					beforeIcon=""
					allowReset
				/>
				<RangeControl
					label={ __(
						'Description Bottom Margin',
						'ultimate-addons-for-gutenberg'
					) }
					value={ descSpace }
					onChange={ ( value ) =>
						setAttributes( { descSpace: value } )
					}
					min={ 0 }
					max={ 500 }
					beforeIcon=""
					allowReset
				/>

				{ textAlign === 'left' && ctaPosition === 'right' && (
					<RangeControl
						label={ __(
							'Content Left Margin',
							'ultimate-addons-for-gutenberg'
						) }
						value={ ctaLeftSpace }
						onChange={ ( value ) =>
							setAttributes( { ctaLeftSpace: value } )
						}
						min={ 0 }
						max={ 500 }
						beforeIcon=""
						allowReset
					/>
				) }
				{ textAlign === 'right' && ctaPosition === 'right' && (
					<RangeControl
						label={ __(
							'Content Right Margin',
							'ultimate-addons-for-gutenberg'
						) }
						value={ ctaRightSpace }
						onChange={ ( value ) =>
							setAttributes( { ctaRightSpace: value } )
						}
						min={ 0 }
						max={ 500 }
						beforeIcon=""
						allowReset
					/>
				) }
			</PanelBody>
		);
	};

	const layouts = () => {
		return (
			<PanelBody
				title={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __(
						'Button Position',
						'ultimate-addons-for-gutenberg'
					) }
					value={ ctaPosition }
					onChange={ ( value ) =>
						setAttributes( { ctaPosition: value } )
					}
					options={ [
						{
							value: 'right',
							label: __(
								'Normal',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'below-title',
							label: __(
								'Stack',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ ctaPosition == 'right' && (
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
							'Note: Choose on what breakpoint the CTA button will stack.',
							'ultimate-addons-for-gutenberg'
						) }
						onChange={ ( value ) =>
							setAttributes( { stack: value } )
						}
					/>
				) }

				{ ( ctaType === 'text' || ctaType === 'button' ) && (
					<>
						{ ctaPosition === 'right' && (
							<RangeControl
								label={ __(
									'Content Width (%)',
									'ultimate-addons-for-gutenberg'
								) }
								value={ contentWidth }
								onChange={ ( value ) =>
									setAttributes( { contentWidth: value } )
								}
								min={ 0 }
								max={ 100 }
								initialPosition={ 70 }
								allowReset
							/>
						) }
					</>
				) }

				{ ctaPosition && ctaPosition === 'right' && (
					<SelectControl
						label={ __(
							'Verticle Alignment',
							'ultimate-addons-for-gutenberg'
						) }
						value={ buttonAlign }
						onChange={ ( value ) =>
							setAttributes( { buttonAlign: value } )
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
			</PanelBody>
		);
	};

	const blockControls = () => {
		return (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) =>
						setAttributes( { textAlign: value } )
					}
				/>
			</BlockControls>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			{ blockControls() }
			<InspectorControls>
				{ ctaType !== 'all' && ctaType !== 'none' && layouts() }
				{ typographySettings() }
				{ ctaSettings() }
				{ marginSettings() }
			</InspectorControls>
			{ loadCtaGoogleFonts }
			{ loadTitleGoogleFonts }
			{ loadDescGoogleFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
