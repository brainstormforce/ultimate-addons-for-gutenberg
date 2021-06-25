const attributes = {
	block_id: {
		type: 'string',
	},
	classMigrate: {
		type: 'boolean',
		default: false,
	},
	headingTitle: {
		source: 'html',
		selector: 'h1,h2,h3,h4,h5,h6',
	},
	headingId: {
		type: 'string',
	},
	headingDesc: {
		source: 'html',
		selector: 'p',
		default: '',
	},
	headingAlign: {
		type: 'string',
		default: 'center',
	},
	headingColor: {
		type: 'string',
	},
	subHeadingColor: {
		type: 'string',
	},
	separatorColor: {
		type: 'string',
	},
	headingTag: {
		type: 'string',
		default: 'h2',
	},
	level: {
		type: 'number',
		default: 2,
	},
	seperatorStyle: {
		type: 'string',
		default: 'solid',
	},
	separatorHeight: {
		type: 'number',
	},
	separatorWidth: {
		type: 'number',
	},
	separatorWidthType: {
		type: 'string',
		default: '%',
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
		default: '',
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
};

export default attributes;
