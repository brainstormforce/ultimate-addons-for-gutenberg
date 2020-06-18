/**
 * BLOCK: Columns - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import shapes from "./shapes"
// Import icon.
import attributes from "./attributes"

const {
	InnerBlocks
} = wp.blockEditor

const { __ } = wp.i18n

const deprecated = [
	{
		attributes,			
		save: function( props ) {

			const { attributes, className } = props

			const {
				block_id,
				tag,
				backgroundType,
				backgroundVideo,
				contentWidth,
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
			} = props.attributes

			const CustomTag = `${tag}`

			const top_divider_html = (
				topType != "none" && (
					<div
						className={ classnames(
							"uagb-columns__shape",
							"uagb-columns__shape-top",
							{ "uagb-columns__shape-flip": topFlip === true },
							{ "uagb-columns__shape-above-content": topContentAboveShape === true }
						) }>
						{shapes[topType]}
					</div>
				)
			)

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
						{shapes[bottomType]}
					</div>
				)
			)

			const reverse_tablet = ( reverseTablet ) ? "uagb-columns__reverse-tablet" : ""

			const reverse_mobile = ( reverseMobile ) ? "uagb-columns__reverse-mobile" : ""

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
						reverse_mobile
					) }
					id={ `uagb-columns-${block_id}` }
				>
					<div className="uagb-columns__overlay"></div>
					{ top_divider_html }
					{ "video" == backgroundType &&
						<div className="uagb-columns__video-wrap">
							{  backgroundVideo &&
								<video src={ backgroundVideo.url } autoPlay loop muted></video>
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
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const { attributes, className } = props

			const {
				block_id,
				tag,
				backgroundType,
				backgroundVideo,
				contentWidth,
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
			} = props.attributes

			const CustomTag = `${tag}`

			const top_divider_html = (
				topType != "none" && (
					<div
						className={ classnames(
							"uagb-columns__shape",
							"uagb-columns__shape-top",
							{ "uagb-columns__shape-flip": topFlip === true },
							{ "uagb-columns__shape-above-content": topContentAboveShape === true }
						) }>
						{shapes[topType]}
					</div>
				)
			)

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
						{shapes[bottomType]}
					</div>
				)
			)

			const reverse_tablet = ( reverseTablet ) ? "uagb-columns__reverse-tablet" : ""

			const reverse_mobile = ( reverseMobile ) ? "uagb-columns__reverse-mobile" : ""

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
						reverse_mobile
					) }
					id={ `uagb-columns-${block_id}` }
				>
					<div className="uagb-columns__overlay"></div>
					{ top_divider_html }
					{ "video" == backgroundType &&
						<div className="uagb-columns__video-wrap">
							{  backgroundVideo &&
								<video autoplay loop muted playsinline>
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
			)
		}
	},
	{
		attributes,
		save : function( props ) {

			const { attributes, className } = props
	
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
			} = attributes
	
			const CustomTag = `${tag}`
	
			const top_divider_html = (
				topType != "none" && (
					<div
						className={ classnames(
							"uagb-columns__shape",
							"uagb-columns__shape-top",
							{ "uagb-columns__shape-flip": topFlip === true },
							{ "uagb-columns__shape-above-content": topContentAboveShape === true }
						) }>
						{shapes[topType]}
					</div>
				)
			)
	
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
						{shapes[bottomType]}
					</div>
				)
			)
	
			const reverse_tablet = ( reverseTablet ) ? "uagb-columns__reverse-tablet" : ""
	
			const reverse_mobile = ( reverseMobile ) ? "uagb-columns__reverse-mobile" : ""
	
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
								<video autoplay loop muted playsinline>
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
			)
		}
	}
]

export default deprecated;