/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {

	const {
		borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        vPadding,
        hPadding,
        vMargin,
        hMargin,
        backgroundColor,
        paddingType,
		marginType,
		align
	} = props.attributes

	var selectors = {}

	selectors = {
		".uagb-fse-featured-image__wrap > img" : {
			"padding-left" : generateCSSUnit( hPadding, paddingType ),
			"padding-right" : generateCSSUnit( hPadding, paddingType ),
			"padding-top" : generateCSSUnit( vPadding, paddingType ),
			"padding-bottom" : generateCSSUnit( vPadding, paddingType ),
			"border-style": borderStyle,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-color": borderColor,
            "border-radius": generateCSSUnit( borderRadius, "px" ),
            "background-color": backgroundColor,
            "margin-left" : generateCSSUnit( hMargin, marginType ),
			"margin-right" : generateCSSUnit( hMargin, marginType ),
			"margin-top" : generateCSSUnit( vMargin, marginType ),
			"margin-bottom" : generateCSSUnit( vMargin, marginType ),
		},
		".uagb-fse-featured-image__wrap" : {
			"text-align" : align
		},
	}

	var id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`

	var styling_css = generateCSS( selectors, id )

	return styling_css
}

export default styling
