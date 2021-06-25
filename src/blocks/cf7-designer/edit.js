import styling from './styling';
import React, { lazy, useEffect, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/cf7-styler/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/cf7-styler/render" */ './render' )
);

import { withSelect } from '@wordpress/data';

const UAGBCF7 = ( props ) => {
	useEffect( () => {
		// Assigning block_id in the attribute.
		props.setAttributes( { isHtml: false } );
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );
		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-cf7-styler-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		jQuery( '.wpcf7-submit' ).click( function ( event ) {
			event.preventDefault();
		} );
		const element = document.getElementById(
			'uagb-cf7-styler-' + props.clientId.substr( 0, 8 )
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

export default withSelect( ( select, props ) => {
	const { setAttributes } = props;
	const { formId, isHtml } = props.attributes;
	let jsonData = '';

	if ( formId && -1 != formId && 0 != formId && ! isHtml ) {
		jQuery.ajax( {
			url: uagb_blocks_info.ajax_url,
			data: {
				action: 'uagb_cf7_shortcode',
				formId,
				nonce: uagb_blocks_info.uagb_ajax_nonce,
			},
			dataType: 'json',
			type: 'POST',
			success( data ) {
				setAttributes( { isHtml: true } );
				setAttributes( { formJson: data } );
				jsonData = data;
			},
		} );
	}

	return {
		formHTML: jsonData,
	};
} )( UAGBCF7 );
