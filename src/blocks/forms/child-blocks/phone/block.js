/**
 * BLOCK: Forms - Phone
 */

import UAGB_Block_Icons from "../../../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import save from "./save";
import "./editor.scss";

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/forms-phone", {
	title: uagb_blocks_info.blocks["uagb/forms-phone"].title,
	description: uagb_blocks_info.blocks["uagb/forms-phone"].description,
	icon: UAGB_Block_Icons.phone,
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