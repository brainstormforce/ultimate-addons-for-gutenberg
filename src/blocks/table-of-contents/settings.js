import { __ } from '@wordpress/i18n';

import UAGB_Block_Icons from '@Controls/block-icons';
import renderSVG from '@Controls/renderIcon';
import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import ColumnResponsive from '@Components/typography/column-responsive';
import WebfontLoader from '@Components/typography/fontloader';

import {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		align,
		disableBullets,
		makeCollapsible,
		initialCollapse,
		icon,
		iconColor,
		bulletColor,
		iconSize,
		smoothScroll,
		smoothScrollOffset,
		smoothScrollDelay,
		scrollToTop,
		scrollToTopColor,
		scrollToTopBgColor,
		customWidth,
		widthDesktop,
		widthTablet,
		widthMobile,
		widthTypeMobile,
		widthTypeTablet,
		widthTypeDesktop,
		tColumnsDesktop,
		tColumnsTablet,
		tColumnsMobile,
		backgroundColor,
		linkColor,
		linkHoverColor,
		headingColor,
		vPaddingDesktop,
		vPaddingTablet,
		vPaddingMobile,
		hPaddingDesktop,
		hPaddingTablet,
		hPaddingMobile,
		paddingTypeMobile,
		paddingTypeTablet,
		paddingTypeDesktop,
		vMarginDesktop,
		vMarginTablet,
		vMarginMobile,
		hMarginDesktop,
		hMarginTablet,
		hMarginMobile,
		marginTypeMobile,
		marginTypeTablet,
		marginTypeDesktop,
		headingBottom,
		contentPaddingDesktop,
		contentPaddingTablet,
		contentPaddingMobile,
		contentPaddingTypeMobile,
		contentPaddingTypeTablet,
		contentPaddingTypeDesktop,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		loadGoogleFonts,
		fontFamily,
		fontWeight,
		fontSubset,
		fontSize,
		fontSizeType,
		fontSizeTablet,
		fontSizeMobile,
		lineHeightType,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		headingLoadGoogleFonts,
		headingFontFamily,
		headingFontWeight,
		headingFontSubset,
		headingFontSize,
		headingFontSizeType,
		headingFontSizeTablet,
		headingFontSizeMobile,
		headingLineHeightType,
		headingLineHeight,
		headingLineHeightTablet,
		headingLineHeightMobile,
		mappingHeaders,
		headingAlignment,
	} = attributes;

	const getIcon = ( value ) => {
		props.setAttributes( { icon: value } );
	};

	const iconProps = {
		icons: wp.UAGBSvgIcons,
		value: icon,
		onChange: getIcon,
		isMulti: false,
		renderFunc: renderSVG,
		noSelectedPlaceholder: __(
			'Select Icon',
			'ultimate-addons-for-gutenberg'
		),
	};

	let loadGFonts;
	let headingloadGFonts;

	if ( loadGoogleFonts == true ) {
		const config = {
			google: {
				families: [
					fontFamily + ( fontWeight ? ':' + fontWeight : '' ),
				],
			},
		};

		loadGFonts = <WebfontLoader config={ config }></WebfontLoader>;
	}

	if ( headingLoadGoogleFonts == true ) {
		const headingconfig = {
			google: {
				families: [
					headingFontFamily +
						( headingFontWeight ? ':' + headingFontWeight : '' ),
				],
			},
		};

		headingloadGFonts = (
			<WebfontLoader config={ headingconfig }></WebfontLoader>
		);
	}

	const getGeneralPanelBody = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<h2>
					{ __(
						'Select the heading to consider when generating the table',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				{ mappingHeaders.map( ( a, i ) => (
					<PanelRow key={ i }>
						<label htmlFor={ `ub_toggle_h${ i + 1 }` }>{ `H${
							i + 1
						}` }</label>
						<ToggleControl
							id={ `ub_toggle_h${ i + 1 }` }
							checked={ a }
							onChange={ () =>
								setAttributes( {
									mappingHeaders: [
										...mappingHeaders.slice( 0, i ),
										! mappingHeaders[ i ],
										...mappingHeaders.slice( i + 1 ),
									],
								} )
							}
						/>
					</PanelRow>
				) ) }
			</PanelBody>
		);
	};

	const getScrollPanelBody = () => {
		return (
			<PanelBody
				title={ __( 'Scroll', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __(
						'Smooth Scroll',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ smoothScroll }
					help={ __(
						'This will be in Action only in Front End.',
						'ultimate-addons-for-gutenberg'
					) }
					onChange={ () =>
						setAttributes( { smoothScroll: ! smoothScroll } )
					}
				/>
				{ smoothScroll && (
					<>
						<RangeControl
							label={ __(
								'Smooth Scroll Offset (px)',
								'ultimate-addons-for-gutenberg'
							) }
							value={ smoothScrollOffset }
							onChange={ ( value ) =>
								setAttributes( {
									smoothScrollOffset: value,
								} )
							}
							min={ 0 }
							max={ 1000 }
						/>
						<RangeControl
							label={ __(
								'Scroll Animation Delay (ms)',
								'ultimate-addons-for-gutenberg'
							) }
							value={ smoothScrollDelay }
							onChange={ ( value ) =>
								setAttributes( {
									smoothScrollDelay: value,
								} )
							}
							min={ 100 }
							max={ 5000 }
						/>
					</>
				) }
				<hr className="uagb-editor__separator" />
				<ToggleControl
					label={ __(
						'Show Scroll To Top',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ scrollToTop }
					help={ __(
						'This will add a Scroll to Top arrow at the bottom of page.',
						'ultimate-addons-for-gutenberg'
					) }
					onChange={ () =>
						setAttributes( { scrollToTop: ! scrollToTop } )
					}
				/>
				{ scrollToTop && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Icon Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: scrollToTopColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ scrollToTopColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									scrollToTopColor: colorValue,
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
										backgroundColor: scrollToTopBgColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ scrollToTopBgColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									scrollToTopBgColor: colorValue,
								} )
							}
							allowReset
						/>
					</>
				) }
			</PanelBody>
		);
	};

	const getContentPanelBody = () => {
		return (
			<PanelBody
				title={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<h2>{ __( 'Heading', 'ultimate-addons-for-gutenberg' ) }</h2>
				<SelectControl
					label={ __( 'Alignment', 'ultimate-addons-for-gutenberg' ) }
					value={ headingAlignment }
					onChange={ ( value ) =>
						setAttributes( { headingAlignment: value } )
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
							value: 'center',
							label: __(
								'Center',
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
				<RangeControl
					label={ __(
						'Bottom Space',
						'ultimate-addons-for-gutenberg'
					) }
					value={ headingBottom }
					onChange={ ( value ) =>
						setAttributes( { headingBottom: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: headingLoadGoogleFonts,
						label: 'headingLoadGoogleFonts',
					} }
					fontFamily={ {
						value: headingFontFamily,
						label: 'headingFontFamily',
					} }
					fontWeight={ {
						value: headingFontWeight,
						label: 'headingFontWeight',
					} }
					fontSubset={ {
						value: headingFontSubset,
						label: 'headingFontSubset',
					} }
					fontSizeType={ {
						value: headingFontSizeType,
						label: 'headingFontSizeType',
					} }
					fontSize={ {
						value: headingFontSize,
						label: 'headingFontSize',
					} }
					fontSizeMobile={ {
						value: headingFontSizeMobile,
						label: 'headingFontSizeMobile',
					} }
					fontSizeTablet={ {
						value: headingFontSizeTablet,
						label: 'headingFontSizeTablet',
					} }
					lineHeightType={ {
						value: headingLineHeightType,
						label: 'headingLineHeightType',
					} }
					lineHeight={ {
						value: headingLineHeight,
						label: 'headingLineHeight',
					} }
					lineHeightMobile={ {
						value: headingLineHeightMobile,
						label: 'headingLineHeightMobile',
					} }
					lineHeightTablet={ {
						value: headingLineHeightTablet,
						label: 'headingLineHeightTablet',
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
					onChange={ ( colorValue ) =>
						setAttributes( { headingColor: colorValue } )
					}
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>
					{ __( 'Collapsible', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<ToggleControl
					label={ __(
						'Make Content Collapsible',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ makeCollapsible }
					onChange={ () =>
						setAttributes( {
							makeCollapsible: ! makeCollapsible,
						} )
					}
				/>
				{ makeCollapsible && (
					<>
						<ToggleControl
							label={ __(
								'Keep Collapsed Initially',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ initialCollapse }
							onChange={ () =>
								setAttributes( {
									initialCollapse: ! initialCollapse,
								} )
							}
						/>
						<FontIconPicker { ...iconProps } />
						<RangeControl
							label={ __(
								'Icon Size',
								'ultimate-addons-for-gutenberg'
							) }
							value={ iconSize }
							onChange={ ( value ) =>
								setAttributes( { iconSize: value } )
							}
							min={ 0 }
							max={ 300 }
							beforeIcon=""
							allowReset
						/>
						<ColorPalette
							value={ iconColor }
							onChange={ ( colorValue ) =>
								setAttributes( { iconColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Content', 'ultimate-addons-for-gutenberg' ) }</h2>
				<ToggleControl
					label={ __(
						'Disable Bullet Points',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ disableBullets }
					onChange={ () =>
						setAttributes( {
							disableBullets: ! disableBullets,
						} )
					}
				/>
				{ ! disableBullets && (
					<>
						<p className="uagb-setting-label">
							{ __(
								'Bullet Points Color',
								'ultimate-addons-for-gutenberg'
							) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: bulletColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ bulletColor }
							onChange={ ( colorValue ) =>
								setAttributes( { bulletColor: colorValue } )
							}
							allowReset
						/>
					</>
				) }

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
								isPrimary={ contentPaddingTypeDesktop === 'px' }
								aria-pressed={
									contentPaddingTypeDesktop === 'px'
								}
								onClick={ () =>
									setAttributes( {
										contentPaddingTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ contentPaddingTypeDesktop === '%' }
								aria-pressed={
									contentPaddingTypeDesktop === '%'
								}
								onClick={ () =>
									setAttributes( {
										contentPaddingTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2 className="uagb-light-font-weight">
							{ __( 'Gap Between Lists' ) }
						</h2>
						<RangeControl
							className={ 'uagb-gap-control' }
							value={ contentPaddingDesktop }
							onChange={ ( value ) =>
								setAttributes( {
									contentPaddingDesktop: value,
								} )
							}
							min={ 0 }
							max={ 100 }
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
								isPrimary={ contentPaddingTypeTablet === 'px' }
								aria-pressed={
									contentPaddingTypeTablet === 'px'
								}
								onClick={ () =>
									setAttributes( {
										contentPaddingTypeTablet: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ contentPaddingTypeTablet === '%' }
								aria-pressed={
									contentPaddingTypeTablet === '%'
								}
								onClick={ () =>
									setAttributes( {
										contentPaddingTypeTablet: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2 className="uagb-lighter-font-weight">
							{ __( 'Gap Between Lists' ) }
						</h2>
						<RangeControl
							className={ 'uagb-margin-control' }
							value={ contentPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( {
									contentPaddingTablet: value,
								} )
							}
							min={ 0 }
							max={ 100 }
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
								isPrimary={ contentPaddingTypeMobile === 'px' }
								aria-pressed={
									contentPaddingTypeMobile === 'px'
								}
								onClick={ () =>
									setAttributes( {
										contentPaddingTypeMobile: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ contentPaddingTypeMobile === '%' }
								aria-pressed={
									contentPaddingTypeMobile === '%'
								}
								onClick={ () =>
									setAttributes( {
										contentPaddingTypeMobile: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2 className="uagb-light-font-weight">
							{ __( 'Gap Between Lists' ) }
						</h2>
						<RangeControl
							className={ 'uagb-margin-control' }
							value={ contentPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( {
									contentPaddingMobile: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</>
				) }

				<TypographyControl
					label={ __(
						'Typography',
						'ultimate-addons-for-gutenberg'
					) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					loadGoogleFonts={ {
						value: loadGoogleFonts,
						label: 'loadGoogleFonts',
					} }
					fontFamily={ {
						value: fontFamily,
						label: 'fontFamily',
					} }
					fontWeight={ {
						value: fontWeight,
						label: 'fontWeight',
					} }
					fontSubset={ {
						value: fontSubset,
						label: 'fontSubset',
					} }
					fontSizeType={ {
						value: fontSizeType,
						label: 'fontSizeType',
					} }
					fontSize={ { value: fontSize, label: 'fontSize' } }
					fontSizeMobile={ {
						value: fontSizeMobile,
						label: 'fontSizeMobile',
					} }
					fontSizeTablet={ {
						value: fontSizeTablet,
						label: 'fontSizeTablet',
					} }
					lineHeightType={ {
						value: lineHeightType,
						label: 'lineHeightType',
					} }
					lineHeight={ {
						value: lineHeight,
						label: 'lineHeight',
					} }
					lineHeightMobile={ {
						value: lineHeightMobile,
						label: 'lineHeightMobile',
					} }
					lineHeightTablet={ {
						value: lineHeightTablet,
						label: 'lineHeightTablet',
					} }
				/>
				<p className="uagb-setting-label">
					{ __( 'Content Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: linkColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ linkColor }
					onChange={ ( colorValue ) =>
						setAttributes( { linkColor: colorValue } )
					}
					allowReset
				/>
				<p className="uagb-setting-label">
					{ __(
						'Content Hover Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: linkHoverColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ linkHoverColor }
					onChange={ ( colorValue ) =>
						setAttributes( { linkHoverColor: colorValue } )
					}
					allowReset
				/>
			</PanelBody>
		);
	};

	const getStylePanelBody = () => {
		return (
			<PanelBody
				title={ __( 'Style', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<h2>{ __( 'Background', 'ultimate-addons-for-gutenberg' ) }</h2>
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
				<hr className="uagb-editor__separator" />
				<ToggleControl
					label={ __(
						'Custom Width',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ customWidth }
					onChange={ () =>
						setAttributes( { customWidth: ! customWidth } )
					}
					help={ __(
						"Table's width will be auto if this is kept off.",
						'ultimate-addons-for-gutenberg'
					) }
				/>
				{ customWidth && <ColumnResponsive /> }
				{ 'Desktop' === deviceType && customWidth && (
					<>
						<ButtonGroup
							className="uagb-size-type-field"
							aria-label={ __( 'Size Type' ) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthTypeDesktop === 'px' }
								aria-pressed={ widthTypeDesktop === 'px' }
								onClick={ () =>
									setAttributes( {
										widthTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthTypeDesktop === '%' }
								aria-pressed={ widthTypeDesktop === '%' }
								onClick={ () =>
									setAttributes( {
										widthTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<RangeControl
							label={ __( 'Width' ) }
							value={ widthDesktop }
							onChange={ ( value ) =>
								setAttributes( { widthDesktop: value } )
							}
							min={ 0 }
							max={ '%' == widthTypeDesktop ? 100 : 1000 }
							beforeIcon=""
							allowReset
						/>
					</>
				) }
				{ 'Tablet' === deviceType && customWidth && (
					<>
						<ButtonGroup
							className="uagb-size-type-field"
							aria-label={ __( 'Size Type' ) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthTypeTablet === 'px' }
								aria-pressed={ widthTypeTablet === 'px' }
								onClick={ () =>
									setAttributes( {
										widthTypeTablet: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthTypeTablet === '%' }
								aria-pressed={ widthTypeTablet === '%' }
								onClick={ () =>
									setAttributes( {
										widthTypeTablet: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<RangeControl
							label={ __( 'Width' ) }
							value={ widthTablet }
							onChange={ ( value ) =>
								setAttributes( { widthTablet: value } )
							}
							min={ 0 }
							max={ '%' == widthTypeTablet ? 100 : 1000 }
							beforeIcon=""
							allowReset
						/>
					</>
				) }
				{ 'Mobile' === deviceType && customWidth && (
					<>
						<ButtonGroup
							className="uagb-size-type-field"
							aria-label={ __( 'Size Type' ) }
						>
							<Button
								key={ 'px' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthTypeMobile === 'px' }
								aria-pressed={ widthTypeMobile === 'px' }
								onClick={ () =>
									setAttributes( {
										widthTypeMobile: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ widthTypeMobile === '%' }
								aria-pressed={ widthTypeMobile === '%' }
								onClick={ () =>
									setAttributes( {
										widthTypeMobile: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<RangeControl
							label={ __( 'Width' ) }
							value={ widthMobile }
							onChange={ ( value ) =>
								setAttributes( { widthMobile: value } )
							}
							min={ 0 }
							max={ '%' == widthTypeMobile ? 100 : 1000 }
							beforeIcon=""
							allowReset
						/>
					</>
				) }
				<ColumnResponsive />
				{ 'Desktop' === deviceType && (
					<>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ tColumnsDesktop }
							onChange={ ( value ) =>
								setAttributes( { tColumnsDesktop: value } )
							}
							min={ 1 }
							max={ 10 }
						/>
					</>
				) }
				{ 'Tablet' === deviceType && (
					<>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ tColumnsTablet }
							onChange={ ( value ) =>
								setAttributes( { tColumnsTablet: value } )
							}
							min={ 1 }
							max={ 10 }
						/>
					</>
				) }
				{ 'Mobile' === deviceType && (
					<>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ tColumnsMobile }
							onChange={ ( value ) =>
								setAttributes( { tColumnsMobile: value } )
							}
							min={ 1 }
							max={ 10 }
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
								isPrimary={ paddingTypeDesktop === 'px' }
								aria-pressed={ paddingTypeDesktop === 'px' }
								onClick={ () =>
									setAttributes( {
										paddingTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingTypeDesktop === '%' }
								aria-pressed={ paddingTypeDesktop === '%' }
								onClick={ () =>
									setAttributes( {
										paddingTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPaddingDesktop }
							onChange={ ( value ) =>
								setAttributes( { vPaddingDesktop: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPaddingDesktop }
							onChange={ ( value ) =>
								setAttributes( { hPaddingDesktop: value } )
							}
							min={ 0 }
							max={ 100 }
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
								isPrimary={ paddingTypeTablet === 'px' }
								aria-pressed={ paddingTypeTablet === 'px' }
								onClick={ () =>
									setAttributes( {
										paddingTypeTablet: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingTypeTablet === '%' }
								aria-pressed={ paddingTypeTablet === '%' }
								onClick={ () =>
									setAttributes( {
										paddingTypeTablet: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( { vPaddingTablet: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPaddingTablet }
							onChange={ ( value ) =>
								setAttributes( { hPaddingTablet: value } )
							}
							min={ 0 }
							max={ 100 }
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
								isPrimary={ paddingTypeMobile === 'px' }
								aria-pressed={ paddingTypeMobile === 'px' }
								onClick={ () =>
									setAttributes( {
										paddingTypeMobile: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ paddingTypeMobile === '%' }
								aria-pressed={ paddingTypeMobile === '%' }
								onClick={ () =>
									setAttributes( {
										paddingTypeMobile: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'Padding' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( { vPaddingMobile: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hPaddingMobile }
							onChange={ ( value ) =>
								setAttributes( { hPaddingMobile: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</>
				) }
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
								isPrimary={ marginTypeDesktop === 'px' }
								aria-pressed={ marginTypeDesktop === 'px' }
								onClick={ () =>
									setAttributes( {
										marginTypeDesktop: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ marginTypeDesktop === '%' }
								aria-pressed={ marginTypeDesktop === '%' }
								onClick={ () =>
									setAttributes( {
										marginTypeDesktop: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'List Margin' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vMarginDesktop }
							onChange={ ( value ) =>
								setAttributes( { vMarginDesktop: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hMarginDesktop }
							onChange={ ( value ) =>
								setAttributes( { hMarginDesktop: value } )
							}
							min={ 0 }
							max={ 100 }
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
								isPrimary={ marginTypeTablet === 'px' }
								aria-pressed={ marginTypeTablet === 'px' }
								onClick={ () =>
									setAttributes( {
										marginTypeTablet: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ marginTypeTablet === '%' }
								aria-pressed={ marginTypeTablet === '%' }
								onClick={ () =>
									setAttributes( {
										marginTypeTablet: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'List Margin' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vMarginTablet }
							onChange={ ( value ) =>
								setAttributes( { vMarginTablet: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hMarginTablet }
							onChange={ ( value ) =>
								setAttributes( { hMarginTablet: value } )
							}
							min={ 0 }
							max={ 100 }
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
								isPrimary={ marginTypeMobile === 'px' }
								aria-pressed={ marginTypeMobile === 'px' }
								onClick={ () =>
									setAttributes( {
										marginTypeMobile: 'px',
									} )
								}
							>
								{ 'px' }
							</Button>
							<Button
								key={ '%' }
								className="uagb-size-btn"
								isSmall
								isPrimary={ marginTypeMobile === '%' }
								aria-pressed={ marginTypeMobile === '%' }
								onClick={ () =>
									setAttributes( {
										marginTypeMobile: '%',
									} )
								}
							>
								{ '%' }
							</Button>
						</ButtonGroup>
						<h2>{ __( 'List Margin' ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ 'uagb-margin-control' }
							value={ vMarginMobile }
							onChange={ ( value ) =>
								setAttributes( { vMarginMobile: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ 'uagb-margin-control' }
							value={ hMarginMobile }
							onChange={ ( value ) =>
								setAttributes( { hMarginMobile: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
						/>
					</>
				) }

				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Border', 'ultimate-addons-for-gutenberg' ) }</h2>
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
					controls={ [ 'left', 'center', 'right' ] }
				/>
			</BlockControls>
			<InspectorControls>
				{ getGeneralPanelBody() }
				{ getScrollPanelBody() }
				{ getContentPanelBody() }
				{ getStylePanelBody() }
			</InspectorControls>
			{ loadGFonts }
			{ headingloadGFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
