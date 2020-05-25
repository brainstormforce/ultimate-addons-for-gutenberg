/**
 * BLOCK: Info Box - Edit Class
 */

import classnames from "classnames"
import map from "lodash/map"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import Prefix from "./components/Prefix"
import Title from "./components/Title"
import Icon from "./components/Icon"
import InfoBoxDesc from "./components/InfoBoxDesc"
import InfoBoxPositionClasses from "./classes"
import InfoBoxSeparator from "./components/InfoBoxSeparator"
import CallToAction from "./components/CallToAction"
import InfoBoxStyle from "./inline-styles"
import InfoBoxIconImage from "./components/InfoBoxIconImage"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

let svg_icons = Object.keys( UAGBIcon )

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText,
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
	Dashicon,
	withNotices,
} = wp.components

const {
	compose
} = wp.compose

const {
	withSelect
} = wp.data

const {
	withViewportMatch
} = wp.viewport

const { Component, Fragment } = wp.element

let imageSizeOptions = [
	{ value: "thumbnail", label: __( "Thumbnail" ) },
	{ value: "medium", label: __( "Medium" ) },
	{ value: "full", label: __( "Large" ) }
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
		const { iconImage } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { iconImage: null } )
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

		const { isSelected, className, setAttributes, attributes, mergeBlocks, insertBlocksAfter, onReplace } = this.props

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
			separatorSpace,
			subHeadSpace,
			icon,
			iconColor,
			iconSize,
			iconimgPosition,
			block_id,
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
		} = attributes

		// Add CSS.
		var element = document.getElementById( "uagb-info-box-style-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = InfoBoxStyle( this.props )
		}

		// Icon properties.
		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: this.getIfbIcon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon" )
		}

		// Icon properties.
		const cta_icon_props = {
			icons: svg_icons,
			renderFunc: renderSVG,
			value: ctaIcon,
			onChange: this.getCtaicon,
			isMulti: false,
			noSelectedPlaceholder: __( "Select Icon" )
		}

		if( iconImage && iconImage["sizes"] ){
			imageSizeOptions = this.getImageSize(iconImage["sizes"])
		}

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

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
					label = { __( "Icon Size" ) }
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
							title: __( "Normal" ),
							className: "uagb-normal-tab",
						},
						{
							name: "hover",
							title: __( "Hover" ),
							className: "uagb-focus-tab",
						},
					] }>
					{
						( tabName ) => {
							let tabout_icon
							if( "normal" === tabName.name ) {
								tabout_icon = <Fragment>
									<p className="uagb-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconColor }} ></span></span></p>
									<ColorPalette
										value={ iconColor }
										onChange={ ( colorValue ) => setAttributes( { iconColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							}else {
								tabout_icon = <Fragment>
									<p className="uagb-setting-label">{ __( "Icon Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconHover }} ></span></span></p>
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
				title={ __( "Separator" ) }
				initialOpen={ false } >

				<SelectControl
					label={ __( "Position" ) }
					value={ seperatorPosition }
					onChange={ ( value ) => setAttributes( { seperatorPosition: value } ) }
					options={ [
						{ value: "after_icon", label: __( "After Icon/Image" ) },
						{ value: "after_prefix", label: __( "After Prefix" ) },
						{ value: "after_title", label: __( "After Title" ) },
						{ value: "after_desc", label: __( "After Description" ) },
					] }
				/>
				<SelectControl
					label={ __( "Style" ) }
					value={ seperatorStyle }
					onChange={ ( value ) => setAttributes( { seperatorStyle: value } ) }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "solid", label: __( "Solid" ) },
						{ value: "double", label: __( "Double" ) },
						{ value: "dashed", label: __( "Dashed" ) },
						{ value: "dotted", label: __( "Dotted" ) },
					] }
				/>
				{ "none" !== seperatorStyle &&
				( <Fragment>
					<RangeControl
						label={ __( "Thickness" ) }
						value={ seperatorThickness }
						onChange={ ( value ) => setAttributes( { seperatorThickness: value } ) }
						min={ 0 }
						max={ 10 }
						beforeIcon=""
						allowReset
					/>
					<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
						<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ separatorWidthType === "px" } aria-pressed={ separatorWidthType === "px" } onClick={ () => setAttributes( { separatorWidthType: "px" } ) }>{ "px" }</Button>
						<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ separatorWidthType === "%" } aria-pressed={ separatorWidthType === "%" } onClick={ () => setAttributes( { separatorWidthType: "%" } ) }>{ "%" }</Button>
					</ButtonGroup>
					<RangeControl
						label={ __( "Width" ) }
						value={ seperatorWidth }
						onChange={ ( value ) => setAttributes( { seperatorWidth: value } ) }
						min={ 0 }
						max={ ( "%" == separatorWidthType ) ? 100 : 500 }
						beforeIcon=""
						allowReset
					/>
				    <p className="uagb-setting-label">{ __( "Separator Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: seperatorColor }} ></span></span></p>
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
			<PanelBody	title={ __( "Call To Action" ) } initialOpen={ false }	>
				<SelectControl
					label={ __( "Type" ) }
					value={ ctaType }
					onChange={ ( value ) => setAttributes( { ctaType: value } ) }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "text", label: __( "Text" ) },
						{ value: "button", label: __( "Button" ) },
						{ value: "all", label: __( "Complete Box" ) },
					] }
				/>
				{ ( ctaType === "text" || ctaType === "button" ) && <Fragment>
					<TextControl
						label= { __( "Text" ) }
						value= { ctaText }
						onChange={ value => setAttributes( { ctaText: value } ) }
					/>
					<TypographyControl
						label={ __( "Typography" ) }
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
				</Fragment>
				}
				{ ( ctaType !== "none" ) &&
					<Fragment>
						<TextControl
							label= { __( "Link" ) }
							value= { ctaLink }
							onChange={ value => setAttributes( { ctaLink: value } ) }
						/>
						<ToggleControl
							label={ __( "Open in new Window" ) }
							checked={ ctaTarget }
							onChange={ this.toggleTarget }
						/>

					</Fragment>
				}

				{ ( ctaType !== "all" ) && ( ctaType !== "none" ) &&
					<Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Button Icon" ) }</h2>
						<FontIconPicker {...cta_icon_props} />
						{ ctaIcon != "" && <Fragment>
							<SelectControl
								label={ __( "Icon Position" ) }
								value={ ctaIconPosition }
								onChange={ ( value ) => setAttributes( { ctaIconPosition: value } ) }
								options={ [
									{ value: "before", label: __( "Before Text" ) },
									{ value: "after", label: __( "After Text" ) },
								] }
							/>
							<RangeControl
								label={ __( "Icon Spacing" ) }
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

				{ ( ctaType == "button" ) && (
					<Fragment>
						<h2>{ __( "Button Padding" ) }</h2>
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
						<h2>{ __( "Button Border" ) }</h2>
						<SelectControl
							label={ __( "Style" ) }
							value={ ctaBorderStyle }
							onChange={ ( value ) => setAttributes( { ctaBorderStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "solid", label: __( "Solid" ) },
								{ value: "double", label: __( "Double" ) },
								{ value: "dashed", label: __( "Dashed" ) },
								{ value: "dotted", label: __( "Dotted" ) },
							] }
						/>

						{ ( ctaBorderStyle !== "none" ) && (
							<Fragment>
								<RangeControl
									label={ __( "Width" ) }
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
							label={ __( "Rounded Corner" ) }
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

				{ ( ctaType === "text") &&
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal" ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover" ),
								className: "uagb-focus-tab",
							},
						] }>
						{
							( tabName ) => {
								let tabout_1
								if( "normal" === tabName.name ) {
									tabout_1 = <Fragment>
										<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkColor }} ></span></span></p>
										<ColorPalette
											value={ ctaLinkColor }
											onChange={ ( colorValue ) => setAttributes( { ctaLinkColor: colorValue } ) }
											allowReset
										/>
									</Fragment>
								}else {
									tabout_1 = <Fragment>
										<p className="uagb-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkHoverColor }} ></span></span></p>
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

				{ ( ctaType === "button") &&
						<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
							activeClass="active-tab"
							tabs={ [
								{
									name: "normal",
									title: __( "Normal" ),
									className: "uagb-normal-tab",
								},
								{
									name: "hover",
									title: __( "Hover" ),
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
				<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBtnLinkColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBtnLinkColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBtnLinkColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgColor: colorValue } ) }
					allowReset
				/>
				{ ( ctaBorderStyle !== "none" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBorderColor }} ></span></span></p>
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
				<p className="uagb-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkHoverColor }} ></span></span></p>
				<ColorPalette
					value={ ctaLinkHoverColor }
					onChange={ ( colorValue ) => setAttributes( { ctaLinkHoverColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgHoverColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgHoverColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgHoverColor: colorValue } ) }
					allowReset
				/>
				{ ( ctaBorderStyle !== "none" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBorderhoverColor }} ></span></span></p>
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
			<PanelBody	title={ __( "Content" ) } initialOpen={ false }	>
				<ToggleControl
					label={ __( "Enable Prefix" ) }
					checked={ showPrefix }
					onChange={ ( value ) => setAttributes( { showPrefix: ! showPrefix } ) }
				/>
				{ showPrefix &&
					<Fragment>
						<TypographyControl
							label={ __( "Typography" ) }
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
						<p className="uagb-setting-label">{ __( "Prefix Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: prefixColor }} ></span></span></p>
					    <ColorPalette
					        value={ prefixColor }
					        onChange={ ( colorValue ) => setAttributes( { prefixColor: colorValue } ) }
					        allowReset
					    />
					  	<hr className="uagb-editor__separator" />
					</Fragment>
				}

				<ToggleControl
					label={ __( "Enable Title" ) }
					checked={ showTitle }
					onChange={ ( value ) => setAttributes( { showTitle: ! showTitle } ) }
				/>
				{ showTitle && <Fragment>
					<SelectControl
						label={ __( "Title Tag" ) }
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
						label={ __( "Typography" ) }
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
				    <p className="uagb-setting-label">{ __( "Title Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: headingColor }} ></span></span></p>
				    <ColorPalette
				        value={ headingColor }
				        onChange={ ( colorValue ) => setAttributes( { headingColor: colorValue } ) }
				        allowReset
				    />
				    <hr class="uagb-editor__separator" />
				</Fragment>
				}
				<ToggleControl
					label={ __( "Enable Description" ) }
					checked={ showDesc }
					onChange={ ( value ) => setAttributes( { showDesc: ! showDesc } ) }
				/>
				{ showDesc && <Fragment>
					<TypographyControl
						label={ __( "Typography" ) }
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
					<p className="uagb-setting-label">{ __( "Description Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: subHeadingColor }} ></span></span></p>
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
			<PanelBody	title={ __( "Spacing" ) } initialOpen={ false }	>
				{ showPrefix &&
					<RangeControl
						label={ __( "Prefix Bottom Margin" ) }
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
						label={ __( "Title Bottom Margin" ) }
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
						label={ __( "Separator Bottom Margin" ) }
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
						label={ __( "Description Bottom Margin" ) }
						value={ subHeadSpace }
						onChange={ ( value ) => setAttributes( { subHeadSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
					/>
				}
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Image/Icon Margin (px)" ) }</h2>
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

		let image_name = __( "Select Image" )
		if(iconImage){
			if(iconImage.url == null || iconImage.url == "" ){
				image_name = __( "Select Image" )
			}else{
				image_name = __( "Replace Image" )
			}
		}

		// Image controls.
		const imageControls = (
			<Fragment>
				<BaseControl className="editor-bg-image-control" label={ __( "Image" ) } >
					<MediaUpload
						title={ __( "Select Image" ) }
						onSelect={ this.onSelectImage }
						allowedTypes= { [ "image" ] }
						value={ iconImage }
						render={ ( { open } ) => (
							<Button isDefault onClick={ open }>
								{ image_name }
							</Button>
						) }
					/>
					{ ( iconImage && iconImage.url !=="null" && iconImage.url !== "" ) &&
						<Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
							{ __( "Remove Image" ) }
						</Button>
					}
				</BaseControl>
				{ ( iconImage && iconImage.url !=="null" && iconImage.url !== "" ) &&
					<Fragment>
						<SelectControl
							label={ __( "Image Size" ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
						<ToggleControl
							label={ __( "Custom Width" ) }
							checked={ imageWidthType }
							onChange={ (value) => setAttributes( { imageWidthType: !imageWidthType } ) }
							help={ __( "Turn this off to inherit the natural width of Image." ) }
						/>
						{ imageWidthType &&
							<RangeControl
								label={ __( "Width (px)" ) }
								value={ imageWidth }
								onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
								min={ 0 }
								max={ 500 }
								beforeIcon=""
								allowReset
							/>
						}
						<RangeControl
							label = { __( "Rounded Corners (px)" ) }
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
				<PanelBody	title={ __( "Image/Icon" ) } >
					<SelectControl
						label={ __( "Select Position" ) }
						value={ iconimgPosition }
						onChange={ ( value ) => setAttributes( { iconimgPosition: value } ) }
						options={ [
							{ value: "above-title", label: __( "Above Title" ) },
							{ value: "below-title", label: __( "Below Title" ) },
							{ value: "left-title", label: __( "Left of Title" ) },
							{ value: "right-title", label: __( "Right of Title" ) },
							{ value: "left", label: __( "Left of Text and Title" ) },
							{ value: "right", label: __( "Right of Text and Title" ) },

						] }
					/>
					{ ( iconimgPosition == "left" || iconimgPosition == "right" ) &&
						<SelectControl
							label={ __( "Stack on" ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "tablet", label: __( "Tablet" ) },
								{ value: "mobile", label: __( "Mobile" ) },
							] }
							help={ __( "Note: Choose on what breakpoint the Info Box will stack." ) }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
						/>
					}
					<hr className="uagb-editor__separator" />
					<SelectControl
						label={ __( "Select Source" ) }
						value={ source_type }
						onChange={ ( value ) => setAttributes( { source_type: value } ) }
						options={ [
							{ value: "icon", label: __( "Icon" ) },
							{ value: "image", label: __( "Image" ) },
						] }
					/>

					{ ( iconimgPosition && (iconimgPosition !== "above-title" && iconimgPosition !== "below-title" )  ) && <SelectControl
						label={ __( "Vertical ALignment" ) }
						value={ sourceAlign }
						onChange={ ( value ) => setAttributes( { sourceAlign: value } ) }
						options={ [
							{ value: "top", label: __( "Top" ) },
							{ value: "middle", label: __( "Middle" ) },
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
					`uagb-block-${ this.props.clientId }`
				) }
				>
					{ ( ctaType == "all") &&<Fragment>
						<a className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" rel ="noopener noreferrer"></a>
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

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-info-box-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}
}

export default UAGBinfoBox
