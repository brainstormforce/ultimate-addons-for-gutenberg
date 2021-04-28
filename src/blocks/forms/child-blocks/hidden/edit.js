/**
 * BLOCK: Forms - hidden - Edit
 */

import classnames from "classnames";

const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;
const {
	PanelBody,	
	TextControl,
} = wp.components;
const {
	InspectorControls
} = wp.blockEditor;

class UAGBFormsHiddenEdit extends Component {
	
	constructor() {
		super( ...arguments );
		this.changeHiddenName 		= this.changeHiddenName.bind( this );
	}
	
	componentDidMount() {
		
		const { attributes, setAttributes } = this.props;
		
		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-hidden-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}

	changeHiddenName  ( value ) {
		const { setAttributes } = this.props;
		setAttributes( { hidden_field_name: value.target.value } );
	}

	render() {
		
		const { attributes,setAttributes } = this.props;
		
		const {
			block_id,
			hidden_field_name,
			hidden_field_value,
		} = attributes;
		
		const hiddenFieldSettings = () => {
			
			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>

					<TextControl
						label={ __( "Value" , "ultimate-addons-for-gutenberg" ) }
						value={ hidden_field_value }
						onChange={ ( hidden_field_value ) =>setAttributes( { hidden_field_value } ) }
					/>				
				
				</PanelBody>
			);
		};

			
		const hidden_field_label = hidden_field_name.replace( /\s+/g, "-" ).toLowerCase();
		return (
			<Fragment>
				<InspectorControls>
					{ hiddenFieldSettings() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-hidden-wrap",
					`uagb-block-${ block_id }`,
				) }>
					{ /* Edit View */ }
					{ this.props.isSelected && (
						<input type="text"  className="uagb-forms-hidden-input"  onChange={ this.changeHiddenName }  value={ hidden_field_name } />
					) }
					{ /* Hidden Field View */ }
					{ !this.props.isSelected && (
						<Fragment>
							<label className={ `uagb-forms-hidden-label uagb-form-hidden-${hidden_field_label}` }> { __( hidden_field_name , "ultimate-addons-for-gutenberg" ) } </label>
							<input type="hidden"  className="uagb-forms-hidden-input" value={ hidden_field_value } />
						</Fragment>
					) }
					
				</div>
			</Fragment>
		);
	}
}
			
export default UAGBFormsHiddenEdit;
			