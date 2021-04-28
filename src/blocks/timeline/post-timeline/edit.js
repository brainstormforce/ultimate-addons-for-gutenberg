/**
 * External dependencies
 */
import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import map from "lodash/map";
import classnames from "classnames";
import UAGBIcon from "../../../../dist/blocks/uagb-controls/UAGBIcon.json";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon";

// Import css for timeline.
import contentTimelineStyle from ".././inline-styles";
import ContentTmClasses from ".././classes";
import AlignClass from ".././align-classes";
import DayAlignClass from ".././day-align-classes";
import Title from "./components/Title";
import FeaturedImage from "./components/FeaturedImage";
import Excerpt from "./components/Excerpt";
import CtaLink from "./components/CtaLink";
import Author from "./components/Author";
import PostDate from "./components/PostDate";
import Icon from "./components/Icon";

// Import all of our Text Options requirements.
import TypographyControl from "../../../components/typography";

// Import Web font loader for google fonts.
import WebfontLoader from "../../../components/typography/fontloader";

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { dateI18n } = wp.date;
const { decodeEntities } = wp.htmlEntities;

const {
	withSelect,
} = wp.data;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl,
	TabPanel,
	TextControl,
	ButtonGroup,
	Button,
	Dashicon,
} = wp.components;

const {
	InspectorControls,
	ColorPalette,
	BlockAlignmentToolbar,
	BlockControls,
	PanelColorSettings,
} = wp.blockEditor;

const svg_icons = Object.keys( UAGBIcon );

const $ = jQuery;

class UAGBTimeline extends Component {

	constructor() {
		super( ...arguments );
		this.getTimelineicon          = this.getTimelineicon.bind( this );
		this.onSelectPostType = this.onSelectPostType.bind( this );
		this.onSelectTaxonomyType = this.onSelectTaxonomyType.bind( this );
	}

	onSelectPostType( value ) {
		const { setAttributes } = this.props;

		setAttributes( { postType: value } );
		setAttributes( { categories: "" } );
	}

	onSelectTaxonomyType( value ) {
		const { setAttributes } = this.props;

		setAttributes( { taxonomyType: value } );
		setAttributes( { categories: "" } );
	}

	getTimelineicon( value ) {
		this.props.setAttributes( { icon: value } );
	}

	render() {

		const { attributes, categoriesList, setAttributes, latestPosts, focus, taxonomyList, className, deviceType, } = this.props;

		const {
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
			postNumber,
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
			headSpace,
			separatorwidth,
			borderwidth,
			connectorBgsize,
			authorSpace,
			contentSpace,
			authorColor,
			authorFontSizeType,
			authorFontSize,
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
			dateBottomspace,
			displayPostDate,
			displayPostExcerpt,
			displayPostAuthor,
			displayPostImage,
			displayPostLink,
			align,
			postLayout,
			order,
			orderBy,
			categories,
			postsToShow,
			width,
			imageSize,
			readMoreText,
			ctaBackground,
			icon,
			iconColor,
			dateColor,
			ctaColor,
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
			ctaFontSizeType,
			ctaFontSize,
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
			iconSize,
			exerptLength,
			borderRadius,
			bgPadding,
			contentPadding,
			block_id,
			iconFocus,
			iconBgFocus,
			stack,
			linkTarget,
			postType,
			taxonomyType,
			dateFormat,
			excludeCurrentPost
		} = attributes;

		const taxonomyListOptions = [];

		const categoryListOptions = [
			{ value: "", label: __( "All","ultimate-addons-for-gutenberg" ) }
		];

		if ( "" != taxonomyList ) {
			Object.keys( taxonomyList ).map( ( item, thisIndex ) => {
				return taxonomyListOptions.push( { value : taxonomyList[item].name, label: taxonomyList[item].label } );
			} );
		}

		if ( "" != categoriesList ) {
			Object.keys( categoriesList ).map( ( item, thisIndex ) => {
				return categoryListOptions.push( { value : categoriesList[item].id, label: categoriesList[item].name } );
			} );
		}

		// Parameters for FontIconPicker.
		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: this.getTimelineicon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon","ultimate-addons-for-gutenberg" )
		};

		const sizeTypes = [
			{ key: "px", name: __( "px","ultimate-addons-for-gutenberg" ) },
			{ key: "em", name: __( "em","ultimate-addons-for-gutenberg" ) },
		];

		let loadHeadGoogleFonts;
		let loadSubHeadGoogleFonts;
		let loadDateGoogleFonts;
		let loadAuthorGoogleFonts;
		let loadCtaGoogleFonts;

		if ( headLoadGoogleFonts == true ) {

			const headconfig = {
				google: {
					families: [ headFontFamily + ( headFontWeight ? ":" + headFontWeight : "" ) ],
				},
			};

			loadHeadGoogleFonts = (
				<WebfontLoader config={ headconfig }>
				</WebfontLoader>
			);
		}

		if ( subHeadLoadGoogleFonts == true ) {

			const subHeadconfig = {
				google: {
					families: [ subHeadFontFamily + ( subHeadFontWeight ? ":" + subHeadFontWeight : "" ) ],
				},
			};

			loadSubHeadGoogleFonts = (
				<WebfontLoader config={ subHeadconfig }>
				</WebfontLoader>
			);
		}

