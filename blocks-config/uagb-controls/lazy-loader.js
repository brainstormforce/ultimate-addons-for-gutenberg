import React from 'react';
import { __ } from '@wordpress/i18n';

const lazyLoader = () => {
	return (
		<>
			<p className="uagb-loader">
				{ ' ' }
				{ __( 'Loading', 'ultimate-addons-for-gutenberg' ) }{ ' ' }
			</p>
			<style
				dangerouslySetInnerHTML={ {
					__html: `.uagb-loader:after {content: '.';animation: dots 1s steps(5, end) infinite;}@keyframes dots {0%, 20% {color: #00000000;text-shadow: .25em 0 0 #00000000, .5em 0 0 #00000000;}40% {color: #000000FF;text-shadow: .25em 0 0 #00000000, .5em 0 0 #00000000;}60% {text-shadow: .25em 0 0 #000000FF, .5em 0 0 #00000000;}80%, 100% {text-shadow: .25em 0 0 #000000FF, .5em 0 0 #000000FF;}}`,
				} }
			/>
		</>
	);
};
export default lazyLoader;
