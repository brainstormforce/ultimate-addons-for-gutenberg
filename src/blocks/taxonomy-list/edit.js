/**
 * External dependencies
 */
import classnames from "classnames";
import styling from "./styling";
import BoxShadowControl from "../../components/box-shadow";
import TypographyControl from "../../components/typography";
import WebfontLoader from "../../components/typography/fontloader";
import Columnresponsive from "../../components/typography/column-responsive";


const { __ } = wp.i18n;
const {
	PanelBody,
	RangeControl,
	SelectControl,
	TabPanel,
	Dashicon,
	TextControl,
	Button,
	ButtonGroup,
	ToggleControl
} = wp.components;

const {
	InspectorControls,
	ColorPalette,	
} = wp.blockEditor;
 
const { 
	Component,
	Fragment 
} = wp.element;

const { withSelect } = wp.data;

class UAGBTaxonomyList extends Component {

	constructor() {
		super( ...arguments );
		this.onSelectPostType = this.onSelectPostType.bind( this );
		this.onSelectTaxonomyType = this.onSelectTaxonomyType.bind( this );
	}
	onSelectPostType( value ) {
		const { setAttributes } = this.props;

		setAttributes( { postType: value } );
		setAttributes( { categories: "" } );
		setAttributes( { taxonomyType: "" } );
	}
	
