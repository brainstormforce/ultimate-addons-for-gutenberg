/**
 * BLOCK: Columns - Settings.
 */
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';
import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import GradientSettings from '@Components/gradient-settings';
import ColumnResponsive from '@Components/typography/column-responsive';
import OptionSelectorControl from '@Components/option-selector-control';
import BoxShadowControl from '@Components/box-shadow';

import {
	BlockControls,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentToolbar,
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
	TabPanel,
	Dashicon,
} from '@wordpress/components';

const Settings = ( props ) => {
	const { attributes, setAttributes, deviceType } = props.parentProps;

	const {
		stack,
		align,
		vAlign,
		contentWidth,
		width,
		widthType,
		tag,
		columnGap,
		topMargin,
		bottomMargin,
		topMarginMobile,
		bottomMarginMobile,
		topMarginTablet,
		bottomMarginTablet,
		topPadding,
		bottomPadding,
		leftPadding,
		rightPadding,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
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
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		columns,
		bottomType,
		bottomColor,
		bottomHeight,
		bottomHeightTablet,
		bottomHeightMobile,
		bottomWidth,
		topType,
		topColor,
		topHeight,
		topHeightTablet,
		topHeightMobile,
		topWidth,
		bottomFlip,
		topFlip,
		reverseTablet,
		reverseMobile,
		topDividerOpacity,
		bottomDividerOpacity,
		topContentAboveShape,
		bottomContentAboveShape,
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

	const blockControlSettings = () => {
		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'wide', 'full' ] }
				/>
				<BlockVerticalAlignmentToolbar
					value={ vAlign }
					onChange={ ( value ) => {
						setAttributes( { vAlign: value } );
					} }
				/>
			</BlockControls>
		);
	};
	const layoutSettings = () => {
		return (
			<PanelBody
				title={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
			>
				<RangeControl
					label={ __( 'Columns', 'ultimate-addons-for-gutenberg' ) }
					value={ columns }
					min={ 0 }
					max={ 6 }
					onChange={ ( value ) =>
						setAttributes( { columns: value } )
					}
				/>
				<SelectControl
					label={ __( 'Stack on', 'ultimate-addons-for-gutenberg' ) }
					value={ stack }
					options={ [
						{
							value: 'none',
							label: __(
								'None',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'tablet',
							label: __(
								'Tablet & Mobile',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'mobile',
							label: __(
								'Mobile',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) => setAttributes( { stack: value } ) }
					help={ __(
						'Note: Choose on what breakpoint the columns will stack.',
						'ultimate-addons-for-gutenberg'
					) }
				/>
				<SelectControl
					label={ __(
						'Container Width',
						'ultimate-addons-for-gutenberg'
					) }
					value={ contentWidth }
					onChange={ ( value ) =>
						setAttributes( { contentWidth: value } )
					}
					options={ [
						{
							value: 'theme',
							label: __(
								'Theme Container Width',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'custom',
							label: __(
								'Custom',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ contentWidth == 'custom' && (
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
								isPrimary={ widthType === 'px' }
								aria-pressed={ widthType === 'px' }
								min={ 0 }
								max={ 2000 }
								onClick={ () =>
									setAttributes( { widthType: 'px' } )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthType === '%' }
								aria-pressed={ widthType === '%' }
								min={ 0 }
								max={ 100 }
								onClick={ () =>
									setAttributes( { widthType: '%' } )
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
							value={ width }
							min={ 0 }
							max={ '%' == widthType ? 100 : 2000 }
							onChange={ ( value ) =>
								setAttributes( { width: value } )
							}
						/>
					</>
				) }
				<OptionSelectorControl
					label={ __(
						'Column Gap',
						'ultimate-addons-for-gutenberg'
					) }
					currentOption={ columnGap }
					options={ [
						{
							value: '10',
							label: __(
								'Default',
								'ultimate-addons-for-gutenberg'
							),
							tooltip: __(
								'Default (10px)',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: '0',
							label: __(
								'None',
								'ultimate-addons-for-gutenberg'
							),
							tooltip: __(
								'No Gap (0px)',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: '5',
							label: __( 'S', 'ultimate-addons-for-gutenberg' ),
							tooltip: __(
								'Narrow (5px)',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: '15',
							label: __( 'M', 'ultimate-addons-for-gutenberg' ),
							tooltip: __(
								'Extended (15px)',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: '20',
							label: __( 'L', 'ultimate-addons-for-gutenberg' ),
							tooltip: __(
								'Wide (20px)',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: '30',
							label: __( 'XL', 'ultimate-addons-for-gutenberg' ),
							tooltip: __(
								'Wider (30px)',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { columnGap: value } )
					}
					help={ __(
						'Note: The individual Column Gap can be managed from Column Settings.',
						'ultimate-addons-for-gutenberg'
					) }
				/>
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
				<ToggleControl
					label={ __(
						'Reverse Columns (Tablet & Mobile)',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ reverseTablet }
					onChange={ () =>
						setAttributes( { reverseTablet: ! reverseTablet } )
					}
				/>
				<ToggleControl
					label={ __(
						'Reverse Columns (Mobile)',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ reverseMobile }
					onChange={ () =>
						setAttributes( { reverseMobile: ! reverseMobile } )
					}
				/>
			</PanelBody>
		);
	};
	const spacingSettings = () => {
		return (
			<PanelBody title={ __( 'Spacing' ) } initialOpen={ false }>
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
									setAttributes( { desktopPaddingType: '%' } )
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
							aria-label={ __(
								'Size Type',
								'ultimate-addons-for-gutenberg'
							) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ tabletPaddingType === 'px' }
								aria-pressed={ tabletPaddingType === 'px' }
								onClick={ () =>
									setAttributes( { tabletPaddingType: 'px' } )
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
									setAttributes( { tabletPaddingType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __( 'Padding', 'ultimate-addons-for-gutenberg' ) }
						</h2>
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
								setAttributes( { bottomPaddingTablet: value } )
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
								setAttributes( { leftPaddingTablet: value } )
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
								setAttributes( { rightPaddingTablet: value } )
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
							aria-label={ __(
								'Size Type',
								'ultimate-addons-for-gutenberg'
							) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ mobilePaddingType === 'px' }
								aria-pressed={ mobilePaddingType === 'px' }
								onClick={ () =>
									setAttributes( { mobilePaddingType: 'px' } )
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
									setAttributes( { mobilePaddingType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __( 'Padding', 'ultimate-addons-for-gutenberg' ) }
						</h2>
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
								setAttributes( { bottomPaddingMobile: value } )
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
								setAttributes( { leftPaddingMobile: value } )
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
								setAttributes( { rightPaddingMobile: value } )
							}
							min={ 0 }
							max={ '%' == mobilePaddingType ? 100 : 2000 }
							allowReset
						/>
					</>
				) }
				<hr className="uagb-editor__separator" />
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
								isPrimary={ desktopMarginType === 'px' }
								aria-pressed={ desktopMarginType === 'px' }
								onClick={ () =>
									setAttributes( { desktopMarginType: 'px' } )
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
									setAttributes( { desktopMarginType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __( 'Margin', 'ultimate-addons-for-gutenberg' ) }
						</h2>
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
								isPrimary={ tabletMarginType === 'px' }
								aria-pressed={ tabletMarginType === 'px' }
								onClick={ () =>
									setAttributes( { tabletMarginType: 'px' } )
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
									setAttributes( { tabletMarginType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __(
								'Margin Tablet',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
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
								setAttributes( { bottomMarginTablet: value } )
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
							aria-label={ __(
								'Size Type',
								'ultimate-addons-for-gutenberg'
							) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ mobileMarginType === 'px' }
								aria-pressed={ mobileMarginType === 'px' }
								onClick={ () =>
									setAttributes( { mobileMarginType: 'px' } )
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
									setAttributes( { mobileMarginType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>
							{ __(
								'Margin Mobile',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
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
								setAttributes( { bottomMarginMobile: value } )
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
	const backgroundSettings = () => {
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
								setAttributes( { backgroundColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
				{ 'image' == backgroundType && (
					<>
						<BaseControl
							id="Background Image"
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
									{ __(
										'Remove Image',
										'ultimate-addons-for-gutenberg'
									) }
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
						id="Background Video"
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
								{ __(
									'Remove Video',
									'ultimate-addons-for-gutenberg'
								) }
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
							{ __(
								'Video Overlay Color',
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
							setAttributes( { backgroundVideoOpacity: value } )
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
	const shapeDividersSettings = () => {
		const dividers = [
			{
				value: 'none',
				label: __( 'None', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'tilt',
				label: __( 'Tilt', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'mountains',
				label: __( 'Mountains', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'wave_brush',
				label: __( 'Wave Brush', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'waves',
				label: __( 'Waves', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'wave_pattern',
				label: __( 'Waves Pattern', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'triangle',
				label: __( 'Triangle', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'drops',
				label: __( 'Drops', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'clouds',
				label: __( 'Clouds', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'zigzag',
				label: __( 'ZigZag', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'pyramids',
				label: __( 'Pyramids', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'triangle_asymmetrical',
				label: __(
					'Triangle Asymmetrical',
					'ultimate-addons-for-gutenberg'
				),
			},
			{
				value: 'tilt_opacity',
				label: __( 'Tilt Opacity', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'fan_opacity',
				label: __( 'Fan Opacity', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'curve',
				label: __( 'Curve', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'curve_asymmetrical',
				label: __(
					'Curve Asymmetrical',
					'ultimate-addons-for-gutenberg'
				),
			},
			{
				value: 'curve_reverse',
				label: __( 'Curve Reverse', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'curve_asym_reverse',
				label: __(
					'Curve Asymmetrical Reverse',
					'ultimate-addons-for-gutenberg'
				),
			},
			{
				value: 'arrow',
				label: __( 'Arrow', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'arrow_split',
				label: __( 'Arrow Split', 'ultimate-addons-for-gutenberg' ),
			},
			{
				value: 'book',
				label: __( 'Book', 'ultimate-addons-for-gutenberg' ),
			},
		];

		const topSettings = (
			<>
				<SelectControl
					label={ __( 'Type', 'ultimate-addons-for-gutenberg' ) }
					value={ topType }
					onChange={ ( value ) =>
						setAttributes( { topType: value } )
					}
					options={ dividers }
				/>
				{ topType != 'none' && (
					<>
						<p className="uagb-setting-label">
							{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { topColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ topColor }
							onChange={ ( colorValue ) =>
								setAttributes( { topColor: colorValue } )
							}
							allowReset
						/>
						<RangeControl
							label={ __(
								'Opacity',
								'ultimate-addons-for-gutenberg'
							) }
							value={ topDividerOpacity }
							onChange={ ( value ) =>
								setAttributes( { topDividerOpacity: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __(
								'Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ topWidth }
							onChange={ ( value ) =>
								setAttributes( { topWidth: value } )
							}
							min={ 100 }
							max={ 2000 }
							allowReset
						/>
						<TabPanel
							className="uagb-size-type-field-tabs uagb-without-size-type"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'desktop',
									title: <Dashicon icon="desktop" />,
									className:
										'uagb-desktop-tab uagb-responsive-tabs',
								},
								{
									name: 'tablet',
									title: <Dashicon icon="tablet" />,
									className:
										'uagb-tablet-tab uagb-responsive-tabs',
								},
								{
									name: 'mobile',
									title: <Dashicon icon="smartphone" />,
									className:
										'uagb-mobile-tab uagb-responsive-tabs',
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
											value={ topHeightMobile }
											onChange={ ( value ) =>
												setAttributes( {
													topHeightMobile: value,
												} )
											}
											min={ 0 }
											max={ 500 }
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
											value={ topHeightTablet }
											onChange={ ( value ) =>
												setAttributes( {
													topHeightTablet: value,
												} )
											}
											min={ 0 }
											max={ 500 }
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
											value={ topHeight }
											onChange={ ( value ) =>
												setAttributes( {
													topHeight: value,
												} )
											}
											min={ 0 }
											max={ 500 }
											allowReset
										/>
									);
								}

								return <div>{ tabout }</div>;
							} }
						</TabPanel>
						<ToggleControl
							label={ __(
								'Flip',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ topFlip }
							onChange={ () =>
								setAttributes( { topFlip: ! topFlip } )
							}
						/>
						<ToggleControl
							label={ __(
								'Bring To Front',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ topContentAboveShape }
							onChange={ () =>
								setAttributes( {
									topContentAboveShape: ! topContentAboveShape,
								} )
							}
						/>
					</>
				) }
			</>
		);

		const bottomSettings = (
			<>
				<SelectControl
					label={ __( 'Type', 'ultimate-addons-for-gutenberg' ) }
					value={ bottomType }
					onChange={ ( value ) =>
						setAttributes( { bottomType: value } )
					}
					options={ dividers }
				/>
				{ bottomType != 'none' && (
					<>
						<p className="uagb-setting-label">
							{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { bottomColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ bottomColor }
							onChange={ ( colorValue ) =>
								setAttributes( { bottomColor: colorValue } )
							}
							allowReset
						/>
						<RangeControl
							label={ __(
								'Opacity',
								'ultimate-addons-for-gutenberg'
							) }
							value={ bottomDividerOpacity }
							onChange={ ( value ) =>
								setAttributes( { bottomDividerOpacity: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __(
								'Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ bottomWidth }
							onChange={ ( value ) =>
								setAttributes( { bottomWidth: value } )
							}
							min={ 100 }
							max={ 2000 }
							allowReset
						/>
						<TabPanel
							className="uagb-size-type-field-tabs uagb-without-size-type"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'desktop',
									title: <Dashicon icon="desktop" />,
									className:
										'uagb-desktop-tab uagb-responsive-tabs',
								},
								{
									name: 'tablet',
									title: <Dashicon icon="tablet" />,
									className:
										'uagb-tablet-tab uagb-responsive-tabs',
								},
								{
									name: 'mobile',
									title: <Dashicon icon="smartphone" />,
									className:
										'uagb-mobile-tab uagb-responsive-tabs',
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
											value={ bottomHeightMobile }
											onChange={ ( value ) =>
												setAttributes( {
													bottomHeightMobile: value,
												} )
											}
											min={ 0 }
											max={ 500 }
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
											value={ bottomHeightTablet }
											onChange={ ( value ) =>
												setAttributes( {
													bottomHeightTablet: value,
												} )
											}
											min={ 0 }
											max={ 500 }
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
											value={ bottomHeight }
											onChange={ ( value ) =>
												setAttributes( {
													bottomHeight: value,
												} )
											}
											min={ 0 }
											max={ 500 }
											allowReset
										/>
									);
								}

								return <div>{ tabout }</div>;
							} }
						</TabPanel>
						<ToggleControl
							label={ __(
								'Flip',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ bottomFlip }
							onChange={ () =>
								setAttributes( { bottomFlip: ! bottomFlip } )
							}
						/>
						<ToggleControl
							label={ __(
								'Bring To Front',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ bottomContentAboveShape }
							onChange={ () =>
								setAttributes( {
									bottomContentAboveShape: ! bottomContentAboveShape,
								} )
							}
						/>
					</>
				) }
			</>
		);

		return (
			<PanelBody
				title={ __(
					'Shape Dividers',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ false }
			>
				<TabPanel
					className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'top',
							title: __( 'Top', 'ultimate-addons-for-gutenberg' ),
							className: 'uagb-top-tab',
						},
						{
							name: 'bottom',
							title: __(
								'Bottom',
								'ultimate-addons-for-gutenberg'
							),
							className: 'uagb-bottom-tab',
						},
					] }
				>
					{ ( tabName ) => {
						let tabout;
						if ( 'bottom' === tabName.name ) {
							tabout = bottomSettings;
						} else {
							tabout = topSettings;
						}
						return <div>{ tabout }</div>;
					} }
				</TabPanel>
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
			{ blockControlSettings() }
			<InspectorControls>
				{ layoutSettings() }
				{ spacingSettings() }
				{ backgroundSettings() }
				{ shapeDividersSettings() }
				{ borderSettings() }
			</InspectorControls>
		</Suspense>
	);
};

export default React.memo( Settings );
