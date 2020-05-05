/**
 * BLOCK: How-To Child - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	add_required_steps: {
		type: "string",
		default: "Step 1 : Enter the HowTo Schema title you want"
	},
	description: {
		type:"string",
		default:"Enter description for the HowTo Schema"
	},
	link: {
		type: "string",
		default: "#"
	},
	image: {
		type: "object",
	},
	icon_color: {
		type: "string",
		default: "#3a3a3a"
	},
	icon_hover_color: {
		type: "string"
	},
	// tools Font Family
	toolsLoadGoogleFonts: {
		type: "boolean",
		default: false
	},
	toolsFontFamily: {
		type: "string",
		default: "Default",
	},
	toolsFontWeight: {
		type: "string",
	},
	toolsFontSubset: {
		type: "string",
	},
	// tools Font Size
	toolsFontSize: {
		type: "number",
		default: 14
	},
	toolsFontSizeType: {
		type: "string",
		default: "px"
	},
	toolsFontSizeTablet: {
		type: "number",
		default: 14
	},
	toolsFontSizeMobile: {
		type: "number",
		default: 14
	},
	// tools Line Height
	toolsLineHeightType: {
		type: "string",
		default: "em"
	},
	toolsLineHeight: {
		type: "number",
	},
	toolsLineHeightTablet: {
		type: "number",
	},
	toolsLineHeightMobile: {
		type: "number",
	},
}

export default attributes
