/**
 * BLOCK: WP-Search
 */

import "./style.scss";
import "./editor.scss";
import save from "./save";
import edit from "./edit";
import attributes from "./attributes";
import blockIcons from "../../../dist/blocks/uagb-controls/block-icons";
import deprecated from "./deprecated";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( "uagb/wp-search", {
	title: uagb_blocks_info.blocks["uagb/wp-search"].title,
	description: uagb_blocks_info.blocks["uagb/wp-search"].description,
	icon: blockIcons.wp_search,
	keywords: [
		__( "search","ultimate-addons-for-gutenberg" ),
		__( "wp","ultimate-addons-for-gutenberg" ),
		__( "uag","ultimate-addons-for-gutenberg" ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	deprecated,
	example: {},
} );
