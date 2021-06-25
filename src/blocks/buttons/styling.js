/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const { fontFamily, fontWeight, gap, stack, align } = props.attributes;

	const selectors = {};
	const tabletSelectors = {};
	const mobileSelectors = {};

	selectors[ ' .uagb-buttons-repeater:not(.wp-block-button__link)' ] = {
		'font-family': fontFamily,
		'font-weight': fontWeight,
	};

	selectors[ ' .uagb-button__wrapper' ] = {
		'margin-left': generateCSSUnit( gap / 2, 'px' ),
		'margin-right': generateCSSUnit( gap / 2, 'px' ),
	};

	if ( 'desktop' == stack ) {
		selectors[ ' .uagb-button__wrapper' ][ 'margin-left' ] = 0;
		selectors[ ' .uagb-button__wrapper' ][ 'margin-right' ] = 0;
		selectors[ ' .uagb-button__wrapper' ][
			'margin-bottom'
		] = generateCSSUnit( gap, 'px' );

		selectors[
			' .block-editor-block-list__layout'
		] = {
			'flex-direction': 'column',
		};
	} else if ( 'tablet' == stack ) {
		tabletSelectors[ '.uagb-editor-preview-mode-tablet .uagb-button__wrapper' ] = {
			'margin-left': 0,
			'margin-right': 0,
			'margin-bottom': generateCSSUnit( gap, 'px' ),
		};
		mobileSelectors[ '.uagb-editor-preview-mode-mobile .uagb-button__wrapper' ] = {
			'margin-left': 0,
			'margin-right': 0,
			'margin-bottom': generateCSSUnit( gap, 'px' ),
		};
		tabletSelectors[ '.uagb-editor-preview-mode-tablet .block-editor-block-list__layout' ] = {
			'flex-direction': 'column',
		};
		mobileSelectors[ '.uagb-editor-preview-mode-mobile .block-editor-block-list__layout' ] = {
			'flex-direction': 'column',
		};
	} else if ( 'mobile' == stack ) {
		mobileSelectors[ '.uagb-editor-preview-mode-mobile .uagb-button__wrapper' ] = {
			'margin-left': 0,
			'margin-right': 0,
			'margin-bottom': generateCSSUnit( gap, 'px' ),
		};

		mobileSelectors[ '.uagb-editor-preview-mode-mobile .block-editor-block-list__layout' ] = {
			'flex-direction': 'column',
		};
	}

	let alignment = '';
	if ( align == 'left' ) {
		alignment = 'flex-start';
	} else if ( align == 'right' ) {
		alignment = 'flex-end';
	} else {
		alignment = 'center';
	}

	if ( align !== 'full' ) {
		selectors[ ' .uagb-buttons__wrap' ] = {
			'justify-content': alignment,
			'-webkit-box-pack': alignment,
			'-ms-flex-pack': alignment,
		};

		selectors[
			' .uagb-buttons-stack-desktop .block-editor-block-list__layout'
		] = {
			'align-items': alignment,
		};

		if ( align === 'left' ) {
			selectors[
				" .wp-block[data-type='uagb/buttons-child']:first-child .uagb-button__wrapper"
			] = {
				'margin-left': 0,
			};
		}

		if ( align === 'right' ) {
			selectors[
				" .wp-block[data-type='uagb/buttons-child']:last-child .uagb-button__wrapper"
			] = {
				'margin-right': 0,
			};
		}
	} else {
		selectors[ ' .uagb-button__wrapper' ][ 'justify-content' ] = 'center';
		selectors[ ' .uagb-buttons-repeater' ] = {
			width: '100%',
		};
		selectors[
			" .wp-block[data-type='uagb/buttons-child']:first-child .uagb-button__wrapper"
		] = {
			'margin-left': 0,
		};
		selectors[
			" .wp-block[data-type='uagb/buttons-child']:last-child .uagb-button__wrapper"
		] = {
			'margin-right': 0,
		};
	}

	const id = `.uagb-block-${ props.clientId.substr( 0, 8 ) }`;
	let stylingCss = generateCSS( selectors, id );

	stylingCss += generateCSS( tabletSelectors, id, true, 'tablet' );

	stylingCss += generateCSS( mobileSelectors, id, true, 'mobile' );

	return stylingCss;
}

export default styling;
