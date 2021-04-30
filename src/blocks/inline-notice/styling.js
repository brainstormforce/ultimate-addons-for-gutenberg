/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		block_id,
		textColor,
		titleColor,
		noticeColor,
		contentBgColor,
		noticeDismissColor,
		titleFontFamily,
		titleFontWeight,
		titleFontSizeType,
		titleLineHeightType,
		titleFontSize,
		titleFontSizeTablet,
		titleFontSizeMobile,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		descFontFamily,
		descFontWeight,
		descFontSize,
		descFontSizeType,
		descFontSizeTablet,
		descFontSizeMobile,
		descLineHeight,
		descLineHeightType,
		descLineHeightTablet,
		descLineHeightMobile,
		contentVrPadding,
		contentHrPadding,
		titleVrPadding,
		titleHrPadding,
		noticeDismiss,
		noticeAlignment,
		layout,
		highlightWidth,
	} = props.attributes;

	let lPadding;
	let rPadding;

	if ( noticeDismiss ) {
		if ( 'left' === noticeAlignment || 'center' === noticeAlignment ) {
			rPadding = titleHrPadding + 13;
			lPadding = titleHrPadding;
		} else {
			lPadding = titleHrPadding + 13;
			rPadding = titleHrPadding;
		}
	} else {
		lPadding = titleHrPadding;
		rPadding = titleHrPadding;
	}

	let tablet_selectors = {};
	let mobile_selectors = {};

	const selectors = {
		' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus': {
			'font-size': generateCSSUnit( titleFontSize, titleFontSizeType ),
			'font-weight': titleFontWeight,
			'font-family': titleFontFamily,
			'line-height': generateCSSUnit(
				titleLineHeight,
				titleLineHeightType
			),
			color: titleColor,
			'padding-left': generateCSSUnit( lPadding, 'px' ),
			'padding-right': generateCSSUnit( rPadding, 'px' ),
			'padding-top': generateCSSUnit( titleVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( titleVrPadding, 'px' ),
		},

		' .rich-text.block-editor-rich-text__editable.uagb-notice-text': {
			'padding-left': generateCSSUnit( contentHrPadding, 'px' ),
			'padding-right': generateCSSUnit( contentHrPadding, 'px' ),
			'padding-top': generateCSSUnit( contentVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( contentVrPadding, 'px' ),
		},

		' .rich-text.block-editor-rich-text__editable.uagb-notice-text p': {
			'font-size': generateCSSUnit( descFontSize, descFontSizeType ),
			'font-weight': descFontWeight,
			'font-family': descFontFamily,
			'line-height': generateCSSUnit(
				descLineHeight,
				descLineHeightType
			),
			color: textColor,
		},

		' span.uagb-notice-dismiss': {
			fill: noticeDismissColor,
		},
	};

	if ( 'modern' == layout ) {
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus'
		][ 'background-color' ] = noticeColor;
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus'
		][ 'border-top-right-radius' ] = '3px';
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus'
		][ 'border-top-left-radius' ] = '3px';

		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-text'
		][ 'background-color' ] = contentBgColor;
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-text'
		].border = '2px solid' + noticeColor;
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-text'
		][ 'border-bottom-left-radius' ] = '3px';
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-text'
		][ 'border-bottom-right-radius' ] = '3px';
	} else if ( 'simple' == layout ) {
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus'
		][ 'background-color' ] = contentBgColor;
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus'
		][ 'border-left' ] =
			generateCSSUnit( highlightWidth, 'px' ) + ' solid ' + noticeColor;

		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-text'
		][ 'background-color' ] = contentBgColor;
		selectors[
			' .rich-text.block-editor-rich-text__editable.uagb-notice-text'
		][ 'border-left' ] =
			generateCSSUnit( highlightWidth, 'px' ) + ' solid ' + noticeColor;
	}
	mobile_selectors = {
		' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus': {
			'font-size': generateCSSUnit(
				titleFontSizeMobile,
				titleFontSizeType
			),
			'line-height': generateCSSUnit(
				titleLineHeightMobile,
				titleLineHeightType
			),
		},

		' .rich-text.block-editor-rich-text__editable.uagb-notice-text p': {
			'font-size': generateCSSUnit(
				descFontSizeMobile,
				descFontSizeType
			),
			'line-height': generateCSSUnit(
				descLineHeightMobile,
				descLineHeightType
			),
		},
	};

	tablet_selectors = {
		' .rich-text.block-editor-rich-text__editable.uagb-notice-title.keep-placeholder-on-focus': {
			'font-size': generateCSSUnit(
				titleFontSizeTablet,
				titleFontSizeType
			),
			'line-height': generateCSSUnit(
				titleLineHeightTablet,
				titleLineHeightType
			),
		},

		' .rich-text.block-editor-rich-text__editable.uagb-notice-text p': {
			'font-size': generateCSSUnit(
				descFontSizeTablet,
				descFontSizeType
			),
			'line-height': generateCSSUnit(
				descLineHeightTablet,
				descLineHeightType
			),
		},
	};

	const base_selector = `.block-editor-page #wpwrap .uagb-block-${ block_id }`;

	let styling_css = generateCSS( selectors, base_selector );

	styling_css += generateCSS(
		tablet_selectors,
		base_selector,
		true,
		'tablet'
	);

	styling_css += generateCSS(
		mobile_selectors,
		base_selector,
		true,
		'mobile'
	);

	return styling_css;
}

export default styling;
