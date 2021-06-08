/**
 * BLOCK: Columns
 */


import attributes from './attributes';
import edit from './edit';
import deprecated from './deprecated';
import variations from './variations';
import './style.scss';
import save from './save';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/columns', {
	title: uagb_blocks_info.blocks[ 'uagb/columns' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/columns' ].description,
	icon: wp.UAGBBlockIcons.columns,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'columns', 'ultimate-addons-for-gutenberg' ),
		__( 'rows', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	attributes,
	variations,
	edit,
	getEditWrapperProps( attributes ) {
		return { 'data-align': attributes.align };
		return { 'data-valign': attributes.vAlign };
	},
	supports: {
		// Add EditorsKit block navigator toolbar
		editorsKitBlockNavigator: true,
		anchor: true,
	},
	example: {},
	save,
	deprecated,
} );
