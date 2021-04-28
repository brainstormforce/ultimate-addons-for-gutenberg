/**
 * BLOCK: Icon List
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import save from "./save";
import deprecated from "./deprecated";
import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;
const {
	registerBlockType 
} = wp.blocks;

registerBlockType( "uagb/icon-list", {
	title: uagb_blocks_info.blocks["uagb/icon-list"].title,
	description: uagb_blocks_info.blocks["uagb/icon-list"].description,
	icon: UAGB_Block_Icons.icon_list,
	category: uagb_blocks_info.category,
	keywords: [
		__( "icon list", "ultimate-addons-for-gutenberg" ),
		__( "image list", "ultimate-addons-for-gutenberg" ),
		__( "uag", "ultimate-addons-for-gutenberg" ),
	],
	supports: {
		anchor: true,
	},
	example:{
		innerBlocks: [
			{
				name: "uagb/icon-list-child",
				innerBlocks: [
					{
						name: "uagb/icon-list-child",
						attributes: { label: "#Label" },
					},
				],
			},
		],
	},
	attributes,
	edit,
	save,
	deprecated
} );
