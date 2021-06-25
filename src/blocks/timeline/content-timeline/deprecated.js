/**
 * BLOCK: Testimonial - Deprecated Block
 */

import classnames from 'classnames';
import attributes from './attributes';
import contentTimelineStyle from '.././inline-styles';
import ContentTmClasses from '.././classes';
import AlignClass from '.././align-classes';
import DayAlignClass from '.././day-align-classes';
import renderSVG from '@Controls/renderIcon';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { dateI18n, __experimentalGetSettings } from '@wordpress/date';

const deprecated = [
	{
		attributes,
		save( props ) {
			const {
				block_id,
				headingTag,
				timelinAlignment,
				displayPostDate,
				icon,
				tm_content,
				t_date,
				stack,
				className,
			} = props.attributes;

			/* Style for elements */
			const front_style = contentTimelineStyle( props );

			const hasItems = Array.isArray( tm_content ) && tm_content.length;

			const dateFormat = __experimentalGetSettings().formats.date;

			let content_align_class = AlignClass( props.attributes, 0 ); // Get classname for layout alignment
			let day_align_class = DayAlignClass( props.attributes, 0 ); //

			const data_copy = [ ...tm_content ];
			let display_inner_date = false;

			return (
				<div
					className={ classnames(
						className,
						'uagb-timeline__outer-wrap'
					) }
					id={ `uagb-ctm-${ block_id }` }
				>
					<div
						className={ classnames(
							'uagb-timeline__content-wrap',
							...ContentTmClasses( props.attributes )
						) }
					>
						<div className="uagb-timeline-wrapper">
							<div className="uagb-timeline__main">
								<div className="uagb-timeline__days">
									{ tm_content.map( ( post, index ) => {
										const second_index = 'uagb-' + index;
										if ( timelinAlignment == 'center' ) {
											display_inner_date = true;
											content_align_class = AlignClass(
												props.attributes,
												index
											); // Get classname for layout alignment
											day_align_class = DayAlignClass(
												props.attributes,
												index
											); //
										}
										const Tag = headingTag;
										const icon_class =
											'uagb-timeline__icon-new out-view-uagb-timeline__icon ' +
											icon;

										return (
											<article
												className="uagb-timeline__field uagb-timeline__animate-border"
												key={ index }
											>
												<div
													className={ classnames(
														...content_align_class
													) }
												>
													<div className="uagb-timeline__marker out-view-uagb-timeline__icon">
														<span
															className={
																icon_class
															}
														></span>
													</div>

													<div
														className={ classnames(
															...day_align_class
														) }
													>
														<div className="uagb-events-new">
															<div className="uagb-timeline__events-inner-new">
																<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
																	{ displayPostDate &&
																		t_date[
																			index
																		]
																			.title && (
																			<div
																				className={
																					'uagb-timeline__inner-date-new'
																				}
																			>
																				{ dateI18n(
																					dateFormat,
																					t_date[
																						index
																					]
																						.title
																				) }
																			</div>
																		) }
																</div>

																<div className="uagb-timeline-content">
																	<div className="uagb-timeline__heading-text">
																		<RichText.Content
																			tagName={
																				headingTag
																			}
																			value={
																				post.time_heading
																			}
																			className="uagb-timeline__heading"
																		/>
																	</div>

																	<RichText.Content
																		tagName="p"
																		value={
																			post.time_desc
																		}
																		className="uagb-timeline-desc-content"
																	/>

																	<div className="uagb-timeline__arrow"></div>
																</div>
															</div>
														</div>
													</div>

													{ display_inner_date && (
														<div className="uagb-timeline__date-new">
															{ displayPostDate &&
																t_date[ index ]
																	.title && (
																	<div
																		className={
																			'uagb-timeline__date-new'
																		}
																	>
																		{ dateI18n(
																			dateFormat,
																			t_date[
																				index
																			]
																				.title
																		) }
																	</div>
																) }
														</div>
													) }
												</div>
											</article>
										);
									} ) }
								</div>
								<div className="uagb-timeline__line">
									<div className="uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				block_id,
				headingTag,
				timelinAlignment,
				displayPostDate,
				icon,
				tm_content,
				t_date,
				stack,
				className,
			} = props.attributes;

			/* Style for elements */
			const front_style = contentTimelineStyle( props );

			const hasItems = Array.isArray( tm_content ) && tm_content.length;

			const dateFormat = __experimentalGetSettings().formats.date;

			let content_align_class = AlignClass( props.attributes, 0 ); // Get classname for layout alignment
			let day_align_class = DayAlignClass( props.attributes, 0 ); //

			const data_copy = [ ...tm_content ];
			let display_inner_date = false;

			return (
				<div
					className={ classnames(
						className,
						'uagb-timeline__outer-wrap'
					) }
					id={ `uagb-ctm-${ block_id }` }
				>
					<div
						className={ classnames(
							'uagb-timeline__content-wrap',
							...ContentTmClasses( props.attributes )
						) }
					>
						<div className="uagb-timeline-wrapper">
							<div className="uagb-timeline__main">
								<div className="uagb-timeline__days">
									{ tm_content.map( ( post, index ) => {
										const second_index = 'uagb-' + index;
										if ( timelinAlignment == 'center' ) {
											display_inner_date = true;
											content_align_class = AlignClass(
												props.attributes,
												index
											); // Get classname for layout alignment
											day_align_class = DayAlignClass(
												props.attributes,
												index
											); //
										}
										const Tag = headingTag;
										const icon_class =
											'uagb-timeline__icon-new out-view-uagb-timeline__icon ' +
											icon;
										let post_date = dateI18n(
											dateFormat,
											t_date[ index ].title
										);
										if ( post_date === 'Invalid date' ) {
											post_date = t_date[ index ].title;
										}
										return (
											<article
												className="uagb-timeline__field uagb-timeline__field-wrap"
												key={ index }
											>
												<div
													className={ classnames(
														...content_align_class
													) }
												>
													<div className="uagb-timeline__marker out-view-uagb-timeline__icon">
														<span
															className={
																icon_class
															}
														></span>
													</div>

													<div
														className={ classnames(
															...day_align_class
														) }
													>
														<div className="uagb-events-new">
															<div className="uagb-timeline__events-inner-new">
																<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
																	{ displayPostDate &&
																		t_date[
																			index
																		]
																			.title && (
																			<div
																				className={
																					'uagb-timeline__inner-date-new'
																				}
																			>
																				{
																					post_date
																				}
																			</div>
																		) }
																</div>

																<div className="uagb-timeline-content">
																	<div className="uagb-timeline__heading-text">
																		<RichText.Content
																			tagName={
																				headingTag
																			}
																			value={
																				post.time_heading
																			}
																			className="uagb-timeline__heading"
																		/>
																	</div>

																	<RichText.Content
																		tagName="p"
																		value={
																			post.time_desc
																		}
																		className="uagb-timeline-desc-content"
																	/>

																	<div className="uagb-timeline__arrow"></div>
																</div>
															</div>
														</div>
													</div>

													{ display_inner_date && (
														<div className="uagb-timeline__date-new">
															{ displayPostDate &&
																t_date[ index ]
																	.title && (
																	<div
																		className={
																			'uagb-timeline__date-new'
																		}
																	>
																		{
																			post_date
																		}
																	</div>
																) }
														</div>
													) }
												</div>
											</article>
										);
									} ) }
								</div>
								<div className="uagb-timeline__line">
									<div className="uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				block_id,
				headingTag,
				timelinAlignment,
				displayPostDate,
				icon,
				tm_content,
				t_date,
				date_icon,
				stack,
				timelineItem,
			} = props.attributes;

			/* Style for elements */
			const front_style = contentTimelineStyle( props );

			const hasItems = Array.isArray( tm_content ) && tm_content.length;

			const dateFormat = __experimentalGetSettings().formats.date;

			let content_align_class = AlignClass( props.attributes, 0 ); // Get classname for layout alignment
			let day_align_class = DayAlignClass( props.attributes, 0 ); //

			let display_inner_date = false;

			return (
				<div
					className={ classnames(
						props.className,
						'uagb-timeline__outer-wrap'
					) }
					id={ `uagb-ctm-${ block_id }` }
				>
					<div
						className={ classnames(
							'uagb-timeline__content-wrap',
							...ContentTmClasses( props.attributes )
						) }
					>
						<div className="uagb-timeline-wrapper">
							<div className="uagb-timeline__main">
								<div className="uagb-timeline__days">
									{ tm_content.map( ( post, index ) => {
										if ( timelineItem <= index ) {
											return;
										}

										const second_index = 'uagb-' + index;
										if ( timelinAlignment == 'center' ) {
											display_inner_date = true;
											content_align_class = AlignClass(
												props.attributes,
												index
											); // Get classname for layout alignment
											day_align_class = DayAlignClass(
												props.attributes,
												index
											); //
										}
										const Tag = headingTag;
										const icon_class =
											'uagb-timeline__icon-new out-view-uagb-timeline__icon ';
										let post_date = dateI18n(
											dateFormat,
											t_date[ index ].title
										);
										if ( post_date === 'Invalid date' ) {
											post_date = t_date[ index ].title;
										}
										return (
											<article
												className="uagb-timeline__field uagb-timeline__field-wrap"
												key={ index }
											>
												<div
													className={ classnames(
														...content_align_class
													) }
												>
													<div className="uagb-timeline__marker out-view-uagb-timeline__icon">
														<span
															className={
																icon_class
															}
														>
															{ renderSVG(
																icon
															) }
														</span>
													</div>

													<div
														className={ classnames(
															...day_align_class
														) }
													>
														<div className="uagb-events-new">
															<div className="uagb-timeline__events-inner-new">
																<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
																	{ displayPostDate &&
																		t_date[
																			index
																		]
																			.title && (
																			<div
																				className={
																					'uagb-timeline__inner-date-new'
																				}
																			>
																				{
																					post_date
																				}
																			</div>
																		) }
																</div>

																<div className="uagb-timeline-content">
																	<div className="uagb-timeline__heading-text">
																		<RichText.Content
																			tagName={
																				headingTag
																			}
																			value={
																				post.time_heading
																			}
																			className="uagb-timeline__heading"
																		/>
																	</div>

																	<RichText.Content
																		tagName="p"
																		value={
																			post.time_desc
																		}
																		className="uagb-timeline-desc-content"
																	/>

																	<div className="uagb-timeline__arrow"></div>
																</div>
															</div>
														</div>
													</div>

													{ display_inner_date && (
														<div className="uagb-timeline__date-new">
															{ displayPostDate &&
																t_date[ index ]
																	.title && (
																	<div
																		className={
																			'uagb-timeline__date-new'
																		}
																	>
																		{
																			post_date
																		}
																	</div>
																) }
														</div>
													) }
												</div>
											</article>
										);
									} ) }
								</div>
								<div className="uagb-timeline__line">
									<div className="uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		//deprecated
		attributes,
		save( props ) {
			const {
				block_id,
				headingTag,
				timelinAlignment,
				displayPostDate,
				icon,
				tm_content,
				t_date,
				date_icon,
				stack,
				timelineItem,
				dateFormat,
			} = props.attributes;

			/* Style for elements */
			const front_style = contentTimelineStyle( props );

			const hasItems = Array.isArray( tm_content ) && tm_content.length;

			let content_align_class = AlignClass( props.attributes, 0 ); // Get classname for layout alignment
			let day_align_class = DayAlignClass( props.attributes, 0 ); //

			let display_inner_date = false;

			return (
				<div
					className={ classnames(
						props.className,
						'uagb-timeline__outer-wrap',
						`uagb-block-${ block_id }`
					) }
				>
					<div
						className={ classnames(
							'uagb-timeline__content-wrap',
							...ContentTmClasses( props.attributes )
						) }
					>
						<div className="uagb-timeline-wrapper">
							<div className="uagb-timeline__main">
								<div className="uagb-timeline__days">
									{ tm_content.map( ( post, index ) => {
										if ( timelineItem <= index ) {
											return;
										}

										const second_index = 'uagb-' + index;
										if ( timelinAlignment == 'center' ) {
											display_inner_date = true;
											content_align_class = AlignClass(
												props.attributes,
												index
											); // Get classname for layout alignment
											day_align_class = DayAlignClass(
												props.attributes,
												index
											); //
										}
										const Tag = headingTag;
										const icon_class =
											'uagb-timeline__icon-new out-view-uagb-timeline__icon ';
										let post_date = t_date[ index ].title;
										if ( 'custom' != dateFormat ) {
											post_date = dateI18n(
												dateFormat,
												t_date[ index ].title
											);
											if (
												post_date === 'Invalid date'
											) {
												post_date =
													t_date[ index ].title;
											}
										}
										return (
											<article
												className="uagb-timeline__field uagb-timeline__field-wrap"
												key={ index }
											>
												<div
													className={ classnames(
														...content_align_class
													) }
												>
													<div className="uagb-timeline__marker out-view-uagb-timeline__icon">
														<span
															className={
																icon_class
															}
														>
															{ renderSVG(
																icon
															) }
														</span>
													</div>

													<div
														className={ classnames(
															...day_align_class
														) }
													>
														<div className="uagb-events-new">
															<div className="uagb-timeline__events-inner-new">
																<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
																	{ displayPostDate &&
																		t_date[
																			index
																		]
																			.title && (
																			<div
																				className={
																					'uagb-timeline__inner-date-new'
																				}
																			>
																				{
																					post_date
																				}
																			</div>
																		) }
																</div>

																<div className="uagb-timeline-content">
																	<div className="uagb-timeline__heading-text">
																		<RichText.Content
																			tagName={
																				headingTag
																			}
																			value={
																				post.time_heading
																			}
																			className="uagb-timeline__heading"
																		/>
																	</div>

																	<RichText.Content
																		tagName="p"
																		value={
																			post.time_desc
																		}
																		className="uagb-timeline-desc-content"
																	/>

																	<div className="uagb-timeline__arrow"></div>
																</div>
															</div>
														</div>
													</div>

													{ display_inner_date && (
														<div className="uagb-timeline__date-new">
															{ displayPostDate &&
																t_date[ index ]
																	.title && (
																	<div
																		className={
																			'uagb-timeline__date-new'
																		}
																	>
																		{
																			post_date
																		}
																	</div>
																) }
														</div>
													) }
												</div>
											</article>
										);
									} ) }
								</div>
								<div className="uagb-timeline__line">
									<div className="uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const { block_id } = props.attributes;

			return (
				<div
					className={ classnames(
						props.className,
						'uagb-timeline__outer-wrap',
						`uagb-block-${ block_id }`
					) }
				>
					<div
						className={ classnames(
							'uagb-timeline__content-wrap',
							...ContentTmClasses( props.attributes )
						) }
					>
						<div className="uagb-timeline-wrapper">
							<div className="uagb-timeline__main">
								<div className="uagb-timeline__days">
									<InnerBlocks.Content />
								</div>
								<div className="uagb-timeline__line">
									<div className="uagb-timeline__line__inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
