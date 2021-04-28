/**
 * BLOCK: Columns
 */

import classnames from "classnames";
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons";
import attributes from "./attributes";
import edit from "./edit";
import deprecated from "./deprecated";
import shapes from "./shapes";
import variations from "./variations";
import "./style.scss";
import "./editor.scss";


const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	InnerBlocks,
} = wp.blockEditor;

registerBlockType( "uagb/columns", {
	title: uagb_blocks_info.blocks["uagb/columns"].title,
	description: uagb_blocks_info.blocks["uagb/columns"].description,
	icon: UAGB_Block_Icons.columns,
	category: uagb_blocks_info.category,
	keywords: [
		__( "columns", "ultimate-addons-for-gutenberg" ),
		__( "rows", "ultimate-addons-for-gutenberg" ),
		__( "uag", "ultimate-addons-for-gutenberg" ),
	],
	attributes,
	variations,
	edit,
	getEditWrapperProps( attributes ) {
		return { "data-align": attributes.align };
		return { "data-valign": attributes.vAlign };
	},
	supports: {
		// Add EditorsKit block navigator toolbar
		editorsKitBlockNavigator: true,
		anchor: true,
	},
	example: {},
	save( props ) {

		const { attributes, className } = props;

		const {
			block_id,
			tag,
			backgroundType,
			backgroundVideo,
			align,
			columns,
			stack,
			vAlign,
			columnGap,
			topType,
			bottomType,
			bottomFlip,
			topFlip,
			reverseTablet,
			reverseMobile,
			topContentAboveShape,
			bottomContentAboveShape
		} = attributes;

		const CustomTag = `${tag}`;

		const top_divider_html = (
			topType != "none" && (
				<div
					className={ classnames(
						"uagb-columns__shape",
						"uagb-columns__shape-top",
						{ "uagb-columns__shape-flip": topFlip === true },
						{ "uagb-columns__shape-above-content": topContentAboveShape === true }
					) }>
					{ shapes[topType] }
				</div>
			)
		);

		const bottom_divider_html = (
			bottomType != "none" && (
				<div
					className={ classnames(
						"uagb-columns__shape",
						"uagb-columns__shape-bottom",
						{ "uagb-columns__shape-flip": bottomFlip === true },
						{ "uagb-columns__shape-above-content": bottomContentAboveShape === true }
					) }
					data-negative="false">
					{ shapes[bottomType] }
				</div>
			)
		);

		const reverse_tablet = ( reverseTablet ) ? "uagb-columns__reverse-tablet" : "";

		const reverse_mobile = ( reverseMobile ) ? "uagb-columns__reverse-mobile" : "";

		return (
			<CustomTag
				className={ classnames(
					className,
					"uagb-columns__wrap",
					`uagb-columns__background-${backgroundType}`,
					`uagb-columns__stack-${stack}`,
					`uagb-columns__valign-${vAlign}`,
					`uagb-columns__gap-${columnGap}`,
					`align${ align }`,
					reverse_tablet,
					reverse_mobile,
					`uagb-block-${block_id}`
				) }
			>
				<div className="uagb-columns__overlay"></div>
				{ top_divider_html }
				{ "video" == backgroundType &&
					<div className="uagb-columns__video-wrap">
						{  backgroundVideo &&
							<video autoPlay loop muted playsinline>
								<source src={ backgroundVideo.url } type='video/mp4' />
							</video>
						}

					</div>
				}
				<div className={ classnames(
					"uagb-columns__inner-wrap",
					`uagb-columns__columns-${columns}`
				) }>
					<InnerBlocks.Content />
				</div>
				{ bottom_divider_html }
			</CustomTag>
		);
	},
	deprecated,
} );
