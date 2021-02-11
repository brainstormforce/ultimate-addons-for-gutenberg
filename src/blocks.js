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
import "./blocks/advanced-tab-animation/attributes.js"
import "./blocks/advanced-heading/block.js"
import "./blocks/post/block.js"
import "./blocks/section/block.js"
import "./blocks/buttons/block.js"
import "./blocks/buttons-child/block.js"
import "./blocks/info-box/block.js"
import "./blocks/testimonial/block.js"
import "./blocks/team/block.js"
import "./blocks/social-share/block.js"
import "./blocks/social-share-child/block.js"
import "./blocks/google-map/block.js"
import "./blocks/icon-list/block.js"
import "./blocks/icon-list-child/block.js"
import "./blocks/price-list/block.js"
import "./blocks/price-list-child/block.js"
import "./blocks/timeline/block.js"
import "./blocks/call-to-action/block.js"
import "./blocks/column/block.js"
import "./blocks/columns/block.js"
import "./blocks/cf7-styler/block.js"
import "./blocks/gf-styler/block.js"
import "./blocks/blockquote/block.js"
import "./blocks/marketing-button/block.js"
import "./blocks/table-of-contents/block.js"
import "./blocks/how-to/block.js"
import "./blocks/faq/block.js"
import "./blocks/faq-child/block.js"
import "./blocks/inline-notice/block.js"
import "./blocks/wp-search/block.js"
import "./blocks/review/block.js"
import "./blocks/taxonomy-list/block.js"
import "./blocks/advanced-tab-animation/block.js"
import "./blocks/lottie/block.js"

import UAGB_Block_Icons from "../dist/blocks/uagb-controls/block-icons"

const { updateCategory } = wp.blocks

updateCategory( "uagb", {
	icon: UAGB_Block_Icons.logo,
}, )



