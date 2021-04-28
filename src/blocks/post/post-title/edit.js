const { decodeEntities } = wp.htmlEntities;
const { __ } = wp.i18n;

export const PostTitle = ( props ) => {
		
	const { attributes ,post } = props;
		
	const Tag = attributes.titleTag;

	const target = ( attributes.newTab ) ? "_blank" : "_self";

	if ( undefined == post.title ) {
		return null;
	}

	if ( attributes.displayPostTitle ) {

		return (
			<div className='uagb-post__text'>
				<Tag className={ "uagb-post__title" }>
					<a href={ post.link } target={ target } rel="noopener noreferrer">{ decodeEntities( post.title.rendered.trim() ) || __( "(Untitled)" ) }</a>
				</Tag>
			</div>
		);
	} 
	return null;
		

};
	