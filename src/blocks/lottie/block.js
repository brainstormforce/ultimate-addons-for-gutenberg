/**
 * BLOCK: Lottie
 */

import "./editor.scss";
import edit from "./edit";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( "uagb/lottie", {
	title: uagb_blocks_info.blocks["uagb/lottie"].title,
	description: uagb_blocks_info.blocks["uagb/lottie"].description,
	icon: UAGB_Block_Icons.lottie,
	keywords: [
		__( "lottie", "ultimate-addons-for-gutenberg" ),
		__( "animation", "ultimate-addons-for-gutenberg" ),
		__( "uag", "ultimate-addons-for-gutenberg" ),
	],
	example:{},
	category: uagb_blocks_info.category,
	edit,
	// Render via PHP
	save() {
		return null;
	},
} );
