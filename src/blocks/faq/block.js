/**
 * BLOCK: FAQ - Schema
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"

const { addFilter } = wp.hooks;
const { __ } = wp.i18n

const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { compose, createHigherOrderComponent } = wp.compose;

const {
	registerBlockType
} = wp.blocks

/**
 * Override the default block element to add	wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const enhance = compose(
	
	withSelect( ( select ) => {
		return {
			selected: select( 'core/block-editor' ).getSelectedBlock(),
		};
	} )
);
/**
 * Add custom UAG attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withFaq = createHigherOrderComponent( ( BlockEdit ) => {
	return enhance( ( { ...props } ) => {
		return (
			<Fragment>
				<BlockEdit { ...props } />
			</Fragment>
		);
	} );
}, 'withFaq' );

registerBlockType( "uagb/faq", {
	title: uagb_blocks_info.blocks["uagb/faq"]["title"],
	description: uagb_blocks_info.blocks["uagb/faq"]["description"],
	icon: UAGB_Block_Icons.faq,
	category: uagb_blocks_info.category,
	keywords: [
		__( "faq" ),
		__( "schema" ),
		__( "uag" ),
		__( "accordion" ),
	],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	save,
} )

addFilter(
	'editor.BlockEdit',
	'uagb/faq',
	withFaq
);
