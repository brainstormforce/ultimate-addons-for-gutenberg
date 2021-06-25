/**
 * BLOCK: Post Button
 */

// Import block dependencies and components
import { PostButton } from './edit';
import save from './save';
import UAGB_Block_Icons from '@Controls/block-icons';

// Components
import { __ } from '@wordpress/i18n';

// Register block controls
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'uagb/post-button', {
	title: uagb_blocks_info.blocks[ 'uagb/post-button' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-button' ].description,
	icon: UAGB_Block_Icons.post_grid,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/post-grid', 'uagb/post-masonry', 'uagb/post-carousel' ],
	keywords: [ __( 'post' ), __( 'button' ), __( 'uag' ) ],
	PostButton,
	example: {},
	save,
} );
