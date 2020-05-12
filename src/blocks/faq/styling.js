/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit"

function styling( props ) {
    
    const {
        layout,
        inactiveOtherItems,
        expandFirstItem,
        enableSchemaSupport,
        rowsGap,
        columnsGap,
        align,
        enableSeparator,
        boxBgColor,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        questionTextColor,
        questionTextActiveColor,
        questionPaddingTypeMobile,
        questionPaddingTypeTablet,
        questionPaddingTypeDesktop,
        vquestionPaddingMobile,
        vquestionPaddingTablet,
        vquestionPaddingDesktop,
        hquestionPaddingMobile,
        hquestionPaddingTablet,
        hquestionPaddingDesktop,
        answerTextColor,
        answerPaddingTypeMobile,
        answerPaddingTypeTablet,
        answerPaddingTypeDesktop,
        vanswerPaddingMobile,
        vanswerPaddingTablet,
        vanswerPaddingDesktop,
        hanswerPaddingMobile,
        hanswerPaddingTablet,
        hanswerPaddingDesktop,
        iconColor,
        iconActiveColor,
        gapBtwIconQUestion,
        questionloadGoogleFonts,
        questionfontFamily,
        questionfontWeight,
        questionfontSubset,
        questionfontSizeType,
        questionfontSize,
        questionfontSizeMobile,
        questionfontSizeTablet,
        questionlineHeightType,
        questionlineHeight,
        questionlineHeightMobile,
        questionlineHeightTablet,
        answerloadGoogleFonts,
        answerfontFamily,
        answerfontWeight,
        answerfontSubset,
        answerfontSizeType,
        answerfontSize,
        answerfontSizeMobile,
        answerfontSizeTablet,
        answerlineHeightType,
        answerlineHeight,
        answerlineHeightMobile,
        answerlineHeightTablet,
        icon,
        iconActive,
        iconAlign,
        iconSize
    } = props.attributes

    var selectors = {}
    var tablet_selectors = {}
	var mobile_selectors = {}
    
    selectors = {

		" .uagb-icon svg" : {
            "width" : generateCSSUnit( iconSize, 'px' ),
            "height" : generateCSSUnit( iconSize, 'px' ),
            "font-size" : generateCSSUnit( iconSize, 'px' )
        },
        " .uagb-faq-child__outer-wrap" : {
            "margin-bottom" : generateCSSUnit( rowsGap, 'px' ),
        },
        " .uagb-faq-item" : {
            "background-color" : boxBgColor,
            "border-style" : borderStyle,
            "border-width" : generateCSSUnit( borderWidth, 'px' ),
            "border-radius" : generateCSSUnit( borderRadius, 'px' ),
            "border-color" : borderColor,
        },
        " .uagb-faq-item .uagb-question" : {
            "color": questionTextColor,
        },
        " .uagb-faq-item.uagb-faq-item-active .uagb-question" : {
            "color": questionTextActiveColor,
        },
        " .uagb-faq-item:hover .uagb-question" : {
            "color": questionTextActiveColor,
        },
        " .uagb-faq-questions-button" : {
            "padding-top": generateCSSUnit( vquestionPaddingDesktop, questionPaddingTypeDesktop ),
            "padding-bottom": generateCSSUnit( vquestionPaddingDesktop, questionPaddingTypeDesktop ),
            "padding-right": generateCSSUnit( hquestionPaddingDesktop, questionPaddingTypeDesktop ),
            "padding-left": generateCSSUnit( hquestionPaddingDesktop, questionPaddingTypeDesktop ),
        },
        " .uagb-content" : {
            "padding-top": generateCSSUnit( vanswerPaddingDesktop, answerPaddingTypeDesktop ),
            "padding-bottom": generateCSSUnit( vanswerPaddingDesktop, answerPaddingTypeDesktop ),
            "padding-right": generateCSSUnit( hanswerPaddingDesktop, answerPaddingTypeDesktop ),
            "padding-left": generateCSSUnit( hanswerPaddingDesktop, answerPaddingTypeDesktop ),
        },
        " .uagb-content p" : {
            "color" : answerTextColor,
        },
        " .uagb-faq-item .uagb-icon svg" : {
            "fill" : iconColor
        },
        " .uagb-faq-item.uagb-faq-item-active .uagb-icon svg" : {
            "fill" : iconActiveColor
        },
        " .uagb-faq-item .uagb-faq-icon-wrap" : {
            "margin-right" : generateCSSUnit( gapBtwIconQUestion, 'px' ),
        },
        " .uagb-faq-item:hover .uagb-icon svg" : {
            "fill" : iconActiveColor
        },
    }
    
    tablet_selectors = {
        " .uagb-faq-questions-button" : {
            "padding-top": generateCSSUnit( vquestionPaddingTablet, questionPaddingTypeTablet ),
            "padding-bottom": generateCSSUnit( vquestionPaddingTablet, questionPaddingTypeTablet ),
            "padding-right": generateCSSUnit( hquestionPaddingTablet, questionPaddingTypeTablet ),
            "padding-left": generateCSSUnit( hquestionPaddingTablet, questionPaddingTypeTablet ),
        },
        " .uagb-content" : {
            "padding-top": generateCSSUnit( vanswerPaddingTablet, answerPaddingTypeTablet ),
            "padding-bottom": generateCSSUnit( vanswerPaddingTablet, answerPaddingTypeTablet ),
            "padding-right": generateCSSUnit( hanswerPaddingTablet, answerPaddingTypeTablet ),
            "padding-left": generateCSSUnit( hanswerPaddingTablet, answerPaddingTypeTablet ),
        },
    }

    mobile_selectors = {
        " .uagb-faq-questions-button" : {
            "padding-top": generateCSSUnit( vquestionPaddingMobile, questionPaddingTypeMobile ),
            "padding-bottom": generateCSSUnit( vquestionPaddingMobile, questionPaddingTypeMobile ),
            "padding-right": generateCSSUnit( hquestionPaddingMobile, questionPaddingTypeMobile ),
            "padding-left": generateCSSUnit( hquestionPaddingMobile, questionPaddingTypeMobile ),
        },
        " .uagb-content" : {
            "padding-top": generateCSSUnit( vanswerPaddingMobile, answerPaddingTypeMobile ),
            "padding-bottom": generateCSSUnit( vanswerPaddingMobile, answerPaddingTypeMobile ),
            "padding-right": generateCSSUnit( hanswerPaddingMobile, answerPaddingTypeMobile ),
            "padding-left": generateCSSUnit( hanswerPaddingMobile, answerPaddingTypeMobile ),
        },
    }
    var styling_css = '';
    var id = `.uagb-block-${ props.clientId }`

    styling_css = generateCSS( selectors, id )
    
    styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
