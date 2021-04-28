/**
 * BLOCK: Team
 */

import classnames from "classnames";
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import styling from "./styling";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography";

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader";

const { withSelect } = wp.data;

const { __ } = wp.i18n;

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaUpload,
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	TextControl,
	BaseControl,
	ToggleControl
} = wp.components;

const { Component, Fragment } = wp.element;

const svg_icons = Object.keys( UAGBIcon );

let imageSizeOptions = [
	{ value: "thumbnail", label: __( "Thumbnail","ultimate-addons-for-gutenberg" ) },
	{ value: "medium", label: __( "Medium","ultimate-addons-for-gutenberg" ) },
	{ value: "full", label: __( "Large","ultimate-addons-for-gutenberg" ) }
];

class UAGBTeam extends Component {

	social_html( icon, link, target ) {

		const target_value =  ( target ) ? "_blank" : "_self";

		return (
			<li className="uagb-team__social-icon"><a href={ link } aria-label={ icon } target={ target_value } title="" rel="noopener noreferrer">{ renderSVG( icon ) }</a></li>
		);
	}

	constructor() {
		super( ...arguments );
		this.onSelectImage    = this.onSelectImage.bind( this );
	}


	getImageSize( sizes ) {
		const size_arr = [];
		$.each( sizes, function ( index, item ) {
		  const name = index;
		  	const p = { "value" : name, "label": name };
		  	size_arr.push( p );
		} );
		return ( size_arr );
	}

