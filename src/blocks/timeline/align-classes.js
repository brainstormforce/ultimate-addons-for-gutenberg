/**
 * Function name: AlignClass
 * @param array attributes settign array of attributes.
 * @param int index_val  index values.
 */
function AlignClass( attributes, index_val ) {

	let align_class = "";
	if( "left" == attributes.timelinAlignment ){
		align_class = "uagb-timeline__widget uagb-timeline__left";
	}else if( "right" == attributes.timelinAlignment ){
		align_class = "uagb-timeline__widget uagb-timeline__right";
	}else if( "center" == attributes.timelinAlignment ){
		if( index_val % 2 == "0" ){
			align_class = "uagb-timeline__widget uagb-timeline__right";
		}else{
			align_class = "uagb-timeline__widget uagb-timeline__left";
		}
	}

	return [
		align_class
	];
}

export default AlignClass;
