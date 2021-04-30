const { __ } = wp.i18n

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
	textAlign: {
		type: "string",
		default: "center"
	},
	link: {
		type: "string",
		default: "#"
	},
	linkTarget: {
		type: "boolean",
		default: false,
	},
	titleSpace: {
		type: "number",
		default: 0
	},

	// Border
	borderStyle : {
		type: "string",
		default: "solid"
	},
	borderWidth : {
		type: "number",
		default: 1
	},
	borderRadius : {
		type: "number"
	},
	borderColor : {
		type: "string",
		default: "#333"
	},
	borderHoverColor : {
		type: "string"
	},

	// Background
	vPadding :{
		type: "number",
		default: 8,
	},
	hPadding :{
		type: "number",
		default: 20,
	},
	vPaddingTablet :{
		type: "number"
	},
	hPaddingTablet :{
		type: "number"
	},
	vPaddingMobile :{
		type: "number"
	},
	hPaddingMobile :{
		type: "number"
	},
	paddingType :{
		type: "string",
		default: "px",
	},
	backgroundType: {
		type: "string",
		default: "color"
	},
	backgroundColor: {
		type: "string",
		default: "#eeeeee"
	},
	backgroundHoverColor: {
		type: "string",
	},
	gradientColor1: {
		type: "string",
	},
	gradientColor2: {
		type: "string",
	},
	gradientType: {
		type: "string",
		default: "linear"
	},
	gradientLocation1: {
		type: "number",
		default: 0
	},
	gradientLocation2: {
		type: "number",
		default: 100
	},
	gradientAngle: {
		type: "number",
		default: 0
	},
	backgroundOpacity: {
		type: "number",
	},
	backgroundHoverOpacity: {
		type: "number",
	},

	//Colors
	titleColor: {
		type: "string",
		default: "#333"
	},
	titleHoverColor: {
		type: "string"
	},
	iconColor: {
		type: "string",
		default: "#333"
	},
	iconHoverColor: {
		type: "string"
	},
	prefixColor: {
		type: "string",
		default: "#333"
	},
	prefixHoverColor: {
		type: "string"
	},


	// Label and Sub Label
	heading: {
		source: "html",
		selector: "h1,h2,h3,h4,h5,h6,p,span",
		default: "Subscribe Now"
	},
	prefix: {
		source: "html",
		selector: "p",
		default: "Get access to Premium Features for FREE for a year!"
	},


	// Icon attributes
	icon : {
		type : "string",
		default : "external-link-alt"
	},
	iconPosition: {
		type: "string",
		default: "before"
	},
	iconSpace : {
		type: "number",
		default: 10
	},


	// Typography
	// Title Font Family
	titleLoadGoogleFonts: {
		type: "boolean",
		default: false
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
	// Title Font Size
	titleFontSize: {
		type: "number",
		default: 20
	},
	titleFontSizeType: {
		type: "string",
		default: "px"
	},
	titleFontSizeTablet: {
		type: "number",
		default: 20
	},
	titleFontSizeMobile: {
		type: "number",
		default: 20
	},
	// Title Line Height
	titleLineHeightType: {
		type: "string",
		default: "em"
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
	titleTag: {
		type: "string",
		default: "h6"
	},
	// Prefix Font Family
	prefixLoadGoogleFonts: {
		type: "boolean",
		default: false
	},
	prefixFontFamily: {
		type: "string",
		default: "Default",
	},
	prefixFontWeight: {
		type: "string",
	},
	prefixFontSubset: {
		type: "string",
	},
	// Prefix Font Size
	prefixFontSize: {
		type: "number",
		default: 14
	},
	prefixFontSizeType: {
		type: "string",
		default: "px"
	},
	prefixFontSizeTablet: {
		type: "number",
		default: 14
	},
	prefixFontSizeMobile: {
		type: "number",
		default: 14
	},
	// Prefix Line Height
	prefixLineHeightType: {
		type: "string",
		default: "em"
	},
	prefixLineHeight: {
		type: "number",
	},
	prefixLineHeightTablet: {
		type: "number",
	},
	prefixLineHeightMobile: {
		type: "number",
	},
	// Icon Font Size
	iconFontSize: {
		type: "number",
		default: 20
	},
	iconFontSizeType: {
		type: "string",
		default: "px"
	},
	iconFontSizeTablet: {
		type: "number",
		default: 20
	},
	iconFontSizeMobile: {
		type: "number",
		default: 20
	}
}

export default attributes
