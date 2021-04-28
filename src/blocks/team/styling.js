/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS";
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit";

function styling( props ) {

	const {
		classMigrate,
		tag,
		align,
		titleColor,
		prefixColor,
		descColor,
		titleFontFamily,
		titleFontWeight,
		titleFontSizeType,
		titleFontSize,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleLineHeightType,
		titleLineHeight,
		prefixFontFamily,
		prefixFontWeight,
		prefixFontSizeType,
		prefixFontSize,
		prefixFontSizeMobile,
		prefixFontSizeTablet,
		prefixLineHeightType,
		prefixLineHeight,
		descFontFamily,
		descFontWeight,
		descFontSizeType,
		descFontSize,
		descFontSizeMobile,
		descFontSizeTablet,
		descLineHeightType,
		descLineHeight,
		socialFontSize,
		socialFontSizeType,
		socialFontSizeMobile,
		socialFontSizeTablet,
		imgAlign,
		imgWidth,
		imgPosition,
		titleSpace,
		descSpace,
		prefixSpace,
		imgLeftMargin,
		imgRightMargin,
		imgTopMargin,
		imgBottomMargin,
		socialColor,
		socialHoverColor,
		socialSpace,
	} = props.attributes;

	let tablet_selectors = {};
	let mobile_selectors = {};

	const selectors = {
		" p.uagb-team__desc.block-editor-rich-text__editable": {
			"font-size": generateCSSUnit( descFontSize, descFontSizeType ),
			"line-height": generateCSSUnit( descLineHeight, descLineHeightType ),
			"font-family": descFontFamily,
			"font-weight": descFontWeight,
			"color": descColor,
			"margin-bottom": generateCSSUnit( descSpace, "px" ),
		},
		" .rich-text.block-editor-rich-text__editable.uagb-team__prefix": {
			"font-family": prefixFontFamily,
			"font-weight": prefixFontWeight,
			"font-size": generateCSSUnit( prefixFontSize, prefixFontSizeType ),
			"line-height": generateCSSUnit( prefixLineHeight, prefixLineHeightType ),
			"color": prefixColor,
		},
		" .uagb-team__desc-wrap": {
			"margin-top": generateCSSUnit( prefixSpace, "px" ),
		},
		" .uagb-team__social-icon a": {
			"color": socialColor,
			"font-size": generateCSSUnit( socialFontSize, socialFontSizeType ),
			"width": generateCSSUnit( socialFontSize, socialFontSizeType ),
			"height": generateCSSUnit( socialFontSize, socialFontSizeType ),
			"line-height": generateCSSUnit( socialFontSize, socialFontSizeType ),
		},
		" .uagb-team__social-icon svg": {
			"fill": socialColor,
			"width": generateCSSUnit( socialFontSize, socialFontSizeType ),
			"height": generateCSSUnit( socialFontSize, socialFontSizeType ),
		},
		" .uagb-team__social-icon:hover a": {
			"color": socialHoverColor,
		},
		" .uagb-team__social-icon:hover svg": {
			"fill": socialHoverColor
		},
		".uagb-team__image-position-left .uagb-team__social-icon" : {
			"margin-right": generateCSSUnit( socialSpace, "px" ),
			"margin-left": "0",
		},
		".uagb-team__image-position-right .uagb-team__social-icon" : {
			"margin-left": generateCSSUnit( socialSpace, "px" ),
			"margin-right": "0",
		},
		".uagb-team__image-position-above.uagb-team__align-center .uagb-team__social-icon" : {
			"margin-right": generateCSSUnit( ( socialSpace / 2 ), "px" ),
			"margin-left": generateCSSUnit( ( socialSpace / 2 ), "px" ),
		},
		".uagb-team__image-position-above.uagb-team__align-left .uagb-team__social-icon" : {
			"margin-right": generateCSSUnit( socialSpace, "px" ),
			"margin-left": "0",
		},
		".uagb-team__image-position-above.uagb-team__align-right .uagb-team__social-icon" : {
			"margin-left": generateCSSUnit( socialSpace, "px" ),
			"margin-right": "0",
		},
		" .uagb-team__image-wrap" : {
			"margin-top": generateCSSUnit( imgTopMargin, "px" ),
			"margin-bottom": generateCSSUnit( imgBottomMargin, "px" ),
			"margin-left": generateCSSUnit( imgLeftMargin, "px" ),
			"margin-right": generateCSSUnit( imgRightMargin, "px" ),
			"width": generateCSSUnit( imgWidth, "px" )
		}
	};

	if ( "above" == imgPosition ) {
		if ( "center" == align ) {
			selectors[" .uagb-team__image-wrap"]["margin-left"] = "auto";
			selectors[" .uagb-team__image-wrap"]["margin-right"] = "auto";
		} else if ( "left" == align ) {
			selectors[" .uagb-team__image-wrap"]["margin-right"] = "auto";
		} else if ( "right" == align ) {
			selectors[" .uagb-team__image-wrap"]["margin-left"] = "auto";
		}
	}

	if ( "above" != imgPosition ) {
		if ( "middle" == imgAlign ) {
			selectors[" .uagb-team__image-wrap"]["align-self"] = "center";
		}
	}

	selectors[" " + tag + ".rich-text.block-editor-rich-text__editable.uagb-team__title"] = {
		"font-family": titleFontFamily,
		"font-weight": titleFontWeight,
		"font-size": generateCSSUnit( titleFontSize, titleFontSizeType ),
		"line-height": generateCSSUnit( titleLineHeight, titleLineHeightType ),
		"color": titleColor,
		"margin-bottom": generateCSSUnit( titleSpace, "px" ),
	};

	mobile_selectors = {
		" p.uagb-team__desc.block-editor-rich-text__editable": {
			"font-size": generateCSSUnit( descFontSizeMobile, descFontSizeType ),
		},
		" .rich-text.block-editor-rich-text__editable.uagb-team__prefix": {
			"font-size": generateCSSUnit( prefixFontSizeMobile, prefixFontSizeType ),
		},
		" .uagb-team__social-icon a": {
			"font-size": generateCSSUnit( socialFontSizeMobile, socialFontSizeType ),
			"width": generateCSSUnit( socialFontSizeMobile, socialFontSizeType ),
			"height": generateCSSUnit( socialFontSizeMobile, socialFontSizeType ),
			"line-height": generateCSSUnit( socialFontSizeMobile, socialFontSizeType ),
		},
		" .uagb-team__social-icon svg": {
			"width": generateCSSUnit( socialFontSizeMobile, socialFontSizeType ),
			"height": generateCSSUnit( socialFontSizeMobile, socialFontSizeType ),
		},
	};

	tablet_selectors = {
		" p.uagb-team__desc.block-editor-rich-text__editable": {
			"font-size": generateCSSUnit( descFontSizeTablet, descFontSizeType ),
		},
		" .rich-text.block-editor-rich-text__editable.uagb-team__prefix": {
			"font-size": generateCSSUnit( prefixFontSizeTablet, prefixFontSizeType ),
		},
		" .uagb-team__social-icon a": {
			"font-size": generateCSSUnit( socialFontSizeTablet, socialFontSizeType ),
			"width": generateCSSUnit( socialFontSizeTablet, socialFontSizeType ),
			"height": generateCSSUnit( socialFontSizeTablet, socialFontSizeType ),
			"line-height": generateCSSUnit( socialFontSizeTablet, socialFontSizeType ),
		},
		" .uagb-team__social-icon svg": {
			"width": generateCSSUnit( socialFontSizeTablet, socialFontSizeType ),
			"height": generateCSSUnit( socialFontSizeTablet, socialFontSizeType ),
		},
	};

	mobile_selectors[" " + tag + ".uagb-team__title"] = {
		"font-size": generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),
	};

	tablet_selectors[" " + tag + ".uagb-team__title"] = {
		"font-size": generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),
	};

	let styling_css = "";
	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;

	styling_css = generateCSS( selectors, id );

	styling_css += generateCSS( tablet_selectors, `${id}.uagb-editor-preview-mode-tablet`, true, "tablet" );

	styling_css += generateCSS( mobile_selectors, `${id}.uagb-editor-preview-mode-mobile`, true, "mobile" );

	return styling_css;
}

export default styling;
