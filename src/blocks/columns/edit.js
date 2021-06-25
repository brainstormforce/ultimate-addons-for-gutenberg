/**
 * BLOCK: UAGB - Columns Edit
 */

import styling from './styling';
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';

import React, { useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/columns/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/columns/render" */ './render' )
);

import { withSelect, useDispatch } from '@wordpress/data';

import { compose } from '@wordpress/compose';

import { __experimentalBlockVariationPicker } from '@wordpress/block-editor';

import { withNotices } from '@wordpress/components';

import { createBlock } from '@wordpress/blocks';

const ColumnsComponent = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		props.setAttributes( { classMigrate: true } );

		if ( 'middle' === props.attributes.vAlign ) {
			props.setAttributes( { vAlign: 'center' } );
		}
		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-columns-style-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		const element = document.getElementById(
			'uagb-columns-style-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	const blockVariationPickerOnSelect = (
		nextVariation = props.defaultVariation
	) => {
		if ( nextVariation.attributes ) {
			props.setAttributes( nextVariation.attributes );
		}

		if ( nextVariation.innerBlocks ) {
			props.replaceInnerBlocks(
				props.clientId,
				createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	};

	const createBlocksFromInnerBlocksTemplate = ( innerBlocksTemplate ) => {
		return innerBlocksTemplate.map(
			( [ name, attributes, innerBlocks = [] ] ) =>
				createBlock(
					name,
					attributes,
					createBlocksFromInnerBlocksTemplate( innerBlocks )
				)
		);
	};

	const { variations, hasInnerBlocks } = props;

	if ( ! hasInnerBlocks ) {
		return (
			<__experimentalBlockVariationPicker
				icon={ UAGB_Block_Icons.columns }
				label={ uagb_blocks_info.blocks[ 'uagb/columns' ].title }
				instructions={ __(
					'Select a variation to start with.',
					'ultimate-addons-for-gutenberg'
				) }
				variations={ variations }
				allowSkip
				onSelect={ ( nextVariation ) =>
					blockVariationPickerOnSelect( nextVariation )
				}
			/>
		);
	}

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
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
	const { __experimentalGetPreviewDeviceType = null } = select(
		'core/edit-post'
	);

	const deviceType = __experimentalGetPreviewDeviceType
		? __experimentalGetPreviewDeviceType()
		: null;

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
		deviceType,
	};
} );

export default compose( withNotices, applyWithSelect )( ColumnsComponent );
