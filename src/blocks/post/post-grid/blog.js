import classnames from 'classnames';
import {
	InnerBlockLayoutContextProvider,
	renderPostLayout,
} from '.././function';

import React from 'react';
const Blog = ( props ) => {
	const { attributes, className, latestPosts, block_id, deviceType } = props;

	const {
		columns,
		tcolumns,
		mcolumns,
		imgPosition,
		postsToShow,
		equalHeight,
		paginationMarkup,
		postPagination,
		layoutConfig,
	} = attributes;

	const equalHeightClass = equalHeight ? 'uagb-post__equal-height' : '';
	// Removing posts from display should be instant.
	const displayPosts =
		latestPosts.length > postsToShow
			? latestPosts.slice( 0, postsToShow )
			: latestPosts;

	return (
		<div
			className={ classnames(
				className,
				'uagb-post-grid',
				`uagb-post__image-position-${ imgPosition }`,
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ block_id }`
			) }
		>
			<div
				className={ classnames(
					'is-grid',
					`uagb-post__columns-${ columns }`,
					`uagb-post__columns-tablet-${ tcolumns }`,
					`uagb-post__columns-mobile-${ mcolumns }`,
					'uagb-post__items',
					`${ equalHeightClass }`
				) }
			>
				<InnerBlockLayoutContextProvider
					parentName="uagb/post-grid"
					parentClassName="uagb-block-grid"
				>
					{ displayPosts.map( ( post = {}, i ) => (
						<article key={ i }>
							<div className="uagb-post__inner-wrap">
								{ renderPostLayout(
									'uagb/post-grid',
									post,
									layoutConfig,
									props.attributes,
									props.categoriesList
								) }
							</div>
						</article>
					) ) }
				</InnerBlockLayoutContextProvider>
			</div>
			{ postPagination == true && 'empty' !== paginationMarkup && (
				<div
					dangerouslySetInnerHTML={ { __html: paginationMarkup } }
					className="uagb-post-pagination-wrap"
				></div>
			) }
		</div>
	);
};
export default React.memo( Blog );
