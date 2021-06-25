/**
 * BLOCK: Icon List - Attributes
 */

const itemCount = 1;

const icons = [];

for ( let i = 1; i <= itemCount; i++ ) {
	icons.push( {
		label: '#Label',
		image_icon: 'icon',
		icon: 'fab fa-arrow-circle-right',
		image: '',
		icon_color: '#3a3a3a',
		label_color: '',
		icon_hover_color: '',
		label_hover_color: '',
		icon_bg_color: '',
		icon_bg_hover_color: '',
		icon_border_color: '',
		icon_border_hover_color: '',
		link: '#',
		target: false,
		disableLink: true,
		hideLabel: false,
	} );
}

const attributes = {
	block_id: {
		type: 'string',
	},
	classMigrate: {
		type: 'boolean',
		default: false,
	},
	childMigrate: {
		type: 'boolean',
		default: false,
	},
	align: {
		type: 'string',
		default: 'left',
	},
	icon_count: {
		type: 'number',
		default: itemCount,
	},
	icons: {
		type: 'array',
		default: icons,
	},
	gap: {
		type: 'number',
		default: 10,
	},
	inner_gap: {
		type: 'number',
		default: 15,
	},
	iconPosition: {
		type: 'string',
		default: 'middle',
	},
	size: {
		type: 'number',
		default: 16,
	},
	sizeType: {
		type: 'string',
		default: 'px',
	},
	sizeMobile: {
		type: 'number',
	},
	sizeTablet: {
		type: 'number',
	},
	bgSize: {
		type: 'number',
		default: 0,
	},
	border: {
		type: 'number',
		default: 0,
	},
	borderRadius: {
		type: 'number',
		default: 0,
	},
	hideLabel: {
		type: 'boolean',
		default: false,
	},
	fontSize: {
		type: 'number',
	},
	fontSizeType: {
		type: 'string',
		default: 'px',
	},
	fontSizeMobile: {
		type: 'number',
	},
	fontSizeTablet: {
		type: 'number',
	},
	fontFamily: {
		type: 'string',
		default: 'Default',
	},
	fontWeight: {
		type: 'string',
	},
	fontSubset: {
		type: 'string',
	},
	lineHeightType: {
		type: 'string',
		default: 'em',
	},
	lineHeight: {
		type: 'number',
	},
	lineHeightTablet: {
		type: 'number',
	},
	lineHeightMobile: {
		type: 'number',
	},
	loadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	icon_layout: {
		type: 'string',
		default: 'vertical',
	},
	stack: {
		type: 'string',
		default: 'none',
	},
};

export default attributes;
