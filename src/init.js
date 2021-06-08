/**
 * Load & initialize all blocks from here.
 */


import './blocks/extensions/attributes.js';
import './blocks/post/block.js';
import './blocks/section/block.js';
import './blocks/buttons/block.js';
import './blocks/buttons-child/block.js';
import './blocks/info-box/block.js';
import './blocks/testimonial/block.js';
import './blocks/team/block.js';
import './blocks/social-share/block.js';
import './blocks/social-share-child/block.js';
import './blocks/google-map/block.js';
import './blocks/icon-list/block.js';
import './blocks/icon-list-child/block.js';
import './blocks/price-list/block.js';
import './blocks/price-list-child/block.js';
import './blocks/timeline/block.js';
import './blocks/call-to-action/block.js';
import './blocks/column/block.js';
import './blocks/columns/block.js';
import './blocks/cf7-designer/block.js';
import './blocks/gf-designer/block.js';
import './blocks/blockquote/block.js';
import './blocks/marketing-button/block.js';
import './blocks/table-of-contents/block.js';
import './blocks/how-to/block.js';
import './blocks/faq/block.js';
import './blocks/faq-child/block.js';
import './blocks/inline-notice/block.js';
import './blocks/wp-search/block.js';
import './blocks/review/block.js';
import './blocks/taxonomy-list/block.js';
import './blocks/forms/block.js';
import './blocks/forms/child-blocks/name/block.js';
import './blocks/forms/child-blocks/email/block.js';
import './blocks/forms/child-blocks/hidden/block.js';
import './blocks/forms/child-blocks/phone/block.js';
import './blocks/forms/child-blocks/textarea/block.js';
import './blocks/forms/child-blocks/checkbox/block.js';
import './blocks/forms/child-blocks/radio/block.js';
import './blocks/forms/child-blocks/url/block.js';
import './blocks/forms/child-blocks/select/block.js';
import './blocks/forms/child-blocks/toggle/block.js';
import './blocks/forms/child-blocks/date/block.js';
import './blocks/forms/child-blocks/accept/block.js';
import './blocks/extensions/block.js';
import './blocks/tabs/block.js';
import './blocks/tabs-child/block.js';
import './blocks/lottie/block.js';


// Sort the Blocks based on title.
wp.blocks.getBlockTypes().sort((blockA,blockB)=> {
	if( 'uagb' === blockA.category && 'uagb' === blockB.category ) {
		return blockA.title > blockB.title ? 1 : -1;
	}
	return 0;
} );
