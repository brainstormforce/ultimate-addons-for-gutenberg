/**
 * BLOCK: UAGB Fse Post Navigation Attributes
 */

const attributes = {
	
	align: {
		type: "string",
	},
	menu_id: {
		type:"number",
	},
	menuitem:{
		type:"array"
	},
	block_id: {
		type: "string",
	},
	navigationColor:{
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
	navigationFontFamily: {
		type: "string",
		default: "Default",
	},
	navigationFontWeight: {
		type: "string",
	},
	navigationFontSubset: {
		type: "string",
	},
	navigationFontSizeType: {
		type: "string",
		default: "px"
	},
	navigationLineHeightType: {
		type: "string",
		default: "em"
	},
	navigationFontSize: {
		type: "number",
	},
	navigationFontSizeTablet: {
		type: "number",
	},
	navigationFontSizeMobile: {
		type: "number",
	},
	navigationLineHeight: {
		type: "number",
	},
	navigationLineHeightTablet: {
		type: "number",
	},
	navigationLineHeightMobile: {
		type: "number",
	},
	navigationBgColor:{
		type:"string"
	},
	navMobilePaddingType:{
		type:"string"
	},
	navDesktopPaddingType:{
		type:"string"
	},
	navTabletPaddingType:{
		type:"string"
	},
	navTopPaddingMobile:{
		type:"number"
	},
	navBottomPaddingMobile:{
		type:"number"
	},
	navLeftPaddingMobile:{
		type:"number"
	},
	navRightPaddingMobile:{
		type:"number"
	},
	navTopPaddingTablet:{
		type:"number"
	},
	navBottomPaddingTablet:{
		type:"number"
	},
	navLeftPaddingTablet:{
		type:"number"
	},
	navRightPaddingTablet:{
		type:"number"
	},
	navTopPaddingDesktop:{
		type:"number"
	},
	navBottomPaddingDesktop:{
		type:"number"
	},
	navLeftPaddingDesktop:{
		type:"number"
	},
	navRightPaddingDesktop:{
		type:"number"
	},
}

export default attributes
