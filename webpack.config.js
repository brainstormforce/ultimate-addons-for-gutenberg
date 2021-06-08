const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require( "path" );

module.exports = {
	...defaultConfig,
	entry: {
		"blocks": path.resolve(
			__dirname,
			'src/blocks.js'
		),
	},
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			'@Controls': path.resolve( __dirname, 'blocks-config/uagb-controls/' ),
		},
	},
	output: {
        ...defaultConfig.output,
        // eslint-disable-next-line no-undef
        path: path.resolve( __dirname, 'dist' )
    }
}