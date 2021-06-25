/**
 * BLOCK: Forms - Edit
 */

import React, { useEffect, useCallback, Suspense, lazy } from 'react';
import styling from './styling';
import UAGB_Block_Icons from '@Controls/block-icons';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/form/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/form/render" */ './render' )
);

import { withSelect, useDispatch } from '@wordpress/data';

import { compose, createHigherOrderComponent } from '@wordpress/compose';

import { createBlock } from '@wordpress/blocks';

import { __experimentalBlockVariationPicker } from '@wordpress/block-editor';

import { withNotices } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';

const UAGBFormsEdit = ( props ) => {
	useEffect( () => {
		const { setAttributes } = props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-forms-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );

		const id = props.clientId;

		window.addEventListener( 'load', renderReadyClasses( id ) );
	}, [] );

	useEffect( () => {
		const element = document.getElementById(
			'uagb-style-forms-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	useEffect( () => {
		const { setAttributes } = props; // Assigning block_id in the attribute.

		setAttributes( {
			block_id: props.clientId.substr( 0, 8 ),
		} ); // Pushing Style tag for this block css.

		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-forms-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
		const id = props.clientId;
		window.addEventListener( 'load', renderReadyClasses( id ) );
	}, [] );

	const blockVariationPickerOnSelect = useCallback(
		( nextVariation = props.defaultVariation ) => {
			if ( nextVariation.attributes ) {
				props.setAttributes( nextVariation.attributes );
			}

			if ( nextVariation.innerBlocks ) {
				props.replaceInnerBlocks(
					props.clientId,
					createBlocksFromInnerBlocksTemplate(
						nextVariation.innerBlocks
					)
				);
			}
		}
	);
	const createBlocksFromInnerBlocksTemplate = useCallback(
		( innerBlocksTemplate ) => {
			return innerBlocksTemplate.map(
				( [ name, attributes, innerBlocks = [] ] ) =>
					createBlock(
						name,
						attributes,
						createBlocksFromInnerBlocksTemplate( innerBlocks )
					)
			);
		}
	);
	const { variations, hasInnerBlocks } = props;

	const renderReadyClasses = useCallback( ( id ) => {
		const mainDiv = document.getElementById( 'block-' + id );
		const formscope = mainDiv.getElementsByClassName(
			'uagb-forms__outer-wrap'
		);

		if ( null !== formscope[ 0 ] && undefined !== formscope[ 0 ] ) {
			const editorwrap = formscope[ 0 ].children;
			const formInnerWrap = editorwrap[ 0 ].children;
			const editorBlockWrap = formInnerWrap[ 0 ].getElementsByClassName(
				'block-editor-block-list__layout'
			);
			const sibling = editorBlockWrap[ 0 ].children;

			for ( let index = 0; index < sibling.length; index++ ) {
				if (
					sibling[ index ].classList.contains( 'uag-col-2' ) &&
					sibling[ index + 1 ].classList.contains( 'uag-col-2' )
				) {
					const div = document.createElement( 'div' );
					div.className = 'uag-col-2-wrap uag-col-wrap-' + index;
					sibling[ index + 1 ].after( div );
					const wrapper_div = formscope[ 0 ].getElementsByClassName(
						'uag-col-wrap-' + index
					);
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
				} else if (
					sibling[ index ].classList.contains( 'uag-col-3' ) &&
					sibling[ index + 1 ].classList.contains( 'uag-col-3' ) &&
					sibling[ index + 2 ].classList.contains( 'uag-col-3' )
				) {
					const div = document.createElement( 'div' );
					div.className = 'uag-col-3-wrap uag-col-wrap-' + index;
					sibling[ index + 2 ].after( div );
					const wrapper_div = formscope[ 0 ].getElementsByClassName(
						'uag-col-wrap-' + index
					);
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
				} else if (
					sibling[ index ].classList.contains( 'uag-col-4' ) &&
					sibling[ index + 1 ].classList.contains( 'uag-col-4' ) &&
					sibling[ index + 2 ].classList.contains( 'uag-col-4' ) &&
					sibling[ index + 3 ].classList.contains( 'uag-col-4' )
				) {
					const div = document.createElement( 'div' );
					div.className = 'uag-col-4-wrap uag-col-wrap-' + index;
					sibling[ index + 3 ].after( div );
					const wrapper_div = formscope[ 0 ].getElementsByClassName(
						'uag-col-wrap-' + index
					);
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
					wrapper_div[ 0 ].appendChild( sibling[ index ] );
				}
			}
		}
	} );

	if ( ! hasInnerBlocks ) {
		return (
			<>
				<__experimentalBlockVariationPicker
					icon={ UAGB_Block_Icons.columns }
					label={ uagb_blocks_info.blocks[ 'uagb/forms' ].title }
					instructions={ __(
						'Select a variation to start with.',
						'ultimate-addons-for-gutenberg'
					) }
					variations={ variations }
					allowSkip
					onSelect={ ( nextVariation ) =>
						blockVariationPickerOnSelect( nextVariation )
					}
					className="uagb-forms-variations"
				/>
			</>
		);
	}

	return (
		<>
			<Suspense fallback={ lazyLoader() }>
				<Settings parentProps={ props } />
				<Render parentProps={ props } />
			</Suspense>
		</>
	);
};

const applyWithSelect = withSelect( ( select, props ) => {
	const { getBlocks } = select( 'core/block-editor' );
	const {
		getBlockType,
		getBlockVariations,
		getDefaultBlockVariation,
	} = select( 'core/blocks' );
	const innerBlocks = getBlocks( props.clientId );
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	return {
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		innerBlocks,
		hasInnerBlocks:
			select( 'core/block-editor' ).getBlocks( props.clientId ).length >
			0,

		blockType: getBlockType( props.name ),
		defaultVariation:
			typeof getDefaultBlockVariation === 'undefined'
				? null
				: getDefaultBlockVariation( props.name ),
		variations:
			typeof getBlockVariations === 'undefined'
				? null
				: getBlockVariations( props.name ),
		replaceInnerBlocks,
	};
} );

const addAdvancedClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		return (
			<BlockListBlock
				{ ...props }
				className={ props.attributes.className }
			/>
		);
	};
}, 'addAdvancedClasses' );

wp.hooks.addFilter( 'editor.BlockListBlock', 'uagb/forms', addAdvancedClasses );

export default compose(
	withNotices,
	applyWithSelect,
	addAdvancedClasses
)( UAGBFormsEdit );
