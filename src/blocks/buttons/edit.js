/**
 * BLOCK: Multi Buttons
 */

import styling from './styling';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';
import React, { useEffect, useState, lazy, Suspense } from 'react';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/buttons/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/buttons/render" */ './render' )
);

let prevState;

const buttonsComponent = ( props ) => {
	const initialState = {
		isFocused: 'false',
		isHovered: 'false',
	};

	const [ state, setStateValue ] = useState( initialState );

	useEffect( () => {
		// Replacement for componentDidMount.

		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		// Assigning block_id in the attribute.
		props.setAttributes( { classMigrate: true } );
		props.setAttributes( { childMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-buttons-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );

		prevState = props.isSelected;
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		if ( ! props.isSelected && prevState && state.isFocused ) {
			setStateValue( {
				isFocused: 'false',
			} );
		}

		const element = document.getElementById(
			'uagb-style-buttons-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}

		prevState = props.isSelected;
	}, [ props ] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

export default buttonsComponent;
