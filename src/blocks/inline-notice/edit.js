/**
 * Inline Notice Block.
 */

// Import block dependencies and components
import classnames from 'classnames';
import styling from "./styling"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

// Setup the block

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} = wp.components

const {
	Component,
	Fragment,
} = wp.element

let svg_icons = Object.keys( UAGBIcon )

class UAGBInlineNoticeEdit extends Component {

	constructor() {

		super( ...arguments )
		this.update_cookie_id = this.update_cookie_id.bind(this)
	}

	update_cookie_id( value ) {
		const { getCurrentPostId } = wp.data.select("core/editor");
		const post_id = getCurrentPostId().toString();
		const timestamp = new Date().getTime();

		this.props.setAttributes( { c_id: post_id + '-' + timestamp } )
		this.props.setAttributes( { cookies: value } )
	}

	componentDidMount() {
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-inline-notice-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-inline-notice-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				block_id,
				icon,
				noticeTitle,
				noticeContent,
				noticeDismiss,
				cookies,
				close_cookie_days,
				textColor,
				titleColor,
				noticeColor,
				contentBgColor,
				noticeDismissColor,
				noticeAlignment,
				titleFontFamily,
				titleFontWeight,
				titleFontSubset,
				titleFontSizeType,
				titleLineHeightType,
				titleFontSize,
				titleFontSizeTablet,
				titleFontSizeMobile,
				titleLineHeight,
				titleLineHeightTablet,
				titleLineHeightMobile,
				descFontFamily,
				descFontWeight,
				descFontSubset,
				descFontSize,
				descFontSizeType,
				descFontSizeTablet,
				descFontSizeMobile,
				descLineHeight,
				descLineHeightType,
				descLineHeightTablet,
				descLineHeightMobile,
				titleLoadGoogleFonts,
				descLoadGoogleFonts,
				contentVrPadding,
				contentHrPadding,
				titleVrPadding,
				titleHrPadding,
			},
			setAttributes,
			className,
			attributes,
		} = this.props;

	   	// Notice dismiss options
		const noticeDismissOptions = [
			{ value: '', label: __( 'Allow Always' ) },
			{
				value: 'uagb-dismissable',
				label: __( 'Allow to Dismiss' ),
			},
		];

		let loadTitleGoogleFonts;
		let loadDescriptionGoogleFonts;


		if( true === titleLoadGoogleFonts ) {
			
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

		if( true === descLoadGoogleFonts ) {

			const sconfig = {
				google: {
					families: [ descFontFamily + ( descFontWeight ? ':' + descFontWeight : '' ) ],
				},
			};

			loadDescriptionGoogleFonts = (
				<WebfontLoader config={ sconfig }>
				</WebfontLoader>
			)
		}

		let image_icon_html = ''

		if ( noticeDismiss ) {
			image_icon_html = <span className="uagb-notice-dismiss">{ renderSVG(icon) }</span>
		}

		const inlineGeneralSettings = () => {
			return (
				<PanelBody title={ __( "General" ) } initialOpen={ true }>
					<SelectControl
							label={ __( 'Notice Display' ) }
							options={ noticeDismissOptions }
							value={ noticeDismiss }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									noticeDismiss: value,
								} )
							}
					/>
					{ noticeDismiss &&
						<Fragment>
							<p className="components-base-control__label">{__( "Icon" )}</p>
							<FontIconPicker
								icons={svg_icons}
								renderFunc= {renderSVG}
								theme="default"
								value={icon}
								onChange={ ( value ) => setAttributes( { icon: value } ) }
								isMulti={false}
								noSelectedPlaceholder= { __( "Select Icon" ) }
							/>
						</Fragment>
					}
					{ noticeDismiss &&
						<hr className="uagb-editor__separator" />
					}
					{ noticeDismiss &&
						<ToggleControl
							label={ __( "Enable Cookies" ) }
							checked={ cookies }
							onChange={ this.update_cookie_id }
						/>
					}
					{ cookies &&
						<RangeControl
							label={ __( "Show Closed Notice After (Days)" ) }
							value={ close_cookie_days }
							onChange={ ( value ) => setAttributes( { close_cookie_days: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
					}
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Colors" ) }</h2>
					<p className="uagb-setting-label">{ __( "Title Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span></span></p>
					<ColorPalette
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Highlight Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: noticeColor }} ></span></span></p>
						<ColorPalette
							value={ noticeColor }
							onChange={ ( value ) => setAttributes( { noticeColor: value } ) }
							allowReset
					/>
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Content Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: textColor }} ></span></span></p>
					<ColorPalette
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<p className="uagb-setting-label">{ __( "Content Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: contentBgColor }} ></span></span></p>
						<ColorPalette
							value={ contentBgColor }
							onChange={ ( value ) => setAttributes( { contentBgColor: value } ) }
							allowReset
					/>
					{ noticeDismiss &&
					<hr className="uagb-editor__separator" />
					}
					{ noticeDismiss &&
					<p className="uagb-setting-label">{ __( "Dismiss Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: noticeDismissColor }} ></span></span></p>
					}
					{ noticeDismiss &&
					<ColorPalette
						value={ noticeDismissColor }
						onChange={ ( value ) => setAttributes( { noticeDismissColor: value } ) }
						allowReset
					/>
					}
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Typography" ) }</h2>
						<TypographyControl
							label={ __( "Title" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: titleLoadGoogleFonts, label: 'titleLoadGoogleFonts' } }
							fontFamily = { { value: titleFontFamily, label: 'titleFontFamily' } }
							fontWeight = { { value: titleFontWeight, label: 'titleFontWeight' } }
							fontSubset = { { value: titleFontSubset, label: 'titleFontSubset' } }
							fontSizeType = { { value: titleFontSizeType, label: 'titleFontSizeType' } }
							fontSize = { { value: titleFontSize, label: 'titleFontSize' } }
							fontSizeMobile = { { value: titleFontSizeMobile, label: 'titleFontSizeMobile' } }
							fontSizeTablet= { { value: titleFontSizeTablet, label: 'titleFontSizeTablet' } }
							lineHeightType = { { value: titleLineHeightType, label: 'titleLineHeightType' } }
							lineHeight = { { value: titleLineHeight, label: 'titleLineHeight' } }
							lineHeightMobile = { { value: titleLineHeightMobile, label: 'titleLineHeightMobile' } }
							lineHeightTablet= { { value: titleLineHeightTablet, label: 'titleLineHeightTablet' } }
						/>
						<TypographyControl
							label={ __( "Content" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: descLoadGoogleFonts, label: 'descLoadGoogleFonts' } }
							fontFamily = { { value: descFontFamily, label: 'descFontFamily' } }
							fontWeight = { { value: descFontWeight, label: 'descFontWeight' } }
							fontSubset = { { value: descFontSubset, label: 'descFontSubset' } }
							fontSizeType = { { value: descFontSizeType, label: 'descFontSizeType' } }
							fontSize = { { value: descFontSize, label: 'descFontSize' } }
							fontSizeMobile = { { value: descFontSizeMobile, label: 'descFontSizeMobile' } }
							fontSizeTablet= { { value: descFontSizeTablet, label: 'descFontSizeTablet' } }
							lineHeightType = { { value: descLineHeightType, label: 'descLineHeightType' } }
							lineHeight = { { value: descLineHeight, label: 'descLineHeight' } }
							lineHeightMobile = { { value: descLineHeightMobile, label: 'descLineHeightMobile' } }
							lineHeightTablet= { { value: descLineHeightTablet, label: 'descLineHeightTablet' } }
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Title Padding (px)" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ "uagb-margin-control" }
							value={ titleVrPadding }
							onChange={ ( value ) => setAttributes( { titleVrPadding: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ "uagb-margin-control" }
							value={ titleHrPadding }
							onChange={ ( value ) => setAttributes( { titleHrPadding: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Content Padding (px)" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ "uagb-margin-control" }
							value={ contentVrPadding }
							onChange={ ( value ) => setAttributes( { contentVrPadding: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ "uagb-margin-control" }
							value={ contentHrPadding }
							onChange={ ( value ) => setAttributes( { contentHrPadding: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
				</PanelBody>
			)
		}
		
		return (
			<Fragment>
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ noticeAlignment }
						onChange={ ( value ) =>
							setAttributes( { noticeAlignment: value } )
						}
					/>
				</BlockControls>
				<InspectorControls>
					{ inlineGeneralSettings() }
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-inline_notice__outer-wrap",
					`${ noticeDismiss }`,
					`uagb-inline_notice__align-${ noticeAlignment }`,
					`uagb-block-${ block_id }`
					) }
				>
					{ image_icon_html }
					<RichText
						tagName="h4"
						placeholder={ __( 'Notice Title', 'ultimate-addons-for-gutenberg' ) }
						keepPlaceholderOnFocus
						value={ noticeTitle }
						className='uagb-notice-title'
						onChange={ ( value ) =>
							setAttributes( { noticeTitle: value } )
						}
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( 'Add notice text...', 'ultimate-addons-for-gutenberg' ) }
						value={ noticeContent }
						className='uagb-notice-text'
						onChange={ ( value ) =>
							setAttributes( { noticeContent: value } )
						}
					/>
				</div>
				{ loadTitleGoogleFonts }
				{ loadDescriptionGoogleFonts }
			</Fragment>
		)
	}
}

export default UAGBInlineNoticeEdit