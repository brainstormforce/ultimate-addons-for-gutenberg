const TestimonialImage = ( props ) => {
	const { attributes, index_value } = props;
	let urlCheck = '';

	const imageArray = attributes.test_block[ index_value ];

	if ( imageArray && typeof imageArray !== 'undefined' ) {
		const image = imageArray.image;
		let url = '';

		if ( typeof image !== 'undefined' && image !== null && image !== '' ) {
			urlCheck = image.url;
		}

		if ( urlCheck !== '' ) {
			const size = image.sizes;
			const imageSize = attributes.imageSize;
			if (
				typeof size !== 'undefined' &&
				typeof size[ imageSize ] !== 'undefined'
			) {
				url = size[ imageSize ].url;
			} else {
				url = urlCheck;
			}

			return (
				<div
					className="uagb-tm__image-content"
					key={ 'tm_img-wrap-' + index_value }
				>
					<div
						className="uagb-tm__image"
						key={ 'tm_img-' + index_value }
					>
						<img
							className="uagb-tm-img-src"
							src={ url }
							alt={ image.alt }
						/>
					</div>
				</div>
			);
		}
		return null;
	}
	return null;
};

export default TestimonialImage;
