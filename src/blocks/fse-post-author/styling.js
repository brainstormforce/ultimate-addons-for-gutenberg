/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		align,
		iconColor,
		iconPosition,
		iconSpace,
		iconSize,
		authorColor,
		mobilePaddingType,
		tabletPaddingType,
		desktopPaddingType,
		topPadding,
		bottomPadding,
		leftPadding,
		rightPadding,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
		authorFontFamily,
		authorFontWeight,
		authorFontSubset,
		authorFontSizeType,
		authorLineHeightType,
		authorFontSize,
		authorFontSizeTablet,
		authorFontSizeMobile,
		authorLineHeight,
		authorLineHeightTablet,
		authorLineHeightMobile,
	} = props.attributes

	var selectors = {}
	var tablet_selectors = {}
	var mobile_selectors = {}
	
	selectors = {
		".uagb-post-author__wrap" : {
			"padding-left" : generateCSSUnit( leftPadding, desktopPaddingType ),
			"padding-right" : generateCSSUnit( rightPadding, desktopPaddingType ),
			"padding-top" : generateCSSUnit( topPadding, desktopPaddingType ),
			"padding-bottom" : generateCSSUnit( bottomPadding, desktopPaddingType ),
			'text-align': align,
		},
		".uagb-post-author__wrap .uagb-post-author__name" : {
			"color": authorColor,
			"font-family": authorFontFamily,
			"font-weight": authorFontWeight,
			"font-size": generateCSSUnit( authorFontSize, authorFontSizeType ),
			"line-height": generateCSSUnit( authorLineHeight, authorLineHeightType ),
		},
	}
	if(iconPosition === "before"){
		selectors[".uagb-post-author__wrap .dashicons-admin-users"] = {
			"margin-right": generateCSSUnit( iconSpace, 'px' ),
			"color": iconColor,
			"font-size" : generateCSSUnit( iconSize, 'px' )
		}
	}
	if(iconPosition === "after"){
		selectors[".uagb-post-author__wrap .dashicons-admin-users"] = {
			"margin-left": generateCSSUnit( iconSpace, 'px' ),
			"color": iconColor,
			"font-size" : generateCSSUnit( iconSize, 'px' )
		}
	}
	mobile_selectors = {
		".uagb-post-author__wrap" : {
			"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		},
	}
	tablet_selectors = {
		".uagb-post-author__wrap" : {
			"padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			"padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			"padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType )
		}
	}
	var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`

	var styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
