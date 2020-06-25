const attributes = {
	block_id: {
		type: "string",
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	align : {
		type: "string",
		default: "center"
	},
	alignTablet : {
		type: "string",
		default: ""
	},
	alignMobile : {
		type: "string",
		default: ""
	},
	topPadding: {
		type: "number",
		default: "",
	},
	bottomPadding: {
		type: "number",
		default: "",
	},
	leftPadding: {
		type: "number",
		default: "",
	},
	rightPadding: {
		type: "number",
		default: "",
	},
	topMargin: {
		type: "number",
		default: "",
	},
	bottomMargin: {
		type: "number",
		default: "",
	},
	leftMargin: {
		type: "number",
		default: "",
	},
	rightMargin: {
		type: "number",
		default: "",
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
	colWidth: {
		type: "number",
		default: "",
	},
	colWidthTablet: {
		type: "number",
		default: "",
	},
	colWidthMobile: {
		type: "number",
		default: "",
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
	backgroundOpacity: {
		type: "number"
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
	gradientValue: {
		type: "string",
		default: "",
	},
}

export default attributes
