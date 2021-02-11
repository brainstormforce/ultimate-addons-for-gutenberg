import classnames from "classnames"
import Slider from "react-slick"
import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons"
import {
	InnerBlockLayoutContextProvider,
	renderPostLayout 
} from '.././function';
class Blog extends React.Component {

	render() {

		const { attributes, className, latestPosts, block_id, categoriesList } = this.props

		const {
			columns,
			tcolumns,
			mcolumns,
			imgPosition,
			postsToShow,
			autoplay,
			pauseOnHover,
			transitionSpeed,
			infiniteLoop,
			arrowSize,
			arrowBorderSize,
			arrowBorderRadius,
			arrowColor,
			arrowDots,
			equalHeight,
			animationfield,
			layoutConfig
		} = attributes

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts

		function NextArrow( props ) {

			return (
				<button type="button" data-role="none" className="slick-next slick-arrow" aria-label="Next" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
					{ UAGB_Block_Icons.carousel_right }
				</button>
			)
		}

		function PrevArrow( props ) {

			return (
				<button type="button" data-role="none" className="slick-prev slick-arrow" aria-label="Previous" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
					{ UAGB_Block_Icons.carousel_left }
				</button>
			)
		}

		let dots = ( "dots" == arrowDots || "arrows_dots" == arrowDots ) ? true : false
		let arrows = ( "arrows" == arrowDots || "arrows_dots" == arrowDots ) ? true : false

		const equalHeightClass = equalHeight ? "uagb-post__carousel_equal-height" : ""

		var current = this
		const settings = {
			slidesToShow : columns,
			slidesToScroll : 1,
			autoplaySpeed : 2000,
			autoplay : autoplay,
			infinite : infiniteLoop,
			pauseOnHover : pauseOnHover,
			speed : transitionSpeed,
			arrows : arrows,
			dots : dots,
			rtl : false,
			afterChange: current  => {
				if( equalHeight ){
					uagb_carousel_height(block_id)
				}
		    },
			nextArrow: <NextArrow arrowSize={arrowSize}/>,
			prevArrow: <PrevArrow arrowSize={arrowSize}/>,
			responsive : [
				{
					breakpoint : 1024,
					settings : {
						slidesToShow : tcolumns,
						slidesToScroll : 1,
					}
				},
				{
					breakpoint : 767,
					settings : {
						slidesToShow : mcolumns,
						slidesToScroll : 1,
					}
				}
			]
		}

		const all_posts = displayPosts.map( ( post, i ) =>
				<article key={ i } >
					<div className="uagb-post__inner-wrap" >
							{ renderPostLayout(
								"uagb/post-carousel",
								post,
								layoutConfig,
								this.props.attributes,
								this.props.categoriesList
							) }
					</div>
				</article>
		)

		if ( columns >= displayPosts.length ) {
			return (
				<div
					className={ classnames(
						className,
						"uagb-post-grid",
						"uagb-post__arrow-outside",
						`uagb-post__image-position-${ imgPosition }`,
						`${ equalHeightClass }`,
						`uagb-block-${ block_id }`
					) }
					data-blog-id={block_id}
				>
					<div
						className={ classnames(
							"is-carousel",
							`uagb-post__columns-${ columns }`,
							`uagb-post__columns-tablet-${ tcolumns }`,
							`uagb-post__columns-mobile-${ mcolumns }`,
							"uagb-post__items",
						) }
					>
						<InnerBlockLayoutContextProvider
						parentName="uagb/post-carousel"
						parentClassName="uagb-block-grid"
						>
							{ all_posts }
						</InnerBlockLayoutContextProvider>
					</div>
				</div>
			)
		} else {

			let style_str = ""

			if ( "dots" == arrowDots ) { style_str = {padding:"0 0 35px 0"} }

			return (

				<div
					className={ classnames(
						className,
						"uagb-post-grid",
						"uagb-post__arrow-outside",
						"uagb-slick-carousel",
						`uagb-post__image-position-${ imgPosition }`,
						`${ equalHeightClass }`,
						`uagb-block-${ block_id }`
					) }
					data-blog-id={block_id}
					style={ ( "dots" == arrowDots ) ? { padding: "0 0 35px 0" } : {} }
				>
					<Slider
						className={ classnames(
							"is-carousel",
							`uagb-post__columns-${ columns }`,
							"uagb-post__items"
						) }
						{...settings}
					>
						{ all_posts }
					</Slider>
				</div>
			)
		}

	}
}

export default Blog
