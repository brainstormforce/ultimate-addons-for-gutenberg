/**
 * Box-Shadow reusable component.
 *
 */
import { __ } from '@wordpress/i18n';

import { ColorPalette } from '@wordpress/block-editor';

import {
	Button,
	SelectControl,
	RangeControl,
	Dashicon,
} from '@wordpress/components';

// Extend component
import { Component, Fragment } from '@wordpress/element';

class BoxShadowControl extends Component {
	constructor() {
		super( ...arguments );
		this.onAdvancedControlClick = this.onAdvancedControlClick.bind( this );
		this.onAdvancedControlReset = this.onAdvancedControlReset.bind( this );
	}
	onAdvancedControlClick() {
		let control = true;
		let label = __( 'Hide Advanced', 'ultimate-addons-for-gutenberg' );

		if ( this.state !== null && this.state.showAdvancedControls === true ) {
			control = false;
			label = __( 'Advanced', 'ultimate-addons-for-gutenberg' );
		}

		this.setState( {
			showAdvancedControls: control,
			showAdvancedControlsLabel: label,
		} );
	}
	onAdvancedControlReset() {
		const { setAttributes } = this.props;

		setAttributes( { boxShadowColor: '' } );
		setAttributes( { boxShadowHOffset: '' } );
		setAttributes( { boxShadowVOffset: '' } );
		setAttributes( { boxShadowBlur: '' } );
		setAttributes( { boxShadowSpread: '' } );
		setAttributes( { boxShadowPosition: '' } );
	}
	render() {
		const {
			setAttributes,
			boxShadowColor,
			boxShadowHOffset,
			boxShadowVOffset,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowPosition,
		} = this.props;

		let advancedControls;
		let boxShadowAdvancedControls;
		let resetBoxShadowAdvancedControls;
		if ( this.state !== null && true === this.state.showAdvancedControls ) {
			advancedControls = (
				<div className="uagb-box-shadow-advanced">
					<Fragment>
						<p className="uagb-setting-label">
							{ boxShadowColor.label }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: boxShadowColor.value,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ boxShadowColor.value }
							onChange={ ( colorValue ) =>
								setAttributes( { boxShadowColor: colorValue } )
							}
							allowReset
						/>
					</Fragment>
					<Fragment>
						<h2>{ boxShadowHOffset.label }</h2>
						<RangeControl
							value={ boxShadowHOffset.value }
							onChange={ ( value ) =>
								setAttributes( { boxShadowHOffset: value } )
							}
							min={ -100 }
							max={ 100 }
							allowReset
						/>
					</Fragment>
					<Fragment>
						<h2>{ boxShadowVOffset.label }</h2>
						<RangeControl
							value={ boxShadowVOffset.value }
							onChange={ ( value ) =>
								setAttributes( { boxShadowVOffset: value } )
							}
							min={ -100 }
							max={ 100 }
							allowReset
						/>
					</Fragment>
					<Fragment>
						<h2>{ boxShadowBlur.label }</h2>
						<RangeControl
							value={ boxShadowBlur.value }
							onChange={ ( value ) =>
								setAttributes( { boxShadowBlur: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</Fragment>
					<Fragment>
						<h2>{ boxShadowSpread.label }</h2>
						<RangeControl
							value={ boxShadowSpread.value }
							onChange={ ( value ) =>
								setAttributes( { boxShadowSpread: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</Fragment>
					<Fragment>
						<SelectControl
							label={ boxShadowPosition.label }
							value={ boxShadowPosition.value }
							onChange={ ( value ) =>
								setAttributes( { boxShadowPosition: value } )
							}
							options={ [
								{
									value: 'inset',
									label: __(
										'Inset',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'outset',
									label: __(
										'Outset',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
					</Fragment>
				</div>
			);
		}
		resetBoxShadowAdvancedControls = (
			<Button
				className="uagb-size-btn uagb-typography-reset-btn"
				isSmall
				aria-pressed={ this.state !== null }
				onClick={ this.onAdvancedControlReset }
			>
				<Dashicon icon="image-rotate" />
			</Button>
		);

		boxShadowAdvancedControls = (
			<Button
				className="uagb-size-btn uagb-typography-control-btn"
				isSmall
				aria-pressed={ this.state !== null }
				onClick={ this.onAdvancedControlClick }
			>
				<Dashicon icon="admin-tools" />
			</Button>
		);

		return (
			<div className="uag-typography-option-actions">
				<span>{ this.props.label }</span>
				{ boxShadowAdvancedControls }
				{ resetBoxShadowAdvancedControls }
				{ advancedControls }
			</div>
		);
	}
}

export default BoxShadowControl;
