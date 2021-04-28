/**
 * BLOCK: Forms - Edit
 */

import classnames from "classnames";
import { Fragment } from "react";
import styling from "./styling";
import map from "lodash/map";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography";

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader";

const {
	withSelect,
	useDispatch
} = wp.data;

const {
	compose,
	createHigherOrderComponent,
} = wp.compose;

const {
	Component,
} = wp.element;

const {
	createBlock
} = wp.blocks;

const {
	InnerBlocks,
	RichText,
	InspectorControls,
	ColorPalette,
	__experimentalBlockVariationPicker
} = wp.blockEditor;

const {
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
	withNotices
} = wp.components;

const { __ } = wp.i18n;

const ALLOWED_BLOCKS = [
	"uagb/forms-name",
	"uagb/forms-email",
	"uagb/forms-hidden",
	"uagb/forms-phone",
	"uagb/forms-textarea",
	"uagb/forms-url",
	"uagb/forms-select",
	"uagb/forms-radio",
	"uagb/forms-checkbox",
	"uagb/forms-toggle",
	"uagb/forms-date",
	"uagb/forms-accept",
];

class UAGBFormsEdit extends Component {

	constructor() {
		super( ...arguments );
		this.blockVariationPickerOnSelect = this.blockVariationPickerOnSelect.bind( this );
	}

	onSubmitClick ( e ) {
		e.preventDefault();
	}

	blockVariationPickerOnSelect ( nextVariation = this.props.defaultVariation ) {
			
		if ( nextVariation.attributes ) {
			this.props.setAttributes( nextVariation.attributes );
		}

		if ( nextVariation.innerBlocks ) {
			this.props.replaceInnerBlocks(
				this.props.clientId,
				this.createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	}

	createBlocksFromInnerBlocksTemplate( innerBlocksTemplate ) {
		return map( innerBlocksTemplate, ( [ name, attributes, innerBlocks = [] ] ) => createBlock( name, attributes, this.createBlocksFromInnerBlocksTemplate( innerBlocks ) ) );
	}

	render() {

		const { attributes, setAttributes,variations,hasInnerBlocks } = this.props;

		const {
			block_id,
			submitButtonText,
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


		let loadsubmittextGoogleFonts;

		if ( submitTextloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ submitTextFontFamily + ( submitTextFontWeight ? ":" + submitTextFontWeight : "" ) ],
				},
			};

			loadsubmittextGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			);
		}
		
		let loadlabelGoogleFonts;

