/**
 * BLOCK: Forms - Toggle
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-toggle', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-toggle' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-toggle' ].description,
	icon: wp.UAGBBlockIcons.toggle,
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
