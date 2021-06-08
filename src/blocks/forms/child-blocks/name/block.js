/**
 * BLOCK: Forms - Name
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-name', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-name' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-name' ].description,
	icon: wp.UAGBBlockIcons.name,
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
