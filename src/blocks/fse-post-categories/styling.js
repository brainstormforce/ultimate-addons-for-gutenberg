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
		 categoriesColor,
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
		 categoriesFontFamily,
		 categoriesFontWeight,
		 categoriesFontSubset,
		 categoriesFontSizeType,
		 categoriesLineHeightType,
		 categoriesFontSize,
		 categoriesFontSizeTablet,
		 categoriesFontSizeMobile,
		 categoriesLineHeight,
		 categoriesLineHeightTablet,
		 categoriesLineHeightMobile,
	 } = props.attributes
 
	 var selectors = {}
	 var tablet_selectors = {}
	 var mobile_selectors = {}
	 
	 selectors = {
		 ".uagb-post-categories__wrap" : {
			 "padding-left" : generateCSSUnit( leftPadding, desktopPaddingType ),
			 "padding-right" : generateCSSUnit( rightPadding, desktopPaddingType ),
			 "padding-top" : generateCSSUnit( topPadding, desktopPaddingType ),
			 "padding-bottom" : generateCSSUnit( bottomPadding, desktopPaddingType ),
			 'text-align': align,
		 },
		 ".uagb-post-categories__wrap .uagb-post-categories__name" : {
			 "color": categoriesColor,
			 "font-family": categoriesFontFamily,
			 "font-weight": categoriesFontWeight,
			 "font-size": generateCSSUnit( categoriesFontSize, categoriesFontSizeType ),
			 "line-height": generateCSSUnit( categoriesLineHeight, categoriesLineHeightType ),
		 },
	 }
	 if(iconPosition === "before"){
		 selectors[".uagb-post-categories__wrap .dashicons-tag"] = {
			 "margin-right": generateCSSUnit( iconSpace, 'px' ),
			 "color": iconColor,
			 "font-size" : generateCSSUnit( iconSize, 'px' )
		 }
	 }
	 if(iconPosition === "after"){
		 selectors[".uagb-post-categories__wrap .dashicons-tag"] = {
			 "margin-left": generateCSSUnit( iconSpace, 'px' ),
			 "color": iconColor,
			 "font-size" : generateCSSUnit( iconSize, 'px' )
		 }
	 }
	 mobile_selectors = {
		 ".uagb-post-categories__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		 },
		 ".uagb-post-categories__wrap .uagb-post-categories__name": {
			 "font-size": generateCSSUnit( categoriesFontSizeMobile, categoriesFontSizeType ),
			 "line-height": generateCSSUnit( categoriesLineHeightMobile, categoriesLineHeightType ),
		 }
	 }
	 tablet_selectors = {
		 ".uagb-post-categories__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType )
		 },
		 " .uagb-post-categories__name": {
			 "font-size": generateCSSUnit( categoriesFontSizeTablet, categoriesFontSizeType ),
			 "line-height": generateCSSUnit( categoriesLineHeightTablet, categoriesLineHeightType ),
		 }
	 }
	 var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`
 
	 var styling_css = generateCSS( selectors, id )
 
	 styling_css += generateCSS( tablet_selectors, id, true, "tablet" )
 
	 styling_css += generateCSS( mobile_selectors, id, true, "mobile" )
 
	 return styling_css
 }
 
 export default styling
 