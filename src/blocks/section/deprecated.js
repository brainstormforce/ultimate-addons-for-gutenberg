/**
 * BLOCK: Price List - Deprecated Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import attributes from './attributes';

import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes,
		save( props ) {
			const { className } = props;

			const {
				block_id,
				tag,
				backgroundType,
				backgroundVideo,
				contentWidth,
				align,
			} = props.attributes;

			let block_controls_class = '';

			if ( 'full_width' == contentWidth ) {
				if ( align == 'wide' || align == 'full' ) {
					block_controls_class = 'align' + align;
				}
			}

			const CustomTag = `${ tag }`;

			return (
				<CustomTag
					className={ classnames(
						className,
						'uagb-section__wrap',
						`uagb-section__background-${ backgroundType }`,
						block_controls_class
					) }
					id={ `uagb-section-${ block_id }` }
				>
					<div className="uagb-section__overlay"></div>
					{ 'video' == backgroundType && (
						<div className="uagb-section__video-wrap">
							{ backgroundVideo && (
								<video
									src={ backgroundVideo.url }
									autoPlay
									loop
									muted
								></video>
							) }
						</div>
					) }
					<div className="uagb-section__inner-wrap">
						<InnerBlocks.Content />
					</div>
				</CustomTag>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const { className } = props;

			const {
				block_id,
				tag,
				backgroundType,
				backgroundVideo,
				contentWidth,
				align,
			} = props.attributes;

			let block_controls_class = '';

			if ( 'full_width' == contentWidth ) {
				if ( align == 'wide' || align == 'full' ) {
					block_controls_class = 'align' + align;
				}
			}

			const CustomTag = `${ tag }`;

			return (
				<CustomTag
					className={ classnames(
						className,
						'uagb-section__wrap',
						`uagb-section__background-${ backgroundType }`,
						block_controls_class
					) }
					id={ `uagb-section-${ block_id }` }
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
		},
	},
];

export default deprecated;
