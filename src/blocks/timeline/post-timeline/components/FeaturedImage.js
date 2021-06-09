import { decodeEntities } from '@wordpress/html-entities';

const FeaturedImage = ( props ) => {
	const { post, attributes } = props;

	if (
		attributes.displayPostImage &&
		undefined !== post.uagb_featured_image_src &&
		attributes.imageSize &&
		post.uagb_featured_image_src[ attributes.imageSize ]
	) {
		const src = post.uagb_featured_image_src[ attributes.imageSize ];
		let target = '_self';
		if ( attributes.linkTarget ) {
			target = '_blank';
		}
		return (
			<div className="uagb-timeline__image">
				<a
					href={ post.link }
					target={ target }
					rel="noopener noreferrer"
					style={ {
						textAlign: attributes.align,
					} }
				>
					<img
						src={ src[ 0 ] }
						alt={
							decodeEntities( post.title.rendered.trim() ) ||
							__( '(Untitled)' )
						}
						width="640" height="360"
						loading="lazy"
					/>
				</a>
			</div>
		);
	}
	return null;
};

export default React.memo( FeaturedImage );
