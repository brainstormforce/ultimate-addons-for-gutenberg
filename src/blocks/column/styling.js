/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles"
import generateCSS from "@Controls/generateCSS"
import generateCSSUnit from "@Controls/generateCSSUnit"

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

	tablet_selectors[" .uagb-editor-preview-mode-tablet"] = {
		"padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
		"padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
		"padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
		"padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType ),
		"margin-top": generateCSSUnit( topMarginTablet, tabletMarginType ),
		"margin-bottom": generateCSSUnit( bottomMarginTablet, tabletMarginType ),
		"margin-left": generateCSSUnit( leftMarginTablet, tabletMarginType ),
		"margin-right": generateCSSUnit( rightMarginTablet, tabletMarginType ),
	}

	mobile_selectors[" .uagb-editor-preview-mode-mobile"] ={
		"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
		"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
		"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
		"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		"margin-top": generateCSSUnit( topMarginMobile, mobileMarginType ),
		"margin-bottom": generateCSSUnit( bottomMarginMobile, mobileMarginType ),
		"margin-left": generateCSSUnit( leftMarginMobile, mobileMarginType ),
		"margin-right": generateCSSUnit( rightMarginMobile, mobileMarginType ),
	}

	if ( colWidth != "" && colWidth != 0 ) {
		selectors[".block-editor-block-list__block"] = { "width" : colWidth + "%" }
	}

	if ( colWidthTablet != "" && colWidthTablet != 0 ) {
		tablet_selectors[".block-editor-block-list__block"] = { "width" : colWidthTablet + "%" }
	}

	if ( colWidthMobile != "" && colWidthMobile != 0 ) {
		mobile_selectors[".block-editor-block-list__block"] = { "width" : colWidthMobile + "%" }
	}

	var styling_css = ""

	var id = `#wpwrap .edit-post-visual-editor #block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
