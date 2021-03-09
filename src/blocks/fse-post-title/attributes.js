const attributes = {
	block_id: {
		type: "string"
	},
	titleText:{
		type: "string",
	},
	titleAlign: {
		type: "string",
		default: "center",
	},
	titleColor: {
		type: "string",
	},
	titleTag: {
		type: "string",
		default: "h2"
	},
	level: {
		type: "number",
		default: 2
	},
	titleSpace: {
		type: "number",
		default: 15
	},
	titleFontFamily: {
		type: "string",
		default: "Default",
	},
	titleFontWeight: {
		type: "string",
	},
	titleFontSubset: {
		type: "string",
	},
	titleFontSizeType: {
		type: "string",
		default: "px"
	},
	titleLineHeightType: {
		type: "string",
		default: "em"
	},
	titleFontSize: {
		type: "number",
	},
	titleFontSizeTablet: {
		type: "number",
	},
	titleFontSizeMobile: {
		type: "number",
	},
	titleLineHeight: {
		type: "number",
	},
	titleLineHeightTablet: {
		type: "number",
	},
	titleLineHeightMobile: {
		type: "number",
	},
	headLoadGoogleFonts: {
		type: "boolean",
		default: false	
	},
}

export default attributes
