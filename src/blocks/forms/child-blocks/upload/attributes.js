/**
 * BLOCK: UAGB Form - Upload Attributes
 */

import { __ } from '@wordpress/i18n';
const attributes = {
	block_id: {
		type: 'string',
	},
	uploadRequired: {
		type: 'boolean',
		default: false,
	},
	name: {
		type: 'string',
		default: __( 'Upload', 'ultimate-addons-for-gutenberg' ),
	},
	formats: {
		type: 'array',
		default: [
			__( 'jpg', 'ultimate-addons-for-gutenberg' ),
			__( 'jpeg', 'ultimate-addons-for-gutenberg' ),
			__( 'png', 'ultimate-addons-for-gutenberg' ),
			__( 'gif', 'ultimate-addons-for-gutenberg' ),
			__( 'pdf', 'ultimate-addons-for-gutenberg' ),
			__( 'doc', 'ultimate-addons-for-gutenberg' ),
			__( 'docx', 'ultimate-addons-for-gutenberg' ),
			__( 'ppt', 'ultimate-addons-for-gutenberg' ),
			__( 'pptx', 'ultimate-addons-for-gutenberg' ),
			__( 'odt', 'ultimate-addons-for-gutenberg' ),
			__( 'avi', 'ultimate-addons-for-gutenberg' ),
			__( 'ogg', 'ultimate-addons-for-gutenberg' ),
			__( 'm4a', 'ultimate-addons-for-gutenberg' ),
			__( 'mov', 'ultimate-addons-for-gutenberg' ),
			__( 'mp3', 'ultimate-addons-for-gutenberg' ),
			__( 'mp4', 'ultimate-addons-for-gutenberg' ),
			__( 'mpg', 'ultimate-addons-for-gutenberg' ),
			__( 'wav', 'ultimate-addons-for-gutenberg' ),
			__( 'wmv', 'ultimate-addons-for-gutenberg' ),
		],
	},
};
export default attributes;
