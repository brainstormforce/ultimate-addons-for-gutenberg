/**
 * BLOCK: Table of Contents - Deprecated Block
 */

import classnames from "classnames"
import TableOfContents from './deprecated/components';
import TOC from './deprecated/table-of-contents';
import TableOfContent from './deprecated/toc';
import attributes from "./attributes"
import renderSVG from "@Controls/renderIcon"

const {
	RichText
} = wp.blockEditor

const deprecated = [
	{
		attributes,
		save: function( props ) {

			const { className } = props

			const {
				align,
				block_id,
				tColumns,
				heading,
				headerLinks,
				mappingHeaders,
				scrollToTop,
			} = props.attributes

			return (

				<div className={ classnames(
					className,
					`uagb-toc__align-${align}`,
					`uagb-toc__columns-${tColumns}`
				) }
					 id={ `uagb-toc-${ block_id }` }>
					<div className="uagb-toc__wrap">

						<RichText.Content
							value={ heading }
							tagName='div'
							className='uagb-toc__title'
						/>
						<TableOfContents
							align={align}
							numcolumns={tColumns}
							scrollToTop={scrollToTop}
							mappingHeaders={mappingHeaders}
							headers={headerLinks && JSON.parse(headerLinks)}
							blockProp={props}
						/>
					</div>
				</div>
			)
		},
	},
	{
		attributes,
		save: function( props ) {

			const { className } = props

			const {
				align,
				block_id,
				tColumns,
				heading,
				headerLinks,
				mappingHeaders,
				scrollToTop,
				smoothScroll,
				makeCollapsible,
				icon,
				initialCollapse,
				smoothScrollOffset,
				smoothScrollDelay,
			} = props.attributes

			let icon_html = ''

			if ( makeCollapsible && icon ) {
				icon_html = (
					<span className="uag-toc__collapsible-wrap">{renderSVG(icon)}</span>
				)
			}

			return (

				<div className={ classnames(
					className,
					`uagb-toc__align-${align}`,
					`uagb-toc__columns-${tColumns}`,
					( initialCollapse ) ? `uagb-toc__collapse` : ''
				) }
					 data-scroll={smoothScroll}
					 data-offset={smoothScrollOffset}
					 data-delay={smoothScrollDelay}
					 id={ `uagb-toc-${ block_id }` }>
					<div className="uagb-toc__wrap">
						<div className="uagb-toc__title-wrap">
							<RichText.Content
								value={ heading }
								tagName='div'
								className='uagb-toc__title'
							/>
							{icon_html}
						</div>
						<TableOfContents
							align={align}
							numcolumns={tColumns}
							scrollToTop={scrollToTop}
							mappingHeaders={mappingHeaders}
							headers={headerLinks && JSON.parse(headerLinks)}
							blockProp={props}
						/>
					</div>
				</div>
			)
		},
	},
	{
		attributes,
		save: function( props ) {

			const { className } = props

			const {
				align,
				block_id,
				tColumns,
				heading,
				headerLinks,
				mappingHeaders,
				smoothScroll,
				makeCollapsible,
				icon,
				initialCollapse,
				smoothScrollOffset,
				smoothScrollDelay,
			} = props.attributes

			let icon_html = ''

			if ( makeCollapsible && icon ) {
				icon_html = (
					<span className="uag-toc__collapsible-wrap">{renderSVG(icon)}</span>
				)
			}

			return (

				<div className={ classnames(
					className,
					`uagb-toc__align-${align}`,
					`uagb-toc__columns-${tColumns}`,
					( initialCollapse ) ? `uagb-toc__collapse` : '',
					`uagb-block-${ block_id }`
				) }
					 data-scroll={smoothScroll}
					 data-offset={smoothScrollOffset}
					 data-delay={smoothScrollDelay}
				>
					<div className="uagb-toc__wrap">
						<div className="uagb-toc__title-wrap">
							<RichText.Content
								value={ heading }
								tagName='div'
								className='uagb-toc__title'
							/>
							{icon_html}
						</div>
						<TOC
							mappingHeaders={mappingHeaders}
							headers={headerLinks && JSON.parse(headerLinks)}
						/>
					</div>
				</div>
			)
		},
	},
	{
		attributes,
		save: function( props ) {

			const { className } = props

			const {
				align,
				block_id,
				tColumns,
				heading,
				headerLinks,
				mappingHeaders,
				smoothScroll,
				makeCollapsible,
				icon,
				initialCollapse,
				smoothScrollOffset,
				smoothScrollDelay,
			} = props.attributes

			let icon_html = ''

			if ( makeCollapsible && icon ) {
				icon_html = (
					<span className="uag-toc__collapsible-wrap">{renderSVG(icon)}</span>
				)
			}

			return (

				<div className={ classnames(
					className,
					`uagb-toc__align-${align}`,
					`uagb-toc__columns-${tColumns}`,
					( initialCollapse ) ? `uagb-toc__collapse` : '',
					`uagb-block-${ block_id }`
				) }
					 data-scroll={smoothScroll}
					 data-offset={smoothScrollOffset}
					 data-delay={smoothScrollDelay}
				>
					<div className="uagb-toc__wrap">
						<div className="uagb-toc__title-wrap">
							<RichText.Content
								value={ heading }
								tagName='div'
								className='uagb-toc__title'
							/>
							{icon_html}
						</div>
						<TableOfContent
							mappingHeaders={mappingHeaders}
							headers={headerLinks && JSON.parse(headerLinks)}
						/>
					</div>
				</div>
			)
		},
	}
]

export default deprecated;
