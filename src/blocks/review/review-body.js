import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import Stars from './star';

const ReviewBody = ( props ) => {
	const {
		ID,
		items,
		summaryTitle,
		summaryDescription,
		starCount,
		setItems,
		setSummaryDescription,
		setSummaryTitle,
		setTitle,
		setDescription,
		setAuthorName,
		inactiveStarColor,
		activeStarColor,
		selectedStarColor,
		starOutlineColor,
		ctaTarget,
		ctaLink,
		setActiveStarIndex,
		rTitle,
		rContent,
		rAuthor,
		headingTag,
		image_icon_html,
		showfeature,
		imageEnabled,
		descriptionEnabled,
		showauthor,
	} = props;

	const { average } = props.state;

	const newAverage =
		items.map( ( i ) => i.value ).reduce( ( total, v ) => total + v ) /
		items.length;

	if ( average !== newAverage ) {
		props.setStateValue( { average: newAverage } );
	}

	let target = '_self';
	const rel = 'noopener noreferrer';
	if ( ctaTarget ) {
		target = '_blank';
	}

	return (
		<div className="uagb_review_block">
			<a
				href={ ctaLink }
				className="uagb-rating-link-wrapper"
				target={ target }
				rel={ rel }
			>
				<RichText
					tagName={ headingTag }
					placeholder={ __(
						'Title of the review',
						'ultimate-addons-for-gutenberg'
					) }
					keepPlaceholderOnFocus
					value={ rTitle }
					className="uagb-rating-title"
					onChange={ ( text ) => setTitle( text ) }
				/>
			</a>
			{ descriptionEnabled === true && (
				<RichText
					tagName="p"
					placeholder={ __(
						'Review Description',
						'ultimate-addons-for-gutenberg'
					) }
					keepPlaceholderOnFocus
					value={ rContent }
					className="uagb-rating-desc"
					onChange={ ( text ) => setDescription( text ) }
				/>
			) }
			{ showauthor === true && (
				<RichText
					tagName="p"
					placeholder={ __(
						'Review Author',
						'ultimate-addons-for-gutenberg'
					) }
					keepPlaceholderOnFocus
					value={ rAuthor }
					className="uagb-rating-author"
					onChange={ ( text ) => setAuthorName( text ) }
				/>
			) }
			{ imageEnabled === true && (
				<div className="uagb-rating__source-wrap">
					{ image_icon_html }
				</div>
			) }
			{ items.map(
				( j, i ) =>
					showfeature === true && (
						<div className="uagb_review_entry" key={ i }>
							<RichText
								style={ { marginRight: 'auto' } }
								placeholder={ __( 'Edit feature' ) }
								value={ j.label }
								onChange={ ( text ) =>
									setItems( [
										...items.slice( 0, i ),
										{ label: text, value: j.value },
										...items.slice( i + 1 ),
									] )
								}
							/>
							<div
								style={ {
									marginLeft: 'auto',
									minWidth: items.length > 1 ? 120 : 100,
								} }
							>
								{ items.length > 1 && (
									<div
										className="dashicons dashicons-trash"
										onClick={ () => {
											const newItems = items
												.slice( 0, i )
												.concat(
													items.slice(
														i + 1,
														items.length
													)
												);
											setItems( newItems );
											props.setStateValue( {
												average:
													newItems
														.map( ( k ) => k.value )
														.reduce(
															( total, v ) =>
																total + v
														) / newItems.length,
											} );
										} }
									/>
								) }
								<Stars
									id={ `${ ID }-${ i }` }
									key={ i }
									value={ j.value }
									limit={ starCount }
									setValue={ ( newValue ) => {
										const newArray = [
											...items.slice( 0, i ),
											{ label: j.label, value: newValue },
											...items.slice( i + 1 ),
										];
										setItems( newArray );
										setActiveStarIndex( i );
										props.setStateValue( {
											average:
												newArray
													.map( ( k ) => k.value )
													.reduce(
														( total, v ) =>
															total + v
													) / newArray.length,
										} );
									} }
									inactiveStarColor={ inactiveStarColor }
									activeStarColor={ activeStarColor }
									selectedStarColor={ selectedStarColor }
									starOutlineColor={ starOutlineColor }
									state={ props.starState }
									setStateValue={ props.starSetStateValue }
								/>
							</div>
						</div>
					)
			) }
			{ showfeature === true && (
				<div
					title={ __( 'Insert new review entry' ) }
					onClick={ () => {
						setItems( [ ...items, { label: '', value: 0 } ] );
						props.setStateValue( {
							average: average / ( items.length + 1 ),
						} );
					} }
					className="uagb_review_add_entry dashicons dashicons-plus-alt"
				/>
			) }
			<div className="uagb_review_summary">
				<RichText
					className="uagb_review_summary_title"
					placeholder={ __(
						'Title of the summary goes here',
						'ultimate-addons-for-gutenberg'
					) }
					tagName="p"
					onChange={ ( text ) => setSummaryTitle( text ) }
					value={ summaryTitle }
				/>
				<div className="uagb_review_overall_value">
					<RichText
						placeholder={ __(
							'Summary of the review goes here',
							'ultimate-addons-for-gutenberg'
						) }
						onChange={ ( text ) => setSummaryDescription( text ) }
						value={ summaryDescription }
					/>
					<div className="uagb_review_average">
						<span className="uagb_review_rating">
							{ Math.round( average * 10 ) / 10 }
						</span>
						<Stars
							id={ `${ ID }-average` }
							className="uagb_review_average_stars"
							onHover={ () => null }
							onClick={ () => null }
							value={ average }
							limit={ starCount }
							inactiveStarColor={ inactiveStarColor }
							activeStarColor={ activeStarColor }
							selectedStarColor={ selectedStarColor }
							starOutlineColor={ starOutlineColor }
							state={ props.starState }
							setStateValue={ props.starSetStateValue }
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ReviewBody;
