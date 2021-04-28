/**
 * BLOCK: Column - Save Block
 */

import classnames from "classnames";

const {
	InnerBlocks
} = wp.blockEditor;

export default function save( { attributes, className } ) {
	
	const { block_id, backgroundType, align, alignMobile, alignTablet  } = attributes;

	const align_class = ( "center" == align ) ? "" : `uagb-column__align-${align}`;
	const align_class_mobile = ( "" == alignMobile ) ? "" : `uagb-column__align-mobile-${alignMobile}`;
	const align_class_tablet = ( "" == alignTablet ) ? "" : `uagb-column__align-tablet-${alignTablet}`;

	return (
		<div
			className={ classnames(
				className,
				"uagb-column__wrap",
				`uagb-column__background-${backgroundType}`,
				align_class,
				align_class_mobile,
				align_class_tablet,
				`uagb-block-${block_id}`
			) }
		>
			<div className="uagb-column__overlay"></div>
			<div className="uagb-column__inner-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
