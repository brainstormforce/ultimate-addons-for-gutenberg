/**
 * BLOCK: Social Share Child - Edit Class
 */

// Import classes
import classnames from "classnames";
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import styling from "./styling";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";

const { __ } = wp.i18n;

const {
	Component,
	Fragment,
} = wp.element;

const {
	InspectorControls,
	MediaUpload,
	ColorPalette
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	Button,
	TabPanel,
} = wp.components;

const svg_icons = Object.keys( UAGBIcon );

class UAGBSocialShareChild extends Component {

	constructor() {
		super( ...arguments );

		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
		this.onChangeType  = this.onChangeType.bind( this );
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		this.props.setAttributes( { current_url: wp.data.select( "core/editor" ).getPermalink() } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-social-share-child-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps ) {
		const element = document.getElementById( "uagb-style-social-share-child-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props;
		setAttributes( { image: null } );
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {

		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { image: null } );
			return;
		}

		if ( ! media.type || "image" != media.type ) {
			return;
		}

		setAttributes( { image: media } );
	}

	onChangeType ( type ) {

		const { setAttributes } = this.props;

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
			pocket: "fab fa-get-pocket",
			vk: "fab fa-vk",
			odnoklassniki:"fab fa-odnoklassniki",
			skype: "fab fa-skype",
			telegram:"fab fa-telegram",
			whatsapp:"fab fa-whatsapp",
			xing:"fab fa-xing",
			buffer:"fab fa-buffer",
		};
		
		setAttributes( { type } );

		setAttributes( { icon: icon_mapping[type] } );
	}
	render() {

		const { attributes, setAttributes } = this.props;
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
		} = attributes;

