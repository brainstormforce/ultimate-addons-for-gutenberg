/**
 * BLOCK: Info Box
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import edit from './edit';
import save from './save';
import attributes from './attributes';
import deprecated from './deprecated';
import './style.scss';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/info-box', {
	title: uagb_blocks_info.blocks[ 'uagb/info-box' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/info-box' ].description,
	icon: UAGB_Block_Icons.info_box,
	keywords: [
		__( 'info box', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	example: {},
	deprecated,
} );
