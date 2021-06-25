/**
 * BLOCK: Marketing Button
 */

import styling from './styling';
import React, { useEffect, Suspense, lazy } from 'react';
import lazyLoader from '@Controls/lazy-loader';
const Settings = lazy( () =>
	import(
		/* webpackChunkName: "chunks/marketing-button/settings" */ './settings'
	)
);
const Render = lazy( () =>
	import(
		/* webpackChunkName: "chunks/marketing-button/render" */ './render'
	)
);
import { withSelect } from '@wordpress/data';

import { compose } from '@wordpress/compose';

const UAGBMarketingButtonEdit = ( props ) => {
	useEffect( () => {
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		props.setAttributes( { classMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-marketing-btn-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		const element = document.getElementById(
			'uagb-style-marketing-btn-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

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

export default compose( applyWithSelect )( UAGBMarketingButtonEdit );
