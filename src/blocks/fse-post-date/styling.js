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
		 dateColor,
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
		 dateFontFamily,
		 dateFontWeight,
		 dateFontSubset,
		 dateFontSizeType,
		 dateLineHeightType,
		 dateFontSize,
		 dateFontSizeTablet,
		 dateFontSizeMobile,
		 dateLineHeight,
		 dateLineHeightTablet,
		 dateLineHeightMobile,
	 } = props.attributes
 
	 var selectors = {}
	 var tablet_selectors = {}
	 var mobile_selectors = {}
	 
	 selectors = {
		 ".uagb-post-date__wrap" : {
			 "padding-left" : generateCSSUnit( leftPadding, desktopPaddingType ),
			 "padding-right" : generateCSSUnit( rightPadding, desktopPaddingType ),
			 "padding-top" : generateCSSUnit( topPadding, desktopPaddingType ),
			 "padding-bottom" : generateCSSUnit( bottomPadding, desktopPaddingType ),
			 'text-align': align,
		 },
		 ".uagb-post-date__wrap time" : {
			 "color": dateColor,
			 "font-family": dateFontFamily,
			 "font-weight": dateFontWeight,
			 "font-size": generateCSSUnit( dateFontSize, dateFontSizeType ),
			 "line-height": generateCSSUnit( dateLineHeight, dateLineHeightType ),
		 },
	 }
	 if(iconPosition === "before"){
		 selectors[".uagb-post-date__wrap .dashicons-calendar"] = {
			 "margin-right": generateCSSUnit( iconSpace, 'px' ),
			 "color": iconColor,
			 "font-size" : generateCSSUnit( iconSize, 'px' )
		 }
	 }
	 if(iconPosition === "after"){
		 selectors[".uagb-post-date__wrap .dashicons-calendar"] = {
			 "margin-left": generateCSSUnit( iconSpace, 'px' ),
			 "color": iconColor,
			 "font-size" : generateCSSUnit( iconSize, 'px' )
		 }
	 }
	 mobile_selectors = {
		 ".uagb-post-date__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		 },
		 ".uagb-post-date__wrap time": {
			 "font-size": generateCSSUnit( dateFontSizeMobile, dateFontSizeType ),
			 "line-height": generateCSSUnit( dateLineHeightMobile, dateLineHeightType ),
		 }
	 }
	 tablet_selectors = {
		 ".uagb-post-date__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType )
		 },
		 " time": {
			 "font-size": generateCSSUnit( dateFontSizeTablet, dateFontSizeType ),
			 "line-height": generateCSSUnit( dateLineHeightTablet, dateLineHeightType ),
		 }
	 }
	 var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`
 
	 var styling_css = generateCSS( selectors, id )
 
	 styling_css += generateCSS( tablet_selectors, id, true, "tablet" )
 
	 styling_css += generateCSS( mobile_selectors, id, true, "mobile" )
 
	 return styling_css
 }
 
 export default styling
 