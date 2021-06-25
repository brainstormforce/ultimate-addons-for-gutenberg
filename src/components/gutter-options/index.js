import { __ } from '@wordpress/i18n';

const gutterOptions = [
	{
		value: '0',
		label: __( 'None', 'ultimate-addons-for-gutenberg' ),
		shortName: __( 'None', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '5',
		/* translators: abbreviation for small size */
		label: __( 'S', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Small', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '10',
		/* translators: abbreviation for medium size */
		label: __( 'M', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Medium', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '15',
		/* translators: abbreviation for large size */
		label: __( 'L', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Large', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '20',
		/* translators: abbreviation for largest size */
		label: __( 'XL', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Huge', 'ultimate-addons-for-gutenberg' ),
	},
];

export default gutterOptions;
