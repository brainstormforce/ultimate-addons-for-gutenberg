/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		headerBgColor,
		titleAlign,
		headerTextColor,
		activeTabBgColor,
		activeTabTextColor,
		bodyBgColor,
		bodyTextColor,
		tabTitleTopMargin,
		tabTitleLeftMargin,
		tabTitleRightMargin,
		tabTitleBottomMargin,
		tabTitleVertPadding,
		tabTitleHrPadding,
		titleFontFamily,
		titleFontWeight,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleLineHeight,
		titleLineHeightType,
		titleLineHeightMobile,
		titleLineHeightTablet,
		//Border
		borderWidth,
		borderColor,
		iconColor,
		iconSize,
		tabBodyLeftMargin,
		tabBodyRightMargin,
		tabBodyTopMargin,
		tabBodyBottomMargin,
		tabBodyVertPadding,
		tabBodyHrPadding,
		iconSpacing,
		tabsStyleD,
		tabsStyleM,
		tabsStyleT,
		activeiconColor,
	} = props.attributes;

	let selectors = {};
	const tabletSelectors = {};
	const mobileSelectors = {};
	selectors = {
		' > .uagb-tabs__panel .uagb-tab': {
			background: headerBgColor,
			'text-align': titleAlign,
			'padding-top': generateCSSUnit( tabTitleVertPadding, 'px' ),
			'padding-bottom': generateCSSUnit( tabTitleVertPadding, 'px' ),
			'padding-left': generateCSSUnit( tabTitleHrPadding, 'px' ),
			'padding-right': generateCSSUnit( tabTitleHrPadding, 'px' ),
			'margin-top': generateCSSUnit( tabTitleTopMargin, 'px' ),
			'margin-left': generateCSSUnit( tabTitleLeftMargin, 'px' ),
			'margin-right': generateCSSUnit( tabTitleRightMargin, 'px' ),
			'margin-bottom': generateCSSUnit( tabTitleBottomMargin, 'px' ),
		},
		' > .uagb-tabs__panel .uagb-tab a > p': {
			color: headerTextColor,
			'font-family': titleFontFamily,
			'font-weight': titleFontWeight,
			'font-size': generateCSSUnit( titleFontSize, titleFontSizeType ),
			'line-height': generateCSSUnit(
				titleLineHeight,
				titleLineHeightType
			),
		},
		' > .uagb-tabs__panel .uagb-tab.uagb-tabs__active ': {
			background: activeTabBgColor,
		},
		' > .uagb-tabs__panel .uagb-tab.uagb-tabs__active p': {
			color: activeTabTextColor,
		},
		' > .uagb-tabs__panel .uagb-tab.uagb-tabs__active .uagb-tabs__icon svg': {
			fill: activeiconColor,
		},
		' > .uagb-tabs__body-wrap ': {
			background: bodyBgColor,
			'padding-top': generateCSSUnit( tabBodyVertPadding, 'px' ),
			'padding-bottom': generateCSSUnit( tabBodyVertPadding, 'px' ),
			'padding-left': generateCSSUnit( tabBodyHrPadding, 'px' ),
			'padding-right': generateCSSUnit( tabBodyHrPadding, 'px' ),
			'margin-top': generateCSSUnit( tabBodyTopMargin, 'px' ),
			'margin-left': generateCSSUnit( tabBodyLeftMargin, 'px' ),
			'margin-right': generateCSSUnit( tabBodyRightMargin, 'px' ),
			'margin-bottom': generateCSSUnit( tabBodyBottomMargin, 'px' ),
		},
		' > .uagb-tabs__body-wrap > .block-editor-inner-blocks p': {
			color: bodyTextColor,
		},
		' .uagb-tabs__icon svg': {
			height: generateCSSUnit( iconSize, 'px' ),
			width: generateCSSUnit( iconSize, 'px' ),
			fill: iconColor,
		},
		'.uagb-tabs__wrap > .uagb-tabs__panel .uagb-tab': {
			'border-width': generateCSSUnit( borderWidth, 'px' ),
			'border-color': borderColor,
		},
		'.uagb-tabs__wrap > .uagb-tabs__body-wrap': {
			'border-width': generateCSSUnit( borderWidth, 'px' ),
			'border-color': borderColor,
		},
		' .uagb-tabs__icon-position-left  .uagb-tabs__icon ': {
			'margin-right': generateCSSUnit( iconSpacing, 'px' ),
		},
		' .uagb-tabs__icon-position-right  .uagb-tabs__icon ': {
			'margin-left': generateCSSUnit( iconSpacing, 'px' ),
		},
		' .uagb-tabs__icon-position-top  .uagb-tabs__icon ': {
			'margin-bottom': generateCSSUnit( iconSpacing, 'px' ),
		},
		' .uagb-tabs__icon-position-bottom  .uagb-tabs__icon ': {
			'margin-top': generateCSSUnit( iconSpacing, 'px' ),
		},
	};
	tabletSelectors[ ' > .uagb-tabs__panel .uagb-tab p' ] = {
		'font-size': generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),
		'line-height': generateCSSUnit(
			titleLineHeightTablet,
			titleLineHeightType
		),
	};
	mobileSelectors[ ' > .uagb-tabs__panel .uagb-tab p' ] = {
		'font-size': generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),
		'line-height': generateCSSUnit(
			titleLineHeightMobile,
			titleLineHeightType
		),
	};
	if ( tabsStyleD === 'hstyle5' ) {
		selectors[ '.uagb-tabs__wrap.uagb-tabs__hstyle5-desktop ' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( tabsStyleD === 'vstyle10' ) {
		selectors[ '.uagb-tabs__wrap.uagb-tabs__vstyle10-desktop ' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( tabsStyleT === 'hstyle5' ) {
		tabletSelectors[ '.uagb-tabs__wrap.uagb-tabs__hstyle5-tablet' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( tabsStyleT === 'vstyle10' ) {
		tabletSelectors[ '.uagb-tabs__wrap.uagb-tabs__vstyle10-tablet' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( tabsStyleM === 'hstyle5' ) {
		mobileSelectors[ '.uagb-tabs__wrap.uagb-tabs__hstyle5-mobile ' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( tabsStyleM === 'vstyle10' ) {
		mobileSelectors[ '.uagb-tabs__wrap.uagb-tabs__vstyle10-mobile ' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	if ( tabsStyleM === 'stack4' ) {
		mobileSelectors[ '.uagb-tabs__wrap.uagb-tabs__stack4-mobile' ] = {
			background: bodyBgColor,
			'border-color': borderColor,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
		};
	}
	const base_selector = `.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
		0,
		8
	) }`;

	let stylingCss = generateCSS( selectors, base_selector );

	stylingCss += generateCSS(
		tabletSelectors,
		`${ base_selector }.uagb-editor-preview-mode-tablet`,
		true,
		'tablet'
	);

	stylingCss += generateCSS(
		mobileSelectors,
		`${ base_selector }.uagb-editor-preview-mode-mobile`,
		true,
		'mobile'
	);

	return stylingCss;
}

export default styling;
