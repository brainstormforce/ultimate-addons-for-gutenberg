import classnames from 'classnames';
import React, { Suspense, useLayoutEffect } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import CtaPositionClasses from './classes';
import Title from './components/Title';
import Description from './components/Description';
import CTA from './components/CTA';
import styles from './editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;
	const { className, setAttributes, attributes } = props;

	// Setup the attributes.
	const { block_id, ctaPosition, ctaType } = attributes;

	const isCta = (
		<CTA attributes={ attributes } setAttributes={ setAttributes } />
	);

	// Get description components.
	const descText = (
		<div className="uagb-cta-text-wrap">
			{
				<Description
					attributes={ attributes }
					setAttributes={ setAttributes }
					props={ props }
				/>
			}
		</div>
	);

	// Get Title components.
	const titleText = (
		<div className="uagb-cta__title-wrap">
			{
				<Title
					attributes={ attributes }
					setAttributes={ setAttributes }
					props={ props }
				/>
			}
		</div>
	);

	const output = () => {
		return (
			<div
				className={ classnames(
					'uagb-cta__content-wrap',
					...CtaPositionClasses( attributes )
				) }
			>
				<div className="uagb-cta__left-right-wrap">
					<div className="uagb-cta__content">
						{ ctaPosition == 'below-title' && (
							<>
								{ titleText }
								{ descText }
								{ isCta }
							</>
						) }
						{ ctaPosition == 'right' && (
							<>
								{ titleText }
								{ descText }
							</>
						) }
					</div>
					{ ctaPosition == 'right' && isCta }
				</div>
			</div>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			<div
				className={ classnames(
					className,
					'uagb-cta__outer-wrap',
					`uagb-block-${ block_id }`
				) }
			>
				{ ctaType == 'all' && (
					<>
						<a
							href="/"
							className="uagb-cta__block-link-wrap uagb-cta__link-to-all"
							rel="noopener noreferrer"
						>
							{ ' ' }
						</a>
						{ output() }
					</>
				) }
				{ ctaType !== 'all' && output() }
			</div>
		</Suspense>
	);
};

export default React.memo( Render );
