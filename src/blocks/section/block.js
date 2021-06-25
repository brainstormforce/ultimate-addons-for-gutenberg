/**
 * BLOCK: Section
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import './style.scss';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import { __ } from '@wordpress/i18n';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uagb/section', {
	title: uagb_blocks_info.blocks[ 'uagb/section' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/section' ].description,
	icon: UAGB_Block_Icons.section,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'section', 'ultimate-addons-for-gutenberg' ),
		__( 'wrapper', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	getEditWrapperProps( attribute ) {
		const { align, contentWidth } = attribute;
		if (
			'left' === align ||
			'right' === align ||
			'wide' === align ||
			'full' === align
		) {
			if ( 'full_width' == contentWidth ) {
				return { 'data-align': align };
			}
		}
	},
	save,
	example: {},
	deprecated,
} );
