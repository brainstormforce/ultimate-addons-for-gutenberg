import React from 'react';
import ReactDOM from 'react-dom';
// var {registerObserver} = require('react-perf-devtool');

/* State Provider */
import { StateProvider } from '@Utils/StateProvider';
import reducer, { initialState } from '@SettingsApp/data/reducer';

/* Settings Provider */
import { SettingsProvider } from '@Utils/SettingsProvider';
import settingsEvents, {
	settingsInitialState,
} from '@Utils/SettingsProvider/initialData';

/* Main Compnent */
import './common/common';
import './common/all-config.scss';
import MainSettings from '@SettingsApp/MainSettings';
import Footer from '@SettingsApp/components/common/Footer';

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={ initialState } reducer={ reducer }>
			<SettingsProvider
				initialState={ settingsInitialState }
				reducer={ settingsEvents }
			>
				<MainSettings />
			</SettingsProvider>
		</StateProvider>
	</React.StrictMode>,
	document.getElementById( 'uag-settings-app' )
);
ReactDOM.render( <Footer />, document.getElementById( 'wpfooter' ) );
