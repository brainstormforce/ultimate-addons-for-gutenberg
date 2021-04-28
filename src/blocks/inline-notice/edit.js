/**
 * Inline Notice Block.
 */

// Import block dependencies and components.
import styling from "./styling"
import inlineNoticeRender from "./render"
import inlineNoticeSettings from "./settings"
import React, { useEffect } from 'react';
const UAGBInlineNoticeEdit = props => {

	useEffect(() => { // Replacement for componentDidMount.
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-inline-notice-style-" + props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );

	}, [])

	useEffect(() => { // Replacement for componentDidUpdate.
		const element = document.getElementById( "uagb-inline-notice-style-" + props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [props] )
		
	return (
		<>
			{inlineNoticeSettings(props)}
			{inlineNoticeRender(props)}
		</>
	);
}


export default UAGBInlineNoticeEdit;