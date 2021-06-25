import { useLayoutEffect } from 'react';

const { decodeEntities } = wp.htmlEntities;
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

export const PostImage = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { post, attributes } = props;

	const target = attributes.newTab ? '_blank' : '_self';

	if (
		attributes.displayPostImage &&
		undefined !== post.uagb_featured_image_src &&
		attributes.imgSize &&
		post.uagb_featured_image_src[ attributes.imgSize ]
	) {
		const src = post.uagb_featured_image_src[ attributes.imgSize ];

		return (
			<div className="uagb-post__image">
				<a
					href={ post.link }
					target={ target }
					rel="noopener noreferrer"
				>
					<img
						src={ src[ 0 ] }
						alt={
							decodeEntities( post.title.rendered.trim() ) ||
							__( '(Untitled)' )
						}
					/>
				</a>
			</div>
		);
	}

	return null;
};
