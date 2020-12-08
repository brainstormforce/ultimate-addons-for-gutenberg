/**
 * BLOCK: UAGB - post-title
 */

// Import block dependencies and components
import edit from "./edit"
import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons"

// Components
const { __ } = wp.i18n

// Register block controls
const { registerBlockType } = wp.blocks

// Register the block
registerBlockType( "uagb/post-title", {
	title: uagb_blocks_info.blocks["uagb/post-title"]["title"],
	description: uagb_blocks_info.blocks["uagb/post-title"]["description"],
	icon: UAGB_Block_Icons.post_grid,
	category: uagb_blocks_info.category,
	parent: [ "uagb/post-grid" ],
	keywords: [
		__( "post" ),
		__( "grid" ),
		__( "uag" ),
	],
	edit,
	example: {},
	// Render via PHP
	save() {
		return null
	},
} )
