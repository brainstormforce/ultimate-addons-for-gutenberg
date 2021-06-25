/**
 * BLOCK: UAGB How-To Schema Attributes
 */

import { __ } from '@wordpress/i18n';

const tools = [];

const materials = [];

tools.push( {
	add_required_tools: __( '- A Computer.', 'ultimate-addons-for-gutenberg' ),
} );

materials.push( {
	add_required_materials: __(
		'- A WordPress Website.',
		'ultimate-addons-for-gutenberg'
	),
} );

const attributes = {
	block_id: {
		type: 'string',
	},
	overallAlignment: {
		type: 'string',
		default: 'left',
	},
	toolsTitle: {
		type: 'html',
		default: __( 'Required Tools:', 'ultimate-addons-for-gutenberg' ),
	},
	materialTitle: {
		type: 'html',
		default: __( 'Things Needed?', 'ultimate-addons-for-gutenberg' ),
	},
	stepsTitle: {
		type: 'html',
		default: __(
			'Steps to configure the How-to Schema:',
			'ultimate-addons-for-gutenberg'
		),
	},
	tools_count: {
		type: 'number',
		default: 1,
	},
	material_count: {
		type: 'number',
		default: 1,
	},
	tools: {
		type: 'array',
		default: tools,
	},
	materials: {
		type: 'array',
		default: materials,
	},
	showTotaltime: {
		type: 'boolean',
		default: true,
	},
	showEstcost: {
		type: 'boolean',
		default: true,
	},
	showTools: {
		type: 'boolean',
		default: true,
	},
	showMaterials: {
		type: 'boolean',
		default: true,
	},
	mainimage: {
		type: 'object',
		default: {
			url: '',
			title: '',
		},
	},
	estCost: {
		type: 'html',
		default: __( 'Total Cost:', 'ultimate-addons-for-gutenberg' ),
	},
	timeNeeded: {
		type: 'html',
		default: __( 'Total Time Needed :', 'ultimate-addons-for-gutenberg' ),
	},
	timeIn: {
		type: 'html',
		default: __( ' Minutes', 'ultimate-addons-for-gutenberg' ),
	},
	imgSize: {
		type: 'string',
		default: 'thumbnail',
	},
	timeSpace: {
		type: 'number',
		default: 5,
	},
	costSpace: {
		type: 'number',
		default: 5,
	},
	time: {
		type: 'string',
		default: '30',
	},
	cost: {
		type: 'string',
		default: '65',
	},
	headingTitle: {
		source: 'html',
		selector: 'h1,h2,h3,h4,h5,h6',
		default: __(
			'How To Configure How-To Schema In Ultimate Addons For Gutenberg?',
			'ultimate-addons-for-gutenberg'
		),
	},
	currencyType: {
		type: 'html',
		default: ' USD',
	},
	headingDesc: {
		source: 'html',
		selector: 'p',
		default: __(
			'So to get started, you will just need to drag-n-drop the How-to Schema block in the Gutenberg editor. The How-to Schema block can be used on pages that contain a How-to in their title and describe steps to achieve certain requirements.',
			'ultimate-addons-for-gutenberg'
		),
	},
	headingAlign: {
		type: 'string',
		default: 'left',
	},
	descriptionAlign: {
		type: 'string',
		default: 'left',
	},
	headingColor: {
		type: 'string',
	},
	showEstcostcolor: {
		type: 'string',
	},
	showTotaltimecolor: {
		type: 'string',
		default: '',
	},
	subHeadingColor: {
		type: 'string',
		default: '',
	},
	headingTag: {
		type: 'string',
		default: 'h3',
	},
	headSpace: {
		type: 'number',
		default: 15,
	},
	headFontFamily: {
		type: 'string',
		default: 'Default',
	},
	headFontWeight: {
		type: 'string',
	},
	headFontSubset: {
		type: 'string',
	},
	headFontSizeType: {
		type: 'string',
		default: 'px',
	},
	headLineHeightType: {
		type: 'string',
		default: 'em',
	},
	headFontSize: {
		type: 'number',
	},
	headFontSizeTablet: {
		type: 'number',
	},
	headFontSizeMobile: {
		type: 'number',
	},
	headLineHeight: {
		type: 'number',
	},
	headLineHeightTablet: {
		type: 'number',
	},
	headLineHeightMobile: {
		type: 'number',
	},
	subHeadFontFamily: {
		type: 'string',
		default: 'Default',
	},
	subHeadFontWeight: {
		type: 'string',
	},
	subHeadFontSubset: {
		type: 'string',
	},
	subHeadFontSize: {
		type: 'number',
	},
	subHeadFontSizeType: {
		type: 'string',
		default: 'px',
	},
	subHeadFontSizeTablet: {
		type: 'number',
	},
	subHeadFontSizeMobile: {
		type: 'number',
	},
	subHeadLineHeight: {
		type: 'number',
	},
	subHeadLineHeightType: {
		type: 'string',
		default: 'em',
	},
	subHeadLineHeightTablet: {
		type: 'number',
	},
	subHeadLineHeightMobile: {
		type: 'number',
	},
	separatorSpace: {
		type: 'number',
		default: 15,
	},
	headLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	subHeadLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	priceFontSizeType: {
		type: 'string',
		default: 'px',
	},
	priceFontSize: {
		type: 'number',
	},
	priceFontSizeTablet: {
		type: 'number',
	},
	priceFontSizeMobile: {
		type: 'number',
	},
	priceFontFamily: {
		type: 'string',
		default: 'Default',
	},
	priceFontWeight: {
		type: 'string',
	},
	priceFontSubset: {
		type: 'string',
	},
	priceLineHeightType: {
		type: 'string',
		default: 'em',
	},
	priceLineHeight: {
		type: 'number',
	},
	priceLineHeightTablet: {
		type: 'number',
	},
	priceLineHeightMobile: {
		type: 'number',
	},
	priceLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	row_gap: {
		type: 'number',
		default: 20,
	},
	step_gap: {
		type: 'number',
	},
	schema: {
		type: 'html',
		default: '',
	},
	timeInMins: {
		type: 'number',
	},
	timeInHours: {
		type: 'number',
	},
	timeInDays: {
		type: 'number',
	},
	timeInMonths: {
		type: 'number',
	},
	timeInYears: {
		type: 'number',
	},
};

export default attributes;
