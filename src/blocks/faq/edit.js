/**
 * BLOCK: FAQ
 */

import classnames from "classnames";
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import times from "lodash/times";
import styling from "./styling";
import memoize from "memize";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import Columnresponsive from "../../components/typography/column-responsive";

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography";

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader";

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { select, withSelect } = wp.data;
const {
	Component,
	Fragment,
} = wp.element;

const {
	ColorPalette,
	InspectorControls,
	InnerBlocks
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ButtonGroup,
	Button,
	Dashicon,
	ToggleControl,
} = wp.components;

const ALLOWED_BLOCKS = [ "uagb/faq-child" ];

const faq = [];	

const svg_icons = Object.keys( UAGBIcon );
class UAGBFaqEdit extends Component {

	constructor() {
		super( ...arguments );
		this.onchangeIcon = this.onchangeIcon.bind( this );
		this.onchangeActiveIcon = this.onchangeActiveIcon.bind( this );
		this.onchangeLayout = this.onchangeLayout.bind( this );
		this.onchangeTag = this.onchangeTag.bind( this );
	}

	componentDidMount() {

		const { attributes, setAttributes } = this.props;

		const {
			questionBottomPaddingDesktop,
			vquestionPaddingDesktop,
			questionLeftPaddingDesktop,
			hquestionPaddingDesktop,
			questionBottomPaddingTablet,
			vquestionPaddingTablet,
			questionLeftPaddingTablet,
			hquestionPaddingTablet,
			questionBottomPaddingMobile,
			vquestionPaddingMobile,
			questionLeftPaddingMobile,
			hquestionPaddingMobile,
		} = attributes;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		setAttributes( { schema: JSON.stringify( this.props.schemaJsonData ) } );
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-faq-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
		for ( let i = 1; i <= 2; i++ ) {		
			faq.push(	
				{	
					"question": "What is FAQ?",	
					"answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",	
				}	
			);	
		}
		
		if ( 10 === questionBottomPaddingDesktop && 10 !== vquestionPaddingDesktop ) {

			setAttributes( { questionBottomPaddingDesktop: vquestionPaddingDesktop } );
		}
		if ( 10 === questionLeftPaddingDesktop && 10 !== hquestionPaddingDesktop ) {

			setAttributes( { questionLeftPaddingDesktop: hquestionPaddingDesktop } );
		}

		if ( 10 === questionBottomPaddingTablet && 10 !== vquestionPaddingTablet ) {

			setAttributes( { questionBottomPaddingTablet: vquestionPaddingTablet } );
		}
		if ( 10 === questionLeftPaddingTablet && 10 !== hquestionPaddingTablet ) {

			setAttributes( { questionLeftPaddingTablet: hquestionPaddingTablet } );
		}

		if ( 10 === questionBottomPaddingMobile && 10 !== vquestionPaddingMobile ) {

			setAttributes( { questionBottomPaddingMobile: vquestionPaddingMobile } );
		}
		if ( 10 === questionLeftPaddingMobile && 10 !== hquestionPaddingMobile ) {

			setAttributes( { questionLeftPaddingMobile: hquestionPaddingMobile } );
		}
	}

