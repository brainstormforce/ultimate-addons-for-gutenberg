/**
 * BLOCK: How-To Schema
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';
import deprecated from './deprecated';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/how-to', {
	title: uagb_blocks_info.blocks[ 'uagb/how-to' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/how-to' ].description,
	icon: UAGB_Block_Icons.how_to,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'how to', 'ultimate-addons-for-gutenberg' ),
		__( 'schema', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	example: {
		innerBlocks: [
			{
				name: 'uagb/info-box',
				attributes: {
					infoBoxTitle: 'Step 1',
					iconimgPosition: 'left',
					source_type: 'image',
					showPrefix: false,
					seperatorStyle: 'none',
					ctaType: 'all',
					headingTag: 'h4',
				},
			},
			{
				name: 'uagb/info-box',
				attributes: {
					infoBoxTitle: 'Step 2',
					iconimgPosition: 'left',
					source_type: 'image',
					showPrefix: false,
					seperatorStyle: 'none',
					ctaType: 'all',
					headingTag: 'h4',
				},
			},
			{
				name: 'uagb/info-box',
				attributes: {
					infoBoxTitle: 'Step 3',
					iconimgPosition: 'left',
					source_type: 'image',
					showPrefix: false,
					seperatorStyle: 'none',
					ctaType: 'all',
					headingTag: 'h4',
				},
			},
		],
	},
	attributes,
	edit,
	save,
	deprecated,
} );
