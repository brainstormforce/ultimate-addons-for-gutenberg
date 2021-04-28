/**
 * BLOCK: Tabs Block
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import "./style.scss";
import "./editor.scss";
import attributes from "./attributes";
import edit from "./edit";
import deprecated from "./deprecated";
import save from "./save";

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/tabs", {
	title: uagb_blocks_info.blocks["uagb/tabs"].title,
	description: uagb_blocks_info.blocks["uagb/tabs"].description,
	icon: UAGB_Block_Icons.tabs,
	category: uagb_blocks_info.category,
	keywords: [
		__( "tabs"  , "ultimate-addons-for-gutenberg" ),
		__( "uag"  , "ultimate-addons-for-gutenberg" ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	deprecated,
} );
