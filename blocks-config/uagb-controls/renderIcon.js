/**
 * Set inline CSS class.
 *
 * @param {Object} props - The block object.
 * @return {Array} The inline CSS class.
 */

import parseSVG from './parseIcon';

function renderSVG( svg ) {
	svg = parseSVG( svg );

	const fontAwesome = uagb_blocks_info.uagb_svg_icons[ svg ];

	if ( 'undefined' !== typeof fontAwesome ) {
		const viewbox_array = fontAwesome.svg.hasOwnProperty( 'brands' )
			? fontAwesome.svg.brands.viewBox
			: fontAwesome.svg.solid.viewBox;
		const path = fontAwesome.svg.hasOwnProperty( 'brands' )
			? fontAwesome.svg.brands.path
			: fontAwesome.svg.solid.path;
		const viewBox = viewbox_array.join( ' ' );

		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox={ viewBox }>
				<path d={ path }></path>
			</svg>
		);
	}
}

export default renderSVG;
