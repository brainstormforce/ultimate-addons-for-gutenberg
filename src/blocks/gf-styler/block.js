/**
 * BLOCK: Gravity Form Styler
 */

// Import block dependencies and components.
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";

// Import icon.
import edit from "./edit";
import "./editor.scss";
import "./style.scss";
const { __ } = wp.i18n;

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
} = wp.blocks;

/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

if ( uagb_blocks_info.blocks["uagb/gf-styler"].is_active ) {
	registerBlockType( "uagb/gf-styler", {

		title: uagb_blocks_info.blocks["uagb/gf-styler"].title, // Block title.
		description:uagb_blocks_info.blocks["uagb/gf-styler"].description, // Block description.
		icon: UAGB_Block_Icons.gf_styler,
		keywords: [
			__( "GF styler","ultimate-addons-for-gutenberg" ),
			__( "gravity form styler","ultimate-addons-for-gutenberg" ),
			__( "uag","ultimate-addons-for-gutenberg" ),
		],
		supports: {
			anchor: true,
		},
		category: uagb_blocks_info.category,
		edit,
		example: {},
		save() {
			return null;
		},	
	} );
}
