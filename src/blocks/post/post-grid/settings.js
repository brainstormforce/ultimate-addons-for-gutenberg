/**
 * BLOCK: Post Grid - Settings.
 */

import UAGB_Block_Icons from '@Controls/block-icons';
import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import ColumnResponsive from '@Components/typography/column-responsive';
import WebfontLoader from '@Components/typography/fontloader';
import TypographyControl from '@Components/typography';
import { __ } from '@wordpress/i18n';

const MAX_POSTS_COLUMNS = 8;

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TabPanel,
	ToolbarGroup,
	TextControl,
	RadioControl,
	Button,
} from '@wordpress/components';

import {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	ColorPalette,
} from '@wordpress/block-editor';

const Settings = ( props ) => {
	// Caching all Props
	const {
		attributes,
		setAttributes,
		latestPosts,
		categoriesList,
		deviceType,
		taxonomyList,
	} = props.parentProps;

	// Caching all attributes.
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
		align,
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
		titleBottomSpace,
		metaBottomSpace,
		excerptBottomSpace,
		ctaBottomSpace,
		equalHeight,
		excerptLength,
		overlayOpacity,
		bgOverlayColor,
		linkBox,
		postType,
		taxonomyType,
		postPagination,
		pageLimit,
		paginationColor,
		paginationBgColor,
		paginationActiveColor,
		paginationBgActiveColor,
		paginationLayout,
		paginationBorderSize,
		paginationBorderRadius,
		paginationBorderColor,
		paginationBorderActiveColor,
		paginationSpacing,
		paginationAlignment,
		paginationPrevText,
		paginationNextText,
		inheritFromTheme,
		postDisplaytext,
		displayPostContentRadio,
		excludeCurrentPost,
	} = attributes;

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

	const onSelectPostType = ( value ) => {
		setAttributes( { postType: value } );
		setAttributes( { categories: '' } );
	};
	const onSelectTaxonomyType = ( value ) => {
		setAttributes( { taxonomyType: value } );
		setAttributes( { categories: '' } );
	};
	const onSelectPagination = ( value ) => {
		setAttributes( { postPagination: value } );
		setAttributes( { paginationMarkup: 'empty' } );
	};
	const onChangePostsPerPage = ( value ) => {
		setAttributes( { postsToShow: value } );
		setAttributes( { paginationMarkup: 'empty' } );
	};
	const onChangePageLimit = ( value ) => {
		setAttributes( { pageLimit: value } );
		setAttributes( { paginationMarkup: 'empty' } );
	};
	const onChangePrevText = ( value ) => {
		setAttributes( { paginationPrevText: value } );
		setAttributes( { paginationMarkup: 'empty' } );
	};
	const onChangeNextText = ( value ) => {
		setAttributes( { paginationNextText: value } );
		setAttributes( { paginationMarkup: 'empty' } );
	};

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

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
			>
				<SelectControl
					label={ __( 'Post Type', 'ultimate-addons-for-gutenberg' ) }
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
						onChange={ ( value ) => onSelectTaxonomyType( value ) }
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
				<RangeControl
					label={ __(
						'Posts Per Page',
						'ultimate-addons-for-gutenberg'
					) }
					value={ postsToShow }
					onChange={ onChangePostsPerPage }
					min={ 0 }
					max={ 500 }
				/>
				<SelectControl
					label={ __( 'Order By' ) }
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
					label={ __( 'Order' ) }
					value={ order }
					onChange={ ( value ) => setAttributes( { order: value } ) }
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
				<ToggleControl
					label={ __(
						'Equal Height',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ equalHeight }
					onChange={ () =>
						setAttributes( { equalHeight: ! equalHeight } )
					}
				/>
				<ToggleControl
					label={ __(
						'Post Pagination',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ postPagination }
					onChange={ onSelectPagination }
				/>
				{ postPagination == true && (
					<RangeControl
						label={ __(
							'Page Limit',
							'ultimate-addons-for-gutenberg'
						) }
						value={ pageLimit }
						onChange={ onChangePageLimit }
						min={ 0 }
						max={ 100 }
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
		);
	};
	const paginationSettings = () => {
		if ( true !== postPagination ) {
			return;
		}

		return (
			<PanelBody
				title={ __( 'Pagination', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<>
					<SelectControl
						label={ __(
							'Pagination Layout',
							'ultimate-addons-for-gutenberg'
						) }
						value={ paginationLayout }
						onChange={ ( value ) =>
							setAttributes( { paginationLayout: value } )
						}
						options={ [
							{
								value: 'border',
								label: __(
									'Border',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'filled',
								label: __(
									'Filled',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					<h2>
						{ ' ' }
						{ __(
							'Pagination Alignment',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<Button
						key={ 'left' }
						icon="editor-alignleft"
						label="Left"
						onClick={ () =>
							setAttributes( { paginationAlignment: 'left' } )
						}
						aria-pressed={ 'left' === paginationAlignment }
						isPrimary={ 'left' === paginationAlignment }
					/>
					<Button
						key={ 'center' }
						icon="editor-aligncenter"
						label="Right"
						onClick={ () =>
							setAttributes( { paginationAlignment: 'center' } )
						}
						aria-pressed={ 'center' === paginationAlignment }
						isPrimary={ 'center' === paginationAlignment }
					/>
					<Button
						key={ 'right' }
						icon="editor-alignright"
						label="Right"
						onClick={ () =>
							setAttributes( { paginationAlignment: 'right' } )
						}
						aria-pressed={ 'right' === paginationAlignment }
						isPrimary={ 'right' === paginationAlignment }
					/>
					<hr className="uagb-editor__separator" />
					{ paginationLayout == 'filled' && (
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
											backgroundColor: paginationBgColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ paginationBgColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										paginationBgColor: colorValue,
									} )
								}
							/>
							<p className="uagb-setting-label">
								{ __(
									'Background Active Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: paginationBgActiveColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ paginationBgActiveColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										paginationBgActiveColor: colorValue,
									} )
								}
							/>
						</>
					) }
					{ paginationLayout == 'border' && (
						<>
							<RangeControl
								label={ __(
									'Border Size',
									'ultimate-addons-for-gutenberg'
								) }
								value={ paginationBorderSize }
								onChange={ ( value ) =>
									setAttributes( {
										paginationBorderSize: value,
									} )
								}
								min={ 0 }
								max={ 10 }
							/>
							<RangeControl
								label={ __(
									'Border Radius',
									'ultimate-addons-for-gutenberg'
								) }
								value={ paginationBorderRadius }
								onChange={ ( value ) =>
									setAttributes( {
										paginationBorderRadius: value,
									} )
								}
								min={ 0 }
								max={ 500 }
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
											backgroundColor: paginationBorderColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ paginationBorderColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										paginationBorderColor: colorValue,
									} )
								}
							/>
							<p className="uagb-setting-label">
								{ __(
									'Border Active Color',
									'ultimate-addons-for-gutenberg'
								) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: paginationBorderActiveColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ paginationBorderActiveColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										paginationBorderActiveColor: colorValue,
									} )
								}
							/>
						</>
					) }
					<p className="uagb-setting-label">
						{ __( 'Text Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: paginationColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ paginationColor }
						onChange={ ( colorValue ) =>
							setAttributes( { paginationColor: colorValue } )
						}
					/>
					<p className="uagb-setting-label">
						{ __(
							'Text Active Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: paginationActiveColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ paginationActiveColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								paginationActiveColor: colorValue,
							} )
						}
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __(
							'Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ paginationSpacing }
						onChange={ ( value ) =>
							setAttributes( { paginationSpacing: value } )
						}
						help={ __(
							'This spacing is between the Post Grid and the Pagination',
							'ultimate-addons-for-gutenberg'
						) }
						min={ 0 }
						max={ 500 }
					/>
					<hr className="uagb-editor__separator" />
					<TextControl
						label={ __(
							'Previous Text',
							'ultimate-addons-for-gutenberg'
						) }
						value={ paginationPrevText }
						onChange={ onChangePrevText }
					/>
					<TextControl
						label={ __(
							'Next Text',
							'ultimate-addons-for-gutenberg'
						) }
						value={ paginationNextText }
						onChange={ onChangeNextText }
					/>
				</>
			</PanelBody>
		);
	};
	const imageSettings = () => {
		return (
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
								setAttributes( { bgOverlayColor: colorValue } )
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
		);
	};
	const contentSettings = () => {
		return (
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
					label={ __( 'Show Date', 'ultimate-addons-for-gutenberg' ) }
					checked={ displayPostDate }
					onChange={ () =>
						setAttributes( { displayPostDate: ! displayPostDate } )
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
						label={ __( 'Show:', 'ultimate-addons-for-gutenberg' ) }
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
		);
	};
	const readMoreLinkSettings = () => {
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
					{ __(
						'Border Hover Color',
						'ultimate-addons-for-gutenberg'
					) }
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
					{ __(
						'Background Color',
						'ultimate-addons-for-gutenberg'
					) }
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

		return (
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
						setAttributes( { displayPostLink: ! displayPostLink } )
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
										setAttributes( { borderWidth: value } )
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
										setAttributes( { borderRadius: value } )
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
									label={ UAGB_Block_Icons.vertical_spacing }
									className={ 'uagb-margin-control' }
									value={ btnVPadding }
									onChange={ ( value ) =>
										setAttributes( { btnVPadding: value } )
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
										setAttributes( { btnHPadding: value } )
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
		);
	};
	const typographySettings = () => {
		return (
			<PanelBody
				title={ __( 'Typography', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<h2>{ __( 'Title', 'ultimate-addons-for-gutenberg' ) }</h2>
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
		);
	};
	const colorsSettings = () => {
		return (
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
									style={ { backgroundColor: titleColor } }
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
		);
	};
	const spacingSettings = () => {
		return (
			<PanelBody
				title={ __( 'Spacing', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __(
						'Vertical Spacing',
						'ultimate-addons-for-gutenberg'
					) }
					value={ rowGap }
					onChange={ ( value ) => setAttributes( { rowGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Horizontal Spacing',
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
		);
	};
	const blockControlsSettings = () => {
		const { isEditing } = props.state;

		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'left', 'center', 'right' ] }
				/>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit' ),
							onClick: () => props.togglePreview(),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
		);
	};

	const inspectorControlsSettings = () => {
		return (
			<InspectorControls>
				{ generalSettings() }
				{ paginationSettings() }
				{ imageSettings() }
				{ contentSettings() }
				{ readMoreLinkSettings() }
				{ typographySettings() }
				{ colorsSettings() }
				{ spacingSettings() }
			</InspectorControls>
		);
	};

	let loadTitleGoogleFonts;
	let loadMetaGoogleFonts;
	let loadExcerptGoogleFonts;
	let loadCtaGoogleFonts;

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

	if ( metaLoadGoogleFonts == true ) {
		const metaconfig = {
			google: {
				families: [
					metaFontFamily +
						( metaFontWeight ? ':' + metaFontWeight : '' ),
				],
			},
		};

		loadMetaGoogleFonts = (
			<WebfontLoader config={ metaconfig }></WebfontLoader>
		);
	}

	if ( excerptLoadGoogleFonts == true ) {
		const excerptconfig = {
			google: {
				families: [
					excerptFontFamily +
						( excerptFontWeight ? ':' + excerptFontWeight : '' ),
				],
			},
		};

		loadExcerptGoogleFonts = (
			<WebfontLoader config={ excerptconfig }></WebfontLoader>
		);
	}

	if ( ctaLoadGoogleFonts == true ) {
		const ctaconfig = {
			google: {
				families: [
					ctaFontFamily +
						( ctaFontWeight ? ':' + ctaFontWeight : '' ),
				],
			},
		};

		loadCtaGoogleFonts = (
			<WebfontLoader config={ ctaconfig }></WebfontLoader>
		);
	}

	if ( ! hasPosts ) {
		return <>{ inspectorControlsSettings() }</>;
	}

	return (
		<Suspense fallback={ lazyLoader() }>
			{ blockControlsSettings() }
			{ inspectorControlsSettings() }

			{ loadTitleGoogleFonts }
			{ loadMetaGoogleFonts }
			{ loadExcerptGoogleFonts }
			{ loadCtaGoogleFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
