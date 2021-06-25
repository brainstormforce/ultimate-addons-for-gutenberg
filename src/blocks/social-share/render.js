/**
 * BLOCK: Social Share - Editor Render.
 */

import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import React, { useLayoutEffect, useMemo } from 'react';
import styles from './editor.lazy.scss';

const ALLOWED_BLOCKS = [ 'uagb/social-share-child' ];

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

	const { className, social_count, socials, social_layout } = attributes;

	const getSocialShareTemplate = useMemo( () => {
		const childSocialShare = [];

		for ( let i = 0; i < social_count; i++ ) {
			childSocialShare.push( [
				'uagb/social-share-child',
				socials[ i ],
			] );
		}

		return childSocialShare;
	}, [ social_count, socials ] );

	return (
		<div
			className={ classnames(
				className,
				'uagb-social-share__outer-wrap',
				`uagb-social-share__layout-${ social_layout }`,
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<InnerBlocks
				template={ getSocialShareTemplate }
				templateLock={ false }
				allowedBlocks={ ALLOWED_BLOCKS }
				__experimentalMoverDirection={ social_layout }
			/>
		</div>
	);
};

export default React.memo( Render );
