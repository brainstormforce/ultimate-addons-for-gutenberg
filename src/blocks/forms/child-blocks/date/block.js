/**
 * BLOCK: Forms - Date
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-date', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-date' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-date' ].description,
	icon: wp.UAGBBlockIcons.datepicker,
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
