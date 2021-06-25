import UAGB_Block_Icons from '@Controls/block-icons';
import React, { Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';
import ColumnResponsive from '@Components/typography/column-responsive';
import GradientSettings from '@Components/gradient-settings';
import BoxShadowControl from '@Components/box-shadow';

import {
	BlockControls,
	BlockAlignmentToolbar,
	ColorPalette,
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	BaseControl,
	ToggleControl,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		align,
		contentWidth,
		width,
		innerWidth,
		innerWidthType,
		tag,
		themeWidth,
		leftPadding,
		rightPadding,
		topPadding,
		bottomPadding,
		leftMargin,
		rightMargin,
		topMargin,
		bottomMargin,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topMarginTablet,
		bottomMarginTablet,
		leftMarginTablet,
		rightMarginTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
		topMarginMobile,
		bottomMarginMobile,
		leftMarginMobile,
		rightMarginMobile,
		backgroundType,
		backgroundImage,
		backgroundVideo,
		backgroundColor,
		backgroundPosition,
		backgroundAttachment,
		backgroundRepeat,
		backgroundSize,
		backgroundOpacity,
		backgroundVideoColor,
		backgroundVideoOpacity,
		backgroundImageColor,
		overlayType,
		gradientOverlayColor1,
		gradientOverlayColor2,
		gradientOverlayType,
		gradientOverlayLocation1,
		gradientOverlayLocation2,
		gradientOverlayAngle,
		gradientOverlayPosition,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		mobileMarginType,
		tabletMarginType,
		desktopMarginType,
		mobilePaddingType,
		tabletPaddingType,
		desktopPaddingType,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
	} = attributes;

	let blockControls = [ 'left', 'center', 'right' ];
	if ( 'full_width' == contentWidth ) {
		blockControls = [ 'wide', 'full' ];
	}

	/*
	 * Event to set Image as null while removing.
	 */
	const onRemoveImage = () => {
		setAttributes( { backgroundImage: null } );
	};

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { backgroundImage: media } );
	};

	/*
	 * Event to set Video as null while removing.
	 */
	const onRemoveVideo = () => {
		setAttributes( { backgroundVideo: null } );
	};

	/*
	 * Event to set Video while adding.
	 */
	const onSelectVideo = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { backgroundVideo: null } );
			return;
		}
		if ( ! media.type || 'video' != media.type ) {
			return;
		}
		setAttributes( { backgroundVideo: media } );
	};

	const getLayoutPanelBody = () => {
		return (
			<PanelBody
				title={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
			>
				<SelectControl
					label={ __(
						'Content Width',
						'ultimate-addons-for-gutenberg'
					) }
					value={ contentWidth }
					onChange={ ( value ) =>
						setAttributes( { contentWidth: value } )
					}
					options={ [
						{
							value: 'boxed',
							label: __(
								'Boxed',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'full_width',
							label: __(
								'Full Width',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ contentWidth == 'boxed' && (
					<RangeControl
						label={ __( 'Width', 'ultimate-addons-for-gutenberg' ) }
						value={ width }
						min={ 0 }
						max={ 2000 }
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
					/>
				) }
				{ contentWidth != 'boxed' && (
					<ToggleControl
						label={ __(
							'Inherit Inner Width from Theme',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ themeWidth }
						onChange={ () =>
							setAttributes( { themeWidth: ! themeWidth } )
						}
					/>
				) }
				{ contentWidth != 'boxed' && ! themeWidth && (
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
								isPrimary={ innerWidthType === 'px' }
								aria-pressed={ innerWidthType === 'px' }
								onClick={ () =>
									setAttributes( {
										innerWidthType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ innerWidthType === '%' }
								aria-pressed={ innerWidthType === '%' }
								onClick={ () =>
									setAttributes( { innerWidthType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<RangeControl
							label={ __(
								'Inner Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ innerWidth }
							min={ 0 }
							max={ 2000 }
							onChange={ ( value ) =>
								setAttributes( { innerWidth: value } )
							}
						/>
					</>
				) }
				<SelectControl
					label={ __( 'HTML Tag', 'ultimate-addons-for-gutenberg' ) }
					value={ tag }
					onChange={ ( value ) => setAttributes( { tag: value } ) }
					options={ [
						{
							value: 'div',
							label: __( 'div', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'header',
							label: __(
								'header',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'footer',
							label: __(
								'footer',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'main',
							label: __(
								'main',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'article',
							label: __(
								'article',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'section',
							label: __(
								'section',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'aside',
							label: __(
								'aside',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'nav',
							label: __( 'nav', 'ultimate-addons-for-gutenberg' ),
						},
					] }
				/>
			</PanelBody>
		);
	};

	const getSpacingPanelBody = () => {
		return (
			<PanelBody title={ __( 'Spacing' ) } initialOpen={ false }>
				{ ' ' }
				<ColumnResponsive />{ ' ' }
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
								isPrimary={ desktopPaddingType === 'px' }
								aria-pressed={ desktopPaddingType === 'px' }
								onClick={ () =>
									setAttributes( {
										desktopPaddingType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ desktopPaddingType === '%' }
								aria-pressed={ desktopPaddingType === '%' }
								onClick={ () =>
									setAttributes( {
										desktopPaddingType: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>

						<h2>{ __( 'Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ 'uagb-margin-control' }
							value={ topPadding }
							onChange={ ( value ) =>
								setAttributes( { topPadding: value } )
							}
							min={ 0 }
							max={ '%' == desktopPaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ 'uagb-margin-control' }
							value={ bottomPadding }
							onChange={ ( value ) =>
								setAttributes( { bottomPadding: value } )
							}
							min={ 0 }
							max={ '%' == desktopPaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ 'uagb-margin-control' }
							value={ leftPadding }
							onChange={ ( value ) =>
								setAttributes( { leftPadding: value } )
							}
							min={ 0 }
							max={ '%' == desktopPaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ 'uagb-margin-control' }
							value={ rightPadding }
							onChange={ ( value ) =>
								setAttributes( { rightPadding: value } )
							}
							min={ 0 }
							max={ '%' == desktopPaddingType ? 100 : 2000 }
							allowReset
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
								isPrimary={ tabletPaddingType === 'px' }
								aria-pressed={ tabletPaddingType === 'px' }
								onClick={ () =>
									setAttributes( {
										tabletPaddingType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ tabletPaddingType === '%' }
								aria-pressed={ tabletPaddingType === '%' }
								onClick={ () =>
									setAttributes( {
										tabletPaddingType: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Padding Tablet' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ 'uagb-margin-control' }
							value={ topPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( { topPaddingTablet: value } )
							}
							min={ 0 }
							max={ '%' == tabletPaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ 'uagb-margin-control' }
							value={ bottomPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( {
									bottomPaddingTablet: value,
								} )
							}
							min={ 0 }
							max={ '%' == tabletPaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ 'uagb-margin-control' }
							value={ leftPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( {
									leftPaddingTablet: value,
								} )
							}
							min={ 0 }
							max={ '%' == tabletPaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ 'uagb-margin-control' }
							value={ rightPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( {
									rightPaddingTablet: value,
								} )
							}
							min={ 0 }
							max={ '%' == tabletPaddingType ? 100 : 2000 }
							allowReset
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
								isPrimary={ mobilePaddingType === 'px' }
								aria-pressed={ mobilePaddingType === 'px' }
								onClick={ () =>
									setAttributes( {
										mobilePaddingType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ mobilePaddingType === '%' }
								aria-pressed={ mobilePaddingType === '%' }
								onClick={ () =>
									setAttributes( {
										mobilePaddingType: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Padding Mobile' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ 'uagb-margin-control' }
							value={ topPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( { topPaddingMobile: value } )
							}
							min={ 0 }
							max={ '%' == mobilePaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ 'uagb-margin-control' }
							value={ bottomPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( {
									bottomPaddingMobile: value,
								} )
							}
							min={ 0 }
							max={ '%' == mobilePaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ 'uagb-margin-control' }
							value={ leftPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( {
									leftPaddingMobile: value,
								} )
							}
							min={ 0 }
							max={ '%' == mobilePaddingType ? 100 : 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ 'uagb-margin-control' }
							value={ rightPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( {
									rightPaddingMobile: value,
								} )
							}
							min={ 0 }
							max={ '%' == mobilePaddingType ? 100 : 2000 }
							allowReset
						/>
					</>
				) }
				<hr className="uagb-editor__separator" /> <ColumnResponsive />{ ' ' }
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
								isPrimary={ desktopMarginType === 'px' }
								aria-pressed={ desktopMarginType === 'px' }
								onClick={ () =>
									setAttributes( {
										desktopMarginType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ desktopMarginType === '%' }
								aria-pressed={ desktopMarginType === '%' }
								onClick={ () =>
									setAttributes( {
										desktopMarginType: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Margin' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ 'uagb-margin-control' }
							value={ topMargin }
							onChange={ ( value ) =>
								setAttributes( { topMargin: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ 'uagb-margin-control' }
							value={ bottomMargin }
							onChange={ ( value ) =>
								setAttributes( { bottomMargin: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ 'uagb-margin-control' }
							value={ leftMargin }
							onChange={ ( value ) =>
								setAttributes( { leftMargin: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ 'uagb-margin-control' }
							value={ rightMargin }
							onChange={ ( value ) =>
								setAttributes( { rightMargin: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
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
								isPrimary={ tabletMarginType === 'px' }
								aria-pressed={ tabletMarginType === 'px' }
								onClick={ () =>
									setAttributes( {
										tabletMarginType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ tabletMarginType === '%' }
								aria-pressed={ tabletMarginType === '%' }
								onClick={ () =>
									setAttributes( {
										tabletMarginType: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Margin Tablet' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ 'uagb-margin-control' }
							value={ topMarginTablet }
							onChange={ ( value ) =>
								setAttributes( { topMarginTablet: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ 'uagb-margin-control' }
							value={ bottomMarginTablet }
							onChange={ ( value ) =>
								setAttributes( {
									bottomMarginTablet: value,
								} )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ 'uagb-margin-control' }
							value={ leftMarginTablet }
							onChange={ ( value ) =>
								setAttributes( { leftMarginTablet: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ 'uagb-margin-control' }
							value={ rightMarginTablet }
							onChange={ ( value ) =>
								setAttributes( {
									rightMarginTablet: value,
								} )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
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
								isPrimary={ mobileMarginType === 'px' }
								aria-pressed={ mobileMarginType === 'px' }
								onClick={ () =>
									setAttributes( {
										mobileMarginType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ mobileMarginType === '%' }
								aria-pressed={ mobileMarginType === '%' }
								onClick={ () =>
									setAttributes( {
										mobileMarginType: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Margin Mobile' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.top_margin }
							className={ 'uagb-margin-control' }
							value={ topMarginMobile }
							onChange={ ( value ) =>
								setAttributes( { topMarginMobile: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.bottom_margin }
							className={ 'uagb-margin-control' }
							value={ bottomMarginMobile }
							onChange={ ( value ) =>
								setAttributes( {
									bottomMarginMobile: value,
								} )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.left_margin }
							className={ 'uagb-margin-control' }
							value={ leftMarginMobile }
							onChange={ ( value ) =>
								setAttributes( { leftMarginMobile: value } )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.right_margin }
							className={ 'uagb-margin-control' }
							value={ rightMarginMobile }
							onChange={ ( value ) =>
								setAttributes( {
									rightMarginMobile: value,
								} )
							}
							min={ -2000 }
							max={ 2000 }
							allowReset
						/>
					</>
				) }
			</PanelBody>
		);
	};

	const getBackgroundPanelBody = () => {
		return (
			<PanelBody
				title={ __( 'Background', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
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
							value: 'none',
							label: __(
								'None',
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
						{
							value: 'image',
							label: __(
								'Image',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'video',
							label: __(
								'Video',
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
									style={ {
										backgroundColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									backgroundColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }
				{ 'image' == backgroundType && (
					<>
						<BaseControl
							id="section-image-settings"
							className="editor-bg-image-control"
							label={ __(
								'Background Image',
								'ultimate-addons-for-gutenberg'
							) }
						>
							<MediaUpload
								title={ __(
									'Select Background Image',
									'ultimate-addons-for-gutenberg'
								) }
								onSelect={ onSelectImage }
								allowedTypes={ [ 'image' ] }
								value={ backgroundImage }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ ! backgroundImage
											? __(
													'Select Background Image',
													'ultimate-addons-for-gutenberg'
											  )
											: __(
													'Replace image',
													'ultimate-addons-for-gutenberg'
											  ) }
									</Button>
								) }
							/>
							{ backgroundImage && (
								<Button
									className="uagb-rm-btn"
									onClick={ onRemoveImage }
									isLink
									isDestructive
								>
									{ __( 'Remove Image' ) }
								</Button>
							) }
						</BaseControl>
						{ backgroundImage && (
							<>
								<SelectControl
									label={ __(
										'Image Position',
										'ultimate-addons-for-gutenberg'
									) }
									value={ backgroundPosition }
									onChange={ ( value ) =>
										setAttributes( {
											backgroundPosition: value,
										} )
									}
									options={ [
										{
											value: 'top-left',
											label: __(
												'Top Left',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'top-center',
											label: __(
												'Top Center',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'top-right',
											label: __(
												'Top Right',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'center-left',
											label: __(
												'Center Left',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'center-center',
											label: __(
												'Center Center',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'center-right',
											label: __(
												'Center Right',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'bottom-left',
											label: __(
												'Bottom Left',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'bottom-center',
											label: __(
												'Bottom Center',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'bottom-right',
											label: __(
												'Bottom Right',
												'ultimate-addons-for-gutenberg'
											),
										},
									] }
								/>
								<SelectControl
									label={ __(
										'Attachment',
										'ultimate-addons-for-gutenberg'
									) }
									value={ backgroundAttachment }
									onChange={ ( value ) =>
										setAttributes( {
											backgroundAttachment: value,
										} )
									}
									options={ [
										{
											value: 'fixed',
											label: __(
												'Fixed',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'scroll',
											label: __(
												'Scroll',
												'ultimate-addons-for-gutenberg'
											),
										},
									] }
								/>
								<SelectControl
									label={ __(
										'Repeat',
										'ultimate-addons-for-gutenberg'
									) }
									value={ backgroundRepeat }
									onChange={ ( value ) =>
										setAttributes( {
											backgroundRepeat: value,
										} )
									}
									options={ [
										{
											value: 'no-repeat',
											label: __(
												'No Repeat',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'repeat',
											label: __(
												'Repeat',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'repeat-x',
											label: __(
												'Repeat-x',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'repeat-y',
											label: __(
												'Repeat-y',
												'ultimate-addons-for-gutenberg'
											),
										},
									] }
								/>
								<SelectControl
									label={ __(
										'Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ backgroundSize }
									onChange={ ( value ) =>
										setAttributes( {
											backgroundSize: value,
										} )
									}
									options={ [
										{
											value: 'auto',
											label: __(
												'Auto',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'cover',
											label: __(
												'Cover',
												'ultimate-addons-for-gutenberg'
											),
										},
										{
											value: 'contain',
											label: __(
												'Contain',
												'ultimate-addons-for-gutenberg'
											),
										},
									] }
								/>
								<SelectControl
									label={ __(
										'Image Overlay Type',
										'ultimate-addons-for-gutenberg'
									) }
									value={ overlayType }
									onChange={ ( value ) =>
										setAttributes( {
											overlayType: value,
										} )
									}
									options={ [
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
								{ overlayType == 'color' && (
									<>
										<p className="uagb-setting-label">
											{ __(
												'Image Overlay Color',
												'ultimate-addons-for-gutenberg'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: backgroundImageColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ backgroundImageColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													backgroundImageColor: colorValue,
												} )
											}
											allowReset
										/>
									</>
								) }

								{ 'gradient' == overlayType && (
									<>
										<p className="uagb-setting-label">
											{ __(
												'Color 1',
												'ultimate-addons-for-gutenberg'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: backgroundVideoColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ gradientOverlayColor1 }
											onChange={ ( colorValue ) =>
												setAttributes( {
													gradientOverlayColor1: colorValue,
												} )
											}
											allowReset
										/>
										<RangeControl
											label={ __(
												'Location 1',
												'ultimate-addons-for-gutenberg'
											) }
											value={ gradientOverlayLocation1 }
											onChange={ ( value ) =>
												setAttributes( {
													gradientOverlayLocation1: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<p className="uagb-setting-label">
											{ __(
												'Color 2',
												'ultimate-addons-for-gutenberg'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: backgroundVideoColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ gradientOverlayColor2 }
											onChange={ ( colorValue ) =>
												setAttributes( {
													gradientOverlayColor2: colorValue,
												} )
											}
											allowReset
										/>
										<RangeControl
											label={ __(
												'Location 2',
												'ultimate-addons-for-gutenberg'
											) }
											value={ gradientOverlayLocation2 }
											onChange={ ( value ) =>
												setAttributes( {
													gradientOverlayLocation2: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<SelectControl
											label={ __(
												'Type',
												'ultimate-addons-for-gutenberg'
											) }
											value={ gradientOverlayType }
											onChange={ ( value ) =>
												setAttributes( {
													gradientOverlayType: value,
												} )
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
										{ 'linear' == gradientOverlayType && (
											<RangeControl
												label={ __(
													'Angle',
													'ultimate-addons-for-gutenberg'
												) }
												value={ gradientOverlayAngle }
												onChange={ ( value ) =>
													setAttributes( {
														gradientOverlayAngle: value,
													} )
												}
												min={ 0 }
												max={ 360 }
												allowReset
											/>
										) }
										{ 'radial' == gradientOverlayType && (
											<SelectControl
												label={ __(
													'Type',
													'ultimate-addons-for-gutenberg'
												) }
												value={
													gradientOverlayPosition
												}
												onChange={ ( value ) =>
													setAttributes( {
														gradientOverlayPosition: value,
													} )
												}
												options={ [
													{
														value: 'center center',
														label: __(
															'Center Center',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'center left',
														label: __(
															'Center Left',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'center right',
														label: __(
															'Center Right',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'top center',
														label: __(
															'Top Center',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'top left',
														label: __(
															'Top Left',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'top right',
														label: __(
															'Top Right',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'bottom center',
														label: __(
															'Bottom Center',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'bottom left',
														label: __(
															'Bottom Left',
															'ultimate-addons-for-gutenberg'
														),
													},
													{
														value: 'bottom right',
														label: __(
															'Bottom Right',
															'ultimate-addons-for-gutenberg'
														),
													},
												] }
											/>
										) }
									</>
								) }
							</>
						) }
					</>
				) }
				{ 'gradient' == backgroundType && (
					<>
						<GradientSettings
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</>
				) }
				{ 'video' == backgroundType && (
					<BaseControl
						id="section-video-settings"
						className="editor-bg-video-control"
						label={ __(
							'Background Video',
							'ultimate-addons-for-gutenberg'
						) }
					>
						<MediaUpload
							title={ __(
								'Select Background Video',
								'ultimate-addons-for-gutenberg'
							) }
							onSelect={ onSelectVideo }
							allowedTypes={ [ 'video' ] }
							value={ backgroundVideo }
							render={ ( { open } ) => (
								<Button isSecondary onClick={ open }>
									{ ! backgroundVideo
										? __(
												'Select Background Video',
												'ultimate-addons-for-gutenberg'
										  )
										: __(
												'Replace Video',
												'ultimate-addons-for-gutenberg'
										  ) }
								</Button>
							) }
						/>
						{ backgroundVideo && (
							<Button
								onClick={ onRemoveVideo }
								isLink
								isDestructive
							>
								{ __( 'Remove Video' ) }
							</Button>
						) }
					</BaseControl>
				) }
				{ ( 'color' == backgroundType ||
					( 'image' == backgroundType && backgroundImage ) ||
					'gradient' == backgroundType ) && (
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
				{ 'video' == backgroundType && backgroundVideo && (
					<>
						<p className="uagb-setting-label">
							{ __( 'Video Overlay Color' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: backgroundVideoColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ backgroundVideoColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									backgroundVideoColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }
				{ 'video' == backgroundType && backgroundVideo && (
					<RangeControl
						label={ __(
							'Opacity',
							'ultimate-addons-for-gutenberg'
						) }
						value={ backgroundVideoOpacity }
						onChange={ ( value ) =>
							setAttributes( {
								backgroundVideoOpacity: value,
							} )
						}
						min={ 0 }
						max={ 100 }
						allowReset
						initialPosition={ 50 }
					/>
				) }
			</PanelBody>
		);
	};

	const getBorderPanelBody = () => {
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
				{ 'none' != borderStyle && (
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
				{ 'none' != borderStyle && (
					<>
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
							onChange={ ( colorValue ) =>
								setAttributes( { borderColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }

				<BoxShadowControl
					setAttributes={ setAttributes }
					label={ __(
						'Box Shadow',
						'ultimate-addons-for-gutenberg'
					) }
					boxShadowColor={ {
						value: boxShadowColor,
						label: __( 'Color', 'ultimate-addons-for-gutenberg' ),
					} }
					boxShadowHOffset={ {
						value: boxShadowHOffset,
						label: __(
							'Horizontal',
							'ultimate-addons-for-gutenberg'
						),
					} }
					boxShadowVOffset={ {
						value: boxShadowVOffset,
						label: __(
							'Vertical',
							'ultimate-addons-for-gutenberg'
						),
					} }
					boxShadowBlur={ {
						value: boxShadowBlur,
						label: __( 'Blur', 'ultimate-addons-for-gutenberg' ),
					} }
					boxShadowSpread={ {
						value: boxShadowSpread,
						label: __( 'Spread', 'ultimate-addons-for-gutenberg' ),
					} }
					boxShadowPosition={ {
						value: boxShadowPosition,
						label: __(
							'Position',
							'ultimate-addons-for-gutenberg'
						),
					} }
				/>
			</PanelBody>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ blockControls }
				/>
			</BlockControls>
			<InspectorControls>
				{ getLayoutPanelBody() }
				{ getSpacingPanelBody() }
				{ getBackgroundPanelBody() }
				{ getBorderPanelBody() }
			</InspectorControls>
		</Suspense>
	);
};

export default React.memo( Settings );
