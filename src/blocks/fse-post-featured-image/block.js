/**
 * BLOCK: Featured Image Block
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

registerBlockType( "uagb/fse-post-featured-image", {
	title: uagb_blocks_info.blocks["uagb/fse-post-featured-image"]["title"],
	description: uagb_blocks_info.blocks["uagb/fse-post-featured-image"]["description"],
	icon: UAGB_Block_Icons.post_title,
	category: uagb_blocks_info.category,
	keywords: [
		__( "post featured image" , 'ultimate-addons-for-gutenberg'),
		__( "image", 'ultimate-addons-for-gutenberg' ),
		__( "uag" , 'ultimate-addons-for-gutenberg'),
	],
	attributes,
	edit,
	save,
} )
