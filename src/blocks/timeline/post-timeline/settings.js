import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import renderSVG from '@Controls/renderIcon';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';
import React from 'react';
import { __ } from '@wordpress/i18n';

import { dateI18n } from '@wordpress/date';
import {
	PanelBody,
	QueryControls,
	RangeControl,
	SelectControl,
	ToggleControl,
	TabPanel,
	TextControl,
} from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	BlockAlignmentToolbar,
	BlockControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, categoriesList, setAttributes, taxonomyList } = props;

	const {
		headingColor,
		subHeadingColor,
		backgroundColor,
		separatorColor,
		separatorFillColor,
		separatorBg,
		separatorBorder,
		borderFocus,
		headingTag,
		headFontSizeType,
		headFontSize,
		headFontSizeTablet,
		headFontSizeMobile,
		headFontFamily,
		headFontWeight,
		headFontSubset,
		headLineHeightType,
		headLineHeight,
		headLineHeightTablet,
		headLineHeightMobile,
		headLoadGoogleFonts,
		timelinAlignment,
		arrowlinAlignment,
		subHeadFontSizeType,
		subHeadFontSize,
		subHeadFontSizeTablet,
		subHeadFontSizeMobile,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadFontSubset,
		subHeadLineHeightType,
		subHeadLineHeight,
		subHeadLineHeightTablet,
		subHeadLineHeightMobile,
		subHeadLoadGoogleFonts,
		verticalSpace,
		horizontalSpace,
		headSpace,
		separatorwidth,
		borderwidth,
		connectorBgsize,
		authorSpace,
		contentSpace,
		authorColor,
		authorFontSizeType,
		authorFontSize,
		authorFontSizeTablet,
		authorFontSizeMobile,
		authorFontFamily,
		authorFontWeight,
		authorFontSubset,
		authorLineHeightType,
		authorLineHeight,
		authorLineHeightTablet,
		authorLineHeightMobile,
		authorLoadGoogleFonts,
		dateBottomspace,
		displayPostDate,
		displayPostExcerpt,
		displayPostAuthor,
		displayPostImage,
		displayPostLink,
		align,
		order,
		orderBy,
		categories,
		postsToShow,
		imageSize,
		readMoreText,
		ctaBackground,
		icon,
		iconColor,
		dateColor,
		ctaColor,
		dateFontsizeType,
		dateFontsize,
		dateFontsizeTablet,
		dateFontsizeMobile,
		dateFontFamily,
		dateFontWeight,
		dateFontSubset,
		dateLineHeightType,
		dateLineHeight,
		dateLineHeightTablet,
		dateLineHeightMobile,
		dateLoadGoogleFonts,
		ctaFontSizeType,
		ctaFontSize,
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
		iconSize,
		exerptLength,
		borderRadius,
		bgPadding,
		contentPadding,
		iconFocus,
		iconBgFocus,
		stack,
		linkTarget,
		postType,
		taxonomyType,
		dateFormat,
		excludeCurrentPost,
	} = attributes;

	const onSelectPostType = ( value ) => {
		setAttributes( { postType: value } );
		setAttributes( { categories: '' } );
	};

	const onSelectTaxonomyType = ( value ) => {
		setAttributes( { taxonomyType: value } );
		setAttributes( { categories: '' } );
	};

	const getTimelineicon = ( value ) => {
		props.setAttributes( { icon: value } );
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

	let loadHeadGoogleFonts;
	let loadSubHeadGoogleFonts;
	let loadDateGoogleFonts;
	let loadAuthorGoogleFonts;
	let loadCtaGoogleFonts;

	if ( headLoadGoogleFonts == true ) {
		const headconfig = {
			google: {
				families: [
					headFontFamily +
						( headFontWeight ? ':' + headFontWeight : '' ),
				],
			},
		};

		loadHeadGoogleFonts = (
			<WebfontLoader config={ headconfig }></WebfontLoader>
		);
	}

	if ( subHeadLoadGoogleFonts == true ) {
		const subHeadconfig = {
			google: {
				families: [
					subHeadFontFamily +
						( subHeadFontWeight ? ':' + subHeadFontWeight : '' ),
				],
			},
		};

		loadSubHeadGoogleFonts = (
			<WebfontLoader config={ subHeadconfig }></WebfontLoader>
		);
	}

	if ( dateLoadGoogleFonts == true ) {
		const dateconfig = {
			google: {
				families: [
					dateFontFamily +
						( dateFontWeight ? ':' + dateFontWeight : '' ),
				],
			},
		};

		loadDateGoogleFonts = (
			<WebfontLoader config={ dateconfig }></WebfontLoader>
		);
	}

	if ( authorLoadGoogleFonts == true ) {
		const authorconfig = {
			google: {
				families: [
					authorFontFamily +
						( authorFontWeight ? ':' + authorFontWeight : '' ),
				],
			},
		};

		loadAuthorGoogleFonts = (
			<WebfontLoader config={ authorconfig }></WebfontLoader>
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

	const today = new Date();
	// Parameters for FontIconPicker.
	const iconProps = {
		icons: wp.UAGBSvgIcons,
		value: icon,
		onChange: getTimelineicon,
		isMulti: false,
		renderFunc: renderSVG,
		noSelectedPlaceholder: __(
			'Select Icon',
			'ultimate-addons-for-gutenberg'
		),
	};

	const querySettings = () => {
		return (
			<PanelBody
				title={ __( 'Query', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
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
				<QueryControls
					{ ...{ order, orderBy } }
					numberOfItems={ postsToShow }
					onNumberOfItemsChange={ ( value ) =>
						setAttributes( { postsToShow: value } )
					}
				/>
				<SelectControl
					label={ __( 'Order By', 'ultimate-addons-for-gutenberg' ) }
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
			</PanelBody>
		);
	};
	const layoutSettings = () => {
		return (
			<PanelBody
				title={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __(
						'Orientation',
						'ultimate-addons-for-gutenberg'
					) }
					value={ timelinAlignment }
					onChange={ ( value ) =>
						setAttributes( { timelinAlignment: value } )
					}
					options={ [
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
						{
							value: 'center',
							label: __(
								'Center',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				<SelectControl
					label={ __(
						'Arrow Alignment',
						'ultimate-addons-for-gutenberg'
					) }
					value={ arrowlinAlignment }
					onChange={ ( value ) =>
						setAttributes( { arrowlinAlignment: value } )
					}
					options={ [
						{
							value: 'top',
							label: __( 'Top', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'bottom',
							label: __(
								'Bottom',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'center',
							label: __(
								'Center',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
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
								'Tablet',
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
					help={ __(
						'Note: Choose on what breakpoint the Post Timeline will stack.',
						'ultimate-addons-for-gutenberg'
					) }
					onChange={ ( value ) => setAttributes( { stack: value } ) }
				/>
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
						'Display Featured Image',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ displayPostImage }
					onChange={ () =>
						setAttributes( {
							displayPostImage: ! displayPostImage,
						} )
					}
				/>
				{ displayPostImage && (
					<SelectControl
						label={ __(
							'Featured Image Style',
							'ultimate-addons-for-gutenberg'
						) }
						options={ uagb_blocks_info.image_sizes }
						value={ imageSize }
						onChange={ ( value ) =>
							props.setAttributes( { imageSize: value } )
						}
					/>
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
						'Display Post Author',
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
						'Display Post Date',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ displayPostDate }
					onChange={ () =>
						setAttributes( { displayPostDate: ! displayPostDate } )
					}
				/>
				{ displayPostDate && (
					<SelectControl
						label={ __(
							'Date Format',
							'ultimate-addons-for-gutenberg'
						) }
						value={ dateFormat }
						onChange={ ( value ) =>
							setAttributes( { dateFormat: value } )
						}
						options={ [
							{
								value: 'M j, Y',
								label: dateI18n( 'M j, Y', today ),
							},
							{
								value: 'F j, Y',
								label: dateI18n( 'F j, Y', today ),
							},
							{
								value: 'm/d/Y',
								label: dateI18n( 'm/d/Y', today ),
							},
							{
								value: 'm-d-Y',
								label: dateI18n( 'm-d-Y', today ),
							},
							{
								value: 'm.d.Y',
								label: dateI18n( 'm.d.Y', today ),
							},
							{
								value: 'd M Y',
								label: dateI18n( 'd M Y', today ),
							},
							{
								value: 'd F Y',
								label: dateI18n( 'd F Y', today ),
							},
							{
								value: 'd-m-Y',
								label: dateI18n( 'd-m-Y', today ),
							},
							{
								value: 'd.m.Y',
								label: dateI18n( 'd.m.Y', today ),
							},
							{
								value: 'd/m/Y',
								label: dateI18n( 'd/m/Y', today ),
							},
							{
								value: 'Y-m-d',
								label: dateI18n( 'Y-m-d', today ),
							},
							{
								value: 'Y.m.d',
								label: dateI18n( 'Y.m.d', today ),
							},
							{
								value: 'Y/m/d',
								label: dateI18n( 'Y/m/d', today ),
							},
							{ value: 'M, Y', label: dateI18n( 'M, Y', today ) },
							{ value: 'M Y', label: dateI18n( 'M Y', today ) },
							{ value: 'F, Y', label: dateI18n( 'F, Y', today ) },
							{ value: 'F Y', label: dateI18n( 'F Y', today ) },
						] }
					/>
				) }
				<ToggleControl
					label={ __(
						'Display Post Excerpt',
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
					<RangeControl
						label={ __(
							'Excerpt Length',
							'ultimate-addons-for-gutenberg'
						) }
						value={ exerptLength }
						onChange={ ( value ) =>
							setAttributes( { exerptLength: value } )
						}
						min={ 1 }
						max={ 50 }
						allowReset
					/>
				) }

				<ToggleControl
					label={ __(
						'Display Continue Reading Link',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ displayPostLink }
					onChange={ () =>
						setAttributes( { displayPostLink: ! displayPostLink } )
					}
				/>
				{ displayPostLink && (
					<>
						<TextControl
							label={ __(
								'CTA Text',
								'ultimate-addons-for-gutenberg'
							) }
							value={ readMoreText }
							onChange={ ( value ) =>
								setAttributes( { readMoreText: value } )
							}
						/>
					</>
				) }
				<ToggleControl
					label={ __(
						'Open links in New Tab',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ linkTarget }
					onChange={ () =>
						setAttributes( { linkTarget: ! linkTarget } )
					}
				/>
			</PanelBody>
		);
	};
	const timelineItemSettings = () => {
		return (
			<PanelBody
				title={ __( 'Timeline Item', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<h2>{ __( 'Heading', 'ultimate-addons-for-gutenberg' ) }</h2>
				<SelectControl
					label={ __(
						'Heading Tag',
						'ultimate-addons-for-gutenberg'
					) }
					value={ headingTag }
					onChange={ ( value ) =>
						setAttributes( { headingTag: value } )
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
							value: 'p',
							label: __( 'P', 'ultimate-addons-for-gutenberg' ),
						},
						{
							value: 'span',
							label: __(
								'SPAN',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>

				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ props.attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: headLoadGoogleFonts,
						label: 'headLoadGoogleFonts',
					} }
					fontFamily={ {
						value: headFontFamily,
						label: 'headFontFamily',
					} }
					fontWeight={ {
						value: headFontWeight,
						label: 'headFontWeight',
					} }
					fontSubset={ {
						value: headFontSubset,
						label: 'headFontSubset',
					} }
					fontSizeType={ {
						value: headFontSizeType,
						label: 'headFontSizeType',
					} }
					fontSize={ { value: headFontSize, label: 'headFontSize' } }
					fontSizeMobile={ {
						value: headFontSizeMobile,
						label: 'headFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: headFontSizeTablet,
						label: 'headFontSizeTablet',
					} }
					lineHeightType={ {
						value: headLineHeightType,
						label: 'headLineHeightType',
					} }
					lineHeight={ {
						value: headLineHeight,
						label: 'headLineHeight',
					} }
					lineHeightMobile={ {
						value: headLineHeightMobile,
						label: 'headLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: headLineHeightTablet,
						label: 'headLineHeightTablet',
					} }
				/>
				{ displayPostExcerpt && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<TypographyControl
							label={ __(
								'Typography',
								'ultimate-addons-for-gutenberg'
							) }
							attributes={ props.attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ {
								value: subHeadLoadGoogleFonts,
								label: 'subHeadLoadGoogleFonts',
							} }
							fontFamily={ {
								value: subHeadFontFamily,
								label: 'subHeadFontFamily',
							} }
							fontWeight={ {
								value: subHeadFontWeight,
								label: 'subHeadFontWeight',
							} }
							fontSubset={ {
								value: subHeadFontSubset,
								label: 'subHeadFontSubset',
							} }
							fontSizeType={ {
								value: subHeadFontSizeType,
								label: 'subHeadFontSizeType',
							} }
							fontSize={ {
								value: subHeadFontSize,
								label: 'subHeadFontSize',
							} }
							fontSizeMobile={ {
								value: subHeadFontSizeMobile,
								label: 'subHeadFontSizeMobile',
							} }
							fontSizeTablet={ {
								value: subHeadFontSizeTablet,
								label: 'subHeadFontSizeTablet',
							} }
							lineHeightType={ {
								value: subHeadLineHeightType,
								label: 'subHeadLineHeightType',
							} }
							lineHeight={ {
								value: subHeadLineHeight,
								label: 'subHeadLineHeight',
							} }
							lineHeightMobile={ {
								value: subHeadLineHeightMobile,
								label: 'subHeadLineHeightMobile',
							} }
							lineHeightTablet={ {
								value: subHeadLineHeightTablet,
								label: 'subHeadLineHeightTablet',
							} }
						/>
					</>
				) }

				{ displayPostDate && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __( 'Date', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<TypographyControl
							label={ __(
								'Typography',
								'ultimate-addons-for-gutenberg'
							) }
							attributes={ props.attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ {
								value: dateLoadGoogleFonts,
								label: 'dateLoadGoogleFonts',
							} }
							fontFamily={ {
								value: dateFontFamily,
								label: 'dateFontFamily',
							} }
							fontWeight={ {
								value: dateFontWeight,
								label: 'dateFontWeight',
							} }
							fontSubset={ {
								value: dateFontSubset,
								label: 'dateFontSubset',
							} }
							fontSizeType={ {
								value: dateFontsizeType,
								label: 'dateFontsizeType',
							} }
							fontSize={ {
								value: dateFontsize,
								label: 'dateFontsize',
							} }
							fontSizeMobile={ {
								value: dateFontsizeMobile,
								label: 'dateFontsizeMobile',
							} }
							fontSizeTablet={ {
								value: dateFontsizeTablet,
								label: 'dateFontsizeTablet',
							} }
							lineHeightType={ {
								value: dateLineHeightType,
								label: 'dateLineHeightType',
							} }
							lineHeight={ {
								value: dateLineHeight,
								label: 'dateLineHeight',
							} }
							lineHeightMobile={ {
								value: dateLineHeightMobile,
								label: 'dateLineHeightMobile',
							} }
							lineHeightTablet={ {
								value: dateLineHeightTablet,
								label: 'dateLineHeightTablet',
							} }
						/>
					</>
				) }

				{ displayPostAuthor && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __( 'Author', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<TypographyControl
							label={ __(
								'Typography',
								'ultimate-addons-for-gutenberg'
							) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ {
								value: authorLoadGoogleFonts,
								label: 'authorLoadGoogleFonts',
							} }
							fontFamily={ {
								value: authorFontFamily,
								label: 'authorFontFamily',
							} }
							fontWeight={ {
								value: authorFontWeight,
								label: 'authorFontWeight',
							} }
							fontSubset={ {
								value: authorFontSubset,
								label: 'authorFontSubset',
							} }
							fontSizeType={ {
								value: authorFontSizeType,
								label: 'authorFontSizeType',
							} }
							fontSize={ {
								value: authorFontSize,
								label: 'authorFontSize',
							} }
							fontSizeMobile={ {
								value: authorFontSizeMobile,
								label: 'authorFontSizeMobile',
							} }
							fontSizeTablet={ {
								value: authorFontSizeTablet,
								label: 'authorFontSizeTablet',
							} }
							lineHeightType={ {
								value: authorLineHeightType,
								label: 'authorLineHeightType',
							} }
							lineHeight={ {
								value: authorLineHeight,
								label: 'authorLineHeight',
							} }
							lineHeightMobile={ {
								value: authorLineHeightMobile,
								label: 'authorLineHeightMobile',
							} }
							lineHeightTablet={ {
								value: authorLineHeightTablet,
								label: 'authorLineHeightTablet',
							} }
						/>
					</>
				) }

				{ displayPostLink && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __( 'CTA', 'ultimate-addons-for-gutenberg' ) }
						</h2>
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
					</>
				) }
				<hr className="uagb-editor__separator" />
				<RangeControl
					label={ __(
						'Rounded Corners',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderRadius }
					onChange={ ( value ) =>
						setAttributes( { borderRadius: value } )
					}
					min={ 0 }
					initialPosition={ 10 }
					max={ 50 }
					allowReset
				/>
			</PanelBody>
		);
	};
	const connectorSettings = () => {
		return (
			<PanelBody
				title={ __( 'Connector', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<FontIconPicker { ...iconProps } />
				<RangeControl
					label={ __( 'Icon Size', 'ultimate-addons-for-gutenberg' ) }
					value={ iconSize }
					onChange={ ( value ) =>
						setAttributes( { iconSize: value } )
					}
					min={ 0 }
					max={ 30 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Icon Background Size',
						'ultimate-addons-for-gutenberg'
					) }
					value={ connectorBgsize }
					onChange={ ( value ) =>
						setAttributes( { connectorBgsize: value } )
					}
					min={ 25 }
					max={ 90 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Border Width',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderwidth }
					onChange={ ( value ) =>
						setAttributes( { borderwidth: value } )
					}
					min={ 1 }
					max={ 10 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Connector Width',
						'ultimate-addons-for-gutenberg'
					) }
					value={ separatorwidth }
					onChange={ ( value ) =>
						setAttributes( { separatorwidth: value } )
					}
					min={ 1 }
					max={ 10 }
					allowReset
				/>
			</PanelBody>
		);
	};
	const connectorColorsSettings = () => {
		const iconColorSettings = (
			<PanelColorSettings
				title={ __(
					'Color Settings',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ true }
				colorSettings={ [
					{
						value: separatorColor,
						onChange: ( colorValue ) =>
							setAttributes( { separatorColor: colorValue } ),
						label: __(
							'Line Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: iconColor,
						onChange: ( colorValue ) =>
							setAttributes( { iconColor: colorValue } ),
						label: __(
							'Icon Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: separatorBg,
						onChange: ( colorValue ) =>
							setAttributes( { separatorBg: colorValue } ),
						label: __(
							'Background Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: separatorBorder,
						onChange: ( colorValue ) =>
							setAttributes( { separatorBorder: colorValue } ),
						label: __(
							'Border Color',
							'ultimate-addons-for-gutenberg'
						),
					},
				] }
			></PanelColorSettings>
		);

		const iconFocusSettings = (
			<PanelColorSettings
				title={ __(
					'Color Settings',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ true }
				colorSettings={ [
					{
						value: separatorFillColor,
						onChange: ( colorValue ) =>
							setAttributes( { separatorFillColor: colorValue } ),
						label: __(
							'Line Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: iconFocus,
						onChange: ( colorValue ) =>
							setAttributes( { iconFocus: colorValue } ),
						label: __(
							'Icon Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: iconBgFocus,
						onChange: ( colorValue ) =>
							setAttributes( { iconBgFocus: colorValue } ),
						label: __(
							'Background Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: borderFocus,
						onChange: ( colorValue ) =>
							setAttributes( { borderFocus: colorValue } ),
						label: __(
							'Border Color',
							'ultimate-addons-for-gutenberg'
						),
					},
				] }
			></PanelColorSettings>
		);

		return (
			<PanelBody
				title={ __(
					'Connector Colors',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ true }
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
							name: 'focus',
							title: __(
								'Focus',
								'ultimate-addons-for-gutenberg'
							),
							className: 'uagb-focus-tab',
						},
					] }
				>
					{ ( tabName ) => {
						let tabout;
						if ( 'focus' === tabName.name ) {
							tabout = iconFocusSettings;
						} else {
							tabout = iconColorSettings;
						}
						return <div>{ tabout }</div>;
					} }
				</TabPanel>
			</PanelBody>
		);
	};
	const colorSettings = () => {
		return (
			<PanelColorSettings
				title={ __( 'Color', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: ( colorValue ) =>
							setAttributes( { backgroundColor: colorValue } ),
						label: __(
							'Background Color',
							'ultimate-addons-for-gutenberg'
						),
					},
				] }
			>
				{ displayPostDate && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Date Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor: dateColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ dateColor }
							onChange={ ( colorValue ) =>
								setAttributes( { dateColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
				<>
					<p className="uagb-setting-label">
						{ __(
							'Heading Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: headingColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ headingColor }
						onChange={ ( colorValue ) =>
							setAttributes( { headingColor: colorValue } )
						}
						allowReset
					/>
				</>
				{ displayPostAuthor && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Author Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor: authorColor } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ authorColor }
							onChange={ ( colorValue ) =>
								setAttributes( { authorColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
				{ displayPostExcerpt && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Content Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: subHeadingColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ subHeadingColor }
							onChange={ ( colorValue ) =>
								setAttributes( { subHeadingColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }

				{ displayPostLink && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'CTA Color',
								'ultimate-addons-for-gutenberg'
							) }
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
								'CTA Background Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ { backgroundColor: ctaBackground } }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ ctaBackground }
							onChange={ ( colorValue ) =>
								setAttributes( { ctaBackground: colorValue } )
							}
							allowReset
						/>
					</>
				) }
			</PanelColorSettings>
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
						'Block Padding',
						'ultimate-addons-for-gutenberg'
					) }
					value={ bgPadding }
					onChange={ ( value ) =>
						setAttributes( { bgPadding: value } )
					}
					min={ 0 }
					initialPosition={ 10 }
					max={ 50 }
					allowReset
				/>
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
					initialPosition={ 10 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Horizontal Space',
						'ultimate-addons-for-gutenberg'
					) }
					value={ horizontalSpace }
					onChange={ ( value ) =>
						setAttributes( { horizontalSpace: value } )
					}
					min={ 0 }
					max={ 50 }
					initialPosition={ 10 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Vertical Space',
						'ultimate-addons-for-gutenberg'
					) }
					value={ verticalSpace }
					onChange={ ( value ) =>
						setAttributes( { verticalSpace: value } )
					}
					min={ 0 }
					max={ 100 }
					initialPosition={ 10 }
					allowReset
				/>
				<RangeControl
					label={ __(
						'Heading Bottom Spacing',
						'ultimate-addons-for-gutenberg'
					) }
					value={ headSpace }
					onChange={ ( value ) =>
						setAttributes( { headSpace: value } )
					}
					min={ 0 }
					max={ 50 }
					initialPosition={ 10 }
					allowReset
				/>

				{ displayPostAuthor && (
					<RangeControl
						label={ __(
							'Author Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ authorSpace }
						onChange={ ( value ) =>
							setAttributes( { authorSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
				) }
				{ displayPostExcerpt && displayPostLink && (
					<RangeControl
						label={ __(
							'Content Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ contentSpace }
						onChange={ ( value ) =>
							setAttributes( { contentSpace: value } )
						}
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
				) }

				{ displayPostDate && timelinAlignment !== 'center' && (
					<RangeControl
						label={ __(
							'Date Bottom Spacing',
							'ultimate-addons-for-gutenberg'
						) }
						value={ dateBottomspace }
						onChange={ ( value ) =>
							setAttributes( { dateBottomspace: value } )
						}
						min={ 0 }
						max={ 50 }
						initialPosition={ 10 }
						allowReset
					/>
				) }
			</PanelBody>
		);
	};
	const blockControls = () => {
		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'center', 'left', 'right' ] }
				/>
			</BlockControls>
		);
	};
	return (
		<>
			{ blockControls() }
			<InspectorControls>
				{ querySettings() }
				{ layoutSettings() }
				{ imageSettings() }
				{ contentSettings() }
				{ timelineItemSettings() }
				{ connectorSettings() }
				{ connectorColorsSettings() }
				{ colorSettings() }
				{ spacingSettings() }
			</InspectorControls>
			{ loadHeadGoogleFonts }
			{ loadSubHeadGoogleFonts }
			{ loadDateGoogleFonts }
			{ loadAuthorGoogleFonts }
			{ loadCtaGoogleFonts }
		</>
	);
};

export default React.memo( Settings );
