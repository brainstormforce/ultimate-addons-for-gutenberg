/**
 * BLOCK: UAGB Form - Accept Attributes
 */
import { __ } from '@wordpress/i18n';

const attributes = {
	block_id: {
		type: 'string',
	},
	acceptRequired: {
		type: 'boolean',
		default: false,
	},
	acceptText: {
		type: 'string',
		default: __(
			'I have read and agree to the Privacy Policy.',
			'ultimate-addons-for-gutenberg'
		),
	},
	showLink: {
		type: 'boolean',
		default: false,
	},
	linkLabel: {
		type: 'string',
		default: __( 'Privacy Policy', 'ultimate-addons-for-gutenberg' ),
	},
	link: {
		type: 'string',
		default: '#',
	},
	linkInNewTab: {
		type: 'boolean',
		default: true,
	},
};
export default attributes;
