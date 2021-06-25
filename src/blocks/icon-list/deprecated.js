/**
 * BLOCK: Columns - Deprecated Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';

// Import icon.
import attributes from './attributes';

import { __ } from '@wordpress/i18n';

const { RichText } = '@wordpress/block-editor';

const deprecated = [
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const {
				block_id,
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				disableLink,
			} = props.attributes;

			const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

			return (
				<div
					className={ classnames(
						className,
						'uagb-icon-list__outer-wrap',
						`uagb-icon-list__layout-${ icon_layout }`,
						labelClass
					) }
					id={ `uagb-icon-list-${ block_id }` }
				>
					<div className="uagb-icon-list__wrap">
						{ icons.map( ( icon, index ) => {
							if ( icon_count <= index ) {
								return;
							}

							const url = '';
							let imageIconHtml = '';

							if ( icon.image_icon == 'icon' ) {
								if ( icon.icon ) {
									imageIconHtml = (
										<span
											className={ classnames(
												icon.icon,
												'uagb-icon-list__source-icon'
											) }
										></span>
									);
								}
							} else if ( icon.image ) {
								imageIconHtml = (
									<img
										className="uagb-icon-list__source-image"
										src={ icon.image.url }
									/>
								);
							}

							const target = icon.target ? '_blank' : '_self';
							const linkUrl = ! disableLink
								? icon.link
								: 'javascript:void(0);';

							return (
								<a
									className={ classnames(
										`uagb-icon-list-repeater-${ index }`,
										'uagb-icon-list__wrapper'
									) }
									key={ index }
									target={ target }
									rel="noopener noreferrer"
									href={ linkUrl }
								>
									<div className="uagb-icon-list__content-wrap">
										<span className="uagb-icon-list__source-wrap">
											{ imageIconHtml }
										</span>
										{ ! hideLabel &&
											'' != icons[ index ].label && (
												<div className="uagb-icon-list__label-wrap">
													<RichText.Content
														tagName="span"
														value={
															icons[ index ].label
														}
														className="uagb-icon-list__label"
													/>
												</div>
											) }
									</div>
								</a>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const {
				block_id,
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				disableLink,
			} = props.attributes;

			const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

			return (
				<div
					className={ classnames(
						className,
						'uagb-icon-list__outer-wrap',
						`uagb-icon-list__layout-${ icon_layout }`,
						labelClass
					) }
					id={ `uagb-icon-list-${ block_id }` }
				>
					<div className="uagb-icon-list__wrap">
						{ icons.map( ( icon, index ) => {
							if ( icon_count <= index ) {
								return;
							}

							const url = '';
							let imageIconHtml = '';

							if ( icon.image_icon == 'icon' ) {
								if ( icon.icon ) {
									imageIconHtml = (
										<span className="uagb-icon-list__source-icon">
											{ renderSVG( icon.icon ) }
										</span>
									);
								}
							} else if ( icon.image ) {
								imageIconHtml = (
									<img
										className="uagb-icon-list__source-image"
										src={ icon.image.url }
									/>
								);
							}

							const target = icon.target ? '_blank' : '_self';
							const linkUrl = ! disableLink
								? icon.link
								: 'javascript:void(0);';

							return (
								<a
									className={ classnames(
										`uagb-icon-list-repeater-${ index }`,
										'uagb-icon-list__wrapper'
									) }
									key={ index }
									target={ target }
									rel="noopener noreferrer"
									href={ linkUrl }
								>
									<div className="uagb-icon-list__content-wrap">
										<span className="uagb-icon-list__source-wrap">
											{ imageIconHtml }
										</span>
										{ ! hideLabel &&
											'' != icons[ index ].label && (
												<div className="uagb-icon-list__label-wrap">
													<RichText.Content
														tagName="span"
														value={
															icons[ index ].label
														}
														className="uagb-icon-list__label"
													/>
												</div>
											) }
									</div>
								</a>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const {
				block_id,
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				iconPosition,
			} = props.attributes;

			const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

			return (
				<div
					className={ classnames(
						className,
						'uagb-icon-list__outer-wrap',
						`uagb-icon-list__layout-${ icon_layout }`,
						iconPosition == 'top'
							? 'uagb-icon-list__icon-at-top'
							: '',
						labelClass
					) }
					id={ `uagb-icon-list-${ block_id }` }
				>
					<div className="uagb-icon-list__wrap">
						{ icons.map( ( icon, index ) => {
							if ( icon_count <= index ) {
								return;
							}

							const url = '';
							let imageIconHtml = '';

							if ( icon.image_icon == 'icon' ) {
								if ( icon.icon ) {
									imageIconHtml = (
										<span className="uagb-icon-list__source-icon">
											{ renderSVG( icon.icon ) }
										</span>
									);
								}
							} else if ( icon.image ) {
								imageIconHtml = (
									<img
										className="uagb-icon-list__source-image"
										src={ icon.image.url }
									/>
								);
							}

							const target = icon.target ? '_blank' : '_self';
							const linkUrl = ! icon.disableLink
								? icon.link
								: 'javascript:void(0);';

							return (
								<a
									className={ classnames(
										`uagb-icon-list-repeater-${ index }`,
										'uagb-icon-list__wrapper'
									) }
									key={ index }
									target={ target }
									rel="noopener noreferrer"
									href={ linkUrl }
								>
									<div className="uagb-icon-list__content-wrap">
										<span className="uagb-icon-list__source-wrap">
											{ imageIconHtml }
										</span>
										{ ! hideLabel &&
											'' != icons[ index ].label && (
												<div className="uagb-icon-list__label-wrap">
													<RichText.Content
														tagName="span"
														value={
															icons[ index ].label
														}
														className="uagb-icon-list__label"
													/>
												</div>
											) }
									</div>
								</a>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const {
				block_id,
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				iconPosition,
			} = props.attributes;

			const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

			return (
				<div
					className={ classnames(
						className,
						'uagb-icon-list__outer-wrap',
						`uagb-icon-list__layout-${ icon_layout }`,
						iconPosition == 'top'
							? 'uagb-icon-list__icon-at-top'
							: '',
						labelClass
					) }
					id={ `uagb-icon-list-${ block_id }` }
				>
					<div className="uagb-icon-list__wrap">
						{ icons.map( ( icon, index ) => {
							if ( icon_count <= index ) {
								return;
							}

							const url = '';
							let imageIconHtml = '';

							if ( icon.image_icon == 'icon' ) {
								if ( icon.icon ) {
									imageIconHtml = (
										<span className="uagb-icon-list__source-icon">
											{ renderSVG( icon.icon ) }
										</span>
									);
								}
							} else if ( icon.image ) {
								imageIconHtml = (
									<img
										className="uagb-icon-list__source-image"
										src={ icon.image.url }
									/>
								);
							}

							const target = icon.target ? '_blank' : '_self';
							const linkUrl = ! icon.disableLink
								? icon.link
								: '/';

							return (
								<a
									className={ classnames(
										`uagb-icon-list-repeater-${ index }`,
										'uagb-icon-list__wrapper'
									) }
									key={ index }
									target={ target }
									rel="noopener noreferrer"
									href={ linkUrl }
								>
									<div className="uagb-icon-list__content-wrap">
										<span className="uagb-icon-list__source-wrap">
											{ imageIconHtml }
										</span>
										{ ! hideLabel &&
											'' != icons[ index ].label && (
												<div className="uagb-icon-list__label-wrap">
													<RichText.Content
														tagName="span"
														value={
															icons[ index ].label
														}
														className="uagb-icon-list__label"
													/>
												</div>
											) }
									</div>
								</a>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save: ( props ) => {
			const { attributes, className } = props;

			const {
				block_id,
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				iconPosition,
			} = props.attributes;

			const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

			return (
				<div
					className={ classnames(
						className,
						'uagb-icon-list__outer-wrap',
						`uagb-icon-list__layout-${ icon_layout }`,
						iconPosition == 'top'
							? 'uagb-icon-list__icon-at-top'
							: '',
						labelClass,
						`uagb-block-${ block_id }`
					) }
				>
					<div className="uagb-icon-list__wrap">
						{ icons.map( ( icon, index ) => {
							if ( icon_count <= index ) {
								return;
							}

							const url = '';
							let imageIconHtml = '';

							if ( icon.image_icon == 'icon' ) {
								if ( icon.icon ) {
									imageIconHtml = (
										<span className="uagb-icon-list__source-icon">
											{ renderSVG( icon.icon ) }
										</span>
									);
								}
							}
							if ( icon.image ) {
								imageIconHtml = (
									<img
										className="uagb-icon-list__source-image"
										src={ icon.image.url }
									/>
								);
							}

							const target = icon.target ? '_blank' : '_self';
							const linkUrl = ! icon.disableLink
								? icon.link
								: '/';

							if ( icon.disableLink ) {
								return (
									<div
										className={ classnames(
											`uagb-icon-list-repeater-${ index }`,
											'uagb-icon-list__wrapper'
										) }
										key={ index }
									>
										<div className="uagb-icon-list__content-wrap">
											<span className="uagb-icon-list__source-wrap">
												{ imageIconHtml }
											</span>
											{ ! hideLabel &&
												'' != icons[ index ].label && (
													<div className="uagb-icon-list__label-wrap">
														<RichText.Content
															tagName="span"
															value={
																icons[ index ]
																	.label
															}
															className="uagb-icon-list__label"
														/>
													</div>
												) }
										</div>
									</div>
								);
							}

							return (
								<a
									className={ classnames(
										`uagb-icon-list-repeater-${ index }`,
										'uagb-icon-list__wrapper'
									) }
									key={ index }
									target={ target }
									rel="noopener noreferrer"
									href={ linkUrl }
								>
									<div className="uagb-icon-list__content-wrap">
										<span className="uagb-icon-list__source-wrap">
											{ imageIconHtml }
										</span>
										{ ! hideLabel &&
											'' != icons[ index ].label && (
												<div className="uagb-icon-list__label-wrap">
													<RichText.Content
														tagName="span"
														value={
															icons[ index ].label
														}
														className="uagb-icon-list__label"
													/>
												</div>
											) }
									</div>
								</a>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
