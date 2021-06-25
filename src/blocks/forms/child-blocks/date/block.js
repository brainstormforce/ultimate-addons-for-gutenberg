/**
 * BLOCK: Forms - Date
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/forms-date', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-date' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-date' ].description,
	icon: UAGB_Block_Icons.datepicker,
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
