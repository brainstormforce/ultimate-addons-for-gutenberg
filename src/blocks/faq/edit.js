/**
 * BLOCK: FAQ
 */

import classnames from "classnames"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import times from "lodash/times"
import map from "lodash/map"
import styling from "./styling"
import memoize from "memize"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n
const { select, dispatch } = wp.data;
const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
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
} = wp.components

const { 
	withDispatch, 
	useDispatch, 
	useSelect 
} = wp.data
const ALLOWED_BLOCKS = [ "uagb/faq-child" ]

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
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-faq-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	onchangeIcon ( value ) {
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		const { setAttributes } = this.props
		let innerBlocks = select('core/block-editor').getBlocks( this.props.clientId );
		innerBlocks.forEach((faqChild, key) => {
			faqChild.attributes.icon = value
		});

		setAttributes( { icon: value } )
		replaceInnerBlocks( this.props.clientId, innerBlocks, false );
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
            faq,
			faq_count,
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
			questionfontFamily,
			questionfontWeight,
			questionfontSubset,
			questionfontSizeType,
			questionfontSize,
			questionfontSizeMobile,
			questionfontSizeTablet,
			questionlineHeightType,
			questionlineHeight,
			questionlineHeightMobile,
			questionlineHeightTablet,
			answerloadGoogleFonts,
			answerfontFamily,
			answerfontWeight,
			answerfontSubset,
			answerfontSizeType,
			answerfontSize,
			answerfontSizeMobile,
			answerfontSizeTablet,
			answerlineHeightType,
			answerlineHeight,
			answerlineHeightMobile,
			answerlineHeightTablet,
			icon,
			iconActive,
			iconAlign,
			iconSizeType,
			iconSizeMobile,
			iconSizeTablet,
			iconSize,
			columns,
			schemaJsonData
		} = attributes
///////// Code to create JSON-LD////////////////////////////////////  
		var faq_data = {}
		var json_data = {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": []
		}
		const faqChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

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

		setAttributes( { schemaJsonData: json_data } )
		// console.log(schemaJsonData)
