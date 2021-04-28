/**
 * Returns Dynamic Generated Classes
 */

function InfoBoxPositionClasses( attributes ) {

	let sourceClass = "uagb-infobox-has-image";
	if ( attributes.source_type == "icon" ){
		sourceClass = "uagb-infobox-has-icon";
	}

	let iconimgStyle_class = "";

	iconimgStyle_class += "uagb-infobox"+ " ";
	iconimgStyle_class += sourceClass+ " ";
	iconimgStyle_class += "uagb-infobox-icon-"+attributes.iconimgPosition+ " ";

	if ( attributes.iconimgPosition === "left" || attributes.iconimgPosition === "left-title"  ){
		iconimgStyle_class +="uagb-infobox-left"+ " ";
	}

	if ( attributes.iconimgPosition === "right" || attributes.iconimgPosition === "right-title"  ){
		iconimgStyle_class +="uagb-infobox-right"+ " ";
	}

	if ( ( attributes.iconimgPosition === "left" || attributes.iconimgPosition === "right" ) && attributes.stack !== "none"  ){
		iconimgStyle_class +="uagb-infobox-stacked-"+attributes.stack+ " ";
		if ( attributes.iconimgPosition === "right" ){
			iconimgStyle_class += "uagb-infobox-reverse-order-"+attributes.stack+ " ";
		}
	}

	if ( attributes.iconimgPosition !== "above-title" || attributes.iconimgPosition !== "below-title"  ){
		iconimgStyle_class += "uagb-infobox-image-valign-"+attributes.sourceAlign+ " ";
	}

	if ( attributes.enableBorder ){
		iconimgStyle_class += "uagb-infobox-enable-border"+ " ";
	}

	iconimgStyle_class += "uagb-infobox-enable-border-radius"+ " ";

	return [
		iconimgStyle_class
	];
}

export default InfoBoxPositionClasses;