		if ( dateLoadGoogleFonts == true ) {

			const dateconfig = {
				google: {
					families: [ dateFontFamily + ( dateFontWeight ? ":" + dateFontWeight : "" ) ],
				},
			};

			loadDateGoogleFonts = (
				<WebfontLoader config={ dateconfig }>
				</WebfontLoader>
			);
		}

		if ( authorLoadGoogleFonts == true ) {

			const authorconfig = {
				google: {
					families: [ authorFontFamily + ( authorFontWeight ? ":" + authorFontWeight : "" ) ],
				},
			};

			loadAuthorGoogleFonts = (
				<WebfontLoader config={ authorconfig }>
				</WebfontLoader>
			);
		}

		if ( ctaLoadGoogleFonts == true ) {

			const ctaconfig = {
				google: {
					families: [ ctaFontFamily + ( ctaFontWeight ? ":" + ctaFontWeight : "" ) ],
				},
			};

			loadCtaGoogleFonts = (
				<WebfontLoader config={ ctaconfig }>
				</WebfontLoader>
			);
		}


		const iconColorSettings = (
			<PanelColorSettings
				title={ __( "Color Settings","ultimate-addons-for-gutenberg" ) }
				initialOpen={ true }
				colorSettings={ [
					{
						value: separatorColor,
						onChange: ( colorValue ) => setAttributes( { separatorColor: colorValue } ),
						label: __( "Line Color","ultimate-addons-for-gutenberg" ),
					},
					{
						value: iconColor,
						onChange: ( colorValue ) => setAttributes( { iconColor: colorValue } ),
						label: __( "Icon Color","ultimate-addons-for-gutenberg" ),
					},
					{
						value: separatorBg,
						onChange: ( colorValue ) => setAttributes( { separatorBg: colorValue } ),
						label: __( "Background Color","ultimate-addons-for-gutenberg" ),
					},
					{
						value: separatorBorder,
						onChange: ( colorValue ) => setAttributes( { separatorBorder: colorValue } ),
						label: __( "Border Color","ultimate-addons-for-gutenberg" ),
					},
				] }
			>
			</PanelColorSettings>
		);

		const iconFocusSettings = (
			<PanelColorSettings
				title={ __( "Color Settings","ultimate-addons-for-gutenberg" ) }
				initialOpen={ true }
				colorSettings={ [
					{
						value: separatorFillColor,
						onChange: ( colorValue ) => setAttributes( { separatorFillColor: colorValue } ),
						label: __( "Line Color","ultimate-addons-for-gutenberg" ),
					},
					{
						value: iconFocus,
						onChange: ( colorValue ) => setAttributes( { iconFocus: colorValue } ),
						label: __( "Icon Color","ultimate-addons-for-gutenberg" ),
					},
					{
						value: iconBgFocus,
						onChange: ( colorValue ) => setAttributes( { iconBgFocus: colorValue } ),
						label: __( "Background Color","ultimate-addons-for-gutenberg" ),
					},
					{
						value: borderFocus,
						onChange: ( colorValue ) => setAttributes( { borderFocus: colorValue } ),
						label: __( "Border Color","ultimate-addons-for-gutenberg" ),
					},
				] }
			>
			</PanelColorSettings>
		);

