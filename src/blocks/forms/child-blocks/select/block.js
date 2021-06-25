/**
 * BLOCK: Forms - Select
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/forms-select', {
	title: uagb_blocks_info.blocks[ 'uagb/forms-select' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/forms-select' ].description,
	icon: UAGB_Block_Icons.select,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/forms' ],
	attributes,
	edit,
	example: {},
	save,
} );
