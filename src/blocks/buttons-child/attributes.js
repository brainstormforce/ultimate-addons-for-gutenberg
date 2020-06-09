/**
 * BLOCK: Buttons Child - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	align: {
		type: "string",
		default: "center"
	},
	gap: {
		type: "number",
		default: 10
	},
	stack: {
		type: "string",
		default: "none"
	},
	loadGoogleFonts: {
		type: "boolean",
		default: false	
	},
	fontFamily: {
		type: "string",
		default: "Default",
	},
	fontWeight: {
		type: "string",
	},
	fontSubset: {
		type: "string",
	},
	label: {
		type: "string",
		default:'#Click Here' 
	} ,
	link: {
		type: "string",
		default:"" 
	} ,
	target: {
		type: "string",
		default:"_self" 
	},
	size: {
		type: "number",
	},
	vPadding: {
		type: "number",
		default:10 
	},
	hPadding: {
		type: "number",
		default:14 
	} ,
	borderWidth: {
		type: "number",
		default:1 
	} ,
	borderRadius: {
		type: "number",
		default:2 
	} ,
	borderStyle: {
		type: "string",
		default:"solid" 
	} ,
	borderColor: {
		type: "string",
		default:"#333" 
	} ,
	borderHColor: {
		type: "string",
		default:"#333" 
	} ,
	color: {
		type: "string",
		default:"#333" 
	} ,
	mbIcon : {
		type : "string",
		default : ""
	},
	mbIconPosition: {
		type: "string",
		default: "after"
	},
	mbIconSpace :{
		type: "number",
		default : 5
	},
	background: {
		type: "string",
		default:"" 
	} ,
	hColor: {
		type: "string",
		default:"#333" 
	} ,
	hBackground: {
		type: "string",
		default:"" 
	} ,
	sizeType: {
		type: "string",
		default:"px" 
	} ,
	sizeMobile: {
		type: "number",
		default:"" 
	} ,
	sizeTablet: {
		type: "number",
		default:"" 
	} ,
	lineHeight: {
		type: "number",
		default:"" 
	} ,
	lineHeightType: {
		type: "string",
		default:"em" 
	},
	lineHeightMobile: {
		type: "number",
		default:"" 
	} ,
	lineHeightTablet: {
		type: "number",
		default:"" 
	} ,
	opensInNewTab: {
		type: "boolean"
	}
}

export default attributes