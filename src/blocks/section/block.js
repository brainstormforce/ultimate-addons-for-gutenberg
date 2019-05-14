/**
 * BLOCK: Section
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"
import inlineStyles from "./inline-styles"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	InnerBlocks,
} = wp.editor

registerBlockType( "uagb/section", {
	title: uagb_blocks_info.blocks["uagb/section"]["title"],
	description: uagb_blocks_info.blocks["uagb/section"]["description"],
	icon: UAGB_Block_Icons.section,
	category: uagb_blocks_info.category,
	keywords: [
		__( "section" ),
		__( "wrapper" ),
		__( "uag" ),
	],
	attributes,
	edit,
	getEditWrapperProps( attributes ) {
		const { align, contentWidth } = attributes
		if ( "left" === align || "right" === align || "wide" === align || "full" === align ) {
			if ( "full_width" == contentWidth ) {
				return { "data-align": align }
			}
		}
	},
	save : function( props ) {

		const { attributes, className } = props

		const {
			block_id,
			tag,
			backgroundType,
			backgroundImage,
			backgroundVideo,
			contentWidth,
			align
		} = props.attributes

		let block_controls_class = ""

		if ( "full_width" == contentWidth ) {

			if ( align == "wide" || align == "full" ) {
				block_controls_class = "align" + align
			}
		}

		const CustomTag = `${tag}`

		const dynamicBackgroundImage = props.attributes.dynamic && props.attributes.dynamic[ 'backgroundImage' ] ? props.attributes.dynamic[ 'backgroundImage' ] : null;
		const staticBackgroundImage = backgroundImage ? backgroundImage.url : null;
		const dynamicBackgroundImageOrShortcode = ToolsetDynamicSources.getShortcodeOrStatic( dynamicBackgroundImage, staticBackgroundImage, { repeatableFieldShowOnly: 'first' } );

		return (
			<CustomTag
				className={ classnames(
					className,
					"uagb-section__wrap",
					`uagb-section__background-${backgroundType}`,
					block_controls_class
				) }
				id={ `uagb-section-${block_id}` }
				style={
					!! dynamicBackgroundImageOrShortcode ?
					{
						backgroundImage: `url( ${ dynamicBackgroundImageOrShortcode } )`
					} :
					null
				}
				style={ { backgroundImage: `url( ${ dynamicBackgroundImageOrShortcode } )` } }
			>
				<div className="uagb-section__overlay"></div>
				{ "video" == backgroundType &&
					<div className="uagb-section__video-wrap">
						{  backgroundVideo &&
						<video src={ backgroundVideo.url } autoPlay loop muted></video>
						}

					</div>
				}
				<div className="uagb-section__inner-wrap">
					<InnerBlocks.Content />
				</div>
			</CustomTag>
		)
	}
} )
