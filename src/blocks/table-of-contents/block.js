/**
 * BLOCK: Table of Contents
 */


import attributes from './attributes';
import edit from './edit';
import deprecated from './deprecated';
import './style.scss';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/table-of-contents', {
	title: uagb_blocks_info.blocks[ 'uagb/table-of-contents' ].title,
	description:
		uagb_blocks_info.blocks[ 'uagb/table-of-contents' ].description,
	icon: wp.UAGBBlockIcons.table_of_contents,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'table of contents', 'ultimate-addons-for-gutenberg' ),
		__( 'table', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	// Render via PHP
	save() {
		return null;
	},
	example: {},
	deprecated,
} );
