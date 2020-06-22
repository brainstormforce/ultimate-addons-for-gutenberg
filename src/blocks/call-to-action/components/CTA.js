const { __ } = wp.i18n

import classnames from "classnames"
import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon"

class CTA extends React.Component {

	render() {

		const { attributes,setAttributes } = this.props

		let ctaBtnClass = "uagb-cta__block-link uagb-cta__button-link-wrapper uagb-cta-typeof-"+ attributes.ctaType

		let target ="_self"
		let rel ="noopener noreferrer"
		if( attributes.ctaTarget ){
			target ="_blank"
		}

		var cta_icon_output = ""
		if( attributes.ctaIcon !== "" ){
			cta_icon_output = <span className= { classnames(`uagb-cta-${ attributes.ctaType }-icon`, `uagb-cta__align-button-${ attributes.ctaIconPosition }` , "uagb-cta-with-svg") }>
				{ renderSVG(attributes.ctaIcon) }
			</span>
		}

		var link = "/" 
		if( setAttributes == "not_set" ){
			link = attributes.ctaLink
		}
		return (			
			<div className = "uagb-cta__link-wrapper uagb-cta__block-link-style">
				
				{  (attributes.ctaType === "button" || attributes.ctaType === "text") && ( 
					<div className = {classnames("uagb-cta__button-wrapper", ( attributes.inheritFromTheme && attributes.ctaType === "button" ) ? 'wp-block-button' : null)}>
						<a
							href = {link}
							className = {
								classnames(
									'uagb-cta__button-link-wrapper',
									( !attributes.inheritFromTheme ) ? 'uagb-cta__block-link' : null,
									( !attributes.inheritFromTheme ) ? `uagb-cta-typeof-${attributes.ctaType}` : null,
									( attributes.inheritFromTheme && attributes.ctaType === "button" ) ? 'wp-block-button__link' : null,
								)
							}
							target= {target}
							rel= {rel}
						>
                        	{  attributes.ctaIconPosition === "before" &&  cta_icon_output }
							<span className = "uagb-cta__link-content-inner">    
								<span >{attributes.ctaText}</span>
							</span>
							{  attributes.ctaIconPosition === "after" &&  cta_icon_output }
						</a>
					</div>
				)
				}
			</div>            
		)
	}
}

export default CTA
