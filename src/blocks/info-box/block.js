/**
 * BLOCK: Info Box
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import deprecated from "./deprecated";
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( "uagb/info-box", {
	title: uagb_blocks_info.blocks["uagb/info-box"].title,
	description: uagb_blocks_info.blocks["uagb/info-box"].description,
	icon: UAGB_Block_Icons.info_box,
	keywords: [
		__( "info box", "ultimate-addons-for-gutenberg" ),
		__( "uag", "ultimate-addons-for-gutenberg" ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	example: {},
	deprecated,
} );
