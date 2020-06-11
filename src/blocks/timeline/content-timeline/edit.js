/**
 * BLOCK: Content Timeline.
 */

import classnames from "classnames"
import map from "lodash/map"
import times from "lodash/times"
import UAGBIcon from "../../../../dist/blocks/uagb-controls/UAGBIcon.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import contentTimelineStyle from ".././inline-styles"
import ContentTmClasses from ".././classes"
import AlignClass from ".././align-classes"
import DayAlignClass from ".././day-align-classes"
import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon"

// Import all of our Text Options requirements.
import TypographyControl from "../../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../../components/typography/fontloader"

const { dateI18n, __experimentalGetSettings } = wp.date

const { Component, Fragment } = wp.element

const { __ } = wp.i18n

const { decodeEntities } = wp.htmlEntities

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
	createBlock
} = wp.blocks

const {
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText,
	BlockAlignmentToolbar,
	PanelColorSettings,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	Placeholder,
	RangeControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	ButtonGroup,
	Button,
	TabPanel,
	Dashicon,
} = wp.components

let svg_icons = Object.keys( UAGBIcon )

class UAGBcontentTimeline extends Component {

	constructor() {
		super( ...arguments )

		this.splitBlock = this.splitBlock.bind( this )

		this.getTimelineicon = this.getTimelineicon.bind(this)

		this.toggleDisplayPostDate    = this.toggleDisplayPostDate.bind( this )
	}

