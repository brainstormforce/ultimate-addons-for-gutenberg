/**
 * BLOCK: Google Map
 */


import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import "./style.scss"

const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	InspectorControls,
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	TextControl
} = wp.components

const { Component, Fragment } = wp.element

const api_key = "AIzaSyAsd_d46higiozY-zNqtr7zdA81Soswje4"

class UAGBGoogleMap extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
	}

	render() {

		// Setup the attributes
		const {
			className,
			setAttributes,
			attributes: {
				height,
				zoom,
				address
			},
		} = this.props

		let encoded_address = encodeURI( address )

		let url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}`


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "General" ) } >
						<p className="uagb-settings-notice">{ __( "This block uses Ultimate Addon for Gutenberg's API key to display the map. You don't need to create your own API key or worry about renewing it." ) }</p>
						<p className="components-base-control__label">{__( "Address" )}</p>
						<TextControl
							value={ address }
							onChange={ ( value ) => setAttributes( { address: value } ) }
							placeholder={__( "Type the address" )}
						/>
						<RangeControl
							label={ __( "Zoom" ) }
							value={ zoom }
							onChange={ ( value ) => setAttributes( { zoom: value } ) }
							min={ 1 }
							max={ 22 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<RangeControl
							label={ __( "Height" ) }
							value={ height }
							onChange={ ( value ) => setAttributes( { height: value } ) }
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames( className, "uagb-google-map__wrap", `uagb-block-${this.props.clientId.substr( 0, 8 )}` ) }>
					<iframe
						className="uagb-google-map__iframe"
						src={url}
						style={{height: height}}></iframe>
				</div>
			</Fragment>
		)
	}
}

registerBlockType( "uagb/google-map", {
	title: uagb_blocks_info.blocks["uagb/google-map"]["title"],
	description: uagb_blocks_info.blocks["uagb/google-map"]["description"],
	icon: UAGB_Block_Icons.google_map,
	keywords: [
		__( "google map" ),
		__( "uag" ),
		__( "map" ),
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
		}
	},
	edit: UAGBGoogleMap,
	save: function( props ) {

		const {
			block_id,
			height,
			zoom,
			address
		} = props.attributes

		let encoded_address = encodeURI( address )

		let url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}`

		return (
			<div className={ classnames( props.className, "uagb-google-map__wrap", `uagb-block-${block_id}` ) }>
				<iframe
					className="uagb-google-map__iframe"
					src={url}
					style={{height: height}}></iframe>
			</div>
		)
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
			save: function( props ) {
				const {
					block_id,
					height,
					zoom,
					address
				} = props.attributes

				let encoded_address = encodeURI( address )

				let url = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encoded_address}&zoom=${zoom}`

				return (
					<div className={ classnames( props.className, "uagb-google-map__wrap" ) } id={ `uagb-google-map-${block_id}`}>
						<iframe
							className="uagb-google-map__iframe"
							src={url}
							style={{height: height}}></iframe>
					</div>
				)
			},
		},
	]
} )
