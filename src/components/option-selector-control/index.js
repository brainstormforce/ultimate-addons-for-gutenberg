/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';

import {
	BaseControl,
	Button,
	ButtonGroup,
	PanelRow,
	RangeControl,
	Tooltip,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

/**
 * Constants
 */
const DEFAULT_OPTIONS = [
	{
		value: '5',
		/* translators: abbreviation for small size */
		label: __( 'S', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Small', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '15',
		/* translators: abbreviation for medium size */
		label: __( 'M', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Medium', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '20',
		/* translators: abbreviation for large size */
		label: __( 'L', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Large', 'ultimate-addons-for-gutenberg' ),
	},
	{
		value: '30',
		/* translators: abbreviation for extra large size */
		label: __( 'XL', 'ultimate-addons-for-gutenberg' ),
		tooltip: __( 'Extra Large', 'ultimate-addons-for-gutenberg' ),
	},
];

const NONE_OPTION = {
	value: '0',
	label: __( 'None', 'ultimate-addons-for-gutenberg' ),
	tooltip: __( 'None', 'ultimate-addons-for-gutenberg' ),
};

export default class OptionSelectorControl extends Component {
	render() {
		const {
			advancedMaxValue,
			advancedMinValue,
			currentOption,
			label,
			onChange,
			options,
			showAdvancedControls,
			showIcons,
			showNoneOption,
		} = this.props;

		let buttons = options || DEFAULT_OPTIONS;

		if ( showNoneOption ) {
			buttons = [ NONE_OPTION, ...buttons ];
		}

		return showAdvancedControls &&
			advancedMinValue !== false &&
			advancedMaxValue !== false ? (
			<RangeControl
				label={ label }
				value={ currentOption }
				onChange={ ( value ) => onChange( value ) }
				min={ advancedMinValue }
				max={ advancedMaxValue }
			/>
		) : (
			<BaseControl
				id={ `uagb-option-selector-${ label }` }
				label={ label }
			>
				<PanelRow>
					<ButtonGroup aria-label={ label }>
						{ buttons.map( ( option ) => (
							<Tooltip
								key={ `option-${ option.value }` }
								text={ option.tooltip }
							>
								<Button
									isLarge
									isSecondary={
										currentOption !== option.value
									}
									isPrimary={ currentOption === option.value }
									aria-pressed={
										currentOption === option.value
									}
									onClick={ () => onChange( option.value ) }
									aria-label={ option.tooltip }
								>
									{ showIcons ? option.icon : option.label }
								</Button>
							</Tooltip>
						) ) }
					</ButtonGroup>
				</PanelRow>
			</BaseControl>
		);
	}
}
