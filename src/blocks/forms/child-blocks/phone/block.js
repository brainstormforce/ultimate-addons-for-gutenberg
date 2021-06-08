/**
 * BLOCK: Forms - Phone
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-phone', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-phone' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-phone' ].description,
	icon: wp.UAGBBlockIcons.phone,
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
