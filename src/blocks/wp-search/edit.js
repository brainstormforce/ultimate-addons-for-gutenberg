/**
 * BLOCK: WP Search
 */
import styling from "./styling";
import { Fragment, useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import BoxShadowControl from "../../components/box-shadow";
import TypographyControl from "../../components/typography";
import WebfontLoader from "../../components/typography/fontloader";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
import blockIcons from "../../../dist/blocks/uagb-controls/block-icons";
import Columnresponsive from "../../components/typography/column-responsive";

const { __ } = wp.i18n;

const {
	InspectorControls,
	ColorPalette,
	RichText
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TextControl,
	ButtonGroup,
	Button,
} = wp.components;

const { withSelect } = wp.data;

const UAGBWpSearchEdit = props => {

	const initState = {
		isFocused: "false",
	}

	const [state, setState] = useState(initState);

	useEffect( () => {
		// Assigning blockId in the attribute.
		props.setAttributes( {
			blockId: props.clientId.substr( 0, 8 )
		} ); // Pushing Style tag for this block css.

		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-wp-search-" + props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}, [state] ); // componentDidMount.

	useEffect(() => {

		if ( ! props.isSelected  && state.isFocused ) {
			setState( {
				isFocused: "false",
			} )
		}
		if ( props.isSelected ) {

			setState( {
				isFocused: true,
			} )
		}

		var element = document.getElementById( "uagb-style-wp-search-" + props.clientId.substr( 0, 8 ) )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( props )
		}
	}, [props]);   // componentDidUpdate.


	const formPreventDefault = useCallback( ( e ) => {
		e.preventDefault();
	} );

	const {
		attributes,
		setAttributes,
		deviceType
	} = props;

	const {
		blockId,
		layout,
		placeholder,
		inputSize,
		textColor,
		inputBgColor,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		buttonBgColor,
		buttonBgHoverColor,
		buttonIconColor,
		buttonIconHoverColor,
		buttonWidth,
		buttonIconSize,
		iconColor,
		iconSize,
		inputloadGoogleFonts,
		inputFontFamily,
		inputFontWeight,
		inputFontSubset,
		inputFontSize,
		inputFontSizeType,
		inputFontSizeTablet,
		inputFontSizeMobile,
		inputLineHeight,
		inputLineHeightType,
		inputLineHeightTablet,
		inputLineHeightMobile,
		inputPaddingTypeDesktop,
		vinputPaddingMobile,
		vinputPaddingTablet,
		vinputPaddingDesktop,
		hinputPaddingMobile,
		hinputPaddingTablet,
		hinputPaddingDesktop,
		buttonType,
		buttonText,
		buttonloadGoogleFonts,
		buttonFontFamily,
		buttonFontWeight,
		buttonFontSubset,
		buttonFontSize,
		buttonFontSizeType,
		buttonFontSizeTablet,
		buttonFontSizeMobile,
		buttonLineHeight,
		buttonLineHeightType,
		buttonLineHeightTablet,
		buttonLineHeightMobile,
		buttonTextColor,
		buttonTextHoverColor,
		inputSizeType
	} = attributes;

	let loadInputGoogleFonts;

	if ( inputloadGoogleFonts === true ) {
		const qconfig = {
			google: {
				families: [inputFontFamily + ( inputFontWeight ? ":" + inputFontWeight : "" )]
			}
		};
		loadInputGoogleFonts = <WebfontLoader config={ qconfig }>
		</WebfontLoader>;
	}

	let loadButtonGoogleFonts;

	if ( buttonloadGoogleFonts === true ) {
		const qconfig = {
			google: {
				families: [buttonFontFamily + ( buttonFontWeight ? ":" + buttonFontWeight : "" )]
			}
		};
		loadButtonGoogleFonts = <WebfontLoader config={ qconfig }>
		</WebfontLoader>;
	}

	const generalSettings = () => {
		return <PanelBody title={ __( "General", "ultimate-addons-for-gutenberg" ) } initialOpen={ true } className="uagb__url-panel-body">
			<SelectControl label={ __( "Layout", "ultimate-addons-for-gutenberg" ) } value={ layout } options={ [{
				value: "input-button",
				label: __( "Classic", "ultimate-addons-for-gutenberg" )
			}, {
				value: "input",
				label: __( "Minimal", "ultimate-addons-for-gutenberg" )
			}] } onChange={ value => setAttributes( {
				layout: value
			} ) } />
			<Fragment>
				<TextControl label={ __( "Placeholder", "ultimate-addons-for-gutenberg" ) } value={ placeholder } onChange={ value => setAttributes( {
					placeholder: value
				} ) } />
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputSizeType === "px" } aria-pressed={ inputSizeType === "px" } onClick={ () => setAttributes( {
						inputSizeType: "px"
					} ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputSizeType === "%" } aria-pressed={ inputSizeType === "%" } onClick={ () => setAttributes( {
						inputSizeType: "%"
					} ) }>{ "%" }</Button>
				</ButtonGroup>
				<RangeControl label={ __( "Input Width", "ultimate-addons-for-gutenberg" ) } value={ inputSize } onChange={ value => setAttributes( {
					inputSize: value
				} ) } min={ 0 } max={ "px" === inputSizeType ? 500 : 100 } />
			</Fragment>

		</PanelBody>;
	};

	const inputSettings = () => {
		return <PanelBody title={ __( "Input Box", "ultimate-addons-for-gutenberg" ) } initialOpen={ false } className="uagb__url-panel-body">
			<p className="uagb-setting-label">{ __( "Text Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
				backgroundColor: textColor
			} }></span></span></p>
			<ColorPalette value={ textColor } onChange={ value => setAttributes( {
				textColor: value
			} ) } allowReset />
			<p className="uagb-setting-label">{ __( "Background Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
				backgroundColor: inputBgColor
			} }></span></span></p>
			<ColorPalette value={ inputBgColor } onChange={ value => setAttributes( {
				inputBgColor: value
			} ) } allowReset />
			<hr />
			<h2>{ __( "Border", "ultimate-addons-for-gutenberg" ) }</h2>
			<SelectControl label={ __( "Style", "ultimate-addons-for-gutenberg" ) } value={ borderStyle } options={ [{
				value: "none",
				label: __( "None", "ultimate-addons-for-gutenberg" )
			}, {
				value: "solid",
				label: __( "Solid", "ultimate-addons-for-gutenberg" )
			}, {
				value: "dotted",
				label: __( "Dotted", "ultimate-addons-for-gutenberg" )
			}, {
				value: "dashed",
				label: __( "Dashed", "ultimate-addons-for-gutenberg" )
			}, {
				value: "double",
				label: __( "Double", "ultimate-addons-for-gutenberg" )
			}] } onChange={ value => {
				setAttributes( {
					borderStyle: value
				} );
			} } />
			{ "none" !== borderStyle && <Fragment>
				<RangeControl label={ __( "Thickness (px)", "ultimate-addons-for-gutenberg" ) } value={ borderWidth } onChange={ value => {
					setAttributes( {
						borderWidth: value
					} );
				} } min={ 0 } max={ 20 } />
				<RangeControl label={ __( "Rounded Corners (px)", "ultimate-addons-for-gutenberg" ) } value={ borderRadius } onChange={ value => {
					setAttributes( {
						borderRadius: value
					} );
				} } min={ 0 } max={ 50 } />
				<p className="uagb-setting-label">{ __( "Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
					backgroundColor: borderColor
				} }></span></span></p>
				<ColorPalette value={ borderColor } onChange={ value => setAttributes( {
					borderColor: value
				} ) } allowReset />
			</Fragment> }
			<hr />
			<Columnresponsive />
			{ "Desktop" === deviceType && <Fragment>
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "px" } aria-pressed={ inputPaddingTypeDesktop === "px" } onClick={ () => setAttributes( {
						inputPaddingTypeDesktop: "px"
					} ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "%" } aria-pressed={ inputPaddingTypeDesktop === "%" } onClick={ () => setAttributes( {
						inputPaddingTypeDesktop: "%"
					} ) }>{ "%" }</Button>
				</ButtonGroup>
				<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
				<RangeControl label={ blockIcons.vertical_spacing } className={ "uagb-margin-control" } value={ vinputPaddingDesktop } onChange={ value => setAttributes( {
					vinputPaddingDesktop: value
				} ) } min={ 0 } max={ 100 } allowReset />
				<RangeControl label={ blockIcons.horizontal_spacing } className={ "uagb-margin-control" } value={ hinputPaddingDesktop } onChange={ value => setAttributes( {
					hinputPaddingDesktop: value
				} ) } min={ 0 } max={ 100 } allowReset />
			</Fragment> }
			{ "Tablet" === deviceType && <Fragment>
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "px" } aria-pressed={ inputPaddingTypeDesktop === "px" } onClick={ () => setAttributes( {
						inputPaddingTypeDesktop: "px"
					} ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "%" } aria-pressed={ inputPaddingTypeDesktop === "%" } onClick={ () => setAttributes( {
						inputPaddingTypeDesktop: "%"
					} ) }>{ "%" }</Button>
				</ButtonGroup>
				<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
				<RangeControl label={ blockIcons.vertical_spacing } className={ "uagb-margin-control" } value={ vinputPaddingTablet } onChange={ value => setAttributes( {
					vinputPaddingTablet: value
				} ) } min={ 0 } max={ 100 } allowReset />
				<RangeControl label={ blockIcons.horizontal_spacing } className={ "uagb-margin-control" } value={ hinputPaddingTablet } onChange={ value => setAttributes( {
					hinputPaddingTablet: value
				} ) } min={ 0 } max={ 100 } allowReset />
			</Fragment> }
			{ "Mobile" === deviceType && <Fragment>
				<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
					<Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "px" } aria-pressed={ inputPaddingTypeDesktop === "px" } onClick={ () => setAttributes( {
						inputPaddingTypeDesktop: "px"
					} ) }>{ "px" }</Button>
					<Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ inputPaddingTypeDesktop === "%" } aria-pressed={ inputPaddingTypeDesktop === "%" } onClick={ () => setAttributes( {
						inputPaddingTypeDesktop: "%"
					} ) }>{ "%" }</Button>
				</ButtonGroup>
				<h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
				<RangeControl label={ blockIcons.vertical_spacing } className={ "uagb-margin-control" } value={ vinputPaddingMobile } onChange={ value => setAttributes( {
					vinputPaddingMobile: value
				} ) } min={ 0 } max={ 100 } allowReset />
				<RangeControl label={ blockIcons.horizontal_spacing } className={ "uagb-margin-control" } value={ hinputPaddingMobile } onChange={ value => setAttributes( {
					hinputPaddingMobile: value
				} ) } min={ 0 } max={ 100 } allowReset />
			</Fragment> }
			<hr />
			<TypographyControl label={ __( "Typography", "ultimate-addons-for-gutenberg" ) } attributes={ attributes } setAttributes={ setAttributes } loadGoogleFonts={ {
				value: inputloadGoogleFonts,
				label: "inputloadGoogleFonts"
			} } fontFamily={ {
				value: inputFontFamily,
				label: "inputFontFamily"
			} } fontWeight={ {
				value: inputFontWeight,
				label: "inputFontWeight"
			} } fontSubset={ {
				value: inputFontSubset,
				label: "inputFontSubset"
			} } fontSizeType={ {
				value: inputFontSizeType,
				label: "inputFontSizeType"
			} } fontSize={ {
				value: inputFontSize,
				label: "inputFontSize"
			} } fontSizeMobile={ {
				value: inputFontSizeMobile,
				label: "inputFontSizeMobile"
			} } fontSizeTablet={ {
				value: inputFontSizeTablet,
				label: "inputFontSizeTablet"
			} } lineHeightType={ {
				value: inputLineHeightType,
				label: "inputLineHeightType"
			} } lineHeight={ {
				value: inputLineHeight,
				label: "inputLineHeight"
			} } lineHeightMobile={ {
				value: inputLineHeightMobile,
				label: "inputLineHeightMobile"
			} } lineHeightTablet={ {
				value: inputLineHeightTablet,
				label: "inputLineHeightTablet"
			} } />
			<BoxShadowControl setAttributes={ setAttributes } label={ __( "Box Shadow", "ultimate-addons-for-gutenberg" ) } boxShadowColor={ {
				value: boxShadowColor,
				label: __( "Color", "ultimate-addons-for-gutenberg" )
			} } boxShadowHOffset={ {
				value: boxShadowHOffset,
				label: __( "Horizontal", "ultimate-addons-for-gutenberg" )
			} } boxShadowVOffset={ {
				value: boxShadowVOffset,
				label: __( "Vertical", "ultimate-addons-for-gutenberg" )
			} } boxShadowBlur={ {
				value: boxShadowBlur,
				label: __( "Blur", "ultimate-addons-for-gutenberg" )
			} } boxShadowSpread={ {
				value: boxShadowSpread,
				label: __( "Spread", "ultimate-addons-for-gutenberg" )
			} } boxShadowPosition={ {
				value: boxShadowPosition,
				label: __( "Position", "ultimate-addons-for-gutenberg" )
			} } />
		</PanelBody>;
	};

	const buttonSettings = () => {
		if ( "input-button" === layout ) {
			return <PanelBody title={ __( "Button", "ultimate-addons-for-gutenberg" ) } initialOpen={ false } className="uagb__url-panel-body">
				<Fragment>
					<SelectControl label={ __( "Type", "ultimate-addons-for-gutenberg" ) } value={ buttonType } options={ [{
						value: "icon",
						label: __( "Icon", "ultimate-addons-for-gutenberg" )
					}, {
						value: "text",
						label: __( "Text", "ultimate-addons-for-gutenberg" )
					}] } onChange={ value => {
						setAttributes( {
							buttonType: value
						} );
					} } />
					{ "text" === buttonType && <Fragment>
						<TextControl label="Text" value={ buttonText } onChange={ value => {
							setAttributes( {
								buttonText: value
							} );
						} } />
						<TypographyControl label={ __( "Typography", "ultimate-addons-for-gutenberg" ) } attributes={ attributes } setAttributes={ setAttributes } loadGoogleFonts={ {
							value: buttonloadGoogleFonts,
							label: "buttonloadGoogleFonts"
						} } fontFamily={ {
							value: buttonFontFamily,
							label: "buttonFontFamily"
						} } fontWeight={ {
							value: buttonFontWeight,
							label: "buttonFontWeight"
						} } fontSubset={ {
							value: buttonFontSubset,
							label: "buttonFontSubset"
						} } fontSizeType={ {
							value: buttonFontSizeType,
							label: "buttonFontSizeType"
						} } fontSize={ {
							value: buttonFontSize,
							label: "buttonFontSize"
						} } fontSizeMobile={ {
							value: buttonFontSizeMobile,
							label: "buttonFontSizeMobile"
						} } fontSizeTablet={ {
							value: buttonFontSizeTablet,
							label: "buttonFontSizeTablet"
						} } lineHeightType={ {
							value: buttonLineHeightType,
							label: "buttonLineHeightType"
						} } lineHeight={ {
							value: buttonLineHeight,
							label: "buttonLineHeight"
						} } lineHeightMobile={ {
							value: buttonLineHeightMobile,
							label: "buttonLineHeightMobile"
						} } lineHeightTablet={ {
							value: buttonLineHeightTablet,
							label: "buttonLineHeightTablet"
						} } />
					</Fragment> }
					<RangeControl label={ __( "Width", "ultimate-addons-for-gutenberg" ) } value={ buttonWidth } onChange={ value => {
						setAttributes( {
							buttonWidth: value
						} );
					} } min={ 0 } max={ 500 } />
					<Fragment>
						<p className="uagb-setting-label">{ __( "Background Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
							backgroundColor: buttonBgColor
						} }></span></span></p>
						<ColorPalette value={ buttonBgColor } onChange={ value => setAttributes( {
							buttonBgColor: value
						} ) } allowReset />
						<p className="uagb-setting-label">{ __( "Background Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
							backgroundColor: buttonBgHoverColor
						} }></span></span></p>
						<ColorPalette value={ buttonBgHoverColor } onChange={ value => setAttributes( {
							buttonBgHoverColor: value
						} ) } allowReset />
						{ "text" === buttonType && <Fragment>
							<p className="uagb-setting-label">{ __( "Text Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
								backgroundColor: buttonTextColor
							} }></span></span></p>
							<ColorPalette value={ buttonTextColor } onChange={ value => setAttributes( {
								buttonTextColor: value
							} ) } allowReset />
							<p className="uagb-setting-label">{ __( "Text Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
								backgroundColor: buttonTextHoverColor
							} }></span></span></p>
							<ColorPalette value={ buttonTextHoverColor } onChange={ value => setAttributes( {
								buttonTextHoverColor: value
							} ) } allowReset />
						</Fragment> }
					</Fragment>
					{ "icon" === buttonType && <Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Icon", "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl label={ __( "Size", "ultimate-addons-for-gutenberg" ) } value={ buttonIconSize } onChange={ value => {
							setAttributes( {
								buttonIconSize: value
							} );
						} } min={ 0 } max={ 500 } />
						<p className="uagb-setting-label">{ __( "Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
							backgroundColor: buttonIconColor
						} }></span></span></p>
						<ColorPalette value={ buttonIconColor } onChange={ value => setAttributes( {
							buttonIconColor: value
						} ) } allowReset />
						<p className="uagb-setting-label">{ __( "Hover Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
							backgroundColor: buttonIconHoverColor
						} }></span></span></p>
						<ColorPalette value={ buttonIconHoverColor } onChange={ value => setAttributes( {
							buttonIconHoverColor: value
						} ) } allowReset />
					</Fragment> }
				</Fragment>
			</PanelBody>;
		}

		return "";
	};

	const iconSettings = () => {
		if ( "input" === layout ) {
			return <PanelBody title={ __( "Icon", "ultimate-addons-for-gutenberg" ) } initialOpen={ false } className="uagb__url-panel-body">
				<Fragment>
					<RangeControl label={ __( "Size", "ultimate-addons-for-gutenberg" ) } value={ iconSize } onChange={ value => {
						setAttributes( {
							iconSize: value
						} );
					} } min={ 0 } max={ 500 } />
					<p className="uagb-setting-label">{ __( "Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={ {
						backgroundColor: iconColor
					} }></span></span></p>
					<ColorPalette value={ iconColor } onChange={ value => setAttributes( {
						iconColor: value
					} ) } allowReset />
				</Fragment>

			</PanelBody>;
		}

		return "";
	};

	const renderClassic = () => {
		if ( "input-button" === layout ) {
			return <form className="uagb-search-wrapper" onSubmit={ formPreventDefault } role="search" action={ uagb_blocks_info.uagb_home_url } method="get">
				<div className="uagb-search-form__container wp-block-button" role="tablist">
					<input placeholder={ placeholder } className="uagb-search-form__input" type="search" name="s" title="Search" />

					<button className="uagb-search-submit wp-block-button__link" type="submit">
						{ "icon" === buttonType && <span className="uagb-wp-search-button-icon-wrap">
							{ renderSVG( "fas fa-search" ) }
						</span> }
						{ "text" === buttonType && <RichText tagName="span" placeholder={ __( "Search", "ultimate-addons-for-gutenberg" ) } value={ buttonText } onChange={ value => setAttributes( {
							buttonText: value
						} ) } className='uagb-wp-search-button-text' multiline={ false } allowedFormats={ ["core/bold", "core/italic", "core/strikethrough"] } /> }
					</button>

				</div>
			</form>;
		}

		return "";
	};

	const renderMinimal = () => {
		if ( "input" === layout ) {
			return <form className="uagb-search-wrapper" onSubmit={ formPreventDefault } role="search" action={ uagb_blocks_info.uagb_home_url } method="get">
				<div className="uagb-search-form__container" role="tablist">
					<span className="uagb-wp-search-icon-wrap">
						{ renderSVG( "fas fa-search" ) }
					</span>
					<input placeholder={ placeholder } className="uagb-search-form__input" type="search" name="s" title="Search" />
				</div>
			</form>;
		}

		return "";
	};

	return <div className={ classnames( "uagb-wp-search__outer-wrap", `uagb-editor-preview-mode-${deviceType.toLowerCase()}`, `uagb-block-${blockId}`, `uagb-layout-${layout}` ) }>
		<InspectorControls>
			{ generalSettings() }
			{ inputSettings() }
			{ buttonSettings() }
			{ iconSettings() }
		</InspectorControls>
		{ renderClassic() }
		{ renderMinimal() }
		{ loadInputGoogleFonts }
		{ loadButtonGoogleFonts }
	</div>;
};

export default withSelect( ( select ) => {

	const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );

	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType,
	};
} )( UAGBWpSearchEdit );
