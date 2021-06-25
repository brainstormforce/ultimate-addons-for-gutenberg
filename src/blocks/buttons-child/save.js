/**
 * BLOCK: Buttons - Save Block
 */

import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;

	const {
		block_id,
		target,
		link,
		label,
		inheritFromTheme,
		icon,
		iconPosition,
	} = attributes;

	const iconHtml = ( curr_position ) => {
		if ( '' !== icon && curr_position === iconPosition ) {
			return (
				<span
					className={ classnames(
						`uagb-button__icon`,
						`uagb-button__icon-position-${ iconPosition }`
					) }
				>
					{ renderSVG( icon ) }
				</span>
			);
		}
		return null;
	};

	return (
		<div
			className={ classnames(
				className,
				'uagb-buttons__outer-wrap',
				`uagb-block-${ block_id }`,
				inheritFromTheme ? 'wp-block-button' : null
			) }
		>
			<div className="uagb-button__wrapper">
				<a
					className={ classnames(
						'uagb-buttons-repeater',
						inheritFromTheme ? 'wp-block-button__link' : null
					) }
					href={ link }
					rel="noopener noreferrer"
					target={ target }
				>
					{ iconHtml( 'before' ) }
					<RichText.Content
						value={ label }
						tagName="div"
						className="uagb-button__link"
					/>
					{ iconHtml( 'after' ) }
				</a>
			</div>
		</div>
	);
}
