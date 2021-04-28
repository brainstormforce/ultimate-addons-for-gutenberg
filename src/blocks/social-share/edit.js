/**
 * BLOCK: UAGB - Social Share Edit Class
 */

import classnames from "classnames";
import times from "lodash/times";
import map from "lodash/map";
import memoize from "memize";
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json";
import styling from "./styling";
import Columnresponsive from "../../components/typography/column-responsive";

const { __ } = wp.i18n;

const {
	Component,
	Fragment,
} = wp.element;

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	TabPanel,
	Dashicon
} = wp.components;

const { withSelect } = wp.data;

const ALLOWED_BLOCKS = [ "uagb/social-share-child" ];

const svg_icons = Object.keys( UAGBIcon );

class UAGBSocialShare extends Component {

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		this.props.setAttributes( { classMigrate: true } );
		this.props.setAttributes( { childMigrate : true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-social-share-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps ) {
		const element = document.getElementById( "uagb-style-social-share-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

	render() {

		const { attributes, setAttributes, deviceType } = this.props;

		const {
			align,
			className,
			social_count,
			socials,
			gap,
			stack,
			social_layout,
			borderRadius,
			size,
			sizeType,
			sizeMobile,
			sizeTablet,
			bgSize,
			bgSizeType,
		} = attributes;

		const sizeTypes = [
			{ key: "px", name: __( "px","ultimate-addons-for-gutenberg" ) },
			{ key: "em", name: __( "em","ultimate-addons-for-gutenberg" ) },
		];

		const sizeTypesControls = (
			<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type","ultimate-addons-for-gutenberg" ) }>
				{ map( sizeTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="uagb-size-btn"
						isSmall
						isPrimary={ sizeType === key }
						aria-pressed={ sizeType === key }
						onClick={ () => setAttributes( { sizeType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		);

		const bgSizeTypesControls = (
			<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type","ultimate-addons-for-gutenberg" ) }>
				{ map( sizeTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="uagb-size-btn"
						isSmall
						isPrimary={ bgSizeType === key }
						aria-pressed={ bgSizeType === key }
						onClick={ () => setAttributes( { bgSizeType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		);

		const getSocialShareTemplate = memoize( ( icon_block, socials ) => {
			return times( icon_block, n => [ "uagb/social-share-child", socials[n] ] );
		} );

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
						controls={ [ "left", "center", "right" ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "General","ultimate-addons-for-gutenberg" ) } initialOpen={ true }>
						<SelectControl
							label={ __( "Layout","ultimate-addons-for-gutenberg" ) }
							value={ social_layout }
							options={ [
								{ value: "horizontal", label: __( "Horizontal","ultimate-addons-for-gutenberg" ) },
								{ value: "vertical", label: __( "Vertical","ultimate-addons-for-gutenberg" ) },
							] }
							onChange={ ( value ) => setAttributes( { social_layout: value } ) }
						/>
						{ "horizontal" == social_layout &&
							<Fragment>
								<SelectControl
									label={ __( "Stack on","ultimate-addons-for-gutenberg" ) }
									value={ stack }
									options={ [
										{ value: "none", label: __( "None","ultimate-addons-for-gutenberg" ) },
										{ value: "desktop", label: __( "Desktop","ultimate-addons-for-gutenberg" ) },
										{ value: "tablet", label: __( "Tablet","ultimate-addons-for-gutenberg" ) },
										{ value: "mobile", label: __( "Mobile","ultimate-addons-for-gutenberg" ) },
									] }
									onChange={ ( value ) => setAttributes( { stack: value } ) }
									help={ __( "Note: Choose on what breakpoint the Icons will stack.","ultimate-addons-for-gutenberg" ) }
								/>
							</Fragment>
						}
						<hr className="uagb-editor__separator" />
						<Columnresponsive />
						{ "Desktop" === deviceType && (
							<Fragment>
								{ sizeTypesControls }
								<RangeControl
									label={ __( "Size", "ultimate-addons-for-gutenberg" ) }
									value={ size }
									onChange={ ( value ) => setAttributes( { size: value } ) }
									min={ 0 }
									max={ 500 }
									allowReset
									initialPosition={ 40 }
								/>
							</Fragment>
						) }
						{ "Tablet" === deviceType && (
							<Fragment>
								{ sizeTypesControls }
								<RangeControl
									label={ __( "Size", "ultimate-addons-for-gutenberg" ) }
									value={ sizeTablet }
									onChange={ ( value ) => setAttributes( { sizeTablet: value } ) }
									min={ 0 }
									max={ 500 }
									allowReset
									initialPosition={ 40 }
								/>
							</Fragment>
						) }
						{ "Mobile" === deviceType && (
							<Fragment>
								{ sizeTypesControls }
								<RangeControl
									label={ __( "Size", "ultimate-addons-for-gutenberg" ) }
									value={ sizeMobile }
									onChange={ ( value ) => setAttributes( { sizeMobile: value } ) }
									min={ 0 }
									max={ 500 }
									allowReset
									initialPosition={ 40 }
								/>
							</Fragment>
						) }
						<RangeControl
							label={ __( "Background Size","ultimate-addons-for-gutenberg" ) }
							value={ bgSize }
							onChange={ ( value ) => setAttributes( { bgSize: value } ) }
							help={ __( "Note: Background Size option is useful when one adds background color to the icons.","ultimate-addons-for-gutenberg" ) }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ __( "Border Radius","ultimate-addons-for-gutenberg" ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							help={ __( "Note: Border Radius option is useful when one adds background color to the icons.","ultimate-addons-for-gutenberg" ) }
							min={ 0 }
							max={ 500 }
						/>
						<hr className="uagb-editor__separator" />
						<RangeControl
							label={ __( "Gap between Items","ultimate-addons-for-gutenberg" ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							help={ __( "Note: The gap between the items will seem larger in the editor, for better user edit experience. But at frontend the gap will be exactly what is set from here.","ultimate-addons-for-gutenberg" ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-social-share__outer-wrap",
					`uagb-social-share__layout-${social_layout}`,
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }
				>
					<div className="uagb-social-share__wrap">
						<InnerBlocks
							template={ getSocialShareTemplate( social_count, socials ) }
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS } 
							__experimentalMoverDirection={ social_layout }	
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {
	const { __experimentalGetPreviewDeviceType = null } = select( "core/edit-post" );
	const deviceType = __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : null;

	return {
		deviceType
	};
} )( UAGBSocialShare );
