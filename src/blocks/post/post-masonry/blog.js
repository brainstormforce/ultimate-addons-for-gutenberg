import classnames from 'classnames';
import { lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Masonry = lazy( () =>
	import(
		/* webpackChunkName: "chunks/post-masonry/react-masonry-component" */ 'react-masonry-component'
	)
);

import {
	InnerBlockLayoutContextProvider,
	renderPostLayout,
} from '.././function';

function Blog( props ) {
	const { attributes, className, latestPosts, block_id, deviceType } = props;

	const {
		columns,
		tcolumns,
		mcolumns,
		imgPosition,
		postsToShow,
		paginationEventType,
		buttonText,
		paginationType,
		layoutConfig,
	} = attributes;

	// Removing posts from display should be instant.
	const displayPosts =
		latestPosts.length > postsToShow
			? latestPosts.slice( 0, postsToShow )
			: latestPosts;

	const paginationRender = () => {
		if ( 'infinite' === paginationType ) {
			if ( 'scroll' === paginationEventType ) {
				return (
					<div className="uagb-post-inf-loader">
						<div className="uagb-post-loader-1"></div>
						<div className="uagb-post-loader-2"></div>
						<div className="uagb-post-loader-3"></div>
					</div>
				);
			}
			if ( 'button' === paginationEventType ) {
				return (
					<div className="uagb-post__load-more-wrap">
						<span className="uagb-post-pagination-button">
							<a className="uagb-post__load-more">
								{ buttonText }
							</a>
						</span>
					</div>
				);
			}
		}
	};
	return (
		<div
			className={ classnames(
				className,
				'uagb-post-grid',
				'uagb-post__arrow-outside',
				`uagb-post__image-position-${ imgPosition }`,
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ block_id }`
			) }
			data-blog-id={ block_id }
		>
			<Suspense fallback={ lazyLoader() }>
				<Masonry
					className={ classnames(
						'is-masonry',
						`uagb-post__columns-${ columns }`,
						`uagb-post__columns-tablet-${ tcolumns }`,
						`uagb-post__columns-mobile-${ mcolumns }`,
						'uagb-post__items'
					) }
				>
					<InnerBlockLayoutContextProvider
						parentName="uagb/post-masonry"
						parentClassName="uagb-block-grid"
					>
						{ displayPosts.map( ( post, i ) => (
							<article key={ i }>
								<div
									key={ i }
									className="uagb-post__inner-wrap"
								>
									{ renderPostLayout(
										'uagb/post-masonry',
										post,
										layoutConfig,
										props.attributes,
										props.categoriesList
									) }
								</div>
							</article>
						) ) }
					</InnerBlockLayoutContextProvider>
				</Masonry>
			</Suspense>
			{ paginationRender() }
		</div>
	);
}

export default Blog;
