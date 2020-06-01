/**
 * BLOCK: FAQ
 */

import classnames from "classnames"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import times from "lodash/times"
import styling from "./styling"
import memoize from "memize"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n
const { compose } = wp.compose
const { select, withSelect } = wp.data;
const {
	Component,
	Fragment,
} = wp.element

const {
	ColorPalette,
	InspectorControls,
	InnerBlocks
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ButtonGroup,
	Button,
	Dashicon,
	ToggleControl,
	IconButton
} = wp.components

const ALLOWED_BLOCKS = [ "uagb/faq-child" ]

const faq = []	

let svg_icons = Object.keys( UAGBIcon )
class UAGBFaqEdit extends Component {

	constructor() {
		super( ...arguments )
		this.onchangeIcon = this.onchangeIcon.bind( this )
		this.onchangeActiveIcon = this.onchangeActiveIcon.bind( this )
		this.onchangeLayout = this.onchangeLayout.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { schema: JSON.stringify( this.props.schemaJsonData ) } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-faq-" + this.props.clientId )
		document.head.appendChild( $style )

		for ( var i = 1; i <= 2; i++ ) {		
			faq.push(	
				{	
					"question": 'What is FAQ?',	
					"answer": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',	
				}	
			)	
		}
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
	}
	onchangeIcon ( value ) {
		const { setAttributes } = this.props
		let getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		getChildBlocks.forEach((faqChild, key) => {
			faqChild.attributes.icon = value
		});

		setAttributes( { icon: value } )
	}
	onchangeActiveIcon ( value ) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

		getChildBlocks.forEach((faqChild, key) => {
			faqChild.attributes.iconActive = value
		});

