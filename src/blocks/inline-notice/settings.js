import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import React from 'react';
import UAGB_Block_Icons from '@Controls/block-icons';
import renderSVG from '@Controls/renderIcon';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';
import { __ } from '@wordpress/i18n';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';

import { select } from '@wordpress/data';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { attributes, setAttributes } = props;
	const {
		icon,
		noticeDismiss,
		cookies,
		close_cookie_days,
		textColor,
		titleColor,
		noticeColor,
		contentBgColor,
		noticeDismissColor,
		noticeAlignment,
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleFontSizeType,
		titleLineHeightType,
		titleFontSize,
		titleFontSizeTablet,
		titleFontSizeMobile,
		titleLineHeight,
		titleLineHeightTablet,
		titleLineHeightMobile,
		descFontFamily,
		descFontWeight,
		descFontSubset,
		descFontSize,
		descFontSizeType,
		descFontSizeTablet,
		descFontSizeMobile,
		descLineHeight,
		descLineHeightType,
		descLineHeightTablet,
		descLineHeightMobile,
		titleLoadGoogleFonts,
		descLoadGoogleFonts,
		contentVrPadding,
		contentHrPadding,
		titleVrPadding,
		titleHrPadding,
		headingTag,
		layout,
		highlightWidth,
	} = attributes;
	let loadTitleGoogleFonts;
	let loadDescriptionGoogleFonts;

	if ( true === titleLoadGoogleFonts ) {
		const hconfig = {
			google: {
				families: [
					titleFontFamily +
						( titleFontWeight ? ':' + titleFontWeight : '' ),
				],
			},
		};

		loadTitleGoogleFonts = (
			<WebfontLoader config={ hconfig }></WebfontLoader>
		);
	}

	if ( true === descLoadGoogleFonts ) {
		const sconfig = {
			google: {
				families: [
					descFontFamily +
						( descFontWeight ? ':' + descFontWeight : '' ),
				],
			},
		};

		loadDescriptionGoogleFonts = (
			<WebfontLoader config={ sconfig }></WebfontLoader>
		);
	}

	const updateCookieId = ( value ) => {
		const { getCurrentPostId } = select( 'core/editor' );
		const post_id = getCurrentPostId().toString();
		const timestamp = new Date().getTime();

		setAttributes( { c_id: post_id + '-' + timestamp } );
		setAttributes( { cookies: value } );
	};

	const blockControls = () => {
		return (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ noticeAlignment }
					onChange={ ( value ) =>
						setAttributes( { noticeAlignment: value } )
					}
				/>
			</BlockControls>
		);
	};

	// Notice dismiss options
	const noticeDismissOptions = [
		{
			value: '',
			label: __( 'Allow Always', 'ultimate-addons-for-gutenberg' ),
		},
		{
			value: 'uagb-dismissable',
			label: __( 'Allow to Dismiss', 'ultimate-addons-for-gutenberg' ),
		},
	];

	const inlineGeneralSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
					value={ layout }
					onChange={ ( value ) => setAttributes( { layout: value } ) }
					options={ [
						{
							value: 'modern',
							label: __(
								'Modern',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'simple',
							label: __(
								'Default',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
				/>
				{ 'simple' === layout && (
					<RangeControl
						label={ __(
							'Highlight width',
							'ultimate-addons-for-gutenberg'
						) }
						value={ highlightWidth }
						onChange={ ( value ) =>
							setAttributes( { highlightWidth: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				) }
				<h2>
					{ __( 'Primary Heading', 'ultimate-addons-for-gutenberg' ) }
				</h2>
				<SelectControl
					label={ __( 'Tag' ) }
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
				<SelectControl
					label={ __(
						'Notice Display',
						'ultimate-addons-for-gutenberg'
					) }
					options={ noticeDismissOptions }
					value={ noticeDismiss }
					onChange={ ( value ) =>
						setAttributes( {
							noticeDismiss: value,
						} )
					}
				/>
				{ noticeDismiss && (
					<>
						<p className="components-base-control__label">
							{ __( 'Icon', 'ultimate-addons-for-gutenberg' ) }
						</p>
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
					</>
				) }
				{ noticeDismiss && <hr className="uagb-editor__separator" /> }
				{ noticeDismiss && (
					<ToggleControl
						label={ __(
							'Enable Cookies',
							'ultimate-addons-for-gutenberg'
						) }
						checked={ cookies }
						onChange={ updateCookieId }
					/>
				) }
				{ cookies && (
					<RangeControl
						label={ __(
							'Show Closed Notice After (Days)',
							'ultimate-addons-for-gutenberg'
						) }
						value={ close_cookie_days }
						onChange={ ( value ) =>
							setAttributes( { close_cookie_days: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				) }
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Colors', 'ultimate-addons-for-gutenberg' ) }</h2>
				<p className="uagb-setting-label">
					{ __( 'Title Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: titleColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ titleColor }
					onChange={ ( value ) =>
						setAttributes( { titleColor: value } )
					}
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<p className="uagb-setting-label">
					{ __( 'Highlight Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: noticeColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ noticeColor }
					onChange={ ( value ) =>
						setAttributes( { noticeColor: value } )
					}
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<p className="uagb-setting-label">
					{ __( 'Content Color', 'ultimate-addons-for-gutenberg' ) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: textColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ textColor }
					onChange={ ( value ) =>
						setAttributes( { textColor: value } )
					}
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<p className="uagb-setting-label">
					{ __(
						'Content Background Color',
						'ultimate-addons-for-gutenberg'
					) }
					<span className="components-base-control__label">
						<span
							className="component-color-indicator"
							style={ { backgroundColor: contentBgColor } }
						></span>
					</span>
				</p>
				<ColorPalette
					value={ contentBgColor }
					onChange={ ( value ) =>
						setAttributes( { contentBgColor: value } )
					}
					allowReset
				/>
				{ noticeDismiss && <hr className="uagb-editor__separator" /> }
				{ noticeDismiss && (
					<p className="uagb-setting-label">
						{ __(
							'Dismiss Icon Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: noticeDismissColor,
								} }
							></span>
						</span>
					</p>
				) }
				{ noticeDismiss && (
					<ColorPalette
						value={ noticeDismissColor }
						onChange={ ( value ) =>
							setAttributes( { noticeDismissColor: value } )
						}
						allowReset
					/>
				) }
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Typography', 'ultimate-addons-for-gutenberg' ) }</h2>
				<TypographyControl
					label={ __( 'Title', 'ultimate-addons-for-gutenberg' ) }
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
				<TypographyControl
					label={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
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
				<h2>
					{ __(
						'Title Padding (px)',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
				<RangeControl
					label={ UAGB_Block_Icons.vertical_spacing }
					className={ 'uagb-margin-control' }
					value={ titleVrPadding }
					onChange={ ( value ) =>
						setAttributes( { titleVrPadding: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ UAGB_Block_Icons.horizontal_spacing }
					className={ 'uagb-margin-control' }
					value={ titleHrPadding }
					onChange={ ( value ) =>
						setAttributes( { titleHrPadding: value } )
					}
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>
					{ __(
						'Content Padding (px)',
						'ultimate-addons-for-gutenberg'
					) }
				</h2>
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
			</PanelBody>
		);
	};

	return (
		<>
			{ blockControls() }
			<InspectorControls>{ inlineGeneralSettings() }</InspectorControls>
			{ loadTitleGoogleFonts }
			{ loadDescriptionGoogleFonts }
		</>
	);
};

export default React.memo( Settings );
