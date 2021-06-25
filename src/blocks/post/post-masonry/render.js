import {
	DEFAULT_POST_LIST_LAYOUT,
	getBlockMap,
	getPostLayoutConfig,
	InnerBlockLayoutContextProvider,
} from '../function';

import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Placeholder, Button, Disabled, Tip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React, { lazy, Suspense, useLayoutEffect } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import styles from '.././editor.lazy.scss';

const Blog = lazy( () =>
	import(
		/* webpackChunkName: "chunks/post-masonry/react-masonry-component" */ './blog'
	)
);

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { state, setState, togglePreview } = props;

	props = props.parentProps;

	const { categoriesList, latestPosts, attributes, deviceType } = props;

	const renderEditMode = () => {
		const onDone = () => {
			const { block, setAttributes } = props;
			setAttributes( {
				layoutConfig: getPostLayoutConfig( block ),
			} );
			setState( { innerBlocks: block } );
			togglePreview();
		};

		const onCancel = () => {
			const { replaceInnerBlocks } = props;
			const { innerBlocks } = state;
			replaceInnerBlocks( props.clientId, innerBlocks );
			togglePreview();
		};

		const onReset = () => {
			const { block, replaceInnerBlocks } = props;
			const newBlocks = [];
			DEFAULT_POST_LIST_LAYOUT.map( ( [ name, attribute ] ) => {
				newBlocks.push( createBlock( name, attribute ) );
				return true;
			} );
			replaceInnerBlocks( props.clientId, newBlocks );
			setState( { innerBlocks: block } );
		};

		const InnerBlockProps = {
			template: props.attributes.layoutConfig,
			templateLock: false,
			allowedBlocks: Object.keys( getBlockMap( 'uagb/post-masonry' ) ),
		};
		if ( props.attributes.layoutConfig.length !== 0 ) {
			InnerBlockProps.renderAppender = false;
		}
		return (
			<Placeholder label="Post Masonry Layout">
				<div className="uagb-block-all-post-grid-item-template">
					<Tip>
						{ __(
							'Edit the blocks inside the preview below to change the content displayed for each post within the post grid.'
						) }
					</Tip>
					<InnerBlockLayoutContextProvider
						parentName="uagb/post-masonry"
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

	const renderViewMode = (
		<Disabled>
			<Suspense fallback={ lazyLoader() }>
				<Blog
					attributes={ attributes }
					className={ props.className }
					latestPosts={ latestPosts }
					block_id={ props.clientId.substr( 0, 8 ) }
					categoriesList={ categoriesList }
					deviceType={ deviceType }
				/>
			</Suspense>
		</Disabled>
	);

	return <>{ state.isEditing ? renderEditMode() : renderViewMode }</>;
};

export default React.memo( Render );
