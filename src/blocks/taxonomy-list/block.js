/**
 * BLOCK: UAGB - Taxonomy List
 */

// Import block dependencies and components
import UAGB_Block_Icons from '@Controls/block-icons';

//  Import CSS.
import './style.scss';
import edit from './edit';

// Components
import { __ } from '@wordpress/i18n';

// Register block controls
import { registerBlockType } from '@wordpress/blocks';

// Register the block
registerBlockType( 'uagb/taxonomy-list', {
	title: uagb_blocks_info.blocks[ 'uagb/taxonomy-list' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/taxonomy-list' ].description,
	icon: UAGB_Block_Icons.taxonomy_list,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'post', 'ultimate-addons-for-gutenberg' ),
		__( 'taxonomy', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	example: {},
	edit,
	// Render via PHP
	save() {
		return null;
	},
} );
