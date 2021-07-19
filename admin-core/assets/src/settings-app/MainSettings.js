import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useStateValue } from '@Utils/StateProvider';
import apiFetch from '@wordpress/api-fetch';

/* Component */
import NavMenu from '@SettingsApp/components/common/NavMenu';
import SettingsRoute from '@SettingsApp/SettingsRoute';

import InputEvents from '@SettingsApp/utils/InputEvents';

function MainSettings() {
	const [ { globaldata }, dispatch ] = useStateValue();

	InputEvents();

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

	return (
		<Router>
			<NavMenu />
			<Switch>
				<Route path="/">
					<SettingsRoute />
				</Route>
			</Switch>
		</Router>
	);
}

export default MainSettings;
