/**
 * BLOCK: Fse Post Categories Block
 */

const { __ } = wp.i18n
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"
// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"
const {
	Component,
	Fragment
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	ColorPalette,
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

const { select } = wp.data;

class UAGBPostCategoryEdit extends Component {
    
    constructor() {
		super( ...arguments )
	}
	
	componentDidMount() {
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
		let allTaxonomy = uagb_blocks_info.all_taxonomy
		let currentTax = allTaxonomy['post']
		var list = currentTax.terms.category;
		var current = select("core/editor").getCurrentPost();
		var cat = current.categories;	
		var categoriesname = [];
		if(list !== undefined && cat !== undefined){
			for(var j=0;j<list.length;j++){
				for(var i=0;i<cat.length;i++){
					if(list[j].id === cat[i] ){
						categoriesname.push(list[j].name);
					}
				}
			}
		}
		this.props.setAttributes( { categories: categoriesname} )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-post-category-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )

	}
	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-style-post-category-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}
    render() {
        
       	const { setAttributes, attributes } = this.props
        const { 
			block_id,
			categories,
			topPaddingMobile,
			bottomPaddingMobile,
			leftPaddingMobile,
			rightPaddingMobile,
			topPaddingTablet,
			bottomPaddingTablet,
			leftPaddingTablet,
			rightPaddingTablet,
			topPadding,
			bottomPadding,
			leftPadding,
			rightPadding,
			desktopPaddingType,
			tabletPaddingType,
			mobilePaddingType,
			align,
			categoriesFontFamily,
			categoriesFontWeight,
			categoriesColor,
			iconSize,
			iconColor,
			iconPosition,
			iconSpace,
			categoriesFontSize,
			categoriesFontSizeType,
			categoriesFontSizeMobile,
			categoriesFontSizeTablet,
			categoriesFontSubset,
			categoriesLineHeight,
			categoriesLineHeightType,
			categoriesLineHeightMobile,
			categoriesLineHeightTablet,
		} = attributes

		if (  categories === undefined || categories === null) {
			return __('No Data Found', 'ultimate-addons-for-gutenberg')
		}else if(categories.length === 0){
			return __('No Data Found', 'ultimate-addons-for-gutenberg')
		}
		
		// Load Google fonts for categories.
		let loadcategoriesGoogleFonts
		if( loadcategoriesGoogleFonts == true ) {

			const categoriesconfig = {
				google: {
					families: [ categoriesFontFamily + ( categoriesFontWeight ? ":" + categoriesFontWeight : "" ) ],
				},
			}

			loadcategoriesGoogleFonts = (
				<WebfontLoader config={ categoriesconfig }>
				</WebfontLoader>
			)
		}

        return (
                <Fragment>
					<BlockControls key='controls'>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right" ] }
					/>
					</BlockControls>
					<InspectorControls>
						 <PanelBody title={ __( "Design" , 'ultimate-addons-for-gutenberg') } initialOpen={ false }>
							 <TypographyControl
								 label={ __( "Category Typography", 'ultimate-addons-for-gutenberg' ) }
								 attributes = { attributes }
								 setAttributes = { setAttributes }
								 loadGoogleFonts = { { value: loadcategoriesGoogleFonts, label:__( "loadcategoriesGoogleFonts", 'ultimate-addons-for-gutenberg') } }
								 fontFamily = { { value: categoriesFontFamily, label:__('categoriesFontFamily' , 'ultimate-addons-for-gutenberg') } }	
								 fontSubset = { { value: categoriesFontSubset, label:__( "categoriesFontSubset", 'ultimate-addons-for-gutenberg') } }
								 fontWeight = { { value: categoriesFontWeight, label:__('categoriesFontWeight' , 'ultimate-addons-for-gutenberg') } }
								 fontSizeType = { { value: categoriesFontSizeType, label:__( 'categoriesFontSizeType', 'ultimate-addons-for-gutenberg') } }
								 fontSize = { { value: categoriesFontSize, label:__('categoriesFontSize' , 'ultimate-addons-for-gutenberg') } }
								 fontSizeMobile = { { value: categoriesFontSizeMobile, label:__('categoriesFontSizeMobile' , 'ultimate-addons-for-gutenberg') } }
								 fontSizeTablet= { { value: categoriesFontSizeTablet, label:__('categoriesFontSizeTablet' , 'ultimate-addons-for-gutenberg') } }
								 lineHeightType = { { value: categoriesLineHeightType, label:__( 'categoriesLineHeightType', 'ultimate-addons-for-gutenberg') } }
								 lineHeight = { { value: categoriesLineHeight, label:__('categoriesLineHeight' , 'ultimate-addons-for-gutenberg') } }
								 lineHeightMobile = { { value: categoriesLineHeightMobile, label:__('categoriesLineHeightMobile' , 'ultimate-addons-for-gutenberg') } }
								 lineHeightTablet= { { value: categoriesLineHeightTablet, label:__('categoriesLineHeightTablet' , 'ultimate-addons-for-gutenberg') } }
							 />
							 <p className="uagb-setting-label">{ __( "Category Color", 'ultimate-addons-for-gutenberg' ) }</p>
							 <ColorPalette
								 value={ categoriesColor }
								 onChange={ ( value ) => setAttributes( { categoriesColor: value } ) }
								 allowReset
							 />
							 <h2>{ __( "Icon Size" , 'ultimate-addons-for-gutenberg') }</h2>
							 <RangeControl
								 className={ "uagb-margin-control" }
								 value={ iconSize }
								 onChange={ ( value ) => setAttributes( { iconSize: value } ) }
								 min={ 0 }
								 max={ 500 }
								 allowReset
							 />
							 <p className="uagb-setting-label">{ __( "Icon Color", 'ultimate-addons-for-gutenberg' ) }</p>
							 <ColorPalette
								 value={ iconColor }
								 onChange={ ( value ) => setAttributes( { iconColor: value } ) }
								 allowReset
							 />
							<SelectControl
								label={ __( "Icon Position", 'ultimate-addons-for-gutenberg'  ) }
								value={ iconPosition }
								onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
								options={ [
									{ value: "before", label: __( "Before Text" , 'ultimate-addons-for-gutenberg' ) },
									{ value: "after", label: __( "After Text", 'ultimate-addons-for-gutenberg'  ) },
								] }
							/>
							<RangeControl
								label={ __( "Icon Spacing" , 'ultimate-addons-for-gutenberg'  ) }
								value={ iconSpace }
								onChange={ ( value ) => setAttributes( { iconSpace: value } ) }
								min={ 0 }
								max={ 50 }
								beforeIcon=""
								allowReset
							/>
						 </PanelBody>
						 <PanelBody title={ __( "Spacing" , 'ultimate-addons-for-gutenberg') } initialOpen={ false }>
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
													 <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" , 'ultimate-addons-for-gutenberg') }>
														 <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "px" } aria-pressed={ mobilePaddingType === "px" } onClick={ () => setAttributes( { mobilePaddingType: "px" } ) }>{ "px" }</Button>
														 <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "%" } aria-pressed={ mobilePaddingType === "%" } onClick={ () => setAttributes( { mobilePaddingType: "%" } ) }>{ "%" }</Button>
													 </ButtonGroup>
													 <h2>{ __( "Padding Mobile" , 'ultimate-addons-for-gutenberg') }</h2>
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
													 <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" , 'ultimate-addons-for-gutenberg') }>
														 <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "px" } aria-pressed={ tabletPaddingType === "px" } onClick={ () => setAttributes( { tabletPaddingType: "px" } ) }>{ "px" }</Button>
														 <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "%" } aria-pressed={ tabletPaddingType === "%" } onClick={ () => setAttributes( { tabletPaddingType: "%" } ) }>{ "%" }</Button>
													 </ButtonGroup>
													 <h2>{ __( "Padding Tablet", 'ultimate-addons-for-gutenberg' ) }</h2>
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
													 <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" , 'ultimate-addons-for-gutenberg') }>
														 <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "px" } aria-pressed={ desktopPaddingType === "px" } onClick={ () => setAttributes( { desktopPaddingType: "px" } ) }>{ "px" }</Button>
														 <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "%" } aria-pressed={ desktopPaddingType === "%" } onClick={ () => setAttributes( { desktopPaddingType: "%" } ) }>{ "%" }</Button>
													 </ButtonGroup>
													 <h2>{ __( "Padding" , 'ultimate-addons-for-gutenberg') }</h2>
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
						 </PanelBody>
					</InspectorControls>	
					
					<div className={`uagb-post-categories__wrap uagb-block-${ block_id }`}>
						{(iconPosition === 'before' &&
						<span className="dashicons-tag dashicons"></span>
						)}
						<div className="uagb-post-categories__name">{categories.join(", ")} </div>
						{(iconPosition === 'after' &&
						<span className="dashicons-tag dashicons"></span>
						)}
					</div>
				{ loadcategoriesGoogleFonts }
            </Fragment>
        );
    }
}

export default  UAGBPostCategoryEdit;