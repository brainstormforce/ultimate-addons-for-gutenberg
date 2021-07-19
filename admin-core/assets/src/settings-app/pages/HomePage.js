import React from 'react';
import './HomePage.scss';

import UserInfoBox from '@SettingsApp/components/home-page/UserInfoBox';

function HomePage() {
	return (
		<div className="uag-home-page-wrapper">
			<UserInfoBox></UserInfoBox>
		</div>
	);
}

export default HomePage;
