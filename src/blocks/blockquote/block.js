/**
 * BLOCK: Quote
 */

import edit from './edit';
import save from './save';
import './style.scss';
import deprecated from './deprecated';
import attributes from './attributes';
import { __ } from '@wordpress/i18n';

// Import registerBlockType() from wp.blocks
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://.org/gutenberg/handbook/block-api/
 * @param  {string}   namwordpresse     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'uagb/blockquote', {
	title: __( 'Blockquote', 'ultimate-addons-for-gutenberg' ),
	description: __(
		'This block allows you to display your Blockquote.',
		'ultimate-addons-for-gutenberg'
	),
	icon: wp.UAGBBlockIcons.blockquote,
	keywords: [
		__( 'blockquote', 'ultimate-addons-for-gutenberg' ),
		__( 'quote', 'ultimate-addons-for-gutenberg' ),
		__( 'uagb', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	example: {},
	deprecated,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( attributes ) => {
					return createBlock( 'uagb/blockquote', {
						descriptionText: attributes.value,
						author: attributes.citation,
						align: attributes.align,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ( attributes ) => {
					return createBlock( 'uagb/blockquote', {
						descriptionText: attributes.content,
						align: attributes.align,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( attributes ) => {
					return createBlock( 'core/quote', {
						value: `<p>${ attributes.descriptionText }</p>`,
						citation: attributes.author,
						align: attributes.align,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ( attributes ) => {
					return createBlock( 'core/heading', {
						content: attributes.descriptionText,
						align: attributes.align,
					} );
				},
			},
		],
	},
} );
