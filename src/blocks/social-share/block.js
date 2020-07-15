/**
 * BLOCK: Social Share
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import "./style.scss"
import "./editor.scss"
import transform from "./transform"
import attributes from "./attributes"
import edit from "./edit"
import links from "./links"
import save from "./save"
import deprecated from "./deprecated"

const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "uagb/social-share", {
	title: uagb_blocks_info.blocks["uagb/social-share"]["title"],
	description: uagb_blocks_info.blocks["uagb/social-share"]["description"],
	icon: UAGB_Block_Icons.social_share,
	category: uagb_blocks_info.category,
	keywords: [
		__( "social share" ),
		__( "icon" ),
		__( "uag" ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	transform,
	deprecated
} )
