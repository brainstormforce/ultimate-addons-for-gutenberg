const { RichText } = wp.blockEditor || wp.editor;
import { __ } from '@wordpress/i18n';
import { Component } from 'react';

export class Stars extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			displayValue: this.props.value,
			displayColor: this.props.activeStarColor,
		};
		this.mouseHover = this.mouseHover.bind( this );
		this.mouseLeave = this.mouseLeave.bind( this );
		this.mouseClick = this.mouseClick.bind( this );
	}
	mouseHover( i ) {
		this.setState( {
			displayValue: i + ( this.props.value - i === 1 ? 0.5 : 1 ),
			displayColor: this.props.selectedStarColor,
		} );
	}
	mouseLeave() {
		this.setState( {
			displayValue: this.props.value,
			displayColor: this.props.activeStarColor,
		} );
	}
	mouseClick( i ) {
		const { setValue, value } = this.props;
		setValue( value === i + 1 ? i + 0.5 : i + 1 );
		this.setState( {
			displayValue: value === i + 1 ? i + 0.5 : i + 1,
		} );
	}
	componentWillReceiveProps( newProps ) {
		const { value, activeStarColor } = newProps;
		if ( this.props.onHover || this.state.displayValue !== value ) {
			this.setState( {
				displayValue: value,
				displayColor: activeStarColor,
			} );
		} else {
			this.setState( { displayColor: activeStarColor } );
		}
	}
	render() {
		const { displayValue } = this.state;
		const {
			limit,
			id,
			className,
			inactiveStarColor,
			onHover,
			onClick,
			style,
			starOutlineColor,
		} = this.props;
		return (
			<div
				className={ className }
				style={ Object.assign(
					{
						display: 'flex',
						flexDirection: 'flex-row',
					},
					style
				) }
			>
				{ [ ...Array( limit ).keys() ].map( ( i ) => (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						key={ i }
						height="20"
						width="20"
						viewBox="0 0 150 150"
						onMouseOver={ () => onHover || this.mouseHover( i ) }
						onMouseOut={ () => this.mouseLeave() }
						onClick={ () => onClick || this.mouseClick( i ) }
					>
						<defs>
							<mask
								id={ `uagb_review_star_filter-${ id }-${ i }` }
							>
								<rect
									height="150"
									width={
										( displayValue - i > 0
											? displayValue - i < 1
												? displayValue - i
												: 1
											: 0 ) * 150
									}
									y="0"
									x="0"
									fill="#fff"
								/>
							</mask>
						</defs>

						<path
							fill={ inactiveStarColor }
							strokeWidth="2.5"
							d="m0.75,56.89914l56.02207,0l17.31126,-56.14914l17.31126,56.14914l56.02206,0l-45.32273,34.70168l17.31215,56.14914l-45.32274,-34.70262l-45.32274,34.70262l17.31215,-56.14914l-45.32274,-34.70168z"
							stroke={ starOutlineColor }
						/>
						<path
							className="star"
							id={ `star${ i }` }
							mask={ `url(#uagb_review_star_filter-${ id }-${ i })` }
							fill={ this.state.displayColor }
							strokeWidth="2.5"
							d="m0.75,56.89914l56.02207,0l17.31126,-56.14914l17.31126,56.14914l56.02206,0l-45.32273,34.70168l17.31215,56.14914l-45.32274,-34.70262l-45.32274,34.70262l17.31215,-56.14914l-45.32274,-34.70168z"
							stroke={ starOutlineColor }
						/>
					</svg>
				) ) }
			</div>
		);
	}
}

export class ReviewBody extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			average:
				this.props.items
					.map( ( i ) => i.value )
					.reduce( ( total, v ) => total + v ) /
				this.props.items.length,
		};
	}

	render() {
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
		} = this.props;

		const { average } = this.state;

		const newAverage =
			items.map( ( i ) => i.value ).reduce( ( total, v ) => total + v ) /
			items.length;

		if ( average !== newAverage ) {
			this.setState( { average: newAverage } );
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
							<div className="uagb_review_entry">
								<RichText
									style={ { marginRight: 'auto' } }
									key={ i }
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
									key={ i }
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
												this.setState( {
													average:
														newItems
															.map(
																( k ) => k.value
															)
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
												{
													label: j.label,
													value: newValue,
												},
												...items.slice( i + 1 ),
											];
											setItems( newArray );
											setActiveStarIndex( i );
											this.setState( {
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
							this.setState( {
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
							onChange={ ( text ) =>
								setSummaryDescription( text )
							}
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
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
