/**
 * BLOCK: FAQ
 */

import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import React, { useLayoutEffect, useMemo } from 'react';
import styles from './editor.lazy.scss';

const ALLOWED_BLOCKS = [ 'uagb/faq-child' ];

const faq = [];
const faqCount = 2;

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
	const { equalHeight } = attributes;

	const getFaqChildTemplate = useMemo( () => {
		const childFaq = [];

		for ( let i = 0; i < faqCount; i++ ) {
			childFaq.push( [ 'uagb/faq-child', faq[ i ] ] );
		}

		return childFaq;
	}, [ faqCount, faq ] );

	const equalHeightClass = equalHeight ? 'uagb-faq-equal-height' : '';

	return (
		<div
			className={ classnames(
				'uagb-faq__outer-wrap',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`,
				`uagb-faq-icon-${ props.attributes.iconAlign }`,
				`uagb-faq-layout-${ props.attributes.layout }`,
				`uagb-faq-expand-first-${ props.attributes.expandFirstItem }`,
				`uagb-faq-inactive-other-${ props.attributes.inactiveOtherItems }`,
				equalHeightClass
			) }
			data-faqtoggle={ props.attributes.enableToggle }
			role="tablist"
		>
			<InnerBlocks
				template={ getFaqChildTemplate }
				templateLock={ false }
				allowedBlocks={ ALLOWED_BLOCKS }
				__experimentalMoverDirection={ 'vertical' }
			/>
		</div>
	);
};

export default React.memo( Render );
