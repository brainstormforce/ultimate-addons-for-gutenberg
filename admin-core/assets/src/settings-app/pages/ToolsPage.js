import './ToolsPage.scss';
import ToolsPageSkeleton from '@Admin/settings-app/components/tools-page/ToolsPageSkeleton';
import React, { useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import VersionControl from '@SettingsApp/components/tools-page/VersionControl';

function ToolsPage() {
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

	let currentTab = <p>Default Tab</p>;

	if ( loading ) {
		return (
			<div className="uag-global-settings-metabox">
				<ToolsPageSkeleton />
			</div>
		);
	}
	currentTab = <VersionControl />;

	return <div className="uag-global-settings-metabox">{ currentTab }</div>;
}

export default ToolsPage;
