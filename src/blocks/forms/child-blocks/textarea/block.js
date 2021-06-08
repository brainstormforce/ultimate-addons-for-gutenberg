/**
 * BLOCK: Forms - Textarea
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-textarea', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-textarea' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-textarea' ].description,
	icon: wp.UAGBBlockIcons.textarea,
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
