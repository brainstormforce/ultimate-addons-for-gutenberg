/**
 * BLOCK: UAGB - Columns Edit Class
 */
import OptionSelectorControl from '../../components/option-selector-control'

// Import classes
import classnames from "classnames"
import styling from "./styling"
import memoize from "memize"
import times from "lodash/times"
import map from "lodash/map"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import shapes from "./shapes"
import BoxShadowControl from "../../components/box-shadow"
const ALLOWED_BLOCKS = [ "uagb/column" ]

const { __ } = wp.i18n

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
	PanelColorSettings
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
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		if ( 'middle' === this.props.attributes.vAlign ) {
			this.props.setAttributes( { vAlign: 'center' } )
		}
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-columns-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { backgroundImage } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { backgroundImage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {

		const { backgroundImage } = this.props.attributes
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
		const { backgroundVideo } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { backgroundVideo: null } )
	}

	/*
	 * Event to set Video while adding.
	 */
	onSelectVideo( media ) {
		const { backgroundVideo } = this.props.attributes
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

	render() {

		const { attributes, setAttributes, isSelected, className } = this.props

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
		} = attributes
		
		const CustomTag = `${tag}`

		var element = document.getElementById( "uagb-columns-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		let active = ( isSelected ) ? "active" : "not-active"

		const dividers = [
			{ value: "none", label: __( "None" ) },
			{ value: "tilt", label: __( "Tilt" ) },
			{ value: "mountains", label: __( "Mountains" ) },
			{ value: "wave_brush", label: __( "Wave Brush" ) },
			{ value: "waves", label: __( "Waves" ) },
			{ value: "wave_pattern", label: __( "Waves Pattern" ) },
			{ value: "triangle", label: __( "Triangle" ) },
			{ value: "drops", label: __( "Drops" ) },
			{ value: "clouds", label: __( "Clouds" ) },
			{ value: "zigzag", label: __( "ZigZag" ) },
			{ value: "pyramids", label: __( "Pyramids" ) },
			{ value: "triangle_asymmetrical", label: __( "Triangle Asymmetrical" ) },
			{ value: "tilt_opacity", label: __( "Tilt Opacity" ) },
			{ value: "fan_opacity", label: __( "Fan Opacity" ) },
			{ value: "curve", label: __( "Curve" ) },
			{ value: "curve_asymmetrical", label: __( "Curve Asymmetrical" ) },
			{ value: "arrow", label: __( "Arrow" ) },
			{ value: "arrow_split", label: __( "Arrow Split" ) },
			{ value: "book", label: __( "Book" ) },
		]

		const bottomSettings = (
			<Fragment>
				<SelectControl
					label={ __( "Type" ) }
					value={ bottomType }
					onChange={ ( value ) => setAttributes( { bottomType: value } ) }
					options={ dividers }
				/>
				{ bottomType != "none" &&
					<Fragment>
						<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ bottomColor: bottomColor }} ></span></span></p>
						<ColorPalette
							value={ bottomColor }
							onChange={ ( colorValue ) => setAttributes( { bottomColor: colorValue } ) }
							allowReset
						/>
						<RangeControl
							label={ __( "Opacity" ) }
							value={ bottomDividerOpacity }
							onChange={ ( value ) => setAttributes( { bottomDividerOpacity: value } ) }
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __( "Width" ) }
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
												label={ __( "Height" ) }
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
												label={ __( "Height" ) }
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
												label={ __( "Height" ) }
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
							label={ __( "Flip" ) }
							checked={ bottomFlip }
							onChange={ ( value ) => setAttributes( { bottomFlip: ! bottomFlip } ) }
						/>
						<ToggleControl
							label={ __( "Bring To Front" ) }
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
					label={ __( "Type" ) }
					value={ topType }
					onChange={ ( value ) => setAttributes( { topType: value } ) }
					options={ dividers }
				/>
				{ topType != "none" &&
					<Fragment>
						<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ topColor: topColor }} ></span></span></p>
						<ColorPalette
							value={ topColor }
							onChange={ ( colorValue ) => setAttributes( { topColor: colorValue } ) }
							allowReset
						/>
						<RangeControl
							label={ __( "Opacity" ) }
							value={ topDividerOpacity }
							onChange={ ( value ) => setAttributes( { topDividerOpacity: value } ) }
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __( "Width" ) }
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
												label={ __( "Height" ) }
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
												label={ __( "Height" ) }
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
												label={ __( "Height" ) }
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
							label={ __( "Flip" ) }
							checked={ topFlip }
							onChange={ ( value ) => setAttributes( { topFlip: ! topFlip } ) }
						/>
						<ToggleControl
							label={ __( "Bring To Front" ) }
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
						<RangeControl
							label={ __( "Columns" ) }
							value={ columns }
							min={ 0 }
							max={ 6 }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
						/>
						<SelectControl
							label={ __( "Stack on" ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "tablet", label: __( "Tablet" ) },
								{ value: "mobile", label: __( "Mobile" ) },
							] }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
							help={ __( "Note: Choose on what breakpoint the columns will stack." ) }
						/>
						<SelectControl
							label={ __( "Container Width" ) }
							value={ contentWidth }
							onChange={ ( value ) => setAttributes( { contentWidth: value } ) }
							options={ [
								{ value: "theme", label: __( "Theme Container Width" ) },
								{ value: "custom", label: __( "Custom" ) },
							] }
						/>
						{
							contentWidth == "custom" &&
							(
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
										<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ widthType === "px" } aria-pressed={ widthType === "px" } min={0} max={2000} onClick={ () => setAttributes( { widthType: "px" } ) }>{ "px" }</Button>
										<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ widthType === "%" } aria-pressed={ widthType === "%" } min={0} max={100} onClick={ () => setAttributes( { widthType: "%" } ) }>{ "%" }</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Inner Width" ) }
										value={ width }
										min={ 0 }
										max={ ( "%" == widthType ) ? 100 : 2000 }
										onChange={ ( value ) => setAttributes( { width: value } ) }
									/>
								</Fragment>
							 )
						}
						<OptionSelectorControl
							label={ __( "Column Gap" ) }
							currentOption={ columnGap }
							options={ [
								{ value: "10", label: __( "Default" ), tooltip: __( 'Default (10px)' ), },
								{ value: "0", label: __( "None" ), tooltip: __( 'No Gap (0px)' ), },
								{ value: "5", label: __( "S" ), tooltip: __( 'Narrow (5px)' ), },
								{ value: "15", label: __( "M" ), tooltip: __( 'Extended (15px)' ), },
								{ value: "20", label: __( "L" ), tooltip: __( 'Wide (20px)' ), },
								{ value: "30", label: __( "XL" ), tooltip: __( 'Wider (30px)' ), }
							] }
							onChange={ ( columnGap ) => setAttributes( { columnGap } ) }
							help={ __( "Note: The individual Column Gap can be managed from Column Settings." ) }
						/>
						<SelectControl
							label={ __( "HTML Tag" ) }
							value={ tag }
							onChange={ ( value ) => setAttributes( { tag: value } ) }
							options={ [
								{ value: "div", label: __( "div" ) },
								{ value: "header", label: __( "header" ) },
								{ value: "footer", label: __( "footer" ) },
								{ value: "main", label: __( "main" ) },
								{ value: "article", label: __( "article" ) },
								{ value: "section", label: __( "section" ) },
								{ value: "aside", label: __( "aside" ) },
								{ value: "nav", label: __( "nav" ) },
							] }
						/>
						<ToggleControl
							label={ __( "Reverse Columns (Tablet)" ) }
							checked={ reverseTablet }
							onChange={ ( value ) => setAttributes( { reverseTablet: ! reverseTablet } ) }
						/>
						<ToggleControl
							label={ __( "Reverse Columns (Mobile)" ) }
							checked={ reverseMobile }
							onChange={ ( value ) => setAttributes( { reverseMobile: ! reverseMobile } ) }
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "px" } aria-pressed={ mobilePaddingType === "px" } onClick={ () => setAttributes( { mobilePaddingType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "%" } aria-pressed={ mobilePaddingType === "%" } onClick={ () => setAttributes( { mobilePaddingType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding Mobile" ) }</h2>
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "px" } aria-pressed={ tabletPaddingType === "px" } onClick={ () => setAttributes( { tabletPaddingType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "%" } aria-pressed={ tabletPaddingType === "%" } onClick={ () => setAttributes( { tabletPaddingType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding Tablet" ) }</h2>
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobileMarginType === "px" } aria-pressed={ mobileMarginType === "px" } onClick={ () => setAttributes( { mobileMarginType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobileMarginType === "%" } aria-pressed={ mobileMarginType === "%" } onClick={ () => setAttributes( { mobileMarginType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Margin Mobile" ) }</h2>
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
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletMarginType === "px" } aria-pressed={ tabletMarginType === "px" } onClick={ () => setAttributes( { tabletMarginType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletMarginType === "%" } aria-pressed={ tabletMarginType === "%" } onClick={ () => setAttributes( { tabletMarginType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Margin Tablet" ) }</h2>
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
												<h2>{ __( "Margin" ) }</h2>
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
					<PanelBody title={ __( "Background" ) } initialOpen={ false }>
						<SelectControl
							label={ __( "Background Type" ) }
							value={ backgroundType }
							onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "color", label: __( "Color" ) },
								{ value: "gradient", label: __( "Gradient" ) },
								{ value: "image", label: __( "Image" ) },
								{ value: "video", label: __( "Video" ) },
							] }
						/>
						{ "color" == backgroundType && (
							<Fragment>
								<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
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
									label={ __( "Background Image" ) }>
									<MediaUpload
										title={ __( "Select Background Image" ) }
										onSelect={ this.onSelectImage }
										allowedTypes={ [ "image" ] }
										value={ backgroundImage }
										render={ ( { open } ) => (
											<Button isDefault onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
											</Button>
										) }
									/>
									{ backgroundImage &&
										( <Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image" ) }
										</Button> )
									}
								</BaseControl>
								{ backgroundImage &&
									( <Fragment>
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
											label={ __( "Attachment" ) }
											value={ backgroundAttachment }
											onChange={ ( value ) => setAttributes( { backgroundAttachment: value } ) }
											options={ [
												{ value: "fixed", label: __( "Fixed" ) },
												{ value: "scroll", label: __( "Scroll" ) }
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
									</Fragment> )
								}
							</Fragment> )
						}
						{ "gradient" == backgroundType &&
							( <Fragment>
								<p className="uagb-setting-label">{ __( "Color 1" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
								<ColorPalette
									value={ gradientColor1 }
									onChange={ ( colorValue ) => setAttributes( { gradientColor1: colorValue } ) }
									allowReset
								/>
								<RangeControl
									label={ __( "Location 1" ) }
									value={ gradientLocation1 }
									onChange={ ( value ) => setAttributes( { gradientLocation1: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
								<p className="uagb-setting-label">{ __( "Color 2" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
								<ColorPalette
									value={ gradientColor2 }
									onChange={ ( colorValue ) => setAttributes( { gradientColor2: colorValue } ) }
									allowReset
								/>
								<RangeControl
									label={ __( "Location 2" ) }
									value={ gradientLocation2 }
									onChange={ ( value ) => setAttributes( { gradientLocation2: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
								<SelectControl
									label={ __( "Type" ) }
									value={ gradientType }
									onChange={ ( value ) => setAttributes( { gradientType: value } ) }
									options={ [
										{ value: "linear", label: __( "Linear" ) },
										{ value: "radial", label: __( "Radial" ) },
									] }
								/>
								{ "linear" == gradientType && <RangeControl
										label={ __( "Angle" ) }
										value={ gradientAngle }
										onChange={ ( value ) => setAttributes( { gradientAngle: value } ) }
										min={ 0 }
										max={ 360 }
										allowReset
									/>
								}
								{ "radial" == gradientType && <SelectControl
										label={ __( "Type" ) }
										value={ gradientPosition }
										onChange={ ( value ) => setAttributes( { gradientPosition: value } ) }
										options={ [
											{ value: "center center", label: __( "Center Center" ) },
											{ value: "center left", label: __( "Center Left" ) },
											{ value: "center right", label: __( "Center Right" ) },
											{ value: "top center", label: __( "Top Center" ) },
											{ value: "top left", label: __( "Top Left" ) },
											{ value: "top right", label: __( "Top Right" ) },
											{ value: "bottom center", label: __( "Bottom Center" ) },
											{ value: "bottom left", label: __( "Bottom Left" ) },
											{ value: "bottom right", label: __( "Bottom Right" ) },
										] }
									/>
								}
							</Fragment>
							)
						}
						{ "video" == backgroundType && (
							<BaseControl
								className="editor-bg-video-control"
								label={ __( "Background Video" ) }
							>
								<MediaUpload
									title={ __( "Select Background Video" ) }
									onSelect={ this.onSelectVideo }
									allowedTypes={ [ "video" ] }
									value={ backgroundVideo }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! backgroundVideo ? __( "Select Background Video" ) : __( "Replace Video" ) }
										</Button>
									) }
								/>
								{ backgroundVideo &&
									( <Button onClick={ this.onRemoveVideo } isLink isDestructive>
										{ __( "Remove Video" ) }
									</Button> )
								}
							</BaseControl> )
						}
						{ ( "color" == backgroundType || ( "image" == backgroundType && backgroundImage ) || "gradient" == backgroundType ) &&
							( <RangeControl
								label={ __( "Opacity" ) }
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
								<p className="uagb-setting-label">{ __( "Video Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
								<ColorPalette
									value={ backgroundVideoColor }
									onChange={ ( colorValue ) => setAttributes( { backgroundVideoColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						) }
						{ "video" == backgroundType && backgroundVideo && (
							<RangeControl
								label={ __( "Opacity" ) }
								value={ backgroundVideoOpacity }
								onChange={ ( value ) => setAttributes( { backgroundVideoOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={50}
							/>
						)}
					</PanelBody>
					<PanelBody title={ __( "Shape Dividers" ) } initialOpen={ false }>
						<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
							activeClass="active-tab"
							tabs={ [
								{
									name: "top",
									title: __( "Top" ),
									className: "uagb-top-tab",
								},
								{
									name: "bottom",
									title: __( "Bottom" ),
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
						<BoxShadowControl
							setAttributes = { setAttributes }
							label = { __( "Box Shadow" ) }
							boxShadowColor = { { value: boxShadowColor, label: __( "Color" ) } }
							boxShadowHOffset = { { value: boxShadowHOffset, label: __( "Horizontal" ) } }
							boxShadowVOffset = { { value: boxShadowVOffset, label: __( "Vertical" ) } }
							boxShadowBlur = { { value: boxShadowBlur, label: __( "Blur" ) } }
							boxShadowSpread = { { value: boxShadowSpread, label: __( "Spread" ) } }
							boxShadowPosition = { { value: boxShadowPosition, label: __( "Position" ) } }
							
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
						`align${ align }`,
						reverse_tablet,
						reverse_mobile,
						`uagb-block-${this.props.clientId}`
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
						`uagb-columns__columns-${columns}`
					) }>
						<InnerBlocks
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

export default withNotices( UAGBColumns )
