
const { __ } = wp.i18n

const { select } = wp.data;

const { Component, Fragment } = wp.element
// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

// Import block dependencies and components.
import classnames from "classnames"

import styling from "./styling"

const {
	PanelBody,
	SelectControl,
} = wp.components

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
} = wp.blockEditor

class UAGBPostTitleEdit extends Component {

	constructor() {
		super( ...arguments )
		this.onTagChange = this.onTagChange.bind( this );
	}
	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
		this.props.setAttributes( { titleText: select("core/editor").getEditedPostAttribute( 'title' ) } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-post-title-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate(prevProps, prevState) {
		
		var element = document.getElementById( "uagb-post-title-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}
	/*
	 * Title Tag Change
	 */
	onTagChange( value ) {
		const { setAttributes } = this.props

		let level_val = parseInt( value.replace( 'h' , '' ) )

		setAttributes( { level: level_val } )
		setAttributes( { titleTag: value } )
	}

	render() {
		// Setup the attributes
		const {
			className,
			attributes,
			setAttributes,
			attributes: {
				block_id,
				titleAlign,
				titleColor,
				titleTag,
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
				titleLoadGoogleFonts,
			},
		} = this.props

		const title = select("core/editor").getEditedPostAttribute( 'title' );
		
		var Tag = titleTag;

		let loadTitleGoogleFonts;

		if( titleLoadGoogleFonts == true ) {
			
			const hconfig = {
				google: {
					families: [ titleFontFamily + ( titleFontWeight ? ':' + titleFontWeight : '' ) ],
				},
			};

			loadTitleGoogleFonts = (
				<WebfontLoader config={ hconfig }>
				</WebfontLoader>
			)
		}
		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ titleAlign }
						onChange={ ( value ) => setAttributes( { titleAlign: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
				<PanelBody title={ __( "Post Title" , 'ultimate-addons-for-gutenberg') }>
						<h2>{ __( "Title", 'ultimate-addons-for-gutenberg' ) }</h2>
					<SelectControl
						label={ __( "Title Tag" , 'ultimate-addons-for-gutenberg') }
						value={ titleTag }
						onChange={ value => {
							this.onTagChange( value )
						} }
						options={ [
							{ value: "h1", label: __( "H1" , 'ultimate-addons-for-gutenberg') },
							{ value: "h2", label: __( "H2" , 'ultimate-addons-for-gutenberg') },
							{ value: "h3", label: __( "H3" , 'ultimate-addons-for-gutenberg') },
							{ value: "h4", label: __( "H4" , 'ultimate-addons-for-gutenberg') },
							{ value: "h5", label: __( "H5" , 'ultimate-addons-for-gutenberg') },
							{ value: "h6", label: __( "H6" , 'ultimate-addons-for-gutenberg') },
						] }
					/>
					<TypographyControl
						label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: titleLoadGoogleFonts, label:__('titleLoadGoogleFonts' , 'ultimate-addons-for-gutenberg')} }
						fontFamily = { { value: titleFontFamily, label:__('titleFontFamily' , 'ultimate-addons-for-gutenberg')} }
						fontWeight = { { value: titleFontWeight, label:__('titleFontWeight' , 'ultimate-addons-for-gutenberg')} }
						fontSubset = { { value: titleFontSubset, label:__('titleFontSubset' , 'ultimate-addons-for-gutenberg')} }
						fontSizeType = { { value: titleFontSizeType, label:__( 'titleFontSizeType', 'ultimate-addons-for-gutenberg')} }
						fontSize = { { value: titleFontSize, label:__('titleFontSize' , 'ultimate-addons-for-gutenberg')} }
						fontSizeMobile = { { value: titleFontSizeMobile, label:__('titleFontSizeMobile' , 'ultimate-addons-for-gutenberg')} }
						fontSizeTablet= { { value: titleFontSizeTablet, label:__('titleFontSizeTablet' , 'ultimate-addons-for-gutenberg')} }
						lineHeightType = { { value: titleLineHeightType, label:__( 'titleLineHeightType', 'ultimate-addons-for-gutenberg')} }
						lineHeight = { { value: titleLineHeight, label:__('titleLineHeight' , 'ultimate-addons-for-gutenberg')} }
						lineHeightMobile = { { value: titleLineHeightMobile, label:__('titleLineHeightMobile' , 'ultimate-addons-for-gutenberg')} }
						lineHeightTablet= { { value: titleLineHeightTablet, label:__('titleLineHeightTablet' , 'ultimate-addons-for-gutenberg')} }
					/>
					<p className="uagb-setting-label">{ __( "Title Color" , 'ultimate-addons-for-gutenberg') }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span></span></p>
						<ColorPalette
							value={ titleColor }
							onChange={ ( value ) => setAttributes( { titleColor: value } ) }
							allowReset
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`uagb-block-${block_id}`,					
					) }
				>
					<div className="uagb-post-title__wrap">
						<Tag className="uagb-post-title__text">
							{ title }
						</Tag>
					</div>
				</div>
				{ loadTitleGoogleFonts }
			</Fragment>
		);
	}
}

export default UAGBPostTitleEdit;

