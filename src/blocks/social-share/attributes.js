/**
 * BLOCK: UAGB Social Share Attributes
 */

const itemCount = 1;

const socials = [];

for ( let i = 1; i <= itemCount; i++ ) {
	socials.push( {
		type: 'facebook',
		image_icon: 'icon',
		icon: 'fab fa-facebook',
		image: '',
		icon_color: '#3a3a3a',
		icon_hover_color: '',
		icon_bg_color: '',
		icon_bg_hover_color: '',
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
	block_id: {
		type: 'string',
	},
	current_url: {
		type: 'string',
	},
	align: {
		type: 'string',
		default: 'center',
	},
	social_count: {
		type: 'number',
		default: itemCount,
	},
	socials: {
		type: 'array',
		default: socials,
	},
	gap: {
		type: 'number',
		default: 10,
	},
	size: {
		type: 'number',
		default: 40,
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
	bgSizeType: {
		type: 'string',
		default: 'px',
	},
	bgSizeMobile: {
		type: 'number',
	},
	bgSizeTablet: {
		type: 'number',
	},
	borderRadius: {
		type: 'number',
		default: 0,
	},
	social_layout: {
		type: 'string',
		default: 'horizontal',
	},
	stack: {
		type: 'string',
		default: 'none',
	},
};

export default attributes;
