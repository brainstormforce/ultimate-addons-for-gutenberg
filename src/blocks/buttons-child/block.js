/**
 * BLOCK: Buttons - Child
 */

import attributes from './attributes';
import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import './style.scss';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/buttons-child', {
	title: uagb_blocks_info.blocks[ 'uagb/buttons-child' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/buttons-child' ].description,
	icon: wp.UAGBBlockIcons.buttons_child,
	category: uagb_blocks_info.category,
	parent: [ 'uagb/buttons' ],
	attributes,
	edit,
	save,
	deprecated,
} );
