/**
 * BLOCK: Gravity Form Styler
 */

// Import block dependencies and components.
import UAGB_Block_Icons from '@Controls/block-icons';
import edit from './edit';
import './style.scss';
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

if ( uagb_blocks_info.blocks[ 'uagb/gf-styler' ].is_active ) {
	registerBlockType( 'uagb/gf-styler', {
		title: uagb_blocks_info.blocks[ 'uagb/gf-styler' ].title, // Block title.
		description: uagb_blocks_info.blocks[ 'uagb/gf-styler' ].description, // Block description.
		icon: UAGB_Block_Icons.gf_styler,
		keywords: [
			__( 'GF styler', 'ultimate-addons-for-gutenberg' ),
			__( 'gravity form styler', 'ultimate-addons-for-gutenberg' ),
			__( 'uag', 'ultimate-addons-for-gutenberg' ),
		],
		supports: {
			anchor: true,
		},
		category: uagb_blocks_info.category,
		edit,
		example: {},
		save() {
			return null;
		},
	} );
}
