/**
 * BLOCK: Forms - Name
 */

import UAGB_Block_Icons from "../../../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import save from "./save";
import "./editor.scss";

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/forms-name", {
	title: uagb_blocks_info.blocks["uagb/forms-name"].title,
	description: uagb_blocks_info.blocks["uagb/forms-name"].description,
	icon: UAGB_Block_Icons.name,
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