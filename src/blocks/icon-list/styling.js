/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		align,
		gap,
		inner_gap,
		icon_layout,
		size,
		sizeType,
		sizeTablet,
		sizeMobile,
		fontSize,
		fontSizeType,
		fontSizeMobile,
		fontSizeTablet,
		fontFamily,
		fontWeight,
		lineHeightType,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		stack,
		border,
		bgSize,
		borderRadius,
	} = props.attributes;

	let selectors = {};
	let tabletSelectors = {};
	let mobileSelectors = {};
	let alignment = '';
	if ( align == 'left' ) {
		alignment = 'flex-start';
	} else if ( align == 'right' ) {
		alignment = 'flex-end';
	} else {
		alignment = 'center';
	}

	const editorGap = undefined !== typeof gap && '' !== gap ? gap + 15 : 15;

	selectors = {
		' .uagb-icon-list__source-wrap': {
			padding: generateCSSUnit( bgSize, 'px' ),
			'border-radius': generateCSSUnit( borderRadius, 'px' ),
			'border-style':
				0 == border || undefined == border ? 'none' : 'solid',
			'border-width': generateCSSUnit( border, 'px' ),
		},
		'.uagb-icon-list__layout-vertical .wp-block[data-type="uagb/icon-list-child"]': {
			'margin-left': 0,
			'margin-right': 0,
			'margin-bottom': generateCSSUnit( editorGap, 'px' ),
		},
		'.uagb-icon-list__layout-vertical .uagb-icon-list__wrap': {
			'flex-direction': 'column',
		},
		'.uagb-icon-list__layout-vertical .uagb-icon-list__wrapper:last-child': {
			'margin-bottom': 0,
		},
		'.uagb-icon-list__layout-horizontal .wp-block[data-type="uagb/icon-list-child"]': {
			'margin-left': generateCSSUnit( editorGap / 2, 'px' ),
			'margin-right': generateCSSUnit( editorGap / 2, 'px' ),
		},
		'.uagb-icon-list__layout-horizontal .wp-block[data-type="uagb/icon-list-child"]:first-child': {
			'margin-left': 0,
		},
		'.uagb-icon-list__layout-horizontal .wp-block[data-type="uagb/icon-list-child"]:last-child': {
			'margin-right': 0,
		},
		' .uagb-icon-list__source-image': {
			width: generateCSSUnit( size, sizeType ),
		},
		' .uagb-icon-list__source-icon': {
			width: generateCSSUnit( size, sizeType ),
			height: generateCSSUnit( size, sizeType ),
			'font-size': generateCSSUnit( size, sizeType ),
		},
		' .uagb-icon-list__source-icon svg': {
			width: generateCSSUnit( size, sizeType ),
			height: generateCSSUnit( size, sizeType ),
		},
		' .uagb-icon-list__source-icon:before': {
			width: generateCSSUnit( size, sizeType ),
			height: generateCSSUnit( size, sizeType ),
			'font-size': generateCSSUnit( size, sizeType ),
		},
		' .uagb-icon-list__label-wrap': {
			'text-align': align,
		},
		' .uagb-icon-list__wrap .block-editor-inner-blocks': {
			'text-align': align,
		},
	};

	mobileSelectors = {
		' .uagb-icon-list__source-image': {
			width: generateCSSUnit( sizeMobile, sizeType ),
		},
		' .uagb-icon-list__source-icon': {
			width: generateCSSUnit( sizeMobile, sizeType ),
			height: generateCSSUnit( sizeMobile, sizeType ),
			'font-size': generateCSSUnit( sizeMobile, sizeType ),
		},
		' .uagb-icon-list__source-icon svg': {
			width: generateCSSUnit( sizeMobile, sizeType ),
			height: generateCSSUnit( sizeMobile, sizeType ),
		},
		' .uagb-icon-list__source-icon:before': {
			width: generateCSSUnit( sizeMobile, sizeType ),
			height: generateCSSUnit( sizeMobile, sizeType ),
			'font-size': generateCSSUnit( sizeMobile, sizeType ),
		},
	};

	tabletSelectors = {
		' .uagb-icon-list__source-image': {
			width: generateCSSUnit( sizeTablet, sizeType ),
		},
		' .uagb-icon-list__source-icon': {
			width: generateCSSUnit( sizeTablet, sizeType ),
			height: generateCSSUnit( sizeTablet, sizeType ),
			'font-size': generateCSSUnit( sizeTablet, sizeType ),
		},
		' .uagb-icon-list__source-icon svg': {
			width: generateCSSUnit( sizeTablet, sizeType ),
			height: generateCSSUnit( sizeTablet, sizeType ),
		},
		' .uagb-icon-list__source-icon:before': {
			width: generateCSSUnit( sizeTablet, sizeType ),
			height: generateCSSUnit( sizeTablet, sizeType ),
			'font-size': generateCSSUnit( sizeTablet, sizeType ),
		},
	};

	if ( 'horizontal' == icon_layout ) {
		if ( 'tablet' == stack ) {
			tabletSelectors[
				' .uagb-icon-list__wrap .wp-block[data-type="uagb/icon-list-child"]'
			] = {
				'margin-left': 0,
				'margin-right': 0,
				'margin-bottom': generateCSSUnit( editorGap, 'px' ),
			};

			tabletSelectors[ ' .uagb-icon-list__wrap' ] = {
				'flex-direction': 'column',
			};

			tabletSelectors[
				' .uagb-icon-list__wrap .wp-block[data-type="uagb/icon-list-child"]:last-child'
			] = {
				'margin-bottom': 0,
			};
		} else if ( 'mobile' == stack ) {
			mobileSelectors[
				' .uagb-icon-list__wrap .wp-block[data-type="uagb/icon-list-child"]'
			] = {
				'margin-left': 0,
				'margin-right': 0,
				'margin-bottom': generateCSSUnit( editorGap, 'px' ),
			};

			mobileSelectors[ ' .uagb-icon-list__wrap' ] = {
				'flex-direction': 'column',
			};

			mobileSelectors[
				' .uagb-icon-list__wrap .uagb-icon-list__wrapper:last-child'
			] = {
				'margin-bottom': 0,
			};
		}

		selectors[
			' .uagb-icon-list__wrap .block-editor-block-list__layout'
		] = {
			'justify-content': alignment,
			'-webkit-box-pack': alignment,
			'-ms-flex-pack': alignment,
		};
	}

	if ( 'right' == align ) {
		selectors[
			':not(.uagb-icon-list__no-label) .uagb-icon-list__source-wrap'
		] = {
			'margin-left': generateCSSUnit( inner_gap, 'px' ),
		};
		selectors[ ' .uagb-icon-list__content-wrap' ] = {
			'flex-direction': 'row-reverse',
		};
	} else {
		selectors[
			':not(.uagb-icon-list__no-label) .uagb-icon-list__source-wrap'
		] = {
			'margin-right': generateCSSUnit( inner_gap, 'px' ),
		};
	}

	selectors[ ' .uagb-icon-list-repeater .uagb-icon-list__label' ] = {
		'font-size': generateCSSUnit( fontSize, fontSizeType ),
		'font-family': fontFamily,
		'font-weight': fontWeight,
		'line-height': generateCSSUnit( lineHeight, lineHeightType ),
	};

	mobileSelectors[ ' .uagb-icon-list-repeater .uagb-icon-list__label' ] = {
		'font-size': generateCSSUnit( fontSizeMobile, fontSizeType ),
		'line-height': generateCSSUnit( lineHeightMobile, lineHeightType ),
	};

	tabletSelectors[ ' .uagb-icon-list-repeater .uagb-icon-list__label' ] = {
		'font-size': generateCSSUnit( fontSizeTablet, fontSizeType ),
		'line-height': generateCSSUnit( lineHeightTablet, lineHeightType ),
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

export default styling;
