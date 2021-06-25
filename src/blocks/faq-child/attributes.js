import { __ } from '@wordpress/i18n';

const attributes = {
	block_id: {
		type: 'string',
	},
	question: {
		type: 'html',
		default: __( 'What is FAQ?', 'ultimate-addons-for-gutenberg' ),
	},
	answer: {
		type: 'html',
		default: __(
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			'ultimate-addons-for-gutenberg'
		),
	},
	icon: {
		type: 'html',
		default: 'fas fa-plus',
	},
	iconActive: {
		type: 'html',
		default: 'fas fa-minus',
	},
	layout: {
		type: 'string',
		default: 'accordion',
	},
	headingTag: {
		type: 'html',
		selector: 'span,p,h1,h2,h3,h4,h5,h6',
		default: 'span',
	},
};

export default attributes;
