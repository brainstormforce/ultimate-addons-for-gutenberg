/**
 * BLOCK: UAGB Section Attributes
 */
const attributes = {
	classMigrate: {
		type: "boolean",
		default: false
	},
	align: {
		type: "string",
		default: "center"
	},
	block_id: {
		type: "string",
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
	contentWidth: {
		type: "string",
		default: "boxed"
	},
	width: {
		type: "number",
		default: 900
	},
	innerWidth: {
		type: "number",
		default: 1140
	},
	innerWidthType: {
		type: "string",
		default: "px"
	},
	themeWidth: {
		type: "boolean",
		default: false
	},
	tag: {
		type: "string",
		default: "section"
	},
	backgroundType: {
		type: "string",
	},
	backgroundImage: {
		type: "object",
	},
	backgroundPosition: {
		type: "string",
		default: "center-center"
	},
	backgroundSize: {
		type: "string",
		default: "cover"
	},
	backgroundRepeat: {
		type: "string",
		default: "no-repeat"
	},
	backgroundAttachment: {
		type: "string",
		default: "scroll"
	},
	backgroundVideo: {
		type: "object",
	},
	backgroundColor: {
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
	gradientPosition : {
		type: "string",
		default: "center center"
	},
	backgroundOpacity: {
		type: "number"
	},
	backgroundVideoOpacity: {
		type: "number",
		default: 50
	},
	backgroundVideoColor: {
		type: "string",
	},
	backgroundImageColor: {
		type: "string"
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
	overlayType: {
		type: "string",
		default: "color"
	},
	gradientOverlayColor1: {
		type: "string",
	},
	gradientOverlayColor2: {
		type: "string",
	},
	gradientOverlayType: {
		type: "string",
		default: "linear"
	},
	gradientOverlayLocation1: {
		type: "number",
		default: 0
	},
	gradientOverlayLocation2: {
		type: "number",
		default: 100
	},
	gradientOverlayAngle: {
		type: "number",
		default: 0
	},
	gradientOverlayPosition: {
		type: "string",
		default: "center center"
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
	gradientValue: {
		type: "string",
		default: "",
	},
}

export default attributes
