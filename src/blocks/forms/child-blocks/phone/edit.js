/**
 * BLOCK: Forms - Phone - Edit
 */

import classnames from "classnames";
import countryOptions from "./country-option";

const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	PanelBody,	
	ToggleControl,
	SelectControl	
} = wp.components;
const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

class UAGBFormsPhoneEdit extends Component {

	constructor() {
		super( ...arguments );
		
	}

	componentDidMount() {

		const { setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-phone-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}

	render() {

		const { attributes, setAttributes, isSelected } = this.props;

		const {
			block_id,
			phoneRequired,
			phoneName,
			pattern
		} = attributes;
		
		const phoneInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
						checked={ phoneRequired }
						onChange={ ( value ) => setAttributes( { phoneRequired: ! phoneRequired } ) }
					/>
					<SelectControl
						label={ __( "Pattern" ) }
						value={ pattern }
						options={ [
							{ label: "None", value: "" },
							{ label: "123-45-678", value: __( "[0-9]{3}-[0-9]{2}-[0-9]{3}", "ultimate-addons-for-gutenberg" ) },
							{ label: "123-456-6789", value: __( "[0-9]{3}-[0-9]{3}-[0-9]{4}", "ultimate-addons-for-gutenberg" ) },

						] }
						onChange={ ( pattern ) => { setAttributes( { pattern } ); } }
					/>
				</PanelBody>
			);
		};	
		let placeholder = "";
		if ( pattern == "[0-9]{3}-[0-9]{2}-[0-9]{3}" ){
			placeholder = __( "123-45-678", "ultimate-addons-for-gutenberg" );
		} else if ( pattern == "[0-9]{3}-[0-9]{3}-[0-9]{4}" ){
			placeholder = __( "123-456-6789", "ultimate-addons-for-gutenberg" );
		}
	
		let phone_html = "";
		if ( pattern != "" ){
			phone_html = <input type="tel" placeholder={ placeholder }  pattern={ pattern } required={ phoneRequired } className="uagb-forms-phone-input uagb-forms-input" name={ block_id } />;
		} else {
			phone_html = <input type="tel"  required={ phoneRequired } className="uagb-forms-phone-input uagb-forms-input" name={ block_id } />;
		}
		
		const isRequired = ( phoneRequired ) ? __( "required", "ultimate-addons-for-gutenberg" ) : "";

		return (
			<Fragment>
				<InspectorControls>
					{ phoneInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-phone-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
				) }>
					{ isSelected && (
						<div className="uagb-forms-required-wrap">
							<ToggleControl
								label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
								checked={ phoneRequired }
								onChange={ ( value ) => setAttributes( { phoneRequired: ! phoneRequired } ) }
							/>
						</div>
					) }
					<RichText
						tagName="div"
						placeholder={ __( "Phone Name" , "ultimate-addons-for-gutenberg" ) }
						value={ phoneName }
						onChange={ ( value ) => setAttributes( { phoneName: value } ) }
						className={ `uagb-forms-phone-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>
					<select className="uagb-forms-input uagb-form-phone-country uagb-form-phone-country-editor" id={ `uagb-form-country-${block_id}` } name={ `${phoneName}[]` }>
						{ countryOptions.map( ( o, index ) => 
							<option value={ o.props.value } key={ index }>{ o.props.children }</option>	
						) }				
					</select>
					{ phone_html }
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsPhoneEdit;
