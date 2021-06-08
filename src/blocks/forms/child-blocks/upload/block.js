/**
 * BLOCK: Forms - Upload
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-upload', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-upload' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-upload' ].description,
	icon: wp.UAGBBlockIcons.faq,
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
