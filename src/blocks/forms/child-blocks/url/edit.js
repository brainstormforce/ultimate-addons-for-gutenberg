/**
 * BLOCK: Forms - URL - Edit
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
	TextControl
} = wp.components;
const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

class UAGBFormsUrlEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { attributes, setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-url-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}

	render() {

		const { attributes, setAttributes,isSelected } = this.props;

		const {
			block_id,
			required,
			name,
			placeholder
		} = attributes;
		
		const urlInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
						checked={ required }
						onChange={ ( value ) => setAttributes( { required: ! required } ) }
					/>
					<TextControl
						label={ __( "Placeholder" , "ultimate-addons-for-gutenberg" ) }
						value={ placeholder }
						onChange={ ( value ) => setAttributes( { placeholder: value } ) }
					/>
				</PanelBody>
			);
		};

		const isRequired = ( required ) ? __( "required", "ultimate-addons-for-gutenberg" ) : "";

		return (
			<Fragment>
				<InspectorControls>
					{ urlInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-url-wrap",
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
						placeholder={ __( "URL Name" , "ultimate-addons-for-gutenberg" ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }
						className={ `uagb-forms-url-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>
					<input type="url" name={ block_id } placeholder={ placeholder } required={ required } className="uagb-forms-url-input uagb-forms-input" />					
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsUrlEdit;
