/**
 * BLOCK: Forms - Accept - Edit
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
	TextControl,
	TextareaControl,
} = wp.components;

const {
	InspectorControls
} = wp.blockEditor;

class UAGBFormsAcceptEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-accept-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}

	render() {

		const { attributes, setAttributes } = this.props;

		const {
			block_id,
			acceptRequired,
			acceptText,
			showLink,
			linkLabel,
			link,
			linkInNewTab
		} = attributes;
		
		const acceptInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
						checked={ acceptRequired }
						onChange={ ( value ) => setAttributes( { acceptRequired: ! acceptRequired } ) }
					/>					
					<TextareaControl
						label={ __( "Acceptance Text" , "ultimate-addons-for-gutenberg" ) }
						help="Label to display as acceptance message."
						value={ acceptText }
						onChange={ ( value ) => setAttributes( { acceptText: value } ) }
					/>
					<ToggleControl
						label={ __( "Enable Privacy Link" , "ultimate-addons-for-gutenberg" ) }
						checked={ showLink }
						onChange={ ( value ) => setAttributes( { showLink: ! showLink } ) }
					/>
					
					{ showLink &&(
						<Fragment>
							<hr className="uagb-editor__separator" />
							<TextControl
								label={ __( "Link Label" , "ultimate-addons-for-gutenberg" ) }								
								value={ linkLabel }
								onChange={ ( value ) => setAttributes( { linkLabel: value } ) }
							/>
							<TextControl
								className="uagb-forms-editor-privacy-link"
								label={ __( "Link" , "ultimate-addons-for-gutenberg" ) }								
								value={ link }
								onChange={ ( value ) => setAttributes( { link: value } ) }
								help={ ( "" === link )  ?  __( "Enter a valid link." , "ultimate-addons-for-gutenberg" ) : "" }
							/>
							<ToggleControl
								label={ __( "Open in new tab" , "ultimate-addons-for-gutenberg" ) }
								checked={ linkInNewTab }
								onChange={ ( value ) => setAttributes( { linkInNewTab: ! linkInNewTab } ) }
							/>	
						</Fragment>
					) }
				</PanelBody>
			);
		};

		const isRequired = ( acceptRequired ) ? __( "required"  , "ultimate-addons-for-gutenberg" ) : "";
		const target = ( linkInNewTab ) ? __( "_blank"  , "ultimate-addons-for-gutenberg" ) : __( "_self"  , "ultimate-addons-for-gutenberg" ) ;
		return (
			<Fragment>
				<InspectorControls>
					{ acceptInspectorControls() }
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-accept-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
					
				) }>
					{ showLink && (
						<div className="uagb-forms-accept-privacy-link">
							<a href={ link } target={ target } rel="noopener noreferrer" > { linkLabel }  </a>		
						</div>
					) }							
					<input type="checkbox" id={ `uagb-forms-accept-${block_id}` } className="uagb-forms-checkbox" name={ block_id } required={ acceptRequired } value="Agree" />
					<label name={ block_id } htmlFor={ `uagb-forms-accept-${block_id}` } className={ `uagb-forms-accept-label ${isRequired}` } >{ acceptText }</label><br></br>
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsAcceptEdit;
