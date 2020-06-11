/**
 * BLOCK: Buttons - Save Block
 */

import classnames from "classnames"
import times from "lodash/times"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"

const { __ } = wp.i18n

const {
	RichText
} = wp.blockEditor

// Extend component
const { Fragment } = wp.element

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		block_id,
		target,
		link,
		label,
		inheritFromTheme,
		mbIcon,
		mbIconPosition
	} = attributes

	var mb_icon_output = ""
	if( attributes.mbIcon !== "" ){
		mb_icon_output = <span className= { classnames(`uagb-mb-button-icon`, `uagb-mb-align-icon-${ attributes.mbIconPosition }`) }>
			{ renderSVG(attributes.mbIcon) }
		</span>
	}
	
	return (
		<div className={ classnames(
			className,
			"uagb-buttons__outer-wrap",
			`uagb-block-${ block_id }`,
			( inheritFromTheme ) ? "wp-block-button" : null
			) }>
			<div className="uagb-button__wrapper">
				{  attributes.mbIcon !== "" && (
					<div className = "uagb-buttons-repeater uagb-button__wrapper uagb-mb-link">
						{  attributes.mbIconPosition === "before" &&  mb_icon_output }
						<RichText.Content
							value={ label }
							tagName='a'
							className={classnames( 'uagb-button__link', ( inheritFromTheme ) ? "wp-block-button__link" : null ) }
							href={ link }
							rel ="noopener noreferrer"
							target={ target }
						/>
						{  attributes.mbIconPosition === "after" &&  mb_icon_output }
					</div>
				)
				}

				{  attributes.mbIcon === "" && (
					<div className="uagb-buttons-repeater">
						<RichText.Content
							value={ label }
							tagName='a'
							className={classnames( 'uagb-button__link', ( inheritFromTheme ) ? "wp-block-button__link" : null ) }
							href={ link }
							rel ="noopener noreferrer"
							target={ target }
						/>	
					</div>
				)
				}
			</div>
		</div>
		
	)
}
