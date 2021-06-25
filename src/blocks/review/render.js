// Import block dependencies and components
import classnames from 'classnames';
import ReviewBody from './review-body';
import React, { useLayoutEffect, useState } from 'react';
import styles from './editor.lazy.scss';
const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;
	const {
		attributes: {
			block_id,
			authorName,
			itemName,
			description,
			parts,
			starCount,
			summaryTitle,
			summaryDescription,
			inactiveStarColor,
			activeStarColor,
			ctaLink,
			ctaTarget,
			rTitle,
			rContent,
			rAuthor,
			headingTag,
			mainimage,
			imgSize,
			showFeature,
			showAuthor,
			starOutlineColor,
			enableDescription,
			enableImage,
		},
		setAttributes,
		isSelected,
		className,
	} = props;
	const bodyInitialState = {
		average:
			props.attributes.parts
				.map( ( i ) => i.value )
				.reduce( ( total, v ) => total + v ) /
			props.attributes.parts.length,
	};

	const [ bodyState, bodySetStateValue ] = useState( bodyInitialState );

	const starInitialState = {
		displayValue: props.value,
		displayColor: props.activeStarColor,
	};

	const [ starState, starSetStateValue ] = useState( starInitialState );

	let urlChk = '';
	let title = '';
	if (
		'undefined' !== typeof props.attributes.mainimage &&
		null !== props.attributes.mainimage &&
		'' !== props.attributes.mainimage
	) {
		urlChk = props.attributes.mainimage.url;
		title = props.attributes.mainimage.title;
	}

	let url = '';
	if ( '' !== urlChk ) {
		const size = props.attributes.mainimage.sizes;
		const imageSize = props.attributes.imgSize;

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
				className="uagb-review__source-image"
				src={ url }
				title={ title }
				alt=""
			/>
		);
	}

	return (
		<div
			className={ classnames(
				className,
				'uagb-ratings__outer-wrap',
				`uagb-block-${ block_id.substr( 0, 8 ) }`
			) }
		>
			<ReviewBody
				rTitle={ rTitle }
				setTitle={ ( newValue ) =>
					setAttributes( { rTitle: newValue } )
				}
				ctaLink={ ctaLink }
				ctaTarget={ ctaTarget }
				rContent={ rContent }
				setDescription={ ( newValue ) =>
					setAttributes( { rContent: newValue } )
				}
				rAuthor={ rAuthor }
				setAuthorName={ ( newValue ) =>
					setAttributes( { rAuthor: newValue } )
				}
				headingTag={ headingTag }
				mainimage={ mainimage }
				imgSize={ imgSize }
				image_icon_html={ imageIconHtml }
				isSelected={ isSelected }
				authorName={ authorName }
				itemName={ itemName }
				description={ description }
				descriptionEnabled={ enableDescription }
				ID={ block_id }
				imageEnabled={ enableImage }
				items={ parts }
				starCount={ starCount }
				summaryTitle={ summaryTitle }
				summaryDescription={ summaryDescription }
				inactiveStarColor={ inactiveStarColor }
				activeStarColor={ activeStarColor }
				selectedStarColor={ activeStarColor }
				starOutlineColor={ starOutlineColor }
				setItemName={ ( newValue ) =>
					setAttributes( { itemName: newValue } )
				}
				setImage={ ( img ) =>
					setAttributes( {
						imgID: img.id,
						imgURL: img.url,
						imgAlt: img.alt,
					} )
				}
				setItems={ ( newValue ) =>
					setAttributes( { parts: newValue } )
				}
				setSummaryTitle={ ( newValue ) =>
					setAttributes( { summaryTitle: newValue } )
				}
				setSummaryDescription={ ( newValue ) =>
					setAttributes( { summaryDescription: newValue } )
				}
				hasFocus={ isSelected }
				setEditable={ ( newValue ) =>
					bodySetStateValue( { editable: newValue } )
				}
				setActiveStarIndex={ ( editedStar ) =>
					bodySetStateValue( { editedStar } )
				}
				showfeature={ showFeature }
				showauthor={ showAuthor }
				state={ bodyState }
				setStateValue={ bodySetStateValue }
				starState={ starState }
				starSetStateValue={ starSetStateValue }
			/>
		</div>
	);
};
export default React.memo( Render );
