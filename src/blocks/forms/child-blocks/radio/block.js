/**
 * BLOCK: Forms - Radio
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/forms-radio', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-radio' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-radio' ].description,
	icon: UAGB_Block_Icons.radio,
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
