import React, { useLayoutEffect } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const {
		className,
		attributes: { height, zoom, address, language },
	} = props;

	const encoded_address = encodeURI( address );
	const lang_par = language ? language : 'en';

	const url = `https://www.google.com/maps/embed/v1/place?key=${ wp.uagb_google_api_key }&q=${ encoded_address }&zoom=${ zoom }&language=${ lang_par }`;

	return (
		<div
			className={ classnames(
				className,
				'uagb-google-map__wrap',
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<iframe
				className="uagb-google-map__iframe"
				title={
					__( 'Google Map for ', 'ultimate-addons-for-gutenberg' ) +
					address
				}
				src={ url }
				style={ {
					height,
				} }
			></iframe>
		</div>
	);
};

export default React.memo( Render );
