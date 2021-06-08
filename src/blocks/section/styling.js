/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles"
import generateCSS from "@Controls/generateCSS"
import generateCSSUnit from "@Controls/generateCSSUnit"

function styling( props ) {

	const {
		classMigrate,
		backgroundType,
		backgroundVideoColor,
		backgroundImageColor,
		backgroundOpacity,
		backgroundColor,
		backgroundVideoOpacity,
		innerWidth,
		innerWidthType,
		contentWidth,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		gradientPosition,
		borderRadius,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topMarginTablet,
		bottomMarginTablet,
		leftMarginTablet,
		rightMarginTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
		topMarginMobile,
		bottomMarginMobile,
		leftMarginMobile,
		rightMarginMobile,
		align,
		overlayType,
		gradientOverlayColor1,
		gradientOverlayColor2,
		gradientOverlayType,
		gradientOverlayLocation1,
		gradientOverlayLocation2,
		gradientOverlayAngle,
		gradientOverlayPosition,
		mobileMarginType,
		tabletMarginType,
		mobilePaddingType,
		tabletPaddingType,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
		gradientValue
	} = props.attributes

	var inner_width = "100%"

	if( typeof contentWidth != "undefined" ) {
		if ( "boxed" != contentWidth ) {
			if ( typeof innerWidth != "undefined" ) {
				inner_width = generateCSSUnit( innerWidth, innerWidthType )
			}
		}
	}

	var tablet_selectors = {}
	var mobile_selectors = {}
	var boxShadowPositionCSS = boxShadowPosition;

	if ( 'outset' === boxShadowPosition ) {
		boxShadowPositionCSS = '';
	}
	var selectors = {
		".uagb-section__wrap" : inlineStyles( props ),
		" .uagb-section__video-wrap": {
			"opacity" : ( typeof backgroundVideoOpacity != "undefined" ) ? ( 100 - backgroundVideoOpacity )/100 : 0.5
		},
		" .uagb-section__inner-wrap": {
			"max-width" : inner_width
		},
		".wp-block-uagb-section": {
			"box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
		}
	}

	selectors[" > .uagb-section__overlay"] = {}

	if ( "video" == backgroundType ) {
		selectors[" > .uagb-section__overlay"] = {
			"opacity" : 1,
			"background-color": backgroundVideoColor
		}
	} else if( "image" == backgroundType ) {
		if( "color" == overlayType ){
			selectors[" > .uagb-section__overlay"] = {
				"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : 0,
				"background-color": backgroundImageColor
			}
		}else{
			selectors[" > .uagb-section__overlay"]["background-color"] = "transparent"
			selectors[" > .uagb-section__overlay"]["opacity"] = ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : ""

			if ( "linear" === gradientOverlayType ) {

				selectors[" > .uagb-section__overlay"]["background-image"] = `linear-gradient(${ gradientOverlayAngle }deg, ${ gradientOverlayColor1 } ${ gradientOverlayLocation1 }%, ${ gradientOverlayColor2 } ${ gradientOverlayLocation2 }%)`
			} else {

				selectors[" > .uagb-section__overlay"]["background-image"] = `radial-gradient( at ${ gradientOverlayPosition }, ${ gradientOverlayColor1 } ${ gradientOverlayLocation1 }%, ${ gradientOverlayColor2 } ${ gradientOverlayLocation2 }%)`
			}
		}
	} else if( "color" == backgroundType ) {
		selectors[" > .uagb-section__overlay"] = {
			"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : "",
			"background-color" : backgroundColor
		}
	} else if ( "gradient" === backgroundType ) {
		selectors[" > .uagb-section__overlay"]["background-color"] = "transparent"
		selectors[" > .uagb-section__overlay"]["opacity"] = ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : ""

		if(gradientValue){
			selectors[" > .uagb-section__overlay"]["background-image"] = gradientValue
		}else{
			if ( "linear" === gradientType ) {

				selectors[" > .uagb-section__overlay"]["background-image"] = `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
			} else {
	
				selectors[" > .uagb-section__overlay"]["background-image"] = `radial-gradient( at ${ gradientPosition }, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
			}
		}
		
	}

	selectors[" > .uagb-section__overlay"]["border-radius"] = generateCSSUnit( borderRadius, "px" )

	tablet_selectors = {
		".uagb-section__wrap" : {
			"padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			"padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			"padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType ),
		}
	}

	mobile_selectors = {
		".uagb-section__wrap" : {
			"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		}
	}
	tablet_selectors[".uagb-section__wrap"]["margin-top"] = generateCSSUnit( topMarginTablet, tabletMarginType )
	tablet_selectors[".uagb-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginTablet, tabletMarginType )
	mobile_selectors[".uagb-section__wrap"]["margin-top"] = generateCSSUnit( topMarginMobile,mobileMarginType )
	mobile_selectors[".uagb-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginMobile,mobileMarginType )

	if ( "right" == align && 'boxed' == contentWidth) {
		mobile_selectors[".uagb-section__wrap"]["margin-right"] =  generateCSSUnit( rightMarginMobile,mobileMarginType )
		tablet_selectors[".uagb-section__wrap"]["margin-right"] =  generateCSSUnit( rightMarginTablet, tabletMarginType )
	} else if ( "left" == align  && 'boxed' == contentWidth ) {
		mobile_selectors[".uagb-section__wrap"]["margin-left"] =  generateCSSUnit( leftMarginMobile,mobileMarginType )
		tablet_selectors[".uagb-section__wrap"]["margin-left"] =  generateCSSUnit( leftMarginTablet, tabletMarginType )
	}
	if("full_width" == contentWidth){
		tablet_selectors[".uagb-section__wrap"]["margin-left"] =  generateCSSUnit( leftMarginTablet, tabletMarginType )
		tablet_selectors[".uagb-section__wrap"]["margin-right"] =  generateCSSUnit( rightMarginTablet, tabletMarginType )
		mobile_selectors[".uagb-section__wrap"]["margin-left"] =  generateCSSUnit( leftMarginMobile,mobileMarginType )
		mobile_selectors[".uagb-section__wrap"]["margin-right"] =  generateCSSUnit( rightMarginMobile,mobileMarginType )
	}
	var styling_css = ""
	var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`

	styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, `${id}.uagb-editor-preview-mode-tablet`, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, `${id}.uagb-editor-preview-mode-mobile`, true, "mobile" )

	return styling_css
}

export default styling
