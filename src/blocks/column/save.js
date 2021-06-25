/**
 * BLOCK: Column - Frontend Render.
 */

import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const {
		block_id,
		backgroundType,
		align,
		alignMobile,
		alignTablet,
	} = attributes;

	const alignClass = 'center' == align ? '' : `uagb-column__align-${ align }`;
	const alignClassMobile =
		'' == alignMobile ? '' : `uagb-column__align-mobile-${ alignMobile }`;
	const alignClassTablet =
		'' == alignTablet ? '' : `uagb-column__align-tablet-${ alignTablet }`;

	return (
		<div
			className={ classnames(
				className,
				'uagb-column__wrap',
				`uagb-column__background-${ backgroundType }`,
				alignClass,
				alignClassMobile,
				alignClassTablet,
				`uagb-block-${ block_id }`
			) }
		>
			<div className="uagb-column__overlay"></div>
			<InnerBlocks.Content />
		</div>
	);
}
