/**
 * BLOCK: Forms - Checkbox - Attribute
 */
import { __ } from '@wordpress/i18n';

const attributes = {
	block_id: {
		type: 'string',
	},
	checkboxName: {
		type: 'string',
		default: __( 'Checkbox Title', 'ultimate-addons-for-gutenberg' ),
	},
	checkboxRequired: {
		type: 'boolean',
		default: false,
	},
	options: {
		type: 'array',
		default: [
			{
				optiontitle: __(
					'Option Name 1',
					'ultimate-addons-for-gutenberg'
				),
				optionvalue: __(
					'Option Value 1',
					'ultimate-addons-for-gutenberg'
				),
			},
		],
	},
};
export default attributes;