		setAttributes( { iconActive: value } )
	}
	onchangeLayout ( value ) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

		getChildBlocks.forEach((faqChild, key) => {
			faqChild.attributes.layout = value
		});

		setAttributes( { layout: value } )
	}
 
	render() {

		const { attributes, setAttributes } = this.props
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
			questionPaddingTypeMobile,
			questionPaddingTypeTablet,
			questionPaddingTypeDesktop,
			vquestionPaddingMobile,
			vquestionPaddingTablet,
			vquestionPaddingDesktop,
			hquestionPaddingMobile,
			hquestionPaddingTablet,
			hquestionPaddingDesktop,
			answerTextColor,
			answerPaddingTypeMobile,
			answerPaddingTypeTablet,
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
			enableToggle,
			equalHeight
		} = attributes

		var element = document.getElementById( "uagb-style-faq-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const getFaqChildTemplate = memoize( ( faq_count, faq ) => {
			return times( faq_count, n => [ "uagb/faq-child", faq[n] ] )
		} )

		const equalHeightClass = equalHeight ? "uagb-faq-equal-height" : "";

		let loadQuestionGoogleFonts;
		let loadAnswerGoogleFonts;

		if( questionloadGoogleFonts == true ) {
			
			const qconfig = {
				google: {
					families: [ questionFontFamily + ( questionFontWeight ? ':' + questionFontWeight : '' ) ],
				},
			};

			loadQuestionGoogleFonts = (
				<WebfontLoader config={ qconfig }>
				</WebfontLoader>
			)
		}

		if( answerloadGoogleFonts == true ) {

			const aconfig = {
				google: {
					families: [ answerFontFamily + ( answerFontWeight ? ':' + answerFontWeight : '' ) ],
				},
			};

			loadAnswerGoogleFonts = (
				<WebfontLoader config={ aconfig }>
				</WebfontLoader>
			)
		}

		const faqGeneralSettings = () => {

			return (
				<PanelBody
					title={ __( "General" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<SelectControl
						label={ __( "Layout" ) }
						value={ layout }
						options={ [
							{ value: "accordion", label: __( "Accordion" ) },
							{ value: "grid", label: __( "Grid" ) },
						] }
						onChange={ (value) => this.onchangeLayout( value ) }
					/>
					{ 'accordion' === layout &&
						<Fragment>
							<ToggleControl
								label={ __( "Collapse other items" ) }
								checked={ inactiveOtherItems }
								onChange={ ( value ) => setAttributes( { inactiveOtherItems: ! inactiveOtherItems } ) }
							/>
							{ true === inactiveOtherItems &&
								<ToggleControl
									label={ __( "Expand First Item" ) }
									checked={ expandFirstItem }
									onChange={ ( value ) => setAttributes( { expandFirstItem: ! expandFirstItem } ) }
								/>
							}
							<ToggleControl
								label={ __( "Enable Toggle" ) }
								checked={ enableToggle }
								onChange={ ( value ) => setAttributes( { enableToggle: ! enableToggle } ) }
							/>
						</Fragment>
					}
					<ToggleControl
						label={ __( "Enable Schema Support" ) }
						checked={ enableSchemaSupport }
						onChange={ ( value ) => setAttributes( { enableSchemaSupport: ! enableSchemaSupport } ) }
					/>
					<hr className="uagb-editor__separator" />
					{ 'grid' === layout &&
						<RangeControl
							label={ __( "Columns" ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 0 }
							max={ 6 }
						/>
					}
					{ 'grid' === layout &&
						<Fragment>
							<h2> { __( "Alignment" ) }</h2>
							<IconButton
								key={ "left" }
								icon="editor-alignleft"
								label="Left"
								onClick={ () => setAttributes( { align: "left" } ) }
								aria-pressed = { "left" === align }
								isPrimary = { "left" === align }
							/>
							<IconButton
								key={ "center" }
								icon="editor-aligncenter"
								label="Right"
								onClick={ () => setAttributes( { align: "center" } ) }
								aria-pressed = { "center" === align }
								isPrimary = { "center" === align }
							/>
							<IconButton
								key={ "right" }
								icon="editor-alignright"
								label="Right"
								onClick={ () => setAttributes( { align: "right" } ) }
								aria-pressed = { "right" === align }
								isPrimary = { "right" === align }
							/>
						</Fragment>
					}
					{ 'accordion' === layout && faqIconSettings() }
				</PanelBody>
			)
		}

		const faqStylingSettings = () => {

			return (
				<PanelBody
					title={ __( "Style" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: boxBgColor }} ></span></span></p>
					<ColorPalette
						value={ boxBgColor }
						onChange={ ( value ) => setAttributes( { boxBgColor: value } ) }
						allowReset
					/>
					<RangeControl
						label={ __( "Rows Gap (px)" ) }
						value={ rowsGap }
						onChange={ ( value ) => setAttributes( { rowsGap: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					{ 'grid' === layout &&
						<Fragment>
							<RangeControl
								label={ __( "Columns Gap (px)" ) }
								value={ columnsGap }
								onChange={ ( value ) => setAttributes( { columnsGap: value } ) }
								min={ 0 }
								max={ 50 }
							/>
							<ToggleControl
							label={ __( "Equal Height" ) }
							checked={ equalHeight }
							onChange={ ( value ) => setAttributes( { equalHeight: ! equalHeight } ) }
							/>
						</Fragment>
					}
					<ToggleControl
						label={ __( "Enable Separator" ) }
						checked={ enableSeparator }
						onChange={ ( value ) => setAttributes( { enableSeparator: ! enableSeparator } ) }
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Border" ) }</h2>
					<SelectControl
						label={ __( "Style" ) }
						value={ borderStyle }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "solid", label: __( "Solid" ) },
							{ value: "dotted", label: __( "Dotted" ) },
							{ value: "dashed", label: __( "Dashed" ) },
							{ value: "double", label: __( "Double" ) },
						] }
						onChange={ value => {
							setAttributes( { borderStyle: value } )
						} }
					/>
					{ "none" !== borderStyle &&
						<RangeControl
							label={ __( "Thickness (px)" ) }
							value={ borderWidth }
							onChange={ value => {
								setAttributes( { borderWidth: value } )
							} }
							min={ 0 }
							max={ 20 }
						/>
					}
					{ "none" !== borderStyle &&
						<RangeControl
							label={ __( "Rounded Corners (px)" ) }
							value={ borderRadius }
							onChange={ value => {
								setAttributes( { borderRadius: value } )
							} }
							min={ 0 }
							max={ 50 }
						/>
					}
					<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
					<ColorPalette
						value={ borderColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
						allowReset
					/>
	
					{ 'accordion' === layout &&
						<Fragment>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Icon" ) }</h2>
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
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
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
										)
									} else {
										tabout = (
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
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
							<RangeControl
								label={ __( "Gap between Icon and Question" ) }
								value={ gapBtwIconQUestion }
								onChange={ ( value ) => setAttributes( { gapBtwIconQUestion: value } ) }
								min={ 0 }
								max={ 100 }
							/>
							<p className="uagb-setting-label">{ __( "Expand Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconColor }} ></span></span></p>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
								allowReset
							/>
							<p className="uagb-setting-label">{ __( "Collapse Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconActiveColor }} ></span></span></p>
							<ColorPalette
								value={ iconActiveColor }
								onChange={ ( value ) => setAttributes( { iconActiveColor: value } ) }
								allowReset
							/>
						</Fragment>
					}
				</PanelBody>
			)
		}
		const faqIconSettings = () => {

			return (
				<Fragment>
					<h2> { __( "Icon" ) } </h2>
					<p className="components-base-control__label">{__( "Expand" )}</p>
					<FontIconPicker
						icons={svg_icons}
						renderFunc= {renderSVG}
						theme="default"
						value={icon}
						onChange={ (value) => this.onchangeIcon( value ) }
						isMulti={false}
						noSelectedPlaceholder= { __( "Select Icon" ) }
					/>
					<p className="components-base-control__label">{__( "Collapse" )}</p>
					<FontIconPicker
						icons={svg_icons}
						renderFunc= {renderSVG}
						theme="default"
						value={iconActive}
						onChange={ (value) => this.onchangeActiveIcon( value ) }
						isMulti={false}
						noSelectedPlaceholder= { __( "Select Icon" ) }
					/>
					<h2> { __( "Icon Alignment" ) }</h2>
					<IconButton
					 	key={ "row" }
						icon="editor-alignleft"
						label="Left"
						onClick={ () => setAttributes( { iconAlign: "row" } ) }
						aria-pressed = { "row" === iconAlign }
						isPrimary = { "row" === iconAlign }
					/>
					<IconButton
						key={ "row-reverse" }
						icon="editor-alignright"
						label="Right"
						onClick={ () => setAttributes( { iconAlign: "row-reverse" } ) }
						aria-pressed = { "row-reverse" === iconAlign }
						isPrimary = { "row-reverse" === iconAlign }
					/>
				</Fragment>	
				)
		}
		const faqQuestionSettings = () => {

			return (
				<PanelBody
					title={ __( "Question" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: questionloadGoogleFonts, label: 'questionloadGoogleFonts'  } }
						fontFamily = { { value: questionFontFamily, label: 'questionFontFamily'  } }
						fontWeight = { { value: questionFontWeight, label: 'questionFontWeight'  } }
						fontSubset = { { value: questionFontSubset, label: 'questionFontSubset'  } }
						fontSizeType = { { value: questionFontSizeType, label: 'questionFontSizeType' } }
						fontSize = { { value: questionFontSize, label: 'questionFontSize'  } }
						fontSizeMobile = { { value: questionFontSizeMobile, label: 'questionFontSizeMobile'  } }
						fontSizeTablet= { { value: questionFontSizeTablet, label: 'questionFontSizeTablet' } }
						lineHeightType = { { value: questionLineHeightType, label: 'questionLineHeightType' } }
						lineHeight = { { value: questionLineHeight, label: 'questionLineHeight'  } }
						lineHeightMobile = { { value: questionLineHeightMobile, label: 'questionLineHeightMobile'  } }
						lineHeightTablet= { { value: questionLineHeightTablet, label: 'questionLineHeightTablet'  } }
					/>
					<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: questionTextColor }} ></span></span></p>
						<ColorPalette
							value={ questionTextColor }
							onChange={ ( value ) => setAttributes( { questionTextColor: value } ) }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Text Active/Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: questionTextActiveColor }} ></span></span></p>
						<ColorPalette
							value={ questionTextActiveColor }
							onChange={ ( value ) => setAttributes( { questionTextActiveColor: value } ) }
							allowReset
						/>
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeMobile === "px" } aria-pressed={ questionPaddingTypeMobile === "px" } onClick={ () => setAttributes( { questionPaddingTypeMobile: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeMobile === "%" } aria-pressed={ questionPaddingTypeMobile === "%" } onClick={ () => setAttributes( { questionPaddingTypeMobile: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vquestionPaddingMobile }
													onChange={ ( value ) => setAttributes( { vquestionPaddingMobile: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hquestionPaddingMobile }
													onChange={ ( value ) => setAttributes( { hquestionPaddingMobile: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
											</Fragment>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<Fragment>
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeTablet === "px" } aria-pressed={ questionPaddingTypeTablet === "px" } onClick={ () => setAttributes( { questionPaddingTypeTablet: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeTablet === "%" } aria-pressed={ questionPaddingTypeTablet === "%" } onClick={ () => setAttributes( { questionPaddingTypeTablet: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vquestionPaddingTablet }
													onChange={ ( value ) => setAttributes( { vquestionPaddingTablet: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hquestionPaddingTablet }
													onChange={ ( value ) => setAttributes( { hquestionPaddingTablet: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
											</Fragment>
										)
									} else {
										tabout = (
											<Fragment>
												<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "px" } aria-pressed={ questionPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ questionPaddingTypeDesktop === "%" } aria-pressed={ questionPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { questionPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Padding" ) }</h2>
												<RangeControl
													label={ UAGB_Block_Icons.vertical_spacing }
													className={ "uagb-margin-control" }
													value={ vquestionPaddingDesktop }
													onChange={ ( value ) => setAttributes( { vquestionPaddingDesktop: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={ UAGB_Block_Icons.horizontal_spacing }
													className={ "uagb-margin-control" }
													value={ hquestionPaddingDesktop }
													onChange={ ( value ) => setAttributes( { hquestionPaddingDesktop: value } ) }
													min={ 0 }
													max={ 100 }
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
			)
		}
		const faqAnswerSettings = () => {

			return (

				<PanelBody
					title={ __( "Answer" ) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					<TypographyControl
						label={ __( "Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: answerloadGoogleFonts, label: 'answerloadGoogleFonts'  } }
						fontFamily = { { value: answerFontFamily, label: 'answerFontFamily'  } }
						fontWeight = { { value: answerFontWeight, label: 'answerFontWeight'  } }
						fontSubset = { { value: answerFontSubset, label: 'answerFontSubset'  } }
						fontSizeType = { { value: answerFontSizeType, label: 'answerFontSizeType' } }
						fontSize = { { value: answerFontSize, label: 'answerFontSize'  } }
						fontSizeMobile = { { value: answerFontSizeMobile, label: 'answerFontSizeMobile'  } }
						fontSizeTablet= { { value: answerFontSizeTablet, label: 'answerFontSizeTablet' } }
						lineHeightType = { { value: answerLineHeightType, label: 'answerLineHeightType' } }
						lineHeight = { { value: answerLineHeight, label: 'answerLineHeight'  } }
						lineHeightMobile = { { value: answerLineHeightMobile, label: 'answerLineHeightMobile'  } }
						lineHeightTablet= { { value: answerLineHeightTablet, label: 'answerLineHeightTablet'  } }
					/>
					<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: answerTextColor }} ></span></span></p>
					<ColorPalette
						value={ answerTextColor }
						onChange={ ( value ) => setAttributes( { answerTextColor: value } ) }
						allowReset
					/>
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
												<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeMobile === "px" } aria-pressed={ answerPaddingTypeMobile === "px" } onClick={ () => setAttributes( { answerPaddingTypeMobile: "px" } ) }>{ "px" }</Button>
												<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeMobile === "%" } aria-pressed={ answerPaddingTypeMobile === "%" } onClick={ () => setAttributes( { answerPaddingTypeMobile: "%" } ) }>{ "%" }</Button>
											</ButtonGroup>
											<h2>{ __( "Padding" ) }</h2>
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
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<Fragment>
											<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeTablet === "px" } aria-pressed={ answerPaddingTypeTablet === "px" } onClick={ () => setAttributes( { answerPaddingTypeTablet: "px" } ) }>{ "px" }</Button>
												<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeTablet === "%" } aria-pressed={ answerPaddingTypeTablet === "%" } onClick={ () => setAttributes( { answerPaddingTypeTablet: "%" } ) }>{ "%" }</Button>
											</ButtonGroup>
											<h2>{ __( "Padding" ) }</h2>
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
									)
								} else {
									tabout = (
										<Fragment>
											<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "px" } aria-pressed={ answerPaddingTypeDesktop === "px" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "px" } ) }>{ "px" }</Button>
												<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ answerPaddingTypeDesktop === "%" } aria-pressed={ answerPaddingTypeDesktop === "%" } onClick={ () => setAttributes( { answerPaddingTypeDesktop: "%" } ) }>{ "%" }</Button>
											</ButtonGroup>
											<h2>{ __( "Padding" ) }</h2>
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
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				</PanelBody>
			)
		}
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
					`uagb-block-${ this.props.clientId }`,
					`uagb-faq-icon-${ this.props.attributes.iconAlign }`,
					`uagb-faq-layout-${ this.props.attributes.layout }`,
					`uagb-faq-expand-first-${ this.props.attributes.expandFirstItem }`,
					`uagb-faq-inactive-other-${ this.props.attributes.inactiveOtherItems }`,
					equalHeightClass
				) }
				data-faqtoggle = { this.props.attributes.enableToggle }
				>
                    <InnerBlocks
                        template={ getFaqChildTemplate( 2, faq ) }
                        templateLock={ false }
                        allowedBlocks={ ALLOWED_BLOCKS }
                        __experimentalMoverDirection={ 'vertical' }
                    />
				</div>
					{ loadQuestionGoogleFonts }
					{ loadAnswerGoogleFonts }
			</Fragment>
		)
	}
}

export default compose(
	withSelect( ( select, ownProps ) => {

		var faq_data = {}
		var json_data = {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": []
		}
		const faqChildBlocks = select('core/block-editor').getBlocks( ownProps.clientId );

		faqChildBlocks.forEach((faqChild, key) => {

			faq_data = {
				"@type" : "Question",
				"name" : faqChild.attributes.question,
				"acceptedAnswer" : {
					"@type" : "Answer",
					"text" : faqChild.attributes.answer
				}
			}
			json_data["mainEntity"][key] = faq_data;
		});

		return {
			schemaJsonData: json_data
		};
	} )
) ( UAGBFaqEdit )
