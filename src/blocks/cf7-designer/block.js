/**
 * BLOCK: Contact Form 7 Styler
 */

// Import block dependencies and components.


// Import icon.
import edit from './edit';

import './style.scss';
import { __ } from '@wordpress/i18n';

// Import registerBlockType() from wp.blocks
import { registerBlockType } from '@wordpress/blocks';

/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

if ( uagb_blocks_info.blocks[ 'uagb/cf7-styler' ].is_active ) {
	registerBlockType( 'uagb/cf7-styler', {
		title: uagb_blocks_info.blocks[ 'uagb/cf7-styler' ].title, // Block title.
		description: uagb_blocks_info.blocks[ 'uagb/cf7-styler' ].description, // Block description.
		icon: wp.UAGBBlockIcons.cf7_styler,
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
