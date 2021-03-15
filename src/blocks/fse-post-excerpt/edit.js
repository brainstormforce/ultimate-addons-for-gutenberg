
/**
 * BLOCK: Post Excerpt Block
 */

const { __ } = wp.i18n
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

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
	ColorPalette
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


class UAGBPostExcerptEdit extends Component {
    
    constructor() {
		super( ...arguments )
	}
	
	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-post-excerpt-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )

	}
	componentDidUpdate( prevProps ) {
		var current_post = select("core/editor").getCurrentPost();
		this.props.setAttributes( { postExcerpt : current_post.uagb_excerpt} )
		var element = document.getElementById( "uagb-style-post-excerpt-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}
    render() {
        
       	const { setAttributes, attributes } = this.props
        const { 
			block_id,
			postExcerpt,
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
			excerptFontFamily,
			excerptFontWeight,
			excerptColor,
			excerptFontSize,
			excerptFontSizeType,
			excerptFontSizeMobile,
			excerptFontSizeTablet,
			excerptFontSubset,
			excerptLineHeight,
			excerptLineHeightType,
			excerptLineHeightMobile,
			excerptLineHeightTablet,
			excerptFontFamilyMobile,
			excerptFontSubsetMobile,
			excerptFontWeightMobile,
			excerptFontFamilyTablet,
			excerptFontSubsetTablet,
			excerptFontWeightTablet,
		} = attributes
		
		if ( postExcerpt === null || postExcerpt === undefined) {
			return __('No Data Found', 'ultimate-addons-for-gutenberg')
		}
		// Load Google fonts for excerpt.
		let loadexcerptGoogleFonts
		if( loadexcerptGoogleFonts == true ) {

			const excerptconfig = {
				google: {
					families: [ excerptFontFamily + ( excerptFontWeight ? ":" + excerptFontWeight : "" ) ],
				},
			}

			loadexcerptGoogleFonts = (
				<WebfontLoader config={ excerptconfig }>
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
								 label={ __( "Excerpt Typography", 'ultimate-addons-for-gutenberg' ) }
								 attributes = { attributes }
								 setAttributes = { setAttributes }
								 loadGoogleFonts = { { value: loadexcerptGoogleFonts, label:__( "loadexcerptGoogleFonts", 'ultimate-addons-for-gutenberg') } }
								 fontFamily = { { value: excerptFontFamily, label:__('excerptFontFamily' , 'ultimate-addons-for-gutenberg') } }	
								 fontSubset = { { value: excerptFontSubset, label:__( "excerptFontSubset", 'ultimate-addons-for-gutenberg') } }
								 fontWeight = { { value: excerptFontWeight, label:__('excerptFontWeight' , 'ultimate-addons-for-gutenberg') } }
								 fontFamily = { { value: excerptFontFamilyMobile, label:__('excerptFontFamilyMobile' , 'ultimate-addons-for-gutenberg') } }	
								 fontSubset = { { value: excerptFontSubsetMobile, label:__( "excerptFontSubsetMobile", 'ultimate-addons-for-gutenberg') } }
								 fontWeight = { { value: excerptFontWeightMobile, label:__('excerptFontWeightMobile' , 'ultimate-addons-for-gutenberg') } }
								 fontFamily = { { value: excerptFontFamilyTablet, label:__('excerptFontFamilyTablet' , 'ultimate-addons-for-gutenberg') } }	
								 fontSubset = { { value: excerptFontSubsetTablet, label:__( "excerptFontSubsetTablet", 'ultimate-addons-for-gutenberg') } }
								 fontWeight = { { value: excerptFontWeightTablet, label:__('excerptFontWeightTablet' , 'ultimate-addons-for-gutenberg') } }
								 fontSizeType = { { value: excerptFontSizeType, label:__( 'excerptFontSizeType', 'ultimate-addons-for-gutenberg') } }
								 fontSize = { { value: excerptFontSize, label:__('excerptFontSize' , 'ultimate-addons-for-gutenberg') } }
								 fontSizeMobile = { { value: excerptFontSizeMobile, label:__('excerptFontSizeMobile' , 'ultimate-addons-for-gutenberg') } }
								 fontSizeTablet= { { value: excerptFontSizeTablet, label:__('excerptFontSizeTablet' , 'ultimate-addons-for-gutenberg') } }
								 lineHeightType = { { value: excerptLineHeightType, label:__( 'excerptLineHeightType', 'ultimate-addons-for-gutenberg') } }
								 lineHeight = { { value: excerptLineHeight, label:__('excerptLineHeight' , 'ultimate-addons-for-gutenberg') } }
								 lineHeightMobile = { { value: excerptLineHeightMobile, label:__('excerptLineHeightMobile' , 'ultimate-addons-for-gutenberg') } }
								 lineHeightTablet= { { value: excerptLineHeightTablet, label:__('excerptLineHeightTablet' , 'ultimate-addons-for-gutenberg') } }
							 />
							 <p className="uagb-setting-label">{ __( "Excerpt Color", 'ultimate-addons-for-gutenberg' ) }</p>
							 <ColorPalette
								 value={ excerptColor }
								 onChange={ ( value ) => setAttributes( { excerptColor: value } ) }
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
				    <div className={`uagb-post-excerpt__wrap uagb-block-${block_id}`}> 
						<div className="uagb-post-excerpt__text" dangerouslySetInnerHTML={ { __html: postExcerpt } } />
					</div>
					{loadexcerptGoogleFonts}
            </Fragment>
        );
    }
}

export default UAGBPostExcerptEdit;