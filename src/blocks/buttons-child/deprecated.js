/**
 * BLOCK: Button Child - Deprecated Block
 */

import classnames from 'classnames';
import attributes from './attributes';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const { block_id, target, link, label } = attributes;

			return (
				<div
					className={ classnames(
						className,
						'uagb-buttons__outer-wrap',
						`uagb-block-${ block_id }`
					) }
				>
					<div className="uagb-button__wrapper">
						<div className="uagb-buttons-repeater">
							<RichText.Content
								value={ label }
								tagName="a"
								className="uagb-button__link"
								href={ link }
								rel="noopener noreferrer"
								target={ target }
							/>
						</div>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
