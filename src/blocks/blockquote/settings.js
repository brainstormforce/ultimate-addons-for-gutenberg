import classnames from 'classnames';
import UAGB_Block_Icons from '@Controls/block-icons';
import React from 'react';
import WebfontLoader from '@Components/typography/fontloader';
import TypographyControl from '@Components/typography';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	BaseControl,
	ToggleControl,
	Toolbar,
	Tooltip,
	TabPanel,
	ButtonGroup,
	Dashicon,
} from '@wordpress/components';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
	MediaUpload,
} from '@wordpress/block-editor';

const Settings = ( props ) => {
	props = props.parentProps;

	const { className, setAttributes, attributes } = props;

	const sizeTypes = [
		{ key: 'px', name: __( 'px', 'ultimate-addons-for-gutenberg' ) },
		{ key: 'em', name: __( 'em', 'ultimate-addons-for-gutenberg' ) },
	];

	const {
		skinStyle,
		align,
		authorColor,
		descColor,
		descFontSize,
		descFontSizeType,
		descFontSizeTablet,
		descFontSizeMobile,
		descFontFamily,
		descFontWeight,
		descFontSubset,
		descLineHeightType,
		descLineHeight,
		descLineHeightTablet,
		descLineHeightMobile,
		descLoadGoogleFonts,
		authorFontSize,
		authorFontSizeType,
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
		descSpace,
		authorSpace,
		stack,
		borderColor,
		borderStyle,
		borderWidth,
		borderGap,
		verticalPadding,
		quoteColor,
		quoteBgColor,
		quoteSize,
		quoteSizeType,
		quoteSizeTablet,
		quoteSizeMobile,
		quotePadding,
		quotePaddingType,
		quotePaddingTablet,
		quotePaddingMobile,
		quoteBorderRadius,
		quoteStyle,
		enableTweet,
		tweetLinkColor,
		tweetBtnColor,
		tweetBtnHoverColor,
		tweetBtnBgColor,
		tweetBtnBgHoverColor,
		tweetBtnFontSize,
		tweetBtnFontSizeType,
		tweetBtnFontSizeTablet,
		tweetBtnFontSizeMobile,
		tweetBtnFontFamily,
		tweetBtnFontWeight,
		tweetBtnFontSubset,
		tweetBtnLineHeightType,
		tweetBtnLineHeight,
		tweetBtnLineHeightTablet,
		tweetBtnLineHeightMobile,
		tweetBtnLoadGoogleFonts,
		tweetBtnHrPadding,
		tweetBtnVrPadding,
		tweetIconSpacing,
		iconView,
		iconSkin,
		iconLabel,
		iconShareVia,
		iconTargetUrl,
		customUrl,
		authorImage,
		authorImageWidth,
		authorImageSize,
		authorImgBorderRadius,
		authorImgPosition,
		quoteTopMargin,
		quoteBottomMargin,
		quoteLeftMargin,
		quoteRightMargin,
		quoteHoverColor,
		quoteBgHoverColor,
		borderHoverColor,
	} = attributes;

	let loadDescGoogleFonts;
	let loadAuthorGoogleFonts;
	let loadTweetGoogleFonts;

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

	if ( tweetBtnLoadGoogleFonts == true ) {
		const tweetBtnconfig = {
			google: {
				families: [
					tweetBtnFontFamily +
						( tweetBtnFontWeight ? ':' + tweetBtnFontWeight : '' ),
				],
			},
		};

		loadTweetGoogleFonts = (
			<WebfontLoader config={ tweetBtnconfig }></WebfontLoader>
		);
	}

	/*
	 * Event to set Image as null while removing.
	 */
	const onRemoveImage = () => {
		setAttributes( { authorImage: null } );
	};

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { authorImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { authorImage: media } );
	};

	// Image controls.
	const imageControls = (
		<>
			<hr className="uagb-editor__separator" />
			<BaseControl
				id="blockquote-image-controls"
				className="editor-bg-image-control"
				label={ __( 'Author Image', 'ultimate-addons-for-gutenberg' ) }
			>
				<MediaUpload
					title={ __(
						'Select Image',
						'ultimate-addons-for-gutenberg'
					) }
					onSelect={ onSelectImage }
					allowedTypes={ [ 'image' ] }
					value={ authorImage }
					render={ ( { open } ) => (
						<Button isSecondary onClick={ open }>
							{ imageName }
						</Button>
					) }
				/>
				{ authorImage &&
					authorImage.url !== 'null' &&
					authorImage.url !== '' && (
						<Button
							className="uagb-rm-btn"
							onClick={ onRemoveImage }
							isLink
							isDestructive
						>
							{ __(
								'Remove Image',
								'ultimate-addons-for-gutenberg'
							) }
						</Button>
					) }
			</BaseControl>
			{ authorImage &&
				authorImage.url !== 'null' &&
				authorImage.url !== '' && (
					<>
						<SelectControl
							label={ __(
								'Author Image Position',
								'ultimate-addons-for-gutenberg'
							) }
							value={ authorImgPosition }
							onChange={ ( value ) =>
								setAttributes( { authorImgPosition: value } )
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
									value: 'top',
									label: __(
										'Top',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
						/>
						<SelectControl
							label={ __(
								'Author Image Size',
								'ultimate-addons-for-gutenberg'
							) }
							options={ imageSizeOptions }
							value={ authorImageSize }
							onChange={ ( value ) =>
								setAttributes( { authorImageSize: value } )
							}
						/>
						<RangeControl
							label={ __(
								'Author Image Width',
								'ultimate-addons-for-gutenberg'
							) }
							value={ authorImageWidth }
							onChange={ ( value ) =>
								setAttributes( { authorImageWidth: value } )
							}
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
						/>
						<RangeControl
							label={ __(
								'Author Image Rounded Corners',
								'ultimate-addons-for-gutenberg'
							) }
							value={ authorImgBorderRadius }
							onChange={ ( value ) =>
								setAttributes( {
									authorImgBorderRadius: value,
								} )
							}
							min={ 0 }
							max={ 100 }
							beforeIcon=""
							allowReset
						/>
					</>
				) }
		</>
	);

	const borderSettings = (
		<>
			<h2>
				{ __(
					'Modern Layout - Styling',
					'ultimate-addons-for-gutenberg'
				) }
			</h2>
			<SelectControl
				label={ __(
					'Quote Border Style',
					'ultimate-addons-for-gutenberg'
				) }
				value={ borderStyle }
				onChange={ ( value ) =>
					setAttributes( { borderStyle: value } )
				}
				options={ [
					{
						value: 'none',
						label: __( 'None', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'solid',
						label: __( 'Solid', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'dotted',
						label: __( 'Dotted', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'dashed',
						label: __( 'Dashed', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'double',
						label: __( 'Double', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'groove',
						label: __( 'Groove', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'inset',
						label: __( 'Inset', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'outset',
						label: __( 'Outset', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'ridge',
						label: __( 'Ridge', 'ultimate-addons-for-gutenberg' ),
					},
				] }
			/>
			{ 'none' != borderStyle && (
				<RangeControl
					label={ __(
						'Thickness (px)',
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
		</>
	);

	const quoteSettings = (
		<>
			<h2>
				{ __(
					'Quotation Layout - Styling',
					'ultimate-addons-for-gutenberg'
				) }
			</h2>
			<TabPanel
				className="uagb-size-type-field-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'desktop',
						title: <Dashicon icon="desktop" />,
						className: 'uagb-desktop-tab uagb-responsive-tabs',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'uagb-tablet-tab uagb-responsive-tabs',
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'uagb-mobile-tab uagb-responsive-tabs',
					},
				] }
			>
				{ ( tab ) => {
					let tabout;

					if ( 'mobile' === tab.name ) {
						tabout = (
							<>
								{ quoteSizeTypeControls }
								<RangeControl
									label={ __(
										'Quote Icon Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ quoteSizeMobile }
									onChange={ ( value ) =>
										setAttributes( {
											quoteSizeMobile: value,
										} )
									}
									min={ 0 }
									max={ 500 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 30 }
								/>
							</>
						);
					} else if ( 'tablet' === tab.name ) {
						tabout = (
							<>
								{ quoteSizeTypeControls }
								<RangeControl
									label={ __(
										'Quote Icon Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ quoteSizeTablet }
									onChange={ ( value ) =>
										setAttributes( {
											quoteSizeTablet: value,
										} )
									}
									min={ 0 }
									max={ 500 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 30 }
								/>
							</>
						);
					} else {
						tabout = (
							<>
								{ quoteSizeTypeControls }
								<RangeControl
									label={ __(
										'Quote Icon Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ quoteSize }
									onChange={ ( value ) =>
										setAttributes( { quoteSize: value } )
									}
									min={ 0 }
									max={ 500 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 30 }
								/>
							</>
						);
					}

					return <div>{ tabout }</div>;
				} }
			</TabPanel>
			<TabPanel
				className="uagb-size-type-field-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'desktop',
						title: <Dashicon icon="desktop" />,
						className: 'uagb-desktop-tab uagb-responsive-tabs',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'uagb-tablet-tab uagb-responsive-tabs',
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'uagb-mobile-tab uagb-responsive-tabs',
					},
				] }
			>
				{ ( tab ) => {
					let tabout;

					if ( 'mobile' === tab.name ) {
						tabout = (
							<>
								{ quotePaddingControls }
								<RangeControl
									label={ __(
										'Background Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ quotePaddingMobile }
									onChange={ ( value ) =>
										setAttributes( {
											quotePaddingMobile: value,
										} )
									}
									min={ 0 }
									max={ 500 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 30 }
								/>
							</>
						);
					} else if ( 'tablet' === tab.name ) {
						tabout = (
							<>
								{ quotePaddingControls }
								<RangeControl
									label={ __(
										'Background Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ quotePaddingTablet }
									onChange={ ( value ) =>
										setAttributes( {
											quotePaddingTablet: value,
										} )
									}
									min={ 0 }
									max={ 500 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 30 }
								/>
							</>
						);
					} else {
						tabout = (
							<>
								{ quotePaddingControls }
								<RangeControl
									label={ __(
										'Background Size',
										'ultimate-addons-for-gutenberg'
									) }
									value={ quotePadding }
									onChange={ ( value ) =>
										setAttributes( { quotePadding: value } )
									}
									min={ 0 }
									max={ 500 }
									beforeIcon="editor-textcolor"
									allowReset
									initialPosition={ 30 }
								/>
							</>
						);
					}

					return <div>{ tabout }</div>;
				} }
			</TabPanel>
			{ quoteBgColor && (
				<RangeControl
					label={ __(
						'Quote Icon Border Radius (%)',
						'ultimate-addons-for-gutenberg'
					) }
					value={ quoteBorderRadius }
					onChange={ ( value ) =>
						setAttributes( { quoteBorderRadius: value } )
					}
					min={ 0 }
					max={ 100 }
					allowReset
				/>
			) }
		</>
	);

	const skinSettings = (
		<PanelBody title={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }>
			<SelectControl
				label={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
				options={ [
					{
						value: 'border',
						label: __( 'Modern', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'quotation',
						label: __(
							'Quotation',
							'ultimate-addons-for-gutenberg'
						),
					},
				] }
				value={ skinStyle }
				onChange={ ( value ) => setAttributes( { skinStyle: value } ) }
			/>
			<hr className="uagb-editor__separator" />
			{ skinStyle === 'border' && borderSettings }
			{ skinStyle === 'quotation' && quoteSettings }
			{ skinStyle === 'quotation' && (
				<>
					<hr className="uagb-editor__separator" />
					<h2>
						{ __(
							'Quote Icon Colors',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
				</>
			) }
			{ 'none' != borderStyle && (
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
							tabout = colorSettings;
						}
						return <div>{ tabout }</div>;
					} }
				</TabPanel>
			) }
			<hr className="uagb-editor__separator" />
			<SelectControl
				label={ __( 'Stack on', 'ultimate-addons-for-gutenberg' ) }
				value={ stack }
				options={ [
					{
						value: 'none',
						label: __( 'None', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'tablet',
						label: __( 'Tablet', 'ultimate-addons-for-gutenberg' ),
					},
					{
						value: 'mobile',
						label: __( 'Mobile', 'ultimate-addons-for-gutenberg' ),
					},
				] }
				help={ __(
					'Note: Choose on what breakpoint the elements will stack.',
					'ultimate-addons-for-gutenberg'
				) }
				onChange={ ( value ) => setAttributes( { stack: value } ) }
			/>
		</PanelBody>
	);

	const typography = (
		<PanelBody
			title={ __( 'Content', 'ultimate-addons-for-gutenberg' ) }
			initialOpen={ false }
		>
			<h2>{ __( 'Quote', 'ultimate-addons-for-gutenberg' ) }</h2>
			<TypographyControl
				label={ __( 'Typography', 'ultimate-addons-for-gutenberg' ) }
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
				fontSize={ { value: descFontSize, label: 'descFontSize' } }
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
			<p className="uagb-setting-label">
				{ __( 'Quote Color', 'ultimate-addons-for-gutenberg' ) }
				<span className="components-base-control__label">
					<span
						className="component-color-indicator"
						style={ { backgroundColor: descColor } }
					></span>
				</span>
			</p>
			<ColorPalette
				value={ descColor }
				onChange={ ( colorValue ) =>
					setAttributes( { descColor: colorValue } )
				}
				allowReset
			/>
			<hr className="uagb-editor__separator" />
			<h2>{ __( 'Author', 'ultimate-addons-for-gutenberg' ) }</h2>
			<TypographyControl
				label={ __( 'Typography', 'ultimate-addons-for-gutenberg' ) }
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
			<p className="uagb-setting-label">
				{ __( 'Author Color', 'ultimate-addons-for-gutenberg' ) }
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

			{ imageControls }
		</PanelBody>
	);

	const twitterSettings = (
		<PanelBody
			title={ __( 'Twitter Icon', 'ultimate-addons-for-gutenberg' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __(
					'Enable Twitter Icon',
					'ultimate-addons-for-gutenberg'
				) }
				checked={ enableTweet }
				onChange={ () =>
					setAttributes( { enableTweet: ! enableTweet } )
				}
			/>
			{ enableTweet && (
				<>
					<SelectControl
						label={ __(
							'Icon View',
							'ultimate-addons-for-gutenberg'
						) }
						value={ iconView }
						onChange={ ( value ) =>
							setAttributes( { iconView: value } )
						}
						options={ [
							{
								value: 'icon_text',
								label: __(
									'Icon & Text',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'icon',
								label: __(
									'Icon',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'text',
								label: __(
									'Text',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					<SelectControl
						label={ __(
							'Icon Style',
							'ultimate-addons-for-gutenberg'
						) }
						value={ iconSkin }
						onChange={ ( value ) =>
							setAttributes( { iconSkin: value } )
						}
						options={ [
							{
								value: 'classic',
								label: __(
									'Classic',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'bubble',
								label: __(
									'Bubble',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'link',
								label: __(
									'Link',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
				</>
			) }
			{ enableTweet && iconView !== 'icon' && (
				<>
					<hr className="uagb-editor__separator" />
					<TextControl
						label={ __( 'Label', 'ultimate-addons-for-gutenberg' ) }
						value={ iconLabel }
						onChange={ ( value ) =>
							setAttributes( { iconLabel: value } )
						}
					/>
				</>
			) }

			{ enableTweet && (
				<>
					<TypographyControl
						label={ __(
							'Typography',
							'ultimate-addons-for-gutenberg'
						) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: tweetBtnLoadGoogleFonts,
							label: 'tweetBtnLoadGoogleFonts',
						} }
						fontFamily={ {
							value: tweetBtnFontFamily,
							label: 'tweetBtnFontFamily',
						} }
						fontWeight={ {
							value: tweetBtnFontWeight,
							label: 'tweetBtnFontWeight',
						} }
						fontSubset={ {
							value: tweetBtnFontSubset,
							label: 'tweetBtnFontSubset',
						} }
						fontSizeType={ {
							value: tweetBtnFontSizeType,
							label: 'tweetBtnFontSizeType',
						} }
						fontSize={ {
							value: tweetBtnFontSize,
							label: 'tweetBtnFontSize',
						} }
						fontSizeMobile={ {
							value: tweetBtnFontSizeMobile,
							label: 'tweetBtnFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: tweetBtnFontSizeTablet,
							label: 'tweetBtnFontSizeTablet',
						} }
						lineHeightType={ {
							value: tweetBtnLineHeightType,
							label: 'tweetBtnLineHeightType',
						} }
						lineHeight={ {
							value: tweetBtnLineHeight,
							label: 'tweetBtnLineHeight',
						} }
						lineHeightMobile={ {
							value: tweetBtnLineHeightMobile,
							label: 'tweetBtnLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: tweetBtnLineHeightTablet,
							label: 'tweetBtnLineHeightTablet',
						} }
					/>
					<SelectControl
						label={ __(
							'Target URL',
							'ultimate-addons-for-gutenberg'
						) }
						value={ iconTargetUrl }
						onChange={ ( value ) =>
							setAttributes( { iconTargetUrl: value } )
						}
						options={ [
							{
								value: 'current',
								label: __(
									'Current Page',
									'ultimate-addons-for-gutenberg'
								),
							},
							{
								value: 'custom',
								label: __(
									'Custom URL',
									'ultimate-addons-for-gutenberg'
								),
							},
						] }
					/>
					{ iconTargetUrl == 'custom' && (
						<TextControl
							label={ __(
								'URL',
								'ultimate-addons-for-gutenberg'
							) }
							value={ customUrl }
							onChange={ ( value ) =>
								setAttributes( { customUrl: value } )
							}
						/>
					) }
				</>
			) }
			{ enableTweet && iconSkin !== 'link' && (
				<>
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
						value={ tweetBtnVrPadding }
						onChange={ ( value ) =>
							setAttributes( { tweetBtnVrPadding: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
						initialPosition={ 5 }
					/>
					<RangeControl
						label={ UAGB_Block_Icons.horizontal_spacing }
						className={ 'uagb-margin-control' }
						value={ tweetBtnHrPadding }
						onChange={ ( value ) =>
							setAttributes( { tweetBtnHrPadding: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
						initialPosition={ 5 }
					/>
				</>
			) }
			{ enableTweet && iconView == 'icon_text' && (
				<>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __(
							'Space between Tweet Icon and Text',
							'ultimate-addons-for-gutenberg'
						) }
						value={ tweetIconSpacing }
						onChange={ ( value ) =>
							setAttributes( { tweetIconSpacing: value } )
						}
						min={ 0 }
						max={ 20 }
						allowReset
						initialPosition={ 5 }
					/>
				</>
			) }
			{ enableTweet && (
				<>
					<hr className="uagb-editor__separator" />
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
							let tweet_tab_output;
							if ( 'hover' === tabName.name ) {
								tweet_tab_output = tweetHover;
							} else {
								tweet_tab_output = tweetNormal;
							}
							return <div>{ tweet_tab_output }</div>;
						} }
					</TabPanel>
				</>
			) }
		</PanelBody>
	);

	const spacingSettings = (
		<PanelBody
			title={ __( 'Spacing', 'ultimate-addons-for-gutenberg' ) }
			initialOpen={ false }
		>
			{ skinStyle === 'quotation' && (
				<>
					<h2>
						{ __(
							'Quote Icon Margin (px)',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<RangeControl
						label={ UAGB_Block_Icons.top_margin }
						className={ 'uagb-margin-control' }
						value={ quoteTopMargin }
						onChange={ ( value ) =>
							setAttributes( { quoteTopMargin: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.bottom_margin }
						className={ 'uagb-margin-control' }
						value={ quoteBottomMargin }
						onChange={ ( value ) =>
							setAttributes( { quoteBottomMargin: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.left_margin }
						className={ 'uagb-margin-control' }
						value={ quoteLeftMargin }
						onChange={ ( value ) =>
							setAttributes( { quoteLeftMargin: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<RangeControl
						label={ UAGB_Block_Icons.right_margin }
						className={ 'uagb-margin-control' }
						value={ quoteRightMargin }
						onChange={ ( value ) =>
							setAttributes( { quoteRightMargin: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
				</>
			) }
			{ skinStyle === 'border' && (
				<RangeControl
					label={ __(
						'Gap Between Border and Quote',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderGap }
					onChange={ ( value ) =>
						setAttributes( { borderGap: value } )
					}
					min={ 0 }
					max={ 500 }
					allowReset
				/>
			) }
			<RangeControl
				label={ __(
					'Quote Bottom Spacing',
					'ultimate-addons-for-gutenberg'
				) }
				value={ descSpace }
				onChange={ ( value ) => setAttributes( { descSpace: value } ) }
				min={ 0 }
				max={ 200 }
				allowReset
				initialPosition={ 0 }
			/>
			{ align == 'center' && skinStyle !== 'border' && (
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
					max={ 200 }
					allowReset
					initialPosition={ 0 }
				/>
			) }

			{ skinStyle === 'border' && (
				<>
					<hr className="uagb-editor__separator" />
					<h2>
						{ __(
							'Vertical Padding',
							'ultimate-addons-for-gutenberg'
						) }
					</h2>
					<RangeControl
						label={ UAGB_Block_Icons.vertical_spacing }
						className={ 'uagb-margin-control' }
						value={ verticalPadding }
						onChange={ ( value ) =>
							setAttributes( { verticalPadding: value } )
						}
						min={ 0 }
						max={ 500 }
						allowReset
					/>
				</>
			) }
		</PanelBody>
	);

	const imageSizeOptions = [
		{
			value: 'thumbnail',
			label: __( 'Thumbnail', 'ultimate-addons-for-gutenberg' ),
		},
		{
			value: 'medium',
			label: __( 'Medium', 'ultimate-addons-for-gutenberg' ),
		},
		{
			value: 'full',
			label: __( 'Large', 'ultimate-addons-for-gutenberg' ),
		},
	];

	let imageName = __( 'Select Image', 'ultimate-addons-for-gutenberg' );
	if ( authorImage ) {
		if ( authorImage.url == null || authorImage.url == '' ) {
			imageName = __( 'Select Image', 'ultimate-addons-for-gutenberg' );
		} else {
			imageName = __( 'Replace Image', 'ultimate-addons-for-gutenberg' );
		}
	}

	const colorSettings = (
		<>
			{ 'none' != borderStyle && skinStyle == 'border' && (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Border Color',
							'ultimate-addons-for-gutenberg'
						) }
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
			) }

			{ skinStyle == 'quotation' && (
				<>
					<p className="uagb-setting-label">
						{ __( 'Icon Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: quoteColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ quoteColor }
						onChange={ ( colorValue ) =>
							setAttributes( { quoteColor: colorValue } )
						}
						allowReset
					/>
					<p className="uagb-setting-label">
						{ __(
							'Icon Background Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: quoteBgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ quoteBgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { quoteBgColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
		</>
	);

	const hoverSettings = (
		<>
			{ skinStyle == 'border' && (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Border Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: borderHoverColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ borderHoverColor }
						onChange={ ( colorValue ) =>
							setAttributes( { borderHoverColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
			{ skinStyle == 'quotation' && (
				<>
					<p className="uagb-setting-label">
						{ __( 'Hover Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: quoteHoverColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ quoteHoverColor }
						onChange={ ( colorValue ) =>
							setAttributes( { quoteHoverColor: colorValue } )
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
								style={ { backgroundColor: quoteBgHoverColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ quoteBgHoverColor }
						onChange={ ( colorValue ) =>
							setAttributes( { quoteBgHoverColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
		</>
	);

	const tweetNormal = (
		<>
			{ iconSkin == 'link' && (
				<>
					<p className="uagb-setting-label">
						{ __( 'Tweet Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: tweetLinkColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ tweetLinkColor }
						onChange={ ( colorValue ) =>
							setAttributes( { tweetLinkColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
			{ iconSkin !== 'link' && (
				<>
					<p className="uagb-setting-label">
						{ __( 'Tweet Color', 'ultimate-addons-for-gutenberg' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: tweetBtnColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ tweetBtnColor }
						onChange={ ( colorValue ) =>
							setAttributes( { tweetBtnColor: colorValue } )
						}
						allowReset
					/>

					<p className="uagb-setting-label">
						{ __(
							'Tweet Background Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: tweetBtnBgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ tweetBtnBgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { tweetBtnBgColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
		</>
	);

	const tweetHover = (
		<>
			{ iconSkin == 'link' && (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Tweet Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: tweetBtnHoverColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ tweetBtnHoverColor }
						onChange={ ( colorValue ) =>
							setAttributes( { tweetBtnHoverColor: colorValue } )
						}
						allowReset
					/>
				</>
			) }
			{ iconSkin !== 'link' && (
				<>
					<p className="uagb-setting-label">
						{ __(
							'Tweet Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: tweetBtnHoverColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ tweetBtnHoverColor }
						onChange={ ( colorValue ) =>
							setAttributes( { tweetBtnHoverColor: colorValue } )
						}
						allowReset
					/>

					<p className="uagb-setting-label">
						{ __(
							'Tweet Background Hover Color',
							'ultimate-addons-for-gutenberg'
						) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: tweetBtnBgHoverColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ tweetBtnBgHoverColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								tweetBtnBgHoverColor: colorValue,
							} )
						}
						allowReset
					/>
				</>
			) }
		</>
	);

	const quoteSizeTypeControls = (
		<ButtonGroup
			className="uagb-size-type-field"
			aria-label={ __( 'Size Type', 'ultimate-addons-for-gutenberg' ) }
		>
			{ sizeTypes.map( ( { name, key } ) => (
				<Button
					key={ key }
					className="uagb-size-btn"
					isSmall
					isPrimary={ quoteSizeType === key }
					aria-pressed={ quoteSizeType === key }
					onClick={ () => setAttributes( { quoteSizeType: key } ) }
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	);

	const quotePaddingControls = (
		<ButtonGroup
			className="uagb-size-type-field"
			aria-label={ __( 'Size Type', 'ultimate-addons-for-gutenberg' ) }
		>
			{ sizeTypes.map( ( { name, key } ) => (
				<Button
					key={ key }
					className="uagb-size-btn"
					isSmall
					isPrimary={ quotePaddingType === key }
					aria-pressed={ quotePaddingType === key }
					onClick={ () => setAttributes( { quotePaddingType: key } ) }
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	);

	const getTooltipElement = () => {
		return (
			<>
				<Toolbar label="Options">
					<label
						aria-label={ __(
							'Twitter Username',
							'ultimate-addons-for-gutenberg'
						) }
						className={ `${ className }__via-label` }
						htmlFor={ `${ className }__via` }
					>
						{ ' ' }
						{ UAGB_Block_Icons.at_the_rate }
					</label>
					<input
						aria-label={ __(
							'Twitter Username',
							'ultimate-addons-for-gutenberg'
						) }
						className={ `${ className }__via` }
						id={ `${ className }__via` }
						onChange={ ( event ) =>
							setAttributes( {
								iconShareVia: event.target.value,
							} )
						}
						placeholder={ __(
							'Username',
							'ultimate-addons-for-gutenberg'
						) }
						type="text"
						value={ iconShareVia }
					/>
				</Toolbar>
			</>
		);
	};

	const getAlignmentToolbar = () => {
		return (
			<AlignmentToolbar
				value={ align }
				onChange={ ( value ) => setAttributes( { align: value } ) }
			/>
		);
	};

	const getToolbarElement = () => {
		return (
			<>
				<Toolbar label="Options">
					<Tooltip
						text={ __(
							'Normal Quote',
							'ultimate-addons-for-gutenberg'
						) }
					>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{
									'is-active': quoteStyle === 'style_1',
								}
							) }
							onClick={ () =>
								setAttributes( {
									quoteStyle: 'style_1',
								} )
							}
						>
							{ UAGB_Block_Icons.quote_1 }
						</Button>
					</Tooltip>
				</Toolbar>

				<Toolbar label="Options">
					<Tooltip
						text={ __(
							'Inline Quote',
							'ultimate-addons-for-gutenberg'
						) }
					>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{
									'is-active': quoteStyle === 'style_2',
								}
							) }
							onClick={ () =>
								setAttributes( {
									quoteStyle: 'style_2',
								} )
							}
						>
							{ UAGB_Block_Icons.quote_2 }
						</Button>
					</Tooltip>
				</Toolbar>
			</>
		);
	};

	return (
		<>
			<BlockControls key="controls">
				{ skinStyle !== 'border' && getAlignmentToolbar() }
				{ skinStyle === 'quotation' && getToolbarElement() }
				{ enableTweet && getTooltipElement() }
			</BlockControls>
			<InspectorControls>
				{ skinSettings }
				{ typography }
				{ twitterSettings }
				{ spacingSettings }
			</InspectorControls>
			{ loadDescGoogleFonts }
			{ loadAuthorGoogleFonts }
			{ loadTweetGoogleFonts }
		</>
	);
};

export default React.memo( Settings );
