/**
 * BLOCK: Forms - Toggle - Edit
 */

import classnames from "classnames";
const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl
} = wp.components;
const {
	InspectorControls,
	RichText,
	ColorPalette       
} = wp.blockEditor;

class UAGBFormsToggleEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { attributes, setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		
	}
	
	
	render() {
		
		const { attributes, setAttributes,isSelected } = this.props;
		
		const {
			block_id,
			toggleRequired,
			name,
			toggleStatus,
			layout,
			trueValue,
			falseValue
		} = attributes;
		
		const toggleInspectorControls = () => {
			
			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<p className="uagb-settings-notice">{ __( "Leaving the toggle in On/Off state will set it as a default value on page load for the user." , "ultimate-addons-for-gutenberg" ) }</p>

					<ToggleControl
						label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
						checked={ toggleRequired }
						onChange={ ( value ) => setAttributes( { toggleRequired: ! toggleRequired } ) }
					/>
					<ToggleControl
						label={ __( "Default State" , "ultimate-addons-for-gutenberg" ) }
						checked={ toggleStatus }
						help={ toggleStatus ? __( "ON State", "ultimate-addons-for-gutenberg" ) : __( "OFF State", "ultimate-addons-for-gutenberg" ) }
						onChange={ ( value ) => setAttributes( { toggleStatus: ! toggleStatus } ) }
					/>
					<TextControl
						label={ __( "True State", "ultimate-addons-for-gutenberg" ) }
						value={ trueValue }
						onChange={ ( value ) => setAttributes( { trueValue: value } ) }					
					/>
					<TextControl
						label={ __( "False State" , "ultimate-addons-for-gutenberg" ) }
						value={ falseValue }
						onChange={ ( value ) => setAttributes( { falseValue: value } ) }					
					/>
					<SelectControl
						label={ __( "Layout" , "ultimate-addons-for-gutenberg" ) }
						value={ layout }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
						options={ [
							{ value: "", label: __( "Square" , "ultimate-addons-for-gutenberg" ) },
							{ value: "round", label: __( "Round" , "ultimate-addons-for-gutenberg" ) },								
						] }
					/>
				</PanelBody>
			);
		};
		
		const isRequired = ( toggleRequired ) ? __( "required","ultimate-addons-for-gutenberg" ) : "";

		return (
			<Fragment>
				<InspectorControls>
					{ toggleInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-toggle-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
					
				) }>
					{ isSelected && (
						<div className="uagb-forms-required-wrap">
							<ToggleControl
								label={ __( "Required", "ultimate-addons-for-gutenberg" ) }
								checked={ toggleRequired }
								onChange={ ( value ) => setAttributes( { toggleRequired: ! toggleRequired } ) }
							/>														
						</div>
					) }
					<RichText
						tagName="div"
						placeholder={ __( "Name" , "ultimate-addons-for-gutenberg" ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }
						className={ `uagb-forms-toggle-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>
					<label className="uagb-switch">						
						<input 
							type="hidden"
							className="uagb-forms-toggle-input"
							checked={ toggleStatus }
							data-truestate={ trueValue }
							data-falsestate={ falseValue }
							value={ toggleStatus ? trueValue : falseValue }
							required={ toggleRequired }	
							name={ block_id }				
						/>
						<input 
							type="checkbox"
							className="uagb-forms-toggle-input"
							readOnly
							checked={ toggleStatus }
							data-truestate={ trueValue }
							data-falsestate={ falseValue }
							value={ toggleStatus ? trueValue : falseValue }
							required={ toggleRequired }	
							name={ block_id }				
						/>
						<span className={ `uagb-slider ${layout}` }></span>
					</label>	
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsToggleEdit;
