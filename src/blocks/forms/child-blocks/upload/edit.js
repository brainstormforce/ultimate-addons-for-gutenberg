/**
 * BLOCK: Forms - Upload - Edit
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
	FormTokenField
} = wp.components;
const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

class UAGBFormsUploadEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-upload-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}
	
	render() {

		const { attributes, setAttributes,isSelected } = this.props;

		const {
			block_id,
			uploadRequired,
			name,
			formats
		} = attributes;
		
		
		const uploadInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General"  , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required"  , "ultimate-addons-for-gutenberg" ) }
						checked={ uploadRequired }
						onChange={ ( value ) => setAttributes( { uploadRequired: ! uploadRequired } ) }
					/>
					<h2>Allowed Formats</h2>
					<FormTokenField 
						value={ formats } 					
						onChange={ ( value ) => setAttributes( { formats: value } ) }
						placeholder={ __( "Type allowed formats" , "ultimate-addons-for-gutenberg" ) }
					/>
				</PanelBody>
			);
		};

		const isRequired = ( uploadRequired ) ? __( "required" , "ultimate-addons-for-gutenberg" ) : "";

		return (
			<Fragment>
				<InspectorControls>
					{ uploadInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-upload-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
					
				) }>
					{ isSelected && (
						<div className="uagb-forms-required-wrap">
							<ToggleControl
								label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
								checked={ uploadRequired }
								onChange={ ( value ) => setAttributes( { uploadRequired: ! uploadRequired } ) }
							/>
						</div>
					) }
					<RichText
						tagName="div"
						placeholder={ __( "Name" , "ultimate-addons-for-gutenberg" ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }
						className={ `uagb-forms-upload-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>					
					<input type="file" name={ block_id } className="uagb-forms-upload-input" disabled required={ uploadRequired } />
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsUploadEdit;
