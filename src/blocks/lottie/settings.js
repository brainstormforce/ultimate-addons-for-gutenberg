import React from 'react';
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	ColorPalette,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TabPanel,
	Dashicon,
	SelectControl,
	ToolbarGroup,
} from '@wordpress/components';

const Settings = ( props ) => {
	const { loopLottie, reverseDirection } = props;

	props = props.parentProps;

	const { setAttributes, attributes } = props;

	const {
		align,
		height,
		heightTablet,
		heightMob,
		width,
		widthTablet,
		widthMob,
		backgroundColor,
		loop,
		speed,
		reverse,
		jsonLottie,
		lottieURl,
		playOn,
		backgroundHColor,
	} = attributes;

	const controlsSettings = (
		<PanelBody
			title={ __( 'Controls', 'ultimate-addons-for-gutenberg' ) }
			initialOpen={ true }
		>
			<SelectControl
				label={ __( 'Play On', 'ultimate-addons-for-gutenberg' ) }
				value={ playOn }
				onChange={ ( value ) => setAttributes( { playOn: value } ) }
				options={ [
					{
						value: 'none',
						label: __( 'None', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'hover',
						label: __(
							'On Hover',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: 'click',
						label: __(
							'On Click',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: 'scroll',
						label: __(
							'Viewport',
							'ultimate-addons-for-gutenberg'
						),
					},
				] }
				help={
					'scroll' === playOn
						? __(
								"This setting will only take effect once you are on the live page, and not while you're editing.",
								'ultimate-addons-for-gutenberg'
						  )
						: ''
				}
			/>
			<ToggleControl
				label={ __( 'Loop', 'ultimate-addons-for-gutenberg' ) }
				checked={ loop }
				onChange={ loopLottie }
				help={ __(
					"Enabling this will show the animation in the loop. This setting will only take effect once you are on the live page, and not while you're editing."
				) }
			/>
			<RangeControl
				label={ __( 'Speed', 'ultimate-addons-for-gutenberg' ) }
				value={ speed }
				onChange={ ( value ) => setAttributes( { speed: value } ) }
				min={ 1 }
				max={ 50 }
				allowReset
			/>
			{ loop && (
				<ToggleControl
					label={ __( 'Reverse', 'ultimate-addons-for-gutenberg' ) }
					checked={ reverse }
					onChange={ reverseDirection }
					help={ __(
						'Direction of animation.',
						'ultimate-addons-for-gutenberg'
					) }
				/>
			) }
		</PanelBody>
	);

	const styleSettings = (
		<PanelBody
			title={ __( 'Style', 'ultimate-addons-for-gutenberg' ) }
			initialOpen={ false }
		>
			<TabPanel
				className="uagb-size-type-field-tabs uagb-without-size-type"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'desktop',
						title: <Dashicon icon="desktop" />,
						className: 'uagb-desktop-tab uagb-responsive-tabs',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'uagb-tablet-tab uagb-responsive-tabs',
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'uagb-mobile-tab uagb-responsive-tabs',
					},
				] }
			>
				{ ( tab ) => {
					let tabout;

					if ( 'mobile' === tab.name ) {
						tabout = (
							<RangeControl
								label={ __(
									'Width',
									'ultimate-addons-for-gutenberg'
								) }
								value={ widthMob }
								onChange={ ( value ) =>
									setAttributes( { widthMob: value } )
								}
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
						);
					} else if ( 'tablet' === tab.name ) {
						tabout = (
							<RangeControl
								label={ __(
									'Width',
									'ultimate-addons-for-gutenberg'
								) }
								value={ widthTablet }
								onChange={ ( value ) =>
									setAttributes( { widthTablet: value } )
								}
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
						);
					} else {
						tabout = (
							<RangeControl
								label={ __(
									'Width',
									'ultimate-addons-for-gutenberg'
								) }
								value={ width }
								onChange={ ( value ) =>
									setAttributes( { width: value } )
								}
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
						);
					}

					return <div>{ tabout }</div>;
				} }
			</TabPanel>
			<TabPanel
				className="uagb-size-type-field-tabs uagb-without-size-type"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'desktop',
						title: <Dashicon icon="desktop" />,
						className: 'uagb-desktop-tab uagb-responsive-tabs',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'uagb-tablet-tab uagb-responsive-tabs',
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'uagb-mobile-tab uagb-responsive-tabs',
					},
				] }
			>
				{ ( tab ) => {
					let tabout;

					if ( 'mobile' === tab.name ) {
						tabout = (
							<RangeControl
								label={ __(
									'Height',
									'ultimate-addons-for-gutenberg'
								) }
								value={ heightMob }
								onChange={ ( value ) =>
									setAttributes( { heightMob: value } )
								}
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
						);
					} else if ( 'tablet' === tab.name ) {
						tabout = (
							<RangeControl
								label={ __(
									'Height',
									'ultimate-addons-for-gutenberg'
								) }
								value={ heightTablet }
								onChange={ ( value ) =>
									setAttributes( { heightTablet: value } )
								}
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
						);
					} else {
						tabout = (
							<RangeControl
								label={ __(
									'Height',
									'ultimate-addons-for-gutenberg'
								) }
								value={ height }
								onChange={ ( value ) =>
									setAttributes( { height: value } )
								}
								min={ 0 }
								max={ 1000 }
								allowReset
							/>
						);
					}

					return <div>{ tabout }</div>;
				} }
			</TabPanel>
			<br></br>
			<h2>{ __( 'Alignment', 'ultimate-addons-for-gutenberg' ) }</h2>
			<BlockAlignmentToolbar
				value={ align }
				onChange={ ( value ) =>
					setAttributes( {
						align: value,
					} )
				}
				controls={ [ 'left', 'center', 'right' ] }
				isCollapsed={ false }
			/>
			<br></br>
			<p className="uagb-setting-label">
				{ __( 'Background Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ backgroundColor }
				onChange={ ( value ) =>
					setAttributes( { backgroundColor: value } )
				}
				allowReset
			/>
			<p className="uagb-setting-label">
				{ __(
					'Background Hover Color',
					'ultimate-addons-for-gutenberg'
				) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: backgroundHColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ backgroundHColor }
				onChange={ ( value ) =>
					setAttributes( { backgroundHColor: value } )
				}
				allowReset
			/>
		</PanelBody>
	);

	const onSelectLottieJSON = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { jsonLottie: null } );
			return;
		}

		setAttributes( { jsonLottie: media } );
		setAttributes( { lottieURl: media.url } );
	};

	//Check if given url is valid or not for json extension.
	let validJsonPath = 'invalid';
	if ( lottieURl && lottieURl.endsWith( '.json' ) ) {
		validJsonPath = 'valid';
	}
	if ( ! uagb_blocks_info.uagb_mime_type ) {
		return (
			<div className="uagb-show-notice">
				<span>
					{ __(
						'Lottie block requires the file type JSON to be uploaded to media files. Seems like your website has disabled this file type. Please refer',
						'ultimate-addons-for-gutenberg'
					) }
					<a
						href={ `${ uagb_blocks_info.uagb_site_url }/docs/lottie/?utm_source=uagb-dashboard&utm_medium=uagb-editor-page&utm_campaign=uagb-plugin` }
						target="__blank"
					>
						{ ' ' }
						{ __( 'this document' ) }{ ' ' }
					</a>
					{ __( 'to know more about it.' ) }
				</span>
			</div>
		);
	}

	if ( validJsonPath === 'invalid' ) {
		const lottie_url = (
			<span>
				{ ' ' }
				{ __(
					'Allows you to add fancy animation i.e Lottie to your website. You can see sample Lottie animations',
					'ultimate-addons-for-gutenberg'
				) }
				<a href="https://lottiefiles.com/" target="__blank">
					{ ' ' }
					{ __( 'here on this' ) }{ ' ' }
				</a>
				{ __( 'website.' ) }
			</span>
		);

		return (
			<div className="uagb-lottie_upload_wrap">
				<MediaPlaceholder
					labels={ {
						title: __( 'Lottie', 'ultimate-addons-for-gutenberg' ),
						instructions: lottie_url,
					} }
					allowedTypes={ [ 'application/json' ] }
					accept={ [ 'application/json' ] }
					value={ jsonLottie }
					onSelectURL={ ( value ) =>
						setAttributes( { lottieURl: value } )
					}
					onSelect={ onSelectLottieJSON }
				/>
			</div>
		);
	}

	const getBlockControls = () => {
		return (
			<BlockControls>
				<ToolbarGroup>
					<MediaReplaceFlow
						mediaURL={ lottieURl }
						allowedTypes={ [ 'application/json' ] }
						accept={ [ 'application/json' ] }
						onSelectURL={ ( value ) =>
							setAttributes( { lottieURl: value } )
						}
						onSelect={ onSelectLottieJSON }
					/>
				</ToolbarGroup>
			</BlockControls>
		);
	};

	return (
		<>
			{ validJsonPath === 'valid' && getBlockControls() }
			<InspectorControls>
				{ controlsSettings }
				{ styleSettings }
			</InspectorControls>
		</>
	);
};

export default React.memo( Settings );
