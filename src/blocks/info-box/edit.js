/**
 * BLOCK: Info Box - Edit Class
 */

 import InfoBoxStyle from "./inline-styles"
 import InfoBoxRender from "./render"
 import InfoBoxSetting from "./settings"
 
 import React, { useEffect } from 'react';
 
 const { __ } = wp.i18n
 
const UAGBinfoBox = props =>{
	 
	 useEffect(() => { // Replacement for componentDidMount.
 
		 // Assigning block_id in the attribute.
		 props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } )
 
		 props.setAttributes( { classMigrate: true } )
 
		 // Pushing Style tag for this block css.
		 const $style = document.createElement( "style" )
		 $style.setAttribute( "id", "uagb-info-box-style-" + props.clientId.substr( 0, 8 ) )
		 document.head.appendChild( $style )
	 }, [])
 
	 useEffect(() => { // Replacement for componentDidUpdate.
		 var element = document.getElementById( "uagb-info-box-style-" + props.clientId.substr( 0, 8 ) )
 
		 if( null !== element && undefined !== element ) {
			 element.innerHTML = InfoBoxStyle( props )
		 }
	 }, [props] )
	
	return (
		<>
			{InfoBoxSetting(props)}
			{InfoBoxRender(props) }
		</>
	)
}
export default UAGBinfoBox