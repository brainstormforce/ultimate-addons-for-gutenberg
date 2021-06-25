/**
 * Function name: AlignClass
 *
 * @param array attributes settign array of attributes.
 * @param int index_val  index values.
 * @param attributes
 * @param index_val
 */
function AlignClass( attributes, index_val ) {
	let alignClass = '';
	if ( 'left' == attributes.timelinAlignment ) {
		alignClass = 'uagb-timeline__widget uagb-timeline__left';
	} else if ( 'right' == attributes.timelinAlignment ) {
		alignClass = 'uagb-timeline__widget uagb-timeline__right';
	} else if ( 'center' == attributes.timelinAlignment ) {
		if ( index_val % 2 == '0' ) {
			alignClass = 'uagb-timeline__widget uagb-timeline__right';
		} else {
			alignClass = 'uagb-timeline__widget uagb-timeline__left';
		}
	}

	return [ alignClass ];
}

export default AlignClass;