	componentDidUpdate( prevProps, prevState ) {
		if (
			JSON.stringify( this.props.schemaJsonData ) !==
			JSON.stringify( prevProps.schemaJsonData )
		) {
			this.props.setAttributes( {
				schema: JSON.stringify( this.props.schemaJsonData )
			} );
		}
		const element = document.getElementById( "uagb-style-faq-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}

		const getChildBlocks = select( "core/block-editor" ).getBlocks( this.props.clientId );

		getChildBlocks.forEach( ( faqChild, key ) => {
			faqChild.attributes.headingTag = this.props.attributes.headingTag;
		} );
	}
	onchangeIcon ( value ) {
		const { setAttributes } = this.props;
		const getChildBlocks = select( "core/block-editor" ).getBlocks( this.props.clientId );
		getChildBlocks.forEach( ( faqChild, key ) => {
			faqChild.attributes.icon = value;
		} );

		setAttributes( { icon: value } );
	}
	onchangeActiveIcon ( value ) {
		const { setAttributes } = this.props;
		const getChildBlocks = select( "core/block-editor" ).getBlocks( this.props.clientId );

		getChildBlocks.forEach( ( faqChild, key ) => {
			faqChild.attributes.iconActive = value;
		} );

		setAttributes( { iconActive: value } );
	}
	onchangeLayout ( value ) {
		const { setAttributes } = this.props;
		const getChildBlocks = select( "core/block-editor" ).getBlocks( this.props.clientId );

		getChildBlocks.forEach( ( faqChild, key ) => {
			faqChild.attributes.layout = value;
		} );

		setAttributes( { layout: value } );
	}
	onchangeTag ( value ) {
		const { setAttributes } = this.props;
		const getChildBlocks = select( "core/block-editor" ).getBlocks( this.props.clientId );

		getChildBlocks.forEach( ( faqChild, key ) => {
			faqChild.attributes.headingTag = value;
		} );

		setAttributes( { headingTag: value } );
	}
 
	render() {

		const { attributes, setAttributes, deviceType } = this.props;
		const {
			layout,
			inactiveOtherItems,
			expandFirstItem,
			enableSchemaSupport,
			rowsGap,
			columnsGap,
			align,
			enableSeparator,
			boxBgColor,
			borderStyle,
			borderWidth,
			borderRadius,
			borderColor,
			questionTextColor,
			questionTextActiveColor,
			questionPaddingTypeDesktop,
			answerTextColor,
			answerPaddingTypeDesktop,
			vanswerPaddingMobile,
			vanswerPaddingTablet,
			vanswerPaddingDesktop,
			hanswerPaddingMobile,
			hanswerPaddingTablet,
			hanswerPaddingDesktop,
			iconColor,
			iconActiveColor,
			gapBtwIconQUestion,
			questionloadGoogleFonts,
			questionFontFamily,
			questionFontWeight,
			questionFontSubset,
			questionFontSizeType,
			questionFontSize,
			questionFontSizeMobile,
			questionFontSizeTablet,
			questionLineHeightType,
			questionLineHeight,
			questionLineHeightMobile,
			questionLineHeightTablet,
			answerloadGoogleFonts,
			answerFontFamily,
			answerFontWeight,
			answerFontSubset,
			answerFontSizeType,
			answerFontSize,
			answerFontSizeMobile,
			answerFontSizeTablet,
			answerLineHeightType,
			answerLineHeight,
			answerLineHeightMobile,
			answerLineHeightTablet,
			icon,
			iconActive,
			iconAlign,
			iconSizeType,
			iconSizeMobile,
			iconSizeTablet,
			iconSize,
			columns,
			tcolumns,
			mcolumns,
			enableToggle,
			equalHeight,
			questionLeftPaddingTablet,
			hquestionPaddingTablet,
			vquestionPaddingTablet,
			questionBottomPaddingTablet,
			questionLeftPaddingDesktop,
			hquestionPaddingDesktop,
			vquestionPaddingDesktop,
			questionBottomPaddingDesktop,
			questionLeftPaddingMobile,
			hquestionPaddingMobile,
			vquestionPaddingMobile,
			questionBottomPaddingMobile,
			headingTag
		} = attributes;

		const getFaqChildTemplate = memoize( ( faq_count, faq ) => {
			return times( faq_count, n => [ "uagb/faq-child", faq[n] ] );
		} );

		const equalHeightClass = equalHeight ? "uagb-faq-equal-height" : "";

		let loadQuestionGoogleFonts;
		let loadAnswerGoogleFonts;

		if ( questionloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ questionFontFamily + ( questionFontWeight ? ":" + questionFontWeight : "" ) ],
				},
			};

			loadQuestionGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			);
		}

		if ( answerloadGoogleFonts == true ) {

			const aconfig = {
				google: {
					families: [ answerFontFamily + ( answerFontWeight ? ":" + answerFontWeight : "" ) ],
				},
			};

			loadAnswerGoogleFonts = (
				<WebfontLoader config={ aconfig }>
				</WebfontLoader>
			);
		}

		const faqGeneralSettings = () => {

			return (
				<PanelBody
					title={ __( "General", "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<SelectControl
						label={ __( "Layout", "ultimate-addons-for-gutenberg" ) }
						value={ layout }
						options={ [
							{ value: "accordion", label: __( "Accordion", "ultimate-addons-for-gutenberg" ) },
							{ value: "grid", label: __( "Grid", "ultimate-addons-for-gutenberg" ) },
						] }
						onChange={ ( value ) => this.onchangeLayout( value ) }
					/>
					{ "accordion" === layout &&
						<Fragment>
							<ToggleControl
								label={ __( "Collapse other items", "ultimate-addons-for-gutenberg" ) }
								checked={ inactiveOtherItems }
								onChange={ ( value ) => setAttributes( { inactiveOtherItems: ! inactiveOtherItems } ) }
							/>
							{ true === inactiveOtherItems &&
								<ToggleControl
									label={ __( "Expand First Item", "ultimate-addons-for-gutenberg" ) }
									checked={ expandFirstItem }
									onChange={ ( value ) => setAttributes( { expandFirstItem: ! expandFirstItem } ) }
								/>
							}
							<ToggleControl
								label={ __( "Enable Toggle", "ultimate-addons-for-gutenberg" ) }
								checked={ enableToggle }
								onChange={ ( value ) => setAttributes( { enableToggle: ! enableToggle } ) }
							/>
						</Fragment>
					}
					<ToggleControl
						label={ __( "Enable Schema Support", "ultimate-addons-for-gutenberg" ) }
						checked={ enableSchemaSupport }
						onChange={ ( value ) => setAttributes( { enableSchemaSupport: ! enableSchemaSupport } ) }
					/>
					<hr className="uagb-editor__separator" />
					{ "grid" === layout &&						
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
									let tabout;

									if ( "mobile" === tab.name ) {
										tabout = (
											<RangeControl
												label={ __( "Mobile Columns", "ultimate-addons-for-gutenberg" ) }
												value={ mcolumns }
												onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
												min={ 1 }
												max={ 2 }
											/>
										);
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<RangeControl
												label={ __( "Tab Columns", "ultimate-addons-for-gutenberg" ) }
												value={ tcolumns }
												onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
												min={ 1 }
												max={ 4 }
											/>
										);
									} else {
										tabout = (
											<RangeControl
												label={ __( "Desktop Columns", "ultimate-addons-for-gutenberg" ) }
												value={ columns }
												onChange={ ( value ) => setAttributes( { columns: value } ) }
												min={ 1 }
												max={ 6 }
											/>
										);
									}

									return <div>{ tabout }</div>;
								}
							}
						</TabPanel>
					}
					{ "grid" === layout &&
						<Fragment>
							<h2> { __( "Alignment", "ultimate-addons-for-gutenberg" ) }</h2>
							<Button
								key={ "left" }
								icon="editor-alignleft"
								label="Left"
								onClick={ () => setAttributes( { align: "left" } ) }
								aria-pressed={ "left" === align }
								isPrimary={ "left" === align }
							/>
							<Button
								key={ "center" }
								icon="editor-aligncenter"
								label="Right"
								onClick={ () => setAttributes( { align: "center" } ) }
								aria-pressed={ "center" === align }
								isPrimary={ "center" === align }
							/>
							<Button
								key={ "right" }
								icon="editor-alignright"
								label="Right"
								onClick={ () => setAttributes( { align: "right" } ) }
								aria-pressed={ "right" === align }
								isPrimary={ "right" === align }
							/>
						</Fragment>
					}
					{ "accordion" === layout && faqIconSettings() }
				</PanelBody>
			);
		};

		const faqStylingSettings = () => {

			return (
				<PanelBody
					title={ __( "Style", "ultimate-addons-for-gutenberg" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<p className="uagb-setting-label">{ __( "Background Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: boxBgColor } } ></span></span></p>
					<ColorPalette
						value={ boxBgColor }
						onChange={ ( value ) => setAttributes( { boxBgColor: value } ) }
						allowReset
					/>
					<RangeControl
						label={ __( "Rows Gap (px)", "ultimate-addons-for-gutenberg" ) }
						value={ rowsGap }
						onChange={ ( value ) => setAttributes( { rowsGap: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					{ "grid" === layout &&
						<Fragment>
							<RangeControl
								label={ __( "Columns Gap (px)", "ultimate-addons-for-gutenberg" ) }
								value={ columnsGap }
								onChange={ ( value ) => setAttributes( { columnsGap: value } ) }
								min={ 0 }
								max={ 50 }
							/>
							<ToggleControl
								label={ __( "Equal Height", "ultimate-addons-for-gutenberg" ) }
								checked={ equalHeight }
								onChange={ ( value ) => setAttributes( { equalHeight: ! equalHeight } ) }
							/>
						</Fragment>
					}
					<ToggleControl
						label={ __( "Enable Separator", "ultimate-addons-for-gutenberg" ) }
						checked={ enableSeparator }
						onChange={ ( value ) => setAttributes( { enableSeparator: ! enableSeparator } ) }
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Border", "ultimate-addons-for-gutenberg" ) }</h2>
					<SelectControl
						label={ __( "Style", "ultimate-addons-for-gutenberg" ) }
						value={ borderStyle }
						options={ [
							{ value: "none", label: __( "None", "ultimate-addons-for-gutenberg" ) },
							{ value: "solid", label: __( "Solid", "ultimate-addons-for-gutenberg" ) },
							{ value: "dotted", label: __( "Dotted", "ultimate-addons-for-gutenberg" ) },
							{ value: "dashed", label: __( "Dashed", "ultimate-addons-for-gutenberg" ) },
							{ value: "double", label: __( "Double", "ultimate-addons-for-gutenberg" ) },
						] }
						onChange={ value => {
							setAttributes( { borderStyle: value } );
						} }
					/>
					{ "none" !== borderStyle &&
						<RangeControl
							label={ __( "Thickness (px)", "ultimate-addons-for-gutenberg" ) }
							value={ borderWidth }
							onChange={ value => {
								setAttributes( { borderWidth: value } );
							} }
							min={ 0 }
							max={ 20 }
						/>
					}
					{ "none" !== borderStyle &&
						<RangeControl
							label={ __( "Rounded Corners (px)", "ultimate-addons-for-gutenberg" ) }
							value={ borderRadius }
							onChange={ value => {
								setAttributes( { borderRadius: value } );
							} }
							min={ 0 }
							max={ 50 }
						/>
					}
					<p className="uagb-setting-label">{ __( "Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: borderColor } } ></span></span></p>
					<ColorPalette
						value={ borderColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
						allowReset
					/>
	
					{ "accordion" === layout &&
						<Fragment>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Icon", "ultimate-addons-for-gutenberg" ) }</h2>
							<Columnresponsive />
							{ "Desktop" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
										<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "px" } aria-pressed={ iconSizeType === "px" } onClick={ () => setAttributes( { iconSizeType: "px" } ) }>{ "px" }</Button>
										<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "%" } aria-pressed={ iconSizeType === "%" } onClick={ () => setAttributes( { iconSizeType: "%" } ) }>{ "%" }</Button>
									</ButtonGroup>
									<h2>{ __( "Size" ) }</h2>
									<RangeControl
										value={ iconSize }
										onChange={ ( value ) => setAttributes( { iconSize: value } ) }
										min={ 0 }
										max={ 100 }
										allowReset
									/>
								</Fragment>
							) }
							{ "Tablet" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
										<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "px" } aria-pressed={ iconSizeType === "px" } onClick={ () => setAttributes( { iconSizeType: "px" } ) }>{ "px" }</Button>
										<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "%" } aria-pressed={ iconSizeType === "%" } onClick={ () => setAttributes( { iconSizeType: "%" } ) }>{ "%" }</Button>
									</ButtonGroup>
									<h2>{ __( "Size" ) }</h2>
									<RangeControl
										value={ iconSizeTablet }
										onChange={ ( value ) => setAttributes( { iconSizeTablet: value } ) }
										min={ 0 }
										max={ 100 }
										allowReset
									/>
								</Fragment>
							) }
							{ "Mobile" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
										<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "px" } aria-pressed={ iconSizeType === "px" } onClick={ () => setAttributes( { iconSizeType: "px" } ) }>{ "px" }</Button>
										<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "%" } aria-pressed={ iconSizeType === "%" } onClick={ () => setAttributes( { iconSizeType: "%" } ) }>{ "%" }</Button>
									</ButtonGroup>
									<h2>{ __( "Size" ) }</h2>
									<RangeControl
										value={ iconSizeMobile }
										onChange={ ( value ) => setAttributes( { iconSizeMobile: value } ) }
										min={ 0 }
										max={ 100 }
										allowReset
									/>
								</Fragment>
							) }
							<RangeControl
								label={ __( "Gap between Icon and Question", "ultimate-addons-for-gutenberg" ) }
								value={ gapBtwIconQUestion }
								onChange={ ( value ) => setAttributes( { gapBtwIconQUestion: value } ) }
								min={ 0 }
								max={ 100 }
							/>
							<p className="uagb-setting-label">{ __( "Expand Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: iconColor } } ></span></span></p>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
								allowReset
							/>
							<p className="uagb-setting-label">{ __( "Collapse Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: iconActiveColor } } ></span></span></p>
							<ColorPalette
								value={ iconActiveColor }
								onChange={ ( value ) => setAttributes( { iconActiveColor: value } ) }
								allowReset
							/>
						</Fragment>
					}
				</PanelBody>
			);
		};
		const faqIconSettings = () => {

			return (
				<Fragment>
					<h2> { __( "Icon", "ultimate-addons-for-gutenberg" ) } </h2>
					<p className="components-base-control__label">{ __( "Expand", "ultimate-addons-for-gutenberg" ) }</p>
					<FontIconPicker
						icons={ svg_icons }
						renderFunc={ renderSVG }
						theme="default"
						value={ icon }
						onChange={ ( value ) => this.onchangeIcon( value ) }
						isMulti={ false }
						noSelectedPlaceholder={ __( "Select Icon", "ultimate-addons-for-gutenberg" ) }
					/>
					<p className="components-base-control__label">{ __( "Collapse", "ultimate-addons-for-gutenberg" ) }</p>
					<FontIconPicker
						icons={ svg_icons }
						renderFunc={ renderSVG }
						theme="default"
						value={ iconActive }
						onChange={ ( value ) => this.onchangeActiveIcon( value ) }
						isMulti={ false }
						noSelectedPlaceholder={ __( "Select Icon", "ultimate-addons-for-gutenberg" ) }
					/>
					<h2> { __( "Icon Alignment", "ultimate-addons-for-gutenberg" ) }</h2>
					<Button
						key={ "row" }
						icon="editor-alignleft"
						label="Left"
						onClick={ () => setAttributes( { iconAlign: "row" } ) }
						aria-pressed={ "row" === iconAlign }
						isPrimary={ "row" === iconAlign }
					/>
					<Button
						key={ "row-reverse" }
						icon="editor-alignright"
						label="Right"
						onClick={ () => setAttributes( { iconAlign: "row-reverse" } ) }
						aria-pressed={ "row-reverse" === iconAlign }
						isPrimary={ "row-reverse" === iconAlign }
					/>
				</Fragment>	
			);
		};
		const faqQuestionSettings = () => {

			return (
				<PanelBody
					title={ __( "Question", "ultimate-addons-for-gutenberg" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<SelectControl
						label={ __( "Question Tag", "ultimate-addons-for-gutenberg" ) }
						value={ headingTag }
						onChange={ ( value ) => this.onchangeTag( value ) }
						options={ [
							{ value: "span", label: __( "Span", "ultimate-addons-for-gutenberg" ) },
							{ value: "p", label: __( "P", "ultimate-addons-for-gutenberg" ) },
							{ value: "h1", label: __( "H1", "ultimate-addons-for-gutenberg" ) },
							{ value: "h2", label: __( "H2", "ultimate-addons-for-gutenberg" ) },
							{ value: "h3", label: __( "H3", "ultimate-addons-for-gutenberg" ) },
							{ value: "h4", label: __( "H4", "ultimate-addons-for-gutenberg" ) },
							{ value: "h5", label: __( "H5", "ultimate-addons-for-gutenberg" ) },
							{ value: "h6", label: __( "H6", "ultimate-addons-for-gutenberg" ) },
						] }
					/>
					<TypographyControl
						label={ __( "Typography", "ultimate-addons-for-gutenberg" ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: questionloadGoogleFonts, label: "questionloadGoogleFonts"  } }
						fontFamily={ { value: questionFontFamily, label: "questionFontFamily"  } }
						fontWeight={ { value: questionFontWeight, label: "questionFontWeight"  } }
						fontSubset={ { value: questionFontSubset, label: "questionFontSubset"  } }
						fontSizeType={ { value: questionFontSizeType, label: "questionFontSizeType" } }
						fontSize={ { value: questionFontSize, label: "questionFontSize"  } }
						fontSizeMobile={ { value: questionFontSizeMobile, label: "questionFontSizeMobile"  } }
						fontSizeTablet={ { value: questionFontSizeTablet, label: "questionFontSizeTablet" } }
						lineHeightType={ { value: questionLineHeightType, label: "questionLineHeightType" } }
						lineHeight={ { value: questionLineHeight, label: "questionLineHeight"  } }
						lineHeightMobile={ { value: questionLineHeightMobile, label: "questionLineHeightMobile"  } }
						lineHeightTablet={ { value: questionLineHeightTablet, label: "questionLineHeightTablet"  } }
					/>
					<p className="uagb-setting-label">{ __( "Text Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: questionTextColor } } ></span></span></p>
					<ColorPalette
						value={ questionTextColor }
						onChange={ ( value ) => setAttributes( { questionTextColor: value } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Text Active/Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: questionTextActiveColor } } ></span></span></p>
					<ColorPalette
						value={ questionTextActiveColor }
						onChange={ ( value ) => setAttributes( { questionTextActiveColor: value } ) }
						allowReset
					/>
					<Columnresponsive />
					{ "Desktop" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "px" } aria-pressed={ questionPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "%" } aria-pressed={ questionPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.left_margin }
								className={ "uagb-margin-control" }
								value={ questionLeftPaddingDesktop }
								onChange={ ( value ) => setAttributes( { questionLeftPaddingDesktop: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.right_margin }
								className={ "uagb-margin-control" }
								value={ hquestionPaddingDesktop }
								onChange={ ( value ) => setAttributes( { hquestionPaddingDesktop: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.top_margin }
								className={ "uagb-margin-control" }
								value={ vquestionPaddingDesktop }
								onChange={ ( value ) => setAttributes( { vquestionPaddingDesktop: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.bottom_margin }
								className={ "uagb-margin-control" }
								value={ questionBottomPaddingDesktop }
								onChange={ ( value ) => setAttributes( { questionBottomPaddingDesktop: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
						</Fragment>
					) }
					{ "Tablet" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "px" } aria-pressed={ questionPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "%" } aria-pressed={ questionPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.left_margin }
								className={ "uagb-margin-control" }
								value={ questionLeftPaddingTablet }
								onChange={ ( value ) => setAttributes( { questionLeftPaddingTablet: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.right_margin }
								className={ "uagb-margin-control" }
								value={ hquestionPaddingTablet }
								onChange={ ( value ) => setAttributes( { hquestionPaddingTablet: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.top_margin }
								className={ "uagb-margin-control" }
								value={ vquestionPaddingTablet }
								onChange={ ( value ) => setAttributes( { vquestionPaddingTablet: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.bottom_margin }
								className={ "uagb-margin-control" }
								value={ questionBottomPaddingTablet }
								onChange={ ( value ) => setAttributes( { questionBottomPaddingTablet: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
						</Fragment>
					) }
					{ "Mobile" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "px" } aria-pressed={ questionPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "%" } aria-pressed={ questionPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.left_margin }
								className={ "uagb-margin-control" }
								value={ questionLeftPaddingMobile }
								onChange={ ( value ) => setAttributes( { questionLeftPaddingMobile: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.right_margin }
								className={ "uagb-margin-control" }
								value={ hquestionPaddingMobile }
								onChange={ ( value ) => setAttributes( { hquestionPaddingMobile: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.top_margin }
								className={ "uagb-margin-control" }
								value={ vquestionPaddingMobile }
								onChange={ ( value ) => setAttributes( { vquestionPaddingMobile: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.bottom_margin }
								className={ "uagb-margin-control" }
								value={ questionBottomPaddingMobile }
								onChange={ ( value ) => setAttributes( { questionBottomPaddingMobile: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
						</Fragment>
					) }
				</PanelBody>
			);
		};
		const faqAnswerSettings = () => {

			return (

				<PanelBody
					title={ __( "Answer", "ultimate-addons-for-gutenberg" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<TypographyControl
						label={ __( "Typography", "ultimate-addons-for-gutenberg" ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ { value: answerloadGoogleFonts, label: "answerloadGoogleFonts"  } }
						fontFamily={ { value: answerFontFamily, label: "answerFontFamily"  } }
						fontWeight={ { value: answerFontWeight, label: "answerFontWeight"  } }
						fontSubset={ { value: answerFontSubset, label: "answerFontSubset"  } }
						fontSizeType={ { value: answerFontSizeType, label: "answerFontSizeType" } }
						fontSize={ { value: answerFontSize, label: "answerFontSize"  } }
						fontSizeMobile={ { value: answerFontSizeMobile, label: "answerFontSizeMobile"  } }
						fontSizeTablet={ { value: answerFontSizeTablet, label: "answerFontSizeTablet" } }
						lineHeightType={ { value: answerLineHeightType, label: "answerLineHeightType" } }
						lineHeight={ { value: answerLineHeight, label: "answerLineHeight"  } }
						lineHeightMobile={ { value: answerLineHeightMobile, label: "answerLineHeightMobile"  } }
						lineHeightTablet={ { value: answerLineHeightTablet, label: "answerLineHeightTablet"  } }
					/>
					<p className="uagb-setting-label">{ __( "Text Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: answerTextColor } } ></span></span></p>
					<ColorPalette
						value={ answerTextColor }
						onChange={ ( value ) => setAttributes( { answerTextColor: value } ) }
						allowReset
					/>
					<Columnresponsive />
					{ "Desktop" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "px" } aria-pressed={ answerPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "%" } aria-pressed={ answerPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.vertical_spacing }
								className={ "uagb-margin-control" }
								value={ vanswerPaddingDesktop }
								onChange={ ( value ) => setAttributes( { vanswerPaddingDesktop: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.horizontal_spacing }
								className={ "uagb-margin-control" }
								value={ hanswerPaddingDesktop }
								onChange={ ( value ) => setAttributes( { hanswerPaddingDesktop: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
						</Fragment>
					) }
					{ "Tablet" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "px" } aria-pressed={ answerPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "%" } aria-pressed={ answerPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.vertical_spacing }
								className={ "uagb-margin-control" }
								value={ vanswerPaddingTablet }
								onChange={ ( value ) => setAttributes( { vanswerPaddingTablet: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.horizontal_spacing }
								className={ "uagb-margin-control" }
								value={ hanswerPaddingTablet }
								onChange={ ( value ) => setAttributes( { hanswerPaddingTablet: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
						</Fragment>
					) }
					{ "Mobile" === deviceType && (
						<Fragment>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "px" } aria-pressed={ answerPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "%" } aria-pressed={ answerPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.vertical_spacing }
								className={ "uagb-margin-control" }
								value={ vanswerPaddingMobile }
								onChange={ ( value ) => setAttributes( { vanswerPaddingMobile: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.horizontal_spacing }
								className={ "uagb-margin-control" }
								value={ hanswerPaddingMobile }
								onChange={ ( value ) => setAttributes( { hanswerPaddingMobile: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
						</Fragment>
					) }
				</PanelBody>
			);
		};
		return (
			<Fragment>
				<InspectorControls>
					{ faqGeneralSettings() }
					{ faqStylingSettings() }
					{ faqQuestionSettings() }
					{ faqAnswerSettings() }
				</InspectorControls>
				
				<div className={ classnames(
					"uagb-faq__outer-wrap",
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`,
					`uagb-faq-icon-${ this.props.attributes.iconAlign }`,
					`uagb-faq-layout-${ this.props.attributes.layout }`,
					`uagb-faq-expand-first-${ this.props.attributes.expandFirstItem }`,
					`uagb-faq-inactive-other-${ this.props.attributes.inactiveOtherItems }`,
					equalHeightClass
				) }
				data-faqtoggle={ this.props.attributes.enableToggle } 
				role="tablist"
				>
					<InnerBlocks
						template={ getFaqChildTemplate( 2, faq ) }
						templateLock={ false }
						allowedBlocks={ ALLOWED_BLOCKS }
						__experimentalMoverDirection={ "vertical" }
					/>
				</div>
				{ loadQuestionGoogleFonts }
				{ loadAnswerGoogleFonts }
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, ownProps ) => {
		const page_url = select( "core/editor" ).getPermalink();
		const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );

    	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

		let faq_data = {};
		const json_data = {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"@id": page_url,
			"mainEntity": []
		};
		const faqChildBlocks = select( "core/block-editor" ).getBlocks( ownProps.clientId );

		faqChildBlocks.forEach( ( faqChild, key ) => {

			faq_data = {
				"@type" : "Question",
				"name" : faqChild.attributes.question,
				"acceptedAnswer" : {
					"@type" : "Answer",
					"text" : faqChild.attributes.answer
				}
			};
			json_data.mainEntity[key] = faq_data;
		} );

		return {
			deviceType,
			schemaJsonData: json_data
		};
	} )
) ( UAGBFaqEdit );
