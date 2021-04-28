/**
 * BLOCK: Price List
 */


import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import edit from "./edit";
import save from "./save";
import deprecated from "./deprecated";
import attributes from "./attributes";
import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { compose, createHigherOrderComponent } = wp.compose;

/**
 * Override the default block element to add	wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const enhance = compose(
	
	withSelect( ( select ) => {
		return {
			selected: select( "core/block-editor" ).getSelectedBlock(),
		};
	} )
);
/**
 * Add custom UAG attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withPriceList = createHigherOrderComponent( ( BlockEdit ) => {
	return enhance( ( { ...props } ) => {
		return (
			<Fragment>
				<BlockEdit { ...props } />
			</Fragment>
		);
	} );
}, "withPriceList" );


registerBlockType( "uagb/restaurant-menu", {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: uagb_blocks_info.blocks["uagb/restaurant-menu"].title, // Block title.
	description:uagb_blocks_info.blocks["uagb/restaurant-menu"].description, // Block description.
	icon: UAGB_Block_Icons.restaurant_menu, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	keywords: [
		__( "pricelist" ),
		__( "menu" ),
		__( "uag" ),
	],
	example:{},
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	example: {},
	deprecated,
} );
addFilter(
	"editor.BlockEdit",
	"uagb/restaurant-menu",
	withPriceList
);
