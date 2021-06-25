/**
 * BLOCK: WP-Search
 */

import './style.scss';
import save from './save';
import edit from './edit';
import attributes from './attributes';
import UAGB_Block_Icons from '@Controls/block-icons';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/wp-search', {
	title: uagb_blocks_info.blocks[ 'uagb/wp-search' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/wp-search' ].description,
	icon: UAGB_Block_Icons.wp_search,
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
