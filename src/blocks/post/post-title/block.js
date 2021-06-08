/**
 * BLOCK: Post Title
 */

// Import block dependencies and components
import { PostTitle } from './edit';
import './style.scss';
import save from './save';


// Components
import { __ } from '@wordpress/i18n';

// Register block controls
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'uagb/post-title', {
	title: uagb_blocks_info.blocks[ 'uagb/post-title' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-title' ].description,
	icon: wp.UAGBBlockIcons.post_grid,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/post-grid', 'uagb/post-masonry', 'uagb/post-carousel' ],
	keywords: [ __( 'post' ), __( 'title' ), __( 'uag' ) ],
	PostTitle,
	example: {},
	save,
} );
