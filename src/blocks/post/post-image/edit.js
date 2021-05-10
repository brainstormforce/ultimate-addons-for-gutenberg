const { decodeEntities } = wp.htmlEntities
import { __ } from '@wordpress/i18n';

export const PostImage = (props) =>  {
		
		const { post, attributes } = props

		let target = ( attributes.newTab ) ? "_blank" : "_self"

		if (
			attributes.displayPostImage &&
			undefined !== post.uagb_featured_image_src &&
			attributes.imgSize &&
			post.uagb_featured_image_src[attributes.imgSize]
		) {
			var src = post.uagb_featured_image_src[attributes.imgSize]

			return (
				<div className='uagb-post__image'>
					<a href={ post.link } target={ target } rel ="noopener noreferrer">
						<img
							src={ src[0] } width="640" height="360"
							alt={ decodeEntities( post.title.rendered.trim() ) || __( "(Untitled)" ) }
						/>
					</a>
				</div>
			)
		} else {

			return null
		}
	}

