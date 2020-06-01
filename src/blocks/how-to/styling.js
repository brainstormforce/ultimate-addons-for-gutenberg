/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		imgWidth,
		overallAlignment,
		headingTag,
		showTotaltimecolor,
		headingColor,
		headSpace,
		subHeadingColor,
		headFontFamily,
		headFontWeight,
		headFontSize,
		headFontSizeType,
		headFontSizeMobile,
		headFontSizeTablet,
		headLineHeight,
		headLineHeightType,
		headLineHeightMobile,
		headLineHeightTablet,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeMobile,
		subHeadFontSizeTablet,
		subHeadLineHeight,
		subHeadLineHeightType,
		subHeadLineHeightMobile,
		subHeadLineHeightTablet,
		priceFontSizeType,
		priceFontSize,
		priceFontSizeTablet,
		priceFontSizeMobile,
		priceFontFamily,
		priceFontWeight,
		priceFontSubset,
		priceLineHeightType,
		priceLineHeight,
		priceLineHeightTablet,
		priceLineHeightMobile,
		priceLoadGoogleFonts,
		timeSpace,
		costSpace,
		row_gap,
	} = props.attributes

	var tablet_selectors = {}
	var mobile_selectors = {}

	var selectors = {
		
		" .block-editor-rich-text__editable.uagb-howto-desc-text": {
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
		},
		' .uagb-how-to-main-wrap p': { 
			"margin-bottom" :generateCSSUnit( row_gap, 'px' ),
		 },

		 ' .uagb-how-to-main-wrap .uagb-howto__source-wrap': { 
			"margin-bottom" :generateCSSUnit( row_gap, 'px' ),
		 },

		' .uagb-how-to-main-wrap span.uagb-howto__time-wrap' : {
		   "margin-bottom" :generateCSSUnit( row_gap, 'px' ),
		},

		' .uagb-how-to-main-wrap span.uagb-howto__cost-wrap' : {
		    "margin-bottom" :generateCSSUnit( row_gap, 'px' ),
		},

		' .uagb-how-to-tools .uagb-how-to-tools-child__wrapper:last-child' : {
		 "margin-bottom" : generateCSSUnit( row_gap, 'px' ),
		 },

		' .uagb-how-to-materials .uagb-how-to-materials-child__wrapper:last-child' : {
		 "margin-bottom" :  generateCSSUnit( row_gap, 'px' ),
		 },
		" .block-editor-rich-text__editable.uagb-howto-timeNeeded-text": {
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},
		" .block-editor-rich-text__editable.uagb-howto-timeNeeded-value": {
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
			"margin-left" : generateCSSUnit( timeSpace,"px"),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeINmin-text ": {
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-text" :{
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-value" : {
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
			"margin-left" : generateCSSUnit( costSpace,"px"),
		},

		" .block-editor-rich-text__editable.uagb-howto-estcost-type": {
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
		},

		" .block-editor-rich-text__editable.uagb-howto-req-tools-text": {
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},

		"  .block-editor-rich-text__editable.uagb-tools__label":{
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
		},

		" .block-editor-rich-text__editable.uagb-howto-req-materials-text" : {
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},

		" .block-editor-rich-text__editable.uagb-howto-req-tools-text" : {
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},

		" .block-editor-rich-text__editable.uagb-howto-req-steps-text" : {
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},

		" .block-editor-rich-text__editable.uagb-howto-req-materials-text": {
			"font-family": priceFontFamily,
			"font-weight": priceFontWeight,
			"font-size": generateCSSUnit( priceFontSize, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeight, priceLineHeightType ),
			"color": showTotaltimecolor,
		},
		
		" .block-editor-rich-text__editable.uagb-materials__label":{
			"font-family": subHeadFontFamily,
			"font-weight": subHeadFontWeight,
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
			"color": subHeadingColor,
		},
	}

	selectors[" .uagb-how-to-main-wrap"] = {
		    "text-align": overallAlignment,
		    "display": "block",
	}

	selectors[" " + headingTag + ".block-editor-rich-text__editable.uagb-howto-heading-text"] = {
		"font-family": headFontFamily,
		"font-weight": headFontWeight,
		"font-size": generateCSSUnit( headFontSize, headFontSizeType ),
		"line-height": generateCSSUnit( headLineHeight, headLineHeightType ),
		"color": headingColor,
		"margin-bottom": generateCSSUnit( headSpace, "px" ),
	}

	mobile_selectors[" " + headingTag + ".block-editor-rich-text__editable.uagb-howto-heading-text"] = {
		"font-size": generateCSSUnit( headFontSizeMobile, headFontSizeType ),
		"line-height": generateCSSUnit( headLineHeightMobile, headLineHeightType ),
	}

	tablet_selectors[" " + headingTag + ".block-editor-rich-text__editable.uagb-howto-heading-text"] = {
		"font-size": generateCSSUnit( headFontSizeTablet, headFontSizeType ),
		"line-height": generateCSSUnit( headLineHeightTablet, headLineHeightType ),
	}

	mobile_selectors = {
		" .block-editor-rich-text__editable.uagb-howto-desc-text": {
			"font-size": generateCSSUnit( subHeadFontSizeMobile, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightMobile, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeNeeded-text" : {
			"font-size": generateCSSUnit( priceFontSizeMobile, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightMobile, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeNeeded-value" : {
			"font-size": generateCSSUnit( subHeadFontSizeMobile, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightMobile, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeINmin-text ": {
			"font-size": generateCSSUnit( subHeadFontSizeMobile, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightMobile, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-text" : {
			"font-size": generateCSSUnit( priceFontSizeMobile, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightMobile, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-value" : {
			"font-size": generateCSSUnit( subHeadFontSizeMobile, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightMobile, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-type": {
			"font-size": generateCSSUnit( subHeadFontSizeMobile, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightMobile, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-tools__label" : {
			"font-size": generateCSSUnit( priceFontSizeMobile, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightMobile, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-req-tools-text": {
			"font-size": generateCSSUnit( priceFontSizeMobile, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightMobile, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-materials__label" : {
			"font-size": generateCSSUnit( priceFontSizeMobile, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightMobile, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-req-materials-text": {
			"font-size": generateCSSUnit( priceFontSizeMobile, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightMobile, priceLineHeightType ),
		},
	}

	tablet_selectors = {
		" .block-editor-rich-text__editable.uagb-howto-desc-text": {
			"font-size": generateCSSUnit( subHeadFontSizeTablet, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightTablet, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeNeeded-text" : {
			"font-size": generateCSSUnit( priceFontSizeTablet, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightTablet, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeNeeded-value" : {
			"font-size": generateCSSUnit( subHeadFontSizeTablet, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightTablet, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-timeINmin-text ": {
			"font-size": generateCSSUnit( subHeadFontSizeTablet, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightTablet, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-text" : {
			"font-size": generateCSSUnit( priceFontSizeTablet, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightTablet, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-value" : {
			"font-size": generateCSSUnit( subHeadFontSizeTablet, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightTablet, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-estcost-type": {
			"font-size": generateCSSUnit( subHeadFontSizeTablet, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightTablet, subHeadLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-tools__label" : {
			"font-size": generateCSSUnit( priceFontSizeTablet, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightTablet, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-req-tools-text": {
			"font-size": generateCSSUnit( priceFontSizeTablet, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightTablet, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-materials__label" : {
			"font-size": generateCSSUnit( priceFontSizeTablet, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightTablet, priceLineHeightType ),
		},
		" .block-editor-rich-text__editable.uagb-howto-req-materials-text": {
			"font-size": generateCSSUnit( priceFontSizeTablet, priceFontSizeType ),
			"line-height": generateCSSUnit( priceLineHeightTablet, priceLineHeightType ),
		},
	}

	var base_selector = `.block-editor-page #wpwrap .uagb-block-${ props.clientId }`

	var styling_css = generateCSS( selectors, base_selector )

	styling_css += generateCSS( tablet_selectors, base_selector, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, base_selector, true, "mobile" )

	return styling_css
}

export default styling