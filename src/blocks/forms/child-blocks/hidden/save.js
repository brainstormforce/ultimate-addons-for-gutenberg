/**
 * BLOCK: Forms - hidden - Save Block
 */

import classnames from "classnames";


export default function save( props ) {
	
	const { attributes } = props;

	const {
		block_id,
		hidden_field_value
	} = attributes;
		
	return (
		<div className={ classnames(
			"uagb-forms-hidden-wrap",
			`uagb-block-${ block_id }`,
		) }>			
			<input type="hidden"  className="uagb-forms-hidden-input" value={ hidden_field_value } />
		</div>
	);
}