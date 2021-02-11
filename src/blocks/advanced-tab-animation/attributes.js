/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {

	if ( settings.attributes ) {
		settings.attributes = Object.assign( settings.attributes, {
			animationfield: {
				type: 'string',
			},
			animationhoverfield: {
				type: 'string',
			},
		} );		
	}
	return settings;
}

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'uagb/cover-advanced-control',
	addAttributes
);