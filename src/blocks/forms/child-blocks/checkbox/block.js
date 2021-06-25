/**
 * BLOCK: Forms - Checkbox
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/forms-checkbox', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-checkbox' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-checkbox' ].description,
	icon: UAGB_Block_Icons.checkbox,
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
