/**
 * BLOCK: Inline Notice Block.
 */
import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/inline-notice', {
	title: uagb_blocks_info.blocks[ 'uagb/inline-notice' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/inline-notice' ].description,
	icon: UAGB_Block_Icons.inline_notice,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'inline notice', 'ultimate-addons-for-gutenberg' ),
		__( 'notice', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	example: {},
	edit,
	save,
} );
