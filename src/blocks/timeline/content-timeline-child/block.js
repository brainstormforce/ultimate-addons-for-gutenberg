/**
 * BLOCK: Content Timeline Child
 */

import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons";
import ".././style.scss";
import "./style.scss";
import save from "./save";
import attributes from "./attributes";
import edit from "./edit";
import deprecated from "./deprecated";

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

registerBlockType( "uagb/content-timeline-child", {
	title: uagb_blocks_info.blocks["uagb/content-timeline-child"].title,
	description: uagb_blocks_info.blocks["uagb/content-timeline-child"].description,
	icon: UAGB_Block_Icons.content_timeline,
	category: uagb_blocks_info.category,
	parent: [ "uagb/content-timeline" ],
	keywords: [
		__( "Content Timeline","ultimate-addons-for-gutenberg" ),
		__( "Timeline","ultimate-addons-for-gutenberg" ),
		__( "uag","ultimate-addons-for-gutenberg" ),
	],
	attributes,
	edit,
	save,
	deprecated,
} );