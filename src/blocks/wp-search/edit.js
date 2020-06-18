/**
 * BLOCK: WP Search 
 */

import styling from "./styling"
import { Fragment } from "react"
import classnames from "classnames"
import BoxShadowControl from "../../components/box-shadow"
import TypographyControl from "../../components/typography"
import WebfontLoader from "../../components/typography/fontloader"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

const { __ } = wp.i18n
const {
	Component,
} = wp.element
const {
	InspectorControls,
    ColorPalette,
    RichText
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
    TextControl,
    TabPanel,
    ButtonGroup,
	Button,
    Dashicon,
} = wp.components

class UAGBWpSearchEdit extends Component {

	constructor() {
        super( ...arguments )
        this.formPreventDefault = this.formPreventDefault.bind( this )
        this.state = {
			isFocused: "false",
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-wp-search-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
    }
    componentDidUpdate(prevProps, prevState) {

		if ( ! this.props.isSelected && prevProps.isSelected && this.state.isFocused ) {
			this.setState( {
				isFocused: "false",
			} )
		}
		if ( this.props.isSelected && ! prevProps.isSelected ) {

			this.setState( {
				isFocused: true,
			} )
        }
        
        var element = document.getElementById( "uagb-style-wp-search-" + this.props.clientId.substr( 0, 8 ) )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
        }

	}
    formPreventDefault( e ) {
        e.preventDefault();
    }
    
