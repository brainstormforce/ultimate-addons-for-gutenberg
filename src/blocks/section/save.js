/**
 * BLOCK: Column - Save Block
 */

import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;

	const {
		block_id,
		tag,
		backgroundType,
		backgroundVideo,
		contentWidth,
		align,
	} = attributes;

	let blockControlsClass = '';

	if ( 'full_width' == contentWidth ) {
		if ( align == 'wide' || align == 'full' ) {
			blockControlsClass = 'align' + align;
		}
	}

	const CustomTag = `${ tag }`;

	return (
		<CustomTag
			className={ classnames(
				className,
				'uagb-section__wrap',
				`uagb-section__background-${ backgroundType }`,
				blockControlsClass,
				`uagb-block-${ block_id }`
			) }
		>
			<div className="uagb-section__overlay"></div>
			{ 'video' == backgroundType && (
				<div className="uagb-section__video-wrap">
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
			<div className="uagb-section__inner-wrap">
				<InnerBlocks.Content />
			</div>
		</CustomTag>
	);
}
