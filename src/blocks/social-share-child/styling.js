/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';

function styling( props ) {
	const {
		icon_color,
		icon_hover_color,
		icon_bg_color,
		icon_bg_hover_color,
	} = props.attributes;

	const selectors = {
		'.uagb-ss-repeater a.uagb-ss__link': {
			color: icon_color,
		},
		'.uagb-ss-repeater a.uagb-ss__link svg': {
			fill: icon_color,
		},
		'.uagb-ss-repeater:hover a.uagb-ss__link': {
			color: icon_hover_color,
		},
		'.uagb-ss-repeater:hover a.uagb-ss__link svg': {
			fill: icon_hover_color,
		},
		'.uagb-ss-repeater.uagb-ss__wrapper': {
			background: icon_bg_color,
		},
		'.uagb-ss-repeater.uagb-ss__wrapper:hover': {
			background: icon_bg_hover_color,
		},
	};

	let stylingCss = '';
	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;

	stylingCss = generateCSS( selectors, id );

	return stylingCss;
}

export default styling;
