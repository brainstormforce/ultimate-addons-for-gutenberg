/**
 * BLOCK: Forms - Toggle - Edit
 */

import React, { lazy, Suspense, useEffect } from 'react';
import lazyLoader from '@Controls/lazy-loader';
const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/form/toggle-settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/form/toggle-render" */ './render' )
);

const UAGBFormsToggleEdit = ( props ) => {
	useEffect( () => {
		const { setAttributes } = props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );
	}, [] );

	return (
		<>
			<Suspense fallback={ lazyLoader() }>
				<Settings parentProps={ props } />
				<Render parentProps={ props } />
			</Suspense>
		</>
	);
};

export default UAGBFormsToggleEdit;
