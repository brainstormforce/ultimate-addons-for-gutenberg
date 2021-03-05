/**
 * BLOCK: UAGB Post Content Attributes
 */

const attributes = {
	
	align: {
		type: "string",
	},
	block_id: {
		type: "string",
	},
	content:{
		type: "string"
	},
	mobilePaddingType: {
		type: "string",
		default: 'px'
	},
	tabletPaddingType: {
		type: "string",
		default: 'px'
	},
	desktopPaddingType: {
		type: "string",
		default: 'px'
	},
	topPadding: {
		type: "number",
		default: 20
	},
	bottomPadding: {
		type: "number",
		default: 20
	},
	leftPadding: {
		type: "number",
		default: 20
	},
	rightPadding: {
		type: "number",
		default: 20
	},
	mobileMarginType: {
		type: "string",
		default: 'px'
	},
	tabletMarginType: {
		type: "string",
		default: 'px'
	},
	desktopMarginType: {
		type: "string",
		default: 'px'
	},
	topMargin: {
		type: "number",
		default: 0
	},
	bottomMargin: {
		type: "number",
		default: 0
	},
	leftMargin: {
		type: "number",
		default: 0
	},
	rightMargin: {
		type: "number",
		default: 0
	},

	topPaddingTablet: {
		type: "number",
		default: ""
	},
	bottomPaddingTablet: {
		type: "number",
		default: ""
	},
	leftPaddingTablet: {
		type: "number",
		default: ""
	},
	rightPaddingTablet: {
		type: "number",
		default: ""
	},
	topMarginTablet: {
		type: "number",
		default: ""
	},
	bottomMarginTablet: {
		type: "number",
		default: ""
	},
	leftMarginTablet: {
		type: "number",
		default: ""
	},
	rightMarginTablet: {
		type: "number",
		default: ""
	},

	topPaddingMobile: {
		type: "number",
		default: ""
	},
	bottomPaddingMobile: {
		type: "number",
		default: ""
	},
	leftPaddingMobile: {
		type: "number",
		default: ""
	},
	rightPaddingMobile: {
		type: "number",
		default: ""
	},
	topMarginMobile: {
		type: "number",
		default: ""
	},
	bottomMarginMobile: {
		type: "number",
		default: ""
	},
	leftMarginMobile: {
		type: "number",
		default: ""
	},
	rightMarginMobile: {
		type: "number",
		default: ""
	},
	borderStyle : {
		type: "string",
		default: "none"
	},
	borderWidth : {
		type: "number",
		default: 1
	},
	borderRadius : {
		type: "number"
	},
	borderColor : {
		type: "string"
	},
	boxShadowColor: {
		type: "string"
	},
	boxShadowHOffset : {
		type: "number",
		default: 0
	},
	boxShadowVOffset : {
		type: "number",
		default: 0
	},
	boxShadowBlur : {
		type: "number"
	},
	boxShadowSpread : {
		type: "number"
	},
	boxShadowPosition: {
		type: "string",
		default: "outset"
	},
}

export default attributes
