/**
 * BLOCK: Testimonial
 */


import classnames from "classnames"
import AuthorName from "./components/AuthorName"
import Company from "./components/Company"
import Description from "./components/Description"
import PositionClasses from "./classes"
import TestimonialStyle from "./inline-styles"
import TestimonialImage from "./components/TestimonialImage"
import times from "lodash/times"
import Slider from "react-slick"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n

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

		let image_name = __( "Select Image" )
		if(image){
			if(image.url == null || image.url == "" ){
				image_name = __( "Select Image" )
			}else{
				image_name = __( "Replace Image" )
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

		const { className, setAttributes, attributes } = this.props

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
				<PanelBody title={ __( "Typography" ) } initialOpen={ false } >
					<h2>{ __( "Testimonial" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
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
					<h2>{ __( "Name" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
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
					<h2>{ __( "Company" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
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
					title={ __( "Color Settings" ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: descColor,
							onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
							label: __( "Testimonial Color" ),
						},
						{
							value: authorColor,
							onChange: ( colorValue ) => setAttributes( { authorColor: colorValue } ),
							label: __( "Name Color" ),
						},
						{
							value: companyColor,
							onChange: ( colorValue ) => setAttributes( { companyColor: colorValue } ),
							label: __( "Company Color" ),
						},
						{
							value: arrowColor,
							onChange: ( colorValue ) => setAttributes( { arrowColor: colorValue } ),
							label: __( "Arrow & Dots Color" ),
						},
					] }
				>
				</PanelColorSettings>
			</Fragment>
		)

		// Margin Settings.
		const marginSettings = (
			<PanelBody title={ __( "Spacing" ) } initialOpen={ false } >
				<RangeControl
					label={ __( "Gap Between Content & Dots" ) }
					value={ rowGap }
					onChange={ ( value ) => setAttributes( { rowGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Row Gap" ) }
					value={ columnGap }
					onChange={ ( value ) => setAttributes( { columnGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Content Padding" ) }
					value={ contentPadding }
					onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Testimonial Bottom Margin" ) }
					value={ descSpace }
					onChange={ ( value ) => setAttributes( { descSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Name Bottom Margin" ) }
					value={ nameSpace }
					onChange={ ( value ) => setAttributes( { nameSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Image Horizontal Padding" ) }
					value={ imgHrPadding }
					onChange={ ( value ) => setAttributes( { imgHrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Image Vertical Padding" ) }
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
				<PanelBody title={ __( "Background" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Background Type" ) }
						value={ backgroundType }
						onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "color", label: __( "Color" ) },
							{ value: "image", label: __( "Image" ) },
						] }
					/>
					{ "color" == backgroundType &&
							<Fragment>
								<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
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
									label={ __( "Background Image" ) }>
									<MediaUpload
										title={ __( "Select Background Image" ) }
										onSelect={ this.onSelectImage }
										allowedTypes= { [ "image" ] }
										value={ backgroundImage }
										render={ ( { open } ) => (
											<Button isDefault onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
											</Button>
										) }
									/>
									{ backgroundImage &&
										<Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image" ) }
										</Button>
									}
								</BaseControl>
								{ backgroundImage &&
									<Fragment>
										<SelectControl
											label={ __( "Image Position" ) }
											value={ backgroundPosition }
											onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
											options={ [
												{ value: "top-left", label: __( "Top Left" ) },
												{ value: "top-center", label: __( "Top Center" ) },
												{ value: "top-right", label: __( "Top Right" ) },
												{ value: "center-left", label: __( "Center Left" ) },
												{ value: "center-center", label: __( "Center Center" ) },
												{ value: "center-right", label: __( "Center Right" ) },
												{ value: "bottom-left", label: __( "Bottom Left" ) },
												{ value: "bottom-center", label: __( "Bottom Center" ) },
												{ value: "bottom-right", label: __( "Bottom Right" ) },
											] }
										/>
										<SelectControl
											label={ __( "Repeat" ) }
											value={ backgroundRepeat }
											onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
											options={ [
												{ value: "no-repeat", label: __( "No Repeat" ) },
												{ value: "repeat", label: __( "Repeat" ) },
												{ value: "repeat-x", label: __( "Repeat-x" ) },
												{ value: "repeat-y", label: __( "Repeat-y" ) }
											] }
										/>
										<SelectControl
											label={ __( "Size" ) }
											value={ backgroundSize }
											onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
											options={ [
												{ value: "auto", label: __( "Auto" ) },
												{ value: "cover", label: __( "Cover" ) },
												{ value: "contain", label: __( "Contain" ) }
											] }
										/>
										<Fragment>
											<p className="uagb-setting-label">{ __( "Image Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
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
								label={ __( "Opacity" ) }
								value={ backgroundOpacity }
								onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={0}
							/>
					}
				</PanelBody>
				<PanelBody title={ __( "Border" ) } initialOpen={ false }>
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
					{ "none" != borderStyle &&
							<Fragment>
								<RangeControl
									label={ __( "Border Width" ) }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<Fragment>
									<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
									<ColorPalette
										value={ borderColor }
										onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							</Fragment>
					}
					<RangeControl
						label={ __( "Border Radius" ) }
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
			{ value: "thumbnail", label: __( "Thumbnail" ) },
			{ value: "medium", label: __( "Medium" ) },
			{ value: "full", label: __( "Large" ) }
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
					title={ __( "Image" ) + " " + ( index + 1 ) + " " + __( "Settings" ) }
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
								<Button isDefault onClick={ open }>
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
			<PanelBody title={ __( "Carousel" ) } initialOpen={ false }>
				<ToggleControl
					label={ __( "Pause On Hover" ) }
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
						label={ __( "Autoplay Speed (ms)" ) }
						value={ autoplaySpeed }
						onChange={ ( value ) => setAttributes( { autoplaySpeed: value } ) }
						min={ 100 }
						max={ 10000 }
					/>
				}
				<ToggleControl
					label={ __( "Infinite Loop" ) }
					checked={ infiniteLoop }
					onChange={ this.toggleInfiniteLoop }
				/>
				<RangeControl
					label={ __( "Transition Speed (ms)" ) }
					value={ transitionSpeed }
					onChange={ ( value ) => setAttributes( { transitionSpeed: value } ) }
					min={ 100 }
					max={ 5000 }
				/>
				<SelectControl
					label={ __( "Show Arrows & Dots" ) }
					value={ arrowDots }
					onChange={ ( value ) => setAttributes( { arrowDots: value } ) }
					options={ [
						{ value: "arrows", label: __( "Only Arrows" ) },
						{ value: "dots", label: __( "Only Dots" ) },
						{ value: "arrows_dots", label: __( "Both Arrows & Dots" ) },
					] }
				/>
				{ "dots" != arrowDots &&
					<Fragment>
						<RangeControl
							label={ __( "Arrow Size" ) }
							value={ arrowSize }
							onChange={ ( value ) => setAttributes( { arrowSize: value } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( "Arrow Border Size" ) }
							value={ arrowBorderSize }
							onChange={ ( value ) => setAttributes( { arrowBorderSize: value } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( "Arrow Border Radius" ) }
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
						label={ __( "Number of Testimonials" ) }
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
					<TabPanel className="uagb-size-type-field-tabs uagb-without-size-type" activeClass="active-tab"
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
											value={ mcolumns }
											onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
											min={ 1 }
											max={ test_item_count }
										/>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ tcolumns }
											onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
											min={ 1 }
											max={ test_item_count }
										/>
									)
								} else {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ columns }
											onChange={ ( value ) => setAttributes( { columns: value } ) }
											min={ 1 }
											max={ test_item_count }
										/>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				</PanelBody>
				{ carousal_settings }

				<PanelBody
					title={ __( "Image" ) }
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
								{ value: "top", label: __( "Top" ) },
								{ value: "bottom", label: __( "Bottom" ) },
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
							] }
						/>
						{ (imagePosition == "left" || imagePosition == "right") &&
						<Fragment>
							<SelectControl
								label={ __( "Vertical ALignment" ) }
								value={ imageAlignment }
								onChange={ ( value ) => setAttributes( { imageAlignment: value } ) }
								options={ [
									{ value: "top", label: __( "Top" ) },
									{ value: "middle", label: __( "Middle" ) },
								] }
							/>
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
						</Fragment>
						}
						<SelectControl
							label={ __( "Image Style" ) }
							value={ iconimgStyle }
							onChange={ ( value ) => setAttributes( { iconimgStyle: value } ) }
							options={ [
								{ value: "normal", label: __( "Normal" ) },
								{ value: "circle", label: __( "Circle" ) },
								{ value: "square", label: __( "Square" ) },
							] }
						/>
						<SelectControl
							label={ __( "Image Size" ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
					 <RangeControl
							label={ __( "Width" ) }
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

export default UAGBtestimonial
