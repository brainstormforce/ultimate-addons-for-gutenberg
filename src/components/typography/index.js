/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FontFamilyControl from './font-typography';
import RangeTypographyControl from './range-typography';
import TypographyStyles from './inline-styles';
import './editor.scss';

import { Button, Dashicon } from '@wordpress/components';

// Extend component
import { Component, Fragment } from '@wordpress/element';

// Export for ease of importing in individual blocks.
export { TypographyStyles };

class TypographyControl extends Component {
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

		// Reset Font family to default.
		setAttributes( { [ this.props.fontFamily.label ]: '' } );
		setAttributes( { [ this.props.fontWeight.label ]: '' } );
		setAttributes( { [ this.props.fontSubset.label ]: '' } );

		// Reset Font Size to default.
		setAttributes( { [ this.props.fontSize.label ]: '' } );
		setAttributes( { [ this.props.fontSizeType.label ]: 'px' } );
		setAttributes( { [ this.props.fontSizeMobile.label ]: '' } );
		setAttributes( { [ this.props.fontSizeTablet.label ]: '' } );

		// Reset Line Height to default.
		setAttributes( { [ this.props.lineHeight.label ]: '' } );
		setAttributes( { [ this.props.lineHeightType.label ]: 'em' } );
		setAttributes( { [ this.props.lineHeightMobile.label ]: '' } );
		setAttributes( { [ this.props.lineHeightTablet.label ]: '' } );

		// Reset Google Fonts to default.
		setAttributes( { [ this.props.loadGoogleFonts.label ]: false } );
	}

	render() {
		let fontSize;
		let fontWeight;
		let fontFamily;
		let fontAdvancedControls;
		let fontTypoAdvancedControls;
		let showAdvancedFontControls;
		let resetFontAdvancedControls;

		const {
			disableFontFamily,
			disableFontSize,
			disableLineHeight,
			disableAdvancedOptions = false,
		} = this.props;

		if ( true !== disableFontFamily ) {
			fontFamily = <FontFamilyControl { ...this.props } />;
		}

		if ( true !== disableLineHeight ) {
			fontWeight = (
				<RangeTypographyControl
					type={ this.props.lineHeightType }
					typeLabel={ this.props.lineHeightType.label }
					sizeMobile={ this.props.lineHeightMobile }
					sizeMobileLabel={ this.props.lineHeightMobile.label }
					sizeTablet={ this.props.lineHeightTablet }
					sizeTabletLabel={ this.props.lineHeightTablet.label }
					size={ this.props.lineHeight }
					sizeLabel={ this.props.lineHeight.label }
					sizeMobileText={ __(
						'Line Height',
						'ultimate-addons-for-gutenberg'
					) }
					sizeTabletText={ __(
						'Line Height',
						'ultimate-addons-for-gutenberg'
					) }
					sizeText={ __(
						'Line Height',
						'ultimate-addons-for-gutenberg'
					) }
					steps={ 0.1 }
					{ ...this.props }
				/>
			);
		}

		if ( true !== disableFontSize ) {
			fontSize = (
				<RangeTypographyControl
					type={ this.props.fontSizeType }
					typeLabel={ this.props.fontSizeType.label }
					sizeMobile={ this.props.fontSizeMobile }
					sizeMobileLabel={ this.props.fontSizeMobile.label }
					sizeTablet={ this.props.fontSizeTablet }
					sizeTabletLabel={ this.props.fontSizeTablet.label }
					size={ this.props.fontSize }
					sizeLabel={ this.props.fontSize.label }
					sizeMobileText={
						! this.props.fontSizeLabel
							? __( 'Font Size', 'ultimate-addons-for-gutenberg' )
							: this.props.fontSizeLabel
					}
					sizeTabletText={
						! this.props.fontSizeLabel
							? __( 'Font Size', 'ultimate-addons-for-gutenberg' )
							: this.props.fontSizeLabel
					}
					sizeText={
						! this.props.fontSizeLabel
							? __( 'Font Size', 'ultimate-addons-for-gutenberg' )
							: this.props.fontSizeLabel
					}
					steps={ 0.1 }
					{ ...this.props }
				/>
			);
		}

		if ( true !== disableFontFamily && true !== disableFontSize ) {
			fontAdvancedControls = (
				<Button
					className="uagb-size-btn uagb-typography-control-btn"
					isSmall
					aria-pressed={ this.state !== null }
					onClick={ this.onAdvancedControlClick }
				>
					<Dashicon icon="admin-tools" />
				</Button>
			);

			resetFontAdvancedControls = (
				<Button
					className="uagb-size-btn uagb-typography-reset-btn"
					isSmall
					aria-pressed={ this.state !== null }
					onClick={ this.onAdvancedControlReset }
				>
					<Dashicon icon="image-rotate" />
				</Button>
			);
		} else {
			showAdvancedFontControls = (
				<Fragment>
					{ fontSize }
					{ fontFamily }
					{ fontWeight }
				</Fragment>
			);
		}

		if ( this.state !== null && this.state.showAdvancedControls === true ) {
			showAdvancedFontControls = (
				<div className="uagb-typography-advanced">
					{ fontSize }
					{ fontFamily }
					{ fontWeight }
				</div>
			);
		}

		if ( true !== disableFontFamily && true !== disableFontSize ) {
			fontTypoAdvancedControls = (
				<div className="uag-typography-option-actions">
					<span>{ this.props.label }</span>
					{ fontAdvancedControls }
					{ resetFontAdvancedControls }
				</div>
			);
		}

		return (
			<div className="uag-typography-options">
				{ ! disableAdvancedOptions && (
					<Fragment>
						{ fontTypoAdvancedControls }
						{ showAdvancedFontControls }
					</Fragment>
				) }
			</div>
		);
	}
}

export default TypographyControl;
