import classnames from 'classnames';
import PositionClasses from './classes';
import UAGB_Block_Icons from '@Controls/block-icons';
import React, { lazy, Suspense, useLayoutEffect } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TestimonialImage from './components/Image';
import AuthorName from './components/AuthorName';
import Company from './components/Company';
import Description from './components/Description';
import styles from './editor.lazy.scss';

const Slider = lazy( () =>
	import(
		/* webpackChunkName: "chunks/testimonial/react-slick" */ 'react-slick'
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

	props = props.parentProps;
	const { className, setAttributes, attributes, deviceType } = props;

	// Setup the attributes.
	const {
		test_block,
		imagePosition,
		columns,
		tcolumns,
		mcolumns,
		pauseOnHover,
		infiniteLoop,
		transitionSpeed,
		arrowDots,
		arrowSize,
		arrowBorderSize,
		arrowBorderRadius,
		autoplay,
		autoplaySpeed,
		arrowColor,
	} = attributes;

	const NextArrow = () => {
		return (
			<button
				type="button"
				data-role="none"
				className="slick-next slick-arrow"
				aria-label="Next"
				tabIndex="0"
				style={ {
					borderColor: arrowColor,
					borderRadius: arrowBorderRadius,
					borderWidth: arrowBorderSize,
				} }
			>
				{ UAGB_Block_Icons.carousel_right }
			</button>
		);
	};

	const PrevArrow = () => {
		return (
			<button
				type="button"
				data-role="none"
				className="slick-prev slick-arrow"
				aria-label="Previous"
				tabIndex="0"
				style={ {
					borderColor: arrowColor,
					borderRadius: arrowBorderRadius,
					borderWidth: arrowBorderSize,
				} }
			>
				{ UAGB_Block_Icons.carousel_left }
			</button>
		);
	};

	const dots =
		'dots' == arrowDots || 'arrows_dots' == arrowDots ? true : false;
	const arrows =
		'arrows' == arrowDots || 'arrows_dots' == arrowDots ? true : false;

	const settings = {
		slidesToShow: columns,
		slidesToScroll: 1,
		autoplaySpeed,
		autoplay,
		infinite: infiniteLoop,
		pauseOnHover,
		speed: transitionSpeed,
		arrows,
		dots,
		rtl: false,
		draggable: false,
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

	return (
		<div
			className={ classnames(
				className,
				'uagb-slick-carousel uagb-tm__arrow-outside',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<Suspense fallback={ lazyLoader() }>
				<Slider
					className={ classnames(
						'is-carousel',
						`uagb-tm__columns-${ columns }`,
						'uagb-tm__items'
					) }
					{ ...settings }
				>
					{ test_block.map( ( test, index ) => (
						<div
							className={ classnames(
								'uagb-testimonial__wrap',
								...PositionClasses( attributes )
							) }
							key={ 'wrap-' + index }
						>
							<div
								className="uagb-tm__content"
								key={ 'tm_content-' + index }
							>
								<div className="uagb-tm__overlay"></div>
								{ ( imagePosition == 'top' ||
									imagePosition == 'left' ) && (
									<TestimonialImage
										attributes={ attributes }
										index_value={ index }
									/>
								) }

								<div className="uagb-tm__text-wrap">
									{
										// Get description.
										<>
											<Description
												attributes={ attributes }
												setAttributes={ setAttributes }
												props={ props }
												index_value={ index }
											/>
										</>
									}
									<div className="uagb-tm__meta-inner">
										{ imagePosition == 'bottom' && (
											<TestimonialImage
												attributes={ attributes }
												index_value={ index }
											/>
										) }

										{
											<>
												<div
													className="uagb-testimonial-details"
													key={ 'tm_wraps-' + index }
												>
													<AuthorName
														attributes={
															attributes
														}
														setAttributes={
															setAttributes
														}
														props={ props }
														index_value={ index }
													/>
													<Company
														attributes={
															attributes
														}
														setAttributes={
															setAttributes
														}
														props={ props }
														index_value={ index }
													/>
												</div>
											</>
										}
									</div>
								</div>
								{ imagePosition == 'right' && (
									<TestimonialImage
										attributes={ attributes }
										index_value={ index }
									/>
								) }
							</div>
						</div>
					) ) }
				</Slider>
			</Suspense>
		</div>
	);
};
export default React.memo( Render );
