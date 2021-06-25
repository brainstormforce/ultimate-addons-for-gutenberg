/**
 * BLOCK: Post Timeline Js.
 */
import UAGB_Block_Icons from '@Controls/block-icons';
import '.././style.scss';
import edit from './edit';

// Components.
import { __ } from '@wordpress/i18n';

// Register block controls.
import { registerBlockType } from '@wordpress/blocks';

export const name = 'core/latest-posts';

// Register the block.
registerBlockType( 'uagb/post-timeline', {
	title: uagb_blocks_info.blocks[ 'uagb/post-timeline' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-timeline' ].description,
	icon: UAGB_Block_Icons.post_timeline,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'post', 'ultimate-addons-for-gutenberg' ),
		__( 'timeline', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	example: {},
	edit,
	// Render via PHP
	save() {
		return null;
	},
} );
