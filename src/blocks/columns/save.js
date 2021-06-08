/**
 * BLOCK: Columns - Frontend Render.
 */

import classnames from 'classnames';
import shapes from './shapes';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;

	const {
		block_id,
		tag,
		backgroundType,
		backgroundVideo,
		align,
		columns,
		stack,
		vAlign,
		columnGap,
		topType,
		bottomType,
		bottomFlip,
		topFlip,
		reverseTablet,
		reverseMobile,
		topContentAboveShape,
		bottomContentAboveShape,
	} = attributes;

	const CustomTag = `${ tag }`;

	const topDividerHtml = topType != 'none' && (
		<div
			className={ classnames(
				'uagb-columns__shape',
				'uagb-columns__shape-top',
				{ 'uagb-columns__shape-flip': topFlip === true },
				{
					'uagb-columns__shape-above-content':
						topContentAboveShape === true,
				}
			) }
		>
			{ shapes[ topType ] }
		</div>
	);

	const bottomDividerHtml = bottomType != 'none' && (
		<div
			className={ classnames(
				'uagb-columns__shape',
				'uagb-columns__shape-bottom',
				{ 'uagb-columns__shape-flip': bottomFlip === true },
				{
					'uagb-columns__shape-above-content':
						bottomContentAboveShape === true,
				}
			) }
			data-negative="false"
		>
			{ shapes[ bottomType ] }
		</div>
	);

	const reverseTabletClass = reverseTablet
		? 'uagb-columns__reverse-tablet'
		: '';

	const reverseMobileClass = reverseMobile
		? 'uagb-columns__reverse-mobile'
		: '';

	return (
		<CustomTag
			className={ classnames(
				className,
				'uagb-columns__wrap',
				`uagb-columns__background-${ backgroundType }`,
				`uagb-columns__stack-${ stack }`,
				`uagb-columns__valign-${ vAlign }`,
				`uagb-columns__gap-${ columnGap }`,
				`align${ align }`,
				reverseTabletClass,
				reverseMobileClass,
				`uagb-block-${ block_id }`,
				`uagb-columns__columns-${ columns }`
			) }
		>
			<div className="uagb-columns__overlay"></div>
			{ topDividerHtml }
			{ 'video' == backgroundType && (
				<div className="uagb-columns__video-wrap">
					{ backgroundVideo && (
						<video autoPlay loop muted playsinline>
							<source
								src={ backgroundVideo.url }
								type="video/mp4"
							/>
						</video>
					) }
				</div>
			) }
			<InnerBlocks.Content />
			{ bottomDividerHtml }
		</CustomTag>
	);
}
