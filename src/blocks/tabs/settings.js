import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import renderSVG from '@Controls/renderIcon';
import UAGB_Block_Icons from '@Controls/block-icons';
import TypographyControl from '@Components/typography';
import ColumnResponsive from '@Components/typography/column-responsive';
import React from 'react';
import { __ } from '@wordpress/i18n';

import {
	BlockAlignmentToolbar,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { attributes, setAttributes, deviceType } = props;

	const {
		tabsStyleD,
		tabsStyleM,
		tabsStyleT,
		tabActiveFrontend,
		tabHeaders,
		headerBgColor,
		borderWidth,
		borderColor,
		headerTextColor,
		activeTabBgColor,
		activeTabTextColor,
		bodyBgColor,
		bodyTextColor,
		tabTitleLeftMargin,
		tabTitleRightMargin,
		tabTitleTopMargin,
		tabTitleBottomMargin,
		tabBodyLeftMargin,
		tabBodyRightMargin,
		tabBodyTopMargin,
		tabBodyBottomMargin,
		tabBodyVertPadding,
		tabBodyHrPadding,
		tabTitleVertPadding,
		tabTitleHrPadding,
		titleLoadGoogleFonts,
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleFontSizeType,
		titleFontSize,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleLineHeightType,
		titleLineHeight,
		titleLineHeightMobile,
		titleLineHeightTablet,
		titleAlign,
		tabAlign,
		showIcon,
		icon,
		iconColor,
		iconPosition,
		iconSpacing,
		iconSize,
		activeiconColor,
	} = attributes;

	const tabStyleSettings = () => {
		return (
			<PanelBody
				title={ __( 'Tabs Style', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<ColumnResponsive />

				{ 'Desktop' === deviceType && (
					<>
						<SelectControl
							label={ __(
								'Desktop Style',
								'ultimate-addons-for-gutenberg'
							) }
							value={ tabsStyleD }
							onChange={ ( value ) =>
								setAttributes( { tabsStyleD: value } )
							}
							beforeIcon="editor-textcolor"
							options={ [
								{
									value: 'hstyle1',
									label: __(
										'Horizontal Style 1',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle2',
									label: __(
										'Horizontal Style 2',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle3',
									label: __(
										'Horizontal Style 3',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle4',
									label: __(
										'Horizontal Style 4',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle5',
									label: __(
										'Horizontal Style 5',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle6',
									label: __(
										'Vertical Style 6',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle7',
									label: __(
										'Vertical Style 7',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle8',
									label: __(
										'Vertical Style 8',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle9',
									label: __(
										'Vertical Style 9',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle10',
									label: __(
										'Vertical Style 10',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
					</>
				) }
				{ 'Tablet' === deviceType && (
					<>
						<SelectControl
							label={ __(
								'Tablet Style',
								'ultimate-addons-for-gutenberg'
							) }
							value={ tabsStyleT }
							onChange={ ( value ) =>
								setAttributes( { tabsStyleT: value } )
							}
							beforeIcon="editor-textcolor"
							options={ [
								{
									value: 'hstyle1',
									label: __(
										'Horizontal Style 1',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle2',
									label: __(
										'Horizontal Style 2',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle3',
									label: __(
										'Horizontal Style 3',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle4',
									label: __(
										'Horizontal Style 4',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle5',
									label: __(
										'Horizontal Style 5',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle6',
									label: __(
										'Vertical Style 6',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle7',
									label: __(
										'Vertical Style 7',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle8',
									label: __(
										'Vertical Style 8',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle9',
									label: __(
										'Vertical Style 9',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle10',
									label: __(
										'Vertical Style 10',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
					</>
				) }
				{ 'Mobile' === deviceType && (
					<>
						<SelectControl
							label={ __(
								'Mobile Style',
								'ultimate-addons-for-gutenberg'
							) }
							value={ tabsStyleM }
							onChange={ ( value ) =>
								setAttributes( { tabsStyleM: value } )
							}
							beforeIcon="editor-textcolor"
							options={ [
								{
									value: 'hstyle1',
									label: __(
										'Horizontal Style 1',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle2',
									label: __(
										'Horizontal Style 2',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle3',
									label: __(
										'Horizontal Style 3',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle4',
									label: __(
										'Horizontal Style 4',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'hstyle5',
									label: __(
										'Horizontal Style 5',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle6',
									label: __(
										'Vertical Style 6',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle7',
									label: __(
										'Vertical Style 7',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle8',
									label: __(
										'Vertical Style 8',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle9',
									label: __(
										'Vertical Style 9',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'vstyle10',
									label: __(
										'Vertical Style 10',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'stack1',
									label: __(
										'Stack Style 11',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'stack2',
									label: __(
										'Stack Style 12',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'stack3',
									label: __(
										'Stack Style 13',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'stack4',
									label: __(
										'Stack Style 14',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
					</>
				) }
			</PanelBody>
		);
	};
	const tabTitleSettings = () => {
		return (
			<PanelBody
				title={ __(
					'Tabs Title Settings',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __(
						'Initial Open Tab',
						'ultimate-addons-for-gutenberg'
					) }
					value={ tabActiveFrontend }
					options={ tabHeaders.map( ( tab, index ) => {
						return { value: index, label: tab };
					} ) }
					onChange={ ( value ) =>
						setAttributes( {
							tabActiveFrontend: parseInt( value ),
						} )
					}
				/>
				<h2>
					{ __( 'Tab Alignment', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<BlockAlignmentToolbar
					value={ tabAlign }
					onChange={ ( value ) =>
						setAttributes( {
							tabAlign: value,
						} )
					}
					controls={ [ 'left', 'center', 'right' ] }
					isCollapsed={ false }
				/>
				<h2>
					{ __(
						'Tab Text Alignment',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<BlockAlignmentToolbar
					value={ titleAlign }
					onChange={ ( value ) =>
						setAttributes( {
							titleAlign: value,
						} )
					}
					controls={ [ 'left', 'center', 'right' ] }
					isCollapsed={ false }
				/>
				<ToggleControl
					label={ __(
						'Enable Icon',
						'ultimate-addons-for-gutenberg'
					) }
					checked={ showIcon }
					onChange={ () => setAttributes( { showIcon: ! showIcon } ) }
				/>
				{ showIcon && (
					<>
						<h2 className="components-base-control__label">
							{ __( 'Icon', 'ultimate-addons-for-gutenberg' ) }
						</h2>
						<FontIconPicker
							icons={ wp.UAGBSvgIcons }
							renderFunc={ renderSVG }
							theme="default"
							value={ icon }
							onChange={ ( value ) =>
								setAttributes( { icon: value } )
							}
							isMulti={ false }
							noSelectedPlaceholder={ __(
								'Select Icon',
								'ultimate-addons-for-gutenberg'
							) }
						/>
						<SelectControl
							label={ __(
								'Icon Position',
								'ultimate-addons-for-gutenberg'
							) }
							value={ iconPosition }
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
									value: 'top',
									label: __(
										'Top',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'bottom',
									label: __(
										'Bottom',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { iconPosition: value } )
							}
						/>
						<h2>
							{ __(
								'Icon Spacing',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<RangeControl
							className={ 'uagb-tabs__icon' }
							value={ iconSpacing }
							onChange={ ( value ) =>
								setAttributes( { iconSpacing: value } )
							}
							min={ 0 }
							max={ 500 }
							allowReset
						/>
						<h2>
							{ __(
								'Icon Color',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<ColorPalette
							value={ iconColor }
							onChange={ ( value ) =>
								setAttributes( { iconColor: value } )
							}
							allowReset
						/>
						<h2>
							{ __(
								'Active Icon Color',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<ColorPalette
							value={ activeiconColor }
							onChange={ ( value ) =>
								setAttributes( { activeiconColor: value } )
							}
							allowReset
						/>
						<h2>
							{ __(
								'Icon Size',
								'ultimate-addons-for-gutenberg'
							) }
						</h2>
						<RangeControl
							className={ 'uagb-tabs__icon' }
							value={ iconSize }
							onChange={ ( value ) =>
								setAttributes( { iconSize: value } )
							}
							min={ 0 }
							max={ 500 }
							allowReset
						/>
					</>
				) }
				<h2>
					{ __(
						'Tab Title Margin (px)',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.left_margin }
					className={ 'uagb-margin-control' }
					value={ tabTitleLeftMargin }
					onChange={ ( value ) =>
						setAttributes( { tabTitleLeftMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.right_margin }
					className={ 'uagb-margin-control' }
					value={ tabTitleRightMargin }
					onChange={ ( value ) =>
						setAttributes( { tabTitleRightMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.top_margin }
					value={ tabTitleTopMargin }
					onChange={ ( value ) =>
						setAttributes( { tabTitleTopMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.bottom_margin }
					className={ 'uagb-margin-control' }
					value={ tabTitleBottomMargin }
					onChange={ ( value ) =>
						setAttributes( { tabTitleBottomMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<h2>
					{ __( 'Title Padding', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					value={ tabTitleVertPadding }
					onChange={ ( value ) =>
						setAttributes( { tabTitleVertPadding: value } )
					}
					min={ 0 }
					max={ 500 }
					className={ 'uagb-margin-control' }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					value={ tabTitleHrPadding }
					onChange={ ( value ) =>
						setAttributes( { tabTitleHrPadding: value } )
					}
					min={ 0 }
					max={ 500 }
					className={ 'uagb-margin-control' }
					allowReset
				/>
				<h2>
					{ __(
						'Title Background Color',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<ColorPalette
					value={ headerBgColor }
					onChange={ ( value ) =>
						setAttributes( { headerBgColor: value } )
					}
					allowReset
				/>
				<h2>
					{ __(
						'Title Text Color',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<ColorPalette
					value={ headerTextColor }
					onChange={ ( value ) =>
						setAttributes( { headerTextColor: value } )
					}
					allowReset
				/>
				<h2>
					{ __(
						'Active Tab Background Color',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<ColorPalette
					value={ activeTabBgColor }
					onChange={ ( value ) =>
						setAttributes( { activeTabBgColor: value } )
					}
					allowReset
				/>
				<h2>
					{ __(
						'Active Tab Text Color',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<ColorPalette
					value={ activeTabTextColor }
					onChange={ ( value ) =>
						setAttributes( { activeTabTextColor: value } )
					}
					allowReset
				/>
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
				</>
			</PanelBody>
		);
	};
	const tabBorderSettings = () => {
		return (
			<PanelBody
				title={ __(
					'Border Settings',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ false }
			>
				<p className="uagb-setting-label">
					{ __( 'Border Color', 'ultimate-addons-for-gutenberg' ) }
				</p>
				<ColorPalette
					value={ borderColor }
					onChange={ ( value ) =>
						setAttributes( { borderColor: value } )
					}
					allowReset
				/>
				<RangeControl
					label={ __(
						'Border width',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderWidth }
					min={ 1 }
					max={ 500 }
					onChange={ ( value ) =>
						setAttributes( { borderWidth: value } )
					}
				/>
			</PanelBody>
		);
	};
	const tabBodySettings = () => {
		return (
			<PanelBody
				title={ __(
					'Tabs Body Settings',
					'ultimate-addons-for-gutenberg'
				) }
				initialOpen={ false }
			>
				<h2>
					{ __(
						'Body Background Color',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<ColorPalette
					value={ bodyBgColor }
					onChange={ ( value ) =>
						setAttributes( { bodyBgColor: value } )
					}
					allowReset
				/>
				<h2>
					{ __( 'Body Text Color', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<ColorPalette
					value={ bodyTextColor }
					onChange={ ( value ) =>
						setAttributes( { bodyTextColor: value } )
					}
					allowReset
				/>
				<h2>
					{ __(
						'Tab Body Margin (px)',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.left_margin }
					className={ 'uagb-margin-control' }
					value={ tabBodyLeftMargin }
					onChange={ ( value ) =>
						setAttributes( { tabBodyLeftMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.right_margin }
					className={ 'uagb-margin-control' }
					value={ tabBodyRightMargin }
					onChange={ ( value ) =>
						setAttributes( { tabBodyRightMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.top_margin }
					className={ 'uagb-margin-control' }
					value={ tabBodyTopMargin }
					onChange={ ( value ) =>
						setAttributes( { tabBodyTopMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.bottom_margin }
					className={ 'uagb-margin-control' }
					value={ tabBodyBottomMargin }
					onChange={ ( value ) =>
						setAttributes( { tabBodyBottomMargin: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
				<h2>
					{ __( 'Body Padding', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					value={ tabBodyVertPadding }
					onChange={ ( value ) =>
						setAttributes( {
							tabBodyVertPadding: value,
						} )
					}
					min={ 0 }
					max={ 500 }
					className={ 'uagb-margin-control' }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					value={ tabBodyHrPadding }
					onChange={ ( value ) =>
						setAttributes( { tabBodyHrPadding: value } )
					}
					min={ 0 }
					max={ 500 }
					className={ 'uagb-margin-control' }
					allowReset
				/>
			</PanelBody>
		);
	};

	return (
		<InspectorControls>
			{ tabStyleSettings() }
			{ tabTitleSettings() }
			{ tabBodySettings() }
			{ tabBorderSettings() }
		</InspectorControls>
	);
};
export default React.memo( Settings );
