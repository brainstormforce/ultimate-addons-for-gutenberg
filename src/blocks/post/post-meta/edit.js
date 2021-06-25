import { useLayoutEffect } from 'react';
import styles from './editor.lazy.scss';

const { dateI18n, format, __experimentalGetSettings } = wp.date;

export const PostMeta = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { post, attributes, categoriesList } = props;

	const dateFormat = __experimentalGetSettings().formats.date;

	const list = categoriesList;
	const cat = post.categories;
	const categoriesName = [];

	if ( list !== undefined && cat !== undefined ) {
		for ( let j = 0; j < list.length; j++ ) {
			for ( let i = 0; i < cat.length; i++ ) {
				if ( list[ j ].id === cat[ i ] ) {
					categoriesName.push( list[ j ].name );
				}
			}
		}
	}

	return (
		<div className=" uagb-post__text ">
			<div className="uagb-post-grid-byline">
				{ attributes.displayPostAuthor &&
					undefined !== post.uagb_author_info && (
						<span className="uagb-post__author">
							<span className="dashicons-admin-users dashicons"></span>
							<a
								target="_blank"
								href={ post.uagb_author_info.author_link }
								rel="noopener noreferrer"
							>
								{ post.uagb_author_info.display_name }
							</a>
						</span>
					) }

				{ attributes.displayPostDate && post.date_gmt && (
					<time
						dateTime={ format( 'c', post.date_gmt ) }
						className="uagb-post__date"
					>
						<span className="dashicons-calendar dashicons"></span>
						{ dateI18n( dateFormat, post.date_gmt ) }
					</time>
				) }

				{ attributes.displayPostComment &&
					undefined !== post.uagb_comment_info && (
						<span className="uagb-post__comment">
							<span className="dashicons-admin-comments dashicons"></span>
							{ post.uagb_comment_info }
						</span>
					) }

				{ attributes.displayPostTaxonomy && (
					<span className="uagb-post__taxonomy">
						<span className="dashicons-tag dashicons"></span>
						<div
							dangerouslySetInnerHTML={ {
								__html: categoriesName.join( ', ' ),
							} }
						></div>
					</span>
				) }
			</div>
		</div>
	);
};
