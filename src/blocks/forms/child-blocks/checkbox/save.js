/**
 * BLOCK: Forms - Checkbox - Save Block
 */

import classnames from "classnames";

const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const {	Fragment } = wp.element;

export default function save( props ) {
	
	const { attributes } = props;
	
	const {
		block_id,
		checkboxRequired,
		options,
		checkboxName
	} = attributes;
	
	const isRequired = ( checkboxRequired ) ? __( "required", "ultimate-addons-for-gutenberg" ) : "";

	return (
		<div className={ classnames(
			"uagb-forms-checkbox-wrap",
			"uagb-forms-field-set",
			`uagb-block-${ block_id }`,
		) }>
			<RichText.Content
				tagName="div"
				value={ checkboxName }
				className={ `uagb-forms-checkbox-label ${isRequired} uagb-forms-input-label` }
				id={ block_id }		
			/>
			
			{ options.map( ( o, index ) => {
				const optionvalue = o.optionvalue;
				const value = optionvalue.replace( /\s+/g, "-" ).toLowerCase();
				return (
					<Fragment>
						<input type="checkbox" className="uagb-forms-checkbox" id={ `checkbox-${value}-${block_id}` } name={ `${checkboxName}[]` } value={ optionvalue } required={ checkboxRequired }  onInvalid="this.setCustomValidity('Please check this box if you want to proceed.')" />
						<label htmlFor={ `checkbox-${value}-${block_id}` }>{ o.optiontitle }</label><br />						
					</Fragment>
				);
			} ) }
								
		</div>
	);
}