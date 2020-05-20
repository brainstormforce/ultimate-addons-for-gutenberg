const { decodeEntities } = wp.htmlEntities

import classnames from "classnames"
import FeaturedImage from ".././components/FeaturedImage"
import Title from ".././components/Title"
import Meta from ".././components/Meta"
import Excerpt from ".././components/Excerpt"
import Button from ".././components/Button"

class Blog extends React.Component {

	render() {

		const { attributes, className, latestPosts, block_id, categoriesList } = this.props

		const {
			columns,
			tcolumns,
			mcolumns,
			imgPosition,
			postsToShow,
			equalHeight,
			paginationMarkup,
			postPagination
		} = attributes

		const equalHeightClass = equalHeight ? "uagb-post__equal-height" : ""

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts

		return (

			<div
				className={ classnames(
					className,
					"uagb-post-grid",
					`uagb-post__image-position-${ imgPosition }`,
					`uagb-block-${ block_id }`
				) }
			>
				<div
					className={ classnames(
						"is-grid",
						`uagb-post__columns-${ columns }`,
						`uagb-post__columns-tablet-${ tcolumns }`,
						`uagb-post__columns-mobile-${ mcolumns }`,
						"uagb-post__items",
						`${ equalHeightClass }`
					) }
				>
					{ displayPosts.map( ( post, i ) =>
						<article key={ i } >
							<div className="uagb-post__inner-wrap" >
								<FeaturedImage post={post} attributes={attributes} />

								<div className="uagb-post__text">
									<Title post={post} attributes={attributes} />
									<Meta post={post} attributes={attributes} categoriesList={categoriesList} />
									<Excerpt post={post} attributes={attributes} />
									<Button post={post} attributes={attributes} />
								</div>
							</div>
						</article>
					) }
				</div>
				{ postPagination == true && 'empty' !== paginationMarkup &&
					<div dangerouslySetInnerHTML={ { __html: paginationMarkup } } className="uagb-post-pagination-wrap">
					</div>
				}
			</div>
		)
	}
}

export default Blog
