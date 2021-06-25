import { __ } from '@wordpress/i18n';
const attributes = {
	block_id: {
		type: 'string',
	},
	id: {
		type: 'number',
		default: 0,
	},
	header: {
		type: 'html',
	},
	tabActive: {
		type: 'number',
	},
	tabHeaders: {
		type: 'array',
		default: [
			__( 'Tab 1', 'ultimate-addons-for-gutenberg' ),
			__( 'Tab 2', 'ultimate-addons-for-gutenberg' ),
			__( 'Tab 3', 'ultimate-addons-for-gutenberg' ),
		],
	},
};
export default attributes;
