/**
 * BLOCK: How-To Schema
 */

// Import block dependencies and components.
import classnames from "classnames"
import SchemaNotices from "./schema-notices"
import times from "lodash/times"
import styling from "./styling"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"


//  Import CSS.
import "./style.scss"

import { __ } from '@wordpress/i18n';

const { compose } = wp.compose

const {
	createBlock
} = wp.blocks

const {
	AlignmentToolbar,
	BlockControls,
	MediaUpload,
	InspectorControls,
	RichText,
	ColorPalette,
	InnerBlocks
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
	ExternalLink
} = wp.components

const { select, withSelect } = wp.data;

const { Component, Fragment } = wp.element

const ALLOWED_BLOCKS = [ 'uagb/info-box' ];

let imageSizeOptions = [
	{ value: "thumbnail", label: __( "Thumbnail", 'ultimate-addons-for-gutenberg' ) },
	{ value: "medium", label: __( "Medium", 'ultimate-addons-for-gutenberg' ) },
	{ value: "full", label: __( "Large", 'ultimate-addons-for-gutenberg' ) }
]

class UAGBHowTo extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.getImageSize  	  = this.getImageSize.bind(this)
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes({ schema: JSON.stringify(this.props.schemaJsonData) });

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-how-to-schema-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate(prevProps, prevState) {

		if (
				JSON.stringify( this.props.schemaJsonData ) !==
				JSON.stringify( prevProps.schemaJsonData )
			) {
				this.props.setAttributes({
				schema: JSON.stringify(this.props.schemaJsonData)
			});
		}
		var element = document.getElementById( "uagb-how-to-schema-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	savematerials( value, index ) {
		const { attributes, setAttributes } = this.props
		const { materials } = attributes

		const newItems = materials.map( ( item, thisIndex ) => {
		if ( index === thisIndex ) {
			item = { ...item, ...value }
		}

		return item
		} )

		setAttributes( {
			materials: newItems,
		} )
	}

	savetools( value, index ) {
			const { attributes, setAttributes } = this.props
			const { tools } = attributes

		const newItems = tools.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value }
			}

			return item
		} )

			setAttributes( {
				tools: newItems,
			} )
		}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props
		setAttributes( { mainimage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { mainimage: null } )
			return
		}

		if ( ! media.type ) {
			return
		}

		setAttributes( { mainimage: media } )
		if ( media["sizes"] ) {
			var new_img = this.getImageSize(media["sizes"])
			imageSizeOptions = new_img
		}
	}

	getImageSize(sizes) {
		var size_arr = []
		$.each(sizes, function (index, item) {
		  var name = index
		  	var p = { "value" : name, "label": name }
		  	size_arr.push(p)
		})
		return(size_arr)
	}

	render() {

		// Setup the attributes
		const {
			className,
			attributes,
			setAttributes,
			insertBlocksAfter,
			mergeBlocks,
			onReplace,
			deviceType,
			attributes: {
				overallAlignment,
				currencyType,
				timeIn,
				showEstcost,
				showTotaltime,
				showMaterials,
				showTools,
				showTotaltimecolor,
				tools_count,
				material_count,
				toolsTitle,
				materialTitle,
				stepsTitle,
				tools,
				materials,
				timeNeeded,
				estCost,
				mainimage,
				imgSize,
				headingTitle,
				headingDesc,
				headingColor,
				subHeadingColor,
				headingTag,
				headFontFamily,
				headFontWeight,
				headFontSubset,
				headFontSizeType,
				headFontSize,
				headFontSizeMobile,
				headFontSizeTablet,
				headLineHeightType,
				headLineHeight,
				headLineHeightMobile,
				headLineHeightTablet,
				subHeadFontFamily,
				subHeadFontWeight,
				subHeadFontSubset,
				subHeadFontSize,
				subHeadFontSizeType,
				subHeadFontSizeMobile,
				subHeadFontSizeTablet,
				subHeadLineHeight,
				subHeadLineHeightType,
				subHeadLineHeightMobile,
				subHeadLineHeightTablet,
				headLoadGoogleFonts,
				subHeadLoadGoogleFonts,
				//Total time.
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
				time,
				cost,
				timeSpace,
				costSpace,
				row_gap,
				step_gap,
				timeInMins,
				timeInHours,
				timeInDays,
				timeInMonths,
				timeInYears,
			},
		} = this.props
		
		if( mainimage && mainimage["sizes"] ){
			imageSizeOptions = this.getImageSize(mainimage["sizes"])
		}
		
		let loadHeadingGoogleFonts;
		let loadSubHeadingGoogleFonts;
		let loadPriceGoogleFonts;
		
		
		if( true === headLoadGoogleFonts ) {
			
			const hconfig = {
				google: {
					families: [ headFontFamily + ( headFontWeight ? ':' + headFontWeight : '' ) ],
				},
			};
			
			loadHeadingGoogleFonts = (
				<WebfontLoader config={ hconfig }>
				</WebfontLoader>
			)
		}
		
		if( true === subHeadLoadGoogleFonts ) {
			
			const sconfig = {
				google: {
					families: [ subHeadFontFamily + ( subHeadFontWeight ? ':' + subHeadFontWeight : '' ) ],
				},
			};
			
			loadSubHeadingGoogleFonts = (
				<WebfontLoader config={ sconfig }>
				</WebfontLoader>
			)
		}	
		
		if( true === priceLoadGoogleFonts ){
			const pconfig = {
				google: {
					families: [ priceFontFamily + ( priceFontWeight ? ':' + priceFontWeight : '' ) ],
				},
			};
			
			loadPriceGoogleFonts = (
				<WebfontLoader config={ pconfig }>
				</WebfontLoader>
			)
		}
		
		let url_chk = ''
		let title = ''
		if( "undefined" !== typeof attributes.mainimage  && null !== attributes.mainimage && "" !== attributes.mainimage ){
			url_chk = attributes.mainimage.url
			title = attributes.mainimage.title
		}
		
		let url = ''
		if( '' !== url_chk ){
			let size = attributes.mainimage.sizes
			let imageSize = attributes.imgSize
			
			if ( "undefined" !== typeof size && "undefined" !== typeof size[imageSize] ) {
				url = size[imageSize].url 
			}else{
				url = url_chk 
			}
		}
		
		let image_icon_html = ''
		
		if ( mainimage && mainimage.url ) {
			
			image_icon_html = <img className="uagb-howto__source-image" src={url} title={title} width="640" height="360"/>
			
		}

		var minsValue = (timeInMins) ? timeInMins : time;
		
		const getInfoBoxAsChild = [
			[ 'uagb/info-box', 
			{
					infoBoxTitle:"Step 1",
					iconimgPosition:"left",
					source_type:"image",
					showPrefix:false,
					seperatorStyle:"none",
					ctaType:"all",
					headingTag: "h4"
				}
			],
			[ 'uagb/info-box', 
				{
					infoBoxTitle:"Step 2",
					iconimgPosition:"left",
					source_type:"image",
					showPrefix:false,
					seperatorStyle:"none",
					ctaType:"all",
					headingTag: "h4"
				}
			],
			[ 'uagb/info-box', 
				{
					infoBoxTitle:"Step 3",
					iconimgPosition:"left",
					source_type:"image",
					showPrefix:false,
					seperatorStyle:"none",
					ctaType:"all",
					headingTag: "h4"
				}
			]
		];

		const howtoGeneralSettings = () => {

			return (
				<PanelBody title={ __( "General", 'ultimate-addons-for-gutenberg' ) } initialOpen={ true } >
							<h2>{ __( "Image", 'ultimate-addons-for-gutenberg' ) }</h2>
							<MediaUpload
								title={ __( "Select Image", 'ultimate-addons-for-gutenberg' ) }
								onSelect={ ( value ) => setAttributes( { mainimage: value } ) }
								allowedTypes={ [ "image" ] }
								value={ mainimage }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ ! mainimage.url ? __( "Select Image", 'ultimate-addons-for-gutenberg' ) : __( "Replace image", 'ultimate-addons-for-gutenberg' ) }
									</Button>
								) }
							/>
							{ mainimage.url &&
								<Button
									className="uagb-rm-btn"
									onClick={ () => setAttributes( { mainimage: '' } ) }
									isLink isDestructive>
									{ __( "Remove Image", 'ultimate-addons-for-gutenberg' ) }
								</Button>
							}
							{ mainimage.url &&
								<SelectControl
									label={ __( "Size", 'ultimate-addons-for-gutenberg' ) }
									options={ imageSizeOptions }
									value={ imgSize }
									onChange={ ( value ) => setAttributes( { imgSize: value } ) }
								/>
							}
				<h2>{ __( "Primary Heading", 'ultimate-addons-for-gutenberg' ) }</h2>
					<SelectControl
						label={ __( "Tag" ) }
						value={ headingTag }
						onChange={ ( value ) => setAttributes( { headingTag: value } ) }
						options={ [
							{ value: "h1", label: __( "H1", 'ultimate-addons-for-gutenberg' ) },
							{ value: "h2", label: __( "H2", 'ultimate-addons-for-gutenberg' ) },
							{ value: "h3", label: __( "H3", 'ultimate-addons-for-gutenberg' ) },
							{ value: "h4", label: __( "H4", 'ultimate-addons-for-gutenberg' ) },
							{ value: "h5", label: __( "H5", 'ultimate-addons-for-gutenberg' ) },
							{ value: "h6", label: __( "H6", 'ultimate-addons-for-gutenberg' ) },
						] }
				/>
				<hr className="uagb-editor__separator" />
				<ToggleControl
					label={ __( "Show Total Time", 'ultimate-addons-for-gutenberg' ) }
					checked={ showTotaltime }
					onChange={ ( value ) => setAttributes( { showTotaltime: ! showTotaltime } ) }
					help={ __( "Note: Time is recommended field for schema. It should be ON", 'ultimate-addons-for-gutenberg' ) }
				/>
				{ showTotaltime &&(
					<PanelBody title={ __( "Time", 'ultimate-addons-for-gutenberg' ) } initialOpen={ true } className="uagb-editor-howto-timepanel">
					<Fragment>
						<RangeControl
							label={ __( "Years", 'ultimate-addons-for-gutenberg' ) }
							value={ timeInYears }
							onChange={ ( value ) => setAttributes( { timeInYears: value } ) }
							min={ 1 }
							max={ 10 }
							allowReset
						/>
						<RangeControl
							label={ __( "Months", 'ultimate-addons-for-gutenberg' ) }
							value={ timeInMonths }
							onChange={ ( value ) => setAttributes( { timeInMonths: value } ) }
							min={ 1 }
							max={ 12 }
							allowReset
						/>						
						<RangeControl
							label={ __( "Days", 'ultimate-addons-for-gutenberg' ) }
							value={ timeInDays }
							onChange={ ( value ) => setAttributes( { timeInDays: value } ) }
							min={ 1 }
							max={ 31 }
							allowReset
						/>
						<RangeControl
							label={ __( "Hours", 'ultimate-addons-for-gutenberg' ) }
							value={ timeInHours }
							onChange={ ( value ) => setAttributes( { timeInHours: value } ) }
							min={ 1 }
							max={ 24 }
							allowReset
						/>
						<RangeControl
							label={ __( "Minutes", 'ultimate-addons-for-gutenberg' ) }
							value={ minsValue }
							onChange={ ( value ) => setAttributes( { timeInMins: value } ) }
							min={ 1 }
							max={ 60 }
							allowReset
						/>
					</Fragment>
					</PanelBody>
				)}
				<hr className="uagb-editor__separator" />
				<ToggleControl
					label={ __( "Show Estimated Cost", 'ultimate-addons-for-gutenberg' ) }
					checked={ showEstcost }
					onChange={ ( value ) => setAttributes( { showEstcost: ! showEstcost } ) }
					help={ __( "Note: Cost is recommended field for schema.It should be ON", 'ultimate-addons-for-gutenberg' ) }
				/>
				<ExternalLink href={ 'https://en.wikipedia.org/wiki/List_of_circulating_currencies' }>
					{ __( 'Click here to find your countrys ISO code.', 'ultimate-addons-for-gutenberg' ) }
				</ExternalLink>
				<hr className="uagb-editor__separator" />
				<ToggleControl
					label={ __( "Show Tools", 'ultimate-addons-for-gutenberg' ) }
					checked={ showTools }
					onChange={ ( value ) => setAttributes( { showTools: ! showTools } ) }
					help={ __( "Note: This is recommended field for schema.It should be ON", 'ultimate-addons-for-gutenberg' ) }
				/>
				{ showTools &&
					<RangeControl
						label={ __( "Number of Tools", 'ultimate-addons-for-gutenberg' ) }
						value={ tools_count }
						onChange={ newCount => {

							let cloneIcons = [ ...tools ]

							if ( cloneIcons.length < newCount ) {

								const incAmount = Math.abs( newCount - cloneIcons.length )

								{ times( incAmount, n => {

									cloneIcons.push( {
										"add_required_tools": "- A Computer" + ( cloneIcons.length + 1 ),
									} )

								} ) }

								setAttributes( { tools: cloneIcons } )
							}else{
								const incAmount = Math.abs( newCount - cloneIcons.length )
								let data_new = cloneIcons
				            for( var i= 0; i < incAmount; i++ ){
				                data_new.pop()
				            }
				            setAttributes({tools:data_new})

							}
							setAttributes( { tools_count: newCount } )
						} }
						min={ 1 }
						max={ 50 }
					/>
					}
				<hr className="uagb-editor__separator" />
				<ToggleControl
					label={ __( "Show Materials", 'ultimate-addons-for-gutenberg' ) }
					checked={ showMaterials }
					onChange={ ( value ) => setAttributes( { showMaterials: ! showMaterials } ) }
					help={ __( "Note: This is recommended field for schema.It should be ON", 'ultimate-addons-for-gutenberg' ) }
				/>
				{ showMaterials &&
					<RangeControl
						label={ __( "Number of Materials", 'ultimate-addons-for-gutenberg' ) }
						value={ material_count }
						onChange={ newCount => {

							let cloneIcons = [ ...materials ]

							if ( cloneIcons.length < newCount ) {

								const incAmount = Math.abs( newCount - cloneIcons.length )

								{ times( incAmount, n => {

									cloneIcons.push( {
										"add_required_materials": "- A WordPress Website" + ( cloneIcons.length + 1 ),
									} )
								} ) }

								setAttributes( { materials: cloneIcons } )
							}else{
								const incAmount = Math.abs( newCount - cloneIcons.length )
								let data_new = cloneIcons
				            for( var i= 0; i < incAmount; i++ ){
				                data_new.pop()
				            }
				            setAttributes({materials:data_new})

							}
							setAttributes( { material_count: newCount } )
						} }
						min={ 1 }
						max={ 50 }
					/>
				}			
				</PanelBody>
			)
		}

		const howtoStyleSettings = () => {

			return (
				<PanelBody title={ __( "Style", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
				<h2>{ __( "Colors" ) }</h2>
				<p className="uagb-setting-label">{ __( "Heading", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: headingColor }} ></span></span></p>
				<ColorPalette
					value={ headingColor }
					onChange={ ( value ) => setAttributes( { headingColor: value } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Secondary Heading", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: showTotaltimecolor }} ></span></span></p>
				<ColorPalette
					value={ showTotaltimecolor }
					onChange={ ( value ) => setAttributes( { showTotaltimecolor: value } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Description", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: subHeadingColor }} ></span></span></p>
					<ColorPalette
						value={ subHeadingColor }
						onChange={ ( value ) => setAttributes( { subHeadingColor: value } ) }
						allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Typography", 'ultimate-addons-for-gutenberg' ) }</h2>
					<TypographyControl
						label={ __( "Heading", 'ultimate-addons-for-gutenberg' ) }
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
					<TypographyControl
						label={ __( "Secondary Heading", 'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: priceLoadGoogleFonts, label: 'priceLoadGoogleFonts' } }
						fontFamily = { { value: priceFontFamily, label: 'priceFontFamily' } }
						fontWeight = { { value: priceFontWeight, label: 'priceFontWeight' } }
						fontSubset = { { value: priceFontSubset, label: 'priceFontSubset' } }
						fontSizeType = { { value: priceFontSizeType, label: 'priceFontSizeType' } }
						fontSize = { { value: priceFontSize, label: 'priceFontSize' } }
						fontSizeMobile = { { value: priceFontSizeMobile, label: 'priceFontSizeMobile' } }
						fontSizeTablet= { { value: priceFontSizeTablet, label: 'priceFontSizeTablet' } }
						lineHeightType = { { value: priceLineHeightType, label: 'priceLineHeightType' } }
						lineHeight = { { value: priceLineHeight, label: 'priceLineHeight' } }
						lineHeightMobile = { { value: priceLineHeightMobile, label: 'priceLineHeightMobile' } }
						lineHeightTablet= { { value: priceLineHeightTablet, label: 'priceLineHeightTablet' } }
					/>	
					<TypographyControl
						label={ __( "Description", 'ultimate-addons-for-gutenberg' ) }
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
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Spacing", 'ultimate-addons-for-gutenberg' ) }</h2>
				{ showTotaltime &&
					<RangeControl
						label={ __( "Time Margin", 'ultimate-addons-for-gutenberg' ) }
						value={ timeSpace }
						onChange={ ( value ) => setAttributes( { timeSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				}
				{ showEstcost &&
					<RangeControl
						label={ __( "Cost Margin", 'ultimate-addons-for-gutenberg' ) }
						value={ costSpace }
						onChange={ ( value ) => setAttributes( { costSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				}
				<RangeControl
					label={ __( "Row Gap", 'ultimate-addons-for-gutenberg' ) }
					value={ row_gap }
					onChange={ ( value ) => setAttributes( { row_gap: value } ) }
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ __( "Gap Between Steps", 'ultimate-addons-for-gutenberg' ) }
					value={ step_gap }
					onChange={ ( value ) => setAttributes( { step_gap: value } ) }
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				</PanelBody>
			)
		}

		//Time Labels
		var yearlabel = (timeInYears > 1) ? __( "Years", 'ultimate-addons-for-gutenberg' ) : __( "Year", 'ultimate-addons-for-gutenberg' );
		var monthlabel = (timeInMonths > 1) ? __(" Months " , 'ultimate-addons-for-gutenberg') : __(" Month " , 'ultimate-addons-for-gutenberg');
		var daylabel = (timeInDays > 1) ? __(" Days ", 'ultimate-addons-for-gutenberg') :__( " Day ", 'ultimate-addons-for-gutenberg');
		var hourlabel = (timeInHours > 1) ? __("Hours ", 'ultimate-addons-for-gutenberg') :__( " Hour ", 'ultimate-addons-for-gutenberg');
		var minslabel = (minsValue > 1) ? __(" Minutes ", 'ultimate-addons-for-gutenberg') : __(" Minute ", 'ultimate-addons-for-gutenberg');		



		return (
			<Fragment>
				<SchemaNotices
					headingTitle = { headingTitle }
					headingDesc = { headingDesc }
					mainimage = { mainimage }
					showTotaltime = { showTotaltime }
					timeNeeded = { timeNeeded }					
					minsValue = {minsValue}
					timeInHours = {timeInHours}
					timeInDays = {timeInDays}
					timeInMonths = {timeInMonths}
					timeInYears = {timeInYears}
					showEstcost = { showEstcost }
					estCost = { estCost }
					cost = { cost }
					currencyType = { currencyType }
					tools = { tools }
					materials = { materials }
					clientId = { this.props.clientId }
				/>
				<BlockControls key='index'>
					<AlignmentToolbar
						value={ overallAlignment }
						onChange={ ( value ) => setAttributes( { overallAlignment: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					{ howtoGeneralSettings() }
					{ howtoStyleSettings() }				
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
						`uagb-block-${this.props.clientId.substr( 0, 8 )}`,					
					) }
				>
				<div className="uagb-how-to-main-wrap">
					<RichText
						tagName={ headingTag }
						placeholder={ __( "How to configure HowTo Schema in UAG?", 'ultimate-addons-for-gutenberg' ) }
						value={ headingTitle }
						className='uagb-howto-heading-text'
						multiline={ false }
						onChange={ ( value ) => {
							setAttributes( { headingTitle: value } ) }
						}
						onMerge={ mergeBlocks }
						onSplit={
							insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } )
									insertBlocksAfter( [
										...blocks,
										createBlock( "core/paragraph", { content: after } ),
									] )
								} :
								undefined
						}
						onRemove={ () => onReplace( [] ) }
					/>
					<RichText
						tagName="p"
						placeholder={ __( "So to get started, you will just need to drag-n-drop the How-to Schema block in the Gutenberg editor. The How-to Schema block can be used on pages which contain a How-to in their title and describe steps to achieve certain requirements.", 'ultimate-addons-for-gutenberg' ) }
						value={ headingDesc }
						className='uagb-howto-desc-text'
						onChange={ ( value ) => setAttributes( { headingDesc: value } ) }
						onMerge={ mergeBlocks }
						onSplit={ this.splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
					<div className="uagb-howto__source-wrap">{image_icon_html}</div>
					<span className="uagb-howto__time-wrap">
					{ showTotaltime &&
						<RichText
							tagName="h4"
							placeholder={ __( "Total Time Needed ( Minutes ):", 'ultimate-addons-for-gutenberg' ) }
							value={ timeNeeded }
							className='uagb-howto-timeNeeded-text'
							onChange={ ( value ) => setAttributes( { timeNeeded: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
					}
					{showTotaltime && (
						<Fragment>
							
							{timeInYears && ( <Fragment><p className='uagb-howto-timeNeeded-value'> {timeInYears}</p><p className='uagb-howto-timeINmin-text'>  {yearlabel}</p></Fragment> )}							
							{timeInMonths && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{timeInMonths}</p><p className='uagb-howto-timeINmin-text'>{monthlabel}</p></Fragment> )}							
							{timeInDays && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{timeInDays}</p><p className='uagb-howto-timeINmin-text'>{daylabel}</p></Fragment> )}							
							{timeInHours && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{timeInHours}</p><p className='uagb-howto-timeINmin-text'>{hourlabel}</p></Fragment> )}							
							{minsValue && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{minsValue}</p><p className='uagb-howto-timeINmin-text'>{minslabel}</p></Fragment> )}	
							
						</Fragment>
					)}					
					</span>
					<span className="uagb-howto__cost-wrap">
					{ showEstcost &&
						<RichText
							tagName="h4"
							placeholder={ __( "Total Cost:", 'ultimate-addons-for-gutenberg' ) }
							value={ estCost }
							className='uagb-howto-estcost-text'
							onChange={ ( value ) => setAttributes( { estCost: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
					}
					{ showEstcost &&
						<RichText
							tagName="p"
							placeholder={ __( "30", 'ultimate-addons-for-gutenberg' ) }
							value={ cost }
							className='uagb-howto-estcost-value'
							onChange={ ( value ) => setAttributes( { cost: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
					}
					{ showEstcost &&
						<RichText
							tagName="p"
							placeholder={ __( "USD", 'ultimate-addons-for-gutenberg' ) }
							value={ currencyType }
							className='uagb-howto-estcost-type'
							onChange={ ( value ) => setAttributes( { currencyType: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
					}
					</span>
					<div className="uagb-how-to-tools__wrap">
						{ showTools &&
						<RichText
							tagName="h4"
							placeholder={ __( "requirements tools:", 'ultimate-addons-for-gutenberg' ) }
							value={ toolsTitle }
							className='uagb-howto-req-tools-text'
							onChange={ ( value ) => setAttributes( { toolsTitle: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
						}
						{ showTools &&
						<div className="uagb-how-to-tools">
									{
									tools.map( ( tools, index ) => {

											return (
												<div
													className={ classnames(
														`uagb-how-to-tools-${index}`,
														"uagb-how-to-tools-child__wrapper",
													) }
													key={ index }
												>
													<div className="uagb-tools">
														<RichText
															tagName="div"
															placeholder={ __( "Requirements Tools:", 'ultimate-addons-for-gutenberg' ) }
															value={ tools.add_required_tools }
															onChange={ value => {
																		this.savetools( { add_required_tools: value }, index )
																	} }
															className='uagb-tools__label'
															placeholder={ __( "Description", 'ultimate-addons-for-gutenberg' ) }
															multiline={false}
															allowedFormats={[ 'core/bold', 'core/italic', 'core/strikethrough' ]}
														/>
													</div>
												</div>
											)
										})
									}
						</div>
						}
					<div className="uagb-how-to-materials__wrap">
					{ showMaterials &&
						<RichText
							tagName="h4"
							placeholder={ __( "requirements materials:", 'ultimate-addons-for-gutenberg' ) }
							value={ materialTitle }
							className='uagb-howto-req-materials-text'
							onChange={ ( value ) => setAttributes( { materialTitle: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
					}
					</div>
					{ showMaterials &&
					<div className="uagb-how-to-materials">
						{
						materials.map( ( materials, index ) => {

								return (
									<div
										className={ classnames(
											`uagb-how-to-materials-${index}`,
											"uagb-how-to-materials-child__wrapper",
										) }
										key={index}
									>
										<div className="uagb-materials">
											<RichText
												tagName="div"
												placeholder={ __( "Requirements Materials:", 'ultimate-addons-for-gutenberg' ) }
												value={ materials.add_required_materials }
												onChange={ value => {
															this.savematerials( { add_required_materials: value }, index )
														} }
												className='uagb-materials__label'
												placeholder={ __( "Description", 'ultimate-addons-for-gutenberg' ) }
												multiline={false}
												allowedFormats={[ 'core/bold', 'core/italic', 'core/strikethrough' ]}
											/>
										</div>
									</div>
								)
						})
					}
					</div>
					}
					</div>
					<div className="uagb-how-to-steps__wrap">
						<RichText
							tagName="h4"
							placeholder={ __( "requirements Steps:", 'ultimate-addons-for-gutenberg' ) }
							value={ stepsTitle }
							className='uagb-howto-req-steps-text'
							onChange={ ( value ) => setAttributes( { stepsTitle: value } ) }
							onMerge={ mergeBlocks }
							onSplit={ this.splitBlock }
							onRemove={ () => onReplace( [] ) }
						/>
						<div className="uagb-howto-steps__wrap">
							<InnerBlocks
								template={ getInfoBoxAsChild }
								allowedBlocks={ ALLOWED_BLOCKS }
							/>
						</div>	
					</div>
				</div>	
				</div>				
				{ loadHeadingGoogleFonts }
				{ loadSubHeadingGoogleFonts }
				{ loadPriceGoogleFonts }
			</Fragment>
		)
	}
}

export default compose(
	withSelect( ( select, ownProps ) => {

		const { __experimentalGetPreviewDeviceType = null } = select( 'core/edit-post' );
	let deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

		let url_chk = ''
		let title = ''
		if( "undefined" !== ownProps.attributes.mainimage  && null !== ownProps.attributes.mainimage && "" !== ownProps.attributes.mainimage ){
			url_chk = ownProps.attributes.mainimage.url
			title = ownProps.attributes.mainimage.title
		}

			var tools_data = {}
			var materials_data = {}
			var steps_data = {}
			var json_data = {
				"@context": "https://schema.org",
				"@type": "HowTo",
				"name": ownProps.attributes.headingTitle,
				"description": ownProps.attributes.headingDesc,
				"image": {
						"@type": "ImageObject",
						"url": url_chk,
						"height": "406",
						"width": "305"
					},
				"totalTime": "",
				"estimatedCost": [],
				"tool": [],
				"supply": [],
				"step": []
			}
			
			var y  = ( ownProps.attributes.timeInYears ) ? ( ownProps.attributes.timeInYears ) : 0;
			var m  = ( ownProps.attributes.timeInMonths ) ? ( ownProps.attributes.timeInMonths  ) : 0;
			var d  = ( ownProps.attributes.timeInDays ) ? (  ownProps.attributes.timeInDays ) : 0;
			var h  = ( ownProps.attributes.timeInHours ) ? ( ownProps.attributes.timeInHours ) : 0;

			var minutes = (ownProps.attributes.timeInMins) ? ownProps.attributes.timeInMins : ownProps.attributes.time;

			if ( ownProps.attributes.showTotaltime ) {
				json_data.totalTime = "P"+y+"Y"+m+"M"+d+"DT"+h+"H"+minutes+"M";
			}

			if ( ownProps.attributes.showEstcost ) {
				json_data.estimatedCost = {
					"@type": "MonetaryAmount",
					"currency":ownProps.attributes.currencyType,
					"value":ownProps.attributes.cost,
				};
			}

			if ( ownProps.attributes.showTools ) {
				ownProps.attributes.tools.forEach((tools, key) => {
					tools_data = {	
							"@type": "HowToTool",
							"name": tools.add_required_tools
					}
					json_data["tool"][key] = tools_data;
				});
			}
			
			if ( ownProps.attributes.showMaterials ) {
				ownProps.attributes.materials.forEach((materials, key) => {
					materials_data = {	
							"@type": "HowToSupply",
							"name": materials.add_required_materials
					}
					json_data["supply"][key] = materials_data;
				});
			}

			let getChildBlocks = select('core/block-editor').getBlocks( ownProps.clientId );

			getChildBlocks.forEach((steps, key) => {
				steps_data = {	
						"@type": "HowToStep",
						"url": steps.attributes.ctaLink,
						"name": steps.attributes.infoBoxTitle,
						"text": steps.attributes.headingDesc,
						"image": steps.attributes.iconImage.url
				}
				json_data["step"][key] = steps_data;
			});	
			
		return {
			schemaJsonData: json_data,
			deviceType: deviceType,
		};
	} )
) ( UAGBHowTo )