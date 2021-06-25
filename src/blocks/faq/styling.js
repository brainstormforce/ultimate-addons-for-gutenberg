/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		layout,
		inactiveOtherItems,
		expandFirstItem,
		rowsGap,
		columnsGap,
		align,
		enableSeparator,
		boxBgColor,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		questionTextColor,
		questionTextActiveColor,
		questionPaddingTypeDesktop,
		vquestionPaddingMobile,
		vquestionPaddingTablet,
		vquestionPaddingDesktop,
		hquestionPaddingMobile,
		hquestionPaddingTablet,
		hquestionPaddingDesktop,
		answerTextColor,
		answerPaddingTypeDesktop,
		vanswerPaddingMobile,
		vanswerPaddingTablet,
		vanswerPaddingDesktop,
		hanswerPaddingMobile,
		hanswerPaddingTablet,
		hanswerPaddingDesktop,
		iconColor,
		iconActiveColor,
		gapBtwIconQUestion,
		questionFontFamily,
		questionFontWeight,
		questionFontSizeType,
		questionFontSize,
		questionFontSizeMobile,
		questionFontSizeTablet,
		questionLineHeightType,
		questionLineHeight,
		questionLineHeightMobile,
		questionLineHeightTablet,
		answerFontFamily,
		answerFontWeight,
		answerFontSizeType,
		answerFontSize,
		answerFontSizeMobile,
		answerFontSizeTablet,
		answerLineHeightType,
		answerLineHeight,
		answerLineHeightMobile,
		answerLineHeightTablet,
		iconAlign,
		iconSize,
		iconSizeType,
		iconSizeMobile,
		iconSizeTablet,
		columns,
		tcolumns,
		mcolumns,
		questionLeftPaddingTablet,
		questionBottomPaddingTablet,
		questionLeftPaddingDesktop,
		questionBottomPaddingDesktop,
		questionLeftPaddingMobile,
		questionBottomPaddingMobile,
	} = props.attributes;

	let selectors = {};
	let tabletSelectors = {};
	let mobileSelectors = {};
	let iconColorTemp = iconColor;
	let iconActiveColorTemp = iconActiveColor;

	if ( 'undefined' === typeof iconColor || '' == iconColor ) {
		iconColorTemp = questionTextColor;
	}
	if ( 'undefined' === typeof iconActiveColor || '' == iconActiveColor ) {
		iconActiveColorTemp = questionTextActiveColor;
	}

	selectors = {
		' .uagb-icon svg': {
			width: generateCSSUnit( iconSize, iconSizeType ),
			height: generateCSSUnit( iconSize, iconSizeType ),
			'font-size': generateCSSUnit( iconSize, iconSizeType ),
			fill: iconColorTemp,
		},
		' .uagb-icon-active svg': {
			width: generateCSSUnit( iconSize, iconSizeType ),
			height: generateCSSUnit( iconSize, iconSizeType ),
			'font-size': generateCSSUnit( iconSize, iconSizeType ),
			fill: iconActiveColorTemp,
		},
		' .uagb-faq-child__outer-wrap': {
			'margin-bottom': generateCSSUnit( rowsGap, 'px' ),
		},
		'.uagb-faq-layout-grid .block-editor-inner-blocks .block-editor-block-list__layout': {
			'grid-column-gap': generateCSSUnit( columnsGap, 'px' ),
			'grid-row-gap': generateCSSUnit( rowsGap, 'px' ),
		},
		' .uagb-faq-item': {
			'background-color': boxBgColor,
			'border-style': borderStyle,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
			'border-radius': generateCSSUnit( borderRadius, 'px' ),
			'border-color': borderColor,
		},
		' .uagb-faq-item .uagb-question': {
			color: questionTextColor,
		},
		' .uagb-faq-item.uagb-faq-item-active .uagb-question': {
			color: questionTextActiveColor,
		},
		' .uagb-faq-item:hover .uagb-question': {
			color: questionTextActiveColor,
		},
		' .uagb-faq-questions-button': {
			'padding-top': generateCSSUnit(
				vquestionPaddingDesktop,
				questionPaddingTypeDesktop
			),
			'padding-bottom': generateCSSUnit(
				questionBottomPaddingDesktop,
				questionPaddingTypeDesktop
			),
			'padding-right': generateCSSUnit(
				hquestionPaddingDesktop,
				questionPaddingTypeDesktop
			),
			'padding-left': generateCSSUnit(
				questionLeftPaddingDesktop,
				questionPaddingTypeDesktop
			),
		},
		' .uagb-faq-content span': {
			'margin-top': generateCSSUnit(
				vanswerPaddingDesktop,
				answerPaddingTypeDesktop
			),
			'margin-bottom': generateCSSUnit(
				vanswerPaddingDesktop,
				answerPaddingTypeDesktop
			),
			'margin-right': generateCSSUnit(
				hanswerPaddingDesktop,
				answerPaddingTypeDesktop
			),
			'margin-left': generateCSSUnit(
				hanswerPaddingDesktop,
				answerPaddingTypeDesktop
			),
		},
		'.uagb-faq-icon-row .uagb-faq-item .uagb-faq-icon-wrap': {
			'margin-right': generateCSSUnit( gapBtwIconQUestion, 'px' ),
		},
		'.uagb-faq-icon-row-reverse .uagb-faq-item .uagb-faq-icon-wrap': {
			'margin-left': generateCSSUnit( gapBtwIconQUestion, 'px' ),
		},
		' .uagb-faq-item:hover .uagb-icon svg': {
			fill: iconActiveColorTemp,
		},
		' .uagb-faq-item .uagb-faq-questions-button.uagb-faq-questions': {
			'flex-direction': iconAlign,
		},
		' .uagb-faq-questions-button .uagb-question': {
			'font-size': generateCSSUnit(
				questionFontSize,
				questionFontSizeType
			),
			'line-height': generateCSSUnit(
				questionLineHeight,
				questionLineHeightType
			),
			'font-family': questionFontFamily,
			'font-weight': questionFontWeight,
		},
		' .uagb-faq-item .uagb-faq-content p': {
			'font-size': generateCSSUnit( answerFontSize, answerFontSizeType ),
			'line-height': generateCSSUnit(
				answerLineHeight,
				answerLineHeightType
			),
			'font-family': answerFontFamily,
			'font-weight': answerFontWeight,
			color: answerTextColor,
		},
	};

	tabletSelectors = {
		' .uagb-faq-questions-button': {
			'padding-top': generateCSSUnit(
				vquestionPaddingTablet,
				questionPaddingTypeDesktop
			),
			'padding-bottom': generateCSSUnit(
				questionBottomPaddingTablet,
				questionPaddingTypeDesktop
			),
			'padding-right': generateCSSUnit(
				hquestionPaddingTablet,
				questionPaddingTypeDesktop
			),
			'padding-left': generateCSSUnit(
				questionLeftPaddingTablet,
				questionPaddingTypeDesktop
			),
		},
		' .uagb-faq-content span': {
			'margin-top': generateCSSUnit(
				vanswerPaddingTablet,
				answerPaddingTypeDesktop
			),
			'margin-bottom': generateCSSUnit(
				vanswerPaddingTablet,
				answerPaddingTypeDesktop
			),
			'margin-right': generateCSSUnit(
				hanswerPaddingTablet,
				answerPaddingTypeDesktop
			),
			'margin-left': generateCSSUnit(
				hanswerPaddingTablet,
				answerPaddingTypeDesktop
			),
		},
		' .uagb-faq-questions-button .uagb-question': {
			'font-size': generateCSSUnit(
				questionFontSizeTablet,
				questionFontSizeType
			),
			'line-height': generateCSSUnit(
				questionLineHeightTablet,
				questionLineHeightType
			),
		},
		' .uagb-faq-item .uagb-faq-content p': {
			'font-size': generateCSSUnit(
				answerFontSizeTablet,
				answerFontSizeType
			),
			'line-height': generateCSSUnit(
				answerLineHeightTablet,
				answerLineHeightType
			),
		},
		' .uagb-icon svg': {
			width: generateCSSUnit( iconSizeTablet, iconSizeType ),
			height: generateCSSUnit( iconSizeTablet, iconSizeType ),
			'font-size': generateCSSUnit( iconSizeTablet, iconSizeType ),
		},
		' .uagb-icon-active svg': {
			width: generateCSSUnit( iconSizeTablet, iconSizeType ),
			height: generateCSSUnit( iconSizeTablet, iconSizeType ),
			'font-size': generateCSSUnit( iconSizeTablet, iconSizeType ),
		},
	};

	mobileSelectors = {
		' .uagb-faq-questions-button': {
			'padding-top': generateCSSUnit(
				vquestionPaddingMobile,
				questionPaddingTypeDesktop
			),
			'padding-bottom': generateCSSUnit(
				questionBottomPaddingMobile,
				questionPaddingTypeDesktop
			),
			'padding-right': generateCSSUnit(
				hquestionPaddingMobile,
				questionPaddingTypeDesktop
			),
			'padding-left': generateCSSUnit(
				questionLeftPaddingMobile,
				questionPaddingTypeDesktop
			),
		},
		' .uagb-faq-content span': {
			'margin-top': generateCSSUnit(
				vanswerPaddingMobile,
				answerPaddingTypeDesktop
			),
			'margin-bottom': generateCSSUnit(
				vanswerPaddingMobile,
				answerPaddingTypeDesktop
			),
			'margin-right': generateCSSUnit(
				hanswerPaddingMobile,
				answerPaddingTypeDesktop
			),
			'margin-left': generateCSSUnit(
				hanswerPaddingMobile,
				answerPaddingTypeDesktop
			),
		},
		' .uagb-faq-questions-button .uagb-question': {
			'font-size': generateCSSUnit(
				questionFontSizeMobile,
				questionFontSizeType
			),
			'line-height': generateCSSUnit(
				questionLineHeightMobile,
				questionLineHeightType
			),
		},
		' .uagb-faq-item .uagb-faq-content p': {
			'font-size': generateCSSUnit(
				answerFontSizeMobile,
				answerFontSizeType
			),
			'line-height': generateCSSUnit(
				answerLineHeightMobile,
				answerLineHeightType
			),
		},
		' .uagb-icon svg': {
			width: generateCSSUnit( iconSizeMobile, iconSizeType ),
			height: generateCSSUnit( iconSizeMobile, iconSizeType ),
			'font-size': generateCSSUnit( iconSizeMobile, iconSizeType ),
		},
		' .uagb-icon-active svg': {
			width: generateCSSUnit( iconSizeMobile, iconSizeType ),
			height: generateCSSUnit( iconSizeMobile, iconSizeType ),
			'font-size': generateCSSUnit( iconSizeMobile, iconSizeType ),
		},
	};

	if ( 'accordion' === layout && true === inactiveOtherItems ) {
		selectors[
			' .block-editor-block-list__layout .uagb-faq-child__outer-wrap .uagb-faq-content '
		] = {
			display: 'none',
		};
	}
	if ( 'accordion' === layout && false === inactiveOtherItems ) {
		selectors[
			' .block-editor-inner-blocks .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon-active'
		] = {
			display: 'inline-block',
		};
		selectors[
			' .block-editor-inner-blocks .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon'
		] = {
			display: 'none',
		};
	}
	if ( 'accordion' === layout && true === expandFirstItem ) {
		selectors[
			' .block-editor-block-list__layout > div:first-child > .uagb-faq-child__outer-wrap .uagb-faq-content '
		] = {
			display: 'block',
		};
		selectors[
			' .block-editor-block-list__layout > div:first-child > .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon-active '
		] = {
			display: 'inline-block',
		};
		selectors[
			' .block-editor-block-list__layout > div:first-child > .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon '
		] = {
			display: 'none',
		};
	}
	if ( true === enableSeparator ) {
		selectors[
			'.uagb-faq__outer-wrap .uagb-faq-child__outer-wrap .uagb-faq-content '
		] = {
			'border-style': 'solid',
			'border-top-color': borderColor,
			'border-top-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( 'grid' === layout ) {
		selectors[
			' .block-editor-block-list__layout .uagb-faq-child__outer-wrap '
		] = {
			'text-align': align,
		};
		selectors[
			'.uagb-faq-layout-grid .block-editor-inner-blocks > .block-editor-block-list__layout '
		] = {
			'grid-template-columns': 'repeat(' + columns + ', 1fr)',
		};
		tabletSelectors[
			'.uagb-faq-layout-grid .block-editor-inner-blocks > .block-editor-block-list__layout '
		] = {
			'grid-template-columns': 'repeat(' + tcolumns + ', 1fr)',
		};
		mobileSelectors[
			'.uagb-faq-layout-grid .block-editor-inner-blocks > .block-editor-block-list__layout '
		] = {
			'grid-template-columns': 'repeat(' + mcolumns + ', 1fr)',
		};
	}

	let stylingCss = '';
	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;

	stylingCss = generateCSS( selectors, id );

	stylingCss += generateCSS(
		tabletSelectors,
		`${ id }.uagb-editor-preview-mode-tablet`,
		true,
		'tablet'
	);

	stylingCss += generateCSS(
		mobileSelectors,
		`${ id }.uagb-editor-preview-mode-mobile`,
		true,
		'mobile'
	);

	return stylingCss;
}

export default styling;
