/**
 * BLOCK: FAQ - Child
 */

import React, { useEffect, lazy, Suspense, useState } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/faq-child/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/faq-child/render" */ './render' )
);

let prevState;

const FaqChildComponent = ( props ) => {
	const initialState = {
		isFocused: 'false',
	};

	const [ state, setStateValue ] = useState( initialState );

	useEffect( () => {
		// Replacement for componentDidMount.

		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );
		// Pushing Style tag for this block css.
		prevState = props.isSelected;
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.

		if ( ! props.isSelected && prevState && state.isFocused ) {
			setStateValue( {
				isFocused: 'false',
			} );
		}
		if ( props.isSelected && ! prevState ) {
			setStateValue( {
				isFocused: true,
			} );
		}
		prevState = props.isSelected;
	}, [ props ] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings />
			<Render parentProps={ props } state={ state } />
		</Suspense>
	);
};

export default FaqChildComponent;
