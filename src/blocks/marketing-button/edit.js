/**
 * BLOCK: Marketing Button
 */

import styling from './styling';
import MarketingButtonSettings from './settings';
import MarketingButtonRender from './render';
import React, { useEffect } from 'react';
const { withSelect } = wp.data;

const { compose } = wp.compose;

const UAGBMarketingButtonEdit = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.

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
		<>
			{ MarketingButtonSettings( props ) }
			{ MarketingButtonRender( props ) }
		</>
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
