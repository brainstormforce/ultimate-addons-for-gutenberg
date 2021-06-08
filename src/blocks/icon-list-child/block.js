/**
 * BLOCK: Icon List - Child
 */


import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';
import deprecated from './deprecated';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/icon-list-child', {
	title: uagb_blocks_info.blocks[ 'uagb/icon-list-child' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/icon-list-child' ].description,
	icon: wp.UAGBBlockIcons.icon_list_child,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/icon-list' ],
	attributes,
	edit,
	save,
	deprecated,
} );
