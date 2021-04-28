/**
 * BLOCK: Table of Contents
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import deprecated from "./deprecated";
import "./style.scss";
import "./editor.scss";


const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/table-of-contents", {
	title: uagb_blocks_info.blocks["uagb/table-of-contents"].title,
	description: uagb_blocks_info.blocks["uagb/table-of-contents"].description,
	icon: UAGB_Block_Icons.table_of_contents,
	category: uagb_blocks_info.category,
	keywords: [
		__( "table of contents","ultimate-addons-for-gutenberg" ),
		__( "table","ultimate-addons-for-gutenberg" ),
		__( "uag","ultimate-addons-for-gutenberg" ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	// Render via PHP
	save() {
		return null;
	},
	example: {},
	deprecated
} );
