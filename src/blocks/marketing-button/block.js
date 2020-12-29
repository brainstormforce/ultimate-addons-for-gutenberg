/**
 * BLOCK: Marketing Button
 */
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType , createBlock
} = wp.blocks

registerBlockType( "uagb/marketing-button", {
	title: uagb_blocks_info.blocks["uagb/marketing-button"]["title"],
	description: uagb_blocks_info.blocks["uagb/marketing-button"]["description"],
	icon: UAGB_Block_Icons.marketing_button,
	category: uagb_blocks_info.category,
	keywords: [
		__( "marketing button" ),
		__( "cta" ),
		__( "uag" ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	example: {},
	deprecated,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/buttons'],
				transform: (attributes) => {
					return createBlock('uagb/marketing-button', {
						link: attributes.url,
						heading: attributes.text,
						align: attributes.align,
						titleColor: attributes.textColor,
						backgroundColor: attributes.backgroundColor
					})
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: ['core/buttons'],
				transform: (attributes) => {
					return createBlock('core/buttons', {
						url: attributes.link,
						text: attributes.heading,
						align: attributes.align,
						textColor: attributes.titleColor,
						backgroundColor: attributes.backgroundColor
					})
				}
			}
		]
	},
} )