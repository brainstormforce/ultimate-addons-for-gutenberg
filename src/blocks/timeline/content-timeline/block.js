import UAGB_Block_Icons from '@Controls/block-icons';
//  Import CSS.
import '.././style.scss';
import deprecated from './deprecated';
import save from './save';
import attributes from './attributes';
import edit from './edit';

// Components
import { __ } from '@wordpress/i18n';

// Register block controls
import { registerBlockType } from '@wordpress/blocks';

import { addFilter } from '@wordpress/hooks';
import { withSelect } from '@wordpress/data';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Override the default block element to add	wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const enhance = compose(
	withSelect( ( select ) => {
		return {
			selected: select( 'core/block-editor' ).getSelectedBlock(),
		};
	} )
);
/**
 * Add custom UAG attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withcontentTimeline = createHigherOrderComponent( ( BlockEdit ) => {
	return enhance( ( { ...props } ) => {
		return <BlockEdit { ...props } />;
	} );
}, 'withcontentTimeline' );

registerBlockType( 'uagb/content-timeline', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: uagb_blocks_info.blocks[ 'uagb/content-timeline' ].title, // Block title.
	description: uagb_blocks_info.blocks[ 'uagb/content-timeline' ].description, // Block description.
	icon: UAGB_Block_Icons.content_timeline, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: uagb_blocks_info.category,
	keywords: [
		__( 'Content Timeline', 'ultimate-addons-for-gutenberg' ),
		__( 'Timeline', 'ultimate-addons-for-gutenberg' ),
		__( 'uag', 'ultimate-addons-for-gutenberg' ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	example: {
		innerBlocks: [
			{
				name: 'uagb/content-timeline-child',
				innerBlocks: [
					{
						name: 'uagb/content-timeline-child',
						attributes: {
							time_heading: 'Timeline Heading ',
							time_desc:
								'This is Timeline description, you can change me anytime click here ',
							t_date: '1/1/2019',
						},
					},
				],
			},
			{
				name: 'uagb/content-timeline-child',
				innerBlocks: [
					{
						name: 'uagb/content-timeline-child',
						attributes: {
							time_heading: 'Timeline Heading ',
							time_desc:
								'This is Timeline description, you can change me anytime click here ',
							t_date: '1/1/2019',
						},
					},
				],
			},
			{
				name: 'uagb/content-timeline-child',
				innerBlocks: [
					{
						name: 'uagb/content-timeline-child',
						attributes: {
							time_heading: 'Timeline Heading ',
							time_desc:
								'This is Timeline description, you can change me anytime click here ',
							t_date: '1/1/2019',
						},
					},
				],
			},
			{
				name: 'uagb/content-timeline-child',
				innerBlocks: [
					{
						name: 'uagb/content-timeline-child',
						attributes: {
							time_heading: 'Timeline Heading ',
							time_desc:
								'This is Timeline description, you can change me anytime click here ',
							t_date: '1/1/2019',
						},
					},
				],
			},
			{
				name: 'uagb/content-timeline-child',
				innerBlocks: [
					{
						name: 'uagb/content-timeline-child',
						attributes: {
							time_heading: 'Timeline Heading ',
							time_desc:
								'This is Timeline description, you can change me anytime click here ',
							t_date: '1/1/2019',
						},
					},
				],
			},
		],
	},
	deprecated,
} );
addFilter( 'editor.BlockEdit', 'uagb/content-timeline', withcontentTimeline );
