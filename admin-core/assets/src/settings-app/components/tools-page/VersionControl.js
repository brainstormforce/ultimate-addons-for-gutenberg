import { useStateValue } from '@Utils/StateProvider';
import { NormalButton } from '@Fields';
import { __ } from '@wordpress/i18n';
import './VersionControl.scss';
import ReactHtmlParser from 'react-html-parser';
import SettingTable from '../common/SettingTable';
import React, { useState } from 'react';
import ConfirmPopup from './ConfirmPopup';
import apiFetch from '@wordpress/api-fetch';
function VersionControl( props ) {
	const [ { globaldata, options }, dispatch ] = useStateValue();

	const [ savingState, setsavingState ] = useState( false );

	const [ showPopup, setshowPopup ] = useState( false );

	const [ enableBeta, setenableBeta ] = useState(
		options[ '_uag_common[enable_beta_updates]' ]
	);

	const rollbackSettings = globaldata.settings.rollback_to_previous_version;

	const rollbacklabel =
		globaldata.settings.rollback_to_previous_version.fields
			.rollback_to_previous_version.label;
	const rollbackdesc =
		globaldata.settings.rollback_to_previous_version.fields
			.rollback_to_previous_version.desc;

	const enableBetaUpdateslabel =
		globaldata.settings.enable_beta_updates.fields.enable_beta_updates
			.label;
	const enableBetaUpdatesdesc =
		globaldata.settings.enable_beta_updates.fields.enable_beta_updates.desc;

	const handleRollbackVersion = function ( event ) {
		event.preventDefault();
		setshowPopup( true );
	};

	const confirmPopup = () => {
		const rollbackUrl = uag_react.rollback_url.replace(
			'VERSION',
			options[ '_uag_common[rollback_to_previous_version]' ]
		);

		setshowPopup( false );

		location.href = rollbackUrl;
	};

	const cancelPopup = () => {
		setshowPopup( false );
	};
	const enableBetaUpdate = ( e ) => {
		e.preventDefault();
		setsavingState( true );
		let status;
		if ( enableBeta == 'no' ) {
			status = 'yes';
		} else {
			status = 'no';
		}
		dispatch( {
			type: 'SET_OPTION',
			name: '_uag_common[enable_beta_updates]',
			value: status,
		} );
		let formData = new window.FormData();

		formData.append( 'action', 'uag_enable_beta_updates' );
		formData.append( 'security', uag_react.enable_beta_updates_nonce );
		formData.append( 'value', status );
		
		setenableBeta( status );
		apiFetch( {
			url: uag_react.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if(data.success){
				setsavingState( false );
			}
		} );
		
	};

	return (
		<>
			<h2>
				{ __( 'Version Control', 'ultimate-addons-for-gutenberg' ) }
			</h2>
			<div className="uag-version-control__elements">
				<div className="uag-version-control__element">
					<h3>{ ReactHtmlParser( rollbacklabel ) }</h3>
					<p>{ ReactHtmlParser( rollbackdesc ) }</p>
					<div className="uag-version-control-button">
						<SettingTable
							settings={ rollbackSettings }
							meta_key="_uag_common"
						/>
						<NormalButton
							buttonText={ __(
								'Rollback',
								'ultimate-addons-for-gutenberg'
							) }
							onClick={ handleRollbackVersion }
						/>
					</div>
				</div>
				<div className="uag-version-control__element">
					<h3>{ ReactHtmlParser( enableBetaUpdateslabel ) }</h3>
					<p>{ ReactHtmlParser( enableBetaUpdatesdesc ) }</p>
					<div className="uag-version-control-button">
						<NormalButton
							buttonText={
								enableBeta == 'yes'
									? __(
											'Disable',
											'ultimate-addons-for-gutenberg'
									  )
									: __(
											'Enable',
											'ultimate-addons-for-gutenberg'
									  )
							}
							onClick={ enableBetaUpdate }
							saving={ savingState }
						/>
						<span
							className={ `uag-control__status-${ enableBeta }` }
						>
							{ enableBeta == 'yes'
								? __(
										'Enabled',
										'ultimate-addons-for-gutenberg'
								  )
								: __(
										'Disabled',
										'ultimate-addons-for-gutenberg'
								  ) }
						</span>
					</div>
				</div>
			</div>
			<ConfirmPopup
				showPopup={ showPopup }
				setshowPopup={ setshowPopup }
				confirmPopup={ confirmPopup }
				cancelPopup={ cancelPopup }
			/>
		</>
	);
}

export default VersionControl;
