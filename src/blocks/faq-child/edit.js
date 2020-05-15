/**
 * BLOCK: FAQ - Child
 */

import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import styling from "./styling"
import memoize from "memize"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
const { select } = wp.data;
const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks
} = wp.blockEditor

const {
	PanelBody,
	TextControl,
	TextareaControl
} = wp.components

class UAGBFaqChildEdit extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-faq-child" + this.props.clientId )
		document.head.appendChild( $style )

	}
	
	render() {

		const { attributes, setAttributes } = this.props
        const {
			block_id,
			question,
			answer,
			icon,
			iconActive,
			layout
        } = attributes
		var element = document.getElementById( "uagb-style-faq-child" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}
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
		const faqChildControls = () => {

			return (
				<PanelBody
					title={ __( "General Settings" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<TextControl
						label="Title"
						value={ question }
						onChange={ ( question ) => setAttributes( { question: question } ) }
					/>
					<TextareaControl
						label="Content"
						value={ answer }
						onChange={ ( answer ) => setAttributes( { answer: answer } ) }
					/>
				</PanelBody>
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
			<Fragment>
				<InspectorControls>
					{ faqChildControls }
				</InspectorControls>
                <div className={ classnames(
                        "uagb-faq-child__outer-wrap",
                        `uagb-block-${ block_id }`
                    ) }
                >
                    { faqRenderAccordion() }
                </div>
			</Fragment>
		)
	}
}

export default UAGBFaqChildEdit
