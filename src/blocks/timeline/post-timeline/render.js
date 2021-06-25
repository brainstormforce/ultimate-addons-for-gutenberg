import classnames from 'classnames';

// Import css for timeline.
import contentTimelineStyle from '.././inline-styles';
import ContentTmClasses from '.././classes';
import AlignClass from '.././align-classes';
import DayAlignClass from '.././day-align-classes';
import Title from './components/Title';
import FeaturedImage from './components/FeaturedImage';
import Excerpt from './components/Excerpt';
import CtaLink from './components/CtaLink';
import Author from './components/Author';
import PostDate from './components/PostDate';
import Icon from './components/Icon';

import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner } from '@wordpress/components';
import React, { useLayoutEffect } from 'react';
import styles from '../editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const { attributes, className, deviceType, latestPosts } = props;

	const {
		displayPostLink,
		timelinAlignment,
		postsToShow,
		contentPadding,
	} = attributes;

	/* Render output at backend */
	const getContent = () => {
		// Add CSS.
		const element = document.getElementById(
			'uagb-timeline-style-' + props.clientId
		);
		if ( null != element && 'undefined' !== typeof element ) {
			element.innerHTML = contentTimelineStyle( props );
		}

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		if ( ! hasPosts ) {
			return (
				<Placeholder
					icon="admin-post"
					label={
						uagb_blocks_info.blocks[ 'uagb/post-timeline' ].title
					}
				>
					{ ! Array.isArray( latestPosts ) ? (
						<Spinner />
					) : (
						__( 'No posts found.' )
					) }
				</Placeholder>
			);
		}
		// Removing posts from display should be instant.
		const displayPosts =
			latestPosts.length > postsToShow
				? latestPosts.slice( 0, postsToShow )
				: latestPosts;

		let contentAlignClass = AlignClass( props.attributes, 0 ); // Get classname for layout alignment
		let dayAlignClass = DayAlignClass( props.attributes, 0 ); // Get classname for day alignment.

		let displayInnerDate = false;

		return (
			<div className="uagb-timeline__days">
				{ displayPosts.map( ( post, index ) => {
					if ( timelinAlignment == 'center' ) {
						displayInnerDate = true;
						contentAlignClass = AlignClass(
							props.attributes,
							index
						);
						dayAlignClass = DayAlignClass(
							props.attributes,
							index
						);
					}

					return (
						<article
							className="uagb-timeline__field uagb-timeline__field-wrap"
							key={ index }
						>
							<div className={ contentAlignClass }>
								{ <Icon attributes={ attributes } /> }

								<div className={ dayAlignClass }>
									<div className="uagb-timeline__events-inner-new">
										<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
											{
												<PostDate
													post={ post }
													attributes={ attributes }
													dateClass="uagb-timeline__inner-date-new"
												/>
											}
										</div>
										{
											<FeaturedImage
												post={ post }
												attributes={ attributes }
											/>
										}
										<div
											className="uagb-content"
											style={ {
												padding: contentPadding + 'px',
											} }
										>
											{
												<Title
													post={ post }
													attributes={ attributes }
												/>
											}
											{
												<Author
													post={ post }
													attributes={ attributes }
												/>
											}
											{
												<Excerpt
													post={ post }
													attributes={ attributes }
												/>
											}
											{
												<CtaLink
													post={ post }
													attributes={ attributes }
												/>
											}

											<div className="uagb-timeline__arrow"></div>
										</div>
									</div>
								</div>
								{ displayInnerDate && (
									<div className="uagb-timeline__date-new">
										{
											<PostDate
												post={ post }
												attributes={ attributes }
												dateClass="uagb-timeline__date-new"
											/>
										}
									</div>
								) }
							</div>
						</article>
					);
				} ) }
			</div>
		);
	};

	let ctaEnable = '';

	if ( displayPostLink ) {
		ctaEnable = 'uagb_timeline__cta-enable';
	}

	return (
		<div
			className={ classnames(
				className,
				'uagb-timeline__outer-wrap',
				'uagb-timeline__content-wrap',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId }`,
				ctaEnable,
				...ContentTmClasses( props.attributes )
			) }
		>
			<div className="uagb-timeline__main">
				{ getContent() }
				<div className="uagb-timeline__line">
					<div className="uagb-timeline__line__inner"></div>
				</div>
			</div>
		</div>
	);
};
export default React.memo( Render );
