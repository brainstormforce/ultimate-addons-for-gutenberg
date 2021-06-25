import hexToRgba from '@Controls/hexToRgba';
import { __ } from '@wordpress/i18n';
import { __experimentalPanelColorGradientSettings } from '@wordpress/block-editor';

function GradientSettings( { attributes, setAttributes } ) {
	const {
		gradientValue,
		gradientAngle,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientPosition,
		gradientType,
	} = attributes;

	//set the gradient value to settings if new gradientvalue is not set
	if ( '' === gradientValue ) {
		const rgb_gradientColor1 = hexToRgba( gradientColor1 );
		const rgb_gradientColor2 = hexToRgba( gradientColor2 );

		if ( 'linear' === gradientType ) {
			var value = `linear-gradient(${ gradientAngle }deg,${ rgb_gradientColor1 } ${ gradientLocation1 }%, ${ rgb_gradientColor2 } ${ gradientLocation2 }%)`;
			setAttributes( { gradientValue: value } );
		} else {
			var value = `radial-gradient(at ${ gradientPosition }, ${ rgb_gradientColor1 } ${ gradientLocation1 }%, ${ rgb_gradientColor2 } ${ gradientLocation2 }%)`;
			setAttributes( { gradientValue: value } );
		}
	}

	const onGradientChange = ( value ) => {
		setAttributes( { gradientValue: value } );
		setAttributes( {
			gradientAngle: '',
			gradientColor1: '',
			gradientColor2: '',
			gradientLocation1: '',
			gradientLocation2: '',
		} );
	};

	return (
		<__experimentalPanelColorGradientSettings
			title={ __( 'Color Settings', 'ultimate-addons-for-gutenberg' ) }
			initialOpen={ true }
			settings={ [
				{
					label: __(
						'Overlay Color',
						'ultimate-addons-for-gutenberg'
					),
					gradientValue,
					onGradientChange,
				},
			] }
		/>
	);
}

export default GradientSettings;
