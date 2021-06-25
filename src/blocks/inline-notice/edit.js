/**
 * Inline Notice Block.
 */

// Import block dependencies and components.
import styling from './styling';
import lazyLoader from '@Controls/lazy-loader';
import React, { useEffect, Suspense, lazy } from 'react';

const Settings = lazy( () =>
	import(
		/* webpackChunkName: "chunks/inline-notice/settings" */ './settings'
	)
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/inline-notice/render" */ './render' )
);

const UAGBInlineNoticeEdit = ( props ) => {
	useEffect( () => {
		const { setAttributes, clientId } = props;
		// Assigning block_id in the attribute.
		setAttributes( { block_id: clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-inline-notice-style-' + clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		const element = document.getElementById(
			'uagb-inline-notice-style-' + props.clientId.substr( 0, 8 )
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

export default UAGBInlineNoticeEdit;
