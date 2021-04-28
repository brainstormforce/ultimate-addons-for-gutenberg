/**
 * BLOCK: UAGB Form - Hidden Attributes
 */
const { __ } = wp.i18n;

const attributes = {
	block_id: {
		type: "string"
	},
	hidden_field_name : {
		type: "string",
		default: __( "Hidden Field Name", "ultimate-addons-for-gutenberg" )
	},
	hidden_field_value : {
		type: "string"
	},
	
};
export default attributes;
