/**
 * BLOCK: Review block - Save Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import Stars from './star';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;

	const {
		enableSchema,
		rTitle,
		rContent,
		mainimage,
		rAuthor,
		headingTag,
		starCount,
		ID,
		parts,
		summaryTitle,
		summaryDescription,
		inactiveStarColor,
		activeStarColor,
		selectedStarColor,
		starOutlineColor,
		schema,
		block_id,
		showAuthor,
		showFeature,
		enableDescription,
		enableImage,
		ctaTarget,
		ctaLink,
	} = attributes;

	const newAverage =
		parts.map( ( i ) => i.value ).reduce( ( total, v ) => total + v ) /
		parts.length;

	let urlChk = '';
	let title = '';
	if (
		'undefined' !== typeof attributes.mainimage &&
		null !== attributes.mainimage &&
		'' !== attributes.mainimage
	) {
		urlChk = attributes.mainimage.url;
		title = attributes.mainimage.title;
	}

	let url = '';
	if ( '' !== urlChk ) {
		const size = attributes.mainimage.sizes;
		const imageSize = attributes.imgSize;

		if (
			'undefined' !== typeof size &&
			'undefined' !== typeof size[ imageSize ]
		) {
			url = size[ imageSize ].url;
		} else {
			url = urlChk;
		}
	}

	let imageIconHtml = '';

	if ( mainimage && mainimage.url ) {
		imageIconHtml = (
			<img
				className="uagb-howto__source-image"
				src={ url }
				title={ title }
				alt=""
			/>
		);
	}

	const rel = 'noopener noreferrer';
	let target = '';
	if ( ctaTarget ) {
		target = '_blank';
	}

	return (
		<div
			className={ classnames(
				className,
				'uagb-ratings__outer-wrap',
				`uagb-block-${ block_id.substr( 0, 8 ) }`
			) }
		>
			{ enableSchema && (
				<script type="application/ld+json">{ schema }</script>
			) }
			<div className="uagb_review_block">
				<a
					href={ ctaLink }
					className={ classnames( 'uagb-rating-link-wrapper' ) }
					target={ target }
					rel={ rel }
				>
					<RichText.Content
						value={ rTitle }
						className="uagb-rating-title"
						tagName={ headingTag }
					/>
				</a>
				{ enableDescription === true && (
					<RichText.Content
						tagName="p"
						value={ rContent }
						className="uagb-rating-desc"
					/>
				) }
				{ showAuthor === true && (
					<RichText.Content
						tagName="p"
						value={ rAuthor }
						className="uagb-rating-author"
					/>
				) }
				{ enableImage === true && (
					<div className="uagb-rating__source-wrap">
						{ imageIconHtml }
					</div>
				) }
				{ parts.map(
					( j, i ) =>
						showFeature === true && (
							<div className="uagb_review_entry">
								<RichText.Content
									tagName="div"
									value={ j.label }
								/>
								<div
									key={ i }
									style={ {
										marginLeft: 'auto',
										minWidth: parts.length > 1 ? 120 : 100,
									} }
								>
									<Stars
										id={ `${ i }` }
										key={ i }
										value={ j.value }
										limit={ starCount }
										inactiveStarColor={ inactiveStarColor }
										activeStarColor={ activeStarColor }
										selectedStarColor={ selectedStarColor }
										starOutlineColor={ starOutlineColor }
									/>
								</div>
							</div>
						)
				) }
				<div className="uagb_review_summary">
					<RichText.Content
						className="uagb_review_summary_title"
						tagName="p"
						value={ summaryTitle }
					/>
					<div className="uagb_review_overall_value">
						<RichText.Content
							className="uagb_review_summary_desc"
							tagName="p"
							value={ summaryDescription }
						/>
						<div className="uagb_review_average">
							<span className="uagb_review_rating">
								{ Math.round( newAverage * 10 ) / 10 }
							</span>
							<Stars
								id={ `${ ID }-average` }
								className="uagb_review_average_stars"
								onHover={ () => null }
								onClick={ () => null }
								value={ newAverage }
								limit={ starCount }
								inactiveStarColor={ inactiveStarColor }
								activeStarColor={ activeStarColor }
								selectedStarColor={ selectedStarColor }
								starOutlineColor={ starOutlineColor }
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
