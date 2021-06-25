/**
 * BLOCK: Content Timeline.
 */
import contentTimelineStyle from './styling';
import React, { useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import { dispatch, select, withSelect } from '@wordpress/data';

const Settings = lazy( () =>
	import(
		/* webpackChunkName: "chunks/content-timeline/settings" */ './settings'
	)
);
const Render = lazy( () =>
	import(
		/* webpackChunkName: "chunks/content-timeline/render" */ './render'
	)
);

const $ = jQuery;

const ContentTimelineComponent = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.
		//Store client id.
		props.setAttributes( { block_id: props.clientId } );
		props.setAttributes( { classMigrate: true } );
		props.setAttributes( { childMigrate: true } );

		const id = props.clientId;
		window.addEventListener( 'load', timelineContentConnector( id ) );
		window.addEventListener( 'resize', timelineContentConnector( id ) );
		const time = this;
		$( '.edit-post-layout__content' ).on( 'scroll', function () {
			time.timelineContentConnector( id );
		} );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-content-timeline-style-' + props.clientId
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.
		if (
			null ==
			select( 'core/block-editor' ).getBlocksByClientId(
				props.clientId
			)[ 0 ]
		) {
			return;
		}
		select( 'core/block-editor' )
			.getBlocksByClientId( props.clientId )[ 0 ]
			.innerBlocks.forEach( function ( block, key ) {
				let alignClass = '';
				if ( 'left' == block.attributes.timelinAlignment ) {
					alignClass = 'uagb-timeline__widget uagb-timeline__left';
				} else if ( 'right' == block.attributes.timelinAlignment ) {
					alignClass = 'uagb-timeline__widget uagb-timeline__right';
				} else if ( 'center' == block.attributes.timelinAlignment ) {
					if ( key % 2 == '0' ) {
						alignClass =
							'uagb-timeline__widget uagb-timeline__right';
					} else {
						alignClass =
							'uagb-timeline__widget uagb-timeline__left';
					}
				}

				let dayAlignClass = '';
				if ( 'left' == block.attributes.timelinAlignment ) {
					dayAlignClass =
						'uagb-timeline__day-new uagb-timeline__day-left';
				} else if ( 'right' == block.attributes.timelinAlignment ) {
					dayAlignClass =
						'uagb-timeline__day-new uagb-timeline__day-right';
				} else if ( 'center' == block.attributes.timelinAlignment ) {
					if ( key % 2 == '0' ) {
						dayAlignClass =
							'uagb-timeline__day-new uagb-timeline__day-right';
					} else {
						dayAlignClass =
							'uagb-timeline__day-new uagb-timeline__day-left';
					}
				}

				dispatch( 'core/block-editor' ).updateBlockAttributes(
					block.clientId,
					{
						content_class: alignClass,
					}
				);
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					block.clientId,
					{
						dayalign_class: dayAlignClass,
					}
				);
			} );
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);
		getChildBlocks.forEach( ( ctChild ) => {
			ctChild.attributes.headingTag = props.attributes.headingTag;
		} );

		const id = props.clientId;
		window.addEventListener( 'load', timelineContentConnector( id ) );
		window.addEventListener( 'resize', timelineContentConnector( id ) );
		const time = this;
		$( '.edit-post-layout__content' ).on( 'scroll', function () {
			time.timelineContentConnector( id );
		} );
	}, [ props ] );

	/*  Js for timeline line and inner line filler*/
	const timelineContentConnector = ( id ) => {
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
			let lastItem, parent_top;
			const $document = $( document );

			if ( tmItem.hasClass( 'uagb-timeline__arrow-center' ) ) {
				lineOuter.css( 'bottom', timelineEndIcon.top );

				parent_top = lastItemTop - timelineStartIcon.top;
				lastItem = parent_top + timelineEndIcon.top;
			} else if ( tmItem.hasClass( 'uagb-timeline__arrow-top' ) ) {
				const topHeight = timelineCardHeight - timelineEndIcon.top;
				lineOuter.css( 'bottom', topHeight );

				lastItem = lastItemTop;
			} else if ( tmItem.hasClass( 'uagb-timeline__arrow-bottom' ) ) {
				const bottom_height = timelineCardHeight - timelineEndIcon.top;
				lineOuter.css( 'bottom', bottom_height );

				parent_top = lastItemTop - timelineStartIcon.top;
				lastItem = parent_top + timelineEndIcon.top;
			}

			let num = 0;
			const elementEnd = lastItem + 20;

			const connectorHeight =
				3 * timeline.find( '.uagb-timeline__marker:first' ).height();
			const viewportHeight =
				document.documentElement.clientHeight + connectorHeight;
			const viewportHeightHalf = viewportHeight / 2 + connectorHeight;

			const elementPos = tmItem.offset().top;

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
					++num;
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
		}
	};

	const element = document.getElementById(
		'uagb-content-timeline-style-' + props.clientId
	);

	if ( element ) {
		element.innerHTML = contentTimelineStyle( props );
	}

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

export default withSelect( () => {
	const { __experimentalGetPreviewDeviceType = null } = select(
		'core/edit-post'
	);
	const deviceType = __experimentalGetPreviewDeviceType
		? __experimentalGetPreviewDeviceType()
		: null;

	return {
		deviceType,
	};
} )( ContentTimelineComponent );
