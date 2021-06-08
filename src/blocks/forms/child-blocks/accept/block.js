/**
 * BLOCK: Forms - Accept
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-accept', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-accept' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-accept' ].description,
	icon: wp.UAGBBlockIcons.accept,
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
