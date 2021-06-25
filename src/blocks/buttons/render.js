import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import React, { useLayoutEffect, useMemo } from 'react';
import styles from './editor.lazy.scss';

const ALLOWED_BLOCKS = [ 'uagb/buttons-child' ];

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const { attributes , deviceType } = props;

	const { className, btn_count, buttons, stack } = attributes;

	const getButtonTemplate = useMemo( () => {
		const childButtons = [];

		for ( let i = 0; i < btn_count; i++ ) {
			childButtons.push( [ 'uagb/buttons-child', buttons[ i ] ] );
		}

		return childButtons;
	}, [ btn_count, buttons ] );

	return (
		<div
			className={ classnames(
				className,
				'uagb-buttons__outer-wrap',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<div
				className={ classnames(
					'uagb-buttons__wrap',
					`uagb-buttons-stack-${ stack }`
				) }
			>
				<InnerBlocks
					template={ getButtonTemplate }
					templateLock={ false }
					allowedBlocks={ ALLOWED_BLOCKS }
					__experimentalMoverDirection={
						'desktop' == stack ? 'vertical' : 'horizontal'
					}
				/>
			</div>
		</div>
	);
};

export default React.memo( Render );
