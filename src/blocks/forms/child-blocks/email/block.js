/**
 * BLOCK: Forms - Email
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-email', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-email' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-email' ].description,
	icon: wp.UAGBBlockIcons.email,
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