	render() {
        const { attributes, setAttributes } = this.props
        const {
            block_id,
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
            inputSizeType
        } = attributes
        
        let loadInputGoogleFonts;

		if( inputloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ inputFontFamily + ( inputFontWeight ? ':' + inputFontWeight : '' ) ],
				},
			};

			loadInputGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			)
        }
        let loadButtonGoogleFonts;

		if( buttonloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ buttonFontFamily + ( buttonFontWeight ? ':' + buttonFontWeight : '' ) ],
				},
			};

			loadButtonGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			)
        }
        
        const generalSettings = () => {
            return (

                <PanelBody
                    title={ __( "General" ) }
                    initialOpen={ true }
                    className="uagb__url-panel-body"
				>
                    <SelectControl
						label={ __( "Layout" ) }
						value={ layout }
						options={ [
                            { value: "input-button", label: __( "Classic" ) },
							{ value: "input", label: __( "Minimal" ) },
						] }
						onChange={ (value) => setAttributes( { layout: value } ) }
					/>
                    <Fragment>
                        <TextControl
                            label= { __( "Placeholder" ) }
                            value= { placeholder }
                            onChange={ value => setAttributes( { placeholder: value } ) }
                        />
                        <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
                            <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputSizeType === "px" } aria-pressed={ inputSizeType === "px" } onClick={ () => setAttributes( { inputSizeType: "px" } ) }>{ "px" }</Button>
                            <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputSizeType === "%" } aria-pressed={ inputSizeType === "%" } onClick={ () => setAttributes( { inputSizeType: "%" } ) }>{ "%" }</Button>
                        </ButtonGroup>
                        <RangeControl
                            label={ __( "Input Width" ) }
                            value={ inputSize }
                            onChange={ ( value ) => setAttributes( { inputSize: value } ) }
                            min={ 0 }
                            max={ ( "px" === inputSizeType ) ? 500 : 100 }
                        />
                    </Fragment>
                    
                </PanelBody>
            )
        }
        const inputSettings = () => {

            return (

                <PanelBody
                    title={ __( "Input Box" ) }
                    initialOpen={ false }
                    className="uagb__url-panel-body"
				>
                    <Fragment>

                        <TypographyControl
                            label={ __( "Typography" ) }
                            attributes = { attributes }
                            setAttributes = { setAttributes }
                            loadGoogleFonts = { { value: inputloadGoogleFonts, label: 'inputloadGoogleFonts'  } }
                            fontFamily = { { value: inputFontFamily, label: 'inputFontFamily'  } }
                            fontWeight = { { value: inputFontWeight, label: 'inputFontWeight'  } }
                            fontSubset = { { value: inputFontSubset, label: 'inputFontSubset'  } }
                            fontSizeType = { { value: inputFontSizeType, label: 'inputFontSizeType' } }
                            fontSize = { { value: inputFontSize, label: 'inputFontSize'  } }
                            fontSizeMobile = { { value: inputFontSizeMobile, label: 'inputFontSizeMobile'  } }
                            fontSizeTablet= { { value: inputFontSizeTablet, label: 'inputFontSizeTablet' } }
                            lineHeightType = { { value: inputLineHeightType, label: 'inputLineHeightType' } }
                            lineHeight = { { value: inputLineHeight, label: 'inputLineHeight'  } }
                            lineHeightMobile = { { value: inputLineHeightMobile, label: 'inputLineHeightMobile'  } }
                            lineHeightTablet= { { value: inputLineHeightTablet, label: 'inputLineHeightTablet'  } }
                        />
                        <TabPanel className="uagb-size-type-field-tabs uagb-size-type-field__common-tabs uagb-inline-margin" activeClass="active-tab"
                        tabs={ [
                            {
                                name: "desktop",
                                title: <Dashicon icon="desktop" />,
                                className: "uagb-desktop-tab uagb-responsive-tabs",
                            },
                            {
                                name: "tablet",
                                title: <Dashicon icon="tablet" />,
                                className: "uagb-tablet-tab uagb-responsive-tabs",
                            },
                            {
                                name: "mobile",
                                title: <Dashicon icon="smartphone" />,
                                className: "uagb-mobile-tab uagb-responsive-tabs",
                            },
                        ] }>
                        {
                            ( tab ) => {
                                let tabout

                                if ( "mobile" === tab.name ) {
                                    tabout = (
                                        <Fragment>
                                            <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
                                                <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "px" } aria-pressed={ inputPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { inputPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
                                                <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "%" } aria-pressed={ inputPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { inputPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
                                            </ButtonGroup>
                                            <h2>{ __( "Padding" ) }</h2>
                                            <RangeControl
                                                label={ UAGB_Block_Icons.vertical_spacing }
                                                className={ "uagb-margin-control" }
                                                value={ vinputPaddingMobile }
                                                onChange={ ( value ) => setAttributes( { vinputPaddingMobile: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                            <RangeControl
                                                label={ UAGB_Block_Icons.horizontal_spacing }
                                                className={ "uagb-margin-control" }
                                                value={ hinputPaddingMobile }
                                                onChange={ ( value ) => setAttributes( { hinputPaddingMobile: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                        </Fragment>
                                    )
                                } else if ( "tablet" === tab.name ) {
                                    tabout = (
                                        <Fragment>
                                            <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
                                                <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "px" } aria-pressed={ inputPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { inputPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
                                                <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "%" } aria-pressed={ inputPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { inputPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
                                            </ButtonGroup>
                                            <h2>{ __( "Padding" ) }</h2>
                                            <RangeControl
                                                label={ UAGB_Block_Icons.vertical_spacing }
                                                className={ "uagb-margin-control" }
                                                value={ vinputPaddingTablet }
                                                onChange={ ( value ) => setAttributes( { vinputPaddingTablet: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                            <RangeControl
                                                label={ UAGB_Block_Icons.horizontal_spacing }
                                                className={ "uagb-margin-control" }
                                                value={ hinputPaddingTablet }
                                                onChange={ ( value ) => setAttributes( { hinputPaddingTablet: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                        </Fragment>
                                    )
                                } else {
                                    tabout = (
                                        <Fragment>
                                            <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
                                                <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "px" } aria-pressed={ inputPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { inputPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
                                                <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "%" } aria-pressed={ inputPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { inputPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
                                            </ButtonGroup>
                                            <h2>{ __( "Padding" ) }</h2>
                                            <RangeControl
                                                label={ UAGB_Block_Icons.vertical_spacing }
                                                className={ "uagb-margin-control" }
                                                value={ vinputPaddingDesktop }
                                                onChange={ ( value ) => setAttributes( { vinputPaddingDesktop: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                            <RangeControl
                                                label={ UAGB_Block_Icons.horizontal_spacing }
                                                className={ "uagb-margin-control" }
                                                value={ hinputPaddingDesktop }
                                                onChange={ ( value ) => setAttributes( { hinputPaddingDesktop: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                        </Fragment>
                                    )
                                }

                                return <div>{ tabout }</div>
                            }
                        }
                        </TabPanel>
                        <p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: textColor }} ></span></span></p>
                        <ColorPalette
                            value={ textColor }
                            onChange={ ( value ) => setAttributes( { textColor: value } ) }
                            allowReset
                        />
                        <p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: inputBgColor }} ></span></span></p>
                        <ColorPalette
                            value={ inputBgColor }
                            onChange={ ( value ) => setAttributes( { inputBgColor: value } ) }
                            allowReset
                        />
                        <BoxShadowControl
                            setAttributes = { setAttributes }
                            label = { __( "Box Shadow" ) }
                            boxShadowColor = { { value: boxShadowColor, label: __( "Color" ) } }
                            boxShadowHOffset = { { value: boxShadowHOffset, label: __( "Horizontal" ) } }
                            boxShadowVOffset = { { value: boxShadowVOffset, label: __( "Vertical" ) } }
                            boxShadowBlur = { { value: boxShadowBlur, label: __( "Blur" ) } }
                            boxShadowSpread = { { value: boxShadowSpread, label: __( "Spread" ) } }
                            boxShadowPosition = { { value: boxShadowPosition, label: __( "Position" ) } }
                        />
                        
                        <h2>{ __( "Border" ) }</h2>
                        <SelectControl
                            label={ __( "Style" ) }
                            value={ borderStyle }
                            options={ [
                                { value: "none", label: __( "None" ) },
                                { value: "solid", label: __( "Solid" ) },
                                { value: "dotted", label: __( "Dotted" ) },
                                { value: "dashed", label: __( "Dashed" ) },
                                { value: "double", label: __( "Double" ) },
                            ] }
                            onChange={ value => {
                                setAttributes( { borderStyle: value } )
                            } }
                        />
                        { "none" !== borderStyle &&
                            <RangeControl
                                label={ __( "Thickness (px)" ) }
                                value={ borderWidth }
                                onChange={ value => {
                                    setAttributes( { borderWidth: value } )
                                } }
                                min={ 0 }
                                max={ 20 }
                            />
                        }
                        { "none" !== borderStyle &&
                            <RangeControl
                                label={ __( "Rounded Corners (px)" ) }
                                value={ borderRadius }
                                onChange={ value => {
                                    setAttributes( { borderRadius: value } )
                                } }
                                min={ 0 }
                                max={ 50 }
                            />
                        }
                        <p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
                        <ColorPalette
                            value={ borderColor }
                            onChange={ ( value ) => setAttributes( { borderColor: value } ) }
                            allowReset
                        />
                    </Fragment> 
                </PanelBody>
            )
        }
        const buttonSettings = () => {

            if( 'input-button' === layout ) {

                return (
                    <PanelBody
                        title={ __( "Button" ) }
                        initialOpen={ false }
                        className="uagb__url-panel-body"
                    >
                        <Fragment>
                            <SelectControl
                                label={ __( "Type" ) }
                                value={ buttonType }
                                options={ [
                                    { value: "icon", label: __( "Icon" ) },
                                    { value: "text", label: __( "Text" ) },
                                ] }
                                onChange={ value => {
                                    setAttributes( { buttonType: value } )
                                } }
                            />
                            { 'text' === buttonType &&
                                <Fragment>
                                    <TextControl
                                        label="Text"
                                        value={ buttonText }
                                        onChange={ value => {
                                            setAttributes( { buttonText: value } )
                                        } }
                                    />
                                    <TypographyControl
                                        label={ __( "Typography" ) }
                                        attributes = { attributes }
                                        setAttributes = { setAttributes }
                                        loadGoogleFonts = { { value: buttonloadGoogleFonts, label: 'buttonloadGoogleFonts'  } }
                                        fontFamily = { { value: buttonFontFamily, label: 'buttonFontFamily'  } }
                                        fontWeight = { { value: buttonFontWeight, label: 'buttonFontWeight'  } }
                                        fontSubset = { { value: buttonFontSubset, label: 'buttonFontSubset'  } }
                                        fontSizeType = { { value: buttonFontSizeType, label: 'buttonFontSizeType' } }
                                        fontSize = { { value: buttonFontSize, label: 'buttonFontSize'  } }
                                        fontSizeMobile = { { value: buttonFontSizeMobile, label: 'buttonFontSizeMobile'  } }
                                        fontSizeTablet= { { value: buttonFontSizeTablet, label: 'buttonFontSizeTablet' } }
                                        lineHeightType = { { value: buttonLineHeightType, label: 'buttonLineHeightType' } }
                                        lineHeight = { { value: buttonLineHeight, label: 'buttonLineHeight'  } }
                                        lineHeightMobile = { { value: buttonLineHeightMobile, label: 'buttonLineHeightMobile'  } }
                                        lineHeightTablet= { { value: buttonLineHeightTablet, label: 'buttonLineHeightTablet'  } }
                                    />
                                </Fragment>
                            }
                            <RangeControl
                                label={ __( "Width" ) }
                                value={ buttonWidth }
                                onChange={ value => {
                                    setAttributes( { buttonWidth: value } )
                                } }
                                min={ 0 }
                                max={ 500 }
                            />
                            <Fragment>
                                <p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: buttonBgColor }} ></span></span></p>
                                <ColorPalette
                                    value={ buttonBgColor }
                                    onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
                                    allowReset
                                />
                                <p className="uagb-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: buttonBgHoverColor }} ></span></span></p>
                                <ColorPalette
                                    value={ buttonBgHoverColor }
                                    onChange={ ( value ) => setAttributes( { buttonBgHoverColor: value } ) }
                                    allowReset
                                />
                                { 'text' === buttonType &&
                                    <Fragment>
                                        <p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: buttonTextColor }} ></span></span></p>
                                        <ColorPalette
                                            value={ buttonTextColor }
                                            onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
                                            allowReset
                                        />
                                        <p className="uagb-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: buttonTextHoverColor }} ></span></span></p>
                                        <ColorPalette
                                            value={ buttonTextHoverColor }
                                            onChange={ ( value ) => setAttributes( { buttonTextHoverColor: value } ) }
                                            allowReset
                                        />
                                    </Fragment>
                                }
                            </Fragment>
                            { 'icon' === buttonType &&
                                <Fragment>
                                    <hr className="uagb-editor__separator" />
                                    <h2>{ __( "Icon" ) }</h2>
                                    <RangeControl
                                        label={ __( "Size" ) }
                                        value={ buttonIconSize }
                                        onChange={ value => {
                                            setAttributes( { buttonIconSize: value } )
                                        } }
                                        min={ 0 }
                                        max={ 500 }
                                    />
                                    <p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: buttonIconColor }} ></span></span></p>
                                    <ColorPalette
                                        value={ buttonIconColor }
                                        onChange={ ( value ) => setAttributes( { buttonIconColor: value } ) }
                                        allowReset
                                    />
                                    <p className="uagb-setting-label">{ __( "Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: buttonIconHoverColor }} ></span></span></p>
                                    <ColorPalette
                                        value={ buttonIconHoverColor }
                                        onChange={ ( value ) => setAttributes( { buttonIconHoverColor: value } ) }
                                        allowReset
                                    />
                                </Fragment>
                            }
                        </Fragment> 
                    </PanelBody>
                )
            }
            
            return '';
        }
        const iconSettings = () => {

            if ( 'input' === layout ) {

                return (

                    <PanelBody
                        title={ __( "Icon" ) }
                        initialOpen={ false }
                        className="uagb__url-panel-body"
                    >
                        <Fragment>
                            <RangeControl
                                label={ __( "Size" ) }
                                value={ iconSize }
                                onChange={ value => {
                                    setAttributes( { iconSize: value } )
                                } }
                                min={ 0 }
                                max={ 500 }
                            />
                            <p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconColor }} ></span></span></p>
                            <ColorPalette
                                value={ iconColor }
                                onChange={ ( value ) => setAttributes( { iconColor: value } ) }
                                allowReset
                            />
                        </Fragment>

                    </PanelBody>
                )
            }

            return '';
        }
        const renderClassic = () => {
            
            if ( 'input-button' === layout ) {
                
                return (
                    <form className="uagb-search-wrapper" onSubmit={ this.formPreventDefault } role="search" action={ uagb_blocks_info.uagb_home_url } method="get">
                        <div className="uagb-search-form__container wp-block-button" role="tablist">
                            <input placeholder={ placeholder } 
                            className="uagb-search-form__input" type="search" name="s" title="Search"/>
                            
                            <button className="uagb-search-submit wp-block-button__link" type="submit">
                                { "icon" === buttonType &&
                                    <span className="uagb-wp-search-button-icon-wrap">
                                        { renderSVG( 'fas fa-search' ) }
                                    </span>
                                }
                                { "text" === buttonType &&
                                    <RichText
                                        tagName="span"
                                        placeholder={ __( "Search" ) }
                                        value={ buttonText }
                                        onChange={ ( value ) => setAttributes( { buttonText: value } ) }
                                        className='uagb-wp-search-button-text'
                                        multiline={false}
                                        allowedFormats={[ 'core/bold', 'core/italic', 'core/strikethrough' ]}
                                    />
                                }
                            </button>

                        </div>
                    </form>
                )
            }

            return '';
        }
        const renderMinimal = () => {
            
            if ( 'input' === layout ) {
                
                return (
                    <form className="uagb-search-wrapper" onSubmit={ this.formPreventDefault } role="search" action={ uagb_blocks_info.uagb_home_url } method="get">
                        <div className="uagb-search-form__container" role="tablist">
                            <span className="uagb-wp-search-icon-wrap">
                                { renderSVG( 'fas fa-search' ) }
                            </span>
                            <input placeholder={ placeholder } 
                            className="uagb-search-form__input" type="search" name="s" title="Search"/>
                        </div>
                    </form>
                )
            }

            return '';
        }
        
		return (
			<div className={ classnames(
                "uagb-wp-search__outer-wrap",
                `uagb-block-${ block_id }`,
                `uagb-layout-${ layout }`
            ) }
            >
            <InspectorControls>
                { generalSettings() }
                { inputSettings() }
                { buttonSettings() }
                { iconSettings() }
            </InspectorControls>
            { renderClassic() }
            { renderMinimal() }
            { loadInputGoogleFonts }
            { loadButtonGoogleFonts }
            </div>
		)
	}
}

export default UAGBWpSearchEdit
