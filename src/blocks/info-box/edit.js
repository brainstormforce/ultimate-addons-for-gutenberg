/**
 * BLOCK: Info Box - Edit Class
 */

import classnames from "classnames"
import UAGBIcon from "@Controls/UAGBIcon.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import Prefix from "./components/Prefix"
import Title from "./components/Title"
import Icon from "./components/Icon"
import InfoBoxDesc from "./components/InfoBoxDesc"
import InfoBoxPositionClasses from "./classes"
import InfoBoxSeparator from "./components/InfoBoxSeparator"
import CallToAction from "./components/CallToAction"
import InfoBoxStyle from "./inline-styles"
import InfoBoxIconImage from "./components/IconImageV23_3"
import renderSVG from "@Controls/renderIcon"
import UAGB_Block_Icons from "@Controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

let svg_icons = Object.keys( UAGBIcon )

import { __ } from '@wordpress/i18n';

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	MediaUpload
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
	ButtonGroup,
} = wp.components

const { Component, Fragment } = wp.element

let imageSizeOptions = [
	{ value: "thumbnail", label: __( "Thumbnail", 'ultimate-addons-for-gutenberg' ) },
	{ value: "medium", label: __( "Medium", 'ultimate-addons-for-gutenberg' ) },
	{ value: "full", label: __( "Large", 'ultimate-addons-for-gutenberg' ) }
]

$ = jQuery;

class UAGBinfoBox extends Component {

	constructor() {

		super( ...arguments )
		this.getIfbIcon  	  = this.getIfbIcon.bind(this)
		this.toggleTarget     = this.toggleTarget.bind( this )
		this.toggleResponsive = this.toggleResponsive.bind( this )
		this.onSelectImage    = this.onSelectImage.bind( this )
		this.onRemoveImage    = this.onRemoveImage.bind( this )
		this.getCtaicon  	  = this.getCtaicon.bind(this)
		this.getImageSize  	  = this.getImageSize.bind(this)
	}

	getIfbIcon(value) {
		this.props.setAttributes( { icon: value } )
	}

	getCtaicon(value) {
		this.props.setAttributes( { ctaIcon: value } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {
		const { iconImage } = this.props.attributes
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { iconImage: null } )
			return
		}

		if ( ! media.type || "image" !== media.type ) {
			setAttributes( { iconImage: null } )
			return
		}
		if ( media["sizes"] ) {
			var new_img = this.getImageSize(media["sizes"])
			imageSizeOptions = new_img
		}
		setAttributes( { iconImage: media } )
	}

	getImageSize( sizes ) {
		var size_arr = []
		$.each(sizes, function (index, item) {
		  var name = index
		  	var p = { "value" : name, "label": name }
		  	size_arr.push(p)
		})
		return(size_arr)
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props

		setAttributes( { iconImage: '' } )
	}

