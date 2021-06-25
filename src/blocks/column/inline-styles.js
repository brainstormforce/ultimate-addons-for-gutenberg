/**
 * Returns Dynamic Generated CSS
 */

import generateCSSUnit from '@Controls/generateCSSUnit';

function inlineStyles( props ) {
	const {
		backgroundColor,
		backgroundOpacity,
		backgroundType,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		backgroundImageColor,
		borderRadius,
		overlayType,
		gradientOverlayColor1,
		gradientOverlayColor2,
		gradientOverlayType,
		gradientOverlayLocation1,
		gradientOverlayLocation2,
		gradientOverlayAngle,
		gradientValue,
	} = props.attributes;

	const style = {};

	switch ( backgroundType ) {
		case 'image':
			if ( 'color' == overlayType ) {
				style.opacity =
					typeof backgroundOpacity !== 'undefined'
						? backgroundOpacity / 100
						: '';
				style[ 'background-color' ] = backgroundImageColor;
			} else {
				style[ 'background-color' ] = 'transparent';
				style.opacity =
					typeof backgroundOpacity !== 'undefined'
						? backgroundOpacity / 100
						: '';

				if ( 'linear' === gradientOverlayType ) {
					style[
						'background-image'
					] = `linear-gradient(${ gradientOverlayAngle }deg, ${ gradientOverlayColor1 } ${ gradientOverlayLocation1 }%, ${ gradientOverlayColor2 } ${ gradientOverlayLocation2 }%)`;
				} else {
					style[
						'background-image'
					] = `radial-gradient( at center center, ${ gradientOverlayColor1 } ${ gradientOverlayLocation1 }%, ${ gradientOverlayColor2 } ${ gradientOverlayLocation2 }%)`;
				}
			}
			break;
		case 'gradient':
			style[ 'background-color' ] = 'transparent';
			style.opacity =
				typeof backgroundOpacity !== 'undefined'
					? backgroundOpacity / 100
					: '';

			if ( gradientValue ) {
				style[ 'background-image' ] = gradientValue;
			} else if ( 'linear' === gradientType ) {
				style[
					'background-image'
				] = `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`;
			} else {
				style[
					'background-image'
				] = `radial-gradient( at center center, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`;
			}
			break;
		case 'color':
			style.opacity =
				typeof backgroundOpacity !== 'undefined'
					? backgroundOpacity / 100
					: '';
			style[ 'background-color' ] = backgroundColor;
			break;
	}

	style[ 'border-radius' ] = generateCSSUnit( borderRadius, 'px' );

	return style;
}

export default inlineStyles;
