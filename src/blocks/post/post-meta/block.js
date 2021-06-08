/**
 * BLOCK: Post Meta
 */

// Import block dependencies and components
import { PostMeta } from './edit';
import save from './save';

import './style.scss';
// Components
import { __ } from '@wordpress/i18n';

// Register block controls
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'uagb/post-meta', {
	title: uagb_blocks_info.blocks[ 'uagb/post-meta' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-meta' ].description,
	icon: wp.UAGBBlockIcons.post_grid,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/post-grid', 'uagb/post-masonry', 'uagb/post-carousel' ],
	keywords: [ __( 'post' ), __( 'meta' ), __( 'uag' ) ],
	PostMeta,
	example: {},
	save,
} );
