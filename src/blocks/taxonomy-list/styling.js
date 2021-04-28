/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS";
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit";

function styling( props ) {

	const {
		block_id,        
		columns,
		tcolumns,
		mcolumns,
		bgColor,
		titleColor,
		countColor,
		rowGap,
		columnGap,
		contentPadding,
		contentPaddingMobile,
		contentPaddingTablet,
		titleBottomSpace,
		alignment,
		listStyle,
		seperatorStyle,
		seperatorWidth,
		seperatorThickness,
		seperatorColor,
		listTextColor,
		hoverlistTextColor,
		listBottomMargin,
		listStyleColor,
		hoverlistStyleColor,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleFontFamily,
		titleFontWeight,        
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,        
		countFontSize,
		countFontSizeType,
		countFontSizeMobile,
		countFontSizeTablet,
		countFontFamily,
		countFontWeight,        
		countLineHeightType,
		countLineHeight,
		countLineHeightTablet,
		countLineHeightMobile,                
		listFontSize,
		listFontSizeType,
		listFontSizeMobile,
		listFontSizeTablet,
		listFontFamily,
		listFontWeight,
		listFontSubset,
		listLineHeightType,
		listLineHeight,
		listLineHeightTablet,
		listLineHeightMobile,        
		borderStyle,
		borderThickness,
		borderColor,
		borderRadius,
	} = props.attributes;

    
	let selectors = {};
	let tablet_selectors = {};
	let mobile_selectors = {};
    
	let boxShadowPositionCSS = boxShadowPosition;
    
	if ( "outset" === boxShadowPosition ) {
		boxShadowPositionCSS = "";
	}
    
	selectors = {
		//grid layout styling
		" .uagb-taxonomy-wrap.uagb-layout-grid" : {
			"display" : "grid",
			"grid-template-columns" : "repeat(" + columns + ", 1fr)",
			"grid-column-gap": generateCSSUnit( columnGap, "px" ),
			"grid-row-gap": generateCSSUnit( rowGap, "px" ), 
                       
		},        
		" .uagb-layout-grid .uagb-taxomony-box" : {
			"padding" :generateCSSUnit( contentPadding, "px" ),
			"background-color" : bgColor,
			"text-align" : alignment,
			"box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + " " + generateCSSUnit( boxShadowVOffset, "px" ) + " " + generateCSSUnit( boxShadowBlur, "px" ) + " " + generateCSSUnit( boxShadowSpread, "px" ) + " " + boxShadowColor + " " + boxShadowPositionCSS

                                 
		},        
		" .uagb-layout-grid .uagb-tax-title" : {
			"color" : titleColor,            
			"margin-top" : "0",
			"margin-bottom" : generateCSSUnit( titleBottomSpace, "px" ),
			"font-size" : generateCSSUnit( titleFontSize, titleFontSizeType ),
			"font-family": titleFontFamily,
			"font-weight": titleFontWeight,
			"line-height": generateCSSUnit( titleLineHeight, titleLineHeightType ),                     
		},
		" .uagb-layout-grid .uagb-tax-count" : {
			"color" : countColor,
			"font-size" : generateCSSUnit( countFontSize, countFontSizeType ),
			"font-family": countFontFamily,
			"font-weight": countFontWeight,
			"line-height": generateCSSUnit( countLineHeight, countLineHeightType ),                                 
		},
        

		//List layout styling
		" .uagb-layout-list .uagb-tax-list" : {
			"list-style" : listStyle,
			"color" : listStyleColor ,
			"font-size" : generateCSSUnit( listFontSize, listFontSizeType ),
			"font-family": listFontFamily,
			"font-weight": listFontWeight,
			"line-height": generateCSSUnit( listLineHeight, listLineHeightType ), 
                                         
		},
		" .uagb-layout-list .uagb-tax-list:hover" : {            
			"color" : hoverlistStyleColor                               
		},
		" .uagb-layout-list .uagb-tax-list a.uagb-tax-link" : {
			"color" : listTextColor,                                        
		},
		" .uagb-layout-list .uagb-tax-list a.uagb-tax-link:hover" : {
			"color" : hoverlistTextColor,                               
		},
		" .uagb-layout-list .uagb-tax-list .uagb-tax-link-wrap" : {
			"margin-bottom" :  generateCSSUnit( listBottomMargin, "px" )                                        
		},
        
	};

	if ( seperatorStyle !== "none" ) {
		selectors[" .uagb-layout-list .uagb-tax-separator"] = {
			"border-top-color": seperatorColor,
			"border-top-style": seperatorStyle,
			"border-top-width": generateCSSUnit( seperatorThickness, "px" ),
			"width": generateCSSUnit( seperatorWidth, "%" ),
		};
	}
    
	if ( borderStyle !== "none" ) {
		selectors[" .uagb-taxomony-box"] = {
			"border" : generateCSSUnit( borderThickness, "px" ) + " " + borderStyle + " " + borderColor,
			"border-radius" : generateCSSUnit( borderRadius, "px" ),
		};
	}
    

	mobile_selectors = {
		" .uagb-taxonomy-wrap.uagb-layout-grid" : {        
			"grid-template-columns" : "repeat(" + mcolumns + ", 1fr)",          
		},
		" .uagb-layout-grid .uagb-taxomony-box" : {          
			"padding" :generateCSSUnit( contentPaddingMobile, "px" ),
		},
		" .uagb-layout-grid .uagb-tax-title" : {           
			"font-size" : generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),			
			"line-height": generateCSSUnit( titleLineHeightMobile, titleLineHeightType ),                     
		},
		" .uagb-layout-grid .uagb-tax-count" : {          
			"font-size" : generateCSSUnit( countFontSizeMobile, countFontSizeType ),		
			"line-height": generateCSSUnit( countLineHeightMobile, countLineHeightType ),                                 
		},
		" .uagb-layout-list .uagb-tax-list" : {           
			"font-size" : generateCSSUnit( listFontSizeMobile, listFontSizeType ),		
			"line-height": generateCSSUnit( listLineHeightMobile, listLineHeightType ),
		},
	};

	tablet_selectors = {
		" .uagb-taxonomy-wrap.uagb-layout-grid" : {        
			"grid-template-columns" : "repeat(" + tcolumns + ", 1fr)",          
		},
		" .uagb-layout-grid .uagb-taxomony-box" : {          
			"padding" :generateCSSUnit( contentPaddingTablet, "px" ),
		},
		" .uagb-layout-grid .uagb-tax-title" : {           
			"font-size" : generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),			
			"line-height": generateCSSUnit( titleLineHeightTablet, titleLineHeightType ),                     
		},
		" .uagb-layout-grid .uagb-tax-count" : {          
			"font-size" : generateCSSUnit( countFontSizeTablet, countFontSizeType ),		
			"line-height": generateCSSUnit( countLineHeightTablet, countLineHeightType ),                                 
		},
		" .uagb-layout-list .uagb-tax-list" : {           
			"font-size" : generateCSSUnit( listFontSizeTablet, listFontSizeType ),		
			"line-height": generateCSSUnit( listLineHeightTablet, listLineHeightType ),
		}
       
	};
	let styling_css = "";
	const id = `.uagb-block-${ block_id }`;

	styling_css = generateCSS( selectors, id );
    
	styling_css += generateCSS( tablet_selectors, `${id}.uagb-editor-preview-mode-tablet`, true, "tablet" );

	styling_css += generateCSS( mobile_selectors, `${id}.uagb-editor-preview-mode-mobile`, true, "mobile" );

	return styling_css;
}

export default styling;