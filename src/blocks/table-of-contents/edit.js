
/**
 * BLOCK: Table of Contents
 */

import classnames from "classnames"
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"
import TableOfContents from './toc';

const striptags = require('striptags');
const { __ } = wp.i18n
const { withSelect } = wp.data
const { compose } = wp.compose

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	RichText,
	ColorPalette
} = wp.blockEditor

const {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
	ToggleControl,
	Dashicon,
	TabPanel
} = wp.components

let svg_icons = Object.keys( UAGBIcon )

class UAGBTableOfContentsEdit extends Component {

	constructor() {
		super( ...arguments )
		this.getIcon  	 = this.getIcon.bind(this)
	}

	getIcon(value) {
		this.props.setAttributes( { icon: value } )
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify( this.props.headers ) !==
			JSON.stringify( prevProps.headers )
		) {
			this.props.setAttributes({
				headerLinks: JSON.stringify(this.props.headers)
			});
		}

		var element = document.getElementById( "uagb-style-toc-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		this.props.setAttributes( { headerLinks: JSON.stringify( this.props.headers ) } )

		// Pushing Scroll To Top div
		var $scrollTop = document.createElement( "div" )
		$scrollTop.setAttribute( "class", "uagb-toc__scroll-top dashicons dashicons-arrow-up-alt2" )
		document.body.insertBefore( $scrollTop, document.body.lastChild )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-toc-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	render() {

		const { attributes, setAttributes, className, headers } = this.props

		const {
			align,
			heading,
			disableBullets,
			makeCollapsible,
			initialCollapse,
			icon,
			iconColor,
			bulletColor,
			iconSize,
			smoothScroll,
			smoothScrollOffset,
			smoothScrollDelay,
			scrollToTop,
			scrollToTopColor,
			scrollToTopBgColor,
			customWidth,
			widthDesktop,
			widthTablet,
			widthMobile,
			widthTypeMobile,
			widthTypeTablet,
			widthTypeDesktop,
			tColumnsDesktop,
			tColumnsTablet,
			tColumnsMobile,
			//Color
			backgroundColor,
			linkColor,
			linkHoverColor,
			headingColor,
			//Padding,
			vPaddingDesktop,
			vPaddingTablet,
			vPaddingMobile,
			hPaddingDesktop,
			hPaddingTablet,
			hPaddingMobile,
			paddingTypeMobile,
			paddingTypeTablet,
			paddingTypeDesktop,
			//Padding,
			vMarginDesktop,
			vMarginTablet,
			vMarginMobile,
			hMarginDesktop,
			hMarginTablet,
			hMarginMobile,
			marginTypeMobile,
			marginTypeTablet,
			marginTypeDesktop,
			headingBottom,
			// Content Padding,
			contentPaddingDesktop,
			contentPaddingTablet,
			contentPaddingMobile,
			contentPaddingTypeMobile,
			contentPaddingTypeTablet,
			contentPaddingTypeDesktop,
			//Border
			borderStyle,
			borderWidth,
			borderRadius,
			borderColor,
			//Typography
			loadGoogleFonts,
			fontFamily,
			fontWeight,
			fontSubset,
			fontSize,
			fontSizeType,
			fontSizeTablet,
			fontSizeMobile,
			lineHeightType,
			lineHeight,
			lineHeightTablet,
			lineHeightMobile,
			headingLoadGoogleFonts,
			headingFontFamily,
			headingFontWeight,
			headingFontSubset,
			headingFontSize,
			headingFontSizeType,
			headingFontSizeTablet,
			headingFontSizeMobile,
			headingLineHeightType,
			headingLineHeight,
			headingLineHeightTablet,
			headingLineHeightMobile,
			mappingHeaders,
		} = attributes

		let loadGFonts
		let headingloadGFonts

		if( loadGoogleFonts == true ) {

			const config = {
				google: {
					families: [ fontFamily + ( fontWeight ? ":" + fontWeight : "" ) ],
				},
			}

			loadGFonts = (
				<WebfontLoader config={ config }>
				</WebfontLoader>
			)
		}


		if( headingLoadGoogleFonts == true ) {

			const headingconfig = {
				google: {
					families: [ headingFontFamily + ( headingFontWeight ? ":" + headingFontWeight : "" ) ],
				},
			}

			headingloadGFonts = (
				<WebfontLoader config={ headingconfig }>
				</WebfontLoader>
			)
		}

		var scrollElement = jQuery( ".uagb-toc__scroll-top" )
		if( null != scrollElement && "undefined" !== scrollElement ) {

			if ( scrollToTop ) {
				scrollElement.addClass( "uagb-toc__show-scroll" )
			} else {
				scrollElement.removeClass( "uagb-toc__show-scroll" )
			}
		}

		// Icon properties.
		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: this.getIcon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon" )
		}

		let icon_html = ''

		if ( makeCollapsible && icon ) {
			icon_html = (
				<span className="uag-toc__collapsible-wrap">{renderSVG(icon)}</span>
			)	
		}

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right" ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "General" ) } initialOpen={ true }>
						<h2>{ __( "Select the heading to consider when generating the table" ) }</h2>
						{mappingHeaders.map((a, i) => (
							<PanelRow key={i}>
								<label htmlFor={`ub_toggle_h${i + 1}`}>{`H${i + 1}`}</label>
								<ToggleControl
									id={`ub_toggle_h${i + 1}`}
									checked={a}
									onChange={() =>
										setAttributes({
											mappingHeaders: [
												...mappingHeaders.slice(0, i),
												!mappingHeaders[i],
												...mappingHeaders.slice(i + 1)
											]
										})
									}
								/>
							</PanelRow>
						))}
					</PanelBody>
					<PanelBody title={ __( "Scroll" ) } initialOpen={ false }>
						<ToggleControl
							label={ __( "Smooth Scroll" ) }
							checked={ smoothScroll }
							help={ __( "This will be in Action only in Front End." ) }
							onChange={ ( value ) => setAttributes( { smoothScroll: ! smoothScroll } ) }
						/>
						{ smoothScroll &&
							<Fragment>
								<RangeControl
									label={ __( "Smooth Scroll Offset (px)" ) }
									value={ smoothScrollOffset }
									onChange={ ( value ) => setAttributes( { smoothScrollOffset: value } ) }
									min={ 0 }
									max={ 1000 }
								/>
								<RangeControl
									label={ __( "Scroll Animation Delay (ms)" ) }
									value={ smoothScrollDelay }
									onChange={ ( value ) => setAttributes( { smoothScrollDelay: value } ) }
									min={ 100 }
									max={ 5000 }
								/>
							</Fragment>
						}
						<hr className="uagb-editor__separator"/>
						<ToggleControl
							label={ __( "Show Scroll To Top" ) }
							checked={ scrollToTop }
							help={ __( "This will add a Scroll to Top arrow at the bottom of page." ) }
							onChange={ ( value ) => setAttributes( { scrollToTop: ! scrollToTop } ) }
						/>
						{ scrollToTop &&
							<Fragment>
								<p className="uagb-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: scrollToTopColor }} ></span></span></p>
								<ColorPalette
									value={ scrollToTopColor }
									onChange={ ( colorValue ) => setAttributes( { scrollToTopColor: colorValue } ) }
									allowReset
								/>
								<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: scrollToTopBgColor }} ></span></span></p>
								<ColorPalette
									value={ scrollToTopBgColor }
									onChange={ ( colorValue ) => setAttributes( { scrollToTopBgColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						}
					</PanelBody>
					<PanelBody title={ __( "Content" ) } initialOpen={ false }>
						<h2>{ __( "Heading" ) }</h2>						
						<RangeControl
							label={ __( "Bottom Space" ) }
							value={ headingBottom }
							onChange={ ( value ) => setAttributes( { headingBottom: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: headingLoadGoogleFonts, label: "headingLoadGoogleFonts" } }
							fontFamily = { { value: headingFontFamily, label: "headingFontFamily" } }
							fontWeight = { { value: headingFontWeight, label: "headingFontWeight" } }
							fontSubset = { { value: headingFontSubset, label: "headingFontSubset" } }
							fontSizeType = { { value: headingFontSizeType, label: "headingFontSizeType" } }
							fontSize = { { value: headingFontSize, label: "headingFontSize" } }
							fontSizeMobile = { { value: headingFontSizeMobile, label: "headingFontSizeMobile" } }
							fontSizeTablet= { { value: headingFontSizeTablet, label: "headingFontSizeTablet" } }
							lineHeightType = { { value: headingLineHeightType, label: "headingLineHeightType" } }
							lineHeight = { { value: headingLineHeight, label: "headingLineHeight" } }
							lineHeightMobile = { { value: headingLineHeightMobile, label: "headingLineHeightMobile" } }
							lineHeightTablet= { { value: headingLineHeightTablet, label: "headingLineHeightTablet" } }
						/>
						<p className="uagb-setting-label">{ __( "Heading Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: headingColor }} ></span></span></p>
						<ColorPalette
							value={ headingColor }
							onChange={ ( colorValue ) => setAttributes( { headingColor: colorValue } ) }
							allowReset
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Collapsible" ) }</h2>
						<ToggleControl
							label={ __( "Make Content Collapsible" ) }
							checked={ makeCollapsible }
							onChange={ ( value ) => setAttributes( { makeCollapsible: ! makeCollapsible } ) }
						/>
						{ makeCollapsible &&
							<Fragment>
								<ToggleControl
									label={ __( "Keep Collapsed Initially" ) }
									checked={ initialCollapse }
									onChange={ ( value ) => setAttributes( { initialCollapse: ! initialCollapse } ) }
								/>
								<FontIconPicker {...icon_props} />
								<RangeControl
									label = { __( "Icon Size" ) }
									value = { iconSize }
									onChange = { ( value ) => setAttributes( { iconSize: value } ) }
									min = { 0 }
									max = { 300 }
									beforeIcon = ""
									allowReset
								/>
								<ColorPalette
									value={ iconColor }
									onChange={ ( colorValue ) => setAttributes( { iconColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						}
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Content" ) }</h2>
						<ToggleControl
							label={ __( "Disable Bullet Points" ) }
							checked={ disableBullets }
							onChange={ ( value ) => setAttributes( { disableBullets: ! disableBullets } ) }
						/>
						{ ! disableBullets &&
							<Fragment>
								<p className="uagb-setting-label">{ __( "Bullet Points Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: bulletColor }} ></span></span></p>
								<ColorPalette
									value={ bulletColor }
									onChange={ ( colorValue ) => setAttributes( { bulletColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						}
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ contentPaddingTypeMobile === "px" } aria-pressed={ contentPaddingTypeMobile === "px" } onClick={ () => setAttributes( { contentPaddingTypeMobile: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ contentPaddingTypeMobile === "%" } aria-pressed={ contentPaddingTypeMobile === "%" } onClick={ () => setAttributes( { contentPaddingTypeMobile: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2 className="uagb-light-font-weight">{ __( "Gap Between Lists" ) }</h2>
												<RangeControl
													className={ "uagb-margin-control" }
													value={ contentPaddingMobile }
													onChange={ ( value ) => setAttributes( { contentPaddingMobile: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ contentPaddingTypeTablet === "px" } aria-pressed={ contentPaddingTypeTablet === "px" } onClick={ () => setAttributes( { contentPaddingTypeTablet: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ contentPaddingTypeTablet === "%" } aria-pressed={ contentPaddingTypeTablet === "%" } onClick={ () => setAttributes( { contentPaddingTypeTablet: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2 className="uagb-lighter-font-weight">{ __( "Gap Between Lists" ) }</h2>
												<RangeControl
													className={ "uagb-margin-control" }
													value={ contentPaddingTablet }
													onChange={ ( value ) => setAttributes( { contentPaddingTablet: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ contentPaddingTypeDesktop === "px" } aria-pressed={ contentPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { contentPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ contentPaddingTypeDesktop === "%" } aria-pressed={ contentPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { contentPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2 className="uagb-light-font-weight">{ __( "Gap Between Lists" ) }</h2>
												<RangeControl
													className={ "uagb-gap-control" }
													value={ contentPaddingDesktop }
													onChange={ ( value ) => setAttributes( { contentPaddingDesktop: value } ) }
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
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: loadGoogleFonts, label: "loadGoogleFonts" } }
							fontFamily = { { value: fontFamily, label: "fontFamily" } }
							fontWeight = { { value: fontWeight, label: "fontWeight" } }
							fontSubset = { { value: fontSubset, label: "fontSubset" } }
							fontSizeType = { { value: fontSizeType, label: "fontSizeType" } }
							fontSize = { { value: fontSize, label: "fontSize" } }
							fontSizeMobile = { { value: fontSizeMobile, label: "fontSizeMobile" } }
							fontSizeTablet= { { value: fontSizeTablet, label: "fontSizeTablet" } }
							lineHeightType = { { value: lineHeightType, label: "lineHeightType" } }
							lineHeight = { { value: lineHeight, label: "lineHeight" } }
							lineHeightMobile = { { value: lineHeightMobile, label: "lineHeightMobile" } }
							lineHeightTablet= { { value: lineHeightTablet, label: "lineHeightTablet" } }
						/>
						<p className="uagb-setting-label">{ __( "Content Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: linkColor }} ></span></span></p>
						<ColorPalette
							value={ linkColor }
							onChange={ ( colorValue ) => setAttributes( { linkColor: colorValue } ) }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Content Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: linkHoverColor }} ></span></span></p>
						<ColorPalette
							value={ linkHoverColor }
							onChange={ ( colorValue ) => setAttributes( { linkHoverColor: colorValue } ) }
							allowReset
						/>
					</PanelBody>
					<PanelBody title={ __( "Style" ) } initialOpen={ false }>
						<h2>{ __( "Background" ) }</h2>
						<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
							allowReset
						/>
						<hr className="uagb-editor__separator"/>
						<ToggleControl
							label={ __( "Custom Width" ) }
							checked={ customWidth }
							onChange={ ( value ) => setAttributes( { customWidth: ! customWidth } ) }
							help={ __( "Table's width will be auto if this is kept off." ) }
						/>
						{ customWidth &&
							<TabPanel className="uagb-size-type-field-tabs" activeClass="active-tab"
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
														<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ widthTypeMobile === "px" } aria-pressed={ widthTypeMobile === "px" } onClick={ () => setAttributes( { widthTypeMobile: "px" } ) }>{ "px" }</Button>
														<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ widthTypeMobile === "%" } aria-pressed={ widthTypeMobile === "%" } onClick={ () => setAttributes( { widthTypeMobile: "%" } ) }>{ "%" }</Button>
													</ButtonGroup>
													<RangeControl
														label={ __( "Width" ) }
														value={ widthMobile }
														onChange={ ( value ) => setAttributes( { widthMobile: value } ) }
														min={ 0 }
														max={ ( "%" == widthTypeMobile ) ? 100 : 1000 }
														beforeIcon=""
														allowReset
													/>
												</Fragment>
											)
										} else if ( "tablet" === tab.name ) {
											tabout = (
												<Fragment>
													<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
														<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ widthTypeTablet === "px" } aria-pressed={ widthTypeTablet === "px" } onClick={ () => setAttributes( { widthTypeTablet: "px" } ) }>{ "px" }</Button>
														<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ widthTypeTablet === "%" } aria-pressed={ widthTypeTablet === "%" } onClick={ () => setAttributes( { widthTypeTablet: "%" } ) }>{ "%" }</Button>
													</ButtonGroup>
													<RangeControl
														label={ __( "Width" ) }
														value={ widthTablet }
														onChange={ ( value ) => setAttributes( { widthTablet: value } ) }
														min={ 0 }
														max={ ( "%" == widthTypeTablet ) ? 100 : 1000 }
														beforeIcon=""
														allowReset
													/>
												</Fragment>
											)
										} else {
											tabout = (
												<Fragment>
													<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
														<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ widthTypeDesktop === "px" } aria-pressed={ widthTypeDesktop === "px" } onClick={ () => setAttributes( { widthTypeDesktop: "px" } ) }>{ "px" }</Button>
														<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ widthTypeDesktop === "%" } aria-pressed={ widthTypeDesktop === "%" } onClick={ () => setAttributes( { widthTypeDesktop: "%" } ) }>{ "%" }</Button>
													</ButtonGroup>
													<RangeControl
														label={ __( "Width" ) }
														value={ widthDesktop }
														onChange={ ( value ) => setAttributes( { widthDesktop: value } ) }
														min={ 0 }
														max={ ( "%" == widthTypeDesktop ) ? 100 : 1000 }
														beforeIcon=""
														allowReset
													/>
												</Fragment>
											)
										}

										return <div>{ tabout }</div>
									}
								}
							</TabPanel>
						}
						<TabPanel className="uagb-size-type-field-tabs uagb-inline-margin" activeClass="active-tab"
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
											<RangeControl
												label={ __( "Columns" ) }
												value={ tColumnsMobile }
												onChange={ ( value ) => setAttributes( { tColumnsMobile: value } ) }
												min={ 1 }
												max={ 10 }
											/>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<RangeControl
												label={ __( "Columns" ) }
												value={ tColumnsTablet }
												onChange={ ( value ) => setAttributes( { tColumnsTablet: value } ) }
												min={ 1 }
												max={ 10 }
											/>
										)
									} else {
										tabout = (
											<RangeControl
												label={ __( "Columns" ) }
												value={ tColumnsDesktop }
												onChange={ ( value ) => setAttributes( { tColumnsDesktop: value } ) }
												min={ 1 }
												max={ 10 }
											/>
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
						<hr className="uagb-editor__separator" />
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ paddingTypeMobile === "px" } aria-pressed={ paddingTypeMobile === "px" } onClick={ () => setAttributes( { paddingTypeMobile: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ paddingTypeMobile === "%" } aria-pressed={ paddingTypeMobile === "%" } onClick={ () => setAttributes( { paddingTypeMobile: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vPaddingMobile }
													onChange={ ( value ) => setAttributes( { vPaddingMobile: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hPaddingMobile }
													onChange={ ( value ) => setAttributes( { hPaddingMobile: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ paddingTypeTablet === "px" } aria-pressed={ paddingTypeTablet === "px" } onClick={ () => setAttributes( { paddingTypeTablet: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ paddingTypeTablet === "%" } aria-pressed={ paddingTypeTablet === "%" } onClick={ () => setAttributes( { paddingTypeTablet: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vPaddingTablet }
													onChange={ ( value ) => setAttributes( { vPaddingTablet: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hPaddingTablet }
													onChange={ ( value ) => setAttributes( { hPaddingTablet: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ paddingTypeDesktop === "px" } aria-pressed={ paddingTypeDesktop === "px" } onClick={ () => setAttributes( { paddingTypeDesktop: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ paddingTypeDesktop === "%" } aria-pressed={ paddingTypeDesktop === "%" } onClick={ () => setAttributes( { paddingTypeDesktop: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vPaddingDesktop }
													onChange={ ( value ) => setAttributes( { vPaddingDesktop: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hPaddingDesktop }
													onChange={ ( value ) => setAttributes( { hPaddingDesktop: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ marginTypeMobile === "px" } aria-pressed={ marginTypeMobile === "px" } onClick={ () => setAttributes( { marginTypeMobile: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ marginTypeMobile === "%" } aria-pressed={ marginTypeMobile === "%" } onClick={ () => setAttributes( { marginTypeMobile: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "List Margin" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vMarginMobile }
													onChange={ ( value ) => setAttributes( { vMarginMobile: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hMarginMobile }
													onChange={ ( value ) => setAttributes( { hMarginMobile: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ marginTypeTablet === "px" } aria-pressed={ marginTypeTablet === "px" } onClick={ () => setAttributes( { marginTypeTablet: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ marginTypeTablet === "%" } aria-pressed={ marginTypeTablet === "%" } onClick={ () => setAttributes( { marginTypeTablet: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "List Margin" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vMarginTablet }
													onChange={ ( value ) => setAttributes( { vMarginTablet: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hMarginTablet }
													onChange={ ( value ) => setAttributes( { hMarginTablet: value } ) }
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ marginTypeDesktop === "px" } aria-pressed={ marginTypeDesktop === "px" } onClick={ () => setAttributes( { marginTypeDesktop: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ marginTypeDesktop === "%" } aria-pressed={ marginTypeDesktop === "%" } onClick={ () => setAttributes( { marginTypeDesktop: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "List Margin" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vMarginDesktop }
													onChange={ ( value ) => setAttributes( { vMarginDesktop: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hMarginDesktop }
													onChange={ ( value ) => setAttributes( { hMarginDesktop: value } ) }
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
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Border" ) }</h2>
						<SelectControl
							label={ __( "Border Style" ) }
							value={ borderStyle }
							onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "solid", label: __( "Solid" ) },
								{ value: "dotted", label: __( "Dotted" ) },
								{ value: "dashed", label: __( "Dashed" ) },
								{ value: "double", label: __( "Double" ) },
								{ value: "groove", label: __( "Groove" ) },
								{ value: "inset", label: __( "Inset" ) },
								{ value: "outset", label: __( "Outset" ) },
								{ value: "ridge", label: __( "Ridge" ) },
							] }
						/>
						{ "none" != borderStyle && (
							<RangeControl
								label={ __( "Border Width" ) }
								value={ borderWidth }
								onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
						) }
						<RangeControl
							label={ __( "Border Radius" ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
						{ "none" != borderStyle && (
							<Fragment>
								<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
								<ColorPalette
									value={ borderColor }
									onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						) }
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					`uagb-toc__align-${align}`,
					`uagb-toc__columns-${tColumnsDesktop}`,
					( initialCollapse ) ? `uagb-toc__collapse` : '',
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }
				>
					<div className="uagb-toc__wrap">
						<div className="uagb-toc__title-wrap">
							<RichText
								tagName= { "div" }
								placeholder={ __( "Table Of Contents" ) }
								value={ heading }
								className = 'uagb-toc__title'
								onChange = { ( value ) => setAttributes( { heading: value } ) }
								multiline={ false }
								onRemove={ () => props.onReplace( [] ) }
							/>
							{icon_html}
						</div>
						<TableOfContents
							mappingHeaders={mappingHeaders}
							headers={headers}
						/>
					</div>
				</div>
				{ loadGFonts }
				{ headingloadGFonts }
			</Fragment>
		)
	}
}

export default compose(
	withSelect( ( select, ownProps ) => {

		const getData = ( headerData, a ) => {
			headerData.map( ( header ) => {
				let innerBlock = header.innerBlocks;
				if( innerBlock.length > 0 ) {
					innerBlock.forEach(function(element) {
						if( element.innerBlocks.length > 0 ) {
							getData( element.innerBlocks, a );
						} else {
							if( element.name === 'core/heading' ) {
								a.push( element );
							}

							if( element.name === 'uagb/advanced-heading' ) {
								a.push( element );
							}
						}
					});
				} else {
					if( header.name === 'core/heading' ) {
						a.push( header );
					}

					if( header.name === 'uagb/advanced-heading' ) {
						a.push( header );
					}
				}

			});
			return a; 
		}

		const parseTocSlug = ( slug ) => {

			// If not have the element then return false!
			if( ! slug ) {
				return slug;
			}
			
			var parsedSlug = slug.toString().toLowerCase()
				.replace(/&(amp;)/g, '')					 // Remove &
				.replace(/&(mdash;)/g, '')					 // Remove long dash
				.replace(/\u2013|\u2014/g, '')				 // Remove long dash
				.replace(/[&]nbsp[;]/gi, '-')                // Replace inseccable spaces
				.replace(/\s+/g, '-')                        // Replace spaces with -
				.replace(/[&\/\\#,^!+()$~%.'":*?<>{}@‘’”“]/g, '')  // Remove special chars
				.replace(/\-\-+/g, '-')                      // Replace multiple - with single -
				.replace(/^-+/, '')                          // Trim - from start of text
				.replace(/-+$/, '');                         // Trim - from end of text

			return decodeURI( encodeURIComponent( parsedSlug ) );
		}

		let a = [];
		let all_headers = getData( select( 'core/block-editor' ).getBlocks(), a );

		let headers = [];

		if( all_headers != 'undefined' ) {
			all_headers.forEach((heading, key) => {

				let heading_attr = heading.attributes

				const contentLevel = ( heading.name == 'uagb/advanced-heading' ) ? parseInt( heading_attr.headingTag[1] ) : heading_attr.level

				const contentName = ( heading.name == 'uagb/advanced-heading' ) ? 'headingTitle' : 'content'

				const headingContentEmpty = typeof heading_attr[contentName] === 'undefined' || heading_attr[contentName] === '';

				if ( !headingContentEmpty ) {
					headers.push(
						{
							tag: contentLevel,
							text: striptags( heading_attr[contentName] ),
							link: parseTocSlug( striptags( heading_attr[contentName] ) ),
							content: heading_attr[contentName]
						}
					);
				}
			});
		}

		if ( headers !== undefined ) {

			headers.forEach( function ( heading, index ) {
				heading.level = 0;

				for ( var i = index - 1; i >= 0; i-- ) {
					var currentOrderedItem = headers[i];

					if ( currentOrderedItem.tag <= heading.tag ) {
						heading.level = currentOrderedItem.level;

						if ( currentOrderedItem.tag < heading.tag ) {
							heading.level++;
						}
						break;
					}
				}
			});
		}

		return {
			headers: headers
		};
	} )
) ( UAGBTableOfContentsEdit )
