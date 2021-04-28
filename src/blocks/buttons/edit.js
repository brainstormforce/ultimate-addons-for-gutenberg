/**
 * BLOCK: Multi Buttons
 */

import classnames from "classnames";
import times from "lodash/times";
import styling from "./styling";
import memoize from "memize";

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography";

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader";

const { __ } = wp.i18n;

const {
	Component,
	Fragment,
} = wp.element;

const {
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl
} = wp.components;

const ALLOWED_BLOCKS = [ "uagb/buttons-child" ];
class UAGBMultiButtonEdit extends Component {

	constructor() {
		super( ...arguments );
		this.state = {
			isHovered: "false",
			isFocused: "false",
		};
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );

		// Assigning block_id in the attribute.
		this.props.setAttributes( { classMigrate: true } );
		this.props.setAttributes( { childMigrate : true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" );
		$style.setAttribute( "id", "uagb-style-buttons-" + this.props.clientId.substr( 0, 8 ) );
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.isFocused ) {
			this.setState( {
				isFocused: "false",
			} );
		}

		const element = document.getElementById( "uagb-style-buttons-" + this.props.clientId.substr( 0, 8 ) );

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

	render() {

		const { attributes, setAttributes } = this.props;

		const {
			align,
			className,
			btn_count,
			buttons,
			gap,
			stack,
			loadGoogleFonts,
			fontFamily,
			fontWeight,
			fontSubset,
		} = attributes;

		let loadBtnGoogleFonts;
		if ( loadGoogleFonts == true ) {

			const btnconfig = {
				google: {
					families: [ fontFamily + ( fontWeight ? ":" + fontWeight : "" ) ],
				},
			};

			loadBtnGoogleFonts = (
				<WebfontLoader config={ btnconfig }>
				</WebfontLoader>
			);
		}
		const getButtonTemplate = memoize( ( button_block, buttons ) => {
			return times( button_block, n => [ "uagb/buttons-child", buttons[n] ] );
		} );
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "General", "ultimate-addons-for-gutenberg" ) } initialOpen={ true }>
						<BaseControl>
							<BaseControl.VisualLabel>
								{ __( "Alignment", "ultimate-addons-for-gutenberg" ) }
							</BaseControl.VisualLabel>
							<BlockAlignmentToolbar
								value={ align }
								onChange={ ( value ) =>
									setAttributes( {
										align: value,
									} )
								}
								controls={ [ "left", "center", "right", "full" ] }
								isCollapsed={ false }
							/>
						</BaseControl>
						<h2>{ __( "Spacing", "ultimate-addons-for-gutenberg" ) }</h2>
						<RangeControl
							label={ __( "Gap Between Buttons", "ultimate-addons-for-gutenberg" ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							help={ __( "Note: The gap between the buttons will seem larger in the editor, for better user edit experience. But at frontend the gap will be exactly what is set from here.", "ultimate-addons-for-gutenberg" ) }
							min={ 0 }
							max={ 500 }
						/>
						<hr className="uagb-editor__separator" />
						<SelectControl
							label={ __( "Stack on", "ultimate-addons-for-gutenberg" ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None", "ultimate-addons-for-gutenberg" ) },
								{ value: "desktop", label: __( "Desktop", "ultimate-addons-for-gutenberg" ) },
								{ value: "tablet", label: __( "Tablet", "ultimate-addons-for-gutenberg" ) },
								{ value: "mobile", label: __( "Mobile", "ultimate-addons-for-gutenberg" ) },
							] }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
							help={ __( "Note: Choose on what breakpoint the buttons will stack.", "ultimate-addons-for-gutenberg" ) }
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Typography", "ultimate-addons-for-gutenberg" ) }</h2>
						<TypographyControl
							label={ __( "Typography", "ultimate-addons-for-gutenberg" ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							loadGoogleFonts={ { value: loadGoogleFonts, label: "loadGoogleFonts" } }
							fontFamily={ { value: fontFamily, label:  "fontFamily" } }
							fontWeight={ { value: fontWeight, label:  "fontWeight" } }
							fontSubset={ { value: fontSubset, label: "fontSubset" } }
							disableFontSize={ true }
							disableLineHeight={ true }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-buttons__outer-wrap",
					`uagb-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }
				>
					<div className={ classnames(
						"uagb-buttons__wrap",
						`uagb-buttons-stack-${ stack }`
					) }>
						<InnerBlocks
							template={ getButtonTemplate( btn_count, buttons ) }
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
							__experimentalMoverDirection={ "desktop" == stack ?"vertical" : "horizontal" }
						/>
					</div>
				</div>
				{ loadBtnGoogleFonts }
			</Fragment>
		);
	}
}

export default UAGBMultiButtonEdit;
