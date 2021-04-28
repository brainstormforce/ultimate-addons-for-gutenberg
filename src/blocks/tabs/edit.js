/**
 * BLOCK: Tabs Block
 */
import classnames from "classnames";
import times from "lodash/times";
import styling from "./styling";

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography";

import FontIconPicker from "@fonticonpicker/react-fonticonpicker";

import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json";

import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";

import Columnresponsive from "../../components/typography/column-responsive";

const { __ } = wp.i18n;

const {
	Component,
	Fragment,
} = wp.element;

const svg_icons = Object.keys( UAGBIcon );

const {
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
	RichText,
	ColorPalette
} = wp.blockEditor;

const {
	PanelBody,
	TabPanel,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	Tooltip,
	Button,
	Dashicon
} = wp.components;

const {
	createBlock
} = wp.blocks;

const {
	compose,
} = wp.compose;

const { withDispatch, select, dispatch, withSelect } = wp.data;

class UAGBTabsEdit extends Component {	
	constructor() {
		super( ...arguments );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBack = this.onMoveBack.bind( this );
	}
	
	componentDidMount() {
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-tab-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		this.updateTabTitle();
		this.props.resetTabOrder();
	}
	componentDidUpdate() {

		const element = document.getElementById( "uagb-style-tab-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}
	onMove( oldIndex, newIndex ) {
		const { attributes, setAttributes, clientId } = this.props;
		const { tabHeaders, tabActiveFrontend } = attributes;

		const { getBlock } = !wp.blockEditor ? select( "core/editor" ) : select( "core/block-editor" );
		const tabsBlock = getBlock( clientId );

		const titles = [ ...tabHeaders ];
		titles.splice( newIndex, 1, tabHeaders[ oldIndex ] );
		titles.splice( oldIndex, 1, tabHeaders[ newIndex ] );
		setAttributes( { tabHeaders: titles } );
		if ( tabActiveFrontend === ( oldIndex + 1 ) ) {
			setAttributes( { tabActiveFrontend: ( newIndex + 1 ) } );
		} else if ( tabActiveFrontend === ( newIndex + 1 ) ) {
			setAttributes( { tabActiveFrontend: ( oldIndex + 1 ) } );
		}
		this.props.moveTab( tabsBlock.innerBlocks[ oldIndex ].clientId, newIndex );
		this.props.resetTabOrder();
	}
	
	onMoveForward( oldIndex , realTabsCount ) {
	
		return () => {
			if ( oldIndex === realTabsCount - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBack( oldIndex ) {
		return () => {
			if ( oldIndex < 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
		};
	}

	updateTabsTitle( header, index ) {
		const { attributes, setAttributes, clientId } = this.props;
		const { tabHeaders } = attributes;
		const { updateBlockAttributes } = !wp.blockEditor ? dispatch( "core/editor" ) : dispatch( "core/block-editor" );
		const { getBlockOrder } = !wp.blockEditor ? select( "core/editor" ) : select( "core/block-editor" );
		const childBlocks = getBlockOrder( clientId );

		const newHeaders = tabHeaders.map( ( item, idx ) => {
			if ( index === idx ) {
				item = header;
			}
			return item;
		} );
		
		setAttributes( { tabHeaders: newHeaders } );
		updateBlockAttributes( childBlocks[index], { header } );
		this.updateTabTitle();
	}
	updateTabTitle() {
		const { attributes, clientId } = this.props;
		const { tabHeaders } = attributes;
		const { updateBlockAttributes } = !wp.blockEditor ? dispatch( "core/editor" ) : dispatch( "core/block-editor" );
		const { getBlockOrder } = !wp.blockEditor ? select( "core/editor" ) : select( "core/block-editor" );
		const childBlocks = getBlockOrder( clientId );

		childBlocks.forEach( childBlockId => updateBlockAttributes( childBlockId, { tabHeaders } ) );
	}
	addTab() {
		const { attributes, setAttributes, clientId } = this.props;
		const { insertBlock } = !wp.blockEditor ? dispatch( "core/editor" ) : dispatch( "core/block-editor" );
		const tabItemBlock = createBlock( "uagb/tabs-child" );

		insertBlock( tabItemBlock, attributes.tabHeaders.length, clientId );
		setAttributes( {
			tabHeaders: [
				...attributes.tabHeaders,
				"New Tab"
			]
		} );
		this.props.resetTabOrder();
	}

	removeTab( index ) {
		const { attributes, setAttributes, clientId } = this.props;
		const { removeBlock } = !wp.blockEditor ? dispatch( "core/editor" ) : dispatch( "core/block-editor" );
		const { getBlockOrder } = !wp.blockEditor ? select( "core/editor" ) : select( "core/block-editor" );
		const childBlocks = getBlockOrder( clientId );

		removeBlock( childBlocks[index], false );
		setAttributes( {
			tabHeaders: attributes.tabHeaders.filter( ( vl, idx ) => idx !== index )
		} );
		this.updateTabsAttr( { tabActive: 0 } );
		this.props.resetTabOrder();
	}

	updateTabsAttr( attrs ) {
		const { setAttributes, clientId } = this.props;
		const { updateBlockAttributes } = !wp.blockEditor ? dispatch( "core/editor" ) : dispatch( "core/block-editor" );
		const { getBlockOrder } = !wp.blockEditor ? select( "core/editor" ) : select( "core/block-editor" );
		const childBlocks = getBlockOrder( clientId );

		setAttributes( attrs );
		childBlocks.forEach( childBlockId => updateBlockAttributes( childBlockId, attrs ) );
		this.props.resetTabOrder();
	}
	render() {
		const { attributes , setAttributes , className, deviceType   } = this.props;
		const {
			tabsStyleD,
			tabsStyleM,
			tabsStyleT,
			tabActiveFrontend,
			tabHeaders,
			headerBgColor,
			borderWidth,
			borderColor,
			headerTextColor,
			activeTabBgColor,
			activeTabTextColor,
			bodyBgColor,
			bodyTextColor,
			tabActive,
			tabTitleLeftMargin,
			tabTitleRightMargin,
			tabTitleTopMargin,
			tabTitleBottomMargin,
			tabBodyLeftMargin,
			tabBodyRightMargin,
			tabBodyTopMargin,
			tabBodyBottomMargin,
			tabBodyVertPadding,
			tabBodyHrPadding,
			tabTitleVertPadding,
			tabTitleHrPadding,
			titleLoadGoogleFonts,
			titleFontFamily,
			titleFontWeight,
			titleFontSubset,
			titleFontSizeType,
			titleFontSize,
			titleFontSizeMobile,
			titleFontSizeTablet,
			titleLineHeightType,
			titleLineHeight,
			titleLineHeightMobile,
			titleLineHeightTablet,
			titleAlign,
			tabAlign,
			showIcon,
			icon,
			iconColor,
			iconPosition,
			iconSpacing,
			iconSize,
			activeiconColor
		} = attributes;

		return (
			<Fragment>     
				<InspectorControls>
					<PanelBody title={ __( "Tabs Style"  , "ultimate-addons-for-gutenberg" ) }  initialOpen={ true }>
						<Columnresponsive />
						{ "Desktop" === deviceType && (
							<Fragment>
								<SelectControl
									label={ __( "Desktop Style"  , "ultimate-addons-for-gutenberg" ) }
									value={ tabsStyleD }
									onChange={ ( value ) => setAttributes( { tabsStyleD: value } ) }
									beforeIcon="editor-textcolor"
									options={ [
										{ value: "hstyle1", label: __( "Horizontal Style 1"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle2", label: __( "Horizontal Style 2"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle3", label: __( "Horizontal Style 3"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle4", label: __( "Horizontal Style 4"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle5", label: __( "Horizontal Style 5"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle6", label: __( "Vertical Style 6"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle7", label: __( "Vertical Style 7"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle8", label: __( "Vertical Style 8"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle9", label: __( "Vertical Style 9"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle10", label: __( "Vertical Style 10"  , "ultimate-addons-for-gutenberg" ) },
									] }
								/>
							</Fragment>
						) }
						{ "Tablet" === deviceType && (
							<Fragment>
								<SelectControl
									label={ __( "Tablet Style"  , "ultimate-addons-for-gutenberg" ) }
									value={ tabsStyleT }
									onChange={ ( value ) => setAttributes( { tabsStyleT: value } ) }
									beforeIcon="editor-textcolor"
									options={ [
										{ value: "hstyle1", label: __( "Horizontal Style 1"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle2", label: __( "Horizontal Style 2"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle3", label: __( "Horizontal Style 3"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle4", label: __( "Horizontal Style 4"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle5", label: __( "Horizontal Style 5"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle6", label: __( "Vertical Style 6"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle7", label: __( "Vertical Style 7"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle8", label: __( "Vertical Style 8"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle9", label: __( "Vertical Style 9"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle10", label: __( "Vertical Style 10"  , "ultimate-addons-for-gutenberg" ) },
									] }
								/>
							</Fragment>
						) }
						{ "Mobile" === deviceType && (
							<Fragment>
								<SelectControl
									label={ __( "Mobile Style"  , "ultimate-addons-for-gutenberg" ) }
									value={ tabsStyleM }
									onChange={ ( value ) => setAttributes( { tabsStyleM: value } ) }
									beforeIcon="editor-textcolor"
									options={ [
										{ value: "hstyle1", label: __( "Horizontal Style 1" , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle2", label: __( "Horizontal Style 2" , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle3", label: __( "Horizontal Style 3" , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle4", label: __( "Horizontal Style 4" , "ultimate-addons-for-gutenberg" ) },
										{ value: "hstyle5", label: __( "Horizontal Style 5" , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle6", label: __( "Vertical Style 6" , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle7", label: __( "Vertical Style 7" , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle8", label: __( "Vertical Style 8" , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle9", label: __( "Vertical Style 9" , "ultimate-addons-for-gutenberg" ) },
										{ value: "vstyle10", label: __( "Vertical Style 10" , "ultimate-addons-for-gutenberg" ) },
										{ value: "stack1", label: __( "Stack Style 11" , "ultimate-addons-for-gutenberg" ) },
										{ value: "stack2", label: __( "Stack Style 12" , "ultimate-addons-for-gutenberg" ) },
										{ value: "stack3", label: __( "Stack Style 13"  , "ultimate-addons-for-gutenberg" ) },
										{ value: "stack4", label: __( "Stack Style 14"  , "ultimate-addons-for-gutenberg" ) },
									] }
								/>
							</Fragment>
						) }
					</PanelBody>
					<PanelBody title={ __( "Tabs Title Settings"  , "ultimate-addons-for-gutenberg" ) }  initialOpen={ false }>
						<SelectControl
							label={ __( "Initial Open Tab"  , "ultimate-addons-for-gutenberg" ) }
							value={ tabActiveFrontend }
							options={ tabHeaders.map( ( tab, index ) => {
								return { value: index, label: tab };
							} ) }
							onChange={ ( value ) => setAttributes( { tabActiveFrontend: parseInt( value ) } ) }
						/>
						<h2>{ __( "Tab Alignment"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<BlockAlignmentToolbar
							value={ tabAlign }
							onChange={ ( value ) =>
								setAttributes( {
									tabAlign: value,
								} )
							}
							controls={ [ "left", "center", "right" ] }
							isCollapsed={ false }
						/>	
						<h2>{ __( "Tab Text Alignment"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<BlockAlignmentToolbar
							value={ titleAlign }
							onChange={ ( value ) =>
								setAttributes( {
									titleAlign: value,
								} )
							}
							controls={ [ "left", "center", "right" ] }
							isCollapsed={ false }
						/>
						<ToggleControl
							label={ __( "Enable Icon"  , "ultimate-addons-for-gutenberg" ) }
							checked={ showIcon }
							onChange={ ( value ) => setAttributes( { showIcon: ! showIcon } ) }
						/>
						{ showIcon && 
						<Fragment>
							<h2 className="components-base-control__label">{ __( "Icon"  , "ultimate-addons-for-gutenberg" ) }</h2>
							<FontIconPicker
								icons={ svg_icons }
								renderFunc={ renderSVG }
								theme="default"
								value={ icon }
								onChange={ ( value ) => setAttributes( { icon: value } ) }
								isMulti={ false }
								noSelectedPlaceholder={ __( "Select Icon"  , "ultimate-addons-for-gutenberg" ) }
							/>
							<SelectControl
								label={ __( "Icon Position"  , "ultimate-addons-for-gutenberg" ) }
								value={ iconPosition }
								options={ [
									{ value: "left", label: __( "Left"  , "ultimate-addons-for-gutenberg" ) },
									{ value: "right", label: __( "Right"  , "ultimate-addons-for-gutenberg" ) },
									{ value: "top", label: __( "Top"  , "ultimate-addons-for-gutenberg" ) },
									{ value: "bottom", label: __( "Bottom"  , "ultimate-addons-for-gutenberg" ) },
								] }
								onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
							/>
							<h2>{ __( "Icon Spacing"  , "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								className={ "uagb-tabs__icon" }
								value={ iconSpacing }
								onChange={ ( value ) => setAttributes( { iconSpacing: value } ) }
								min={ 0 }
								max={ 500 }
								allowReset
							/>
							<h2>{ __( "Icon Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
							<ColorPalette 
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
								allowReset
							/>
							<h2>{ __( "Active Icon Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
							<ColorPalette 
								value={ activeiconColor }
								onChange={ ( value ) => setAttributes( { activeiconColor: value } ) }
								allowReset
							/>
							<h2>{ __( "Icon Size"  , "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								className={ "uagb-tabs__icon" }
								value={ iconSize }
								onChange={ ( value ) => setAttributes( { iconSize: value } ) }
								min={ 0 }
								max={ 500 }
								allowReset
							/>
						</Fragment>
						}
						<h2>{ __( "Tab Title Margin (px)"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ "uagb-margin-control" }
							value={ tabTitleLeftMargin }
							onChange={ ( value ) => setAttributes( { tabTitleLeftMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ "uagb-margin-control" }
							value={ tabTitleRightMargin }
							onChange={ ( value ) => setAttributes( { tabTitleRightMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							value={ tabTitleTopMargin }
							onChange={ ( value ) => setAttributes( { tabTitleTopMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ "uagb-margin-control" }
							value={ tabTitleBottomMargin }
							onChange={ ( value ) => setAttributes( { tabTitleBottomMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<h2>{ __( "Title Padding"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							value={ tabTitleVertPadding }
							onChange={ ( value ) => setAttributes( { tabTitleVertPadding: value } ) }
							min={ 0 }
							max={ 500 }
							className={ "uagb-margin-control" }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							value={ tabTitleHrPadding }
							onChange={ ( value ) => setAttributes( { tabTitleHrPadding: value } ) }
							min={ 0 }
							max={ 500 }
							className={ "uagb-margin-control" }
							allowReset
						/>
						<h2>{ __( "Title Background Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<ColorPalette
							value={ headerBgColor }
							onChange={ ( value ) => setAttributes( { headerBgColor: value } ) }
							allowReset
						/>
						<h2>{ __( "Title Text Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<ColorPalette 
							value={ headerTextColor }
							onChange={ ( value ) => setAttributes( { headerTextColor: value } ) }
							allowReset
						/>
						<h2>{ __( "Active Tab Background Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<ColorPalette 
							value={ activeTabBgColor }
							onChange={ ( value ) => setAttributes( { activeTabBgColor: value } ) }
							allowReset
						/>
						<h2>{ __( "Active Tab Text Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<ColorPalette 
							value={ activeTabTextColor }
							onChange={ ( value ) => setAttributes( { activeTabTextColor: value } ) }
							allowReset
						/>
						<TypographyControl
							label={ __( "Typography"  , "ultimate-addons-for-gutenberg" ) }
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
					</PanelBody>
					<PanelBody title={ __( "Tabs Body Settings"  , "ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
						<h2>{ __( "Body Background Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<ColorPalette
							value={ bodyBgColor }
							onChange={ ( value ) => setAttributes( { bodyBgColor: value } ) }
							allowReset
						/> 
						<h2>{ __( "Body Text Color"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<ColorPalette
							value={ bodyTextColor }
							onChange={ ( value ) => setAttributes( { bodyTextColor: value } ) }
							allowReset
						/>
						<h2>{ __( "Tab Body Margin (px)"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ "uagb-margin-control" }
							value={ tabBodyLeftMargin }
							onChange={ ( value ) => setAttributes( { tabBodyLeftMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ "uagb-margin-control" }
							value={ tabBodyRightMargin }
							onChange={ ( value ) => setAttributes( { tabBodyRightMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ "uagb-margin-control" }
							value={ tabBodyTopMargin }
							onChange={ ( value ) => setAttributes( { tabBodyTopMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ "uagb-margin-control" }
							value={ tabBodyBottomMargin }
							onChange={ ( value ) => setAttributes( { tabBodyBottomMargin: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<h2>{ __( "Body Padding"  , "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							value={ 
								tabBodyVertPadding }
							onChange={ ( value ) => setAttributes( { 
								tabBodyVertPadding: value } ) }
							min={ 0 }
							max={ 500 }
							className={ "uagb-margin-control" }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							value={ tabBodyHrPadding }
							onChange={ ( value ) => setAttributes( { tabBodyHrPadding: value } ) }
							min={ 0 }
							max={ 500 }
							className={ "uagb-margin-control" }
							allowReset
						/>
					</PanelBody>
					<PanelBody title={ __( "Border Settings"  , "ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
						<p className="uagb-setting-label">{ __( "Border Color"  , "ultimate-addons-for-gutenberg" ) }</p>					
						<ColorPalette
							value={ borderColor }
							onChange={ ( value ) => setAttributes( { borderColor: value } ) }
							allowReset
						/> 
						<RangeControl
							label={ __( "Border width"  , "ultimate-addons-for-gutenberg" ) }
							value={ borderWidth }
							min={ 1 }
							max={ 500 }
							onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`,
					"uagb-tabs__wrap",
					`uagb-tabs__${tabsStyleD}-desktop`,
					`uagb-tabs__${tabsStyleT}-tablet`,
					`uagb-tabs__${tabsStyleM}-mobile`,
				) }>
					<ul className={ `uagb-tabs__panel uagb-tabs__align-${tabAlign}` }>
						{ tabHeaders.map( ( header, index ) => (
							<li key={ index } className={ `uagb-tab ${tabActive === index ? "uagb-tabs__active" : ""} ` }
								id={ `uagb-tabs__tab${index}` }>
								{ tabHeaders.length > 0 && (
									<div className="uagb-tabs-editor-controls">
										{  index !== 0 && (	
											<Tooltip text={ __( "Move Item Back"  , "ultimate-addons-for-gutenberg" ) }>
												<span className="uagb-tab-item__move-back"
													onClick={ index === 0 ? " " : this.onMoveBack( index , tabHeaders.length ) }
													aria-disabled={ ( index ) === tabHeaders.length }
													disabled={ ( index ) === tabHeaders.length }
												>
													<Dashicon icon="arrow-left" />
												</span>
											</Tooltip>
										) }
										{ ( index + 1 ) !== tabHeaders.length && (
											<Tooltip text={ __( "Move Item Forward"  , "ultimate-addons-for-gutenberg" ) }>
												<span className="uagb-tab-item__move-forward"
													onClick={ ( index ) === tabHeaders.length ? " " : this.onMoveForward( index , tabHeaders.length ) }
													aria-disabled={ ( index ) === tabHeaders.length }
													disabled={ ( index ) === tabHeaders.length }
												>
													<Dashicon icon="arrow-right" />
												</span>
											</Tooltip>
										) }
										<Tooltip text={ __( "Remove tab"  , "ultimate-addons-for-gutenberg" ) }>
											<span className="uagb-tabs__remove"
												onClick={ () => this.removeTab( index ) }
											>
												<Dashicon icon="no" />
											</span>
										</Tooltip>
									</div>
								) }
								<a className={ `uagb-tabs__icon-position-${iconPosition} uagb-tabs-list` }
									onClick={ () => {
										this.props.updateActiveTab( index );
									} }
									data-tab={ index }>
									{ ( showIcon && icon && ( iconPosition === "left" || iconPosition === "top" ) &&
										<span className="uagb-tabs__icon">{ renderSVG( icon ) }</span>
									) }
									<RichText
										tagName="p"
										value={ header }
										onChange={ ( value ) => this.updateTabsTitle( value, index ) }
										onSplit={ () => null }
										placeholder={ __( "Title…" , "ultimate-addons-for-gutenberg" ) }
									/>
									{ ( showIcon && icon && ( iconPosition === "right" || iconPosition === "bottom" )&&
									<span className="uagb-tabs__icon">{ renderSVG( icon ) }</span>
									) }
								</a>
							</li>
						) ) }
						<li className="uagb-tab uagb-tabs__add-tab">
							<Tooltip text={ __( "Add tab"  , "ultimate-addons-for-gutenberg" ) }>
								<span onClick={ () => this.addTab() }>
									<Dashicon icon="plus" />
								</span>
							</Tooltip>
						</li>
					</ul>
					<div className="uagb-tabs__body-wrap">
						<InnerBlocks
							template={ [ ["uagb/tabs-child"], ["uagb/tabs-child"], ["uagb/tabs-child"]] }
							templateLock={ false }
							allowedBlocks={ [ "uagb/tabs-child" ] }
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, props ) => {
		const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );
		const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;
		return {
			deviceType,
		};
	} ),
	withDispatch( ( dispatch, { clientId }, { select } ) => {
		const {
			getBlock,
		} = select( "core/block-editor" );
		const {
			updateBlockAttributes,
			moveBlockToPosition
		} = dispatch( "core/block-editor" );
		const block = getBlock( clientId );
		
		return {
			resetTabOrder() {
				times( block.innerBlocks.length, n => {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						id: n,
					} );
				} );
			},
			updateActiveTab( tabActive ) {
				updateBlockAttributes( block.clientId, {
					tabActive,
				} );
				times( block.innerBlocks.length, n => {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						tabActive,
					} );
				} );
				this.resetTabOrder();
			},
			moveTab( tabId, newIndex ) {
				moveBlockToPosition( tabId, clientId, clientId, parseInt( newIndex ) );
			},
		};

	} ),
)( UAGBTabsEdit );