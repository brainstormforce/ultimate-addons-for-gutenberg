/**
 * BLOCK: UAGB Inline Notice Block Attributes
 */

const attributes = {
	block_id: {
		type: 'string',
	},
	c_id: {
		type: 'string',
		default: null,
	},
	noticeTitle: {
		type: 'string',
		source: 'html',
		selector: '.uagb-notice-title',
		default: 'Notice Title',
	},
	headingTag: {
		type: 'string',
		default: 'h4',
	},
	noticeContent: {
		type: 'string',
		default: '',
	},
	noticeDismiss: {
		type: 'string',
		default: '',
	},
	cookies: {
		type: 'boolean',
		default: false,
	},
	close_cookie_days: {
		type: 'number',
		default: 1,
	},
	textColor: {
		type: 'string',
		default: '',
	},
	titleColor: {
		type: 'string',
		default: '',
	},
	noticeColor: {
		type: 'string',
		default: '#FFD54F',
	},
	contentBgColor: {
		type: 'string',
	},
	noticeDismissColor: {
		type: 'string',
		default: '',
	},
	icon: {
		type: 'string',
		default: 'fa fa-window-close',
	},
	noticeAlignment: {
		type: 'string',
		default: 'left',
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
	titleFontSizeType: {
		type: 'string',
		default: 'px',
	},
	titleLineHeightType: {
		type: 'string',
		default: 'em',
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
	titleLineHeight: {
		type: 'number',
	},
	titleLineHeightTablet: {
		type: 'number',
	},
	titleLineHeightMobile: {
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
	descFontSize: {
		type: 'number',
	},
	descFontSizeType: {
		type: 'string',
		default: 'px',
	},
	descFontSizeTablet: {
		type: 'number',
	},
	descFontSizeMobile: {
		type: 'number',
	},
	descLineHeight: {
		type: 'number',
	},
	descLineHeightType: {
		type: 'string',
		default: 'em',
	},
	descLineHeightTablet: {
		type: 'number',
	},
	descLineHeightMobile: {
		type: 'number',
	},
	titleLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	descLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	contentVrPadding: {
		type: 'number',
		default: 15,
	},
	contentHrPadding: {
		type: 'number',
		default: 15,
	},
	titleVrPadding: {
		type: 'number',
		default: 15,
	},
	titleHrPadding: {
		type: 'number',
		default: 15,
	},
	layout: {
		type: 'string',
		default: 'modern',
	},
	highlightWidth: {
		type: 'number',
		default: 10,
	},
};

export default attributes;
