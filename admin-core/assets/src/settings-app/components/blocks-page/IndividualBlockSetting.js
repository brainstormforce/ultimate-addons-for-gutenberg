import { useStateValue } from '@Utils/StateProvider';
import React, { useEffect } from 'react';
import { ToggleField } from '@Fields';
import apiFetch from '@wordpress/api-fetch';
let blocksCachedValue;

function IndividualBlockSetting( props ) {
	const [ { options }, dispatch ] = useStateValue();

	const blocksValue =
		options[ '_uag_common[blocks_activation_and_deactivation]' ];
	
	useEffect( () => {
		window.onbeforeunload = null;
		blocksCachedValue =
			options[ '_uag_common[blocks_activation_and_deactivation]' ];
	}, [] );
	
	useEffect( () => {
		if (
			JSON.stringify( blocksCachedValue ) !==
			JSON.stringify( blocksValue )
		) {
			dispatch( {
				type: 'SET_OPTION',
				name: '_uag_common[blocks_activation_and_deactivation]',
				value: blocksValue,
			} );

			let data = {
				'value' : blocksValue,
				'action' : 'uag_blocks_activation_and_deactivation',
				'security' : uag_react.blocks_activation_and_deactivation_nonce
			}
			
			jQuery.ajax( {
				type: 'POST',
				data: data,
				url: uag_react.ajax_url,
				xhrFields: {
				withCredentials: true,
				},
				success( response ) {
				},
			} ).done( function () {
			} );

			blocksCachedValue =
				options[ '_uag_common[blocks_activation_and_deactivation]' ];
		}
	}, [ options[ '_uag_common[blocks_activation_and_deactivation]' ] ] );
	
	return (
		<div className="uag-individual-block-settings-metabox">
			<ToggleField
				id={ props.blockInfo.slug }
				name="_uag_common[blocks_activation_and_deactivation]"
				value={ blocksValue[ props.blockInfo.slug ] }
				label={ props.blockInfo.title }
			/>
		</div>
	);
}

export default IndividualBlockSetting;
