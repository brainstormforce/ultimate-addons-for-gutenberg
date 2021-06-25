/**
 * BLOCK: UAGB Form - Phone Attributes
 */
import { __ } from '@wordpress/i18n';
const attributes = {
	block_id: {
		type: 'string',
	},
	phoneName: {
		type: 'string',
		default: __( 'Phone', 'ultimate-addons-for-gutenberg' ),
	},
	phoneRequired: {
		type: 'boolean',
		default: false,
	},
	pattern: {
		type: 'string',
		default: __(
			'[0-9]{3}-[0-9]{3}-[0-9]{4}',
			'ultimate-addons-for-gutenberg'
		),
	},
};
export default attributes;
