/**
 * Returns Dynamic Generated CSS
 */

 import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
 import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"
 
 function styling( props ) {
 
	 const {
		 align,
		 navigationColor,
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
		 navigationFontFamily,
		 navigationFontWeight,
		 navigationFontSubset,
		 navigationFontSizeType,
		 navigationLineHeightType,
		 navigationFontSize,
		 navigationFontSizeTablet,
		 navigationFontSizeMobile,
		 navigationLineHeight,
		 navigationLineHeightTablet,
		 navigationLineHeightMobile,
		 navMobilePaddingType,
		navDesktopPaddingType,
		navTabletPaddingType,
		navTopPaddingMobile,
		navBottomPaddingMobile,
		navLeftPaddingMobile,
		navRightPaddingMobile,
		navTopPaddingTablet,
		navBottomPaddingTablet,
		navLeftPaddingTablet,
		navRightPaddingTablet,
		navTopPadding,
		navBottomPadding,
		navLeftPadding,
		navRightPadding,
		navigationBgColor
	 } = props.attributes
 
	 var selectors = {}
	 var tablet_selectors = {}
	 var mobile_selectors = {}
	 
	 selectors = {
		 ".uagb-fse-navigation__wrap" : {
			 "padding-left" : generateCSSUnit( leftPadding, desktopPaddingType ),
			 "padding-right" : generateCSSUnit( rightPadding, desktopPaddingType ),
			 "padding-top" : generateCSSUnit( topPadding, desktopPaddingType ),
			 "padding-bottom" : generateCSSUnit( bottomPadding, desktopPaddingType ),
			 'text-align': align,
			 "background-color":navigationBgColor
		 },
		 " .uagb-menu-list" : {
			"padding-left" : generateCSSUnit( navLeftPadding, navDesktopPaddingType ),
			"padding-right" : generateCSSUnit( navRightPadding, navDesktopPaddingType ),
			"padding-top" : generateCSSUnit( navTopPadding, navDesktopPaddingType ),
			"padding-bottom" : generateCSSUnit( navBottomPadding, navDesktopPaddingType ),
		},
		 ".uagb-fse-navigation__wrap .uagb-menu-list" : {
			 "color": navigationColor,
			 "font-family": navigationFontFamily,
			 "font-weight": navigationFontWeight,
			 "font-size": generateCSSUnit( navigationFontSize, navigationFontSizeType ),
			 "line-height": generateCSSUnit( navigationLineHeight, navigationLineHeightType ),
		 },
	 }
	 mobile_selectors = {
		 ".uagb-fse-navigation__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		 },
		 ".uagb-fse-navigation__wrap .uagb-menu-list": {
			 "font-size": generateCSSUnit( navigationFontSizeMobile, navigationFontSizeType ),
			 "line-height": generateCSSUnit( navigationLineHeightMobile, navigationLineHeightType ),
		 },
		 " .uagb-menu-list" : {
			"padding-left" : generateCSSUnit( navLeftPaddingMobile, navMobilePaddingType ),
			"padding-right" : generateCSSUnit( navRightPaddingMobile, navMobilePaddingType ),
			"padding-top" : generateCSSUnit( navTopPaddingMobile, navMobilePaddingType ),
			"padding-bottom" : generateCSSUnit( navBottomPaddingMobile, navMobilePaddingType ),
		},
	 }
	 tablet_selectors = {
		 ".uagb-fse-navigation__wrap" : {
			 "padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			 "padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			 "padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			 "padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType )
		 },
		 " .uagb-menu-list": {
			 "font-size": generateCSSUnit( navigationFontSizeTablet, navigationFontSizeType ),
			 "line-height": generateCSSUnit( navigationLineHeightTablet, navigationLineHeightType ),
		 },
		 " .uagb-menu-list" : {
			"padding-left" : generateCSSUnit( navLeftPaddingTablet, navTabletPaddingType ),
			"padding-right" : generateCSSUnit( navRightPaddingTablet, navTabletPaddingType ),
			"padding-top" : generateCSSUnit( navTopPaddingTablet, navTabletPaddingType ),
			"padding-bottom" : generateCSSUnit( navBottomPaddingTablet, navTabletPaddingType ),
		},
	 }
	 var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`
 
	 var styling_css = generateCSS( selectors, id )
 
	 styling_css += generateCSS( tablet_selectors, id, true, "tablet" )
 
	 styling_css += generateCSS( mobile_selectors, id, true, "mobile" )
 
	 return styling_css
 }
 
 export default styling
 