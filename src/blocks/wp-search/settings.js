import { __ } from '@wordpress/i18n';
import UAGB_Block_Icons from '@Controls/block-icons';
import ColumnResponsive from '@Components/typography/column-responsive';
import TypographyControl from '@Components/typography';
import BoxShadowControl from '@Components/box-shadow';
import WebfontLoader from '@Components/typography/fontloader';
import React from 'react';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	TextControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';

import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		layout,
		placeholder,
		inputSize,
		textColor,
		inputBgColor,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		buttonBgColor,
		buttonBgHoverColor,
		buttonIconColor,
		buttonIconHoverColor,
		buttonWidth,
		buttonIconSize,
		iconColor,
		iconSize,
		inputloadGoogleFonts,
		inputFontFamily,
		inputFontWeight,
		inputFontSubset,
		inputFontSize,
		inputFontSizeType,
		inputFontSizeTablet,
		inputFontSizeMobile,
		inputLineHeight,
		inputLineHeightType,
		inputLineHeightTablet,
		inputLineHeightMobile,
		inputPaddingTypeDesktop,
		vinputPaddingMobile,
		vinputPaddingTablet,
		vinputPaddingDesktop,
		hinputPaddingMobile,
		hinputPaddingTablet,
		hinputPaddingDesktop,
		buttonType,
		buttonText,
		buttonloadGoogleFonts,
		buttonFontFamily,
		buttonFontWeight,
		buttonFontSubset,
		buttonFontSize,
		buttonFontSizeType,
		buttonFontSizeTablet,
		buttonFontSizeMobile,
		buttonLineHeight,
		buttonLineHeightType,
		buttonLineHeightTablet,
		buttonLineHeightMobile,
		buttonTextColor,
		buttonTextHoverColor,
		inputSizeType,
	} = attributes;

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<SelectControl
					label={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
					value={ layout }
					options={ [
						{
							value: 'input-button',
							label: __(
								'Classic',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'input',
							label: __(
								'Minimal',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) =>
						setAttributes( {
							layout: value,
						} )
					}
				/>
				<>
					<TextControl
						label={ __(
							'Placeholder',
							'ultimate-addons-for-gutenberg'
						) }
						value={ placeholder }
						onChange={ ( value ) =>
							setAttributes( {
								placeholder: value,
							} )
						}
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
							isPrimary={ inputSizeType === 'px' }
							aria-pressed={ inputSizeType === 'px' }
							onClick={ () =>
								setAttributes( {
									inputSizeType: 'px',
								} )
							}
						>
							{ 'px' }
						</Button>
						<Button
							key={ '%' }
							className="uagb-size-btn"
							isSmall
							isPrimary={ inputSizeType === '%' }
							aria-pressed={ inputSizeType === '%' }
							onClick={ () =>
								setAttributes( {
									inputSizeType: '%',
								} )
							}
						>
							{ '%' }
						</Button>
					</ButtonGroup>
					<RangeControl
						label={ __(
							'Input Width',
							'ultimate-addons-for-gutenberg'
						) }
						value={ inputSize }
						onChange={ ( value ) =>
							setAttributes( {
								inputSize: value,
							} )
						}
						min={ 0 }
						max={ 'px' === inputSizeType ? 500 : 100 }
					/>
				</>
			</PanelBody>
		);
	};

	const inputSettings = () => {
		return (
			<PanelBody
				title={ __( 'Input Box', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
				className="uagb__url-panel-body"
			>
				<p className="uagb-setting-label">
					{ __( 'Text Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: textColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ textColor }
					onChange={ ( value ) =>
						setAttributes( {
							textColor: value,
						} )
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
							style={ {
								backgroundColor: inputBgColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ inputBgColor }
					onChange={ ( value ) =>
						setAttributes( {
							inputBgColor: value,
						} )
					}
					allowReset
				/>
				<hr />
				<h2>{ __( 'Border', 'ultimate-addons-for-gutenberg' ) }</h2>
				<SelectControl
					label={ __( 'Style', 'ultimate-addons-for-gutenberg' ) }
					value={ borderStyle }
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
							value: 'dotted',
							label: __(
								'Dotted',
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
							value: 'double',
							label: __(
								'Double',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) => {
						setAttributes( {
							borderStyle: value,
						} );
					} }
				/>
				{ 'none' !== borderStyle && (
					<>
						<RangeControl
							label={ __(
								'Thickness (px)',
								'ultimate-addons-for-gutenberg'
							) }
							value={ borderWidth }
							onChange={ ( value ) => {
								setAttributes( {
									borderWidth: value,
								} );
							} }
							min={ 0 }
							max={ 20 }
						/>
						<RangeControl
							label={ __(
								'Rounded Corners (px)',
								'ultimate-addons-for-gutenberg'
							) }
							value={ borderRadius }
							onChange={ ( value ) => {
								setAttributes( {
									borderRadius: value,
								} );
							} }
							min={ 0 }
							max={ 50 }
						/>
						<p className="uagb-setting-label">
							{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: borderColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ borderColor }
							onChange={ ( value ) =>
								setAttributes( {
									borderColor: value,
								} )
							}
							allowReset
						/>
					</>
				) }
				<hr />
				<ColumnResponsive />
				{ 'Desktop' === deviceType && (
					<>
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
								isPrimary={ inputPaddingTypeDesktop === 'px' }
								aria-pressed={
									inputPaddingTypeDesktop === 'px'
								}
								onClick={ () =>
									setAttributes( {
										inputPaddingTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ inputPaddingTypeDesktop === '%' }
								aria-pressed={ inputPaddingTypeDesktop === '%' }
								onClick={ () =>
									setAttributes( {
										inputPaddingTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __( 'Padding', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vinputPaddingDesktop }
							onChange={ ( value ) =>
								setAttributes( {
									vinputPaddingDesktop: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hinputPaddingDesktop }
							onChange={ ( value ) =>
								setAttributes( {
									hinputPaddingDesktop: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</>
				) }
				{ 'Tablet' === deviceType && (
					<>
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
								isPrimary={ inputPaddingTypeDesktop === 'px' }
								aria-pressed={
									inputPaddingTypeDesktop === 'px'
								}
								onClick={ () =>
									setAttributes( {
										inputPaddingTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ inputPaddingTypeDesktop === '%' }
								aria-pressed={ inputPaddingTypeDesktop === '%' }
								onClick={ () =>
									setAttributes( {
										inputPaddingTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __( 'Padding', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vinputPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( {
									vinputPaddingTablet: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hinputPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( {
									hinputPaddingTablet: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</>
				) }
				{ 'Mobile' === deviceType && (
					<>
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
								isPrimary={ inputPaddingTypeDesktop === 'px' }
								aria-pressed={
									inputPaddingTypeDesktop === 'px'
								}
								onClick={ () =>
									setAttributes( {
										inputPaddingTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ inputPaddingTypeDesktop === '%' }
								aria-pressed={ inputPaddingTypeDesktop === '%' }
								onClick={ () =>
									setAttributes( {
										inputPaddingTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __( 'Padding', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vinputPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( {
									vinputPaddingMobile: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hinputPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( {
									hinputPaddingMobile: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</>
				) }
				<hr />
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: inputloadGoogleFonts,
						label: 'inputloadGoogleFonts',
					} }
					fontFamily={ {
						value: inputFontFamily,
						label: 'inputFontFamily',
					} }
					fontWeight={ {
						value: inputFontWeight,
						label: 'inputFontWeight',
					} }
					fontSubset={ {
						value: inputFontSubset,
						label: 'inputFontSubset',
					} }
					fontSizeType={ {
						value: inputFontSizeType,
						label: 'inputFontSizeType',
					} }
					fontSize={ {
						value: inputFontSize,
						label: 'inputFontSize',
					} }
					fontSizeMobile={ {
						value: inputFontSizeMobile,
						label: 'inputFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: inputFontSizeTablet,
						label: 'inputFontSizeTablet',
					} }
					lineHeightType={ {
						value: inputLineHeightType,
						label: 'inputLineHeightType',
					} }
					lineHeight={ {
						value: inputLineHeight,
						label: 'inputLineHeight',
					} }
					lineHeightMobile={ {
						value: inputLineHeightMobile,
						label: 'inputLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: inputLineHeightTablet,
						label: 'inputLineHeightTablet',
					} }
				/>
				<BoxShadowControl
					setAttributes={ setAttributes }
					label={ __(
						'Box Shadow',
						'ultimate-addons-for-gutenberg'
					) }
					boxShadowColor={ {
						value: boxShadowColor,
						label: __( 'Color', 'ultimate-addons-for-gutenberg' ),
					} }
					boxShadowHOffset={ {
						value: boxShadowHOffset,
						label: __(
							'Horizontal',
							'ultimate-addons-for-gutenberg'
						),
					} }
					boxShadowVOffset={ {
						value: boxShadowVOffset,
						label: __(
							'Vertical',
							'ultimate-addons-for-gutenberg'
						),
					} }
					boxShadowBlur={ {
						value: boxShadowBlur,
						label: __( 'Blur', 'ultimate-addons-for-gutenberg' ),
					} }
					boxShadowSpread={ {
						value: boxShadowSpread,
						label: __( 'Spread', 'ultimate-addons-for-gutenberg' ),
					} }
					boxShadowPosition={ {
						value: boxShadowPosition,
						label: __(
							'Position',
							'ultimate-addons-for-gutenberg'
						),
					} }
				/>
			</PanelBody>
		);
	};

	const buttonSettings = () => {
		if ( 'input-button' === layout ) {
			return (
				<PanelBody
					title={ __( 'Button', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<>
						<SelectControl
							label={ __(
								'Type',
								'ultimate-addons-for-gutenberg'
							) }
							value={ buttonType }
							options={ [
								{
									value: 'icon',
									label: __(
										'Icon',
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
							] }
							onChange={ ( value ) => {
								setAttributes( {
									buttonType: value,
								} );
							} }
						/>
						{ 'text' === buttonType && (
							<>
								<TextControl
									label="Text"
									value={ buttonText }
									onChange={ ( value ) => {
										setAttributes( {
											buttonText: value,
										} );
									} }
								/>
								<TypographyControl
									label={ __(
										'Typography',
										'ultimate-addons-for-gutenberg'
									) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									loadGoogleFonts={ {
										value: buttonloadGoogleFonts,
										label: 'buttonloadGoogleFonts',
									} }
									fontFamily={ {
										value: buttonFontFamily,
										label: 'buttonFontFamily',
									} }
									fontWeight={ {
										value: buttonFontWeight,
										label: 'buttonFontWeight',
									} }
									fontSubset={ {
										value: buttonFontSubset,
										label: 'buttonFontSubset',
									} }
									fontSizeType={ {
										value: buttonFontSizeType,
										label: 'buttonFontSizeType',
									} }
									fontSize={ {
										value: buttonFontSize,
										label: 'buttonFontSize',
									} }
									fontSizeMobile={ {
										value: buttonFontSizeMobile,
										label: 'buttonFontSizeMobile',
									} }
									fontSizeTablet={ {
										value: buttonFontSizeTablet,
										label: 'buttonFontSizeTablet',
									} }
									lineHeightType={ {
										value: buttonLineHeightType,
										label: 'buttonLineHeightType',
									} }
									lineHeight={ {
										value: buttonLineHeight,
										label: 'buttonLineHeight',
									} }
									lineHeightMobile={ {
										value: buttonLineHeightMobile,
										label: 'buttonLineHeightMobile',
									} }
									lineHeightTablet={ {
										value: buttonLineHeightTablet,
										label: 'buttonLineHeightTablet',
									} }
								/>
							</>
						) }
						<RangeControl
							label={ __(
								'Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ buttonWidth }
							onChange={ ( value ) => {
								setAttributes( {
									buttonWidth: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<>
							<p className="uagb-setting-label">
								{ __(
									'Background Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: buttonBgColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ buttonBgColor }
								onChange={ ( value ) =>
									setAttributes( {
										buttonBgColor: value,
									} )
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
										style={ {
											backgroundColor: buttonBgHoverColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ buttonBgHoverColor }
								onChange={ ( value ) =>
									setAttributes( {
										buttonBgHoverColor: value,
									} )
								}
								allowReset
							/>
							{ 'text' === buttonType && (
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
													backgroundColor: buttonTextColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ buttonTextColor }
										onChange={ ( value ) =>
											setAttributes( {
												buttonTextColor: value,
											} )
										}
										allowReset
									/>
									<p className="uagb-setting-label">
										{ __(
											'Text Hover Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: buttonTextHoverColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ buttonTextHoverColor }
										onChange={ ( value ) =>
											setAttributes( {
												buttonTextHoverColor: value,
											} )
										}
										allowReset
									/>
								</>
							) }
						</>
						{ 'icon' === buttonType && (
							<>
								<hr className="uagb-editor__separator" />
								<h2>
									{ __(
										'Icon',
										'ultimate-addons-for-gutenberg'
									) }
								</h2>
								<RangeControl
									label={ __(
										'Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ buttonIconSize }
									onChange={ ( value ) => {
										setAttributes( {
											buttonIconSize: value,
										} );
									} }
									min={ 0 }
									max={ 500 }
								/>
								<p className="uagb-setting-label">
									{ __(
										'Color',
										'ultimate-addons-for-gutenberg'
									) }
									<span className="components-base-control__label">
										<span
											className="component-color-indicator"
											style={ {
												backgroundColor: buttonIconColor,
											} }
										></span>
									</span>
								</p>
								<ColorPalette
									value={ buttonIconColor }
									onChange={ ( value ) =>
										setAttributes( {
											buttonIconColor: value,
										} )
									}
									allowReset
								/>
								<p className="uagb-setting-label">
									{ __(
										'Hover Color',
										'ultimate-addons-for-gutenberg'
									) }
									<span className="components-base-control__label">
										<span
											className="component-color-indicator"
											style={ {
												backgroundColor: buttonIconHoverColor,
											} }
										></span>
									</span>
								</p>
								<ColorPalette
									value={ buttonIconHoverColor }
									onChange={ ( value ) =>
										setAttributes( {
											buttonIconHoverColor: value,
										} )
									}
									allowReset
								/>
							</>
						) }
					</>
				</PanelBody>
			);
		}

		return '';
	};

	const iconSettings = () => {
		if ( 'input' === layout ) {
			return (
				<PanelBody
					title={ __( 'Icon', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<>
						<RangeControl
							label={ __(
								'Size',
								'ultimate-addons-for-gutenberg'
							) }
							value={ iconSize }
							onChange={ ( value ) => {
								setAttributes( {
									iconSize: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<p className="uagb-setting-label">
							{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
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
							onChange={ ( value ) =>
								setAttributes( {
									iconColor: value,
								} )
							}
							allowReset
						/>
					</>
				</PanelBody>
			);
		}

		return '';
	};

	let loadInputGoogleFonts;

	if ( inputloadGoogleFonts == true ) {
		const qconfig = {
			google: {
				families: [
					inputFontFamily +
						( inputFontWeight ? ':' + inputFontWeight : '' ),
				],
			},
		};
		loadInputGoogleFonts = (
			<WebfontLoader config={ qconfig }></WebfontLoader>
		);
	}

	let loadButtonGoogleFonts;

	if ( buttonloadGoogleFonts == true ) {
		const qconfig = {
			google: {
				families: [
					buttonFontFamily +
						( buttonFontWeight ? ':' + buttonFontWeight : '' ),
				],
			},
		};
		loadButtonGoogleFonts = (
			<WebfontLoader config={ qconfig }></WebfontLoader>
		);
	}

	return (
		<>
			<InspectorControls>
				{ generalSettings() }
				{ inputSettings() }
				{ buttonSettings() }
				{ iconSettings() }
			</InspectorControls>
			{ loadInputGoogleFonts }
			{ loadButtonGoogleFonts }
		</>
	);
};

export default React.memo( Settings );
