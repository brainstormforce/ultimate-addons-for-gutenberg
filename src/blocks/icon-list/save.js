/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;

	const { block_id, icon_layout, hideLabel, iconPosition } = attributes;

	const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

	return (
		<div
			className={ classnames(
				className,
				'uagb-icon-list__outer-wrap',
				`uagb-icon-list__layout-${ icon_layout }`,
				iconPosition == 'top' ? 'uagb-icon-list__icon-at-top' : '',
				labelClass,
				`uagb-block-${ block_id }`
			) }
		>
			<div className="uagb-icon-list__wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
