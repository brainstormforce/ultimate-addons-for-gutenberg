/**
 * BLOCK: Forms - Radio
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-radio', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-radio' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-radio' ].description,
	icon: wp.UAGBBlockIcons.radio,
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
