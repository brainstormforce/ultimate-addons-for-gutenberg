/**
 * BLOCK: Testimonial
 */


import classnames from "classnames"
import AuthorName from "./components/AuthorName"
import Company from "./components/Company"
import Description from "./components/Description"
import PositionClasses from "./classes"
import TestimonialStyle from "./inline-styles"
import TestimonialImage from "./components/TestimonialImageNew"
import times from "lodash/times"
import Slider from "react-slick"
import UAGB_Block_Icons from "@Controls/block-icons"
import Columnresponsive from "../../components/typography/column-responsive"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

import { __ } from '@wordpress/i18n';

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	PanelColorSettings,
	MediaUpload
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button,
	Dashicon,
	TabPanel
} = wp.components

const { withSelect } = wp.data

const { Component, Fragment } = wp.element

class UAGBtestimonial extends Component {

	constructor() {

		super( ...arguments )
		this.onSelectTestImage  = this.onSelectTestImage.bind( this )
		this.onRemoveTestImage  = this.onRemoveTestImage.bind(this)
		this.getImageName       = this.getImageName.bind(this)
		this.togglePauseOnHover = this.togglePauseOnHover.bind( this )
		this.toggleInfiniteLoop = this.toggleInfiniteLoop.bind( this )
		this.toggleAutoplay     = this.toggleAutoplay.bind( this )
		this.onRemoveImage 		= this.onRemoveImage.bind( this )
		this.onSelectImage 		= this.onSelectImage.bind( this )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectTestImage( media, index ) {
		const { test_block } = this.props.attributes
		const { setAttributes } = this.props

		let imag_url = null
		if ( ! media || ! media.url ) {
			imag_url = null
		}else{
			imag_url = media
		}

		if ( ! media.type || "image" !== media.type ) {
			imag_url = null
		}

		const newItems = test_block.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = imag_url
			}
			return item
		} )

		setAttributes( {
			test_block: newItems,
		} )

	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveTestImage( index ) {
		const { test_block } = this.props.attributes
		const { setAttributes } = this.props

		const newItems = test_block.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = null
			}
			return item
		} )

		setAttributes( {
			test_block: newItems,
		} )
	}

	/*
	 * Event to set Image selectot label.
	 */
	getImageName( image ){
		const { test_block } = this.props.attributes

		let image_name = __( "Select Image",'ultimate-addons-for-gutenberg' )
		if(image){
			if(image.url == null || image.url == "" ){
				image_name = __( "Select Image",'ultimate-addons-for-gutenberg' )
			}else{
				image_name = __( "Replace Image",'ultimate-addons-for-gutenberg' )
			}
		}
		return image_name
	}

	togglePauseOnHover() {
		const { pauseOnHover } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { pauseOnHover: ! pauseOnHover } )
	}

	toggleInfiniteLoop() {
		const { infiniteLoop } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { infiniteLoop: ! infiniteLoop } )
	}

	toggleAutoplay() {
		const { autoplay } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { autoplay: ! autoplay } )
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props

		setAttributes( { backgroundImage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		if ( ! media.type || "image" !== media.type ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		setAttributes( { backgroundImage: media } )
	}

	render() {

		const { className, setAttributes, attributes, deviceType } = this.props

		// Setup the attributes.
		const {
			test_item_count,
			test_block,
			headingAlign,
			companyColor,
			descColor,
			authorColor,

			nameFontSizeType,
			nameFontSize,
			nameFontSizeTablet,
			nameFontSizeMobile,
			nameFontFamily,
			nameFontWeight,
			nameFontSubset,
			nameLineHeightType,
			nameLineHeight,
			nameLineHeightTablet,
			nameLineHeightMobile,
			nameLoadGoogleFonts,

			companyFontSizeType,
			companyFontSize,
			companyFontSizeTablet,
			companyFontSizeMobile,
			companyFontFamily,
			companyFontWeight,
			companyFontSubset,
			companyLineHeightType,
			companyLineHeight,
			companyLineHeightTablet,
			companyLineHeightMobile,
			companyLoadGoogleFonts,

			descFontSizeType,
			descFontSize,
			descFontSizeTablet,
			descFontSizeMobile,
			descFontFamily,
			descFontWeight,
			descFontSubset,
			descLineHeightType,
			descLineHeight,
			descLineHeightTablet,
			descLineHeightMobile,
			descLoadGoogleFonts,

			descSpace,
			iconimgStyle,
			imagePosition,
			imageAlignment,
			nameSpace,
			imgHrPadding,
			imgVrPadding,
			imageSize,
			imageWidth,
			columns,
			tcolumns,
			mcolumns,
			pauseOnHover,
			infiniteLoop,
			transitionSpeed,
			arrowDots,
			arrowSize,
			arrowBorderSize,
			arrowBorderRadius,
			autoplay,
			autoplaySpeed,
			arrowColor,
			rowGap,
			columnGap,
			contentPadding,
			backgroundType,
			backgroundColor,
			backgroundImage,
			backgroundPosition,
			backgroundSize,
			backgroundRepeat,
			backgroundImageColor,
			backgroundOpacity,
			borderStyle,
			borderWidth ,
			borderRadius,
			borderColor,
			stack,
		} = attributes

		let loadNameGoogleFonts
		let loadCompanyGoogleFonts
		let loadDescGoogleFonts

		if( nameLoadGoogleFonts == true ) {

			const nameconfig = {
				google: {
					families: [ nameFontFamily + ( nameFontWeight ? ":" + nameFontWeight : "" ) ],
				},
			}

			loadNameGoogleFonts = (
				<WebfontLoader config={ nameconfig }>
				</WebfontLoader>
			)
		}

		if( companyLoadGoogleFonts == true ) {

			const companyconfig = {
				google: {
					families: [ companyFontFamily + ( companyFontWeight ? ":" + companyFontWeight : "" ) ],
				},
			}

			loadCompanyGoogleFonts = (
				<WebfontLoader config={ companyconfig }>
				</WebfontLoader>
			)
		}

		if( descLoadGoogleFonts == true ) {

			const descconfig = {
				google: {
					families: [ descFontFamily + ( descFontWeight ? ":" + descFontWeight : "" ) ],
				},
			}

			loadDescGoogleFonts = (
				<WebfontLoader config={ descconfig }>
				</WebfontLoader>
			)
		}

		// Typography settings.
		const TypographySettings = (
			<Fragment>
				<PanelBody title={ __( "Typography",'ultimate-addons-for-gutenberg' ) } initialOpen={ false } >
					<h2>{ __( "Testimonial",'ultimate-addons-for-gutenberg' ) }</h2>
					<TypographyControl
						label={ __( "Typography",'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: descLoadGoogleFonts, label: "descLoadGoogleFonts" } }
						fontFamily = { { value: descFontFamily, label: "descFontFamily" } }
						fontWeight = { { value: descFontWeight, label: "descFontWeight" } }
						fontSubset = { { value: descFontSubset, label: "descFontSubset" } }
						fontSizeType = { { value: descFontSizeType, label: "descFontSizeType" } }
						fontSize = { { value: descFontSize, label: "descFontSize" } }
						fontSizeMobile = { { value: descFontSizeMobile, label: "descFontSizeMobile" } }
						fontSizeTablet= { { value: descFontSizeTablet, label: "descFontSizeTablet" } }
						lineHeightType = { { value: descLineHeightType, label: "descLineHeightType" } }
						lineHeight = { { value: descLineHeight, label: "descLineHeight" } }
						lineHeightMobile = { { value: descLineHeightMobile, label: "descLineHeightMobile" } }
						lineHeightTablet= { { value: descLineHeightTablet, label: "descLineHeightTablet" } }
					/>

					<hr className="uagb-editor__separator" />
					<h2>{ __( "Name",'ultimate-addons-for-gutenberg' ) }</h2>
					<TypographyControl
						label={ __( "Typography",'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: nameLoadGoogleFonts, label: "nameLoadGoogleFonts" } }
						fontFamily = { { value: nameFontFamily, label: "nameFontFamily" } }
						fontWeight = { { value: nameFontWeight, label: "nameFontWeight" } }
						fontSubset = { { value: nameFontSubset, label: "nameFontSubset" } }
						fontSizeType = { { value: nameFontSizeType, label: "nameFontSizeType" } }
						fontSize = { { value: nameFontSize, label: "nameFontSize" } }
						fontSizeMobile = { { value: nameFontSizeMobile, label: "nameFontSizeMobile" } }
						fontSizeTablet= { { value: nameFontSizeTablet, label: "nameFontSizeTablet" } }
						lineHeightType = { { value: nameLineHeightType, label: "nameLineHeightType" } }
						lineHeight = { { value: nameLineHeight, label: "nameLineHeight" } }
						lineHeightMobile = { { value: nameLineHeightMobile, label: "nameLineHeightMobile" } }
						lineHeightTablet= { { value: nameLineHeightTablet, label: "nameLineHeightTablet" } }
					/>

					<hr className="uagb-editor__separator" />
					<h2>{ __( "Company",'ultimate-addons-for-gutenberg' ) }</h2>
					<TypographyControl
						label={ __( "Typography",'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: companyLoadGoogleFonts, label:  "companyLoadGoogleFonts" } }
						fontFamily = { { value: companyFontFamily, label:  "companyFontFamily" } }
						fontWeight = { { value: companyFontWeight, label:  "companyFontWeight" } }
						fontSubset = { { value: companyFontSubset, label:  "companyFontSubset" } }
						fontSizeType = { { value: companyFontSizeType, label:  "companyFontSizeType" } }
						fontSize = { { value: companyFontSize, label:  "companyFontSize" } }
						fontSizeMobile = { { value: companyFontSizeMobile, label:  "companyFontSizeMobile" } }
						fontSizeTablet= { { value: companyFontSizeTablet, label:  "companyFontSizeTablet" } }
						lineHeightType = { { value: companyLineHeightType, label:  "companyLineHeightType" } }
						lineHeight = { { value: companyLineHeight, label:  "companyLineHeight" } }
						lineHeightMobile = { { value: companyLineHeightMobile, label:  "companyLineHeightMobile" } }
						lineHeightTablet= { { value: companyLineHeightTablet, label:  "companyLineHeightTablet" } }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( "Color Settings",'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: descColor,
							onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
							label: __( "Testimonial Color",'ultimate-addons-for-gutenberg' ),
						},
						{
							value: authorColor,
							onChange: ( colorValue ) => setAttributes( { authorColor: colorValue } ),
							label: __( "Name Color",'ultimate-addons-for-gutenberg' ),
						},
						{
							value: companyColor,
							onChange: ( colorValue ) => setAttributes( { companyColor: colorValue } ),
							label: __( "Company Color",'ultimate-addons-for-gutenberg' ),
						},
						{
							value: arrowColor,
							onChange: ( colorValue ) => setAttributes( { arrowColor: colorValue } ),
							label: __( "Arrow & Dots Color",'ultimate-addons-for-gutenberg' ),
						},
					] }
				>
				</PanelColorSettings>
			</Fragment>
		)

		// Margin Settings.
		const marginSettings = (
			<PanelBody title={ __( "Spacing",'ultimate-addons-for-gutenberg' ) } initialOpen={ false } >
				<RangeControl
					label={ __( "Gap Between Content & Dots",'ultimate-addons-for-gutenberg' ) }
					value={ rowGap }
					onChange={ ( value ) => setAttributes( { rowGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Row Gap",'ultimate-addons-for-gutenberg' ) }
					value={ columnGap }
					onChange={ ( value ) => setAttributes( { columnGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Content Padding",'ultimate-addons-for-gutenberg' ) }
					value={ contentPadding }
					onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Testimonial Bottom Margin",'ultimate-addons-for-gutenberg' ) }
					value={ descSpace }
					onChange={ ( value ) => setAttributes( { descSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Name Bottom Margin",'ultimate-addons-for-gutenberg' ) }
					value={ nameSpace }
					onChange={ ( value ) => setAttributes( { nameSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Image Horizontal Padding",'ultimate-addons-for-gutenberg' ) }
					value={ imgHrPadding }
					onChange={ ( value ) => setAttributes( { imgHrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Image Vertical Padding",'ultimate-addons-for-gutenberg' ) }
					value={ imgVrPadding }
					onChange={ ( value ) => setAttributes( { imgVrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
			</PanelBody>
		)

		const background_settings = (
			<Fragment>
				<PanelBody title={ __( "Background",'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Background Type",'ultimate-addons-for-gutenberg' ) }
						value={ backgroundType }
						onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
						options={ [
							{ value: "none", label: __( "None",'ultimate-addons-for-gutenberg' ) },
							{ value: "color", label: __( "Color",'ultimate-addons-for-gutenberg' ) },
							{ value: "image", label: __( "Image",'ultimate-addons-for-gutenberg' ) },
						] }
					/>
					{ "color" == backgroundType &&
							<Fragment>
								<p className="uagb-setting-label">{ __( "Background Color",'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
								<ColorPalette
									value={ backgroundColor }
									onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
					}
					{ "image" == backgroundType &&
							<Fragment>
								<BaseControl
									className="editor-bg-image-control"
									label={ __( "Background Image",'ultimate-addons-for-gutenberg' ) }>
									<MediaUpload
										title={ __( "Select Background Image",'ultimate-addons-for-gutenberg' ) }
										onSelect={ this.onSelectImage }
										allowedTypes= { [ "image" ] }
										value={ backgroundImage }
										render={ ( { open } ) => (
											<Button isSecondary onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image",'ultimate-addons-for-gutenberg' ) : __( "Replace image",'ultimate-addons-for-gutenberg' ) }
											</Button>
										) }
									/>
									{ backgroundImage &&
										<Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image",'ultimate-addons-for-gutenberg' ) }
										</Button>
									}
								</BaseControl>
								{ backgroundImage &&
									<Fragment>
										<SelectControl
											label={ __( "Image Position",'ultimate-addons-for-gutenberg' ) }
											value={ backgroundPosition }
											onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
											options={ [
												{ value: "top-left", label: __( "Top Left",'ultimate-addons-for-gutenberg' ) },
												{ value: "top-center", label: __( "Top Center",'ultimate-addons-for-gutenberg' ) },
												{ value: "top-right", label: __( "Top Right",'ultimate-addons-for-gutenberg' ) },
												{ value: "center-left", label: __( "Center Left",'ultimate-addons-for-gutenberg' ) },
												{ value: "center-center", label: __( "Center Center",'ultimate-addons-for-gutenberg' ) },
												{ value: "center-right", label: __( "Center Right",'ultimate-addons-for-gutenberg' ) },
												{ value: "bottom-left", label: __( "Bottom Left",'ultimate-addons-for-gutenberg' ) },
												{ value: "bottom-center", label: __( "Bottom Center",'ultimate-addons-for-gutenberg' ) },
												{ value: "bottom-right", label: __( "Bottom Right",'ultimate-addons-for-gutenberg' ) },
											] }
										/>
										<SelectControl
											label={ __( "Repeat",'ultimate-addons-for-gutenberg' ) }
											value={ backgroundRepeat }
											onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
											options={ [
												{ value: "no-repeat", label: __( "No Repeat",'ultimate-addons-for-gutenberg' ) },
												{ value: "repeat", label: __( "Repeat",'ultimate-addons-for-gutenberg' ) },
												{ value: "repeat-x", label: __( "Repeat-x",'ultimate-addons-for-gutenberg' ) },
												{ value: "repeat-y", label: __( "Repeat-y",'ultimate-addons-for-gutenberg' ) }
											] }
										/>
										<SelectControl
											label={ __( "Size" ) }
											value={ backgroundSize }
											onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
											options={ [
												{ value: "auto", label: __( "Auto",'ultimate-addons-for-gutenberg' ) },
												{ value: "cover", label: __( "Cover",'ultimate-addons-for-gutenberg' ) },
												{ value: "contain", label: __( "Contain",'ultimate-addons-for-gutenberg' ) }
											] }
										/>
										<Fragment>
											<p className="uagb-setting-label">{ __( "Image Overlay Color",'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
											<ColorPalette
												value={ backgroundImageColor }
												onChange={ ( colorValue ) => setAttributes( { backgroundImageColor: colorValue } ) }
												allowReset
											/>
										</Fragment>
									</Fragment>
								}
							</Fragment>
					}
					{ ( "image" == backgroundType && backgroundImage )  &&
							<RangeControl
								label={ __( "Opacity",'ultimate-addons-for-gutenberg' ) }
								value={ backgroundOpacity }
								onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={0}
							/>
					}
				</PanelBody>
				<PanelBody title={ __( "Border",'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Border Style",'ultimate-addons-for-gutenberg' ) }
						value={ borderStyle }
						onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
						options={ [
							{ value: "none", label: __( "None",'ultimate-addons-for-gutenberg' ) },
							{ value: "solid", label: __( "Solid",'ultimate-addons-for-gutenberg' ) },
							{ value: "dotted", label: __( "Dotted",'ultimate-addons-for-gutenberg' ) },
							{ value: "dashed", label: __( "Dashed",'ultimate-addons-for-gutenberg' ) },
							{ value: "double", label: __( "Double",'ultimate-addons-for-gutenberg' ) },
							{ value: "groove", label: __( "Groove",'ultimate-addons-for-gutenberg' ) },
							{ value: "inset", label: __( "Inset",'ultimate-addons-for-gutenberg' ) },
							{ value: "outset", label: __( "Outset",'ultimate-addons-for-gutenberg' ) },
							{ value: "ridge", label: __( "Ridge",'ultimate-addons-for-gutenberg' ) },
						] }
					/>
					{ "none" != borderStyle &&
							<Fragment>
								<RangeControl
									label={ __( "Border Width",'ultimate-addons-for-gutenberg' ) }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<Fragment>
									<p className="uagb-setting-label">{ __( "Border Color",'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
									<ColorPalette
										value={ borderColor }
										onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							</Fragment>
					}
					<RangeControl
						label={ __( "Border Radius",'ultimate-addons-for-gutenberg' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 1000 }
						allowReset
					/>
				</PanelBody>
			</Fragment>
		)

		// Image sizes.
		const imageSizeOptions = [
			{ value: "thumbnail", label: __( "Thumbnail",'ultimate-addons-for-gutenberg' ) },
			{ value: "medium", label: __( "Medium",'ultimate-addons-for-gutenberg' ) },
			{ value: "full", label: __( "Large",'ultimate-addons-for-gutenberg' ) }
		]

		function NextArrow( props ) {
			return (
				<button type="button" data-role="none" className="slick-next slick-arrow" aria-label="Next" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
					{ UAGB_Block_Icons.carousel_right }</button>
			)
		}

		function PrevArrow( props ) {
			return (
				<button type="button" data-role="none" className="slick-prev slick-arrow" aria-label="Previous" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
					{ UAGB_Block_Icons.carousel_left }</button>
			)
		}

		let dots = ( "dots" == arrowDots || "arrows_dots" == arrowDots ) ? true : false
		let arrows = ( "arrows" == arrowDots || "arrows_dots" == arrowDots ) ? true : false

		
		const settings = {
			slidesToShow : columns,
			slidesToScroll : 1,
			autoplaySpeed : autoplaySpeed,
			autoplay : autoplay,
			infinite : infiniteLoop,
			pauseOnHover : pauseOnHover,
			speed : transitionSpeed,
			arrows : arrows,
			dots : dots,
			rtl : false,
			draggable: false,
			nextArrow: <NextArrow arrowSize={arrowSize}/>,
			prevArrow: <PrevArrow arrowSize={arrowSize}/>,
			responsive : [
				{
					breakpoint : 1024,
					settings : {
						slidesToShow : tcolumns,
						slidesToScroll : 1,
					}
				},
				{
					breakpoint : 767,
					settings : {
						slidesToShow : mcolumns,
						slidesToScroll : 1,
					}
				}
			]
		} 

		let image_enable = false
		// Set testinomial image panel
		const tmControls = ( index ) => {
			let image_val = null
			if( test_block[index] && typeof test_block[index] !== "undefined"){
				image_val = test_block[index]["image"]
			}
			return (
				<PanelBody key={index}
					title={ __( "Image",'ultimate-addons-for-gutenberg' ) + " " + ( index + 1 ) + " " + __( "Settings",'ultimate-addons-for-gutenberg' ) }
					initialOpen={ true }
					className= {"uagb-repeater-panel"}
				>

					<BaseControl
						className="editor-bg-image-control"
						label={ __( "" ) }
					>
						<MediaUpload
							title={ __( "Select Image"+ ( index + 1 ) ) }
							onSelect={ ( media ) => {
								this.onSelectTestImage( media, index )
							} }
							allowedTypes= { [ "image" ] }
							value={ image_val }
							render={ ( { open } ) => (
								<Button isSecondary onClick={ open }>
									{  this.getImageName( test_block[index]["image"] ) }
								</Button>
							) }
						/>
						{ ( image_val && test_block[index]["image"].url !== null && test_block[index]["image"].url !=="" ) &&
							<Button className="uagb-rm-btn" key= { index} onClick={ (value) => {
								this.onRemoveTestImage(index)
							} } isLink isDestructive>
								{ __( "Remove Image" ) }
							</Button>
						}
					</BaseControl>
				</PanelBody>
			)
		}

		const carousal_settings = (
			<PanelBody title={ __( "Carousel",'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( "Pause On Hover",'ultimate-addons-for-gutenberg' ) }
					checked={ pauseOnHover }
					onChange={ this.togglePauseOnHover }
				/>
				<ToggleControl
					label={ __( "Autoplay" ) }
					checked={ autoplay }
					onChange={ this.toggleAutoplay }
				/>
				{ autoplay == true &&
					<RangeControl
						label={ __( "Autoplay Speed (ms)",'ultimate-addons-for-gutenberg' ) }
						value={ autoplaySpeed }
						onChange={ ( value ) => setAttributes( { autoplaySpeed: value } ) }
						min={ 100 }
						max={ 10000 }
					/>
				}
				<ToggleControl
					label={ __( "Infinite Loop",'ultimate-addons-for-gutenberg' ) }
					checked={ infiniteLoop }
					onChange={ this.toggleInfiniteLoop }
				/>
				<RangeControl
					label={ __( "Transition Speed (ms)",'ultimate-addons-for-gutenberg' ) }
					value={ transitionSpeed }
					onChange={ ( value ) => setAttributes( { transitionSpeed: value } ) }
					min={ 100 }
					max={ 5000 }
				/>
				<SelectControl
					label={ __( "Show Arrows & Dots",'ultimate-addons-for-gutenberg' ) }
					value={ arrowDots }
					onChange={ ( value ) => setAttributes( { arrowDots: value } ) }
					options={ [
						{ value: "arrows", label: __( "Only Arrows",'ultimate-addons-for-gutenberg' ) },
						{ value: "dots", label: __( "Only Dots",'ultimate-addons-for-gutenberg' ) },
						{ value: "arrows_dots", label: __( "Both Arrows & Dots",'ultimate-addons-for-gutenberg' ) },
					] }
				/>
				{ "dots" != arrowDots &&
					<Fragment>
						<RangeControl
							label={ __( "Arrow Size",'ultimate-addons-for-gutenberg' ) }
							value={ arrowSize }
							onChange={ ( value ) => setAttributes( { arrowSize: value } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( "Arrow Border Size",'ultimate-addons-for-gutenberg' ) }
							value={ arrowBorderSize }
							onChange={ ( value ) => setAttributes( { arrowBorderSize: value } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( "Arrow Border Radius",'ultimate-addons-for-gutenberg' ) }
							value={ arrowBorderRadius }
							onChange={ ( value ) => setAttributes( { arrowBorderRadius: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					</Fragment>
				}
			</PanelBody>
		)

		let cnt = 0
		test_block.map( ( item, thisIndex ) => {
			let image_arr = test_block[thisIndex]
			if( image_arr && typeof image_arr !== "undefined"){
	            const image = image_arr["image"]
	            if( typeof image !== "undefined" && image !== null && image !=="" ){
	            	cnt++
	            }
	        }
		} )

		// Global Controls.
		const inspect_control = (
			<InspectorControls>
			 	<PanelBody title={ __( "General" ) } initialOpen={ true } >
			 		<RangeControl
						label={ __( "Number of Testimonials",'ultimate-addons-for-gutenberg' ) }
						value={ test_item_count }
						onChange={ ( newCount ) => {
							let cloneTest_block = [ ...test_block ]
							if ( cloneTest_block.length < newCount ) {
								const incAmount = Math.abs( newCount - cloneTest_block.length )

								{ times( incAmount, n => {

									cloneTest_block.push( {
										description: "I have been working with these guys since years now! With lots of hard work and timely communication they made sure they delivered the best to me. Highly recommended!" ,
										name: "John Doe",
										company: "Company"+ ( cloneTest_block.length + 1 ),
										image: "",
									} )
								} ) }
								setAttributes( { test_block: cloneTest_block } )
							}else{
								const incAmount = Math.abs( newCount - cloneTest_block.length )
								let data_new = cloneTest_block
				            for( var i= 0; i < incAmount; i++ ){
				                data_new.pop()
				            }
				            setAttributes({test_block:data_new})

							}
							setAttributes( { test_item_count: newCount } )
						} }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<Columnresponsive/>
					{ "Desktop" === deviceType && (
						<Fragment>
						<RangeControl
							label={ __( "Columns", 'ultimate-addons-for-gutenberg' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ test_item_count }
						/>
						</Fragment>
					)}
					{ "Tablet" === deviceType && (
						<Fragment>
						<RangeControl
							label={ __( "Columns", 'ultimate-addons-for-gutenberg' ) }
							value={ tcolumns }
							onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
							min={ 1 }
							max={ test_item_count }
						/>
						</Fragment>
					)}
					{ "Mobile" === deviceType && (
						<Fragment>
							<RangeControl
								label={ __( "Columns", 'ultimate-addons-for-gutenberg' ) }
								value={ mcolumns }
								onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
								min={ 1 }
								max={ test_item_count }
							/>
						</Fragment>
					)}
				</PanelBody>
				{ carousal_settings }
				<PanelBody
					title={ __( "Image",'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
				>
					{ times( test_item_count, n => tmControls( n ) ) }

					{  cnt > 0 && <Fragment>
						<hr className="uagb-editor__separator" />
						<SelectControl
							label={ __( "Image Position" ) }
							value={ imagePosition }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
							options={ [
								{ value: "top", label: __( "Top",'ultimate-addons-for-gutenberg' ) },
								{ value: "bottom", label: __( "Bottom",'ultimate-addons-for-gutenberg' ) },
								{ value: "left", label: __( "Left",'ultimate-addons-for-gutenberg' ) },
								{ value: "right", label: __( "Right",'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						{ (imagePosition == "left" || imagePosition == "right") &&
						<Fragment>
							<SelectControl
								label={ __( "Vertical ALignment",'ultimate-addons-for-gutenberg' ) }
								value={ imageAlignment }
								onChange={ ( value ) => setAttributes( { imageAlignment: value } ) }
								options={ [
									{ value: "top", label: __( "Top",'ultimate-addons-for-gutenberg' ) },
									{ value: "middle", label: __( "Middle",'ultimate-addons-for-gutenberg' ) },
								] }
							/>
							<SelectControl
								label={ __( "Stack on",'ultimate-addons-for-gutenberg' ) }
								value={ stack }
								options={ [
									{ value: "none", label: __( "None",'ultimate-addons-for-gutenberg' ) },
									{ value: "tablet", label: __( "Tablet",'ultimate-addons-for-gutenberg' ) },
									{ value: "mobile", label: __( "Mobile",'ultimate-addons-for-gutenberg' ) },
								] }
								help={ __( "Note: Choose on what breakpoint the Info Box will stack.",'ultimate-addons-for-gutenberg' ) }
								onChange={ ( value ) => setAttributes( { stack: value } ) }
							/>
						</Fragment>
						}
						<SelectControl
							label={ __( "Image Style",'ultimate-addons-for-gutenberg' ) }
							value={ iconimgStyle }
							onChange={ ( value ) => setAttributes( { iconimgStyle: value } ) }
							options={ [
								{ value: "normal", label: __( "Normal",'ultimate-addons-for-gutenberg' ) },
								{ value: "circle", label: __( "Circle",'ultimate-addons-for-gutenberg' ) },
								{ value: "square", label: __( "Square",'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						<SelectControl
							label={ __( "Image Size",'ultimate-addons-for-gutenberg' ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
					 <RangeControl
							label={ __( "Width",'ultimate-addons-for-gutenberg' ) }
							value={ imageWidth }
							onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
					</Fragment>
					}


				</PanelBody>
				{ TypographySettings }

				{ marginSettings }
				{ background_settings }
			</InspectorControls>
		)

		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				{inspect_control}
				<div className={ classnames(
					className,
					"uagb-testomonial__outer-wrap uagb-slick-carousel uagb-tm__arrow-outside",
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }
				>
					<Slider
						className={ classnames(
							"is-carousel",
							`uagb-tm__columns-${ columns }`,
							"uagb-tm__items"
						) }
						{...settings}
					>

						{ test_block.map( ( test, index ) =>

							<div className = { classnames(
								"uagb-testimonial__wrap",
								...PositionClasses( attributes ),
							) } key ={ "wrap-"+index } >
								<div className = "uagb-tm__content" key ={ "tm_content-"+index }>
									<div className = "uagb-tm__overlay"></div>
									{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={attributes}  index_value = {index} /> }

									<div className ="uagb-tm__text-wrap">
										{  // Get description.
											<Fragment>
												<div className = "uagb-testinomial-text-wrap" key={"text-wrap-"+index}>
													<Description attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = {index}/>
												</div>
											</Fragment>
										}
										<div className ="uagb-tm__meta">
											<div className ="uagb-tm__meta-inner">

												{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={attributes} index_value = {index} /> }

												{ //title_text
													<Fragment>
														<div className = "uagb-testimonial-details" key={"tm_wraps-"+index}>
															<AuthorName attributes={attributes} setAttributes = { setAttributes } props = { this.props } index_value = {index}/>
															<Company attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = {index}/>
														</div>
													</Fragment>
												}
											</div>
										</div>
									</div>
									{ ( imagePosition == "right" ) && <TestimonialImage  attributes={attributes}  index_value = {index} /> }
								</div>
							</div>
						)}
					</Slider>
				</div>
				{ loadNameGoogleFonts }
				{ loadCompanyGoogleFonts }
				{ loadDescGoogleFonts }
			</Fragment>
		)
	}

	componentDidUpdate(prevProps, prevState) {
		var element = document.getElementById( "uagb-testinomial-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = TestimonialStyle( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-testinomial-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}
}

export default withSelect( ( select, props ) => { 

	const { __experimentalGetPreviewDeviceType = null } = select( 'core/edit-post' );

	let deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType: deviceType,
	}
})( UAGBtestimonial )
