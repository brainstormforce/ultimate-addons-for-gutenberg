/**
 * BLOCK: Forms - Select
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-select', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-select' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-select' ].description,
	icon: wp.UAGBBlockIcons.select,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/forms' ],
	attributes,
	edit,
	example: {},
	save,
} );
