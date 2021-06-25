import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';
import ColumnResponsive from '@Components/typography/column-responsive';
import UAGB_Block_Icons from '@Controls/block-icons';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
const maxColumns = 3;

import {
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	Path,
	SVG,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { setAttributes, attributes, deviceType } = props;

	// Setup the attributes.
	const {
		menu_item_count,
		titleSpace,
		imgHrPadding,
		imgVrPadding,
		columns,
		tcolumns,
		mcolumns,
		rowGap,
		columnGap,
		contentHrPadding,
		contentVrPadding,
		priceColor,
		descColor,
		titleColor,
		seperatorStyle,
		seperatorWidth,
		seperatorThickness,
		seperatorColor,
		priceLoadGoogleFonts,
		titleLoadGoogleFonts,
		descLoadGoogleFonts,
		titleFontSizeType,
		titleFontSize,
		titleFontSizeTablet,
		titleFontSizeMobile,
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		priceFontSizeType,
		priceFontSize,
		priceFontSizeTablet,
		priceFontSizeMobile,
		priceFontFamily,
		priceFontWeight,
		priceFontSubset,
		priceLineHeightType,
		priceLineHeight,
		priceLineHeightTablet,
		priceLineHeightMobile,
		descFontSizeType,
		descFontSize,
		descFontSizeTablet,
		descFontSizeMobile,
		descFontFamily,
		descFontWeight,
		descFontSubset,
		descLineHeightType,
		descLineHeight,
		descLineHeightTablet,
		descLineHeightMobile,
		headingTag,
		imagePosition,
		imageAlignment,
		imageSize,
		imageWidth,
		stack,
	} = attributes;

	const setcolumns = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( pricelistChild ) => {
			pricelistChild.attributes.columns = value;
		} );
		setAttributes( { columns: value } );
	};
	const setheadingTag = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( pricelistChild ) => {
			pricelistChild.attributes.headingTag = value;
		} );
		setAttributes( { headingTag: value } );
	};
	const setimagePosition = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( pricelistChild ) => {
			pricelistChild.attributes.imagePosition = value;
		} );
		setAttributes( { imagePosition: value } );
	};
	const setimageSize = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( pricelistChild ) => {
			pricelistChild.attributes.imageSize = value;
		} );
		setAttributes( { imageSize: value } );
	};

	const setimageAlignment = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( pricelistChild ) => {
			pricelistChild.attributes.imageAlignment = value;
		} );
		setAttributes( { imageAlignment: value } );
	};

	let loadTitleGoogleFonts;
	let loadDescGoogleFonts;
	let loadPriceGoogleFonts;

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

	if ( descLoadGoogleFonts == true ) {
		const descconfig = {
			google: {
				families: [
					descFontFamily +
						( descFontWeight ? ':' + descFontWeight : '' ),
				],
			},
		};

		loadDescGoogleFonts = (
			<WebfontLoader config={ descconfig }></WebfontLoader>
		);
	}

	if ( priceLoadGoogleFonts == true ) {
		const priceconfig = {
			google: {
				families: [
					priceFontFamily +
						( priceFontWeight ? ':' + priceFontWeight : '' ),
				],
			},
		};

		loadPriceGoogleFonts = (
			<WebfontLoader config={ priceconfig }></WebfontLoader>
		);
	}

	// Margin Settings.
	const marginSettings = () => {
		return (
			<PanelBody title={ __( 'Spacing' ) } initialOpen={ false }>
				<RangeControl
					label={ __( 'Row Gap' ) }
					value={ rowGap }
					onChange={ ( value ) => setAttributes( { rowGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( 'Column Gap' ) }
					value={ columnGap }
					onChange={ ( value ) =>
						setAttributes( { columnGap: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( 'Title Bottom Margin' ) }
					value={ titleSpace }
					onChange={ ( value ) =>
						setAttributes( { titleSpace: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Item Padding (px)' ) }</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ 'uagb-margin-control' }
					value={ contentVrPadding }
					onChange={ ( value ) =>
						setAttributes( { contentVrPadding: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ 'uagb-margin-control' }
					value={ contentHrPadding }
					onChange={ ( value ) =>
						setAttributes( { contentHrPadding: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<>
					<hr className="uagb-editor__separator" />
					<h2>{ __( 'Image Padding (px)' ) }</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ 'uagb-margin-control' }
						value={ imgVrPadding }
						onChange={ ( value ) =>
							setAttributes( { imgVrPadding: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ 'uagb-margin-control' }
						value={ imgHrPadding }
						onChange={ ( value ) =>
							setAttributes( { imgHrPadding: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</>
			</PanelBody>
		);
	};

	// Image sizes.
	const imageSizeOptions = [
		{ value: 'thumbnail', label: __( 'Thumbnail' ) },
		{ value: 'medium', label: __( 'Medium' ) },
		{ value: 'full', label: __( 'Large' ) },
	];

	const alignTop = (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<Path d="M9 20h6V9H9v11zM4 4v1.5h16V4H4z" />
		</SVG>
	);

	//Image Setting
	const imageSettings = () => {
		return (
			<>
				<h2>
					<strong>{ __( 'Image Settings' ) }</strong>
				</h2>
				<h2> { __( 'Image Position' ) }</h2>
				<ButtonGroup className="uagb-editor_imgpos_group">
					<Button
						key={ 'left' }
						icon="editor-alignleft"
						label="Left"
						onClick={ () => setimagePosition( 'left' ) }
						aria-pressed={ 'left' === imagePosition }
						isPrimary={ 'left' === imagePosition }
					/>
					<Button
						key={ 'top' }
						icon={ alignTop }
						label="Top"
						onClick={ () => setimagePosition( 'top' ) }
						aria-pressed={ 'top' === imagePosition }
						isPrimary={ 'top' === imagePosition }
					/>
					<Button
						key={ 'right' }
						icon="editor-alignright"
						label="Right"
						onClick={ () => setimagePosition( 'right' ) }
						aria-pressed={ 'right' === imagePosition }
						isPrimary={ 'right' === imagePosition }
					/>
				</ButtonGroup>
				{ ( imagePosition == 'left' || imagePosition == 'right' ) && (
					<>
						<SelectControl
							label={ __( 'Vertical Alignment' ) }
							value={ imageAlignment }
							onChange={ setimageAlignment }
							options={ [
								{ value: 'top', label: __( 'Top' ) },
								{ value: 'middle', label: __( 'Middle' ) },
							] }
						/>
						<SelectControl
							label={ __( 'Stack on' ) }
							value={ stack }
							options={ [
								{ value: 'none', label: __( 'None' ) },
								{ value: 'tablet', label: __( 'Tablet' ) },
								{ value: 'mobile', label: __( 'Mobile' ) },
							] }
							help={ __(
								'Note: Choose on what breakpoint the Images will stack.'
							) }
							onChange={ ( value ) =>
								setAttributes( { stack: value } )
							}
						/>
					</>
				) }
				<SelectControl
					label={ __( 'Image Size' ) }
					options={ imageSizeOptions }
					value={ imageSize }
					onChange={ setimageSize }
				/>
				<RangeControl
					label={ __( 'Width' ) }
					value={ imageWidth }
					onChange={ ( value ) =>
						setAttributes( { imageWidth: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
			</>
		);
	};

	//Color settings
	const colorSettings = () => {
		return (
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: titleColor,
						onChange: ( value ) =>
							setAttributes( { titleColor: value } ),
						label: __( 'Title Color' ),
					},
					{
						value: descColor,
						onChange: ( value ) =>
							setAttributes( { descColor: value } ),
						label: __( 'Content Color' ),
					},
					{
						value: priceColor,
						onChange: ( value ) =>
							setAttributes( { priceColor: value } ),
						label: __( 'Price Color' ),
					},
				] }
			></PanelColorSettings>
		);
	};

	//seperator setting
	const separatorSettings = () => {
		return (
			<>
				<h2>
					<strong>Separator Settings</strong>
				</h2>
				<SelectControl
					label={ __( 'Separator Style' ) }
					value={ seperatorStyle }
					onChange={ ( value ) =>
						setAttributes( { seperatorStyle: value } )
					}
					options={ [
						{ value: 'none', label: __( 'None' ) },
						{ value: 'solid', label: __( 'Solid' ) },
						{ value: 'dotted', label: __( 'Dotted' ) },
						{ value: 'dashed', label: __( 'Dashed' ) },
						{ value: 'double', label: __( 'Double' ) },
						{ value: 'groove', label: __( 'Groove' ) },
						{ value: 'inset', label: __( 'Inset' ) },
						{ value: 'outset', label: __( 'Outset' ) },
						{ value: 'ridge', label: __( 'Ridge' ) },
					] }
				/>
				{ 'none' != seperatorStyle && (
					<>
						<RangeControl
							label={ __( 'Separator Width (%)' ) }
							value={ seperatorWidth }
							onChange={ ( value ) =>
								setAttributes( { seperatorWidth: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ __( 'Separator Thickness' ) }
							value={ seperatorThickness }
							onChange={ ( value ) =>
								setAttributes( { seperatorThickness: value } )
							}
							min={ 0 }
							max={ 20 }
							allowReset
						/>
						<>
							<p className="uagb-setting-label">
								{ __( 'Separator Color' ) }
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
			</>
		);
	};

	// Typography settings.
	const typographySettings = () => {
		return (
			<PanelBody title={ __( 'Typography' ) } initialOpen={ false }>
				<h2>{ __( 'Title' ) }</h2>
				<SelectControl
					label={ __( 'Title Tag' ) }
					value={ headingTag }
					onChange={ setheadingTag }
					options={ [
						{ value: 'h1', label: __( 'H1' ) },
						{ value: 'h2', label: __( 'H2' ) },
						{ value: 'h3', label: __( 'H3' ) },
						{ value: 'h4', label: __( 'H4' ) },
						{ value: 'h5', label: __( 'H5' ) },
						{ value: 'h6', label: __( 'H6' ) },
						{ value: 'p', label: __( 'P' ) },
						{ value: 'span', label: __( 'SPAN' ) },
					] }
				/>
				<Suspense fallback={ lazyLoader() }>
					<TypographyControl
						label={ __( 'Typography' ) }
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
					<hr className="uagb-editor__separator" />
					<h2>{ __( 'Content' ) }</h2>
					<TypographyControl
						label={ __( 'Typography' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: descLoadGoogleFonts,
							label: 'descLoadGoogleFonts',
						} }
						fontFamily={ {
							value: descFontFamily,
							label: 'descFontFamily',
						} }
						fontWeight={ {
							value: descFontWeight,
							label: 'descFontWeight',
						} }
						fontSubset={ {
							value: descFontSubset,
							label: 'descFontSubset',
						} }
						fontSizeType={ {
							value: descFontSizeType,
							label: 'descFontSizeType',
						} }
						fontSize={ {
							value: descFontSize,
							label: 'descFontSize',
						} }
						fontSizeMobile={ {
							value: descFontSizeMobile,
							label: 'descFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: descFontSizeTablet,
							label: 'descFontSizeTablet',
						} }
						lineHeightType={ {
							value: descLineHeightType,
							label: 'descLineHeightType',
						} }
						lineHeight={ {
							value: descLineHeight,
							label: 'descLineHeight',
						} }
						lineHeightMobile={ {
							value: descLineHeightMobile,
							label: 'descLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: descLineHeightTablet,
							label: 'descLineHeightTablet',
						} }
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( 'Price' ) }</h2>
					<TypographyControl
						label={ __( 'Typography' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: priceLoadGoogleFonts,
							label: 'priceLoadGoogleFonts',
						} }
						fontFamily={ {
							value: priceFontFamily,
							label: 'priceFontFamily',
						} }
						fontWeight={ {
							value: priceFontWeight,
							label: 'priceFontWeight',
						} }
						fontSubset={ {
							value: priceFontSubset,
							label: 'priceFontSubset',
						} }
						fontSizeType={ {
							value: priceFontSizeType,
							label: 'priceFontSizeType',
						} }
						fontSize={ {
							value: priceFontSize,
							label: 'priceFontSize',
						} }
						fontSizeMobile={ {
							value: priceFontSizeMobile,
							label: 'priceFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: priceFontSizeTablet,
							label: 'priceFontSizeTablet',
						} }
						lineHeightType={ {
							value: priceLineHeightType,
							label: 'priceLineHeightType',
						} }
						lineHeight={ {
							value: priceLineHeight,
							label: 'priceLineHeight',
						} }
						lineHeightMobile={ {
							value: priceLineHeightMobile,
							label: 'priceLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: priceLineHeightTablet,
							label: 'priceLineHeightTablet',
						} }
					/>
				</Suspense>
			</PanelBody>
		);
	};

	const inspectControl = () => {
		return (
			<InspectorControls>
				<PanelBody title={ __( 'General' ) } initialOpen={ true }>
					<ColumnResponsive />
					{ 'Desktop' === deviceType && (
						<>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ columns }
								onChange={ setcolumns }
								min={ 1 }
								max={ Math.min( maxColumns, menu_item_count ) }
							/>
						</>
					) }
					{ 'Tablet' === deviceType && (
						<>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ tcolumns }
								onChange={ ( value ) =>
									setAttributes( { tcolumns: value } )
								}
								min={ 1 }
								max={ Math.min( maxColumns, menu_item_count ) }
							/>
						</>
					) }
					{ 'Mobile' === deviceType && (
						<>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ mcolumns }
								onChange={ ( value ) =>
									setAttributes( { mcolumns: value } )
								}
								min={ 1 }
								max={ Math.min( maxColumns, menu_item_count ) }
							/>
						</>
					) }
					<hr className="uagb-editor__separator" />
					{ imageSettings() }
					<hr className="uagb-editor__separator" />
					{ separatorSettings() }
				</PanelBody>
				{ marginSettings() }
				{ colorSettings() }
				{ typographySettings() }
			</InspectorControls>
		);
	};

	return (
		<>
			{ inspectControl() }
			<Suspense fallback={ lazyLoader() }>
				{ loadTitleGoogleFonts }
				{ loadDescGoogleFonts }
				{ loadPriceGoogleFonts }
			</Suspense>
		</>
	);
};

export default React.memo( Settings );
