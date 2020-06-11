/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		align,
		rowGap,
		columnGap,
		bgColor,
		contentPadding,
		contentPaddingMobile,
		titleColor,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleFontFamily,
		titleFontWeight,
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		metaFontSize,
		metaFontSizeType,
		metaFontSizeMobile,
		metaFontSizeTablet,
		metaFontFamily,
		metaFontWeight,
		metaLineHeightType,
		metaLineHeight,
		metaLineHeightTablet,
		metaLineHeightMobile,
		excerptFontSize,
		excerptFontSizeType,
		excerptFontSizeTablet,
		excerptFontSizeMobile,
		excerptFontFamily,
		excerptFontWeight,
		excerptLineHeightType,
		excerptLineHeight,
		excerptLineHeightTablet,
		excerptLineHeightMobile,
		ctaFontSize,
		ctaFontSizeType,
		ctaFontSizeTablet,
		ctaFontSizeMobile,
		ctaFontFamily,
		ctaFontWeight,
		ctaLineHeightType,
		ctaLineHeight,
		ctaLineHeightTablet,
		ctaLineHeightMobile,
		metaColor,
		excerptColor,
		ctaColor,
		ctaBgColor,
		ctaHColor,
		ctaBgHColor,
		titleBottomSpace,
		metaBottomSpace,
		excerptBottomSpace,
		overlayOpacity,
		bgOverlayColor,
		borderWidth,
		borderStyle,
		borderColor,
		borderHColor,
		borderRadius,
		btnVPadding,
		btnHPadding,
		linkBox,
		arrowColor,
		arrowSize,
		paginationBgActiveColor,
		paginationActiveColor,
		paginationBgColor,
		paginationColor,
		paginationLayout,
		paginationBorderSize,
		paginationBorderRadius,
		paginationBorderColor,
		paginationBorderActiveColor,
		paginationSpacing,
		paginationAlignment,
		inheritFromTheme,
		postPagination,
		paginationMarkup
	} = props.attributes

	var mobile_selectors = {}
	var tablet_selectors = {}

	var selectors = {
		" .uagb-post__items": {
			"margin-right" :  generateCSSUnit( ( -rowGap/2 ), "px" ),
			"margin-left" :  generateCSSUnit( ( -rowGap/2 ), "px" ),
		},
		" .uagb-post__items article": {
			"padding-right" : generateCSSUnit( ( rowGap/2 ) , "px" ),
			"padding-left" : generateCSSUnit( ( rowGap/2 ) , "px" ),
			"margin-bottom" : generateCSSUnit( ( columnGap ), "px" )
		},
		" .uagb-post__inner-wrap": {
			"background" : bgColor,
		},
		" .uagb-post__text": {
			"padding" : generateCSSUnit( ( contentPadding ), "px" ),
			"text-align" : align
		},
		" .uagb-post__text .uagb-post__title": {
			"margin-bottom": generateCSSUnit( titleBottomSpace, "px" )
		},
		" .uagb-post__text .uagb-post-grid-byline": {
			"margin-bottom": generateCSSUnit( metaBottomSpace, "px" )
		},
		" .uagb-post__text .uagb-post__excerpt": {
			"margin-bottom": generateCSSUnit( excerptBottomSpace, "px" )
		},
		" .uagb-post__image:before" : {
			"background-color" : bgOverlayColor,
			"opacity" : ( overlayOpacity / 100 )
		},
		" .uagb-post-pagination-wrap" : {
			"margin-top" : generateCSSUnit( paginationSpacing, "px" ),
			"text-align": paginationAlignment
		},
	}

	if ( ! inheritFromTheme ) {
		selectors[" .uagb-post__text .uagb-post__title"] = {
			"color": titleColor,
			"font-size": generateCSSUnit( titleFontSize, titleFontSizeType ),
			"font-family": titleFontFamily,
			"font-weight": titleFontWeight,
			"line-height": generateCSSUnit( titleLineHeight, titleLineHeightType ),
		}
		selectors[" .uagb-post__text .uagb-post__title a"] = {
			"color": titleColor,
			"font-size": generateCSSUnit( titleFontSize, titleFontSizeType ),
			"font-family": titleFontFamily,
			"font-weight": titleFontWeight,
			"line-height": generateCSSUnit( titleLineHeight, titleLineHeightType ),
		}
		selectors[" .uagb-post__text .uagb-post-grid-byline"] = {
			"color": metaColor,
			"font-size": generateCSSUnit( metaFontSize, metaFontSizeType ),
			"font-family": metaFontFamily,
			"font-weight": metaFontWeight,
			"line-height": generateCSSUnit( metaLineHeight, metaLineHeightType ),
		}
		selectors[" .uagb-post__text .uagb-post-grid-byline .uagb-post__author"] = {
			"color": metaColor,
			"font-size": generateCSSUnit( metaFontSize, metaFontSizeType ),
			"font-family": metaFontFamily,
			"font-weight": metaFontWeight,
			"line-height": generateCSSUnit( metaLineHeight, metaLineHeightType ),
		}
		selectors[" .uagb-post__text .uagb-post-grid-byline .uagb-post__author a"] = {
			"color": metaColor,
			"font-size": generateCSSUnit( metaFontSize, metaFontSizeType ),
			"font-family": metaFontFamily,
			"font-weight": metaFontWeight,
			"line-height": generateCSSUnit( metaLineHeight, metaLineHeightType ),
		}
		selectors[" .uagb-post__text .uagb-post__excerpt"] = {
			"color": excerptColor,
			"font-size": generateCSSUnit( excerptFontSize, excerptFontSizeType ),
			"font-family": excerptFontFamily,
			"font-weight": excerptFontWeight,
			"line-height": generateCSSUnit( excerptLineHeight, excerptLineHeightType ),
		}
		selectors[" .uagb-post__text .uagb-post__cta"] = {
			"color": ctaColor,
			"font-size": generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			"font-family": ctaFontFamily,
			"font-weight": ctaFontWeight,
			"line-height": generateCSSUnit( ctaLineHeight, ctaLineHeightType ),
			"background": ctaBgColor,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-radius": generateCSSUnit( borderRadius, "px" ),
			"border-color": borderColor,
			"border-style": borderStyle,
		};
		selectors[" .uagb-post__text .uagb-post__cta a"] = {
			"color": ctaColor,
			"font-size": generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			"padding": btnVPadding + "px " + btnHPadding + "px"
		};
		selectors[" .uagb-post__text .uagb-post__cta:hover"] = {
			"color": ctaHColor,
			"background": ctaBgHColor,
			"border-color": borderHColor,
		}
		selectors[" .uagb-post__text .uagb-post__cta:hover a"] = {
			"color": ctaHColor
		}
	}

	if ( true === postPagination && 'empty' === paginationMarkup ) {
		if ( 'filled' == paginationLayout ) {
			selectors[" .uagb-post-pagination-wrap a"] = {
				
				"background-color" :  paginationBgColor,
				"color" :  paginationColor,
			}
			if ( 'undefined' == typeof paginationBgActiveColor && 'undefined' == typeof paginationActiveColor ) {
				
				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					
					"background-color" :  paginationBgColor,
					"color" :  paginationColor,
				}
			}
			if ( 'undefined' == typeof paginationBgActiveColor && 'undefined' != typeof paginationActiveColor ) {

				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					
					"background-color" :  paginationBgColor,
					"color" :  paginationActiveColor,
				}
			}
			if ( 'undefined' != typeof paginationBgActiveColor && 'undefined' == typeof paginationActiveColor ) {

				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					
					"background-color" :  paginationBgActiveColor,
					"color" :  paginationColor,
				}
			}
			if ( 'undefined' != typeof paginationBgActiveColor && 'undefined' != typeof paginationActiveColor ) {

				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					
					"background-color" :  paginationBgActiveColor,
					"color" :  paginationActiveColor,
				}
			}
		}
		if ( 'border' == paginationLayout ) {
			selectors[" .uagb-post-pagination-wrap a"] = {
				"border-style" : "solid",
				"border-width" :  generateCSSUnit( paginationBorderSize, "px" ),
				"border-color" :  paginationBorderColor,
				"border-radius" : generateCSSUnit( paginationBorderRadius, "px" ),
				"color" :  paginationColor,
				"background-color": "transparent",
			}
			if ( 'undefined' != typeof paginationBorderActiveColor && 'undefined' != typeof paginationActiveColor  ) {
				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					"border-style" : "solid",
					"border-width" :  generateCSSUnit( paginationBorderSize, "px" ),
					"border-color" :  paginationBorderActiveColor,
					"border-radius" : generateCSSUnit( paginationBorderRadius, "px" ),
					"color" :  paginationActiveColor,
					"background-color": "transparent",
				}
			}
			if ( 'undefined' == typeof paginationBorderActiveColor && 'undefined' != typeof paginationActiveColor  ) {
				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					"border-style" : "solid",
					"border-width" :  generateCSSUnit( paginationBorderSize, "px" ),
					"border-color" :  paginationBorderColor,
					"border-radius" : generateCSSUnit( paginationBorderRadius, "px" ),
					"color" :  paginationActiveColor,
					"background-color": "transparent",
				}
			}
			if ( 'undefined' != typeof paginationBorderActiveColor && 'undefined' == typeof paginationActiveColor  ) {
				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					"border-style" : "solid",
					"border-width" :  generateCSSUnit( paginationBorderSize, "px" ),
					"border-color" :  paginationBorderActiveColor,
					"border-radius" : generateCSSUnit( paginationBorderRadius, "px" ),
					"color" :  paginationColor,
					"background-color": "transparent",
				}
			}
			if ( 'undefined' == typeof paginationBorderActiveColor && 'undefined' == typeof paginationActiveColor  ) {
				selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = {
					"border-style" : "solid",
					"border-width" :  generateCSSUnit( paginationBorderSize, "px" ),
					"border-color" :  paginationBorderColor,
					"border-radius" : generateCSSUnit( paginationBorderRadius, "px" ),
					"color" :  paginationColor,
					"background-color": "transparent",
				}
			}
		}
	}


	if ( linkBox ) {
		selectors[" .uagb-post__inner-wrap"]["cursor"] = "pointer"
	}

	selectors[" .slick-arrow svg"] = {
		"fill" : arrowColor,
		"height": generateCSSUnit( arrowSize, "px" ),
		"width": generateCSSUnit( arrowSize, "px" ),
	}

	if ( ! inheritFromTheme ) {

		mobile_selectors = {
			" .uagb-post__text .uagb-post__title": {
				"font-size": generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),
				"line-height": titleLineHeightMobile + titleLineHeightType,
			},
			" .uagb-post__text .uagb-post__title a": {
				"font-size": generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),
				"line-height": titleLineHeightMobile + titleLineHeightType,
			},
			" .uagb-post__text .uagb-post-grid-byline": {
				"font-size": generateCSSUnit( metaFontSizeMobile, metaFontSizeType ),
				"line-height": metaLineHeightMobile + metaLineHeightType,
			},
			" .uagb-post__text .uagb-post-grid-byline .uagb-post__author": {
				"font-size": generateCSSUnit( metaFontSizeMobile, metaFontSizeType ),
				"line-height": metaLineHeightMobile + metaLineHeightType,
			},
			" .uagb-post__text .uagb-post-grid-byline .uagb-post__author a": {
				"font-size": generateCSSUnit( metaFontSizeMobile, metaFontSizeType ),
				"line-height": metaLineHeightMobile + metaLineHeightType,
			},
			" .uagb-post__text .uagb-post__excerpt": {
				"font-size": generateCSSUnit( excerptFontSizeMobile, excerptFontSizeType ),
				"line-height": excerptLineHeightMobile + excerptLineHeightType,
			},
			" .uagb-post__text .uagb-post__cta": {
				"font-size": generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
				"line-height": ctaLineHeightMobile + ctaLineHeightType,
			},
			" .uagb-post__text .uagb-post__cta a": {
				"font-size": generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
				"line-height": ctaLineHeightMobile + ctaLineHeightType,
			},
		}

		tablet_selectors = {
			" .uagb-post__text .uagb-post__title": {
				"font-size": generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),
				"line-height": titleLineHeightTablet + titleLineHeightType,
			},
			" .uagb-post__text .uagb-post__title a": {
				"font-size": generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),
				"line-height": titleLineHeightTablet + titleLineHeightType,
			},
			" .uagb-post__text .uagb-post-grid-byline": {
				"font-size": generateCSSUnit( metaFontSizeTablet, metaFontSizeType ),
				"line-height": metaLineHeightTablet + metaLineHeightType,
			},
			" .uagb-post__text .uagb-post-grid-byline .uagb-post__author": {
				"font-size": generateCSSUnit( metaFontSizeTablet, metaFontSizeType ),
				"line-height": metaLineHeightTablet + metaLineHeightType,
			},
			" .uagb-post__text .uagb-post-grid-byline .uagb-post__author a": {
				"font-size": generateCSSUnit( metaFontSizeTablet, metaFontSizeType ),
				"line-height": metaLineHeightTablet + metaLineHeightType,
			},
			" .uagb-post__text .uagb-post__excerpt": {
				"font-size": generateCSSUnit( excerptFontSizeTablet, excerptFontSizeType ),
				"line-height": excerptLineHeightTablet + excerptLineHeightType,
			},
			" .uagb-post__text .uagb-post__cta": {
				"font-size": generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
				"line-height": ctaLineHeightTablet + ctaLineHeightType,
			},
			" .uagb-post__text .uagb-post__cta a": {
				"font-size": generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
				"line-height": ctaLineHeightTablet + ctaLineHeightType,
			},
		}
	}

	mobile_selectors[" .uagb-post__text"] = {
		"padding" : ( contentPaddingMobile ) + "px",
	}

	var styling_css = ""

	styling_css = generateCSS( selectors, `.uagb-block-${ props.clientId.substr( 0, 8 ) }` )

	styling_css += generateCSS( tablet_selectors, `.uagb-block-${ props.clientId.substr( 0, 8 ) }`, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, `.uagb-block-${ props.clientId.substr( 0, 8 ) }`, true, "mobile" )

	return styling_css
}

export default styling
