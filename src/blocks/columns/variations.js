/**
 * Internal dependencies
 */
import rowIcons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Template option choices for predefined form layouts.
 *
 * @constant
 * @type {Array}
 */
const variations = [
	{
		name: 'one-column',
		label: __( 'One column', 'ultimate-addons-for-gutenberg' ),
		icon: rowIcons.colOne,
		attributes: {
			columns: 1,
			layout: '100',
		},
		innerBlocks: [ [ 'uagb/column', { colWidth: 100 } ] ],
		scope: [ 'block' ],
	},
	{
		name: 'two-column-split',
		label: __(
			'Two columns; equal split',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout5050,
		attributes: {
			columns: 2,
			layout: '50-50',
		},
		isDefault: true,
		innerBlocks: [
			[ 'uagb/column', { colWidth: 50 } ],
			[ 'uagb/column', { colWidth: 50 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-one-third-two-thirds',
		label: __(
			'Two columns; one-third, two-thirds split',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout3366,
		attributes: {
			columns: 2,
		},
		innerBlocks: [
			[ 'uagb/column', { colWidth: 33.33 } ],
			[ 'uagb/column', { colWidth: 66.66 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-two-thirds-one-third',
		label: __(
			'Two columns; two-thirds, one-third split',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout6633,
		attributes: {
			columns: 2,
		},
		innerBlocks: [
			[ 'uagb/column', { colWidth: 66.66 } ],
			[ 'uagb/column', { colWidth: 33.33 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-column',
		label: __(
			'Three columns; equal split',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout502525,
		attributes: {
			columns: 3,
			layout: '50-25-25',
		},
		innerBlocks: [
			[ 'uagb/column', { colWidth: 50 } ],
			[ 'uagb/column', { colWidth: 25 } ],
			[ 'uagb/column', { colWidth: 25 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-equal',
		label: __(
			'Three columns; equal split',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout333333,
		attributes: {
			columns: 3,
		},
		innerBlocks: [
			[ 'uagb/column', { colWidth: 33.33 } ],
			[ 'uagb/column', { colWidth: 33.33 } ],
			[ 'uagb/column', { colWidth: 33.33 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-wider-center',
		label: __(
			'Three columns; wide center column',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout255025,
		attributes: {
			columns: 3,
		},
		innerBlocks: [
			[ 'uagb/column', { colWidth: 25 } ],
			[ 'uagb/column', { colWidth: 50 } ],
			[ 'uagb/column', { colWidth: 25 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'four-column',
		label: __(
			'Four columns; equal split',
			'ultimate-addons-for-gutenberg'
		),
		icon: rowIcons.layout25252525,
		attributes: {
			columns: 4,
			layout: '25-25-25-25',
		},
		innerBlocks: [
			[ 'uagb/column', { colWidth: 25 } ],
			[ 'uagb/column', { colWidth: 25 } ],
			[ 'uagb/column', { colWidth: 25 } ],
			[ 'uagb/column', { colWidth: 25 } ],
		],
		scope: [ 'block' ],
	},
];

export default variations;
