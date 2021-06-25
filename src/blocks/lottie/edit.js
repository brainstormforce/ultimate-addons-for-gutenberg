/**
 * BLOCK: Lottie Edit
 */

import styling from './styling';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/lottie/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/lottie/render" */ './render' )
);

const UAGBLottie = ( props ) => {
	const lottieplayer = React.createRef();
	const [ state, setState ] = useState( { direction: 1, loopState: true } );

	useEffect( () => {
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );
		props.setAttributes( { classMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-lottie-style-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		const element = document.getElementById(
			'uagb-lottie-style-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	const loopLottie = () => {
		const { setAttributes } = props;
		const { loop } = props.attributes;
		const { loopState } = state;

		setAttributes( { loop: ! loop } );
		setState( { loopState: ! loopState } );
	};

	const reverseDirection = () => {
		const { setAttributes } = props;
		const { reverse } = props.attributes;
		const { direction } = state;

		setAttributes( { reverse: ! reverse } );
		setState( { direction: direction * -1 } );
	};

	return (
		<>
			<Suspense fallback={ lazyLoader() }>
				<Render lottieplayer={ lottieplayer } parentProps={ props } />
				<Settings
					parentProps={ props }
					loopLottie={ loopLottie }
					reverseDirection={ reverseDirection }
				/>
			</Suspense>
		</>
	);
};

export default UAGBLottie;
