import renderSVG from '@Controls/renderIcon';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	ToggleControl,
	TabPanel,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { attributes, setAttributes } = props;
	const {
		image_icon,
		icon,
		image,
		icon_color,
		label_color,
		icon_hover_color,
		label_hover_color,
		icon_bg_color,
		icon_bg_hover_color,
		icon_border_color,
		icon_border_hover_color,
		link,
		target,
		disableLink,
	} = attributes;

	/*
	 * Event to set Image as null while removing.
	 */
	const onRemoveImage = () => {
		setAttributes( { image: null } );
	};

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { image: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { image: media } );
	};

	const iconColorControls = () => {
		let colorControl = '';
		let colorControlHover = '';

		if ( 'image' == image_icon ) {
			colorControl = (
				<>
					<p className="uagb-setting-label">
						{ __( 'Text Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: label_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ label_color }
						onChange={ ( value ) =>
							setAttributes( { label_color: value } )
						}
						allowReset
					/>
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
					<p className="uagb-setting-label">
						{ __(
							'Image Border Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: icon_border_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_border_color }
						onChange={ ( value ) =>
							setAttributes( { icon_border_color: value } )
						}
						allowReset
					/>
				</>
			);
			colorControlHover = (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Text Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: label_hover_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ label_hover_color }
						onChange={ ( value ) =>
							setAttributes( { label_hover_color: value } )
						}
						allowReset
					/>
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
					<p className="uagb-setting-label">
						{ __(
							'Image Border Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: icon_border_hover_color,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_border_hover_color }
						onChange={ ( value ) =>
							setAttributes( { icon_border_hover_color: value } )
						}
						allowReset
					/>
				</>
			);
		} else {
			colorControl = (
				<>
					<p className="uagb-setting-label">
						{ __( 'Text Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: label_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ label_color }
						onChange={ ( value ) =>
							setAttributes( { label_color: value } )
						}
						allowReset
					/>
					<p className="uagb-setting-label">
						{ __( 'Icon Color', 'ultimate-addons-for-gutenberg' ) }
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
					<p className="uagb-setting-label">
						{ __(
							'Icon Border Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: icon_border_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_border_color }
						onChange={ ( value ) =>
							setAttributes( { icon_border_color: value } )
						}
						allowReset
					/>
				</>
			);
			colorControlHover = (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Text Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: label_hover_color } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ label_hover_color }
						onChange={ ( value ) =>
							setAttributes( { label_hover_color: value } )
						}
						allowReset
					/>
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
					<p className="uagb-setting-label">
						{ __(
							'Icon Border Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: icon_border_hover_color,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ icon_border_hover_color }
						onChange={ ( value ) =>
							setAttributes( { icon_border_hover_color: value } )
						}
						allowReset
					/>
				</>
			);
		}

		return (
			<TabPanel
				className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'normal',
						title: __( 'Normal', 'ultimate-addons-for-gutenberg' ),
						className: 'uagb-normal-tab',
					},
					{
						name: 'hover',
						title: __( 'Hover', 'ultimate-addons-for-gutenberg' ),
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
		);
	};
	const inspectorControls = () => {
		return (
			<InspectorControls>
				<PanelBody
					title={ __(
						'Icon Settings',
						'ultimate-addons-for-gutenberg'
					) }
					initialOpen={ true }
				>
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
								{ __(
									'Icon',
									'ultimate-addons-for-gutenberg'
								) }
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
								onSelect={ onSelectImage }
								allowedTypes={ [ 'image' ] }
								value={ image }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ ! image
											? __( 'Select Image' )
											: __( 'Replace image' ) }
									</Button>
								) }
							/>
							{ image && (
								<Button
									className="uagb-rm-btn"
									onClick={ onRemoveImage }
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
					<hr className="uagb-editor__separator" />
					<h2>
						{ __(
							'List Item Link',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<ToggleControl
						label={ __(
							'Disable Link',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ disableLink }
						onChange={ () =>
							setAttributes( { disableLink: ! disableLink } )
						}
					/>
					{ ! disableLink && (
						<>
							<p className="components-base-control__label">
								{ __( 'URL', 'ultimate-addons-for-gutenberg' ) }
							</p>
							<TextControl
								value={ link }
								onChange={ ( value ) =>
									setAttributes( { link: value } )
								}
								placeholder={ __(
									'Enter URL',
									'ultimate-addons-for-gutenberg'
								) }
							/>
							<ToggleControl
								label={ __(
									'Open in New Tab',
									'ultimate-addons-for-gutenberg'
								) }
								checked={ target }
								onChange={ () =>
									setAttributes( { target: ! target } )
								}
							/>
						</>
					) }
					<hr className="uagb-editor__separator" />
					<h2>
						{ __(
							'Icon Color Settings',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					{ iconColorControls() }
				</PanelBody>
			</InspectorControls>
		);
	};
	return inspectorControls();
};
export default React.memo( Settings );
