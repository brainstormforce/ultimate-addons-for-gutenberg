/**
 * BLOCK: WP-Search
 */

import './style.scss';
import save from './save';
import edit from './edit';
import attributes from './attributes';


import { __ } from '@wordpress/i18n';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/wp-search', {
	title: uagb_blocks_info.blocks[ 'uagb/wp-search' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/wp-search' ].description,
	icon: wp.UAGBBlockIcons.wp_search,
	keywords: [
		__( 'search', 'ultimate-addons-for-gutenberg' ),
		__( 'wp', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	example: {},
} );
