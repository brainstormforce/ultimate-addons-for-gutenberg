import classnames from 'classnames';
import './style.scss';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import React, { useLayoutEffect } from 'react';
import styles from './editor.lazy.scss';

const ALLOWED_BLOCKS = [ 'uagb/info-box' ];

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	// Setup the attributes
	const {
		className,
		attributes,
		setAttributes,
		insertBlocksAfter,
		mergeBlocks,
		onReplace,
		deviceType,
		attributes: {
			currencyType,
			showEstcost,
			showTotaltime,
			showMaterials,
			showTools,
			toolsTitle,
			materialTitle,
			stepsTitle,
			tools,
			materials,
			timeNeeded,
			estCost,
			mainimage,
			headingTitle,
			headingDesc,
			headingTag,
			time,
			cost,
			timeInMins,
			timeInHours,
			timeInDays,
			timeInMonths,
			timeInYears,
		},
	} = props;
	const splitBlock = ( before, after, ...blocks ) => {
		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( 'core/paragraph', { content: after } ) );
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks );
		}

		const { content } = attributes;
		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] );
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } );
		}
	};

	const saveMaterials = ( value, index ) => {
		const newItems = materials.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			materials: newItems,
		} );
	};

	const saveTools = ( value, index ) => {
		const newItems = tools.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			tools: newItems,
		} );
	};

	let urlChk = '';
	let title = '';
	let url = '';
	if (
		'undefined' !== typeof attributes.mainimage &&
		null !== attributes.mainimage &&
		'' !== attributes.mainimage
	) {
		urlChk = attributes.mainimage.url;
		title = attributes.mainimage.title;
	}

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

	const minsValue = timeInMins ? timeInMins : time;

	const getInfoBoxAsChild = [
		[
			'uagb/info-box',
			{
				infoBoxTitle: 'Step 1',
				iconimgPosition: 'left',
				source_type: 'image',
				showPrefix: false,
				seperatorStyle: 'none',
				ctaType: 'all',
				headingTag: 'h4',
			},
		],
		[
			'uagb/info-box',
			{
				infoBoxTitle: 'Step 2',
				iconimgPosition: 'left',
				source_type: 'image',
				showPrefix: false,
				seperatorStyle: 'none',
				ctaType: 'all',
				headingTag: 'h4',
			},
		],
		[
			'uagb/info-box',
			{
				infoBoxTitle: 'Step 3',
				iconimgPosition: 'left',
				source_type: 'image',
				showPrefix: false,
				seperatorStyle: 'none',
				ctaType: 'all',
				headingTag: 'h4',
			},
		],
	];

	//Time Labels
	const yearLabel =
		timeInYears > 1
			? __( 'Years', 'ultimate-addons-for-gutenberg' )
			: __( 'Year', 'ultimate-addons-for-gutenberg' );
	const monthLabel =
		timeInMonths > 1
			? __( ' Months ', 'ultimate-addons-for-gutenberg' )
			: __( ' Month ', 'ultimate-addons-for-gutenberg' );
	const dayLabel =
		timeInDays > 1
			? __( ' Days ', 'ultimate-addons-for-gutenberg' )
			: __( ' Day ', 'ultimate-addons-for-gutenberg' );
	const hourLabel =
		timeInHours > 1
			? __( 'Hours ', 'ultimate-addons-for-gutenberg' )
			: __( ' Hour ', 'ultimate-addons-for-gutenberg' );
	const minsLabel =
		minsValue > 1
			? __( ' Minutes ', 'ultimate-addons-for-gutenberg' )
			: __( ' Minute ', 'ultimate-addons-for-gutenberg' );

	return (
		<div
			className={ classnames(
				className,
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`,
				'uagb-how-to-main-wrap'
			) }
		>
			<RichText
				tagName={ headingTag }
				placeholder={ __(
					'How to configure HowTo Schema in UAG?',
					'ultimate-addons-for-gutenberg'
				) }
				value={ headingTitle }
				className="uagb-howto-heading-text"
				multiline={ false }
				onChange={ ( value ) => {
					setAttributes( { headingTitle: value } );
				} }
				onMerge={ mergeBlocks }
				onSplit={
					insertBlocksAfter
						? ( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', {
										content: after,
									} ),
								] );
						  }
						: undefined
				}
				onRemove={ () => onReplace( [] ) }
			/>
			<RichText
				tagName="p"
				placeholder={ __(
					'So to get started, you will just need to drag-n-drop the How-to Schema block in the Gutenberg editor. The How-to Schema block can be used on pages which contain a How-to in their title and describe steps to achieve certain requirements.',
					'ultimate-addons-for-gutenberg'
				) }
				value={ headingDesc }
				className="uagb-howto-desc-text"
				onChange={ ( value ) =>
					setAttributes( { headingDesc: value } )
				}
				onMerge={ mergeBlocks }
				onSplit={ splitBlock }
				onRemove={ () => onReplace( [] ) }
			/>
			<div className="uagb-howto__source-wrap">{ imageIconHtml }</div>
			<span className="uagb-howto__time-wrap">
				{ showTotaltime && (
					<RichText
						tagName="h4"
						placeholder={ __(
							'Total Time Needed ( Minutes ):',
							'ultimate-addons-for-gutenberg'
						) }
						value={ timeNeeded }
						className="uagb-howto-timeNeeded-text"
						onChange={ ( value ) =>
							setAttributes( { timeNeeded: value } )
						}
						onMerge={ mergeBlocks }
						onSplit={ splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				) }
				{ showTotaltime && (
					<>
						{ timeInYears && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ ' ' }
									{ timeInYears }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ ' ' }
									{ yearLabel }
								</p>
							</>
						) }
						{ timeInMonths && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ timeInMonths }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ monthLabel }
								</p>
							</>
						) }
						{ timeInDays && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ timeInDays }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ dayLabel }
								</p>
							</>
						) }
						{ timeInHours && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ timeInHours }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ hourLabel }
								</p>
							</>
						) }
						{ minsValue && (
							<>
								<p className="uagb-howto-timeNeeded-value">
									{ minsValue }
								</p>
								<p className="uagb-howto-timeINmin-text">
									{ minsLabel }
								</p>
							</>
						) }
					</>
				) }
			</span>
			<span className="uagb-howto__cost-wrap">
				{ showEstcost && (
					<RichText
						tagName="h4"
						placeholder={ __(
							'Total Cost:',
							'ultimate-addons-for-gutenberg'
						) }
						value={ estCost }
						className="uagb-howto-estcost-text"
						onChange={ ( value ) =>
							setAttributes( { estCost: value } )
						}
						onMerge={ mergeBlocks }
						onSplit={ splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				) }
				{ showEstcost && (
					<RichText
						tagName="p"
						placeholder={ __(
							'30',
							'ultimate-addons-for-gutenberg'
						) }
						value={ cost }
						className="uagb-howto-estcost-value"
						onChange={ ( value ) =>
							setAttributes( { cost: value } )
						}
						onMerge={ mergeBlocks }
						onSplit={ splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				) }
				{ showEstcost && (
					<RichText
						tagName="p"
						placeholder={ __(
							'USD',
							'ultimate-addons-for-gutenberg'
						) }
						value={ currencyType }
						className="uagb-howto-estcost-type"
						onChange={ ( value ) =>
							setAttributes( { currencyType: value } )
						}
						onMerge={ mergeBlocks }
						onSplit={ splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				) }
			</span>
			<div className="uagb-how-to-tools__wrap">
				{ showTools && (
					<RichText
						tagName="h4"
						placeholder={ __(
							'requirements tools:',
							'ultimate-addons-for-gutenberg'
						) }
						value={ toolsTitle }
						className="uagb-howto-req-tools-text"
						onChange={ ( value ) =>
							setAttributes( { toolsTitle: value } )
						}
						onMerge={ mergeBlocks }
						onSplit={ splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				) }
				{ showTools && (
					<div className="uagb-how-to-tools">
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
										<RichText
											tagName="div"
											placeholder={ __(
												'Requirements Tools:',
												'ultimate-addons-for-gutenberg'
											) }
											value={ tool.add_required_tools }
											onChange={ ( value ) => {
												saveTools(
													{
														add_required_tools: value,
													},
													index
												);
											} }
											className="uagb-tools__label"
											placeholder={ __(
												'Description',
												'ultimate-addons-for-gutenberg'
											) }
											multiline={ false }
											allowedFormats={ [
												'core/bold',
												'core/italic',
												'core/strikethrough',
											] }
										/>
									</div>
								</div>
							);
						} ) }
					</div>
				) }
				{ showMaterials && (
					<RichText
						tagName="h4"
						placeholder={ __(
							'requirements materials:',
							'ultimate-addons-for-gutenberg'
						) }
						value={ materialTitle }
						className="uagb-howto-req-materials-text"
						onChange={ ( value ) =>
							setAttributes( { materialTitle: value } )
						}
						onMerge={ mergeBlocks }
						onSplit={ splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				) }
				{ showMaterials && (
					<>
						{ materials.map( ( material, index ) => {
							return (
								<div
									className={ classnames(
										`uagb-how-to-materials-${ index }`,
										'uagb-how-to-materials-child__wrapper'
									) }
									key={ index }
								>
									<div className="uagb-materials">
										<RichText
											tagName="div"
											placeholder={ __(
												'Requirements Materials:',
												'ultimate-addons-for-gutenberg'
											) }
											value={
												material.add_required_materials
											}
											onChange={ ( value ) => {
												saveMaterials(
													{
														add_required_materials: value,
													},
													index
												);
											} }
											className="uagb-materials__label"
											placeholder={ __(
												'Description',
												'ultimate-addons-for-gutenberg'
											) }
											multiline={ false }
											allowedFormats={ [
												'core/bold',
												'core/italic',
												'core/strikethrough',
											] }
										/>
									</div>
								</div>
							);
						} ) }
					</>
				) }
			</div>
			<div className="uagb-how-to-steps__wrap">
				<RichText
					tagName="h4"
					placeholder={ __(
						'requirements Steps:',
						'ultimate-addons-for-gutenberg'
					) }
					value={ stepsTitle }
					className="uagb-howto-req-steps-text"
					onChange={ ( value ) =>
						setAttributes( { stepsTitle: value } )
					}
					onMerge={ mergeBlocks }
					onSplit={ splitBlock }
					onRemove={ () => onReplace( [] ) }
				/>
				<InnerBlocks
					template={ getInfoBoxAsChild }
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
		</div>
	);
};

export default React.memo( Render );
