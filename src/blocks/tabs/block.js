/**
 * BLOCK: Tabs Block
 */


import './style.scss';
import attributes from './attributes';
import edit from './edit';
import deprecated from './deprecated';
import save from './save';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/tabs', {
	title: uagb_blocks_info.blocks[ 'uagb/tabs' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/tabs' ].description,
	icon: wp.UAGBBlockIcons.tabs,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'tabs', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	deprecated,
} );
