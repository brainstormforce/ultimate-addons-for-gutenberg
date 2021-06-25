/**
 * BLOCK: Post Grid - Editor Render.
 */
import React, { lazy, Suspense, useLayoutEffect } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Blog = lazy( () =>
	import( /* webpackChunkName: "chunks/post-grid/blog" */ './blog' )
);

import {
	InnerBlockLayoutContextProvider,
	DEFAULT_POST_LIST_LAYOUT,
	getPostLayoutConfig,
	getBlockMap,
} from '.././function';

import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

import { Placeholder, Button, Tip, Disabled } from '@wordpress/components';

import { InnerBlocks } from '@wordpress/block-editor';
import styles from '.././editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { isEditing } = props.state;

	// Caching all Props.
	const {
		attributes,
		latestPosts,
		categoriesList,
		deviceType,
	} = props.parentProps;

	const renderEditMode = () => {
		const onDone = () => {
			const { block, setAttributes } = props.parentProps;
			setAttributes( {
				layoutConfig: getPostLayoutConfig( block ),
			} );
			props.setStateValue( { innerBlocks: block } );
			props.togglePreview();
		};

		const onCancel = () => {
			const { replaceInnerBlocks } = props.parentProps;
			const { innerBlocks } = props.state;
			replaceInnerBlocks( props.parentProps.clientId, innerBlocks );
			props.togglePreview();
		};

		const onReset = () => {
			const { block, replaceInnerBlocks } = props.parentProps;
			const newBlocks = [];
			DEFAULT_POST_LIST_LAYOUT.map( ( [ name, attribute ] ) => {
				newBlocks.push( createBlock( name, attribute ) );
				return true;
			} );
			replaceInnerBlocks( props.parentProps.clientId, newBlocks );
			props.setStateValue( { innerBlocks: block } );
		};

		const InnerBlockProps = {
			template: props.parentProps.attributes.layoutConfig,
			templateLock: false,
			allowedBlocks: Object.keys( getBlockMap( 'uagb/post-grid' ) ),
		};

		if ( props.parentProps.attributes.layoutConfig.length !== 0 ) {
			InnerBlockProps.renderAppender = false;
		}
		return (
			<Placeholder label="Post Grid Layout">
				<div className="uagb-block-all-post-grid-item-template">
					<Tip>
						{ __(
							'Edit the blocks inside the preview below to change the content displayed for each post within the post grid.'
						) }
					</Tip>
					<InnerBlockLayoutContextProvider
						parentName="uagb/post-grid"
						parentClassName="uagb-block-grid"
					>
						<article>
							<div className="uagb-post__inner-wrap uagb-post__edit-mode">
								<div className="uagb-post__text">
									<InnerBlocks { ...InnerBlockProps } />
								</div>
							</div>
						</article>
					</InnerBlockLayoutContextProvider>
					<div className="uagb-block-all-post__actions">
						<Button
							className="uagb-block-all-post__done-button"
							isPrimary
							onClick={ onDone }
						>
							{ __( 'Done' ) }
						</Button>
						<Button
							className="uagb-block-all-post__cancel-button"
							isTertiary
							onClick={ onCancel }
						>
							{ __( 'Cancel' ) }
						</Button>
						<Button
							className="uagb-block-all-post__reset-button"
							onClick={ onReset }
						>
							{ __( 'Reset Layout' ) }
						</Button>
					</div>
				</div>
			</Placeholder>
		);
	};

	if ( isEditing ) {
		return <>{ renderEditMode() }</>;
	}

	const renderViewMode = () => {
		return (
			<Disabled>
				<Suspense fallback={ lazyLoader() }>
					<Blog
						attributes={ attributes }
						className={ props.parentProps.className }
						latestPosts={ latestPosts }
						block_id={ props.parentProps.clientId.substr( 0, 8 ) }
						categoriesList={ categoriesList }
						deviceType={ deviceType }
					/>
				</Suspense>
			</Disabled>
		);
	};

	return <>{ renderViewMode() }</>;
};

export default React.memo( Render );
