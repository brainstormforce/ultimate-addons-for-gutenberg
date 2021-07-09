import React, { useState } from 'react';
import './SelectField.scss';

function SelectField( props ) {
	const {
		name,
		id,
		options,
		onSelect,
		prodata,
	} = props;

	const [ value, setValue ] = useState( props.value );

	function handleChange( e ) {
		setValue( e.target.value );

		// Trigger change
		let changeEvent = new CustomEvent( 'uag:select:change', {
			bubbles: true,
			detail: { e: e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );

		if ( props?.callback ) {
			props.callback( e, props.name, e.target.value );
		}

		if ( onSelect ) {
			onSelect();
		}
	}

	return (
		<div className="uag-field uag-select-option">
			<div className="uag-field__data">
				<div className="uag-field__data--content">
					<select
						className={ props.class }
						name={ name }
						id={ id }
						value={ value }
						onChange={ handleChange }
					>
						{ options &&
							options.map( ( option, i ) => {
								let option_label = option.label,
									disabled = false;

								if ( prodata && option.value in prodata ) {
									option_label = prodata[ option.value ];
									disabled = true;
								}

								if ( option.isopt ) {
									return <optgroup label={ option.title } />;
								}
								return (
									<option
										key={ i }
										value={ option.value }
										disabled={ disabled }
									>
										{ ' ' }
										{ option_label }
									</option>
								);
							} ) }
					</select>
				</div>
			</div>
		</div>
	);
}

export default SelectField;
