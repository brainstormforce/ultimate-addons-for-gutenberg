import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useLayoutEffect } from 'react';
import styles from './editor.lazy.scss';

export const PostButton = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { attributes, post } = props;

	const target = attributes.newTab ? '_blank' : '_self';

	if ( attributes.displayPostLink ) {
		const cta_text = attributes.ctaText
			? attributes.ctaText
			: __( 'Read More' );

		return (
			<div className="uagb-post__text">
				<div
					className={ classnames(
						'uagb-post__cta',
						attributes.inheritFromTheme ? 'wp-block-button' : null
					) }
				>
					<a
						className={ classnames(
							! attributes.inheritFromTheme
								? 'uagb-post__link '
								: null,
							'uagb-text-link',
							attributes.inheritFromTheme
								? 'wp-block-button__link'
								: null
						) }
						href={ post.link }
						target={ target }
						rel="noopener noreferrer"
					>
						{ cta_text }
					</a>
				</div>
			</div>
		);
	}
	return null;
};
