const attributes = {
	block_id: {
		type: "string"
	},
	layout: {
		type: "string",
		default : "accordion"
	},
	inactiveOtherItems: {
		type: "boolean",
		default : true
	},
	expandFirstItem: {
		type: "boolean",
		default : false
	},
	enableSchemaSupport: {
		type: "boolean",
		default : false
	},
	align: {
		type: "string",
		default : "left"
	},
	enableSeparator: {
		type: "boolean",
		default : false
	},
	rowsGap: {
		type: "number",
		default : 10
	},
	columnsGap: {
		type: "number",
		default : 10
	},
	boxBgColor: {
		type: "string",
		default: "#eeeeee"
	},
	boxPaddingTypeMobile: {
		type: "string",
		default : "px"
	},
	boxPaddingTypeTablet: {
		type: "string",
		default : "px"
	},
	boxPaddingTypeDesktop: {
		type: "string",
		default : "px"
	},
	vBoxPaddingMobile: {
		type: "number",
		default : 10
	},
	hBoxPaddingMobile: {
		type: "number",
		default : 10
	},
	vBoxPaddingTablet: {
		type: "number",
		default : 10
	},
	hBoxPaddingTablet: {
		type: "number",
		default : 10
	},
	vBoxPaddingDesktop: {
		type: "number",
		default : 10
	},
	hBoxPaddingDesktop: {
		type: "number",
		default : 10
	},
	borderStyle: {
		type: "string",
		default : "solid"
	},
	borderWidth: {
		type: "number",
		default : 1
	},
	borderRadius: {
		type: "number",
		default : 4
	},
	borderColor: {
		type: "string",
		default: "#313131"
	},
	questionTextColor: {
		type: "string",
		default: "#313131"
	},
	questionTextActiveColor: {
		type: "string",
		default: "#313131"
	},
	questionPaddingTypeMobile: {
		type: "string",
		default : "px"
	},
	questionPaddingTypeTablet: {
		type: "string",
		default : "px"
	},
	questionPaddingTypeDesktop: {
		type: "string",
		default : "px"
	},
	vquestionPaddingMobile: {
		type: "number",
		default : 10
	},
	vquestionPaddingTablet: {
		type: "number",
		default : 10
	},
	vquestionPaddingDesktop: {
		type: "number",
		default : 10
	},
	hquestionPaddingMobile: {
		type: "number",
		default : 10
	},
	hquestionPaddingTablet: {
		type: "number",
		default : 10
	},
	hquestionPaddingDesktop: {
		type: "number",
		default : 10
	},
	answerTextColor: {
		type: "string",
		default: "#313131"
	},
	answerPaddingTypeMobile: {
		type: "string",
		default : "px"
	},
	answerPaddingTypeTablet: {
		type: "string",
		default : "px"
	},
	answerPaddingTypeDesktop: {
		type: "string",
		default : "px"
	},
	vanswerPaddingMobile: {
		type: "number",
		default : 10
	},
	vanswerPaddingTablet: {
		type: "number",
		default : 10
	},
	vanswerPaddingDesktop: {
		type: "number",
		default : 10
	},
	hanswerPaddingMobile: {
		type: "number",
		default : 10
	},
	hanswerPaddingTablet: {
		type: "number",
		default : 10
	},
	hanswerPaddingDesktop: {
		type: "number",
		default : 10
	},
	iconColor: {
		type: "string"
	},
	iconActiveColor: {
		type: "string"
	},
	gapBtwIconQUestion: {
		type: "number",
		default : 10
	},
	questionloadGoogleFonts: {
		type: "boolean",
		default: false	
	},
	answerloadGoogleFonts: {
		type: "boolean",
		default: false	
	},
	questionFontFamily: {
		type: "string",
		default: "Default",
	},
	questionFontWeight: {
		type: "string",
	},
	questionFontSubset: {
		type: "string",
	},
	questionFontSize: {
		type: "number",
	},
	questionFontSizeType: {
		type: "string",
		default: "px"
	},
	questionFontSizeTablet: {
		type: "number",
	},
	questionFontSizeMobile: {
		type: "number",
	},
	questionLineHeight: {
		type: "number",
	},
	questionLineHeightType: {
		type: "string",
		default: "em"
	},
	questionLineHeightTablet: {
		type: "number",
	},
	questionLineHeightMobile: {
		type: "number",
	},
	answerFontFamily: {
		type: "string",
		default: "Default",
	},
	answerFontWeight: {
		type: "string",
	},
	answerFontSubset: {
		type: "string",
	},
	answerFontSize: {
		type: "number",
	},
	answerFontSizeType: {
		type: "string",
		default: "px"
	},
	answerFontSizeTablet: {
		type: "number",
	},
	answerFontSizeMobile: {
		type: "number",
	},
	answerLineHeight: {
		type: "number",
	},
	answerLineHeightType: {
		type: "string",
		default: "em"
	},
	answerLineHeightTablet: {
		type: "number",
	},
	answerLineHeightMobile: {
		type: "number",
	},
	icon: {
		type: "string",
		default: "fas fa-plus"
	},
	iconActive: {
		type: "string",
		default: "fas fa-minus"
	},
	iconAlign: {
		type: "string",
		default : "row"
	},
	iconSize: {
		type: "number",
		default : 15
	},
	iconSizeTablet: {
		type: "number",
		default : 15
	},
	iconSizeMobile: {
		type: "number",
		default : 15
	},
	iconSizeType: {
		type: "string",
		default: "px"
	},
	columns: {
		type: "number",
		default : 2
	},
	schema: {
		type: "string",
		default: ""
	},
	enableToggle: {
		type: "boolean",
		default: true	
	},
	equalHeight: {
		type: "boolean",
		default: true	
	},
}

export default attributes