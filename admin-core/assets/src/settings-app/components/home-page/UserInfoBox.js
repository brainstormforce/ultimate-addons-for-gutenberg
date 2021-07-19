import React from 'react';

import './UserInfoBox.scss';

import { __ } from '@wordpress/i18n';
import { NormalButton } from '@Fields';

function UserInfoBox( ) {
	const onJointheCommunityClick = () => {
		location.href = 'https://ultimategutenberg.com/';
	};
	const onKnowledgebaseClick = () => {
		location.href = 'https://ultimategutenberg.com/';
	};
	const onGetSupportClick = () => {
		location.href = 'https://ultimategutenberg.com/';
	};

	return (
		<div className="uag-metabox uag-user-info">
			<div className="uag-metabox__header">
				<div className="uag-metabox__title">
					<h1>
						{ __( 'Welcome ', 'ultimate-addons-for-gutenberg' ) +
							uag_react.current_user }
					</h1>
				</div>
				<p>
					{ __(
						' Thank you for choosing Ultimate Addons for Gutenberg - the most comprehensive library of advanced and creative blocks to build a stunning website and blog faster than ever before!',
						'ultimate-addons-for-gutenberg'
					) }
				</p>
			</div>
			<div className="uag-metabox__body">
				<div className="uag-metabox__elements">
					<div className="uag-metabox__element">
						<h3>
							{ __(
								'Join the community ',
								'ultimate-addons-for-gutenberg'
							) }
						</h3>
						<p>
							{ __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<NormalButton
							buttonText={ __(
								'Join the community',
								'ultimate-addons-for-gutenberg'
							) }
							onClick={ onJointheCommunityClick }
							saving={ false }
						/>
					</div>
					<div className="uag-metabox__element">
						<h3>
							{ __(
								'Knowledgebase',
								'ultimate-addons-for-gutenberg'
							) }
						</h3>
						<p>
							{ __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<NormalButton
							buttonText={ __(
								'Browse Documentation',
								'ultimate-addons-for-gutenberg'
							) }
							onClick={ onKnowledgebaseClick }
							saving={ false }
						/>
					</div>
					<div className="uag-metabox__element">
						<h3>
							{ __(
								'Get 5-star Support ',
								'ultimate-addons-for-gutenberg'
							) }
						</h3>
						<p>
							{ __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<NormalButton
							buttonText={ __(
								'Get Support',
								'ultimate-addons-for-gutenberg'
							) }
							onClick={ onGetSupportClick }
							saving={ false }
						/>
					</div>
				</div>
				<div className="uag-starter-site__elements">
					<div className="uag-starter-tmp__img">
						<img
							src={
								uag_react.plugin_dir +
								'admin-core/assets/images/astra-starter-sites.jpg'
							}
						/>
					</div>
					<div className="uag-starter-tmp__details">
						<h2>
							{ __(
								'Get Ready to use, Full Demo Websites ',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<p>
							{ __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<NormalButton
							buttonText={ __(
								'Get Starter Templates',
								'ultimate-addons-for-gutenberg'
							) }
							saving={ false }
						/>
					</div>
				</div>
				<div className="uag-theme__metabox">
					<div className="uag-theme__content">
						<h2>
							{ __(
								'UAG Works best with free ASTRA theme! ',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<p>
							{ __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
					</div>
					<div className="uag-theme__cta">
						<NormalButton
							buttonText={ __(
								'Install ASTRA Now!',
								'ultimate-addons-for-gutenberg'
							) }
							saving={ false }
						/>
						<NormalButton
							buttonText={ __(
								'Read Full Guide',
								'ultimate-addons-for-gutenberg'
							) }
							saving={ false }
							classes="uag-button--secondary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserInfoBox;