		const iconColorControls = () => {

			let color_control = "";
			let color_control_hover = "";

			if ( "image" == image_icon ) {

				color_control = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Image Background Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: icon_bg_color } } ></span></span></p>
						<ColorPalette
							value={ icon_bg_color }
							onChange={ ( value ) => setAttributes( { icon_bg_color: value } ) }
							allowReset
						/>
					</Fragment>
				);
				color_control_hover = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Image Background Hover Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: icon_bg_hover_color } } ></span></span></p>
						<ColorPalette
							value={ icon_bg_hover_color }
							onChange={ ( value ) => setAttributes( { icon_bg_hover_color: value } ) }
							allowReset
						/>
					</Fragment>
				);
			} else {

				color_control = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: icon_color } } ></span></span></p>
						<ColorPalette
							value={ icon_color }
							onChange={ ( value ) => setAttributes( { icon_color: value } ) }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Icon Background Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: icon_bg_color } } ></span></span></p>
						<ColorPalette
							value={ icon_bg_color }
							onChange={ ( value ) => setAttributes( { icon_bg_color: value } ) }
							allowReset
						/>
					</Fragment>
				);
				color_control_hover = (
					<Fragment>
						<p className="uagb-setting-label">{ __( "Icon Hover Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: icon_hover_color } } ></span></span></p>
						<ColorPalette
							value={ icon_hover_color }
							onChange={ ( value ) => setAttributes( { icon_hover_color: value } ) }
							allowReset
						/>
						<p className="uagb-setting-label">{ __( "Icon Background Hover Color","ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ { backgroundColor: icon_bg_hover_color } } ></span></span></p>
						<ColorPalette
							value={ icon_bg_hover_color }
							onChange={ ( value ) => setAttributes( { icon_bg_hover_color: value } ) }
							allowReset
						/>
					</Fragment>
				);
			}

			return (
				<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal","ultimate-addons-for-gutenberg" ),
							className: "uagb-normal-tab",
						},
						{
							name: "hover",
							title: __( "Hover","ultimate-addons-for-gutenberg" ),
							className: "uagb-hover-tab",
						},
					] }>
					{
						( tabName ) => {
							let color_tab;
							if ( "normal" === tabName.name ) {
								color_tab = color_control;
							} else {
								color_tab = color_control_hover;
							}
							return <div>{ color_tab }</div>;
						}
					}
				</TabPanel>
			);
		};

		const renderHtml = () => {

			let image_icon_html = "";

			if ( image_icon == "icon" ) {
				if ( icon ) {
					image_icon_html = <span className="uagb-ss__source-icon">{ renderSVG( icon ) }</span>;
				}
			} else if ( image && image.url ) {
				image_icon_html = <img className="uagb-ss__source-image" src={ image.url } />;
			}

			return (
				<div
					className={ classnames(
						"uagb-ss-repeater",
						"uagb-ss__wrapper",
						className,
						`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }
				>
					<a className="uagb-ss__link" href="#" rel="noopener noreferrer"><span className="uagb-ss__source-wrap">{ image_icon_html }</span></a>
				</div>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "Social Share Settings","ultimate-addons-for-gutenberg" ) } initialOpen={ true } >
						<SelectControl
							label={ __( "Type" ) }
							value={ type }
							options={ [
								{ value: "facebook", label: __( "Facebook","ultimate-addons-for-gutenberg" ) },
								{ value: "twitter", label: __( "Twitter","ultimate-addons-for-gutenberg" ) },
								{ value: "google", label: __( "Google Currents","ultimate-addons-for-gutenberg" ) },
								{ value: "pinterest", label: __( "Pinterest","ultimate-addons-for-gutenberg" ) },
								{ value: "linkedin", label: __( "LinkedIn","ultimate-addons-for-gutenberg" ) },
								{ value: "digg", label: __( "Digg","ultimate-addons-for-gutenberg" ) },
								{ value: "blogger", label: __( "Blogger","ultimate-addons-for-gutenberg" ) },
								{ value: "reddit", label: __( "Reddit","ultimate-addons-for-gutenberg" ) },
								{ value: "stumbleupon", label: __( "StumbleUpon","ultimate-addons-for-gutenberg" ) },
								{ value: "tumblr", label: __( "Tumblr","ultimate-addons-for-gutenberg" ) },
								{ value: "myspace", label: __( "Myspace","ultimate-addons-for-gutenberg" ) },
								{ value: "email", label: __( "Email","ultimate-addons-for-gutenberg" ) },
								{ value: "pocket", label: __( "Pocket","ultimate-addons-for-gutenberg" ) },
								{ value: "vk", label: __( "VK","ultimate-addons-for-gutenberg" ) },
								{ value: "odnoklassniki", label: __( "Odnoklassniki","ultimate-addons-for-gutenberg" ) },
								{ value: "skype", label: __( "Skype","ultimate-addons-for-gutenberg" ) },
								{ value: "telegram", label: __( "Telegram","ultimate-addons-for-gutenberg" ) },
								{ value: "whatsapp", label: __( "WhatsApp","ultimate-addons-for-gutenberg" ) },
								{ value: "xing", label: __( "Xing","ultimate-addons-for-gutenberg" ) },
								{ value: "buffer", label: __( "Buffer","ultimate-addons-for-gutenberg" ) },
							] }
							onChange={ this.onChangeType }
						/>
						<SelectControl
							label={ __( "Image / Icon","ultimate-addons-for-gutenberg" ) }
							value={ image_icon }
							options={ [
								{ value: "icon", label: __( "Icon","ultimate-addons-for-gutenberg" ) },
								{ value: "image", label: __( "Image","ultimate-addons-for-gutenberg" ) },
							] }
							onChange={ value => setAttributes( { image_icon: value } ) }
						/>
						{ "icon" == image_icon &&
							<Fragment>
								<p className="components-base-control__label">{ __( "Icon","ultimate-addons-for-gutenberg" ) }</p>
								<FontIconPicker
									icons={ svg_icons }
									renderFunc={ renderSVG }
									theme="default"
									value={ icon }
									onChange={ ( value ) => setAttributes( { icon: value } ) }
									isMulti={ false }
									noSelectedPlaceholder={ __( "Select Icon","ultimate-addons-for-gutenberg" ) }
								/>
							</Fragment>
						}
						{ "image" == image_icon &&
							<Fragment>
								<MediaUpload
									title={ __( "Select Image","ultimate-addons-for-gutenberg" ) }
									onSelect={ ( value ) => setAttributes( { image: value } ) }
									allowedTypes={ [ "image" ] }
									value={ image }
									render={ ( { open } ) => (
										<Button isSecondary onClick={ open }>
											{ ! image ? __( "Select Image","ultimate-addons-for-gutenberg" ) : __( "Replace image","ultimate-addons-for-gutenberg" ) }
										</Button>
									) }
								/>
								{ image &&
									<Button
										className="uagb-rm-btn"
										onClick={ () => setAttributes( { image: null } ) }
										isLink isDestructive>
										{ __( "Remove Image","ultimate-addons-for-gutenberg" ) }
									</Button>
								}
							</Fragment>
						}
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Icon Color Settings","ultimate-addons-for-gutenberg" ) }</h2>
						{ iconColorControls() }
					</PanelBody>
				</InspectorControls>
				{ renderHtml() }
			</Fragment>
		);
	}
}

export default UAGBSocialShareChild;
