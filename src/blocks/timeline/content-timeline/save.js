/**
 * BLOCK: Timeline - Save Block
 */

import classnames from 'classnames';
import ContentTmClasses from '.././classes';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { block_id } = props.attributes;

	return (
		<div
			className={ classnames(
				props.className,
				'uagb-timeline__outer-wrap',
				`uagb-block-${ block_id }`,
				'uagb-timeline__content-wrap',
				...ContentTmClasses( props.attributes )
			) }
		>
			<div className="uagb-timeline__main">
				<div className="uagb-timeline__days">
					<InnerBlocks.Content />
				</div>
				<div className="uagb-timeline__line">
					<div className="uagb-timeline__line__inner"></div>
				</div>
			</div>
		</div>
	);
}
