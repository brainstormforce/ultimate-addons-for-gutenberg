/**
 * BLOCK: Forms - Toggle
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/forms-toggle', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-toggle' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-toggle' ].description,
	icon: UAGB_Block_Icons.toggle,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/forms' ],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	example: {},
	save,
	deprecated,
} );
