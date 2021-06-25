/**
 * BLOCK: Tabs Child - Save Block
 */
import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;
	const { id, block_id } = attributes;

	return (
		<div
			className={ `uagb-tabs__body-container uagb-tabs__inner-tab uagb-inner-tab-${ id }` }
		>
			<div
				className={ classnames(
					className,
					`uagb-blocks__${ block_id }`,
					'uagb-tabs__body'
				) }
				aria-labelledby={ `uagb-tabs__tab${ id }` }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
