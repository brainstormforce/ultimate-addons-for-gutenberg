/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function testimonialStyle( props ) {
	const {
		headingAlign,
		companyColor,
		descColor,
		authorColor,
		nameFontSizeType,
		nameFontSize,
		nameFontSizeTablet,
		nameFontSizeMobile,
		nameFontFamily,
		nameFontWeight,
		nameLineHeightType,
		nameLineHeight,
		nameLineHeightTablet,
		nameLineHeightMobile,
		companyFontSizeType,
		companyFontSize,
		companyFontSizeTablet,
		companyFontSizeMobile,
		companyFontFamily,
		companyFontWeight,
		companyLineHeightType,
		companyLineHeight,
		companyLineHeightTablet,
		companyLineHeightMobile,
		descFontSizeType,
		descFontSize,
		descFontSizeTablet,
		descFontSizeMobile,
		descFontFamily,
		descFontWeight,
		descLineHeightType,
		descLineHeight,
		descLineHeightTablet,
		descLineHeightMobile,
		descSpace,
		nameSpace,
		imgVrPadding,
		imgHrPadding,
		imageWidth,
		rowGap,
		columnGap,
		contentPadding,
		backgroundColor,
		backgroundImage,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundImageColor,
		backgroundOpacity,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		arrowColor,
		test_item_count,
		columns,
		arrowDots,
		arrowSize,
	} = props.attributes;

	let imgAlign = 'center';

	if ( headingAlign == 'left' ) {
		imgAlign = 'flex-start';
	} else if ( headingAlign == 'right' ) {
		imgAlign = 'flex-end';
	}

	const position = backgroundPosition.replace( '-', ' ' );

	const selectors = {
		' .uagb-testimonial__wrap': {
			'padding-left': generateCSSUnit( columnGap / 2, 'px' ),
			'padding-right': generateCSSUnit( columnGap / 2, 'px' ),
			'margin-bottom': generateCSSUnit( rowGap, 'px' ),
		},
		' .uagb-testimonial__wrap .uagb-tm__image-content': {
			'padding-left': generateCSSUnit( imgHrPadding, 'px' ),
			'padding-right': generateCSSUnit( imgHrPadding, 'px' ),
			'padding-top': generateCSSUnit( imgVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( imgVrPadding, 'px' ),
		},
		' .uagb-tm__image-position-top .uagb-tm__image-content': {
			'justify-content': imgAlign,
		},
		// Image
		' .uagb-tm__image img': {
			width: generateCSSUnit( imageWidth, 'px' ),
			'max-width': generateCSSUnit( imageWidth, 'px' ),
		},
		' .uagb-tm__content': {
			'text-align': headingAlign,
			padding: generateCSSUnit( contentPadding, 'px' ),
		},
		// Prefix Style
		' .uagb-tm__author-name': {
			'font-size': generateCSSUnit( nameFontSize, nameFontSizeType ),
			'font-family': nameFontFamily,
			'font-weight': nameFontWeight,
			'line-height': generateCSSUnit(
				nameLineHeight,
				nameLineHeightType
			),
			color: authorColor,
			'margin-bottom': generateCSSUnit( nameSpace, 'px' ),
		},
		// Title Style
		' .uagb-tm__company': {
			'font-size': generateCSSUnit(
				companyFontSize,
				companyFontSizeType
			),
			'font-family': companyFontFamily,
			'font-weight': companyFontWeight,
			'line-height': generateCSSUnit(
				companyLineHeight,
				companyLineHeightType
			),
			color: companyColor,
		},
		// Description Style
		' .uagb-tm__desc': {
			'font-size': generateCSSUnit( descFontSize, descFontSizeType ),
			'font-family': descFontFamily,
			'font-weight': descFontWeight,
			'line-height': generateCSSUnit(
				descLineHeight,
				descLineHeightType
			),
			color: descColor,
			'margin-bottom': generateCSSUnit( descSpace, 'px' ),
		},
		' .uagb-testimonial__wrap.uagb-tm__bg-type-color .uagb-tm__content': {
			'background-color': backgroundColor,
		},
		' .uagb-testimonial__wrap.uagb-tm__bg-type-image .uagb-tm__content': {
			'background-image': backgroundImage
				? `url(${ backgroundImage.url })`
				: null,
			'background-position': position,
			'background-repeat': backgroundRepeat,
			'background-size': backgroundSize,
		},
		' .uagb-testimonial__wrap.uagb-tm__bg-type-image .uagb-tm__overlay': {
			'background-color': backgroundImageColor,
			opacity:
				typeof backgroundOpacity !== 'undefined'
					? ( 100 - backgroundOpacity ) / 100
					: 0.5,
		},
		' ul.slick-dots li button:before': {
			color: arrowColor,
		},
		' ul.slick-dots li.slick-active button:before': {
			color: arrowColor,
		},
		' .slick-arrow svg': {
			fill: arrowColor,
			height: generateCSSUnit( arrowSize, 'px' ),
			width: generateCSSUnit( arrowSize, 'px' ),
		},
	};

	if ( test_item_count == columns ) {
		selectors[ '.uagb-slick-carousel' ] = {
			padding: '0',
		};
	}

	if ( borderStyle != 'none' ) {
		selectors[ ' .uagb-testimonial__wrap .uagb-tm__content' ] = {
			'border-color': borderColor,
			'border-style': borderStyle,
			'border-width': generateCSSUnit( borderWidth, 'px' ),
			'border-radius': generateCSSUnit( borderRadius, 'px' ),
		};
	} else {
		selectors[ ' .uagb-testimonial__wrap .uagb-tm__content' ] = {
			'border-radius': generateCSSUnit( borderRadius, 'px' ),
		};
	}

	if ( arrowDots === 'dots' ) {
		selectors[ ' .uagb-slick-carousel.uagb-tm__arrow-outside' ] = {
			padding: '0 0 35px 0',
		};
	}

	if ( test_item_count === 1 || test_item_count === columns ) {
		selectors[ ' .uagb-slick-carousel.uagb-tm__arrow-outside' ] = {
			padding: '0',
		};
	}

	const mobileSelectors = {
		' .uagb-tm__desc': {
			'font-size': generateCSSUnit(
				descFontSizeMobile,
				descFontSizeType
			),
			'line-height': generateCSSUnit(
				descLineHeightMobile,
				descLineHeightType
			),
		},
		' .uagb-tm__company': {
			'font-size': generateCSSUnit(
				companyFontSizeMobile,
				companyFontSizeType
			),
			'line-height': generateCSSUnit(
				companyLineHeightMobile,
				companyLineHeightType
			),
		},
		' .uagb-tm__author-name': {
			'font-size': generateCSSUnit(
				nameFontSizeMobile,
				nameFontSizeType
			),
			'line-height': generateCSSUnit(
				nameLineHeightMobile,
				nameLineHeightType
			),
		},
	};

	const tabletSelectors = {
		' .uagb-tm__desc': {
			'font-size': generateCSSUnit(
				descFontSizeTablet,
				descFontSizeType
			),
			'line-height': generateCSSUnit(
				descLineHeightTablet,
				descLineHeightType
			),
		},
		' .uagb-tm__company': {
			'font-size': generateCSSUnit(
				companyFontSizeTablet,
				companyFontSizeType
			),
			'line-height': generateCSSUnit(
				companyLineHeightTablet,
				companyLineHeightType
			),
		},
		' .uagb-tm__author-name': {
			'font-size': generateCSSUnit(
				nameFontSizeTablet,
				nameFontSizeType
			),
			'line-height': generateCSSUnit(
				nameLineHeightTablet,
				nameLineHeightType
			),
		},
		' .uagb-tm__content': {
			'text-align': 'center',
		},
	};

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

export default testimonialStyle;
