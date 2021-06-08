/**
 * BLOCK: Forms - URL
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/forms-url', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-url' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-url' ].description,
	icon: wp.UAGBBlockIcons.url,
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
