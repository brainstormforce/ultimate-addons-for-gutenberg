/**
 * External dependencies
 */
import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import styling from "./styling"
const { select } = wp.data;
const { Component, Fragment } = wp.element
const { __ } = wp.i18n

const {
	PanelBody,
	RangeControl,
	SelectControl,
} = wp.components

const {
	InspectorControls,
	ColorPalette,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blockEditor

class UAGB_FSE_FeaturedImage extends Component {
	
	constructor() {
		super( ...arguments )
	}
	componentDidMount() {
		const { setAttributes } = this.props
		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		setAttributes( { classMigrate: true } )
		
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-post-featured-img-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )

	}
	componentDidUpdate( ) {
		const { attributes, setAttributes } = this.props
		var current_post = select("core/editor").getCurrentPost();
		if (
			undefined !== current_post.uagb_featured_image_src &&
			attributes.imgSize &&
			current_post.uagb_featured_image_src[attributes.imgSize]
		) {
			var path = current_post.uagb_featured_image_src[attributes.imgSize];
			setAttributes( { src: path[0] } );
		}else{
			setAttributes( { src: '#' } );
		}
		var element = document.getElementById( "uagb-style-post-featured-img-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}
	render() {

		const {
			attributes,
			setAttributes
		} = this.props

		const {
			block_id,
			src,
			imgSize,
			vPadding,
			hPadding,
			borderStyle,
			borderWidth ,
			borderRadius,
			borderColor,
			vMargin,
			hMargin,
			backgroundColor,
			align
		} = attributes

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( "Image" , 'ultimate-addons-for-gutenberg') } initialOpen={ false }>
					<SelectControl
						label={ __( "Image Sizes", 'ultimate-addons-for-gutenberg' ) }
						value={ imgSize }
						onChange={ ( value ) => setAttributes( { imgSize: value } ) }
						options={ uagb_blocks_info.image_sizes }
					/>
					<p className="uagb-setting-label">{ __( "Background Color", 'ultimate-addons-for-gutenberg' ) }</p>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
							allowReset
						/>
				</PanelBody>
				<PanelBody title={ __( "Spacing" , 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
					<h2>{ __( "Padding (px)" , 'ultimate-addons-for-gutenberg' ) }</h2>
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
					
					<h2>{ __( "Margin", 'ultimate-addons-for-gutenberg' ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ "uagb-margin-control" }
						value={ vMargin }
						onChange={ ( value ) => setAttributes( { vMargin: value } ) }
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ "uagb-margin-control" }
						value={ hMargin }
						onChange={ ( value ) => setAttributes( { hMargin: value } ) }
						min={ 0 }
						max={ 100 }
						allowReset
					/>
				</PanelBody>	
				<PanelBody title={ __( "Border" , 'ultimate-addons-for-gutenberg') } initialOpen={ false }>
					<SelectControl
						label={ __( "Border Style" , 'ultimate-addons-for-gutenberg') }
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
					{ "none" != borderStyle &&
							<Fragment>
								<RangeControl
									label={ __( "Border Width" , 'ultimate-addons-for-gutenberg' ) }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<Fragment>
									<p className="uagb-setting-label">{ __( "Border Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
									<ColorPalette
										value={ borderColor }
										onChange={ ( value ) => setAttributes( { borderColor: value } ) }
										allowReset
									/>
								</Fragment>
							</Fragment>
					}
					<RangeControl
						label={ __( "Border Radius" , 'ultimate-addons-for-gutenberg' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 100 }
						allowReset
					/>
				</PanelBody>
			</InspectorControls>
		)
		
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
				{ inspectorControls }
				{ '#' === src && 
					<div className={ classnames(
						`uagb-block-${ block_id }`,
						"uagb-fse-featured-image__wrap",
						) }>
						{__('This page does not have featured image. Please add Featured Image to display.', 'ultimate-addons-for-gutenberg')}
					</div>
				}	
				{ '#' !== src && 				
					<div className={ classnames(
						`uagb-block-${ block_id }`,
						"uagb-fse-featured-image__wrap",
						) }>
						<img src={ src }/>
					</div>
				}
			</Fragment>	
		)
	}
}

export default UAGB_FSE_FeaturedImage;