/**
 * BLOCK: Tabs Child Block
 */

import React, { useEffect, lazy, Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/tabs-child/render" */ './render' )
);
import { select } from '@wordpress/data';

const UAGBTabsChildEdit = ( props ) => {
	useEffect( () => {
		const { attributes, setAttributes, clientId } = props;
		const { getBlockRootClientId, getBlockAttributes } = ! wp.blockEditor
			? select( 'core/editor' )
			: select( 'core/block-editor' );
		const rootBlockId = getBlockRootClientId( clientId );
		const rootBlockAttrs = getBlockAttributes( rootBlockId );
		setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );
		setAttributes( { tabActive: rootBlockAttrs.tabActiveFrontend } );

		// Apply parent style if newly inserted
		if ( rootBlockAttrs !== null && rootBlockAttrs.needUpdate !== false ) {
			Object.keys( rootBlockAttrs ).map( ( attribute ) => {
				attributes[ attribute ] = rootBlockAttrs[ attribute ];
			} );
		}
	}, [] );

	return (
		<Suspense fallback={ lazyLoader() }>
			<Render parentProps={ props } />
		</Suspense>
	);
};
export default UAGBTabsChildEdit;
