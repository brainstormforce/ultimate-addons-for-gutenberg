/**
 * BLOCK: Column - Edit
 */

import classnames from "classnames"
import UAGB_Block_Icons from "@Controls/block-icons"
import styling from "./styling"
import GradientSettings from "../../components/gradient-settings"
import Columnresponsive from "../../components/typography/column-responsive"

import { __ } from '@wordpress/i18n';

const {
	InnerBlocks,
	ColorPalette,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
	Dashicon
} = wp.components

const {
	Component,
	Fragment,
} = wp.element

const { withSelect } = wp.data

class UAGBColumnEdit extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-column-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-column-style-" + this.props.clientId.substr( 0, 8 ) )

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

	render() {

		const {
			attributes: {
				topPadding,
				bottomPadding,
				leftPadding,
				rightPadding,
				topMargin,
				bottomMargin,
				leftMargin,
				rightMargin,
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
				colWidth,
				colWidthTablet,
				colWidthMobile,
				backgroundType,
				backgroundImage,
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
				backgroundOpacity,
				backgroundImageColor,
				borderStyle,
				borderWidth,
				borderRadius,
				borderColor,
				align,
				alignMobile,
				alignTablet,
				overlayType,
				gradientOverlayColor1,
				gradientOverlayColor2,
				gradientOverlayType,
				gradientOverlayLocation1,
				gradientOverlayLocation2,
				gradientOverlayAngle,
				mobileMarginType,
				tabletMarginType,
				desktopMarginType,
				mobilePaddingType,
				tabletPaddingType,
				desktopPaddingType,
				gradientValue
			},
			setAttributes,
			className,
			isSelected,
			deviceType
		} = this.props

		const border_setting = (
			<Fragment>
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
						max={ 100 }
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
				</PanelBody>
			</Fragment>
		)

		const inspector_controls = (
			<Fragment>
				<PanelBody title={ __( "Layout", 'ultimate-addons-for-gutenberg' ) }>
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
											label={ __( "Content Width (%)", 'ultimate-addons-for-gutenberg' ) }
											value={ colWidthMobile }
											onChange={ ( value ) => {
												setAttributes( {
													colWidthMobile: value,
												} )
											} }
											min={ 0 }
											max={ 100 }
										/>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Content Width (%)", 'ultimate-addons-for-gutenberg' ) }
											value={ colWidthTablet }
											onChange={ ( value ) => {
												setAttributes( {
													colWidthTablet: value,
												} )
											} }
											min={ 0 }
											max={ 100 }
										/>
									)
								} else {
									tabout = (
										<RangeControl
											label={ __( "Content Width (%)", 'ultimate-addons-for-gutenberg' ) }
											value={ colWidth }
											onChange={ ( value ) => {
												setAttributes( {
													colWidth: value,
												} )
											} }
											min={ 0 }
											max={ 100 }
										/>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( "Spacing", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
				<Columnresponsive/>
					{ "Desktop" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "px" } aria-pressed={ desktopPaddingType === "px" } onClick={ () => setAttributes( { desktopPaddingType: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "%" } aria-pressed={ desktopPaddingType === "%" } onClick={ () => setAttributes( { desktopPaddingType: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", 'ultimate-addons-for-gutenberg' ) }</h2>
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
					)}
					{ "Tablet" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "px" } aria-pressed={ tabletPaddingType === "px" } onClick={ () => setAttributes( { tabletPaddingType: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "%" } aria-pressed={ tabletPaddingType === "%" } onClick={ () => setAttributes( { tabletPaddingType: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", 'ultimate-addons-for-gutenberg' ) }</h2>
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
					)}
					{ "Mobile" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "px" } aria-pressed={ mobilePaddingType === "px" } onClick={ () => setAttributes( { mobilePaddingType: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "%" } aria-pressed={ mobilePaddingType === "%" } onClick={ () => setAttributes( { mobilePaddingType: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", 'ultimate-addons-for-gutenberg' ) }</h2>
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
					)}
					<hr className="uagb-editor__separator" />
					<Columnresponsive/>
					{ "Desktop" === deviceType && (
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
					)}
					{ "Tablet" === deviceType && (
						<Fragment>
						<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
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
					)}
					{ "Mobile" === deviceType && (
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
					)}
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
							{ value: "image", label: __( "Image", 'ultimate-addons-for-gutenberg' ) }
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
											<Button isSecondary onClick={ open }>
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
										<SelectControl
											label={ __( "Image Overlay Type", 'ultimate-addons-for-gutenberg' ) }
											value={ overlayType }
											onChange={ ( value ) => setAttributes( { overlayType: value } ) }
											options={ [
												{ value: "color", label: __( "Color", 'ultimate-addons-for-gutenberg' ) },
												{ value: "gradient", label: __( "Gradient", 'ultimate-addons-for-gutenberg' ) },
											] }
										/>
										{ "color" == overlayType &&<Fragment>
												<p className="uagb-setting-label">{ __( "Image Overlay Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
												<ColorPalette
													value={ backgroundImageColor }
													onChange={ ( colorValue ) => setAttributes( { backgroundImageColor: colorValue } ) }
													allowReset
												/>
											</Fragment>
										}

										{ "gradient" == overlayType &&
											( <Fragment>
												<PanelColorSettings
													title={ __( "Color Settings", 'ultimate-addons-for-gutenberg' ) }
													colorSettings={ [
														{
															value: gradientOverlayColor2,
															onChange:( value ) => setAttributes( { gradientOverlayColor2: value } ),
															label: __( "Color 1", 'ultimate-addons-for-gutenberg' ),
														},
														{
															value: gradientOverlayColor1,
															onChange:( value ) => setAttributes( { gradientOverlayColor1: value } ),
															label: __( "Color 2", 'ultimate-addons-for-gutenberg' ),
														},
													] }
												>
												</PanelColorSettings>
												<SelectControl
													label={ __( "Type", 'ultimate-addons-for-gutenberg' ) }
													value={ gradientOverlayType }
													onChange={ ( value ) => setAttributes( { gradientOverlayType: value } ) }
													options={ [
														{ value: "linear", label: __( "Linear", 'ultimate-addons-for-gutenberg' ) },
														{ value: "radial", label: __( "Radial", 'ultimate-addons-for-gutenberg' ) },
													] }
												/>
												<RangeControl
													label={ __( "Location 1", 'ultimate-addons-for-gutenberg' ) }
													value={ gradientOverlayLocation1 }
													onChange={ ( value ) => setAttributes( { gradientOverlayLocation1: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ __( "Location 2", 'ultimate-addons-for-gutenberg' ) }
													value={ gradientOverlayLocation2 }
													onChange={ ( value ) => setAttributes( { gradientOverlayLocation2: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ __( "Angle", 'ultimate-addons-for-gutenberg' ) }
													value={ gradientOverlayAngle }
													onChange={ ( value ) => setAttributes( { gradientOverlayAngle: value } ) }
													min={ 0 }
													max={ 360 }
													allowReset
												/>
											</Fragment> )
										}
									</Fragment> )
								}
							</Fragment> )
					}
					{ "gradient" == backgroundType &&
							( <Fragment>
								<GradientSettings attributes={ this.props.attributes }	setAttributes={ setAttributes }/>
							</Fragment> )
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
				</PanelBody>
				{ border_setting }
			</Fragment>
		)

		let active = ( isSelected ) ? "active" : "not-active"

		let align_class = ( "center" == align ) ? "" : `uagb-column__align-${align}`
		let align_class_mobile = ( "" == alignMobile ) ? "" : `uagb-column__align-mobile-${alignMobile}`
		let align_class_tablet = ( "" == alignTablet ) ? "" : `uagb-column__align-tablet-${alignTablet}`

		return (
			<Fragment>
				<InspectorControls>
					{ inspector_controls }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						"uagb-column__wrap",
						`uagb-column__background-${backgroundType}`,
						`uagb-column__edit-${ active }`,
						align_class,
						align_class_mobile,
						align_class_tablet,
						`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
						`uagb-block-${this.props.clientId.substr( 0, 8 )}`
					) }
				>
					<div className="uagb-column__overlay"></div>
					<div className="uagb-column__inner-wrap">
						<InnerBlocks templateLock={ false } />
					</div>
				</div>
			</Fragment>
		)
	}
}
export default withSelect( ( select, props ) => {
	const { __experimentalGetPreviewDeviceType = null } = select( 'core/edit-post' );
	let deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType: deviceType,
	}
} )( UAGBColumnEdit )