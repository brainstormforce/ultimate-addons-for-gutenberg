/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles";
import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS";
import hexToRgba from "../../../dist/blocks/uagb-controls/hexToRgba";
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit";

function styling( props ) {

	const {
		classMigrate,
		backgroundType,
		backgroundVideoColor,
		backgroundImageColor,
		backgroundOpacity,
		backgroundColor,
		backgroundVideoOpacity,
		borderRadius,
		contentWidth,
		width,
		widthType,
		columnGap,
		topColor,
		topHeight,
		topHeightTablet,
		topHeightMobile,
		topWidth,
		bottomColor,
		bottomHeight,
		bottomHeightTablet,
		bottomHeightMobile,
		bottomWidth,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		gradientPosition,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
		topMarginMobile,
		bottomMarginMobile,
		topMarginTablet,
		bottomMarginTablet,
		topDividerOpacity,
		bottomDividerOpacity,
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
	} = props.attributes;

	let max_width = "100%";

	if ( "custom" == contentWidth ) {
		if ( "" != width ) {
			max_width = generateCSSUnit( width, widthType );
		}
	}
	let boxShadowPositionCSS = boxShadowPosition;

	if ( "outset" === boxShadowPosition ) {
		boxShadowPositionCSS = "";
	}
	
	let tablet_selectors = {};
	let mobile_selectors = {};

	const selectors = {
		".uagb-columns__wrap" : inlineStyles( props ),
		" .uagb-columns__video-wrap": {
			"opacity" : ( typeof backgroundVideoOpacity !== "undefined" ) ? ( 100 - backgroundVideoOpacity )/100 : 0.5
		},
		" > .uagb-columns__inner-wrap": {
			"max-width" : max_width
		},
		" .uagb-column__inner-wrap" : {
			"padding" : generateCSSUnit( columnGap, "px" )
		},
		" .uagb-columns__shape-top svg" : {
			width: "calc( " + topWidth + "% + 1.3px )",
			height: generateCSSUnit( topHeight, "px" )
		},
		" .uagb-columns__shape-top .uagb-columns__shape-fill" : {
			fill: hexToRgba( topColor, ( typeof topDividerOpacity !== "undefined" ) ? topDividerOpacity : 100 ),
		},
		" .uagb-columns__shape-bottom svg" : {
			width: "calc( " + bottomWidth + "% + 1.3px )",
			height: generateCSSUnit( bottomHeight, "px" )
		},
		" .uagb-columns__shape-bottom .uagb-columns__shape-fill" : {
			fill: hexToRgba( bottomColor, ( typeof bottomDividerOpacity !== "undefined" ) ? bottomDividerOpacity : 100 ),
		},
		".wp-block-uagb-columns": {
			"box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + " " + generateCSSUnit( boxShadowVOffset, "px" ) + " " + generateCSSUnit( boxShadowBlur, "px" ) + " " + generateCSSUnit( boxShadowSpread, "px" ) + " " + boxShadowColor + " " + boxShadowPositionCSS  
		},
	};

	selectors[" > .uagb-columns__overlay"] = {};

	if ( "video" == backgroundType ) {
		selectors[" > .uagb-columns__overlay"] = {
			"opacity" : 1,
			"background-color": backgroundVideoColor
		};
	} else if ( "image" == backgroundType ) {
		selectors[" > .uagb-columns__overlay"] = {
			"opacity" : ( typeof backgroundOpacity !== "undefined" ) ? backgroundOpacity/100 : "",
			"background-color": backgroundImageColor
		};
	} else if ( "color" == backgroundType ) {
		selectors[" > .uagb-columns__overlay"] = {
			"opacity" : ( typeof backgroundOpacity !== "undefined" ) ? backgroundOpacity/100 : "",
			"background-color" : backgroundColor
		};
	} else if ( "gradient" === backgroundType ) {

		selectors[" > .uagb-columns__overlay"]["background-color"] = "transparent";
		selectors[" > .uagb-columns__overlay"].opacity = ( typeof backgroundOpacity !== "undefined" ) ? backgroundOpacity/100 : "";
		if ( gradientValue ) {
			selectors[" > .uagb-columns__overlay"]["background-image"] = gradientValue;

		} else if ( "linear" === gradientType ) {

			selectors[" > .uagb-columns__overlay"]["background-image"] = `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`;
		} else {
	
			selectors[" > .uagb-columns__overlay"]["background-image"] = `radial-gradient( at ${ gradientPosition }, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`;
		}
		
	}

	selectors[" > .uagb-columns__overlay"]["border-radius"] = generateCSSUnit( borderRadius, "px" );

	tablet_selectors = {
		".uagb-columns__wrap" : {
			"padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			"padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			"padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType ),
			"margin-top": generateCSSUnit( topMarginTablet, tabletMarginType ),
			"margin-bottom": generateCSSUnit( bottomMarginTablet, tabletMarginType ),
		},
		" .uagb-columns__shape-top svg" : {
			height: generateCSSUnit( topHeightTablet, "px" )
		},
		" .uagb-columns__shape-bottom svg" : {
			height: generateCSSUnit( bottomHeightTablet, "px" )
		},
	};

	mobile_selectors = {
		".uagb-columns__wrap" : {
			"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
			"margin-top": generateCSSUnit( topMarginMobile, mobileMarginType ),
			"margin-bottom": generateCSSUnit( bottomMarginMobile, mobileMarginType ),
		},
		" .uagb-columns__shape-top svg" : {
			height: generateCSSUnit( topHeightMobile, "px" )
		},
		" .uagb-columns__shape-bottom svg" : {
			height: generateCSSUnit( bottomHeightMobile, "px" )
		},
	};

	let styling_css = "";
	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;

	styling_css = generateCSS( selectors, id );

	styling_css += generateCSS( tablet_selectors, `${id}.uagb-editor-preview-mode-tablet`, true, "tablet" );

	styling_css += generateCSS( mobile_selectors, `${id}.uagb-editor-preview-mode-mobile`, true, "mobile" );

	return styling_css;
}

export default styling;
