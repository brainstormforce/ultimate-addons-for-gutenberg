/**
 * BLOCK: Forms - Radio - Save Block
 */

import classnames from "classnames";

const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const {	Fragment } = wp.element;

export default function save( props ) {
	
	const { attributes } = props;
	
	const {
		block_id,
		radioRequired,
		options,
		radioName
	} = attributes;
	
	const isRequired = ( radioRequired ) ? __( "required" , "ultimate-addons-for-gutenberg" ) : "";
	
	return (
		<div className={ classnames(
			"uagb-forms-radio-wrap",
			"uagb-forms-field-set",
			`uagb-block-${ block_id }`,
		) }>
			<RichText.Content
				tagName="div"
				value={ radioName }
				className={ `uagb-forms-radio-label ${isRequired} uagb-forms-input-label` }
				id={ block_id }		
			/>
			
			{ options.map( ( o, index ) => {
				const optionvalue = o.optionvalue;
				const value = optionvalue.replace( /\s+/g, "-" ).toLowerCase();
				return (
					<Fragment>
						<input type="radio" id={ `radio-${value}-${block_id}` } name={ block_id } value={ optionvalue } required={ radioRequired } />
						<label htmlFor={ `radio-${value}-${block_id}` }>{ o.optiontitle }</label><br />						
					</Fragment>
				);
			} ) }
								
		</div>
	);
}