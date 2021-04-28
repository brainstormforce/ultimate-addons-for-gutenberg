/**
 * BLOCK: Forms - Radio
 */

import UAGB_Block_Icons from "../../../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import save from "./save";
import "./editor.scss";

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/forms-radio", {
	title: uagb_blocks_info.blocks["uagb/forms-radio"].title,
	description: uagb_blocks_info.blocks["uagb/forms-radio"].description,
	icon: UAGB_Block_Icons.radio,
	category: uagb_blocks_info.category,
	parent: [ "uagb/forms" ],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	example:{},
	save
} );