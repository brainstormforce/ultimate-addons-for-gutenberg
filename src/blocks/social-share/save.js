/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
import links from "./links";

const {
	InnerBlocks
} = wp.blockEditor;

export default function save( props ) {

	const { attributes, className } = props;

	const {
		block_id,
		align,
		items,
		socials,
		social_count,
		social_layout,
	} = props.attributes;

	return (
		<div className={ classnames(
			className,
			"uagb-social-share__outer-wrap",
			`uagb-social-share__layout-${social_layout}`,
			`uagb-block-${ block_id}`
		) }>
			<div className="uagb-social-share__wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
