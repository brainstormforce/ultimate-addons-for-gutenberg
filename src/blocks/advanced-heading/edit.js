/**
 * BLOCK: Advanced Heading
 */

// Import block dependencies and components.
import classnames from "classnames"
import styling from "./styling"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"


//  Import CSS.
import "./style.scss"

const { __ } = wp.i18n

const {
	createBlock
} = wp.blocks

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	ButtonGroup,
	Button,
} = wp.components

const { withSelect } = wp.data

const { Component, Fragment } = wp.element

class UAGBAdvancedHeading extends Component {

	constructor() {
		super( ...arguments )

		this.splitBlock = this.splitBlock.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Assigning block_id in the attribute.
		this.props.setAttributes( { classMigrate: true } )

		let level_val = parseInt( this.props.attributes.headingTag.replace( 'h' , '' ) )
		this.props.setAttributes( { level: level_val } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-adv-heading-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate(prevProps, prevState) {
		var element = document.getElementById( "uagb-adv-heading-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	/*
	 * Heading Tag Change
	 */
	onTagChange( value ) {
		const { setAttributes } = this.props

		let level_val = parseInt( value.replace( 'h' , '' ) )

		setAttributes( { level: level_val } )
		setAttributes( { headingTag: value } )
	}

	splitBlock( before, after, ...blocks ) {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = this.props

		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( "core/paragraph", { content: after } ) )
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks )
		}

		const { content } = attributes
		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] )
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } )
		}
	}

	render() {

		// Setup the attributes
		const {
			className,
			attributes,
			setAttributes,
			insertBlocksAfter,
			mergeBlocks,
			onReplace,
			attributes: {
				headingTitle,
				headingDesc,
				headingAlign,
				headingColor,
				subHeadingColor,
				separatorColor,
				headingTag,
				headFontFamily,
				headFontWeight,
				headFontSubset,
				headFontSizeType,
				headFontSize,
				headFontSizeMobile,
				headFontSizeTablet,
				headLineHeightType,
				headLineHeight,
				headLineHeightMobile,
				headLineHeightTablet,
				subHeadFontFamily,
				subHeadFontWeight,
				subHeadFontSubset,
				subHeadFontSize,
				subHeadFontSizeType,
				subHeadFontSizeMobile,
				subHeadFontSizeTablet,
				subHeadLineHeight,
				subHeadLineHeightType,
				subHeadLineHeightMobile,
				subHeadLineHeightTablet,
				separatorWidth,
				separatorWidthType,
				seperatorStyle,
				separatorHeight,
				headSpace,
				separatorSpace,
				headLoadGoogleFonts,
				subHeadLoadGoogleFonts,
			},
		} = this.props

		let loadHeadingGoogleFonts;
		let loadSubHeadingGoogleFonts;

		if( headLoadGoogleFonts == true ) {
			
			const hconfig = {
				google: {
					families: [ headFontFamily + ( headFontWeight ? ':' + headFontWeight : '' ) ],
				},
			};

			loadHeadingGoogleFonts = (
				<WebfontLoader config={ hconfig }>
				</WebfontLoader>
			)
		}

		if( subHeadLoadGoogleFonts == true ) {

			const sconfig = {
				google: {
					families: [ subHeadFontFamily + ( subHeadFontWeight ? ':' + subHeadFontWeight : '' ) ],
				},
			};

			loadSubHeadingGoogleFonts = (
				<WebfontLoader config={ sconfig }>
				</WebfontLoader>
			)
		}

		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "Advanced Heading" ) }>
						<h2>{ __( "Heading" ) }</h2>
						<SelectControl
							label={ __( "Heading Tag" ) }
							value={ headingTag }
							onChange={ value => {
								this.onTagChange( value )
							} }
							options={ [
								{ value: "h1", label: __( "H1" ) },
								{ value: "h2", label: __( "H2" ) },
								{ value: "h3", label: __( "H3" ) },
								{ value: "h4", label: __( "H4" ) },
								{ value: "h5", label: __( "H5" ) },
								{ value: "h6", label: __( "H6" ) },
							] }
						/>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: headLoadGoogleFonts, label:'headLoadGoogleFonts'  } }
							fontFamily = { { value: headFontFamily, label:'headFontFamily'  } }
							fontWeight = { { value: headFontWeight, label:'headFontWeight'  } }
							fontSubset = { { value: headFontSubset, label:'headFontSubset'  } }
							fontSizeType = { { value: headFontSizeType, label: 'headFontSizeType' } }
							fontSize = { { value: headFontSize, label:'headFontSize'  } }
							fontSizeMobile = { { value: headFontSizeMobile, label:'headFontSizeMobile'  } }
							fontSizeTablet= { { value: headFontSizeTablet, label:'headFontSizeTablet'  } }
							lineHeightType = { { value: headLineHeightType, label: 'headLineHeightType' } }
							lineHeight = { { value: headLineHeight, label:'headLineHeight'  } }
							lineHeightMobile = { { value: headLineHeightMobile, label:'headLineHeightMobile'  } }
							lineHeightTablet= { { value: headLineHeightTablet, label:'headLineHeightTablet'  } }
						/>
						<p className="uagb-setting-label">{ __( "Heading Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: headingColor }} ></span></span></p>
						<ColorPalette
							value={ headingColor }
							onChange={ ( value ) => setAttributes( { headingColor: value } ) }
							allowReset
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Sub-Heading" ) }</h2>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: subHeadLoadGoogleFonts, label:'subHeadLoadGoogleFonts' } }
							fontFamily = { { value: subHeadFontFamily, label:'subHeadFontFamily' } }
							fontWeight = { { value: subHeadFontWeight, label:'subHeadFontWeight' } }
							fontSubset = { { value: subHeadFontSubset, label:'subHeadFontSubset' } }
							fontSizeType = { { value: subHeadFontSizeType, label:'subHeadFontSizeType'  } }
							fontSize = { { value: subHeadFontSize, label:'subHeadFontSize' } }
							fontSizeMobile = { { value: subHeadFontSizeMobile, label:'subHeadFontSizeMobile' } }
							fontSizeTablet= { { value: subHeadFontSizeTablet, label:'subHeadFontSizeTablet' } }
							lineHeightType = { { value: subHeadLineHeightType, label:'subHeadLineHeightType'  } }
							lineHeight = { { value: subHeadLineHeight, label:'subHeadLineHeight' } }
							lineHeightMobile = { { value: subHeadLineHeightMobile, label:'subHeadLineHeightMobile' } }
							lineHeightTablet= { { value: subHeadLineHeightTablet, label:'subHeadLineHeightTablet' } }
						/>
						<p className="uagb-setting-label">{ __( "Sub Heading Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: subHeadingColor }} ></span></span></p>
						<ColorPalette
							value={ subHeadingColor }
							onChange={ ( value ) => setAttributes( { subHeadingColor: value } ) }
							allowReset
						/>
					</PanelBody>
					<PanelBody title={ __( "Separator" ) } initialOpen={ false }>
						<SelectControl
							label={ __( "Style" ) }
							value={ seperatorStyle }
							onChange={ ( value ) => setAttributes( { seperatorStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "solid", label: __( "Solid" ) },
								{ value: "double", label: __( "Double" ) },
								{ value: "dashed", label: __( "Dashed" ) },
								{ value: "dotted", label: __( "Dotted" ) },
							] }
						/>
						{ seperatorStyle !== "none" && <Fragment>
							<RangeControl
								label={ __( "Thickness (px)" ) }
								value={ separatorHeight }
								onChange={ ( value ) => setAttributes( { separatorHeight: value } ) }
								min={ 0 }
								max={ 20 }
								beforeIcon=""
								allowReset
								initialPosition={3}
							/>
							<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
								<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ separatorWidthType === "px" } aria-pressed={ separatorWidthType === "px" } onClick={ () => setAttributes( { separatorWidthType: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ separatorWidthType === "%" } aria-pressed={ separatorWidthType === "%" } onClick={ () => setAttributes( { separatorWidthType: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<RangeControl
								label={ __( "Width" ) }
								value={ separatorWidth }
								onChange={ ( value ) => setAttributes( { separatorWidth: value } ) }
								min={ 0 }
								max={ ( "%" == separatorWidthType ) ? 100 : 500 }
								beforeIcon=""
								allowReset
								initialPosition={20}
							/>
							{ seperatorStyle !== "none" && <Fragment>
								<p className="uagb-setting-label">{ __( "Separator Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: separatorColor }} ></span></span></p>
								<ColorPalette
									value={ separatorColor }
									onChange={ ( colorValue ) => setAttributes( { separatorColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
							}
						</Fragment>
						}
					</PanelBody>
					<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
						<RangeControl
							label={ __( "Heading Bottom Spacing (px)" ) }
							value={ headSpace }
							onChange={ ( value ) => setAttributes( { headSpace: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
							initialPosition={0}
						/>
						{ seperatorStyle !== "none" && <RangeControl
							label={ __( "Separator Bottom Spacing (px)" ) }
							value={ separatorSpace }
							onChange={ ( value ) => setAttributes( { separatorSpace: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
							initialPosition={0}
						/>
						}
					</PanelBody>
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`uagb-block-${this.props.clientId.substr( 0, 8 )}`,					
					) }
				>
					<RichText
						tagName={ headingTag }
						placeholder={ __( "Write a Heading" ) }
						value={ headingTitle }
						className='uagb-heading-text'
						multiline={ false }
						onChange={ ( value ) => {
							setAttributes( { headingTitle: value } ) }
						}
						onMerge={ mergeBlocks }
						unstableOnSplit={
							insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } )
									insertBlocksAfter( [
										...blocks,
										createBlock( "core/paragraph", { content: after } ),
									] )
								} :
								undefined
						}
						onRemove={ () => onReplace( [] ) }
					/>
					{ seperatorStyle !== "none" && <div className="uagb-separator-wrap" ><div className="uagb-separator"></div></div> }
					<RichText
						tagName="p"
						placeholder={ __( "Write a Description" ) }
						value={ headingDesc }
						className='uagb-desc-text'
						onChange={ ( value ) => setAttributes( { headingDesc: value } ) }
						onMerge={ mergeBlocks }
						unstableOnSplit={ this.splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				</div>
				{ loadHeadingGoogleFonts }
				{ loadSubHeadingGoogleFonts }

			</Fragment>
		)
	}
}

export default withSelect( ( select, props ) => {
	const { attributes } = props
	return {
		anchor: attributes.headingId
	}
} )( UAGBAdvancedHeading )