		const iconControls = (
			<PanelBody title={ __( "Connector Color Settings","ultimate-addons-for-gutenberg" ) } initialOpen={ true } >
				<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal","ultimate-addons-for-gutenberg" ),
							className: "uagb-normal-tab",
						},
						{
							name: "focus",
							title: __( "Focus","ultimate-addons-for-gutenberg" ),
							className: "uagb-focus-tab",
						},
					] }>
					{
						( tabName ) => {
							let tabout;
							if ( "focus" === tabName.name ) {
								tabout = iconFocusSettings;
							} else {
								tabout = iconColorSettings;
							}
							return <div>{ tabout }</div>;
						}
					}
				</TabPanel>
			</PanelBody>
		);

		const colorSetting = (
			<PanelColorSettings title={ __( "Color Settings","ultimate-addons-for-gutenberg" ) } initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: ( colorValue ) => setAttributes( { backgroundColor: colorValue } ),
						label: __( "Background Color","ultimate-addons-for-gutenberg" ),
					},
				] }	>

				{ displayPostDate && <Fragment>
					<p className="uagb-setting-label">{ __( "Date Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: dateColor } } ></span></span></p>
					<ColorPalette
						value={ dateColor }
						onChange={ ( colorValue ) => setAttributes( { dateColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}
				<Fragment>
					<p className="uagb-setting-label">{ __( "Heading Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: headingColor } } ></span></span></p>
					<ColorPalette
						value={ headingColor }
						onChange={ ( colorValue ) => setAttributes( { headingColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				{ displayPostAuthor && <Fragment>
					<p className="uagb-setting-label">{ __( "Author Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: authorColor } } ></span></span></p>
					<ColorPalette
						value={ authorColor }
						onChange={ ( colorValue ) => setAttributes( { authorColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}
				{ displayPostExcerpt && <Fragment>
					<p className="uagb-setting-label">{ __( "Content Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: subHeadingColor } } ></span></span></p>
					<ColorPalette
						value={ subHeadingColor }
						onChange={ ( colorValue ) => setAttributes( { subHeadingColor: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}

				{ displayPostLink && <Fragment>
					<p className="uagb-setting-label">{ __( "CTA Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: ctaColor } } ></span></span></p>
					<ColorPalette
						value={ ctaColor }
						onChange={ ( colorValue ) => setAttributes( { ctaColor: colorValue } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "CTA Background Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: ctaBackground } } ></span></span></p>
					<ColorPalette
						value={ ctaBackground }
						onChange={ ( colorValue ) => setAttributes( { ctaBackground: colorValue } ) }
						allowReset
					/>
				</Fragment>
				}
			</PanelColorSettings>
		);

		const today = new Date();

		const content_control = (
			<InspectorControls>
				<PanelBody title={ __( "Query","ultimate-addons-for-gutenberg" ) } initialOpen={ true } >
					<SelectControl
						label={ __( "Post Type","ultimate-addons-for-gutenberg" ) }
						value={ postType }
						onChange={ ( value ) => this.onSelectPostType( value ) }
						options={ uagb_blocks_info.post_types }
					/>
					<hr className="uagb-editor__separator" />
					{ "" != taxonomyList &&
						<SelectControl
							label={ __( "Taxonomy","ultimate-addons-for-gutenberg" ) }
							value={ taxonomyType }
							onChange={ ( value ) => this.onSelectTaxonomyType( value ) }
							options={ taxonomyListOptions }
						/>
					}
					{ "" != categoriesList &&
						<Fragment>
							<SelectControl
								label={ taxonomyList[taxonomyType].label }
								value={ categories }
								onChange={ ( value ) => setAttributes( { categories: value } ) }
								options={ categoryListOptions }
							/>
							<hr className="uagb-editor__separator" />
						</Fragment>
					}
					<ToggleControl
						label={ __( "Exclude Current Post","ultimate-addons-for-gutenberg" ) }
						checked={ excludeCurrentPost }
						onChange={ ( value ) => setAttributes( { excludeCurrentPost: ! excludeCurrentPost } ) }
					/>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<SelectControl
						label={ __( "Order By","ultimate-addons-for-gutenberg" ) }
						value={ orderBy }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
						options={ [
							{ value: "date", label: __( "Date","ultimate-addons-for-gutenberg" ) },
							{ value: "title", label: __( "Title","ultimate-addons-for-gutenberg" ) },
							{ value: "rand", label: __( "Random","ultimate-addons-for-gutenberg" ) },
							{ value: "menu_order", label: __( "Menu Order","ultimate-addons-for-gutenberg" ) },
						] }
					/>
					<SelectControl
						label={ __( "Order","ultimate-addons-for-gutenberg" ) }
						value={ order }
						onChange={ ( value ) => setAttributes( { order: value } ) }
						options={ [
							{ value: "desc", label: __( "Descending","ultimate-addons-for-gutenberg" ) },
							{ value: "asc", label: __( "Ascending","ultimate-addons-for-gutenberg" ) },
						] }
					/>
				</PanelBody>
				<PanelBody  title={ __( "Layout","ultimate-addons-for-gutenberg" ) } initialOpen={ false } >
					<SelectControl
						label={ __( "Orientation","ultimate-addons-for-gutenberg" ) }
						value={ timelinAlignment }
						onChange={ ( value ) => setAttributes( { timelinAlignment: value } ) }
						options={ [
							{ value: "left", label: __( "Left","ultimate-addons-for-gutenberg" ) },
							{ value: "right", label: __( "Right","ultimate-addons-for-gutenberg" ) },
							{ value: "center", label: __( "Center","ultimate-addons-for-gutenberg" ) },
						] }
					/>
					<SelectControl
						label={ __( "Arrow Alignment","ultimate-addons-for-gutenberg" ) }
						value={ arrowlinAlignment }
						onChange={ ( value ) => setAttributes( { arrowlinAlignment: value } ) }
						options={ [
							{ value: "top", label: __( "Top","ultimate-addons-for-gutenberg" ) },
							{ value: "bottom", label: __( "Bottom","ultimate-addons-for-gutenberg" ) },
							{ value: "center", label: __( "Center","ultimate-addons-for-gutenberg" ) },
						] }
					/>
					<SelectControl
						label={ __( "Stack on","ultimate-addons-for-gutenberg" ) }
						value={ stack }
						options={ [
							{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
							{ value: "tablet", label: __( "Tablet","ultimate-addons-for-gutenberg" ) },
							{ value: "mobile", label: __( "Mobile","ultimate-addons-for-gutenberg" ) },
						] }
						help={ __( "Note: Choose on what breakpoint the Post Timeline will stack.","ultimate-addons-for-gutenberg" ) }
						onChange={ ( value ) => setAttributes( { stack: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( "Image","ultimate-addons-for-gutenberg" ) } initialOpen={ false } >
					<ToggleControl
						label={ __( "Display Featured Image","ultimate-addons-for-gutenberg" ) }
						checked={ displayPostImage }
						onChange={ ( value ) => setAttributes( { displayPostImage: ! displayPostImage } ) }
					/>
					{ displayPostImage &&
					<SelectControl
						label={ __( "Featured Image Style","ultimate-addons-for-gutenberg" ) }
						options={ uagb_blocks_info.image_sizes }
						value={ imageSize }
						onChange={ ( value ) => this.props.setAttributes( { imageSize: value } ) }
					/>
					}
				</PanelBody>
				<PanelBody title={ __( "Content","ultimate-addons-for-gutenberg" ) } initialOpen={ false } >
					<ToggleControl
						label={ __( "Display Post Author","ultimate-addons-for-gutenberg" ) }
						checked={ displayPostAuthor }
						onChange={ ( value ) => setAttributes( { displayPostAuthor: ! displayPostAuthor } ) }
					/>
					<ToggleControl
						label={ __( "Display Post Date","ultimate-addons-for-gutenberg" ) }
						checked={ displayPostDate }
						onChange={ ( value ) => setAttributes( { displayPostDate: ! displayPostDate } ) }
					/>
					{ displayPostDate && 
					<SelectControl
						label={ __( "Date Format","ultimate-addons-for-gutenberg" ) }
						value={ dateFormat }
						onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
						options={ [
							{ value: "M j, Y" , label: dateI18n( "M j, Y", today ) },
							{ value: "F j, Y" , label: dateI18n( "F j, Y", today ) },
							{ value: "m/d/Y"  , label: dateI18n( "m/d/Y", today ) },
							{ value: "m-d-Y"  , label: dateI18n( "m-d-Y", today ) },
							{ value: "m.d.Y"  , label: dateI18n( "m.d.Y", today ) },
							{ value: "d M Y"  , label: dateI18n( "d M Y", today ) },
							{ value: "d F Y"  , label: dateI18n( "d F Y", today ) },
							{ value: "d-m-Y"  , label: dateI18n( "d-m-Y", today ) },
							{ value: "d.m.Y"  , label: dateI18n( "d.m.Y", today ) },
							{ value: "d/m/Y"  , label: dateI18n( "d/m/Y", today ) },
							{ value: "Y-m-d"  , label: dateI18n( "Y-m-d", today ) },
							{ value: "Y.m.d"  , label: dateI18n( "Y.m.d", today ) },
							{ value: "Y/m/d"  , label: dateI18n( "Y/m/d", today ) },
							{ value: "M, Y"   , label: dateI18n( "M, Y", today ) },
							{ value: "M Y"    , label: dateI18n( "M Y", today ) },
							{ value: "F, Y"   , label: dateI18n( "F, Y", today ) },
							{ value: "F Y"    , label: dateI18n( "F Y", today ) },
						] }
					/> }
					<ToggleControl
						label={ __( "Display Post Excerpt","ultimate-addons-for-gutenberg" ) }
						checked={ displayPostExcerpt }
						onChange={ ( value ) => setAttributes( { displayPostExcerpt: ! displayPostExcerpt } ) }
					/>
					{ displayPostExcerpt &&
					<RangeControl
						label={ __( "Excerpt Length","ultimate-addons-for-gutenberg" ) }
						value={ exerptLength }
						onChange={ ( value ) => setAttributes( { exerptLength: value } ) }
						min={ 1 }
						max={ 50 }
						allowReset
					/>
					}

					<ToggleControl
						label={ __( "Display Continue Reading Link","ultimate-addons-for-gutenberg" ) }
						checked={ displayPostLink }
						onChange={ ( value ) => setAttributes( { displayPostLink: ! displayPostLink } ) }
					/>
					{ displayPostLink && <Fragment>
						<TextControl
							label={ __( "CTA Text","ultimate-addons-for-gutenberg" ) }
							value={ readMoreText }
							onChange={ value => setAttributes( { readMoreText: value } ) }
						/>
					</Fragment>
					}
					<ToggleControl
						label={ __( "Open links in New Tab","ultimate-addons-for-gutenberg" ) }
						checked={ linkTarget }
						onChange={ ( value ) => setAttributes( { linkTarget: ! linkTarget } ) }
					/>
				</PanelBody>
				<PanelBody  title={ __( "Timeline Item","ultimate-addons-for-gutenberg" ) } initialOpen={ false } >

					<h2>{ __( "Heading","ultimate-addons-for-gutenberg" ) }</h2>
					<SelectControl
						label={ __( "Heading Tag","ultimate-addons-for-gutenberg" ) }
						value={ headingTag }
						onChange={ ( value ) => setAttributes( { headingTag: value } ) }
						options={ [
							{ value: "h1", label: __( "H1","ultimate-addons-for-gutenberg" ) },
							{ value: "h2", label: __( "H2","ultimate-addons-for-gutenberg" ) },
							{ value: "h3", label: __( "H3","ultimate-addons-for-gutenberg" ) },
							{ value: "h4", label: __( "H4","ultimate-addons-for-gutenberg" ) },
							{ value: "h5", label: __( "H5","ultimate-addons-for-gutenberg" ) },
							{ value: "h6", label: __( "H6","ultimate-addons-for-gutenberg" ) },
							{ value: "p", label: __( "P","ultimate-addons-for-gutenberg" ) },
							{ value: "span", label: __( "SPAN","ultimate-addons-for-gutenberg" ) },
						] }
					/>

					<TypographyControl
						label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
						attributes={ this.props.attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: headLoadGoogleFonts, label: "headLoadGoogleFonts" } }
						fontFamily={ { value: headFontFamily, label: "headFontFamily" } }
						fontWeight={ { value: headFontWeight, label: "headFontWeight" } }
						fontSubset={ { value: headFontSubset, label: "headFontSubset" } }
						fontSizeType={ { value: headFontSizeType, label: "headFontSizeType" } }
						fontSize={ { value: headFontSize, label: "headFontSize" } }
						fontSizeMobile={ { value: headFontSizeMobile, label: "headFontSizeMobile" } }
						fontSizeTablet={ { value: headFontSizeTablet, label: "headFontSizeTablet" } }
						lineHeightType={ { value: headLineHeightType, label: "headLineHeightType" } }
						lineHeight={ { value: headLineHeight, label: "headLineHeight" } }
						lineHeightMobile={ { value: headLineHeightMobile, label: "headLineHeightMobile" } }
						lineHeightTablet={ { value: headLineHeightTablet, label: "headLineHeightTablet" } }
					/>
					{ displayPostExcerpt && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Content","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ this.props.attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: subHeadLoadGoogleFonts, label: "subHeadLoadGoogleFonts" } }
							fontFamily={ { value: subHeadFontFamily, label: "subHeadFontFamily" } }
							fontWeight={ { value: subHeadFontWeight, label: "subHeadFontWeight" } }
							fontSubset={ { value: subHeadFontSubset, label: "subHeadFontSubset" } }
							fontSizeType={ { value: subHeadFontSizeType, label: "subHeadFontSizeType" } }
							fontSize={ { value: subHeadFontSize, label: "subHeadFontSize" } }
							fontSizeMobile={ { value: subHeadFontSizeMobile, label: "subHeadFontSizeMobile" } }
							fontSizeTablet={ { value: subHeadFontSizeTablet, label: "subHeadFontSizeTablet" } }
							lineHeightType={ { value: subHeadLineHeightType, label: "subHeadLineHeightType" } }
							lineHeight={ { value: subHeadLineHeight, label: "subHeadLineHeight" } }
							lineHeightMobile={ { value: subHeadLineHeightMobile, label: "subHeadLineHeightMobile" } }
							lineHeightTablet={ { value: subHeadLineHeightTablet, label: "subHeadLineHeightTablet" } }
						/>
					</Fragment>
					}

					{ displayPostDate && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Date","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ this.props.attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: dateLoadGoogleFonts, label: "dateLoadGoogleFonts" } }
							fontFamily={ { value: dateFontFamily, label: "dateFontFamily" } }
							fontWeight={ { value: dateFontWeight, label: "dateFontWeight" } }
							fontSubset={ { value: dateFontSubset, label: "dateFontSubset" } }
							fontSizeType={ { value: dateFontsizeType, label: "dateFontsizeType" } }
							fontSize={ { value: dateFontsize, label: "dateFontsize" } }
							fontSizeMobile={ { value: dateFontsizeMobile, label: "dateFontsizeMobile" } }
							fontSizeTablet={ { value: dateFontsizeTablet, label: "dateFontsizeTablet" } }
							lineHeightType={ { value: dateLineHeightType, label: "dateLineHeightType" } }
							lineHeight={ { value: dateLineHeight, label: "dateLineHeight" } }
							lineHeightMobile={ { value: dateLineHeightMobile, label: "dateLineHeightMobile" } }
							lineHeightTablet={ { value: dateLineHeightTablet, label: "dateLineHeightTablet" } }
						/>
					</Fragment>
					}

					{ displayPostAuthor && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Author","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: authorLoadGoogleFonts, label: "authorLoadGoogleFonts" } }
							fontFamily={ { value: authorFontFamily, label: "authorFontFamily" } }
							fontWeight={ { value: authorFontWeight, label: "authorFontWeight" } }
							fontSubset={ { value: authorFontSubset, label: "authorFontSubset" } }
							fontSizeType={ { value: authorFontSizeType, label: "authorFontSizeType" } }
							fontSize={ { value: authorFontSize, label: "authorFontSize" } }
							fontSizeMobile={ { value: authorFontSizeMobile, label: "authorFontSizeMobile" } }
							fontSizeTablet={ { value: authorFontSizeTablet, label: "authorFontSizeTablet" } }
							lineHeightType={ { value: authorLineHeightType, label: "authorLineHeightType" } }
							lineHeight={ { value: authorLineHeight, label: "authorLineHeight" } }
							lineHeightMobile={ { value: authorLineHeightMobile, label: "authorLineHeightMobile" } }
							lineHeightTablet={ { value: authorLineHeightTablet, label: "authorLineHeightTablet" } }
						/>
					</Fragment>
					}

					{ displayPostLink && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "CTA","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: ctaLoadGoogleFonts, label: "ctaLoadGoogleFonts" } }
							fontFamily={ { value: ctaFontFamily, label: "ctaFontFamily" } }
							fontWeight={ { value: ctaFontWeight, label: "ctaFontWeight" } }
							fontSubset={ { value: ctaFontSubset, label: "ctaFontSubset" } }
							fontSizeType={ { value: ctaFontSizeType, label: "ctaFontSizeType" } }
							fontSize={ { value: ctaFontSize, label: "ctaFontSize" } }
							fontSizeMobile={ { value: ctaFontSizeMobile, label: "ctaFontSizeMobile" } }
							fontSizeTablet={ { value: ctaFontSizeTablet, label: "ctaFontSizeTablet" } }
							lineHeightType={ { value: ctaLineHeightType, label: "ctaLineHeightType" } }
							lineHeight={ { value: ctaLineHeight, label: "ctaLineHeight" } }
							lineHeightMobile={ { value: ctaLineHeightMobile, label: "ctaLineHeightMobile" } }
							lineHeightTablet={ { value: ctaLineHeightTablet, label: "ctaLineHeightTablet" } }
						/>
					</Fragment>
					}
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __( "Rounded Corners","ultimate-addons-for-gutenberg" ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						initialPosition={ 10 }
						max={ 50 }
						allowReset
					/>
				</PanelBody>
				<PanelBody title={ __( "Connector","ultimate-addons-for-gutenberg" ) } initialOpen={ false } >
					<FontIconPicker { ...icon_props } />
					<RangeControl
						label={ __( "Icon Size","ultimate-addons-for-gutenberg" ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 0 }
						max={ 30 }
						allowReset
					/>
					<RangeControl
						label={ __( "Icon Background Size","ultimate-addons-for-gutenberg" ) }
						value={ connectorBgsize }
						onChange={ ( value ) => setAttributes( { connectorBgsize: value } ) }
						min={ 25 }
						max={ 90 }
						allowReset
					/>
					<RangeControl
						label={ __( "Border Width","ultimate-addons-for-gutenberg" ) }
						value={ borderwidth }
						onChange={ ( value ) => setAttributes( { borderwidth: value } ) }
						min={ 1 }
						max={ 10 }
						allowReset
					/>
					<RangeControl
						label={ __( "Connector Width","ultimate-addons-for-gutenberg" ) }
						value={ separatorwidth }
						onChange={ ( value ) => setAttributes( { separatorwidth: value } ) }
						min={ 1 }
						max={ 10 }
						allowReset
					/>
					{ iconControls }
				</PanelBody>
				{ colorSetting }
				<PanelBody  title={ __( "Spacing","ultimate-addons-for-gutenberg" ) } initialOpen={ false } >
					<RangeControl
						label={ __( "Block Padding","ultimate-addons-for-gutenberg" ) }
						value={ bgPadding }
						onChange={ ( value ) => setAttributes( { bgPadding: value } ) }
						min={ 0 }
						initialPosition={ 10 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Content Padding","ultimate-addons-for-gutenberg" ) }
						value={ contentPadding }
						onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
						min={ 0 }
						initialPosition={ 10 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Horizontal Space","ultimate-addons-for-gutenberg" ) }
						value={ horizontalSpace }
						onChange={ ( value ) => setAttributes( { horizontalSpace: value } ) }
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
					<RangeControl
						label={ __( "Vertical Space","ultimate-addons-for-gutenberg" ) }
						value={ verticalSpace }
						onChange={ ( value ) => setAttributes( { verticalSpace: value } ) }
						min={ 0 }
						max={ 100 }
						initialPosition={ 10 }
						allowReset
					/>
					<RangeControl
						label={ __( "Heading Bottom Spacing","ultimate-addons-for-gutenberg" ) }
						value={ headSpace }
						onChange={ ( value ) => setAttributes( { headSpace: value } ) }
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>

					{ displayPostAuthor && <RangeControl
						label={ __( "Author Bottom Spacing","ultimate-addons-for-gutenberg" ) }
						value={ authorSpace }
						onChange={ ( value ) => setAttributes( { authorSpace: value } ) }
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
					}
					{ displayPostExcerpt && displayPostLink && <RangeControl
						label={ __( "Content Bottom Spacing","ultimate-addons-for-gutenberg" ) }
						value={ contentSpace }
						onChange={ ( value ) => setAttributes( { contentSpace: value } ) }
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
					}

					{ displayPostDate && ( timelinAlignment !=="center" ) && <RangeControl
						label={ __( "Date Bottom Spacing","ultimate-addons-for-gutenberg" ) }
						value={ dateBottomspace }
						onChange={ ( value ) => setAttributes( { dateBottomspace: value } ) }
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
					}
				</PanelBody>
			</InspectorControls>
		);

		let cta_enable = "";

		if ( displayPostLink ){
			cta_enable = "uagb_timeline__cta-enable";
		}

		return (
			<Fragment>
				{ content_control }
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
						controls={ [ "center", "left","right" ] }
					/>
				</BlockControls>
				<div  className={ classnames(
					className,
					"uagb-timeline__outer-wrap",
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ this.props.clientId }`
				) }>
					<div  className={ classnames(
						"uagb-timeline__content-wrap",
						cta_enable,
						...ContentTmClasses( this.props.attributes ),
					) }>
						<div className="uagb-timeline-wrapper">
							<div className="uagb-timeline__main">
								{ this.get_content() }
								<div className="uagb-timeline__line" >
									<div className="uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{ loadHeadGoogleFonts }
				{ loadSubHeadGoogleFonts }
				{ loadDateGoogleFonts }
				{ loadAuthorGoogleFonts }
				{ loadCtaGoogleFonts }
			</Fragment>
		);
	}

	componentDidMount() {
		//Store lient id.
		this.props.setAttributes( { block_id: this.props.clientId } );

		const id = this.props.clientId;
		window.addEventListener( "load", this.timelineContent_back( id ) );
		window.addEventListener( "resize", this.timelineContent_back( id ) );
		const time = this;
		$( ".edit-post-layout__content" ).scroll( function( event ) {
			time.timelineContent_back( id );
		} );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-timeline-style-" + this.props.clientId );
		document.head.appendChild( $style );
	}

	componentDidUpdate(){
		const id = this.props.clientId;
		window.addEventListener( "load", this.timelineContent_back( id ) );
		window.addEventListener( "resize", this.timelineContent_back( id ) );
		const time = this;
		$( ".edit-post-layout__content" ).scroll( function( event ) {
			time.timelineContent_back( id );
		} );
	}

	/*  Js for timeline line and inner line filler*/
	timelineContent_back( id ){
		const timeline            = $( ".uagb-timeline" ).parents( "#block-"+id );
		const tm_item             = timeline.find( ".uagb-timeline" );
		const line_inner          = timeline.find( ".uagb-timeline__line__inner" );
		const line_outer          = timeline.find( ".uagb-timeline__line" );
		const $icon_class         = timeline.find( ".uagb-timeline__marker" );
		if ( $icon_class.length > 0 ){
			const $card_last          = timeline.find( ".uagb-timeline__field:last-child" );
			const timeline_start_icon = $icon_class.first().position();
			const timeline_end_icon   = $icon_class.last().position();
			line_outer.css( "top", timeline_start_icon.top );

			const timeline_card_height = $card_last.height();
			const last_item_top = $card_last.offset().top - tm_item.offset().top;
			let $last_item, parent_top;
			const $document = $( document );

			if ( tm_item.hasClass( "uagb-timeline__arrow-center" ) ) {

				line_outer.css( "bottom", timeline_end_icon.top );

				parent_top = last_item_top - timeline_start_icon.top;
				$last_item = parent_top + timeline_end_icon.top;

			} else if ( tm_item.hasClass( "uagb-timeline__arrow-top" ) ) {

				const top_height = timeline_card_height - timeline_end_icon.top;
				line_outer.css( "bottom", top_height );

				$last_item = last_item_top;

			} else if ( tm_item.hasClass( "uagb-timeline__arrow-bottom" ) ) {

				const bottom_height = timeline_card_height - timeline_end_icon.top;
				line_outer.css( "bottom", bottom_height );

				parent_top = last_item_top - timeline_start_icon.top;
				$last_item = parent_top + timeline_end_icon.top;
			}

			let num = 0;
			const elementEnd = $last_item + 20;

			const connectorHeight = 3 * timeline.find( ".uagb-timeline__marker:first" ).height();
			const viewportHeight = document.documentElement.clientHeight + connectorHeight;
			const viewportHeightHalf = viewportHeight/2 + connectorHeight;

			var elementPos = tm_item.offset().top;

			const new_elementPos = elementPos + timeline_start_icon.top;

			let photoViewportOffsetTop = new_elementPos - $document.scrollTop();

			if ( photoViewportOffsetTop < 0 ) {
				photoViewportOffsetTop = Math.abs( photoViewportOffsetTop );
			} else {
				photoViewportOffsetTop = -Math.abs( photoViewportOffsetTop );
			}

			if ( elementPos < ( viewportHeightHalf ) ) {
				if ( ( viewportHeightHalf ) + Math.abs( photoViewportOffsetTop ) < ( elementEnd ) ) {
					line_inner.height( ( viewportHeightHalf ) + photoViewportOffsetTop );
				} else if ( ( photoViewportOffsetTop + viewportHeightHalf ) >= elementEnd ) {
					line_inner.height( elementEnd );
				}
			} else if ( ( photoViewportOffsetTop  + viewportHeightHalf ) < elementEnd ) {
				if ( 0 > photoViewportOffsetTop ) {
					line_inner.height( ( viewportHeightHalf ) - Math.abs( photoViewportOffsetTop ) );
					++num;
				} else {
					line_inner.height( ( viewportHeightHalf ) + photoViewportOffsetTop );
				}
			} else if ( ( photoViewportOffsetTop + viewportHeightHalf ) >= elementEnd ) {
				line_inner.height( elementEnd );
			}

			//For changing icon background color and icon color.
			let timeline_icon_pos, timeline_card_pos;
			var elementPos, elementCardPos;
			let timeline_icon_top, timeline_card_top;
			const timeline_icon   = timeline.find( ".uagb-timeline__marker" ),
				animate_border  = timeline.find( ".uagb-timeline__field-wrap" );

			for ( let i = 0; i < timeline_icon.length; i++ ) {
				timeline_icon_pos = $( timeline_icon[i] ).offset().top;
				timeline_card_pos = $( animate_border[i] ).offset().top;
				elementPos = timeline.offset().top;
				elementCardPos = timeline.offset().top;

				timeline_icon_top = timeline_icon_pos - $document.scrollTop();
				timeline_card_top = timeline_card_pos - $document.scrollTop();

				if ( ( timeline_card_top ) < ( ( viewportHeightHalf ) ) ) {

					animate_border[i].classList.remove( "out-view" );
					animate_border[i].classList.add( "in-view" );

				} else {
					// Remove classes if element is below than half of viewport.
					animate_border[i].classList.add( "out-view" );
					animate_border[i].classList.remove( "in-view" );
				}

				if ( ( timeline_icon_top ) < ( ( viewportHeightHalf ) ) ) {

					// Add classes if element is above than half of viewport.
					timeline_icon[i].classList.remove( "uagb-timeline__out-view-icon" );
					timeline_icon[i].classList.add( "uagb-timeline__in-view-icon" );

				} else {

					// Remove classes if element is below than half of viewport.
					timeline_icon[i].classList.add( "uagb-timeline__out-view-icon" );
					timeline_icon[i].classList.remove( "uagb-timeline__in-view-icon" );

				}
			}

		}
	}

	/* Render output at backend */
	get_content(){

		const { attributes, setAttributes, latestPosts, mergeBlocks,insertBlocksAfter,onReplace } = this.props;

		const {
			timelinAlignment,
			arrowlinAlignment,
			displayPostDate,
			postsToShow,
			contentPadding,
			align,
		} = attributes;


		// Add CSS.
		const element = document.getElementById( "uagb-timeline-style-" + this.props.clientId );
		if ( null != element && "undefined" !== typeof element ) {
			element.innerHTML = contentTimelineStyle( this.props );
		}

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Placeholder icon="admin-post" label={ uagb_blocks_info.blocks["uagb/post-timeline"].title }>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( "No posts found." )
						}
					</Placeholder>
				</Fragment>
			);
		}
		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		let content_align_class = AlignClass( this.props.attributes, 0 ); // Get classname for layout alignment
		let day_align_class     = DayAlignClass( this.props.attributes, 0 ); // Get classname for day alignment.
		const data_copy           = [ ...latestPosts ];
		let display_inner_date  = false;

		return (
			<div className="uagb-timeline__days">
				{
					displayPosts.map( ( post,index ) => {

						if ( timelinAlignment == "center" ){
							display_inner_date = true;
							content_align_class = AlignClass( this.props.attributes, index );
							day_align_class = DayAlignClass( this.props.attributes, index );
						}

						return (
							<article className="uagb-timeline__field uagb-timeline__field-wrap"  key={ index }>
								<div className={ content_align_class }>

									{ <Icon attributes={ attributes } /> }

									<div className={ day_align_class } >
										<div className="uagb-timeline__events-new">
											<div className="uagb-timeline__events-inner-new">
												<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
													{ <PostDate post={ post } attributes={ attributes } dateClass="uagb-timeline__inner-date-new" /> }
												</div>
												{ <FeaturedImage post={ post } attributes={ attributes } /> }
												<div className="uagb-content" style={ { padding: contentPadding+"px" } }>
													{ <Title post={ post } attributes={ attributes } /> }
													{ <Author post={ post } attributes={ attributes } /> }
													{ <Excerpt post={ post } attributes={ attributes } /> }
													{ <CtaLink post={ post } attributes={ attributes } /> }

													<div className="uagb-timeline__arrow"></div>

												</div>

											</div>
										</div>
									</div>
									{ display_inner_date && <div className="uagb-timeline__date-new">
										{ <PostDate post={ post } attributes={ attributes } dateClass="uagb-timeline__date-new" /> }
									</div>
									}
								</div>
							</article>
						);
					} )
				}
			</div>
		);
		
	}

}

export default withSelect( ( select, props ) => {

	const { categories, postsToShow, order, orderBy, postType, taxonomyType, excludeCurrentPost } = props.attributes;
	const { getEntityRecords } = select( "core" );

	const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );
	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	const allTaxonomy = uagb_blocks_info.all_taxonomy;
	const currentTax = allTaxonomy[postType];
	const taxonomy = "";
	let categoriesList = [];
	let rest_base = "";

	if ( "undefined" !== typeof currentTax ) {

		if ( "undefined" !== typeof currentTax.taxonomy[taxonomyType] ) {
			rest_base = ( currentTax.taxonomy[taxonomyType].rest_base == false || currentTax.taxonomy[taxonomyType].rest_base == null ) ? currentTax.taxonomy[taxonomyType].name : currentTax.taxonomy[taxonomyType].rest_base;
		}

		if ( "" != taxonomyType ) {
			if ( "undefined" !== typeof currentTax.terms && "undefined" !== typeof currentTax.terms[taxonomyType] ) {
				categoriesList = currentTax.terms[taxonomyType];
			}
		}
	}

	const latestPostsQuery = {
		order,
		orderby: orderBy,
		per_page: postsToShow,
	};

	if ( excludeCurrentPost ) {		
		latestPostsQuery.exclude = select( "core/editor" ).getCurrentPostId();
	}
	const category = [];	
	const temp = parseInt( categories );
	category.push( temp );
	const catlenght = categoriesList.length;
	for ( let i=0;i<catlenght;i++ ){
		if ( categoriesList[i].id == temp ){
			if ( categoriesList[i].child.length !== 0 ){
				categoriesList[i].child.forEach( element => {
					category.push( element );
				} );
			}		
		}
	}
	if ( undefined !== categories && "" !== categories ) {
		latestPostsQuery[rest_base] = ( undefined === categories || "" === categories ) ? categories :category;
	}
	return {
		deviceType,
		latestPosts: getEntityRecords( "postType", postType, latestPostsQuery ),
		categoriesList,
		taxonomyList: ( "undefined" !== typeof currentTax ) ? currentTax.taxonomy : []
	};

} )( UAGBTimeline );