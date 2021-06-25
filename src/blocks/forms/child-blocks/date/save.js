/**
 * BLOCK: Forms - Date - Save Block
 */

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;

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

	let validation_min_value = '';
	let validation_max_value = '';

	if ( minYear && minMonth && minDay ) {
		validation_min_value = minYear + '-' + minMonth + '-' + minDay;
	}

	if ( maxYear && maxMonth && maxDay ) {
		validation_max_value = maxYear + '-' + maxMonth + '-' + maxDay;
	}

	let date_html = '';
	if ( additonalVal ) {
		date_html = (
			<input
				type="date"
				className="uagb-forms-date-input uagb-forms-input"
				required={ dateRequired }
				min={ validation_min_value }
				max={ validation_max_value }
				name={ block_id }
			/>
		);
	} else {
		date_html = (
			<input
				type="date"
				className="uagb-forms-date-input uagb-forms-input"
				required={ dateRequired }
				name={ block_id }
			/>
		);
	}
	const isRequired = dateRequired
		? __( 'required', 'ultimate-addons-for-gutenberg' )
		: '';

	return (
		<div
			className={ classnames(
				'uagb-forms-date-wrap',
				'uagb-forms-field-set',
				`uagb-block-${ block_id }`
			) }
		>
			<RichText.Content
				tagName="div"
				value={ name }
				className={ `uagb-forms-date-label ${ isRequired } uagb-forms-input-label` }
				id={ block_id }
			/>
			{ date_html }
		</div>
	);
}
