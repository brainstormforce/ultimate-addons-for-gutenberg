/**
 * BLOCK: Google Map
 */


import classnames from "classnames";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl
} = wp.components;

const { Component, Fragment } = wp.element;

const api_key = "AIzaSyAsd_d46higiozY-zNqtr7zdA81Soswje4";

class UAGBGoogleMap extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
	}

	render() {

		// Setup the attributes
		const {
			className,
			setAttributes,
			attributes: {
				height,
				zoom,
				address,
				language,
			},
		} = this.props;
		const encoded_address = encodeURI( address );

		const lang_par = ( language ) ? language : "en";

		const url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}&language=${lang_par}`;


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "General","ultimate-addons-for-gutenberg" ) } >
						<p className="uagb-settings-notice">{ __( "This block uses Ultimate Addon for Gutenberg's API key to display the map. You don't need to create your own API key or worry about renewing it.","ultimate-addons-for-gutenberg"  ) }</p>
						<p className="components-base-control__label">{ __( "Address","ultimate-addons-for-gutenberg"  ) }</p>
						<TextControl
							value={ address }
							onChange={ ( value ) => setAttributes( { address: value } ) }
							placeholder={ __( "Type the address","ultimate-addons-for-gutenberg"  ) }
						/>
						<RangeControl
							label={ __( "Zoom","ultimate-addons-for-gutenberg"  ) }
							value={ zoom }
							onChange={ ( value ) => setAttributes( { zoom: value } ) }
							min={ 1 }
							max={ 22 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<RangeControl
							label={ __( "Height","ultimate-addons-for-gutenberg"  ) }
							value={ height }
							onChange={ ( value ) => setAttributes( { height: value } ) }
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
						<SelectControl
							label={ __( "Language","ultimate-addons-for-gutenberg"  ) }
							value={ language }
							onChange={ ( value ) => setAttributes( { language: value } ) }
							options={ [
								{ value: "af",	label: __( "Afrikaans","ultimate-addons-for-gutenberg"  ) },
								{ value: "sq",	label: __( "Albanian","ultimate-addons-for-gutenberg"  ) },
								{ value: "am",	label: __( "Amharic","ultimate-addons-for-gutenberg"  ) },
								{ value: "ar",	label: __( "Arabic","ultimate-addons-for-gutenberg"  ) },
								{ value: "hy",	label: __( "Armenian","ultimate-addons-for-gutenberg"  ) },
								{ value: "az",	label: __( "Azerbaijani","ultimate-addons-for-gutenberg"  ) },
								{ value: "eu",	label: __( "Basque","ultimate-addons-for-gutenberg"  ) },
								{ value: "be",	label: __( "Belarusian","ultimate-addons-for-gutenberg"  ) },
								{ value: "bn",	label: __( "Bengali","ultimate-addons-for-gutenberg"  ) },
								{ value: "bs",	label: __( "Bosnian","ultimate-addons-for-gutenberg"  ) },
								{ value: "bg",	label: __( "Bulgarian","ultimate-addons-for-gutenberg"  ) },
								{ value: "my",	label: __( "Burmese","ultimate-addons-for-gutenberg"  ) },
								{ value: "ca",	label: __( "Catalan","ultimate-addons-for-gutenberg"  ) },
								{ value: "zh",	label: __( "Chinese","ultimate-addons-for-gutenberg"  ) },
								{ value: "hr",	label: __( "Croatian","ultimate-addons-for-gutenberg"  ) },
								{ value: "cs",	label: __( "Czech","ultimate-addons-for-gutenberg"  ) },
								{ value: "da",	label: __( "Danish","ultimate-addons-for-gutenberg"  ) },
								{ value: "nl",	label: __( "Dutch","ultimate-addons-for-gutenberg"  ) },
								{ value: "en",	label: __( "English","ultimate-addons-for-gutenberg"  ) },
								{ value: "et",	label: __( "Estonian","ultimate-addons-for-gutenberg"  ) },
								{ value: "fa",	label: __( "Farsi","ultimate-addons-for-gutenberg"  ) },
								{ value: "fi",	label: __( "Finnish","ultimate-addons-for-gutenberg"  ) },
								{ value: "fr",	label: __( "French","ultimate-addons-for-gutenberg"  ) },
								{ value: "gl",	label: __( "Galician","ultimate-addons-for-gutenberg"  ) },
								{ value: "ka",	label: __( "Georgian","ultimate-addons-for-gutenberg"  ) },
								{ value: "de",	label: __( "German","ultimate-addons-for-gutenberg"  ) },
								{ value: "el",	label: __( "Greek","ultimate-addons-for-gutenberg"  ) },
								{ value: "gu",	label: __( "Gujarati","ultimate-addons-for-gutenberg"  ) },
								{ value: "iw",	label: __( "Hebrew","ultimate-addons-for-gutenberg"  ) },
								{ value: "hi",	label: __( "Hindi","ultimate-addons-for-gutenberg"  ) },
								{ value: "hu",	label: __( "Hungarian","ultimate-addons-for-gutenberg"  ) },
								{ value: "is",	label: __( "Icelandic","ultimate-addons-for-gutenberg"  ) },
								{ value: "id",	label: __( "Indonesian","ultimate-addons-for-gutenberg"  ) },
								{ value: "it",	label: __( "Italian","ultimate-addons-for-gutenberg"  ) },
								{ value: "ja",	label: __( "Japanese","ultimate-addons-for-gutenberg"  ) },
								{ value: "kn",	label: __( "Kannada","ultimate-addons-for-gutenberg"  ) },
								{ value: "kk",	label: __( "Kazakh","ultimate-addons-for-gutenberg"  ) },
								{ value: "km",	label: __( "Khmer","ultimate-addons-for-gutenberg"  ) },
								{ value: "ko",	label: __( "Korean","ultimate-addons-for-gutenberg"  ) },
								{ value: "ky",	label: __( "Kyrgyz","ultimate-addons-for-gutenberg"  ) },
								{ value: "lo",	label: __( "Lao","ultimate-addons-for-gutenberg"  ) },
								{ value: "lv",	label: __( "Latvian","ultimate-addons-for-gutenberg"  ) },
								{ value: "lt",	label: __( "Lithuanian","ultimate-addons-for-gutenberg"  ) },
								{ value: "mk",	label: __( "Macedonian","ultimate-addons-for-gutenberg"  ) },
								{ value: "ms",	label: __( "Malay","ultimate-addons-for-gutenberg"  ) },
								{ value: "ml",	label: __( "Malayalam","ultimate-addons-for-gutenberg" ) },
								{ value: "mr",	label: __( "Marathi","ultimate-addons-for-gutenberg" ) },
								{ value: "mn",	label: __( "Mongolian","ultimate-addons-for-gutenberg" ) },
								{ value: "ne",	label: __( "Nepali","ultimate-addons-for-gutenberg" ) },
								{ value: "no",	label: __( "Norwegian","ultimate-addons-for-gutenberg" ) },
								{ value: "pl",	label: __( "Polish","ultimate-addons-for-gutenberg" ) },
								{ value: "pt",	label: __( "Portuguese","ultimate-addons-for-gutenberg" ) },
								{ value: "pa",	label: __( "Punjabi","ultimate-addons-for-gutenberg" ) },
								{ value: "ro",	label: __( "Romanian","ultimate-addons-for-gutenberg" ) },
								{ value: "ru",	label: __( "Russian","ultimate-addons-for-gutenberg" ) },
								{ value: "sr",	label: __( "Serbian","ultimate-addons-for-gutenberg" ) },
								{ value: "si",	label: __( "Sinhalese","ultimate-addons-for-gutenberg" ) },
								{ value: "sk",	label: __( "Slovak","ultimate-addons-for-gutenberg" ) },
								{ value: "sl",	label: __( "Slovenian","ultimate-addons-for-gutenberg" ) },
								{ value: "es",	label: __( "Spanish","ultimate-addons-for-gutenberg" ) },
								{ value: "sw",	label: __( "Swahili","ultimate-addons-for-gutenberg" ) },
								{ value: "sv",	label: __( "Swedish","ultimate-addons-for-gutenberg" ) },
								{ value: "ta",	label: __( "Tamil","ultimate-addons-for-gutenberg" ) },
								{ value: "te",	label: __( "Telugu","ultimate-addons-for-gutenberg" ) },
								{ value: "th",	label: __( "Thai","ultimate-addons-for-gutenberg" ) },
								{ value: "tr",	label: __( "Turkish","ultimate-addons-for-gutenberg" ) },
								{ value: "uk",	label: __( "Ukrainian","ultimate-addons-for-gutenberg" ) },
								{ value: "ur",	label: __( "Urdu","ultimate-addons-for-gutenberg" ) },
								{ value: "uz",	label: __( "Uzbek","ultimate-addons-for-gutenberg" ) },
								{ value: "vi",	label: __( "Vietnamese","ultimate-addons-for-gutenberg" ) },
								{ value: "zu",	label: __( "Zulu","ultimate-addons-for-gutenberg" ) },							
							] }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames( className, "uagb-google-map__wrap", `uagb-block-${this.props.clientId.substr( 0, 8 )}` ) }>
					<iframe
						className="uagb-google-map__iframe"
						title={ __( "Google Map for " + address ) }
						src={ url }
						style={ { height } }></iframe>
				</div>
			</Fragment>
		);
	}
}

registerBlockType( "uagb/google-map", {
	title: uagb_blocks_info.blocks["uagb/google-map"].title,
	description: uagb_blocks_info.blocks["uagb/google-map"].description,
	icon: UAGB_Block_Icons.google_map,
	keywords: [
		__( "google map","ultimate-addons-for-gutenberg"  ),
		__( "uag","ultimate-addons-for-gutenberg"  ),
		__( "map","ultimate-addons-for-gutenberg"  ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes: {
		block_id: {
			type: "string"
		},
		address: {
			type: "string",
			default: "Brainstorm Force"
		},
		height: {
			type: "number",
			default: 300
		},
		zoom: {
			type: "number",
			default: 12
		},
		language: {
			type: "string",
			default: "en",
		},
	},
	example: {},
	edit: UAGBGoogleMap,
	save( props ) {

		const {
			block_id,
			height,
			zoom,
			address,
			language
		} = props.attributes;
		
		const encoded_address = encodeURI( address );

		const lang_par = ( language ) ? language : "en";

		const url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}&language=${lang_par}`;

		return (
			<div className={ classnames( props.className, "uagb-google-map__wrap", `uagb-block-${block_id}` ) }>
				<iframe
					className="uagb-google-map__iframe"
					title={ __( "Google Map for " + address ) }
					src={ url }
					style={ { height } }></iframe>
			</div>
		);
	},
	deprecated: [
		{
			attributes : {
				block_id: {
					type: "string"
				},
				address: {
					type: "string",
					default: "Brainstorm Force"
				},
				height: {
					type: "number",
					default: 300
				},
				zoom: {
					type: "number",
					default: 12
				}
			},			
			save( props ) {

				const {
					block_id,
					height,
					zoom,
					address
				} = props.attributes;
		
				const encoded_address = encodeURI( address );
		
				const url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}`;
		
				return (
					<div className={ classnames( props.className, "uagb-google-map__wrap", `uagb-block-${block_id}` ) }>
						<iframe
							className="uagb-google-map__iframe"
							title={ __( "Google Map for " + address ) }
							src={ url }
							style={ { height } }></iframe>
					</div>
				);
			},
		},
		{
			attributes : {
				block_id: {
					type: "string"
				},
				address: {
					type: "string",
					default: "Brainstorm Force"
				},
				height: {
					type: "number",
					default: 300
				},
				zoom: {
					type: "number",
					default: 12
				}
			},			
			save( props ) {
				const {
					block_id,
					height,
					zoom,
					address
				} = props.attributes;

				const encoded_address = encodeURI( address );

				const url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}`;

				return (
					<div className={ classnames( props.className, "uagb-google-map__wrap" ) } id={ `uagb-google-map-${block_id}` }>
						<iframe
							className="uagb-google-map__iframe"
							src={ url }
							style={ { height } }></iframe>
					</div>
				);
			},
		},
		{
			attributes : {
				block_id: {
					type: "string"
				},
				address: {
					type: "string",
					default: "Brainstorm Force"
				},
				height: {
					type: "number",
					default: 300
				},
				zoom: {
					type: "number",
					default: 12
				}
			},			
			save( props ) {
				const {
					block_id,
					height,
					zoom,
					address
				} = props.attributes;
		
				const encoded_address = encodeURI( address );
		
				const url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}`;
		
				return (
					<div className={ classnames( props.className, "uagb-google-map__wrap", `uagb-block-${block_id}` ) }>
						<iframe
							className="uagb-google-map__iframe"
							src={ url }
							style={ { height } }></iframe>
					</div>
				);
			},
		},
	]
} );
