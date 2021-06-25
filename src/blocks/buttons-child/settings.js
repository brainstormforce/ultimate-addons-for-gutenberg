/**
 * BLOCK: Buttons Child - Edit Class
 */

// Import classes
import UAGB_Block_Icons from '@Controls/block-icons';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import renderSVG from '@Controls/renderIcon';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';
import React, { Suspense } from 'react';
import ColumnResponsive from '@Components/typography/column-responsive';

import {
	BlockControls,
	InspectorControls,
	ColorPalette,
	__experimentalLinkControl,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ButtonGroup,
	Button,
	Popover,
	ToolbarButton,
	ToolbarGroup,
	ToggleControl,
} from '@wordpress/components';

const Settings = ( props ) => {
	const state = props.state;
	const setStateValue = props.setStateValue;
	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		link,
		size,
		vPadding,
		hPadding,
		borderWidth,
		borderRadius,
		borderStyle,
		borderColor,
		borderHColor,
		color,
		background,
		hColor,
		hBackground,
		sizeType,
		sizeMobile,
		sizeTablet,
		lineHeight,
		lineHeightType,
		lineHeightMobile,
		lineHeightTablet,
		opensInNewTab,
		inheritFromTheme,
		icon,
		iconPosition,
		iconSpace,
		target,
	} = attributes;

	const onClickLinkSettings = () => {
		if ( '_self' === target ) {
			setAttributes( { opensInNewTab: false } );
		} else if ( '_blank' === target ) {
			setAttributes( { opensInNewTab: true } );
		}

		setStateValue( {
			isURLPickerOpen: true,
		} );
	};

	const onChangeOpensInNewTab = ( value ) => {
		if ( true === value ) {
			props.setAttributes( { target: '_blank' } );
		} else {
			props.setAttributes( { target: '_self' } );
		}
	};

	const buttonSettings = () => {
		const icon_props = {
			icons: wp.svgIcons,
			value: icon,
			onChange: ( value ) => setAttributes( { icon: value } ),
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __(
				'Select Icon',
				'ultimate-addons-for-gutenberg'
			),
		};

		return (
			<PanelBody
				title={ __(
					'Button Settings',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ true }
				className="uagb__url-panel-body"
			>
				<ToggleControl
					label={ __(
						'Inherit from Theme',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ inheritFromTheme }
					onChange={ () =>
						setAttributes( {
							inheritFromTheme: ! inheritFromTheme,
						} )
					}
				/>
				<h2>
					{ __( 'Button Icon', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<FontIconPicker { ...icon_props } />
				{ '' !== icon && (
					<>
						<SelectControl
							label={ __(
								'Icon Position',
								'ultimate-addons-for-gutenberg'
							) }
							value={ iconPosition }
							onChange={ ( value ) =>
								setAttributes( { iconPosition: value } )
							}
							options={ [
								{
									value: 'before',
									label: __(
										'Before Text',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'after',
									label: __(
										'After Text',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
						<RangeControl
							label={ __(
								'Icon Spacing',
								'ultimate-addons-for-gutenberg'
							) }
							value={ iconSpace }
							onChange={ ( value ) =>
								setAttributes( { iconSpace: value } )
							}
							min={ 0 }
							max={ 50 }
							beforeIcon=""
							allowReset
						/>
					</>
				) }
				{ ! inheritFromTheme && (
					<>
						<h2>
							{ __(
								' Color Settings',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
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
								let btn_color_tab;
								if ( 'normal' === tabName.name ) {
									btn_color_tab = (
										<>
											<p className="uagb-setting-label">
												{ __(
													'Text Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: color,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ color }
												onChange={ ( value ) =>
													setAttributes( {
														color: value,
													} )
												}
												allowReset
											/>
											<p className="uagb-setting-label">
												{ __(
													'Background Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: background,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ background }
												onChange={ ( value ) =>
													setAttributes( {
														background: value,
													} )
												}
												allowReset
											/>
											<p className="uagb-setting-label">
												{ __(
													'Border Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: borderColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ borderColor }
												onChange={ ( value ) =>
													setAttributes( {
														borderColor: value,
													} )
												}
												allowReset
											/>
										</>
									);
								} else {
									btn_color_tab = (
										<>
											<p className="uagb-setting-label">
												{ __(
													'Text Hover Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: hColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ hColor }
												onChange={ ( value ) =>
													setAttributes( {
														hColor: value,
													} )
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
														style={ {
															backgroundColor: hBackground,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ hBackground }
												onChange={ ( value ) =>
													setAttributes( {
														hBackground: value,
													} )
												}
												allowReset
											/>
											<p className="uagb-setting-label">
												{ __(
													'Border Hover Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: borderHColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ borderHColor }
												onChange={ ( value ) =>
													setAttributes( {
														borderHColor: value,
													} )
												}
												allowReset
											/>
										</>
									);
								}
								return <div>{ btn_color_tab }</div>;
							} }
						</TabPanel>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __(
								'Padding (px)',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPadding }
							onChange={ ( value ) => {
								setAttributes( { vPadding: value } );
							} }
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPadding }
							onChange={ ( value ) => {
								setAttributes( { hPadding: value } );
							} }
							min={ 0 }
							max={ 100 }
						/>
						<h2>
							{ __( 'Border', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<SelectControl
							label={ __(
								'Style',
								'ultimate-addons-for-gutenberg'
							) }
							value={ borderStyle }
							options={ [
								{
									value: 'none',
									label: __(
										'None',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'solid',
									label: __(
										'Solid',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'dotted',
									label: __(
										'Dotted',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'dashed',
									label: __(
										'Dashed',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'double',
									label: __(
										'Double',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
							onChange={ ( value ) => {
								setAttributes( { borderStyle: value } );
							} }
						/>
						{ borderStyle != 'none' && (
							<RangeControl
								label={ __(
									'Thickness',
									'ultimate-addons-for-gutenberg'
								) }
								value={ borderWidth }
								onChange={ ( value ) => {
									setAttributes( { borderWidth: value } );
								} }
								min={ 0 }
								max={ 20 }
							/>
						) }
						<RangeControl
							label={ __(
								'Rounded Corners',
								'ultimate-addons-for-gutenberg'
							) }
							value={ borderRadius }
							onChange={ ( value ) => {
								setAttributes( { borderRadius: value } );
							} }
							min={ 0 }
							max={ 50 }
						/>
						<hr className="uagb-editor__separator" />
						<ColumnResponsive />
						{ 'Desktop' === deviceType && (
							<>
								<ButtonGroup
									className="uagb-size-type-field"
									aria-label={ __(
										'Size Type',
										'ultimate-addons-for-gutenberg'
									) }
								>
									<Button
										key={ 'px' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ sizeType === 'px' }
										aria-pressed={ sizeType === 'px' }
										onClick={ () =>
											setAttributes( { sizeType: 'px' } )
										}
									>
										{ 'px' }
									</Button>
									<Button
										key={ '%' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ sizeType === '%' }
										aria-pressed={ sizeType === '%' }
										onClick={ () =>
											setAttributes( { sizeType: '%' } )
										}
									>
										{ '%' }
									</Button>
								</ButtonGroup>
								<RangeControl
									label={ __(
										'Font Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ size }
									onChange={ ( value ) => {
										setAttributes( { size: value } );
									} }
									min={ 0 }
									max={ 100 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 16 }
								/>
							</>
						) }
						{ 'Tablet' === deviceType && (
							<>
								<ButtonGroup
									className="uagb-size-type-field"
									aria-label={ __( 'Size Type' ) }
								>
									<Button
										key={ 'px' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ sizeType === 'px' }
										aria-pressed={ sizeType === 'px' }
										onClick={ () =>
											setAttributes( { sizeType: 'px' } )
										}
									>
										{ 'px' }
									</Button>
									<Button
										key={ '%' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ sizeType === '%' }
										aria-pressed={ sizeType === '%' }
										onClick={ () =>
											setAttributes( { sizeType: '%' } )
										}
									>
										{ '%' }
									</Button>
								</ButtonGroup>
								<RangeControl
									label={ __(
										'Font Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ sizeTablet }
									onChange={ ( value ) => {
										setAttributes( { sizeTablet: value } );
									} }
									min={ 0 }
									max={ 100 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 16 }
								/>
							</>
						) }
						{ 'Mobile' === deviceType && (
							<>
								<ButtonGroup
									className="uagb-size-type-field"
									aria-label={ __(
										'Size Type',
										'ultimate-addons-for-gutenberg'
									) }
								>
									<Button
										key={ 'px' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ sizeType === 'px' }
										aria-pressed={ sizeType === 'px' }
										onClick={ () =>
											setAttributes( { sizeType: 'px' } )
										}
									>
										{ 'px' }
									</Button>
									<Button
										key={ '%' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ sizeType === '%' }
										aria-pressed={ sizeType === '%' }
										onClick={ () =>
											setAttributes( { sizeType: '%' } )
										}
									>
										{ '%' }
									</Button>
								</ButtonGroup>
								<RangeControl
									label={ __(
										'Font Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ sizeMobile }
									onChange={ ( value ) => {
										setAttributes( { sizeMobile: value } );
									} }
									min={ 0 }
									max={ 100 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 16 }
								/>
							</>
						) }
						<ColumnResponsive />
						{ 'Desktop' === deviceType && (
							<>
								<ButtonGroup
									className="uagb-size-type-field"
									aria-label={ __(
										'Size Type',
										'ultimate-addons-for-gutenberg'
									) }
								>
									<Button
										key={ 'px' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ lineHeightType === 'px' }
										aria-pressed={ lineHeightType === 'px' }
										onClick={ () =>
											setAttributes( {
												lineHeightType: 'px',
											} )
										}
									>
										{ 'px' }
									</Button>
									<Button
										key={ '%' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ lineHeightType === '%' }
										aria-pressed={ lineHeightType === '%' }
										onClick={ () =>
											setAttributes( {
												lineHeightType: '%',
											} )
										}
									>
										{ '%' }
									</Button>
								</ButtonGroup>
								<RangeControl
									label={ __(
										'Line Height',
										'ultimate-addons-for-gutenberg'
									) }
									value={ lineHeight }
									onChange={ ( value ) => {
										setAttributes( { lineHeight: value } );
									} }
									min={ 0 }
									max={ 100 }
									step={ 0.1 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 16 }
								/>
							</>
						) }
						{ 'Tablet' === deviceType && (
							<>
								<ButtonGroup
									className="uagb-size-type-field"
									aria-label={ __(
										'Size Type',
										'ultimate-addons-for-gutenberg'
									) }
								>
									<Button
										key={ 'px' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ lineHeightType === 'px' }
										aria-pressed={ lineHeightType === 'px' }
										onClick={ () =>
											setAttributes( {
												lineHeightType: 'px',
											} )
										}
									>
										{ 'px' }
									</Button>
									<Button
										key={ '%' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ lineHeightType === '%' }
										aria-pressed={ lineHeightType === '%' }
										onClick={ () =>
											setAttributes( {
												lineHeightType: '%',
											} )
										}
									>
										{ '%' }
									</Button>
								</ButtonGroup>
								<RangeControl
									label={ __(
										'Line Height',
										'ultimate-addons-for-gutenberg'
									) }
									value={ lineHeightTablet }
									onChange={ ( value ) => {
										setAttributes( {
											lineHeightTablet: value,
										} );
									} }
									min={ 0 }
									max={ 100 }
									beforeIcon="editor-textcolor"
									allowReset
									step={ 0.1 }
									initialPosition={ 16 }
								/>
							</>
						) }
						{ 'Mobile' === deviceType && (
							<>
								<ButtonGroup
									className="uagb-size-type-field"
									aria-label={ __(
										'Size Type',
										'ultimate-addons-for-gutenberg'
									) }
								>
									<Button
										key={ 'px' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ lineHeightType === 'px' }
										aria-pressed={ lineHeightType === 'px' }
										onClick={ () =>
											setAttributes( {
												lineHeightType: 'px',
											} )
										}
									>
										{ 'px' }
									</Button>
									<Button
										key={ '%' }
										className="uagb-size-btn"
										isSmall
										isPrimary={ lineHeightType === '%' }
										aria-pressed={ lineHeightType === '%' }
										onClick={ () =>
											setAttributes( {
												lineHeightType: '%',
											} )
										}
									>
										{ '%' }
									</Button>
								</ButtonGroup>
								<RangeControl
									label={ __(
										'Line Height',
										'ultimate-addons-for-gutenberg'
									) }
									value={ lineHeightMobile }
									onChange={ ( value ) => {
										setAttributes( {
											lineHeightMobile: value,
										} );
									} }
									min={ 0 }
									max={ 100 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 16 }
								/>
							</>
						) }
						<hr className="uagb-editor__separator" />
					</>
				) }
			</PanelBody>
		);
	};

	const blockControls = () => {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="admin-links"
						name="link"
						title={ __( 'Link' ) }
						onClick={ onClickLinkSettings }
					/>
				</ToolbarGroup>
			</BlockControls>
		);
	};

	const linkControls = () => {
		if ( ! state.isURLPickerOpen ) {
			return '';
		}

		return (
			<Popover
				position="bottom center"
				onClose={ () =>
					setStateValue( {
						isURLPickerOpen: false,
					} )
				}
			>
				<__experimentalLinkControl
					value={ { url: link, opensInNewTab } }
					onChange={ ( {
						url: newURL = '',
						opensInNewTab: newOpensInNewTab,
					} ) => {
						setAttributes( { link: newURL } );
						setAttributes( { opensInNewTab: newOpensInNewTab } );
						onChangeOpensInNewTab( newOpensInNewTab );
					} }
				/>
			</Popover>
		);
	};
	return (
		<Suspense fallback={ lazyLoader() }>
			{ blockControls() }
			{ linkControls() }
			<InspectorControls>{ buttonSettings() }</InspectorControls>
		</Suspense>
	);
};

export default React.memo( Settings );
