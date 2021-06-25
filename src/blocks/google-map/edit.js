import React, { lazy, Suspense, useEffect } from 'react';

import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/google-map/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/google-map/render" */ './render' )
);

const UAGBGoogleMap = ( props ) => {
	useEffect( () => {
		// Assigning block_id in the attribute.
		props.setAttributes( {
			block_id: props.clientId.substr( 0, 8 ),
		} );
	}, [] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

export default UAGBGoogleMap;
