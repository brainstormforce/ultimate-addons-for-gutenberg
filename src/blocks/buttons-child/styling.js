/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		fontFamily,
		fontWeight,
		size,
		vPadding,
		hPadding,
		borderWidth,
		borderRadius,
		borderStyle,
		borderColor,
		borderHColor,
		color,
		background,
		hColor,
		hBackground,
		sizeType,
		sizeMobile,
		sizeTablet,
		lineHeight,
		lineHeightType,
		lineHeightMobile,
		lineHeightTablet,
	} = props.attributes;

	var tablet_selectors = {}
	var mobile_selectors = {}

	var selectors = {
		" .uagb-buttons-repeater" : {
			"font-size" : generateCSSUnit( size, sizeType ),
			"line-height" : generateCSSUnit( lineHeight, lineHeightType ),
			"font-family": fontFamily,
			"font-weight": fontWeight,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-style": borderStyle,
			"border-color": borderColor,
			"border-radius" : generateCSSUnit( borderRadius, "px" ),
			"background": background
		},
		" .uagb-buttons-repeater:hover" : {
			"background": hBackground,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-style": borderStyle,
			"border-color": borderHColor,
		},
		" .uagb-buttons-repeater a.uagb-button__link" : {
			"padding" : vPadding + "px " + hPadding + "px",
			"color": color
		},
		" .uagb-buttons-repeater:hover a.uagb-button__link" : {
			"color": hColor
		},
		" .uagb-buttons-repeater:hover .uagb-button__link": {
			"color": hColor
		},
		" .uagb-buttons-repeater .uagb-button__link" : {
			"padding" : vPadding + "px " + hPadding + "px",
			"color": color
		},

	}

	mobile_selectors[" .uagb-buttons-repeater"] = {
		"font-size" : generateCSSUnit( sizeMobile, sizeType ),
		"line-height" : generateCSSUnit( lineHeightMobile, lineHeightType ),
	}

	tablet_selectors[" .uagb-buttons-repeater"] = {
		"font-size" : generateCSSUnit( sizeTablet, sizeType ),
		"line-height" : generateCSSUnit( lineHeightTablet, lineHeightType ),
	}

	var id = `.uagb-block-${ props.clientId }`
	var styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
