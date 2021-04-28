/**
 * BLOCK: FAQ - Child
 */

import classnames from "classnames";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";

const { __ } = wp.i18n;

const {
	Component,
	Fragment,
} = wp.element;

const {
	InspectorControls,
	RichText,
} = wp.blockEditor;
class UAGBFaqChildEdit extends Component {

	constructor() {
		super( ...arguments );
		this.state = {
			isFocused: "false",
		};
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		// Pushing Style tag for this block css.
	}
	componentDidUpdate( prevProps, prevState ) {

		if ( ! this.props.isSelected && prevProps.isSelected && this.state.isFocused ) {
			this.setState( {
				isFocused: "false",
			} );
		}
		if ( this.props.isSelected && ! prevProps.isSelected ) {

			this.setState( {
				isFocused: true,
			} );
		}
	}
	render() {

		const { attributes, setAttributes } = this.props;
		const {
			question,
			answer,
			icon,
			iconActive,
			layout,
			headingTag
		} = attributes;
		
		const faqRenderIcon = () => {
			
			return (
				<Fragment>
					<span className="uagb-icon uagb-faq-icon-wrap">
						{ renderSVG( icon ) }
					</span>
					<span className="uagb-icon-active uagb-faq-icon-wrap">
						{ renderSVG( iconActive ) }
					</span>
				</Fragment>
			);
		};
		const faqChildControls = () => {

			return (
				<p className="uagb-settings-notice">{ __( "For the styling options please select the Parent Block." ) }</p>
			);
		};
		const faqRenderHtml = () => {

			return (
				<div className="uagb-faq-child__wrapper">
					<div className="uagb-faq-item" role="tab" tabIndex="0">
						<div className="uagb-faq-questions-button uagb-faq-questions">
							{ "accordion" === layout && faqRenderIcon() }
							<RichText
								tagName={ ( "span" != headingTag ) ? headingTag : "div" }
								placeholder={ __( "Question" ) }
								value={ question }
								onChange={ ( value ) => setAttributes( { question: value } ) }
								className='uagb-question'
								multiline={ false }
								allowedFormats={ [ "core/bold", "core/italic", "core/strikethrough" ] }
							/>
						</div>
						<div className="uagb-faq-content">
							<span>
								<RichText
									tagName="p"
									placeholder={ __( "Answer" ) }
									value={ answer }
									onChange={ ( value ) => setAttributes( { answer: value } ) }
									multiline={ false }
									allowedFormats={ [ "core/bold", "core/italic", "core/strikethrough", "core/link" ] }
								/>
							</span>
						</div>
					</div>
				</div>
			);
		};
		return (
			<Fragment>
				<InspectorControls>
					{ faqChildControls }
				</InspectorControls>
				<div className={ classnames(
					"uagb-faq-child__outer-wrap",
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`,
					( this.props.isSelected &&  ( false !== this.state.isFocused ) ) ? "uagb-faq__active" : ""
				) }
				>
					{ faqRenderHtml() }
				</div>
			</Fragment>
		);
	}
}

export default UAGBFaqChildEdit;