/////////////////////////////////////////////////////////////////////
		var element = document.getElementById( "uagb-style-faq-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const getFaqChildTemplate = memoize( ( faq_count, faq ) => {
			return times( faq_count, n => [ "uagb/faq-child", faq[n] ] )
		} )
		
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
					title={ __( "General Settings" ) }
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
							<SelectControl
								label={ __( "Inactive other items" ) }
								value={ inactiveOtherItems }
								options={ [
									{ value: "yes", label: __( "Yes" ) },
									{ value: "no", label: __( "No" ) },
								] }
								onChange={ ( value ) => setAttributes( { inactiveOtherItems: value } ) }
							/>
							<SelectControl
								label={ __( "Expand First Item" ) }
								value={ expandFirstItem }
								options={ [
									{ value: "yes", label: __( "Yes" ) },
									{ value: "no", label: __( "No" ) },
								] }
								onChange={ ( value ) => setAttributes( { expandFirstItem: value } ) }
							/>
						</Fragment>
					}
					<SelectControl
						label={ __( "Enable Schema Support" ) }
						value={ enableSchemaSupport }
						options={ [
							{ value: "yes", label: __( "Yes" ) },
							{ value: "no", label: __( "No" ) },
						] }
						onChange={ ( value ) => setAttributes( { enableSchemaSupport: value } ) }
					/>
					<RangeControl
						label={ __( "Rows Gap" ) }
						value={ rowsGap }
						onChange={ ( value ) => setAttributes( { rowsGap: value } ) }
						min={ 0 }
						max={ 50 }
					/>
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
						<RangeControl
							label={ __( "Columns Gap" ) }
							value={ columnsGap }
							onChange={ ( value ) => setAttributes( { columnsGap: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					}
					{ 'grid' === layout &&
						<SelectControl
							label={ __( "Alignment" ) }
							value={ align }
							options={ [
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
								{ value: "center", label: __( "Center" ) },
							] }
							onChange={ ( value ) => setAttributes( { align: value } ) }
						/>
					}
					<SelectControl
						label={ __( "Enable Separator" ) }
						value={ enableSeparator }
						options={ [
							{ value: "yes", label: __( "Yes" ) },
							{ value: "no", label: __( "No" ) },
						] }
						onChange={ ( value ) => setAttributes( { enableSeparator: value } ) }
					/>
				</PanelBody>
			)
		}

		const faqStylingSettings = () => {

			return (
				<PanelBody
					title={ __( "Styling" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<hr className="uagb-editor__separator" />
					<h2>{  __( " Box Styling" ) }</h2>
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: boxBgColor }} ></span></span></p>
					<ColorPalette
						value={ boxBgColor }
						onChange={ ( value ) => setAttributes( { boxBgColor: value } ) }
						allowReset
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
							label={ __( "Thickness" ) }
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
							label={ __( "Rounded Corners" ) }
							value={ borderRadius }
							onChange={ value => {
								setAttributes( { borderRadius: value } )
							} }
							min={ 0 }
							max={ 50 }
						/>
					}
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
					<ColorPalette
						value={ borderColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<h2>{  __( " Questions Styling" ) }</h2>
				
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Question Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: questionTextColor }} ></span></span></p>
					<ColorPalette
						value={ questionTextColor }
						onChange={ ( value ) => setAttributes( { questionTextColor: value } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Question Text Active/Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: questionTextActiveColor }} ></span></span></p>
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
					<hr className="uagb-editor__separator" />
					<h2>{  __( " Answer Styling" ) }</h2>
				
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Answer Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: answerTextColor }} ></span></span></p>
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
					<hr className="uagb-editor__separator" />
					{ 'accordion' === layout &&
						<Fragment>
							<h2>{  __( " Icon Styling" ) }</h2>
						
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
													<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "px" } aria-pressed={ iconSizeType === "px" } onClick={ () => setAttributes( { iconSizeType: "px" } ) }>{ "px" }</Button>
													<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ iconSizeType === "%" } aria-pressed={ iconSizeType === "%" } onClick={ () => setAttributes( { iconSizeType: "%" } ) }>{ "%" }</Button>
												</ButtonGroup>
												<h2>{ __( "Icon Size" ) }</h2>
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
												<h2>{ __( "Icon Size" ) }</h2>
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
												<h2>{ __( "Icon Size" ) }</h2>
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
							<p className="uagb-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconColor }} ></span></span></p>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
								allowReset
							/>
							<p className="uagb-setting-label">{ __( "Icon Active/Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: iconActiveColor }} ></span></span></p>
							<ColorPalette
								value={ iconActiveColor }
								onChange={ ( value ) => setAttributes( { iconActiveColor: value } ) }
								allowReset
							/>
							<RangeControl
								label={ __( "Gap between Icon and Question" ) }
								value={ gapBtwIconQUestion }
								onChange={ ( value ) => setAttributes( { gapBtwIconQUestion: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						</Fragment>
					}
				</PanelBody>
			)
		}
		const faqTypographySettings = () => {

			return (
				<PanelBody
					title={ __( "Typography" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<hr className="uagb-editor__separator" />
					<TypographyControl
						label={ __( "Question Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: questionloadGoogleFonts, label: 'loadGoogleFonts'  } }
						fontFamily = { { value: questionfontFamily, label: 'questionfontFamily'  } }
						fontWeight = { { value: questionfontWeight, label: 'questionfontWeight'  } }
						fontSubset = { { value: questionfontSubset, label: 'questionfontSubset'  } }
						fontSizeType = { { value: questionfontSizeType, label: 'questionfontSizeType' } }
						fontSize = { { value: questionfontSize, label: 'questionfontSize'  } }
						fontSizeMobile = { { value: questionfontSizeMobile, label: 'questionfontSizeMobile'  } }
						fontSizeTablet= { { value: questionfontSizeTablet, label: 'questionfontSizeTablet' } }
						lineHeightType = { { value: questionlineHeightType, label: 'questionlineHeightType' } }
						lineHeight = { { value: questionlineHeight, label: 'questionlineHeight'  } }
						lineHeightMobile = { { value: questionlineHeightMobile, label: 'questionlineHeightMobile'  } }
						lineHeightTablet= { { value: questionlineHeightTablet, label: 'questionlineHeightTablet'  } }
					/>
					<TypographyControl
						label={ __( "Answer Typography" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: answerloadGoogleFonts, label: 'loadGoogleFonts'  } }
						fontFamily = { { value: answerfontFamily, label: 'answerfontFamily'  } }
						fontWeight = { { value: answerfontWeight, label: 'answerfontWeight'  } }
						fontSubset = { { value: answerfontSubset, label: 'answerfontSubset'  } }
						fontSizeType = { { value: answerfontSizeType, label: 'answerfontSizeType' } }
						fontSize = { { value: answerfontSize, label: 'answerfontSize'  } }
						fontSizeMobile = { { value: answerfontSizeMobile, label: 'answerfontSizeMobile'  } }
						fontSizeTablet= { { value: answerfontSizeTablet, label: 'answerfontSizeTablet' } }
						lineHeightType = { { value: answerlineHeightType, label: 'answerlineHeightType' } }
						lineHeight = { { value: answerlineHeight, label: 'answerlineHeight'  } }
						lineHeightMobile = { { value: answerlineHeightMobile, label: 'answerlineHeightMobile'  } }
						lineHeightTablet= { { value: answerlineHeightTablet, label: 'answerlineHeightTablet'  } }
					/>
				</PanelBody>
			)
		}
		const faqIconSettings = () => {

			return (
				<PanelBody
					title={ __( "Icon" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<p className="components-base-control__label">{__( "Icon" )}</p>
					<FontIconPicker
						icons={svg_icons}
						renderFunc= {renderSVG}
						theme="default"
						value={icon}
						onChange={ (value) => this.onchangeIcon( value ) }
						isMulti={false}
						noSelectedPlaceholder= { __( "Select Icon" ) }
					/>
					<p className="components-base-control__label">{__( "Active Icon" )}</p>
					<FontIconPicker
						icons={svg_icons}
						renderFunc= {renderSVG}
						theme="default"
						value={iconActive}
						onChange={ (value) => this.onchangeActiveIcon( value ) }
						isMulti={false}
						noSelectedPlaceholder= { __( "Select Icon" ) }
					/>
					<SelectControl
						label={ __( "Icon Alignment" ) }
						value={ iconAlign }
						options={ [
							{ value: "left", label: __( "Left" ) },
							{ value: "right", label: __( "Right" ) },
						] }
						onChange={ ( value ) => setAttributes( { iconAlign: value } ) }
					/>
				</PanelBody>
			)
		}
		return (
			<Fragment>
				<InspectorControls>
					{ faqGeneralSettings() }
					{ faqStylingSettings() }
					{ faqTypographySettings() }
					{ 'accordion' === layout && faqIconSettings() }
				</InspectorControls>

				<div className={ classnames(
					"uagb-faq__outer-wrap",
					`uagb-block-${ this.props.clientId }`,
					`uagb-faq-icon-${ this.props.attributes.iconAlign }`,
					`uagb-faq-layout-${ this.props.attributes.layout }`
				) }
				>
                    <InnerBlocks
                        template={ getFaqChildTemplate( faq_count, faq ) }
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

export default UAGBFaqEdit
