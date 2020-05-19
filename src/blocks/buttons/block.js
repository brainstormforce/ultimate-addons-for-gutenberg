/**
 * BLOCK: Multi Buttons
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import deprecated from "./deprecated"
import save from "./save"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	RichText
} = wp.blockEditor


registerBlockType( "uagb/buttons", {
	title: uagb_blocks_info.blocks["uagb/buttons"]["title"],
	description: uagb_blocks_info.blocks["uagb/buttons"]["description"],
	icon: UAGB_Block_Icons.buttons,
	category: uagb_blocks_info.category,
	keywords: [
		__( "buttons" ),
		__( "multi buttons" ),
		__( "uag" ),
	],
	supports: {
		anchor: true,
	},
	getEditWrapperProps( attributes ) {
		return { "data-btn-width": attributes.align }
	},
	attributes,
	edit,
	save,
	deprecated,
} )
