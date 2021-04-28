/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS";
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit";

function styling( props ) {

	const {
		classMigrate,
		align,
		gap,
		social_layout,
		borderRadius,
		size,
		sizeType,
		sizeMobile,
		sizeTablet,
		bgSize,
		stack
	} = props.attributes;

	const selectors = {};
	const tablet_selectors = {};
	const mobile_selectors = {};

	selectors[".uagb-social-share__layout-vertical .uagb-ss__wrapper"] = {
		"padding": generateCSSUnit( bgSize, "px" ),
		"margin-left" : 0,
		"margin-right" : 0,
		"margin-bottom" : generateCSSUnit( gap, "px" )
	};

	selectors[".uagb-social-share__layout-vertical .uagb-social-share__wrap"] = {
		 "flex-direction": "column"
	};

	selectors[".uagb-social-share__layout-horizontal .uagb-ss__wrapper"] = {
		"padding": generateCSSUnit( bgSize, "px" ),
		"margin-left" : generateCSSUnit( ( gap/2 ), "px" ),
		"margin-right" : generateCSSUnit( ( gap/2 ), "px" )
	};

	selectors[" .uagb-ss__wrapper"] = {
		"border-radius": generateCSSUnit( borderRadius, "px" )
	};

	selectors[" .uagb-ss__source-image"] = {
		"width": generateCSSUnit( size, sizeType )
	};

	selectors[" .uagb-ss__source-wrap"] = {
		"width": generateCSSUnit( size, sizeType ),
	};

	selectors[" .uagb-ss__source-wrap svg"] = {
		"width": generateCSSUnit( size, sizeType ),
		"height": generateCSSUnit( size, sizeType ),
	};

	selectors[" .uagb-ss__source-icon"] = {
		"width": generateCSSUnit( size, sizeType ),
		"height": generateCSSUnit( size, sizeType ),
		"font-size": generateCSSUnit( size, sizeType ),
		"line-height": generateCSSUnit( size, sizeType )
	};

	const alignment = ( align == "left" ) ? "flex-start" : ( ( align == "right" ) ? "flex-end" : "center" );

	selectors[" .uagb-social-share__wrap .block-editor-inner-blocks"] = {
		"text-align": align
	};

	selectors[" .uagb-social-share__wrap"] = {
		"justify-content" : alignment,
		"-webkit-box-pack": alignment,
		"-ms-flex-pack": alignment,
		"-webkit-box-align": alignment,
		"-ms-flex-align": alignment,
		"align-items": alignment,
	};

	if ( "horizontal" == social_layout ) {

		if ( "desktop" == stack ) {

			selectors[".uagb-social-share__layout-horizontal .block-editor-inner-blocks > .block-editor-block-list__layout"] = {
				"flex-direction" : "column"
			};

			selectors[" .uagb-ss__wrapper"] = {
				"margin-left" : 0,
				"margin-right" : 0,
				"margin-bottom" : generateCSSUnit( gap, "px" )
			};

			selectors[" .uagb-social-share__wrap"] = {
				"flex-direction": "column",
				"justify-content" : alignment,
				"-webkit-box-pack": alignment,
				"-ms-flex-pack": alignment,
				"-webkit-box-align": alignment,
				"-ms-flex-align": alignment,
				"align-items": alignment,
			};

		} else if ( "tablet" == stack ) {

			tablet_selectors[" .uagb-ss__wrapper"] = {
				"margin-left" : 0,
				"margin-right" : 0,
				"margin-bottom" : generateCSSUnit( gap, "px" )
			};

			tablet_selectors[" .uagb-social-share__wrap"] = {
				"flex-direction": "column"
			};

			tablet_selectors[".uagb-social-share__layout-horizontal .uagb-ss__wrapper"] = {
				"margin-left" : 0,
				"margin-right" : 0
			};

		} else if ( "mobile" == stack ) {

			mobile_selectors[" .uagb-ss__wrapper"] = {
				"margin-left" : 0,
				"margin-right" : 0,
				"margin-bottom" : generateCSSUnit( gap, "px" )
			};

			mobile_selectors[" .uagb-social-share__wrap"] = {
				"flex-direction": "column"
			};

			mobile_selectors[".uagb-social-share__layout-horizontal .uagb-ss__wrapper"] = {
				"margin-left" : 0,
				"margin-right" : 0
			};

		}
	}

	mobile_selectors[" .uagb-ss__source-image"] = {
		"width": generateCSSUnit( sizeMobile, sizeType )
	};

	mobile_selectors[" .uagb-ss__source-wrap"] = {
		"width": generateCSSUnit( sizeMobile, sizeType ),
		"height": generateCSSUnit( sizeMobile, sizeType ),
		"line-height": generateCSSUnit( sizeMobile, sizeType )
	};

	mobile_selectors[" .uagb-ss__source-wrap svg"] = {
		"width": generateCSSUnit( sizeMobile, sizeType ),
		"height": generateCSSUnit( sizeMobile, sizeType ),
	};

	mobile_selectors[" .uagb-ss__source-icon"] = {
		"width": generateCSSUnit( sizeMobile, sizeType ),
		"height": generateCSSUnit( sizeMobile, sizeType ),
		"font-size": generateCSSUnit( sizeMobile, sizeType ),
		"line-height": generateCSSUnit( sizeMobile, sizeType )
	};


	tablet_selectors[" .uagb-ss__source-image"] = {
		"width": generateCSSUnit( sizeTablet, sizeType )
	};

	tablet_selectors[" .uagb-ss__source-wrap"] = {
		"width": generateCSSUnit( sizeTablet, sizeType ),
		"height": generateCSSUnit( sizeTablet, sizeType ),
		"line-height": generateCSSUnit( sizeTablet, sizeType )
	};

	tablet_selectors[" .uagb-ss__source-wrap svg"] = {
		"width": generateCSSUnit( sizeTablet, sizeType ),
		"height": generateCSSUnit( sizeTablet, sizeType ),
	};

	tablet_selectors[" .uagb-ss__source-icon"] = {
		"width": generateCSSUnit( sizeTablet, sizeType ),
		"height": generateCSSUnit( sizeTablet, sizeType ),
		"font-size": generateCSSUnit( sizeTablet, sizeType ),
		"line-height": generateCSSUnit( sizeTablet, sizeType )
	};

	let styling_css = "";
	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;

	styling_css = generateCSS( selectors, id );

	styling_css += generateCSS( tablet_selectors, `${id}.uagb-editor-preview-mode-tablet`, true, "tablet" );

	styling_css += generateCSS( mobile_selectors, `${id}.uagb-editor-preview-mode-mobile`, true, "mobile" );

	return styling_css;
}

export default styling;
