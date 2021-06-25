/**
 * BLOCK: Call To Action - Deprecated Block
 */

// Import block dependencies and components.
import classnames from 'classnames';

// Import icon.
import Title from './components/Title';
import Description from './components/Description';
import CtaPositionClasses from './classes';
import CallToAction from './components/CallToAction';
import CTA from './components/CTA';
import attributes from './attributes';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		attributes,
		save( props ) {
			const {
				ctaPosition,
				block_id,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				ctaTitle,
				description,
			} = props.attributes;

			const isCta = (
				<CallToAction
					attributes={ props.attributes }
					setAttributes="not_set"
				/>
			);

			// Get description and seperator components.
			const desc = (
				<>
					{ '' !== description && (
						<div className="uagb-cta-text-wrap">
							<Description
								attributes={ props.attributes }
								setAttributes="not_set"
							/>
						</div>
					) }
				</>
			);

			// Get Title components.
			const titleText = (
				<>
					{ '' !== ctaTitle && (
						<div className="uagb-cta__title-wrap">
							<Title
								attributes={ props.attributes }
								setAttributes="not_set"
							/>
						</div>
					) }
				</>
			);

			const output = (
				<>
					<div
						className={ classnames(
							'uagb-cta__content-wrap',
							...CtaPositionClasses( props.attributes )
						) }
					>
						<div className="uagb-cta__left-right-wrap">
							{ ctaPosition == 'left' && isCta }
							<div className="uagb-cta__content">
								{ ctaPosition == 'above-title' && (
									<>
										{ isCta }
										{ titleText }
										{ desc }
									</>
								) }

								{ ctaPosition == 'below-title' && (
									<>
										{ titleText }
										{ desc }
										{ isCta }
									</>
								) }

								{ ( ctaPosition == 'left' ||
									ctaPosition == 'right' ) && (
									<>
										{ titleText }
										{ desc }
									</>
								) }
							</div>

							{ ctaPosition == 'right' && isCta }
						</div>
					</div>
				</>
			);

			let target = '';
			if ( ctaTarget ) {
				target = '_blank';
			}

			return (
				<>
					<div
						className={ classnames(
							className,
							'uagb-cta__outer-wrap'
						) }
						id={ `uagb-cta-block-${ block_id }` }
					>
						{ ctaType == 'all' && (
							<>
								<a
									href={ ctaLink }
									className="uagb-cta__block-link-wrap uagb-cta__link-to-all"
									target={ target }
									rel="noopener noreferrer"
								></a>
								{ output }
							</>
						) }
						{ ctaType !== 'all' && output }
					</div>
				</>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				ctaPosition,
				block_id,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				ctaTitle,
				description,
			} = props.attributes;

			const isCta = (
				<CTA attributes={ props.attributes } setAttributes="not_set" />
			);

			// Get description and seperator components.
			const desc = (
				<>
					{ '' !== description && (
						<div className="uagb-cta-text-wrap">
							<Description
								attributes={ props.attributes }
								setAttributes="not_set"
							/>
						</div>
					) }
				</>
			);

			// Get Title components.
			const titleText = (
				<>
					{ '' !== ctaTitle && (
						<div className="uagb-cta__title-wrap">
							<Title
								attributes={ props.attributes }
								setAttributes="not_set"
							/>
						</div>
					) }
				</>
			);

			const output = (
				<>
					<div
						className={ classnames(
							'uagb-cta__content-wrap',
							...CtaPositionClasses( props.attributes )
						) }
					>
						<div className="uagb-cta__left-right-wrap">
							{ ctaPosition == 'left' && isCta }
							<div className="uagb-cta__content">
								{ ctaPosition == 'above-title' && (
									<>
										{ isCta }
										{ titleText }
										{ desc }
									</>
								) }

								{ ctaPosition == 'below-title' && (
									<>
										{ titleText }
										{ desc }
										{ isCta }
									</>
								) }

								{ ( ctaPosition == 'left' ||
									ctaPosition == 'right' ) && (
									<>
										{ titleText }
										{ desc }
									</>
								) }
							</div>

							{ ctaPosition == 'right' && isCta }
						</div>
					</div>
				</>
			);

			let target = '';
			if ( ctaTarget ) {
				target = '_blank';
			}

			return (
				<>
					<div
						className={ classnames(
							className,
							'uagb-cta__outer-wrap'
						) }
						id={ `uagb-cta-block-${ block_id }` }
					>
						{ ctaType == 'all' && (
							<>
								<a
									href={ ctaLink }
									className="uagb-cta__block-link-wrap uagb-cta__link-to-all"
									target={ target }
									rel="noopener noreferrer"
								></a>
								{ output }
							</>
						) }
						{ ctaType !== 'all' && output }
					</div>
				</>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				ctaPosition,
				block_id,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				ctaTitle,
				description,
			} = props.attributes;

			const isCta = (
				<CTA attributes={ props.attributes } setAttributes="not_set" />
			);

			// Get description and seperator components.
			const desc = (
				<>
					{ '' !== description && (
						<div className="uagb-cta-text-wrap">
							<Description
								attributes={ props.attributes }
								setAttributes="not_set"
							/>
						</div>
					) }
				</>
			);

			// Get Title components.
			const titleText = (
				<>
					{ '' !== ctaTitle && (
						<div className="uagb-cta__title-wrap">
							<Title
								attributes={ props.attributes }
								setAttributes="not_set"
							/>
						</div>
					) }
				</>
			);

			const output = (
				<>
					<div
						className={ classnames(
							'uagb-cta__content-wrap',
							...CtaPositionClasses( props.attributes )
						) }
					>
						<div className="uagb-cta__left-right-wrap">
							{ ctaPosition == 'left' && isCta }
							<div className="uagb-cta__content">
								{ ctaPosition == 'above-title' && (
									<>
										{ isCta }
										{ titleText }
										{ desc }
									</>
								) }

								{ ctaPosition == 'below-title' && (
									<>
										{ titleText }
										{ desc }
										{ isCta }
									</>
								) }

								{ ( ctaPosition == 'left' ||
									ctaPosition == 'right' ) && (
									<>
										{ titleText }
										{ desc }
									</>
								) }
							</div>

							{ ctaPosition == 'right' && isCta }
						</div>
					</div>
				</>
			);

			let target = '';
			if ( ctaTarget ) {
				target = '_blank';
			}

			return (
				<>
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
									href={ ctaLink }
									className="uagb-cta__block-link-wrap uagb-cta__link-to-all"
									target={ target }
									rel="noopener noreferrer"
								></a>
								{ output }
							</>
						) }
						{ ctaType !== 'all' && output }
					</div>
				</>
			);
		},
	},
];

export default deprecated;
