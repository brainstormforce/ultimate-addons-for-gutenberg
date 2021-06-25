/**
 * BLOCK: Price List - Attributes
 */
import { __ } from '@wordpress/i18n';
const itemCount = 4;

const restMenuBlock = [];

for ( let i = 1; i <= itemCount; i++ ) {
	const descText = __(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	);
	const titleText = __( 'Menu Item ' + i );
	const priceText = __( '$9' );
	restMenuBlock.push( {
		description: descText,
		title: titleText,
		price: priceText,
		image: '',
	} );
}

const attributes = {
	classMigrate: {
		type: 'boolean',
		default: false,
	},
	childMigrate: {
		type: 'boolean',
		default: false,
	},
	menu_item_count: {
		type: 'number',
		default: itemCount,
	},
	rest_menu_item_arr: {
		type: 'array',
		default: restMenuBlock,
	},
	headingAlign: {
		type: 'string',
		default: 'left',
	},
	priceSpace: {
		type: 'number',
		default: 5,
	},
	descSpace: {
		type: 'number',
		default: 15,
	},
	titleSpace: {
		type: 'number',
		default: 10,
	},
	block_id: {
		type: 'string',
		default: 'not_set',
	},
	imgVrPadding: {
		type: 'number',
		default: 0,
	},
	imgHrPadding: {
		type: 'number',
		default: 0,
	},
	imgTopPadding: {
		type: 'number',
		default: 0,
	},
	imgBottomPadding: {
		type: 'number',
		default: 0,
	},
	columns: {
		type: 'number',
		default: 2,
	},
	tcolumns: {
		type: 'number',
		default: 2,
	},
	mcolumns: {
		type: 'number',
		default: 1,
	},
	rowGap: {
		type: 'number',
		default: 10,
	},
	columnGap: {
		type: 'number',
		default: 10,
	},
	contentVrPadding: {
		type: 'number',
		default: 5,
	},
	contentHrPadding: {
		type: 'number',
		default: 5,
	},

	stack: {
		type: 'string',
		default: 'tablet',
	},
	seperatorStyle: {
		type: 'string',
		default: 'dashed',
	},
	seperatorWidth: {
		type: 'number',
		default: '100',
	},
	seperatorThickness: {
		type: 'number',
		default: '1',
	},
	seperatorColor: {
		type: 'string',
		default: '#b2b4b5',
	},
	descColor: {
		type: 'string',
		default: '#333',
	},
	priceColor: {
		type: 'string',
		default: '#888888',
	},
	titleColor: {
		type: 'string',
		default: '#333',
	},
	titleFontSizeType: {
		type: 'string',
		default: 'px',
	},
	titleFontSize: {
		type: 'number',
	},
	titleFontSizeTablet: {
		type: 'number',
	},
	titleFontSizeMobile: {
		type: 'number',
	},
	titleFontFamily: {
		type: 'string',
		default: 'Default',
	},
	titleFontWeight: {
		type: 'string',
	},
	titleFontSubset: {
		type: 'string',
	},
	titleLineHeightType: {
		type: 'string',
		default: 'em',
	},
	titleLineHeight: {
		type: 'number',
	},
	titleLineHeightTablet: {
		type: 'number',
	},
	titleLineHeightMobile: {
		type: 'number',
	},
	titleLoadGoogleFonts: {
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

	descFontSizeType: {
		type: 'string',
		default: 'px',
	},
	descFontSize: {
		type: 'number',
	},
	descFontSizeTablet: {
		type: 'number',
	},
	descFontSizeMobile: {
		type: 'number',
	},
	descFontFamily: {
		type: 'string',
		default: 'Default',
	},
	descFontWeight: {
		type: 'string',
	},
	descFontSubset: {
		type: 'string',
	},
	descLineHeightType: {
		type: 'string',
		default: 'em',
	},
	descLineHeight: {
		type: 'number',
	},
	descLineHeightTablet: {
		type: 'number',
	},
	descLineHeightMobile: {
		type: 'number',
	},
	descLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	headingTag: {
		type: 'string',
		default: 'h4',
	},
	imagePosition: {
		type: 'string',
		default: 'top',
	},
	imageAlignment: {
		type: 'string',
		default: 'top',
	},
	imageSize: {
		type: 'string',
		default: 'medium',
	},
	imageWidth: {
		type: 'number',
		default: '',
	},
};

export default attributes;
