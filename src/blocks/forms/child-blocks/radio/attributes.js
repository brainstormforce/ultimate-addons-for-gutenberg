
const { __ } = wp.i18n

const attributes = {
    block_id: {
		type: "string"
    },
    radioName:{
        type: "string",
        default: __( "Select Title" )
    },
	radioRequired : {
        type: "boolean",
        default: false
    },
    options: {
        type: "array",
        default: [ { "optiontitle": __( "Option Name 1" ) } ],
        
    },
    
}
export default attributes