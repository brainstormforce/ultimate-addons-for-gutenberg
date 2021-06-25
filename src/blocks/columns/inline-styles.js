/**
 * Returns Dynamic Generated CSS
 */
import generateCSSUnit from '@Controls/generateCSSUnit';

function inlineStyles( props ) {
	const {
		leftPadding,
		rightPadding,
		topPadding,
		bottomPadding,
		topMargin,
		bottomMargin,
		backgroundPosition,
		backgroundSize,
		backgroundAttachment,
		backgroundImage,
		backgroundRepeat,
		backgroundType,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		desktopMarginType,
		desktopPaddingType,
	} = props.attributes;

	const style = {
		'padding-top': generateCSSUnit( topPadding, desktopPaddingType ),
		'padding-bottom': generateCSSUnit( bottomPadding, desktopPaddingType ),
		'padding-left': generateCSSUnit( leftPadding, desktopPaddingType ),
		'padding-right': generateCSSUnit( rightPadding, desktopPaddingType ),
		'margin-top': generateCSSUnit( topMargin, desktopMarginType ),
		'margin-bottom': generateCSSUnit( bottomMargin, desktopMarginType ),
		'border-radius': generateCSSUnit( borderRadius, desktopMarginType ),
	};

	if ( borderStyle != 'none' ) {
		style[ 'border-style' ] = borderStyle;
		style[ 'border-width' ] = generateCSSUnit( borderWidth, 'px' );
		style[ 'border-color' ] = borderColor;
	}

	const position = backgroundPosition.replace( '-', ' ' );

	if ( 'image' === backgroundType ) {
		style[ 'background-image' ] = backgroundImage
			? `url(${ backgroundImage.url })`
			: null;
		style[ 'background-position' ] = position;
		style[ 'background-attachment' ] = backgroundAttachment;
		style[ 'background-repeat' ] = backgroundRepeat;
		style[ 'background-size' ] = backgroundSize;
	}

	return style;
}

export default inlineStyles;
