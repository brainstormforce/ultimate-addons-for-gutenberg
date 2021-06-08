/**
 * BLOCK: Forms - Checkbox
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-checkbox', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-checkbox' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-checkbox' ].description,
	icon: wp.UAGBBlockIcons.checkbox,
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
