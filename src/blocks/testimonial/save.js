/**
 * BLOCK: Testimonial - Save Block
 */

import classnames from 'classnames';
import AuthorName from './components/AuthorName';
import Company from './components/Company';
import Description from './components/Description';
import PositionClasses from './classes';
import TestimonialImage from './components/Image';

export default function save( props ) {
	const {
		block_id,
		className,
		columns,
		test_block,
		imagePosition,
	} = props.attributes;

	return (
		<div
			className={ classnames(
				className,
				'uagb-slick-carousel uagb-tm__arrow-outside',
				`uagb-block-${ block_id }`
			) }
		>
			<div
				className={ classnames(
					'is-carousel',
					`uagb-tm__columns-${ columns }`,
					'uagb-tm__items'
				) }
			>
				{ test_block.map( ( test, index ) => (
					<div
						className={ classnames(
							'uagb-testimonial__wrap',
							...PositionClasses( props.attributes )
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
									attributes={ props.attributes }
									index_value={ index }
								/>
							) }

							<div className="uagb-tm__text-wrap">
								{
									// Get description.
									<>
										<Description
											attributes={ props.attributes }
											setAttributes="not_set"
											props={ props }
											index_value={ index }
										/>
									</>
								}
								<div className="uagb-tm__meta-inner">
									{ imagePosition == 'bottom' && (
										<TestimonialImage
											attributes={ props.attributes }
											index_value={ index }
										/>
									) }

									{
										//title_text
										<>
											<div
												className="uagb-testimonial-details"
												key={ 'tm_wraps-' + index }
											>
												<AuthorName
													attributes={
														props.attributes
													}
													setAttributes="not_set"
													props={ props }
													index_value={ index }
												/>
												<Company
													attributes={
														props.attributes
													}
													setAttributes="not_set"
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
									attributes={ props.attributes }
									index_value={ index }
								/>
							) }
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
