/**
 * BLOCK: Contact Form 7 Styler
 */

// Import block dependencies and components.
import UAGB_Block_Icons from '@Controls/block-icons';

// Import icon.
import edit from './edit';

import './style.scss';
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

if ( uagb_blocks_info.blocks[ 'uagb/cf7-styler' ].is_active ) {
	registerBlockType( 'uagb/cf7-styler', {
		title: uagb_blocks_info.blocks[ 'uagb/cf7-styler' ].title, // Block title.
		description: uagb_blocks_info.blocks[ 'uagb/cf7-styler' ].description, // Block description.
		icon: UAGB_Block_Icons.cf7_styler,
		keywords: [
			__( 'CF7 styler', 'ultimate-addons-for-gutenberg' ),
			__( 'contact form styler', 'ultimate-addons-for-gutenberg' ),
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
