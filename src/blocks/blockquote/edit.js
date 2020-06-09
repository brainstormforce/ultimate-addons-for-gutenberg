// Import block dependencies and components.
import classnames from "classnames"

// Import icon.
import TweetButtonCTA from "./components/TweetButtonCTA"
import Description from "./components/Description"
import AuthorText from "./components/AuthorText"
import AuthorImage from "./components/AuthorImage"
import styling from "./styling"
import map from "lodash/map"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
	MediaUpload
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	BaseControl,
	ToggleControl,
	Toolbar,
	Tooltip,
	TabPanel,
	ButtonGroup,
	Dashicon
} = wp.components

// Extend component
const { Component, Fragment } = wp.element

class UAGBBlockQuote extends Component {

	constructor() {
		super( ...arguments )
		this.onSelectImage    = this.onSelectImage.bind( this )
		this.onRemoveImage    = this.onRemoveImage.bind( this )
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props

		setAttributes( { authorImage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {

		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { authorImage: null } )
			return
		}

		if ( ! media.type || "image" != media.type ) {
			return
		}

		setAttributes( { authorImage: media } )
	}

	render() {

		const { className, setAttributes, attributes } = this.props

		// Setup the attributes.
		const {
			skinStyle,
			align,
			authorColor,
			descColor,
			descFontSize,
			descFontSizeType,
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
			authorFontSize,
			authorFontSizeType,
			authorFontSizeTablet,
			authorFontSizeMobile,
			authorFontFamily,
			authorFontWeight,
			authorFontSubset,
			authorLineHeightType,
			authorLineHeight,
			authorLineHeightTablet,
			authorLineHeightMobile,
			authorLoadGoogleFonts,
			descSpace,
			authorSpace,
			stack,
			borderColor,
			borderStyle,
			borderWidth,
			borderGap,
			verticalPadding,
			quoteColor,
			quoteBgColor,
			quoteSize,
			quoteSizeType,
			quoteSizeTablet,
			quoteSizeMobile,
			quotePadding,
			quotePaddingType,
			quotePaddingTablet,
			quotePaddingMobile,
			quoteBorderRadius,
			quoteStyle,
			enableTweet,
			tweetLinkColor,
			tweetBtnColor,
			tweetBtnHoverColor,
			tweetBtnBgColor,
			tweetBtnBgHoverColor,
			tweetBtnFontSize,
			tweetBtnFontSizeType,
			tweetBtnFontSizeTablet,
			tweetBtnFontSizeMobile,
			tweetBtnFontFamily,
			tweetBtnFontWeight,
			tweetBtnFontSubset,
			tweetBtnLineHeightType,
			tweetBtnLineHeight,
			tweetBtnLineHeightTablet,
			tweetBtnLineHeightMobile,
			tweetBtnLoadGoogleFonts,
			tweetBtnHrPadding,
			tweetBtnVrPadding,
			tweetIconSpacing,
			iconView,
			iconSkin,
			iconLabel,
			iconShareVia,
			iconTargetUrl,
			customUrl,
			authorImage,
			authorImageWidth,
			authorImageSize,
			authorImgBorderRadius,
			authorImgPosition,
			quoteTopMargin,
			quoteBottomMargin,
			quoteLeftMargin,
			quoteRightMargin,
			quoteHoverColor,
			quoteBgHoverColor,
			borderHoverColor,
		} = attributes

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

		let loadDescGoogleFonts
		let loadAuthorGoogleFonts
		let loadTweetGoogleFonts

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

		if( authorLoadGoogleFonts == true ) {
					
			const authorconfig = {
				google: {
					families: [ authorFontFamily + ( authorFontWeight ? ":" + authorFontWeight : "" ) ],
				},
			}

			loadAuthorGoogleFonts = (
				<WebfontLoader config={ authorconfig }>
				</WebfontLoader>
			)
		}

		if( tweetBtnLoadGoogleFonts == true ) {
					
			const tweetBtnconfig = {
				google: {
					families: [ tweetBtnFontFamily + ( tweetBtnFontWeight ? ":" + tweetBtnFontWeight : "" ) ],
				},
			}

			loadTweetGoogleFonts = (
				<WebfontLoader config={ tweetBtnconfig }>
				</WebfontLoader>
			)
		}

		const quoteSizeTypeControls = (
			<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
				{ map( sizeTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="uagb-size-btn"
						isSmall
						isPrimary={ quoteSizeType === key }
						aria-pressed={ quoteSizeType === key }
						onClick={ () => setAttributes( { quoteSizeType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		)

		const quotePaddingControls = (
			<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
				{ map( sizeTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="uagb-size-btn"
						isSmall
						isPrimary={ quotePaddingType === key }
						aria-pressed={ quotePaddingType === key }
						onClick={ () => setAttributes( { quotePaddingType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		)

		let image_name = __( "Select Image" )
		if(authorImage){
			if(authorImage.url == null || authorImage.url == "" ){
				image_name = __( "Select Image" )
			}else{
				image_name = __( "Replace Image" )
			}
		}

		// Image sizes.
		const imageSizeOptions = [
			{ value: "thumbnail", label: __( "Thumbnail" ) },
			{ value: "medium", label: __( "Medium" ) },
			{ value: "full", label: __( "Large" ) }
		]

		const border_settings =(
			<Fragment>
				<h2>{ __( "Modern Layout - Styling" ) }</h2>
				<SelectControl
					label={ __( "Quote Border Style" ) }
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
				{ "none" != borderStyle && <RangeControl
					label={ __( "Thickness (px)" ) }
					value={ borderWidth }
					onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				 }
			</Fragment>
		)

		const quote_settings = (
			<Fragment>
				<h2>{ __( "Quotation Layout - Styling" ) }</h2>
				<TabPanel className="uagb-size-type-field-tabs" activeClass="active-tab"
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
										{quoteSizeTypeControls}
										<RangeControl
											label={ __( "Quote Icon Size" ) }
											value={ quoteSizeMobile }
											onChange={ ( value ) => setAttributes( { quoteSizeMobile: value } ) }
											min={ 0 }
											max={ 500 }
											beforeIcon="editor-textcolor"
											allowReset
											initialPosition={30}
										/>
									</Fragment>
								)
							} else if ( "tablet" === tab.name ) {
								tabout = (
									<Fragment>
										{quoteSizeTypeControls}
										<RangeControl
											label={ __( "Quote Icon Size" ) }
											value={ quoteSizeTablet }
											onChange={ ( value ) => setAttributes( { quoteSizeTablet: value } ) }
											min={ 0 }
											max={ 500 }
											beforeIcon="editor-textcolor"
											allowReset
											initialPosition={30}
										/>
									</Fragment>
								)
							} else {
								tabout = (
									<Fragment>
										{quoteSizeTypeControls}
										<RangeControl
											label={ __( "Quote Icon Size" ) }
											value={ quoteSize }
											onChange={ ( value ) => setAttributes( { quoteSize: value } ) }
											min={ 0 }
											max={ 500 }
											beforeIcon="editor-textcolor"
											allowReset
											initialPosition={30}
										/>
									</Fragment>
								)
							}

							return <div>{ tabout }</div>
						}
					}
				</TabPanel>	
				<TabPanel className="uagb-size-type-field-tabs" activeClass="active-tab"
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
										{quotePaddingControls}
										<RangeControl
											label={ __( "Background Size" ) }
											value={ quotePaddingMobile }
											onChange={ ( value ) => setAttributes( { quotePaddingMobile: value } ) }
											min={ 0 }
											max={ 500 }
											beforeIcon="editor-textcolor"
											allowReset
											initialPosition={30}
										/>
									</Fragment>
								)
							} else if ( "tablet" === tab.name ) {
								tabout = (
									<Fragment>
										{quotePaddingControls}
										<RangeControl
											label={ __( "Background Size" ) }
											value={ quotePaddingTablet }
											onChange={ ( value ) => setAttributes( { quotePaddingTablet: value } ) }
											min={ 0 }
											max={ 500 }
											beforeIcon="editor-textcolor"
											allowReset
											initialPosition={30}
										/>
									</Fragment>
								)
							} else {
								tabout = (
									<Fragment>
										{quotePaddingControls}
										<RangeControl
											label={ __( "Background Size" ) }
											value={ quotePadding }
											onChange={ ( value ) => setAttributes( { quotePadding: value } ) }
											min={ 0 }
											max={ 500 }
											beforeIcon="editor-textcolor"
											allowReset
											initialPosition={30}
										/>
									</Fragment>
								)
							}

							return <div>{ tabout }</div>
						}
					}
				</TabPanel>
				{ quoteBgColor &&
					<RangeControl
						label={ __( "Quote Icon Border Radius (%)" ) }
						value={ quoteBorderRadius }
						onChange={ ( value ) => setAttributes( { quoteBorderRadius: value } ) }
						min={ 0 }
						max={ 100 }
						allowReset
					/>
				}
			</Fragment>
		)

		const skin_settings =(
			<PanelBody	title={ __( "Layout" ) } >
				<SelectControl
					label={ __( "Layout" ) }
					options={[
						{ value: "border", label: __( "Modern" ) },
						{ value: "quotation", label: __( "Quotation" ) },
					] }
					value={ skinStyle }
					onChange={ ( value ) => setAttributes( { skinStyle: value } ) }
				/>
				<hr className="uagb-editor__separator" />
				{ skinStyle === "border" && border_settings	}
				{ skinStyle === "quotation" && quote_settings }
				{ skinStyle === "quotation" && <Fragment><hr className="uagb-editor__separator" /><h2>{ __( "Quote Icon Colors" ) }</h2></Fragment> }
				{ "none" != borderStyle &&
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal" ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover" ),
								className: "uagb-hover-tab",
							},
						] }>
						{
							( tabName ) => {
								let tabout
								if( "hover" === tabName.name ) {
									tabout = hoverSettings
								}else {
									tabout = colorSettings
								}
								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				}
				<hr className="uagb-editor__separator" />
				<SelectControl
					label={ __( "Stack on" ) }
					value={ stack }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "tablet", label: __( "Tablet" ) },
						{ value: "mobile", label: __( "Mobile" ) },
					] }
					help={ __( "Note: Choose on what breakpoint the elements will stack." ) }
					onChange={ ( value ) => setAttributes( { stack: value } ) }
				/>
			</PanelBody>
		)

		// Image controls.
		const imageControls = (
			<Fragment>
				<hr className="uagb-editor__separator" />
				<BaseControl className="editor-bg-image-control" label={ __( "Author Image" ) } >
					<MediaUpload
						title={ __( "Select Image" ) }
						onSelect={ this.onSelectImage }
						allowedTypes= { [ "image" ] }
						value={ authorImage }
						render={ ( { open } ) => (
							<Button isDefault onClick={ open }>
								{ image_name }
							</Button>
						) }
					/>
					{ ( authorImage && authorImage.url !=="null" && authorImage.url !== "" ) &&
						<Button className="uagb-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
							{ __( "Remove Image" ) }
						</Button>
					}
				</BaseControl>
				{ ( authorImage && authorImage.url !=="null" && authorImage.url !== "" ) &&
					<Fragment>
						<SelectControl
							label={ __( "Author Image Position" ) }
							value={ authorImgPosition }
							onChange={ ( value ) => setAttributes( { authorImgPosition: value } ) }
							options={ [
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
								{ value: "top", label: __( "Top" ) },
							] }
						/>
						<SelectControl
							label={ __( "Author Image Size" ) }
							options={ imageSizeOptions }
							value={ authorImageSize }
							onChange={ ( value ) => setAttributes( { authorImageSize: value } ) }
						/>
						<RangeControl
							label={ __( "Author Image Width" ) }
							value={ authorImageWidth }
							onChange={ ( value ) => setAttributes( { authorImageWidth: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
						/>
						<RangeControl
							label = { __( "Author Image Rounded Corners" ) }
							value = { authorImgBorderRadius }
							onChange = { ( value ) => setAttributes( { authorImgBorderRadius: value } ) }
							min = { 0 }
							max = { 100 }
							beforeIcon = ""
							allowReset
						/>
					</Fragment>
				}
			</Fragment>
		)

		const colorSettings = (
			<Fragment>
				{ "none" != borderStyle && skinStyle == "border" && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
					<ColorPalette
						value={ borderColor }
						onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}

				{ skinStyle == "quotation" && <Fragment>
					<p className="uagb-setting-label">{ __( "Icon Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: quoteColor }} ></span></span></p>
					<ColorPalette
						value={ quoteColor }
						onChange={ ( colorValue ) => setAttributes( { quoteColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Icon Background Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: quoteBgColor }} ></span></span></p>
					<ColorPalette
						value={ quoteBgColor }
						onChange={ ( colorValue ) => setAttributes( { quoteBgColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}
			</Fragment>
		)

		const hoverSettings = (
			<Fragment>
				{ skinStyle == "border" && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Hover Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: borderHoverColor }} ></span></span></p>
					<ColorPalette
						value={ borderHoverColor }
						onChange={ ( colorValue ) => setAttributes( { borderHoverColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}
				{ skinStyle == "quotation" && <Fragment>
					<p className="uagb-setting-label">{ __( "Hover Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: quoteHoverColor }} ></span></span></p>
					<ColorPalette
						value={ quoteHoverColor }
						onChange={ ( colorValue ) => setAttributes( { quoteHoverColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Background Hover Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: quoteBgHoverColor }} ></span></span></p>
					<ColorPalette
						value={ quoteBgHoverColor }
						onChange={ ( colorValue ) => setAttributes( { quoteBgHoverColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}
			</Fragment>
		)

		const Typography =(
			<Fragment>
				<PanelBody title={ __( "Content" ) } initialOpen={ false }>
					<h2>{ __( "Quote" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: descLoadGoogleFonts, label: 'descLoadGoogleFonts' } }
						fontFamily = { { value: descFontFamily, label: 'descFontFamily' } }
						fontWeight = { { value: descFontWeight, label: 'descFontWeight' } }
						fontSubset = { { value: descFontSubset, label: 'descFontSubset' } }
						fontSizeType = { { value: descFontSizeType, label: 'descFontSizeType' } }
						fontSize = { { value: descFontSize, label: 'descFontSize' } }
						fontSizeMobile = { { value: descFontSizeMobile, label: 'descFontSizeMobile' } }
						fontSizeTablet= { { value: descFontSizeTablet, label: 'descFontSizeTablet' } }
						lineHeightType = { { value: descLineHeightType, label: 'descLineHeightType' } }
						lineHeight = { { value: descLineHeight, label: 'descLineHeight' } }
						lineHeightMobile = { { value: descLineHeightMobile, label: 'descLineHeightMobile' } }
						lineHeightTablet= { { value: descLineHeightTablet, label: 'descLineHeightTablet' } }
					/>
					<p className="uagb-setting-label">{ __( "Quote Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: descColor }} ></span></span></p>
					<ColorPalette
						value={ descColor }
						onChange={ ( colorValue ) => setAttributes( { descColor: colorValue } ) }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Author" ) }</h2>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: authorLoadGoogleFonts, label: 'authorLoadGoogleFonts' } }
						fontFamily = { { value: authorFontFamily, label: 'authorFontFamily' } }
						fontWeight = { { value: authorFontWeight, label: 'authorFontWeight' } }
						fontSubset = { { value: authorFontSubset, label: 'authorFontSubset' } }
						fontSizeType = { { value: authorFontSizeType, label: 'authorFontSizeType' } }
						fontSize = { { value: authorFontSize, label: 'authorFontSize' } }
						fontSizeMobile = { { value: authorFontSizeMobile, label: 'authorFontSizeMobile' } }
						fontSizeTablet= { { value: authorFontSizeTablet, label: 'authorFontSizeTablet' } }
						lineHeightType = { { value: authorLineHeightType, label: 'authorLineHeightType' } }
						lineHeight = { { value: authorLineHeight, label: 'authorLineHeight' } }
						lineHeightMobile = { { value: authorLineHeightMobile, label: 'authorLineHeightMobile' } }
						lineHeightTablet= { { value: authorLineHeightTablet, label: 'authorLineHeightTablet' } }
					/>
					<p className="uagb-setting-label">{ __( "Author Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: authorColor }} ></span></span></p>
					<ColorPalette
						value={ authorColor }
						onChange={ ( colorValue ) => setAttributes( { authorColor: colorValue } ) }
						allowReset
					/>

					{ imageControls }

				</PanelBody>
			</Fragment>
		)

		const tweet_normal = (
			<Fragment>
				{ iconSkin == "link" && <Fragment>
					<p className="uagb-setting-label">{ __( "Tweet Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: tweetLinkColor }} ></span></span></p>
					    <ColorPalette
					        value={ tweetLinkColor }
					        onChange={ ( colorValue ) => setAttributes( { tweetLinkColor: colorValue } ) }
					        allowReset
					    />
					  </Fragment>
				}
				{ ( iconSkin !== "link" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Tweet Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: tweetBtnColor }} ></span></span></p>
					    <ColorPalette
					        value={ tweetBtnColor }
					        onChange={ ( colorValue ) => setAttributes( { tweetBtnColor: colorValue } ) }
					        allowReset
					    />

					    <p className="uagb-setting-label">{ __( "Tweet Background Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: tweetBtnBgColor }} ></span></span></p>
					    <ColorPalette
					        value={ tweetBtnBgColor }
					        onChange={ ( colorValue ) => setAttributes( { tweetBtnBgColor: colorValue } ) }
					        allowReset
					    />
				</Fragment>
				}
			</Fragment>
		)

		const tweet_hover = (
			<Fragment>
				{ iconSkin == "link" && <Fragment>
					    <p className="uagb-setting-label">{ __( "Tweet Hover Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: tweetBtnHoverColor }} ></span></span></p>
					    <ColorPalette
					        value={ tweetBtnHoverColor }
					        onChange={ ( colorValue ) => setAttributes( { tweetBtnHoverColor: colorValue } ) }
					        allowReset
					    />

					  </Fragment>
				}
				{ ( iconSkin !== "link" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Tweet Hover Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: tweetBtnHoverColor }} ></span></span></p>
					    <ColorPalette
					        value={ tweetBtnHoverColor }
					        onChange={ ( colorValue ) => setAttributes( { tweetBtnHoverColor: colorValue } ) }
					        allowReset
					    />

					    <p className="uagb-setting-label">{ __( "Tweet Background Hover Color" ) }
						<span className="components-base-control__label">
							<span className="component-color-indicator" style={{ backgroundColor: tweetBtnBgHoverColor }} ></span></span></p>
					    <ColorPalette
					        value={ tweetBtnBgHoverColor }
					        onChange={ ( colorValue ) => setAttributes( { tweetBtnBgHoverColor: colorValue } ) }
					        allowReset
					    />
				</Fragment>
				}
			</Fragment>
		)

		const spacing_settings =(
			<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
				{ skinStyle === "quotation" && <Fragment>
					<h2>{ __( "Quote Icon Margin (px)" ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.top_margin }
						className={ "uagb-margin-control" }
						value={ quoteTopMargin }
						onChange={ ( value ) => setAttributes( { quoteTopMargin: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.bottom_margin }
						className={ "uagb-margin-control" }
						value={ quoteBottomMargin }
						onChange={ ( value ) => setAttributes( { quoteBottomMargin: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.left_margin }
						className={ "uagb-margin-control" }
						value={ quoteLeftMargin }
						onChange={ ( value ) => setAttributes( { quoteLeftMargin: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.right_margin }
						className={ "uagb-margin-control" }
						value={ quoteRightMargin }
						onChange={ ( value ) => setAttributes( { quoteRightMargin: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
				</Fragment>
				}
				{ skinStyle === "border" &&
					<RangeControl
						label={ __( "Gap Between Border and Quote" ) }
						value={ borderGap }
						onChange={ ( value ) => setAttributes( { borderGap: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
				}
				<RangeControl
					label={ __( "Quote Bottom Spacing" ) }
					value={ descSpace }
					onChange={ ( value ) => setAttributes( { descSpace: value } ) }
					min={ 0 }
					max={ 200 }
					allowReset
					initialPosition={0}
				/>
				{ align == "center" && skinStyle !== "border" && <RangeControl
					label={ __( "Author Bottom Spacing" ) }
					value={ authorSpace }
					onChange={ ( value ) => setAttributes( { authorSpace: value } ) }
					min={ 0 }
					max={ 200 }
					allowReset
					initialPosition={0}
				/>
				}
				
				{ skinStyle === "border"  && <Fragment>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Vertical Padding" ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ "uagb-margin-control" }
						value={ verticalPadding }
						onChange={ ( value ) => setAttributes( { verticalPadding: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
				</Fragment>
				}
			</PanelBody>
		)

		const twitter_settings =(
			<PanelBody title={ __( "Twitter Icon" ) } initialOpen={ false }>
				<ToggleControl
					label={ __( "Enable Twitter Icon" ) }
					checked={ enableTweet }
					onChange={ ( value ) => setAttributes( { enableTweet: ! enableTweet } ) }
				/>
				{ enableTweet && <Fragment>
					<SelectControl
						label={ __( "Icon View" ) }
						value={ iconView }
						onChange={ ( value ) => setAttributes( { iconView: value } ) }
						options={ [
							{ value: "icon_text", label: __( "Icon & Text" ) },
							{ value: "icon", label: __( "Icon" ) },
							{ value: "text", label: __( "Text" ) },
						] }
					/>
					<SelectControl
						label={ __( "Icon Style" ) }
						value={ iconSkin }
						onChange={ ( value ) => setAttributes( { iconSkin: value } ) }
						options={ [
							{ value: "classic", label: __( "Classic" ) },
							{ value: "bubble", label: __( "Bubble" ) },
							{ value: "link", label: __( "Link" ) },
						] }
					/>
				</Fragment>}
				{ enableTweet && iconView !== "icon" && <Fragment>
					<hr className="uagb-editor__separator" />
					<TextControl
						label= { __( "Label" ) }
						value= { iconLabel }
						onChange={ value => setAttributes( { iconLabel: value } ) }
					/>

				</Fragment>
				}
				
				{ enableTweet && <Fragment>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: tweetBtnLoadGoogleFonts, label: 'tweetBtnLoadGoogleFonts' } }
						fontFamily = { { value: tweetBtnFontFamily, label: 'tweetBtnFontFamily' } }
						fontWeight = { { value: tweetBtnFontWeight, label: 'tweetBtnFontWeight' } }
						fontSubset = { { value: tweetBtnFontSubset, label: 'tweetBtnFontSubset' } }
						fontSizeType = { { value: tweetBtnFontSizeType, label: 'tweetBtnFontSizeType' } }
						fontSize = { { value: tweetBtnFontSize, label: 'tweetBtnFontSize' } }
						fontSizeMobile = { { value: tweetBtnFontSizeMobile, label: 'tweetBtnFontSizeMobile' } }
						fontSizeTablet= { { value: tweetBtnFontSizeTablet, label: 'tweetBtnFontSizeTablet' } }
						lineHeightType = { { value: tweetBtnLineHeightType, label: 'tweetBtnLineHeightType' } }
						lineHeight = { { value: tweetBtnLineHeight, label: 'tweetBtnLineHeight' } }
						lineHeightMobile = { { value: tweetBtnLineHeightMobile, label: 'tweetBtnLineHeightMobile' } }
						lineHeightTablet= { { value: tweetBtnLineHeightTablet, label: 'tweetBtnLineHeightTablet' } }
					/>
					<SelectControl
						label={ __( "Target URL" ) }
						value={ iconTargetUrl }
						onChange={ ( value ) => setAttributes( { iconTargetUrl: value } ) }
						options={ [
							{ value: "current", label: __( "Current Page" ) },
							{ value: "custom", label: __( "Custom URL" ) },
						] }
					/>
					{ iconTargetUrl == "custom" && <TextControl
						label= { __( "URL" ) }
						value= { customUrl }
						onChange={ value => setAttributes( { customUrl: value } ) }
					/>
					}
				</Fragment>
				}
				{ enableTweet && iconSkin !== "link" && <Fragment>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Button Padding (px)" ) }</h2> 
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ "uagb-margin-control" }
						value={ tweetBtnVrPadding }
						onChange={ ( value ) => setAttributes( { tweetBtnVrPadding: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
						initialPosition={5}
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ "uagb-margin-control" }
						value={ tweetBtnHrPadding }
						onChange={ ( value ) => setAttributes( { tweetBtnHrPadding: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
						initialPosition={5}
					/>														
				</Fragment>
				}
				{ (enableTweet && iconView == "icon_text") && <Fragment>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __( "Space between Tweet Icon and Text" ) }
						value={ tweetIconSpacing }
						onChange={ ( value ) => setAttributes( { tweetIconSpacing: value } ) }
						min={ 0 }
						max={ 20 }
						allowReset
						initialPosition={5}
					/>
				</Fragment>
				}
				{ enableTweet && <Fragment>
					<hr className="uagb-editor__separator" />
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal" ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover" ),
								className: "uagb-hover-tab",
							},
						] }>
						{
							( tabName ) => {
								let tweet_tab_output
								if( "hover" === tabName.name ) {
									tweet_tab_output = tweet_hover
								}else {
									tweet_tab_output = tweet_normal
								}
								return <div>{ tweet_tab_output }</div>
							}
						}
					</TabPanel>
				</Fragment>
				}
			</PanelBody>
		)

		return (
			<Fragment>
				<BlockControls key='controls'>
					{  ( skinStyle !== "border" )  && <AlignmentToolbar
						value={ align }
						onChange={ ( value ) => setAttributes( { align: value } ) }
					/>
					}
					{ skinStyle === "quotation" && <Fragment>
						<Toolbar>
							<Tooltip text={ __( "Normal Quote" ) }>
								<Button
									className={ classnames(
										"components-icon-button",
										"components-toolbar__control",
										{ "is-active": quoteStyle === "style_1" },
									) }
									onClick={ () => setAttributes( { quoteStyle: "style_1" } ) }
								>
									{ UAGB_Block_Icons.quote_1 }
								</Button>
							</Tooltip>
						</Toolbar>

						<Toolbar>
							<Tooltip text={ __( "Inline Quote" ) }>
								<Button
									className={ classnames(
										"components-icon-button",
										"components-toolbar__control",
										{ "is-active": quoteStyle === "style_2" },
									) }
									onClick={ () => setAttributes( { quoteStyle: "style_2" } ) }
								>
									{ UAGB_Block_Icons.quote_2 }
								</Button>
							</Tooltip>
						</Toolbar>
					</Fragment>
					}

					{ enableTweet &&
						<Fragment>
							<Toolbar>
								<label
									aria-label={ __( "Twitter Username" ) }
									className={ `${ className }__via-label` }
									htmlFor={ `${ className }__via` }
								>	{ UAGB_Block_Icons.at_the_rate }
								</label>
								<input
									aria-label={ __( "Twitter Username" ) }
									className={ `${ className }__via` }
									id={ `${ className }__via` }
									onChange={ ( event ) => setAttributes( { iconShareVia: event.target.value } ) }
									placeholder={ __( "Username" ) }
									type="text"
									value={ iconShareVia }
								/>
							</Toolbar>
						</Fragment>
					}

				</BlockControls>
				<InspectorControls>
					{ skin_settings }
					{ Typography }
					{ twitter_settings }
					{ spacing_settings }
				</InspectorControls>
				<div
					className = { classnames(
						className,
						"uagb-blockquote__outer-wrap",
						`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }>
					<div className = { classnames(
						"uagb-blockquote__wrap",
						`uagb-blockquote__skin-${skinStyle}`,
						( skinStyle !== "border" ) ? `uagb-blockquote__align-${align}` : "",
						( skinStyle === "quotation" ) ? `uagb-blockquote__style-${quoteStyle}` : "",
						( enableTweet ) ? `uagb-blockquote__with-tweet uagb-blockquote__tweet-style-${iconSkin} uagb-blockquote__tweet-${iconView}` : "",
						`uagb-blockquote__stack-img-${stack}`
					) } >

						<blockquote className="uagb-blockquote">
							{ skinStyle === "quotation" && <div className="uagb-blockquote__icon-wrap"><span className="uagb-blockquote__icon">
								{ UAGB_Block_Icons.quote_inline_icon }
							</span>	</div> }

							<div className="uagb-blockquote__content-wrap">
						   	{ <Description attributes={attributes} setAttributes = { setAttributes } props = { this.props }  /> }

					   <footer>
					   		<div className={ classnames(
										"uagb-blockquote__author-wrap",
										( authorImage !== "" ) ? `uagb-blockquote__author-at-${authorImgPosition}` : "",
									) }	>
					      		{ <AuthorImage attributes={attributes} /> }
					      		{ <AuthorText attributes={attributes} setAttributes = { setAttributes } props = { this.props } /> }
									</div>
					      	{ enableTweet &&  <TweetButtonCTA attributes={attributes} /> }
					   </footer>
							</div>
						</blockquote>
					</div>
				</div>

				{ loadDescGoogleFonts }
				{ loadAuthorGoogleFonts }
				{ loadTweetGoogleFonts }
			</Fragment>
		)
	}

	componentDidUpdate(prevProps, prevState) {
		var element = document.getElementById( "uagb-blockquote-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Assigning block_id in the attribute.
		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-blockquote-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}
}

export default UAGBBlockQuote
