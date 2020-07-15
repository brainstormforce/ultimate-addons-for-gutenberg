/**
 * Webpack Configuration
 *
 * Working of a Webpack can be very simple or complex. This is an intenally simple
 * build configuration.
 *
 * Webpack basics — If you are new the Webpack here's all you need to know:
 *     1. Webpack is a module bundler. It bundles different JS modules together.
 *     2. It needs and entry point and an ouput to process file(s) and bundle them.
 *     3. By default it only understands common JavaScript but you can make it
 *        understand other formats by way of adding a Webpack loader.
 *     4. In the file below you will find an entry point, an ouput, and a babel-loader
 *        that tests all .js files excluding the ones in node_modules to process the
 *        ESNext and make it compatible with older browsers i.e. it converts the
 *        ESNext (new standards of JavaScript) into old JavaScript through a loader
 *        by Babel.
 *
 * TODO: Instructions.
 *
 * @since 1.0.0
 */

const paths = require( "./paths" )
const autoprefixer = require( "autoprefixer" )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

// Extract style.css for both editor and frontend styles.
const blocksCSSPlugin = new ExtractTextPlugin( {
	filename: './dist/blocks.style.build.css',
} );

// Extract editor.css for editor styles.
const editBlocksCSSPlugin = new ExtractTextPlugin( {
	filename: './dist/blocks.editor.build.css',
} );

const fs = require( "fs" )
const sass = require('node-sass');

fs.readdir( paths.pluginSrc + "/blocks", function(err, items) {

	fs.writeFile('./dist/blocks.style.css', '', function(err) {
			if (err) throw err;
		}
	);

	for ( var i=0; i<items.length; i++ ) {
		
		var result = sass.render({

			file: paths.pluginSrc + '/blocks/' + items[i] + '/style.scss',
			outputStyle: 'compressed',
			outFile: './assets/css/blocks/' + items[i] + '.css',
			sourceMap: false,

		}, function( error, result ) {

			let file_path = result.stats.entry
			let new_path = file_path.replace( paths.pluginSrc + "/blocks/", "" );
			new_path = new_path.replace( "/style.scss", "" );
			
			if ( !error && undefined !== new_path ) {
				fs.writeFile('./assets/css/blocks/' + new_path + '.css', result.css, function(err) {
						if (err) throw err;
					}
				);

				fs.appendFile('./dist/blocks.style.css', result.css, function (err) {
					if (err) throw err;
				});
			}
		});
	}
});

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
	use: [
		// "postcss" loader applies autoprefixer to our CSS.
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				ident: "postcss",
				plugins: [
					autoprefixer( {
						browsers: [
							'> 1%',
                            'ie >= 11',
                            'last 1 Android versions',
                            'last 1 ChromeAndroid versions',
                            'last 2 Chrome versions',
                            'last 2 Firefox versions',
                            'last 2 Safari versions',
                            'last 2 iOS versions',
                            'last 2 Edge versions',
                            'last 2 Opera versions'
						],
						flexbox: "no-2009",
					} ),
				],
			},
		},
		// "sass" loader converts SCSS to CSS.
		{
			loader: 'sass-loader',
			options: {
				// Add common CSS file for variables and mixins.
				data: '@import "./src/common.scss";\n',
				outputStyle: 'nested',
			},
		},
	],
};

// Export configuration.
module.exports = {
	entry: {
		'./dist/blocks.build': paths.pluginBlocksJs, // 'name' : 'path/file.ext'.
	},
	output: {
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: true,
		// The dist folder.
		path: paths.pluginDist,
		filename: '[name].js', // [name] = './dist/blocks.build' as defined above.
	},
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	devtool: 'cheap-eval-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {

						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
					},
				},
			},
			{
				test: /style\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: blocksCSSPlugin.extract( extractConfig ),
			},
			{
				test: /editor\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: editBlocksCSSPlugin.extract( extractConfig ),
			},
		],
	},
	// Add plugins.
	plugins: [ blocksCSSPlugin, editBlocksCSSPlugin ],
	stats: 'minimal'
};