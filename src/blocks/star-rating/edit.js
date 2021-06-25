/**
 * BLOCK: Star Rating
 */

import React, { lazy, Suspense, useEffect } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import styling from "./styling"
//  Import CSS.
import "./style.scss"
import "./editor.scss"
 
 const Settings = lazy( () =>
	 import(
		 /* webpackChunkName: "chunks/advanced-heading/settings" */ './settings'
	 )
 );
 const Render = lazy( () =>
	 import(
		 /* webpackChunkName: "chunks/advanced-heading/render" */ './render'
	 )
 );

const UAGBStarRating = ( props ) => {

	useEffect( () => {
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		props.setAttributes( { classMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-star-rating-style-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		const element = document.getElementById(
			'uagb-star-rating-style-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	return (
		<>
			<Suspense fallback={ lazyLoader() }>
				<Settings parentProps={ props } />
				<Render parentProps={ props } />
			</Suspense>
		</>
	);
}

const applyWithSelect = withSelect( ( select ) => {
	const { __experimentalGetPreviewDeviceType = null } = select(
		'core/edit-post'
	);
	const deviceType = __experimentalGetPreviewDeviceType
		? __experimentalGetPreviewDeviceType()
		: null;

	return {
		deviceType,
	};
} );
export default compose( applyWithSelect )( UAGBStarRating );

