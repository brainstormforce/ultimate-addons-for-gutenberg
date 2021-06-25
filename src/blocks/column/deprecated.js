/**
 * BLOCK: Column - Deprecated Block
 */

// Import block dependencies and components.
import classnames from 'classnames';

// Import icon.
import attributes from './attributes';

import { InnerBlocks } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		attributes,
		save( { attributes, className } ) {
			const {
				block_id,
				backgroundType,
				align,
				alignMobile,
				alignTablet,
			} = attributes;

			const align_class =
				'center' == align ? '' : `uagb-column__align-${ align }`;
			const align_class_mobile =
				'' == alignMobile
					? ''
					: `uagb-column__align-mobile-${ alignMobile }`;
			const align_class_tablet =
				'' == alignTablet
					? ''
					: `uagb-column__align-tablet-${ alignTablet }`;

			return (
				<div
					className={ classnames(
						className,
						'uagb-column__wrap',
						`uagb-column__background-${ backgroundType }`,
						align_class,
						align_class_mobile,
						align_class_tablet
					) }
					id={ `uagb-column-${ block_id }` }
				>
					<div className="uagb-column__overlay"></div>
					<div className="uagb-column__inner-wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save( { attributes, className } ) {
			const {
				block_id,
				backgroundType,
				align,
				alignMobile,
				alignTablet,
			} = attributes;

			const align_class =
				'center' == align ? '' : `uagb-column__align-${ align }`;
			const align_class_mobile =
				'' == alignMobile
					? ''
					: `uagb-column__align-mobile-${ alignMobile }`;
			const align_class_tablet =
				'' == alignTablet
					? ''
					: `uagb-column__align-tablet-${ alignTablet }`;

			return (
				<div
					className={ classnames(
						className,
						'uagb-column__wrap',
						`uagb-column__background-${ backgroundType }`,
						align_class,
						align_class_mobile,
						align_class_tablet,
						`uagb-block-${ block_id }`
					) }
				>
					<div className="uagb-column__overlay"></div>
					<div className="uagb-column__inner-wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
