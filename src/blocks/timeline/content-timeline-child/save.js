/**
 * BLOCK: Content timeline child - Save Block
 */

import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';

import { dateI18n } from '@wordpress/date';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const {
		block_id,
		headingTag,
		displayPostDate,
		icon,
		t_date,
		dateFormat,
		time_heading,
		time_desc,
	} = props.attributes;

	const display_inner_date = true;
	const iconClass = 'uagb-timeline__icon-new out-view-uagb-timeline__icon ';
	let postDate = t_date;
	if ( 'custom' != dateFormat ) {
		postDate = dateI18n( dateFormat, t_date );
		if ( postDate === 'Invalid date' ) {
			postDate = t_date;
		}
	}

	let contentClass = '';
	let dayalignClass = '';

	if (
		props.attributes.dayalign_class != 'undefined' &&
		props.attributes.content_class != 'undefined'
	) {
		contentClass = props.attributes.content_class;
		dayalignClass = props.attributes.dayalign_class;
	}
	return (
		<article
			className={ classnames(
				'uagb-timeline__field uagb-timeline__field-wrap',
				`uagb-timeline-child-${ block_id }`
			) }
		>
			<div className={ classnames( contentClass ) }>
				<div className="uagb-timeline__marker out-view-uagb-timeline__icon">
					<span className={ iconClass }>{ renderSVG( icon ) }</span>
				</div>

				<div className={ classnames( dayalignClass ) }>
					<div className="uagb-events-new">
						<div className="uagb-timeline__events-inner-new">
							<div className="uagb-timeline__date-hide uagb-timeline__date-inner">
								{ displayPostDate != true && t_date && (
									<div
										className={
											'uagb-timeline__inner-date-new'
										}
									>
										{ postDate }
									</div>
								) }
							</div>

							<div className="uagb-timeline-content">
								<div className="uagb-timeline__heading-text">
									<RichText.Content
										tagName={ headingTag }
										value={ time_heading }
										className="uagb-timeline__heading"
									/>
								</div>

								<RichText.Content
									tagName="p"
									value={ time_desc }
									className="uagb-timeline-desc-content"
								/>

								<div className="uagb-timeline__arrow"></div>
							</div>
						</div>
					</div>
				</div>
				{ display_inner_date && (
					<div className="uagb-timeline__date-new">
						{ displayPostDate != true && t_date && (
							<div className={ 'uagb-timeline__date-new' }>
								{ postDate }
							</div>
						) }
					</div>
				) }
			</div>
		</article>
	);
}
