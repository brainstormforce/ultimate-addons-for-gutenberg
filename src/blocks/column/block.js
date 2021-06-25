/**
 * BLOCK: Column
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import attributes from './attributes';
import './style.scss';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/column', {
	title: uagb_blocks_info.blocks[ 'uagb/column' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/column' ].description,
	icon: UAGB_Block_Icons.column,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/columns' ],
	supports: {
		inserter: false,
		// Add EditorsKit block navigator toolbar
		editorsKitBlockNavigator: true,
	},
	attributes,
	edit,
	save,
	deprecated,
} );
