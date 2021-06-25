import React, { Suspense } from 'react';
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';

import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	ToggleControl,
	TabPanel,
	ButtonGroup,
	TextareaControl,
	CheckboxControl,
	ExternalLink,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;
	const {
		formLabel,
		buttonAlign,
		buttonSize,
		confirmationType,
		confirmationMessage,
		failedMessage,
		confirmationUrl,
		sendAfterSubmitEmail,
		afterSubmitToEmail,
		afterSubmitCcEmail,
		afterSubmitBccEmail,
		afterSubmitEmailSubject,
		submitColor,
		submitColorHover,
		submitBgColor,
		submitBgColorHover,
		submitborderStyle,
		submitborderWidth,
		submitborderRadius,
		submitborderColor,
		submitborderHoverColor,
		vPaddingSubmit,
		hPaddingSubmit,
		submitTextloadGoogleFonts,
		submitTextFontFamily,
		submitTextFontWeight,
		submitTextFontSubset,
		submitTextFontSize,
		submitTextFontSizeType,
		submitTextFontSizeTablet,
		submitTextFontSizeMobile,
		submitTextLineHeightType,
		submitTextLineHeight,
		submitTextLineHeightTablet,
		submitTextLineHeightMobile,
		labelloadGoogleFonts,
		labelFontFamily,
		labelFontWeight,
		labelFontSubset,
		labelFontSize,
		labelFontSizeType,
		labelFontSizeTablet,
		labelFontSizeMobile,
		labelLineHeightType,
		labelLineHeight,
		labelLineHeightTablet,
		labelLineHeightMobile,
		inputloadGoogleFonts,
		inputFontFamily,
		inputFontWeight,
		inputFontSubset,
		inputFontSize,
		inputFontSizeType,
		inputFontSizeTablet,
		inputFontSizeMobile,
		inputLineHeightType,
		inputLineHeight,
		inputLineHeightTablet,
		inputLineHeightMobile,
		toggleSize,
		toggleWidthSize,
		toggleHeightSize,
		toggleActiveColor,
		labelColor,
		inputColor,
		bgColor,
		inputplaceholderColor,
		inputactiveColor,
		inputborderStyle,
		inputborderWidth,
		inputborderRadius,
		inputborderColor,
		inputborderHoverColor,
		vPaddingField,
		hPaddingField,
		fieldGap,
		formStyle,
		overallAlignment,
		reCaptchaEnable,
		reCaptchaType,
		reCaptchaSecretKeyV2,
		reCaptchaSiteKeyV2,
		reCaptchaSecretKeyV3,
		reCaptchaSiteKeyV3,
		hidereCaptchaBatch,
		successMessageTextColor,
		successMessageBGColor,
		successMessageBorderColor,
		successMessageBorderStyle,
		successMessageBorderWidth,
		failedMessageTextColor,
		failedMessageBorderColor,
		failedMessageBorderStyle,
		failedMessageBorderWidth,
		failedMessageBGColor,
	} = attributes;

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<TextControl
					label={ __(
						'Hidden Field Label',
						'ultimate-addons-for-gutenberg'
					) }
					value={ formLabel }
					onChange={ ( value ) =>
						setAttributes( {
							formLabel: value,
						} )
					}
				/>
				<SelectControl
					label={ __( 'Style', 'ultimate-addons-for-gutenberg' ) }
					value={ formStyle }
					onChange={ ( value ) =>
						setAttributes( {
							formStyle: value,
						} )
					}
					options={ [
						{
							value: 'boxed',
							label: __(
								'Boxed',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'underlined',
							label: __(
								'Underlined',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				<h2>
					{ ' ' }
					{ __(
						'Overall Alignment',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<Button
					key={ 'left' }
					icon="editor-alignleft"
					label={ __( 'Left', 'ultimate-addons-for-gutenberg' ) }
					onClick={ () =>
						setAttributes( {
							overallAlignment: 'left',
						} )
					}
					aria-pressed={ 'left' === overallAlignment }
					isPrimary={ 'left' === overallAlignment }
				/>
				<Button
					key={ 'center' }
					icon="editor-aligncenter"
					label={ __( 'Right', 'ultimate-addons-for-gutenberg' ) }
					onClick={ () =>
						setAttributes( {
							overallAlignment: 'center',
						} )
					}
					aria-pressed={ 'center' === overallAlignment }
					isPrimary={ 'center' === overallAlignment }
				/>
				<Button
					key={ 'right' }
					icon="editor-alignright"
					label={ __( 'Right', 'ultimate-addons-for-gutenberg' ) }
					onClick={ () =>
						setAttributes( {
							overallAlignment: 'right',
						} )
					}
					aria-pressed={ 'right' === overallAlignment }
					isPrimary={ 'right' === overallAlignment }
				/>
				<h2>
					{ ' ' }
					{ __(
						'Confirmation Type',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<ButtonGroup
					className="uagb-forms-button-group"
					aria-label={ __(
						'Confirmation Type',
						'ultimate-addons-for-gutenberg'
					) }
				>
					<Button
						key={ 'message' }
						isSmall
						isPrimary={ confirmationType === 'message' }
						aria-pressed={ confirmationType === 'message' }
						onClick={ () =>
							setAttributes( {
								confirmationType: 'message',
							} )
						}
					>
						{ __( 'Message', 'ultimate-addons-for-gutenberg' ) }
					</Button>

					<Button
						key={ 'url' }
						isSmall
						isPrimary={ confirmationType === 'url' }
						aria-pressed={ confirmationType === 'url' }
						onClick={ () =>
							setAttributes( {
								confirmationType: 'url',
							} )
						}
					>
						{ __( 'URL', 'ultimate-addons-for-gutenberg' ) }
					</Button>
				</ButtonGroup>
				{ 'message' === confirmationType && (
					<>
						<PanelBody
							title={ __(
								'Success Message',
								'ultimate-addons-for-gutenberg'
							) }
							initialOpen={ false }
							className="uagb__url-panel-body"
						>
							<TextareaControl
								label="Success Message Text"
								help={ __(
									'Enter a message you want to display after successfull form submission',
									'ultimate-addons-for-gutenberg'
								) }
								value={ confirmationMessage }
								onChange={ ( value ) =>
									setAttributes( {
										confirmationMessage: value,
									} )
								}
							/>
							<p className="uagb-setting-label">
								{ __(
									'Text Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											Color: successMessageTextColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ successMessageTextColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										successMessageTextColor: colorValue,
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
											backgroundColor: successMessageBGColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ successMessageBGColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										successMessageBGColor: colorValue,
									} )
								}
								allowReset
							/>
							<SelectControl
								label={ __(
									'Border Style',
									'ultimate-addons-for-gutenberg'
								) }
								value={ successMessageBorderStyle }
								onChange={ ( value ) =>
									setAttributes( {
										successMessageBorderStyle: value,
									} )
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
									{
										value: 'groove',
										label: __(
											'Groove',
											'ultimate-addons-for-gutenberg'
										),
									},
									{
										value: 'inset',
										label: __(
											'Inset',
											'ultimate-addons-for-gutenberg'
										),
									},
									{
										value: 'outset',
										label: __(
											'Outset',
											'ultimate-addons-for-gutenberg'
										),
									},
									{
										value: 'ridge',
										label: __(
											'Ridge',
											'ultimate-addons-for-gutenberg'
										),
									},
								] }
							/>
							<RangeControl
								label={ __(
									'Border Width',
									'ultimate-addons-for-gutenberg'
								) }
								value={ successMessageBorderWidth }
								onChange={ ( value ) =>
									setAttributes( {
										successMessageBorderWidth: value,
									} )
								}
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<p className="uagb-setting-label">
								{ __(
									'Border Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: successMessageBorderColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ successMessageBorderColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										successMessageBorderColor: colorValue,
									} )
								}
								allowReset
							/>
						</PanelBody>
						<PanelBody
							title={ __(
								'Error Message ',
								'ultimate-addons-for-gutenberg'
							) }
							initialOpen={ false }
							className="uagb__url-panel-body"
						>
							<TextareaControl
								label="Error Message Text"
								help={ __(
									'Enter a message you want to display after unsuccessfull form submission',
									'ultimate-addons-for-gutenberg'
								) }
								value={ failedMessage }
								onChange={ ( value ) =>
									setAttributes( {
										failedMessage: value,
									} )
								}
							/>
							<p className="uagb-setting-label">
								{ __(
									'Text Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: failedMessageTextColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ failedMessageTextColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										failedMessageTextColor: colorValue,
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
											backgroundColor: failedMessageBGColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ failedMessageBGColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										failedMessageBGColor: colorValue,
									} )
								}
								allowReset
							/>
							<SelectControl
								label={ __(
									'Border Style',
									'ultimate-addons-for-gutenberg'
								) }
								value={ failedMessageBorderStyle }
								onChange={ ( value ) =>
									setAttributes( {
										failedMessageBorderStyle: value,
									} )
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
									{
										value: 'groove',
										label: __(
											'Groove',
											'ultimate-addons-for-gutenberg'
										),
									},
									{
										value: 'inset',
										label: __(
											'Inset',
											'ultimate-addons-for-gutenberg'
										),
									},
									{
										value: 'outset',
										label: __(
											'Outset',
											'ultimate-addons-for-gutenberg'
										),
									},
									{
										value: 'ridge',
										label: __(
											'Ridge',
											'ultimate-addons-for-gutenberg'
										),
									},
								] }
							/>
							<RangeControl
								label={ __(
									'Border Width',
									'ultimate-addons-for-gutenberg'
								) }
								value={ failedMessageBorderWidth }
								onChange={ ( value ) =>
									setAttributes( {
										failedMessageBorderWidth: value,
									} )
								}
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<p className="uagb-setting-label">
								{ __(
									'Border Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: failedMessageBorderColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ failedMessageBorderColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										failedMessageBorderColor: colorValue,
									} )
								}
								allowReset
							/>
						</PanelBody>
					</>
				) }
				{ 'url' === confirmationType && (
					<TextControl
						label={ __(
							'Success Redirect URL',
							'ultimate-addons-for-gutenberg'
						) }
						help={ __(
							'Enter a URL you want to redirect your page to after form Submission',
							'ultimate-addons-for-gutenberg'
						) }
						value={ confirmationUrl }
						onChange={ ( value ) =>
							setAttributes( {
								confirmationUrl: value,
							} )
						}
					/>
				) }
			</PanelBody>
		);
	};

	const submitButtonSettings = () => {
		return (
			<PanelBody
				title={ __( 'Submit Button', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
				className="uagb__url-panel-body"
			>
				<>
					<SelectControl
						label={ __(
							'Button Size',
							'ultimate-addons-for-gutenberg'
						) }
						value={ buttonSize }
						onChange={ ( value ) =>
							setAttributes( {
								buttonSize: value,
							} )
						}
						options={ [
							{
								value: 'small',
								label: __(
									'Small',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'medium',
								label: __(
									'Medium',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'large',
								label: __(
									'Large',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'extralarge',
								label: __(
									'Extra Large',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'full',
								label: __(
									'Full',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					<h2>
						{ ' ' }
						{ __(
							'Button Alignment',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<Button
						key={ 'left' }
						icon="editor-alignleft"
						label={ __( 'Left', 'ultimate-addons-for-gutenberg' ) }
						onClick={ () =>
							setAttributes( {
								buttonAlign: 'left',
							} )
						}
						aria-pressed={ 'left' === buttonAlign }
						isPrimary={ 'left' === buttonAlign }
					/>
					<Button
						key={ 'center' }
						icon="editor-aligncenter"
						label={ __( 'Right', 'ultimate-addons-for-gutenberg' ) }
						onClick={ () =>
							setAttributes( {
								buttonAlign: 'center',
							} )
						}
						aria-pressed={ 'center' === buttonAlign }
						isPrimary={ 'center' === buttonAlign }
					/>
					<Button
						key={ 'right' }
						icon="editor-alignright"
						label={ __( 'Right', 'ultimate-addons-for-gutenberg' ) }
						onClick={ () =>
							setAttributes( {
								buttonAlign: 'right',
							} )
						}
						aria-pressed={ 'right' === buttonAlign }
						isPrimary={ 'right' === buttonAlign }
					/>
					<h2>
						{ __(
							'Button Padding',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ 'uagb-padding-control submit-btn-control' }
						value={ vPaddingSubmit }
						onChange={ ( value ) =>
							setAttributes( {
								vPaddingSubmit: value,
							} )
						}
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ 'uagb-padding-control submit-btn-control' }
						value={ hPaddingSubmit }
						onChange={ ( value ) =>
							setAttributes( {
								hPaddingSubmit: value,
							} )
						}
						min={ 0 }
						max={ 100 }
					/>
				</>
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
						let tabout_submitColor;

						if ( 'normal' === tabName.name ) {
							tabout_submitColor = (
								<>
									<p className="uagb-setting-label">
										{ __(
											'Submit Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: submitColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ submitColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												submitColor: colorValue,
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
													backgroundColor: submitBgColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ submitBgColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												submitBgColor: colorValue,
											} )
										}
										allowReset
									/>
								</>
							);
						} else {
							tabout_submitColor = (
								<>
									<p className="uagb-setting-label">
										{ __(
											'Submit Hover Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: submitColorHover,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ submitColorHover }
										onChange={ ( colorValue ) =>
											setAttributes( {
												submitColorHover: colorValue,
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
													backgroundColor: submitBgColorHover,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ submitBgColorHover }
										onChange={ ( colorValue ) =>
											setAttributes( {
												submitBgColorHover: colorValue,
											} )
										}
										allowReset
									/>
								</>
							);
						}

						return <div>{ tabout_submitColor }</div>;
					} }
				</TabPanel>
				<SelectControl
					label={ __(
						'Border Style',
						'ultimate-addons-for-gutenberg'
					) }
					value={ submitborderStyle }
					onChange={ ( value ) =>
						setAttributes( {
							submitborderStyle: value,
						} )
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
						{
							value: 'groove',
							label: __(
								'Groove',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'inset',
							label: __(
								'Inset',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'outset',
							label: __(
								'Outset',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'ridge',
							label: __(
								'Ridge',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'none' != submitborderStyle && (
					<>
						<RangeControl
							label={ __(
								'Border Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ submitborderWidth }
							onChange={ ( value ) =>
								setAttributes( {
									submitborderWidth: value,
								} )
							}
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<RangeControl
							label={ __(
								'Border Radius',
								'ultimate-addons-for-gutenberg'
							) }
							value={ submitborderRadius }
							onChange={ ( value ) =>
								setAttributes( {
									submitborderRadius: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<p className="uagb-setting-label">
							{ __(
								'Border Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: submitborderColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ submitborderColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									submitborderColor: colorValue,
								} )
							}
							allowReset
						/>
						<p className="uagb-setting-label">
							{ __(
								'Border Hover Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: submitborderHoverColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ submitborderHoverColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									submitborderHoverColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }
				<Suspense fallback={ lazyLoader() }>
					<TypographyControl
						label={ __(
							'Typography',
							'ultimate-addons-for-gutenberg'
						) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: submitTextloadGoogleFonts,
							label: __(
								'submitTextloadGoogleFonts',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontFamily={ {
							value: submitTextFontFamily,
							label: __(
								'submitTextFontFamily',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontWeight={ {
							value: submitTextFontWeight,
							label: __(
								'submitTextFontWeight',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSubset={ {
							value: submitTextFontSubset,
							label: __(
								'submitTextFontSubset',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeType={ {
							value: submitTextFontSizeType,
							label: __(
								'submitTextFontSizeType',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSize={ {
							value: submitTextFontSize,
							label: __(
								'submitTextFontSize',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeMobile={ {
							value: submitTextFontSizeMobile,
							label: __(
								'submitTextFontSizeMobile',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeTablet={ {
							value: submitTextFontSizeTablet,
							label: __(
								'submitTextFontSizeTablet',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightType={ {
							value: submitTextLineHeightType,
							label: __(
								'submitTextLineHeightType',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeight={ {
							value: submitTextLineHeight,
							label: __(
								'submitTextLineHeight',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightMobile={ {
							value: submitTextLineHeightMobile,
							label: __(
								'submitTextLineHeightMobile',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightTablet={ {
							value: submitTextLineHeightTablet,
							label: __(
								'submitTextLineHeightTablet',
								'ultimate-addons-for-gutenberg'
							),
						} }
					/>
				</Suspense>
			</PanelBody>
		);
	};

	const afterSubmitActions = () => {
		return (
			<PanelBody
				title={ __( 'After Submit Actions' ) }
				initialOpen={ false }
				className="uagb__url-panel-body"
			>
				<CheckboxControl
					label="Email"
					checked={ sendAfterSubmitEmail }
					onChange={ ( value ) =>
						setAttributes( {
							sendAfterSubmitEmail: value,
						} )
					}
				/>
				{ true === sendAfterSubmitEmail && (
					<>
						<TabPanel
							className="uagb-size-type-field-tabs components-base-control uagb-size-type-field__common-tabs uagb-inline-margin uagb-email-controls-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'to',
									title: 'To',
									className:
										'uagb-desktop-tab uagb-responsive-tabs',
								},
								{
									name: 'cc',
									title: 'CC',
									className:
										'uagb-tablet-tab uagb-responsive-tabs',
								},
								{
									name: 'bcc',
									title: 'BCC',
									className:
										'uagb-mobile-tab uagb-responsive-tabs',
								},
							] }
						>
							{ ( tab ) => {
								let tabout;

								if ( 'to' === tab.name ) {
									tabout = (
										<TextControl
											label={ __(
												'To',
												'ultimate-addons-for-gutenberg'
											) }
											placeholder={ __(
												'Email',
												'ultimate-addons-for-gutenberg'
											) }
											value={ afterSubmitToEmail }
											onChange={ ( value ) =>
												setAttributes( {
													afterSubmitToEmail: value,
												} )
											}
										/>
									);
								} else if ( 'cc' === tab.name ) {
									tabout = (
										<TextControl
											label={ __(
												'CC',
												'ultimate-addons-for-gutenberg'
											) }
											placeholder={ __(
												'Email',
												'ultimate-addons-for-gutenberg'
											) }
											value={ afterSubmitCcEmail }
											onChange={ ( value ) =>
												setAttributes( {
													afterSubmitCcEmail: value,
												} )
											}
										/>
									);
								} else {
									tabout = (
										<TextControl
											label={ __(
												'BCC',
												'ultimate-addons-for-gutenberg'
											) }
											placeholder={ __(
												'Email',
												'ultimate-addons-for-gutenberg'
											) }
											value={ afterSubmitBccEmail }
											onChange={ ( value ) =>
												setAttributes( {
													afterSubmitBccEmail: value,
												} )
											}
										/>
									);
								}

								return (
									<div className="uagb-form-emailto">
										{ tabout }
									</div>
								);
							} }
						</TabPanel>
						<TextControl
							label={ __(
								'Subject',
								'ultimate-addons-for-gutenberg'
							) }
							placeholder={ __(
								'Subject',
								'ultimate-addons-for-gutenberg'
							) }
							value={ afterSubmitEmailSubject }
							onChange={ ( value ) =>
								setAttributes( {
									afterSubmitEmailSubject: value,
								} )
							}
						/>
					</>
				) }
			</PanelBody>
		);
	};

	const designSettings = () => {
		return (
			<PanelBody
				title={ __( 'Design', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
				className="uagb__url-panel-body"
			>
				<Suspense fallback={ lazyLoader() }>
					<TypographyControl
						label={ __(
							'Label Typography',
							'ultimate-addons-for-gutenberg'
						) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: labelloadGoogleFonts,
							label: __(
								'labelloadGoogleFonts',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontFamily={ {
							value: labelFontFamily,
							label: __(
								'labelFontFamily',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontWeight={ {
							value: labelFontWeight,
							label: __(
								'labelFontWeight',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSubset={ {
							value: labelFontSubset,
							label: __(
								'labelFontSubset',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeType={ {
							value: labelFontSizeType,
							label: __(
								'labelFontSizeType',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSize={ {
							value: labelFontSize,
							label: __(
								'labelFontSize',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeMobile={ {
							value: labelFontSizeMobile,
							label: __(
								'labelFontSizeMobile',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeTablet={ {
							value: labelFontSizeTablet,
							label: __(
								'labelFontSizeTablet',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightType={ {
							value: labelLineHeightType,
							label: __(
								'labelLineHeightType',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeight={ {
							value: labelLineHeight,
							label: __(
								'labelLineHeight',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightMobile={ {
							value: labelLineHeightMobile,
							label: __(
								'labelLineHeightMobile',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightTablet={ {
							value: labelLineHeightTablet,
							label: __(
								'labelLineHeightTablet',
								'ultimate-addons-for-gutenberg'
							),
						} }
					/>
					<TypographyControl
						label={ __(
							'Input Typography',
							'ultimate-addons-for-gutenberg'
						) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: inputloadGoogleFonts,
							label: __(
								'inputloadGoogleFonts',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontFamily={ {
							value: inputFontFamily,
							label: __(
								'inputFontFamily',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontWeight={ {
							value: inputFontWeight,
							label: __(
								'inputFontWeight',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSubset={ {
							value: inputFontSubset,
							label: __(
								'inputFontSubset',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeType={ {
							value: inputFontSizeType,
							label: __(
								'inputFontSizeType',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSize={ {
							value: inputFontSize,
							label: __(
								'inputFontSize',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeMobile={ {
							value: inputFontSizeMobile,
							label: __(
								'inputFontSizeMobile',
								'ultimate-addons-for-gutenberg'
							),
						} }
						fontSizeTablet={ {
							value: inputFontSizeTablet,
							label: __(
								'inputFontSizeTablet',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightType={ {
							value: inputLineHeightType,
							label: __(
								'inputLineHeightType',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeight={ {
							value: inputLineHeight,
							label: __(
								'inputLineHeight',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightMobile={ {
							value: inputLineHeightMobile,
							label: __(
								'inputLineHeightMobile',
								'ultimate-addons-for-gutenberg'
							),
						} }
						lineHeightTablet={ {
							value: inputLineHeightTablet,
							label: __(
								'inputLineHeightTablet',
								'ultimate-addons-for-gutenberg'
							),
						} }
					/>
				</Suspense>
				<RangeControl
					label={ __(
						'Checkbox/Radio Size',
						'ultimate-addons-for-gutenberg'
					) }
					value={ toggleSize }
					onChange={ ( value ) =>
						setAttributes( {
							toggleSize: value,
						} )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Toggle Width',
						'ultimate-addons-for-gutenberg'
					) }
					value={ toggleWidthSize }
					onChange={ ( value ) =>
						setAttributes( {
							toggleWidthSize: value,
						} )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Toggle Height',
						'ultimate-addons-for-gutenberg'
					) }
					value={ toggleHeightSize }
					onChange={ ( value ) =>
						setAttributes( {
							toggleHeightSize: value,
						} )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Toggle Active Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: toggleActiveColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ toggleActiveColor }
					onChange={ ( colorValue ) =>
						setAttributes( {
							toggleActiveColor: colorValue,
						} )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __( 'Label Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: labelColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ labelColor }
					onChange={ ( colorValue ) =>
						setAttributes( {
							labelColor: colorValue,
						} )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __( 'Input Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: inputColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ inputColor }
					onChange={ ( colorValue ) =>
						setAttributes( {
							inputColor: colorValue,
						} )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Field Background Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: bgColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ bgColor }
					onChange={ ( colorValue ) =>
						setAttributes( {
							bgColor: colorValue,
						} )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Field Placeholder Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: inputplaceholderColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ inputplaceholderColor }
					onChange={ ( colorValue ) =>
						setAttributes( {
							inputplaceholderColor: colorValue,
						} )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Field Active Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ {
								backgroundColor: inputactiveColor,
							} }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ inputactiveColor }
					onChange={ ( colorValue ) =>
						setAttributes( {
							inputactiveColor: colorValue,
						} )
					}
					allowReset
				/>

				<SelectControl
					label={ __(
						'Border Style',
						'ultimate-addons-for-gutenberg'
					) }
					value={ inputborderStyle }
					onChange={ ( value ) =>
						setAttributes( {
							inputborderStyle: value,
						} )
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
						{
							value: 'groove',
							label: __(
								'Groove',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'inset',
							label: __(
								'Inset',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'outset',
							label: __(
								'Outset',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'ridge',
							label: __(
								'Ridge',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'none' != inputborderStyle && (
					<>
						<RangeControl
							label={ __(
								'Border Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ inputborderWidth }
							onChange={ ( value ) =>
								setAttributes( {
									inputborderWidth: value,
								} )
							}
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						{ 'boxed' == formStyle && (
							<RangeControl
								label={ __(
									'Border Radius',
									'ultimate-addons-for-gutenberg'
								) }
								value={ inputborderRadius }
								onChange={ ( value ) =>
									setAttributes( {
										inputborderRadius: value,
									} )
								}
								min={ 0 }
								max={ 100 }
								allowReset
							/>
						) }
						<p className="uagb-setting-label">
							{ __(
								'Border Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: inputborderColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ inputborderColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									inputborderColor: colorValue,
								} )
							}
							allowReset
						/>
						<p className="uagb-setting-label">
							{ __(
								'Border Hover Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: inputborderHoverColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ inputborderHoverColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									inputborderHoverColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }

				<RangeControl
					label={ __(
						'Spacing between fields (px)',
						'ultimate-addons-for-gutenberg'
					) }
					className={ 'uagb-padding-control' }
					value={ fieldGap }
					onChange={ ( value ) =>
						setAttributes( {
							fieldGap: value,
						} )
					}
					min={ 0 }
					max={ 100 }
				/>
				<h2>
					{ __(
						'Field Padding (px)',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ 'uagb-padding-control' }
					value={ vPaddingField }
					onChange={ ( value ) =>
						setAttributes( {
							vPaddingField: value,
						} )
					}
					min={ 0 }
					max={ 100 }
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ 'uagb-padding-control' }
					value={ hPaddingField }
					onChange={ ( value ) =>
						setAttributes( {
							hPaddingField: value,
						} )
					}
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>
		);
	};

	const googleReCaptcha = () => {
		return (
			<PanelBody
				title={ __(
					'Google reCAPTCHA',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ false }
			>
				<p className="uagb-form-notice">
					{ __(
						'P.S. Note that If you are using two forms on the same page with the different reCAPTCHA versions (V2 checkbox and V3), it will create conflicts between the versions. Kindly avoid using different versions on same page. ',
						'ultimate-addons-for-gutenberg'
					) }
				</p>

				<ToggleControl
					label={ __(
						'Enable reCAPTCHA ',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ reCaptchaEnable }
					onChange={ () =>
						setAttributes( {
							reCaptchaEnable: ! reCaptchaEnable,
						} )
					}
				/>
				{ reCaptchaEnable && (
					<SelectControl
						label={ __(
							'Select Version',
							'ultimate-addons-for-gutenberg'
						) }
						value={ reCaptchaType }
						onChange={ ( value ) =>
							setAttributes( {
								reCaptchaType: value,
							} )
						}
						options={ [
							{
								value: 'v2',
								label: __(
									'V2',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'v3',
								label: __(
									'V3',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
				) }
				{ reCaptchaEnable && 'v2' === reCaptchaType && (
					<>
						<TextControl
							label={ __(
								'Site Key',
								'ultimate-addons-for-gutenberg'
							) }
							value={ reCaptchaSiteKeyV2 }
							onChange={ ( value ) =>
								setAttributes( {
									reCaptchaSiteKeyV2: value,
								} )
							}
							placeholder={ __(
								'Enter v2 Keys',
								'ultimate-addons-for-gutenberg'
							) }
						/>
						<TextControl
							label={ __(
								'Secret Key',
								'ultimate-addons-for-gutenberg'
							) }
							value={ reCaptchaSecretKeyV2 }
							onChange={ ( value ) =>
								setAttributes( {
									reCaptchaSecretKeyV2: value,
								} )
							}
							placeholder={ __(
								'Enter v2 Keys',
								'ultimate-addons-for-gutenberg'
							) }
						/>
					</>
				) }
				{ reCaptchaEnable && 'v3' === reCaptchaType && (
					<>
						<TextControl
							label={ __(
								'Site Key',
								'ultimate-addons-for-gutenberg'
							) }
							value={ reCaptchaSiteKeyV3 }
							onChange={ ( value ) =>
								setAttributes( {
									reCaptchaSiteKeyV3: value,
								} )
							}
							placeholder={ __(
								'Enter v3 Keys',
								'ultimate-addons-for-gutenberg'
							) }
						/>
						<TextControl
							label={ __(
								'Secret Key',
								'ultimate-addons-for-gutenberg'
							) }
							value={ reCaptchaSecretKeyV3 }
							onChange={ ( value ) =>
								setAttributes( {
									reCaptchaSecretKeyV3: value,
								} )
							}
							placeholder={ __(
								'Enter v3 Keys',
								'ultimate-addons-for-gutenberg'
							) }
						/>
						<ToggleControl
							label={ __(
								'Hide reCAPTCHA Badge',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ hidereCaptchaBatch }
							onChange={ () =>
								setAttributes( {
									hidereCaptchaBatch: ! hidereCaptchaBatch,
								} )
							}
						/>
					</>
				) }
				<h2> { __( 'Know More', 'ultimate-addons-for-gutenberg' ) }</h2>
				<ExternalLink href="https://www.google.com/recaptcha/admin/create">
					{ __( 'Get Keys', 'ultimate-addons-for-gutenberg' ) }
				</ExternalLink>
				<ExternalLink href="https://developers.google.com/recaptcha/intro">
					{ __(
						' | Documentation',
						'ultimate-addons-for-gutenberg'
					) }
				</ExternalLink>
			</PanelBody>
		);
	};

	let loadsubmittextGoogleFonts;

	if ( submitTextloadGoogleFonts == true ) {
		const qconfig = {
			google: {
				families: [
					submitTextFontFamily +
						( submitTextFontWeight
							? ':' + submitTextFontWeight
							: '' ),
				],
			},
		};
		loadsubmittextGoogleFonts = (
			<WebfontLoader config={ qconfig }></WebfontLoader>
		);
	}

	let loadlabelGoogleFonts;

	if ( labelloadGoogleFonts == true ) {
		const qconfig = {
			google: {
				families: [
					labelFontFamily +
						( labelFontWeight ? ':' + labelFontWeight : '' ),
				],
			},
		};
		loadlabelGoogleFonts = (
			<WebfontLoader config={ qconfig }></WebfontLoader>
		);
	}

	let loadinputGoogleFonts;

	if ( inputloadGoogleFonts == true ) {
		const qconfig = {
			google: {
				families: [
					inputFontFamily +
						( inputFontWeight ? ':' + inputFontWeight : '' ),
				],
			},
		};
		loadinputGoogleFonts = (
			<WebfontLoader config={ qconfig }></WebfontLoader>
		);
	}

	return (
		<>
			<InspectorControls>
				{ generalSettings() }
				{ submitButtonSettings() }
				{ afterSubmitActions() }
				{ designSettings() }
				{ googleReCaptcha() }
			</InspectorControls>
			<Suspense fallback={ lazyLoader() }>
				{ loadsubmittextGoogleFonts }
				{ loadlabelGoogleFonts }
				{ loadinputGoogleFonts }
			</Suspense>
		</>
	);
};

export default React.memo( Settings );
