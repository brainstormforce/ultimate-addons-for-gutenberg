/**
 * External dependencies
 */
import UAGB_Block_Icons from '@Controls/block-icons';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';
import styling from '.././styling';
import { compose } from '@wordpress/compose';
import TypographyControl from '@Components/typography';
import ColumnResponsive from '@Components/typography/column-responsive';

const Settings = lazy( () =>
	import(
		/* webpackChunkName: "chunks/post-masonry/settings" */ './settings'
	)
);

const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/post-masonry/render" */ './render' )
);

const MAX_POSTS_COLUMNS = 8;

import {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl,
	TabPanel,
	ButtonGroup,
	Button,
	Dashicon,
	TextControl,
	RadioControl,
} from '@wordpress/components';

import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

import { withSelect, withDispatch } from '@wordpress/data';

const UAGBPostMasonry = ( props ) => {
	const [ state, setState ] = useState( {
		isEditing: false,
		innerBlocks: [],
	} );

	useEffect( () => {
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-post-masonry-style-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}, [] );

	useEffect( () => {
		const element = document.getElementById(
			'uagb-post-masonry-style-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	const togglePreview = () => {
		setState( { isEditing: ! state.isEditing } );
		if ( ! state.isEditing ) {
			__( 'Showing All Post Masonry Layout.' );
		}
	};

	const onSelectPostType = ( value ) => {
		const { setAttributes } = props;

		setAttributes( { postType: value } );
		setAttributes( { categories: '' } );
	};

	const onSelectTaxonomyType = ( value ) => {
		const { setAttributes } = props;

		setAttributes( { taxonomyType: value } );
		setAttributes( { categories: '' } );
	};

	const {
		attributes,
		categoriesList,
		setAttributes,
		latestPosts,
		deviceType,
		taxonomyList,
	} = props;

	const {
		displayPostTitle,
		displayPostDate,
		displayPostComment,
		displayPostExcerpt,
		displayPostAuthor,
		displayPostImage,
		displayPostTaxonomy,
		imgSize,
		imgPosition,
		displayPostLink,
		newTab,
		ctaText,
		borderWidth,
		borderStyle,
		borderColor,
		borderHColor,
		borderRadius,
		btnVPadding,
		btnHPadding,
		columns,
		tcolumns,
		mcolumns,
		order,
		orderBy,
		categories,
		postsToShow,
		rowGap,
		columnGap,
		bgColor,
		contentPadding,
		contentPaddingMobile,
		titleColor,
		titleTag,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		titleLoadGoogleFonts,
		metaFontSize,
		metaFontSizeType,
		metaFontSizeMobile,
		metaFontSizeTablet,
		metaFontFamily,
		metaFontWeight,
		metaFontSubset,
		metaLineHeightType,
		metaLineHeight,
		metaLineHeightTablet,
		metaLineHeightMobile,
		metaLoadGoogleFonts,
		excerptFontSize,
		excerptFontSizeType,
		excerptFontSizeTablet,
		excerptFontSizeMobile,
		excerptFontFamily,
		excerptFontWeight,
		excerptFontSubset,
		excerptLineHeightType,
		excerptLineHeight,
		excerptLineHeightTablet,
		excerptLineHeightMobile,
		excerptLoadGoogleFonts,
		ctaFontSize,
		ctaFontSizeType,
		ctaFontSizeTablet,
		ctaFontSizeMobile,
		ctaFontFamily,
		ctaFontWeight,
		ctaFontSubset,
		ctaLineHeightType,
		ctaLineHeight,
		ctaLineHeightTablet,
		ctaLineHeightMobile,
		ctaLoadGoogleFonts,
		metaColor,
		excerptColor,
		ctaColor,
		ctaBgColor,
		ctaHColor,
		ctaBgHColor,
		imageBottomSpace,
		ctaBottomSpace,
		titleBottomSpace,
		metaBottomSpace,
		excerptBottomSpace,
		excerptLength,
		overlayOpacity,
		bgOverlayColor,
		linkBox,
		postType,
		taxonomyType,
		inheritFromTheme,
		postDisplaytext,
		paginationType,
		paginationEventType,
		buttonText,
		paginationAlign,
		paginationTextColor,
		paginationTextHoverColor,
		paginationMasonryBgColor,
		paginationBgHoverColor,
		paginationMasonryBorderStyle,
		paginationMasonryBorderWidth,
		paginationMasonryBorderRadius,
		paginationMasonryBorderColor,
		paginationFontSize,
		loaderColor,
		loaderSize,
		paginationButtonPaddingType,
		vpaginationButtonPaddingMobile,
		vpaginationButtonPaddingTablet,
		vpaginationButtonPaddingDesktop,
		hpaginationButtonPaddingMobile,
		hpaginationButtonPaddingTablet,
		hpaginationButtonPaddingDesktop,
		displayPostContentRadio,
		excludeCurrentPost,
	} = attributes;

	const hoverSettings = (
		<>
			<p className="uagb-setting-label">
				{ __( 'Hover Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: ctaHColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ ctaHColor }
				onChange={ ( colorValue ) =>
					setAttributes( { ctaHColor: colorValue } )
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
						style={ { backgroundColor: ctaBgHColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ ctaBgHColor }
				onChange={ ( colorValue ) =>
					setAttributes( { ctaBgHColor: colorValue } )
				}
				allowReset
			/>
			<p className="uagb-setting-label">
				{ __( 'Border Hover Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: borderHColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ borderHColor }
				onChange={ ( colorValue ) =>
					setAttributes( { borderHColor: colorValue } )
				}
				allowReset
			/>
		</>
	);

	const normalSettings = (
		<>
			<p className="uagb-setting-label">
				{ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: ctaColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ ctaColor }
				onChange={ ( colorValue ) =>
					setAttributes( { ctaColor: colorValue } )
				}
				allowReset
			/>
			<p className="uagb-setting-label">
				{ __( 'Background Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: ctaBgColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ ctaBgColor }
				onChange={ ( colorValue ) =>
					setAttributes( { ctaBgColor: colorValue } )
				}
				allowReset
			/>
			<p className="uagb-setting-label">
				{ __( 'Border Color', 'ultimate-addons-for-gutenberg' ) }
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
	);

	const taxonomyListOptions = [];

	const categoryListOptions = [
		{ value: '', label: __( 'All', 'ultimate-addons-for-gutenberg' ) },
	];

	if ( '' != taxonomyList ) {
		Object.keys( taxonomyList ).map( ( item ) => {
			return taxonomyListOptions.push( {
				value: taxonomyList[ item ].name,
				label: taxonomyList[ item ].label,
			} );
		} );
	}

	if ( '' != categoriesList ) {
		Object.keys( categoriesList ).map( ( item ) => {
			return categoryListOptions.push( {
				value: categoriesList[ item ].id,
				label: categoriesList[ item ].name,
			} );
		} );
	}

	const paginationSettings = () => {
		if ( 'infinite' === paginationType ) {
			return (
				<PanelBody
					title={ __(
						'Pagination',
						'ultimate-addons-for-gutenberg'
					) }
					initialOpen={ false }
					className="uagb__url-panel-body"
				>
					{ 'button' === paginationEventType && (
						<>
							<h2>
								{ ' ' }
								{ __(
									'Alignment',
									'ultimate-addons-for-gutenberg'
								) }
							</h2>
							<Button
								key={ 'left' }
								icon="editor-alignleft"
								label="Left"
								onClick={ () =>
									setAttributes( { paginationAlign: 'left' } )
								}
								aria-pressed={ 'left' === paginationAlign }
								isPrimary={ 'left' === paginationAlign }
							/>
							<Button
								key={ 'center' }
								icon="editor-aligncenter"
								label="Right"
								onClick={ () =>
									setAttributes( {
										paginationAlign: 'center',
									} )
								}
								aria-pressed={ 'center' === paginationAlign }
								isPrimary={ 'center' === paginationAlign }
							/>
							<Button
								key={ 'right' }
								icon="editor-alignright"
								label="Right"
								onClick={ () =>
									setAttributes( {
										paginationAlign: 'right',
									} )
								}
								aria-pressed={ 'right' === paginationAlign }
								isPrimary={ 'right' === paginationAlign }
							/>
							<h2>
								{ ' ' }
								{ __(
									'Font Size (px) ',
									'ultimate-addons-for-gutenberg'
								) }{ ' ' }
							</h2>
							<RangeControl
								value={ paginationFontSize }
								onChange={ ( value ) =>
									setAttributes( {
										paginationFontSize: value,
									} )
								}
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<TabPanel
								className="uagb-size-type-field-tabs uagb-size-type-field__common-tabs uagb-inline-margin"
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
														isPrimary={
															paginationButtonPaddingType ===
															'px'
														}
														aria-pressed={
															paginationButtonPaddingType ===
															'px'
														}
														onClick={ () =>
															setAttributes( {
																paginationButtonPaddingType:
																	'px',
															} )
														}
													>
														{ 'px' }
													</Button>
													<Button
														key={ '%' }
														className="uagb-size-btn"
														isSmall
														isPrimary={
															paginationButtonPaddingType ===
															'%'
														}
														aria-pressed={
															paginationButtonPaddingType ===
															'%'
														}
														onClick={ () =>
															setAttributes( {
																paginationButtonPaddingType:
																	'%',
															} )
														}
													>
														{ '%' }
													</Button>
												</ButtonGroup>
												<h2>
													{ __(
														'Padding',
														'ultimate-addons-for-gutenberg'
													) }
												</h2>
												<RangeControl
													label={
														UAGB_Block_Icons.vertical_spacing
													}
													className={
														'uagb-margin-control'
													}
													value={
														vpaginationButtonPaddingMobile
													}
													onChange={ ( value ) =>
														setAttributes( {
															vpaginationButtonPaddingMobile: value,
														} )
													}
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={
														UAGB_Block_Icons.horizontal_spacing
													}
													className={
														'uagb-margin-control'
													}
													value={
														hpaginationButtonPaddingMobile
													}
													onChange={ ( value ) =>
														setAttributes( {
															hpaginationButtonPaddingMobile: value,
														} )
													}
													min={ 0 }
													max={ 100 }
													allowReset
												/>
											</>
										);
									} else if ( 'tablet' === tab.name ) {
										tabout = (
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
														isPrimary={
															paginationButtonPaddingType ===
															'px'
														}
														aria-pressed={
															paginationButtonPaddingType ===
															'px'
														}
														onClick={ () =>
															setAttributes( {
																paginationButtonPaddingType:
																	'px',
															} )
														}
													>
														{ 'px' }
													</Button>
													<Button
														key={ '%' }
														className="uagb-size-btn"
														isSmall
														isPrimary={
															paginationButtonPaddingType ===
															'%'
														}
														aria-pressed={
															paginationButtonPaddingType ===
															'%'
														}
														onClick={ () =>
															setAttributes( {
																paginationButtonPaddingType:
																	'%',
															} )
														}
													>
														{ '%' }
													</Button>
												</ButtonGroup>
												<h2>
													{ __(
														'Padding',
														'ultimate-addons-for-gutenberg'
													) }
												</h2>
												<RangeControl
													label={
														UAGB_Block_Icons.vertical_spacing
													}
													className={
														'uagb-margin-control'
													}
													value={
														vpaginationButtonPaddingTablet
													}
													onChange={ ( value ) =>
														setAttributes( {
															vpaginationButtonPaddingTablet: value,
														} )
													}
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={
														UAGB_Block_Icons.horizontal_spacing
													}
													className={
														'uagb-margin-control'
													}
													value={
														hpaginationButtonPaddingTablet
													}
													onChange={ ( value ) =>
														setAttributes( {
															hpaginationButtonPaddingTablet: value,
														} )
													}
													min={ 0 }
													max={ 100 }
													allowReset
												/>
											</>
										);
									} else {
										tabout = (
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
														isPrimary={
															paginationButtonPaddingType ===
															'px'
														}
														aria-pressed={
															paginationButtonPaddingType ===
															'px'
														}
														onClick={ () =>
															setAttributes( {
																paginationButtonPaddingType:
																	'px',
															} )
														}
													>
														{ 'px' }
													</Button>
													<Button
														key={ '%' }
														className="uagb-size-btn"
														isSmall
														isPrimary={
															paginationButtonPaddingType ===
															'%'
														}
														aria-pressed={
															paginationButtonPaddingType ===
															'%'
														}
														onClick={ () =>
															setAttributes( {
																paginationButtonPaddingType:
																	'%',
															} )
														}
													>
														{ '%' }
													</Button>
												</ButtonGroup>
												<h2>
													{ __(
														'Padding',
														'ultimate-addons-for-gutenberg'
													) }
												</h2>
												<RangeControl
													label={
														UAGB_Block_Icons.vertical_spacing
													}
													className={
														'uagb-margin-control'
													}
													value={
														vpaginationButtonPaddingDesktop
													}
													onChange={ ( value ) =>
														setAttributes( {
															vpaginationButtonPaddingDesktop: value,
														} )
													}
													min={ 0 }
													max={ 100 }
													allowReset
												/>
												<RangeControl
													label={
														UAGB_Block_Icons.horizontal_spacing
													}
													className={
														'uagb-margin-control'
													}
													value={
														hpaginationButtonPaddingDesktop
													}
													onChange={ ( value ) =>
														setAttributes( {
															hpaginationButtonPaddingDesktop: value,
														} )
													}
													min={ 0 }
													max={ 100 }
													allowReset
												/>
											</>
										);
									}

									return <div>{ tabout }</div>;
								} }
							</TabPanel>
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
									if ( 'normal' === tabName.name ) {
										return (
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
																backgroundColor: paginationTextColor,
															} }
														></span>
													</span>
												</p>
												<ColorPalette
													value={
														paginationTextColor
													}
													onChange={ ( colorValue ) =>
														setAttributes( {
															paginationTextColor: colorValue,
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
																backgroundColor: paginationMasonryBgColor,
															} }
														></span>
													</span>
												</p>
												<ColorPalette
													value={
														paginationMasonryBgColor
													}
													onChange={ ( colorValue ) =>
														setAttributes( {
															paginationMasonryBgColor: colorValue,
														} )
													}
													allowReset
												/>
											</>
										);
									}
									return (
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
															backgroundColor: paginationTextHoverColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={
													paginationTextHoverColor
												}
												onChange={ ( colorValue ) =>
													setAttributes( {
														paginationTextHoverColor: colorValue,
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
															backgroundColor: paginationBgHoverColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ paginationBgHoverColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														paginationBgHoverColor: colorValue,
													} )
												}
												allowReset
											/>
										</>
									);
								} }
							</TabPanel>
							<hr className="uagb-editor__separator" />
							<h2>
								{ ' ' }
								{ __(
									'Border',
									'ultimate-addons-for-gutenberg'
								) }{ ' ' }
							</h2>
							<SelectControl
								label={ __(
									'Style',
									'ultimate-addons-for-gutenberg'
								) }
								value={ paginationMasonryBorderStyle }
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
									setAttributes( {
										paginationMasonryBorderStyle: value,
									} );
								} }
							/>
							{ 'none' !== paginationMasonryBorderStyle && (
								<>
									<RangeControl
										label={ __(
											'Thickness (px)',
											'ultimate-addons-for-gutenberg'
										) }
										value={ paginationMasonryBorderWidth }
										onChange={ ( value ) => {
											setAttributes( {
												paginationMasonryBorderWidth: value,
											} );
										} }
										min={ 0 }
										max={ 20 }
									/>
									<RangeControl
										label={ __(
											'Rounded Corners (px)',
											'ultimate-addons-for-gutenberg'
										) }
										value={ paginationMasonryBorderRadius }
										onChange={ ( value ) => {
											setAttributes( {
												paginationMasonryBorderRadius: value,
											} );
										} }
										min={ 0 }
										max={ 50 }
									/>
									<p className="uagb-setting-label">
										{ __(
											'Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: paginationMasonryBorderColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ paginationMasonryBorderColor }
										onChange={ ( value ) =>
											setAttributes( {
												paginationMasonryBorderColor: value,
											} )
										}
										allowReset
									/>
								</>
							) }
						</>
					) }
					{ 'scroll' === paginationEventType && (
						<>
							<p className="uagb-setting-label">
								{ __(
									' Loader Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: loaderColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ loaderColor }
								onChange={ ( value ) =>
									setAttributes( { loaderColor: value } )
								}
								allowReset
							/>
							<RangeControl
								label={ __(
									'Loader Size',
									'ultimate-addons-for-gutenberg'
								) }
								value={ loaderSize }
								onChange={ ( value ) =>
									setAttributes( { loaderSize: value } )
								}
								min={ 1 }
								max={ 50 }
							/>
						</>
					) }
				</PanelBody>
			);
		}

		return '';
	};

	const inspectorControls = (
		<Suspense fallback={ lazyLoader() }>
			<InspectorControls>
				<PanelBody
					title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				>
					<SelectControl
						label={ __(
							'Post Type',
							'ultimate-addons-for-gutenberg'
						) }
						value={ postType }
						onChange={ ( value ) => onSelectPostType( value ) }
						options={ uagb_blocks_info.post_types }
					/>
					<hr className="uagb-editor__separator" />
					{ '' != taxonomyList && (
						<SelectControl
							label={ __(
								'Taxonomy',
								'ultimate-addons-for-gutenberg'
							) }
							value={ taxonomyType }
							onChange={ ( value ) =>
								onSelectTaxonomyType( value )
							}
							options={ taxonomyListOptions }
						/>
					) }
					{ '' != categoriesList && (
						<>
							<SelectControl
								label={ taxonomyList[ taxonomyType ].label }
								value={ categories }
								onChange={ ( value ) =>
									setAttributes( { categories: value } )
								}
								options={ categoryListOptions }
							/>
							<hr className="uagb-editor__separator" />
						</>
					) }
					<ToggleControl
						label={ __(
							'Exclude Current Post',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ excludeCurrentPost }
						onChange={ () =>
							setAttributes( {
								excludeCurrentPost: ! excludeCurrentPost,
							} )
						}
					/>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						onNumberOfItemsChange={ ( value ) =>
							setAttributes( { postsToShow: value } )
						}
					/>
					<SelectControl
						label={ __(
							'Order By',
							'ultimate-addons-for-gutenberg'
						) }
						value={ orderBy }
						onChange={ ( value ) =>
							setAttributes( { orderBy: value } )
						}
						options={ [
							{
								value: 'date',
								label: __(
									'Date',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'title',
								label: __(
									'Title',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'rand',
								label: __(
									'Random',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'menu_order',
								label: __(
									'Menu Order',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					<SelectControl
						label={ __( 'Order', 'ultimate-addons-for-gutenberg' ) }
						value={ order }
						onChange={ ( value ) =>
							setAttributes( { order: value } )
						}
						options={ [
							{
								value: 'desc',
								label: __(
									'Descending',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'asc',
								label: __(
									'Ascending',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					<ColumnResponsive />
					{ 'Desktop' === deviceType && (
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) =>
								setAttributes( { columns: value } )
							}
							min={ 1 }
							max={
								! hasPosts
									? MAX_POSTS_COLUMNS
									: Math.min(
											MAX_POSTS_COLUMNS,
											latestPosts.length
									  )
							}
						/>
					) }
					{ 'Tablet' === deviceType && (
						<RangeControl
							label={ __( 'Columns' ) }
							value={ tcolumns }
							onChange={ ( value ) =>
								setAttributes( { tcolumns: value } )
							}
							min={ 1 }
							max={
								! hasPosts
									? MAX_POSTS_COLUMNS
									: Math.min(
											MAX_POSTS_COLUMNS,
											latestPosts.length
									  )
							}
						/>
					) }
					{ 'Mobile' === deviceType && (
						<RangeControl
							label={ __( 'Columns' ) }
							value={ mcolumns }
							onChange={ ( value ) =>
								setAttributes( { mcolumns: value } )
							}
							min={ 1 }
							max={
								! hasPosts
									? MAX_POSTS_COLUMNS
									: Math.min(
											MAX_POSTS_COLUMNS,
											latestPosts.length
									  )
							}
						/>
					) }
					<SelectControl
						label={ __(
							'Pagination',
							'ultimate-addons-for-gutenberg'
						) }
						value={ paginationType }
						onChange={ ( value ) =>
							setAttributes( { paginationType: value } )
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
								value: 'infinite',
								label: __(
									'Infinite',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					{ 'infinite' === paginationType && (
						<SelectControl
							label={ __(
								'Infinite Load Event',
								'ultimate-addons-for-gutenberg'
							) }
							value={ paginationEventType }
							onChange={ ( value ) =>
								setAttributes( { paginationEventType: value } )
							}
							options={ [
								{
									value: 'button',
									label: __(
										'Button',
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
					) }
					{ 'infinite' === paginationType &&
						'button' === paginationEventType && (
							<TextControl
								autoComplete="off"
								label={ __(
									'Button Text',
									'ultimate-addons-for-gutenberg'
								) }
								value={ buttonText }
								onChange={ ( value ) =>
									setAttributes( { buttonText: value } )
								}
							/>
						) }
					<hr className="uagb-editor__separator" />
					<h2>
						{ __(
							'If Posts Not Found',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<TextControl
						autoComplete="off"
						label={ __(
							'Display Message',
							'ultimate-addons-for-gutenberg'
						) }
						value={ postDisplaytext }
						onChange={ ( value ) =>
							setAttributes( { postDisplaytext: value } )
						}
					/>
					<hr className="uagb-editor__separator" />
					<ToggleControl
						label={ __(
							'Inherit Styling from Theme',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ inheritFromTheme }
						onChange={ () =>
							setAttributes( {
								inheritFromTheme: ! inheritFromTheme,
							} )
						}
						help={ __(
							'This will inherit all the Typography and colors for Title, Meta, Excerpt and Read More button from the theme.',
							'ultimate-addons-for-gutenberg'
						) }
					/>
				</PanelBody>
				{ paginationSettings() }
				<PanelBody
					title={ __( 'Image', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Featured Image',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostImage }
						onChange={ () =>
							setAttributes( {
								displayPostImage: ! displayPostImage,
							} )
						}
					/>
					{ displayPostImage == true && (
						<SelectControl
							label={ __(
								'Image Sizes',
								'ultimate-addons-for-gutenberg'
							) }
							value={ imgSize }
							onChange={ ( value ) =>
								setAttributes( { imgSize: value } )
							}
							options={ uagb_blocks_info.image_sizes }
						/>
					) }
					{ displayPostImage == true && (
						<SelectControl
							label={ __(
								'Image Position',
								'ultimate-addons-for-gutenberg'
							) }
							value={ imgPosition }
							onChange={ ( value ) =>
								setAttributes( { imgPosition: value } )
							}
							options={ [
								{
									value: 'top',
									label: __(
										'Top',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'background',
									label: __(
										'Background',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
					) }
					{ displayPostImage == true && imgPosition == 'background' && (
						<>
							<p className="uagb-setting-label">
								{ __(
									'Background Overlay Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: bgOverlayColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ bgOverlayColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										bgOverlayColor: colorValue,
									} )
								}
								allowReset
							/>
							<RangeControl
								label={ __(
									'Overlay Opacity',
									'ultimate-addons-for-gutenberg'
								) }
								value={ overlayOpacity }
								onChange={ ( value ) =>
									setAttributes( { overlayOpacity: value } )
								}
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<ToggleControl
								label={ __(
									'Link Complete Box',
									'ultimate-addons-for-gutenberg'
								) }
								checked={ linkBox }
								onChange={ () =>
									setAttributes( { linkBox: ! linkBox } )
								}
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Title',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostTitle }
						onChange={ () =>
							setAttributes( {
								displayPostTitle: ! displayPostTitle,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Author',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostAuthor }
						onChange={ () =>
							setAttributes( {
								displayPostAuthor: ! displayPostAuthor,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Date',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostDate }
						onChange={ () =>
							setAttributes( {
								displayPostDate: ! displayPostDate,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Comment',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostComment }
						onChange={ () =>
							setAttributes( {
								displayPostComment: ! displayPostComment,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Taxonomy',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostTaxonomy }
						onChange={ () =>
							setAttributes( {
								displayPostTaxonomy: ! displayPostTaxonomy,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Excerpt',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostExcerpt }
						onChange={ () =>
							setAttributes( {
								displayPostExcerpt: ! displayPostExcerpt,
							} )
						}
					/>
					{ displayPostExcerpt && (
						<RadioControl
							label={ __(
								'Show:',
								'ultimate-addons-for-gutenberg'
							) }
							selected={ displayPostContentRadio }
							options={ [
								{
									label: __(
										'Excerpt',
										'ultimate-addons-for-gutenberg'
									),
									value: 'excerpt',
								},
								{
									label: __(
										'Full post',
										'ultimate-addons-for-gutenberg'
									),
									value: 'full_post',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									displayPostContentRadio: value,
								} )
							}
						/>
					) }
					{ displayPostExcerpt &&
						displayPostContentRadio === 'excerpt' && (
							<RangeControl
								label={ __(
									'Max number of words in excerpt',
									'ultimate-addons-for-gutenberg'
								) }
								value={ excerptLength }
								onChange={ ( value ) =>
									setAttributes( { excerptLength: value } )
								}
								min={ 1 }
								max={ 100 }
								allowReset
							/>
						) }
				</PanelBody>
				<PanelBody
					title={ __(
						'Read More Link',
						'ultimate-addons-for-gutenberg'
					) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Read More Link',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ displayPostLink }
						onChange={ () =>
							setAttributes( {
								displayPostLink: ! displayPostLink,
							} )
						}
					/>
					{ displayPostLink && (
						<>
							<ToggleControl
								label={ __(
									'Open links in New Tab',
									'ultimate-addons-for-gutenberg'
								) }
								checked={ newTab }
								onChange={ () =>
									setAttributes( { newTab: ! newTab } )
								}
							/>

							<hr className="uagb-editor__separator" />
							<h2>
								{ __(
									'Button Text',
									'ultimate-addons-for-gutenberg'
								) }
							</h2>
							<TextControl
								label={ __(
									'Text',
									'ultimate-addons-for-gutenberg'
								) }
								value={ ctaText }
								onChange={ ( value ) =>
									setAttributes( { ctaText: value } )
								}
							/>
							{ ! inheritFromTheme && (
								<>
									<TypographyControl
										label={ __(
											'Typography',
											'ultimate-addons-for-gutenberg'
										) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										loadGoogleFonts={ {
											value: ctaLoadGoogleFonts,
											label: 'ctaLoadGoogleFonts',
										} }
										fontFamily={ {
											value: ctaFontFamily,
											label: 'ctaFontFamily',
										} }
										fontWeight={ {
											value: ctaFontWeight,
											label: 'ctaFontWeight',
										} }
										fontSubset={ {
											value: ctaFontSubset,
											label: 'ctaFontSubset',
										} }
										fontSizeType={ {
											value: ctaFontSizeType,
											label: 'ctaFontSizeType',
										} }
										fontSize={ {
											value: ctaFontSize,
											label: 'ctaFontSize',
										} }
										fontSizeMobile={ {
											value: ctaFontSizeMobile,
											label: 'ctaFontSizeMobile',
										} }
										fontSizeTablet={ {
											value: ctaFontSizeTablet,
											label: 'ctaFontSizeTablet',
										} }
										lineHeightType={ {
											value: ctaLineHeightType,
											label: 'ctaLineHeightType',
										} }
										lineHeight={ {
											value: ctaLineHeight,
											label: 'ctaLineHeight',
										} }
										lineHeightMobile={ {
											value: ctaLineHeightMobile,
											label: 'ctaLineHeightMobile',
										} }
										lineHeightTablet={ {
											value: ctaLineHeightTablet,
											label: 'ctaLineHeightTablet',
										} }
									/>
									<hr className="uagb-editor__separator" />
									<h2>
										{ __(
											'Button Border',
											'ultimate-addons-for-gutenberg'
										) }
									</h2>
									<SelectControl
										label={ __(
											'Style',
											'ultimate-addons-for-gutenberg'
										) }
										value={ borderStyle }
										onChange={ ( value ) =>
											setAttributes( {
												borderStyle: value,
											} )
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
												value: 'dashed',
												label: __(
													'Dashed',
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
												value: 'double',
												label: __(
													'Double',
													'ultimate-addons-for-gutenberg'
												),
											},
										] }
									/>
									<RangeControl
										label={ __(
											'Width',
											'ultimate-addons-for-gutenberg'
										) }
										value={ borderWidth }
										onChange={ ( value ) =>
											setAttributes( {
												borderWidth: value,
											} )
										}
										min={ 0 }
										max={ 10 }
										allowReset
									/>
									<RangeControl
										label={ __(
											'Rounded Corner',
											'ultimate-addons-for-gutenberg'
										) }
										value={ borderRadius }
										onChange={ ( value ) =>
											setAttributes( {
												borderRadius: value,
											} )
										}
										min={ 0 }
										max={ 50 }
										allowReset
									/>
									<hr className="uagb-editor__separator" />
									<h2>
										{ __(
											'Button Padding (px)',
											'ultimate-addons-for-gutenberg'
										) }
									</h2>
									<RangeControl
										label={
											UAGB_Block_Icons.vertical_spacing
										}
										className={ 'uagb-margin-control' }
										value={ btnVPadding }
										onChange={ ( value ) =>
											setAttributes( {
												btnVPadding: value,
											} )
										}
										min={ 0 }
										max={ 50 }
										allowReset
									/>
									<RangeControl
										label={
											UAGB_Block_Icons.horizontal_spacing
										}
										className={ 'uagb-margin-control' }
										value={ btnHPadding }
										onChange={ ( value ) =>
											setAttributes( {
												btnHPadding: value,
											} )
										}
										min={ 0 }
										max={ 50 }
										allowReset
									/>
									<hr className="uagb-editor__separator" />
									<h2>
										{ __(
											'Button Colors',
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
											let tabout;
											if ( 'hover' === tabName.name ) {
												tabout = hoverSettings;
											} else {
												tabout = normalSettings;
											}
											return <div>{ tabout }</div>;
										} }
									</TabPanel>
								</>
							) }
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Title Tag',
							'ultimate-addons-for-gutenberg'
						) }
						value={ titleTag }
						onChange={ ( value ) =>
							setAttributes( { titleTag: value } )
						}
						options={ [
							{
								value: 'h1',
								label: __(
									'H1',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'h2',
								label: __(
									'H2',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'h3',
								label: __(
									'H3',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'h4',
								label: __(
									'H4',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'h5',
								label: __(
									'H5',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'h6',
								label: __(
									'H6',
									'ultimate-addons-for-gutenberg'
								),
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
								label: __(
									'p',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					{ ! inheritFromTheme && (
						<>
							<TypographyControl
								label={ __(
									'Typography',
									'ultimate-addons-for-gutenberg'
								) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								loadGoogleFonts={ {
									value: titleLoadGoogleFonts,
									label: 'titleLoadGoogleFonts',
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

							{ ( displayPostAuthor ||
								displayPostDate ||
								displayPostComment ||
								displayPostTaxonomy ) && (
								<>
									<hr className="uagb-editor__separator" />
									<h2>
										{ __(
											'Meta',
											'ultimate-addons-for-gutenberg'
										) }
									</h2>
									<TypographyControl
										label={ __(
											'Typography',
											'ultimate-addons-for-gutenberg'
										) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										loadGoogleFonts={ {
											value: metaLoadGoogleFonts,
											label: 'metaLoadGoogleFonts',
										} }
										fontFamily={ {
											value: metaFontFamily,
											label: 'metaFontFamily',
										} }
										fontWeight={ {
											value: metaFontWeight,
											label: 'metaFontWeight',
										} }
										fontSubset={ {
											value: metaFontSubset,
											label: 'metaFontSubset',
										} }
										fontSizeType={ {
											value: metaFontSizeType,
											label: 'metaFontSizeType',
										} }
										fontSize={ {
											value: metaFontSize,
											label: 'metaFontSize',
										} }
										fontSizeMobile={ {
											value: metaFontSizeMobile,
											label: 'metaFontSizeMobile',
										} }
										fontSizeTablet={ {
											value: metaFontSizeTablet,
											label: 'metaFontSizeTablet',
										} }
										lineHeightType={ {
											value: metaLineHeightType,
											label: 'metaLineHeightType',
										} }
										lineHeight={ {
											value: metaLineHeight,
											label: 'metaLineHeight',
										} }
										lineHeightMobile={ {
											value: metaLineHeightMobile,
											label: 'metaLineHeightMobile',
										} }
										lineHeightTablet={ {
											value: metaLineHeightTablet,
											label: 'metaLineHeightTablet',
										} }
									/>
								</>
							) }

							{ displayPostExcerpt && (
								<>
									<hr className="uagb-editor__separator" />
									<h2>
										{ __(
											'Excerpt',
											'ultimate-addons-for-gutenberg'
										) }
									</h2>
									<TypographyControl
										label={ __(
											'Typography',
											'ultimate-addons-for-gutenberg'
										) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										loadGoogleFonts={ {
											value: excerptLoadGoogleFonts,
											label: 'excerptLoadGoogleFonts',
										} }
										fontFamily={ {
											value: excerptFontFamily,
											label: 'excerptFontFamily',
										} }
										fontWeight={ {
											value: excerptFontWeight,
											label: 'excerptFontWeight',
										} }
										fontSubset={ {
											value: excerptFontSubset,
											label: 'excerptFontSubset',
										} }
										fontSizeType={ {
											value: excerptFontSizeType,
											label: 'excerptFontSizeType',
										} }
										fontSize={ {
											value: excerptFontSize,
											label: 'excerptFontSize',
										} }
										fontSizeMobile={ {
											value: excerptFontSizeMobile,
											label: 'excerptFontSizeMobile',
										} }
										fontSizeTablet={ {
											value: excerptFontSizeTablet,
											label: 'excerptFontSizeTablet',
										} }
										lineHeightType={ {
											value: excerptLineHeightType,
											label: 'excerptLineHeightType',
										} }
										lineHeight={ {
											value: excerptLineHeight,
											label: 'excerptLineHeight',
										} }
										lineHeightMobile={ {
											value: excerptLineHeightMobile,
											label: 'excerptLineHeightMobile',
										} }
										lineHeightTablet={ {
											value: excerptLineHeightTablet,
											label: 'excerptLineHeightTablet',
										} }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
				>
					<p className="uagb-setting-label">
						{ __(
							'Blog Background Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: bgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ bgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { bgColor: colorValue } )
						}
						allowReset
					/>
					{ ! inheritFromTheme && (
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
									setAttributes( { titleColor: colorValue } )
								}
								allowReset
							/>
							<p className="uagb-setting-label">
								{ __(
									'Meta Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ { backgroundColor: metaColor } }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ metaColor }
								onChange={ ( colorValue ) =>
									setAttributes( { metaColor: colorValue } )
								}
							/>
							{ displayPostExcerpt == true && (
								<>
									<p className="uagb-setting-label">
										{ __(
											'Excerpt Color',
											'ultimate-addons-for-gutenberg'
										) }
										<span className="components-base-control__label">
											<span
												className="component-color-indicator"
												style={ {
													backgroundColor: excerptColor,
												} }
											></span>
										</span>
									</p>
									<ColorPalette
										value={ excerptColor }
										onChange={ ( colorValue ) =>
											setAttributes( {
												excerptColor: colorValue,
											} )
										}
										allowReset
									/>
								</>
							) }
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Spacing', 'ultimate-addons-for-gutenberg' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Row Gap',
							'ultimate-addons-for-gutenberg'
						) }
						value={ rowGap }
						onChange={ ( value ) =>
							setAttributes( { rowGap: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __(
							'Column Gap',
							'ultimate-addons-for-gutenberg'
						) }
						value={ columnGap }
						onChange={ ( value ) =>
							setAttributes( { columnGap: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __(
							'Content Padding',
							'ultimate-addons-for-gutenberg'
						) }
						value={ contentPadding }
						onChange={ ( value ) =>
							setAttributes( { contentPadding: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ __(
							'Content Padding (Mobile)',
							'ultimate-addons-for-gutenberg'
						) }
						value={ contentPaddingMobile }
						onChange={ ( value ) =>
							setAttributes( { contentPaddingMobile: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __(
							'Image Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ imageBottomSpace }
						onChange={ ( value ) =>
							setAttributes( { imageBottomSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __(
							'Title Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ titleBottomSpace }
						onChange={ ( value ) =>
							setAttributes( { titleBottomSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __(
							'Meta Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ metaBottomSpace }
						onChange={ ( value ) =>
							setAttributes( { metaBottomSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __(
							'Excerpt Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ excerptBottomSpace }
						onChange={ ( value ) =>
							setAttributes( { excerptBottomSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( 'CTA Bottom Spacing' ) }
						value={ ctaBottomSpace }
						onChange={ ( value ) =>
							setAttributes( { ctaBottomSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</PanelBody>
			</InspectorControls>
		</Suspense>
	);

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

	if ( ! hasPosts ) {
		return (
			<>
				{ inspectorControls }
				<Placeholder
					icon="admin-post"
					label={
						uagb_blocks_info.blocks[ 'uagb/post-masonry' ].title
					}
				>
					{ ! Array.isArray( latestPosts ) ? (
						<Spinner />
					) : (
						postDisplaytext
					) }
				</Placeholder>
			</>
		);
	}

	return (
		<Suspense fallback={ lazyLoader() }>
			<Settings
				parentProps={ props }
				state={ state }
				inspectorControls={ inspectorControls }
			/>
			<Render
				parentProps={ props }
				state={ state }
				setState={ setState }
				togglePreview={ togglePreview }
			/>
		</Suspense>
	);
};

export default compose(
	withSelect( ( select, props ) => {
		const {
			categories,
			postsToShow,
			order,
			orderBy,
			postType,
			taxonomyType,
			excludeCurrentPost,
		} = props.attributes;
		const { getEntityRecords } = select( 'core' );

		const { __experimentalGetPreviewDeviceType = null } = select(
			'core/edit-post'
		);

		const deviceType = __experimentalGetPreviewDeviceType
			? __experimentalGetPreviewDeviceType()
			: null;

		const allTaxonomy = uagb_blocks_info.all_taxonomy;
		const currentTax = allTaxonomy[ postType ];
		let categoriesList = [];
		let rest_base = '';

		if ( 'undefined' !== typeof currentTax ) {
			if ( 'undefined' !== typeof currentTax.taxonomy[ taxonomyType ] ) {
				rest_base =
					currentTax.taxonomy[ taxonomyType ].rest_base == false ||
					currentTax.taxonomy[ taxonomyType ].rest_base == null
						? currentTax.taxonomy[ taxonomyType ].name
						: currentTax.taxonomy[ taxonomyType ].rest_base;
			}

			if ( '' != taxonomyType ) {
				if (
					'undefined' !== typeof currentTax.terms &&
					'undefined' !== typeof currentTax.terms[ taxonomyType ]
				) {
					categoriesList = currentTax.terms[ taxonomyType ];
				}
			}
		}

		const latestPostsQuery = {
			order,
			orderby: orderBy,
			per_page: postsToShow,
		};

		if ( excludeCurrentPost ) {
			latestPostsQuery.exclude = select(
				'core/editor'
			).getCurrentPostId();
		}
		const category = [];
		const temp = parseInt( categories );
		category.push( temp );
		const catlenght = categoriesList.length;
		for ( let i = 0; i < catlenght; i++ ) {
			if ( categoriesList[ i ].id == temp ) {
				if ( categoriesList[ i ].child.length !== 0 ) {
					categoriesList[ i ].child.forEach( ( element ) => {
						category.push( element );
					} );
				}
			}
		}
		const { getBlocks } = select( 'core/block-editor' );
		if ( undefined !== categories && '' !== categories ) {
			latestPostsQuery[ rest_base ] =
				undefined === categories || '' === categories
					? categories
					: category;
		}
		return {
			latestPosts: getEntityRecords(
				'postType',
				postType,
				latestPostsQuery
			),
			categoriesList,
			deviceType,
			taxonomyList:
				'undefined' !== typeof currentTax ? currentTax.taxonomy : [],
			block: getBlocks( props.clientId ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		return {
			replaceInnerBlocks,
		};
	} )
)( UAGBPostMasonry );
