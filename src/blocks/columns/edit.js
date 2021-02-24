/**
 * BLOCK: UAGB - Columns Edit Class
 */
import OptionSelectorControl from '../../components/option-selector-control'

// Import classes
import classnames from "classnames"
import styling from "./styling"
import memoize from "memize"
import times from "lodash/times"
import map from 'lodash/map';
import dropRight from "lodash/dropRight"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import shapes from "./shapes"
import BoxShadowControl from "../../components/box-shadow"
import GradientSettings from "../../components/gradient-settings"
import rowIcons from './icons';
const ALLOWED_BLOCKS = [ "uagb/column" ]

const { __ } = wp.i18n
const {
	withSelect,
	useDispatch,
	withDispatch,
	select
} = wp.data
const {
	compose,
} = wp.compose
const {
	Component,
	Fragment,
} = wp.element

const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentToolbar,
	ColorPalette,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	PanelColorSettings,
	__experimentalBlockVariationPicker,
	dispatch
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	BaseControl,
	withNotices,
	ToggleControl,
	Toolbar,
	Tooltip,
	TabPanel,
	Dashicon
} = wp.components

const {
	createBlock
} = wp.blocks

const getColumnsTemplate = memoize( ( columns ) => {
	return times( columns, n => [ "uagb/column", { id: n + 1 } ] )
} )

