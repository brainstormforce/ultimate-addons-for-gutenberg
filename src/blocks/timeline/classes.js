/**
 * Returns Dynamic Generated Classes
 */

function ContentTmClasses( attributes ) {

	/* Arrow position */
	let arrow_align_class  = "uagb-timeline__arrow-top"+" ";
	if ( attributes.arrowlinAlignment == "center" ){
		arrow_align_class = "uagb-timeline__arrow-center"+" ";
	} else if ( attributes.arrowlinAlignment == "bottom" ){
		arrow_align_class = "uagb-timeline__arrow-bottom"+" ";
	}

	/* Alignmnet */
	let align_class = "uagb-timeline__center-block "+" ";
	if ( attributes.timelinAlignment == "left" ){
		align_class = "uagb-timeline__left-block"+" ";
	} else if ( attributes.timelinAlignment == "right" ){
		align_class = "uagb-timeline__right-block"+" ";
	}
	align_class+= arrow_align_class+"";
	align_class += "uagb-timeline__responsive-"+attributes.stack+" uagb-timeline";

	return [
		align_class
	];
}

export default ContentTmClasses;
