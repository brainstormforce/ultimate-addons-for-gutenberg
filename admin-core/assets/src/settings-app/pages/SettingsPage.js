import SettingsPageSkeleton from '@Admin/settings-app/components/settings-page/SettingsPageSkeleton';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import TemplatesButton from '@SettingsApp/components/settings-page/TemplatesButton';
import AssetsGeneration from '@SettingsApp/components/tools-page/AssetsGeneration';

function SettingsPage() {
	const [ { globaldata }, dispatch ] = useStateValue();

	let loading = true;

	if ( 'undefined' === typeof globaldata.length ) {
		loading = false;
	}

	useEffect( () => {
		let isActive = true;
		if ( globaldata.length < 1 ) {
			const getsettings = async () => {
				apiFetch( {
					path: '/uag/v1/admin/commonsettings/',
				} ).then( ( data ) => {
					if ( isActive ) {
						dispatch( {
							type: 'SET_SETTINGS',
							commondata: data,
						} );
					}
				} );
			};

			getsettings();
		}
		return () => {
			isActive = false;
		};
	}, [] );

	const location = useLocation();
	const tab = location.hash;
	let currentTab = <p>Default Tab</p>;

	if ( loading ) {
		return (
			<div className="uag-global-settings-metabox">
				<SettingsPageSkeleton />
			</div>
		);
	}
	switch ( tab ) {
		case '#templates_settings':
			currentTab = <TemplatesButton />;
			break;
		default:
			currentTab = <TemplatesButton />;
			break;
	}

	return (
		<div className="uag-global-settings-metabox">
			<AssetsGeneration />
			<>{ currentTab }</>
		</div>
	);
}

export default SettingsPage;
