/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import attributes from './attributes';
import Title from './components/Title';
import Price from './components/Price';
import Description from './components/Description';
import PositionClasses from '../price-list/classes';
import RestMenuImage from './components/RestMenuImage';

import { Fragment } from '@wordpress/element';

const deprecated = [
	{
		attributes,
		save( props ) {
			const { block_id, className, imagePosition } = props.attributes;
			return (
				<Fragment>
					<div
						className={ classnames(
							'uagb-rest_menu__wrap',
							'uagb-rest_menu_repeater',
							...PositionClasses( props.attributes )
						) }
					>
						<div
							className={ classnames(
								className,
								'uagb-rest_menu__outer-wrap',
								`uagb-block-${ block_id }`
							) }
						>
							<div
								className={ classnames(
									...PositionClasses( props.attributes )
								) }
							>
								<div className="uagb-rm__content">
									{ ( imagePosition == 'top' ||
										imagePosition == 'left' ) && (
										<RestMenuImage
											attributes={ props.attributes }
										/>
									) }
									<div className="uagb-rm__text-wrap">
										{
											<Fragment>
												<div className="uagb-rm-details">
													<div className="uagb-rm__title-wrap">
														<Title
															attributes={
																props.attributes
															}
															setAttributes="not_set"
															props={ props }
														/>
														<div className="uagb-rest-menu-text-wrap">
															<Description
																attributes={
																	props.attributes
																}
																setAttributes="not_set"
																props={ props }
															/>
														</div>
													</div>
													<div className="uagb-rm__price-wrap">
														<Price
															attributes={
																props.attributes
															}
															setAttributes="not_set"
															props={ props }
														/>
													</div>
												</div>
											</Fragment>
										}
									</div>
									{ imagePosition == 'right' && (
										<RestMenuImage
											attributes={ props.attributes }
										/>
									) }
								</div>
								<div className="uagb-rm__separator-parent">
									<div className="uagb-rm__separator"></div>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			);
		},
	},
];
export default deprecated;
