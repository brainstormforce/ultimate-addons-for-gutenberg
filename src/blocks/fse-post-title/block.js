import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"

const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "uagb/fse-post-title", {
	title: uagb_blocks_info.blocks["uagb/fse-post-title"]["title"],
	description: uagb_blocks_info.blocks["uagb/fse-post-title"]["description"],
	icon: UAGB_Block_Icons.marketing_button,
	category: uagb_blocks_info.category,
	keywords: [
		__( "post title" , 'ultimate-addons-for-gutenberg' ),
		__( "title" , 'ultimate-addons-for-gutenberg' ),
		__( "uag" , 'ultimate-addons-for-gutenberg' ),
	],
	attributes,
	edit,
	save
} )