	onSelectImage( media ) {

		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { image: null } );
			return;
		}
		if ( ! media.type || "image" != media.type ) {
			return;
		}
		setAttributes( { image: media } );
		
		if ( media.sizes ) {
			const new_img = this.getImageSize( media.sizes );
			imageSizeOptions = new_img;
		}
	}

	render() {

		const { className, setAttributes, attributes, mergeBlocks, insertBlocksAfter, onReplace, deviceType } = this.props;

		// Setup the attributes.
		const {
			align,
			tag,
			title,
			prefix,
			description_text,
			titleColor,
			prefixColor,
			descColor,
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
			prefixFontFamily,
			prefixFontWeight,
			prefixFontSubset,
			prefixFontSizeType,
			prefixFontSize,
			prefixFontSizeMobile,
			prefixFontSizeTablet,
			prefixLineHeightType,
			prefixLineHeight,
			prefixLineHeightMobile,
			prefixLineHeightTablet,
			descFontFamily,
			descFontWeight,
			descFontSubset,
			descFontSizeType,
			descFontSize,
			descFontSizeMobile,
			descFontSizeTablet,
			descLineHeightType,
			descLineHeight,
			descLineHeightMobile,
			descLineHeightTablet,
			socialFontSize,
			socialFontSizeType,
			socialFontSizeMobile,
			socialFontSizeTablet,
			titleLoadGoogleFonts,
			prefixLoadGoogleFonts,
			descLoadGoogleFonts,
			image,
			imgStyle,
			imgAlign,
			imgSize,
			imgWidth,
			imgPosition,
			titleSpace,
			descSpace,
			prefixSpace,
			imgLeftMargin,
			imgRightMargin,
			imgTopMargin,
			imgBottomMargin,
			twitterIcon,
			fbIcon,
			linkedinIcon,
			pinIcon,
			twitterLink,
			fbLink,
			linkedinLink,
			pinLink,
			socialColor,
			socialHoverColor,
			socialSpace,
			socialTarget,
			socialEnable,
			stack
		} = attributes;

		if ( image && image.sizes ){
			imageSizeOptions = this.getImageSize( image.sizes );
		}

		// Remove image.
		const onRemoveImage = ( media ) => {
			setAttributes( { image: null } );
		};

		let loadTitleGoogleFonts;
		let loadPrefixGoogleFonts;
		let loadDescGoogleFonts;

		if ( titleLoadGoogleFonts == true ) {
			
			const tconfig = {
				google: {
					families: [ titleFontFamily + ( titleFontWeight ? ":" + titleFontWeight : "" ) ],
				},
			};

			loadTitleGoogleFonts = (
				<WebfontLoader config={ tconfig }>
				</WebfontLoader>
			);
		}

		if ( prefixLoadGoogleFonts == true ) {

			const pconfig = {
				google: {
					families: [ prefixFontFamily + ( prefixFontWeight ? ":" + prefixFontWeight : "" ) ],
				},
			};

			loadPrefixGoogleFonts = (
				<WebfontLoader config={ pconfig }>
				</WebfontLoader>
			);
		}
		if ( descLoadGoogleFonts == true ) {

			const dconfig = {
				google: {
					families: [ descFontFamily + ( descFontWeight ? ":" + descFontWeight : "" ) ],
				},
			};

			loadDescGoogleFonts = (
				<WebfontLoader config={ dconfig }>
				</WebfontLoader>
			);
		}

		let size = "";
		let img_url = "";

		if ( image ) {
			size = image.sizes;
			if ( image.sizes ) {
				img_url = ( size[imgSize] ) ? size[imgSize].url : image.url;
			} else {
				img_url = image.url;
			}
		}

		let image_html = "";

		if ( "" != img_url ) {
			image_html = (
				<div
					className={ classnames(
						"uagb-team__image-wrap",
						`uagb-team__image-crop-${imgStyle}`,
					) }>
					<img
						className=""
						src={ img_url }
						alt={ ( image.alt ) ? image.alt : "" }
					/>
				</div>
			);
		}
		
		const team_image = "";

		// Get description and seperator components.
		const desc_html = (
			<div className="uagb-team__desc-wrap">
				<RichText
					tagName='p'
					value={ description_text }
					placeholder={ __( "Write a Description","ultimate-addons-for-gutenberg" ) }
					className='uagb-team__desc'
					onChange={ ( value ) => setAttributes( { description_text: value } ) }
					onMerge={ mergeBlocks }
					placeholder={ __( "Write a Description","ultimate-addons-for-gutenberg" ) }
					onSplit={
						insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] );
							} :
							undefined
					}
					onRemove={ () => onReplace( [] ) }
				/>
			</div>
		);

		const social_links = (
			<div className="uagb-team__social-icon-wrap">
				<ul className="uagb-team__social-list">
					{ "" != twitterIcon && this.social_html( twitterIcon, twitterLink, socialTarget ) }
					{ "" != fbIcon && this.social_html( fbIcon, fbLink, socialTarget ) }
					{ "" != linkedinIcon && this.social_html( linkedinIcon, linkedinLink, socialTarget ) }
					{ "" != pinIcon && this.social_html( pinIcon, pinLink, socialTarget ) }
				</ul>
			</div>
		);

		// Get Title and Prefix components.
		const title_html = (
			<div className="uagb-team__title-wrap">
				<RichText
					tagName={ tag }
					value={ title }
					className='uagb-team__title'
					onChange={ ( value ) => setAttributes( { title: value } ) }
					multiline={ false }
					placeholder={ __( "Write a Title","ultimate-addons-for-gutenberg" ) }
					onMerge={ mergeBlocks }
					onSplit={
						insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] );
							} :
							undefined
					}
					onRemove={ () => onReplace( [] ) }
				/>
				<RichText
					tagName="div"
					value={ prefix }
					placeholder={ __( "Enter Prefix","ultimate-addons-for-gutenberg" ) }
					className='uagb-team__prefix'
					onChange={ ( value ) => setAttributes( { prefix: value } ) }
					onMerge={ mergeBlocks }
					placeholder={ __( "Write a Designation","ultimate-addons-for-gutenberg" ) }
					onSplit={
						insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] );
							} :
							undefined
					}
					onRemove={ () => onReplace( [] ) }
				/>
			</div>
		);

		return (
			<Fragment>
				{ ( imgPosition == "above" ) &&
					<BlockControls key='controls'>
						<AlignmentToolbar
							value={ align }
							onChange={ ( value ) => setAttributes( { align: value } ) }
						/>
					</BlockControls>
				}
				<InspectorControls>
					<PanelBody
						title={ __( "Image" ) }
					>
						<BaseControl
							className="editor-bg-image-control"
							label={ __( "Team Member Image","ultimate-addons-for-gutenberg" ) }>
							<MediaUpload
								title={ __( "Select Image","ultimate-addons-for-gutenberg" ) }
								onSelect={ this.onSelectImage }
								allowedTypes={ [ "image" ] }
								value={ image }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ ! image ? __( "Select Image","ultimate-addons-for-gutenberg" ) : __( "Replace image","ultimate-addons-for-gutenberg" ) }
									</Button>
								) }
							/>
							{ image &&
								<Button className="uagb-rm-btn" onClick={ onRemoveImage } isLink isDestructive>
									{ __( "Remove Image","ultimate-addons-for-gutenberg" ) }
								</Button>
							}
						</BaseControl>
						{ image &&
							<SelectControl
								label={ __( "Position","ultimate-addons-for-gutenberg" ) }
								value={ imgPosition }
								onChange={ ( value ) => setAttributes( { imgPosition: value } ) }
								options={ [
									{ value: "above", label: __( "Above","ultimate-addons-for-gutenberg" ) },
									{ value: "left", label: __( "Left","ultimate-addons-for-gutenberg" ) },
									{ value: "right", label: __( "Right","ultimate-addons-for-gutenberg" ) },

								] }
							/>
						}
						{ imgPosition != "above" && image &&
							<SelectControl
								label={ __( "Stack on","ultimate-addons-for-gutenberg" ) }
								value={ stack }
								options={ [
									{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
									{ value: "tablet", label: __( "Tablet","ultimate-addons-for-gutenberg" ) },
									{ value: "mobile", label: __( "Mobile","ultimate-addons-for-gutenberg" ) },
								] }
								help={ __( "Note: Choose on what breakpoint the Team will stack." ) }
								onChange={ ( value ) => setAttributes( { stack: value } ) }
							/>
						}
						{ image &&
							<SelectControl
								label={ __( "Image Style","ultimate-addons-for-gutenberg" ) }
								value={ imgStyle }
								onChange={ ( value ) => setAttributes( { imgStyle: value } ) }
								options={ [
									{ value: "normal", label: __( "Normal","ultimate-addons-for-gutenberg" ) },
									{ value: "circle", label: __( "Circle","ultimate-addons-for-gutenberg" ) },
									{ value: "square", label: __( "Square","ultimate-addons-for-gutenberg" ) },
								] }
							/>
						}

						{ ( imgPosition && ( imgPosition !== "above" )  ) && image && <SelectControl
							label={ __( "Vertical Alignment","ultimate-addons-for-gutenberg" ) }
							value={ imgAlign }
							onChange={ ( value ) => setAttributes( { imgAlign: value } ) }
							options={ [
								{ value: "top", label: __( "Top","ultimate-addons-for-gutenberg" ) },
								{ value: "middle", label: __( "Middle","ultimate-addons-for-gutenberg" ) },
							] }
						/>
						}
						{ image &&
							<Fragment>
								<SelectControl
									label={ __( "Size","ultimate-addons-for-gutenberg" ) }
									options={ imageSizeOptions }
									value={ imgSize }
									onChange={ ( value ) => setAttributes( { imgSize: value } ) }
								/>
								<RangeControl
									label={ __( "Width","ultimate-addons-for-gutenberg" ) }
									value={ imgWidth }
									onChange={ ( value ) => setAttributes( { imgWidth: value } ) }
									min={ 0 }
									max={ 500 }
									allowReset
								/>
							</Fragment>
						}
					</PanelBody>
					<PanelBody title={ __( "Social Links","ultimate-addons-for-gutenberg" ) }
						initialOpen={ false }>
						<ToggleControl
							label={ __( "Enable Social Links","ultimate-addons-for-gutenberg" ) }
							checked={ socialEnable }
							onChange={ ( value ) => setAttributes( { socialEnable: ! socialEnable } ) }
						/>
						{ socialEnable &&
							<Fragment>
								<ToggleControl
									label={ __( "Open Links in New Window","ultimate-addons-for-gutenberg" ) }
									checked={ socialTarget }
									onChange={ ( value ) => setAttributes( { socialTarget: ! socialTarget } ) }
								/>
								<PanelBody title={ __( "Twitter","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
									<p className="components-base-control__label">{ __( "Icon","ultimate-addons-for-gutenberg" ) }</p>
									<FontIconPicker
										icons={ svg_icons }
										renderFunc={ renderSVG }
										theme="default"
										value={ twitterIcon }
										onChange={ ( value ) => setAttributes( { twitterIcon: value } ) }
										isMulti={ false }
										noSelectedPlaceholder={ __( "Select Icon","ultimate-addons-for-gutenberg" ) }
									/>
									<p className="components-base-control__label">{ __( "URL","ultimate-addons-for-gutenberg" ) }</p>
									<TextControl
										value={ twitterLink }
										onChange={ ( value ) => setAttributes( { twitterLink: value } ) }
										placeholder={ __( "Enter Twitter URL","ultimate-addons-for-gutenberg" ) }
									/>
								</PanelBody>
								<PanelBody title={ __( "Facebook","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
									<p className="components-base-control__label">{ __( "Icon","ultimate-addons-for-gutenberg" ) }</p>
									<FontIconPicker
										icons={ svg_icons }
										renderFunc={ renderSVG }
										theme="default"
										value={ fbIcon }
										onChange={ ( value ) => setAttributes( { fbIcon: value } ) }
										isMulti={ false }
										noSelectedPlaceholder={ __( "Select Icon","ultimate-addons-for-gutenberg" ) }
									/>
									<p className="components-base-control__label">{ __( "URL","ultimate-addons-for-gutenberg" ) }</p>
									<TextControl
										value={ fbLink }
										onChange={ ( value ) => setAttributes( { fbLink: value } ) }
										placeholder={ __( "Enter Facebook URL","ultimate-addons-for-gutenberg" ) }
									/>
								</PanelBody>
								<PanelBody title={ __( "LinkedIn","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
									<p className="components-base-control__label">{ __( "Icon","ultimate-addons-for-gutenberg" ) }</p>
									<FontIconPicker
										icons={ svg_icons }
										renderFunc={ renderSVG }
										noSelectedPlaceholder={ __( "Select Icon","ultimate-addons-for-gutenberg" ) }
										theme="default"
										value={ linkedinIcon }
										onChange={ ( value ) => setAttributes( { linkedinIcon: value } ) }
										isMulti={ false }
									/>
									<p className="components-base-control__label">{ __( "URL","ultimate-addons-for-gutenberg" ) }</p>
									<TextControl
										value={ linkedinLink }
										onChange={ ( value ) => setAttributes( { linkedinLink: value } ) }
										placeholder={ __( "Enter LinkedIn URL","ultimate-addons-for-gutenberg" ) }
									/>
								</PanelBody>
								<PanelBody title={ __( "Pinterest","ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
									<p className="components-base-control__label">{ __( "Icon","ultimate-addons-for-gutenberg" ) }</p>
									<FontIconPicker
										icons={ svg_icons }
										renderFunc={ renderSVG }
										noSelectedPlaceholder={ __( "Select Icon","ultimate-addons-for-gutenberg" ) }
										theme="default"
										value={ pinIcon }
										onChange={ ( value ) => setAttributes( { pinIcon: value } ) }
										isMulti={ false }
									/>
									<p className="components-base-control__label">{ __( "URL","ultimate-addons-for-gutenberg" ) }</p>
									<TextControl
										value={ pinLink }
										onChange={ ( value ) => setAttributes( { pinLink: value } ) }
										placeholder={ __( "Enter Pinterest URL","ultimate-addons-for-gutenberg" ) }
									/>
								</PanelBody>
							</Fragment>
						}
					</PanelBody>
					<PanelBody
						title={ __( "Typography","ultimate-addons-for-gutenberg" ) }
						initialOpen={ false }>
						<SelectControl
							label={ __( "Title Tag","ultimate-addons-for-gutenberg" ) }
							value={ tag }
							onChange={ ( value ) => setAttributes( { tag: value } ) }
							options={ [
								{ value: "h1", label: __( "H1","ultimate-addons-for-gutenberg" ) },
								{ value: "h2", label: __( "H2","ultimate-addons-for-gutenberg" ) },
								{ value: "h3", label: __( "H3","ultimate-addons-for-gutenberg" ) },
								{ value: "h4", label: __( "H4","ultimate-addons-for-gutenberg" ) },
								{ value: "h5", label: __( "H5","ultimate-addons-for-gutenberg" ) },
								{ value: "h6", label: __( "H6","ultimate-addons-for-gutenberg" ) },
							] }
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Title","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: titleLoadGoogleFonts, label: "titleLoadGoogleFonts" } }
							fontFamily={ { value: titleFontFamily, label: "titleFontFamily" } }
							fontWeight={ { value: titleFontWeight, label: "titleFontWeight" } }
							fontSubset={ { value: titleFontSubset, label: "titleFontSubset" } }
							fontSizeType={ { value: titleFontSizeType, label: "titleFontSizeType" } }
							fontSize={ { value: titleFontSize, label: "titleFontSize" } }
							fontSizeMobile={ { value: titleFontSizeMobile, label: "titleFontSizeMobile" } }
							fontSizeTablet={ { value: titleFontSizeTablet, label: "titleFontSizeTablet" } }
							lineHeightType={ { value: titleLineHeightType, label: "titleLineHeightType" } }
							lineHeight={ { value: titleLineHeight, label: "titleLineHeight" } }
							lineHeightMobile={ { value: titleLineHeightMobile, label: "titleLineHeightMobile" } }
							lineHeightTablet={ { value: titleLineHeightTablet, label: "titleLineHeightTablet" } }
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Prefix","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: prefixLoadGoogleFonts, label: "prefixLoadGoogleFonts" } }
							fontFamily={ { value: prefixFontFamily, label: "prefixFontFamily" } }
							fontWeight={ { value: prefixFontWeight, label: "prefixFontWeight" } }
							fontSubset={ { value: prefixFontSubset, label: "prefixFontSubset" } }
							fontSizeType={ { value: prefixFontSizeType, label: "prefixFontSizeType" } }
							fontSize={ { value: prefixFontSize, label: "prefixFontSize" } }
							fontSizeMobile={ { value: prefixFontSizeMobile, label: "prefixFontSizeMobile" } }
							fontSizeTablet={ { value: prefixFontSizeTablet, label: "prefixFontSizeTablet" } }
							lineHeightType={ { value: prefixLineHeightType, label: "prefixLineHeightType" } }
							lineHeight={ { value: prefixLineHeight, label: "prefixLineHeight" } }
							lineHeightMobile={ { value: prefixLineHeightMobile, label: "prefixLineHeightMobile" } }
							lineHeightTablet={ { value: prefixLineHeightTablet, label: "prefixLineHeightTablet" } }
						/>						
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Description","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: descLoadGoogleFonts, label: "descLoadGoogleFonts" } }
							fontFamily={ { value: descFontFamily, label: "descFontFamily" } }
							fontWeight={ { value: descFontWeight, label: "descFontWeight" } }
							fontSubset={ { value: descFontSubset, label: "descFontSubset" } }
							fontSizeType={ { value: descFontSizeType, label: "descFontSizeType" } }
							fontSize={ { value: descFontSize, label: "descFontSize" } }
							fontSizeMobile={ { value: descFontSizeMobile, label: "descFontSizeMobile" } }
							fontSizeTablet={ { value: descFontSizeTablet, label: "descFontSizeTablet" } }
							lineHeightType={ { value: descLineHeightType, label: "descLineHeightType" } }
							lineHeight={ { value: descLineHeight, label: "descLineHeight" } }
							lineHeightMobile={ { value: descLineHeightMobile, label: "descLineHeightMobile" } }
							lineHeightTablet={ { value: descLineHeightTablet, label: "descLineHeightTablet" } }
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Social Icons","ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography","ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							fontSizeType={ { value: socialFontSizeType, label: "socialFontSizeType" } }
							fontSize={ { value: socialFontSize, label: "socialFontSize" } }
							fontSizeMobile={ { value: socialFontSizeMobile, label: "socialFontSizeMobile" } }
							fontSizeTablet={ { value: socialFontSizeTablet, label: "socialFontSizeTablet" } }
							disableFontFamily={ true }
							disableLineHeight={ true }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( "Color Settings","ultimate-addons-for-gutenberg" ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: titleColor,
								onChange: ( colorValue ) => setAttributes( { titleColor: colorValue } ),
								label: __( "Title Color","ultimate-addons-for-gutenberg" ),
							},
							{
								value: prefixColor,
								onChange: ( colorValue ) => setAttributes( { prefixColor: colorValue } ),
								label: __( "Designation Color","ultimate-addons-for-gutenberg" ),
							},
							{
								value: descColor,
								onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
								label: __( "Description Color","ultimate-addons-for-gutenberg" ),
							},
							{
								value: socialColor,
								onChange: ( colorValue ) => setAttributes( { socialColor: colorValue } ),
								label: __( "Social Icon Color","ultimate-addons-for-gutenberg" ),
							},
							{
								value: socialHoverColor,
								onChange: ( colorValue ) => setAttributes( { socialHoverColor: colorValue } ),
								label: __( "Social Icon Hover Color","ultimate-addons-for-gutenberg" ),
							},
						] }
					>
					</PanelColorSettings>

					<PanelBody
						title={ __( "Spacing","ultimate-addons-for-gutenberg" ) }
						initialOpen={ false }>
						<RangeControl
							label={ __( "Title Bottom Spacing","ultimate-addons-for-gutenberg" ) }
							value={ titleSpace }
							onChange={ ( value ) => setAttributes( { titleSpace: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
							initialPosition={ 0 }
						/>
						<RangeControl
							label={ __( "Designation Bottom Spacing","ultimate-addons-for-gutenberg" ) }
							value={ prefixSpace }
							onChange={ ( value ) => setAttributes( { prefixSpace: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
							initialPosition={ 0 }
						/>
						<RangeControl
							label={ __( "Description Bottom Spacing","ultimate-addons-for-gutenberg" ) }
							value={ descSpace }
							onChange={ ( value ) => setAttributes( { descSpace: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<RangeControl
							label={ __( "Inter Social Icon Spacing","ultimate-addons-for-gutenberg" ) }
							value={ socialSpace }
							onChange={ ( value ) => setAttributes( { socialSpace: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						{ image &&
							<Fragment>
								<hr className="uagb-editor__separator" />
								<h2>{ __( "Image Margin (px)","ultimate-addons-for-gutenberg" ) }</h2>
								{  imgPosition != "above" &&
								<RangeControl
									label={ UAGB_Block_Icons.left_margin }
									className={ "uagb-margin-control" }
									value={ imgLeftMargin }
									onChange={ ( value ) => setAttributes( { imgLeftMargin: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								}
								{  imgPosition != "above" &&
								<RangeControl
									label={ UAGB_Block_Icons.right_margin }
									className={ "uagb-margin-control" }
									value={ imgRightMargin }
									onChange={ ( value ) => setAttributes( { imgRightMargin: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								}
								<RangeControl
									label={ UAGB_Block_Icons.top_margin }
									className={ "uagb-margin-control" }
									value={ imgTopMargin }
									onChange={ ( value ) => setAttributes( { imgTopMargin: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<RangeControl
									label={ UAGB_Block_Icons.bottom_margin }
									className={ "uagb-margin-control" }
									value={ imgBottomMargin }
									onChange={ ( value ) => setAttributes( { imgBottomMargin: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
							</Fragment>
						}
					</PanelBody>
				</InspectorControls>
				<div
					className={ classnames(
						className,
						"uagb-team",
						"uagb-team__outer-wrap",
						`uagb-team__image-position-${imgPosition}`,
						`uagb-team__align-${align}`,
						`uagb-team__stack-${stack}`,
						`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
						`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }>
					<div className="uagb-team__wrap">

						{ ( imgPosition == "left" ) && image_html }

						<div className="uagb-team__content">

							{  imgPosition == "above" && image_html }

							{ title_html }

							{ desc_html }

							{ socialEnable && social_links }

						</div>

						{ ( imgPosition == "right" ) && image_html }
					</div>
				</div>
				{ loadTitleGoogleFonts }
				{ loadPrefixGoogleFonts }
				{ loadDescGoogleFonts }
			</Fragment>
		);
	}

	componentDidUpdate( prevProps, prevState ) {
		const element = document.getElementById( "uagb-team-style-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		this.props.setAttributes( { classMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-team-style-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}
}

export default withSelect( ( select, props ) => {
	const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );
	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType,
	};
} )( UAGBTeam );
