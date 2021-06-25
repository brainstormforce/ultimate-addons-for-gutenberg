/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function InfoBoxStyle( props ) {
	const {
		headingAlign,
		headingColor,
		subHeadingColor,
		prefixColor,
		prefixFontSize,
		prefixFontSizeType,
		prefixFontSizeTablet,
		prefixFontSizeMobile,
		prefixFontFamily,
		prefixFontWeight,
		prefixLineHeightType,
		prefixLineHeight,
		prefixLineHeightTablet,
		prefixLineHeightMobile,
		headFontSize,
		headFontSizeType,
		headFontSizeTablet,
		headFontSizeMobile,
		headFontFamily,
		headFontWeight,
		headLineHeightType,
		headLineHeight,
		headLineHeightTablet,
		headLineHeightMobile,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeTablet,
		subHeadFontSizeMobile,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadLineHeightType,
		subHeadLineHeight,
		subHeadLineHeightTablet,
		subHeadLineHeightMobile,
		separatorWidthType,
		headSpace,
		subHeadSpace,
		iconColor,
		iconSize,
		iconimgPosition,
		iconHover,
		iconimgBorderRadius,
		seperatorStyle,
		seperatorWidth,
		seperatorColor,
		seperatorThickness,
		seperatorSpace,
		ctaLinkColor,
		ctaFontSize,
		ctaFontSizeType,
		ctaFontSizeMobile,
		ctaFontSizeTablet,
		ctaFontFamily,
		ctaFontWeight,
		ctaBtnLinkColor,
		ctaBgColor,
		ctaBtnVertPadding,
		ctaBtnHrPadding,
		ctaBorderStyle,
		ctaBorderColor,
		ctaBorderWidth,
		ctaBorderRadius,
		prefixSpace,
		iconLeftMargin,
		iconRightMargin,
		iconTopMargin,
		iconBottomMargin,
		imageWidth,
		imageWidthType,
		ctaLinkHoverColor,
		ctaBgHoverColor,
		ctaBorderhoverColor,
		ctaIconSpace,
	} = props.attributes;
	const selectors = {
		// Icon css
		' .uagb-ifb-icon': {
			height: generateCSSUnit( iconSize, 'px' ),
			width: generateCSSUnit( iconSize, 'px' ),
			'line-height': generateCSSUnit( iconSize, 'px' ),
		},
		' .uagb-ifb-icon > span': {
			'font-size': generateCSSUnit( iconSize, 'px' ),
			height: generateCSSUnit( iconSize, 'px' ),
			color: iconColor,
			fill: iconColor,
			width: generateCSSUnit( iconSize, 'px' ),
			'line-height': generateCSSUnit( iconSize, 'px' ),
		},
		' .uagb-ifb-icon > svg': {
			fill: iconColor,
		},
		' .uagb-ifb-icon:hover > span': {
			color: iconHover,
		},
		' .uagb-ifb-icon:hover > svg': {
			fill: iconHover,
		},
		' .uagb-infobox_cta-type-all:hover .uagb-ifb-icon svg': {
			fill: iconHover,
		},
		' .uagb-infobox__content-wrap .uagb-ifb-imgicon-wrap': {
			'margin-left': generateCSSUnit( iconLeftMargin, 'px' ),
			'margin-right': generateCSSUnit( iconRightMargin, 'px' ),
			'margin-top': generateCSSUnit( iconTopMargin, 'px' ),
			'margin-bottom': generateCSSUnit( iconBottomMargin, 'px' ),
		},
		' .uagb-infobox .uagb-ifb-image-content img': {
			'border-radius': generateCSSUnit( iconimgBorderRadius, 'px' ),
		},
		// CTA style
		' .uagb-infobox-cta-link': {
			'font-size': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			'font-family': ctaFontFamily,
			'font-weight': ctaFontWeight,
			color: ctaLinkColor,
		},
		' .uagb-infobox-cta-link:hover': {
			color: ctaLinkHoverColor,
		},
		' .uagb-infobox-cta-link .uagb-ifb-text-icon': {
			'font-size': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			height: generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			width: generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			'line-height': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
		},
		' .uagb-infobox-cta-link .uagb-ifb-button-icon': {
			'font-size': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			height: generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			width: generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			'line-height': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
		},
		' .uagb-infobox-cta-link svg': {
			fill: ctaLinkColor,
		},
		' .uagb-infobox-cta-link:hover svg': {
			fill: ctaLinkHoverColor,
		},
		' .uagb-ifb-button-wrapper .uagb-infobox-cta-link': {
			color: ctaBtnLinkColor,
			'background-color': ctaBgColor,
			'border-style': ctaBorderStyle,
			'border-color': ctaBorderColor,
			'border-radius': generateCSSUnit( ctaBorderRadius, 'px' ),
			'border-width': generateCSSUnit( ctaBorderWidth, 'px' ),
			'padding-top': generateCSSUnit( ctaBtnVertPadding, 'px' ),
			'padding-bottom': generateCSSUnit( ctaBtnVertPadding, 'px' ),
			'padding-left': generateCSSUnit( ctaBtnHrPadding, 'px' ),
			'padding-right': generateCSSUnit( ctaBtnHrPadding, 'px' ),
		},
		' .uagb-ifb-button-wrapper:hover .uagb-infobox-cta-link': {
			color: ctaLinkHoverColor,
			'background-color': ctaBgHoverColor,
			'border-color': ctaBorderhoverColor,
		},
		' .uagb-ifb-button-wrapper .uagb-infobox-cta-link svg': {
			fill: ctaBtnLinkColor,
		},
		' .uagb-ifb-button-wrapper .uagb-infobox-cta-link:hover svg': {
			fill: ctaLinkHoverColor,
		},
		// Prefix Style
		' .block-editor-rich-text__editable.uagb-ifb-title-prefix': {
			'font-size': generateCSSUnit( prefixFontSize, prefixFontSizeType ),
			'font-family': prefixFontFamily,
			'font-weight': prefixFontWeight,
			'line-height': generateCSSUnit(
				prefixLineHeight,
				prefixLineHeightType
			),
			color: prefixColor,
			'margin-bottom': generateCSSUnit( prefixSpace, 'px' ),
		},
		// Title Style
		' .block-editor-rich-text__editable.uagb-ifb-title a': {
			color: headingColor,
		},
		' .block-editor-rich-text__editable.uagb-ifb-title': {
			'font-size': generateCSSUnit( headFontSize, headFontSizeType ),
			'font-family': headFontFamily,
			'font-weight': headFontWeight,
			'line-height': generateCSSUnit(
				headLineHeight,
				headLineHeightType
			),
			color: headingColor,
			'margin-bottom': generateCSSUnit( headSpace, 'px' ),
		},
		// Description Style
		' .block-editor-rich-text__editable.uagb-ifb-desc': {
			'font-size': generateCSSUnit(
				subHeadFontSize,
				subHeadFontSizeType
			),
			'font-family': subHeadFontFamily,
			'font-weight': subHeadFontWeight,
			'line-height': generateCSSUnit(
				subHeadLineHeight,
				subHeadLineHeightType
			),
			color: subHeadingColor,
			'margin-bottom': generateCSSUnit( subHeadSpace, 'px' ),
		},
		// Seperator
		' .uagb-ifb-separator': {
			width: generateCSSUnit( seperatorWidth, separatorWidthType ),
			'border-top-width': generateCSSUnit( seperatorThickness, 'px' ),
			'border-top-color': seperatorColor,
			'border-top-style': seperatorStyle,
		},
		' .uagb-ifb-separator-parent': {
			'margin-bottom': generateCSSUnit( seperatorSpace, 'px' ),
		},
		' .uagb-ifb-align-icon-after': {
			'margin-left': generateCSSUnit( ctaIconSpace, 'px' ),
		},
		' .uagb-ifb-align-icon-before': {
			'margin-right': generateCSSUnit( ctaIconSpace, 'px' ),
		},
	};

	if ( imageWidthType ) {
		// Image
		selectors[ ' .uagb-ifb-image-content img' ] = {
			width: generateCSSUnit( imageWidth, 'px' ),
			'max-width': generateCSSUnit( imageWidth, 'px' ),
		};
	}

	if (
		iconimgPosition == 'above-title' ||
		iconimgPosition == 'below-title'
	) {
		selectors[ ' .uagb-infobox__content-wrap' ] = {
			'text-align': headingAlign,
		};
	}

	const tabletSelectors = {
		' .block-editor-rich-text__editable.uagb-ifb-desc': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-ifb-title': {
			'font-size': generateCSSUnit(
				headFontSizeTablet,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightTablet,
				headLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-ifb-title-prefix': {
			'font-size': generateCSSUnit(
				prefixFontSizeTablet,
				prefixFontSizeType
			),
			'line-height': generateCSSUnit(
				prefixLineHeightTablet,
				prefixLineHeightType
			),
		},
		' .uagb-infobox-cta-link': {
			'font-size': generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
		},
		' .uagb-infobox-cta-link .uagb-ifb-text-icon': {
			'font-size': generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
			height: generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
			'line-height': generateCSSUnit(
				ctaFontSizeTablet,
				ctaFontSizeType
			),
			width: generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
		},
		' .uagb-infobox-cta-link .uagb-ifb-button-icon': {
			'font-size': generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
			height: generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
			'line-height': generateCSSUnit(
				ctaFontSizeTablet,
				ctaFontSizeType
			),
			width: generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
		},
	};

	const mobileSelectors = {
		' .block-editor-rich-text__editable.uagb-ifb-desc': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-ifb-title': {
			'font-size': generateCSSUnit(
				headFontSizeMobile,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightMobile,
				headLineHeightType
			),
		},
		' .block-editor-rich-text__editable.uagb-ifb-title-prefix': {
			'font-size': generateCSSUnit(
				prefixFontSizeMobile,
				prefixFontSizeType
			),
			'line-height': generateCSSUnit(
				prefixLineHeightMobile,
				prefixLineHeightType
			),
		},
		' .uagb-infobox-cta-link': {
			'font-size': generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
		},
		' .uagb-infobox-cta-link .uagb-ifb-text-icon': {
			'font-size': generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
			height: generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
			'line-height': generateCSSUnit(
				ctaFontSizeMobile,
				ctaFontSizeType
			),
			width: generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
		},
		' .uagb-infobox-cta-link .uagb-ifb-button-icon': {
			'font-size': generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
			height: generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
			'line-height': generateCSSUnit(
				ctaFontSizeMobile,
				ctaFontSizeType
			),
			width: generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
		},
	};

	const id = `.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
		0,
		8
	) }`;
	let stylingCss = generateCSS( selectors, id );

	stylingCss += generateCSS( tabletSelectors, id, true, 'tablet' );

	stylingCss += generateCSS( mobileSelectors, id, true, 'mobile' );
	return stylingCss;
}

export default InfoBoxStyle;
