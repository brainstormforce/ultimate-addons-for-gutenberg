/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { ButtonGroup, Button, Dashicon } from '@wordpress/components';

// Extend component
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Build the Measure controls
 *
 * @param props
 * @return {Object} Measure settings.
 */
export default function ColumnResponsive( props ) {
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
	const output = {};
	output.Desktop = <></>;
	output.Tablet = <></>;
	output.Mobile = <></>;
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
