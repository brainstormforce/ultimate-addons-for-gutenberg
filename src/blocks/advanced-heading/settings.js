import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';

import { __ } from '@wordpress/i18n';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';

// Extend component
const Settings = ( props ) => {
	props = props.parentProps;
	const { attributes, setAttributes } = props;
	const {
		headingAlign,
		headingColor,
		subHeadingColor,
		separatorColor,
		headingTag,
		headFontFamily,
		headFontWeight,
		headFontSubset,
		headFontSizeType,
		headFontSize,
		headFontSizeMobile,
		headFontSizeTablet,
		headLineHeightType,
		headLineHeight,
		headLineHeightMobile,
		headLineHeightTablet,
		subHeadFontFamily,
		subHeadFontWeight,
		subHeadFontSubset,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeMobile,
		subHeadFontSizeTablet,
		subHeadLineHeight,
		subHeadLineHeightType,
		subHeadLineHeightMobile,
		subHeadLineHeightTablet,
		separatorWidth,
		separatorWidthType,
		seperatorStyle,
		separatorHeight,
		headSpace,
		separatorSpace,
		headLoadGoogleFonts,
		subHeadLoadGoogleFonts,
	} = attributes;

	let loadHeadingGoogleFonts;
	let loadSubHeadingGoogleFonts;

	if ( headLoadGoogleFonts === true ) {
		const hconfig = {
			google: {
				families: [
					headFontFamily +
						( headFontWeight ? ':' + headFontWeight : '' ),
				],
			},
		};

		loadHeadingGoogleFonts = (
			<WebfontLoader config={ hconfig }></WebfontLoader>
		);
	}

	if ( subHeadLoadGoogleFonts === true ) {
		const sconfig = {
			google: {
				families: [
					subHeadFontFamily +
						( subHeadFontWeight ? ':' + subHeadFontWeight : '' ),
				],
			},
		};

		loadSubHeadingGoogleFonts = (
			<WebfontLoader config={ sconfig }></WebfontLoader>
		);
	}

	const blockControlSettings = () => {
		return (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ headingAlign }
					onChange={ ( value ) =>
						setAttributes( { headingAlign: value } )
					}
				/>
			</BlockControls>
		);
	};

	const headingPanel = () => {
		return (
			<PanelBody
				title={ __(
					'Advanced Heading',
					'ultimate-addons-for-gutenberg'
				) }
			>
				<h2>{ __( 'Heading', 'ultimate-addons-for-gutenberg' ) }</h2>
				<SelectControl
					label={ __(
						'Heading Tag',
						'ultimate-addons-for-gutenberg'
					) }
					value={ headingTag }
					onChange={ ( value ) => {
						setAttributes( { headingTag: value } );
					} }
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
					] }
				/>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
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
				<p className="uagb-setting-label">
					{ __( 'Heading Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: headingColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ headingColor }
					onChange={ ( value ) =>
						setAttributes( { headingColor: value } )
					}
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>
					{ __( 'Sub-Heading', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<Suspense fallback={ lazyLoader() }>
					<TypographyControl
						label={ __(
							'Typography',
							'ultimate-addons-for-gutenberg'
						) }
						attributes={ attributes }
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
				</Suspense>
				<p className="uagb-setting-label">
					{ __(
						'Sub Heading Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: subHeadingColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ subHeadingColor }
					onChange={ ( value ) =>
						setAttributes( { subHeadingColor: value } )
					}
					allowReset
				/>
			</PanelBody>
		);
	};

	const seperatorSettings = () => {
		return (
			<PanelBody
				title={ __( 'Separator', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Style', 'ultimate-addons-for-gutenberg' ) }
					value={ seperatorStyle }
					onChange={ ( value ) =>
						setAttributes( { seperatorStyle: value } )
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
							value: 'double',
							label: __(
								'Double',
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
					] }
				/>
				{ seperatorStyle !== 'none' && (
					<>
						<RangeControl
							label={ __(
								'Thickness (px)',
								'ultimate-addons-for-gutenberg'
							) }
							value={ separatorHeight }
							onChange={ ( value ) =>
								setAttributes( { separatorHeight: value } )
							}
							min={ 0 }
							max={ 20 }
							beforeIcon=""
							allowReset
							initialPosition={ 3 }
						/>
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
								isPrimary={ separatorWidthType === 'px' }
								aria-pressed={ separatorWidthType === 'px' }
								onClick={ () =>
									setAttributes( {
										separatorWidthType: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ separatorWidthType === '%' }
								aria-pressed={ separatorWidthType === '%' }
								onClick={ () =>
									setAttributes( { separatorWidthType: '%' } )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<RangeControl
							label={ __(
								'Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ separatorWidth }
							onChange={ ( value ) =>
								setAttributes( { separatorWidth: value } )
							}
							min={ 0 }
							max={ '%' === separatorWidthType ? 100 : 500 }
							beforeIcon=""
							allowReset
							initialPosition={ 20 }
						/>
						{ seperatorStyle !== 'none' && (
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
												backgroundColor: separatorColor,
											} }
										></span>
									</span>
								</p>
								<ColorPalette
									value={ separatorColor }
									onChange={ ( colorValue ) =>
										setAttributes( {
											separatorColor: colorValue,
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
						'Heading Bottom Spacing (px)',
						'ultimate-addons-for-gutenberg'
					) }
					value={ headSpace }
					onChange={ ( value ) =>
						setAttributes( { headSpace: value } )
					}
					min={ 0 }
					max={ 500 }
					beforeIcon=""
					allowReset
					initialPosition={ 0 }
				/>
				{ seperatorStyle !== 'none' && (
					<RangeControl
						label={ __(
							'Separator Bottom Spacing (px)',
							'ultimate-addons-for-gutenberg'
						) }
						value={ separatorSpace }
						onChange={ ( value ) =>
							setAttributes( { separatorSpace: value } )
						}
						min={ 0 }
						max={ 500 }
						beforeIcon=""
						allowReset
						initialPosition={ 0 }
					/>
				) }
			</PanelBody>
		);
	};

	return (
		<div>
			{ blockControlSettings() }
			<InspectorControls>
				{ headingPanel() }
				{ seperatorSettings() }
				{ spacingSettings() }
			</InspectorControls>
			<Suspense fallback={ lazyLoader() }>
				{ loadHeadingGoogleFonts }
				{ loadSubHeadingGoogleFonts }
			</Suspense>
		</div>
	);
};
export default React.memo( Settings );
