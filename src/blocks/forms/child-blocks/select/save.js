/**
 * BLOCK: Forms - Select - Save Block
 */

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;

	const { block_id, selectRequired, options, selectName } = attributes;

	const isRequired = selectRequired
		? __( 'required', 'ultimate-addons-for-gutenberg' )
		: '';

	return (
		<div
			className={ classnames(
				'uagb-forms-select-wrap',
				'uagb-forms-field-set',
				`uagb-block-${ block_id }`
			) }
		>
			<RichText.Content
				tagName="div"
				value={ selectName }
				className={ `uagb-forms-select-label ${ isRequired } uagb-forms-input-label` }
				id={ block_id }
			/>
			<select
				className="uagb-forms-select-box uagb-forms-input"
				required={ selectRequired }
				name={ block_id }
			>
				<option value="" disabled selected>
					Select your option
				</option>
				{ options.map( ( o, index ) => {
					return (
						<option key={ index } value={ o.optionvalue }>
							{ o.optiontitle }
						</option>
					);
				} ) }
			</select>
		</div>
	);
}
