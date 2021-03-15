/**
 * Returns Dynamic Generated CSS
 */

 import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
 import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"
 
 function styling( props ) {
 
	 const {
		 align,
		 excerptColor,
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
		 excerptFontFamily,
		 excerptFontWeight,
		 excerptFontSubset,
		 excerptFontSizeType,
		 excerptLineHeightType,
		 excerptFontSize,
		 excerptFontSizeTablet,
		 excerptFontSizeMobile,
		 excerptLineHeight,
		 excerptLineHeightTablet,
		 excerptLineHeightMobile,
		 excerptFontFamilyMobile,
		excerptFontSubsetMobile,
		excerptFontWeightMobile,
		excerptFontFamilyTablet,
		excerptFontSubsetTablet,
		excerptFontWeightTablet,
	 } = props.attributes
 
	 var selectors = {}
	 var tablet_selectors = {}
	 var mobile_selectors = {}
	 
	 selectors = {
		 ".uagb-post-excerpt__wrap" : {
			 "padding-left" : generateCSSUnit( leftPadding, desktopPaddingType ),
			 "padding-right" : generateCSSUnit( rightPadding, desktopPaddingType ),
			 "padding-top" : generateCSSUnit( topPadding, desktopPaddingType ),
			 "padding-bottom" : generateCSSUnit( bottomPadding, desktopPaddingType ),
			 'text-align': align,
		 },
		 ".uagb-post-excerpt__wrap .uagb-post-excerpt__text" : {
			 "color": excerptColor,
			 "font-family": excerptFontFamily,
			 "font-weight": excerptFontWeight,
			 "font-size": generateCSSUnit( excerptFontSize, excerptFontSizeType ),
			 "line-height": generateCSSUnit( excerptLineHeight, excerptLineHeightType ),
		 },
	 }
	 mobile_selectors = {
		 ".uagb-post-excerpt__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		 },
		 ".uagb-post-excerpt__wrap .uagb-post-excerpt__text": {
			"font-family": excerptFontFamilyMobile,
			"font-weight": excerptFontWeightMobile,
			 "font-size": generateCSSUnit( excerptFontSizeMobile, excerptFontSizeType ),
			 "line-height": generateCSSUnit( excerptLineHeightMobile, excerptLineHeightType ),
		 }
	 }
	 tablet_selectors = {
		 ".uagb-post-excerpt__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType )
		 },
		 "  .uagb-post-excerpt__text": {
			"font-family": excerptFontFamilyTablet,
			"font-weight": excerptFontWeightTablet,
			 "font-size": generateCSSUnit( excerptFontSizeTablet, excerptFontSizeType ),
			 "line-height": generateCSSUnit( excerptLineHeightTablet, excerptLineHeightType ),
		 }
	 }
	 var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`
 
	 var styling_css = generateCSS( selectors, id )
 
	 styling_css += generateCSS( tablet_selectors, id, true, "tablet" )
 
	 styling_css += generateCSS( mobile_selectors, id, true, "mobile" )
 
	 return styling_css
 }
 
 export default styling
 