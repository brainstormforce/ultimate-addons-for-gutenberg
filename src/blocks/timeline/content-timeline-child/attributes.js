/**
 * BLOCK: UAGB Timeline Child Attributes
 */

import { __ } from '@wordpress/i18n';

const attributes = {
	content_class: {
		type: 'string',
	},
	dayalign_class: {
		type: 'string',
	},
	time_heading: {
		type: 'string',
		default: __( 'Timeline Heading ', 'ultimate-addons-for-gutenberg' ),
	},
	time_desc: {
		type: 'string',
		default: __(
			'This is Timeline description, you can change me anytime click here ',
			'ultimate-addons-for-gutenberg'
		),
	},
	dateFormat: {
		type: 'string',
		default: 'F j, Y',
	},
	align: {
		type: 'string',
		default: 'center',
	},
	headingTag: {
		type: 'string',
		default: 'h4',
	},
	timelinAlignment: {
		type: 'string',
		default: 'center',
	},
	arrowlinAlignment: {
		type: 'string',
		default: 'center',
	},
	block_id: {
		type: 'string',
		default: '0',
	},
	timelineItem: {
		type: 'number',
		default: 5,
	},
	tm_client_id: {
		type: 'string',
		default: 'not_set',
	},
	iconSize: {
		type: 'number',
		default: 12,
	},
	icon: {
		type: 'string',
		default: 'fab fa fa-calendar-alt',
	},
	t_date: {
		type: 'string',
		default: '1/1/2019',
	},
	displayPostDate: {
		type: 'boolean',
	},
	stack: {
		type: 'string',
		default: 'tablet',
	},
};

export default attributes;
