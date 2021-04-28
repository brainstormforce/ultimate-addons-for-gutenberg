// Import block dependencies and components.
import classnames from "classnames";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography";

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader";

import map from "lodash/map";
// Import icon.
import styling from "./styling";

const { __ } = wp.i18n;

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
} = wp.blockEditor;

const {
	withSelect
} = wp.data;

const {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	RangeControl,
	Button,
	ToggleControl,
	Placeholder,
	Spinner,
	ButtonGroup,
	TabPanel
} = wp.components;

// Extend component
const { Component, Fragment } = wp.element;

class UAGBGF extends Component {

	constructor() {
		super( ...arguments );
		this.onSelectForm = this.onSelectForm.bind( this );
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectForm( id ) {
		const { setAttributes } = this.props;

		if ( ! id ) {
			setAttributes( { isHtml: false } );
			setAttributes( { formId: null } );
			return;
		}

		setAttributes( { isHtml: false } );
		setAttributes( { formId: id } );
	}


	render() {

		const { className, setAttributes, attributes } = this.props;

		// Setup the attributes.
		const {
			formId,
			align,
			isHtml,
			formJson,
			enableAjax,
			enableTabSupport,
			formTabIndex,
			titleDescStyle,
			titleDescAlignment,
			fieldStyle,
			fieldVrPadding,
			fieldHrPadding,
			fieldBgColor,
			fieldLabelColor,
			fieldInputColor,
			fieldBorderStyle,
			fieldBorderWidth ,
			fieldBorderRadius,
			fieldBorderColor,
			fieldBorderFocusColor,
			textAreaHeight,
			buttonAlignment,
			buttonVrPadding,
			buttonHrPadding,
			buttonTextColor,
			buttonBgColor,			
			buttonTextHoverColor,
			buttonBgHoverColor,
			buttonBorderStyle,
			buttonBorderWidth,
			buttonBorderRadius,
			buttonBorderColor,
			buttonBorderHoverColor,
			fieldSpacing,
			fieldLabelSpacing,
			enableLabel,
			labelFontSize,
			labelFontSizeType,
			labelFontSizeTablet,
			labelFontSizeMobile,
			labelFontFamily,
			labelFontWeight,
			labelFontSubset,
			labelLineHeightType,
			labelLineHeight,
			labelLineHeightTablet,
			labelLineHeightMobile,
			labelLoadGoogleFonts,
			inputFontSize,	
			inputFontSizeType,
			inputFontSizeTablet,
			inputFontSizeMobile,
			inputFontFamily,
			inputFontWeight,
			inputFontSubset,
			inputLineHeightType,
			inputLineHeight,
			inputLineHeightTablet,
			inputLineHeightMobile,
			inputLoadGoogleFonts,			
			buttonFontSize,
			buttonFontSizeType,
			buttonFontSizeTablet,
			buttonFontSizeMobile,
			buttonFontFamily,
			buttonFontWeight,
			buttonFontSubset,
			buttonLineHeightType,
			buttonLineHeight,
			buttonLineHeightTablet,
			buttonLineHeightMobile,
			buttonLoadGoogleFonts,
			enableOveride,
			radioCheckSize,
			radioCheckBgColor,
			radioCheckSelectColor,
			radioCheckLableColor,
			radioCheckBorderColor,
			radioCheckBorderWidth,
			radioCheckBorderRadius,
			radioCheckFontSize,
			radioCheckFontSizeType,
			radioCheckFontSizeTablet,
			radioCheckFontSizeMobile,
			radioCheckFontFamily,
			radioCheckFontWeight,
			radioCheckFontSubset,
			radioCheckLineHeightType,
			radioCheckLineHeight,
			radioCheckLineHeightTablet,
			radioCheckLineHeightMobile,
			radioCheckLoadGoogleFonts,
			validationMsgColor,
			validationMsgBgColor, 
			advancedValidationSettings,
			highlightBorderColor, 
			validationMsgFontSize, 
			validationMsgFontSizeType,
			validationMsgFontSizeTablet,
			validationMsgFontSizeMobile,
			validationMsgFontFamily,
			validationMsgFontWeight,
			validationMsgFontSubset,
			validationMsgLineHeightType,
			validationMsgLineHeight,
			validationMsgLineHeightTablet,
			validationMsgLineHeightMobile,
			validationMsgLoadGoogleFonts,	
			successMsgColor,
			errorMsgColor, 
			errorMsgBgColor, 
			errorMsgBorderColor, 
			msgBorderSize, 
			msgBorderRadius, 
			msgVrPadding, 
			msgHrPadding, 
			msgFontSize,
			msgFontSizeType,
			msgFontSizeTablet,
			msgFontSizeMobile,	
			msgFontFamily,
			msgFontWeight,
			msgFontSubset,
			msgLineHeightType,
			msgLineHeight,
			msgLineHeightTablet,
			msgLineHeightMobile,
			msgLoadGoogleFonts,
			radioCheckBorderRadiusType,
			msgBorderRadiusType,
			fieldBorderRadiusType,
			buttonBorderRadiusType,
			successMsgLoadGoogleFonts,
			successMsgFontFamily,
			successMsgFontWeight,
			successMsgFontSubset,
			successMsgFontSizeType,
			successMsgFontSize,
			successMsgFontSizeMobile,
			successMsgFontSizeTablet,
			successMsgLineHeightType,
			successMsgLineHeight,
			successMsgLineHeightMobile,
			successMsgLineHeightTablet,
		} = attributes;

		let html = "";

		if ( formJson && formJson.data.html ) {
			html = formJson.data.html;
		}

		let loadInputGoogleFonts;
		let loadButtonGoogleFonts;
		let loadLabelGoogleFonts;
		let loadRadioGoogleFonts;
		let loadValidationGoogleFonts;
		let loadMsgGoogleFonts;

		if ( labelLoadGoogleFonts == true ) {
					
			const labelconfig = {
				google: {
					families: [ labelFontFamily + ( labelFontWeight ? ":" + labelFontWeight : "" ) ],
				},
			};

			loadLabelGoogleFonts = (
				<WebfontLoader config={ labelconfig }>
				</WebfontLoader>
			);
		}

		if ( inputLoadGoogleFonts == true ) {
					
			const inputconfig = {
				google: {
					families: [ inputFontFamily + ( inputFontWeight ? ":" + inputFontWeight : "" ) ],
				},
			};

			loadInputGoogleFonts = (
				<WebfontLoader config={ inputconfig }>
				</WebfontLoader>
			);
		}

		if ( buttonLoadGoogleFonts == true ) {
					
			const buttonconfig = {
				google: {
					families: [ buttonFontFamily + ( buttonFontWeight ? ":" + buttonFontWeight : "" ) ],
				},
			};

			loadButtonGoogleFonts = (
				<WebfontLoader config={ buttonconfig }>
				</WebfontLoader>
			);
		}

		if ( radioCheckLoadGoogleFonts == true ) {
					
			const radioCheckconfig = {
				google: {
					families: [ radioCheckFontFamily + ( radioCheckFontWeight ? ":" + radioCheckFontWeight : "" ) ],
				},
			};

			loadRadioGoogleFonts = (
				<WebfontLoader config={ radioCheckconfig }>
				</WebfontLoader>
			);
		}

		if ( validationMsgLoadGoogleFonts == true ) {
					
			const validationMsgconfig = {
				google: {
					families: [ validationMsgFontFamily + ( validationMsgFontWeight ? ":" + validationMsgFontWeight : "" ) ],
				},
			};

			loadValidationGoogleFonts = (
				<WebfontLoader config={ validationMsgconfig }>
				</WebfontLoader>
			);
		}

		if ( msgLoadGoogleFonts == true ) {
					
			const msgconfig = {
				google: {
					families: [ msgFontFamily + ( msgFontWeight ? ":" + msgFontWeight : "" ) ],
				},
			};

			loadMsgGoogleFonts = (
				<WebfontLoader config={ msgconfig }>
				</WebfontLoader>
			);
		}

		const field_border_setting = (
			<PanelBody title={ __( "Field Style & Border","ultimate-addons-for-gutenberg" ) } initialOpen={ false } > 	
				<SelectControl
					label={ __( "Field Style","ultimate-addons-for-gutenberg" ) }
					value={ fieldStyle }
					onChange={ ( value ) => setAttributes( { fieldStyle: value } ) }
					options={ [
						{ value: "box", label: __( "Box","ultimate-addons-for-gutenberg" ) },
						{ value: "underline", label: __( "Underline","ultimate-addons-for-gutenberg" ) },							
					] }
				/>						
				{ fieldStyle == "box" && 
				<SelectControl
					label={ __( "Border Style","ultimate-addons-for-gutenberg" ) }
					value={ fieldBorderStyle }
					onChange={ ( value ) => setAttributes( { fieldBorderStyle: value } ) }
					options={ [
						{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
						{ value: "solid", label: __( "Solid","ultimate-addons-for-gutenberg" ) },
						{ value: "dotted", label: __( "Dotted","ultimate-addons-for-gutenberg" ) },
						{ value: "dashed", label: __( "Dashed","ultimate-addons-for-gutenberg" ) },
						{ value: "double", label: __( "Double","ultimate-addons-for-gutenberg" ) },
						{ value: "groove", label: __( "Groove","ultimate-addons-for-gutenberg" ) },
						{ value: "inset", label: __( "Inset","ultimate-addons-for-gutenberg" ) },
						{ value: "outset", label: __( "Outset","ultimate-addons-for-gutenberg" ) },
						{ value: "ridge", label: __( "Ridge","ultimate-addons-for-gutenberg" ) },
					] }
				/>
				} 
				{ ( "none" != fieldBorderStyle || fieldStyle == "underline" )&& (
					<RangeControl
						label={ __( "Border Width (px)","ultimate-addons-for-gutenberg" ) }
						value={ fieldBorderWidth }
						onChange={ ( value ) => setAttributes( { fieldBorderWidth: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				) }
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type","ultimate-addons-for-gutenberg" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ fieldBorderRadiusType === "px" } aria-pressed={ fieldBorderRadiusType === "px" } onClick={ () => setAttributes( { fieldBorderRadiusType: "px" } ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ fieldBorderRadiusType === "%" } aria-pressed={ fieldBorderRadiusType === "%" } onClick={ () => setAttributes( { fieldBorderRadiusType: "%" } ) }>{ "%" }</Button>
				</ButtonGroup>
				<RangeControl
					label={ __( "Border Radius","ultimate-addons-for-gutenberg" ) }
					value={ fieldBorderRadius }
					onChange={ ( value ) => setAttributes( { fieldBorderRadius: value } ) }
					min={ 0 }
					max={ 100 }
					allowReset
				/>
				{ ( "none" != fieldBorderStyle || fieldStyle == "underline" ) && (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Border Color","ultimate-addons-for-gutenberg" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={ { backgroundColor: fieldBorderColor } } ></span></span></p>
						<ColorPalette
							value={ fieldBorderColor }
							onChange={ ( colorValue ) => setAttributes( { fieldBorderColor: colorValue } ) }
							allowReset
						/>						
							
					</Fragment>
				) }
				<p className="uagb-setting-label">{ __( "Active Border Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: fieldBorderFocusColor } } ></span></span></p>
				<ColorPalette
					value={ fieldBorderFocusColor }
					onChange={ ( colorValue ) => setAttributes( { fieldBorderFocusColor: colorValue } ) }
					allowReset
				/>
			</PanelBody>
		);

		const typography_settings = (			
			<PanelBody title={ __( "Content","ultimate-addons-for-gutenberg" ) } initialOpen={ false } > 
				<ToggleControl
					label="Hide Label?"
					checked={ enableLabel }
					onChange={ ( value ) => setAttributes( { enableLabel: ! enableLabel } ) }
		    	/>
				{ ( ! enableLabel ) && <Fragment>
					<h2>{ __( "Label","ultimate-addons-for-gutenberg" ) }</h2>			
					<TypographyControl
						label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: labelLoadGoogleFonts, label: "labelLoadGoogleFonts" } }
						fontFamily={ { value: labelFontFamily, label: "labelFontFamily" } }
						fontWeight={ { value: labelFontWeight, label: "labelFontWeight" } }
						fontSubset={ { value: labelFontSubset, label: "labelFontSubset" } }
						fontSizeType={ { value: labelFontSizeType, label: "labelFontSizeType" } }
						fontSize={ { value: labelFontSize, label: "labelFontSize" } }
						fontSizeMobile={ { value: labelFontSizeMobile, label: "labelFontSizeMobile" } }
						fontSizeTablet={ { value: labelFontSizeTablet, label: "labelFontSizeTablet" } }
						lineHeightType={ { value: labelLineHeightType, label: "labelLineHeightType" } }
						lineHeight={ { value: labelLineHeight, label: "labelLineHeight" } }
						lineHeightMobile={ { value: labelLineHeightMobile, label: "labelLineHeightMobile" } }
						lineHeightTablet={ { value: labelLineHeightTablet, label: "labelLineHeightTablet" } }
					/>
					<p className="uagb-setting-label">{ __( "Color","ultimate-addons-for-gutenberg" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={ { backgroundColor: fieldLabelColor } } ></span></span></p>
					<ColorPalette
						value={ fieldLabelColor }
						onChange={ ( colorValue ) => setAttributes( { fieldLabelColor: colorValue } ) }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
				</Fragment> 
				}
				<h2>{ __( "Input","ultimate-addons-for-gutenberg" ) }</h2>
				<TypographyControl
					label={ __( "Typography" ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ { value: inputLoadGoogleFonts, label: "inputLoadGoogleFonts" } }
					fontFamily={ { value: inputFontFamily, label: "inputFontFamily" } }
					fontWeight={ { value: inputFontWeight, label: "inputFontWeight" } }
					fontSubset={ { value: inputFontSubset, label: "inputFontSubset" } }
					fontSizeType={ { value: inputFontSizeType, label: "inputFontSizeType" } }
					fontSize={ { value: inputFontSize, label: "inputFontSize" } }
					fontSizeMobile={ { value: inputFontSizeMobile, label: "inputFontSizeMobile" } }
					fontSizeTablet={ { value: inputFontSizeTablet, label: "inputFontSizeTablet" } }
					lineHeightType={ { value: inputLineHeightType, label: "inputLineHeightType" } }
					lineHeight={ { value: inputLineHeight, label: "inputLineHeight" } }
					lineHeightMobile={ { value: inputLineHeightMobile, label: "inputLineHeightMobile" } }
					lineHeightTablet={ { value: inputLineHeightTablet, label: "inputLineHeightTablet" } }
				/>	
				<p className="uagb-setting-label">{ __( "Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: fieldInputColor } } ></span></span></p>
				<ColorPalette
					value={ fieldInputColor }
					onChange={ ( colorValue ) => setAttributes( { fieldInputColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: fieldBgColor } } ></span></span></p>
				<ColorPalette
					value={ fieldBgColor }
					onChange={ ( colorValue ) => setAttributes( { fieldBgColor: colorValue } ) }
					allowReset
				/>
				<RangeControl
					label={ __( "TextArea Height","ultimate-addons-for-gutenberg" ) }
					value={ textAreaHeight }
					onChange={ ( value ) => setAttributes( { textAreaHeight: value } ) }
					min={ 0 }
					max={ 1000 }
					allowReset
				/>					
			</PanelBody>
		);	

		const field_settings = (			
			<PanelBody title={ __( "General","ultimate-addons-for-gutenberg" ) } >
				<SelectControl
					label={ __( "Select Form","ultimate-addons-for-gutenberg" ) }
					value={ formId }
					onChange={ this.onSelectForm }
					options={ uagb_blocks_info.gf_forms }
				/>
				<ToggleControl
					label="Enable AJAX Form Submission"
					checked={ enableAjax }
					onChange={ ( value ) => setAttributes( { enableAjax: ! enableAjax } ) }
			    />
				<ToggleControl
					label="Using Multiple Gravity Forms"
					checked={ enableTabSupport }
					onChange={ ( value ) => setAttributes( { enableTabSupport: ! enableTabSupport } ) }
		    	/>
				{ ( enableTabSupport )&& (
					<RangeControl
						label={ __( "Tab Index","ultimate-addons-for-gutenberg" ) }
						value={ formTabIndex }
						onChange={ ( value ) => {
		      				setAttributes( {
		      					formTabIndex: value,
		      				} );
		      			} }
						min={ 0 }
						max={ 500 }
		      		/>
		    	) }

				<SelectControl
					label={ __( "Form Title & Description","ultimate-addons-for-gutenberg" ) }
					value={ titleDescStyle }
					onChange={ ( value ) => setAttributes( { titleDescStyle: value } ) }
					options={ [
		    			{ value: "yes", label: __( "Show","ultimate-addons-for-gutenberg" ) },
		    			{ value: "none", label: __( "Hide","ultimate-addons-for-gutenberg" ) },
		    		] }
		    	/>
		    	
				{ ( titleDescStyle !== "none" ) && (

					<SelectControl
						label={ __( "Form Title & Description Alignment","ultimate-addons-for-gutenberg" ) }
						value={ titleDescAlignment }
						onChange={ ( value ) => setAttributes( { titleDescAlignment: value } ) }
						options={ [
	  						{ value: "center", label: __( "Center","ultimate-addons-for-gutenberg" ) },
	  						{ value: "left", label: __( "Left","ultimate-addons-for-gutenberg" ) },
	  						{ value: "right", label: __( "Right","ultimate-addons-for-gutenberg" ) },
	  					] }
	  				/>
	    		) }

											
			</PanelBody>			
		);

		if ( formId == 0 ) {
			return (
				<Fragment>
					
					<Placeholder
						icon="admin-post"
						label={ __( "Select a Gravity Form","ultimate-addons-for-gutenberg" ) }
					>
						<SelectControl				
							value={ formId }
							onChange={ this.onSelectForm }
							options={ uagb_blocks_info.gf_forms }
						/>	
					</Placeholder>
				</Fragment>
			);
		}

		//Submit button settings.
		const btn_border_setting = (
			<Fragment>				
				<SelectControl
					label={ __( "Border Style","ultimate-addons-for-gutenberg" ) }
					value={ buttonBorderStyle }
					onChange={ ( value ) => setAttributes( { buttonBorderStyle: value } ) }
					options={ [
						{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
						{ value: "solid", label: __( "Solid","ultimate-addons-for-gutenberg" ) },
						{ value: "dotted", label: __( "Dotted","ultimate-addons-for-gutenberg" ) },
						{ value: "dashed", label: __( "Dashed","ultimate-addons-for-gutenberg" ) },
						{ value: "double", label: __( "Double","ultimate-addons-for-gutenberg" ) },
						{ value: "groove", label: __( "Groove","ultimate-addons-for-gutenberg" ) },
						{ value: "inset", label: __( "Inset","ultimate-addons-for-gutenberg" ) },
						{ value: "outset", label: __( "Outset","ultimate-addons-for-gutenberg" ) },
						{ value: "ridge", label: __( "Ridge","ultimate-addons-for-gutenberg" ) },
					] }
				/>
				{ "none" != buttonBorderStyle && (
					<RangeControl
						label={ __( "Border Width (px)","ultimate-addons-for-gutenberg" ) }
						value={ buttonBorderWidth }
						onChange={ ( value ) => setAttributes( { buttonBorderWidth: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				) }
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type","ultimate-addons-for-gutenberg" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ buttonBorderRadiusType === "px" } aria-pressed={ buttonBorderRadiusType === "px" } onClick={ () => setAttributes( { buttonBorderRadiusType: "px" } ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ buttonBorderRadiusType === "%" } aria-pressed={ buttonBorderRadiusType === "%" } onClick={ () => setAttributes( { buttonBorderRadiusType: "%" } ) }>{ "%" }</Button>
				</ButtonGroup>
				<RangeControl
					label={ __( "Border Radius","ultimate-addons-for-gutenberg" ) }
					value={ buttonBorderRadius }
					onChange={ ( value ) => setAttributes( { buttonBorderRadius: value } ) }
					min={ 0 }
					max={ 100 }
					allowReset
				/>									
			</Fragment>
		);

		const buttonNormalSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Text Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: buttonTextColor } } ></span></span></p>
				<ColorPalette
					value={ buttonTextColor }
					onChange={ ( colorValue ) => setAttributes( { buttonTextColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: buttonBgColor } } ></span></span></p>
				<ColorPalette
					value={ buttonBgColor }
					onChange={ ( colorValue ) => setAttributes( { buttonBgColor: colorValue } ) }
					allowReset
				/>
				{ "none" != buttonBorderStyle && (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Border Color","ultimate-addons-for-gutenberg" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={ { backgroundColor: buttonBorderColor } } ></span></span></p>
						<ColorPalette
							value={ buttonBorderColor }
							onChange={ ( colorValue ) => setAttributes( { buttonBorderColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
				) }		
			</Fragment>
		);

		const buttonHoverSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Text Hover Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: buttonTextHoverColor } } ></span></span></p>
				<ColorPalette
					value={ buttonTextHoverColor }
					onChange={ ( colorValue ) => setAttributes( { buttonTextHoverColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Hover Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: buttonBgHoverColor } } ></span></span></p>
				<ColorPalette
					value={ buttonBgHoverColor }
					onChange={ ( colorValue ) => setAttributes( { buttonBgHoverColor: colorValue } ) }
					allowReset
				/>
				{ "none" != buttonBorderStyle && (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Border Hover Color","ultimate-addons-for-gutenberg" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={ { backgroundColor: buttonBorderHoverColor } } ></span></span></p>
						<ColorPalette
							value={ buttonBorderHoverColor }
							onChange={ ( colorValue ) => setAttributes( { buttonBorderHoverColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
				) }		
			</Fragment>
		);

		const btn_setting = (
			<PanelBody title={ __( "Submit Button","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
				<SelectControl
					label={ __( "Button Alignment","ultimate-addons-for-gutenberg" ) }
					value={ buttonAlignment }
					onChange={ ( value ) => setAttributes( { buttonAlignment: value } ) }
					options={ [
						{ value: "center", label: __( "Center","ultimate-addons-for-gutenberg" ) },
						{ value: "left", label: __( "Left","ultimate-addons-for-gutenberg" ) },
						{ value: "right", label: __( "Right","ultimate-addons-for-gutenberg" ) },
						{ value: "justify", label: __( "Justified","ultimate-addons-for-gutenberg" ) },
					] }
				/>
				<h2>{ __( "Button Font","ultimate-addons-for-gutenberg" ) }</h2>
				<TypographyControl
					label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ { value: buttonLoadGoogleFonts, label: "buttonLoadGoogleFonts" } }
					fontFamily={ { value: buttonFontFamily, label: "buttonFontFamily" } }
					fontWeight={ { value: buttonFontWeight, label: "buttonFontWeight" } }
					fontSubset={ { value: buttonFontSubset, label: "buttonFontSubset" } }
					fontSizeType={ { value: buttonFontSizeType, label: "buttonFontSizeType" } }
					fontSize={ { value: buttonFontSize, label: "buttonFontSize" } }
					fontSizeMobile={ { value: buttonFontSizeMobile, label: "buttonFontSizeMobile" } }
					fontSizeTablet={ { value: buttonFontSizeTablet, label: "buttonFontSizeTablet" } }
					lineHeightType={ { value: buttonLineHeightType, label: "buttonLineHeightType" } }
					lineHeight={ { value: buttonLineHeight, label: "buttonLineHeight" } }
					lineHeightMobile={ { value: buttonLineHeightMobile, label: "buttonLineHeightMobile" } }
					lineHeightTablet={ { value: buttonLineHeightTablet, label: "buttonLineHeightTablet" } }
				/>
				<hr className="uagb-editor__separator" />								
				{ btn_border_setting }
				<hr className="uagb-editor__separator" />
				<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal","ultimate-addons-for-gutenberg" ),
							className: "uagb-normal-tab",
						},
						{
							name: "hover",
							title: __( "Hover","ultimate-addons-for-gutenberg" ),
							className: "uagb-focus-tab",
						},
					] }>
					{
						( tabName ) => {
							let tabout;
							if ( "normal" === tabName.name ) {
								tabout = buttonNormalSettings;
							} else {
								tabout = buttonHoverSettings;
							}
							return <div>{ tabout }</div>;
						}
					}
				</TabPanel>
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Button Padding (px)","ultimate-addons-for-gutenberg" ) }</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ "uagb-margin-control" }
					value={ buttonVrPadding }
					onChange={ ( value ) => setAttributes( { buttonVrPadding: value } ) }
					min={ 0 }
					max={ 200 }
					initialPosition={ 10 }
				/>					
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ "uagb-margin-control" }
					value={ buttonHrPadding }
					onChange={ ( value ) => setAttributes( { buttonHrPadding: value } ) }
					min={ 0 }
					max={ 200 }
					initialPosition={ 10 }
				/>		
			</PanelBody>
		);

		const spacing = (
			<PanelBody title={ __( "Spacing","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
				<RangeControl
					label={ __( "Label & Input Space","ultimate-addons-for-gutenberg" ) }
					value={ fieldLabelSpacing }
					onChange={ ( value ) => setAttributes( { fieldLabelSpacing: value } ) }
					min={ 0 }
					max={ 200 }
					allowReset
				/>

				<RangeControl
					label={ __( "Fields Space","ultimate-addons-for-gutenberg" ) }
					value={ fieldSpacing }
					onChange={ ( value ) => setAttributes( { fieldSpacing: value } ) }
					min={ 0 }
					max={ 200 }
					allowReset
				/>

				<hr className="uagb-editor__separator" />
				<h2>{ __( "Field Padding (px)","ultimate-addons-for-gutenberg" ) }</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ "uagb-margin-control" }
					value={ fieldVrPadding }
					onChange={ ( value ) => setAttributes( { fieldVrPadding: value } ) }
					min={ 0 }
					max={ 200 }
					initialPosition={ 10 }
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ "uagb-margin-control" }
					value={ fieldHrPadding }
					onChange={ ( value ) => setAttributes( { fieldHrPadding: value } ) }
					min={ 0 }
					max={ 200 }
					initialPosition={ 10 }
				/>				
			</PanelBody>
		);

		const radio_check_setting = (
			<PanelBody title={ __( "Radio & Checkbox","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
				<ToggleControl
					label={ __( "Override Current Style","ultimate-addons-for-gutenberg" ) }
					checked={ enableOveride }
					onChange={ ( value ) => setAttributes( { enableOveride: ! enableOveride } ) }
				/>
				{ enableOveride && <Fragment>
					<RangeControl
						label={ __( "Size","ultimate-addons-for-gutenberg" ) }
						value={ radioCheckSize }
						onChange={ ( value ) => setAttributes( { radioCheckSize: value } ) }
						min={ 0 }
						max={ 200 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Radio & Checkbox Label","ultimate-addons-for-gutenberg" ) }</h2>
					<TypographyControl
						label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: radioCheckLoadGoogleFonts, label: "radioCheckLoadGoogleFonts" } }
						fontFamily={ { value: radioCheckFontFamily, label: "radioCheckFontFamily" } }
						fontWeight={ { value: radioCheckFontWeight, label: "radioCheckFontWeight" } }
						fontSubset={ { value: radioCheckFontSubset, label: "radioCheckFontSubset" } }
						fontSizeType={ { value: radioCheckFontSizeType, label: "radioCheckFontSizeType" } }
						fontSize={ { value: radioCheckFontSize, label: "radioCheckFontSize" } }
						fontSizeMobile={ { value: radioCheckFontSizeMobile, label: "radioCheckFontSizeMobile" } }
						fontSizeTablet={ { value: radioCheckFontSizeTablet, label: "radioCheckFontSizeTablet" } }
						lineHeightType={ { value: radioCheckLineHeightType, label: "radioCheckLineHeightType" } }
						lineHeight={ { value: radioCheckLineHeight, label: "radioCheckLineHeight" } }
						lineHeightMobile={ { value: radioCheckLineHeightMobile, label: "radioCheckLineHeightMobile" } }
						lineHeightTablet={ { value: radioCheckLineHeightTablet, label: "radioCheckLineHeightTablet" } }
					/>
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Label Color","ultimate-addons-for-gutenberg" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={ { backgroundColor: radioCheckLableColor } } ></span></span></p>
					<ColorPalette
						value={ radioCheckLableColor }
						onChange={ ( colorValue ) => setAttributes( { radioCheckLableColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Background Color","ultimate-addons-for-gutenberg" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={ { backgroundColor: radioCheckBgColor } } ></span></span></p>
					<ColorPalette
						value={ radioCheckBgColor }
						onChange={ ( colorValue ) => setAttributes( { radioCheckBgColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Selected Color","ultimate-addons-for-gutenberg" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={ { backgroundColor: radioCheckSelectColor } } ></span></span></p>
					<ColorPalette
						value={ radioCheckSelectColor }
						onChange={ ( colorValue ) => setAttributes( { radioCheckSelectColor: colorValue } ) }
						allowReset
					/>	
					
					{ fieldBorderStyle !=="none" && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Radio & Checkbox Border" ) }</h2>
						<RangeControl
							label={ __( "Border Width (px)","ultimate-addons-for-gutenberg" ) }
							value={ radioCheckBorderWidth }
							onChange={ ( value ) => setAttributes( { radioCheckBorderWidth: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type","ultimate-addons-for-gutenberg" ) }>
							<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ radioCheckBorderRadiusType === "px" } aria-pressed={ radioCheckBorderRadiusType === "px" } onClick={ () => setAttributes( { radioCheckBorderRadiusType: "px" } ) }>{ "px" }</Button>
							<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ radioCheckBorderRadiusType === "%" } aria-pressed={ radioCheckBorderRadiusType === "%" } onClick={ () => setAttributes( { radioCheckBorderRadiusType: "%" } ) }>{ "%" }</Button>
						</ButtonGroup>
						<RangeControl
							label={ __( "Border Radius","ultimate-addons-for-gutenberg" ) }
							value={ radioCheckBorderRadius }
							onChange={ ( value ) => setAttributes( { radioCheckBorderRadius: value } ) }
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Border Color","ultimate-addons-for-gutenberg" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={ { backgroundColor: radioCheckBorderColor } } ></span></span></p>
						<ColorPalette
							value={ radioCheckBorderColor }
							onChange={ ( colorValue ) => setAttributes( { radioCheckBorderColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
					}		
								
				</Fragment>
				}
			</PanelBody>
		);

		const msg_settings = (			
			<PanelBody title={ __( "Success / Error Message","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
				<p className="uagb-settings-notice">{ __( "Note: This styling can be only seen on frontend","ultimate-addons-for-gutenberg" ) }</p>
				<hr className="uagb-editor__separator" />
				
				<h2>{ __( "Field Validation","ultimate-addons-for-gutenberg" ) }</h2>					

				<p className="uagb-setting-label">{ __( "Message Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: validationMsgColor } } ></span></span></p>
				<ColorPalette
					value={ validationMsgColor }
					onChange={ ( colorValue ) => setAttributes( { validationMsgColor: colorValue } ) }
					allowReset
				/>

				<TypographyControl
					label={ __( "Typography" ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ { value: validationMsgLoadGoogleFonts, label: "validationMsgLoadGoogleFonts" } }
					fontFamily={ { value: validationMsgFontFamily, label: "validationMsgFontFamily" } }
					fontWeight={ { value: validationMsgFontWeight, label: "validationMsgFontWeight" } }
					fontSubset={ { value: validationMsgFontSubset, label: "validationMsgFontSubset" } }
					fontSizeType={ { value: validationMsgFontSizeType, label: "validationMsgFontSizeType" } }
					fontSize={ { value: validationMsgFontSize, label: "validationMsgFontSize" } }
					fontSizeMobile={ { value: validationMsgFontSizeMobile, label: "validationMsgFontSizeMobile" } }
					fontSizeTablet={ { value: validationMsgFontSizeTablet, label: "validationMsgFontSizeTablet" } }
					lineHeightType={ { value: validationMsgLineHeightType, label: "validationMsgLineHeightType" } }
					lineHeight={ { value: validationMsgLineHeight, label: "validationMsgLineHeight" } }
					lineHeightMobile={ { value: validationMsgLineHeightMobile, label: "validationMsgLineHeightMobile" } }
					lineHeightTablet={ { value: validationMsgLineHeightTablet, label: "validationMsgLineHeightTablet" } }
				/>

				<ToggleControl
					label={ __( "Advanced Settings","ultimate-addons-for-gutenberg" ) }
					checked={ advancedValidationSettings }
					onChange={ ( value ) => setAttributes( { advancedValidationSettings: ! advancedValidationSettings } ) }
				/>

				{ advancedValidationSettings && <Fragment>
					<p className="uagb-setting-label">{ __( "Field Background Color","ultimate-addons-for-gutenberg" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={ { backgroundColor: validationMsgBgColor } } ></span></span></p>

					<ColorPalette
						value={ validationMsgBgColor }
						onChange={ ( colorValue ) => setAttributes( { validationMsgBgColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}

				{ advancedValidationSettings && <Fragment>
					<p className="uagb-setting-label">{ __( "Highlight Border Color","ultimate-addons-for-gutenberg" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={ { backgroundColor: highlightBorderColor } } ></span></span></p>
					<ColorPalette
						value={ highlightBorderColor }
						onChange={ ( colorValue ) => setAttributes( { highlightBorderColor: colorValue } ) }
						allowReset
					/>						
				</Fragment>
				}

				<hr className="uagb-editor__separator" />
				<h2>{ __( "Form Error Validation","ultimate-addons-for-gutenberg" ) }</h2>	

				<p className="uagb-setting-label">{ __( "Error Message Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: errorMsgColor } } ></span></span></p>
				<ColorPalette
					value={ errorMsgColor }
					onChange={ ( colorValue ) => setAttributes( { errorMsgColor: colorValue } ) }
					allowReset
				/>

				<p className="uagb-setting-label">{ __( "Error Message Background Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: errorMsgBgColor } } ></span></span></p>
				<ColorPalette
					value={ errorMsgBgColor }
					onChange={ ( colorValue ) => setAttributes( { errorMsgBgColor: colorValue } ) }
					allowReset
				/>

				<p className="uagb-setting-label">{ __( "Error Message Border Color" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: errorMsgBorderColor } } ></span></span></p>
				<ColorPalette
					value={ errorMsgBorderColor }
					onChange={ ( colorValue ) => setAttributes( { errorMsgBorderColor: colorValue } ) }
					allowReset
				/>

				<RangeControl
					label={ __( "Message Border Width (px)","ultimate-addons-for-gutenberg" ) }
					value={ msgBorderSize }
					onChange={ ( value ) => setAttributes( { msgBorderSize: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>			
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ msgBorderRadiusType === "px" } aria-pressed={ msgBorderRadiusType === "px" } onClick={ () => setAttributes( { msgBorderRadiusType: "px" } ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ msgBorderRadiusType === "%" } aria-pressed={ msgBorderRadiusType === "%" } onClick={ () => setAttributes( { msgBorderRadiusType: "%" } ) }>{ "%" }</Button>
				</ButtonGroup>
				<RangeControl
					label={ __( "Message Border Radius","ultimate-addons-for-gutenberg" ) }
					value={ msgBorderRadius }
					onChange={ ( value ) => setAttributes( { msgBorderRadius: value } ) }
					min={ 0 }
					max={ 100 }
					allowReset
				/>

				<h2>{ __( "Message Padding (px)","ultimate-addons-for-gutenberg" ) }</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ "uagb-margin-control" }
					value={ msgVrPadding }
					onChange={ ( value ) => setAttributes( { msgVrPadding: value } ) }
					min={ 0 }
					max={ 200 }
					allowReset
				/>					
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ "uagb-margin-control" }
					value={ msgHrPadding }
					onChange={ ( value ) => setAttributes( { msgHrPadding: value } ) }
					min={ 0 }
					max={ 200 }
					allowReset
				/>

				<TypographyControl
					label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ { value: msgLoadGoogleFonts, label: "msgLoadGoogleFonts" } }
					fontFamily={ { value: msgFontFamily, label: "msgFontFamily" } }
					fontWeight={ { value: msgFontWeight, label: "msgFontWeight" } }
					fontSubset={ { value: msgFontSubset, label: "msgFontSubset" } }
					fontSizeType={ { value: msgFontSizeType, label: "msgFontSizeType" } }
					fontSize={ { value: msgFontSize, label: "msgFontSize" } }
					fontSizeMobile={ { value: msgFontSizeMobile, label: "msgFontSizeMobile" } }
					fontSizeTablet={ { value: msgFontSizeTablet, label: "msgFontSizeTablet" } }
					lineHeightType={ { value: msgLineHeightType, label: "msgLineHeightType" } }
					lineHeight={ { value: msgLineHeight, label: "msgLineHeight" } }
					lineHeightMobile={ { value: msgLineHeightMobile, label: "msgLineHeightMobile" } }
					lineHeightTablet={ { value: msgLineHeightTablet, label: "msgLineHeightTablet" } }
				/>			
					
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Form Success Validation","ultimate-addons-for-gutenberg" ) }</h2>
				<p className="uagb-setting-label">{ __( "Success Message Color","ultimate-addons-for-gutenberg" ) }
					<span className="components-base-control__label">
						<span className="component-color-indicator" style={ { backgroundColor: successMsgColor } } ></span></span></p>
				<ColorPalette
					value={ successMsgColor }
					onChange={ ( colorValue ) => setAttributes( { successMsgColor: colorValue } ) }
					allowReset
				/>

				<TypographyControl
					label={ __( "Success Message Typography","ultimate-addons-for-gutenberg" ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ { value: successMsgLoadGoogleFonts, label: "successMsgLoadGoogleFonts" } }
					fontFamily={ { value: successMsgFontFamily, label: "successMsgFontFamily" } }
					fontWeight={ { value: successMsgFontWeight, label: "successMsgFontWeight" } }
					fontSubset={ { value: successMsgFontSubset, label: "successMsgFontSubset" } }
					fontSizeType={ { value: successMsgFontSizeType, label: "successMsgFontSizeType" } }
					fontSize={ { value: successMsgFontSize, label: "successMsgFontSize" } }
					fontSizeMobile={ { value: successMsgFontSizeMobile, label: "successMsgFontSizeMobile" } }
					fontSizeTablet={ { value: successMsgFontSizeTablet, label: "successMsgFontSizeTablet" } }
					lineHeightType={ { value: successMsgLineHeightType, label: "successMsgLineHeightType" } }
					lineHeight={ { value: successMsgLineHeight, label: "successMsgLineHeight" } }
					lineHeightMobile={ { value: successMsgLineHeightMobile, label: "successMsgLineHeightMobile" } }
					lineHeightTablet={ { value: successMsgLineHeightTablet, label: "successMsgLineHeightTablet" } }
				/>				
				
			</PanelBody>
		);

		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ align }
						onChange={ ( value ) => setAttributes( { align: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					{ field_settings }
					{ field_border_setting }
					{ typography_settings }				
					{ radio_check_setting }
					{ btn_setting }
					{ msg_settings }
					{ spacing }
				</InspectorControls>
				<div
					className={ classnames(
						className,	
						"uagb-gf-styler__outer-wrap",
						`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }
				>
					<div className={  classnames(
						`uagb-gf-styler__align-${align}`,
						`uagb-gf-styler__field-style-${fieldStyle}`,
						`uagb-gf-styler__btn-align-${buttonAlignment}`,
						`uagb-gf-styler__gform-heading-${titleDescStyle}`,
						( enableOveride ? "uagb-gf-styler__check-style-enabled" : "" ),
						( enableLabel ? "uagb-gf-styler__hide-label" : "" ),
						( advancedValidationSettings ? "uagb-gf-styler__error-yes" : "" ),
					) }>

						{ isHtml &&
							<div dangerouslySetInnerHTML={ { __html: html } } />
						}
						{ isHtml == false &&
							<Placeholder
								icon="admin-post"
								label={ __( "Loading","ultimate-addons-for-gutenberg" ) }
							>
								<Spinner />
							</Placeholder>
						}
					</div>
				</div>
				{ loadInputGoogleFonts }
				{ loadButtonGoogleFonts }
				{ loadLabelGoogleFonts }
				{ loadRadioGoogleFonts }
				{ loadValidationGoogleFonts }
				{ loadMsgGoogleFonts }
			</Fragment>
		);
	}

	componentDidMount() {
		// Assigning block_id in the attribute.
		this.props.setAttributes( { isHtml: false } );
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-gf-styler-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}

	componentDidUpdate(){				
		$( ".wpgf-submit" ).click( function( event ) {
			event.preventDefault();
		} );

		const element = document.getElementById( "uagb-gf-styler-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

}

export default withSelect( ( select, props ) => {
	const { setAttributes } = props;
	const { formId, isHtml } = props.attributes;
	let json_data = "";

	if ( formId && -1 != formId && 0 != formId && ! isHtml ) {

		$.ajax( {
			url: uagb_blocks_info.ajax_url,
			data: {
				action: "uagb_gf_shortcode",
				formId,
				nonce: uagb_blocks_info.uagb_ajax_nonce
			},
			dataType: "json",
			type: "POST",
			success( data ) {
				setAttributes( { isHtml: true } );
				setAttributes( { formJson: data } );
				json_data = data;
			}
		} );
	}

	return {
		formHTML: json_data
	};
} )( UAGBGF );
