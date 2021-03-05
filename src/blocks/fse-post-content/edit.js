
/**
 * BLOCK: FSE Post Content Block
 */

const { __ } = wp.i18n

import classnames from "classnames"
import BoxShadowControl from "../../components/box-shadow"
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

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


class UAGB_FSE_Post_Content extends Component {
    
    constructor() {
		super( ...arguments )
	}
	
	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-post-content-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )

	}
	componentDidUpdate( ) {
		const {  setAttributes } = this.props
		var current_post = select("core/editor").getCurrentPost();
		if (
			undefined !== current_post.content 
		) {
			setAttributes( { content: current_post.content  } );
		}
		var element = document.getElementById( "uagb-style-post-content-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}
    render() {
        
       	const { setAttributes, attributes } = this.props
        const { 
			block_id,
			content,
            boxShadowColor,
            boxShadowHOffset,
            boxShadowVOffset,
            boxShadowBlur,
            boxShadowSpread,
            boxShadowPosition,
            borderStyle,
            borderWidth,
            borderRadius,
            borderColor, 
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
            topMarginMobile,
            bottomMarginMobile,
            leftMarginMobile,
            rightMarginMobile,
            topMarginTablet,
            bottomMarginTablet,
            leftMarginTablet,
            rightMarginTablet,
            topMargin,
            bottomMargin,
            leftMargin,
            rightMargin,
			desktopMarginType,
			desktopPaddingType,
			tabletPaddingType,
			mobilePaddingType,
			tabletMarginType,
			mobileMarginType,
			align,
		} = attributes
		
        return (
                <Fragment>
					<BlockControls key='controls'>
						<BlockAlignmentToolbar
							value={ align }
							onChange={ ( value ) => {
								setAttributes( { align: value } )
							} }
							controls={ [ "left", "center", "right", "full" ] }
						/>
					</BlockControls>
                    <InspectorControls>
						<PanelBody title={ __( "Spacing", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
							<TabPanel className="uagb-size-type-field-tabs uagb-size-type-field__common-tabs uagb-inline-margin" activeClass="active-tab"
								tabs={ [
									{
										name:__( "desktop", 'ultimate-addons-for-gutenberg'),
										title: <Dashicon icon="desktop" />,
										className: "uagb-desktop-tab uagb-responsive-tabs",
									},
									{
										name:__( "tablet", 'ultimate-addons-for-gutenberg'),
										title: <Dashicon icon="tablet" />,
										className: "uagb-tablet-tab uagb-responsive-tabs",
									},
									{
										name:__( "mobile", 'ultimate-addons-for-gutenberg'),
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
													<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
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
													<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
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
							<hr className="uagb-editor__separator" />
							<TabPanel className="uagb-size-type-field-tabs uagb-size-type-field__common-tabs uagb-inline-margin" activeClass="active-tab"
								tabs={ [
									{
										name: __( "desktop", 'ultimate-addons-for-gutenberg'),
										title: <Dashicon icon="desktop" />,
										className: "uagb-desktop-tab uagb-responsive-tabs",
									},
									{
										name: __( "tablet", 'ultimate-addons-for-gutenberg'),
										title: <Dashicon icon="tablet" />,
										className: "uagb-tablet-tab uagb-responsive-tabs",
									},
									{
										name: __( "mobile", 'ultimate-addons-for-gutenberg'),
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
														<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobileMarginType === "px" } aria-pressed={ mobileMarginType === "px" } onClick={ () => setAttributes( { mobileMarginType: "px" } ) }>{ "px" }</Button>
														<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobileMarginType === "%" } aria-pressed={ mobileMarginType === "%" } onClick={ () => setAttributes( { mobileMarginType: "%" } ) }>{ "%" }</Button>
													</ButtonGroup>
													<h2>{ __( "Margin Mobile", 'ultimate-addons-for-gutenberg' ) }</h2>
													<RangeControl
														label={ UAGB_Block_Icons.top_margin }
														className={ "uagb-margin-control" }
														value={ topMarginMobile }
														onChange={ ( value ) => setAttributes( { topMarginMobile: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.bottom_margin }
														className={ "uagb-margin-control" }
														value={ bottomMarginMobile }
														onChange={ ( value ) => setAttributes( { bottomMarginMobile: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.left_margin }
														className={ "uagb-margin-control" }
														value={ leftMarginMobile }
														onChange={ ( value ) => setAttributes( { leftMarginMobile: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.right_margin }
														className={ "uagb-margin-control" }
														value={ rightMarginMobile }
														onChange={ ( value ) => setAttributes( { rightMarginMobile: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
												</Fragment>
											)
										} else if ( "tablet" === tab.name ) {
											tabout = (
												<Fragment>
													<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
														<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletMarginType === "px" } aria-pressed={ tabletMarginType === "px" } onClick={ () => setAttributes( { tabletMarginType: "px" } ) }>{ "px" }</Button>
														<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletMarginType === "%" } aria-pressed={ tabletMarginType === "%" } onClick={ () => setAttributes( { tabletMarginType: "%" } ) }>{ "%" }</Button>
													</ButtonGroup>
													<h2>{ __( "Margin Tablet" , 'ultimate-addons-for-gutenberg') }</h2>
													<RangeControl
														label={ UAGB_Block_Icons.top_margin }
														className={ "uagb-margin-control" }
														value={ topMarginTablet }
														onChange={ ( value ) => setAttributes( { topMarginTablet: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.bottom_margin }
														className={ "uagb-margin-control" }
														value={ bottomMarginTablet }
														onChange={ ( value ) => setAttributes( { bottomMarginTablet: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.left_margin }
														className={ "uagb-margin-control" }
														value={ leftMarginTablet }
														onChange={ ( value ) => setAttributes( { leftMarginTablet: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.right_margin }
														className={ "uagb-margin-control" }
														value={ rightMarginTablet }
														onChange={ ( value ) => setAttributes( { rightMarginTablet: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
												</Fragment>
											)
										} else {
											tabout = (
												<Fragment>
													<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
														<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ desktopMarginType === "px" } aria-pressed={ desktopMarginType === "px" } onClick={ () => setAttributes( { desktopMarginType: "px" } ) }>{ "px" }</Button>
														<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ desktopMarginType === "%" } aria-pressed={ desktopMarginType === "%" } onClick={ () => setAttributes( { desktopMarginType: "%" } ) }>{ "%" }</Button>
													</ButtonGroup>
													<h2>{ __( "Margin", 'ultimate-addons-for-gutenberg' ) }</h2>
													<RangeControl
														label={ UAGB_Block_Icons.top_margin }
														className={ "uagb-margin-control" }
														value={ topMargin }
														onChange={ ( value ) => setAttributes( { topMargin: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.bottom_margin }
														className={ "uagb-margin-control" }
														value={ bottomMargin }
														onChange={ ( value ) => setAttributes( { bottomMargin: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.left_margin }
														className={ "uagb-margin-control" }
														value={ leftMargin }
														onChange={ ( value ) => setAttributes( { leftMargin: value } ) }
														min={ 0 }
														max={ 500 }
														allowReset
													/>
													<RangeControl
														label={ UAGB_Block_Icons.right_margin }
														className={ "uagb-margin-control" }
														value={ rightMargin }
														onChange={ ( value ) => setAttributes( { rightMargin: value } ) }
														min={ 0 }
														max={ 500 }
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
						<PanelBody title={ __( "Border", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
							<SelectControl
								label={ __( "Border Style", 'ultimate-addons-for-gutenberg' ) }
								value={ borderStyle }
								onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
								options={ [
									{ value: "none", label: __( "None" , 'ultimate-addons-for-gutenberg') },
									{ value: "solid", label: __( "Solid" , 'ultimate-addons-for-gutenberg') },
									{ value: "dotted", label: __( "Dotted" , 'ultimate-addons-for-gutenberg') },
									{ value: "dashed", label: __( "Dashed" , 'ultimate-addons-for-gutenberg') },
									{ value: "double", label: __( "Double" , 'ultimate-addons-for-gutenberg') },
									{ value: "groove", label: __( "Groove" , 'ultimate-addons-for-gutenberg') },
									{ value: "inset", label: __( "Inset" , 'ultimate-addons-for-gutenberg') },
									{ value: "outset", label: __( "Outset" , 'ultimate-addons-for-gutenberg') },
									{ value: "ridge", label: __( "Ridge" , 'ultimate-addons-for-gutenberg') },
								] }
							/>
							{ "none" != borderStyle && (
								<RangeControl
									label={ __( "Border Width" , 'ultimate-addons-for-gutenberg') }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
							) }
							{ "none" != borderStyle && (
								<Fragment>
									<p className="uagb-setting-label">{ __( "Border Color" , 'ultimate-addons-for-gutenberg') }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
									<ColorPalette
										value={ borderColor }
										onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							) }
							<RangeControl
								label={ __( "Border Radius" , 'ultimate-addons-for-gutenberg') }
								value={ borderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
							<BoxShadowControl
								setAttributes = { setAttributes }
								label = { __( "Box Shadow" , 'ultimate-addons-for-gutenberg') }
								boxShadowColor = { { value: boxShadowColor, label: __( "Color" , 'ultimate-addons-for-gutenberg') } }
								boxShadowHOffset = { { value: boxShadowHOffset, label: __( "Horizontal" , 'ultimate-addons-for-gutenberg') } }
								boxShadowVOffset = { { value: boxShadowVOffset, label: __( "Vertical" , 'ultimate-addons-for-gutenberg') } }
								boxShadowBlur = { { value: boxShadowBlur, label: __( "Blur" , 'ultimate-addons-for-gutenberg') } }
								boxShadowSpread = { { value: boxShadowSpread, label: __( "Spread" , 'ultimate-addons-for-gutenberg') } }
								boxShadowPosition = { { value: boxShadowPosition, label: __( "Position" , 'ultimate-addons-for-gutenberg') } }
								
							/>
						</PanelBody>
					</InspectorControls>	
					<div className={ classnames(
						`uagb-block-${ block_id }`,
						"uagb-fse-post-content__wrap",
						) } dangerouslySetInnerHTML={{ __html: content }}>
					</div>
            </Fragment>
        );
    }
}

export default UAGB_FSE_Post_Content;