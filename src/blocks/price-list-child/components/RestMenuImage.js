const RestMenuImage = ( props ) => {
	const { attributes, index_value } = props;
	let urlCheck = '';
	let imageArr = '';

	if ( typeof index_value !== 'undefined' ) {
		const imageArray = attributes.rest_menu_item_arr[ index_value ];
		if ( typeof imageArray !== 'undefined' ) {
			imageArr = imageArray.image;
		}
	} else if ( attributes.image !== '' ) {
		imageArr = attributes.image;
	}

	if ( imageArr && typeof imageArr !== 'undefined' ) {
		let image = '';
		if ( typeof imageArr !== 'undefined' ) {
			image = imageArr;
		} else {
			image = attributes.image;
		}
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
				<div className="uagb-rm__image-content">
					<div className="uagb-rm__image">
						<img className="" src={ url } alt={ image.alt } />
					</div>
				</div>
			);
		}
		return null;
	}
	return null;
};

export default RestMenuImage;
