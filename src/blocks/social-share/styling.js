/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		align,
		gap,
		social_layout,
		borderRadius,
		size,
		sizeType,
		sizeMobile,
		sizeTablet,
		bgSize,
		stack,
	} = props.attributes;

	const selectors = {};
	const tabletSelectors = {};
	const mobileSelectors = {};

	selectors[ '.uagb-social-share__layout-vertical .uagb-ss__wrapper' ] = {
		padding: generateCSSUnit( bgSize, 'px' ),
		'margin-left': 0,
		'margin-right': 0,
		'margin-bottom': generateCSSUnit( gap, 'px' ),
	};

	selectors[
		'.uagb-social-share__layout-vertical.uagb-social-share__outer-wrap'
	] = {
		'flex-direction': 'column',
	};

	selectors[ '.uagb-social-share__layout-horizontal .uagb-ss__wrapper' ] = {
		padding: generateCSSUnit( bgSize, 'px' ),
		'margin-left': generateCSSUnit( gap / 2, 'px' ),
		'margin-right': generateCSSUnit( gap / 2, 'px' ),
	};

	selectors[ ' .uagb-ss__wrapper' ] = {
		'border-radius': generateCSSUnit( borderRadius, 'px' ),
	};

	selectors[ ' .uagb-ss__source-image' ] = {
		width: generateCSSUnit( size, sizeType ),
	};

	selectors[ ' .uagb-ss__source-wrap' ] = {
		width: generateCSSUnit( size, sizeType ),
	};

	selectors[ ' .uagb-ss__source-wrap svg' ] = {
		width: generateCSSUnit( size, sizeType ),
		height: generateCSSUnit( size, sizeType ),
	};

	selectors[ ' .uagb-ss__source-icon' ] = {
		width: generateCSSUnit( size, sizeType ),
		height: generateCSSUnit( size, sizeType ),
		'font-size': generateCSSUnit( size, sizeType ),
		'line-height': generateCSSUnit( size, sizeType ),
	};

	const alignment =
		align == 'left'
			? 'flex-start'
			: align == 'right'
			? 'flex-end'
			: 'center';

	selectors[ '.uagb-social-share__outer-wrap .block-editor-inner-blocks' ] = {
		'text-align': align,
	};

	selectors[ '.uagb-social-share__outer-wrap' ] = {
		'justify-content': alignment,
		'-webkit-box-pack': alignment,
		'-ms-flex-pack': alignment,
		'-webkit-box-align': alignment,
		'-ms-flex-align': alignment,
		'align-items': alignment,
	};

	if ( 'horizontal' == social_layout ) {
		if ( 'desktop' == stack ) {
			selectors[
				'.uagb-social-share__layout-horizontal .block-editor-inner-blocks > .block-editor-block-list__layout'
			] = {
				'flex-direction': 'column',
			};

			selectors[ ' .uagb-ss__wrapper' ] = {
				'margin-left': 0,
				'margin-right': 0,
				'margin-bottom': generateCSSUnit( gap, 'px' ),
			};

			selectors[ '.uagb-social-share__outer-wrap' ] = {
				'flex-direction': 'column',
				'justify-content': alignment,
				'-webkit-box-pack': alignment,
				'-ms-flex-pack': alignment,
				'-webkit-box-align': alignment,
				'-ms-flex-align': alignment,
				'align-items': alignment,
			};
		} else if ( 'tablet' == stack ) {
			tabletSelectors[ ' .uagb-ss__wrapper' ] = {
				'margin-left': 0,
				'margin-right': 0,
				'margin-bottom': generateCSSUnit( gap, 'px' ),
			};

			tabletSelectors[ '.uagb-social-share__outer-wrap' ] = {
				'flex-direction': 'column',
			};

			tabletSelectors[
				'.uagb-social-share__layout-horizontal .uagb-ss__wrapper'
			] = {
				'margin-left': 0,
				'margin-right': 0,
			};
		} else if ( 'mobile' == stack ) {
			mobileSelectors[ ' .uagb-ss__wrapper' ] = {
				'margin-left': 0,
				'margin-right': 0,
				'margin-bottom': generateCSSUnit( gap, 'px' ),
			};

			mobileSelectors[ '.uagb-social-share__outer-wrap' ] = {
				'flex-direction': 'column',
			};

			mobileSelectors[
				'.uagb-social-share__layout-horizontal .uagb-ss__wrapper'
			] = {
				'margin-left': 0,
				'margin-right': 0,
			};
		}
	}

	mobileSelectors[ ' .uagb-ss__source-image' ] = {
		width: generateCSSUnit( sizeMobile, sizeType ),
	};

	mobileSelectors[ ' .uagb-ss__source-wrap' ] = {
		width: generateCSSUnit( sizeMobile, sizeType ),
		height: generateCSSUnit( sizeMobile, sizeType ),
		'line-height': generateCSSUnit( sizeMobile, sizeType ),
	};

	mobileSelectors[ ' .uagb-ss__source-wrap svg' ] = {
		width: generateCSSUnit( sizeMobile, sizeType ),
		height: generateCSSUnit( sizeMobile, sizeType ),
	};

	mobileSelectors[ ' .uagb-ss__source-icon' ] = {
		width: generateCSSUnit( sizeMobile, sizeType ),
		height: generateCSSUnit( sizeMobile, sizeType ),
		'font-size': generateCSSUnit( sizeMobile, sizeType ),
		'line-height': generateCSSUnit( sizeMobile, sizeType ),
	};

	tabletSelectors[ ' .uagb-ss__source-image' ] = {
		width: generateCSSUnit( sizeTablet, sizeType ),
	};

	tabletSelectors[ ' .uagb-ss__source-wrap' ] = {
		width: generateCSSUnit( sizeTablet, sizeType ),
		height: generateCSSUnit( sizeTablet, sizeType ),
		'line-height': generateCSSUnit( sizeTablet, sizeType ),
	};

	tabletSelectors[ ' .uagb-ss__source-wrap svg' ] = {
		width: generateCSSUnit( sizeTablet, sizeType ),
		height: generateCSSUnit( sizeTablet, sizeType ),
	};

	tabletSelectors[ ' .uagb-ss__source-icon' ] = {
		width: generateCSSUnit( sizeTablet, sizeType ),
		height: generateCSSUnit( sizeTablet, sizeType ),
		'font-size': generateCSSUnit( sizeTablet, sizeType ),
		'line-height': generateCSSUnit( sizeTablet, sizeType ),
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
