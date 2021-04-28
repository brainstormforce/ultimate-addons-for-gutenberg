/**
 * BLOCK: Forms - Textarea - Edit
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
	RangeControl,
	TextControl
} = wp.components;
const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

class UAGBFormsTextareaEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-textarea-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}

	render() {

		const { attributes, setAttributes, isSelected } = this.props;

		const {
			block_id,
			textareaRequired,
			textareaName,
			rows,
			placeholder
		} = attributes;
		
		const textareaInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
						checked={ textareaRequired }
						onChange={ ( value ) => setAttributes( { textareaRequired: ! textareaRequired } ) }
					/>
					<TextControl
						label={ __( "Placeholder", "ultimate-addons-for-gutenberg" ) }
						value={ placeholder }
						onChange={ ( value ) => setAttributes( { placeholder: value } ) }
					/>
					<RangeControl
						label={ __( "Number of lines" , "ultimate-addons-for-gutenberg" ) }
						value={ rows }
						onChange={ ( value ) => setAttributes( { rows: value } ) }
						min={ 2 }
						max={ 10 }
						allowReset
					/>
				</PanelBody>
			);
		};

		const isRequired = ( textareaRequired ) ? __( "required", "ultimate-addons-for-gutenberg" ) : "";

		return (
			<Fragment>
				<InspectorControls>
					{ textareaInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-textarea-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
				) }>
					{ isSelected && (
						<div className="uagb-forms-required-wrap">
							<ToggleControl
								label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
								checked={ textareaRequired }
								onChange={ ( value ) => setAttributes( { textareaRequired: ! textareaRequired } ) }
							/>
						</div>
					) }
					<RichText
						tagName="div"
						placeholder={ __( "Textarea Name" , "ultimate-addons-for-gutenberg" ) }
						value={ textareaName }
						onChange={ ( value ) => setAttributes( { textareaName: value } ) }
						className={ `uagb-forms-textarea-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>					
					<textarea required={ textareaRequired } className="uagb-forms-textarea-input uagb-forms-input" rows={ rows } placeholder={ placeholder } name={ block_id }></textarea>
					
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsTextareaEdit;
