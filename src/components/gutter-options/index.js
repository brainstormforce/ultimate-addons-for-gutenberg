const { __ } = wp.i18n

const gutterOptions = [
	{
		value: '0',
		label: __( 'None' ),
		shortName: __( 'None' ),
	},
	{
		value: '5',
		/* translators: abbreviation for small size */
		label: __( 'S' ),
		tooltip: __( 'Small' ),
	},
	{
		value: '10',
		/* translators: abbreviation for medium size */
		label: __( 'M' ),
		tooltip: __( 'Medium' ),
	},
	{
		value: '15',
		/* translators: abbreviation for large size */
		label: __( 'L' ),
		tooltip: __( 'Large' ),
	},
	{
		value: '20',
		/* translators: abbreviation for largest size */
		label: __( 'XL' ),
		tooltip: __( 'Huge' ),
	},
];

export default gutterOptions;