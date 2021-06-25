/**
 * Returns Dynamic Generated CSS
 */
import generateCSSUnit from '@Controls/generateCSSUnit';

function inlineStyles( props ) {
	const {
		align,
		contentWidth,
		leftPadding,
		rightPadding,
		topPadding,
		bottomPadding,
		leftMargin,
		rightMargin,
		topMargin,
		bottomMargin,
		width,
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
		'border-radius': generateCSSUnit( borderRadius, 'px' ),
		'margin-top': generateCSSUnit( topMargin, desktopMarginType ),
		'margin-bottom': generateCSSUnit( bottomMargin, desktopMarginType ),
	};
	if ( 'boxed' === contentWidth ) {
		switch ( align ) {
			case 'right':
				style[ 'margin-left' ] = 'auto';
				style[ 'margin-right' ] = generateCSSUnit(
					rightMargin,
					desktopMarginType
				);
				break;
			case 'left':
				style[ 'margin-right' ] = 'auto';
				style[ 'margin-left' ] = generateCSSUnit(
					leftMargin,
					desktopMarginType
				);
				break;
			case 'center':
				style[ 'margin-right' ] = 'auto';
				style[ 'margin-left' ] = 'auto';
				break;
		}
	}

	if ( 'full_width' == contentWidth ) {
		style[ 'margin-left' ] = generateCSSUnit(
			leftMargin,
			desktopMarginType
		);
		style[ 'margin-right' ] = generateCSSUnit(
			rightMargin,
			desktopMarginType
		);
	}
	if ( borderStyle != 'none' ) {
		style[ 'border-style' ] = borderStyle;
		style[ 'border-width' ] = generateCSSUnit( borderWidth, 'px' );
		style[ 'border-color' ] = borderColor;
	}

	const position = backgroundPosition.replace( '-', ' ' );

	let section_width = '100%';

	if ( 'boxed' == contentWidth ) {
		if ( '' != width ) {
			section_width = width + 'px';
		}
	}

	style[ 'max-width' ] = section_width;

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
