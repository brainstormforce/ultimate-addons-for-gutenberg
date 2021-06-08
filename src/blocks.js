/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

// Dynamic webpack public path.
__webpack_public_path__ = uagb_blocks_info.uagb_url + 'dist/';


import { updateCategory } from '@wordpress/blocks';
( async function () {
	// Prepare svg icon key list once before registering blocks.
	wp.UAGBSvgIcons = Object.keys( uagb_blocks_info.uagb_svg_icons );
	import( /* webpackChunkName: "chunks/controls/block-icons" */  "@Controls/block-icons").then(icons => {

		wp.UAGBBlockIcons = icons.default;

		import( './init');

		updateCategory( 'uagb', {
			icon: wp.UAGBBlockIcons.logo,
		} );
	});
})();
