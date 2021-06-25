/**
 * BLOCK: How-To Schema - Save Block
 */

import classnames from 'classnames';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes, className } = props;

	const {
		block_id,
		headingTitle,
		headingDesc,
		headingTag,
		timeNeeded,
		time,
		estCost,
		cost,
		currencyType,
		mainimage,
		toolsTitle,
		stepsTitle,
		materialTitle,
		tools,
		materials,
		schema,
		showTotaltime,
		showEstcost,
		showTools,
		showMaterials,
		timeInMins,
		timeInHours,
		timeInDays,
		timeInMonths,
		timeInYears,
	} = attributes;

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

	//Time Labels
	const yearlabel = timeInYears > 1 ? ' Years ' : ' Year ';
	const monthlabel = timeInMonths > 1 ? ' Months ' : ' Month ';
	const daylabel = timeInDays > 1 ? ' Days ' : ' Day ';
	const hourlabel = timeInHours > 1 ? 'Hours ' : ' Hour ';

	const minsValue = timeInMins ? timeInMins : time;
	const minslabel = minsValue > 1 ? ' Minutes ' : ' Minute ';

	return (
		<div
			className={ classnames(
				className,
				`uagb-block-${ block_id }`,
				'uagb-how-to-main-wrap'
			) }
		>
			<script type="application/ld+json">{ schema }</script>
			<RichText.Content
				value={ headingTitle }
				tagName={ headingTag }
				className="uagb-howto-heading-text"
			/>
			<RichText.Content
				value={ headingDesc }
				tagName="p"
				className="uagb-howto-desc-text"
			/>
			{ mainimage.url && (
				<div className="uagb-howto__source-wrap">{ imageIconHtml }</div>
			) }
			{ showTotaltime && (
				<span className="uagb-howto__time-wrap">
					<RichText.Content
						value={ timeNeeded }
						tagName="h4"
						className="uagb-howto-timeNeeded-text"
					/>
					<>
						{ timeInYears && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ ' ' }
									{ timeInYears }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ ' ' }
									{ yearlabel }
								</p>
							</>
						) }
						{ timeInMonths && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ timeInMonths }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ monthlabel }
								</p>
							</>
						) }
						{ timeInDays && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ timeInDays }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ daylabel }
								</p>
							</>
						) }
						{ timeInHours && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ timeInHours }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ hourlabel }
								</p>
							</>
						) }
						{ minsValue && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ minsValue }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ minslabel }
								</p>
							</>
						) }
					</>
				</span>
			) }
			{ showEstcost && (
				<span className="uagb-howto__cost-wrap">
					<RichText.Content
						value={ estCost }
						tagName="h4"
						className="uagb-howto-estcost-text"
					/>
					<RichText.Content
						value={ cost }
						tagName="p"
						className="uagb-howto-estcost-value"
					/>
					<RichText.Content
						tagName="p"
						value={ currencyType }
						className="uagb-howto-estcost-type"
					/>
				</span>
			) }
			{ showTools && (
				<div className="uagb-how-to-tools__wrap">
					<RichText.Content
						value={ toolsTitle }
						tagName="h4"
						className="uagb-howto-req-tools-text"
					/>
				</div>
			) }
			{ showTools && (
				<>
					{ tools.map( ( tool, index ) => {
						return (
							<div
								className={ classnames(
									`uagb-how-to-tools-${ index }`,
									'uagb-how-to-tools-child__wrapper'
								) }
								key={ index }
							>
								<div className="uagb-tools">
									<RichText.Content
										tagName="div"
										value={ tool.add_required_tools }
										className="uagb-tools__label"
									/>
								</div>
							</div>
						);
					} ) }
				</>
			) }
			{ showMaterials && (
				<RichText.Content
					value={ materialTitle }
					tagName="h4"
					className="uagb-howto-req-materials-text"
				/>
			) }
			{ showMaterials && (
				<>
					{ materials.map( ( material, index ) => {
						return (
							<div
								key={ index }
								className={ classnames(
									`uagb-how-to-materials-${ index }`,
									'uagb-how-to-materials-child__wrapper'
								) }
							>
								<div className="uagb-materials">
									<RichText.Content
										tagName="div"
										value={
											material.add_required_materials
										}
										className="uagb-materials__label"
									/>
								</div>
							</div>
						);
					} ) }
				</>
			) }
			<div className="uagb-how-to-steps__wrap">
				<RichText.Content
					value={ stepsTitle }
					tagName="h4"
					className="uagb-howto-req-steps-text"
				/>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
