const { __ } = wp.i18n;

import classnames from "classnames";
import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon";

const InfoBoxCta = props => {

	const { attributes, setAttributes = "not_set" } = props
	
	let ctaBtnClass = "uagb-infobox-cta-link uagb-ifb-cta-button"

	if ( attributes.inheritFromTheme ) {
		ctaBtnClass = "wp-block-button__link"
	}

	let target ="_self"
	let rel ="noopener noreferrer"
	if( attributes.ctaTarget ){
		target ="_blank"
	}

	var cta_icon_output = ""
	if( attributes.ctaIcon !== "" ){
		cta_icon_output = <span className= { classnames( `uagb-ifb-${ attributes.ctaType }-icon`, `uagb-ifb-align-icon-${ attributes.ctaIconPosition }` ) }>
			{ renderSVG( attributes.ctaIcon ) }
		</span>
	}

	if ( setAttributes !== "not_set" ) {

		return (
			<div className = "uagb-ifb-cta uagb-infobox-cta-link-style">
				{  attributes.ctaType === "text" && (
					<a target= {target} className = "uagb-infobox-cta-link" rel= {rel} >
						{  attributes.ctaIconPosition === "before" &&  cta_icon_output }
						<span className = "uagb-inline-editing" >{attributes.ctaText}</span>
						{  attributes.ctaIconPosition === "after" &&  cta_icon_output }
					</a>
				)
				}

				{  attributes.ctaType === "button" && (
					<div className = {classnames( "uagb-ifb-button-wrapper", ( attributes.inheritFromTheme ) ? "wp-block-button" : null )}>
						<a className = { ctaBtnClass } target= {target} rel= {rel} >
							{ cta_icon_output }
							<span className = "uagb-ifb-cta-content-wrapper">
								<span className   = "uagb-inline-editing " >{attributes.ctaText}</span>
							</span>
						</a>
					</div>
				)
				}
			</div>
		)
	} else {
		return (
			<div className = "uagb-ifb-cta uagb-infobox-cta-link-style">
				{  attributes.ctaType === "text" && (
					<a href = {attributes.ctaLink} target= {target} className = "uagb-infobox-cta-link" rel= {rel} >
						{  attributes.ctaIconPosition === "before" &&  cta_icon_output }
						<span className = "uagb-inline-editing" >{attributes.ctaText}</span>
						{  attributes.ctaIconPosition === "after" &&  cta_icon_output }
					</a>
				)
				}

				{  attributes.ctaType === "button" && (
					<div className = {classnames( "uagb-ifb-button-wrapper", ( attributes.inheritFromTheme ) ? "wp-block-button" : null )}>
						<a href = {attributes.ctaLink} className = { ctaBtnClass } target= {target} rel= {rel} >
							{ cta_icon_output }
							<span className = "uagb-ifb-cta-content-wrapper">
								<span className   = "uagb-inline-editing " >{attributes.ctaText}</span>
							</span>
						</a>
					</div>
				)
				}
			</div>
		)
	}
}
export default InfoBoxCta

