/**
 * BLOCK: UAGB - Section Edit Class
 */

// Import classes
import classnames from "classnames"
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import BoxShadowControl from "../../components/box-shadow"
import GradientSettings from "../../components/gradient-settings"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	ColorPalette,
	InspectorControls,
	InnerBlocks,
	MediaUpload
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	Dashicon,
	BaseControl,
	withNotices,
	ToggleControl,
	TabPanel
} = wp.components


class UAGBSectionEdit extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveVideo = this.onRemoveVideo.bind( this )
		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.onSelectVideo = this.onSelectVideo.bind( this )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-section-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-section-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
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

	render() {

		const { attributes, setAttributes, isSelected, className } = this.props

		const {
			align,
			contentWidth,
			width,
			innerWidth,
			innerWidthType,
			tag,
			themeWidth,
			leftPadding,
			rightPadding,
			topPadding,
			bottomPadding,
			leftMargin,
			rightMargin,
			topMargin,
			bottomMargin,
			topPaddingTablet,
			bottomPaddingTablet,
			leftPaddingTablet,
			rightPaddingTablet,
			topMarginTablet,
			bottomMarginTablet,
			leftMarginTablet,
			rightMarginTablet,

			topPaddingMobile,
			bottomPaddingMobile,
			leftPaddingMobile,
			rightPaddingMobile,
			topMarginMobile,
			bottomMarginMobile,
			leftMarginMobile,
			rightMarginMobile,
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
			overlayType,
			gradientOverlayColor1,
			gradientOverlayColor2,
			gradientOverlayType,
			gradientOverlayLocation1,
			gradientOverlayLocation2,
			gradientOverlayAngle,
			gradientOverlayPosition,
			borderStyle,
			borderWidth,
			borderRadius,
			borderColor,
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

		let block_controls = [ "left","center","right" ]
		let block_controls_class = ""

		if ( "full_width" == contentWidth ) {
			block_controls = [ "wide","full" ]

			if ( align == "wide" || align == "full" ) {
				block_controls_class = "align" + align
			}
		}

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ block_controls }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "Layout" ) }>
						<SelectControl
							label={ __( "Content Width" ) }
							value={ contentWidth }
							onChange={ ( value ) => setAttributes( { contentWidth: value } ) }
							options={ [
								{ value: "boxed", label: __( "Boxed" ) },
								{ value: "full_width", label: __( "Full Width" ) },
							] }
						/>
						{
							contentWidth == "boxed" &&
							( <RangeControl
								label={ __( "Width" ) }
								value={ width }
								min={ 0 }
								max={ 2000 }
								onChange={ ( value ) => setAttributes( { width: value } ) }
							/> )
						}
						{ contentWidth != "boxed" &&
							<ToggleControl
								label={ __( "Inherit Inner Width from Theme" ) }
								checked={ themeWidth }
								onChange={ ( value ) => setAttributes( { themeWidth: ! themeWidth } ) }
							/>
						}
						{
							contentWidth != "boxed" && ! themeWidth &&
							(
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
										<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ innerWidthType === "px" } aria-pressed={ innerWidthType === "px" } onClick={ () => setAttributes( { innerWidthType: "px" } ) }>{ "px" }</Button>
										<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ innerWidthType === "%" } aria-pressed={ innerWidthType === "%" } onClick={ () => setAttributes( { innerWidthType: "%" } ) }>{ "%" }</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Inner Width" ) }
										value={ innerWidth }
										min={ 0 }
										max={ 2000 }
										onChange={ ( value ) => setAttributes( { innerWidth: value } ) }
									/>
								</Fragment>
							)
						}
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
												<RangeControl
													label={ UAGB_Block_Icons.left_margin }
													className={ "uagb-margin-control" }
													value={ leftMarginMobile }
													onChange={ ( value ) => setAttributes( { leftMarginMobile: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.right_margin }
													className={ "uagb-margin-control" }
													value={ rightMarginMobile }
													onChange={ ( value ) => setAttributes( { rightMarginMobile: value } ) }
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
												<RangeControl
													label={ UAGB_Block_Icons.left_margin }
													className={ "uagb-margin-control" }
													value={ leftMarginTablet }
													onChange={ ( value ) => setAttributes( { leftMarginTablet: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.right_margin }
													className={ "uagb-margin-control" }
													value={ rightMarginTablet }
													onChange={ ( value ) => setAttributes( { rightMarginTablet: value } ) }
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
												<RangeControl
													label={ UAGB_Block_Icons.left_margin }
													className={ "uagb-margin-control" }
													value={ leftMargin }
													onChange={ ( value ) => setAttributes( { leftMargin: value } ) }
													min={ -2000 }
													max={ 2000 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.right_margin }
													className={ "uagb-margin-control" }
													value={ rightMargin }
													onChange={ ( value ) => setAttributes( { rightMargin: value } ) }
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
										<SelectControl
											label={ __( "Image Overlay Type" ) }
											value={ overlayType }
											onChange={ ( value ) => setAttributes( { overlayType: value } ) }
											options={ [
												{ value: "color", label: __( "Color" ) },
												{ value: "gradient", label: __( "Gradient" ) },
											] }
										/>
										{ overlayType == 'color' && <Fragment>
											<p className="uagb-setting-label">{ __( "Image Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
											<ColorPalette
												value={ backgroundImageColor }
												onChange={ ( colorValue ) => setAttributes( { backgroundImageColor: colorValue } ) }
												allowReset
											/>
											</Fragment>
										}

										{ "gradient" == overlayType &&
											( <Fragment>
												<p className="uagb-setting-label">{ __( "Color 1" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
												<ColorPalette
													value={ gradientOverlayColor1 }
													onChange={ ( colorValue ) => setAttributes( { gradientOverlayColor1: colorValue } ) }
													allowReset
												/>
												<RangeControl
													label={ __( "Location 1" ) }
													value={ gradientOverlayLocation1 }
													onChange={ ( value ) => setAttributes( { gradientOverlayLocation1: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<p className="uagb-setting-label">{ __( "Color 2" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
												<ColorPalette
													value={ gradientOverlayColor2 }
													onChange={ ( colorValue ) => setAttributes( { gradientOverlayColor2: colorValue } ) }
													allowReset
												/>
												<RangeControl
													label={ __( "Location 2" ) }
													value={ gradientOverlayLocation2 }
													onChange={ ( value ) => setAttributes( { gradientOverlayLocation2: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<SelectControl
													label={ __( "Type" ) }
													value={ gradientOverlayType }
													onChange={ ( value ) => setAttributes( { gradientOverlayType: value } ) }
													options={ [
														{ value: "linear", label: __( "Linear" ) },
														{ value: "radial", label: __( "Radial" ) },
													] }
												/>
												{ "linear" == gradientOverlayType && <RangeControl
														label={ __( "Angle" ) }
														value={ gradientOverlayAngle }
														onChange={ ( value ) => setAttributes( { gradientOverlayAngle: value } ) }
														min={ 0 }
														max={ 360 }
														allowReset
													/>
												}
												{ "radial" == gradientOverlayType && <SelectControl
														label={ __( "Type" ) }
														value={ gradientOverlayPosition }
														onChange={ ( value ) => setAttributes( { gradientOverlayPosition: value } ) }
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
											</Fragment> )
										}
									</Fragment> )
								}
							</Fragment> )
						}
						{ "gradient" == backgroundType &&
							( <Fragment>
								<GradientSettings attributes={ attributes }	setAttributes={ setAttributes }/>
							</Fragment> )
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
						"uagb-section__wrap",
						`uagb-section__background-${backgroundType}`,
						`uagb-section__edit-${ active }`,
						block_controls_class,
						`uagb-block-${this.props.clientId.substr( 0, 8 )}`
					) }
				>
					<div className="uagb-section__overlay"></div>
					{ "video" == backgroundType &&
						<div className="uagb-section__video-wrap">
							{  backgroundVideo &&
								<video autoplay loop muted playsinline>
									<source src={ backgroundVideo.url } type='video/mp4' />
								</video>
							}

						</div>
					}
					<div className="uagb-section__inner-wrap">
						<InnerBlocks templateLock={false} />
					</div>

				</CustomTag>
			</Fragment>
		)
	}
}

export default withNotices( UAGBSectionEdit )