class UAGBColumns extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveVideo = this.onRemoveVideo.bind( this )
		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.onSelectVideo = this.onSelectVideo.bind( this )
		this.blockVariationPickerOnSelect = this.blockVariationPickerOnSelect.bind( this )
		this.setColumns = this.setColumns.bind( this );
		this.setColumnsTab = this.setColumnsTab.bind( this );
		this.setColumnsMob = this.setColumnsMob.bind( this );
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		if ( 'middle' === this.props.attributes.vAlign ) {
			this.props.setAttributes( { vAlign: 'center' } )
		}
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-columns-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-columns-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
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

		if ( ! media.type || "image" != media.type ) {
			return
		}

		setAttributes( { backgroundImage: media } )
	}

	/*
	 * Event to set Video as null while removing.
	 */
	onRemoveVideo() {
		const { setAttributes } = this.props

		setAttributes( { backgroundVideo: null } )
	}

	/*
	 * Event to set Video while adding.
	 */
	onSelectVideo( media ) {
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundVideo: null } )
			return
		}
		if ( ! media.type || "video" != media.type ) {
			return
		}
		setAttributes( { backgroundVideo: media } )
	}

	setColumns(value) {
		
		const { setAttributes } = this.props

		if ( 0 !== value ) {
			let widthcount = 100 / value;

			const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

			getChildBlocks.forEach((columnChild, key) => {
				columnChild.attributes.colWidth = widthcount;
			});
		}

		setAttributes( { columns: value } );
	}
	setColumnsTab(value) {
		
		const { setAttributes } = this.props

		if ( 0 !== value ) {

			let widthcountTab = 100 / value;

			const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

			getChildBlocks.forEach((columnChild, key) => {
				columnChild.attributes.colWidthTablet = widthcountTab;
			});
		}
		setAttributes( { columnsTablet: value } );
	}
	setColumnsMob(value) {
		
		const { setAttributes } = this.props

		if ( 0 !== value ) {

			let widthcount = 100 / value;

			const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

			getChildBlocks.forEach((columnChild, key) => {
				columnChild.attributes.colWidthMobile = widthcount;
			});
		}
		setAttributes( { columnsMobile: value } );
	}
	
	blockVariationPickerOnSelect ( nextVariation = this.props.defaultVariation ) {
			
		if ( nextVariation.attributes ) {
			this.props.setAttributes( nextVariation.attributes );
		}

		if ( nextVariation.innerBlocks ) {
			this.props.replaceInnerBlocks(
				this.props.clientId,
				this.createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	}

	createBlocksFromInnerBlocksTemplate( innerBlocksTemplate ) {
		return map( innerBlocksTemplate, ( [ name, attributes, innerBlocks = [] ] ) => createBlock( name, attributes, this.createBlocksFromInnerBlocksTemplate( innerBlocks ) ) );
	}

	render() {
		
		const { 
			attributes, 
			setAttributes, 
			isSelected, 
			className, 
			variations,
			hasInnerBlocks,
			deviceType,
		 } = this.props

		const {
			stack,
			align,
			vAlign,
			contentWidth,
			width,
			widthType,
			tag,
			columnGap,
			topMargin,
			bottomMargin,
			topMarginMobile,
			bottomMarginMobile,
			topMarginTablet,
			bottomMarginTablet,
			topPadding,
			bottomPadding,
			leftPadding,
			rightPadding,
			topPaddingTablet,
			bottomPaddingTablet,
			leftPaddingTablet,
			rightPaddingTablet,
			topPaddingMobile,
			bottomPaddingMobile,
			leftPaddingMobile,
			rightPaddingMobile,
			backgroundType,
			backgroundImage,
			backgroundVideo,
			backgroundColor,
			backgroundPosition,
			backgroundAttachment,
			backgroundRepeat,
			backgroundSize,
			gradientColor1,
			gradientColor2,
			gradientLocation1,
			gradientLocation2,
			gradientType,
			gradientAngle,
			gradientPosition,
			backgroundOpacity,
			backgroundVideoColor,
			backgroundVideoOpacity,
			backgroundImageColor,
			borderStyle,
			borderWidth,
			borderRadius,
			borderColor,
			columns,
			columnsTablet,
			columnsMobile,
			bottomType,
			bottomColor,
			bottomHeight,
			bottomHeightTablet,
			bottomHeightMobile,
			bottomWidth,
			topType,
			topColor,
			topHeight,
			topHeightTablet,
			topHeightMobile,
			topWidth,
			bottomFlip,
			topFlip,
			reverseTablet,
			reverseMobile,
			topDividerOpacity,
			bottomDividerOpacity,
			topContentAboveShape,
			bottomContentAboveShape,
			mobileMarginType,
			tabletMarginType,
			desktopMarginType,
			mobilePaddingType,
			tabletPaddingType,
			desktopPaddingType,
			boxShadowColor,
			boxShadowHOffset,
			boxShadowVOffset,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowPosition,
			gradientValue,
		} = attributes
		
		const CustomTag = `${tag}`

		let active = ( isSelected ) ? "active" : "not-active"

		const dividers = [
			{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
			{ value: "tilt", label: __( "Tilt", 'ultimate-addons-for-gutenberg' ) },
			{ value: "mountains", label: __( "Mountains", 'ultimate-addons-for-gutenberg' ) },
			{ value: "wave_brush", label: __( "Wave Brush", 'ultimate-addons-for-gutenberg' ) },
			{ value: "waves", label: __( "Waves", 'ultimate-addons-for-gutenberg' ) },
			{ value: "wave_pattern", label: __( "Waves Pattern", 'ultimate-addons-for-gutenberg' ) },
			{ value: "triangle", label: __( "Triangle", 'ultimate-addons-for-gutenberg' ) },
			{ value: "drops", label: __( "Drops", 'ultimate-addons-for-gutenberg' ) },
			{ value: "clouds", label: __( "Clouds", 'ultimate-addons-for-gutenberg' ) },
			{ value: "zigzag", label: __( "ZigZag", 'ultimate-addons-for-gutenberg' ) },
			{ value: "pyramids", label: __( "Pyramids", 'ultimate-addons-for-gutenberg' ) },
			{ value: "triangle_asymmetrical", label: __( "Triangle Asymmetrical", 'ultimate-addons-for-gutenberg' ) },
			{ value: "tilt_opacity", label: __( "Tilt Opacity", 'ultimate-addons-for-gutenberg' ) },
			{ value: "fan_opacity", label: __( "Fan Opacity", 'ultimate-addons-for-gutenberg' ) },
			{ value: "curve", label: __( "Curve", 'ultimate-addons-for-gutenberg' ) },
			{ value: "curve_asymmetrical", label: __( "Curve Asymmetrical", 'ultimate-addons-for-gutenberg' ) },
			{ value: "arrow", label: __( "Arrow", 'ultimate-addons-for-gutenberg' ) },
			{ value: "arrow_split", label: __( "Arrow Split", 'ultimate-addons-for-gutenberg' ) },
			{ value: "book", label: __( "Book", 'ultimate-addons-for-gutenberg' ) },
		]
		
		const bottomSettings = (
			<Fragment>
				<SelectControl
					label={ __( "Type", 'ultimate-addons-for-gutenberg' ) }
					value={ bottomType }
					onChange={ ( value ) => setAttributes( { bottomType: value } ) }
					options={ dividers }
				/>
				{ bottomType != "none" &&
					<Fragment>
						<p className="uagb-setting-label">{ __( "Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ bottomColor: bottomColor }} ></span></span></p>
						<ColorPalette
							value={ bottomColor }
							onChange={ ( colorValue ) => setAttributes( { bottomColor: colorValue } ) }
							allowReset
						/>
						<RangeControl
							label={ __( "Opacity", 'ultimate-addons-for-gutenberg' ) }
							value={ bottomDividerOpacity }
							onChange={ ( value ) => setAttributes( { bottomDividerOpacity: value } ) }
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
							value={ bottomWidth }
							onChange={ ( value ) => setAttributes( { bottomWidth: value } ) }
							min={ 100 }
							max={ 2000 }
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
												label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
												value={ bottomHeightMobile }
												onChange={ ( value ) => setAttributes( { bottomHeightMobile: value } ) }
												min={ 0 }
												max={ 500 }
												allowReset
											/>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<RangeControl
												label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
												value={ bottomHeightTablet }
												onChange={ ( value ) => setAttributes( { bottomHeightTablet: value } ) }
												min={ 0 }
												max={ 500 }
												allowReset
											/>
										)
									} else {
										tabout = (
											<RangeControl
												label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
												value={ bottomHeight }
												onChange={ ( value ) => setAttributes( { bottomHeight: value } ) }
												min={ 0 }
												max={ 500 }
												allowReset
											/>
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
						<ToggleControl
							label={ __( "Flip", 'ultimate-addons-for-gutenberg' ) }
							checked={ bottomFlip }
							onChange={ ( value ) => setAttributes( { bottomFlip: ! bottomFlip } ) }
						/>
						<ToggleControl
							label={ __( "Bring To Front", 'ultimate-addons-for-gutenberg' ) }
							checked={ bottomContentAboveShape }
							onChange={ ( value ) => setAttributes( { bottomContentAboveShape: ! bottomContentAboveShape } ) }
						/>
					</Fragment>
				}
			</Fragment>
		)

		const topSettings = (
			<Fragment>
				<SelectControl
					label={ __( "Type", 'ultimate-addons-for-gutenberg' ) }
					value={ topType }
					onChange={ ( value ) => setAttributes( { topType: value } ) }
					options={ dividers }
				/>
				{ topType != "none" &&
					<Fragment>
						<p className="uagb-setting-label">{ __( "Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ topColor: topColor }} ></span></span></p>
						<ColorPalette
							value={ topColor }
							onChange={ ( colorValue ) => setAttributes( { topColor: colorValue } ) }
							allowReset
						/>
						<RangeControl
							label={ __( "Opacity", 'ultimate-addons-for-gutenberg' ) }
							value={ topDividerOpacity }
							onChange={ ( value ) => setAttributes( { topDividerOpacity: value } ) }
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
							value={ topWidth }
							onChange={ ( value ) => setAttributes( { topWidth: value } ) }
							min={ 100 }
							max={ 2000 }
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
												label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
												value={ topHeightMobile }
												onChange={ ( value ) => setAttributes( { topHeightMobile: value } ) }
												min={ 0 }
												max={ 500 }
												allowReset
											/>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<RangeControl
												label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
												value={ topHeightTablet }
												onChange={ ( value ) => setAttributes( { topHeightTablet: value } ) }
												min={ 0 }
												max={ 500 }
												allowReset
											/>
										)
									} else {
										tabout = (
											<RangeControl
												label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
												value={ topHeight }
												onChange={ ( value ) => setAttributes( { topHeight: value } ) }
												min={ 0 }
												max={ 500 }
												allowReset
											/>
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
						<ToggleControl
							label={ __( "Flip", 'ultimate-addons-for-gutenberg' ) }
							checked={ topFlip }
							onChange={ ( value ) => setAttributes( { topFlip: ! topFlip } ) }
						/>
						<ToggleControl
							label={ __( "Bring To Front", 'ultimate-addons-for-gutenberg' ) }
							checked={ topContentAboveShape }
							onChange={ ( value ) => setAttributes( { topContentAboveShape: ! topContentAboveShape } ) }
						/>
					</Fragment>
				}
			</Fragment>
		)

		const top_divider_html = (
			topType != "none" && (
				<div
					className={ classnames(
						"uagb-columns__shape",
						"uagb-columns__shape-top",
						{ "uagb-columns__shape-flip": topFlip === true },
						{ "uagb-columns__shape-above-content": topContentAboveShape === true }
					) }>
					{shapes[topType]}
				</div>
			)
		)

		const bottom_divider_html = (
			bottomType != "none" && (
				<div
					className={ classnames(
						"uagb-columns__shape",
						"uagb-columns__shape-bottom",
						{ "uagb-columns__shape-flip": bottomFlip === true },
						{ "uagb-columns__shape-above-content": bottomContentAboveShape === true }
					) }
					data-negative="false">
					{shapes[bottomType]}
				</div>
			)
		)

		const reverse_tablet = ( reverseTablet ) ? "uagb-columns__reverse-tablet" : ""

		const reverse_mobile = ( reverseMobile ) ? "uagb-columns__reverse-mobile" : ""
		
		const col_tablet = ( columnsTablet ) ? `uagb-columns__columns-tab-${columnsTablet}` : ""

		const col_mobile = ( columnsMobile ) ? `uagb-columns__columns-mob-${columnsMobile}` : ""
		
		if ( ! hasInnerBlocks ) {
			return (
				<Fragment>
					<__experimentalBlockVariationPicker
						icon ={ UAGB_Block_Icons.columns }
						label={ uagb_blocks_info.blocks["uagb/columns"]["title"] }
						instructions={ __( 'Select a variation to start with.', 'ultimate-addons-for-gutenberg' ) }
						variations={ variations }
						allowSkip
						onSelect={ ( nextVariation ) => this.blockVariationPickerOnSelect( nextVariation ) }
					/>
				</Fragment>
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
						controls={ [ "wide","full" ] }
					/>
					<BlockVerticalAlignmentToolbar
						value={ vAlign }
						onChange={ ( value ) => {
							setAttributes( { vAlign: value } )
						} }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "Layout" ) }>
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
												value={ columnsMobile }
												min={ 0 }
												max={ 6 }
												onChange={ this.setColumnsMob}
											/>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<RangeControl
												label={ __( "Columns" ) }
												value={ columnsTablet }
												min={ 0 }
												max={ 6 }
												onChange={ this.setColumnsTab }
											/>
										)
									} else {
										tabout = (
											<RangeControl
												label={ __( "Columns" ) }
												value={ columns }
												min={ 0 }
												max={ 6 }
												onChange={ this.setColumns }
											/>
										)
									}
									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
						<SelectControl
							label={ __( "Stack on", 'ultimate-addons-for-gutenberg' ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "tablet", label: __( "Tablet", 'ultimate-addons-for-gutenberg' ) },
								{ value: "mobile", label: __( "Mobile", 'ultimate-addons-for-gutenberg' ) },
							] }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
							help={ __( "Note: Choose on what breakpoint the columns will stack.", 'ultimate-addons-for-gutenberg' ) }
						/>
						<SelectControl
							label={ __( "Container Width", 'ultimate-addons-for-gutenberg' ) }
							value={ contentWidth }
							onChange={ ( value ) => setAttributes( { contentWidth: value } ) }
							options={ [
								{ value: "theme", label: __( "Theme Container Width", 'ultimate-addons-for-gutenberg' ) },
								{ value: "custom", label: __( "Custom", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						{
							contentWidth == "custom" &&
							(
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
										<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ widthType === "px" } aria-pressed={ widthType === "px" } min={0} max={2000} onClick={ () => setAttributes( { widthType: "px" } ) }>{ "px" }</Button>
										<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ widthType === "%" } aria-pressed={ widthType === "%" } min={0} max={100} onClick={ () => setAttributes( { widthType: "%" } ) }>{ "%" }</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Inner Width", 'ultimate-addons-for-gutenberg' ) }
										value={ width }
										min={ 0 }
										max={ ( "%" == widthType ) ? 100 : 2000 }
										onChange={ ( value ) => setAttributes( { width: value } ) }
									/>
								</Fragment>
							)
						}
						<OptionSelectorControl
							label={ __( "Column Gap", 'ultimate-addons-for-gutenberg' ) }
							currentOption={ columnGap }
							options={ [
								{ value: "10", label: __( "Default", 'ultimate-addons-for-gutenberg' ), tooltip: __( 'Default (10px)', 'ultimate-addons-for-gutenberg' ), },
								{ value: "0", label: __( "None", 'ultimate-addons-for-gutenberg' ), tooltip: __( 'No Gap (0px)', 'ultimate-addons-for-gutenberg' ), },
								{ value: "5", label: __( "S", 'ultimate-addons-for-gutenberg' ), tooltip: __( 'Narrow (5px)', 'ultimate-addons-for-gutenberg' ), },
								{ value: "15", label: __( "M", 'ultimate-addons-for-gutenberg' ), tooltip: __( 'Extended (15px)', 'ultimate-addons-for-gutenberg' ), },
								{ value: "20", label: __( "L", 'ultimate-addons-for-gutenberg' ), tooltip: __( 'Wide (20px)', 'ultimate-addons-for-gutenberg' ), },
								{ value: "30", label: __( "XL", 'ultimate-addons-for-gutenberg' ), tooltip: __( 'Wider (30px)', 'ultimate-addons-for-gutenberg' ), }
							] }
							onChange={ ( columnGap ) => setAttributes( { columnGap } ) }
							help={ __( "Note: The individual Column Gap can be managed from Column Settings.", 'ultimate-addons-for-gutenberg' ) }
						/>
						<SelectControl
							label={ __( "HTML Tag", 'ultimate-addons-for-gutenberg' ) }
							value={ tag }
							onChange={ ( value ) => setAttributes( { tag: value } ) }
							options={ [
								{ value: "div", label: __( "div", 'ultimate-addons-for-gutenberg' ) },
								{ value: "header", label: __( "header", 'ultimate-addons-for-gutenberg' ) },
								{ value: "footer", label: __( "footer", 'ultimate-addons-for-gutenberg' ) },
								{ value: "main", label: __( "main", 'ultimate-addons-for-gutenberg' ) },
								{ value: "article", label: __( "article", 'ultimate-addons-for-gutenberg' ) },
								{ value: "section", label: __( "section", 'ultimate-addons-for-gutenberg' ) },
								{ value: "aside", label: __( "aside", 'ultimate-addons-for-gutenberg' ) },
								{ value: "nav", label: __( "nav", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						<ToggleControl
							label={ __( "Reverse Columns (Tablet)", 'ultimate-addons-for-gutenberg' ) }
							checked={ reverseTablet }
							onChange={ ( value ) => setAttributes( { reverseTablet: ! reverseTablet } ) }
							help={ __( "If enabled layout will be stacked for Tablet & Mobile devices", 'ultimate-addons-for-gutenberg' ) }
						/>
						<ToggleControl
							label={ __( "Reverse Columns (Mobile)", 'ultimate-addons-for-gutenberg' ) }
							checked={ reverseMobile }
							onChange={ ( value ) => setAttributes( { reverseMobile: ! reverseMobile } ) }
							help={ __( "If enabled layout will be stacked for Tablet & Mobile devices", 'ultimate-addons-for-gutenberg' ) }
						/>
					</PanelBody>
					<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "px" } aria-pressed={ mobilePaddingType === "px" } onClick={ () => setAttributes( { mobilePaddingType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "%" } aria-pressed={ mobilePaddingType === "%" } onClick={ () => setAttributes( { mobilePaddingType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding Mobile", 'ultimate-addons-for-gutenberg' ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.top_margin }
													className={ "uagb-margin-control" }
													value={ topPaddingMobile }
													onChange={ ( value ) => setAttributes( { topPaddingMobile: value } ) }
													min={ 0 }
													max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.bottom_margin }
													className={ "uagb-margin-control" }
													value={ bottomPaddingMobile }
													onChange={ ( value ) => setAttributes( { bottomPaddingMobile: value } ) }
													min={ 0 }
													max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.left_margin }
													className={ "uagb-margin-control" }
													value={ leftPaddingMobile }
													onChange={ ( value ) => setAttributes( { leftPaddingMobile: value } ) }
													min={ 0 }
													max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.right_margin }
													className={ "uagb-margin-control" }
													value={ rightPaddingMobile }
													onChange={ ( value ) => setAttributes( { rightPaddingMobile: value } ) }
													min={ 0 }
													max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
													allowReset
												/>
											</Fragment>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<Fragment>
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "px" } aria-pressed={ tabletPaddingType === "px" } onClick={ () => setAttributes( { tabletPaddingType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "%" } aria-pressed={ tabletPaddingType === "%" } onClick={ () => setAttributes( { tabletPaddingType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding Tablet", 'ultimate-addons-for-gutenberg' ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.top_margin }
													className={ "uagb-margin-control" }
													value={ topPaddingTablet }
													onChange={ ( value ) => setAttributes( { topPaddingTablet: value } ) }
													min={ 0 }
													max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.bottom_margin }
													className={ "uagb-margin-control" }
													value={ bottomPaddingTablet }
													onChange={ ( value ) => setAttributes( { bottomPaddingTablet: value } ) }
													min={ 0 }
													max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.left_margin }
													className={ "uagb-margin-control" }
													value={ leftPaddingTablet }
													onChange={ ( value ) => setAttributes( { leftPaddingTablet: value } ) }
													min={ 0 }
													max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.right_margin }
													className={ "uagb-margin-control" }
													value={ rightPaddingTablet }
													onChange={ ( value ) => setAttributes( { rightPaddingTablet: value } ) }
													min={ 0 }
													max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
													allowReset
												/>
											</Fragment>
										)
									} else {
										tabout = (
											<Fragment>
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "px" } aria-pressed={ desktopPaddingType === "px" } onClick={ () => setAttributes( { desktopPaddingType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "%" } aria-pressed={ desktopPaddingType === "%" } onClick={ () => setAttributes( { desktopPaddingType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.top_margin }
													className={ "uagb-margin-control" }
													value={ topPadding }
													onChange={ ( value ) => setAttributes( { topPadding: value } ) }
													min={ 0 }
													max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.bottom_margin }
													className={ "uagb-margin-control" }
													value={ bottomPadding }
													onChange={ ( value ) => setAttributes( { bottomPadding: value } ) }
													min={ 0 }
													max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.left_margin }
													className={ "uagb-margin-control" }
													value={ leftPadding }
													onChange={ ( value ) => setAttributes( { leftPadding: value } ) }
													min={ 0 }
													max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.right_margin }
													className={ "uagb-margin-control" }
													value={ rightPadding }
													onChange={ ( value ) => setAttributes( { rightPadding: value } ) }
													min={ 0 }
													max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobileMarginType === "px" } aria-pressed={ mobileMarginType === "px" } onClick={ () => setAttributes( { mobileMarginType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobileMarginType === "%" } aria-pressed={ mobileMarginType === "%" } onClick={ () => setAttributes( { mobileMarginType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Margin Mobile", 'ultimate-addons-for-gutenberg' ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.top_margin }
													className={ "uagb-margin-control" }
													value={ topMarginMobile }
													onChange={ ( value ) => setAttributes( { topMarginMobile: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.bottom_margin }
													className={ "uagb-margin-control" }
													value={ bottomMarginMobile }
													onChange={ ( value ) => setAttributes( { bottomMarginMobile: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
											</Fragment>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<Fragment>
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletMarginType === "px" } aria-pressed={ tabletMarginType === "px" } onClick={ () => setAttributes( { tabletMarginType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletMarginType === "%" } aria-pressed={ tabletMarginType === "%" } onClick={ () => setAttributes( { tabletMarginType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Margin Tablet", 'ultimate-addons-for-gutenberg' ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.top_margin }
													className={ "uagb-margin-control" }
													value={ topMarginTablet }
													onChange={ ( value ) => setAttributes( { topMarginTablet: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.bottom_margin }
													className={ "uagb-margin-control" }
													value={ bottomMarginTablet }
													onChange={ ( value ) => setAttributes( { bottomMarginTablet: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
											</Fragment>
										)
									} else {
										tabout = (
											<Fragment>
											<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ desktopMarginType === "px" } aria-pressed={ desktopMarginType === "px" } onClick={ () => setAttributes( { desktopMarginType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ desktopMarginType === "%" } aria-pressed={ desktopMarginType === "%" } onClick={ () => setAttributes( { desktopMarginType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Margin", 'ultimate-addons-for-gutenberg' ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.top_margin }
													className={ "uagb-margin-control" }
													value={ topMargin }
													onChange={ ( value ) => setAttributes( { topMargin: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.bottom_margin }
													className={ "uagb-margin-control" }
													value={ bottomMargin }
													onChange={ ( value ) => setAttributes( { bottomMargin: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
											</Fragment>
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
					</PanelBody>
					<PanelBody title={ __( "Background", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
					
			
						<SelectControl
							label={ __( "Background Type", 'ultimate-addons-for-gutenberg' ) }
							value={ backgroundType }
							onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "color", label: __( "Color", 'ultimate-addons-for-gutenberg' ) },
								{ value: "gradient", label: __( "Gradient", 'ultimate-addons-for-gutenberg' ) },
								{ value: "image", label: __( "Image", 'ultimate-addons-for-gutenberg' ) },
								{ value: "video", label: __( "Video", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						{ "color" == backgroundType && (
							<Fragment>
								<p className="uagb-setting-label">{ __( "Background Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
								<ColorPalette
									value={ backgroundColor }
									onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						) }
						{ "image" == backgroundType &&
							( <Fragment>
								<BaseControl
									className="editor-bg-image-control"
									label={ __( "Background Image", 'ultimate-addons-for-gutenberg' ) }>
									<MediaUpload
										title={ __( "Select Background Image", 'ultimate-addons-for-gutenberg' ) }
										onSelect={ this.onSelectImage }
										allowedTypes={ [ "image" ] }
										value={ backgroundImage }
										render={ ( { open } ) => (
											<Button isDefault onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image", 'ultimate-addons-for-gutenberg' ) : __( "Replace image", 'ultimate-addons-for-gutenberg' ) }
											</Button>
										) }
									/>
									{ backgroundImage &&
										( <Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image", 'ultimate-addons-for-gutenberg' ) }
										</Button> )
									}
								</BaseControl>
								{ backgroundImage &&
									( <Fragment>
										<SelectControl
											label={ __( "Image Position", 'ultimate-addons-for-gutenberg' ) }
											value={ backgroundPosition }
											onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
											options={ [
												{ value: "top-left", label: __( "Top Left", 'ultimate-addons-for-gutenberg' ) },
												{ value: "top-center", label: __( "Top Center", 'ultimate-addons-for-gutenberg' ) },
												{ value: "top-right", label: __( "Top Right", 'ultimate-addons-for-gutenberg' ) },
												{ value: "center-left", label: __( "Center Left", 'ultimate-addons-for-gutenberg' ) },
												{ value: "center-center", label: __( "Center Center", 'ultimate-addons-for-gutenberg' ) },
												{ value: "center-right", label: __( "Center Right", 'ultimate-addons-for-gutenberg' ) },
												{ value: "bottom-left", label: __( "Bottom Left", 'ultimate-addons-for-gutenberg' ) },
												{ value: "bottom-center", label: __( "Bottom Center", 'ultimate-addons-for-gutenberg' ) },
												{ value: "bottom-right", label: __( "Bottom Right", 'ultimate-addons-for-gutenberg' ) },
											] }
										/>
										<SelectControl
											label={ __( "Attachment", 'ultimate-addons-for-gutenberg' ) }
											value={ backgroundAttachment }
											onChange={ ( value ) => setAttributes( { backgroundAttachment: value } ) }
											options={ [
												{ value: "fixed", label: __( "Fixed", 'ultimate-addons-for-gutenberg' ) },
												{ value: "scroll", label: __( "Scroll", 'ultimate-addons-for-gutenberg' ) }
											] }
										/>
										<SelectControl
											label={ __( "Repeat", 'ultimate-addons-for-gutenberg' ) }
											value={ backgroundRepeat }
											onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
											options={ [
												{ value: "no-repeat", label: __( "No Repeat", 'ultimate-addons-for-gutenberg' ) },
												{ value: "repeat", label: __( "Repeat", 'ultimate-addons-for-gutenberg' ) },
												{ value: "repeat-x", label: __( "Repeat-x", 'ultimate-addons-for-gutenberg' ) },
												{ value: "repeat-y", label: __( "Repeat-y", 'ultimate-addons-for-gutenberg' ) }
											] }
										/>
										<SelectControl
											label={ __( "Size", 'ultimate-addons-for-gutenberg' ) }
											value={ backgroundSize }
											onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
											options={ [
												{ value: "auto", label: __( "Auto", 'ultimate-addons-for-gutenberg' ) },
												{ value: "cover", label: __( "Cover", 'ultimate-addons-for-gutenberg' ) },
												{ value: "contain", label: __( "Contain", 'ultimate-addons-for-gutenberg' ) }
											] }
										/>
										<Fragment>
											<p className="uagb-setting-label">{ __( "Image Overlay Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
											<ColorPalette
												value={ backgroundImageColor }
												onChange={ ( colorValue ) => setAttributes( { backgroundImageColor: colorValue } ) }
												allowReset
											/>
										</Fragment>
									</Fragment> )
								}
							</Fragment> )
						}
						{ "gradient" == backgroundType &&
							( <Fragment>
								<GradientSettings attributes={ attributes }	setAttributes={ setAttributes }/>
							</Fragment>
							)
						}
						{ "video" == backgroundType && (
							<BaseControl
								className="editor-bg-video-control"
								label={ __( "Background Video", 'ultimate-addons-for-gutenberg' ) }
							>
								<MediaUpload
									title={ __( "Select Background Video", 'ultimate-addons-for-gutenberg' ) }
									onSelect={ this.onSelectVideo }
									allowedTypes={ [ "video" ] }
									value={ backgroundVideo }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! backgroundVideo ? __( "Select Background Video", 'ultimate-addons-for-gutenberg' ) : __( "Replace Video", 'ultimate-addons-for-gutenberg' ) }
										</Button>
									) }
								/>
								{ backgroundVideo &&
									( <Button onClick={ this.onRemoveVideo } isLink isDestructive>
										{ __( "Remove Video", 'ultimate-addons-for-gutenberg' ) }
									</Button> )
								}
							</BaseControl> )
						}
						{ ( "color" == backgroundType || ( "image" == backgroundType && backgroundImage ) || "gradient" == backgroundType ) &&
							( <RangeControl
								label={ __( "Opacity", 'ultimate-addons-for-gutenberg' ) }
								value={ backgroundOpacity }
								onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={0}
							/> )
						}
						{ "video" == backgroundType && backgroundVideo && (
							<Fragment>
								<p className="uagb-setting-label">{ __( "Video Overlay Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
								<ColorPalette
									value={ backgroundVideoColor }
									onChange={ ( colorValue ) => setAttributes( { backgroundVideoColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						) }
						{ "video" == backgroundType && backgroundVideo && (
							<RangeControl
								label={ __( "Opacity", 'ultimate-addons-for-gutenberg' ) }
								value={ backgroundVideoOpacity }
								onChange={ ( value ) => setAttributes( { backgroundVideoOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={50}
							/>
						)}
					</PanelBody>
					<PanelBody title={ __( "Shape Dividers", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
						<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
							activeClass="active-tab"
							tabs={ [
								{
									name: "top",
									title: __( "Top", 'ultimate-addons-for-gutenberg' ),
									className: "uagb-top-tab",
								},
								{
									name: "bottom",
									title: __( "Bottom", 'ultimate-addons-for-gutenberg' ),
									className: "uagb-bottom-tab",
								},
							] }>
							{
								( tabName ) => {
									let tabout
									if ( "bottom" === tabName.name ){
										tabout = bottomSettings
									} else {
										tabout = topSettings
									}
									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
					</PanelBody>
					<PanelBody title={ __( "Border", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
						<SelectControl
							label={ __( "Border Style", 'ultimate-addons-for-gutenberg' ) }
							value={ borderStyle }
							onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "solid", label: __( "Solid", 'ultimate-addons-for-gutenberg' ) },
								{ value: "dotted", label: __( "Dotted", 'ultimate-addons-for-gutenberg' ) },
								{ value: "dashed", label: __( "Dashed", 'ultimate-addons-for-gutenberg' ) },
								{ value: "double", label: __( "Double", 'ultimate-addons-for-gutenberg' ) },
								{ value: "groove", label: __( "Groove", 'ultimate-addons-for-gutenberg' ) },
								{ value: "inset", label: __( "Inset", 'ultimate-addons-for-gutenberg' ) },
								{ value: "outset", label: __( "Outset", 'ultimate-addons-for-gutenberg' ) },
								{ value: "ridge", label: __( "Ridge", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						{ "none" != borderStyle && (
							<RangeControl
								label={ __( "Border Width", 'ultimate-addons-for-gutenberg' ) }
								value={ borderWidth }
								onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
						) }
						<RangeControl
							label={ __( "Border Radius", 'ultimate-addons-for-gutenberg' ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
						{ "none" != borderStyle && (
							<Fragment>
								<p className="uagb-setting-label">{ __( "Border Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
								<ColorPalette
									value={ borderColor }
									onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						) }
						<BoxShadowControl
							setAttributes = { setAttributes }
							label = { __( "Box Shadow", 'ultimate-addons-for-gutenberg' ) }
							boxShadowColor = { { value: boxShadowColor, label: __( "Color", 'ultimate-addons-for-gutenberg' ) } }
							boxShadowHOffset = { { value: boxShadowHOffset, label: __( "Horizontal", 'ultimate-addons-for-gutenberg' ) } }
							boxShadowVOffset = { { value: boxShadowVOffset, label: __( "Vertical", 'ultimate-addons-for-gutenberg' ) } }
							boxShadowBlur = { { value: boxShadowBlur, label: __( "Blur", 'ultimate-addons-for-gutenberg' ) } }
							boxShadowSpread = { { value: boxShadowSpread, label: __( "Spread", 'ultimate-addons-for-gutenberg' ) } }
							boxShadowPosition = { { value: boxShadowPosition, label: __( "Position", 'ultimate-addons-for-gutenberg' ) } }
							
						/>
					</PanelBody>
				</InspectorControls>
				<CustomTag
					className={ classnames(
						className,
						"uagb-columns__wrap",
						`uagb-columns__background-${backgroundType}`,
						`uagb-columns__edit-${ active }`,
						`uagb-columns__stack-${stack}`,
						`uagb-columns__valign-${vAlign}`,
						`uagb-columns__gap-${columnGap}`,
						`uagb-editor-preview-mode-${deviceType.toLowerCase()}`,
						`align${ align }`,
						reverse_tablet,
						reverse_mobile,
						`uagb-block-${this.props.clientId.substr( 0, 8 )}`
					) }
				>
					<div className="uagb-columns__overlay"></div>
					{ top_divider_html }
					{ "video" == backgroundType &&
						<div className="uagb-columns__video-wrap">
							{  backgroundVideo &&
								<video autoplay loop muted playsinline>
									<source src={ backgroundVideo.url } type='video/mp4' />
								</video>
							}

						</div>
					}
					<div className={ classnames(
						"uagb-columns__inner-wrap",
						`uagb-columns__columns-${columns}`, col_tablet, col_mobile
					) }>
						<InnerBlocks
							key={ columns }
							template={ getColumnsTemplate( columns ) }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS }
						/>
					</div>
					{ bottom_divider_html }
				</CustomTag>
			</Fragment>
		)
	}
}

const applyWithSelect = withSelect( ( select, props ) => {
	const { getBlocks, getBlocksByClientId } = select( 'core/block-editor' );
	const { getBlockType, getBlockVariations, getDefaultBlockVariation } = select( 'core/blocks' );
	const innerBlocks = getBlocks( props.clientId );
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	const { __experimentalGetPreviewDeviceType = null } = select( 'core/edit-post' );
	let deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		innerBlocks,
		hasInnerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,

		blockType: getBlockType( props.name ),
		defaultVariation: typeof getDefaultBlockVariation === 'undefined' ? null : getDefaultBlockVariation( props.name ),
		variations: typeof getBlockVariations === 'undefined' ? null : getBlockVariations( props.name ),
		replaceInnerBlocks,
		deviceType:deviceType
	};
} );

export default compose( withNotices, applyWithSelect )( UAGBColumns );