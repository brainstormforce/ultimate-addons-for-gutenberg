/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	RangeControl,
	ButtonGroup,
	Button,
	Dashicon,
} from '@wordpress/components';

import { useSelect, useDispatch } from '@wordpress/data';
/**
 * Build the Measure controls
 *
 * @param props
 * @return {Object} Measure settings.
 */
export default function RangeTypographyControl( props ) {
	const deviceType = useSelect( ( select ) => {
		return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
	}, [] );
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( 'core/edit-post' );
	const customSetPreviewDeviceType = ( device ) => {
		setPreviewDeviceType( device );
	};
	const devices = [
		{
			name: 'Desktop',
			title: <Dashicon icon="desktop" />,
			itemClass: 'uagb-desktop-tab uagb-responsive-tabs',
		},
		{
			name: 'Tablet',
			title: <Dashicon icon="tablet" />,
			itemClass: 'uagb-tablet-tab uagb-responsive-tabs',
		},
		{
			name: 'Mobile',
			key: 'mobile',
			title: <Dashicon icon="smartphone" />,
			itemClass: 'uagb-mobile-tab uagb-responsive-tabs',
		},
	];
	let sizeTypes;

	if ( 'sizeTypes' in props ) {
		sizeTypes = props.sizeTypes;
	} else {
		sizeTypes = [
			{ key: 'px', name: __( 'px', 'ultimate-addons-for-gutenberg' ) },
			{ key: 'em', name: __( 'em', 'ultimate-addons-for-gutenberg' ) },
		];
	}

	const sizeTypesControls = (
		<ButtonGroup
			className="uagb-size-type-field"
			aria-label={ __( 'Size Type', 'ultimate-addons-for-gutenberg' ) }
		>
			{ sizeTypes.map( ( { name, key } ) => (
				<Button
					key={ key }
					className="uagb-size-btn"
					isSmall
					isPrimary={ props.type.value === key }
					aria-pressed={ props.type.value === key }
					onClick={ () =>
						props.setAttributes( { [ props.typeLabel ]: key } )
					}
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	);
	const output = {};
	output.Desktop = (
		<>
			{ sizeTypesControls }
			<RangeControl
				label={ __( props.sizeText ) }
				value={ props.size.value || '' }
				onChange={ ( value ) =>
					props.setAttributes( { [ props.sizeLabel ]: value } )
				}
				min={ 0 }
				max={ 100 }
				step={ props.steps }
				beforeIcon="editor-textcolor"
				allowReset={ true }
				initialPosition={ 30 }
			/>
		</>
	);
	output.Tablet = (
		<>
			{ sizeTypesControls }
			<RangeControl
				label={ __( props.sizeTabletText ) }
				value={ props.sizeTablet.value }
				onChange={ ( value ) =>
					props.setAttributes( { [ props.sizeTabletLabel ]: value } )
				}
				min={ 0 }
				max={ 100 }
				step={ props.steps }
				beforeIcon="editor-textcolor"
				allowReset={ true }
				initialPosition={ 30 }
			/>
		</>
	);
	output.Mobile = (
		<>
			{ sizeTypesControls }
			<RangeControl
				label={ __( props.sizeMobileText ) }
				value={ props.sizeMobile.value }
				onChange={ ( value ) =>
					props.setAttributes( { [ props.sizeMobileLabel ]: value } )
				}
				min={ 0 }
				max={ 100 }
				step={ props.steps }
				beforeIcon="editor-textcolor"
				allowReset={ true }
				initialPosition={ 30 }
			/>
		</>
	);
	return (
		<div className={ 'uag-typography-range-options' }>
			<div className="uagb-size-type-field-tabs">
				<ButtonGroup
					className="components-tab-panel__tabs"
					aria-label={ __(
						'Device',
						'ultimate-addons-for-gutenberg'
					) }
				>
					{ devices.map( ( { name, key, title, itemClass } ) => (
						<Button
							key={ key }
							className={ `components-button components-tab-panel__tabs-item ${ itemClass }${
								name === deviceType ? ' active-tab' : ''
							}` }
							aria-pressed={ deviceType === name }
							onClick={ () => customSetPreviewDeviceType( name ) }
						>
							{ title }
						</Button>
					) ) }
				</ButtonGroup>
				<div className="uagb-responsive-control-inner">
					{ output[ deviceType ]
						? output[ deviceType ]
						: output.Desktop }
				</div>
			</div>
		</div>
	);
}
