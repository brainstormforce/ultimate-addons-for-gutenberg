/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function contentTimelineStyle( props ) {
	const {
		dateBottomspace,
		backgroundColor,
		separatorColor,
		separatorFillColor,
		separatorBg,
		separatorBorder,
		borderFocus,
		verticalSpace,
		horizontalSpace,
		separatorwidth,
		borderwidth,
		connectorBgsize,
		borderRadius,
		bgPadding,
		iconColor,
		dateFontsizeType,
		dateFontsize,
		dateFontsizeTablet,
		dateFontsizeMobile,
		dateFontFamily,
		dateFontWeight,
		dateLineHeightType,
		dateLineHeight,
		dateLineHeightTablet,
		dateLineHeightMobile,
		dateColor,
		iconSize,
		iconFocus,
		iconBgFocus,
		headFontSizeType,
		headFontSize,
		headFontSizeTablet,
		headFontSizeMobile,
		headFontFamily,
		headFontWeight,
		headLineHeightType,
		headLineHeight,
		headLineHeightTablet,
		headLineHeightMobile,
		align,
		headingColor,
		headSpace,
		subHeadFontSizeType,
		subHeadFontSize,
		subHeadFontSizeTablet,
		subHeadFontSizeMobile,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadLineHeightType,
		subHeadLineHeight,
		subHeadLineHeightTablet,
		subHeadLineHeightMobile,
		subHeadingColor,
		authorSpace,
		authorColor,
		authorFontSizeType,
		authorFontSize,
		authorFontSizeTablet,
		authorFontSizeMobile,
		authorFontFamily,
		authorFontWeight,
		authorLineHeightType,
		authorLineHeight,
		authorLineHeightTablet,
		authorLineHeightMobile,
		ctaColor,
		ctaFontSizeType,
		ctaFontSize,
		ctaFontSizeTablet,
		ctaFontSizeMobile,
		ctaFontFamily,
		ctaFontWeight,
		ctaLineHeightType,
		ctaLineHeight,
		ctaLineHeightTablet,
		ctaLineHeightMobile,
		ctaBackground,
	} = props.attributes;

	const respSelectors = 'left';

	const selectors = {
		' .uagb-timeline__heading': {
			'font-size': generateCSSUnit( headFontSize, headFontSizeType ),
			'font-family': headFontFamily,
			'font-weight': headFontWeight,
			'line-height': generateCSSUnit(
				headLineHeight,
				headLineHeightType
			),
			'text-align': align,
			color: headingColor,
		},
		' .uagb-timeline__heading a': {
			'font-size': generateCSSUnit( headFontSize, headFontSizeType ),
			'font-family': headFontFamily,
			'font-weight': headFontWeight,
			'line-height': generateCSSUnit(
				headLineHeight,
				headLineHeightType
			),
			'text-align': align,
			color: headingColor,
		},
		' .uagb-timeline__heading-text': {
			'margin-bottom': generateCSSUnit( headSpace, 'px' ),
		},
		' .uagb-timeline-desc-content': {
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
			'text-align': align,
			color: subHeadingColor,
		},
		' .uagb-timeline__day-new': {
			'text-align': align,
		},
		' .uagb-timeline__date-inner': {
			'text-align': align,
		},
		'.uagb-timeline__center-block .uagb-timeline__day-right .uagb-timeline__arrow:after': {
			'border-left-color': backgroundColor,
		},
		'.uagb-timeline__right-block .uagb-timeline__day-right .uagb-timeline__arrow:after': {
			'border-left-color': backgroundColor,
		},
		'.uagb-timeline__center-block .uagb-timeline__day-left .uagb-timeline__arrow:after': {
			'border-right-color': backgroundColor,
		},
		'.uagb-timeline__left-block .uagb-timeline__day-left .uagb-timeline__arrow:after': {
			'border-right-color': backgroundColor,
		},
		' .uagb-timeline__line__inner': {
			'background-color': separatorFillColor,
		},
		' .uagb-timeline__line': {
			'background-color': separatorColor,
			width: generateCSSUnit( separatorwidth, 'px' ),
		},
		'.uagb-timeline__right-block .uagb-timeline__line': {
			right: 'calc( ' + connectorBgsize + 'px / 2 )',
		},
		'.uagb-timeline__left-block .uagb-timeline__line': {
			left: 'calc( ' + connectorBgsize + 'px / 2 )',
		},
		'.uagb-timeline__center-block .uagb-timeline__line': {
			right: 'calc( ' + connectorBgsize + 'px / 2 )',
		},
		' .uagb-timeline__marker': {
			'background-color': separatorBg,
			'min-height': generateCSSUnit( connectorBgsize, 'px' ),
			'min-width': generateCSSUnit( connectorBgsize, 'px' ),
			'line-height': generateCSSUnit( connectorBgsize, 'px' ),
			border: borderwidth + 'px solid' + separatorBorder,
		},
		'.uagb-timeline__left-block .uagb-timeline__left .uagb-timeline__arrow': {
			height: generateCSSUnit( connectorBgsize, 'px' ),
		},
		'.uagb-timeline__right-block .uagb-timeline__right .uagb-timeline__arrow': {
			height: generateCSSUnit( connectorBgsize, 'px' ),
		},
		'.uagb-timeline__center-block .uagb-timeline__left .uagb-timeline__arrow': {
			height: generateCSSUnit( connectorBgsize, 'px' ),
		},
		'.uagb-timeline__center-block .uagb-timeline__right .uagb-timeline__arrow': {
			height: generateCSSUnit( connectorBgsize, 'px' ),
		},
		'.uagb-timeline__center-block .uagb-timeline__marker': {
			'margin-left': generateCSSUnit( horizontalSpace, 'px' ),
			'margin-right': generateCSSUnit( horizontalSpace, 'px' ),
		},
		' .uagb-timeline__field:not(:last-child)': {
			'margin-bottom': generateCSSUnit( verticalSpace, 'px' ),
		},
		' .uagb-timeline__date-hide.uagb-timeline__date-inner': {
			'margin-bottom': generateCSSUnit( dateBottomspace, 'px' ),
			color: dateColor,
			'font-size': generateCSSUnit( dateFontsize, dateFontsizeType ),
			'font-family': dateFontFamily,
			'font-weight': dateFontWeight,
			'line-height': generateCSSUnit(
				dateLineHeight,
				dateLineHeightType
			),
			'text-align': align,
		},
		'.uagb-timeline__left-block .uagb-timeline__day-new.uagb-timeline__day-left': {
			'margin-left': generateCSSUnit( horizontalSpace, 'px' ),
		},
		'.uagb-timeline__right-block .uagb-timeline__day-new.uagb-timeline__day-right': {
			'margin-right': generateCSSUnit( horizontalSpace, 'px' ),
		},
		' .uagb-timeline__date-new': {
			color: dateColor,
			'font-size': generateCSSUnit( dateFontsize, dateFontsizeType ),
			'font-family': dateFontFamily,
			'font-weight': dateFontWeight,
			'line-height': generateCSSUnit(
				dateLineHeight,
				dateLineHeightType
			),
		},
		' .uagb-timeline__events-inner-new': {
			'background-color': backgroundColor,
			'border-radius': generateCSSUnit( borderRadius, 'px' ),
			padding: generateCSSUnit( bgPadding, 'px' ),
		},
		' .uagb-timeline__main .uagb-timeline__icon-new': {
			color: iconColor,
			'font-size': generateCSSUnit( iconSize, 'px' ),
			width: generateCSSUnit( iconSize, 'px' ),
		},
		' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon': {
			background: iconBgFocus,
			'border-color': borderFocus,
		},
		' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new': {
			color: iconFocus,
		},
		' .uagb-timeline__main .uagb-timeline__icon-new svg': {
			fill: iconColor,
		},
		' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new svg': {
			fill: iconFocus,
		},

		//Author and CTA
		' .uagb-timeline__author': {
			'margin-bottom': generateCSSUnit( authorSpace, 'px' ),
			'text-align': align,
		},
		' .uagb-timeline__author .dashicons-admin-users': {
			'font-size': generateCSSUnit( authorFontSize, authorFontSizeType ),
			'font-weight': authorFontWeight,
			'line-height': generateCSSUnit(
				authorLineHeight,
				authorLineHeightType
			),
			color: authorColor,
		},
		' .uagb-timeline__author-link': {
			'font-size': generateCSSUnit( authorFontSize, authorFontSizeType ),
			'font-family': authorFontFamily,
			'font-weight': authorFontWeight,
			'line-height': generateCSSUnit(
				authorLineHeight,
				authorLineHeightType
			),
			color: authorColor,
		},

		' .uagb-timeline__link_parent': {
			'text-align': align,
		},
		' .uagb-timeline__link': {
			'font-size': generateCSSUnit( ctaFontSize, ctaFontSizeType ),
			'font-family': ctaFontFamily,
			'font-weight': ctaFontWeight,
			'line-height': generateCSSUnit( ctaLineHeight, ctaLineHeightType ),
			color: ctaColor,
			'background-color': ctaBackground,
		},
	};

	/* Generate Responsive CSS for timeline */
	const tabletSelectors = {
		' .uagb-timeline__date-hide.uagb-timeline__date-inner': {
			'font-size': generateCSSUnit(
				dateFontsizeTablet,
				dateFontsizeType
			),
			'line-height': generateCSSUnit(
				dateLineHeightTablet,
				dateLineHeightType
			),
		},
		' .uagb-timeline__date-new': {
			'font-size': generateCSSUnit(
				dateFontsizeTablet,
				dateFontsizeType
			),
			'line-height': generateCSSUnit(
				dateLineHeightTablet,
				dateLineHeightType
			),
		},
		' .uagb-timeline__heading': {
			'font-size': generateCSSUnit(
				headFontSizeTablet,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightTablet,
				headLineHeightType
			),
		},
		' .uagb-timeline__heading a': {
			'font-size': generateCSSUnit(
				headFontSizeTablet,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightTablet,
				headLineHeightType
			),
		},
		' .uagb-timeline-desc-content': {
			'font-size': generateCSSUnit(
				subHeadFontSizeTablet,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightTablet,
				subHeadLineHeightType
			),
		},
		'.uagb-timeline__center-block .uagb-timeline__marker': {
			'margin-left': 0,
			'margin-right': 0,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__heading': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline-desc-content': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__day-new': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__date-inner': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__date-hide.uagb-timeline__date-inner': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__day-right .uagb-timeline__arrow:after': {
			'border-right-color': backgroundColor,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__author': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__link_parent': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__image a': {
			'text-align': respSelectors,
		},

		// CTA AUTHOR.
		' .uagb-timeline__author .dashicons-admin-users': {
			'font-size': generateCSSUnit(
				authorFontSizeTablet,
				authorFontSizeType
			),
			'line-height': generateCSSUnit(
				authorLineHeightTablet,
				authorLineHeightType
			),
		},
		' .uagb-timeline__author-link': {
			'font-size': generateCSSUnit(
				authorFontSizeTablet,
				authorFontSizeType
			),
			'line-height': generateCSSUnit(
				authorLineHeightTablet,
				authorLineHeightType
			),
		},
		' .uagb-timeline__link': {
			'font-size': generateCSSUnit( ctaFontSizeTablet, ctaFontSizeType ),
			'line-height': generateCSSUnit(
				ctaLineHeightTablet,
				ctaLineHeightType
			),
		},
	};

	const mobileSelectors = {
		' .uagb-timeline__date-hide.uagb-timeline__date-inner': {
			'font-size': generateCSSUnit(
				dateFontsizeMobile,
				dateFontsizeType
			),
			'line-height': generateCSSUnit(
				dateLineHeightMobile,
				dateLineHeightType
			),
		},
		' .uagb-timeline__date-new': {
			'font-size': generateCSSUnit(
				dateFontsizeMobile,
				dateFontsizeType
			),
			'line-height': generateCSSUnit(
				dateLineHeightMobile,
				dateLineHeightType
			),
		},
		' .uagb-timeline__heading': {
			'font-size': generateCSSUnit(
				headFontSizeMobile,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightMobile,
				headLineHeightType
			),
		},
		' .uagb-timeline__heading a': {
			'font-size': generateCSSUnit(
				headFontSizeMobile,
				headFontSizeType
			),
			'line-height': generateCSSUnit(
				headLineHeightMobile,
				headLineHeightType
			),
		},
		' .uagb-timeline-desc-content': {
			'font-size': generateCSSUnit(
				subHeadFontSizeMobile,
				subHeadFontSizeType
			),
			'line-height': generateCSSUnit(
				subHeadLineHeightMobile,
				subHeadLineHeightType
			),
		},
		'.uagb-timeline__center-block .uagb-timeline__marker': {
			'margin-left': 0,
			'margin-right': 0,
		},
		'.uagb-timeline__center-block .uagb-timeline__day-new.uagb-timeline__day-left': {
			'margin-left': generateCSSUnit( horizontalSpace, 'px' ),
		},
		'.uagb-timeline__center-block .uagb-timeline__day-new.uagb-timeline__day-right': {
			'margin-left': generateCSSUnit( horizontalSpace, 'px' ),
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__heading': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline-desc-content': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__day-new': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__date-inner': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__date-hide.uagb-timeline__date-inner': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__day-right .uagb-timeline__arrow:after': {
			'border-right-color': backgroundColor,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__author': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__link_parent': {
			'text-align': respSelectors,
		},
		'.uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__image a': {
			'text-align': respSelectors,
		},

		// CTA  AUthor
		' .uagb-timeline__author .dashicons-admin-users': {
			'font-size': generateCSSUnit(
				authorFontSizeMobile,
				authorFontSizeType
			),
			'line-height': generateCSSUnit(
				authorLineHeightMobile,
				authorLineHeightType
			),
		},
		' .uagb-timeline__author-link': {
			'font-size': generateCSSUnit(
				authorFontSizeMobile,
				authorFontSizeType
			),
			'line-height': generateCSSUnit(
				authorLineHeightMobile,
				authorLineHeightType
			),
		},
		' .uagb-timeline__link': {
			'font-size': generateCSSUnit( ctaFontSizeMobile, ctaFontSizeType ),
			'line-height': generateCSSUnit(
				ctaLineHeightMobile,
				ctaLineHeightType
			),
		},
	};

	let stylingCss = '';
	const id = `.block-editor-page #wpwrap .uagb-block-${ props.clientId }`;

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

export default contentTimelineStyle;
