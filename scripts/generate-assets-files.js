const path = require( "path" );
const paths = require( "./paths" )
const fs = require( "fs" )
const sass = require("node-sass")

//Generate individual block's css files
fs.readdir(paths.pluginSrc + "/blocks", function(error, items) {
	for ( var index=0; index<items.length; index++ ) {
		sass.render({
			file: paths.pluginSrc + "/blocks/" + items[index] + "/style.scss",
			outputStyle: "compressed",
			outFile: "./assets/css/blocks/" + items[index] + ".css",
			sourceMap: false,
		}, function( error, result ) {
			if (null !== result ) {
				let file_path = result.stats.entry
				let new_path = file_path.replace( paths.pluginSrc + path.sep + "blocks" + path.sep, "" )
				new_path = new_path.replace( path.sep + "style.scss", "" )
				if ( !error && undefined !== new_path ) {
					fs.writeFile("./assets/css/blocks/" + new_path + ".css", result.css, function(err) {
						if (err) throw err
					}
					)
				}
			}
		})
	}

    if (error) {
        console.error(error);
        return;
    }

    console.log( "\n\nIndividaul block's css files Generated Successfully!" );
});


// Copy generated style file content to custom style file
// source to copy content
const src = paths.pluginDist + "/style-blocks.css";
// destination for copied content
const dest = paths.pluginDir + "/assets/css/custom-style-blocks.css";

// use copyFile() function
// to copy contents from source file
// and write to destination file asynchronously
fs.copyFile(src, dest, (error) => {
  // incase of any error
  if (error) {
    console.error(error);
    return;
  }

  console.log( "\n\nStyle to Custom-style - Copied Successfully!");
});
