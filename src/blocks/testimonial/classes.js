/**
 * Returns Dynamic Generated CSS
 */

function PositionClasses( attributes ) {

	let iconimgStyle_class = "";
	iconimgStyle_class += " uagb-tm__imgicon-style-"+attributes.iconimgStyle+ " ";
	iconimgStyle_class += "uagb-tm__image-position-"+attributes.imagePosition+ " ";

	if ( attributes.imagePosition == "left" || attributes.imagePosition == "right" ){
    	iconimgStyle_class += "uagb-tm__image-aligned-"+attributes.imageAlignment+ " ";
		if ( attributes.stack !== "none" ){
			iconimgStyle_class +="uagb-tm-stacked-"+attributes.stack+ " ";
			if ( attributes.imagePosition === "right" ){
				iconimgStyle_class += "uagb-tm-reverse-order-"+attributes.stack+ " ";
			}
		}
	}

	iconimgStyle_class += "uagb-tm__bg-type-"+attributes.backgroundType+ " ";

	return [
		iconimgStyle_class
	];
}

export default PositionClasses;
