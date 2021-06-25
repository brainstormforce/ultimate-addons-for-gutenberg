/**
 * BLOCK: Table of Contents - Deprecated Block
 */

import classnames from 'classnames';
import attributes from './attributes';
import renderSVG from '@Controls/renderIcon';

import { RichText } from '@wordpress/block-editor';

function social_html( icon, link, target ) {
	const target_value = target ? '_blank' : '_self';
	return (
		<li className="uagb-team__social-icon">
			<a
				href={ link }
				target={ target_value }
				title=""
				rel="noopener noreferrer"
			>
				{ renderSVG( icon ) }
			</a>
		</li>
	);
}

function deprecated_social_html( icon, link, target ) {
	const target_value = target ? '_blank' : '_self';
	return (
		<li className="uagb-team__social-icon">
			<a
				href={ link }
				target={ target_value }
				title=""
				rel="noopener noreferrer"
			>
				<span className={ icon }></span>
			</a>
		</li>
	);
}

const deprecated = [
	{
		attributes,
		save( props ) {
			const {
				block_id,
				align,
				tag,
				title,
				prefix,
				description_text,
				image,
				imgSize,
				imgStyle,
				imgPosition,
				twitterIcon,
				fbIcon,
				linkedinIcon,
				pinIcon,
				twitterLink,
				fbLink,
				linkedinLink,
				pinLink,
				socialTarget,
				socialEnable,
				stack,
			} = props.attributes;

			let size = '';
			let img_url = '';

			if ( image ) {
				size = image.sizes;
				if ( image.sizes ) {
					img_url = size[ imgSize ] ? size[ imgSize ].url : image.url;
				} else {
					img_url = image.url;
				}
			}

			let image_html = '';

			if ( '' != img_url ) {
				image_html = (
					<div
						className={ classnames(
							'uagb-team__image-wrap',
							`uagb-team__image-crop-${ imgStyle }`
						) }
					>
						<img
							className=""
							src={ img_url }
							alt={ image.alt ? image.alt : '' }
						/>
					</div>
				);
			}

			return (
				<div
					className={ classnames(
						props.className,
						'uagb-team',
						'uagb-team__outer-wrap',
						`uagb-team__image-position-${ imgPosition }`,
						`uagb-team__align-${ align }`,
						`uagb-team__stack-${ stack }`
					) }
					id={ `uagb-team-${ block_id }` }
				>
					<div className="uagb-team__wrap">
						{ imgPosition == 'left' && image_html }

						<div className="uagb-team__content">
							{ imgPosition == 'above' && image_html }

							<div className="uagb-team__title-wrap">
								<RichText.Content
									tagName={ tag }
									value={ title }
									className="uagb-team__title"
								/>
								<RichText.Content
									tagName="span"
									value={ prefix }
									className="uagb-team__prefix"
								/>
							</div>

							<div className="uagb-team__desc-wrap">
								<RichText.Content
									tagName="p"
									value={ description_text }
									className="uagb-team__desc"
								/>
							</div>
							{ socialEnable && (
								<div className="uagb-team__social-icon-wrap">
									<ul className="uagb-team__social-list">
										{ '' != twitterIcon &&
											deprecated_social_html(
												twitterIcon,
												twitterLink,
												socialTarget
											) }
										{ '' != fbIcon &&
											deprecated_social_html(
												fbIcon,
												fbLink,
												socialTarget
											) }
										{ '' != linkedinIcon &&
											deprecated_social_html(
												linkedinIcon,
												linkedinLink,
												socialTarget
											) }
										{ '' != pinIcon &&
											deprecated_social_html(
												pinIcon,
												pinLink,
												socialTarget
											) }
									</ul>
								</div>
							) }
						</div>

						{ imgPosition == 'right' && image_html }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				block_id,
				align,
				tag,
				title,
				prefix,
				description_text,
				image,
				imgSize,
				imgStyle,
				imgPosition,
				twitterIcon,
				fbIcon,
				linkedinIcon,
				pinIcon,
				twitterLink,
				fbLink,
				linkedinLink,
				pinLink,
				socialTarget,
				socialEnable,
				stack,
			} = props.attributes;

			let size = '';
			let img_url = '';

			if ( image ) {
				size = image.sizes;
				if ( image.sizes ) {
					img_url = size[ imgSize ] ? size[ imgSize ].url : image.url;
				} else {
					img_url = image.url;
				}
			}

			let image_html = '';

			if ( '' != img_url ) {
				image_html = (
					<div
						className={ classnames(
							'uagb-team__image-wrap',
							`uagb-team__image-crop-${ imgStyle }`
						) }
					>
						<img
							className=""
							src={ img_url }
							alt={ image.alt ? image.alt : '' }
						/>
					</div>
				);
			}

			return (
				<div
					className={ classnames(
						props.className,
						'uagb-team',
						'uagb-team__outer-wrap',
						`uagb-team__image-position-${ imgPosition }`,
						`uagb-team__align-${ align }`,
						`uagb-team__stack-${ stack }`
					) }
					id={ `uagb-team-${ block_id }` }
				>
					<div className="uagb-team__wrap">
						{ imgPosition == 'left' && image_html }

						<div className="uagb-team__content">
							{ imgPosition == 'above' && image_html }

							<div className="uagb-team__title-wrap">
								<RichText.Content
									tagName={ tag }
									value={ title }
									className="uagb-team__title"
								/>
								<RichText.Content
									tagName="span"
									value={ prefix }
									className="uagb-team__prefix"
								/>
							</div>

							<div className="uagb-team__desc-wrap">
								<RichText.Content
									tagName="p"
									value={ description_text }
									className="uagb-team__desc"
								/>
							</div>
							{ socialEnable && (
								<div className="uagb-team__social-icon-wrap">
									<ul className="uagb-team__social-list">
										{ '' != twitterIcon &&
											social_html(
												twitterIcon,
												twitterLink,
												socialTarget
											) }
										{ '' != fbIcon &&
											social_html(
												fbIcon,
												fbLink,
												socialTarget
											) }
										{ '' != linkedinIcon &&
											social_html(
												linkedinIcon,
												linkedinLink,
												socialTarget
											) }
										{ '' != pinIcon &&
											social_html(
												pinIcon,
												pinLink,
												socialTarget
											) }
									</ul>
								</div>
							) }
						</div>

						{ imgPosition == 'right' && image_html }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				block_id,
				align,
				tag,
				title,
				prefix,
				description_text,
				image,
				imgSize,
				imgStyle,
				imgPosition,
				twitterIcon,
				fbIcon,
				linkedinIcon,
				pinIcon,
				twitterLink,
				fbLink,
				linkedinLink,
				pinLink,
				socialTarget,
				socialEnable,
				stack,
			} = props.attributes;

			let size = '';
			let img_url = '';

			if ( image ) {
				size = image.sizes;
				if ( image.sizes ) {
					img_url = size[ imgSize ] ? size[ imgSize ].url : image.url;
				} else {
					img_url = image.url;
				}
			}

			let image_html = '';

			if ( '' != img_url ) {
				image_html = (
					<div
						className={ classnames(
							'uagb-team__image-wrap',
							`uagb-team__image-crop-${ imgStyle }`
						) }
					>
						<img
							className=""
							src={ img_url }
							alt={ image.alt ? image.alt : '' }
						/>
					</div>
				);
			}

			return (
				<div
					className={ classnames(
						props.className,
						'uagb-team',
						'uagb-team__outer-wrap',
						`uagb-team__image-position-${ imgPosition }`,
						`uagb-team__align-${ align }`,
						`uagb-team__stack-${ stack }`,
						`uagb-block-${ block_id }`
					) }
				>
					<div className="uagb-team__wrap">
						{ imgPosition == 'left' && image_html }

						<div className="uagb-team__content">
							{ imgPosition == 'above' && image_html }

							<div className="uagb-team__title-wrap">
								<RichText.Content
									tagName={ tag }
									value={ title }
									className="uagb-team__title"
								/>
								<RichText.Content
									tagName="span"
									value={ prefix }
									className="uagb-team__prefix"
								/>
							</div>

							<div className="uagb-team__desc-wrap">
								<RichText.Content
									tagName="p"
									value={ description_text }
									className="uagb-team__desc"
								/>
							</div>
							{ socialEnable && (
								<div className="uagb-team__social-icon-wrap">
									<ul className="uagb-team__social-list">
										{ '' != twitterIcon &&
											social_html(
												twitterIcon,
												twitterLink,
												socialTarget
											) }
										{ '' != fbIcon &&
											social_html(
												fbIcon,
												fbLink,
												socialTarget
											) }
										{ '' != linkedinIcon &&
											social_html(
												linkedinIcon,
												linkedinLink,
												socialTarget
											) }
										{ '' != pinIcon &&
											social_html(
												pinIcon,
												pinLink,
												socialTarget
											) }
									</ul>
								</div>
							) }
						</div>

						{ imgPosition == 'right' && image_html }
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
