const Stars = ( props ) => {
	const mouseHover = ( i ) => {
		props.setStateValue( {
			displayValue: i + ( props.value - i === 1 ? 0.5 : 1 ),
			displayColor: props.selectedStarColor,
		} );
	};
	const mouseLeave = () => {
		props.setStateValue( {
			displayValue: props.value,
			displayColor: props.activeStarColor,
		} );
	};
	const mouseClick = ( i ) => {
		const { setValue, value } = props;
		setValue( value === i + 1 ? i + 0.5 : i + 1 );
		props.setStateValue( {
			displayValue: value === i + 1 ? i + 0.5 : i + 1,
		} );
	};

	const {
		limit,
		id,
		className,
		inactiveStarColor,
		onClick,
		style,
		starOutlineColor,
		value,
		activeStarColor,
	} = props;

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
					onMouseOver={ () => mouseHover( i ) }
					onMouseOut={ () => mouseLeave() }
					onClick={ () => onClick || mouseClick( i ) }
				>
					<defs>
						<mask id={ `uagb_review_star_filter-${ id }-${ i }` }>
							<rect
								height="150"
								width={
									( value - i > 0
										? value - i < 1
											? value - i
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
						fill={ activeStarColor }
						strokeWidth="2.5"
						d="m0.75,56.89914l56.02207,0l17.31126,-56.14914l17.31126,56.14914l56.02206,0l-45.32273,34.70168l17.31215,56.14914l-45.32274,-34.70262l-45.32274,34.70262l17.31215,-56.14914l-45.32274,-34.70168z"
						stroke={ starOutlineColor }
					/>
				</svg>
			) ) }
		</div>
	);
};

export default Stars;
