/**
 * BLOCK: Call To Action
 */

import CtaStyle from "./inline-styles";
import callToActionRender from "./render";
import callToActionSettings from "./settings";
import React, { useEffect } from 'react';

const UAGBCallToAction = props => {

	useEffect(() => { // Replacement for componentDidMount.
		
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		props.setAttributes( { classMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-cta-style-" + props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );

	}, [])

	useEffect(() => { // Replacement for componentDidUpdate.
		const element = document.getElementById( "uagb-cta-style-" + props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = CtaStyle( props );
		}
	}, [props] )
		
	return (
		<>
			{callToActionSettings(props)}
			{callToActionRender(props)}
		</>
	);
}


export default UAGBCallToAction;
