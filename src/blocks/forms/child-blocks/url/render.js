import classnames from 'classnames';
import React from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

import { RichText } from '@wordpress/block-editor';

const Render = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes, isSelected } = props;

	const { block_id, required, name, placeholder } = attributes;

	const isRequired = required
		? __( 'required', 'ultimate-addons-for-gutenberg' )
		: '';

	return (
		<>
			<div
				className={ classnames(
					'uagb-forms-url-wrap',
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
							checked={ required }
							onChange={ () =>
								setAttributes( { required: ! required } )
							}
						/>
					</div>
				) }
				<RichText
					tagName="div"
					placeholder={ __(
						'URL Name',
						'ultimate-addons-for-gutenberg'
					) }
					value={ name }
					onChange={ ( value ) => setAttributes( { name: value } ) }
					className={ `uagb-forms-url-label ${ isRequired } uagb-forms-input-label` }
					multiline={ false }
					id={ block_id }
				/>
				<input
					type="url"
					name={ block_id }
					placeholder={ placeholder }
					required={ required }
					className="uagb-forms-url-input uagb-forms-input"
				/>
			</div>
		</>
	);
};
export default React.memo( Render );
