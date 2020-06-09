/**
 * BLOCK: Price List - Edit Class
 */


import classnames from "classnames"
import Title from "./components/Title"
import Price from "./components/Price"
import Description from "./components/Description"
import PositionClasses from "./classes"
import RestMenuStyle from "./inline-styles"
import RestMenuImage from "./components/RestMenuImage"
import times from "lodash/times"
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
	BaseControl,
	Button,
	TabPanel,
	Dashicon
} = wp.components

const { Component, Fragment } = wp.element

const MAX_COLUMNS = 3

class UAGBRestaurantMenu extends Component {

	constructor() {

		super( ...arguments )
		this.onSelectRestImage  = this.onSelectRestImage.bind( this )
		this.onRemoveRestImage  = this.onRemoveRestImage.bind(this)
		this.getImageName       = this.getImageName.bind(this)
		this.onRemoveImage 		= this.onRemoveImage.bind( this )
		this.onSelectImage 		= this.onSelectImage.bind( this )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectRestImage( media, index ) {
		const { rest_menu_item_arr } = this.props.attributes
		const { setAttributes } = this.props

		let image_url = null
		if ( ! media || ! media.url ) {
			image_url = null
		}else{
			image_url = media
		}

		if ( ! media.type || "image" !== media.type ) {
			image_url = null
		}

		const newItems = rest_menu_item_arr.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = image_url
			}
			return item
		} )

		setAttributes( {
			rest_menu_item_arr: newItems,
		} )

	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveRestImage( index ) {
		const { rest_menu_item_arr } = this.props.attributes
		const { setAttributes } = this.props

		const newItems = rest_menu_item_arr.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = null
			}
			return item
		} )

		setAttributes( {
			rest_menu_item_arr: newItems,
		} )
	}

	/*
	 * Event to set Image selectot label.
	 */
	getImageName( image ){

		let image_title = __( "Select Image" )
		if(image){
			if(image.url == null || image.url == "" ){
				image_title = __( "Select Image" )
			}else{
				image_title = __( "Replace Image" )
			}
		}
		return image_title
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
			menu_item_count,
			rest_menu_item_arr,
			headingAlign,
			priceColor,
			descColor,
			titleColor,
			headingTag,

			titleFontSizeType,
			titleFontSize,
			titleFontSizeTablet,
			titleFontSizeMobile,
			titleFontFamily,
			titleFontWeight,
			titleFontSubset,
			titleLineHeightType,
			titleLineHeight,
			titleLineHeightTablet,
			titleLineHeightMobile,
			titleLoadGoogleFonts,

			priceFontSizeType,
			priceFontSize,
			priceFontSizeTablet,
			priceFontSizeMobile,
			priceFontFamily,
			priceFontWeight,
			priceFontSubset,
			priceLineHeightType,
			priceLineHeight,
			priceLineHeightTablet,
			priceLineHeightMobile,
			priceLoadGoogleFonts,

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
			imagePosition,
			imageAlignment,
			titleSpace,
			imgHrPadding,
			imgVrPadding,
			imageSize,
			imageWidth,
			columns,
			tcolumns,
			mcolumns,
			rowGap,
			columnGap,
			contentHrPadding,
			contentVrPadding,
			seperatorStyle,
			seperatorWidth,
			seperatorThickness,
			seperatorColor,
			stack,
		} = attributes	

		let loadTitleGoogleFonts
		let loadDescGoogleFonts
		let loadPriceGoogleFonts

		if( titleLoadGoogleFonts == true ) {
			
			const titleconfig = {
				google: {
					families: [ titleFontFamily + ( titleFontWeight ? ":" + titleFontWeight : "" ) ],
				},
			}

			loadTitleGoogleFonts = (
				<WebfontLoader config={ titleconfig }>
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
		
		if( priceLoadGoogleFonts == true ) {
					
			const priceconfig = {
				google: {
					families: [ priceFontFamily + ( priceFontWeight ? ":" + priceFontWeight : "" ) ],
				},
			}

			loadPriceGoogleFonts = (
				<WebfontLoader config={ priceconfig }>
				</WebfontLoader>
			)
		}
		
		// Typography settings.
		const TypographySettings = (
			<Fragment>
				<PanelBody title={ __( "Typography" ) }  initialOpen={ false }>
					<h2>{ __( "Title" ) }</h2>
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
							{ value: "p", label: __( "P" ) },
							{ value: "span", label: __( "SPAN" ) },
						] }
					/>					
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: titleLoadGoogleFonts, label: "titleLoadGoogleFonts" } }
						fontFamily = { { value: titleFontFamily, label: "titleFontFamily" } }
						fontWeight = { { value: titleFontWeight, label: "titleFontWeight" } }
						fontSubset = { { value: titleFontSubset, label: "titleFontSubset" } }
						fontSizeType = { { value: titleFontSizeType, label: "titleFontSizeType" } }
						fontSize = { { value: titleFontSize, label: "titleFontSize" } }
						fontSizeMobile = { { value: titleFontSizeMobile, label: "titleFontSizeMobile" } }
						fontSizeTablet= { { value: titleFontSizeTablet, label: "titleFontSizeTablet" } }
						lineHeightType = { { value: titleLineHeightType, label: "titleLineHeightType" } }
						lineHeight = { { value: titleLineHeight, label: "titleLineHeight" } }
						lineHeightMobile = { { value: titleLineHeightMobile, label: "titleLineHeightMobile" } }
						lineHeightTablet= { { value: titleLineHeightTablet, label: "titleLineHeightTablet" } }
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Content" ) }</h2>
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
					<h2>{ __( "Price" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: priceLoadGoogleFonts, label: "priceLoadGoogleFonts" } }
						fontFamily = { { value: priceFontFamily, label: "priceFontFamily" } }
						fontWeight = { { value: priceFontWeight, label: "priceFontWeight" } }
						fontSubset = { { value: priceFontSubset, label: "priceFontSubset" } }
						fontSizeType = { { value: priceFontSizeType, label: "priceFontSizeType" } }
						fontSize = { { value: priceFontSize, label: "priceFontSize" } }
						fontSizeMobile = { { value: priceFontSizeMobile, label: "priceFontSizeMobile" } }
						fontSizeTablet= { { value: priceFontSizeTablet, label: "priceFontSizeTablet" } }
						lineHeightType = { { value: priceLineHeightType, label: "priceLineHeightType" } }
						lineHeight = { { value: priceLineHeight, label: "priceLineHeight" } }
						lineHeightMobile = { { value: priceLineHeightMobile, label: "priceLineHeightMobile" } }
						lineHeightTablet= { { value: priceLineHeightTablet, label: "priceLineHeightTablet" } }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( "Color Settings" ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: titleColor,
							onChange: ( colorValue ) => setAttributes( { titleColor: colorValue } ),
							label: __( "Title Color" ),
						},
						{
							value: descColor,
							onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
							label: __( "Content Color" ),
						},
						{
							value: priceColor,
							onChange: ( colorValue ) => setAttributes( { priceColor: colorValue } ),
							label: __( "Price Color" ),
						},
					] }
				>
				</PanelColorSettings>
			</Fragment>
		)
		const separatorSettings =(
			<PanelBody title={ __( "Separator" ) } initialOpen={ false }>
				<SelectControl
					label={ __( "Separator Style" ) }
					value={ seperatorStyle }
					onChange={ ( value ) => setAttributes( { seperatorStyle: value } ) }
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
				{ "none" != seperatorStyle &&
					<Fragment>
						<RangeControl
							label={ __( "Separator Width (%)" ) }
							value={ seperatorWidth }
							onChange={ ( value ) => setAttributes( { seperatorWidth: value } ) }
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __( "Separator Thickness" ) }
							value={ seperatorThickness }
							onChange={ ( value ) => setAttributes( { seperatorThickness: value } ) }
							min={ 0 }
							max={ 20 }
							allowReset
						/>
						<Fragment>
							<p className="uagb-setting-label">{ __( "Separator Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: seperatorColor }} ></span></span></p>
							<ColorPalette
								value={ seperatorColor }
								onChange={ ( colorValue ) => setAttributes( { seperatorColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					</Fragment>
				}
			</PanelBody>
		)

		// Image sizes.
		const imageSizeOptions = [
			{ value: "thumbnail", label: __( "Thumbnail" ) },
			{ value: "medium", label: __( "Medium" ) },
			{ value: "full", label: __( "Large" ) }
		]

		const imageControls = ( index ) => {
			let image_val = null
			if( rest_menu_item_arr[index] && typeof rest_menu_item_arr[index] !== "undefined"){
				image_val = rest_menu_item_arr[index]["image"]
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
								this.onSelectRestImage( media, index )
							} }
							allowedTypes= { [ "image" ] }
							value={ image_val }
							render={ ( { open } ) => (
								<Button isDefault onClick={ open }>
									{  this.getImageName( rest_menu_item_arr[index]["image"] ) }
								</Button>
							) }
						/>
						{ ( image_val && rest_menu_item_arr[index]["image"].url !== null && rest_menu_item_arr[index]["image"].url !=="" ) &&
							<Button className="uagb-rm-btn" key= { index} onClick={ (value) => {
								this.onRemoveRestImage(index)
							} } isLink isDestructive>
								{ __( "Remove Image" ) }
							</Button>
						}
					</BaseControl>
				</PanelBody>
			)
		}

		let cnt = 0
		rest_menu_item_arr.map( ( item, thisIndex ) => {
			let image_arr = rest_menu_item_arr[thisIndex]
			if( image_arr && typeof image_arr !== "undefined"){
	            const image = image_arr["image"]
	            if( typeof image !== "undefined" && image !== null && image !=="" ){
	            	cnt++
	            }
	        }
		} )

		// Margin Settings.
		const marginSettings = (
			<PanelBody	title={ __( "Spacing" ) } initialOpen={ false }	>
				<RangeControl
					label={ __( "Row Gap" ) }
					value={ rowGap }
					onChange={ ( value ) => setAttributes( { rowGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Column Gap" ) }
					value={ columnGap }
					onChange={ ( value ) => setAttributes( { columnGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Title Bottom Margin" ) }
					value={ titleSpace }
					onChange={ ( value ) => setAttributes( { titleSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Item Padding (px)" ) }</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ "uagb-margin-control" }
					value={ contentVrPadding }
					onChange={ ( value ) => setAttributes( { contentVrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ "uagb-margin-control" }
					value={ contentHrPadding }
					onChange={ ( value ) => setAttributes( { contentHrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				{  cnt > 0 && <Fragment>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Image Padding (px)" ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ "uagb-margin-control" }
						value={ imgVrPadding }
						onChange={ ( value ) => setAttributes( { imgVrPadding: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ "uagb-margin-control" }
						value={ imgHrPadding }
						onChange={ ( value ) => setAttributes( { imgHrPadding: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</Fragment>
				}

			</PanelBody>
		)

		const inspect_control = (
			<InspectorControls>
			 	<PanelBody	title={ __( "General" ) } initialOpen={ true }	>
			 		<RangeControl
						label={ __( "Number of Items" ) }
						value={ menu_item_count }
						onChange={ ( newCount ) => {
							let cloneTest_block = [ ...rest_menu_item_arr ]
							if ( cloneTest_block.length < newCount ) {
								const incAmount = Math.abs( newCount - cloneTest_block.length )

								{ times( incAmount, n => {

									cloneTest_block.push( {
										description: __("Lorem ipsum dolor sit amet, consectetur adipiscing elit.") ,
										title:__(" Menu Item"+ ( cloneTest_block.length + 1 ) ),
										price: __("$19"),
										image: "",
									} )
								} ) }
								setAttributes( { rest_menu_item_arr: cloneTest_block } )
							}else{
								const incAmount = Math.abs( newCount - cloneTest_block.length )
								let data_new = cloneTest_block
				            for( var i= 0; i < incAmount; i++ ){
				                data_new.pop()
				            }
				            setAttributes({rest_menu_item_arr:data_new})

							}
							setAttributes( { menu_item_count: newCount } )
						} }
						min={ 0 }
						max={ 20 }
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
											max={ Math.min( MAX_COLUMNS, menu_item_count ) }
										/>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ tcolumns }
											onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
											min={ 1 }
											max={ Math.min( MAX_COLUMNS, menu_item_count ) }
										/>
									)
								} else {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ columns }
											onChange={ ( value ) => setAttributes( { columns: value } ) }
											min={ 1 }
											max={ Math.min( MAX_COLUMNS, menu_item_count ) }
										/>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				</PanelBody>

				<PanelBody title={ __( "Image" ) }initialOpen={ false } >
					{ times( menu_item_count, n => imageControls( n ) ) }

					{  cnt > 0 && <Fragment>
						<hr className="uagb-editor__separator" />
						<SelectControl
							label={ __( "Image Position" ) }
							value={ imagePosition }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
							] }
						/>
						{ (imagePosition == "left" || imagePosition == "right") &&
						<Fragment>
							<SelectControl
								label={ __( "Vertical Alignment" ) }
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
								help={ __( "Note: Choose on what breakpoint the Images will stack." ) }
								onChange={ ( value ) => setAttributes( { stack: value } ) }
							/>
						</Fragment>
						}
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
				{ separatorSettings }
				{ TypographySettings }
				{ marginSettings }
			</InspectorControls>
		)

		return (
			<Fragment>
				{  ( (cnt == 0) || (cnt > 0 && imagePosition =="top" ) ) && <BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				}
				{inspect_control}
				<div className={ classnames(
					className,
					"uagb-rest_menu__outer-wrap",
					`uagb-block-${this.props.clientId.substr( 0, 8 )}`
				) }
				>

					{ rest_menu_item_arr.map( ( test, index ) =>

						<div className = { classnames(
							"uagb-rest_menu__wrap",
							...PositionClasses( attributes ),
						) } key ={ "wrap-"+index } >
							<div className = "uagb-rm__content" key ={ "tm_content-"+index }>
								{ (imagePosition == "top" || imagePosition == "left" ) && <RestMenuImage  attributes={attributes}  index_value = {index} /> }

								<div className ="uagb-rm__text-wrap">
									{
										<Fragment>
											<div className = "uagb-rm-details" key={"tm_wraps-"+index}>
												<div className = "uagb-rm__title-wrap" key={"rm_title__wraps-"+index}>
													<Title attributes={attributes} setAttributes = { setAttributes } props = { this.props } index_value = {index}/>
													<div className = "uagb-rest-menu-text-wrap" key={"text-wrap-"+index}>
														<Description attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = {index}/>
													</div>
												</div>
												<div className = "uagb-rm__price-wrap" key={"rm_price__wraps-"+index}>
													<Price attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = {index}/>
												</div>
											</div>
										</Fragment>
									}
								</div>
								{ ( imagePosition == "right" ) && <RestMenuImage  attributes={attributes}  index_value = {index} /> }
							</div>
							<div className="uagb-rm__separator-parent"><div className="uagb-rm__separator"></div></div>
						</div>
					)}
				</div>
				{ loadTitleGoogleFonts }
				{ loadDescGoogleFonts }
				{ loadPriceGoogleFonts }
			</Fragment>
		)
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-restaurant-menu-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = RestMenuStyle( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-restaurant-menu-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}
}

export default UAGBRestaurantMenu
