const InfoBoxIconImage = ( props ) => {
	const { attributes } = props;

	let urlCheck = '';
	if (
		typeof attributes.iconImage !== 'undefined' &&
		attributes.iconImage !== null &&
		attributes.iconImage !== ''
	) {
		urlCheck = attributes.iconImage.url;
	}

	let url = '';
	if ( urlCheck !== '' ) {
		const size = attributes.iconImage.sizes;
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
			<div className="uagb-ifb-image-icon-content uagb-ifb-imgicon-wrap">
				<div className="uagb-ifb-image">
					<div className="uagb-ifb-image-content">
						<img
							className="uagb-ifb-img-src"
							src={ url }
							alt={ attributes.iconImage.alt }
						/>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

export default InfoBoxIconImage;
