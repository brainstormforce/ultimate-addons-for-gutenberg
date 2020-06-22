const { __ } = wp.i18n
import classnames from "classnames"

class Button extends React.Component {

	render() {

		const { post, attributes } = this.props

		let target = ( attributes.newTab ) ? "_blank" : "_self"

		if ( attributes.displayPostLink ) {

			let cta_text = ( attributes.ctaText ) ? attributes.ctaText : __( "Read More" )

			return (

				<div className={classnames('uagb-post__cta', ( attributes.inheritFromTheme ) ? 'wp-block-button' : null)}>
					<a
						className={classnames(
							( !attributes.inheritFromTheme ) ? 'uagb-post__link ' : null,
							'uagb-text-link',
							( attributes.inheritFromTheme ) ? 'wp-block-button__link' : null
						)}
						href={ post.link }
						target={ target }
						rel ="noopener noreferrer">{ cta_text }</a>
				</div>
			)

		} else {
			return null
		}
	}
}

export default Button
