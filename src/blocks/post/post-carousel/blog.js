import classnames from 'classnames';
import UAGB_Block_Icons from '@Controls/block-icons';
import {
	InnerBlockLayoutContextProvider,
	renderPostLayout,
} from '.././function';

import React, { lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';

const Slider = lazy( () =>
	import(
		/* webpackChunkName: "chunks/post-carousel/react-slick" */ 'react-slick'
	)
);

function Blog( props ) {
	const { attributes, className, latestPosts, block_id, deviceType } = props;

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
		layoutConfig,
	} = attributes;

	// Removing posts from display should be instant.
	const displayPosts =
		latestPosts.length > postsToShow
			? latestPosts.slice( 0, postsToShow )
			: latestPosts;

	function NextArrow() {
		return (
			<button
				type="button"
				data-role="none"
				className="slick-next slick-arrow"
				aria-label="Next"
				tabIndex="0"
				role="button"
				style={ {
					borderColor: arrowColor,
					borderRadius: arrowBorderRadius,
					borderWidth: arrowBorderSize,
				} }
			>
				{ UAGB_Block_Icons.carousel_right }
			</button>
		);
	}

	function PrevArrow() {
		return (
			<button
				type="button"
				data-role="none"
				className="slick-prev slick-arrow"
				aria-label="Previous"
				tabIndex="0"
				role="button"
				style={ {
					borderColor: arrowColor,
					borderRadius: arrowBorderRadius,
					borderWidth: arrowBorderSize,
				} }
			>
				{ UAGB_Block_Icons.carousel_left }
			</button>
		);
	}

	const dots =
		'dots' == arrowDots || 'arrows_dots' == arrowDots ? true : false;
	const arrows =
		'arrows' == arrowDots || 'arrows_dots' == arrowDots ? true : false;

	const equalHeightClass = equalHeight
		? 'uagb-post__carousel_equal-height'
		: '';

	const settings = {
		slidesToShow: columns,
		slidesToScroll: 1,
		autoplaySpeed: 2000,
		autoplay,
		infinite: infiniteLoop,
		pauseOnHover,
		speed: transitionSpeed,
		arrows,
		dots,
		rtl: false,
		afterChange: () => {
			if ( equalHeight ) {
				uagb_carousel_height( block_id );
			}
		},
		nextArrow: <NextArrow arrowSize={ arrowSize } />,
		prevArrow: <PrevArrow arrowSize={ arrowSize } />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: tcolumns,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: mcolumns,
					slidesToScroll: 1,
				},
			},
		],
	};

	const all_posts = displayPosts.map( ( post, i ) => (
		<article key={ i }>
			<div className="uagb-post__inner-wrap">
				{ renderPostLayout(
					'uagb/post-carousel',
					post,
					layoutConfig,
					props.attributes,
					props.categoriesList
				) }
			</div>
		</article>
	) );

	if ( columns >= displayPosts.length ) {
		return (
			<div
				className={ classnames(
					className,
					'uagb-post-grid',
					'uagb-post__arrow-outside',
					`uagb-post__image-position-${ imgPosition }`,
					`${ equalHeightClass }`,
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ block_id }`
				) }
				data-blog-id={ block_id }
			>
				<div
					className={ classnames(
						'is-carousel',
						`uagb-post__columns-${ columns }`,
						`uagb-post__columns-tablet-${ tcolumns }`,
						`uagb-post__columns-mobile-${ mcolumns }`,
						'uagb-post__items'
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
		);
	}

	return (
		<div
			className={ classnames(
				className,
				'uagb-post-grid',
				'uagb-post__arrow-outside',
				'uagb-slick-carousel',
				`uagb-post__image-position-${ imgPosition }`,
				`${ equalHeightClass }`,
				`uagb-block-${ block_id }`
			) }
			data-blog-id={ block_id }
			style={ 'dots' == arrowDots ? { padding: '0 0 35px 0' } : {} }
		>
			<Suspense fallback={ lazyLoader() }>
				<Slider
					className={ classnames(
						'is-carousel',
						`uagb-post__columns-${ columns }`,
						'uagb-post__items'
					) }
					{ ...settings }
				>
					{ all_posts }
				</Slider>
			</Suspense>
		</div>
	);
}

export default React.memo( Blog );
