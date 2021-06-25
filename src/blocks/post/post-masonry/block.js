/**
 * BLOCK: UAGB - post-masonry
 */

// Import block dependencies and components
import edit from './edit';
import UAGB_Block_Icons from '@Controls/block-icons';

//  Import CSS.
import '.././style.scss';

// Components
import { __ } from '@wordpress/i18n';

// Register block controls
import { registerBlockType } from '@wordpress/blocks';

// Register the block
registerBlockType( 'uagb/post-masonry', {
	title: uagb_blocks_info.blocks[ 'uagb/post-masonry' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-masonry' ].description,
	icon: UAGB_Block_Icons.post_masonry,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'post', 'ultimate-addons-for-gutenberg' ),
		__( 'masonry', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	edit,
	example: {},
	// Render via PHP
	save() {
		return null;
	},
} );
