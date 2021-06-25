/**
 * External dependencies
 */
import React, { useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
$ = jQuery;
const Settings = lazy( () =>
	import(
		/* webpackChunkName: "chunks/post-timeline/settings" */ './settings'
	)
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/post-timeline/render" */ './render' )
);

import { withSelect } from '@wordpress/data';

const PostTimelineComponent = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.
		//Store lient id.
		props.setAttributes( { block_id: props.clientId } );

		const id = props.clientId;
		window.addEventListener( 'load', timelineContentBack( id ) );
		window.addEventListener( 'resize', timelineContentBack( id ) );

		$( '.edit-post-layout__content' ).scroll( function () {
			timelineContentBack( id );
		} );

		// Pushing Style tag for this block css.
		const style = document.createElement( 'style' );
		style.setAttribute( 'id', 'uagb-timeline-style-' + props.clientId );
		document.head.appendChild( style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		const id = props.clientId;
		window.addEventListener( 'load', timelineContentBack( id ) );
		window.addEventListener( 'resize', timelineContentBack( id ) );

		$( '.edit-post-layout__content' ).scroll( function () {
			timelineContentBack( id );
		} );
	}, [ props ] );

	/*  Js for timeline line and inner line filler*/
	const timelineContentBack = ( id ) => {
		const timeline = $( '.uagb-timeline' ).parents( '#block-' + id );
		const tmItem = timeline.find( '.uagb-timeline' );
		const lineInner = timeline.find( '.uagb-timeline__line__inner' );
		const lineOuter = timeline.find( '.uagb-timeline__line' );
		const iconClass = timeline.find( '.uagb-timeline__marker' );
		if ( iconClass.length > 0 ) {
			const cardLast = timeline.find(
				'.uagb-timeline__field:last-child'
			);
			const timelineStartIcon = iconClass.first().position();
			const timelineEndIcon = iconClass.last().position();
			lineOuter.css( 'top', timelineStartIcon.top );

			const timelineCardHeight = cardLast.height();
			const lastItemTop = cardLast.offset().top - tmItem.offset().top;
			let lastItem, parentTop;
			const $document = $( document );

			if ( tmItem.hasClass( 'uagb-timeline__arrow-center' ) ) {
				lineOuter.css( 'bottom', timelineEndIcon.top );

				parentTop = lastItemTop - timelineStartIcon.top;
				lastItem = parentTop + timelineEndIcon.top;
			} else if ( tmItem.hasClass( 'uagb-timeline__arrow-top' ) ) {
				const topHeight = timelineCardHeight - timelineEndIcon.top;
				lineOuter.css( 'bottom', topHeight );

				lastItem = lastItemTop;
			} else if ( tmItem.hasClass( 'uagb-timeline__arrow-bottom' ) ) {
				const bottomHeight = timelineCardHeight - timelineEndIcon.top;
				lineOuter.css( 'bottom', bottomHeight );

				parentTop = lastItemTop - timelineStartIcon.top;
				lastItem = parentTop + timelineEndIcon.top;
			}

			const elementEnd = lastItem + 20;

			const connectorHeight =
				3 * timeline.find( '.uagb-timeline__marker:first' ).height();
			const viewportHeight =
				document.documentElement.clientHeight + connectorHeight;
			const viewportHeightHalf = viewportHeight / 2 + connectorHeight;

			let elementPos = tmItem.offset().top;

			const newElementPos = elementPos + timelineStartIcon.top;

			let photoViewportOffsetTop = newElementPos - $document.scrollTop();

			if ( photoViewportOffsetTop < 0 ) {
				photoViewportOffsetTop = Math.abs( photoViewportOffsetTop );
			} else {
				photoViewportOffsetTop = -Math.abs( photoViewportOffsetTop );
			}
			if ( elementPos < viewportHeightHalf ) {
				if (
					viewportHeightHalf + Math.abs( photoViewportOffsetTop ) <
					elementEnd
				) {
					lineInner.height(
						viewportHeightHalf + photoViewportOffsetTop
					);
				} else if (
					photoViewportOffsetTop + viewportHeightHalf >=
					elementEnd
				) {
					lineInner.height( elementEnd );
				}
			} else if (
				photoViewportOffsetTop + viewportHeightHalf <
				elementEnd
			) {
				if ( 0 > photoViewportOffsetTop ) {
					lineInner.height(
						viewportHeightHalf - Math.abs( photoViewportOffsetTop )
					);
				} else {
					lineInner.height(
						viewportHeightHalf + photoViewportOffsetTop
					);
				}
			} else if (
				photoViewportOffsetTop + viewportHeightHalf >=
				elementEnd
			) {
				lineInner.height( elementEnd );
			}

			//For changing icon background color and icon color.
			let timelineIconPos, timelineCardPos;
			let timelineIconTop, timelineCardTop, elementCardPos;
			const timelineIcon = timeline.find( '.uagb-timeline__marker' ),
				animateBorder = timeline.find( '.uagb-timeline__field-wrap' );

			for ( let i = 0; i < timelineIcon.length; i++ ) {
				timelineIconPos = $( timelineIcon[ i ] ).offset().top;
				timelineCardPos = $( animateBorder[ i ] ).offset().top;
				elementPos = timeline.offset().top;
				elementCardPos = timeline.offset().top;

				timelineIconTop = timelineIconPos - $document.scrollTop();
				timelineCardTop = timelineCardPos - $document.scrollTop();

				if ( timelineCardTop < viewportHeightHalf ) {
					animateBorder[ i ].classList.remove( 'out-view' );
					animateBorder[ i ].classList.add( 'in-view' );
				} else {
					// Remove classes if element is below than half of viewport.
					animateBorder[ i ].classList.add( 'out-view' );
					animateBorder[ i ].classList.remove( 'in-view' );
				}

				if ( timelineIconTop < viewportHeightHalf ) {
					// Add classes if element is above than half of viewport.
					timelineIcon[ i ].classList.remove(
						'uagb-timeline__out-view-icon'
					);
					timelineIcon[ i ].classList.add(
						'uagb-timeline__in-view-icon'
					);
				} else {
					// Remove classes if element is below than half of viewport.
					timelineIcon[ i ].classList.add(
						'uagb-timeline__out-view-icon'
					);
					timelineIcon[ i ].classList.remove(
						'uagb-timeline__in-view-icon'
					);
				}
			}
		}
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

export default withSelect( ( select, props ) => {
	const {
		categories,
		postsToShow,
		order,
		orderBy,
		postType,
		taxonomyType,
		excludeCurrentPost,
	} = props.attributes;
	const { getEntityRecords } = select( 'core' );

	const { __experimentalGetPreviewDeviceType = null } = select(
		'core/edit-post'
	);
	const deviceType = __experimentalGetPreviewDeviceType
		? __experimentalGetPreviewDeviceType()
		: null;

	const allTaxonomy = uagb_blocks_info.all_taxonomy;
	const currentTax = allTaxonomy[ postType ];

	let categoriesList = [];
	let restBase = '';

	if ( 'undefined' !== typeof currentTax ) {
		if ( 'undefined' !== typeof currentTax.taxonomy[ taxonomyType ] ) {
			restBase =
				currentTax.taxonomy[ taxonomyType ].restBase == false ||
				currentTax.taxonomy[ taxonomyType ].restBase == null
					? currentTax.taxonomy[ taxonomyType ].name
					: currentTax.taxonomy[ taxonomyType ].restBase;
		}

		if ( '' != taxonomyType ) {
			if (
				'undefined' !== typeof currentTax.terms &&
				'undefined' !== typeof currentTax.terms[ taxonomyType ]
			) {
				categoriesList = currentTax.terms[ taxonomyType ];
			}
		}
	}

	const latestPostsQuery = {
		order,
		orderby: orderBy,
		per_page: postsToShow,
	};

	if ( excludeCurrentPost ) {
		latestPostsQuery.exclude = select( 'core/editor' ).getCurrentPostId();
	}
	const category = [];
	const temp = parseInt( categories );
	category.push( temp );
	const catlenght = categoriesList.length;
	for ( let i = 0; i < catlenght; i++ ) {
		if ( categoriesList[ i ].id == temp ) {
			if ( categoriesList[ i ].child.length !== 0 ) {
				categoriesList[ i ].child.forEach( ( element ) => {
					category.push( element );
				} );
			}
		}
	}
	if ( undefined !== categories && '' !== categories ) {
		latestPostsQuery[ restBase ] =
			undefined === categories || '' === categories
				? categories
				: category;
	}
	return {
		deviceType,
		latestPosts: getEntityRecords( 'postType', postType, latestPostsQuery ),
		categoriesList,
		taxonomyList:
			'undefined' !== typeof currentTax ? currentTax.taxonomy : [],
	};
} )( PostTimelineComponent );
