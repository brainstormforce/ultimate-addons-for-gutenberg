/**
 * BLOCK: Buttons Child - Edit Class
 */

// Import classes
import classnames from "classnames";
import styling from "./styling";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
import Columnresponsive from "../../components/typography/column-responsive";

const svg_icons = Object.keys( UAGBIcon );

const { __ } = wp.i18n;

const {
	Component,
	Fragment,
} = wp.element;

const {
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
	__experimentalLinkControl
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ButtonGroup,
	Button,
	Dashicon,
	Popover,
	ToolbarButton,
	ToolbarGroup,
	ToggleControl
} = wp.components;

const { withSelect } = wp.data;

class UAGBButtonsChild extends Component {
	
	constructor() {
		super( ...arguments );
		this.onClickLinkSettings = this.onClickLinkSettings.bind( this );
		this.onChangeOpensInNewTab = this.onChangeOpensInNewTab.bind( this );
		this.state = {
			isURLPickerOpen:false,
		};
	}

	componentDidMount() {
		
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-button-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps ) {
		const element = document.getElementById( "uagb-style-button-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

	onClickLinkSettings () {
		
		const { attributes, setAttributes } = this.props;
		const { target } = attributes; 
		if ( "_self" === target ) {
			setAttributes( { opensInNewTab: false } );
		} else if ( "_blank" === target ) {
			setAttributes( { opensInNewTab: true } );
		}

		this.setState( {
			isURLPickerOpen: true
		} ); 
	}

	onChangeOpensInNewTab ( value ) {
		if ( true === value ) {
			this.props.setAttributes( { target: "_blank" } );
		} else {
			this.props.setAttributes( { target: "_self" } );
		}
	}

	render() {
		
		const { attributes, setAttributes, deviceType } = this.props;
	
		const {
			className,
			label,
			link,
			size,
			vPadding,
			hPadding,
			borderWidth,
			borderRadius,
			borderStyle,
			borderColor,
			borderHColor,
			color,
			background,
			hColor,
			hBackground,
			sizeType,
			sizeMobile,
			sizeTablet,
			lineHeight,
			lineHeightType,
			lineHeightMobile,
			lineHeightTablet,
			opensInNewTab,
			inheritFromTheme,
			icon,
			iconPosition,
			iconSpace,
		} = attributes;

		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: ( value ) => ( setAttributes( { icon: value } ) ),
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon", "ultimate-addons-for-gutenberg" )
		};

		const linkControl = this.state.isURLPickerOpen && (

			<Popover
				position="bottom center"
				onClose={ () => this.setState( {
					isURLPickerOpen: false
				} ) }
			>
				<__experimentalLinkControl
					value={ { url:link, opensInNewTab }  }
					onChange={ ( {
						url: newURL = "",
						opensInNewTab: newOpensInNewTab,
					} ) => {
						setAttributes( { link: newURL } );
						setAttributes( { opensInNewTab: newOpensInNewTab } );
						this.onChangeOpensInNewTab( newOpensInNewTab );
						
					} }
				/>
			</Popover>
		);
		const buttonControls = () => {
			return (
				<PanelBody
					title={ __( "Button Settings", "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Inherit from Theme", "ultimate-addons-for-gutenberg" ) }
						checked={ inheritFromTheme }
						onChange={ ( value ) => setAttributes( { inheritFromTheme: ! inheritFromTheme } ) }
					/>
					<h2>{ __( "Button Icon", "ultimate-addons-for-gutenberg" ) }</h2>
					<FontIconPicker { ...icon_props } />
					{ "" !== icon &&
						<Fragment>
							<SelectControl
								label={ __( "Icon Position", "ultimate-addons-for-gutenberg" ) }
								value={ iconPosition }
								onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
								options={ [
									{ value: "before", label: __( "Before Text", "ultimate-addons-for-gutenberg" ) },
									{ value: "after", label: __( "After Text", "ultimate-addons-for-gutenberg" ) },
								] }
							/>
							<RangeControl
								label={ __( "Icon Spacing", "ultimate-addons-for-gutenberg" ) }
								value={ iconSpace }
								onChange={ ( value ) => setAttributes( { iconSpace: value } ) }
								min={ 0 }
								max={ 50 }
								beforeIcon=""
								allowReset
							/>
						</Fragment>
					}
					{ ! inheritFromTheme &&
						<Fragment>
							<h2>{  __( " Color Settings", "ultimate-addons-for-gutenberg" ) }</h2>
							<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
								activeClass="active-tab"
								tabs={ [
									{
										name: "normal",
										title: __( "Normal", "ultimate-addons-for-gutenberg" ),
										className: "uagb-normal-tab",
									},
									{
										name: "hover",
										title: __( "Hover", "ultimate-addons-for-gutenberg" ),
										className: "uagb-hover-tab",
									},
								] }>
								{
									( tabName ) => {
										let btn_color_tab;
										if ( "normal" === tabName.name ) {
											btn_color_tab = <Fragment>
												<p className="uagb-setting-label">{ __( "Text Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: color } } ></span></span></p>
												<ColorPalette
													value={ color }
													onChange={ ( value ) => setAttributes( { color: value } ) }
													allowReset
												/>
												<p className="uagb-setting-label">{ __( "Background Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: background } } ></span></span></p>
												<ColorPalette
													value={ background }
													onChange={ ( value ) => setAttributes( { background: value } ) }
													allowReset
												/>
												<p className="uagb-setting-label">{ __( "Border Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: borderColor } } ></span></span></p>
												<ColorPalette
													value={ borderColor }
													onChange={ ( value ) => setAttributes( { borderColor: value } ) }
													allowReset
												/>
											</Fragment>;
										} else {
											btn_color_tab = <Fragment>
												<p className="uagb-setting-label">{ __( "Text Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: hColor } } ></span></span></p>
												<ColorPalette
													value={ hColor }
													onChange={ ( value ) => setAttributes( { hColor: value } ) }
													allowReset
												/>
												<p className="uagb-setting-label">{ __( "Background Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: hBackground } } ></span></span></p>
												<ColorPalette
													value={ hBackground }
													onChange={ ( value ) => setAttributes( { hBackground: value } ) }
													allowReset
												/>
												<p className="uagb-setting-label">{ __( "Border Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: borderHColor } } ></span></span></p>
												<ColorPalette
													value={ borderHColor }
													onChange={ ( value ) => setAttributes( { borderHColor: value } ) }
													allowReset
												/>
											</Fragment>;
										}
										return <div>{ btn_color_tab }</div>;
									}
								}
							</TabPanel>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Padding (px)", "ultimate-addons-for-gutenberg" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.vertical_spacing }
								className={ "uagb-margin-control" }
								value={ vPadding }
								onChange={ value => {
									setAttributes( { vPadding: value } );
								} }
								min={ 0 }
								max={ 100 }
							/>
							<RangeControl
								label={ UAGB_Block_Icons.horizontal_spacing }
								className={ "uagb-margin-control" }
								value={ hPadding }
								onChange={ value => {
									setAttributes( { hPadding: value } );
								} }
								min={ 0 }
								max={ 100 }
							/>
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
							{ borderStyle != "none" &&
								<RangeControl
									label={ __( "Thickness", "ultimate-addons-for-gutenberg" ) }
									value={ borderWidth }
									onChange={ value => {
										setAttributes( { borderWidth: value } );
									} }
									min={ 0 }
									max={ 20 }
								/>
							}
							<RangeControl
								label={ __( "Rounded Corners", "ultimate-addons-for-gutenberg" ) }
								value={ borderRadius }
								onChange={ value => {
									setAttributes( { borderRadius: value } );
								} }
								min={ 0 }
								max={ 50 }
							/>
							<hr className="uagb-editor__separator" />
							<Columnresponsive />
							{ "Desktop" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
										<Button
											key={ "px" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ sizeType === "px" }
											aria-pressed={ sizeType === "px" }
											onClick={ () => setAttributes( { sizeType: "px" } ) }
										>
											{ "px" }
										</Button>
										<Button
											key={ "%" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ sizeType === "%" }
											aria-pressed={ sizeType === "%" }
											onClick={ () => setAttributes( { sizeType: "%" } ) }
										>
											{ "%" }
										</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Font Size", "ultimate-addons-for-gutenberg" ) }
										value={ size }
										onChange={ value => {
											setAttributes( { size: value } );
										} }
										min={ 0 }
										max={ 100 }
										beforeIcon="editor-textcolor"
										allowReset
										initialPosition={ 16 }
									/>
								</Fragment>
							) }
							{ "Tablet" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
										<Button
											key={ "px" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ sizeType === "px" }
											aria-pressed={ sizeType === "px" }
											onClick={ () => setAttributes( { sizeType: "px" } ) }
										>
											{ "px" }
										</Button>
										<Button
											key={ "%" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ sizeType === "%" }
											aria-pressed={ sizeType === "%" }
											onClick={ () => setAttributes( { sizeType: "%" } ) }
										>
											{ "%" }
										</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Font Size", "ultimate-addons-for-gutenberg" ) }
										value={ sizeTablet }
										onChange={ value => {
											setAttributes( { sizeTablet: value } );
										} }
										min={ 0 }
										max={ 100 }
										beforeIcon="editor-textcolor"
										allowReset
										initialPosition={ 16 }
									/>
								</Fragment>
							) }
							{ "Mobile" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
										<Button
											key={ "px" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ sizeType === "px" }
											aria-pressed={ sizeType === "px" }
											onClick={ () => setAttributes( { sizeType: "px" } ) }
										>
											{ "px" }
										</Button>
										<Button
											key={ "%" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ sizeType === "%" }
											aria-pressed={ sizeType === "%" }
											onClick={ () => setAttributes( { sizeType: "%" } ) }
										>
											{ "%" }
										</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Font Size", "ultimate-addons-for-gutenberg" ) }
										value={ sizeMobile }
										onChange={ value => {
											setAttributes( { sizeMobile: value } );
										} }
										min={ 0 }
										max={ 100 }
										beforeIcon="editor-textcolor"
										allowReset
										initialPosition={ 16 }
									/>
								</Fragment>
							) }
							<Columnresponsive />
							{ "Desktop" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
										<Button
											key={ "px" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ lineHeightType === "px" }
											aria-pressed={ lineHeightType === "px" }
											onClick={ () => setAttributes( { lineHeightType: "px" } ) }
										>
											{ "px" }
										</Button>
										<Button
											key={ "%" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ lineHeightType === "%" }
											aria-pressed={ lineHeightType === "%" }
											onClick={ () => setAttributes( { lineHeightType: "%" } ) }
										>
											{ "%" }
										</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Line Height", "ultimate-addons-for-gutenberg" ) }
										value={ lineHeight }
										onChange={ value => {
											setAttributes( { lineHeight: value } );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.1 }
										beforeIcon="editor-textcolor"
										allowReset
										initialPosition={ 16 }
									/>
								</Fragment>
							) }
							{ "Tablet" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
										<Button
											key={ "px" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ lineHeightType === "px" }
											aria-pressed={ lineHeightType === "px" }
											onClick={ () => setAttributes( { lineHeightType: "px" } ) }
										>
											{ "px" }
										</Button>
										<Button
											key={ "%" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ lineHeightType === "%" }
											aria-pressed={ lineHeightType === "%" }
											onClick={ () => setAttributes( { lineHeightType: "%" } ) }
										>
											{ "%" }
										</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Line Height", "ultimate-addons-for-gutenberg" ) }
										value={ lineHeightTablet }
										onChange={ value => {
											setAttributes( { lineHeightTablet: value } );
										} }
										min={ 0 }
										max={ 100 }
										beforeIcon="editor-textcolor"
										allowReset
										step={ 0.1 }
										initialPosition={ 16 }
									/>
								</Fragment>
							) }
							{ "Mobile" === deviceType && (
								<Fragment>
									<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
										<Button
											key={ "px" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ lineHeightType === "px" }
											aria-pressed={ lineHeightType === "px" }
											onClick={ () => setAttributes( { lineHeightType: "px" } ) }
										>
											{ "px" }
										</Button>
										<Button
											key={ "%" }
											className="uagb-size-btn"
											isSmall
											isPrimary={ lineHeightType === "%" }
											aria-pressed={ lineHeightType === "%" }
											onClick={ () => setAttributes( { lineHeightType: "%" } ) }
										>
											{ "%" }
										</Button>
									</ButtonGroup>
									<RangeControl
										label={ __( "Line Height", "ultimate-addons-for-gutenberg" ) }
										value={ lineHeightMobile }
										onChange={ value => {
											setAttributes( { lineHeightMobile: value } );
										} }
										min={ 0 }
										max={ 100 }
										beforeIcon="editor-textcolor"
										allowReset
										initialPosition={ 16 }
									/>
								</Fragment>
							) }
							<hr className="uagb-editor__separator" />
						</Fragment>
					}
				</PanelBody>
			);
		};

		const icon_html = ( curr_position ) => {
			if ( "" !== icon && curr_position === iconPosition ) {
				return (
					<span className={ classnames( "uagb-button__icon", `uagb-button__icon-position-${ iconPosition }` ) }>
						{ renderSVG( icon ) }
					</span>
				);
			}
			return null;
		};

		return (
			<Fragment>

				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon='admin-links'
							name="link"
							title={ __( "Link" ) }
							onClick={ this.onClickLinkSettings }
						/>
					</ToolbarGroup>
				</BlockControls>
				{ linkControl }
				<InspectorControls>
					{ buttonControls }
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-buttons__outer-wrap",
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`,
					( inheritFromTheme ) ? "wp-block-button" : null
				) }>
					<div className="uagb-button__wrapper">
						<div className={ classnames( "uagb-buttons-repeater", ( inheritFromTheme ) ? "wp-block-button__link" : null ) }>
							{ icon_html( "before" ) }
							<RichText
								placeholder={ __( "Add text…" ) }
								value={ label }
								tagName='div'
								onChange={ value => {
									setAttributes( { label: value } );
								} }
								allowedFormats={ [ "bold", "italic", "strikethrough" ] }
								className='uagb-button__link'
								rel="noopener noreferrer"
								keepPlaceholderOnFocus
							/>
							{ icon_html( "after" ) }
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default withSelect( ( select, props ) => { 

	const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );

	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType,
	};
} )( UAGBButtonsChild );