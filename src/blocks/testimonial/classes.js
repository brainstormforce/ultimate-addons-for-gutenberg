/**
 * Returns Dynamic Generated CSS
 */

function PositionClasses( attributes ) {
	let iconimgStyleClass = '';
	iconimgStyleClass +=
		' uagb-tm__imgicon-style-' + attributes.iconimgStyle + ' ';
	iconimgStyleClass +=
		'uagb-tm__image-position-' + attributes.imagePosition + ' ';

	if (
		attributes.imagePosition === 'left' ||
		attributes.imagePosition === 'right'
	) {
		iconimgStyleClass +=
			'uagb-tm__image-aligned-' + attributes.imageAlignment + ' ';
		if ( attributes.stack !== 'none' ) {
			iconimgStyleClass += 'uagb-tm-stacked-' + attributes.stack + ' ';
			if ( attributes.imagePosition === 'right' ) {
				iconimgStyleClass +=
					'uagb-tm-reverse-order-' + attributes.stack + ' ';
			}
		}
	}

	iconimgStyleClass += 'uagb-tm__bg-type-' + attributes.backgroundType + ' ';

	return [ iconimgStyleClass ];
}

export default PositionClasses;
