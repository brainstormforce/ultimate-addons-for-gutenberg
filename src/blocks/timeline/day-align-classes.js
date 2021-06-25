/**
 * Returns Dynamic Generated Classes
 */

function DayAlignClass( attributes, index_val ) {
	let dayAlignClass = '';

	if ( 'left' == attributes.timelinAlignment ) {
		dayAlignClass = 'uagb-timeline__day-new uagb-timeline__day-left';
	} else if ( 'right' == attributes.timelinAlignment ) {
		dayAlignClass = 'uagb-timeline__day-new uagb-timeline__day-right';
	} else if ( 'center' == attributes.timelinAlignment ) {
		if ( index_val % 2 == '0' ) {
			dayAlignClass = 'uagb-timeline__day-new uagb-timeline__day-right';
		} else {
			dayAlignClass = 'uagb-timeline__day-new uagb-timeline__day-left';
		}
	}

	return [ dayAlignClass ];
}

export default DayAlignClass;
