function addAttributes( settings ) {
	const excludeBlock = [
		'wpforms/form-selector',
		'formidable/simple-form',
		'formidable/calculator',
		'llms/lesson-navigation',
		'llms/pricing-table',
		'llms/course-syllabus',
		'llms/instructors',
		'core/archives',
		'core/calendar',
		'core/latest-comments',
		'core/tag-cloud',
		'core/rss',
		'real-media-library/gallery',
	];

	if ( ! excludeBlock.includes( settings.name ) ) {
		if ( settings.attributes ) {
			settings.attributes = Object.assign( settings.attributes, {
				UAGUserRole: {
					type: 'string',
				},
				UAGBrowser: {
					type: 'string',
				},
				UAGSystem: {
					type: 'string',
				},
				UAGDisplayConditions: {
					type: 'string',
				},
				UAGHideDesktop: {
					type: 'boolean',
					default: false,
				},
				UAGHideMob: {
					type: 'boolean',
					default: false,
				},
				UAGHideTab: {
					type: 'boolean',
					default: false,
				},
				UAGLoggedIn: {
					type: 'boolean',
					default: false,
				},
				UAGLoggedOut: {
					type: 'boolean',
					default: false,
				},
			} );
		}
	}
	return settings;
}

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'uagb/advanced-control-block',
	addAttributes
);
