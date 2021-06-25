/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		fontFamily,
		fontWeight,
		size,
		vPadding,
		hPadding,
		borderWidth,
		borderRadius,
		borderStyle,
		borderColor,
		borderHColor,
		color,
		background,
		hColor,
		hBackground,
		sizeType,
		sizeMobile,
		sizeTablet,
		lineHeight,
		lineHeightType,
		lineHeightMobile,
		lineHeightTablet,
		inheritFromTheme,
		iconSpace,
	} = props.attributes;

	const tabletSelectors = {};
	const mobileSelectors = {};
	let selectors = {};

	if ( ! inheritFromTheme ) {
		selectors = {
			' .uagb-buttons-repeater': {
				'font-size': generateCSSUnit( size, sizeType ),
				'line-height': generateCSSUnit( lineHeight, lineHeightType ),
				'font-family': fontFamily,
				'font-weight': fontWeight,
				'border-width': generateCSSUnit( borderWidth, 'px' ),
				'border-style': borderStyle,
				'border-color': borderColor,
				'border-radius': generateCSSUnit( borderRadius, 'px' ),
				background,
				padding: vPadding + 'px ' + hPadding + 'px',
			},
			' .uagb-buttons-repeater:hover': {
				background: hBackground,
				'border-width': generateCSSUnit( borderWidth, 'px' ),
				'border-style': borderStyle,
				'border-color': borderHColor,
			},
			' .uagb-buttons-repeater a.uagb-button__link': {
				color,
			},
			' .uagb-buttons-repeater:hover a.uagb-button__link': {
				color: hColor,
			},
			' .uagb-buttons-repeater:hover .uagb-button__link': {
				color: hColor,
			},
			' .uagb-buttons-repeater .uagb-button__link': {
				color,
			},
		};

		mobileSelectors[ ' .uagb-buttons-repeater' ] = {
			'font-size': generateCSSUnit( sizeMobile, sizeType ),
			'line-height': generateCSSUnit( lineHeightMobile, lineHeightType ),
		};

		tabletSelectors[ ' .uagb-buttons-repeater' ] = {
			'font-size': generateCSSUnit( sizeTablet, sizeType ),
			'line-height': generateCSSUnit( lineHeightTablet, lineHeightType ),
		};
	}

	selectors[ ' .uagb-button__icon' ] = {
		width: generateCSSUnit( size, sizeType ),
	};

	if ( ! inheritFromTheme ) {
		selectors[ ' .uagb-button__icon' ].color = color;
	}

	selectors[ ' .uagb-button__icon-position-after' ] = {
		'margin-left': generateCSSUnit( iconSpace, 'px' ),
	};

	selectors[ ' .uagb-button__icon-position-before' ] = {
		'margin-right': generateCSSUnit( iconSpace, 'px' ),
	};

	mobileSelectors[ ' .uagb-button__icon' ] = {
		width: generateCSSUnit( sizeMobile, sizeType ),
		height: generateCSSUnit( sizeMobile, sizeType ),
	};

	tabletSelectors[ ' .uagb-button__icon' ] = {
		width: generateCSSUnit( sizeTablet, sizeType ),
		height: generateCSSUnit( sizeTablet, sizeType ),
	};

	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;
	let stylingCss = generateCSS( selectors, id );

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
