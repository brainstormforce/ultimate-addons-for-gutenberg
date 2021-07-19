import React from 'react';
import { useLocation } from 'react-router-dom';

import HomePage from '@SettingsApp/pages/HomePage';
import BlocksPage from '@SettingsApp/pages/BlocksPage';
import ToolsPage from '@SettingsApp/pages/ToolsPage';
import SettingsPage from '@SettingsApp/pages/SettingsPage';

function SettingsRoute() {
	const query = new URLSearchParams( useLocation().search );
	const page = query.get( 'page' );
	const path = query.get( 'path' );
	const currentEvent = query.get( 'event' );

	let routePage = <p>Default route fallback</p>;

	if ( uag_react.home_slug === page ) {
		if ( 'getting-started' === currentEvent ) {
			routePage = <HomePage />;
		} else {
			switch ( path ) {
				case 'blocks':
					routePage = <BlocksPage />;
					break;
				case 'tools':
					routePage = <ToolsPage />;
					break;
				case 'settings':
					routePage = <SettingsPage />;
					break;
				default:
					routePage = <HomePage />;
					break;
			}
		}
		uagWpNavMenuChange( path );
	}

	return <>{ routePage }</>;
}

export default SettingsRoute;
