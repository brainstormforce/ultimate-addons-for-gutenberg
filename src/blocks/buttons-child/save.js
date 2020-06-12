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
		icon,
		iconPosition
	} = attributes

	var mb_icon_output = ""
	if( attributes.icon !== "" ){
		mb_icon_output = <span className= { classnames(`uagb-mb-button-icon`, `uagb-mb-align-icon-${ attributes.iconPosition }`) }>
			{ renderSVG(attributes.icon) }
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
				<div className ="uagb-buttons-repeater" >
					{  ( attributes.icon !== "" && attributes.iconPosition === "before" ) ? mb_icon_output : "" }
					<RichText.Content
						value={ label }
						tagName='a'
						className={classnames( 'uagb-button__link', ( inheritFromTheme ) ? "wp-block-button__link" : null ) }
						href={ link }
						rel ="noopener noreferrer"
						target={ target }
					/>
					{  ( attributes.icon !== "" && attributes.iconPosition === "after" ) ?  mb_icon_output : "" }
				</div>
				
			</div>
		</div>
		
	)
}
