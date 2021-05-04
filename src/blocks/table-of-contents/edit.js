/**
 * BLOCK: Table of Contents
 */

import styling from './styling';

import React, { useEffect } from 'react';

import Settings from './settings';
import Render from './render';

const { withSelect } = wp.data;
const { compose } = wp.compose;

const UAGBTableOfContentsEdit = ( props ) => {
	useEffect( () => {
		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		props.setAttributes( { classMigrate: true } );

		// Pushing Scroll To Top div
		const $scrollTop = document.createElement( 'div' );
		$scrollTop.setAttribute(
			'class',
			'uagb-toc__scroll-top dashicons dashicons-arrow-up-alt2'
		);
		document.body.insertBefore( $scrollTop, document.body.lastChild );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-style-toc-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
		if ( props.attributes.heading && '' !== props.attributes.heading ) {
			props.setAttributes( { headingTitle: props.attributes.heading } );
		}
	}, [] );

	useEffect( () => {
		const element = document.getElementById(
			'uagb-style-toc-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	const { scrollToTop } = props.attributes;

	const scrollElement = jQuery( '.uagb-toc__scroll-top' );
	if ( null != scrollElement && 'undefined' !== scrollElement ) {
		if ( scrollToTop ) {
			scrollElement.addClass( 'uagb-toc__show-scroll' );
		} else {
			scrollElement.removeClass( 'uagb-toc__show-scroll' );
		}
	}

	return (
		<>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</>
	);
};

export default compose(
	withSelect( ( select, ownProps ) => {
		const { __experimentalGetPreviewDeviceType = null } = select(
			'core/edit-post'
		);

		const deviceType = __experimentalGetPreviewDeviceType
			? __experimentalGetPreviewDeviceType()
			: null;

		const parseTocSlug = ( slug ) => {
			// If not have the element then return false!
			if ( ! slug ) {
				return slug;
			}

			const parsedSlug = slug
				.toString()
				.toLowerCase()
				.replace( /\…+/g, '' ) // Remove multiple …
				.replace( /&(amp;)/g, '' ) // Remove &
				.replace( /&(mdash;)/g, '' ) // Remove long dash
				.replace( /\u2013|\u2014/g, '' ) // Remove long dash
				.replace( /[&]nbsp[;]/gi, '-' ) // Replace inseccable spaces
				.replace( /\s+/g, '-' ) // Replace spaces with -
				.replace( /[&\/\\#,^!+()$~%.\[\]'":*?<>{}@‘’”“|]/g, '' ) // Remove special chars
				.replace( /\-\-+/g, '-' ) // Replace multiple - with single -
				.replace( /^-+/, '' ) // Trim - from start of text
				.replace( /-+$/, '' ); // Trim - from end of text

			return decodeURI( encodeURIComponent( parsedSlug ) );
		};

		let level = 0;

		const headerArray = $( 'div.is-root-container' ).find(
			'h1, h2, h3, h4, h5, h6'
		);
		const headers = [];
		if ( headerArray != 'undefined' ) {
			headerArray.each( function ( index, value ) {
				const header = $( this );
				let excludeHeading;

				if ( value.className.includes( 'uagb-toc-hide-heading' ) ) {
					excludeHeading = true;
				} else if (
					0 < header.parents( '.uagb-toc-hide-heading' ).length
				) {
					excludeHeading = true;
				} else {
					excludeHeading = false;
				}

				const headerText = parseTocSlug( header.text() );
				const openLevel = header[ 0 ].nodeName.replace( /^H+/, '' );
				const titleText = header.text();

				level = parseInt( openLevel );

				if ( ! excludeHeading ) {
					headers.push( {
						tag: level,
						text: titleText,
						link: headerText,
						content: header.text(),
					} );
				}
			} );
		}

		if ( headers !== undefined ) {
			headers.forEach( function ( heading, index ) {
				heading.level = 0;

				for ( let i = index - 1; i >= 0; i-- ) {
					const currentOrderedItem = headers[ i ];

					if ( currentOrderedItem.tag <= heading.tag ) {
						heading.level = currentOrderedItem.level;

						if ( currentOrderedItem.tag < heading.tag ) {
							heading.level++;
						}
						break;
					}
				}
			} );
		}

		return {
			deviceType,
			headers,
		};
	} )
)( UAGBTableOfContentsEdit );
