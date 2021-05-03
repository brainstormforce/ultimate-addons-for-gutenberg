import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';

const api_key = 'AIzaSyAsd_d46higiozY-zNqtr7zdA81Soswje4';

const Render = ( props ) => {
	props = props.parentProps;

	const {
		className,
		attributes: { height, zoom, address, language },
	} = props;

	const encoded_address = encodeURI( address );
	const lang_par = language ? language : 'en';

	const url = `https://www.google.com/maps/embed/v1/place?key=${ api_key }&q=${ encoded_address }&zoom=${ zoom }&language=${ lang_par }`;

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
				title={ __( 'Google Map for ' + address ) }
				src={ url }
				style={ {
					height,
				} }
			></iframe>
		</div>
	);
};

export default React.memo( Render );
