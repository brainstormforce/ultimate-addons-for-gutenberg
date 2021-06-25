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
		skinStyle,
		align,
		authorColor,
		descColor,
		descFontSize,
		descFontSizeType,
		descFontSizeTablet,
		descFontSizeMobile,
		descFontFamily,
		descFontWeight,
		descLineHeightType,
		descLineHeight,
		descLineHeightTablet,
		descLineHeightMobile,
		authorFontSize,
		authorFontSizeType,
		authorFontSizeTablet,
		authorFontSizeMobile,
		authorFontFamily,
		authorFontWeight,
		authorLineHeightType,
		authorLineHeight,
		authorLineHeightTablet,
		authorLineHeightMobile,
		descSpace,
		authorSpace,
		borderColor,
		borderStyle,
		borderWidth,
		borderGap,
		verticalPadding,
		quoteColor,
		quoteSize,
		quoteSizeType,
		quoteSizeTablet,
		quoteSizeMobile,
		quoteBgColor,
		enableTweet,
		tweetBtnFontSize,
		tweetBtnFontSizeType,
		tweetBtnFontSizeTablet,
		tweetBtnFontSizeMobile,
		tweetBtnFontFamily,
		tweetBtnFontWeight,
		tweetBtnLineHeightType,
		tweetBtnLineHeight,
		tweetBtnLineHeightTablet,
		tweetBtnLineHeightMobile,
		tweetLinkColor,
		tweetBtnColor,
		tweetBtnBgColor,
		tweetBtnHoverColor,
		tweetBtnBgHoverColor,
		tweetBtnHrPadding,
		tweetBtnVrPadding,
		tweetIconSpacing,
		authorImageWidth,
		authorImgBorderRadius,
		quoteBorderRadius,
		quoteTopMargin,
		quoteBottomMargin,
		quoteLeftMargin,
		quoteRightMargin,
		quoteHoverColor,
		quoteBgHoverColor,
		borderHoverColor,
		quotePadding,
		quotePaddingType,
		quotePaddingTablet,
		quotePaddingMobile,
	} = props.attributes;

	let tmpAuthorSpace = authorSpace;

	if ( align !== 'center' || skinStyle === 'border' ) {
		tmpAuthorSpace = 0;
	}
	//Set align to left for border style
	let textAlign = align;

	if ( skinStyle === 'border' ) {
		textAlign = 'left';
	}

	const selectors = {
		' .uagb-blockquote__content.block-editor-rich-text__editable': {
			'font-size': generateCSSUnit( descFontSize, descFontSizeType ),
			'font-family': descFontFamily,
			'font-weight': descFontWeight,
			'line-height': generateCSSUnit(
				descLineHeight,
				descLineHeightType
			),
			color: descColor,
			'margin-bottom': generateCSSUnit( descSpace, 'px' ),
			'text-align': textAlign,
		},
		' .uagb-blockquote__author.block-editor-rich-text__editable': {
			'font-size': generateCSSUnit( authorFontSize, authorFontSizeType ),
			'font-family': authorFontFamily,
			'font-weight': authorFontWeight,
			'line-height': generateCSSUnit(
				authorLineHeight,
				authorLineHeightType
			),
			color: authorColor,
			'text-align': textAlign,
		},
		' .uagb-blockquote__skin-border blockquote.uagb-blockquote': {
			'border-color': borderColor,
			'border-left-style': borderStyle,
			'border-left-width': generateCSSUnit( borderWidth, 'px' ),
			'padding-left': generateCSSUnit( borderGap, 'px' ),
			'padding-top': generateCSSUnit( verticalPadding, 'px' ),
			'padding-bottom': generateCSSUnit( verticalPadding, 'px' ),
		},
		' .uagb-blockquote__skin-border blockquote.uagb-blockquote:hover': {
			'border-left-color': borderHoverColor,
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap': {
			background: quoteBgColor,
			'border-radius': generateCSSUnit( quoteBorderRadius, '%' ),
			'margin-top': generateCSSUnit( quoteTopMargin, 'px' ),
			'margin-bottom': generateCSSUnit( quoteBottomMargin, 'px' ),
			'margin-left': generateCSSUnit( quoteLeftMargin, 'px' ),
			'margin-right': generateCSSUnit( quoteRightMargin, 'px' ),
			padding: generateCSSUnit( quotePadding, quotePaddingType ),
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon': {
			width: generateCSSUnit( quoteSize, quoteSizeType ),
			height: generateCSSUnit( quoteSize, quoteSizeType ),
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon svg': {
			fill: quoteColor,
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap:hover': {
			background: quoteBgHoverColor,
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap:hover .uagb-blockquote__icon svg': {
			fill: quoteHoverColor,
		},
		' .uagb-blockquote__style-style_1 .uagb-blockquote': {
			'text-align': align,
		},
		' .uagb-blockquote__author-wrap': {
			'margin-bottom': generateCSSUnit( tmpAuthorSpace, 'px' ),
		},
		' .uagb-blockquote__author-image img': {
			width: generateCSSUnit( authorImageWidth, 'px' ),
			height: generateCSSUnit( authorImageWidth, 'px' ),
			'border-radius': generateCSSUnit( authorImgBorderRadius, '%' ),
		},
	};

	if ( enableTweet ) {
		selectors[ ' a.uagb-blockquote__tweet-button' ] = {
			'font-size': generateCSSUnit(
				tweetBtnFontSize,
				tweetBtnFontSizeType
			),
			'font-family': tweetBtnFontFamily,
			'font-weight': tweetBtnFontWeight,
			'line-height': generateCSSUnit(
				tweetBtnLineHeight,
				tweetBtnLineHeightType
			),
		};
		selectors[
			' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button'
		] = {
			color: tweetLinkColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button svg'
		] = {
			fill: tweetLinkColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button'
		] = {
			color: tweetBtnColor,
			'background-color': tweetBtnBgColor,
			'padding-left': generateCSSUnit( tweetBtnHrPadding, 'px' ),
			'padding-right': generateCSSUnit( tweetBtnHrPadding, 'px' ),
			'padding-top': generateCSSUnit( tweetBtnVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( tweetBtnVrPadding, 'px' ),
		};

		selectors[
			' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button svg'
		] = {
			fill: tweetBtnColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button'
		] = {
			color: tweetBtnColor,
			'background-color': tweetBtnBgColor,
			'padding-left': generateCSSUnit( tweetBtnHrPadding, 'px' ),
			'padding-right': generateCSSUnit( tweetBtnHrPadding, 'px' ),
			'padding-top': generateCSSUnit( tweetBtnVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( tweetBtnVrPadding, 'px' ),
		};
		selectors[
			' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button svg'
		] = {
			fill: tweetBtnColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:before'
		] = {
			'border-right-color': tweetBtnBgColor,
		};

		selectors[ ' a.uagb-blockquote__tweet-button svg' ] = {
			width: generateCSSUnit( tweetBtnFontSize, tweetBtnFontSizeType ),
			height: generateCSSUnit( tweetBtnFontSize, tweetBtnFontSizeType ),
		};

		selectors[
			' .uagb-blockquote__tweet-icon_text a.uagb-blockquote__tweet-button svg'
		] = {
			'margin-right': generateCSSUnit( tweetIconSpacing, 'px' ),
		};

		// Hover CSS
		selectors[
			' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button:hover'
		] = {
			color: tweetBtnHoverColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button:hover svg'
		] = {
			fill: tweetBtnHoverColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button:hover'
		] = {
			color: tweetBtnHoverColor,
			'background-color': tweetBtnBgHoverColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button:hover svg'
		] = {
			fill: tweetBtnHoverColor,
			'background-color': tweetBtnBgHoverColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover '
		] = {
			color: tweetBtnHoverColor,
			'background-color': tweetBtnBgHoverColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover svg'
		] = {
			fill: tweetBtnHoverColor,
			'background-color': tweetBtnBgHoverColor,
		};

		selectors[
			' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover:before'
		] = {
			'border-right-color': tweetBtnBgHoverColor,
		};
	}

	const tabletSelectors = {
		' .uagb-blockquote__content.block-editor-rich-text__editable': {
			'font-size': generateCSSUnit(
				descFontSizeTablet,
				descFontSizeType
			),
			'line-height': generateCSSUnit(
				descLineHeightTablet,
				descLineHeightType
			),
		},
		' .uagb-blockquote__author.block-editor-rich-text__editable': {
			'font-size': generateCSSUnit(
				authorFontSizeTablet,
				authorFontSizeType
			),
			'line-height': generateCSSUnit(
				authorLineHeightTablet,
				authorLineHeightType
			),
		},
		' a.uagb-blockquote__tweet-button': {
			'font-size': generateCSSUnit(
				tweetBtnFontSizeTablet,
				tweetBtnFontSizeType
			),
			'line-height': generateCSSUnit(
				tweetBtnLineHeightTablet,
				tweetBtnLineHeightType
			),
		},
		' a.uagb-blockquote__tweet-button svg': {
			width: generateCSSUnit(
				tweetBtnFontSizeTablet,
				tweetBtnFontSizeType
			),
			height: generateCSSUnit(
				tweetBtnFontSizeTablet,
				tweetBtnFontSizeType
			),
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap': {
			padding: generateCSSUnit( quotePaddingTablet, quotePaddingType ),
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon': {
			width: generateCSSUnit( quoteSizeTablet, quoteSizeType ),
			height: generateCSSUnit( quoteSizeTablet, quoteSizeType ),
		},
	};

	const mobileSelectors = {
		' .uagb-blockquote__content.block-editor-rich-text__editable': {
			'font-size': generateCSSUnit(
				descFontSizeMobile,
				descFontSizeType
			),
			'line-height': generateCSSUnit(
				descLineHeightMobile,
				descLineHeightType
			),
		},
		' .uagb-blockquote__author.block-editor-rich-text__editable': {
			'font-size': generateCSSUnit(
				authorFontSizeMobile,
				authorFontSizeType
			),
			'line-height': generateCSSUnit(
				authorLineHeightMobile,
				authorLineHeightType
			),
		},
		' a.uagb-blockquote__tweet-button': {
			'font-size': generateCSSUnit(
				tweetBtnFontSizeMobile,
				tweetBtnFontSizeType
			),
			'line-height': generateCSSUnit(
				tweetBtnLineHeightMobile,
				tweetBtnLineHeightType
			),
		},
		' a.uagb-blockquote__tweet-button svg': {
			width: generateCSSUnit(
				tweetBtnFontSizeMobile,
				tweetBtnFontSizeType
			),
			height: generateCSSUnit(
				tweetBtnFontSizeMobile,
				tweetBtnFontSizeType
			),
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap': {
			padding: generateCSSUnit( quotePaddingMobile, quotePaddingType ),
		},
		' .uagb-blockquote__skin-quotation .uagb-blockquote__icon': {
			width: generateCSSUnit( quoteSizeMobile, quoteSizeType ),
			height: generateCSSUnit( quoteSizeMobile, quoteSizeType ),
		},
	};

	const baseSelector = `.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
		0,
		8
	) }`;

	let stylingCss = generateCSS( selectors, baseSelector );

	stylingCss += generateCSS( tabletSelectors, baseSelector, true, 'tablet' );

	stylingCss += generateCSS( mobileSelectors, baseSelector, true, 'mobile' );

	return stylingCss;
}

export default styling;
