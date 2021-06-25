/**
 * Returns Dynamic Generated Classes
 */

function CtaPositionClasses( attributes ) {
	let iconimgStyleClass = '';

	iconimgStyleClass += 'uagb-cta__block' + ' ';
	iconimgStyleClass +=
		'uagb-cta__icon-position-' + attributes.ctaPosition + ' ';

	if ( attributes.ctaPosition === 'right' ) {
		iconimgStyleClass += 'uagb-cta__content-right' + ' ';
	}

	if ( attributes.ctaPosition === 'right' && attributes.stack !== 'none' ) {
		iconimgStyleClass +=
			'uagb-cta__content-stacked-' + attributes.stack + ' ';
	}

	if ( attributes.ctaPosition !== 'below-title' ) {
		iconimgStyleClass +=
			'uagb-cta__button-valign-' + attributes.buttonAlign + ' ';
	}

	if ( attributes.ctaType !== 'text' && attributes.ctaType !== 'button' ) {
		iconimgStyleClass += 'uagb-cta__button-type-none' + ' ';
	}

	return [ iconimgStyleClass ];
}

export default CtaPositionClasses;
