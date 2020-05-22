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
        questionfontFamily,
        questionfontWeight,
        questionfontSizeType,
        questionfontSize,
        questionfontSizeMobile,
        questionfontSizeTablet,
        questionlineHeightType,
        questionlineHeight,
        questionlineHeightMobile,
        questionlineHeightTablet,
        answerfontFamily,
        answerfontWeight,
        answerfontSizeType,
        answerfontSize,
        answerfontSizeMobile,
        answerfontSizeTablet,
        answerlineHeightType,
        answerlineHeight,
        answerlineHeightMobile,
        answerlineHeightTablet,
        iconAlign,
        iconSize,
        iconSizeType,
        iconSizeMobile,
        iconSizeTablet,
        columns
    } = props.attributes

    var selectors = {}
    var tablet_selectors = {}
	var mobile_selectors = {}
    
    selectors = {

		" .uagb-icon svg" : {
            "width" : generateCSSUnit( iconSize, iconSizeType ),
            "height" : generateCSSUnit( iconSize, iconSizeType ),
            "font-size" : generateCSSUnit( iconSize, iconSizeType ),
            "fill" : iconColor
        },
        " .uagb-icon-active svg" : {
            "width" : generateCSSUnit( iconSize, iconSizeType ),
            "height" : generateCSSUnit( iconSize, iconSizeType ),
            "font-size" : generateCSSUnit( iconSize, iconSizeType ),
            "fill" : iconActiveColor
        },
        " .uagb-faq-child__outer-wrap" : {
            "margin-bottom" : generateCSSUnit( rowsGap, 'px' ),
        },
        ".uagb-faq-layout-grid .block-editor-inner-blocks .block-editor-block-list__layout" : {
            "grid-column-gap": generateCSSUnit( columnsGap, 'px' ),
            "grid-row-gap": generateCSSUnit( rowsGap, 'px' )
        
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
        " .uagb-faq-content span" : {
            "margin-top": generateCSSUnit( vanswerPaddingDesktop, answerPaddingTypeDesktop ),
            "margin-bottom": generateCSSUnit( vanswerPaddingDesktop, answerPaddingTypeDesktop ),
            "margin-right": generateCSSUnit( hanswerPaddingDesktop, answerPaddingTypeDesktop ),
            "margin-left": generateCSSUnit( hanswerPaddingDesktop, answerPaddingTypeDesktop ),
        },
        ".uagb-faq-icon-left .uagb-faq-item .uagb-faq-icon-wrap" : {
            "margin-right" : generateCSSUnit( gapBtwIconQUestion, 'px' ),
        },
        ".uagb-faq-icon-right .uagb-faq-item .uagb-faq-icon-wrap" : {
            "margin-left" : generateCSSUnit( gapBtwIconQUestion, 'px' ),
        },
        " .uagb-faq-item:hover .uagb-icon svg" : {
            "fill" : iconActiveColor
        },
        " .uagb-faq-icon-wrap" : {
            "float" : iconAlign
        },
        " .uagb-faq-questions-button .uagb-question" : {
            "font-size" : generateCSSUnit( questionfontSize, questionfontSizeType ),
			"line-height" : generateCSSUnit( questionlineHeight, questionlineHeightType ),
			"font-family": questionfontFamily,
			"font-weight": questionfontWeight,
        },
        " .uagb-faq-item .uagb-faq-content p" : {
            "font-size" : generateCSSUnit( answerfontSize, answerfontSizeType ),
			"line-height" : generateCSSUnit( answerlineHeight, answerlineHeightType ),
			"font-family": answerfontFamily,
            "font-weight": answerfontWeight,
            "color" : answerTextColor,
        },
    }
    
    tablet_selectors = {
        " .uagb-faq-questions-button" : {
            "padding-top": generateCSSUnit( vquestionPaddingTablet, questionPaddingTypeTablet ),
            "padding-bottom": generateCSSUnit( vquestionPaddingTablet, questionPaddingTypeTablet ),
            "padding-right": generateCSSUnit( hquestionPaddingTablet, questionPaddingTypeTablet ),
            "padding-left": generateCSSUnit( hquestionPaddingTablet, questionPaddingTypeTablet ),
        },
        " .uagb-faq-content span" : {
            "margin-top": generateCSSUnit( vanswerPaddingTablet, answerPaddingTypeTablet ),
            "margin-bottom": generateCSSUnit( vanswerPaddingTablet, answerPaddingTypeTablet ),
            "margin-right": generateCSSUnit( hanswerPaddingTablet, answerPaddingTypeTablet ),
            "margin-left": generateCSSUnit( hanswerPaddingTablet, answerPaddingTypeTablet ),
        },
        " .uagb-faq-questions-button .uagb-question" : {
            "font-size" : generateCSSUnit( questionfontSizeTablet, questionfontSizeType ),
			"line-height" : generateCSSUnit( questionlineHeightTablet, questionlineHeightType ),
        },
        " .uagb-faq-item .uagb-faq-content p" : {
            "font-size" : generateCSSUnit( answerfontSizeTablet, answerfontSizeType ),
			"line-height" : generateCSSUnit( answerlineHeightTablet, answerlineHeightType ),
        },
        " .uagb-icon svg" : {
            "width" : generateCSSUnit( iconSizeTablet, iconSizeType ),
            "height" : generateCSSUnit( iconSizeTablet, iconSizeType ),
            "font-size" : generateCSSUnit( iconSizeTablet, iconSizeType )
        },
        " .uagb-icon-active svg" : {
            "width" : generateCSSUnit( iconSizeTablet, iconSizeType ),
            "height" : generateCSSUnit( iconSizeTablet, iconSizeType ),
            "font-size" : generateCSSUnit( iconSizeTablet, iconSizeType )
        },
    }

    mobile_selectors = {
        " .uagb-faq-questions-button" : {
            "padding-top": generateCSSUnit( vquestionPaddingMobile, questionPaddingTypeMobile ),
            "padding-bottom": generateCSSUnit( vquestionPaddingMobile, questionPaddingTypeMobile ),
            "padding-right": generateCSSUnit( hquestionPaddingMobile, questionPaddingTypeMobile ),
            "padding-left": generateCSSUnit( hquestionPaddingMobile, questionPaddingTypeMobile ),
        },
        " .uagb-faq-content span" : {
            "margin-top": generateCSSUnit( vanswerPaddingMobile, answerPaddingTypeMobile ),
            "margin-bottom": generateCSSUnit( vanswerPaddingMobile, answerPaddingTypeMobile ),
            "margin-right": generateCSSUnit( hanswerPaddingMobile, answerPaddingTypeMobile ),
            "margin-left": generateCSSUnit( hanswerPaddingMobile, answerPaddingTypeMobile ),
        },
        " .uagb-faq-questions-button .uagb-question" : {
            "font-size" : generateCSSUnit( questionfontSizeMobile, questionfontSizeType ),
			"line-height" : generateCSSUnit( questionlineHeightMobile, questionlineHeightType ),
        },
        " .uagb-faq-item .uagb-faq-content p" : {
            "font-size" : generateCSSUnit( answerfontSizeMobile, answerfontSizeType ),
			"line-height" : generateCSSUnit( answerlineHeightMobile, answerlineHeightType ),
        },
        " .uagb-icon svg" : {
            "width" : generateCSSUnit( iconSizeMobile, iconSizeType ),
            "height" : generateCSSUnit( iconSizeMobile, iconSizeType ),
            "font-size" : generateCSSUnit( iconSizeMobile, iconSizeType )
        },
        " .uagb-icon-active svg" : {
            "width" : generateCSSUnit( iconSizeMobile, iconSizeType ),
            "height" : generateCSSUnit( iconSizeMobile, iconSizeType ),
            "font-size" : generateCSSUnit( iconSizeMobile, iconSizeType )
        },
    }

    if ( 'accordion' === layout && true === inactiveOtherItems ) {
        
        selectors[" .block-editor-block-list__layout .uagb-faq-child__outer-wrap .uagb-faq-content "] = {
            "display" : "none"
        }
    }
    if ( 'accordion' === layout && false === inactiveOtherItems ) {
        
        selectors[" .block-editor-inner-blocks .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon-active"] = {
            "display" : "inline-block"
        },
        selectors[" .block-editor-inner-blocks .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon"] = {
            "display" : "none"
        }
    }
    if ( 'accordion' === layout && true === expandFirstItem ) {
        
        selectors[" .block-editor-block-list__layout > div:first-child > .uagb-faq-child__outer-wrap .uagb-faq-content "] = {
            "display" : "block"
        }
        selectors[" .block-editor-block-list__layout > div:first-child > .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon-active "] = {
            "display" : "inline-block"
        },
        selectors[" .block-editor-block-list__layout > div:first-child > .uagb-faq-child__outer-wrap .uagb-faq-item .uagb-faq-questions-button .uagb-icon "] = {
            "display" : "none"
        }
    }
    if ( true === enableSeparator ) {
        
        selectors[" .uagb-faq-child__outer-wrap .uagb-faq-content "] = {
            "border-style" : "solid",
            "border-top-color" : borderColor,
            "border-top-width" : generateCSSUnit( borderWidth, 'px' ),
        }
    }
    if ( 'grid' === layout ) {
        
        selectors[" .block-editor-block-list__layout .uagb-faq-child__outer-wrap "] = {
            "text-align" : align
        }
        selectors[".uagb-faq-layout-grid .block-editor-inner-blocks > .block-editor-block-list__layout "] = {
            "grid-template-columns" : 'repeat(' + columns + ', 1fr)'
        }
    }

    var styling_css = '';
    var id = `.uagb-block-${ props.clientId }`

    styling_css = generateCSS( selectors, id )
    
    styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
