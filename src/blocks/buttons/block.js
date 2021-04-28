/**
 * BLOCK: Multi Buttons
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import deprecated from "./deprecated";
import save from "./save";
import "./style.scss";
import "./editor.scss";


const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	RichText
} = wp.blockEditor;


registerBlockType( "uagb/buttons", {
	title: uagb_blocks_info.blocks["uagb/buttons"].title,
	description: uagb_blocks_info.blocks["uagb/buttons"].description,
	icon: UAGB_Block_Icons.buttons,
	category: uagb_blocks_info.category,
	keywords: [
		__( "buttons", "ultimate-addons-for-gutenberg" ),
		__( "multi buttons", "ultimate-addons-for-gutenberg" ),
		__( "uag", "ultimate-addons-for-gutenberg" ),
	],
	supports: {
		anchor: true,
	},
	getEditWrapperProps( attributes ) {
		return { "data-btn-width": attributes.align };
	},
	example:{
		innerBlocks: [
			{
				name: "uagb/buttons-child",
				innerBlocks: [
					{
						name: "uagb/buttons-child",
						attributes: { label: "#Click Here" },
					},
				],
			},
			{
				name: "uagb/buttons-child",
				innerBlocks: [
					{
						name: "uagb/buttons-child",
						attributes: { label: "#Click Here" },
					},
				],
			}
		],
	},
	attributes,
	edit,
	save,
	deprecated,
} );
