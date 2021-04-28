/**
 * BLOCK: Icon List - Child
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import save from "./save";
import "./style.scss";
import "./editor.scss";
import deprecated from "./deprecated";


const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/icon-list-child", {
	title: uagb_blocks_info.blocks["uagb/icon-list-child"].title,
	description: uagb_blocks_info.blocks["uagb/icon-list-child"].description,
	icon: UAGB_Block_Icons.icon_list_child,
	category: uagb_blocks_info.category,
	parent: [ "uagb/icon-list" ],
	attributes,
	edit,
	save,
	deprecated,
} );
