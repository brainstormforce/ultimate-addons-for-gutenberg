import classnames from "classnames";
import Masonry from "react-masonry-component";
import {
	InnerBlockLayoutContextProvider,
	renderPostLayout 
} from ".././function";
class Blog extends React.Component {

	render() {

		const { attributes, className, latestPosts, block_id, categoriesList, deviceType } = this.props;

		const {
			columns,
			tcolumns,
			mcolumns,
			imgPosition,
			postsToShow,
			paginationEventType,
			buttonText,
			paginationType,
			layoutConfig
		} = attributes;

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		const paginationRender = () => {
			if ( "infinite" === paginationType ) {

				if ( "scroll" === paginationEventType ) { 
					return (
						
						<div className="uagb-post-inf-loader">
							<div className="uagb-post-loader-1"></div>
							<div className="uagb-post-loader-2"></div>
							<div className="uagb-post-loader-3"></div>
						</div>
					);
				}
				if ( "button" === paginationEventType ) { 
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
					"uagb-post-grid",
					"uagb-post__arrow-outside",
					`uagb-post__image-position-${ imgPosition }`,
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ block_id }`
				) }
				data-blog-id={ block_id }
			>
				<Masonry
					className={ classnames(
						"is-masonry",
						`uagb-post__columns-${ columns }`,
						`uagb-post__columns-tablet-${ tcolumns }`,
						`uagb-post__columns-mobile-${ mcolumns }`,
						"uagb-post__items"
					) }
				>
					<InnerBlockLayoutContextProvider
						parentName="uagb/post-masonry"
						parentClassName="uagb-block-grid">
						{ displayPosts.map( ( post, i ) =>
							<article key={ i }>
								<div className="uagb-post__inner-wrap">
									{ renderPostLayout(
										"uagb/post-masonry",
										post,
										layoutConfig,
										this.props.attributes,
										this.props.categoriesList
									) }
								</div>
							</article>
						) }
					</InnerBlockLayoutContextProvider>
				</Masonry>
				{ paginationRender() }
			</div>
		);
	}
}

export default Blog;
