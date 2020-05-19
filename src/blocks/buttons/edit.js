/**
 * BLOCK: Multi Buttons
 */

import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import styling from "./styling"
import memoize from "memize"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl
} = wp.components

const ALLOWED_BLOCKS = [ "uagb/buttons-child" ]
class UAGBMultiButtonEdit extends Component {

	constructor() {
		super( ...arguments )
		this.state = {
			isHovered: "false",
			isFocused: "false",
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Assigning block_id in the attribute.
		this.props.setAttributes( { classMigrate: true } )
		this.props.setAttributes( { childMigrate : true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-buttons-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.isFocused ) {
			this.setState( {
				isFocused: "false",
			} )
		}
	}

	render() {

		const { attributes, setAttributes } = this.props

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
		} = attributes

		var element = document.getElementById( "uagb-style-buttons-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		let loadBtnGoogleFonts
		if( loadGoogleFonts == true ) {

			const btnconfig = {
				google: {
					families: [ fontFamily + ( fontWeight ? ":" + fontWeight : "" ) ],
				},
			}

			loadBtnGoogleFonts = (
				<WebfontLoader config={ btnconfig }>
				</WebfontLoader>
			)
		}
		const getButtonTemplate = memoize( ( button_block, buttons ) => {
			return times( button_block, n => [ "uagb/buttons-child", buttons[n] ] )
		} )
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "General" ) } initialOpen={ true }>
						<BaseControl>
							<BaseControl.VisualLabel>
								{ __( 'Alignment' ) }
							</BaseControl.VisualLabel>
							<BlockAlignmentToolbar
								value={ align }
								onChange={ ( value ) =>
									setAttributes( {
										align: value,
									} )
								}
								controls={ [ 'left', 'center', 'right', 'full' ] }
								isCollapsed={ false }
							/>
						</BaseControl>
						<h2>{ __( "Spacing" ) }</h2>
						<RangeControl
							label={ __( "Gap Between Buttons" ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							help={ __( "Note: The gap between the buttons will seem larger in the editor, for better user edit experience. But at frontend the gap will be exactly what is set from here." ) }
							min={ 0 }
							max={ 500 }
						/>
						<hr className="uagb-editor__separator" />
						<SelectControl
							label={ __( "Stack on" ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "desktop", label: __( "Desktop" ) },
								{ value: "tablet", label: __( "Tablet" ) },
								{ value: "mobile", label: __( "Mobile" ) },
							] }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
							help={ __( "Note: Choose on what breakpoint the buttons will stack." ) }
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Typography" ) }</h2>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: loadGoogleFonts, label: "loadGoogleFonts" } }
							fontFamily = { { value: fontFamily, label:  "fontFamily" } }
							fontWeight = { { value: fontWeight, label:  "fontWeight" } }
							fontSubset = { { value: fontSubset, label: "fontSubset" } }
							disableFontSize={true}
							disableLineHeight={true}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-buttons__outer-wrap",
					`uagb-block-${ this.props.clientId }`
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
							__experimentalMoverDirection={ 'desktop' == stack ?'vertical' : 'horizontal' }
						/>
					</div>
				</div>
				{ loadBtnGoogleFonts }
			</Fragment>
		)
	}
}

export default UAGBMultiButtonEdit
