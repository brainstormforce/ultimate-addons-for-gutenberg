/**
 * BLOCK: UAGB Tabs Block Attributes
 */
import { __ } from '@wordpress/i18n';
const attributes = {
	block_id: {
		type: 'string',
	},
	tabHeaders: {
		type: 'array',
		default: [
			__( 'Tab 1', 'ultimate-addons-for-gutenberg' ),
			__( 'Tab 2', 'ultimate-addons-for-gutenberg' ),
			__( 'Tab 3', 'ultimate-addons-for-gutenberg' ),
		],
	},
	tabActive: {
		type: 'number',
		default: 0,
	},
	tabActiveFrontend: {
		type: 'number',
		default: 0,
	},
	tabsStyleD: {
		type: 'string',
		default: 'hstyle1',
	},
	tabsStyleT: {
		type: 'string',
		default: 'vstyle6',
	},
	tabsStyleM: {
		type: 'string',
		default: 'vstyle6',
	},
	headerBgColor: {
		type: 'string',
	},
	headerTextColor: {
		type: 'string',
		default: '#007cba',
	},
	bodyBgColor: {
		type: 'string',
	},
	bodyTextColor: {
		type: 'string',
	},
	borderWidth: {
		type: 'number',
		default: 1,
	},
	borderColor: {
		type: 'string',
		default: '#e0e0e0',
	},
	activeTabBgColor: {
		type: 'string',
		default: '#007cba',
	},
	activeTabTextColor: {
		type: 'string',
		default: '#fff',
	},
	tabTitleLeftMargin: {
		type: 'number',
	},
	tabTitleRightMargin: {
		type: 'number',
	},
	tabTitleTopMargin: {
		type: 'number',
	},
	tabTitleBottomMargin: {
		type: 'number',
	},
	tabBodyLeftMargin: {
		type: 'number',
	},
	tabBodyRightMargin: {
		type: 'number',
	},
	tabBodyTopMargin: {
		type: 'number',
	},
	tabBodyBottomMargin: {
		type: 'number',
	},
	tabBodyVertPadding: {
		type: 'number',
	},
	tabBodyHrPadding: {
		type: 'number',
	},
	tabTitleVertPadding: {
		type: 'number',
	},
	tabTitleHrPadding: {
		type: 'number',
	},
	titleFontSize: {
		type: 'number',
	},
	titleFontSizeType: {
		type: 'string',
		default: 'px',
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
	tabAlign: {
		type: 'string',
		default: 'left',
	},
	titleAlign: {
		type: 'string',
		default: 'center',
	},
	showIcon: {
		type: 'boolean',
		default: false,
	},
	icon: {
		type: 'string',
	},
	iconPosition: {
		type: 'string',
		default: 'left',
	},
	iconSpacing: {
		type: 'string',
		default: 10,
	},
	iconColor: {
		type: 'string',
	},
	iconSize: {
		type: 'number',
		default: 12,
	},
	activeiconColor: {
		type: 'string',
	},
};

export default attributes;
