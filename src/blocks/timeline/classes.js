/**
 * Returns Dynamic Generated Classes
 */

function ContentTmClasses( attributes ) {
	/* Arrow position */
	let arrowAlignClass = 'uagb-timeline__arrow-top' + ' ';
	if ( attributes.arrowlinAlignment == 'center' ) {
		arrowAlignClass = 'uagb-timeline__arrow-center' + ' ';
	} else if ( attributes.arrowlinAlignment == 'bottom' ) {
		arrowAlignClass = 'uagb-timeline__arrow-bottom' + ' ';
	}

	/* Alignmnet */
	let alignClass = 'uagb-timeline__center-block ' + ' ';
	if ( attributes.timelinAlignment == 'left' ) {
		alignClass = 'uagb-timeline__left-block' + ' ';
	} else if ( attributes.timelinAlignment == 'right' ) {
		alignClass = 'uagb-timeline__right-block' + ' ';
	}
	alignClass += arrowAlignClass + '';
	alignClass +=
		'uagb-timeline__responsive-' + attributes.stack + ' uagb-timeline';

	return [ alignClass ];
}

export default ContentTmClasses;
