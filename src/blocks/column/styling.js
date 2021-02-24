/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles"
import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		colWidth,
		colWidthTablet,
		colWidthMobile,

		topPadding,
		bottomPadding,
		leftPadding,
		rightPadding,
		topMargin,
		bottomMargin,
		leftMargin,
		rightMargin,

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

		backgroundType,
		backgroundImage,
		backgroundPosition,
		backgroundAttachment,
		backgroundRepeat,
		backgroundSize,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		mobileMarginType,
		tabletMarginType,
		desktopMarginType,
		mobilePaddingType,
		tabletPaddingType,
		desktopPaddingType,
	} = props.attributes

	var position = backgroundPosition.replace( "-", " " )
	var tablet_selectors = {}
	var mobile_selectors = {}
	var styling_css = ""
	var selectors_tab = ""
	var selectors_mob = ""

	var style = {
		"padding-top": generateCSSUnit( topPadding, desktopPaddingType ),
		"padding-bottom": generateCSSUnit( bottomPadding, desktopPaddingType ),
		"padding-left": generateCSSUnit( leftPadding, desktopPaddingType ),
		"padding-right": generateCSSUnit( rightPadding, desktopPaddingType ),
		"margin-top": generateCSSUnit( topMargin, desktopMarginType ),
		"margin-bottom": generateCSSUnit( bottomMargin, desktopMarginType ),
		"margin-left": generateCSSUnit( leftMargin, desktopMarginType ),
		"margin-right": generateCSSUnit( rightMargin, desktopMarginType ),
		"border-radius": generateCSSUnit( borderRadius, desktopMarginType ),
	}

	if ( borderStyle != "none" ) {
		style["border-style"] = borderStyle
		style["border-width"] = generateCSSUnit( borderWidth, "px" )
		style["border-color"] =  borderColor
	}

	if ( "image" === backgroundType ) {

		style["background-image"] = ( backgroundImage ) ? `url(${ backgroundImage.url })` : null
		style["background-position"] = position
		style["background-attachment"] = backgroundAttachment
		style["background-repeat"] = backgroundRepeat
		style["background-size"] = backgroundSize

	}

	var selectors = {
		":before" : inlineStyles( props ),
		"" : style
	}

	tablet_selectors = {
		"" : {
			"padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			"padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			"padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType ),
			"margin-top": generateCSSUnit( topMarginTablet, tabletMarginType ),
			"margin-bottom": generateCSSUnit( bottomMarginTablet, tabletMarginType ),
			"margin-left": generateCSSUnit( leftMarginTablet, tabletMarginType ),
			"margin-right": generateCSSUnit( rightMarginTablet, tabletMarginType ),
		}
	}

	mobile_selectors = {
		"" : {
			"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
			"margin-top": generateCSSUnit( topMarginMobile, mobileMarginType ),
			"margin-bottom": generateCSSUnit( bottomMarginMobile, mobileMarginType ),
			"margin-left": generateCSSUnit( leftMarginMobile, mobileMarginType ),
			"margin-right": generateCSSUnit( rightMarginMobile, mobileMarginType ),
		}
	}
	
	if ( colWidth != "" && colWidth != 0 ) {
		selectors[".block-editor-block-list__block"] = { "width" : colWidth + "%" }
	}

	if ( colWidthTablet != "" && colWidthTablet != 0 ) {

		var selectors_tab = {
			".block-editor-block-list__block" : { "width" : colWidthTablet + "%" },
			"" : ""
		}
		var id_tablet = `#wpwrap .edit-post-visual-editor .uagb-editor-preview-mode-tablet #block-${ props.clientId }`;

		styling_css = generateCSS( selectors_tab, id_tablet );
	}

	if ( colWidthMobile != "" && colWidthMobile != 0 ) {
		
		var selectors_mob = {
			".block-editor-block-list__block" : { "width" : colWidthMobile + "%" },
			"" : ""
		}
		var id_mob = `#wpwrap .edit-post-visual-editor .uagb-editor-preview-mode-mobile #block-${ props.clientId }`;

		styling_css += generateCSS( selectors_mob, id_mob );
	}

	var id = `#wpwrap .edit-post-visual-editor #block-${ props.clientId }`

	styling_css += generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
