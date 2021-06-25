/**
 * BLOCK: Forms - Select - Edit
 */

import { __ } from '@wordpress/i18n';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/form/select-settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/form/select-render" */ './render' )
);

const UAGBFormsSelectEdit = ( props ) => {
	const [ setState ] = useState( {
		optionsstate: [
			{
				optiontitle: __(
					'Option Name 1',
					'ultimate-addons-for-gutenberg'
				),
			},
		],
	} );

	useEffect( () => {
		const { setAttributes } = props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-forms-select-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	return (
		<>
			<Suspense fallback={ lazyLoader() }>
				<Settings parentProps={ props } />
				<Render parentProps={ props } setState={ setState } />
			</Suspense>
		</>
	);
};

export default UAGBFormsSelectEdit;
