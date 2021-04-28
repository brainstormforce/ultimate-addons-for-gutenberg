/**
 * BLOCK: Testimonial
 */

import classnames from "classnames";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import deprecated from "./deprecated";
import "./style.scss";
import "./editor.scss";
const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( "uagb/testimonial", {
	title: uagb_blocks_info.blocks["uagb/testimonial"].title, // Block title.
	description: uagb_blocks_info.blocks["uagb/testimonial"].description, // Block description.
	icon: UAGB_Block_Icons.testimonial, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	keywords: [
		__( "testimonial","ultimate-addons-for-gutenberg" ),
		__( "uag","ultimate-addons-for-gutenberg" ),
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
