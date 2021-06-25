import classnames from 'classnames';
import ContentTmClasses from '.././classes';
import React, { useMemo } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'uagb/content-timeline-child' ];

const Render = ( props ) => {
	props = props.parentProps;

	// Setup the attributes.
	const {
		className,
		deviceType,
		attributes: { tm_content, timelineItem },
	} = props;

	const getContentTimelineTemplate = useMemo( () => {
		const childTimeline = [];

		for ( let i = 0; i < timelineItem; i++ ) {
			childTimeline.push( [
				'uagb/content-timeline-child',
				tm_content[ i ],
			] );
		}

		return childTimeline;
	}, [ timelineItem, tm_content ] );

	return (
		<div
			className={ classnames(
				className,
				'uagb-timeline__outer-wrap',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId }`,
				'uagb-timeline__content-wrap',
				...ContentTmClasses( props.attributes )
			) }
		>
			<div className="uagb-timeline__main">
				<div className="uagb-timeline__days">
					<InnerBlocks
						template={ getContentTimelineTemplate }
						templateLock={ false }
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
				<div className="uagb-timeline__line">
					<div className="uagb-timeline__line__inner"></div>
				</div>
			</div>
		</div>
	);
};

export default React.memo( Render );
