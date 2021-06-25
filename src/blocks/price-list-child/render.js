import classnames from 'classnames';
import PositionClasses from '../price-list/classes';
import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import RestMenuImage from './components/RestMenuImage';
import Title from './components/Title';
import Price from './components/Price';
import Description from './components/Description';
import { select } from '@wordpress/data';

const Render = ( props ) => {
	props = props.parentProps;
	const { className, setAttributes, attributes } = props;

	// Setup the attributes.
	const { imagePosition } = attributes;

	const parentClientId = select(
		'core/block-editor'
	).getBlockHierarchyRootClientId( props.clientId );
	const parentAttributes = select( 'core/block-editor' ).getBlockAttributes(
		parentClientId
	);

	const position = parentAttributes
		? parentAttributes.imagePosition
		: imagePosition;

	return (
		<div
			className={ classnames(
				className,
				'uagb-rest_menu__outer-wrap',
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`,
				...PositionClasses( attributes )
			) }
		>
			<Suspense fallback={ lazyLoader() }>
				<div className="uagb-rm__content">
					{ ( position == 'top' || position == 'left' ) && (
						<RestMenuImage attributes={ attributes } />
					) }
					<div className="uagb-rm__text-wrap">
						{
							<>
								<div className="uagb-rm-details">
									<div className="uagb-rm__title-wrap">
										<Title
											attributes={ attributes }
											setAttributes={ setAttributes }
											props={ props }
										/>
										<div className="uagb-rest-menu-text-wrap">
											<Description
												attributes={ attributes }
												setAttributes={ setAttributes }
												props={ props }
											/>
										</div>
									</div>
									<div className="uagb-rm__price-wrap">
										<Price
											attributes={ attributes }
											setAttributes={ setAttributes }
											props={ props }
										/>
									</div>
								</div>
							</>
						}
					</div>
					{ position == 'right' && (
						<RestMenuImage attributes={ attributes } />
					) }
				</div>
			</Suspense>
			<div className="uagb-rm__separator-parent">
				<div className="uagb-rm__separator"></div>
			</div>
		</div>
	);
};
export default React.memo( Render );
