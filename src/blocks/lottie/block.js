/**
 * BLOCK: Lottie
 */

import edit from './edit';


import { __ } from '@wordpress/i18n';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/lottie', {
	title: uagb_blocks_info.blocks[ 'uagb/lottie' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/lottie' ].description,
	icon: wp.UAGBBlockIcons.lottie,
	keywords: [
		__( 'lottie', 'ultimate-addons-for-gutenberg' ),
		__( 'animation', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	example: {},
	category: uagb_blocks_info.category,
	edit,
	// Render via PHP
	save() {
		return null;
	},
} );
