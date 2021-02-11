/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"

const {	InnerBlocks } = wp.blockEditor

export default function save( props ) {

	const {
		block_id,
		className,
	} = props.attributes

	return (
		<div className={ classnames(
				className,
				"uagb-rest_menu__outer-wrap",
				`uagb-block-${block_id}`,					
			) }
			>				
			<InnerBlocks.Content/>
		</div>
	)
}
