/**
 * BLOCK: Post Excerpt
 */
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "uagb/fse-post-excerpt", {
	title: uagb_blocks_info.blocks["uagb/fse-post-excerpt"]["title"],
	description: uagb_blocks_info.blocks["uagb/fse-post-excerpt"]["description"],
	icon: UAGB_Block_Icons.marketing_button,
	category: uagb_blocks_info.category,
	keywords: [
		__( "Post Excerpt", 'ultimate-addons-for-gutenberg' ),
		__( "Excerpt", 'ultimate-addons-for-gutenberg' ),
		__( "uag", 'ultimate-addons-for-gutenberg' ),
	],
	edit,
	save,
	attributes
} );