/**
 * BLOCK: Price List
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import attributes from './attributes';
import './style.scss';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { withSelect } from '@wordpress/data';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

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
const withPriceList = createHigherOrderComponent( ( BlockEdit ) => {
	return enhance( ( { ...props } ) => {
		return (
			<>
				<BlockEdit { ...props } />
			</>
		);
	} );
}, 'withPriceList' );

registerBlockType( 'uagb/restaurant-menu', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: uagb_blocks_info.blocks[ 'uagb/restaurant-menu' ].title, // Block title.
	description: uagb_blocks_info.blocks[ 'uagb/restaurant-menu' ].description, // Block description.
	icon: UAGB_Block_Icons.restaurant_menu, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	keywords: [ __( 'pricelist' ), __( 'menu' ), __( 'uag' ) ],
	example: {},
	supports: {
		anchor: true,
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	deprecated,
} );
addFilter( 'editor.BlockEdit', 'uagb/restaurant-menu', withPriceList );
