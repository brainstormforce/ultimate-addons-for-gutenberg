/**
 * Set inline styles.
 *
 * @param  {Object} props - The block object.
 * @return {Object} The inline background type CSS.
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

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
		ctaBottomSpace,
		imageBottomSpace,
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
		paginationType,
		paginationEventType,
		paginationAlign,
		paginationTextColor,
		paginationMasonryBgColor,
		paginationMasonryBorderStyle,
		paginationMasonryBorderWidth,
		paginationMasonryBorderRadius,
		paginationMasonryBorderColor,
		paginationTextHoverColor,
		paginationBgHoverColor,
		paginationFontSize,
		loaderColor,
		loaderSize,
		paginationButtonPaddingType,
		vpaginationButtonPaddingMobile,
		vpaginationButtonPaddingTablet,
		vpaginationButtonPaddingDesktop,
		hpaginationButtonPaddingMobile,
		hpaginationButtonPaddingTablet,
		hpaginationButtonPaddingDesktop,
		imgPosition,
	} = props.attributes;

	let mobile_selectors = {};
	let tablet_selectors = {};

	const selectors = {
		' .uagb-post__items': {
			'margin-right': generateCSSUnit( -rowGap / 2, 'px' ),
			'margin-left': generateCSSUnit( -rowGap / 2, 'px' ),
		},
		' .uagb-post__items article': {
			'padding-right': generateCSSUnit( rowGap / 2, 'px' ),
			'padding-left': generateCSSUnit( rowGap / 2, 'px' ),
			'margin-bottom': generateCSSUnit( columnGap, 'px' ),
		},
		' .uagb-post__inner-wrap': {
			background: bgColor,
			padding: generateCSSUnit( contentPadding, 'px' ),
			'text-align': align,
		},
		' .uagb-post__inner-wrap .uagb-post__cta': {
			'margin-bottom': generateCSSUnit( ctaBottomSpace, 'px' ),
		},
		' .uagb-post__inner-wrap .uagb-post__image': {
			'margin-bottom': generateCSSUnit( imageBottomSpace, 'px' ),
		},
		' .uagb-post__inner-wrap .uagb-post__title': {
			'margin-bottom': generateCSSUnit( titleBottomSpace, 'px' ),
		},
		' .uagb-post__inner-wrap .uagb-post-grid-byline': {
			'margin-bottom': generateCSSUnit( metaBottomSpace, 'px' ),
		},
		' .uagb-post__inner-wrap .uagb-post__excerpt': {
			'margin-bottom': generateCSSUnit( excerptBottomSpace, 'px' ),
		},
		' .uagb-post__image:before': {
			'background-color': bgOverlayColor,
			opacity: overlayOpacity / 100,
		},
		' .uagb-post-pagination-wrap': {
			'margin-top': generateCSSUnit( paginationSpacing, 'px' ),
			'text-align': paginationAlignment,
		},
	};
	if ( imgPosition !== 'background' ) {
		selectors[
			' .uagb-post__inner-wrap  > .uagb-post__image:first-child'
		] = {
			'margin-top': generateCSSUnit( -contentPadding, 'px' ),
			'margin-left': generateCSSUnit( -contentPadding, 'px' ),
			'margin-right': generateCSSUnit( -contentPadding, 'px' ),
		};
	}
	if ( ! inheritFromTheme ) {
		selectors[ ' .uagb-post__title' ] = {
			color: titleColor,
			'font-size': generateCSSUnit( titleFontSize, titleFontSizeType ),
			'font-family': titleFontFamily,
			'font-weight': titleFontWeight,
			'line-height': generateCSSUnit(
				titleLineHeight,
				titleLineHeightType
			),
		};
		selectors[ ' .uagb-post__title a' ] = {
			color: titleColor,
			'font-size': generateCSSUnit( titleFontSize, titleFontSizeType ),
			'font-family': titleFontFamily,
			'font-weight': titleFontWeight,
			'line-height': generateCSSUnit(
				titleLineHeight,
				titleLineHeightType
			),
		};
		selectors[ ' .uagb-post-grid-byline' ] = {
			color: metaColor,
			'font-size': generateCSSUnit( metaFontSize, metaFontSizeType ),
			'font-family': metaFontFamily,
			'font-weight': metaFontWeight,
			'line-height': generateCSSUnit(
				metaLineHeight,
				metaLineHeightType
			),
		};
		selectors[ ' .uagb-post-grid-byline .uagb-post__author' ] = {
			color: metaColor,
			'font-size': generateCSSUnit( metaFontSize, metaFontSizeType ),
			'font-family': metaFontFamily,
			'font-weight': metaFontWeight,
			'line-height': generateCSSUnit(
				metaLineHeight,
				metaLineHeightType
			),
		};
		selectors[ ' .uagb-post-grid-byline .uagb-post__author a' ] = {
			color: metaColor,
			'font-size': generateCSSUnit( metaFontSize, metaFontSizeType ),
			'font-family': metaFontFamily,
			'font-weight': metaFontWeight,
			'line-height': generateCSSUnit(
				metaLineHeight,
				metaLineHeightType
			),
		};
		selectors[ ' .uagb-post__excerpt' ] = {
			color: excerptColor,
			'font-size': generateCSSUnit(
				excerptFontSize,
				excerptFontSizeType
			),
			'font-family': excerptFontFamily,
			'font-weight': excerptFontWeight,
			'line-height': generateCSSUnit(
				excerptLineHeight,
				excerptLineHeightType
			),
		};
		selectors[ ' .uagb-post__cta' ] = {
			color: ctaColor,
			'font-size': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			'font-family': ctaFontFamily,
			'font-weight': ctaFontWeight,
			'line-height': generateCSSUnit( ctaLineHeight, ctaLineHeightType ),
			background: ctaBgColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
			'border-radius': generateCSSUnit( borderRadius, 'px' ),
			'border-color': borderColor,
			'border-style': borderStyle,
		};
		selectors[ ' .uagb-post__cta a' ] = {
			color: ctaColor,
			'font-size': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			padding: btnVPadding + 'px ' + btnHPadding + 'px',
		};
		selectors[ ' .uagb-post__cta:hover' ] = {
			color: ctaHColor,
			background: ctaBgHColor,
			'border-color': borderHColor,
		};
		selectors[ ' .uagb-post__cta:hover a' ] = {
			color: ctaHColor,
		};
	}

	if ( true === postPagination ) {
		if ( 'filled' == paginationLayout ) {
			selectors[ ' .uagb-post-pagination-wrap a' ] = {
				'background-color': paginationBgColor,
				color: paginationColor,
			};
			if (
				'undefined' === typeof paginationBgActiveColor &&
				'undefined' === typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'background-color': paginationBgColor,
					color: paginationColor,
				};
			}
			if (
				'undefined' === typeof paginationBgActiveColor &&
				'undefined' !== typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'background-color': paginationBgColor,
					color: paginationActiveColor,
				};
			}
			if (
				'undefined' !== typeof paginationBgActiveColor &&
				'undefined' === typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'background-color': paginationBgActiveColor,
					color: paginationColor,
				};
			}
			if (
				'undefined' !== typeof paginationBgActiveColor &&
				'undefined' !== typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'background-color': paginationBgActiveColor,
					color: paginationActiveColor,
				};
			}
		}
		if ( 'border' == paginationLayout ) {
			selectors[ ' .uagb-post-pagination-wrap a' ] = {
				'border-style': 'solid',
				'border-width': generateCSSUnit( paginationBorderSize, 'px' ),
				'border-color': paginationBorderColor,
				'border-radius': generateCSSUnit(
					paginationBorderRadius,
					'px'
				),
				color: paginationColor,
				'background-color': 'transparent',
			};
			if (
				'undefined' !== typeof paginationBorderActiveColor &&
				'undefined' !== typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'border-style': 'solid',
					'border-width': generateCSSUnit(
						paginationBorderSize,
						'px'
					),
					'border-color': paginationBorderActiveColor,
					'border-radius': generateCSSUnit(
						paginationBorderRadius,
						'px'
					),
					color: paginationActiveColor,
					'background-color': 'transparent',
				};
			}
			if (
				'undefined' === typeof paginationBorderActiveColor &&
				'undefined' !== typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'border-style': 'solid',
					'border-width': generateCSSUnit(
						paginationBorderSize,
						'px'
					),
					'border-color': paginationBorderColor,
					'border-radius': generateCSSUnit(
						paginationBorderRadius,
						'px'
					),
					color: paginationActiveColor,
					'background-color': 'transparent',
				};
			}
			if (
				'undefined' !== typeof paginationBorderActiveColor &&
				'undefined' === typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'border-style': 'solid',
					'border-width': generateCSSUnit(
						paginationBorderSize,
						'px'
					),
					'border-color': paginationBorderActiveColor,
					'border-radius': generateCSSUnit(
						paginationBorderRadius,
						'px'
					),
					color: paginationColor,
					'background-color': 'transparent',
				};
			}
			if (
				'undefined' === typeof paginationBorderActiveColor &&
				'undefined' === typeof paginationActiveColor
			) {
				selectors[
					' .uagb-post-pagination-wrap .page-numbers.current'
				] = {
					'border-style': 'solid',
					'border-width': generateCSSUnit(
						paginationBorderSize,
						'px'
					),
					'border-color': paginationBorderColor,
					'border-radius': generateCSSUnit(
						paginationBorderRadius,
						'px'
					),
					color: paginationColor,
					'background-color': 'transparent',
				};
			}
		}
	}

	if ( linkBox ) {
		selectors[ ' .uagb-post__inner-wrap' ].cursor = 'pointer';
	}

	selectors[ ' .slick-arrow svg' ] = {
		fill: arrowColor,
		height: generateCSSUnit( arrowSize, 'px' ),
		width: generateCSSUnit( arrowSize, 'px' ),
	};

	if ( ! inheritFromTheme ) {
		mobile_selectors = {
			' .uagb-post__title': {
				'font-size': generateCSSUnit(
					titleFontSizeMobile,
					titleFontSizeType
				),
				'line-height': titleLineHeightMobile + titleLineHeightType,
			},
			' .uagb-post__title a': {
				'font-size': generateCSSUnit(
					titleFontSizeMobile,
					titleFontSizeType
				),
				'line-height': titleLineHeightMobile + titleLineHeightType,
			},
			' .uagb-post-grid-byline': {
				'font-size': generateCSSUnit(
					metaFontSizeMobile,
					metaFontSizeType
				),
				'line-height': metaLineHeightMobile + metaLineHeightType,
			},
			' .uagb-post-grid-byline .uagb-post__author': {
				'font-size': generateCSSUnit(
					metaFontSizeMobile,
					metaFontSizeType
				),
				'line-height': metaLineHeightMobile + metaLineHeightType,
			},
			' .uagb-post-grid-byline .uagb-post__author a': {
				'font-size': generateCSSUnit(
					metaFontSizeMobile,
					metaFontSizeType
				),
				'line-height': metaLineHeightMobile + metaLineHeightType,
			},
			' .uagb-post__excerpt': {
				'font-size': generateCSSUnit(
					excerptFontSizeMobile,
					excerptFontSizeType
				),
				'line-height': excerptLineHeightMobile + excerptLineHeightType,
			},
			' .uagb-post__cta': {
				'font-size': generateCSSUnit(
					ctaFontSizeMobile,
					ctaFontSizeType
				),
				'line-height': ctaLineHeightMobile + ctaLineHeightType,
			},
			' .uagb-post__cta a': {
				'font-size': generateCSSUnit(
					ctaFontSizeMobile,
					ctaFontSizeType
				),
				'line-height': ctaLineHeightMobile + ctaLineHeightType,
			},
		};

		tablet_selectors = {
			' .uagb-post__title': {
				'font-size': generateCSSUnit(
					titleFontSizeTablet,
					titleFontSizeType
				),
				'line-height': titleLineHeightTablet + titleLineHeightType,
			},
			' .uagb-post__title a': {
				'font-size': generateCSSUnit(
					titleFontSizeTablet,
					titleFontSizeType
				),
				'line-height': titleLineHeightTablet + titleLineHeightType,
			},
			' .uagb-post-grid-byline': {
				'font-size': generateCSSUnit(
					metaFontSizeTablet,
					metaFontSizeType
				),
				'line-height': metaLineHeightTablet + metaLineHeightType,
			},
			' .uagb-post-grid-byline .uagb-post__author': {
				'font-size': generateCSSUnit(
					metaFontSizeTablet,
					metaFontSizeType
				),
				'line-height': metaLineHeightTablet + metaLineHeightType,
			},
			' .uagb-post-grid-byline .uagb-post__author a': {
				'font-size': generateCSSUnit(
					metaFontSizeTablet,
					metaFontSizeType
				),
				'line-height': metaLineHeightTablet + metaLineHeightType,
			},
			' .uagb-post__excerpt': {
				'font-size': generateCSSUnit(
					excerptFontSizeTablet,
					excerptFontSizeType
				),
				'line-height': excerptLineHeightTablet + excerptLineHeightType,
			},
			' .uagb-post__cta': {
				'font-size': generateCSSUnit(
					ctaFontSizeTablet,
					ctaFontSizeType
				),
				'line-height': ctaLineHeightTablet + ctaLineHeightType,
			},
			' .uagb-post__cta a': {
				'font-size': generateCSSUnit(
					ctaFontSizeTablet,
					ctaFontSizeType
				),
				'line-height': ctaLineHeightTablet + ctaLineHeightType,
			},
		};
	}

	if ( 'infinite' === paginationType ) {
		if ( 'button' === paginationEventType ) {
			selectors[ ' .uagb-post__load-more-wrap' ] = {
				'text-align': paginationAlign,
			};
			selectors[
				' .uagb-post__load-more-wrap .uagb-post-pagination-button'
			] = {
				color: paginationTextColor,
				'background-color': paginationMasonryBgColor,
				'border-style': paginationMasonryBorderStyle,
				'border-width': generateCSSUnit(
					paginationMasonryBorderWidth,
					'px'
				),
				'border-radius': generateCSSUnit(
					paginationMasonryBorderRadius,
					'px'
				),
				'border-color': paginationMasonryBorderColor,
				'font-size': generateCSSUnit( paginationFontSize, 'px' ),
				'padding-top': generateCSSUnit(
					vpaginationButtonPaddingDesktop,
					paginationButtonPaddingType
				),
				'padding-bottom': generateCSSUnit(
					vpaginationButtonPaddingDesktop,
					paginationButtonPaddingType
				),
				'padding-right': generateCSSUnit(
					hpaginationButtonPaddingDesktop,
					paginationButtonPaddingType
				),
				'padding-left': generateCSSUnit(
					hpaginationButtonPaddingDesktop,
					paginationButtonPaddingType
				),
			};
			selectors[
				' .uagb-post__load-more-wrap .uagb-post-pagination-button:hover'
			] = {
				color: paginationTextHoverColor,
				'background-color': paginationBgHoverColor,
			};
			mobile_selectors[
				' .uagb-post__load-more-wrap .uagb-post-pagination-button'
			] = {
				'padding-top': generateCSSUnit(
					vpaginationButtonPaddingMobile,
					paginationButtonPaddingType
				),
				'padding-bottom': generateCSSUnit(
					vpaginationButtonPaddingMobile,
					paginationButtonPaddingType
				),
				'padding-right': generateCSSUnit(
					hpaginationButtonPaddingMobile,
					paginationButtonPaddingType
				),
				'padding-left': generateCSSUnit(
					hpaginationButtonPaddingMobile,
					paginationButtonPaddingType
				),
			};
			tablet_selectors[
				' .uagb-post__load-more-wrap .uagb-post-pagination-button'
			] = {
				'padding-top': generateCSSUnit(
					vpaginationButtonPaddingTablet,
					paginationButtonPaddingType
				),
				'padding-bottom': generateCSSUnit(
					vpaginationButtonPaddingTablet,
					paginationButtonPaddingType
				),
				'padding-right': generateCSSUnit(
					hpaginationButtonPaddingTablet,
					paginationButtonPaddingType
				),
				'padding-left': generateCSSUnit(
					hpaginationButtonPaddingTablet,
					paginationButtonPaddingType
				),
			};
		}
		if ( 'scroll' === paginationEventType ) {
			selectors[ '.uagb-post-grid .uagb-post-inf-loader div' ] = {
				width: generateCSSUnit( loaderSize, 'px' ),
				height: generateCSSUnit( loaderSize, 'px' ),
				'background-color': loaderColor,
			};
		}
	}

	mobile_selectors[ ' .uagb-post__inner-wrap' ] = {
		padding: contentPaddingMobile + 'px',
	};
	mobile_selectors[
		'.uagb-post__inner-wrap  > .uagb-post__image:first-child'
	] = {
		'margin-top': -contentPadding + 'px',
		'margin-left': -contentPadding + 'px',
		'margin-right': -contentPadding + 'px',
	};
	let styling_css = '';

	styling_css = generateCSS(
		selectors,
		`.uagb-block-${ props.clientId.substr( 0, 8 ) }`
	);

	styling_css += generateCSS(
		tablet_selectors,
		`.uagb-block-${ props.clientId.substr(
			0,
			8
		) }.uagb-editor-preview-mode-tablet`,
		true,
		'tablet'
	);

	styling_css += generateCSS(
		mobile_selectors,
		`.uagb-block-${ props.clientId.substr(
			0,
			8
		) }.uagb-editor-preview-mode-mobile`,
		true,
		'mobile'
	);

	return styling_css;
}

export default styling;
