// Import all of our Text Options requirements.
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';
import renderSVG from '@Controls/renderIcon';
import React, { Suspense, useState } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';
import ColumnResponsive from '@Components/typography/column-responsive';

import {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
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
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const [ isURLPickerOpen, setCount ] = useState( false );

	const { attributes, setAttributes, deviceType } = props;

	const {
		align,
		textAlign,
		link,
		linkTarget,
		titleSpace,
		//Icon
		icon,
		iconPosition,
		iconSpace,
		iconFontSize,
		iconFontSizeMobile,
		iconFontSizeTablet,
		//Colors
		titleColor,
		titleHoverColor,
		prefixColor,
		prefixHoverColor,
		iconColor,
		iconHoverColor,
		//Border
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		borderHoverColor,
		//Background
		vPadding,
		hPadding,
		hPaddingMobile,
		vPaddingMobile,
		hPaddingTablet,
		vPaddingTablet,
		paddingType,
		backgroundType,
		backgroundColor,
		backgroundHoverColor,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		backgroundOpacity,
		backgroundHoverOpacity,
		//Typography
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeTablet,
		titleFontSizeMobile,
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		titleTag,
		prefixFontFamily,
		prefixFontWeight,
		prefixFontSubset,
		prefixFontSize,
		prefixFontSizeType,
		prefixFontSizeTablet,
		prefixFontSizeMobile,
		prefixLineHeightType,
		prefixLineHeight,
		prefixLineHeightTablet,
		prefixLineHeightMobile,
	} = attributes;

	const onChangeOpensInNewTab = ( value ) => {
		setAttributes( { linkTarget: value } );
	};

	// Load Google fonts for heading.
	let loadTitleGoogleFonts;
	if ( loadTitleGoogleFonts == true ) {
		const titleconfig = {
			google: {
				families: [
					titleFontFamily +
						( titleFontWeight ? ':' + titleFontWeight : '' ),
				],
			},
		};

		loadTitleGoogleFonts = (
			<WebfontLoader config={ titleconfig }></WebfontLoader>
		);
	}

	// Load Google fonts for prefix.
	let loadPrefixGoogleFonts;
	if ( loadPrefixGoogleFonts == true ) {
		const prefixconfig = {
			google: {
				families: [
					prefixFontFamily +
						( prefixFontWeight ? ':' + prefixFontWeight : '' ),
				],
			},
		};

		loadPrefixGoogleFonts = (
			<WebfontLoader config={ prefixconfig }></WebfontLoader>
		);
	}

	const blockControls = () => {
		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'left', 'center', 'right', 'full' ] }
				/>
				<ToolbarGroup>
					<ToolbarButton
						icon="admin-links"
						name="link"
						title={ __( 'Link', 'ultimate-addons-for-gutenberg' ) }
						onClick={ () => setCount( true ) }
					/>
				</ToolbarGroup>
			</BlockControls>
		);
	};

	const linkControl = isURLPickerOpen && (
		<Popover position="bottom center" onClose={ () => setCount( false ) }>
			<__experimentalLinkControl
				value={ { url: link, opensInNewTab: linkTarget } }
				onChange={ ( {
					url: newURL = '',
					opensInNewTab: newOpensInNewTab,
				} ) => {
					setAttributes( { link: newURL } );
					setAttributes( { linkTarget: newOpensInNewTab } );
					onChangeOpensInNewTab( newOpensInNewTab );
				} }
			/>
		</Popover>
	);

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __(
						'Text Alignment',
						'ultimate-addons-for-gutenberg'
					) }
					value={ textAlign }
					onChange={ ( value ) =>
						setAttributes( { textAlign: value } )
					}
					options={ [
						{
							value: 'center',
							label: __(
								'Center',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'left',
							label: __(
								'Left',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'right',
							label: __(
								'Right',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Button Icon' ) }</h2>
				<FontIconPicker
					icons={ wp.UAGBSvgIcons }
					renderFunc={ renderSVG }
					value={ icon }
					onChange={ ( value ) => setAttributes( { icon: value } ) }
					isMulti={ false }
					noSelectedPlaceholder={ __(
						'Select Icon',
						'ultimate-addons-for-gutenberg'
					) }
				/>
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
						<ColumnResponsive />
						{ 'Desktop' === deviceType && (
							<>
								<RangeControl
									label={ __(
										'Icon Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ iconFontSize }
									onChange={ ( value ) =>
										setAttributes( { iconFontSize: value } )
									}
									min={ 0 }
									max={ 500 }
									allowReset
								/>
							</>
						) }
						{ 'Tablet' === deviceType && (
							<>
								<RangeControl
									label={ __(
										'Icon Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ iconFontSizeTablet }
									onChange={ ( value ) =>
										setAttributes( {
											iconFontSizeTablet: value,
										} )
									}
									min={ 0 }
									max={ 500 }
									allowReset
								/>
							</>
						) }
						{ 'Mobile' === deviceType && (
							<>
								<RangeControl
									label={ __(
										'Icon Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ iconFontSizeMobile }
									onChange={ ( value ) =>
										setAttributes( {
											iconFontSizeMobile: value,
										} )
									}
									min={ 0 }
									max={ 500 }
									allowReset
								/>
							</>
						) }
					</>
				) }
				<RangeControl
					label={ __(
						'Title Bottom Spacing',
						'ultimate-addons-for-gutenberg'
					) }
					value={ titleSpace }
					onChange={ ( value ) =>
						setAttributes( { titleSpace: value } )
					}
					min={ 0 }
					max={ 20 }
					beforeIcon=""
					allowReset
				/>
			</PanelBody>
		);
	};

	const contentSettings = () => {
		return (
			<PanelBody
				title={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Title Tag', 'ultimate-addons-for-gutenberg' ) }
					value={ titleTag }
					onChange={ ( value ) =>
						setAttributes( { titleTag: value } )
					}
					options={ [
						{
							value: 'h1',
							label: __( 'H1', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h2',
							label: __( 'H2', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h3',
							label: __( 'H3', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h4',
							label: __( 'H4', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h5',
							label: __( 'H5', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'h6',
							label: __( 'H6', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'span',
							label: __(
								'span',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'p',
							label: __( 'p', 'ultimate-addons-for-gutenberg' ),
						},
					] }
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Title', 'ultimate-addons-for-gutenberg' ) }</h2>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: loadTitleGoogleFonts,
						label: 'loadTitleGoogleFonts',
					} }
					fontFamily={ {
						value: titleFontFamily,
						label: 'titleFontFamily',
					} }
					fontWeight={ {
						value: titleFontWeight,
						label: 'titleFontWeight',
					} }
					fontSubset={ {
						value: titleFontSubset,
						label: 'titleFontSubset',
					} }
					fontSizeType={ {
						value: titleFontSizeType,
						label: 'titleFontSizeType',
					} }
					fontSize={ {
						value: titleFontSize,
						label: 'titleFontSize',
					} }
					fontSizeMobile={ {
						value: titleFontSizeMobile,
						label: 'titleFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: titleFontSizeTablet,
						label: 'titleFontSizeTablet',
					} }
					lineHeightType={ {
						value: titleLineHeightType,
						label: 'titleLineHeightType',
					} }
					lineHeight={ {
						value: titleLineHeight,
						label: 'titleLineHeight',
					} }
					lineHeightMobile={ {
						value: titleLineHeightMobile,
						label: 'titleLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: titleLineHeightTablet,
						label: 'titleLineHeightTablet',
					} }
				/>
				<hr className="uagb-editor__separator" />
				<h2>
					{ __( 'Description', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: loadPrefixGoogleFonts,
						label: 'loadPrefixGoogleFonts',
					} }
					fontFamily={ {
						value: prefixFontFamily,
						label: 'prefixFontFamily',
					} }
					fontWeight={ {
						value: prefixFontWeight,
						label: 'prefixFontWeight',
					} }
					fontSubset={ {
						value: prefixFontSubset,
						label: 'prefixFontSubset',
					} }
					fontSizeType={ {
						value: prefixFontSizeType,
						label: 'prefixFontSizeType',
					} }
					fontSize={ {
						value: prefixFontSize,
						label: 'prefixFontSize',
					} }
					fontSizeMobile={ {
						value: prefixFontSizeMobile,
						label: 'prefixFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: prefixFontSizeTablet,
						label: 'prefixFontSizeTablet',
					} }
					lineHeightType={ {
						value: prefixLineHeightType,
						label: 'prefixLineHeightType',
					} }
					lineHeight={ {
						value: prefixLineHeight,
						label: 'prefixLineHeight',
					} }
					lineHeightMobile={ {
						value: prefixLineHeightMobile,
						label: 'prefixLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: prefixLineHeightTablet,
						label: 'prefixLineHeightTablet',
					} }
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Colors' ) }</h2>
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
							className: 'uagb-focus-tab',
						},
					] }
				>
					{ ( tabName ) => {
						let tabout_color;
						if ( 'normal' === tabName.name ) {
							tabout_color = (
								<>
									<p className="uagb-setting-label">
										{ __(
											'Title Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: titleColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ titleColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												titleColor: colorValue,
											} )
										}
										allowReset
									/>
									<p className="uagb-setting-label">
										{ __(
											'Icon Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: iconColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ iconColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												iconColor: colorValue,
											} )
										}
										allowReset
									/>
									<p className="uagb-setting-label">
										{ __(
											'Description Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: prefixColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ prefixColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												prefixColor: colorValue,
											} )
										}
										allowReset
									/>
								</>
							);
						} else {
							tabout_color = (
								<>
									<p className="uagb-setting-label">
										{ __(
											'Title Hover Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: titleHoverColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ titleHoverColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												titleHoverColor: colorValue,
											} )
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
												style={ {
													backgroundColor: iconHoverColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ iconHoverColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												iconHoverColor: colorValue,
											} )
										}
										allowReset
									/>
									<p className="uagb-setting-label">
										{ __(
											'Description Hover Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: prefixHoverColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ prefixHoverColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												prefixHoverColor: colorValue,
											} )
										}
										allowReset
									/>
								</>
							);
						}
						return <div>{ tabout_color }</div>;
					} }
				</TabPanel>
			</PanelBody>
		);
	};

	const backgroundSettings = () => {
		return (
			<PanelBody title={ __( 'Background' ) } initialOpen={ false }>
				<ColumnResponsive />
				{ 'Desktop' === deviceType && (
					<>
						<ButtonGroup
							className="uagb-size-type-field"
							aria-label={ __( 'Size Type' ) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingType === 'px' }
								aria-pressed={ paddingType === 'px' }
								onClick={ () =>
									setAttributes( { paddingType: 'px' } )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingType === '%' }
								aria-pressed={ paddingType === '%' }
								onClick={ () =>
									setAttributes( { paddingType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Button Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPadding }
							onChange={ ( value ) =>
								setAttributes( { vPadding: value } )
							}
							min={ 0 }
							max={ '%' == paddingType ? 100 : 2000 }
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPadding }
							onChange={ ( value ) =>
								setAttributes( { hPadding: value } )
							}
							min={ 0 }
							max={ '%' == paddingType ? 100 : 2000 }
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
								isPrimary={ paddingType === 'px' }
								aria-pressed={ paddingType === 'px' }
								onClick={ () =>
									setAttributes( { paddingType: 'px' } )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingType === '%' }
								aria-pressed={ paddingType === '%' }
								onClick={ () =>
									setAttributes( { paddingType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Button Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( { vPaddingTablet: value } )
							}
							min={ 0 }
							max={ '%' == paddingType ? 100 : 2000 }
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( { hPaddingTablet: value } )
							}
							min={ 0 }
							max={ '%' == paddingType ? 100 : 2000 }
						/>
					</>
				) }
				{ 'Mobile' === deviceType && (
					<>
						<ButtonGroup
							className="uagb-size-type-field"
							aria-label={ __( 'Size Type' ) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingType === 'px' }
								aria-pressed={ paddingType === 'px' }
								onClick={ () =>
									setAttributes( { paddingType: 'px' } )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingType === '%' }
								aria-pressed={ paddingType === '%' }
								onClick={ () =>
									setAttributes( { paddingType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Button Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( { vPaddingMobile: value } )
							}
							min={ 0 }
							max={ '%' == paddingType ? 100 : 2000 }
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( { hPaddingMobile: value } )
							}
							min={ 0 }
							max={ '%' == paddingType ? 100 : 2000 }
						/>
					</>
				) }
				<hr className="uagb-editor__separator" />
				<h2>
					{ __(
						'Button Background',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<SelectControl
					label={ __(
						'Background Type',
						'ultimate-addons-for-gutenberg'
					) }
					value={ backgroundType }
					onChange={ ( value ) =>
						setAttributes( { backgroundType: value } )
					}
					options={ [
						{
							value: 'transparent',
							label: __(
								'Transparent',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'color',
							label: __(
								'Color',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'gradient',
							label: __(
								'Gradient',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'color' == backgroundType && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Background Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( colorValue ) =>
								setAttributes( { backgroundColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
				{ 'gradient' == backgroundType && (
					<>
						<PanelColorSettings
							title={ __(
								'Color Settings',
								'ultimate-addons-for-gutenberg'
							) }
							colorSettings={ [
								{
									value: gradientColor2,
									onChange: ( value ) =>
										setAttributes( {
											gradientColor2: value,
										} ),
									label: __(
										'Color 1',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: gradientColor1,
									onChange: ( value ) =>
										setAttributes( {
											gradientColor1: value,
										} ),
									label: __(
										'Color 2',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						></PanelColorSettings>
						<SelectControl
							label={ __(
								'Type',
								'ultimate-addons-for-gutenberg'
							) }
							value={ gradientType }
							onChange={ ( value ) =>
								setAttributes( { gradientType: value } )
							}
							options={ [
								{
									value: 'linear',
									label: __(
										'Linear',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'radial',
									label: __(
										'Radial',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
						<RangeControl
							label={ __(
								'Location 1',
								'ultimate-addons-for-gutenberg'
							) }
							value={ gradientLocation1 }
							onChange={ ( value ) =>
								setAttributes( { gradientLocation1: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __(
								'Location 2',
								'ultimate-addons-for-gutenberg'
							) }
							value={ gradientLocation2 }
							onChange={ ( value ) =>
								setAttributes( { gradientLocation2: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __(
								'Angle',
								'ultimate-addons-for-gutenberg'
							) }
							value={ gradientAngle }
							onChange={ ( value ) =>
								setAttributes( { gradientAngle: value } )
							}
							min={ 0 }
							max={ 360 }
							allowReset
						/>
					</>
				) }
				{ 'transparent' !== backgroundType && (
					<RangeControl
						label={ __(
							'Opacity',
							'ultimate-addons-for-gutenberg'
						) }
						value={ backgroundOpacity }
						onChange={ ( value ) =>
							setAttributes( { backgroundOpacity: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
						initialPosition={ 0 }
					/>
				) }
				{ 'color' == backgroundType && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Background Hover Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: backgroundHoverColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ backgroundHoverColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									backgroundHoverColor: colorValue,
								} )
							}
							allowReset
						/>
						<RangeControl
							label={ __(
								'Opacity',
								'ultimate-addons-for-gutenberg'
							) }
							value={ backgroundHoverOpacity }
							onChange={ ( value ) =>
								setAttributes( {
									backgroundHoverOpacity: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
							initialPosition={ 0 }
						/>
					</>
				) }
			</PanelBody>
		);
	};

	const borderSettings = () => {
		return (
			<PanelBody
				title={ __( 'Border', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __(
						'Border Style',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderStyle }
					onChange={ ( value ) =>
						setAttributes( { borderStyle: value } )
					}
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
						{
							value: 'groove',
							label: __(
								'Groove',
								'ultimate-addons-for-gutenberg'
							),
						},
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
						{
							value: 'ridge',
							label: __(
								'Ridge',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'none' !== borderStyle && (
					<RangeControl
						label={ __(
							'Border Width',
							'ultimate-addons-for-gutenberg'
						) }
						value={ borderWidth }
						onChange={ ( value ) =>
							setAttributes( { borderWidth: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				) }
				<RangeControl
					label={ __(
						'Border Radius',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderRadius }
					onChange={ ( value ) =>
						setAttributes( { borderRadius: value } )
					}
					min={ 0 }
					max={ 1000 }
					allowReset
				/>
				{ 'none' !== borderStyle && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Border Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor: borderColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ borderColor }
							onChange={ ( colorValue ) =>
								setAttributes( { borderColor: colorValue } )
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
										backgroundColor: borderHoverColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ borderHoverColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									borderHoverColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }
			</PanelBody>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			{ blockControls() }
			{ linkControl }
			<InspectorControls>
				{ generalSettings() }
				{ contentSettings() }
				{ backgroundSettings() }
				{ borderSettings() }
			</InspectorControls>
			{ loadTitleGoogleFonts }
			{ loadPrefixGoogleFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
