/**
 * Returns Dynamic Generated CSS
 */
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit";

function inlineStyles( props, isEditor ) {

	const {
		align,
		contentWidth,
		leftPadding,
		rightPadding,
		topPadding,
		bottomPadding,
		leftMargin,
		rightMargin,
		topMargin,
		bottomMargin,
		width,
		backgroundPosition,
		backgroundSize,
		backgroundAttachment,
		backgroundImage,
		backgroundColor,
		backgroundOpacity,
		backgroundRepeat,
		backgroundType,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		desktopMarginType,
		desktopPaddingType,
	} = props.attributes;

	const style = {
		"padding-top": generateCSSUnit( topPadding, desktopPaddingType ),
		"padding-bottom": generateCSSUnit( bottomPadding, desktopPaddingType ),
		"padding-left": generateCSSUnit( leftPadding, desktopPaddingType ),
		"padding-right": generateCSSUnit( rightPadding, desktopPaddingType ),
		"border-radius": generateCSSUnit( borderRadius, "px" )
	};

	if ( "right" == align ) {
		style["margin-left"] = "auto";
		style["margin-top"] = generateCSSUnit( topMargin, desktopMarginType );
		style["margin-bottom"] =  generateCSSUnit( bottomMargin, desktopMarginType );
		style["margin-right"] =  generateCSSUnit( rightMargin, desktopMarginType );
	} else if ( "left" == align ) {
		style["margin-right"] = "auto";
		style["margin-top"] = generateCSSUnit( topMargin, desktopMarginType );
		style["margin-bottom"] =  generateCSSUnit( bottomMargin, desktopMarginType );
		style["margin-left"] =  generateCSSUnit( leftMargin, desktopMarginType );
	} else if ( "center" == align ) {
		style["margin-right"] = "auto";
		style["margin-left"] = "auto";
		style["margin-top"] = generateCSSUnit( topMargin, desktopMarginType );
		style["margin-bottom"] =  generateCSSUnit( bottomMargin, desktopMarginType );
	} else {
		style["margin-top"] = generateCSSUnit( topMargin, desktopMarginType );
		style["margin-bottom"] =  generateCSSUnit( bottomMargin, desktopMarginType );
	}

	if ( borderStyle != "none" ) {
		style["border-style"] = borderStyle;
		style["border-width"] = generateCSSUnit( borderWidth, "px" );
		style["border-color"] =  borderColor;
	}

	const position = backgroundPosition.replace( "-", " " );

	let section_width = "100%";

	if ( "boxed" == contentWidth ) {
		if ( "" != width ) {
			section_width = width + "px";
		}
	}

	style["max-width"] = section_width;


	if ( "image" === backgroundType ) {

		style["background-image"] = ( backgroundImage ) ? `url(${ backgroundImage.url })` : null;
		style["background-position"] = position;
		style["background-attachment"] = backgroundAttachment;
		style["background-repeat"] = backgroundRepeat;
		style["background-size"] = backgroundSize;

	}

	return style;
}

export default inlineStyles;