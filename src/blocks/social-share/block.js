/**
 * BLOCK: Social Share
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import './style.scss';
import transform from './transform';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'uagb/social-share', {
	title: uagb_blocks_info.blocks[ 'uagb/social-share' ].title,
	description: uagb_blocks_info.blocks[ 'uagb/social-share' ].description,
	icon: UAGB_Block_Icons.social_share,
	category: uagb_blocks_info.category,
	keywords: [
		__( 'social share', 'ultimate-addons-for-gutenberg' ),
		__( 'icon', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	example: {
		innerBlocks: [
			{
				name: 'uagb/social-share-child',
				innerBlocks: [
					{
						name: 'uagb/social-share-child',
						attributes: { type: 'facebook' },
					},
				],
			},
		],
	},
	attributes,
	edit,
	save,
	transform,
	deprecated,
} );
