import classnames from 'classnames';
import countryOptions from './country-option';
import React, { useLayoutEffect } from 'react';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

import { ToggleControl } from '@wordpress/components';

import { RichText } from '@wordpress/block-editor';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const { attributes, setAttributes, isSelected } = props;

	const { block_id, phoneRequired, phoneName, pattern } = attributes;

	let phone_html = '';
	if ( pattern != '' ) {
		phone_html = (
			<input
				type="tel"
				placeholder={ placeholder }
				pattern={ pattern }
				required={ phoneRequired }
				className="uagb-forms-phone-input uagb-forms-input"
				name={ block_id }
			/>
		);
	} else {
		phone_html = (
			<input
				type="tel"
				required={ phoneRequired }
				className="uagb-forms-phone-input uagb-forms-input"
				name={ block_id }
			/>
		);
	}

	let placeholder = '';
	if ( pattern == '[0-9]{3}-[0-9]{2}-[0-9]{3}' ) {
		placeholder = __( '123-45-678', 'ultimate-addons-for-gutenberg' );
	} else if ( pattern == '[0-9]{3}-[0-9]{3}-[0-9]{4}' ) {
		placeholder = __( '123-456-6789', 'ultimate-addons-for-gutenberg' );
	}

	const isRequired = phoneRequired
		? __( 'required', 'ultimate-addons-for-gutenberg' )
		: '';

	return (
		<>
			<div
				className={ classnames(
					'uagb-forms-phone-wrap',
					'uagb-forms-field-set',
					`uagb-block-${ block_id }`
				) }
			>
				{ isSelected && (
					<div className="uagb-forms-required-wrap">
						<ToggleControl
							label={ __(
								'Required',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ phoneRequired }
							onChange={ () =>
								setAttributes( {
									phoneRequired: ! phoneRequired,
								} )
							}
						/>
					</div>
				) }
				<RichText
					tagName="div"
					placeholder={ __(
						'Phone Name',
						'ultimate-addons-for-gutenberg'
					) }
					value={ phoneName }
					onChange={ ( value ) =>
						setAttributes( { phoneName: value } )
					}
					className={ `uagb-forms-phone-label ${ isRequired } uagb-forms-input-label` }
					multiline={ false }
					id={ block_id }
				/>
				<select
					className="uagb-forms-input uagb-form-phone-country uagb-form-phone-country-editor"
					id={ `uagb-form-country-${ block_id }` }
					name={ `${ phoneName }[]` }
				>
					{ countryOptions.map( ( o, index ) => (
						<option value={ o.props.value } key={ index }>
							{ o.props.children }
						</option>
					) ) }
				</select>
				{ phone_html }
			</div>
		</>
	);
};
export default React.memo( Render );
