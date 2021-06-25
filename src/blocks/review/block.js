/**
 * BLOCK: Rating Block.
 */
import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/review', {
	title: uagb_blocks_info.blocks[ 'uagb/review' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/review' ].description,
	icon: UAGB_Block_Icons.review,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'ratings', 'ultimate-addons-for-gutenberg' ),
		__( 'review', 'ultimate-addons-for-gutenberg' ),
		__( 'schema', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	example: {},
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
} );
