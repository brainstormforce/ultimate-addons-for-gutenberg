/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { className } = props;

	const { block_id, social_layout } = props.attributes;

	return (
		<div
			className={ classnames(
				className,
				'uagb-social-share__outer-wrap',
				`uagb-social-share__layout-${ social_layout }`,
				`uagb-block-${ block_id }`
			) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
