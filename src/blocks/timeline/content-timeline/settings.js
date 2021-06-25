/**
 * BLOCK: Content Timeline.
 */

import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import renderSVG from '@Controls/renderIcon';
import React from 'react';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';

import { __ } from '@wordpress/i18n';

import { dateI18n } from '@wordpress/date';
import {
	BlockControls,
	ColorPalette,
	InspectorControls,
	BlockAlignmentToolbar,
	PanelColorSettings,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TabPanel,
} from '@wordpress/components';

import { select } from '@wordpress/data';

const Settings = ( props ) => {
	props = props.parentProps;

	// Setup the attributes.
	const {
		setAttributes,
		attributes: {
			headSpace,
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
			separatorwidth,
			borderwidth,
			connectorBgsize,
			dateBottomspace,
			align,
			icon,
			iconColor,
			dateColor,
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
			iconSize,
			borderRadius,
			bgPadding,
			iconFocus,
			iconBgFocus,
			displayPostDate,
			stack,
			dateFormat,
		},
	} = props;

	const getconnectorBgsize = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.connectorBgsize = value;
		} );
		setAttributes( { connectorBgsize: value } );
	};

	const getborderwidth = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.borderwidth = value;
		} );
		setAttributes( { borderwidth: value } );
	};

	const geticonSize = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.iconSize = value;
		} );
		setAttributes( { iconSize: value } );
	};

	const getseparatorwidth = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.separatorwidth = value;
		} );
		setAttributes( { separatorwidth: value } );
	};

	const getdateFormat = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.dateFormat = value;
		} );
		setAttributes( { dateFormat: value } );
	};

	const getTimelineicon = ( value ) => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.icon = value;
		} );
		setAttributes( { icon: value } );
	};

	const toggleDisplayPostDate = () => {
		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		getChildBlocks.forEach( ( UAGBcontentTimelineChild ) => {
			UAGBcontentTimelineChild.attributes.displayPostDate = displayPostDate;
		} );
		setAttributes( { displayPostDate: ! displayPostDate } );
	};

	const today = new Date();

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
	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
			>
				<h2>{ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }</h2>
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
						'Note: Choose on what breakpoint the Content Timeline will stack. It will be visible on front end only.',
						'ultimate-addons-for-gutenberg'
					) }
					onChange={ ( value ) => setAttributes( { stack: value } ) }
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Date' ) }</h2>
				<ToggleControl
					label={ __(
						'Display Date',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ displayPostDate }
					onChange={ toggleDisplayPostDate }
				/>
				{ displayPostDate && (
					<SelectControl
						label={ __(
							'Date Format',
							'ultimate-addons-for-gutenberg'
						) }
						value={ dateFormat }
						onChange={ getdateFormat }
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
							{
								value: 'custom',
								label: __(
									'Normal Text',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
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
						allowReset
					/>
				) }
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Heading', 'ultimate-addons-for-gutenberg' ) }</h2>
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

				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Content', 'ultimate-addons-for-gutenberg' ) }</h2>
				<TypographyControl
					label={ __(
						'Content Tag',
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
				{ displayPostDate && (
					<>
						<hr className="uagb-editor__separator" />
						<h2>
							{ __(
								'Date Typography',
								'ultimate-addons-for-gutenberg'
							) }
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
						<hr className="uagb-editor__separator" />
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
						'Horizontal Space',
						'ultimate-addons-for-gutenberg'
					) }
					value={ horizontalSpace }
					onChange={ ( value ) =>
						setAttributes( { horizontalSpace: value } )
					}
					min={ 1 }
					max={ 50 }
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
					min={ 1 }
					max={ 100 }
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
				<FontIconPicker
					icons={ wp.UAGBSvgIcons }
					value={ icon }
					onChange={ getTimelineicon }
					isMulti={ false }
					renderFunc={ renderSVG }
					noSelectedPlaceholder={ __(
						'Select Icon',
						'ultimate-addons-for-gutenberg'
					) }
				/>
				<RangeControl
					label={ __( 'Icon Size', 'ultimate-addons-for-gutenberg' ) }
					value={ iconSize }
					onChange={ geticonSize }
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
					onChange={ getconnectorBgsize }
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
					onChange={ getborderwidth }
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
					onChange={ getseparatorwidth }
					min={ 1 }
					max={ 10 }
					allowReset
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
				<SelectControl
					label={ __(
						'Typography',
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
				<RangeControl
					label={ __( 'Padding', 'ultimate-addons-for-gutenberg' ) }
					value={ bgPadding }
					onChange={ ( value ) =>
						setAttributes( { bgPadding: value } )
					}
					min={ 1 }
					initialPosition={ 10 }
					max={ 50 }
					allowReset
				/>
			</PanelBody>
		);
	};
	const colorSettings = () => {
		return (
			<PanelColorSettings
				title={ __( 'Colors', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: headingColor,
						onChange: ( colorValue ) =>
							setAttributes( { headingColor: colorValue } ),
						label: __(
							'Heading Color',
							'ultimate-addons-for-gutenberg'
						),
					},
					{
						value: subHeadingColor,
						onChange: ( colorValue ) =>
							setAttributes( { subHeadingColor: colorValue } ),
						label: __(
							'Content Color',
							'ultimate-addons-for-gutenberg'
						),
					},
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
			></PanelColorSettings>
		);
	};
	const connectorColorSettings = () => {
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

	let loadHeadGoogleFonts;
	let loadSubHeadGoogleFonts;
	let loadDateGoogleFonts;

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
	return (
		<>
			{ blockControls() }
			<InspectorControls>
				{ generalSettings() }
				{ spacingSettings() }
				{ connectorSettings() }
				{ connectorColorSettings() }
				{ timelineItemSettings() }
				{ colorSettings() }
			</InspectorControls>
			{ loadHeadGoogleFonts }
			{ loadSubHeadGoogleFonts }
			{ loadDateGoogleFonts }
		</>
	);
};

export default React.memo( Settings );
