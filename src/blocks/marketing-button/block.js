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
	registerBlockType
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
	deprecated,
} )
