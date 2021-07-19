import ReactHtmlParser from 'react-html-parser';
import { ToggleControl } from '@wordpress/components';
import './ToggleField.scss';
import { __ } from '@wordpress/i18n';
function ToggleField( props ) {
	const { name, id, label, value, desc } = props;

	const checked = 'disabled' === value ? false : true;

	function handleCheckboxClick( e ) {
		const checkedValue = e ? 'enabled' : 'disabled';
		// Trigger change
		const changeEvent = new CustomEvent( 'uag:toggle:change', {
			bubbles: true,
			detail: { e, name, value: checkedValue, id },
		} );

		document.dispatchEvent( changeEvent );
	}

	return (
		<div className="uag-field uag-toggle-field">
			<div className="uag-field__data">
				<ToggleControl
					className={ props.class }
					name={ name }
					id={ id ? id : name }
					label={ label }
					checked={ checked }
					onChange={ handleCheckboxClick }
				/>
			</div>
			{ name == '_uag_common[blocks_activation_and_deactivation]' && (
				<>
					<a>
						{ __( 'Live Demo', 'ultimate-addons-for-gutenberg' ) }
					</a>
					<a target="_blank">
						{ __(
							'Documentation',
							'ultimate-addons-for-gutenberg'
						) }
					</a>
				</>
			) }

			{ desc && (
				<div className="uag-field__desc">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default ToggleField;
