/**
 * BLOCK: Forms - Hidden
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-hidden', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-hidden' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-hidden' ].description,
	icon: wp.UAGBBlockIcons.hidden,
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
