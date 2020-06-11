/**
 * BLOCK: Social Share Child - Edit Class
 */

// Import classes
import classnames from "classnames"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "./styling"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	InspectorControls,
	MediaUpload,
	ColorPalette
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	Button,
	TabPanel,
} = wp.components

let svg_icons = Object.keys( UAGBIcon )

class UAGBSocialShareChild extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.onChangeType  = this.onChangeType.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
		this.props.setAttributes( { current_url: wp.data.select("core/editor").getPermalink() } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-social-share-child-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-style-social-share-child-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props
		setAttributes( { image: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {

		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { image: null } )
			return
		}

		if ( ! media.type || "image" != media.type ) {
			return
		}

		setAttributes( { image: media } )
	}

	onChangeType ( type ) {

		const { setAttributes } = this.props

		const icon_mapping = {
			facebook: "fab fa-facebook",
			twitter: "fab fa-twitter-square",
			google: "fab fa-google-plus-square",
			pinterest: "fab fa-pinterest-square",
			linkedin: "fab fa-linkedin",
			digg: "fab fa-digg",
			blogger: "fab fa-blogger",
			reddit: "fab fa-reddit-square",
			stumbleupon: "fab fa-stumbleupon-circle",
			tumblr: "fab fa-tumblr-square",
			myspace: "fas fa-user-friends",
			email: "fas fa-envelope",
		}
		
		setAttributes( { type: type } )

		setAttributes( { icon: icon_mapping[type] } )
	}
	render() {

		const { attributes, setAttributes } = this.props
		const {
			current_url,
			type,
			className,
			image_icon,
			icon,
			image,
			icon_color,
			icon_hover_color,
			icon_bg_color,
			icon_bg_hover_color,
		} = attributes

		const iconColorControls = () => {

			let color_control = ""
			let color_control_hover = ""

			if ( "image" == image_icon ) {

				color_control = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Image Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_color }
							onChange={ ( value ) => setAttributes( { icon_bg_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
				color_control_hover = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Image Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_hover_color }
							onChange={ ( value ) => setAttributes( { icon_bg_hover_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
			} else {

				color_control = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_color }} ></span></span></p>
						<ColorPalette
							value={ icon_color }
							onChange={ ( value ) => setAttributes( { icon_color: value } ) }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Icon Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_color }
							onChange={ ( value ) => setAttributes( { icon_bg_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
				color_control_hover = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Icon Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_hover_color }
							onChange={ ( value ) => setAttributes( { icon_hover_color: value } ) }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Icon Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_hover_color }
							onChange={ ( value ) => setAttributes( { icon_bg_hover_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
			}

			return (
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
							let color_tab
							if( "normal" === tabName.name ) {
								color_tab = color_control
							}else {
								color_tab = color_control_hover
							}
							return <div>{ color_tab }</div>
						}
					}
				</TabPanel>
			)
		}

		const renderHtml = () => {

			let image_icon_html = ""

								if ( image_icon == "icon" ) {
									if ( icon ) {
										image_icon_html = <span className="uagb-ss__source-icon">{ renderSVG(icon) }</span>
									}
								} else {
									if ( image && image.url ) {
										image_icon_html = <img className="uagb-ss__source-image" src={image.url} />
									}
								}

								return (
									<div
										className={ classnames(
											`uagb-ss-repeater`,
											"uagb-ss__wrapper",
											className,
											`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
										) }
									>
										<a className="uagb-ss__link" href="javascript:void(0)" rel ="noopener noreferrer"><span className="uagb-ss__source-wrap">{image_icon_html}</span></a>
									</div>
								)
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "Social Share Settings" ) } initialOpen={ true } >
						<SelectControl
						label={ __( "Type" ) }
						value={ type }
						options={ [
							{ value: "facebook", label: __( "Facebook" ) },
							{ value: "twitter", label: __( "Twitter" ) },
							{ value: "google", label: __( "Google Plus" ) },
							{ value: "pinterest", label: __( "Pinterest" ) },
							{ value: "linkedin", label: __( "LinkedIn" ) },
							{ value: "digg", label: __( "Digg" ) },
							{ value: "blogger", label: __( "Blogger" ) },
							{ value: "reddit", label: __( "Reddit" ) },
							{ value: "stumbleupon", label: __( "StumbleUpon" ) },
							{ value: "tumblr", label: __( "Tumblr" ) },
							{ value: "myspace", label: __( "Myspace" ) },
							{ value: "email", label: __( "Email" ) },
						] }
						onChange={ this.onChangeType }
					/>
						<SelectControl
							label={ __( "Image / Icon" ) }
							value={ image_icon }
							options={ [
								{ value: "icon", label: __( "Icon" ) },
								{ value: "image", label: __( "Image" ) },
							] }
							onChange={ value => setAttributes( { image_icon: value } ) }
						/>
						{ "icon" == image_icon &&
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
						{ "image" == image_icon &&
							<Fragment>
								<MediaUpload
									title={ __( "Select Image" ) }
									onSelect={ ( value ) => setAttributes( { image: value } ) }
									allowedTypes={ [ "image" ] }
									value={ image }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! image ? __( "Select Image" ) : __( "Replace image" ) }
										</Button>
									) }
								/>
								{ image &&
									<Button
										className="uagb-rm-btn"
										onClick={ () => setAttributes( { image: null } ) }
										isLink isDestructive>
										{ __( "Remove Image" ) }
									</Button>
								}
							</Fragment>
						}
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Icon Color Settings" ) }</h2>
						{ iconColorControls() }
					</PanelBody>
				</InspectorControls>
				{renderHtml()}
			</Fragment>
		)
	}
}

export default UAGBSocialShareChild
