import { useLayoutEffect } from 'react';

const { decodeEntities } = wp.htmlEntities;
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

export const PostTitle = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { attributes, post } = props;

	const Tag = attributes.titleTag;

	const target = attributes.newTab ? '_blank' : '_self';

	if ( undefined == post.title ) {
		return null;
	}

	if ( attributes.displayPostTitle ) {
		return (
			<div className="uagb-post__text">
				<Tag className={ 'uagb-post__title' }>
					<a
						href={ post.link }
						target={ target }
						rel="noopener noreferrer"
					>
						{ decodeEntities( post.title.rendered.trim() ) ||
							__( '(Untitled)' ) }
					</a>
				</Tag>
			</div>
		);
	}
	return null;
};
