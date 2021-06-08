/**
 * BLOCK: Forms - Block
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';
import variations from './variations';

import { __ } from '@wordpress/i18n';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms', {
	title: uagb_blocks_info.blocks[ 'uagb/forms' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms' ].description,
	icon: wp.UAGBBlockIcons.forms,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'forms', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	example: {},
	attributes,
	variations,
	edit,
	supports: {
		anchor: true,
	},
	save,
} );
