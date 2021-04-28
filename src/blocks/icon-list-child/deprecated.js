/**
 * BLOCK: Icon List - Child - Deprecated Block
 */

import classnames from "classnames";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
import attributes from "./attributes";

const {
	RichText
} = wp.blockEditor;

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
				hideLabel
			} = attributes;

			let image_icon_html = "";

			if ( image_icon == "icon" ) {
				if ( icon ) {
					image_icon_html = <span className="uagb-icon-list__source-icon">{ renderSVG( icon ) }</span>;
				}
			} else if ( image && image.url ) {
				image_icon_html = <img className="uagb-icon-list__source-image" src={ image.url } />;
			}

			const target_val = ( target ) ? "_blank" : "_self";
			const link_url = ( !disableLink ) ? link : "/";

			return (
				<div
					className={ classnames(
						"uagb-icon-list-repeater",
						"uagb-icon-list__wrapper",
						className,
						`uagb-block-${ block_id }`
					) }
				>
					{ ! disableLink &&
					<a target={ target_val } rel="noopener noreferrer" href={ link_url }></a>
					}
					<div className="uagb-icon-list__content-wrap">
						<span className="uagb-icon-list__source-wrap">{ image_icon_html }</span>
						{ ! hideLabel && "" != label &&
						<div className="uagb-icon-list__label-wrap">
							<RichText.Content
								tagName="span"
								value={ label }
								className='uagb-icon-list__label' />
						</div>
						}
					</div>
				</div>
			);
		},
	}
];

export default deprecated;