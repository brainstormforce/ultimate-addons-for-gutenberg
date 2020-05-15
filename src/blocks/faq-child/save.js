/**
 * BLOCK: FAQ - Child - Save Block
 */

import classnames from "classnames"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( props ) {
	
	const { className } = props
	const {
		block_id,
		question,
		answer,
		icon,
		iconActive
	} = props.attributes

	const faqRenderAccordion = () => {

		return (
			<div className="uagb-faq-child__wrapper">
					<div className="uagb-faq-item">
						<div className="uagb-faq-questions-button uagb-faq-questions">
							<span className="uagb-icon uagb-faq-icon-wrap">
								{ renderSVG(icon) }
							</span>
							<span className="uagb-icon-active uagb-faq-icon-wrap">
								{ renderSVG(iconActive) }
							</span>
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
