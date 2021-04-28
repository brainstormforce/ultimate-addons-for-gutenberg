/**
 * BLOCK: Forms - Date - Edit
 */

import classnames from "classnames";

const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	PanelBody,
	SelectControl,
	ToggleControl
} = wp.components;
const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

class UAGBFormsDateEdit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { setAttributes } = this.props;

		// Assigning block_id in the attribute.
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-forms-date-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
		
	}
	
	render() {

		const { attributes, setAttributes,isSelected } = this.props;

		const {
			block_id,
			dateRequired,
			name,
			additonalVal,
			minYear,
			minMonth,
			minDay,
			maxYear,
			maxMonth,
			maxDay,			
		} = attributes;

		let validation_min_value = "";
		let validation_max_value = "";

		if ( minYear && minMonth && minDay ){
			validation_min_value = minYear+"-"+minMonth+"-"+minDay;			
		}

		if ( maxYear && maxMonth && maxDay ){	
			validation_max_value = maxYear+"-"+maxMonth+"-"+maxDay;	
		}

		let invalidDateErrorMsg = "";
		const start = Date.parse( validation_min_value );
		const end = Date.parse( validation_max_value );

		if ( start > end ) {
			invalidDateErrorMsg = <p className="uagb-forms-date-invalidate">Invalid date range selected</p>;			
		}

		

		const YearDefaults = [{ label: "YYYY", value: "" }];

		for ( var i = 1930; i <= 2030; i++ ) {
			YearDefaults.push( { label: `${i}`, value: `${i}` } );
		}	
				 
		
		const MonthsDefaults = [{ label: "MM", value: "" }];

		for ( var i = 1; i <= 12; i++ ) {
			const twoDigitMonth = ( i < 10 ) ? `0${i}` : `${i}` ;
			MonthsDefaults.push( { label: twoDigitMonth, value: twoDigitMonth } );
		}
		
		const dateDefaults = [{ label: "DD", value: "" }];

		for ( var i = 1; i <= 31; i++ ) {
			const twoDigitDate = ( i < 10 ) ? `0${i}` : `${i}` ;
			dateDefaults.push( { label: twoDigitDate, value: twoDigitDate } );
		}
		

		const dateInspectorControls = () => {

			return (
				<PanelBody
					title={ __( "General" , "ultimate-addons-for-gutenberg" ) }
					initialOpen={ true }
					className="uagb__url-panel-body"
				>
					<ToggleControl
						label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
						checked={ dateRequired }
						onChange={ ( value ) => setAttributes( { dateRequired: ! dateRequired } ) }
					/>
					<ToggleControl
						label={ __( "Additional Validation" , "ultimate-addons-for-gutenberg" ) }
						checked={ additonalVal }
						onChange={ ( value ) => setAttributes( { additonalVal: ! additonalVal } ) }
						help={ __( "Helps to set range of calender" , "ultimate-addons-for-gutenberg" ) }
					/>
					{ additonalVal && (
						<Fragment>
							<p>From :</p>
							<SelectControl
								className={ "minDate" }		
								label="Year"
								value={ minYear }
								options={ YearDefaults }
								onChange={ ( minYear ) => setAttributes( { minYear } ) }
							/>
							<b> - </b>
							<SelectControl
								className={ "minDate" }		
								label="Month"
								value={ minMonth }
								options={ MonthsDefaults }
								onChange={ ( minMonth ) => setAttributes( { minMonth } ) }
							/>
							<b> - </b>							
							<SelectControl
								className={ "minDate" }		
								label="Date"
								value={ minDay }
								options={ dateDefaults }
								onChange={ ( minDay ) => setAttributes( { minDay } ) }
							/>
							<p>To :</p>
							<SelectControl
								className={ "maxDate" }		
								label="Year"
								value={ maxYear }
								options={ YearDefaults }
								onChange={ ( maxYear ) => setAttributes( { maxYear } ) }
							/>
							<b> - </b>
							<SelectControl
								className={ "maxDate" }		
								label="Month"
								value={ maxMonth }
								options={ MonthsDefaults }
								onChange={ ( maxMonth ) => setAttributes( { maxMonth } ) }
							/>
							<b> - </b>							
							<SelectControl
								className={ "maxDate" }		
								label="Date"
								value={ maxDay }
								options={ dateDefaults }
								onChange={ ( maxDay ) => setAttributes( { maxDay } ) }
							/>
							{ invalidDateErrorMsg }
						</Fragment>
					) }				
				</PanelBody>
			);
		};
		
	

		let date_html = "";
		if ( additonalVal ){
			date_html = <input type="date" className="uagb-forms-date-input uagb-forms-input" required={ dateRequired } min={ validation_min_value } max={ validation_max_value } name={ block_id } />;		
		} else {
			date_html = <input type="date" className="uagb-forms-date-input uagb-forms-input" required={ dateRequired } name={ block_id } />;
		}

	 
		const isRequired = ( dateRequired ) ? __( "required", "ultimate-addons-for-gutenberg" ) : "";
	
		return (
			<Fragment>
				<InspectorControls>
					{ dateInspectorControls() }					
				</InspectorControls>
				<div className={ classnames(
					"uagb-forms-date-wrap",
					"uagb-forms-field-set",
					`uagb-block-${ block_id }`,
					
				) }>
					{ isSelected && (
						<div className="uagb-forms-required-wrap">
							<ToggleControl
								label={ __( "Required" , "ultimate-addons-for-gutenberg" ) }
								checked={ dateRequired }
								onChange={ ( value ) => setAttributes( { dateRequired: ! dateRequired } ) }
							/>
						</div>
					) }
					<RichText
						tagName="div"
						placeholder={ __( "Date" , "ultimate-addons-for-gutenberg" ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }						
						className={ `uagb-forms-date-label ${isRequired} uagb-forms-input-label` }
						multiline={ false }
						id={ block_id }
					/>	
					{ date_html }									
				</div>
			</Fragment>
		);
	}
}

export default UAGBFormsDateEdit;
