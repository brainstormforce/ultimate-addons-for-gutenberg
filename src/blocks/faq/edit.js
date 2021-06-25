/**
 * BLOCK: FAQ
 */

import styling from './styling';
import React, { useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/faq/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/faq/render" */ './render' )
);

import { compose } from '@wordpress/compose';
import { select, withSelect } from '@wordpress/data';

let prevState;

const FaqComponent = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.

		const { attributes, setAttributes } = props;

		const {
			questionBottomPaddingDesktop,
			vquestionPaddingDesktop,
			questionLeftPaddingDesktop,
			hquestionPaddingDesktop,
			questionBottomPaddingTablet,
			vquestionPaddingTablet,
			questionLeftPaddingTablet,
			hquestionPaddingTablet,
			questionBottomPaddingMobile,
			vquestionPaddingMobile,
			questionLeftPaddingMobile,
			hquestionPaddingMobile,
		} = attributes;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		setAttributes( { schema: JSON.stringify( props.schemaJsonData ) } );
		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-faq-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );

		if (
			10 === questionBottomPaddingDesktop &&
			10 !== vquestionPaddingDesktop
		) {
			setAttributes( {
				questionBottomPaddingDesktop: vquestionPaddingDesktop,
			} );
		}
		if (
			10 === questionLeftPaddingDesktop &&
			10 !== hquestionPaddingDesktop
		) {
			setAttributes( {
				questionLeftPaddingDesktop: hquestionPaddingDesktop,
			} );
		}

		if (
			10 === questionBottomPaddingTablet &&
			10 !== vquestionPaddingTablet
		) {
			setAttributes( {
				questionBottomPaddingTablet: vquestionPaddingTablet,
			} );
		}
		if (
			10 === questionLeftPaddingTablet &&
			10 !== hquestionPaddingTablet
		) {
			setAttributes( {
				questionLeftPaddingTablet: hquestionPaddingTablet,
			} );
		}

		if (
			10 === questionBottomPaddingMobile &&
			10 !== vquestionPaddingMobile
		) {
			setAttributes( {
				questionBottomPaddingMobile: vquestionPaddingMobile,
			} );
		}
		if (
			10 === questionLeftPaddingMobile &&
			10 !== hquestionPaddingMobile
		) {
			setAttributes( {
				questionLeftPaddingMobile: hquestionPaddingMobile,
			} );
		}
		prevState = props.schemaJsonData;
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.

		const element = document.getElementById(
			'uagb-style-faq-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}

		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( faqChild ) => {
			faqChild.attributes.headingTag = props.attributes.headingTag;
		} );

		if (
			JSON.stringify( props.schemaJsonData ) !==
			JSON.stringify( prevState )
		) {
			props.setAttributes( {
				schema: JSON.stringify( props.schemaJsonData ),
			} );

			prevState = props.schemaJsonData;
		}
	}, [ props ] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

export default compose(
	withSelect( ( ownProps ) => {
		const page_url = select( 'core/editor' ).getPermalink();
		const { __experimentalGetPreviewDeviceType = null } = select(
			'core/edit-post'
		);

		const deviceType = __experimentalGetPreviewDeviceType
			? __experimentalGetPreviewDeviceType()
			: null;

		let faq_data = {};
		const json_data = {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			'@id': page_url,
			mainEntity: [],
		};
		const faqChildBlocks = select( 'core/block-editor' ).getBlocks(
			ownProps.clientId
		);

		faqChildBlocks.forEach( ( faqChild, key ) => {
			faq_data = {
				'@type': 'Question',
				name: faqChild.attributes.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faqChild.attributes.answer,
				},
			};
			json_data.mainEntity[ key ] = faq_data;
		} );

		return {
			deviceType,
			schemaJsonData: json_data,
		};
	} )
)( FaqComponent );
