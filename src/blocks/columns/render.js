/**
 * BLOCK: Columns - Editor Render.
 */

import classnames from 'classnames';
import shapes from './shapes';
import React, { useLayoutEffect, useMemo } from 'react';

const ALLOWED_BLOCKS = [ 'uagb/column' ];
import { InnerBlocks } from '@wordpress/block-editor';
import styles from './editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { attributes, isSelected, className, deviceType } = props.parentProps;

	const {
		stack,
		align,
		vAlign,
		tag,
		columnGap,
		backgroundType,
		backgroundVideo,
		columns,
		bottomType,
		topType,
		bottomFlip,
		topFlip,
		reverseTablet,
		reverseMobile,
		topContentAboveShape,
		bottomContentAboveShape,
	} = attributes;

	const getColumnsTemplate = useMemo( () => {
		const childColumns = [];

		for ( let i = 0; i < columns; i++ ) {
			childColumns.push( [ 'uagb/column', { id: i + 1 } ] );
		}

		return childColumns;
	}, [ columns ] );

	const topDividerHtml = topType != 'none' && (
		<div
			className={ classnames(
				'uagb-columns__shape',
				'uagb-columns__shape-top',
				{ 'uagb-columns__shape-flip': topFlip === true },
				{
					'uagb-columns__shape-above-content':
						topContentAboveShape === true,
				}
			) }
		>
			{ shapes[ topType ] }
		</div>
	);

	const bottomDividerHtml = bottomType != 'none' && (
		<div
			className={ classnames(
				'uagb-columns__shape',
				'uagb-columns__shape-bottom',
				{ 'uagb-columns__shape-flip': bottomFlip === true },
				{
					'uagb-columns__shape-above-content':
						bottomContentAboveShape === true,
				}
			) }
			data-negative="false"
		>
			{ shapes[ bottomType ] }
		</div>
	);

	const reverseTabletClass = reverseTablet
		? 'uagb-columns__reverse-tablet'
		: '';

	const reverseMobileClass = reverseMobile
		? 'uagb-columns__reverse-mobile'
		: '';

	const CustomTag = `${ tag }`;

	const active = isSelected ? 'active' : 'not-active';

	return (
		<CustomTag
			className={ classnames(
				className,
				'uagb-columns__wrap',
				`uagb-columns__background-${ backgroundType }`,
				`uagb-columns__edit-${ active }`,
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-columns__stack-${ stack }`,
				`uagb-columns__valign-${ vAlign }`,
				`uagb-columns__gap-${ columnGap }`,
				`align${ align }`,
				reverseTabletClass,
				reverseMobileClass,
				`uagb-block-${ props.parentProps.clientId.substr( 0, 8 ) }`,
				`uagb-columns__columns-${ columns }`
			) }
		>
			<div className="uagb-columns__overlay"></div>
			{ topDividerHtml }
			{ 'video' == backgroundType && (
				<div className="uagb-columns__video-wrap">
					{ backgroundVideo && (
						<video autoPlay loop muted playsinline>
							<source
								src={ backgroundVideo.url }
								type="video/mp4"
							/>
						</video>
					) }
				</div>
			) }
			<InnerBlocks
				template={ getColumnsTemplate }
				templateLock="all"
				allowedBlocks={ ALLOWED_BLOCKS }
			/>
			{ bottomDividerHtml }
		</CustomTag>
	);
};

export default React.memo( Render );
