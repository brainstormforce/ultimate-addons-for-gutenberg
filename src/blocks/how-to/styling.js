/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		overallAlignment,
		headingTag,
		showTotaltimecolor,
		headingColor,
		headSpace,
		subHeadingColor,
		headFontFamily,
		headFontWeight,
		headFontSize,
		headFontSizeType,
		headFontSizeMobile,
		headFontSizeTablet,
		headLineHeight,
		headLineHeightType,
		headLineHeightMobile,
		headLineHeightTablet,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeMobile,
		subHeadFontSizeTablet,
		subHeadLineHeight,
		subHeadLineHeightType,
		subHeadLineHeightMobile,
		subHeadLineHeightTablet,
		priceFontSizeType,
		priceFontSize,
		priceFontSizeTablet,
		priceFontSizeMobile,
		priceFontFamily,
		priceFontWeight,
		priceLineHeightType,
		priceLineHeight,
		priceLineHeightTablet,
		priceLineHeightMobile,
		timeSpace,
		costSpace,
		row_gap,
		step_gap,
	} = props.attributes;

	let tabletSelectors = {};
	let mobileSelectors = {};

	let sGap = '' !== step_gap ? step_gap : 0;
	sGap += 30;

	const selectors = {
		' .block-editor-rich-text__editable.uagb-howto-desc-text': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
		},
		'.uagb-how-to-main-wrap p': {
			'margin-bottom': generateCSSUnit( row_gap, 'px' ),
		},

		'.uagb-how-to-main-wrap .uagb-howto__source-wrap': {
			'margin-bottom': generateCSSUnit( row_gap, 'px' ),
		},

		'.uagb-how-to-main-wrap span.uagb-howto__time-wrap': {
			'margin-bottom': generateCSSUnit( row_gap, 'px' ),
		},

		'.uagb-how-to-main-wrap span.uagb-howto__cost-wrap': {
			'margin-bottom': generateCSSUnit( row_gap, 'px' ),
		},

		' .uagb-how-to-tools .uagb-how-to-tools-child__wrapper:last-child': {
			'margin-bottom': generateCSSUnit( row_gap, 'px' ),
		},

		'.uagb-how-to-main-wrap .uagb-how-to-materials-child__wrapper': {
			'margin-bottom': generateCSSUnit( row_gap, 'px' ),
		},
		' .wp-block-uagb-info-box': {
			'margin-bottom': generateCSSUnit( sGap, 'px' ),
		},
		' .block-editor-rich-text__editable.uagb-howto-timeNeeded-text': {
			'font-family': priceFontFamily,
			'font-weight': priceFontWeight,
			'font-size': generateCSSUnit( priceFontSize, priceFontSizeType ),
			'line-height': generateCSSUnit(
				priceLineHeight,
				priceLineHeightType
			),
			color: showTotaltimecolor,
		},
		' .uagb-howto-timeNeeded-value': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
			'margin-left': generateCSSUnit( timeSpace, 'px' ),
		},
		' .uagb-howto-timeINmin-text ': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-text': {
			'font-family': priceFontFamily,
			'font-weight': priceFontWeight,
			'font-size': generateCSSUnit( priceFontSize, priceFontSizeType ),
			'line-height': generateCSSUnit(
				priceLineHeight,
				priceLineHeightType
			),
			color: showTotaltimecolor,
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-value': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
			'margin-left': generateCSSUnit( costSpace, 'px' ),
		},

		' h4.block-editor-rich-text__editable': {
			'font-family': priceFontFamily,
			'font-weight': priceFontWeight,
			'font-size': generateCSSUnit( priceFontSize, priceFontSizeType ),
			'line-height': generateCSSUnit(
				priceLineHeight,
				priceLineHeightType
			),
		},
		' p.block-editor-rich-text__editable': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
		},

		' .block-editor-rich-text__editable.uagb-howto-estcost-type': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
		},

		' .block-editor-rich-text__editable.uagb-howto-req-tools-text': {
			'font-family': priceFontFamily,
			'font-weight': priceFontWeight,
			'font-size': generateCSSUnit( priceFontSize, priceFontSizeType ),
			'line-height': generateCSSUnit(
				priceLineHeight,
				priceLineHeightType
			),
			color: showTotaltimecolor,
		},

		'  .block-editor-rich-text__editable.uagb-tools__label': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
		},

		' .block-editor-rich-text__editable.uagb-howto-req-materials-text': {
			'font-family': priceFontFamily,
			'font-weight': priceFontWeight,
			'font-size': generateCSSUnit( priceFontSize, priceFontSizeType ),
			'line-height': generateCSSUnit(
				priceLineHeight,
				priceLineHeightType
			),
			color: showTotaltimecolor,
		},

		' .block-editor-rich-text__editable.uagb-howto-req-steps-text': {
			'font-family': priceFontFamily,
			'font-weight': priceFontWeight,
			'font-size': generateCSSUnit( priceFontSize, priceFontSizeType ),
			'line-height': generateCSSUnit(
				priceLineHeight,
				priceLineHeightType
			),
			color: showTotaltimecolor,
		},

		' .block-editor-rich-text__editable.uagb-materials__label': {
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
		},
	};

	selectors[ '.uagb-how-to-main-wrap' ] = {
		'text-align': overallAlignment,
		display: 'block',
	};

	selectors[
		' ' +
			headingTag +
			'.block-editor-rich-text__editable.uagb-howto-heading-text'
	] = {
		'font-family': headFontFamily,
		'font-weight': headFontWeight,
		'font-size': generateCSSUnit( headFontSize, headFontSizeType ),
		'line-height': generateCSSUnit( headLineHeight, headLineHeightType ),
		color: headingColor,
		'margin-bottom': generateCSSUnit( headSpace, 'px' ),
	};

	mobileSelectors = {
		' .block-editor-rich-text__editable.uagb-howto-heading-text': {
			'font-size': generateCSSUnit(
				headFontSizeMobile,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightMobile,
				headLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-desc-text': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-timeNeeded-text': {
			'font-size': generateCSSUnit(
				priceFontSizeMobile,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightMobile,
				priceLineHeightType
			),
		},
		' .uagb-howto-timeNeeded-value': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		' .uagb-howto-timeINmin-text ': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-text': {
			'font-size': generateCSSUnit(
				priceFontSizeMobile,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightMobile,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-value': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-type': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-tools__label': {
			'font-size': generateCSSUnit(
				priceFontSizeMobile,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightMobile,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-req-tools-text': {
			'font-size': generateCSSUnit(
				priceFontSizeMobile,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightMobile,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-materials__label': {
			'font-size': generateCSSUnit(
				priceFontSizeMobile,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightMobile,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-req-materials-text': {
			'font-size': generateCSSUnit(
				priceFontSizeMobile,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightMobile,
				priceLineHeightType
			),
		},
	};

	tabletSelectors = {
		' .block-editor-rich-text__editable.uagb-howto-heading-text': {
			'font-size': generateCSSUnit(
				headFontSizeTablet,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightTablet,
				headLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-desc-text': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-timeNeeded-text': {
			'font-size': generateCSSUnit(
				priceFontSizeTablet,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightTablet,
				priceLineHeightType
			),
		},
		' .uagb-howto-timeNeeded-value': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		' .uagb-howto-timeINmin-text ': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-text': {
			'font-size': generateCSSUnit(
				priceFontSizeTablet,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightTablet,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-value': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-estcost-type': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-tools__label': {
			'font-size': generateCSSUnit(
				priceFontSizeTablet,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightTablet,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-req-tools-text': {
			'font-size': generateCSSUnit(
				priceFontSizeTablet,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightTablet,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-materials__label': {
			'font-size': generateCSSUnit(
				priceFontSizeTablet,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightTablet,
				priceLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-howto-req-materials-text': {
			'font-size': generateCSSUnit(
				priceFontSizeTablet,
				priceFontSizeType
			),
			'line-height': generateCSSUnit(
				priceLineHeightTablet,
				priceLineHeightType
			),
		},
	};

	const baseSelector = `.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
		0,
		8
	) }`;

	let stylingCss = generateCSS( selectors, baseSelector );

	stylingCss += generateCSS(
		tabletSelectors,
		`${ baseSelector }.uagb-editor-preview-mode-tablet`,
		true,
		'tablet'
	);

	stylingCss += generateCSS(
		mobileSelectors,
		`${ baseSelector }.uagb-editor-preview-mode-mobile`,
		true,
		'mobile'
	);

	return stylingCss;
}

export default styling;
