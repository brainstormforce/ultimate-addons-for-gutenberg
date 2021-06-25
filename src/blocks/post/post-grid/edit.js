/**
 * BLOCK: Post Grid - Edit
 */
import styling from '.././styling';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import { __ } from '@wordpress/i18n';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/post-grid/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/post-grid/render" */ './render' )
);

import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { Placeholder, Spinner } from '@wordpress/components';

const PostGridComponent = ( props ) => {
	const initialState = {
		isEditing: false,
		innerBlocks: [],
	};

	const [ state, setStateValue ] = useState( initialState );

	useEffect( () => {
		// Replacement for componentDidMount.
		const { block } = props;
		setStateValue( { innerBlocks: block } );
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-post-grid-style-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.

		const element = document.getElementById(
			'uagb-post-grid-style-' + props.clientId.substr( 0, 8 )
		);
		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	const togglePreview = () => {
		setStateValue( { isEditing: ! state.isEditing } );
		if ( ! state.isEditing ) {
			__( 'Showing All Post Grid Layout.' );
		}
	};

	const { attributes, latestPosts } = props;

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

	// Caching all attributes.
	const { postDisplaytext } = attributes;

	if ( ! hasPosts ) {
		return (
			<>
				<Suspense fallback={ lazyLoader() }>
					<Settings
						parentProps={ props }
						state={ state }
						setStateValue={ setStateValue }
					/>
				</Suspense>

				<Placeholder
					icon="admin-post"
					label={ uagb_blocks_info.blocks[ 'uagb/post-grid' ].title }
				>
					{ ! Array.isArray( latestPosts ) ? (
						<Spinner />
					) : (
						postDisplaytext
					) }
				</Placeholder>
			</>
		);
	}

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings
				parentProps={ props }
				state={ state }
				setStateValue={ setStateValue }
				togglePreview={ togglePreview }
			/>
			<Render
				parentProps={ props }
				state={ state }
				setStateValue={ setStateValue }
				togglePreview={ togglePreview }
			/>
		</Suspense>
	);
};

export default compose(
	withSelect( ( select, props ) => {
		const {
			categories,
			postsToShow,
			order,
			orderBy,
			postType,
			taxonomyType,
			paginationMarkup,
			postPagination,
			excludeCurrentPost,
		} = props.attributes;
		const { setAttributes } = props;
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
		let rest_base = '';
		if ( true === postPagination && 'empty' === paginationMarkup ) {
			jQuery.ajax( {
				url: uagb_blocks_info.ajax_url,
				data: {
					action: 'uagb_post_pagination',
					attributes: props.attributes,
					nonce: uagb_blocks_info.uagb_ajax_nonce,
				},
				dataType: 'json',
				type: 'POST',
				success( data ) {
					setAttributes( { paginationMarkup: data.data } );
				},
			} );
		}
		if ( 'undefined' !== typeof currentTax ) {
			if ( 'undefined' !== typeof currentTax.taxonomy[ taxonomyType ] ) {
				rest_base =
					currentTax.taxonomy[ taxonomyType ].rest_base == false ||
					currentTax.taxonomy[ taxonomyType ].rest_base == null
						? currentTax.taxonomy[ taxonomyType ].name
						: currentTax.taxonomy[ taxonomyType ].rest_base;
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
			latestPostsQuery.exclude = select(
				'core/editor'
			).getCurrentPostId();
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
			latestPostsQuery[ rest_base ] =
				undefined === categories || '' === categories
					? categories
					: category;
		}
		const { getBlocks } = select( 'core/block-editor' );
		return {
			latestPosts: getEntityRecords(
				'postType',
				postType,
				latestPostsQuery
			),
			categoriesList,
			deviceType,
			taxonomyList:
				'undefined' !== typeof currentTax ? currentTax.taxonomy : [],
			block: getBlocks( props.clientId ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		return {
			replaceInnerBlocks,
		};
	} )
)( PostGridComponent );
