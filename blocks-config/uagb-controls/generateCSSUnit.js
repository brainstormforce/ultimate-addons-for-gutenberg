function generateCSSUnit( value, unit ) {
	let css = '';

	if ( typeof value !== 'undefined' ) {
		css += value + unit;
	}

	return css;
}

export default generateCSSUnit;
