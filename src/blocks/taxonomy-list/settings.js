import React, { Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';

import WebfontLoader from '@Components/typography/fontloader';
import ColumnResponsive from '@Components/typography/column-responsive';
import TypographyControl from '@Components/typography';
import BoxShadowControl from '@Components/box-shadow';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	TabPanel,
	TextControl,
	Button,
	ButtonGroup,
	ToggleControl,
} from '@wordpress/components';

import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	// Caching all Props.
	const {
		attributes,
		setAttributes,
		taxonomyList,
		termsList,
		deviceType,
	} = props;

	// Caching all attributes.
	const {
		postType,
		taxonomyType,
		layout,
		columns,
		tcolumns,
		mcolumns,
		bgColor,
		titleColor,
		countColor,
		rowGap,
		columnGap,
		contentPadding,
		contentPaddingMobile,
		contentPaddingTablet,
		titleBottomSpace,
		alignment,
		listStyle,
		seperatorStyle,
		seperatorWidth,
		seperatorThickness,
		seperatorColor,
		listTextColor,
		hoverlistTextColor,
		listBottomMargin,
		listStyleColor,
		hoverlistStyleColor,
		noTaxDisplaytext,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
		showCount,
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
		countFontSize,
		countFontSizeType,
		countFontSizeMobile,
		countFontSizeTablet,
		countFontFamily,
		countFontWeight,
		countFontSubset,
		countLineHeightType,
		countLineHeight,
		countLineHeightTablet,
		countLineHeightMobile,
		countLoadGoogleFonts,
		listFontSize,
		listFontSizeType,
		listFontSizeMobile,
		listFontSizeTablet,
		listFontFamily,
		listFontWeight,
		listFontSubset,
		listLineHeightType,
		listLineHeight,
		listLineHeightTablet,
		listLineHeightMobile,
		listLoadGoogleFonts,
		showEmptyTaxonomy,
		borderStyle,
		borderThickness,
		borderColor,
		borderRadius,
		listDisplayStyle,
		showhierarchy,
		titleTag,
	} = attributes;

	const taxonomy_list_setting = showEmptyTaxonomy ? taxonomyList : termsList;
	const taxonomyListOptions = [
		{
			value: '',
			label: __( 'Select Taxonomy', 'ultimate-addons-for-gutenberg' ),
		},
	];
	if ( '' != taxonomy_list_setting && undefined != taxonomy_list_setting ) {
		Object.keys( taxonomy_list_setting ).map( ( item, thisIndex ) => {
			return taxonomyListOptions.push( {
				value: taxonomyList[ item ].name,
				label: taxonomyList[ item ].label,
			} );
		} );
	}

	let loadTitleGoogleFonts;
	let loadCountGoogleFonts;
	let loadListGoogleFonts;

	if ( titleLoadGoogleFonts == true ) {
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

	if ( countLoadGoogleFonts == true ) {
		const countconfig = {
			google: {
				families: [
					countFontFamily +
						( countFontWeight ? ':' + countFontWeight : '' ),
				],
			},
		};

		loadCountGoogleFonts = (
			<WebfontLoader config={ countconfig }></WebfontLoader>
		);
	}

	if ( listLoadGoogleFonts == true ) {
		const listconfig = {
			google: {
				families: [
					listFontFamily +
						( listFontWeight ? ':' + listFontWeight : '' ),
				],
			},
		};

		loadListGoogleFonts = (
			<WebfontLoader config={ listconfig }></WebfontLoader>
		);
	}

	// All Controls.
	const colorControl = (
		<>
			<h2 className="uagb-setting-label">
				{ __( 'Text Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: listTextColor } }
					></span>
				</span>
			</h2>
			<ColorPalette
				value={ listTextColor }
				onChange={ ( colorValue ) =>
					setAttributes( { listTextColor: colorValue } )
				}
				allowReset
			/>
			<br />
			{ 'none' != listStyle && (
				<>
					<h2 className="uagb-setting-label">
						{ __(
							'Bullet/Numbers Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: listStyleColor } }
							></span>
						</span>
					</h2>
					<ColorPalette
						value={ listStyleColor }
						onChange={ ( colorValue ) =>
							setAttributes( { listStyleColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
		</>
	);
	const colorControlHover = (
		<>
			<h2 className="uagb-setting-label">
				{ __( 'Text Hover Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: hoverlistTextColor } }
					></span>
				</span>
			</h2>
			<ColorPalette
				value={ hoverlistTextColor }
				onChange={ ( colorValue ) =>
					setAttributes( { hoverlistTextColor: colorValue } )
				}
				allowReset
			/>
			<br />
			{ 'none' != listStyle && (
				<>
					<h2 className="uagb-setting-label">
						{ __(
							'Bullet/Numbers Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: hoverlistStyleColor,
								} }
							></span>
						</span>
					</h2>
					<ColorPalette
						value={ hoverlistStyleColor }
						onChange={ ( colorValue ) =>
							setAttributes( { hoverlistStyleColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
		</>
	);

	const onSelectPostType = ( value ) => {
		setAttributes( { postType: value } );
		setAttributes( { categories: '' } );
		setAttributes( { taxonomyType: '' } );
	};

	const onSelectTaxonomyType = ( value ) => {
		setAttributes( { taxonomyType: value } );
		setAttributes( { categories: '' } );
	};

	const inspectorControlsSettings = (
		<InspectorControls>
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
			>
				<SelectControl
					label={ __(
						'Heading Tag',
						'ultimate-addons-for-gutenberg'
					) }
					value={ titleTag }
					onChange={ ( value ) =>
						setAttributes( { titleTag: value } )
					}
					options={ [
						{
							value: 'div',
							label: __( 'Div', 'ultimate-addons-for-gutenberg' ),
						},
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
					] }
				/>
				<SelectControl
					label={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
					value={ layout }
					onChange={ ( value ) => setAttributes( { layout: value } ) }
					options={ [
						{
							value: 'grid',
							label: __(
								'Grid',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'list',
							label: __(
								'List',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'grid' === layout && <ColumnResponsive /> }
				{ 'Desktop' === deviceType && 'grid' === layout && (
					<>
						<RangeControl
							label={ __(
								'Desktop Columns',
								'ultimate-addons-for-gutenberg'
							) }
							value={ columns }
							onChange={ ( value ) =>
								setAttributes( { columns: value } )
							}
							min={ 1 }
							max={ 4 }
						/>
					</>
				) }
				{ 'Tablet' === deviceType && 'grid' === layout && (
					<>
						<RangeControl
							label={ __(
								'Tab Columns',
								'ultimate-addons-for-gutenberg'
							) }
							value={ tcolumns }
							onChange={ ( value ) =>
								setAttributes( { tcolumns: value } )
							}
							min={ 1 }
							max={ 3 }
						/>
					</>
				) }
				{ 'Mobile' === deviceType && 'grid' === layout && (
					<>
						<RangeControl
							label={ __(
								'Mobile Columns',
								'ultimate-addons-for-gutenberg'
							) }
							value={ mcolumns }
							onChange={ ( value ) =>
								setAttributes( { mcolumns: value } )
							}
							min={ 1 }
							max={ 2 }
						/>
					</>
				) }
				<hr className="uagb-editor__separator" />
				<SelectControl
					label={ __( 'Post Type', 'ultimate-addons-for-gutenberg' ) }
					value={ postType }
					onChange={ ( value ) => onSelectPostType( value ) }
					options={ uagb_blocks_info.post_types }
				/>
				{ '' != taxonomyList && (
					<SelectControl
						label={ __(
							'Taxonomy',
							'ultimate-addons-for-gutenberg'
						) }
						value={ taxonomyType }
						onChange={ ( value ) => onSelectTaxonomyType( value ) }
						options={ taxonomyListOptions }
					/>
				) }
				{ '' == taxonomyList && (
					<TextControl
						autoComplete="off"
						label={ __(
							'Display Message',
							'ultimate-addons-for-gutenberg'
						) }
						value={ noTaxDisplaytext }
						onChange={ ( value ) =>
							setAttributes( { noTaxDisplaytext: value } )
						}
						help={ __(
							'If Taxonomy Not Found',
							'ultimate-addons-for-gutenberg'
						) }
					/>
				) }
				{ 'list' == layout && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Display Style',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<ButtonGroup className="uagb-list-display-style-group">
							<Button
								key={ 'list' }
								label="List"
								onClick={ () =>
									setAttributes( {
										listDisplayStyle: 'list',
									} )
								}
								aria-pressed={ 'list' === listDisplayStyle }
								isPrimary={ 'list' === listDisplayStyle }
							>
								List
							</Button>
							<Button
								key={ 'dropdown' }
								label="Dropdown"
								onClick={ () =>
									setAttributes( {
										listDisplayStyle: 'dropdown',
									} )
								}
								aria-pressed={ 'dropdown' === listDisplayStyle }
								isPrimary={ 'dropdown' === listDisplayStyle }
							>
								Dropdown
							</Button>
						</ButtonGroup>
					</>
				) }

				<ToggleControl
					label={ __(
						'Show Empty Taxonomy',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showEmptyTaxonomy }
					onChange={ () =>
						setAttributes( {
							showEmptyTaxonomy: ! showEmptyTaxonomy,
						} )
					}
					help={ __( 'Show Empty Taxonomy in list ' ) }
				/>
				<ToggleControl
					label={ __(
						'Show Posts Count',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showCount }
					onChange={ () =>
						setAttributes( { showCount: ! showCount } )
					}
					help={ __(
						'Show Count of taxonomy ',
						'ultimate-addons-for-gutenberg'
					) }
				/>

				{ 'list' == layout &&
					'list' == listDisplayStyle &&
					'post_tag' !== taxonomyType && (
						<ToggleControl
							label={ __(
								'Show Hierarchy',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ showhierarchy }
							onChange={ () =>
								setAttributes( {
									showhierarchy: ! showhierarchy,
								} )
							}
							help={ __(
								'Show Hierarchy of taxonomy ',
								'ultimate-addons-for-gutenberg'
							) }
						/>
					) }

				{ 'grid' == layout && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Alignment',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<Button
							key={ 'left' }
							icon="editor-alignleft"
							label="Left"
							onClick={ () =>
								setAttributes( { alignment: 'left' } )
							}
							aria-pressed={ 'left' === alignment }
							isPrimary={ 'left' === alignment }
						/>
						<Button
							key={ 'center' }
							icon="editor-aligncenter"
							label="Center"
							onClick={ () =>
								setAttributes( { alignment: 'center' } )
							}
							aria-pressed={ 'center' === alignment }
							isPrimary={ 'center' === alignment }
						/>
						<Button
							key={ 'right' }
							icon="editor-alignright"
							label="Right"
							onClick={ () =>
								setAttributes( { alignment: 'right' } )
							}
							aria-pressed={ 'right' === alignment }
							isPrimary={ 'right' === alignment }
						/>
					</>
				) }

				{ 'list' == layout && 'dropdown' !== listDisplayStyle && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'List Style',
								'ultimate-addons-for-gutenberg'
							) }
						</p>
						<Button
							key={ 'bullet' }
							icon="editor-ul"
							label="Bullet"
							onClick={ () =>
								setAttributes( { listStyle: 'disc' } )
							}
							aria-pressed={ 'disc' === listStyle }
							isPrimary={ 'disc' === listStyle }
						/>
						<Button
							key={ 'numbers' }
							icon="editor-ol"
							label="Numbers"
							onClick={ () =>
								setAttributes( { listStyle: 'decimal' } )
							}
							aria-pressed={ 'decimal' === listStyle }
							isPrimary={ 'decimal' === listStyle }
						/>
						<Button
							key={ 'none' }
							icon="menu"
							label="None"
							onClick={ () =>
								setAttributes( { listStyle: 'none' } )
							}
							aria-pressed={ 'none' === listStyle }
							isPrimary={ 'none' === listStyle }
						/>
					</>
				) }
			</PanelBody>
			{ 'dropdown' !== listDisplayStyle && (
				<>
					<PanelBody
						title={ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
						initialOpen={ false }
					>
						{ 'grid' == layout && (
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
												backgroundColor: bgColor,
											} }
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
								{ showCount && (
									<>
										<p className="uagb-setting-label">
											{ __(
												'Count Color',
												'ultimate-addons-for-gutenberg'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: countColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ countColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													countColor: colorValue,
												} )
											}
											allowReset
										/>
									</>
								) }
							</>
						) }

						{ 'list' == layout && (
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
									let colorTab;
									if ( 'normal' === tabName.name ) {
										colorTab = colorControl;
									} else {
										colorTab = colorControlHover;
									}
									return <div>{ colorTab }</div>;
								} }
							</TabPanel>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						initialOpen={ false }
					>
						{ 'grid' == layout && (
							<>
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
								{ 'grid' === layout && <ColumnResponsive /> }
								{ 'Desktop' === deviceType &&
									'grid' === layout && (
										<>
											<RangeControl
												label={ __(
													'Content Padding'
												) }
												value={ contentPadding }
												onChange={ ( value ) =>
													setAttributes( {
														contentPadding: value,
													} )
												}
												min={ 10 }
												max={ 100 }
											/>
										</>
									) }
								{ 'Tablet' === deviceType &&
									'grid' === layout && (
										<>
											<RangeControl
												label={ __(
													'Content Padding'
												) }
												value={ contentPaddingTablet }
												onChange={ ( value ) =>
													setAttributes( {
														contentPaddingTablet: value,
													} )
												}
												min={ 0 }
												max={ 100 }
											/>
										</>
									) }
								{ 'Mobile' === deviceType &&
									'grid' === layout && (
										<>
											<RangeControl
												label={ __(
													'Content Padding'
												) }
												value={ contentPaddingMobile }
												onChange={ ( value ) =>
													setAttributes( {
														contentPaddingMobile: value,
													} )
												}
												min={ 0 }
												max={ 100 }
											/>
										</>
									) }

								{ showCount && (
									<>
										<hr className="uagb-editor__separator" />
										<RangeControl
											label={ __(
												'Title Bottom Spacing',
												'ultimate-addons-for-gutenberg'
											) }
											value={ titleBottomSpace }
											onChange={ ( value ) =>
												setAttributes( {
													titleBottomSpace: value,
												} )
											}
											min={ 0 }
											max={ 50 }
											allowReset
										/>
									</>
								) }
							</>
						) }

						{ 'list' == layout && (
							<RangeControl
								label={ __(
									'Bottom Margin',
									'ultimate-addons-for-gutenberg'
								) }
								value={ listBottomMargin }
								onChange={ ( value ) =>
									setAttributes( { listBottomMargin: value } )
								}
								min={ 0 }
								max={ 100 }
								allowReset
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Style', 'ultimate-addons-for-gutenberg' ) }
						initialOpen={ false }
					>
						{ 'grid' == layout && (
							<>
								<p className="uagb-setting-label">
									{ __(
										'Title ',
										'ultimate-addons-for-gutenberg'
									) }
								</p>
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
								{ showCount && (
									<>
										<hr className="uagb-editor__separator" />
										<p className="uagb-setting-label">
											{ __(
												'Count ',
												'ultimate-addons-for-gutenberg'
											) }
										</p>
										<TypographyControl
											label={ __(
												'Typography',
												'ultimate-addons-for-gutenberg'
											) }
											attributes={ attributes }
											setAttributes={ setAttributes }
											loadGoogleFonts={ {
												value: countLoadGoogleFonts,
												label: 'countLoadGoogleFonts',
											} }
											fontFamily={ {
												value: countFontFamily,
												label: 'countFontFamily',
											} }
											fontWeight={ {
												value: countFontWeight,
												label: 'countFontWeight',
											} }
											fontSubset={ {
												value: countFontSubset,
												label: 'countFontSubset',
											} }
											fontSizeType={ {
												value: countFontSizeType,
												label: 'countFontSizeType',
											} }
											fontSize={ {
												value: countFontSize,
												label: 'countFontSize',
											} }
											fontSizeMobile={ {
												value: countFontSizeMobile,
												label: 'countFontSizeMobile',
											} }
											fontSizeTablet={ {
												value: countFontSizeTablet,
												label: 'countFontSizeTablet',
											} }
											lineHeightType={ {
												value: countLineHeightType,
												label: 'countLineHeightType',
											} }
											lineHeight={ {
												value: countLineHeight,
												label: 'countLineHeight',
											} }
											lineHeightMobile={ {
												value: countLineHeightMobile,
												label: 'countLineHeightMobile',
											} }
											lineHeightTablet={ {
												value: countLineHeightTablet,
												label: 'countLineHeightTablet',
											} }
										/>
									</>
								) }
								<hr className="uagb-editor__separator" />
								<BoxShadowControl
									setAttributes={ setAttributes }
									label={ __(
										'Box Shadow',
										'ultimate-addons-for-gutenberg'
									) }
									boxShadowColor={ {
										value: boxShadowColor,
										label: __(
											'Color',
											'ultimate-addons-for-gutenberg'
										),
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
										label: __(
											'Blur',
											'ultimate-addons-for-gutenberg'
										),
									} }
									boxShadowSpread={ {
										value: boxShadowSpread,
										label: __(
											'Spread',
											'ultimate-addons-for-gutenberg'
										),
									} }
									boxShadowPosition={ {
										value: boxShadowPosition,
										label: __(
											'Position',
											'ultimate-addons-for-gutenberg'
										),
									} }
								/>
								<hr className="uagb-editor__separator" />
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
									<>
										<RangeControl
											label={ __(
												'Border Thickness',
												'ultimate-addons-for-gutenberg'
											) }
											value={ borderThickness }
											onChange={ ( value ) =>
												setAttributes( {
													borderThickness: value,
												} )
											}
											min={ 0 }
											max={ 10 }
											allowReset
										/>
										<RangeControl
											label={ __(
												'Rounded Corners (px)',
												'ultimate-addons-for-gutenberg'
											) }
											value={ borderRadius }
											onChange={ ( value ) => {
												setAttributes( {
													borderRadius: value,
												} );
											} }
											min={ 0 }
											max={ 50 }
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
											onChange={ ( colorValue ) =>
												setAttributes( {
													borderColor: colorValue,
												} )
											}
											allowReset
										/>
									</>
								) }
							</>
						) }

						{ 'list' == layout && (
							<>
								<SelectControl
									label={ __(
										'Separator Style',
										'ultimate-addons-for-gutenberg'
									) }
									value={ seperatorStyle }
									onChange={ ( value ) =>
										setAttributes( {
											seperatorStyle: value,
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
								{ 'none' != seperatorStyle && (
									<>
										<RangeControl
											label={ __(
												'Separator Width (%)',
												'ultimate-addons-for-gutenberg'
											) }
											value={ seperatorWidth }
											onChange={ ( value ) =>
												setAttributes( {
													seperatorWidth: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<RangeControl
											label={ __(
												'Separator Thickness',
												'ultimate-addons-for-gutenberg'
											) }
											value={ seperatorThickness }
											onChange={ ( value ) =>
												setAttributes( {
													seperatorThickness: value,
												} )
											}
											min={ 0 }
											max={ 20 }
											allowReset
										/>
										<>
											<p className="uagb-setting-label">
												{ __(
													'Separator Color',
													'ultimate-addons-for-gutenberg'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: seperatorColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ seperatorColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														seperatorColor: colorValue,
													} )
												}
												allowReset
											/>
										</>
									</>
								) }

								<hr className="uagb-editor__separator" />

								<p className="uagb-setting-label">
									{ __(
										'List ',
										'ultimate-addons-for-gutenberg'
									) }
								</p>
								<TypographyControl
									label={ __(
										'Typography',
										'ultimate-addons-for-gutenberg'
									) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									loadGoogleFonts={ {
										value: listLoadGoogleFonts,
										label: 'listLoadGoogleFonts',
									} }
									fontFamily={ {
										value: listFontFamily,
										label: 'listFontFamily',
									} }
									fontWeight={ {
										value: listFontWeight,
										label: 'listFontWeight',
									} }
									fontSubset={ {
										value: listFontSubset,
										label: 'listFontSubset',
									} }
									fontSizeType={ {
										value: listFontSizeType,
										label: 'listFontSizeType',
									} }
									fontSize={ {
										value: listFontSize,
										label: 'listFontSize',
									} }
									fontSizeMobile={ {
										value: listFontSizeMobile,
										label: 'listFontSizeMobile',
									} }
									fontSizeTablet={ {
										value: listFontSizeTablet,
										label: 'listFontSizeTablet',
									} }
									lineHeightType={ {
										value: listLineHeightType,
										label: 'listLineHeightType',
									} }
									lineHeight={ {
										value: listLineHeight,
										label: 'listLineHeight',
									} }
									lineHeightMobile={ {
										value: listLineHeightMobile,
										label: 'listLineHeightMobile',
									} }
									lineHeightTablet={ {
										value: listLineHeightTablet,
										label: 'listLineHeightTablet',
									} }
								/>
							</>
						) }
					</PanelBody>
				</>
			) }
		</InspectorControls>
	);

	return (
		<>
			<Suspense fallback={ lazyLoader() }>
				{ inspectorControlsSettings }
				{ loadTitleGoogleFonts }
				{ loadCountGoogleFonts }
				{ loadListGoogleFonts }
			</Suspense>
		</>
	);
};

export default React.memo( Settings );
