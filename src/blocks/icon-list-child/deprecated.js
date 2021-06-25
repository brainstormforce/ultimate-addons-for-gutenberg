/**
 * BLOCK: Icon List - Child - Deprecated Block
 */

import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import attributes from './attributes';

import { RichText } from '@wordpress/block-editor';
const deprecated = [
	{
		attributes,
		save( props ) {
			const { attributes, className } = props;

			const {
				label,
				image_icon,
				icon,
				image,
				block_id,
				link,
				target,
				disableLink,
				hideLabel,
			} = attributes;

			let imageIconHtml = '';

			if ( image_icon == 'icon' ) {
				if ( icon ) {
					imageIconHtml = (
						<span className="uagb-icon-list__source-icon">
							{ renderSVG( icon ) }
						</span>
					);
				}
			} else if ( image && image.url ) {
				imageIconHtml = (
					<img
						className="uagb-icon-list__source-image"
						src={ image.url }
					/>
				);
			}

			const targetVal = target ? '_blank' : '_self';
			const linkUrl = ! disableLink ? link : '/';

			return (
				<div
					className={ classnames(
						`uagb-icon-list-repeater`,
						'uagb-icon-list__wrapper',
						className,
						`uagb-block-${ block_id }`
					) }
				>
					{ ! disableLink && (
						<a
							target={ targetVal }
							rel="noopener noreferrer"
							href={ linkUrl }
						></a>
					) }
					<div className="uagb-icon-list__content-wrap">
						<span className="uagb-icon-list__source-wrap">
							{ imageIconHtml }
						</span>
						{ ! hideLabel && '' != label && (
							<div className="uagb-icon-list__label-wrap">
								<RichText.Content
									tagName="span"
									value={ label }
									className="uagb-icon-list__label"
								/>
							</div>
						) }
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
