/**
 * Returns Dynamic Generated Classes
 */

function PositionClasses( attributes ) {
	let iconimgStyleClass = '';
	let imgeCount = 0;
	const image = attributes.image;

	if ( typeof attributes.rest_menu_item_arr !== 'undefined' ) {
		attributes.rest_menu_item_arr.map( ( item ) => {
			const image_arr = item.image;
			if ( image_arr && typeof image_arr !== 'undefined' ) {
				imgeCount++;
			}
		} );
	}

	if ( typeof image !== 'undefined' && image !== null && image !== '' ) {
		imgeCount++;
	}

	if ( imgeCount > 0 ) {
		iconimgStyleClass +=
			'uagb-rm__image-position-' + attributes.imagePosition + ' ';
	}

	iconimgStyleClass += ' uagb-rm__align-' + attributes.headingAlign + ' ';

	if (
		'left' == attributes.imagePosition ||
		'right' == attributes.imagePosition
	) {
		iconimgStyleClass +=
			'uagb-rm__image-aligned-' + attributes.imageAlignment + ' ';
		if ( attributes.stack !== 'none' ) {
			iconimgStyleClass += 'uagb-rm-stacked-' + attributes.stack + ' ';
			if ( attributes.imagePosition === 'right' ) {
				iconimgStyleClass +=
					'uagb-rm-reverse-order-' + attributes.stack + ' ';
			}
		}
	}

	iconimgStyleClass += 'uagb-rm__desk-column-' + attributes.columns + ' ';
	iconimgStyleClass += 'uagb-rm__tablet-column-' + attributes.tcolumns + ' ';
	iconimgStyleClass += 'uagb-rm__mobile-column-' + attributes.mcolumns + ' ';

	return [ iconimgStyleClass ];
}

export default PositionClasses;
