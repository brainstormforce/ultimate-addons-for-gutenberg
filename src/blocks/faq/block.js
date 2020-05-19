/**
 * BLOCK: FAQ - Schema
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "uagb/faq", {
	title: uagb_blocks_info.blocks["uagb/faq"]["title"],
	description: uagb_blocks_info.blocks["uagb/faq"]["description"],
	icon: UAGB_Block_Icons.columns,
	category: uagb_blocks_info.category,
	keywords: [
		__( "faq" ),
		__( "schema" ),
		__( "uag" ),
	],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	save,
} )
