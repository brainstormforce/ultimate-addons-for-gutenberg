/**
 * External dependencies
 */

import map from "lodash/map"
import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../../components/typography/fontloader"

// Import Post Components
import Blog from "./blog"
import styling from ".././styling"

const { Component, Fragment } = wp.element
const { __ } = wp.i18n
const MAX_POSTS_COLUMNS = 8
const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl,
	TabPanel,
	Dashicon,
	TextControl
} = wp.components

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	ColorPalette
} = wp.blockEditor

const { withSelect } = wp.data

class UAGBPostGrid extends Component {

	constructor() {
		super( ...arguments )
		this.onSelectPostType = this.onSelectPostType.bind( this )
		this.onSelectTaxonomyType = this.onSelectTaxonomyType.bind( this )
		this.onSelectPagination = this.onSelectPagination.bind( this )
		this.onChangePostsPerPage = this.onChangePostsPerPage.bind( this )
		this.onChangePageLimit = this.onChangePageLimit.bind( this )
		this.onChangePrevText = this.onChangePrevText.bind( this )
		this.onChangeNextText = this.onChangeNextText.bind( this )
	}

	onSelectPostType( value ) {
		const { setAttributes } = this.props

		setAttributes( { postType: value } )
		setAttributes( { categories: "" } )
	}

	onSelectTaxonomyType( value ) {
		const { setAttributes } = this.props

		setAttributes( { taxonomyType: value } )
		setAttributes( { categories: "" } )
	}

	onSelectPagination( value ) {
		const { setAttributes } = this.props

		setAttributes( { postPagination: value } )
		setAttributes( { paginationMarkup: "empty" } )
	}
	onChangePostsPerPage( value ) {
		const { setAttributes } = this.props

		setAttributes( { postsToShow: value } )
		setAttributes( { paginationMarkup: "empty" } )
	}
	onChangePageLimit( value ) {
		const { setAttributes } = this.props

		setAttributes( { pageLimit: value } )
		setAttributes( { paginationMarkup: "empty" } )
	}
	onChangePrevText( value ) {
		const { setAttributes } = this.props

		setAttributes( { paginationPrevText: value } )
		setAttributes( { paginationMarkup: "empty" } )
	}
	onChangeNextText( value ) {
		const { setAttributes } = this.props

		setAttributes( { paginationNextText: value } )
		setAttributes( { paginationMarkup: "empty" } )
	}