		if ( labelloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ labelFontFamily + ( labelFontWeight ? ":" + labelFontWeight : "" ) ],
				},
			};

			loadlabelGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			);
		}
		
		let loadinputGoogleFonts;

		if ( inputloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ inputFontFamily + ( inputFontWeight ? ":" + inputFontWeight : "" ) ],
				},
			};

			loadinputGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			);
		}
		

		const generalSettings = () => {

			return (
				<PanelBody
					title={ __( "General", "ultimate-addons-for-gutenberg"  ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<TextControl
						label={ __( "Hidden Field Label", "ultimate-addons-for-gutenberg"  ) }
						value={ formLabel }
						onChange={ value => setAttributes( { formLabel: value } ) }
					/>
					<SelectControl
						label={ __( "Style" , "ultimate-addons-for-gutenberg" ) }
						value={ formStyle }
						onChange={ ( value ) => setAttributes( { formStyle: value } ) }
						options={ [
							{ value: "boxed", label: __( "Boxed" , "ultimate-addons-for-gutenberg" ) },
							{ value: "underlined", label: __( "Underlined" , "ultimate-addons-for-gutenberg" ) },							
						] }
					/>
					<h2> { __( "Overall Alignment" , "ultimate-addons-for-gutenberg" ) }</h2>
					<Button
						key={ "left" }
						icon="editor-alignleft"
						label={ __( "Left", "ultimate-addons-for-gutenberg" ) }
						onClick={ () => setAttributes( { overallAlignment: "left" } ) }
						aria-pressed={ "left" === overallAlignment }
						isPrimary={ "left" === overallAlignment }
					/>
					<Button
						key={ "center" }
						icon="editor-aligncenter"
						label={ __( "Right", "ultimate-addons-for-gutenberg" ) }
						onClick={ () => setAttributes( { overallAlignment: "center" } ) }
						aria-pressed={ "center" === overallAlignment }
						isPrimary={ "center" === overallAlignment }
					/>
					<Button
						key={ "right" }
						icon="editor-alignright"
						label={ __( "Right", "ultimate-addons-for-gutenberg" ) }
						onClick={ () => setAttributes( { overallAlignment: "right" } ) }
						aria-pressed={ "right" === overallAlignment }
						isPrimary={ "right" === overallAlignment }
					/>
					<h2> { __( "Confirmation Type" , "ultimate-addons-for-gutenberg" ) }</h2>
					<ButtonGroup className="uagb-forms-button-group" aria-label={ __( "Confirmation Type" , "ultimate-addons-for-gutenberg" ) }>
						<Button 
							key={ "message" } 
							isSmall 
							isPrimary={ confirmationType === "message" } 
							aria-pressed={ confirmationType === "message" } 
							onClick={ () => setAttributes( { confirmationType: "message" } ) }
						>
							{ __( "Message" , "ultimate-addons-for-gutenberg" ) }
						</Button>

						<Button 
							key={ "url" } 
							isSmall 
							isPrimary={ confirmationType === "url" } 
							aria-pressed={ confirmationType === "url" } 
							onClick={ () => setAttributes( { confirmationType: "url" } ) }
						>
							{ __( "URL" , "ultimate-addons-for-gutenberg" ) }
						</Button>
					</ButtonGroup>
					{ "message" === confirmationType && 
						<Fragment>
							<PanelBody 
								title={ __( "Success Message" , "ultimate-addons-for-gutenberg"  ) }
								initialOpen={ false }
								className="uagb__url-panel-body">
								<TextareaControl
									label="Success Message Text"
									help={ __( "Enter a message you want to display after successfull form submission" , "ultimate-addons-for-gutenberg" ) }
									value={ confirmationMessage }
									onChange={ ( value ) => setAttributes( { confirmationMessage: value } ) }
								/>
								<p className="uagb-setting-label">{ __( "Text Color" , "ultimate-addons-for-gutenberg"  ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { Color: successMessageTextColor } } ></span></span></p>
								<ColorPalette
									value={ successMessageTextColor }
									onChange={ ( colorValue ) => setAttributes( { successMessageTextColor: colorValue } ) }
									allowReset
								/>
								<p className="uagb-setting-label">{ __( "Background Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: successMessageBGColor } } ></span></span></p>
								<ColorPalette
									value={ successMessageBGColor }
									onChange={ ( colorValue ) => setAttributes( { successMessageBGColor: colorValue } ) }
									allowReset
								/>
								<SelectControl
									label={ __( "Border Style" , "ultimate-addons-for-gutenberg" ) }
									value={ successMessageBorderStyle }
									onChange={ ( value ) => setAttributes( { successMessageBorderStyle: value } ) }
									options={ [
										{ value: "none", label: __( "None" , "ultimate-addons-for-gutenberg" ) },
										{ value: "solid", label: __( "Solid" , "ultimate-addons-for-gutenberg" ) },
										{ value: "dotted", label: __( "Dotted" , "ultimate-addons-for-gutenberg" ) },
										{ value: "dashed", label: __( "Dashed" , "ultimate-addons-for-gutenberg" ) },
										{ value: "double", label: __( "Double" , "ultimate-addons-for-gutenberg" ) },
										{ value: "groove", label: __( "Groove" , "ultimate-addons-for-gutenberg" ) },
										{ value: "inset", label: __( "Inset" , "ultimate-addons-for-gutenberg" ) },
										{ value: "outset", label: __( "Outset" , "ultimate-addons-for-gutenberg" ) },
										{ value: "ridge", label: __( "Ridge" , "ultimate-addons-for-gutenberg" ) },
									] }
								/>
								<RangeControl
									label={ __( "Border Width" , "ultimate-addons-for-gutenberg" ) }
									value={ successMessageBorderWidth }
									onChange={ ( value ) => setAttributes( { successMessageBorderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<p className="uagb-setting-label">{ __( "Border Color", "ultimate-addons-for-gutenberg"  ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: successMessageBorderColor } } ></span></span></p>
								<ColorPalette
									value={ successMessageBorderColor }
									onChange={ ( colorValue ) => setAttributes( { successMessageBorderColor: colorValue } ) }
									allowReset
								/>

							</PanelBody>
							<PanelBody title={ __( "Error Message ", "ultimate-addons-for-gutenberg"  ) }
								initialOpen={ false }
								className="uagb__url-panel-body">
								<TextareaControl
									label="Error Message Text"
									help={ __( "Enter a message you want to display after unsuccessfull form submission", "ultimate-addons-for-gutenberg"  ) }
									value={ failedMessage }
									onChange={ ( value ) => setAttributes( { failedMessage: value } ) }
								/>
								<p className="uagb-setting-label">{ __( "Text Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: failedMessageTextColor } } ></span></span></p>
								<ColorPalette
									value={ failedMessageTextColor }
									onChange={ ( colorValue ) => setAttributes( { failedMessageTextColor: colorValue } ) }
									allowReset
								/>
								<p className="uagb-setting-label">{ __( "Background Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: failedMessageBGColor } } ></span></span></p>
								<ColorPalette
									value={ failedMessageBGColor }
									onChange={ ( colorValue ) => setAttributes( { failedMessageBGColor: colorValue } ) }
									allowReset
								/>
								<SelectControl
									label={ __( "Border Style" , "ultimate-addons-for-gutenberg" ) }
									value={ failedMessageBorderStyle }
									onChange={ ( value ) => setAttributes( { failedMessageBorderStyle: value } ) }
									options={ [
										{ value: "none", label: __( "None" , "ultimate-addons-for-gutenberg" ) },
										{ value: "solid", label: __( "Solid" , "ultimate-addons-for-gutenberg" ) },
										{ value: "dotted", label: __( "Dotted" , "ultimate-addons-for-gutenberg" ) },
										{ value: "dashed", label: __( "Dashed" , "ultimate-addons-for-gutenberg" ) },
										{ value: "double", label: __( "Double" , "ultimate-addons-for-gutenberg" ) },
										{ value: "groove", label: __( "Groove" , "ultimate-addons-for-gutenberg" ) },
										{ value: "inset", label: __( "Inset" , "ultimate-addons-for-gutenberg" ) },
										{ value: "outset", label: __( "Outset" , "ultimate-addons-for-gutenberg" ) },
										{ value: "ridge", label: __( "Ridge" , "ultimate-addons-for-gutenberg" ) },
									] }
								/>
								<RangeControl
									label={ __( "Border Width" , "ultimate-addons-for-gutenberg" ) }
									value={ failedMessageBorderWidth }
									onChange={ ( value ) => setAttributes( { failedMessageBorderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<p className="uagb-setting-label">{ __( "Border Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: failedMessageBorderColor } } ></span></span></p>
								<ColorPalette
									value={ failedMessageBorderColor }
									onChange={ ( colorValue ) => setAttributes( { failedMessageBorderColor: colorValue } ) }
									allowReset
								/>
							</PanelBody>
						</Fragment>
					}
					{ "url" === confirmationType && 
						<TextControl
							label={ __( "Success Redirect URL" , "ultimate-addons-for-gutenberg" ) }
							help={ __( "Enter a URL you want to redirect your page to after form Submission" , "ultimate-addons-for-gutenberg" ) }
							value={ confirmationUrl }
							onChange={ value => setAttributes( { confirmationUrl: value } ) }
						/>
					}

				</PanelBody>
			);
		};
		

		const submitButtonSettings = () => {
			return (
				<PanelBody
					title={ __( "Submit Button" , "ultimate-addons-for-gutenberg"  ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<Fragment>
						<SelectControl
							label={ __( "Button Size" , "ultimate-addons-for-gutenberg" ) }
							value={ buttonSize }
							onChange={ ( value ) => setAttributes( { buttonSize: value } ) }
							options={ [
								{ value: "small", label: __( "Small" , "ultimate-addons-for-gutenberg" ) },
								{ value: "medium", label: __( "Medium" , "ultimate-addons-for-gutenberg" ) },
								{ value: "large", label: __( "Large" , "ultimate-addons-for-gutenberg" ) },
								{ value: "extralarge", label: __( "Extra Large" , "ultimate-addons-for-gutenberg" ) },
								{ value: "full", label: __( "Full" , "ultimate-addons-for-gutenberg" ) },
							] }
						/>
						<h2> { __( "Button Alignment" , "ultimate-addons-for-gutenberg" ) }</h2>
						<Button
							key={ "left" }
							icon="editor-alignleft"
							label={ __( "Left", "ultimate-addons-for-gutenberg" ) }
							onClick={ () => setAttributes( { buttonAlign: "left" } ) }
							aria-pressed={ "left" === buttonAlign }
							isPrimary={ "left" === buttonAlign }
						/>
						<Button
							key={ "center" }
							icon="editor-aligncenter"
							label={ __( "Right", "ultimate-addons-for-gutenberg" ) }
							onClick={ () => setAttributes( { buttonAlign: "center" } ) }
							aria-pressed={ "center" === buttonAlign }
							isPrimary={ "center" === buttonAlign }
						/>
						<Button
							key={ "right" }
							icon="editor-alignright"
							label={ __( "Right", "ultimate-addons-for-gutenberg" ) }
							onClick={ () => setAttributes( { buttonAlign: "right" } ) }
							aria-pressed={ "right" === buttonAlign }
							isPrimary={ "right" === buttonAlign }
						/>
						<h2>{ __( "Button Padding", "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ "uagb-padding-control submit-btn-control" }
							value={ vPaddingSubmit }
							onChange={ ( value ) => setAttributes( { vPaddingSubmit: value } ) }
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ "uagb-padding-control submit-btn-control" }
							value={ hPaddingSubmit }
							onChange={ ( value ) => setAttributes( { hPaddingSubmit: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</Fragment>
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal" , "ultimate-addons-for-gutenberg" ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover" , "ultimate-addons-for-gutenberg" ),
								className: "uagb-focus-tab",
							},
						] }>
						{
							( tabName ) => {
								let tabout_submitColor;
								if ( "normal" === tabName.name ) {
									tabout_submitColor = <Fragment>
										<p className="uagb-setting-label">{ __( "Submit Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: submitColor } } ></span></span></p>
										<ColorPalette
											value={ submitColor }
											onChange={ ( colorValue ) => setAttributes( { submitColor: colorValue } ) }
											allowReset
										/>
										<p className="uagb-setting-label">{ __( "Background Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: submitBgColor } } ></span></span></p>
										<ColorPalette
											value={ submitBgColor }
											onChange={ ( colorValue ) => setAttributes( { submitBgColor: colorValue } ) }
											allowReset
										/>
									</Fragment>;
								} else {
									tabout_submitColor = <Fragment>
										<p className="uagb-setting-label">{ __( "Submit Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: submitColorHover } } ></span></span></p>
										<ColorPalette
											value={ submitColorHover }
											onChange={ ( colorValue ) => setAttributes( { submitColorHover: colorValue } ) }
											allowReset
										/>
										<p className="uagb-setting-label">{ __( "Background Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: submitBgColorHover } } ></span></span></p>
										<ColorPalette
											value={ submitBgColorHover }
											onChange={ ( colorValue ) => setAttributes( { submitBgColorHover: colorValue } ) }
											allowReset
										/>
									</Fragment>;
								}
								return <div>{ tabout_submitColor }</div>;
							}
						}
					</TabPanel>
					<SelectControl
						label={ __( "Border Style" , "ultimate-addons-for-gutenberg" ) }
						value={ submitborderStyle }
						onChange={ ( value ) => setAttributes( { submitborderStyle: value } ) }
						options={ [
							{ value: "none", label: __( "None" , "ultimate-addons-for-gutenberg" ) },
							{ value: "solid", label: __( "Solid" , "ultimate-addons-for-gutenberg" ) },
							{ value: "dotted", label: __( "Dotted" , "ultimate-addons-for-gutenberg" ) },
							{ value: "dashed", label: __( "Dashed" , "ultimate-addons-for-gutenberg" ) },
							{ value: "double", label: __( "Double" , "ultimate-addons-for-gutenberg" ) },
							{ value: "groove", label: __( "Groove" , "ultimate-addons-for-gutenberg" ) },
							{ value: "inset", label: __( "Inset" , "ultimate-addons-for-gutenberg" ) },
							{ value: "outset", label: __( "Outset" , "ultimate-addons-for-gutenberg" ) },
							{ value: "ridge", label: __( "Ridge" , "ultimate-addons-for-gutenberg" ) },
						] }
					/>						
					{ "none" != submitborderStyle && (
						<Fragment>
							<RangeControl
								label={ __( "Border Width" , "ultimate-addons-for-gutenberg" ) }
								value={ submitborderWidth }
								onChange={ ( value ) => setAttributes( { submitborderWidth: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ __( "Border Radius" , "ultimate-addons-for-gutenberg" ) }
								value={ submitborderRadius }
								onChange={ ( value ) => setAttributes( { submitborderRadius: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<p className="uagb-setting-label">{ __( "Border Color", "ultimate-addons-for-gutenberg"  ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: submitborderColor } } ></span></span></p>
							<ColorPalette
								value={ submitborderColor }
								onChange={ ( colorValue ) => setAttributes( { submitborderColor: colorValue } ) }
								allowReset
							/>
							<p className="uagb-setting-label">{ __( "Border Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: submitborderHoverColor } } ></span></span></p>
							<ColorPalette
								value={ submitborderHoverColor }
								onChange={ ( colorValue ) => setAttributes( { submitborderHoverColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					) }
					<TypographyControl
						label={ __( "Typography", "ultimate-addons-for-gutenberg"  ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: submitTextloadGoogleFonts, label:__( "submitTextloadGoogleFonts", "ultimate-addons-for-gutenberg" ) } }
						fontFamily={ { value: submitTextFontFamily, label:__( "submitTextFontFamily", "ultimate-addons-for-gutenberg" ) } }
						fontWeight={ { value: submitTextFontWeight, label:__( "submitTextFontWeight", "ultimate-addons-for-gutenberg" ) } }
						fontSubset={ { value: submitTextFontSubset, label:__( "submitTextFontSubset", "ultimate-addons-for-gutenberg" ) } }
						fontSizeType={ { value: submitTextFontSizeType, label:__( "submitTextFontSizeType", "ultimate-addons-for-gutenberg" ) } }
						fontSize={ { value: submitTextFontSize, label:__( "submitTextFontSize", "ultimate-addons-for-gutenberg" ) } }
						fontSizeMobile={ { value: submitTextFontSizeMobile, label:__( "submitTextFontSizeMobile", "ultimate-addons-for-gutenberg" ) } }
						fontSizeTablet={ { value: submitTextFontSizeTablet, label:__( "submitTextFontSizeTablet", "ultimate-addons-for-gutenberg" ) } }
						lineHeightType={ { value: submitTextLineHeightType, label:__( "submitTextLineHeightType", "ultimate-addons-for-gutenberg" ) } }
						lineHeight={ { value: submitTextLineHeight, label:__( "submitTextLineHeight", "ultimate-addons-for-gutenberg" ) } }
						lineHeightMobile={ { value: submitTextLineHeightMobile, label:__( "submitTextLineHeightMobile", "ultimate-addons-for-gutenberg" ) } }
						lineHeightTablet={ { value: submitTextLineHeightTablet, label:__( "submitTextLineHeightTablet", "ultimate-addons-for-gutenberg" ) } }
					/>
				</PanelBody>
			);
		};


		const afterSubmitActions = () => {
			return (
				<PanelBody
					title={ __( "After Submit Actions" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<CheckboxControl
						label="Email"
						checked={ sendAfterSubmitEmail }
						onChange={ ( value ) => setAttributes( { sendAfterSubmitEmail: value } ) }
					/>
					{ true === sendAfterSubmitEmail && (
						<Fragment>								
							<TabPanel className="uagb-size-type-field-tabs components-base-control uagb-size-type-field__common-tabs uagb-inline-margin uagb-email-controls-tabs" activeClass="active-tab"
								tabs={ [
									{
										name: "to",
										title: "To",
										className: "uagb-desktop-tab uagb-responsive-tabs",
									},
									{
										name: "cc",
										title: "CC",
										className: "uagb-tablet-tab uagb-responsive-tabs",
									},
									{
										name: "bcc",
										title: "BCC",
										className: "uagb-mobile-tab uagb-responsive-tabs",
									},
								] }>
								{
									( tab ) => {
										let tabout;
	
										if ( "to" === tab.name ) {
											tabout = (
												<TextControl
													label={ __( "To" , "ultimate-addons-for-gutenberg" ) }
													placeholder={ __( "Email" , "ultimate-addons-for-gutenberg" ) }
													value={ afterSubmitToEmail }
													onChange={ value => setAttributes( { afterSubmitToEmail: value } ) }
												/>
											);
										} else if ( "cc" === tab.name ) {
											tabout = (
												<TextControl
													label={ __( "CC" , "ultimate-addons-for-gutenberg" ) }
													placeholder={ __( "Email" , "ultimate-addons-for-gutenberg" ) }
													value={ afterSubmitCcEmail }
													onChange={ value => setAttributes( { afterSubmitCcEmail: value } ) }
												/>
											);
										} else {
											tabout = (
												<TextControl
													label={ __( "BCC" , "ultimate-addons-for-gutenberg" ) }
													placeholder={ __( "Email" , "ultimate-addons-for-gutenberg" ) }
													value={ afterSubmitBccEmail }
													onChange={ value => setAttributes( { afterSubmitBccEmail: value } ) }
												/>
											);
										}
	
										return <div className="uagb-form-emailto">{ tabout }</div>;
									}
								}
							</TabPanel>
							<TextControl
								label={ __( "Subject" , "ultimate-addons-for-gutenberg" ) }
								placeholder={ __( "Subject" , "ultimate-addons-for-gutenberg" ) }
								value={ afterSubmitEmailSubject }
								onChange={ value => setAttributes( { afterSubmitEmailSubject: value } ) }
							/>	
						</Fragment>
					) }
				</PanelBody>
			);
		};
		
		const designSettings = () => {
			return (
				<PanelBody
					title={ __( "Design" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>				
					<TypographyControl
						label={ __( "Label Typography" , "ultimate-addons-for-gutenberg" ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: labelloadGoogleFonts, label: __( "labelloadGoogleFonts", "ultimate-addons-for-gutenberg" ) } }
						fontFamily={ { value: labelFontFamily, label: __( "labelFontFamily", "ultimate-addons-for-gutenberg" ) } }
						fontWeight={ { value: labelFontWeight, label: __( "labelFontWeight", "ultimate-addons-for-gutenberg" ) } }
						fontSubset={ { value: labelFontSubset, label: __( "labelFontSubset", "ultimate-addons-for-gutenberg" ) } }
						fontSizeType={ { value: labelFontSizeType, label: __( "labelFontSizeType", "ultimate-addons-for-gutenberg" ) } }
						fontSize={ { value: labelFontSize, label: __( "labelFontSize", "ultimate-addons-for-gutenberg" ) } }
						fontSizeMobile={ { value: labelFontSizeMobile, label: __( "labelFontSizeMobile", "ultimate-addons-for-gutenberg" ) } }
						fontSizeTablet={ { value: labelFontSizeTablet, label: __( "labelFontSizeTablet", "ultimate-addons-for-gutenberg" ) } }
						lineHeightType={ { value: labelLineHeightType, label: __( "labelLineHeightType", "ultimate-addons-for-gutenberg" ) } }
						lineHeight={ { value: labelLineHeight, label: __( "labelLineHeight", "ultimate-addons-for-gutenberg" ) } }
						lineHeightMobile={ { value: labelLineHeightMobile, label: __( "labelLineHeightMobile", "ultimate-addons-for-gutenberg" ) } }
						lineHeightTablet={ { value: labelLineHeightTablet, label: __( "labelLineHeightTablet", "ultimate-addons-for-gutenberg" ) } }
					/>
					<TypographyControl
						label={ __( "Input Typography" , "ultimate-addons-for-gutenberg" ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: inputloadGoogleFonts, label: __( "inputloadGoogleFonts", "ultimate-addons-for-gutenberg" ) } }
						fontFamily={ { value: inputFontFamily, label: __( "inputFontFamily", "ultimate-addons-for-gutenberg" ) } }
						fontWeight={ { value: inputFontWeight, label: __( "inputFontWeight", "ultimate-addons-for-gutenberg" ) } }
						fontSubset={ { value: inputFontSubset, label: __( "inputFontSubset", "ultimate-addons-for-gutenberg" ) } }
						fontSizeType={ { value: inputFontSizeType, label: __( "inputFontSizeType", "ultimate-addons-for-gutenberg" ) } }
						fontSize={ { value: inputFontSize, label: __( "inputFontSize", "ultimate-addons-for-gutenberg" ) } }
						fontSizeMobile={ { value: inputFontSizeMobile, label: __( "inputFontSizeMobile", "ultimate-addons-for-gutenberg" ) } }
						fontSizeTablet={ { value: inputFontSizeTablet, label: __( "inputFontSizeTablet", "ultimate-addons-for-gutenberg" ) } }
						lineHeightType={ { value: inputLineHeightType, label: __( "inputLineHeightType", "ultimate-addons-for-gutenberg" ) } }
						lineHeight={ { value: inputLineHeight, label: __( "inputLineHeight", "ultimate-addons-for-gutenberg" ) } }
						lineHeightMobile={ { value: inputLineHeightMobile, label: __( "inputLineHeightMobile", "ultimate-addons-for-gutenberg" ) } }
						lineHeightTablet={ { value: inputLineHeightTablet, label: __( "inputLineHeightTablet", "ultimate-addons-for-gutenberg" ) } }
					/>
					<RangeControl
						label={ __( "Checkbox/Radio Size", "ultimate-addons-for-gutenberg" ) }
						value={ toggleSize  }
						onChange={ ( value ) => setAttributes( { toggleSize : value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Toggle Width", "ultimate-addons-for-gutenberg" ) }
						value={ toggleWidthSize  }
						onChange={ ( value ) => setAttributes( { toggleWidthSize : value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Toggle Height" , "ultimate-addons-for-gutenberg" ) }
						value={ toggleHeightSize  }
						onChange={ ( value ) => setAttributes( { toggleHeightSize : value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Toggle Active Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: toggleActiveColor } } ></span></span></p>
					<ColorPalette
						value={ toggleActiveColor }
						onChange={ ( colorValue ) => setAttributes( { toggleActiveColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Label Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: labelColor } } ></span></span></p>
					<ColorPalette
						value={ labelColor }
						onChange={ ( colorValue ) => setAttributes( { labelColor: colorValue } ) }
						allowReset
					/>				
					<p className="uagb-setting-label">{ __( "Input Color" , "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: inputColor } } ></span></span></p>
					<ColorPalette
						value={ inputColor }
						onChange={ ( colorValue ) => setAttributes( { inputColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Field Background Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: bgColor } } ></span></span></p>
					<ColorPalette
						value={ bgColor }
						onChange={ ( colorValue ) => setAttributes( { bgColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Field Placeholder Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: inputplaceholderColor } } ></span></span></p>
					<ColorPalette
						value={ inputplaceholderColor }
						onChange={ ( colorValue ) => setAttributes( { inputplaceholderColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Field Active Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: inputactiveColor } } ></span></span></p>
					<ColorPalette
						value={ inputactiveColor }
						onChange={ ( colorValue ) => setAttributes( { inputactiveColor: colorValue } ) }
						allowReset
					/>
						
					<SelectControl
						label={ __( "Border Style" , "ultimate-addons-for-gutenberg" ) }
						value={ inputborderStyle }
						onChange={ ( value ) => setAttributes( { inputborderStyle: value } ) }
						options={ [
							{ value: "none", label: __( "None" , "ultimate-addons-for-gutenberg" ) },
							{ value: "solid", label: __( "Solid" , "ultimate-addons-for-gutenberg" ) },
							{ value: "dotted", label: __( "Dotted" , "ultimate-addons-for-gutenberg" ) },
							{ value: "dashed", label: __( "Dashed" , "ultimate-addons-for-gutenberg" ) },
							{ value: "double", label: __( "Double" , "ultimate-addons-for-gutenberg" ) },
							{ value: "groove", label: __( "Groove" , "ultimate-addons-for-gutenberg" ) },
							{ value: "inset", label: __( "Inset" , "ultimate-addons-for-gutenberg" ) },
							{ value: "outset", label: __( "Outset" , "ultimate-addons-for-gutenberg" ) },
							{ value: "ridge", label: __( "Ridge" , "ultimate-addons-for-gutenberg" ) },
						] }
					/>						
					{ "none" != inputborderStyle && (
						<Fragment>
							<RangeControl
								label={ __( "Border Width", "ultimate-addons-for-gutenberg" ) }
								value={ inputborderWidth }
								onChange={ ( value ) => setAttributes( { inputborderWidth: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							{ "boxed" == formStyle && (
								<RangeControl
									label={ __( "Border Radius", "ultimate-addons-for-gutenberg" ) }
									value={ inputborderRadius }
									onChange={ ( value ) => setAttributes( { inputborderRadius: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
							) }
							<p className="uagb-setting-label">{ __( "Border Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: inputborderColor } } ></span></span></p>
							<ColorPalette
								value={ inputborderColor }
								onChange={ ( colorValue ) => setAttributes( { inputborderColor: colorValue } ) }
								allowReset
							/>
							<p className="uagb-setting-label">{ __( "Border Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: inputborderHoverColor } } ></span></span></p>
							<ColorPalette
								value={ inputborderHoverColor }
								onChange={ ( colorValue ) => setAttributes( { inputborderHoverColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					) }
									
					<RangeControl	
						label={ __( "Spacing between fields (px)" , "ultimate-addons-for-gutenberg" ) }					
						className={ "uagb-padding-control" }
						value={ fieldGap }
						onChange={ ( value ) => setAttributes( { fieldGap: value } ) }
						min={ 0 }
						max={ 100 }
					/>
					<h2>{ __( "Field Padding (px)" , "ultimate-addons-for-gutenberg" ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ "uagb-padding-control" }
						value={ vPaddingField }
						onChange={ ( value ) => setAttributes( { vPaddingField: value } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ "uagb-padding-control" }
						value={ hPaddingField }
						onChange={ ( value ) => setAttributes( { hPaddingField: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>
				
			);
		};

		const googleReCaptcha = () => {
			return (
				<PanelBody
					title={ __( "Google reCAPTCHA" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ false }					
				>
					<p className='uagb-form-notice'>{ __( "P.S. Note that If you are using two forms on the same page with the different reCAPTCHA versions (V2 checkbox and V3), it will create conflicts between the versions. Kindly avoid using different versions on same page. " , "ultimate-addons-for-gutenberg" ) }</p>
              
					<ToggleControl
						label={ __( "Enable reCAPTCHA " , "ultimate-addons-for-gutenberg" ) }
						checked={ reCaptchaEnable }
						onChange={ ( value ) => setAttributes( { reCaptchaEnable: ! reCaptchaEnable } ) }
					/>
					{ reCaptchaEnable &&
						<SelectControl
							label={ __( "Select Version", "ultimate-addons-for-gutenberg" ) }
							value={ reCaptchaType }
							onChange={ ( value ) => setAttributes( { reCaptchaType: value } ) }
							options={ [
								{ value: "v2", label: __( "V2" , "ultimate-addons-for-gutenberg" ) },
								{ value: "v3", label: __( "V3" , "ultimate-addons-for-gutenberg" ) },
							] }
						/>
					}
					{ reCaptchaEnable && "v2" === reCaptchaType && (
						<Fragment>
							<TextControl
								label={ __( "Site Key", "ultimate-addons-for-gutenberg" ) }
								value={ reCaptchaSiteKeyV2 }
								onChange={ ( value ) => setAttributes( { reCaptchaSiteKeyV2: value } ) }
								placeholder={ __( "Enter v2 Keys", "ultimate-addons-for-gutenberg" ) }

							/>
							<TextControl
								label={ __( "Secret Key", "ultimate-addons-for-gutenberg" ) }
								value={ reCaptchaSecretKeyV2 }
								onChange={ ( value ) => setAttributes( { reCaptchaSecretKeyV2: value } ) }
								placeholder={ __( "Enter v2 Keys", "ultimate-addons-for-gutenberg" ) }

							/>		
						</Fragment>
					) }
					{ reCaptchaEnable && "v3" === reCaptchaType && (
						<Fragment>
							<TextControl
								label={ __( "Site Key", "ultimate-addons-for-gutenberg" ) }
								value={ reCaptchaSiteKeyV3 }
								onChange={ ( value ) => setAttributes( { reCaptchaSiteKeyV3: value } ) }
								placeholder={ __( "Enter v3 Keys", "ultimate-addons-for-gutenberg" ) }

							/>
							<TextControl
								label={ __( "Secret Key", "ultimate-addons-for-gutenberg" ) }
								value={ reCaptchaSecretKeyV3 }
								onChange={ ( value ) => setAttributes( { reCaptchaSecretKeyV3: value } ) }
								placeholder={ __( "Enter v3 Keys", "ultimate-addons-for-gutenberg" ) }

							/>		
							<ToggleControl
								label={ __( "Hide reCAPTCHA Badge" , "ultimate-addons-for-gutenberg" ) }
								checked={ hidereCaptchaBatch }
								onChange={ ( value ) => setAttributes( { hidereCaptchaBatch: ! hidereCaptchaBatch } ) }
							/>
						</Fragment>
					) }
					<h2> { __( "Know More", "ultimate-addons-for-gutenberg" ) }</h2>
					<ExternalLink href="https://www.google.com/recaptcha/admin/create">{ __( "Get Keys", "ultimate-addons-for-gutenberg" ) }</ExternalLink>
					<ExternalLink href="https://developers.google.com/recaptcha/intro">{ __( " | Documentation", "ultimate-addons-for-gutenberg" ) }</ExternalLink>
				</PanelBody>
			);
		};

		const renderButtonHtml = () => {
					
			return (
				<button onClick={ this.onSubmitClick } className="uagb-forms-main-submit-button">
					<RichText
						tagName="div"
						placeholder={ __( "Submit" , "ultimate-addons-for-gutenberg" ) }
						value={ submitButtonText }
						onChange={ ( value ) => setAttributes( { submitButtonText: value } ) }
						className='uagb-forms-main-submit-button-text'
						multiline={ false }
						allowedFormats={ [ "core/bold", "core/italic", "core/strikethrough" ] }
					/>
				</button>
			);
		};
		

		if ( ! hasInnerBlocks ) {
			return (
				<Fragment>
					<__experimentalBlockVariationPicker
						icon={ UAGB_Block_Icons.columns }
						label={ uagb_blocks_info.blocks["uagb/forms"].title }
						instructions={ __( "Select a variation to start with.", "ultimate-addons-for-gutenberg" ) }
						variations={ variations }
						allowSkip
						onSelect={ ( nextVariation ) => this.blockVariationPickerOnSelect( nextVariation ) }
						className="uagb-forms-variations"
					/>
				</Fragment>
			);
		}
		
		return (
			<Fragment>
				<InspectorControls>
					{ generalSettings() }
					{ submitButtonSettings() }
					{ afterSubmitActions() }
					{ designSettings() }
					{ googleReCaptcha() }
				</InspectorControls>
				  
				<div className={ classnames(
					"uagb-forms__outer-wrap",
					`uagb-block-${ block_id }`,
					`uagb-forms__${buttonSize}-btn`
				) }
				>
					<form className="uagb-forms-main-form" name={ `uagb-form-${ block_id }` }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
						/>
						<div className="uagb-forms-form-hidden-data">
							{ reCaptchaEnable && (					
								<input type="hidden" id="g-recaptcha-response" className="uagb-forms-recaptcha" />
							) }
							<input type="hidden" name="uagb_forms_form_label" value={ formLabel } />
							<input type="hidden" name="uagb_forms_form_id" value={ `uagb-form-${ block_id }` } />
						</div>

						{ reCaptchaEnable && "v2" === reCaptchaType && reCaptchaSiteKeyV2 && reCaptchaSecretKeyV2 && (
							<Fragment>
								<div className="g-recaptcha uagb-forms-field-set" data-sitekey={ reCaptchaSiteKeyV2 }></div>
								<div className={ `uagb-form-reacaptcha-error-${ block_id }` }></div>
							</Fragment>
						) }

						<div className="uagb-forms-main-submit-button-wrap">
							{ renderButtonHtml() }
						</div>
					</form>
				</div>
				{ loadsubmittextGoogleFonts }
				{ loadlabelGoogleFonts }
				{ loadinputGoogleFonts }
			</Fragment>
		);
	}

	componentDidMount() {

		const { attributes, setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
		const id = this.props.clientId;
		window.addEventListener( "load", this.renderReadyClasses( id ) );
		
	}

	componentDidUpdate( prevProps, prevState ) {

		const element = document.getElementById( "uagb-style-forms-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}

	}
	
	renderReadyClasses( id ){
		const mainDiv = document.getElementById( "block-" + id );
		const formscope = mainDiv.getElementsByClassName( "uagb-forms__outer-wrap" );
		
		if ( null !== formscope[0] && undefined !== formscope[0] ) {
			
			const editorwrap = formscope[0].children;
			const formInnerWrap = editorwrap[0].children;
			const editorBlockWrap = formInnerWrap[0].getElementsByClassName( "block-editor-block-list__layout" );
			const sibling = editorBlockWrap[0].children;
			
			
			for ( let index = 0; index < sibling.length; index++ ) {

				if ( sibling[index].classList.contains( "uag-col-2" ) && sibling[index+1].classList.contains( "uag-col-2" ) ){
					const div = document.createElement( "div" );
					div.className = "uag-col-2-wrap uag-col-wrap-" + index;                        
					sibling[index+1].after( div );
					const wrapper_div = formscope[0].getElementsByClassName( "uag-col-wrap-" + index );
					wrapper_div[0].appendChild( sibling[index] );
					wrapper_div[0].appendChild( sibling[index] );
				} else if ( ( sibling[index].classList.contains( "uag-col-3" ) ) && ( sibling[index+1].classList.contains( "uag-col-3" ) && ( sibling[index+2].classList.contains( "uag-col-3" ) ) ) ){
					const div = document.createElement( "div" );
					div.className = "uag-col-3-wrap uag-col-wrap-" + index;                        
					sibling[index+2].after( div );
					const wrapper_div = formscope[0].getElementsByClassName( "uag-col-wrap-" + index );
					wrapper_div[0].appendChild( sibling[index] );
					wrapper_div[0].appendChild( sibling[index] );
					wrapper_div[0].appendChild( sibling[index] );

				} else if ( ( sibling[index].classList.contains( "uag-col-4" ) ) && ( sibling[index+1].classList.contains( "uag-col-4" ) && ( sibling[index+2].classList.contains( "uag-col-4" ) ) && ( sibling[index+3].classList.contains( "uag-col-4" ) ) ) ){
					const div = document.createElement( "div" );
					div.className = "uag-col-4-wrap uag-col-wrap-" + index;                        
					sibling[index+3].after( div );
					const wrapper_div = formscope[0].getElementsByClassName( "uag-col-wrap-" + index );
					wrapper_div[0].appendChild( sibling[index] );
					wrapper_div[0].appendChild( sibling[index] );
					wrapper_div[0].appendChild( sibling[index] );
					wrapper_div[0].appendChild( sibling[index] );

				}
			}
		}		
	}
}

const applyWithSelect = withSelect( ( select, props ) => {
	const { getBlocks, getBlocksByClientId } = select( "core/block-editor" );
	const { getBlockType, getBlockVariations, getDefaultBlockVariation } = select( "core/blocks" );
	const innerBlocks = getBlocks( props.clientId );
	const { replaceInnerBlocks } = useDispatch( "core/block-editor" );

	return {
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		innerBlocks,
		hasInnerBlocks: select( "core/block-editor" ).getBlocks( props.clientId ).length > 0,

		blockType: getBlockType( props.name ),
		defaultVariation: typeof getDefaultBlockVariation === "undefined" ? null : getDefaultBlockVariation( props.name ),
		variations: typeof getBlockVariations === "undefined" ? null : getBlockVariations( props.name ),
		replaceInnerBlocks,
	};
} );


const addAdvancedClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return props => {
		return <BlockListBlock { ...props } className={ props.attributes.className } />;
	};
}, "addAdvancedClasses" );

wp.hooks.addFilter( "editor.BlockListBlock", "uagb/forms", addAdvancedClasses );

export default compose( withNotices, applyWithSelect,addAdvancedClasses )( UAGBFormsEdit );
