/**
 * BLOCK: Forms - Hidden
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/forms-hidden', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-hidden' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-hidden' ].description,
	icon: UAGB_Block_Icons.hidden,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/forms' ],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	example: {},
	save,
} );
