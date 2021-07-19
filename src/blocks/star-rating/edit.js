/**
 * BLOCK: Star Rating
 */

// Import block dependencies and components.
import classnames from "classnames"
import styling from "./styling"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"
// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"
import { __ } from '@wordpress/i18n';
import {
	BlockAlignmentToolbar,
	InspectorControls,
	RichText,
	ColorPalette,
} from "@wordpress/block-editor"

import {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl
} from "@wordpress/components"

import { withSelect } from  "@wordpress/data"
import { Component, Fragment } from "@wordpress/element"

//  Import CSS.
import "./style.scss"
import "./editor.scss"
class UAGBStarRating extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Pushing Style tag for this block css.
		const style = document.createElement( "style" )
		style.setAttribute( "id", "uagb-star-rating-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( style )
	}

	componentDidUpdate(prevProps, prevState) {
		var element = document.getElementById( "uagb-star-rating-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	render() {

		// Setup the attributes
		const {
			className,
			attributes,
			setAttributes,
			deviceType,
			attributes: {
				rating,
				range,
				layout,
				align,
				size,
				gap,
				unmarkedColor,
				color,
				title,
				loadGoogleFonts,
				fontFamily,
				fontWeight,
				fontSubset,
				fontSizeType,
				fontSize,
				fontSizeMobile,
				fontSizeTablet,
				lineHeightType,
				lineHeight,
				lineHeightMobile,
				lineHeightTablet,
				titleColor,
				titleGap
			},
		} = this.props

		let loadTitleGoogleFonts;

		if( loadGoogleFonts == true ) {
			
			const hconfig = {
				google: {
					families: [ fontFamily + ( fontWeight ? ':' + fontWeight : '' ) ],
				},
			};

			loadTitleGoogleFonts = (
				<WebfontLoader config={ hconfig }>
				</WebfontLoader>
			)
		}

		/**
		 * Generates the markup for Edit.
		 */
		const renderMarkup = () => {
			let range_value = parseInt(range);
			var stars = [];
			for (var i = 1; i <= range_value; i++) {
				stars.push(<span class="uag-star">★</span>);
			}
			return (
				<div
					className={ classnames(
						className,
						`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
						`uag-star-rating__layout-${ layout }`,
						"uag-star-rating__wrapper",
						`uagb-block-${this.props.clientId.substr( 0, 8 )}`,
					) }
				>
					<RichText
						tagName="p"
						placeholder={ __( "Write a title", 'ultimate-addons-for-gutenberg' ) }
						value={ title }
						className='uag-star-rating__title'
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>
					<div class="uag-star-rating" title={`${rating}/${range}`}>
						{ stars }
					</div>
				</div>
			)
		}

		let alignment_options = [ 'left', 'center', 'right', 'full' ];
		if ( 'stack' === layout ) {
			alignment_options = [ 'left', 'center', 'right' ];
			if ( 'full' === align ) {
				setAttributes( {
					align: 'left',
				} )
			}
		}

		/**
		 * Adds all Feneral tab controls.
		 */
		const generalSettings = () => {
			return (
				<PanelBody title={ __( "General", 'ultimate-addons-for-gutenberg' ) }>
					<SelectControl
						label={ __( "Range", 'ultimate-addons-for-gutenberg' ) }
						value={ range }
						onChange={ ( value ) => setAttributes( { range: value } ) }
						options={ [
							{ value: "5", label: __( "1-5", 'ultimate-addons-for-gutenberg' ) },
							{ value: "10", label: __( "1-10", 'ultimate-addons-for-gutenberg' ) },
						] }
					/>
					<RangeControl
						label={ __( "Rating", 'ultimate-addons-for-gutenberg' ) }
						value={ rating }
						onChange={ ( value ) => setAttributes( { rating: value } ) }
						min={ 0 }
						max={ range }
						beforeIcon=""
						allowReset
						step={ 0.1 }
						initialPosition={0}
					/>
					<hr/>
					<BaseControl>
						<SelectControl
							label={ __( "Layout", 'ultimate-addons-for-gutenberg' ) }
							value={ layout }
							onChange={ ( value ) => setAttributes( { layout: value } ) }
							options={ [
								{ value: "inline", label: __( "Inline", 'ultimate-addons-for-gutenberg' ) },
								{ value: "stack", label: __( "Stack", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>
						<BaseControl.VisualLabel>
							{ __( 'Alignment', 'ultimate-addons-for-gutenberg' ) }
						</BaseControl.VisualLabel>
						<BlockAlignmentToolbar
							value={ align }
							onChange={ ( value ) =>
								setAttributes( {
									align: value,
								} )
							}
							controls={ alignment_options }
							isCollapsed={ false }
						/>
					</BaseControl>
					<RangeControl
						label={ __( "Size", 'ultimate-addons-for-gutenberg' ) }
						value={ size }
						onChange={ ( value ) => setAttributes( { size: value } ) }
						min={ 0 }
						max={ 100 }
						beforeIcon=""
						allowReset
						initialPosition={0}
					/>
					<RangeControl
						label={ __( "Spacing", 'ultimate-addons-for-gutenberg' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon=""
						allowReset
						initialPosition={0}
					/>
				</PanelBody>
			)
		}

		/**
		 * Adds all Design tab controls.
		 */
		const designSettings = () => {
			return (
				<PanelBody title={ __( "Design", 'ultimate-addons-for-gutenberg' ) } initialOpen={false}>
					<h3>{ __( "Star", 'ultimate-addons-for-gutenberg' ) }</h3>
					<p className="uagb-setting-label">{ __( "Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: color }} ></span></span></p>
					<ColorPalette
						value={ color }
						onChange={ ( value ) => setAttributes( { color: value } ) }
						allowReset
					/>
					<p className="uagb-setting-label">{ __( "Unmarked Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: unmarkedColor }} ></span></span></p>
					<ColorPalette
						value={ unmarkedColor }
						onChange={ ( value ) => setAttributes( { unmarkedColor: value } ) }
						allowReset
					/>
					<hr/>
					{ '' !== title &&
						<Fragment>
							<h3>{ __( "Title", 'ultimate-addons-for-gutenberg' ) }</h3>
							<TypographyControl
								label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
								attributes = { attributes }
								setAttributes = { setAttributes }
								loadGoogleFonts = { { value: loadGoogleFonts, label:'loadGoogleFonts'  } }
								fontFamily = { { value: fontFamily, label:'fontFamily'  } }
								fontWeight = { { value: fontWeight, label:'fontWeight'  } }
								fontSubset = { { value: fontSubset, label:'fontSubset'  } }
								fontSizeType = { { value: fontSizeType, label: 'fontSizeType' } }
								fontSize = { { value: fontSize, label:'fontSize'  } }
								fontSizeMobile = { { value: fontSizeMobile, label:'fontSizeMobile'  } }
								fontSizeTablet= { { value: fontSizeTablet, label:'fontSizeTablet'  } }
								lineHeightType = { { value: lineHeightType, label: 'lineHeightType' } }
								lineHeight = { { value: lineHeight, label:'lineHeight'  } }
								lineHeightMobile = { { value: lineHeightMobile, label:'lineHeightMobile'  } }
								lineHeightTablet= { { value: lineHeightTablet, label:'lineHeightTablet'  } }
							/>
							<p className="uagb-setting-label">{ __( "Title Color", 'ultimate-addons-for-gutenberg' ) }
								<span  className="components-base-control__label">
									<span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span>
								</span>
							</p>
							<ColorPalette
								value={ titleColor }
								onChange={ ( value ) => setAttributes( { titleColor: value } ) }
								allowReset
							/>
							<RangeControl
								label={ __( "Title Gap", 'ultimate-addons-for-gutenberg' ) }
								value={ titleGap }
								onChange={ ( value ) => setAttributes( { titleGap: value } ) }
								min={ 0 }
								max={ 50 }
								beforeIcon=""
								allowReset
								initialPosition={0}
							/>
						</Fragment>
					}
				</PanelBody>
			)
		}

		return (
			<Fragment>
				<InspectorControls>
					{ generalSettings() }
					{ designSettings() }
				</InspectorControls>
				{ renderMarkup() }
				{ loadTitleGoogleFonts }
			</Fragment>
		)
	}
}

export default withSelect( ( select, props ) => {
	const { __experimentalGetPreviewDeviceType = null } = select( 'core/edit-post' );
	let deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType: deviceType
	}
} )( UAGBStarRating )
