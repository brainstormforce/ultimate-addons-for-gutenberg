/**
 * BLOCK: Icon List - Edit Class
 */

// Import classes
import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import memoize from "memize"
import styling from "./styling"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n
const { select } = wp.data;

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
	TabPanel,
	ButtonGroup,
	Dashicon
} = wp.components

const ALLOWED_BLOCKS = [ "uagb/icon-list-child" ]

class UAGBIconList extends Component {

	constructor() {
		super( ...arguments )

		this.changeChildAttr = this.changeChildAttr.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate : true } )
		this.props.setAttributes( { childMigrate : true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-icon-list-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )

		this.changeChildAttr( this.props.attributes.hideLabel )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-style-icon-list-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	changeChildAttr ( value ) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

		getChildBlocks.forEach((iconChild, key) => {
			iconChild.attributes.hideLabel = value
		});
		setAttributes( { hideLabel: value } )
	}

	render() {

		const { attributes, setAttributes } = this.props

		const {
			align,
			className,
			icon_count,
			icons,
			gap,
			inner_gap,
			stack,
			icon_layout,
			iconPosition,
			topMargin,
			size,
			sizeType,
			sizeMobile,
			sizeTablet,
			hideLabel,
			borderRadius,
			bgSize,
			border,
			fontSize,
			fontSizeType,
			fontSizeMobile,
			fontSizeTablet,
			fontFamily,
			fontWeight,
			fontSubset,
			lineHeight,
			lineHeightType,
			lineHeightMobile,
			lineHeightTablet,
			loadGoogleFonts,
		} = attributes

		let googleFonts

		if( loadGoogleFonts == true ) {

			const hconfig = {
				google: {
					families: [ fontFamily + ( fontWeight ? ":" + fontWeight : "" ) ],
				},
			}

			googleFonts = (
				<WebfontLoader config={ hconfig }>
				</WebfontLoader>
			)
		}

		const labelClass = ( hideLabel ) ? "uagb-icon-list__no-label" : ""

		const sizeTypes = [
			{ key: "px", name: __( "px", 'ultimate-addons-for-gutenberg' ) },
			{ key: "em", name: __( "em", 'ultimate-addons-for-gutenberg' ) },
		]

		const sizeTypeControls = (
			<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", 'ultimate-addons-for-gutenberg' ) }>
				{ map( sizeTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="uagb-size-btn"
						isSmall
						isPrimary={ sizeType === key }
						aria-pressed={ sizeType === key }
						onClick={ () => setAttributes( { sizeType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		)

		const getIconTemplate = memoize( ( icon_block, icons ) => {
			return times( icon_block, n => [ "uagb/icon-list-child", icons[n] ] )
		} )

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right" ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "General", 'ultimate-addons-for-gutenberg' ) } initialOpen={ true }>
						<SelectControl
							label={ __( "Layout", 'ultimate-addons-for-gutenberg' ) }
							value={ icon_layout }
							options={ [
								{ value: "horizontal", label: __( "Horizontal", 'ultimate-addons-for-gutenberg' ) },
								{ value: "vertical", label: __( "Vertical", 'ultimate-addons-for-gutenberg' ) },
							] }
							onChange={ ( value ) => setAttributes( { icon_layout: value } ) }
						/>
						{ "horizontal" == icon_layout &&
							<Fragment>
								<SelectControl
									label={ __( "Stack on" ) }
									value={ stack }
									options={ [
										{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
										{ value: "tablet", label: __( "Tablet", 'ultimate-addons-for-gutenberg' ) },
										{ value: "mobile", label: __( "Mobile", 'ultimate-addons-for-gutenberg' ) },
									] }
									onChange={ ( value ) => setAttributes( { stack: value } ) }
									help={ __( "Note: Choose on what breakpoint the Icons will stack.", 'ultimate-addons-for-gutenberg' ) }
								/>
							</Fragment>
						}
						<ToggleControl
							label={ __( "Hide Labels", 'ultimate-addons-for-gutenberg' ) }
							checked={ hideLabel }
							onChange={ (value) => this.changeChildAttr( value ) }
						/>
						<hr className="uagb-editor__separator" />
						<RangeControl
							label={ __( "Gap between Items", 'ultimate-addons-for-gutenberg' ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							help={ __( "Note: For better editing experience, the gap between items might look larger than applied.  Viewing in frontend will show the actual results.", 'ultimate-addons-for-gutenberg' ) }
							min={ 0 }
							max={ 100 }
						/>
						{ ! hideLabel &&
							<RangeControl
								label={ __( "Gap between Icon and Label", 'ultimate-addons-for-gutenberg' ) }
								value={ inner_gap }
								onChange={ ( value ) => setAttributes( { inner_gap: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						}
						<hr className="uagb-editor__separator" />
						<SelectControl
							label={ __( "Icon Alignment", 'ultimate-addons-for-gutenberg' ) }
							value={ iconPosition }
							options={ [
								{ value: "top", label: __( "Top", 'ultimate-addons-for-gutenberg' ) },
								{ value: "middle", label: __( "Middle", 'ultimate-addons-for-gutenberg' ) },
							] }
							onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
							help={ __( "Note: This manages the Icon Position with respect to the Label.", 'ultimate-addons-for-gutenberg' ) }
						/>
						{ iconPosition == "top" && (
						<RangeControl
							label={ __( "Top Margin", 'ultimate-addons-for-gutenberg' ) }
							value={ topMargin }
							onChange={ ( value ) => setAttributes( { topMargin: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
							initialPosition={0}
						/>
						)}
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
												{sizeTypeControls}
												<RangeControl
													label={ __( "Size", 'ultimate-addons-for-gutenberg' ) }
													value={ sizeMobile }
													onChange={ ( value ) => setAttributes( { sizeMobile: value } ) }
													min={ 0 }
													max={ 500 }
													allowReset
													initialPosition={40}
												/>
											</Fragment>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<Fragment>
												{sizeTypeControls}
												<RangeControl
													label={ __( "Size", 'ultimate-addons-for-gutenberg' ) }
													value={ sizeTablet }
													onChange={ ( value ) => setAttributes( { sizeTablet: value } ) }
													min={ 0 }
													max={ 500 }
													allowReset
													initialPosition={40}
												/>
											</Fragment>
										)
									} else {
										tabout = (
											<Fragment>
												{sizeTypeControls}
												<RangeControl
													label={ __( "Icon Size", 'ultimate-addons-for-gutenberg' ) }
													value={ size }
													onChange={ ( value ) => setAttributes( { size: value } ) }
													min={ 0 }
													max={ 500 }
													allowReset
													initialPosition={40}
												/>
											</Fragment>
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
						<hr className="uagb-editor__separator" />
						<TypographyControl
							label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: loadGoogleFonts, label: 'loadGoogleFonts'  } }
							fontFamily = { { value: fontFamily, label: 'fontFamily'  } }
							fontWeight = { { value: fontWeight, label: 'fontWeight'  } }
							fontSubset = { { value: fontSubset, label: 'fontSubset'  } }
							fontSizeType = { { value: fontSizeType, label: 'fontSizeType' } }
							fontSize = { { value: fontSize, label: 'fontSize'  } }
							fontSizeMobile = { { value: fontSizeMobile, label: 'fontSizeMobile'  } }
							fontSizeTablet= { { value: fontSizeTablet, label: 'fontSizeTablet' } }
							lineHeightType = { { value: lineHeightType, label: 'lineHeightType' } }
							lineHeight = { { value: lineHeight, label: 'lineHeight'  } }
							lineHeightMobile = { { value: lineHeightMobile, label: 'lineHeightMobile'  } }
							lineHeightTablet= { { value: lineHeightTablet, label: 'lineHeightTablet'  } }
						/>
						<hr className="uagb-editor__separator" />
						<RangeControl
							label={ __( "Background Size", 'ultimate-addons-for-gutenberg' ) }
							value={ bgSize }
							onChange={ ( value ) => setAttributes( { bgSize: value } ) }
							help={ __( "Note: Background Size option is useful when one adds background color to the icons.", 'ultimate-addons-for-gutenberg' ) }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ __( "Border", 'ultimate-addons-for-gutenberg' ) }
							value={ border }
							onChange={ ( value ) => setAttributes( { border: value } ) }
							help={ __( "Note: Border option is useful when one adds border color to the icons.", 'ultimate-addons-for-gutenberg' ) }
							min={ 0 }
							max={ 10 }
						/>
						<RangeControl
							label={ __( "Border Radius", 'ultimate-addons-for-gutenberg' ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							help={ __( "Note: Border Radius option is useful when one adds background color to the icons.", 'ultimate-addons-for-gutenberg' ) }
							min={ 0 }
							max={ 500 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-icon-list__outer-wrap",
					`uagb-icon-list__layout-${icon_layout}`,
					( iconPosition == "top" ? "uagb-icon-list__icon-at-top" : "" ),
					labelClass,
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }>
					<div className="uagb-icon-list__wrap">
						<InnerBlocks
							template={ getIconTemplate( icon_count, icons ) }
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
							__experimentalMoverDirection={ icon_layout }
						/>
					</div>
				</div>
				{googleFonts}
			</Fragment>
		)
	}
}

export default UAGBIconList
