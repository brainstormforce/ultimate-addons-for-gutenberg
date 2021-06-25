/**
 * BLOCK: Social Share child - Deprecated Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import attributes from './attributes';
import renderSVG from '@Controls/renderIcon';
import links from './links';

const deprecated = [
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const {
				current_url,
				type,
				image_icon,
				icon,
				image,
				block_id,
				link,
			} = props.attributes;

			let url = '';

			if ( null != current_url ) {
				url = links[ type ];
			}

			let imageIconHtml = '';

			if ( image_icon == 'icon' ) {
				if ( icon ) {
					imageIconHtml = (
						<span className="uagb-ss__source-icon">
							{ renderSVG( icon ) }
						</span>
					);
				}
			} else if ( image && image.url ) {
				imageIconHtml = (
					<img className="uagb-ss__source-image" src={ image.url } />
				);
			}

			return (
				<div
					className={ classnames(
						'uagb-ss-repeater',
						'uagb-ss__wrapper',
						className,
						`uagb-block-${ block_id }`
					) }
				>
					<a
						className="uagb-ss__link"
						data-href={ url }
						rel="noopener noreferrer"
					>
						<span className="uagb-ss__source-wrap">
							{ imageIconHtml }
						</span>
					</a>
				</div>
			);
		},
	},
];

export default deprecated;
