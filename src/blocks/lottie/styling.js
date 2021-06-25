/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		width,
		widthTablet,
		widthMob,
		height,
		heightTablet,
		heightMob,
		backgroundColor,
		backgroundHColor,
	} = props.attributes;

	const tablet_selectors = {};
	const mobile_selectors = {};

	const selectors = {
		'.uagb-lottie__outer-wrap': {
			width: generateCSSUnit( width, 'px' ),
			height: generateCSSUnit( height, 'px' ),
			background: backgroundColor,
		},
		'.uagb-lottie__outer-wrap:hover': {
			background: backgroundHColor,
		},
	};

	tablet_selectors[ '.uagb-lottie__outer-wrap' ] = {
		width: generateCSSUnit( widthTablet, 'px' ),
		height: generateCSSUnit( heightTablet, 'px' ),
	};

	mobile_selectors[ '.uagb-lottie__outer-wrap' ] = {
		width: generateCSSUnit( widthMob, 'px' ),
		height: generateCSSUnit( heightMob, 'px' ),
	};

	const base_selector = `.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
		0,
		8
	) }`;

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
