/**
 * BLOCK: Content Timeline child.
 */

import { __ } from '@wordpress/i18n';
import React, { useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import(
		/* webpackChunkName: "chunks/content-timeline-child/settings" */ './settings'
	)
);
const Render = lazy( () =>
	import(
		/* webpackChunkName: "chunks/content-timeline-child/render" */ './render'
	)
);

const contentTimelineChildComponent = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.

		//Store client id.
		props.setAttributes( { block_id: props.clientId } );
	}, [] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};
export default contentTimelineChildComponent;
