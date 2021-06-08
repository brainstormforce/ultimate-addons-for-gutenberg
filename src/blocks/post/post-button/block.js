/**
 * BLOCK: Post Button
 */

// Import block dependencies and components
import { PostButton } from './edit';
import save from './save';


// Components
import { __ } from '@wordpress/i18n';

// Register block controls
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'uagb/post-button', {
	title: uagb_blocks_info.blocks[ 'uagb/post-button' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-button' ].description,
	icon: wp.UAGBBlockIcons.post_grid,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/post-grid', 'uagb/post-masonry', 'uagb/post-carousel' ],
	keywords: [ __( 'post' ), __( 'button' ), __( 'uag' ) ],
	PostButton,
	example: {},
	save,
} );
