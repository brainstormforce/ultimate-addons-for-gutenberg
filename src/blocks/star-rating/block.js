/**
 * BLOCK: Star Rating
 */

import UAGB_Block_Icons from "@Controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';


registerBlockType( "uagb/star-rating", {
	title: __( 'Star Rating', 'ultimate-addons-for-gutenberg' ),
	description: __( 'This block lets you add a star rating.', 'ultimate-addons-for-gutenberg' ),
	icon: UAGB_Block_Icons.star_rating,
	keywords: [
		__( "rating", 'ultimate-addons-for-gutenberg' ),
		__( "star rating", 'ultimate-addons-for-gutenberg' ),
		__( "review", 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	example: {
		attributes: {
			rating: 4
		},
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
} )