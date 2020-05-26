/**
 * BLOCK: FAQ - Save Block
 */

import classnames from "classnames"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( props ) {
	
	const { className } = props
	const {
		block_id,
		schema,
		enableSchemaSupport,
	} = props.attributes

	const renderSchema = () => {

		if ( true === enableSchemaSupport ) {

			return (
				<script type="application/ld+json">
					{ schema }
				</script>
			)
		}

		return '';
	}
	return (
		<div className={ classnames(
			className,
			"uagb-faq__outer-wrap",
			`uagb-block-${ block_id }`,
			`uagb-faq-icon-${ props.attributes.iconAlign }`,
			`uagb-faq-layout-${ props.attributes.layout }`,
			`uagb-faq-expand-first-${ props.attributes.expandFirstItem }`,
			`uagb-faq-inactive-other-${ props.attributes.inactiveOtherItems }`
		) }
		data-faqtoggle = { props.attributes.enableToggle }
		>
			{ renderSchema() }
			<div className="uagb-faq__wrap uagb-buttons-layout-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	)
}