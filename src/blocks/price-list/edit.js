/**
* BLOCK: Price List - Edit Class
*/


import classnames from "classnames"
import PositionClasses from "./classes"
import RestMenuStyle from "./inline-styles"
import times from "lodash/times"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import memoize from "memize"


// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n

const {
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	InnerBlocks
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	SelectControl,
	TabPanel,
	Dashicon,
	IconButton,
	ButtonGroup,
	Path,
	SVG
} = wp.components


const { select, withSelect } = wp.data;

const { Component, Fragment } = wp.element

const MAX_COLUMNS = 3

const ALLOWED_BLOCKS = [ "uagb/restaurant-menu-child" ]

class UAGBRestaurantMenu extends Component {
	
	constructor() {
		
		super( ...arguments )
		
		this.onRemoveImage 		= this.onRemoveImage.bind( this )
		this.onSelectImage 		= this.onSelectImage.bind( this )
		this.setcolumns			= this.setcolumns.bind( this )
		this.setheadingTag		= this.setheadingTag.bind( this )
		this.setimagePosition	= this.setimagePosition.bind( this )
		this.setimageSize		= this.setimageSize.bind( this )
		this.setimageAlignment	= this.setimageAlignment.bind( this )
		
	}
	
	setcolumns (value) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		
		getChildBlocks.forEach((pricelistChild, key) => {
			pricelistChild.attributes.columns = value
		});
		setAttributes( { columns: value } )
	}
	setheadingTag (value) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		
		getChildBlocks.forEach((pricelistChild, key) => {
			pricelistChild.attributes.headingTag = value
		});
		setAttributes( { headingTag: value } )
	}
	
	setimagePosition (value) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		
		getChildBlocks.forEach((pricelistChild, key) => {
			pricelistChild.attributes.imagePosition = value
		});
		setAttributes( { imagePosition: value } )
	}
	setimageSize (value) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		
		getChildBlocks.forEach((pricelistChild, key) => {
			pricelistChild.attributes.imageSize = value
		});
		setAttributes( { imageSize: value } )
	}
	
	setimageAlignment (value) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		
		getChildBlocks.forEach((pricelistChild, key) => {
			pricelistChild.attributes.imageAlignment = value
		});
		setAttributes( { imageAlignment: value } )
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
			titleSpace,
			imgHrPadding,
			imgVrPadding,
			columns,
			tcolumns,
			mcolumns,
			rowGap,
			columnGap,
			contentHrPadding,
			contentVrPadding,
			priceColor,
			descColor,
			titleColor,
			seperatorStyle,
			seperatorWidth,
			seperatorThickness,
			seperatorColor,
			priceLoadGoogleFonts,
			titleLoadGoogleFonts,
			descLoadGoogleFonts,
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
			headingTag,
			imagePosition,
			imageAlignment,
			imageSize,
			imageWidth,
			stack,
		} = attributes	
		
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
						<Fragment>
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
						
						</PanelBody>
						)
						// Image sizes.
						const imageSizeOptions = [
							{ value: "thumbnail", label: __( "Thumbnail" ) },
							{ value: "medium", label: __( "Medium" ) },
							{ value: "full", label: __( "Large" ) }
						]
						
						const alignTop = (
							<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<Path d="M9 20h6V9H9v11zM4 4v1.5h16V4H4z" />
							</SVG>
							);
							
							//Image Setting
							const imageSettings = (
								<Fragment>
								<h2><strong>Image Settings</strong></h2>						
								<h2> { __( "Image Position" ) }</h2>
								<ButtonGroup className="uagb-editor_imgpos_group">
								<IconButton
								key={ "left" }
								icon="editor-alignleft"
								label="Left"
								onClick={ () => this.setimagePosition("left") }
								aria-pressed = { "left" === imagePosition }
								isPrimary = { "left" === imagePosition }
								/>
								<IconButton
								key={ "top" }
								icon={alignTop}
								label="Top"
								onClick={ () => this.setimagePosition("top") }
								aria-pressed = { "top" === imagePosition }
								isPrimary = { "top" === imagePosition }
								/>
								<IconButton
								key={ "right" }
								icon="editor-alignright"
								label="Right"
								onClick={ () => this.setimagePosition("right") }
								aria-pressed = { "right" === imagePosition }
								isPrimary = { "right" === imagePosition }
								/>
								</ButtonGroup>
								
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
							onChange={this.setimageSize }
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
							
							)
							
							//Color settings
							const colorSettings = (
								<PanelColorSettings
								title={ __( "Color Settings" ) }
								initialOpen={ false }
								colorSettings={ [
									{
										value: titleColor,
										onChange:( ( value ) => setAttributes( { titleColor: value } ) ),
										label: __( "Title Color" ),
									},
									{
										value: descColor,
										onChange: (  ( value ) => setAttributes( { descColor: value } )  ),
										label: __( "Content Color" ),
									},
									{
										value: priceColor,
										onChange: (  ( value ) => setAttributes( { priceColor: value } )  ),
										label: __( "Price Color" ),
									},
								] }
								>
								</PanelColorSettings>
								)
								
								//seperator setting
								const separatorSettings =(
									<Fragment>
									<h2><strong>Separator Settings</strong></h2>
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
								</Fragment>
								)
								
								// Typography settings.
								const TypographySettings = (
									<Fragment>
									<PanelBody title={ __( "Typography" ) }  initialOpen={ false }>
									<h2>{ __( "Title" ) }</h2>
									<SelectControl
									label={ __( "Title Tag" ) }
									value={ headingTag }
									onChange={ this.setheadingTag }
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
									</Fragment>
									)
									
									
									
									const inspect_control = (
										<InspectorControls>
										<PanelBody	title={ __( "General" ) } initialOpen={ true }	>
										
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
																onChange={this.setcolumns }
																min={ 1 }
																max={ Math.min( MAX_COLUMNS, menu_item_count ) }
																/>
																)
															}
															
															return <div>{ tabout }</div>
														}
													}
													</TabPanel>
													<hr className="uagb-editor__separator" />
													{imageSettings}
													<hr className="uagb-editor__separator" />
													{separatorSettings}
													</PanelBody>

													{ marginSettings }
													{ colorSettings }
													{TypographySettings}
													</InspectorControls>
													)
													
													const getPriceListTemplate = memoize( ( menu_item_block, rest_menu_item_arr ) => {
														return times( menu_item_block, n => [ "uagb/restaurant-menu-child", rest_menu_item_arr[n] ] )
													} )
													
													return (
														<Fragment>
														{inspect_control}
														<div className={ classnames(
															className,
															"uagb-rest_menu__outer-wrap",
															`uagb-block-${this.props.clientId.substr( 0, 8 )}`,
															...PositionClasses( attributes ),
															) }
															>	
															<InnerBlocks
																template={ getPriceListTemplate( menu_item_count, rest_menu_item_arr ) }
																templateLock={ false }
																allowedBlocks={ ALLOWED_BLOCKS }
																__experimentalMoverDirection={ 'horizontal' }
															/>
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

															const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

															getChildBlocks.forEach((pricelistChild, key) => {
																pricelistChild.attributes.imagePosition = this.props.attributes.imagePosition;
																pricelistChild.attributes.columns = this.props.attributes.columns;
																pricelistChild.attributes.tcolumns = this.props.attributes.tcolumns;
																pricelistChild.attributes.mcolumns = this.props.attributes.mcolumns;
															});
														}
														
														componentDidMount() {
															
															// Assigning block_id in the attribute.
															this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
															
															this.props.setAttributes( { classMigrate: true } )
															this.props.setAttributes( { childMigrate: true } )
															
															
															// Pushing Style tag for this block css.
															const $style = document.createElement( "style" )
															$style.setAttribute( "id", "uagb-restaurant-menu-style-" + this.props.clientId.substr( 0, 8 ) )
															document.head.appendChild( $style )
														}
													}
													
													export default UAGBRestaurantMenu
													