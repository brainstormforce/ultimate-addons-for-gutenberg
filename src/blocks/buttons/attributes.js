const itemCount = 2;

const buttons = [];

for ( let i = 1; i <= itemCount; i++ ) {
	const label = '#Click Here';
	const link = '#';
	buttons.push( {
		label,
		link,
		target: '_self',
		size: '',
		vPadding: 10,
		hPadding: 14,
		borderWidth: 1,
		borderRadius: 2,
		borderStyle: 'solid',
		borderColor: '#333',
		borderHColor: '#333',
		color: '#333',
		background: '',
		hColor: '#333',
		hBackground: '',
		sizeType: 'px',
		sizeMobile: '',
		sizeTablet: '',
		lineHeight: '',
		lineHeightType: 'em',
		lineHeightMobile: '',
		lineHeightTablet: '',
	} );
}

const attributes = {
	block_id: {
		type: 'string',
	},
	btn_count: {
		type: 'number',
		default: itemCount,
	},
	buttons: {
		type: 'array',
		default: buttons,
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
		default: 'center',
	},
	gap: {
		type: 'number',
		default: 10,
	},
	stack: {
		type: 'string',
		default: 'none',
	},
	loadGoogleFonts: {
		type: 'boolean',
		default: false,
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
};

export default attributes;
