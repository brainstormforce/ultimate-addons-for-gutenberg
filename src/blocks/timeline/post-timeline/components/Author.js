import React from 'react';
const Author = ( props ) => {
	const { post, attributes } = props;

	let target = '_self';
	if ( attributes.linkTarget ) {
		target = '_blank';
	}
	return (
		<>
			{ attributes.displayPostAuthor &&
				undefined !== post.uagb_author_info && (
					<div className="uagb-timeline__author">
						<span className="dashicons-admin-users dashicons"></span>
						<a
							className="uagb-timeline__author-link"
							target={ target }
							href={ post.uagb_author_info.author_link }
							rel="noopener noreferrer"
						>
							{ post.uagb_author_info.display_name }
						</a>
					</div>
				) }
		</>
	);
};

export default React.memo( Author );
