import { __ } from '@wordpress/i18n';

const attributes = {
	block_id: {
		type: 'string',
	},
	description: {
		type: 'string',
		default: __(
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		),
	},
	title: {
		type: 'string',
		default: __( 'Menu Item' ),
	},
	price: {
		type: 'string',
		default: __( '$9' ),
	},
	image: {
		type: 'object',
	},
	imagePosition: {
		type: 'string',
		default: 'top',
	},
	imageAlignment: {
		type: 'string',
		default: 'top',
	},
	imageSize: {
		type: 'string',
		default: 'medium',
	},
	headingTag: {
		type: 'string',
		default: 'h4',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	tcolumns: {
		type: 'number',
		default: 2,
	},
	mcolumns: {
		type: 'number',
		default: 1,
	},
	headingAlign: {
		type: 'string',
		default: 'left',
	},
};

export default attributes;
