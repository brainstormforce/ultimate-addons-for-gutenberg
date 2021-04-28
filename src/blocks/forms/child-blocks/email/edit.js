/**
 * BLOCK: Forms - Email - Edit
 */

import classnames from "classnames";

const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	RichText,
	InspectorControls
} = wp.blockEditor;

const {	
	ToggleControl,
	TextControl,
	PanelBody
} = wp.components;

class UAGBFormsEmailEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { attributes, setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-email-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}
    
	render() {

		const { attributes,setAttributes,isSelected } = this.props;

		const {
			block_id,
			name,
			required,
			placeholder
		} = attributes;
		
		const nameInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General", "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required", "ultimate-addons-for-gutenberg" ) }
						checked={ required }
						onChange={ ( value ) => setAttributes( { required: ! required } ) }
					/>
					<TextControl
						label="Placeholder"
						value={ placeholder }
						onChange={ ( value ) => setAttributes( { placeholder: value } ) }
						placeholder={ __( "Placeholder" , "ultimate-addons-for-gutenberg" ) }
					/>
				</PanelBody>
			);
		};

		const isRequired = ( required ) ? __( "required" , "ultimate-addons-for-gutenberg" ) : "";

		return (
			<Fragment>
				<InspectorControls>
					{ nameInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-email-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
				) }>
					{ isSelected && (
						<div className="uagb-forms-required-wrap">
							<ToggleControl
								label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
								checked={ required }
								onChange={ ( value ) => setAttributes( { required: ! required } ) }
							/>
						</div>
					) }
					<RichText
						tagName="div"
						placeholder={ __( "Email" , "ultimate-addons-for-gutenberg" ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }
						className={ `uagb-forms-email-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>
					<input type="text" className="uagb-forms-email-input uagb-forms-input" placeholder={ placeholder } required={ required } name={ block_id } />
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsEmailEdit;
