/**
 * BLOCK: FAQ - Child - Save Block
 */

import classnames from "classnames"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"

const {
	InnerBlocks
} = wp.blockEditor

const {
	Component,
	Fragment,
} = wp.element

export default function save( props ) {
	
	const { className } = props
	const {
		block_id,
		question,
		answer,
		icon,
		iconActive,
		layout
	} = props.attributes

	const faqRenderIcon = () => {
			
		return (
			<Fragment>
				<span className="uagb-icon uagb-faq-icon-wrap">
					{ renderSVG(icon) }
				</span>
				<span className="uagb-icon-active uagb-faq-icon-wrap">
					{ renderSVG(iconActive) }
				</span>
			</Fragment>
		)
	}
	const faqRenderAccordion = () => {

		return (
				<div className="uagb-faq-child__wrapper">
					<div className="uagb-faq-item">
						<div className="uagb-faq-questions-button uagb-faq-questions">
							{ 'accordion' === layout && faqRenderIcon() }
							<span className="uagb-question">
									{ question }
							</span>
						</div>
						<div className="uagb-content">
							<span>
								<p>
									{ answer }
								</p>
							</span>
						</div>
					</div>
				</div>
			)
	}
	return (
		<div className={ classnames(
			className,
			"uagb-faq-child__outer-wrap",
			`uagb-block-${ block_id }`
		) }
		>
			{ faqRenderAccordion() }

		</div>
	)
}
