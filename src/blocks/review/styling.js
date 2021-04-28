/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/uagb-controls/generateCSS";
import generateCSSUnit from "../../../dist/blocks/uagb-controls/generateCSSUnit";

function styling( props ) {

	const {
		block_id,
		starColor,
		descColor,
		titleColor,
		contentColor,
		headFontFamily,
		headFontWeight,
		headFontSizeType,
		headLineHeightType,
		headFontSize,
		headFontSizeTablet,
		headFontSizeMobile,
		headLineHeight,
		headLineHeightTablet,
		headLineHeightMobile,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeMobile,
		subHeadFontSizeTablet,
		subHeadLineHeight,
		subHeadLineHeightType,
		subHeadLineHeightMobile,
		subHeadLineHeightTablet,
		contentFontFamily,
		contentFontWeight,
		contentFontSizeType,
		contentLineHeightType,
		contentFontSize,
		contentFontSizeTablet,
		contentFontSizeMobile,
		contentLineHeight,
		contentLineHeightTablet,
		contentLineHeightMobile,
		contentVrPadding,
		contentHrPadding,
		authorColor,
		summaryColor,
		starActiveColor,
		starOutlineColor,
		overallAlignment
	} = props.attributes;

	let tablet_selectors = {};
	let mobile_selectors = {};

	const selectors = {

		" .uagb-star-inner-container svg" : {
		    "fill":starColor,
		},
		" .uagb-avg-review-star-inner-container svg" : {
			"fill":starColor,
		},
		" .uagb-rating-title.keep-placeholder-on-focus" : {
			"font-size": generateCSSUnit( headFontSize, headFontSizeType ),
			"font-weight": headFontWeight,
			"font-family": headFontFamily,
			"line-height": generateCSSUnit( headLineHeight, headLineHeightType ),
		    "color": titleColor,
		},
		" .uagb_review_entry" : {
			"font-size": generateCSSUnit( headFontSize, headFontSizeType ),
			"font-weight": headFontWeight,
			"font-family": headFontFamily,
			"line-height": generateCSSUnit( headLineHeight, headLineHeightType ),
		},
		" .uagb-rating-desc.keep-placeholder-on-focus" : {
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"font-weight": subHeadFontWeight,
			"font-family": subHeadFontFamily,
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
		    "color": descColor,
		},
		" .uagb-rating-author.keep-placeholder-on-focus" : {
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"font-weight": subHeadFontWeight,
			"font-family": subHeadFontFamily,
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
		    "color": authorColor,
		},
		" .uagb-rating-desc, .uagb-rating-author" : {
			"font-size": generateCSSUnit( subHeadFontSize, subHeadFontSizeType ),
			"font-weight": subHeadFontWeight,
			"font-family": subHeadFontFamily,
			"line-height": generateCSSUnit( subHeadLineHeight, subHeadLineHeightType ),
		    "color": descColor,
		},
		" .uagb_review_block" : {
		        "padding-left" : generateCSSUnit( contentHrPadding, "px" ),
		    	"padding-right" : generateCSSUnit( contentHrPadding, "px" ),
		    	"padding-top" : generateCSSUnit( contentVrPadding, "px" ),
			"padding-bottom" : generateCSSUnit( contentVrPadding, "px" ),
			"text-align" : overallAlignment,
		},
		" .uagb_review_summary, p.rich-text.block-editor-rich-text__editable.uagb_review_summary_title" : {
		    "font-size": generateCSSUnit( contentFontSize, contentFontSizeType ),
		    "font-weight": contentFontWeight,
		    "font-family": contentFontFamily,
			"line-height": generateCSSUnit( contentLineHeight, contentLineHeightType ),
			"color": summaryColor,
		},
		" .uagb_review_entry .rich-text" : {
			"color" : contentColor,
		},
		" .uagb_review_entry .star, .uagb_review_average_stars .star" : {
			"fill": starColor,
		},
		" .uagb_review_entry path, .uagb_review_average_stars path" : {
			"stroke":starOutlineColor,
			"fill": starActiveColor,
		}
	};

	mobile_selectors = {
		" .uagb-rating-title, .uagb_review_entry" : {
			"font-size": generateCSSUnit( headFontSizeMobile, headFontSizeType ),
			"line-height": generateCSSUnit( headLineHeightMobile, headLineHeightType ),
		},
		" .uagb-rating-desc, .uagb-rating-author" : {
			"font-size": generateCSSUnit( subHeadFontSizeMobile, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightMobile, subHeadLineHeightType ),
		},
		" .uagb_review_summary, p.rich-text.block-editor-rich-text__editable.uagb_review_summary_title" : {
			    "font-size": generateCSSUnit( contentFontSizeMobile, contentFontSizeType ),
			    "line-height": generateCSSUnit( contentLineHeightMobile, contentLineHeightType ),
		},
	};

	tablet_selectors = { 
		" .uagb-rating-title, .uagb_review_entry" : {
			"font-size": generateCSSUnit( headFontSizeTablet, headFontSizeType ),
			"line-height": generateCSSUnit( headLineHeightTablet, headLineHeightType ),
		},
		" .uagb-rating-desc, .uagb-rating-author" : {
			"font-size": generateCSSUnit( subHeadFontSizeTablet, subHeadFontSizeType ),
			"line-height": generateCSSUnit( subHeadLineHeightTablet, subHeadLineHeightType ),
		},
		" .uagb_review_summary, p.rich-text.block-editor-rich-text__editable.uagb_review_summary_title" : {
		    "font-size": generateCSSUnit( contentFontSizeTablet, contentFontSizeType ),		    
		    "line-height": generateCSSUnit( contentLineHeightTablet, contentLineHeightType ),
		},
	};

	const base_selector = `.block-editor-page #wpwrap .uagb-block-${ block_id.substr( 0, 8 ) }`;

	let styling_css = generateCSS( selectors, base_selector );

	styling_css += generateCSS( tablet_selectors, base_selector, true, "tablet" );

	styling_css += generateCSS( mobile_selectors, base_selector, true, "mobile" );

	return styling_css;
}

export default styling;