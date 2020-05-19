/**
 * WordPress dependencies
 */
 const {
 	Component,
 	Fragment,
 } = wp.element

 const {
	BaseControl,
	Button,
	ButtonGroup,
	PanelRow,
	RangeControl,
	Tooltip,
} = wp.components

const { __ } = wp.i18n

/**
 * Constants
 */
const DEFAULT_OPTIONS = [
	{
		value: "5",
		/* translators: abbreviation for small size */
		label: __( 'S' ),
		tooltip: __( 'Small' ),
	},
	{
		value: "15",
		/* translators: abbreviation for medium size */
		label: __( 'M' ),
		tooltip: __( 'Medium' ),
	},
	{
		value: "20",
		/* translators: abbreviation for large size */
		label: __( 'L' ),
		tooltip: __( 'Large' ),
	},
	{
		value: "30",
		/* translators: abbreviation for extra large size */
		label: __( 'XL' ),
		tooltip: __( 'Extra Large' ),
	},
];

const NONE_OPTION = {
	value: "0",
	label: __( 'None' ),
	tooltip: __( 'None' ),
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

		return ( showAdvancedControls && ( advancedMinValue !== false && advancedMaxValue !== false ) ?

			<RangeControl
				label={ label }
				value={ currentOption }
				onChange={ ( value ) => onChange( value ) }
				min={ advancedMinValue }
				max={ advancedMaxValue }
			/> :

			<BaseControl id={ `uagb-option-selector-${ label }` } label={ label }>
				<PanelRow>
					<ButtonGroup aria-label={ label }>

						{ buttons.map( ( option ) => (
							<Tooltip
								key={ `option-${ option.value }` }
								text={ option.tooltip }>

								<Button
									isLarge
									isSecondary={ currentOption !== option.value }
									isPrimary={ currentOption === option.value }
									aria-pressed={ currentOption === option.value }
									onClick={ () => onChange( option.value ) }
									aria-label={ option.tooltip }>

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