const attributes = {
	block_id: {
		type: "string"
	},
	layout: {
		type: "string",
		default: "inline"
	},
	rating: {
		type: "number",
		default: 4
	},
	range: {
		type: "string",
		default: "5"
	},
	size: {
		type: "number",
	},
	gap: {
		type: "number",
	},
	align: {
		type: "string",
		default: "left"
	},
	unmarkedColor: {
		type: "string",
		default: "#ccd6df"
	},
	color: {
		type: "string",
		default: "#f0ad4e"
	},
	title: {
		type: "string"
	},
	titleGap : {
		type: "number",
		default: 10
	},
	titleColor: {
		type: "string",
	},
	fontSize: {
		type: "number",
	},
	fontSizeType: {
		type: "string",
		default: "px"
	},
	fontSizeTablet: {
		type: "number",
	},
	fontSizeMobile: {
		type: "number",
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
	lineHeightType: {
		type: "string",
		default: "em"
	},
	lineHeight: {
		type: "number",
	},
	lineHeightTablet: {
		type: "number",
	},
	lineHeightMobile: {
		type: "number",
	},
	loadGoogleFonts: {
		type: "boolean",
		default: false	
	}
}

export default attributes