	componentDidMount() {

		this.props.setAttributes( { block_id: this.props.clientId } )

		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-post-grid-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	render() {

		// Caching all Props.
		const {
			attributes,
			setAttributes,
			latestPosts,
			categoriesList,
			taxonomyList
		} = this.props

		// Caching all attributes.
		const {
			block_id,
			displayPostTitle,
			displayPostDate,
			displayPostComment,
			displayPostExcerpt,
			displayPostAuthor,
			displayPostImage,
			displayPostTaxonomy,
			imgSize,
			imgPosition,
			displayPostLink,
			newTab,
			ctaText,
			borderWidth,
			borderStyle,
			borderColor,
			borderHColor,
			borderRadius,
			btnVPadding,
			btnHPadding,
			align,
			columns,
			tcolumns,
			mcolumns,
			order,
			orderBy,
			categories,
			postsToShow,
			rowGap,
			columnGap,
			bgColor,
			contentPadding,
			contentPaddingMobile,
			titleColor,
			titleTag,
			titleFontSize,
			titleFontSizeType,
			titleFontSizeMobile,
			titleFontSizeTablet,
			titleFontFamily,
			titleFontWeight,
			titleFontSubset,
			titleLineHeightType,
			titleLineHeight,
			titleLineHeightTablet,
			titleLineHeightMobile,
			titleLoadGoogleFonts,
			metaFontSize,
			metaFontSizeType,
			metaFontSizeMobile,
			metaFontSizeTablet,
			metaFontFamily,
			metaFontWeight,
			metaFontSubset,
			metaLineHeightType,
			metaLineHeight,
			metaLineHeightTablet,
			metaLineHeightMobile,
			metaLoadGoogleFonts,
			excerptFontSize,
			excerptFontSizeType,
			excerptFontSizeTablet,
			excerptFontSizeMobile,
			excerptFontFamily,
			excerptFontWeight,
			excerptFontSubset,
			excerptLineHeightType,
			excerptLineHeight,
			excerptLineHeightTablet,
			excerptLineHeightMobile,
			excerptLoadGoogleFonts,
			ctaFontSize,
			ctaFontSizeType,
			ctaFontSizeTablet,
			ctaFontSizeMobile,
			ctaFontFamily,
			ctaFontWeight,
			ctaFontSubset,
			ctaLineHeightType,
			ctaLineHeight,
			ctaLineHeightTablet,
			ctaLineHeightMobile,
			ctaLoadGoogleFonts,
			metaColor,
			excerptColor,
			ctaColor,
			ctaBgColor,
			ctaHColor,
			ctaBgHColor,
			titleBottomSpace,
			metaBottomSpace,
			excerptBottomSpace,
			equalHeight,
			excerptLength,
			overlayOpacity,
			bgOverlayColor,
			linkBox,
			postType,
			taxonomyType,
			postPagination,
			pageLimit,
			paginationColor,
			paginationBgColor,
			paginationActiveColor,
			paginationBgActiveColor,
			paginationLayout,
			paginationBorderSize,
			paginationBorderRadius,
			paginationBorderColor,
			paginationBorderActiveColor,
			paginationSpacing,
			paginationAlignment,
			paginationPrevText,
			paginationNextText,
		} = attributes

		const hoverSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaHColor }} ></span></span></p>
				<ColorPalette
					value={ ctaHColor }
					onChange={ ( colorValue ) => setAttributes( { ctaHColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgHColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgHColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgHColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderHColor }} ></span></span></p>
				<ColorPalette
					value={ borderHColor }
					onChange={ ( colorValue ) => setAttributes( { borderHColor: colorValue } ) }
					allowReset
				/>
			</Fragment>
		)

