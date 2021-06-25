/**
 * BLOCK: Google Map
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import './style.scss';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import attributes from './attributes';
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

wp.uagb_google_api_key = 'AIzaSyAsd_d46higiozY-zNqtr7zdA81Soswje4';

registerBlockType( 'uagb/google-map', {
	title: uagb_blocks_info.blocks[ 'uagb/google-map' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/google-map' ].description,
	icon: UAGB_Block_Icons.google_map,
	keywords: [
		__( 'google map', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
		__( 'map', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	example: {},
	edit,
	save,
	deprecated,
} );
