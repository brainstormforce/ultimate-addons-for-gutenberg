/**
 * BLOCK: Buttons Child - Edit Class
 */

// Import classes
import classnames from "classnames"
import styling from "./styling"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
	__experimentalLinkControl
} = wp.blockEditor

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
} = wp.components
class UAGBButtonsChild extends Component {
	
	constructor() {
		super( ...arguments )
		this.onClickLinkSettings = this.onClickLinkSettings.bind(this)
		this.onChangeOpensInNewTab = this.onChangeOpensInNewTab.bind(this)
		this.state = {
			isURLPickerOpen:false,
		}
	}

	componentDidMount() {
		
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
        this.props.setAttributes( { classMigrate: true } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-button-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-style-button-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	onClickLinkSettings () {
		
		const { attributes, setAttributes } = this.props
		const { target } = attributes 
		if ( "_self" === target ) {
			setAttributes( { opensInNewTab: false } )
		} else if ( "_blank" === target ) {
			setAttributes( { opensInNewTab: true } )
		}

		this.setState( {
			isURLPickerOpen: true
		}) 
	}

	onChangeOpensInNewTab ( value ) {
		if ( true === value ) {
			this.props.setAttributes( { target: '_blank' } )
		} else {
			this.props.setAttributes( { target: '_self' } )
		}
	}

	render() {
		
		const { attributes, setAttributes } = this.props
	
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
			opensInNewTab
		} = attributes;

		const linkControl = this.state.isURLPickerOpen && (

			<Popover
				position="bottom center"
				onClose={ () => this.setState( {
					isURLPickerOpen: false
				}) }
			>
				<__experimentalLinkControl
					value={ { url:link, opensInNewTab:opensInNewTab }  }
					onChange={( {
					url: newURL = '',
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
					title={ __( "Button Settings" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<h2>{  __( " Color Settings" ) }</h2>
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal" ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover" ),
								className: "uagb-hover-tab",
							},
						] }>
						{
							( tabName ) => {
								let btn_color_tab
								if( "normal" === tabName.name ) {
									btn_color_tab = <Fragment>
										<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: color }} ></span></span></p>
										<ColorPalette
											value={ color }
											onChange={ ( value ) => setAttributes( { color: value } ) }
											allowReset
										/>
										<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: background }} ></span></span></p>
										<ColorPalette
											value={ background }
											onChange={ ( value ) => setAttributes( { background: value } ) }
											allowReset
										/>
										<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
										<ColorPalette
											value={ borderColor }
											onChange={ ( value ) => setAttributes( { borderColor: value } ) }
											allowReset
										/>
									</Fragment>
								}else {
									btn_color_tab = <Fragment>
										<p className="uagb-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: hColor }} ></span></span></p>
										<ColorPalette
											value={ hColor }
											onChange={ ( value ) => setAttributes( { hColor: value } ) }
											allowReset
										/>
										<p className="uagb-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: hBackground }} ></span></span></p>
										<ColorPalette
											value={ hBackground }
											onChange={ ( value ) => setAttributes( { hBackground: value } ) }
											allowReset
										/>
										<p className="uagb-setting-label">{ __( "Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderHColor }} ></span></span></p>
										<ColorPalette
											value={ borderHColor }
											onChange={ ( value ) => setAttributes( { borderHColor: value } ) }
											allowReset
										/>
									</Fragment>
								}
								return <div>{ btn_color_tab }</div>
							}
						}
					</TabPanel>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Padding (px)" ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ "uagb-margin-control" }
						value={ vPadding }
						onChange={ value => {
							setAttributes( { vPadding: value } )
						} }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ "uagb-margin-control" }
						value={ hPadding }
						onChange={ value => {
							setAttributes( { hPadding: value } )
						} }
						min={ 0 }
						max={ 100 }
					/>
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
					{ borderStyle != "none" &&
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
					<RangeControl
						label={ __( "Rounded Corners" ) }
						value={ borderRadius }
						onChange={ value => {
							setAttributes( { borderRadius: value } )
						} }
						min={ 0 }
						max={ 50 }
					/>
					<hr className="uagb-editor__separator" />
					<TabPanel className="uagb-size-type-field-tabs" activeClass="active-tab"
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
												label={ __( "Font Size" ) }
												value={ sizeMobile }
												onChange={ value => {
													setAttributes( { sizeMobile: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
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
												label={ __( "Font Size" ) }
												value={ sizeTablet }
												onChange={ value => {
													setAttributes( { sizeTablet: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								} else {
									tabout = (
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
												label={ __( "Font Size" ) }
												value={ size }
												onChange={ value => {
													setAttributes( { size: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
					<TabPanel className="uagb-size-type-field-tabs" activeClass="active-tab"
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
												label={ __( "Line Height" ) }
												value={ lineHeightMobile }
												onChange={ value => {
													setAttributes( { lineHeightMobile: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<Fragment>
											<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
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
												label={ __( "Line Height" ) }
												value={ lineHeightTablet }
												onChange={ value => {
													setAttributes( { lineHeightTablet: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												step={0.1}
												initialPosition={16}
											/>
										</Fragment>
									)
								} else {
									tabout = (
										<Fragment>
											<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
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
												label={ __( "Line Height" ) }
												value={ lineHeight }
												onChange={ value => {
													setAttributes( { lineHeight: value } )
												} }
												min={ 0 }
												max={ 100 }
												step={0.1}
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
					<hr className="uagb-editor__separator" />
				</PanelBody>
			)
		}

        return (
            <Fragment>

				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon = 'admin-links'
							name="link"
							title={ __( 'Link' ) }
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
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }>
					<div className="uagb-button__wrapper">
						<div className="uagb-buttons-repeater uagb-button__wrapper">
							<RichText
								placeholder={ __( "Add text…" ) }
								value={ label }
								tagName='div'
								onChange={ value => {
									setAttributes( { label: value })
								} }
								allowedFormats={ [ "bold", "italic", "strikethrough" ] }
								className='uagb-button__link'
								rel ="noopener noreferrer"
								keepPlaceholderOnFocus
							/>	
						</div>
					</div>
				</div>
            </Fragment>
        )
	}
}
export default UAGBButtonsChild