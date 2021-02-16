/**
 * BLOCK: Forms - URL
 */

import UAGB_Block_Icons from "../../../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "uagb/forms-url", {
	title: uagb_blocks_info.blocks["uagb/forms-url"]["title"],
	description: uagb_blocks_info.blocks["uagb/forms-url"]["description"],
	icon: UAGB_Block_Icons.url,
	category: uagb_blocks_info.category,
	parent: [ "uagb/forms" ],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	save
} )