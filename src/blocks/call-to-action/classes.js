/**
 * Returns Dynamic Generated Classes
 */

function CtaPositionClasses( attributes ) {


	let iconimgStyle_class = "";

	iconimgStyle_class += "uagb-cta__block"+ " ";
	iconimgStyle_class += "uagb-cta__icon-position-"+attributes.ctaPosition+ " ";

	if ( attributes.ctaPosition === "right" ){
		iconimgStyle_class +="uagb-cta__content-right"+ " ";
	}

	if ( ( attributes.ctaPosition === "right" ) && attributes.stack !== "none"  ){
		iconimgStyle_class +="uagb-cta__content-stacked-"+attributes.stack+ " ";
	}

	if ( attributes.ctaPosition !== "below-title"  ){
		iconimgStyle_class += "uagb-cta__button-valign-"+attributes.buttonAlign+ " ";
	}

	if ( attributes.ctaType !== "text" && attributes.ctaType !== "button"  ){
		iconimgStyle_class += "uagb-cta__button-type-none"+ " ";
	}

	return [
		iconimgStyle_class
	];
}

export default CtaPositionClasses;
