/**
 * BLOCK: Social Share - Settings.
 */

// Import classes
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import renderSVG from '@Controls/renderIcon';
import { __ } from '@wordpress/i18n';
import React from 'react';
import {
	InspectorControls,
	MediaUpload,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Button,
	TabPanel,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const {
		type,
		image_icon,
		icon,
		image,
		icon_color,
		icon_hover_color,
		icon_bg_color,
		icon_bg_hover_color,
	} = attributes;

	const onChangeType = ( value ) => {
		const icon_mapping = {
			facebook: 'fab fa-facebook',
			twitter: 'fab fa-twitter-square',
			google: 'fab fa-google-plus-square',
			pinterest: 'fab fa-pinterest-square',
			linkedin: 'fab fa-linkedin',
			digg: 'fab fa-digg',
			blogger: 'fab fa-blogger',
			reddit: 'fab fa-reddit-square',
			stumbleupon: 'fab fa-stumbleupon-circle',
			tumblr: 'fab fa-tumblr-square',
			myspace: 'fas fa-user-friends',
			email: 'fas fa-envelope',
			pocket: 'fab fa-get-pocket',
			vk: 'fab fa-vk',
			odnoklassniki: 'fab fa-odnoklassniki',
			skype: 'fab fa-skype',
			telegram: 'fab fa-telegram',
			whatsapp: 'fab fa-whatsapp',
			xing: 'fab fa-xing',
			buffer: 'fab fa-buffer',
		};

		setAttributes( { type: value } );

		setAttributes( { icon: icon_mapping[ value ] } );
	};

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Type' ) }
					value={ type }
					options={ [
						{
							value: 'facebook',
							label: __(
								'Facebook',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'twitter',
							label: __(
								'Twitter',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'google',
							label: __(
								'Google Currents',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'pinterest',
							label: __(
								'Pinterest',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'linkedin',
							label: __(
								'LinkedIn',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'digg',
							label: __(
								'Digg',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'blogger',
							label: __(
								'Blogger',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'reddit',
							label: __(
								'Reddit',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'stumbleupon',
							label: __(
								'StumbleUpon',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'tumblr',
							label: __(
								'Tumblr',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'myspace',
							label: __(
								'Myspace',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'email',
							label: __(
								'Email',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'pocket',
							label: __(
								'Pocket',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'vk',
							label: __( 'VK', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'odnoklassniki',
							label: __(
								'Odnoklassniki',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'skype',
							label: __(
								'Skype',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'telegram',
							label: __(
								'Telegram',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'whatsapp',
							label: __(
								'WhatsApp',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'xing',
							label: __(
								'Xing',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'buffer',
							label: __(
								'Buffer',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ onChangeType }
				/>
				<SelectControl
					label={ __(
						'Image / Icon',
						'ultimate-addons-for-gutenberg'
					) }
					value={ image_icon }
					options={ [
						{
							value: 'icon',
							label: __(
								'Icon',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'image',
							label: __(
								'Image',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { image_icon: value } )
					}
				/>
				{ 'icon' == image_icon && (
					<>
						<p className="components-base-control__label">
							{ __( 'Icon', 'ultimate-addons-for-gutenberg' ) }
						</p>
						<FontIconPicker
							icons={ wp.UAGBSvgIcons }
							renderFunc={ renderSVG }
							theme="default"
							value={ icon }
							onChange={ ( value ) =>
								setAttributes( { icon: value } )
							}
							isMulti={ false }
							noSelectedPlaceholder={ __(
								'Select Icon',
								'ultimate-addons-for-gutenberg'
							) }
						/>
					</>
				) }
				{ 'image' == image_icon && (
					<>
						<MediaUpload
							title={ __(
								'Select Image',
								'ultimate-addons-for-gutenberg'
							) }
							onSelect={ ( value ) =>
								setAttributes( { image: value } )
							}
							allowedTypes={ [ 'image' ] }
							value={ image }
							render={ ( { open } ) => (
								<Button isSecondary onClick={ open }>
									{ ! image
										? __(
												'Select Image',
												'ultimate-addons-for-gutenberg'
										  )
										: __(
												'Replace image',
												'ultimate-addons-for-gutenberg'
										  ) }
								</Button>
							) }
						/>
						{ image && (
							<Button
								className="uagb-rm-btn"
								onClick={ () =>
									setAttributes( { image: null } )
								}
								isLink
								isDestructive
							>
								{ __(
									'Remove Image',
									'ultimate-addons-for-gutenberg'
								) }
							</Button>
						) }
					</>
				) }
			</PanelBody>
		);
	};
	const iconColorSettings = () => {
		let colorControl = '';
		let colorControlHover = '';

		if ( 'image' == image_icon ) {
			colorControl = (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Image Background Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: icon_bg_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_bg_color }
						onChange={ ( value ) =>
							setAttributes( { icon_bg_color: value } )
						}
						allowReset
					/>
				</>
			);
			colorControlHover = (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Image Background Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: icon_bg_hover_color,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_bg_hover_color }
						onChange={ ( value ) =>
							setAttributes( { icon_bg_hover_color: value } )
						}
						allowReset
					/>
				</>
			);
		} else {
			colorControl = (
				<>
					<p className="uagb-setting-label">
						{ __( 'Icon Color' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: icon_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_color }
						onChange={ ( value ) =>
							setAttributes( { icon_color: value } )
						}
						allowReset
					/>
					<p className="uagb-setting-label">
						{ __(
							'Icon Background Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: icon_bg_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_bg_color }
						onChange={ ( value ) =>
							setAttributes( { icon_bg_color: value } )
						}
						allowReset
					/>
				</>
			);
			colorControlHover = (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Icon Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: icon_hover_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_hover_color }
						onChange={ ( value ) =>
							setAttributes( { icon_hover_color: value } )
						}
						allowReset
					/>
					<p className="uagb-setting-label">
						{ __(
							'Icon Background Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: icon_bg_hover_color,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_bg_hover_color }
						onChange={ ( value ) =>
							setAttributes( { icon_bg_hover_color: value } )
						}
						allowReset
					/>
				</>
			);
		}
		return (
			<PanelBody
				title={ __( 'Icon Color', 'ultimate-addons-for-gutenberg' ) }
			>
				<TabPanel
					className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'normal',
							title: __(
								'Normal',
								'ultimate-addons-for-gutenberg'
							),
							className: 'uagb-normal-tab',
						},
						{
							name: 'hover',
							title: __(
								'Hover',
								'ultimate-addons-for-gutenberg'
							),
							className: 'uagb-hover-tab',
						},
					] }
				>
					{ ( tabName ) => {
						let color_tab;
						if ( 'normal' === tabName.name ) {
							color_tab = colorControl;
						} else {
							color_tab = colorControlHover;
						}
						return <div>{ color_tab }</div>;
					} }
				</TabPanel>
			</PanelBody>
		);
	};
	return (
		<InspectorControls>
			{ generalSettings() }
			{ iconColorSettings() }
		</InspectorControls>
	);
};

export default React.memo( Settings );
