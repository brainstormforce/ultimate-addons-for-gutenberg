/**
 * BLOCK: Forms - Toggle - Save Block
 */

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;

	const {
		block_id,
		toggleRequired,
		name,
		toggleStatus,
		layout,
		trueValue,
		falseValue,
	} = attributes;

	const isRequired = toggleRequired
		? __( 'required', 'ultimate-addons-for-gutenberg' )
		: '';

	return (
		<div
			className={ classnames(
				'uagb-forms-toggle-wrap',
				'uagb-forms-field-set',
				`uagb-block-${ block_id }`
			) }
		>
			<RichText.Content
				tagName="div"
				value={ name }
				className={ `uagb-forms-toggle-label ${ isRequired } uagb-forms-input-label` }
				id={ block_id }
			/>
			<label className="uagb-switch" id="uag-form">
				<input
					type="hidden"
					className="uagb-forms-toggle-input"
					checked={ toggleStatus }
					data-truestate={ trueValue }
					data-falsestate={ falseValue }
					value={ toggleStatus ? trueValue : falseValue }
					required={ toggleRequired }
					name={ block_id }
				/>
				<input
					type="checkbox"
					className="uagb-forms-toggle-input"
					checked={ toggleStatus }
					data-truestate={ trueValue }
					data-falsestate={ falseValue }
					value={ toggleStatus ? trueValue : falseValue }
					required={ toggleRequired }
					name={ block_id }
				/>
				<span className={ `uagb-slider ${ layout }` }></span>
			</label>
		</div>
	);
}
