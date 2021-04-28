const { __ } = wp.i18n;
import classnames from "classnames";

export const PostButton = ( props ) =>  {
	
	
	const { attributes , post } = props;

	const target = ( attributes.newTab ) ? "_blank" : "_self";

	if ( attributes.displayPostLink ) {

		const cta_text = ( attributes.ctaText ) ? attributes.ctaText : __( "Read More" );

		return (
			<div className='uagb-post__text'> 
				<div className={ classnames( "uagb-post__cta", ( attributes.inheritFromTheme ) ? "wp-block-button" : null ) }>
					<a
						className={ classnames(
							( !attributes.inheritFromTheme ) ? "uagb-post__link " : null,
							"uagb-text-link",
							( attributes.inheritFromTheme ) ? "wp-block-button__link" : null
						) }
						href={ post.link }
						target={ target }
						rel="noopener noreferrer">{ cta_text }</a>
				</div>
			</div>
		);

	} 
	return null;
		
};