	onSelectTaxonomyType( value ) {
		const { setAttributes } = this.props;

		setAttributes( { taxonomyType: value } );
		setAttributes( { categories: "" } );
	}
	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-taxonomy-list-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps, prevState ) {		
        
		const element = document.getElementById( "uagb-style-taxonomy-list-" + this.props.clientId.substr( 0, 8 ) );

		if ( null != element && "undefined" !== typeof element ) {
			element.innerHTML = styling( this.props );
		}
	}

	render() {
		// Caching all Props.
		const {
			className,
			attributes,
			setAttributes,
			taxonomyList,
			categoriesList,
			termsList,
			deviceType 		
		} = this.props;		

		// Caching all attributes.
		const {
			block_id,
			postType,
			taxonomyType,			
			layout,
			columns,
			tcolumns,
			mcolumns,
			bgColor,
			titleColor,
			countColor,
			rowGap,
			columnGap,
			contentPadding,
			contentPaddingMobile,
			contentPaddingTablet,
			titleBottomSpace,			
			alignment,
			listStyle,
			seperatorStyle,
			seperatorWidth,
			seperatorThickness,
			seperatorColor,
			listTextColor,
			hoverlistTextColor,
			listBottomMargin,
			listStyleColor,
			hoverlistStyleColor,
			noTaxDisplaytext,
			boxShadowColor,
			boxShadowHOffset,
			boxShadowVOffset,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowPosition,
			showCount,			
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
			countFontSize,
			countFontSizeType,
			countFontSizeMobile,
			countFontSizeTablet,
			countFontFamily,
			countFontWeight,
			countFontSubset,
			countLineHeightType,
			countLineHeight,
			countLineHeightTablet,
			countLineHeightMobile,
			countLoadGoogleFonts,
			listFontSize,
			listFontSizeType,
			listFontSizeMobile,
			listFontSizeTablet,
			listFontFamily,
			listFontWeight,
			listFontSubset,
			listLineHeightType,
			listLineHeight,
			listLineHeightTablet,
			listLineHeightMobile,
			listLoadGoogleFonts,
			showEmptyTaxonomy,
			borderStyle,
			borderThickness,
			borderColor,
			borderRadius,
			listDisplayStyle,
			showhierarchy,
			titleTag
		} = attributes;
		
		const taxonomy_list_setting = ( showEmptyTaxonomy ) ? taxonomyList : termsList;
		
		if ( "" != taxonomy_list_setting && undefined != taxonomy_list_setting ) {
			var taxonomyListOptions = [
				{ value: "", label: __( "Select Taxonomy","ultimate-addons-for-gutenberg" ) }
			];
			Object.keys( taxonomy_list_setting ).map( ( item, thisIndex ) => {
				return taxonomyListOptions.push( { value : taxonomyList[item].name, label: taxonomyList[item].label } );
			} );
		}

		let loadTitleGoogleFonts;
		let loadCountGoogleFonts;
		let loadListGoogleFonts;


		if ( titleLoadGoogleFonts == true ) {

			const titleconfig = {
				google: {
					families: [ titleFontFamily + ( titleFontWeight ? ":" + titleFontWeight : "" ) ],
				},
			};

			loadTitleGoogleFonts = (
				<WebfontLoader config={ titleconfig }>
				</WebfontLoader>
			);
		}

		if ( countLoadGoogleFonts == true ) {

			const countconfig = {
				google: {
					families: [ countFontFamily + ( countFontWeight ? ":" + countFontWeight : "" ) ],
				},
			};

			loadCountGoogleFonts = (
				<WebfontLoader config={ countconfig }>
				</WebfontLoader>
			);
		}

		if ( listLoadGoogleFonts == true ) {

			const listconfig = {
				google: {
					families: [ listFontFamily + ( listFontWeight ? ":" + listFontWeight : "" ) ],
				},
			};

			loadListGoogleFonts = (
				<WebfontLoader config={ listconfig }>
				</WebfontLoader>
			);
		}
		

		// All Controls.
		const color_control = (
			<Fragment>
				<h2 className="uagb-setting-label">{ __( "Text Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: listTextColor } } ></span></span></h2>
				<ColorPalette
					value={ listTextColor }
					onChange={ ( colorValue ) => setAttributes( { listTextColor: colorValue } ) }
					allowReset
				/><br />
				{ "none" != listStyle && (
					<Fragment>
						<h2 className="uagb-setting-label">{ __( "Bullet/Numbers Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: listStyleColor } } ></span></span></h2>
						<ColorPalette
							value={ listStyleColor }
							onChange={ ( colorValue ) => setAttributes( { listStyleColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
				) }
			</Fragment>

		);
		const color_control_hover = (
			<Fragment>
				<h2 className="uagb-setting-label">{ __( "Text Hover Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: hoverlistTextColor } } ></span></span></h2>
				<ColorPalette
					value={ hoverlistTextColor }
					onChange={ ( colorValue ) => setAttributes( { hoverlistTextColor: colorValue } ) }
					allowReset
				/><br />
				{ "none" != listStyle && (
					<Fragment>
						<h2 className="uagb-setting-label">{ __( "Bullet/Numbers Hover Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: hoverlistStyleColor } } ></span></span></h2>
						<ColorPalette
							value={ hoverlistStyleColor }
							onChange={ ( colorValue ) => setAttributes( { hoverlistStyleColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
				) }
			</Fragment>

		);
				
		const inspectorControlsSettings = (
			<InspectorControls>
				<PanelBody title={ __( "General","ultimate-addons-for-gutenberg" ) }>
					<SelectControl
						label={ __( "Heading Tag", "ultimate-addons-for-gutenberg" ) }
						value={ titleTag }
						onChange={ ( value ) => setAttributes( { titleTag: value } ) }
						options={ [
							{ value: "div", label: __( "Div", "ultimate-addons-for-gutenberg" ) },
							{ value: "h1", label: __( "H1", "ultimate-addons-for-gutenberg" ) },
							{ value: "h2", label: __( "H2", "ultimate-addons-for-gutenberg" ) },
							{ value: "h3", label: __( "H3", "ultimate-addons-for-gutenberg" ) },
							{ value: "h4", label: __( "H4", "ultimate-addons-for-gutenberg" ) },
							{ value: "h5", label: __( "H5", "ultimate-addons-for-gutenberg" ) },
							{ value: "h6", label: __( "H6", "ultimate-addons-for-gutenberg" ) },
						] }
					/>
					<SelectControl
						label={ __( "Layout","ultimate-addons-for-gutenberg" ) }
						value={ layout }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
						options={ [
							{ value: "grid", label: __( "Grid","ultimate-addons-for-gutenberg" ) },
							{ value: "list", label: __( "List","ultimate-addons-for-gutenberg" ) },
						] }
					/>
					{ "grid" === layout &&	
						<Columnresponsive />
					}
					{ "Desktop" === deviceType && "grid" === layout && (
						<Fragment>
							<RangeControl
								label={ __( "Desktop Columns","ultimate-addons-for-gutenberg" ) }
								value={ columns }
								onChange={ ( value ) => setAttributes( { columns: value } ) }
								min={ 1 }
								max={ 4 }
							/>
						</Fragment>
					) }
					{ "Tablet" === deviceType && "grid" === layout && (
						<Fragment>
							<RangeControl
								label={ __( "Tab Columns","ultimate-addons-for-gutenberg" ) }
								value={ tcolumns }
								onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
								min={ 1 }
								max={ 3 }
							/>
						</Fragment>
					) }
					{ "Mobile" === deviceType && "grid" === layout && (
						<Fragment>
							<RangeControl
								label={ __( "Mobile Columns","ultimate-addons-for-gutenberg" ) }
								value={ mcolumns }
								onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
								min={ 1 }
								max={ 2 }
							/>
						</Fragment>
					) }					
					<hr className="uagb-editor__separator" />
					<SelectControl
						label={ __( "Post Type","ultimate-addons-for-gutenberg" ) }
						value={ postType }
						onChange={ ( value ) => this.onSelectPostType( value ) }
						options={ uagb_blocks_info.post_types }
					/>				
					{ "" != taxonomyList &&
						<SelectControl
							label={ __( "Taxonomy","ultimate-addons-for-gutenberg" ) }
							value={ taxonomyType }
							onChange={ ( value ) => this.onSelectTaxonomyType( value ) }
							options={ taxonomyListOptions }
						/>
					}
					{ "" == taxonomyList && (
						<TextControl
							autoComplete="off"
							label={ __( "Display Message","ultimate-addons-for-gutenberg" ) }
							value={ noTaxDisplaytext }
							onChange={ ( value ) => setAttributes( { noTaxDisplaytext: value } ) }
							help={ __( "If Taxonomy Not Found","ultimate-addons-for-gutenberg" ) }
						/>
					) }
					{ "list" == layout && (
						<Fragment>
							<p className="uagb-setting-label">{ __( "Display Style","ultimate-addons-for-gutenberg" ) }</p>
							<ButtonGroup className="uagb-list-display-style-group">
								<Button
									key={ "list" }								
									label="List"
									onClick={ () => setAttributes( { listDisplayStyle: "list" } ) }
									aria-pressed={ "list" === listDisplayStyle }
									isPrimary={ "list" === listDisplayStyle }
								>List</Button>
								<Button
									key={ "dropdown" }								
									label="Dropdown"
									onClick={ () => setAttributes( { listDisplayStyle: "dropdown" } ) }
									aria-pressed={ "dropdown" === listDisplayStyle }
									isPrimary={ "dropdown" === listDisplayStyle }
								>Dropdown</Button>
							</ButtonGroup>
						</Fragment>
					) }

					<ToggleControl
						label={ __( "Show Empty Taxonomy","ultimate-addons-for-gutenberg" ) }
						checked={ showEmptyTaxonomy }
						onChange={ ( value ) => setAttributes( { showEmptyTaxonomy: ! showEmptyTaxonomy } ) }
						help={ __( "Show Empty Taxonomy in list " ) }
					/>					
					<ToggleControl
						label={ __( "Show Posts Count","ultimate-addons-for-gutenberg" ) }
						checked={ showCount }
						onChange={ ( value ) => setAttributes( { showCount: ! showCount } ) }
						help={ __( "Show Count of taxonomy ","ultimate-addons-for-gutenberg" ) }
					/>

					{ "list" == layout && "list" == listDisplayStyle && "post_tag" !== taxonomyType && (
						<ToggleControl
							label={ __( "Show Hierarchy","ultimate-addons-for-gutenberg" ) }
							checked={ showhierarchy }
							onChange={ ( value ) => setAttributes( { showhierarchy: ! showhierarchy } ) }
							help={ __( "Show Hierarchy of taxonomy ","ultimate-addons-for-gutenberg" ) }
						/>
					) }

					{ "grid" == layout && (
						<Fragment>
							<p className="uagb-setting-label">{ __( "Alignment","ultimate-addons-for-gutenberg" ) }</p>
							<Button
								key={ "left" }
								icon="editor-alignleft"
								label="Left"
								onClick={ () => setAttributes( { alignment: "left" } ) }
								aria-pressed={ "left" === alignment }
								isPrimary={ "left" === alignment }
							/>
							<Button
								key={ "center" }
								icon="editor-aligncenter"
								label="Center"
								onClick={ () => setAttributes( { alignment: "center" } ) }
								aria-pressed={ "center" === alignment }
								isPrimary={ "center" === alignment }
							/>
							<Button
								key={ "right" }
								icon="editor-alignright"
								label="Right"
								onClick={ () => setAttributes( { alignment: "right" } ) }
								aria-pressed={ "right" === alignment }
								isPrimary={ "right" === alignment }
							/>	
						</Fragment>
					) }

					{ "list" == layout && "dropdown" !== listDisplayStyle && (
						<Fragment>							
							<p className="uagb-setting-label">{ __( "List Style","ultimate-addons-for-gutenberg" ) }</p>
							<Button
								key={ "bullet" }
								icon="editor-ul"
								label="Bullet"
								onClick={ () => setAttributes( { listStyle: "disc" } ) }
								aria-pressed={ "disc" === listStyle }
								isPrimary={ "disc" === listStyle }
							/>
							<Button
								key={ "numbers" }
								icon="editor-ol"
								label="Numbers"
								onClick={ () => setAttributes( { listStyle: "decimal" } ) }
								aria-pressed={ "decimal" === listStyle }
								isPrimary={ "decimal" === listStyle }
							/>
							<Button
								key={ "none" }
								icon="menu"
								label="None"
								onClick={ () => setAttributes( { listStyle: "none" } ) }
								aria-pressed={ "none" === listStyle }
								isPrimary={ "none" === listStyle }
							/>			
						</Fragment>
					) }
				

				</PanelBody>
				{ "dropdown" !== listDisplayStyle &&(
					<Fragment>
				
						<PanelBody title={ __( "Color","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
							{ "grid" == layout && (
								<Fragment>					
							
									<p className="uagb-setting-label">{ __( "Background Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: bgColor } } ></span></span></p>
									<ColorPalette
										value={ bgColor }
										onChange={ ( colorValue ) => setAttributes( { bgColor: colorValue } ) }
										allowReset
									/>
									<p className="uagb-setting-label">{ __( "Title Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: titleColor } } ></span></span></p>
									<ColorPalette
										value={ titleColor }
										onChange={ ( colorValue ) => setAttributes( { titleColor: colorValue } ) }
										allowReset
									/>
									{ showCount && (
										<Fragment>
											<p className="uagb-setting-label">{ __( "Count Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: countColor } } ></span></span></p>
											<ColorPalette
												value={ countColor }
												onChange={ ( colorValue ) => setAttributes( { countColor: colorValue } ) }
												allowReset
											/>	
										</Fragment>						
									) }
							
								</Fragment>
							) }	

							{ "list" == layout && (
								<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
									activeClass="active-tab"
									tabs={ [
										{
											name: "normal",
											title: __( "Normal","ultimate-addons-for-gutenberg" ),
											className: "uagb-normal-tab",
										},
										{
											name: "hover",
											title: __( "Hover","ultimate-addons-for-gutenberg" ),
											className: "uagb-hover-tab",
										},
									] }>
									{
										( tabName ) => {
											let color_tab;
											if ( "normal" === tabName.name ) {
												color_tab = color_control;
											} else {
												color_tab = color_control_hover;
											}
											return <div>{ color_tab }</div>;
										}
									}
								</TabPanel>		
							) }	

						</PanelBody>

						<PanelBody title={ __( "Spacing","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>

							{ "grid" == layout && (
								<Fragment>
									<RangeControl
										label={ __( "Row Gap","ultimate-addons-for-gutenberg" ) }
										value={ rowGap }
										onChange={ ( value ) => setAttributes( { rowGap: value } ) }
										min={ 0 }
										max={ 50 }
										allowReset
									/>
									<RangeControl
										label={ __( "Column Gap","ultimate-addons-for-gutenberg" ) }
										value={ columnGap }
										onChange={ ( value ) => setAttributes( { columnGap: value } ) }
										min={ 0 }
										max={ 50 }
										allowReset
									/>
									<hr className="uagb-editor__separator" />
									{ "grid" === layout &&
									<Columnresponsive />
									}
									{ "Desktop" === deviceType && "grid" === layout && (
										<Fragment>
											<RangeControl
												label={ __( "Content Padding" ) }
												value={ contentPadding }
												onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
												min={ 10 }
												max={ 100 }
											/>
										</Fragment>
									) }
									{ "Tablet" === deviceType && "grid" === layout && (
										<Fragment>
											<RangeControl
												label={ __( "Content Padding" ) }
												value={ contentPaddingTablet }
												onChange={ ( value ) => setAttributes( { contentPaddingTablet: value } ) }
												min={ 0 }
												max={ 100 }
											/>
										</Fragment>
									) }
									{ "Mobile" === deviceType && "grid" === layout && (
										<Fragment>
											<RangeControl
												label={ __( "Content Padding" ) }
												value={ contentPaddingMobile }
												onChange={ ( value ) => setAttributes( { contentPaddingMobile: value } ) }
												min={ 0 }
												max={ 100 }
											/>
										</Fragment>
									) }

									{ showCount && (
										<Fragment>
											<hr className="uagb-editor__separator" />
											<RangeControl
												label={ __( "Title Bottom Spacing","ultimate-addons-for-gutenberg" ) }
												value={ titleBottomSpace }
												onChange={ ( value ) => setAttributes( { titleBottomSpace: value } ) }
												min={ 0 }
												max={ 50 }
												allowReset
											/>	
										</Fragment>
									) }							
								</Fragment>
							) }

							{ "list" == layout && (
								<RangeControl
									label={ __( "Bottom Margin","ultimate-addons-for-gutenberg" ) }
									value={ listBottomMargin }
									onChange={ ( value ) => setAttributes( { listBottomMargin: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
							) }				
						</PanelBody>

						<PanelBody title={ __( "Style","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>					
							
							{ "grid" == layout && (
								<Fragment>

									<p className="uagb-setting-label">{ __( "Title ","ultimate-addons-for-gutenberg" ) }</p>
									<TypographyControl
										label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										loadGoogleFonts={ { value: titleLoadGoogleFonts, label: "titleLoadGoogleFonts" } }
										fontFamily={ { value: titleFontFamily, label: "titleFontFamily" } }
										fontWeight={ { value: titleFontWeight, label: "titleFontWeight" } }
										fontSubset={ { value: titleFontSubset, label: "titleFontSubset" } }
										fontSizeType={ { value: titleFontSizeType, label: "titleFontSizeType" } }
										fontSize={ { value: titleFontSize, label: "titleFontSize" } }
										fontSizeMobile={ { value: titleFontSizeMobile, label: "titleFontSizeMobile" } }
										fontSizeTablet={ { value: titleFontSizeTablet, label: "titleFontSizeTablet" } }
										lineHeightType={ { value: titleLineHeightType, label: "titleLineHeightType" } }
										lineHeight={ { value: titleLineHeight, label: "titleLineHeight" } }
										lineHeightMobile={ { value: titleLineHeightMobile, label: "titleLineHeightMobile" } }
										lineHeightTablet={ { value: titleLineHeightTablet, label: "titleLineHeightTablet" } }
									/>
									{ showCount && (
										<Fragment>
											<hr className="uagb-editor__separator" />
											<p className="uagb-setting-label">{ __( "Count ","ultimate-addons-for-gutenberg" ) }</p>
											<TypographyControl
												label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
												attributes={ attributes }
												setAttributes={ setAttributes }
												loadGoogleFonts={ { value: countLoadGoogleFonts, label: "countLoadGoogleFonts" } }
												fontFamily={ { value: countFontFamily, label: "countFontFamily" } }
												fontWeight={ { value: countFontWeight, label: "countFontWeight" } }
												fontSubset={ { value: countFontSubset, label: "countFontSubset" } }
												fontSizeType={ { value: countFontSizeType, label: "countFontSizeType" } }
												fontSize={ { value: countFontSize, label: "countFontSize" } }
												fontSizeMobile={ { value: countFontSizeMobile, label: "countFontSizeMobile" } }
												fontSizeTablet={ { value: countFontSizeTablet, label: "countFontSizeTablet" } }
												lineHeightType={ { value: countLineHeightType, label: "countLineHeightType" } }
												lineHeight={ { value: countLineHeight, label: "countLineHeight" } }
												lineHeightMobile={ { value: countLineHeightMobile, label: "countLineHeightMobile" } }
												lineHeightTablet={ { value: countLineHeightTablet, label: "countLineHeightTablet" } }
											/>	
										</Fragment>	
									) }							
									<hr className="uagb-editor__separator" />							
									<BoxShadowControl
										setAttributes={ setAttributes }
										label={ __( "Box Shadow","ultimate-addons-for-gutenberg" ) }
										boxShadowColor={ { value: boxShadowColor, label: __( "Color","ultimate-addons-for-gutenberg" ) } }
										boxShadowHOffset={ { value: boxShadowHOffset, label: __( "Horizontal","ultimate-addons-for-gutenberg" ) } }
										boxShadowVOffset={ { value: boxShadowVOffset, label: __( "Vertical","ultimate-addons-for-gutenberg" ) } }
										boxShadowBlur={ { value: boxShadowBlur, label: __( "Blur","ultimate-addons-for-gutenberg" ) } }
										boxShadowSpread={ { value: boxShadowSpread, label: __( "Spread","ultimate-addons-for-gutenberg" ) } }
										boxShadowPosition={ { value: boxShadowPosition, label: __( "Position","ultimate-addons-for-gutenberg" ) } }
									/>
									<hr className="uagb-editor__separator" />
									<SelectControl
										label={ __( "Border Style","ultimate-addons-for-gutenberg" ) }
										value={ borderStyle }
										onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
										options={ [
											{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
											{ value: "solid", label: __( "Solid","ultimate-addons-for-gutenberg" ) },
											{ value: "dotted", label: __( "Dotted","ultimate-addons-for-gutenberg" ) },
											{ value: "dashed", label: __( "Dashed","ultimate-addons-for-gutenberg" ) },
											{ value: "double", label: __( "Double","ultimate-addons-for-gutenberg" ) },
											{ value: "groove", label: __( "Groove","ultimate-addons-for-gutenberg" ) },
											{ value: "inset", label: __( "Inset","ultimate-addons-for-gutenberg" ) },
											{ value: "outset", label: __( "Outset","ultimate-addons-for-gutenberg" ) },
											{ value: "ridge", label: __( "Ridge","ultimate-addons-for-gutenberg" ) },
										] }
									/>
									{ "none" != borderStyle &&
									<Fragment>										
										<RangeControl
											label={ __( "Border Thickness","ultimate-addons-for-gutenberg" ) }
											value={ borderThickness }
											onChange={ ( value ) => setAttributes( { borderThickness: value } ) }
											min={ 0 }
											max={ 10 }
											allowReset
										/>
										<RangeControl
											label={ __( "Rounded Corners (px)","ultimate-addons-for-gutenberg" ) }
											value={ borderRadius }
											onChange={ value => {
												setAttributes( { borderRadius: value } );
											} }
											min={ 0 }
											max={ 50 }
											allowReset
										/>										
										<p className="uagb-setting-label">{ __( "Border Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: borderColor } } ></span></span></p>
										<ColorPalette
											value={ borderColor }
											onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
											allowReset
										/>
										
									</Fragment>
									}
								</Fragment>
							) }

							{ "list" == layout && (
						
								<Fragment>
									<SelectControl
										label={ __( "Separator Style","ultimate-addons-for-gutenberg" ) }
										value={ seperatorStyle }
										onChange={ ( value ) => setAttributes( { seperatorStyle: value } ) }
										options={ [
											{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
											{ value: "solid", label: __( "Solid","ultimate-addons-for-gutenberg" ) },
											{ value: "dotted", label: __( "Dotted","ultimate-addons-for-gutenberg" ) },
											{ value: "dashed", label: __( "Dashed","ultimate-addons-for-gutenberg" ) },
											{ value: "double", label: __( "Double","ultimate-addons-for-gutenberg" ) },
											{ value: "groove", label: __( "Groove","ultimate-addons-for-gutenberg" ) },
											{ value: "inset", label: __( "Inset","ultimate-addons-for-gutenberg" ) },
											{ value: "outset", label: __( "Outset","ultimate-addons-for-gutenberg" ) },
											{ value: "ridge", label: __( "Ridge","ultimate-addons-for-gutenberg" ) },
										] }
									/>
									{ "none" != seperatorStyle &&
									<Fragment>
										<RangeControl
											label={ __( "Separator Width (%)","ultimate-addons-for-gutenberg" ) }
											value={ seperatorWidth }
											onChange={ ( value ) => setAttributes( { seperatorWidth: value } ) }
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<RangeControl
											label={ __( "Separator Thickness","ultimate-addons-for-gutenberg" ) }
											value={ seperatorThickness }
											onChange={ ( value ) => setAttributes( { seperatorThickness: value } ) }
											min={ 0 }
											max={ 20 }
											allowReset
										/>
										<Fragment>
											<p className="uagb-setting-label">{ __( "Separator Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: seperatorColor } } ></span></span></p>
											<ColorPalette
												value={ seperatorColor }
												onChange={ ( colorValue ) => setAttributes( { seperatorColor: colorValue } ) }
												allowReset
											/>
										</Fragment>
									</Fragment>
									}

									<hr className="uagb-editor__separator" />
								
									<p className="uagb-setting-label">{ __( "List ","ultimate-addons-for-gutenberg" ) }</p>
									<TypographyControl
										label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										loadGoogleFonts={ { value: listLoadGoogleFonts, label: "listLoadGoogleFonts" } }
										fontFamily={ { value: listFontFamily, label: "listFontFamily" } }
										fontWeight={ { value: listFontWeight, label: "listFontWeight" } }
										fontSubset={ { value: listFontSubset, label: "listFontSubset" } }
										fontSizeType={ { value: listFontSizeType, label: "listFontSizeType" } }
										fontSize={ { value: listFontSize, label: "listFontSize" } }
										fontSizeMobile={ { value: listFontSizeMobile, label: "listFontSizeMobile" } }
										fontSizeTablet={ { value: listFontSizeTablet, label: "listFontSizeTablet" } }
										lineHeightType={ { value: listLineHeightType, label: "listLineHeightType" } }
										lineHeight={ { value: listLineHeight, label: "listLineHeight" } }
										lineHeightMobile={ { value: listLineHeightMobile, label: "listLineHeightMobile" } }
										lineHeightTablet={ { value: listLineHeightTablet, label: "listLineHeightTablet" } }
									/>
								
								</Fragment>
						
							) }				
							
						</PanelBody>
				
					</Fragment>
				) }
			</InspectorControls>
		);
		
		if ( "grid" == layout ) {
			var Tag = titleTag ? titleTag : "H4";
		} else if ( "list" == layout ) {
			var Tag = titleTag ? titleTag : "div";
		}
		return (
			<Fragment>							
				{ inspectorControlsSettings }
				<div className={ classnames(					
					"uagb-taxonomy__outer-wrap",
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${this.props.clientId.substr( 0, 8 )}`
				) }>
					<div className={ classnames(						
						"uagb-taxonomy-wrap",
						`uagb-layout-${layout}`
					) }>

						{ "grid" == layout && ( 
								
							categoriesList.map( ( p,index )=>
								<div className="uagb-taxomony-box" key={ index }>
									<a className="uagb-tax-link" href={ p.link }>
										<Tag className="uagb-tax-title" dangerouslySetInnerHTML={ { __html: p.name } }></Tag>
										{ showCount && (
											<div className="uagb-tax-count">{ p.count } { p.count > "1" ? `${p.singular_name}s` :p.singular_name }</div>
										) }
									</a>
								</div>						
							)
								
						) }

						{ "list" == layout && "list" == listDisplayStyle && ( 
							<ul className="uagb-list-wrap">
								{ categoriesList.map( ( p,index )=>										
									<li className="uagb-tax-list" key={ index }>
										<Tag className="uagb-tax-link-wrap">
											<a className="uagb-tax-link" href={ p.link } dangerouslySetInnerHTML={ { __html: p.name } }></a>
											{ showCount && (
												<span className="uagb-tax-list-count">{ ` (${p.count})` }</span>
											) }
											{ showhierarchy && p.children != null && (														
												<ul className="uagb-taxonomy-list-children">
													{ Object.keys( p.children ).map( function( key, index ) {
														return 	<li className="uagb-tax-list" key={ index }>
															<a className="uagb-tax-link" href={ `${p.link}${p.children[key].slug}` }>{ p.children[key].name }</a>
															{ showCount && (
																<span>{ ` (${p.children[key].count})` }</span>
															) }
														</li>;														
													} ) }
												</ul>
											) }
										</Tag>

										{ "none" != seperatorStyle && (
											<div className="uagb-tax-separator-wrap">
												<div className="uagb-tax-separator"></div>
											</div>
										) }

									</li>
								) }
							</ul>
						) }
							
						{ "list" == layout && "dropdown" == listDisplayStyle && ( 
							<select className="uagb-list-dropdown-wrap">
								{ categoriesList.map( ( p,index )=>										
									<option value={ p.link }>
										{ p.name } 
										{ showCount && ( ` (${p.count})` ) }
									</option>
								) }
							</select>
						) }
					</div>
							
					{ /* If no Taxonomy is available. */ }
					{ categoriesList == "" && (
						<div className="uagb-tax-not-available">{ noTaxDisplaytext }</div>
					) }

				</div>	
				{ loadTitleGoogleFonts }
				{ loadCountGoogleFonts }
				{ loadListGoogleFonts }

			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {

	const { categories, postsToShow, order, orderBy, postType, taxonomyType,showEmptyTaxonomy } = props.attributes;
	const { getEntityRecords } = select( "core" );
	const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );

	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	
	const allTaxonomy = uagb_blocks_info.taxonomy_list;
	const currentTax = allTaxonomy[postType];
	
	const listToShowTaxonomy = ( showEmptyTaxonomy ) ? "with_empty_taxonomy" : "without_empty_taxonomy";
	
	let categoriesList = [];
	if ( "undefined" !== typeof currentTax ) {
		if ( "undefined" !== typeof  currentTax[listToShowTaxonomy] && "undefined" !== typeof currentTax[listToShowTaxonomy][taxonomyType] ) {
			categoriesList = currentTax[listToShowTaxonomy][taxonomyType];
		}
	}
	const latestPostsQuery = {
		order,
		orderby: orderBy,
		per_page: postsToShow,
	};

	return {
		latestPosts: getEntityRecords( "postType" ,postType, latestPostsQuery ),
		categoriesList,
		taxonomyList: ( "undefined" !== typeof currentTax ) ? currentTax.taxonomy : [] ,
		termsList: ( "undefined" !== typeof currentTax ) ? currentTax.terms : [],
		deviceType,

	};

} )( UAGBTaxonomyList );
