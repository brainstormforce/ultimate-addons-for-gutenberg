/**
 * BLOCK: UAGb - post-carousel
 */

// Import block dependencies and components
import edit from './edit';


//  Import CSS.
import '.././style.scss';

// Components
import { __ } from '@wordpress/i18n';

// Register block controls
import { registerBlockType } from '@wordpress/blocks';

// Register the block
registerBlockType( 'uagb/post-carousel', {
	title: uagb_blocks_info.blocks[ 'uagb/post-carousel' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/post-carousel' ].description,
	icon: wp.UAGBBlockIcons.post_carousel,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'post', 'ultimate-addons-for-gutenberg' ),
		__( 'carousel', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	edit,
	example: {},
	// Render via PHP
	save() {
		return null;
	},
} );