		const normalSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaColor }} ></span></span></p>
				<ColorPalette
					value={ ctaColor }
					onChange={ ( colorValue ) => setAttributes( { ctaColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
				<ColorPalette
					value={ borderColor }
					onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
					allowReset
				/>
			</Fragment>
		)

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

		let loadTitleGoogleFonts
		let loadMetaGoogleFonts
		let loadExcerptGoogleFonts
		let loadCtaGoogleFonts

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

		if( metaLoadGoogleFonts == true ) {

			const metaconfig = {
				google: {
					families: [ metaFontFamily + ( metaFontWeight ? ":" + metaFontWeight : "" ) ],
				},
			}

			loadMetaGoogleFonts = (
				<WebfontLoader config={ metaconfig }>
				</WebfontLoader>
			)
		}

		if( excerptLoadGoogleFonts == true ) {

			const excerptconfig = {
				google: {
					families: [ excerptFontFamily + ( excerptFontWeight ? ":" + excerptFontWeight : "" ) ],
				},
			}

			loadExcerptGoogleFonts = (
				<WebfontLoader config={ excerptconfig }>
				</WebfontLoader>
			)
		}

		if( ctaLoadGoogleFonts == true ) {

			const ctaconfig = {
				google: {
					families: [ ctaFontFamily + ( ctaFontWeight ? ":" + ctaFontWeight : "" ) ],
				},
			}

			loadCtaGoogleFonts = (
				<WebfontLoader config={ ctaconfig }>
				</WebfontLoader>
			)
		}


		let taxonomyListOptions = [
			{ value: "", label: __( "Select Taxonomy" ) }
		]

		let categoryListOptions = [
			{ value: "", label: __( "All" ) }
		]

		if ( "" != taxonomyList ) {
			Object.keys( taxonomyList ).map( ( item, thisIndex ) => {
				return taxonomyListOptions.push( { value : taxonomyList[item]["name"], label: taxonomyList[item]["label"] } )
			} )
		}

		if ( "" != categoriesList ) {
			Object.keys( categoriesList ).map( ( item, thisIndex ) => {
				return categoryListOptions.push( { value : categoriesList[item]["id"], label: categoriesList[item]["name"] } )
			} )
		}

		// All Controls.
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( "General" ) }>
					<SelectControl
						label={ __( "Post Type" ) }
						value={ postType }
						onChange={ ( value ) => this.onSelectPostType( value ) }
						options={ uagb_blocks_info.post_types }
					/>
					<hr className="uagb-editor__separator" />
					{ "" != taxonomyList &&
						<SelectControl
							label={ __( "Taxonomy" ) }
							value={ taxonomyType }
							onChange={ ( value ) => this.onSelectTaxonomyType( value ) }
							options={ taxonomyListOptions }
						/>
					}
					{ "" != categoriesList &&
						<Fragment>
							<SelectControl
								label={ taxonomyList[taxonomyType]["label"] }
								value={ categories }
								onChange={ ( value ) => setAttributes( { categories: value } ) }
								options={ categoryListOptions }
							/>
							<hr className="uagb-editor__separator" />
						</Fragment>
					}
					<RangeControl
							label={ __( "Posts Per Page" ) }
							value={ postsToShow }
							onChange={ this.onChangePostsPerPage }
							min={ 0 }
							max={ 500 }
					/>
					<SelectControl
						label={ __( "Order By" ) }
						value={ orderBy }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
						options={ [
							{ value: "date", label: __( "Date" ) },
							{ value: "title", label: __( "Title" ) },
							{ value: "rand", label: __( "Random" ) },
							{ value: "menu_order", label: __( "Menu Order" ) },
						] }
					/>
					<SelectControl
						label={ __( "Order" ) }
						value={ order }
						onChange={ ( value ) => setAttributes( { order: value } ) }
						options={ [
							{ value: "desc", label: __( "Descending" ) },
							{ value: "asc", label: __( "Ascending" ) },
						] }
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
											max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
										/>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ tcolumns }
											onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
											min={ 1 }
											max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
										/>
									)
								} else {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ columns }
											onChange={ ( value ) => setAttributes( { columns: value } ) }
											min={ 1 }
											max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
										/>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
					<ToggleControl
						label={ __( "Equal Height" ) }
						checked={ equalHeight }
						onChange={ ( value ) => setAttributes( { equalHeight: ! equalHeight } ) }
					/>
					<ToggleControl
						label={ __( "Post Pagination" ) }
						checked={ postPagination }
						onChange={ this.onSelectPagination }
					/>
					{ postPagination == true &&
						<RangeControl
							label={ __( "Page Limit" ) }
							value={ pageLimit }
							onChange={ this.onChangePageLimit }
							min={ 0 }
							max={ 100 }
						/>
                	}
					
				</PanelBody>
				{ postPagination == true && 
					<PanelBody title={ __( "Pagination" ) } initialOpen={ false }>
						<Fragment>
							<SelectControl
								label={ __( "Pagination Layout" ) }
								value={ paginationLayout }
								onChange={ ( value ) => setAttributes( { paginationLayout: value } ) }
								options={ [
									{ value: "border", label: __( "Border" ) },
									{ value: "filled", label: __( "Filled" ) },
								] }
							/>
							<SelectControl
								label={ __( "Pagination Alignment" ) }
								value={ paginationAlignment }
								onChange={ ( value ) => setAttributes( { paginationAlignment: value } ) }
								options={ [
									{ value: "left", label: __( "Left" ) },
									{ value: "center", label: __( "Center" ) },
									{ value: "right", label: __( "Right" ) },
								] }
							/>
							<hr className="uagb-editor__separator" />
							{ paginationLayout == "filled" && 
								<Fragment>
									<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: paginationBgColor }} ></span></span></p>
									<ColorPalette
									value={ paginationBgColor }
									onChange={ ( colorValue ) => setAttributes( { paginationBgColor: colorValue } ) }
									/>
									<p className="uagb-setting-label">{ __( "Background Active Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: paginationBgActiveColor }} ></span></span></p>
									<ColorPalette
									value={ paginationBgActiveColor }
									onChange={ ( colorValue ) => setAttributes( { paginationBgActiveColor: colorValue } ) }
									/>
								</Fragment>
							}
							{ paginationLayout == "border" && 
								<Fragment>
									<RangeControl
										label={ __( "Border Size" ) }
										value={ paginationBorderSize }
										onChange={ ( value ) => setAttributes( { paginationBorderSize: value } ) }
										min={ 0 }
										max={ 10 }
									/>
									<RangeControl
										label={ __( "Border Radius" ) }
										value={ paginationBorderRadius }
										onChange={ ( value ) => setAttributes( { paginationBorderRadius: value } ) }
										min={ 0 }
										max={ 500 }
									/>
									<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: paginationBorderColor }} ></span></span></p>
									<ColorPalette
									value={ paginationBorderColor }
									onChange={ ( colorValue ) => setAttributes( { paginationBorderColor: colorValue } ) }
									/>
									<p className="uagb-setting-label">{ __( "Border Active Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: paginationBorderActiveColor }} ></span></span></p>
									<ColorPalette
									value={ paginationBorderActiveColor }
									onChange={ ( colorValue ) => setAttributes( { paginationBorderActiveColor: colorValue } ) }
									/>
								</Fragment>
							}
							<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: paginationColor }} ></span></span></p>
							<ColorPalette
							value={ paginationColor }
							onChange={ ( colorValue ) => setAttributes( { paginationColor: colorValue } ) }
							/>
							<p className="uagb-setting-label">{ __( "Text Active Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: paginationActiveColor }} ></span></span></p>
							<ColorPalette
							value={ paginationActiveColor }
							onChange={ ( colorValue ) => setAttributes( { paginationActiveColor: colorValue } ) }
							/>
							<hr className="uagb-editor__separator" />
							<RangeControl
								label={ __( "Spacing" ) }
								value={ paginationSpacing }
								onChange={ ( value ) => setAttributes( { paginationSpacing: value } ) }
								help = { __( "This spacing is between the Post Grid and the Pagination") }
								min={ 0 }
								max={ 500 }
							/>
							<hr className="uagb-editor__separator" />
							<TextControl
								label= { __( "Previous Text" ) }
								value= { paginationPrevText }
								onChange={ this.onChangePrevText }
							/>
							<TextControl
								label= { __( "Next Text" ) }
								value= { paginationNextText }
								onChange={ this.onChangeNextText }
							/>
						</Fragment>
					</PanelBody>
				}
				<PanelBody title={ __( "Image" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show Featured Image" ) }
						checked={ displayPostImage }
						onChange={ ( value ) => setAttributes( { displayPostImage: ! displayPostImage } ) }
					/>
					{ displayPostImage == true &&
						<SelectControl
							label={ __( "Image Sizes" ) }
							value={ imgSize }
							onChange={ ( value ) => setAttributes( { imgSize: value } ) }
							options={ uagb_blocks_info.image_sizes }
						/>
                	}
                	{ displayPostImage == true &&

						<SelectControl
							label={ __( "Image Position" ) }
							value={ imgPosition }
							onChange={ ( value ) => setAttributes( { imgPosition: value } ) }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "background", label: __( "Background" ) },
							] }
						/>
					}
					{ displayPostImage == true && imgPosition == "background" &&
						<Fragment>
							<p className="uagb-setting-label">{ __( "Background Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: bgOverlayColor }} ></span></span></p>
							<ColorPalette
								value={ bgOverlayColor }
								onChange={ ( colorValue ) => setAttributes( { bgOverlayColor: colorValue } ) }
								allowReset
							/>
							<RangeControl
								label={ __( "Overlay Opacity" ) }
								value={ overlayOpacity }
								onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<ToggleControl
								label={ __( "Link Complete Box" ) }
								checked={ linkBox }
								onChange={ ( value ) => setAttributes( { linkBox: ! linkBox } ) }
							/>
						</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Content" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show Title" ) }
						checked={ displayPostTitle }
						onChange={ ( value ) => setAttributes( { displayPostTitle: ! displayPostTitle } ) }
					/>
					<ToggleControl
						label={ __( "Show Author" ) }
						checked={ displayPostAuthor }
						onChange={ ( value ) => setAttributes( { displayPostAuthor: ! displayPostAuthor } ) }
					/>
					<ToggleControl
						label={ __( "Show Date" ) }
						checked={ displayPostDate }
						onChange={ ( value ) => setAttributes( { displayPostDate : ! displayPostDate } ) }
					/>
					<ToggleControl
						label={ __( "Show Comment" ) }
						checked={ displayPostComment }
						onChange={ ( value ) => setAttributes( { displayPostComment: ! displayPostComment } ) }
					/>
					<ToggleControl
						label={ __( "Show Taxonomy" ) }
						checked={ displayPostTaxonomy }
						onChange={ ( value ) => setAttributes( { displayPostTaxonomy: ! displayPostTaxonomy } ) }
					/>
					<ToggleControl
						label={ __( "Show Excerpt" ) }
						checked={ displayPostExcerpt }
						onChange={ ( value ) => setAttributes( { displayPostExcerpt: ! displayPostExcerpt } ) }
					/>
					{ displayPostExcerpt &&
						<RangeControl
							label={ __( "Excerpt Length" ) }
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 1 }
							max={ 500 }
							allowReset
						/>
					}
				</PanelBody>
				<PanelBody title={ __( "Read More Link" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show Read More Link" ) }
						checked={ displayPostLink }
						onChange={ ( value ) => setAttributes( { displayPostLink : ! displayPostLink } ) }
					/>
					<ToggleControl
						label={ __( "Open links in New Tab" ) }
						checked={ newTab }
						onChange={ ( value ) => setAttributes( { newTab : ! newTab } ) }
					/>
					{ displayPostLink &&
						<Fragment>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Text" ) }</h2>
							<TextControl
								label= { __( "Text" ) }
								value= { ctaText }
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
							<TypographyControl
								label={ __( "Typography" ) }
								attributes = { attributes }
								setAttributes = { setAttributes }
								loadGoogleFonts = { { value: ctaLoadGoogleFonts, label: "ctaLoadGoogleFonts" } }
								fontFamily = { { value: ctaFontFamily, label: "ctaFontFamily" } }
								fontWeight = { { value: ctaFontWeight, label: "ctaFontWeight" } }
								fontSubset = { { value: ctaFontSubset, label: "ctaFontSubset" } }
								fontSizeType = { { value: ctaFontSizeType, label: "ctaFontSizeType" } }
								fontSize = { { value: ctaFontSize, label: "ctaFontSize" } }
								fontSizeMobile = { { value: ctaFontSizeMobile, label: "ctaFontSizeMobile" } }
								fontSizeTablet= { { value: ctaFontSizeTablet, label: "ctaFontSizeTablet" } }
								lineHeightType = { { value: ctaLineHeightType, label: "ctaLineHeightType" } }
								lineHeight = { { value: ctaLineHeight, label: "ctaLineHeight" } }
								lineHeightMobile = { { value: ctaLineHeightMobile, label: "ctaLineHeightMobile" } }
								lineHeightTablet= { { value: ctaLineHeightTablet, label: "ctaLineHeightTablet" } }
							/>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Border" ) }</h2>
							<SelectControl
								label={ __( "Style" ) }
								value={ borderStyle }
								onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
								options={ [
									{ value: "none", label: __( "None" ) },
									{ value: "solid", label: __( "Solid" ) },
									{ value: "dashed", label: __( "Dashed" ) },
									{ value: "dotted", label: __( "Dotted" ) },
									{ value: "double", label: __( "Double" ) },
								] }
							/>
							<RangeControl
								label={ __( "Width" ) }
								value={ borderWidth }
								onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
								min={ 0 }
								max={ 10 }
								allowReset
							/>
							<RangeControl
								label={ __( "Rounded Corner" ) }
								value={ borderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Padding (px)" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.vertical_spacing }
								className={ "uagb-margin-control" }
								value={ btnVPadding }
								onChange={ ( value ) => setAttributes( { btnVPadding: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.horizontal_spacing }
								className={ "uagb-margin-control" }
								value={ btnHPadding }
								onChange={ ( value ) => setAttributes( { btnHPadding: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Colors" ) }</h2>
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
										if ( "hover" === tabName.name ){
											tabout = hoverSettings
										} else {
											tabout = normalSettings
										}
										return <div>{ tabout }</div>
									}
								}
							</TabPanel>
						</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Typography" ) } initialOpen={ false }>
					<h2>{ __( "Title" ) }</h2>
					<SelectControl
						label={ __( "Title Tag" ) }
						value={ titleTag }
						onChange={ ( value ) => setAttributes( { titleTag: value } ) }
						options={ [
							{ value: "h1", label: __( "H1" ) },
							{ value: "h2", label: __( "H2" ) },
							{ value: "h3", label: __( "H3" ) },
							{ value: "h4", label: __( "H4" ) },
							{ value: "h5", label: __( "H5" ) },
							{ value: "h6", label: __( "H6" ) },
							{ value: "span", label: __( "span" ) },
							{ value: "p", label: __( "p" ) },
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

					{ ( displayPostAuthor || displayPostDate || displayPostComment || displayPostTaxonomy ) && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Meta" ) }</h2>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: metaLoadGoogleFonts, label: "metaLoadGoogleFonts" } }
							fontFamily = { { value: metaFontFamily, label: "metaFontFamily" } }
							fontWeight = { { value: metaFontWeight, label: "metaFontWeight" } }
							fontSubset = { { value: metaFontSubset, label: "metaFontSubset" } }
							fontSizeType = { { value: metaFontSizeType, label: "metaFontSizeType" } }
							fontSize = { { value: metaFontSize, label: "metaFontSize" } }
							fontSizeMobile = { { value: metaFontSizeMobile, label: "metaFontSizeMobile" } }
							fontSizeTablet= { { value: metaFontSizeTablet, label: "metaFontSizeTablet" } }
							lineHeightType = { { value: metaLineHeightType, label: "metaLineHeightType" } }
							lineHeight = { { value: metaLineHeight, label: "metaLineHeight" } }
							lineHeightMobile = { { value: metaLineHeightMobile, label: "metaLineHeightMobile" } }
							lineHeightTablet= { { value: metaLineHeightTablet, label: "metaLineHeightTablet" } }
						/>
					</Fragment>
					}

					{ displayPostExcerpt &&	<Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Excerpt" ) }</h2>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: excerptLoadGoogleFonts, label: "excerptLoadGoogleFonts" } }
							fontFamily = { { value: excerptFontFamily, label: "excerptFontFamily" } }
							fontWeight = { { value: excerptFontWeight, label: "excerptFontWeight" } }
							fontSubset = { { value: excerptFontSubset, label: "excerptFontSubset" } }
							fontSizeType = { { value: excerptFontSizeType, label: "excerptFontSizeType" } }
							fontSize = { { value: excerptFontSize, label: "excerptFontSize" } }
							fontSizeMobile = { { value: excerptFontSizeMobile, label: "excerptFontSizeMobile" } }
							fontSizeTablet= { { value: excerptFontSizeTablet, label: "excerptFontSizeTablet" } }
							lineHeightType = { { value: excerptLineHeightType, label: "excerptLineHeightType" } }
							lineHeight = { { value: excerptLineHeight, label: "excerptLineHeight" } }
							lineHeightMobile = { { value: excerptLineHeightMobile, label: "excerptLineHeightMobile" } }
							lineHeightTablet= { { value: excerptLineHeightTablet, label: "excerptLineHeightTablet" } }
						/>
					</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Colors" ) } initialOpen={ false }>
					<p className="uagb-setting-label">{ __( "Blog Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: bgColor }} ></span></span></p>
					<ColorPalette
						value={ bgColor }
						onChange={ ( colorValue ) => setAttributes( { bgColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Title Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span></span></p>
					<ColorPalette
						value={ titleColor }
						onChange={ ( colorValue ) => setAttributes( { titleColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Meta Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: metaColor }} ></span></span></p>
					<ColorPalette
						value={ metaColor }
						onChange={ ( colorValue ) => setAttributes( { metaColor: colorValue } ) }
					/>
					{ displayPostExcerpt == true &&
						<Fragment>
							<p className="uagb-setting-label">{ __( "Excerpt Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: excerptColor }} ></span></span></p>
							<ColorPalette
								value={ excerptColor }
								onChange={ ( colorValue ) => setAttributes( { excerptColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
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
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __( "Content Padding" ) }
						value={ contentPadding }
						onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ __( "Content Padding (Mobile)" ) }
						value={ contentPaddingMobile }
						onChange={ ( value ) => setAttributes( { contentPaddingMobile: value } ) }
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __( "Title Bottom Spacing" ) }
						value={ titleBottomSpace }
						onChange={ ( value ) => setAttributes( { titleBottomSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Meta Bottom Spacing" ) }
						value={ metaBottomSpace }
						onChange={ ( value ) => setAttributes( { metaBottomSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Excerpt Bottom Spacing" ) }
						value={ excerptBottomSpace }
						onChange={ ( value ) => setAttributes( { excerptBottomSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</PanelBody>	
			</InspectorControls>
		)

		var element = document.getElementById( "uagb-post-grid-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length

		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder icon="admin-post" label={ uagb_blocks_info.blocks["uagb/post-grid"]["title"] }>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( "No posts found." )
						}
					</Placeholder>
				</Fragment>
			)
		}

		return (
			<Fragment>
				{ inspectorControls }
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right" ] }
					/>
				</BlockControls>
				<Blog attributes={attributes} className={this.props.className} latestPosts={latestPosts} block_id={this.props.clientId} categoriesList={categoriesList} />
				{ loadTitleGoogleFonts }
				{ loadMetaGoogleFonts }
				{ loadExcerptGoogleFonts }
				{ loadCtaGoogleFonts }
			</Fragment>
		)
	}
}

export default withSelect( ( select, props ) => {

	const { categories, postsToShow, order, orderBy, postType, taxonomyType, paginationMarkup, postPagination } = props.attributes
	const { setAttributes } = props
	const { getEntityRecords } = select( "core" )

	let allTaxonomy = uagb_blocks_info.all_taxonomy
	let currentTax = allTaxonomy[postType]
	let taxonomy = ""
	let categoriesList = []
	let rest_base = ""

	if ( true === postPagination && 'empty' === paginationMarkup ) {
		$.ajax({
			url: uagb_blocks_info.ajax_url,
			data: {
				action: "uagb_post_pagination",
				attributes : props.attributes,
				nonce: uagb_blocks_info.uagb_ajax_nonce
			},
			dataType: "json",
			type: "POST",
			success: function( data ) {
				setAttributes( { paginationMarkup: data.data } ) 
			}
		});
	}

	if ( "undefined" != typeof currentTax ) {

		if ( "undefined" != typeof currentTax["taxonomy"][taxonomyType] ) {
			rest_base = ( currentTax["taxonomy"][taxonomyType]["rest_base"] == false || currentTax["taxonomy"][taxonomyType]["rest_base"] == null ) ? currentTax["taxonomy"][taxonomyType]["name"] : currentTax["taxonomy"][taxonomyType]["rest_base"]
		}

		if ( "" != taxonomyType ) {
			if ( "undefined" != typeof currentTax["terms"] && "undefined" != typeof currentTax["terms"][taxonomyType] ) {
				categoriesList = currentTax["terms"][taxonomyType]
			}
		}
	}

	let latestPostsQuery = {
		order: order,
		orderby: orderBy,
		per_page: postsToShow,
	}

	latestPostsQuery[rest_base] = categories
	return {
		latestPosts: getEntityRecords( "postType", postType, latestPostsQuery ),
		categoriesList: categoriesList,
		taxonomyList: ( "undefined" != typeof currentTax ) ? currentTax["taxonomy"] : [] 
	}

} )( UAGBPostGrid )
