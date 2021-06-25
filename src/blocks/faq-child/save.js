/**
 * BLOCK: FAQ - Child - Save Block
 */

import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { className } = props;
	const {
		block_id,
		question,
		answer,
		icon,
		iconActive,
		layout,
		headingTag,
	} = props.attributes;

	const faqRenderIcon = () => {
		return (
			<>
				<span className="uagb-icon uagb-faq-icon-wrap">
					{ renderSVG( icon ) }
				</span>
				<span className="uagb-icon-active uagb-faq-icon-wrap">
					{ renderSVG( iconActive ) }
				</span>
			</>
		);
	};
	const faqRenderAccordion = () => {
		return (
			<div className="uagb-faq-item" role="tab" tabIndex="0">
				<div className="uagb-faq-questions-button uagb-faq-questions">
					{ 'accordion' === layout && faqRenderIcon() }
					<RichText.Content
						tagName={ headingTag }
						value={ question }
						className="uagb-question"
					/>
				</div>
				<div className="uagb-faq-content">
					<span>
						<RichText.Content tagName="p" value={ answer } />
					</span>
				</div>
			</div>
		);
	};
	return (
		<div
			className={ classnames(
				className,
				'uagb-faq-child__outer-wrap',
				`uagb-block-${ block_id }`
			) }
		>
			{ faqRenderAccordion() }
		</div>
	);
}
