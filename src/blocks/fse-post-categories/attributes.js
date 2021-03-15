/**
 * BLOCK: UAGB Fse Post Categories Attributes
 */

const attributes = {
	
	align: {
		type: "string",
		default: "center"
	},
	block_id: {
		type: "string",
	},
	categories:{
		type:'array'
	},
	iconSize:{
		type: "number",
		default: 18
	},
	iconColor:{
		type:"string"
	},
	iconPosition:{
		type:"string",
		default:"before"
	},
	iconSpace:{
		type:"number",
		default: 5
	},
	categoriesColor:{
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
	categoriesFontFamily: {
		type: "string",
		default: "Default",
	},
	categoriesFontWeight: {
		type: "string",
	},
	categoriesFontSubset: {
		type: "string",
	},
	categoriesFontSizeType: {
		type: "string",
		default: "px"
	},
	categoriesLineHeightType: {
		type: "string",
		default: "em"
	},
	categoriesFontSize: {
		type: "number",
	},
	categoriesFontSizeTablet: {
		type: "number",
	},
	categoriesFontSizeMobile: {
		type: "number",
	},
	categoriesLineHeight: {
		type: "number",
	},
	categoriesLineHeightTablet: {
		type: "number",
	},
	categoriesLineHeightMobile: {
		type: "number",
	},
}

export default attributes