	splitBlock( before, after, ...blocks ) {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = this.props

		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( "core/paragraph", { content: after } ) )
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks )
		}

		const { content } = attributes
		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] )
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } )
		}
	}
	/**
     * Function Name: toggleDisplayPostDate.
     */
	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { displayPostDate: ! displayPostDate } )
	}

	/**
     * [getTimelineicon description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
	getTimelineicon(value) {
		this.props.setAttributes( { icon: value } )
	}

	saveDate( value, index ) {
		const { attributes, setAttributes } = this.props
		const { t_date } = attributes

		const newItems = t_date.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value }
			}

			return item
		} )

		setAttributes( {
			t_date: newItems,
		} )
	}

	render() {

		// Setup the attributes.
		const {
			isSelected,
			className,
			setAttributes,
			insertBlocksAfter,
			mergeBlocks,
			onReplace,
			attributes: {
				tm_content,
				headingAlign,
				separatorHeight,
				headSpace,
				separatorSpace,
				headingColor,
				subHeadingColor,
				backgroundColor,
				separatorColor,
				separatorFillColor,
				separatorBg,
				separatorBorder,
				borderFocus,
				headingTag,
				headFontSizeType,
				headFontSize,
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
				timelineItem,
				timelinAlignment,
				arrowlinAlignment,
				subHeadFontSizeType,
				subHeadFontSize,
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
				verticalSpace,
				horizontalSpace,
				separatorwidth,
				borderwidth,
				connectorBgsize,
				dateBottomspace,
				align,
				icon,
				iconColor,
				dateColor,
				dateFontsizeType,
				dateFontsize,
				dateFontsizeTablet,
				dateFontsizeMobile,
				dateFontFamily,
				dateFontWeight,
				dateFontSubset,
				dateLineHeightType,
				dateLineHeight,
				dateLineHeightTablet,
				dateLineHeightMobile,
				dateLoadGoogleFonts,
				iconSize,
				borderRadius,
				bgPadding,
				block_id,
				iconFocus,
				iconBgFocus,
				t_date,
				displayPostDate,
				stack,
				dateFormat
			},
		} = this.props

		// Parameters for FontIconPicker
		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: this.getTimelineicon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon" )
		}

		const iconColorSettings = (
			<PanelColorSettings title={ __( "Color Settings" ) } initialOpen={ true }
				colorSettings={ [
					{
						value: separatorColor,
						onChange: ( colorValue ) => setAttributes( { separatorColor: colorValue } ),
						label: __( "Line Color" ),
					},
					{
						value: iconColor,
						onChange: ( colorValue ) => setAttributes( { iconColor: colorValue } ),
						label: __( "Icon Color" ),
					},
					{
						value: separatorBg,
						onChange: ( colorValue ) => setAttributes( { separatorBg: colorValue } ),
						label: __( "Background Color" ),
					},
					{
						value: separatorBorder,
						onChange: ( colorValue ) => setAttributes( { separatorBorder: colorValue } ),
						label: __( "Border Color" ),
					},
				] }
			>
			</PanelColorSettings>
		)

		const iconFocusSettings = (
			<PanelColorSettings	title={ __( "Color Settings" ) } initialOpen={ true }
				colorSettings={ [
					{
						value: separatorFillColor,
						onChange: ( colorValue ) => setAttributes( { separatorFillColor: colorValue } ),
						label: __( "Line Color" ),
					},
					{
						value: iconFocus,
						onChange: ( colorValue ) => setAttributes( { iconFocus: colorValue } ),
						label: __( "Icon Color" ),
					},
					{
						value: iconBgFocus,
						onChange: ( colorValue ) => setAttributes( { iconBgFocus: colorValue } ),
						label: __( "Background Color" ),
					},
					{
						value: borderFocus,
						onChange: ( colorValue ) => setAttributes( { borderFocus: colorValue } ),
						label: __( "Border Color" ),
					},
				] }
			>
			</PanelColorSettings>
		)

		const iconControls = (
			<PanelBody	title={ __( "Connector Color Settings" ) }	initialOpen={ true }>
				<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal" ),
							className: "uagb-normal-tab",
						},
						{
							name: "focus",
							title: __( "Focus" ),
							className: "uagb-focus-tab",
						},
					] }>
					{
						( tabName ) => {
							let tabout
							if( "focus" === tabName.name ) {
								tabout = iconFocusSettings
							}else {
								tabout = iconColorSettings
							}
							return <div>{ tabout }</div>
						}
					}
				</TabPanel>
			</PanelBody>
		)

		const renderDateSettings = ( index ) => {
			return (
				<Fragment key ={index}>
					<TextControl
						label= { __( "Date" ) + " " + ( index + 1 ) + " " + __( "Settings" ) }
						value= { t_date[ index ].title }
						onChange={ value => {
							this.saveDate( { title: value }, index )
						} }
					/>
				</Fragment>
			)
		}

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

		let loadHeadGoogleFonts
		let loadSubHeadGoogleFonts
		let loadDateGoogleFonts

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

		if( dateLoadGoogleFonts == true ) {

			const dateconfig = {
				google: {
					families: [ dateFontFamily + ( dateFontWeight ? ":" + dateFontWeight : "" ) ],
				},
			}

			loadDateGoogleFonts = (
				<WebfontLoader config={ dateconfig }>
				</WebfontLoader>
			)
		}

		var today = new Date()

		const renderSettings = (
			<PanelBody	title={ __( "Date Settings" ) }	initialOpen={ false } >
				<ToggleControl
					label={ __( "Display Post Date" ) }
					checked={ displayPostDate }
					onChange={ this.toggleDisplayPostDate }
				/>

				{displayPostDate && 
				<SelectControl
					label={ __( "Date Format" ) }
					value={ dateFormat }
					onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
					options={ [
						{ value: 'M j, Y' , label: dateI18n( 'M j, Y', today ) },
						{ value: 'F j, Y' , label: dateI18n( 'F j, Y', today ) },
						{ value: 'm/d/Y'  , label: dateI18n( 'm/d/Y', today ) },
						{ value: 'm-d-Y'  , label: dateI18n( 'm-d-Y', today ) },
						{ value: 'm.d.Y'  , label: dateI18n( 'm.d.Y', today ) },
						{ value: 'd M Y'  , label: dateI18n( 'd M Y', today ) },
						{ value: 'd F Y'  , label: dateI18n( 'd F Y', today ) },
						{ value: 'd-m-Y'  , label: dateI18n( 'd-m-Y', today ) },
						{ value: 'd.m.Y'  , label: dateI18n( 'd.m.Y', today ) },
						{ value: 'd/m/Y'  , label: dateI18n( 'd/m/Y', today ) },
						{ value: 'Y-m-d'  , label: dateI18n( 'Y-m-d', today ) },
						{ value: 'Y.m.d'  , label: dateI18n( 'Y.m.d', today ) },
						{ value: 'Y/m/d'  , label: dateI18n( 'Y/m/d', today ) },
						{ value: 'M, Y'   , label: dateI18n( 'M, Y', today ) },
						{ value: 'M Y'    , label: dateI18n( 'M Y', today ) },
						{ value: 'F, Y'   , label: dateI18n( 'F, Y', today ) },
						{ value: 'F Y'    , label: dateI18n( 'F Y', today ) },
						{ value: 'custom'    , label: __( 'Normal Text' ) },
					] }
				/>}

				{ displayPostDate && times( timelineItem, n => renderDateSettings( n ) ) }

				{ displayPostDate && ( timelinAlignment !=="center" ) && <RangeControl
					label={ __( "Date Bottom Spacing" ) }
					value={ dateBottomspace }
					onChange={ ( value ) => setAttributes( { dateBottomspace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				}

				{ displayPostDate &&  <Fragment>
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Date Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: dateColor }} ></span></span></p>
					<ColorPalette
						value={ dateColor }
						onChange={ ( colorValue ) => setAttributes( { dateColor: colorValue } ) }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Date Typography" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { this.props.attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: dateLoadGoogleFonts, label: 'dateLoadGoogleFonts' } }
						fontFamily = { { value: dateFontFamily, label: 'dateFontFamily' } }
						fontWeight = { { value: dateFontWeight, label: 'dateFontWeight' } }
						fontSubset = { { value: dateFontSubset, label: 'dateFontSubset' } }
						fontSizeType = { { value: dateFontsizeType, label: 'dateFontsizeType' } }
						fontSize = { { value: dateFontsize, label: 'dateFontsize' } }
						fontSizeMobile = { { value: dateFontsizeMobile, label: 'dateFontsizeMobile' } }
						fontSizeTablet= { { value: dateFontsizeTablet, label: 'dateFontsizeTablet' } }
						lineHeightType = { { value: dateLineHeightType, label: 'dateLineHeightType' } }
						lineHeight = { { value: dateLineHeight, label: 'dateLineHeight' } }
						lineHeightMobile = { { value: dateLineHeightMobile, label: 'dateLineHeightMobile' } }
						lineHeightTablet= { { value: dateLineHeightTablet, label: 'dateLineHeightTablet' } }
					/>
				</Fragment>
				}
			</PanelBody>
		)

		const content_control = (
			<InspectorControls>
				<PanelBody	title={ __( "General" ) }	initialOpen={ true } >
					<RangeControl
						label={ __( "Number of Items" ) }
						value={ timelineItem }
						onChange={ ( newCount ) => {

							let cloneDate = [ ...t_date ]
							let cloneContent = [ ...tm_content ]

							if ( cloneDate.length < newCount ) {

								const incAmount = Math.abs( newCount - cloneDate.length )

								// Save date.
								{ times( incAmount, n => {
									cloneDate.push( {
										title: cloneDate[ 0 ].title,
									} )
								} ) }

								setAttributes( { t_date: cloneDate } )

								//Save content
								{ times( incAmount, n => {
									cloneContent.push( {
										time_heading: __( "Timeline Heading " ) + ( cloneContent.length + 1 ),
										time_desc: cloneContent[ 0 ].time_desc,
									} )
								} ) }

								setAttributes( { tm_content: cloneContent } )

							}

							setAttributes( { timelineItem: newCount } )

						} }
						min={ 1 }
						max={ 100 }
						allowReset
					/>
				</PanelBody>

				{ renderSettings }

				<PanelBody	title={ __( "Layout" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Orientation" ) }
						value={ timelinAlignment }
						onChange={ ( value ) => setAttributes( { timelinAlignment: value } ) }
						options={ [
							{ value: "left", label: __( "Left" ) },
							{ value: "right", label: __( "Right" ) },
							{ value: "center", label: __( "Center" ) },
						] }
					/>
					<SelectControl
						label={ __( "Arrow Alignment" ) }
						value={ arrowlinAlignment }
						onChange={ ( value ) => setAttributes( { arrowlinAlignment: value } ) }
						options={ [
							{ value: "top", label: __( "Top" ) },
							{ value: "bottom", label: __( "Bottom" ) },
							{ value: "center", label: __( "Center" ) },
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
						help={ __( "Note: Choose on what breakpoint the Content Timeline will stack." ) }
						onChange={ ( value ) => setAttributes( { stack: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( "Spacing" ) } initialOpen={ false } >
					<RangeControl
						label={ __( "Horizontal Space" ) }
						value={ horizontalSpace }
						onChange={ ( value ) => setAttributes( { horizontalSpace: value } ) }
						min={ 1 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Vertical Space" ) }
						value={ verticalSpace }
						onChange={ ( value ) => setAttributes( { verticalSpace: value } ) }
						min={ 1 }
						max={ 100 }
						allowReset
					/>
					<RangeControl
						label={ __( "Heading Bottom Spacing" ) }
						value={ headSpace }
						onChange={ ( value ) => setAttributes( { headSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</PanelBody>
				<PanelBody title={ __( "Timeline Item" ) } initialOpen={ false } >
					<SelectControl
						label={ __( "Typography" ) }
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
					<RangeControl
						label={ __( "Rounded Corners" ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						initialPosition={10}
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Padding" ) }
						value={ bgPadding }
						onChange={ ( value ) => setAttributes( { bgPadding: value } ) }
						min={ 1 }
						initialPosition={10}
						max={ 50 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Heading" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { this.props.attributes }
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

					<hr className="uagb-editor__separator" />
					<h2>{ __( "Content" ) }</h2>
					<TypographyControl
						label={ __( "Content Tag" ) }
						attributes = { this.props.attributes }
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
				</PanelBody>
				<PanelBody title={ __( "Connector" ) } initialOpen={ false } >
					<FontIconPicker {...icon_props} />
					<RangeControl
						label={ __( "Icon Size" ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 0 }
						max={ 30 }
						allowReset
					/>
					<RangeControl
						label={ __( "Icon Background Size" ) }
						value={ connectorBgsize }
						onChange={ ( value ) => setAttributes( { connectorBgsize: value } ) }
						min={ 25 }
						max={ 90 }
						allowReset
					/>
					<RangeControl
						label={ __( "Border Width" ) }
						value={ borderwidth }
						onChange={ ( value ) => setAttributes( { borderwidth: value } ) }
						min={ 1 }
						max={ 10 }
						allowReset
					/>
					<RangeControl
						label={ __( "Connector Width" ) }
						value={ separatorwidth }
						onChange={ ( value ) => setAttributes( { separatorwidth: value } ) }
						min={ 1 }
						max={ 10 }
						allowReset
					/>
					{ iconControls }
				</PanelBody>
				<PanelColorSettings
					title={ __( "Color Settings" ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: headingColor,
							onChange: ( colorValue ) => setAttributes( { headingColor: colorValue } ),
							label: __( "Heading Color" ),
						},
						{
							value: subHeadingColor,
							onChange: ( colorValue ) => setAttributes( { subHeadingColor: colorValue } ),
							label: __( "Content Color" ),
						},
						{
							value: backgroundColor,
							onChange: ( colorValue ) => setAttributes( { backgroundColor: colorValue } ),
							label: __( "Background Color" ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		)

		return (
			<Fragment>
				{ content_control }
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "center", "left","right" ] }
					/>
				</BlockControls>
				<div  className={ classnames(
					className,
					"uagb-timeline__outer-wrap",
					`uagb-block-${ this.props.clientId }`
				) }>
					<div  className = { classnames(
						"uagb-timeline__content-wrap",
						...ContentTmClasses( this.props.attributes ),
					) }>
						<div className = "uagb-timeline-wrapper">
							<div className = "uagb-timeline__main">
								{ this.get_content() }
								<div className = "uagb-timeline__line" >
									<div className = "uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{ loadHeadGoogleFonts }
				{ loadSubHeadGoogleFonts }
				{ loadDateGoogleFonts }
			</Fragment>
		)
	}

	componentDidMount() {
		//Store client id.
		this.props.setAttributes( { block_id: this.props.clientId } )
		this.props.setAttributes( { classMigrate: true } )

		var id = this.props.clientId
		window.addEventListener("load", this.timelineContent_back(id))
		window.addEventListener("resize", this.timelineContent_back(id))
		var time = this
		$(".edit-post-layout__content").scroll( function(event) {
			time.timelineContent_back(id)
		})

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-content-timeline-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	componentDidUpdate(){
		var id = this.props.clientId
		window.addEventListener("load", this.timelineContent_back(id))
		window.addEventListener("resize", this.timelineContent_back(id))
		var time = this
		$(".edit-post-layout__content").scroll( function(event) {
			time.timelineContent_back(id)
		})
	}

	/* Render output at backend */
	get_content(){
		const { attributes, setAttributes, mergeBlocks, insertBlocksAfter, onReplace } = this.props

		const{
			headingTag,
			timelinAlignment,
			displayPostDate,
			icon,
			tm_content,
			t_date,
			timelineItem,
			dateFormat
		} = attributes

		// Add CSS.
		var element = document.getElementById( "uagb-content-timeline-style-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = contentTimelineStyle( this.props )
		}

		const hasItems = Array.isArray( tm_content ) && tm_content.length
		const hasDate = Array.isArray( t_date ) && t_date.length

		if ( ! hasItems ) {

			return (
				<Fragment>
					<Placeholder
						icon="admin-post"
						label={ __( "UAGB Content Timeline" ) }
					>
						{ ! Array.isArray( tm_content ) ?
							<Spinner /> :
							__( "No content found." )
						}
					</Placeholder>
				</Fragment>
			)

		} else {

			var content_align_class = AlignClass( this.props.attributes, 0 ) // Get classname for layout alignment
			var day_align_class     = DayAlignClass( this.props.attributes, 0 ) // Get classname for day alignment.
			let data_copy           = [ ...tm_content ]
			var display_inner_date  = false

			return (
				<div className = "uagb-timeline__days">
					{
						tm_content.map( ( post, index ) => {

							if ( timelineItem <= index ) {
								return
							}

							var second_index = "uagb-"+index
							if(timelinAlignment == "center"){
								display_inner_date = true
								content_align_class = AlignClass( this.props.attributes, index )
								day_align_class = DayAlignClass( this.props.attributes, index )
							}
							const Tag = this.props.attributes.headingTag
							var icon_class = "uagb-timeline__icon-new uagb-timeline__out-view-icon "
							var post_date = t_date[index].title
							if ( 'custom' != dateFormat ) {

								post_date = dateI18n( dateFormat, t_date[index].title )
								if( post_date === "Invalid date" ){
									post_date = t_date[index].title
								}
							}
							return (
								<article className = "uagb-timeline__field uagb-timeline__field-wrap"  key={index}>
									<div className = {content_align_class}>

										<div className = "uagb-timeline__marker uagb-timeline__out-view-icon">
											<span className = {icon_class}>{ renderSVG(icon) }</span>
										</div>

										<div className = {day_align_class} >
											<div className="uagb-timeline__events-new">
												<div className="uagb-timeline__events-inner-new">
													<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
														{ displayPostDate && t_date[index].title &&
                                                            <div className={ "uagb-timeline__inner-date-new" }>
                                                            	{ post_date }
                                                            </div>
														}
													</div>

													<div className="uagb-content">

														<div className="uagb-timeline__heading-text">
															<RichText
																tagName={ headingTag }
																value={ post.time_heading }
																placeholder={ __( "Write a Heading" ) }
																className='uagb-timeline__heading'
																onChange={ ( value ) => {
																	var p = { "time_heading" : value,"time_desc":data_copy[index]["time_desc"] }
																	data_copy[index] = p
																	setAttributes( { "tm_content": data_copy } )
																} }
																onMerge={ mergeBlocks }
																unstableOnSplit={
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
														</div>

														<RichText
															tagName= "p"
															value={ post.time_desc }
															placeholder={ __( "Write a Description" ) }
															className='uagb-timeline-desc-content'
															onChange={ ( value ) => {
																var p = { "time_heading" : data_copy[index]["time_heading"],"time_desc":value }
																data_copy[index] = p
																setAttributes( { "tm_content": data_copy } )
															} }
															onMerge={ mergeBlocks }
															unstableOnSplit={ this.splitBlock }
															onRemove={ () => onReplace( [] ) }
														/>

														<div className="uagb-timeline__arrow"></div>

													</div>

												</div>
											</div>
										</div>

										{ display_inner_date && <div className = "uagb-timeline__date-new">
											{ displayPostDate && t_date[index].title &&
                                                <div className={ "uagb-timeline__date-new" }>
                                                	{ post_date }
                                                </div>
											}
										</div>
										}
									</div>
								</article>
							)

						})
					}
				</div>
			)
		}
	}

	/*  Js for timeline line and inner line filler*/
	timelineContent_back(id){
		var timeline            = $(".uagb-timeline").parents("#block-"+id)
		var tm_item             = timeline.find(".uagb-timeline")
		var line_inner          = timeline.find(".uagb-timeline__line__inner")
		var line_outer          = timeline.find(".uagb-timeline__line")
		var $icon_class         = timeline.find(".uagb-timeline__marker")
		if( $icon_class.length > 0){
			var $card_last          = timeline.find(".uagb-timeline__field:last-child")
			var timeline_start_icon = $icon_class.first().position()
			var timeline_end_icon   = $icon_class.last().position()
			line_outer.css("top", timeline_start_icon.top )

			var timeline_card_height = $card_last.height()
			var last_item_top = $card_last.offset().top - tm_item.offset().top
			var $last_item, parent_top
			var $document = $(document)

			if( tm_item.hasClass("uagb-timeline__arrow-center")) {

				line_outer.css("bottom", timeline_end_icon.top )

				parent_top = last_item_top - timeline_start_icon.top
				$last_item = parent_top + timeline_end_icon.top

			} else if( tm_item.hasClass("uagb-timeline__arrow-top")) {

				var top_height = timeline_card_height - timeline_end_icon.top
				line_outer.css("bottom", top_height )

				$last_item = last_item_top

			} else if( tm_item.hasClass("uagb-timeline__arrow-bottom")) {

				var bottom_height = timeline_card_height - timeline_end_icon.top
				line_outer.css("bottom", bottom_height )

				parent_top = last_item_top - timeline_start_icon.top
				$last_item = parent_top + timeline_end_icon.top
			}

			var num = 0
			var elementEnd = $last_item + 20

			var connectorHeight = 3 * timeline.find(".uagb-timeline__marker:first").height()
			var viewportHeight = document.documentElement.clientHeight + connectorHeight
			var viewportHeightHalf = viewportHeight/2 + connectorHeight

			var elementPos = tm_item.offset().top

			var new_elementPos = elementPos + timeline_start_icon.top

			var photoViewportOffsetTop = new_elementPos - $document.scrollTop()

			if (photoViewportOffsetTop < 0) {
				photoViewportOffsetTop = Math.abs(photoViewportOffsetTop)
			} else {
				photoViewportOffsetTop = -Math.abs(photoViewportOffsetTop)
			}

			if ( elementPos < (viewportHeightHalf) ) {
				if ( (viewportHeightHalf) + Math.abs(photoViewportOffsetTop) < (elementEnd) ) {
					line_inner.height((viewportHeightHalf) + photoViewportOffsetTop)
				}else{
					if ( (photoViewportOffsetTop + viewportHeightHalf) >= elementEnd ) {
						line_inner.height(elementEnd)
					}
				}
			} else {
				if ( (photoViewportOffsetTop  + viewportHeightHalf) < elementEnd ) {
					if (0 > photoViewportOffsetTop) {
						line_inner.height((viewportHeightHalf) - Math.abs(photoViewportOffsetTop))
						++num
					} else {
						line_inner.height((viewportHeightHalf) + photoViewportOffsetTop)
					}
				}else{
					if ( (photoViewportOffsetTop + viewportHeightHalf) >= elementEnd ) {
						line_inner.height(elementEnd)
					}
				}
			}

			//For changing icon background color and icon color.
			var timeline_icon_pos, timeline_card_pos
			var elementPos, elementCardPos
			var timeline_icon_top, timeline_card_top
			var timeline_icon   = timeline.find(".uagb-timeline__marker"),
				animate_border  = timeline.find(".uagb-timeline__field-wrap")

			for (var i = 0; i < timeline_icon.length; i++) {
				timeline_icon_pos = $(timeline_icon[i]).offset().top
				timeline_card_pos = $(animate_border[i]).offset().top
				elementPos = timeline.offset().top
				elementCardPos = timeline.offset().top

				timeline_icon_top = timeline_icon_pos - $document.scrollTop()
				timeline_card_top = timeline_card_pos - $document.scrollTop()

				if ( ( timeline_card_top ) < ( ( viewportHeightHalf ) ) ) {

					animate_border[i].classList.remove("out-view")
					animate_border[i].classList.add("in-view")

				} else {
					// Remove classes if element is below than half of viewport.
					animate_border[i].classList.add("out-view")
					animate_border[i].classList.remove("in-view")
				}

				if ( ( timeline_icon_top ) < ( ( viewportHeightHalf ) ) ) {

					// Add classes if element is above than half of viewport.
					timeline_icon[i].classList.remove("uagb-timeline__out-view-icon")
					timeline_icon[i].classList.add("uagb-timeline__in-view-icon")

				} else {

					// Remove classes if element is below than half of viewport.
					timeline_icon[i].classList.add("uagb-timeline__out-view-icon")
					timeline_icon[i].classList.remove("uagb-timeline__in-view-icon")

				}
			}

		}
	}
}
export default UAGBcontentTimeline