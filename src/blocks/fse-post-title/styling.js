/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		titleAlign,
		titleTag,
		titleColor,
		titleFontFamily,
		titleFontWeight,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleLineHeight,
		titleLineHeightType,
		titleLineHeightMobile,
		titleLineHeightTablet,
	} = props.attributes

	var tablet_selectors = {}
	var mobile_selectors = {}
	var selectors = {}

	selectors[" " + titleTag + ".uagb-post-title__text"] = {
		"font-family": titleFontFamily,
		"font-weight": titleFontWeight,
		"font-size": generateCSSUnit( titleFontSize, titleFontSizeType ),
		"line-height": generateCSSUnit( titleLineHeight, titleLineHeightType ),
		"color": titleColor,
		"text-align":titleAlign,
	}

	tablet_selectors[" " + titleTag + ".uagb-post-title__text"] = {
		"font-size": generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),
		"line-height": generateCSSUnit( titleLineHeightTablet, titleLineHeightType ),
	}

	mobile_selectors[" " + titleTag + ".uagb-post-title__text"] = {
		"font-size": generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),
		"line-height": generateCSSUnit( titleLineHeightMobile, titleLineHeightType ),
	}

	var base_selector = `.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr( 0, 8 ) }`

	var styling_css = generateCSS( selectors, base_selector )

	styling_css += generateCSS( tablet_selectors, base_selector, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, base_selector, true, "mobile" )

	return styling_css
}

export default styling
