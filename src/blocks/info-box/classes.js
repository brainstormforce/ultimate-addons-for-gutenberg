/**
 * Returns Dynamic Generated Classes
 */

function InfoBoxPositionClasses( attributes ) {
	let sourceClass = 'uagb-infobox-has-image';
	if ( attributes.source_type == 'icon' ) {
		sourceClass = 'uagb-infobox-has-icon';
	}

	let iconimgStyleClass = '';

	iconimgStyleClass += 'uagb-infobox' + ' ';
	iconimgStyleClass += sourceClass + ' ';
	iconimgStyleClass +=
		'uagb-infobox-icon-' + attributes.iconimgPosition + ' ';

	if (
		attributes.iconimgPosition === 'left' ||
		attributes.iconimgPosition === 'left-title'
	) {
		iconimgStyleClass += 'uagb-infobox-left' + ' ';
	}

	if (
		attributes.iconimgPosition === 'right' ||
		attributes.iconimgPosition === 'right-title'
	) {
		iconimgStyleClass += 'uagb-infobox-right' + ' ';
	}

	if (
		( attributes.iconimgPosition === 'left' ||
			attributes.iconimgPosition === 'right' ) &&
		attributes.stack !== 'none'
	) {
		iconimgStyleClass += 'uagb-infobox-stacked-' + attributes.stack + ' ';
		if ( attributes.iconimgPosition === 'right' ) {
			iconimgStyleClass +=
				'uagb-infobox-reverse-order-' + attributes.stack + ' ';
		}
	}

	if (
		attributes.iconimgPosition !== 'above-title' ||
		attributes.iconimgPosition !== 'below-title'
	) {
		iconimgStyleClass +=
			'uagb-infobox-image-valign-' + attributes.sourceAlign + ' ';
	}

	if ( attributes.enableBorder ) {
		iconimgStyleClass += 'uagb-infobox-enable-border' + ' ';
	}

	iconimgStyleClass += 'uagb-infobox-enable-border-radius' + ' ';

	return [ iconimgStyleClass ];
}

export default InfoBoxPositionClasses;