	/**
	 * Function Name: toggleTarget.
	 */
	toggleTarget() {
		const { ctaTarget } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { ctaTarget: ! ctaTarget } )
	}

	/**
	 * Function Name: toggleResponsive.
	 */
	toggleResponsive() {
		const { responsiveDesign } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { responsiveDesign: ! responsiveDesign } )
	}

	render() {

		const { className, setAttributes, attributes } = this.props

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
			inheritFromTheme
		} = attributes

		// Icon properties.
		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: this.getIfbIcon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon", 'ultimate-addons-for-gutenberg' )
		}

		// Icon properties.
		const cta_icon_props = {
			icons: svg_icons,
			renderFunc: renderSVG,
			value: ctaIcon,
			onChange: this.getCtaicon,
			isMulti: false,
			noSelectedPlaceholder: __( "Select Icon", 'ultimate-addons-for-gutenberg' )
		}

		if( iconImage && iconImage["sizes"] ){
			imageSizeOptions = this.getImageSize(iconImage["sizes"])
		}

		let loadPrefixGoogleFonts
		let loadSubHeadGoogleFonts
		let loadCtaGoogleFonts
		let loadHeadGoogleFonts

		if( prefixLoadGoogleFonts == true ) {

			const prefixconfig = {
				google: {
					families: [ prefixFontFamily + ( prefixFontWeight ? ":" + prefixFontWeight : "" ) ],
				},
			}

			loadPrefixGoogleFonts = (
				<WebfontLoader config={ prefixconfig }>
				</WebfontLoader>
			)
		}

		if( headLoadGoogleFonts == true ) {

			const headconfig = {
				google: {
					families: [ headFontFamily + ( headFontWeight ? ":" + headFontWeight : "" ) ],
				},
			}

			loadHeadGoogleFonts = (
				<WebfontLoader config={ headconfig }>
				</WebfontLoader>
			)
		}

		if( subHeadLoadGoogleFonts == true ) {

			const subHeadconfig = {
				google: {
					families: [ subHeadFontFamily + ( subHeadFontWeight ? ":" + subHeadFontWeight : "" ) ],
				},
			}

			loadSubHeadGoogleFonts = (
				<WebfontLoader config={ subHeadconfig }>
				</WebfontLoader>
			)
		}

		if( subHeadLoadGoogleFonts == true ) {

			const ctaconfig = {
				google: {
					families: [ ctaFontFamily + ( ctaFontWeight ? ":" + ctaFontWeight : "" ) ],
				},
			}

			loadCtaGoogleFonts = (
				<WebfontLoader config={ ctaconfig }>
				</WebfontLoader>
			)
		}

		// Settings for icon.
		const iconControls = (
			<Fragment>
				<FontIconPicker {...icon_props} />
				<RangeControl
					label = { __( "Icon Size", 'ultimate-addons-for-gutenberg' ) }
					value = { iconSize }
					onChange = { ( value ) => setAttributes( { iconSize: value } ) }
					min = { 10 }
					max = { 300 }
					beforeIcon = ""
					allowReset
				/>
				<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal", 'ultimate-addons-for-gutenberg' ),
							className: "uagb-normal-tab",
						},
						{
							name: "hover",
							title: __( "Hover", 'ultimate-addons-for-gutenberg' ),
							className: "uagb-focus-tab",
						},
					] }>
					{
						( tabName ) => {
							let tabout_icon
							if( "normal" === tabName.name ) {
								tabout_icon = <Fragment>
									<p className="uagb-setting-label">{ __( "Icon Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconColor }} ></span></span></p>
									<ColorPalette
										value={ iconColor }
										onChange={ ( colorValue ) => setAttributes( { iconColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							}else {
								tabout_icon = <Fragment>
									<p className="uagb-setting-label">{ __( "Icon Hover Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconHover }} ></span></span></p>
									<ColorPalette
										value={ iconHover }
										onChange={ ( colorValue ) => setAttributes( { iconHover: colorValue } ) }
										allowReset
									/>
								</Fragment>
							}
							return <div>{ tabout_icon }</div>
						}
					}
				</TabPanel>
			</Fragment>
		)

		// Separator settings.
		const seperatorSettings = (
			<PanelBody
				title={ __( "Separator", 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false } >

				<SelectControl
					label={ __( "Position", 'ultimate-addons-for-gutenberg' ) }
					value={ seperatorPosition }
					onChange={ ( value ) => setAttributes( { seperatorPosition: value } ) }
					options={ [
						{ value: "after_icon", label: __( "After Icon/Image", 'ultimate-addons-for-gutenberg' ) },
						{ value: "after_prefix", label: __( "After Prefix", 'ultimate-addons-for-gutenberg' ) },
						{ value: "after_title", label: __( "After Title", 'ultimate-addons-for-gutenberg' ) },
						{ value: "after_desc", label: __( "After Description", 'ultimate-addons-for-gutenberg' ) },
					] }
				/>
				<SelectControl
					label={ __( "Style" ) }
					value={ seperatorStyle }
					onChange={ ( value ) => setAttributes( { seperatorStyle: value } ) }
					options={ [
						{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
						{ value: "solid", label: __( "Solid", 'ultimate-addons-for-gutenberg' ) },
						{ value: "double", label: __( "Double", 'ultimate-addons-for-gutenberg' ) },
						{ value: "dashed", label: __( "Dashed", 'ultimate-addons-for-gutenberg' ) },
						{ value: "dotted", label: __( "Dotted", 'ultimate-addons-for-gutenberg' ) },
					] }
				/>
				{ "none" !== seperatorStyle &&
				( <Fragment>
					<RangeControl
						label={ __( "Thickness", 'ultimate-addons-for-gutenberg' ) }
						value={ seperatorThickness }
						onChange={ ( value ) => setAttributes( { seperatorThickness: value } ) }
						min={ 0 }
						max={ 10 }
						beforeIcon=""
						allowReset
					/>
					<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
						<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ separatorWidthType === "px" } aria-pressed={ separatorWidthType === "px" } onClick={ () => setAttributes( { separatorWidthType: "px" } ) }>{ "px" }</Button>
						<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ separatorWidthType === "%" } aria-pressed={ separatorWidthType === "%" } onClick={ () => setAttributes( { separatorWidthType: "%" } ) }>{ "%" }</Button>
					</ButtonGroup>
					<RangeControl
						label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
						value={ seperatorWidth }
						onChange={ ( value ) => setAttributes( { seperatorWidth: value } ) }
						min={ 0 }
						max={ ( "%" == separatorWidthType ) ? 100 : 500 }
						beforeIcon=""
						allowReset
					/>
				    <p className="uagb-setting-label">{ __( "Separator Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: seperatorColor }} ></span></span></p>
				    <ColorPalette
				        value={ seperatorColor }
				        onChange={ ( colorValue ) => setAttributes( { seperatorColor: colorValue } ) }
				        allowReset
				    />
				</Fragment>
				)
				}

			</PanelBody>
		)

		// CTA settings.
		const ctaSettings = (
			<PanelBody	title={ __( "Call To Action", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }	>
				<SelectControl
					label={ __( "Type", 'ultimate-addons-for-gutenberg' ) }
					value={ ctaType }
					onChange={ ( value ) => setAttributes( { ctaType: value } ) }
					options={ [
						{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
						{ value: "text", label: __( "Text", 'ultimate-addons-for-gutenberg' ) },
						{ value: "button", label: __( "Button", 'ultimate-addons-for-gutenberg' ) },
						{ value: "all", label: __( "Complete Box", 'ultimate-addons-for-gutenberg' ) },
					] }
				/>
				{ ( ctaType === "text" || ctaType === "button" ) && <Fragment>
					<TextControl
						label= { __( "Text", 'ultimate-addons-for-gutenberg' ) }
						value= { ctaText }
						onChange={ value => setAttributes( { ctaText: value } ) }
					/>
					<ToggleControl
						label={ __( "Inherit from Theme", 'ultimate-addons-for-gutenberg' ) }
						checked={ inheritFromTheme }
						onChange={ ( value ) => setAttributes( { inheritFromTheme: ! inheritFromTheme } ) }
					/>
					{ ctaType === "text" &&
						<TypographyControl
							label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: ctaLoadGoogleFonts, label: 'ctaLoadGoogleFonts' } }
							fontFamily = { { value: ctaFontFamily, label: 'ctaFontFamily' } }
							fontWeight = { { value: ctaFontWeight, label: 'ctaFontWeight' } }
							fontSubset = { { value: ctaFontSubset, label: 'ctaFontSubset' } }
							fontSizeType = { { value: ctaFontSizeType, label: 'ctaFontSizeType' } }
							fontSize = { { value: ctaFontSize, label: 'ctaFontSize' } }
							fontSizeMobile = { { value: ctaFontSizeMobile, label: 'ctaFontSizeMobile' } }
							fontSizeTablet= { { value: ctaFontSizeTablet, label: 'ctaFontSizeTablet' } }
							disableLineHeight = {true}
						/>
					}
					{ (!inheritFromTheme  && ctaType === "button")    &&
						<TypographyControl
							label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: ctaLoadGoogleFonts, label: 'ctaLoadGoogleFonts' } }
							fontFamily = { { value: ctaFontFamily, label: 'ctaFontFamily' } }
							fontWeight = { { value: ctaFontWeight, label: 'ctaFontWeight' } }
							fontSubset = { { value: ctaFontSubset, label: 'ctaFontSubset' } }
							fontSizeType = { { value: ctaFontSizeType, label: 'ctaFontSizeType' } }
							fontSize = { { value: ctaFontSize, label: 'ctaFontSize' } }
							fontSizeMobile = { { value: ctaFontSizeMobile, label: 'ctaFontSizeMobile' } }
							fontSizeTablet= { { value: ctaFontSizeTablet, label: 'ctaFontSizeTablet' } }
							disableLineHeight = {true}
						/>
					}
				</Fragment>
				}
				{ ( ctaType !== "none" ) &&
					<Fragment>
						<TextControl
							label= { __( "Link", 'ultimate-addons-for-gutenberg' ) }
							value= { ctaLink }
							onChange={ value => setAttributes( { ctaLink: value } ) }
						/>
						<ToggleControl
							label={ __( "Open in new Window", 'ultimate-addons-for-gutenberg' ) }
							checked={ ctaTarget }
							onChange={ this.toggleTarget }
						/>

					</Fragment>
				}

				{ ( ctaType !== "all" ) && ( ctaType !== "none" ) &&
					<Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Button Icon", 'ultimate-addons-for-gutenberg' ) }</h2>
						<FontIconPicker {...cta_icon_props} />
						{ ctaIcon != "" && <Fragment>
							<SelectControl
								label={ __( "Icon Position", 'ultimate-addons-for-gutenberg' ) }
								value={ ctaIconPosition }
								onChange={ ( value ) => setAttributes( { ctaIconPosition: value } ) }
								options={ [
									{ value: "before", label: __( "Before Text", 'ultimate-addons-for-gutenberg' ) },
									{ value: "after", label: __( "After Text", 'ultimate-addons-for-gutenberg' ) },
								] }
							/>
							<RangeControl
								label={ __( "Icon Spacing", 'ultimate-addons-for-gutenberg' ) }
								value={ ctaIconSpace }
								onChange={ ( value ) => setAttributes( { ctaIconSpace: value } ) }
								min={ 0 }
								max={ 50 }
								beforeIcon=""
								allowReset
							/>
						</Fragment>
						}
						<hr className="uagb-editor__separator" />
					</Fragment>
				}

				{ ( !inheritFromTheme && ctaType == "button" ) && (
					<Fragment>
						<h2>{ __( "Button Padding", 'ultimate-addons-for-gutenberg' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							value={ ctaBtnVertPadding }
							onChange={ ( value ) => setAttributes( { ctaBtnVertPadding: value } ) }
							min={ 0 }
							max={ 50 }
							className={ "uagb-margin-control" }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							value={ ctaBtnHrPadding }
							onChange={ ( value ) => setAttributes( { ctaBtnHrPadding: value } ) }
							min={ 0 }
							max={ 50 }
							className={ "uagb-margin-control" }
							allowReset
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Button Border", 'ultimate-addons-for-gutenberg' ) }</h2>
						<SelectControl
							label={ __( "Style", 'ultimate-addons-for-gutenberg' ) }
							value={ ctaBorderStyle }
							onChange={ ( value ) => setAttributes( { ctaBorderStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "solid", label: __( "Solid", 'ultimate-addons-for-gutenberg' ) },
								{ value: "double", label: __( "Double", 'ultimate-addons-for-gutenberg' ) },
								{ value: "dashed", label: __( "Dashed", 'ultimate-addons-for-gutenberg' ) },
								{ value: "dotted", label: __( "Dotted", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>

						{ ( ctaBorderStyle !== "none" ) && (
							<Fragment>
								<RangeControl
									label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
									value={ ctaBorderWidth }
									onChange={ ( value ) => setAttributes( { ctaBorderWidth: value } ) }
									min={ 0 }
									max={ 10 }
									beforeIcon=""
									allowReset
								/>
							</Fragment>
						)
						}
						<RangeControl
							label={ __( "Rounded Corner", 'ultimate-addons-for-gutenberg' ) }
							value={ ctaBorderRadius }
							onChange={ ( value ) => setAttributes( { ctaBorderRadius: value } ) }
							min={ 0 }
							max={ 100 }
							beforeIcon=""
							allowReset
						/>
						<hr className="uagb-editor__separator" />
					</Fragment>
				)
				}

				{ ( ctaType === "text" ) &&
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal", 'ultimate-addons-for-gutenberg' ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover", 'ultimate-addons-for-gutenberg' ),
								className: "uagb-focus-tab",
							},
						] }>
						{
							( tabName ) => {
								let tabout_1
								if( "normal" === tabName.name ) {
									tabout_1 = <Fragment>
										<p className="uagb-setting-label">{ __( "Text Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkColor }} ></span></span></p>
										<ColorPalette
											value={ ctaLinkColor }
											onChange={ ( colorValue ) => setAttributes( { ctaLinkColor: colorValue } ) }
											allowReset
										/>
									</Fragment>
								} else {
									tabout_1 = <Fragment>
										<p className="uagb-setting-label">{ __( "Text Hover Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkHoverColor }} ></span></span></p>
										<ColorPalette
											value={ ctaLinkHoverColor }
											onChange={ ( colorValue ) => setAttributes( { ctaLinkHoverColor: colorValue } ) }
											allowReset
										/>
									</Fragment>
								}
								return <div>{ tabout_1 }</div>
							}
						}
					</TabPanel>
				}

				{ ( !inheritFromTheme && ctaType == "button" ) &&
						<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
							activeClass="active-tab"
							tabs={ [
								{
									name: "normal",
									title: __( "Normal", 'ultimate-addons-for-gutenberg' ),
									className: "uagb-normal-tab",
								},
								{
									name: "hover",
									title: __( "Hover", 'ultimate-addons-for-gutenberg' ),
									className: "uagb-focus-tab",
								},
							] }>
							{
								( tabName ) => {
									let tabout
									if( "normal" === tabName.name ) {
										tabout = ctaNormalSettings
									}else {
										tabout = ctaHoverSettings
									}
									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
				}
			</PanelBody>
		)

		const ctaNormalSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Text Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBtnLinkColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBtnLinkColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBtnLinkColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgColor: colorValue } ) }
					allowReset
				/>
				{ ( ctaBorderStyle !== "none" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBorderColor }} ></span></span></p>
				    <ColorPalette
				        value={ ctaBorderColor }
				        onChange={ ( colorValue ) => setAttributes( { ctaBorderColor: colorValue } ) }
				        allowReset
				    />
				    </Fragment>
				}
			</Fragment>
		)

		const ctaHoverSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Text Hover Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkHoverColor }} ></span></span></p>
				<ColorPalette
					value={ ctaLinkHoverColor }
					onChange={ ( colorValue ) => setAttributes( { ctaLinkHoverColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Hover Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgHoverColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgHoverColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgHoverColor: colorValue } ) }
					allowReset
				/>
				{ ( ctaBorderStyle !== "none" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Hover Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBorderhoverColor }} ></span></span></p>
				    <ColorPalette
				        value={ ctaBorderhoverColor }
				        onChange={ ( colorValue ) => setAttributes( { ctaBorderhoverColor: colorValue } ) }
				        allowReset
				    />
				    </Fragment>
				}
			</Fragment>
		)

		// Typography settings.
		const TypographySettings = (
			<PanelBody	title={ __( "Content", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }	>
				<ToggleControl
					label={ __( "Enable Prefix", 'ultimate-addons-for-gutenberg' ) }
					checked={ showPrefix }
					onChange={ ( value ) => setAttributes( { showPrefix: ! showPrefix } ) }
				/>
				{ showPrefix &&
					<Fragment>
						<TypographyControl
							label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: prefixLoadGoogleFonts, label: 'prefixLoadGoogleFonts' } }
							fontFamily = { { value: prefixFontFamily, label: 'prefixFontFamily' } }
							fontWeight = { { value: prefixFontWeight, label: 'prefixFontWeight' } }
							fontSubset = { { value: prefixFontSubset, label: 'prefixFontSubset' } }
							fontSizeType = { { value: prefixFontSizeType, label: 'prefixFontSizeType' } }
							fontSize = { { value: prefixFontSize, label: 'prefixFontSize' } }
							fontSizeMobile = { { value: prefixFontSizeMobile, label: 'prefixFontSizeMobile' } }
							fontSizeTablet= { { value: prefixFontSizeTablet, label: 'prefixFontSizeTablet' } }
							lineHeightType = { { value: prefixLineHeightType, label: 'prefixLineHeightType' } }
							lineHeight = { { value: prefixLineHeight, label: 'prefixLineHeight' } }
							lineHeightMobile = { { value: prefixLineHeightMobile, label: 'prefixLineHeightMobile' } }
							lineHeightTablet= { { value: prefixLineHeightTablet, label: 'prefixLineHeightTablet' } }
						/>
						<p className="uagb-setting-label">{ __( "Prefix Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: prefixColor }} ></span></span></p>
					    <ColorPalette
					        value={ prefixColor }
					        onChange={ ( colorValue ) => setAttributes( { prefixColor: colorValue } ) }
					        allowReset
					    />
					  	<hr className="uagb-editor__separator" />
					</Fragment>
				}

				<ToggleControl
					label={ __( "Enable Title", 'ultimate-addons-for-gutenberg' ) }
					checked={ showTitle }
					onChange={ ( value ) => setAttributes( { showTitle: ! showTitle } ) }
				/>
				{ showTitle && <Fragment>
					<SelectControl
						label={ __( "Title Tag", 'ultimate-addons-for-gutenberg' ) }
						value={ headingTag }
						onChange={ ( value ) => setAttributes( { headingTag: value } ) }
						options={ [
							{ value: "h1", label: __( "H1" ) },
							{ value: "h2", label: __( "H2" ) },
							{ value: "h3", label: __( "H3" ) },
							{ value: "h4", label: __( "H4" ) },
							{ value: "h5", label: __( "H5" ) },
							{ value: "h6", label: __( "H6" ) },
						] }
					/>
					<TypographyControl
						label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: headLoadGoogleFonts, label: 'headLoadGoogleFonts' } }
						fontFamily = { { value: headFontFamily, label: 'headFontFamily' } }
						fontWeight = { { value: headFontWeight, label: 'headFontWeight' } }
						fontSubset = { { value: headFontSubset, label: 'headFontSubset' } }
						fontSizeType = { { value: headFontSizeType, label: 'headFontSizeType' } }
						fontSize = { { value: headFontSize, label: 'headFontSize' } }
						fontSizeMobile = { { value: headFontSizeMobile, label: 'headFontSizeMobile' } }
						fontSizeTablet= { { value: headFontSizeTablet, label: 'headFontSizeTablet' } }
						lineHeightType = { { value: headLineHeightType, label: 'headLineHeightType' } }
						lineHeight = { { value: headLineHeight, label: 'headLineHeight' } }
						lineHeightMobile = { { value: headLineHeightMobile, label: 'headLineHeightMobile' } }
						lineHeightTablet= { { value: headLineHeightTablet, label: 'headLineHeightTablet' } }
					/>
				    <p className="uagb-setting-label">{ __( "Title Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: headingColor }} ></span></span></p>
				    <ColorPalette
				        value={ headingColor }
				        onChange={ ( colorValue ) => setAttributes( { headingColor: colorValue } ) }
				        allowReset
				    />
				    <hr class="uagb-editor__separator" />
				</Fragment>
				}
				<ToggleControl
					label={ __( "Enable Description", 'ultimate-addons-for-gutenberg' ) }
					checked={ showDesc }
					onChange={ ( value ) => setAttributes( { showDesc: ! showDesc } ) }
				/>
				{ showDesc && <Fragment>
					<TypographyControl
						label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: subHeadLoadGoogleFonts, label: 'subHeadLoadGoogleFonts' } }
						fontFamily = { { value: subHeadFontFamily, label: 'subHeadFontFamily' } }
						fontWeight = { { value: subHeadFontWeight, label: 'subHeadFontWeight' } }
						fontSubset = { { value: subHeadFontSubset, label: 'subHeadFontSubset' } }
						fontSizeType = { { value: subHeadFontSizeType, label: 'subHeadFontSizeType' } }
						fontSize = { { value: subHeadFontSize, label: 'subHeadFontSize' } }
						fontSizeMobile = { { value: subHeadFontSizeMobile, label: 'subHeadFontSizeMobile' } }
						fontSizeTablet= { { value: subHeadFontSizeTablet, label: 'subHeadFontSizeTablet' } }
						lineHeightType = { { value: subHeadLineHeightType, label: 'subHeadLineHeightType' } }
						lineHeight = { { value: subHeadLineHeight, label: 'subHeadLineHeight' } }
						lineHeightMobile = { { value: subHeadLineHeightMobile, label: 'subHeadLineHeightMobile' } }
						lineHeightTablet= { { value: subHeadLineHeightTablet, label: 'subHeadLineHeightTablet' } }
					/>
					<p className="uagb-setting-label">{ __( "Description Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: subHeadingColor }} ></span></span></p>
					    <ColorPalette
					        value={ subHeadingColor }
					        onChange={ ( colorValue ) => setAttributes( { subHeadingColor: colorValue } ) }
					        allowReset
					    />
				</Fragment>
				}
			</PanelBody>
		)

		// Margin Settings.
		const marginSettings = (
			<PanelBody	title={ __( "Spacing", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }	>
				{ showPrefix &&
					<RangeControl
						label={ __( "Prefix Bottom Margin", 'ultimate-addons-for-gutenberg' ) }
						value={ prefixSpace }
						onChange={ ( value ) => setAttributes( { prefixSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				}
				{ showTitle &&
					<RangeControl
						label={ __( "Title Bottom Margin", 'ultimate-addons-for-gutenberg' ) }
						value={ headSpace }
						onChange={ ( value ) => setAttributes( { headSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				}
				{ "none" !== seperatorStyle &&
					<RangeControl
						label={ __( "Separator Bottom Margin", 'ultimate-addons-for-gutenberg' ) }
						value={ seperatorSpace }
						onChange={ ( value ) => setAttributes( { seperatorSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>							
				}
				{ showDesc &&
					<RangeControl
						label={ __( "Description Bottom Margin", 'ultimate-addons-for-gutenberg' ) }
						value={ subHeadSpace }
						onChange={ ( value ) => setAttributes( { subHeadSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				}
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Image/Icon Margin (px)", 'ultimate-addons-for-gutenberg' ) }</h2>
				<RangeControl
					label={ UAGB_Block_Icons.left_margin }
					className={ "uagb-margin-control" }
					value={ iconLeftMargin }
					onChange={ ( value ) => setAttributes( { iconLeftMargin: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.right_margin }
					className={ "uagb-margin-control" }
					value={ iconRightMargin }
					onChange={ ( value ) => setAttributes( { iconRightMargin: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.top_margin }
					className={ "uagb-margin-control" }
					value={ iconTopMargin }
					onChange={ ( value ) => setAttributes( { iconTopMargin: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.bottom_margin }
					className={ "uagb-margin-control" }
					value={ iconBottomMargin }
					onChange={ ( value ) => setAttributes( { iconBottomMargin: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
			</PanelBody>
		)

		let image_name = __( "Select Image", 'ultimate-addons-for-gutenberg' )
		if(iconImage){
			if(iconImage.url == null || iconImage.url == "" ){
				image_name = __( "Select Image", 'ultimate-addons-for-gutenberg' )
			}else{
				image_name = __( "Replace Image", 'ultimate-addons-for-gutenberg' )
			}
		}

		// Image controls.
		const imageControls = (
			<Fragment>
				<BaseControl className="editor-bg-image-control" label={ __( "Image", 'ultimate-addons-for-gutenberg' ) } >
					<MediaUpload
						title={ __( "Select Image", 'ultimate-addons-for-gutenberg' ) }
						onSelect={ this.onSelectImage }
						allowedTypes= { [ "image" ] }
						value={ iconImage }
						render={ ( { open } ) => (
							<Button isSecondary onClick={ open }>
								{ image_name }
							</Button>
						) }
					/>
					{ ( iconImage && iconImage.url !=="null" && iconImage.url !== "" ) &&
						<Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
							{ __( "Remove Image", 'ultimate-addons-for-gutenberg' ) }
						</Button>
					}
				</BaseControl>
				{ ( iconImage && iconImage.url !=="null" && iconImage.url !== "" ) &&
					<Fragment>
						<SelectControl
							label={ __( "Image Size", 'ultimate-addons-for-gutenberg' ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
						<ToggleControl
							label={ __( "Custom Width", 'ultimate-addons-for-gutenberg' ) }
							checked={ imageWidthType }
							onChange={ (value) => setAttributes( { imageWidthType: !imageWidthType } ) }
							help={ __( "Turn this off to inherit the natural width of Image.", 'ultimate-addons-for-gutenberg' ) }
						/>
						{ imageWidthType &&
							<RangeControl
								label={ __( "Width (px)", 'ultimate-addons-for-gutenberg' ) }
								value={ imageWidth }
								onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
								min={ 0 }
								max={ 500 }
								beforeIcon=""
								allowReset
							/>
						}
						<RangeControl
							label = { __( "Rounded Corners (px)", 'ultimate-addons-for-gutenberg' ) }
							value = { iconimgBorderRadius }
							onChange = { ( value ) => setAttributes( { iconimgBorderRadius: value } ) }
							min = { 0 }
							max = { 500 }
							beforeIcon = ""
							allowReset
						/>
					</Fragment>
				}
			</Fragment>
		)

		// Global Controls.
		const inspect_control = (
			<InspectorControls>
				<PanelBody	title={ __( "Image/Icon", 'ultimate-addons-for-gutenberg' ) } >
					<SelectControl
						label={ __( "Select Position", 'ultimate-addons-for-gutenberg' ) }
						value={ iconimgPosition }
						onChange={ ( value ) => setAttributes( { iconimgPosition: value } ) }
						options={ [
							{ value: "above-title", label: __( "Above Title", 'ultimate-addons-for-gutenberg' ) },
							{ value: "below-title", label: __( "Below Title", 'ultimate-addons-for-gutenberg' ) },
							{ value: "left-title", label: __( "Left of Title", 'ultimate-addons-for-gutenberg' ) },
							{ value: "right-title", label: __( "Right of Title", 'ultimate-addons-for-gutenberg' ) },
							{ value: "left", label: __( "Left of Text and Title", 'ultimate-addons-for-gutenberg' ) },
							{ value: "right", label: __( "Right of Text and Title", 'ultimate-addons-for-gutenberg' ) },

						] }
					/>
					{ ( iconimgPosition == "left" || iconimgPosition == "right" ) &&
						<SelectControl
							label={ __( "Stack on", 'ultimate-addons-for-gutenberg' ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "tablet", label: __( "Tablet", 'ultimate-addons-for-gutenberg' ) },
								{ value: "mobile", label: __( "Mobile", 'ultimate-addons-for-gutenberg' ) },
							] }
							help={ __( "Note: Choose on what breakpoint the Info Box will stack.", 'ultimate-addons-for-gutenberg' ) }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
						/>
					}
					<hr className="uagb-editor__separator" />
					<SelectControl
						label={ __( "Select Source", 'ultimate-addons-for-gutenberg' ) }
						value={ source_type }
						onChange={ ( value ) => setAttributes( { source_type: value } ) }
						options={ [
							{ value: "icon", label: __( "Icon", 'ultimate-addons-for-gutenberg' ) },
							{ value: "image", label: __( "Image", 'ultimate-addons-for-gutenberg' ) },
						] }
					/>

					{ ( iconimgPosition && (iconimgPosition !== "above-title" && iconimgPosition !== "below-title" )  ) && <SelectControl
						label={ __( "Vertical Alignment", 'ultimate-addons-for-gutenberg' ) }
						value={ sourceAlign }
						onChange={ ( value ) => setAttributes( { sourceAlign: value } ) }
						options={ [
							{ value: "top", label: __( "Top", 'ultimate-addons-for-gutenberg' ) },
							{ value: "middle", label: __( "Middle", 'ultimate-addons-for-gutenberg' ) },
						] }
					/>
					}

					{ ( source_type && source_type == "icon" ) && iconControls }

					{ ( source_type && source_type == "image" ) && imageControls }

				</PanelBody>
				{ TypographySettings }
				{ seperatorSettings }
				{ ctaSettings }
				{ marginSettings }
			</InspectorControls>
		)

		// Get icon/Image components.
		let is_image = ""

		if( source_type === "icon" && icon !== "" ) {
			is_image =  <Icon attributes={attributes}/>
		}else{
			is_image = <InfoBoxIconImage attributes={attributes} />
		}

		var icon_image_html = is_image
		var seperator_position = seperatorPosition
		var seperator_html = <InfoBoxSeparator attributes={attributes} />
		var show_seperator = true

		if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition =="below-title" ) ){
			show_seperator = false
			icon_image_html = (
				<Fragment>
					{ is_image }
					{ "none" !== seperatorStyle && seperator_html }
				</Fragment>
			)
		}

		if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
			seperator_position = "after_title"
		}

		if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
			show_seperator = false
			icon_image_html = (
				<Fragment>
					{ "none" !== seperatorStyle && seperator_html }
					{ is_image }
				</Fragment>
			)
		}

		// Get description and seperator components.
		const desc = (
			<Fragment>
				{ "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
				<div className = "uagb-ifb-text-wrap">
					{ showDesc && <InfoBoxDesc attributes={attributes} setAttributes = { setAttributes } props = { this.props } />}
					{ "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
					<CallToAction attributes={attributes} setAttributes = { setAttributes } />
				</div>
			</Fragment>
		)

		// Get Title and Prefix components.
		const title_text = (
			<Fragment>
				<div className = "uagb-ifb-title-wrap">
					{ showPrefix && <Prefix attributes={attributes} setAttributes = { setAttributes } props = { this.props } /> }
					{ "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
					{ showTitle && <Title attributes={attributes} setAttributes = { setAttributes } props = { this.props } /> }
				</div>
			</Fragment>
		)

		const output = (
			<div className = { classnames( "uagb-infobox__content-wrap",
				( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
				...InfoBoxPositionClasses( attributes ) ) }>
				<div className = "uagb-ifb-left-right-wrap">
					{ ( iconimgPosition == "left") &&
							icon_image_html
					}
					<div className = "uagb-ifb-content">

						{  iconimgPosition == "above-title" && icon_image_html }

						{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

						{ iconimgPosition == "below-title"  && icon_image_html }

						{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

						{ ( iconimgPosition === "left-title") &&
								<Fragment>
									<div className = "uagb-ifb-left-title-image">
										{ icon_image_html }
										{ title_text }
									</div>
									{ desc }
								</Fragment>
						}

						{ ( iconimgPosition === "right-title") &&
								<Fragment>
									<div className = "uagb-ifb-right-title-image">
										{ title_text }
										{ icon_image_html }
									</div>
									{ desc }
								</Fragment>
						}

						{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
								<Fragment>
									{ title_text }
									{ desc }
								</Fragment>
						}

					</div>

					{ ( iconimgPosition == "right") && icon_image_html	}
				</div>
			</div>
		)

		return (
			<Fragment>
				{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") &&
					<BlockControls key='controls'>
						<AlignmentToolbar
							value={ headingAlign }
							onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
						/>
					</BlockControls>
				}
				{inspect_control}
				<div className={ classnames(
					className,
					"uagb-infobox__outer-wrap",
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }
				>
					{ ( ctaType == "all") &&<Fragment>
						<a className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" aria-label={"Infobox Link"} rel ="noopener noreferrer"></a>
						{output}
					</Fragment>
					}
					{ ( ctaType !== "all") && output }
				</div>
				{ loadPrefixGoogleFonts }
				{ loadSubHeadGoogleFonts }
				{ loadCtaGoogleFonts }
				{ loadHeadGoogleFonts }
			</Fragment>
		)
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-info-box-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = InfoBoxStyle( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-info-box-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}
}

export default UAGBinfoBox
