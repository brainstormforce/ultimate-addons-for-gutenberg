/**
 * BLOCK: Inline Notice - Save Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';

const { RichText } = wp.blockEditor;

export default function save( props ) {
	const { attributes, className } = props;

	const {
		block_id,
		c_id,
		noticeTitle,
		noticeContent,
		noticeAlignment,
		headingTag,
		icon,
		noticeDismiss,
		cookies,
		close_cookie_days,
	} = attributes;

	let image_icon_html = '';

	if ( noticeDismiss ) {
		image_icon_html = (
			<span className="uagb-notice-dismiss">{ renderSVG( icon ) }</span>
		);
	}

	let active = '';
	if ( true === cookies ) {
		active = 'uagb-notice__active';
	}
	return (
		<div
			className={ classnames(
				className,
				'uagb-inline_notice__outer-wrap',
				`${ noticeDismiss }`,
				`uagb-inline_notice__align-${ noticeAlignment }`,
				`uagb-block-${ block_id }`,
				`${ active }`
			) }
		>
			{ image_icon_html }
			<RichText.Content
				value={ noticeTitle }
				tagName={ headingTag }
				className="uagb-notice-title"
			/>
			<RichText.Content
				value={ noticeContent }
				tagName="div"
				className="uagb-notice-text"
			/>
		</div>
	);
}
