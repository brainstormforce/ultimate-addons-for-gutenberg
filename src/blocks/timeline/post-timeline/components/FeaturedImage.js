const { decodeEntities } = wp.htmlEntities

class FeaturedImage extends React.Component {

	render() {

		const { post, attributes } = this.props

		if (
			attributes.displayPostImage &&
			undefined !== post.uagb_featured_image_src &&
			attributes.imageSize &&
			post.uagb_featured_image_src[attributes.imageSize]
		) {
			var src = post.uagb_featured_image_src[attributes.imageSize]
			let target ="_self"
			if( attributes.linkTarget ){
				target ="_blank"
			}
			return (
				<div className='uagb-timeline__image'>
					<a href={ post.link } target={target} rel ="noopener noreferrer" style= {{
						textAlign: attributes.align
					}}	>
						<img
							src={ src[0] }
							width="640" height="360"
							alt={ decodeEntities( post.title.rendered.trim() ) || __( "(Untitled)" ) }
						/>
					</a>
				</div>
			)
		} else {

			return null
		}
	}
}

export default FeaturedImage
