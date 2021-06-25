// Import classes
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import React, { useLayoutEffect, useMemo } from 'react';
import styles from './editor.lazy.scss';

const ALLOWED_BLOCKS = [ 'uagb/icon-list-child' ];

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;
	const { attributes, deviceType } = props;

	const {
		className,
		icon_count,
		icon_layout,
		iconPosition,
		hideLabel,
		block_id,
	} = attributes;

	const labelClass = hideLabel ? 'uagb-icon-list__no-label' : '';

	const getIconTemplate = useMemo( () => {
		const childIconList = [];

		for ( let i = 0; i < icon_count; i++ ) {
			childIconList.push( [ 'uagb/icon-list-child', { id: i + 1 } ] );
		}

		return childIconList;
	}, [ icon_count ] );

	return (
		<div
			className={ classnames(
				className,
				'uagb-icon-list__outer-wrap',
				`uagb-icon-list__layout-${ icon_layout }`,
				iconPosition == 'top' ? 'uagb-icon-list__icon-at-top' : '',
				labelClass,
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ block_id }`
			) }
		>
			<div className="uagb-icon-list__wrap">
				<InnerBlocks
					template={ getIconTemplate }
					templateLock={ false }
					allowedBlocks={ ALLOWED_BLOCKS }
					__experimentalMoverDirection={ icon_layout }
				/>
			</div>
		</div>
	);
};
export default React.memo( Render );
