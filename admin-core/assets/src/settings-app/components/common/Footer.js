import React from 'react';
import { __ } from '@wordpress/i18n';

import './Footer.scss';

function Footer() {
	const stars = [ ...Array( 5 ).keys() ].map( ( i ) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			key={ i }
			height="13"
			width="13"
			viewBox="0 0 150 150"
		>
			<defs>
				<mask>
					<rect
						height="150"
						width={ '150' }
						y="0"
						x="0"
						fill="#E3B84A"
					/>
				</mask>
			</defs>
			<path
				fill="#E3B84A"
				strokeWidth="2.5"
				d="m0.75,56.89914l56.02207,0l17.31126,-56.14914l17.31126,56.14914l56.02206,0l-45.32273,34.70168l17.31215,56.14914l-45.32274,-34.70262l-45.32274,34.70262l17.31215,-56.14914l-45.32274,-34.70168z"
			/>
			<path
				className="star"
				fill="#E3B84A"
				strokeWidth="2.5"
				d="m0.75,56.89914l56.02207,0l17.31126,-56.14914l17.31126,56.14914l56.02206,0l-45.32273,34.70168l17.31215,56.14914l-45.32274,-34.70262l-45.32274,34.70262l17.31215,-56.14914l-45.32274,-34.70168z"
			/>
		</svg>
	) );
	return (
		<div className="uag-global-footer">
			<p>
				Please rate UAG Blocks { stars } on {' '}
				<a
					target="_blank"
					href="https://wordpress.org/plugins/ultimate-addons-for-gutenberg/"
					rel="noreferrer"
				>
					WordPress.org
				</a>
				{' '}If this product helped you.
			</p>
			<p>Thank you for your support!</p>
		</div>
	);
}

export default Footer;
