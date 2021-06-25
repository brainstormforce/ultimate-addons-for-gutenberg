// Import block dependencies and components
import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import React, { useLayoutEffect } from 'react';
import styles from './editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;
	// Setup the attributes
	const {
		attributes: {
			block_id,
			icon,
			noticeTitle,
			noticeContent,
			noticeDismiss,
			noticeAlignment,
			headingTag,
		},
		setAttributes,
		className,
	} = props;

	let imageIconHtml = '';

	if ( noticeDismiss ) {
		imageIconHtml = (
			<span className="uagb-notice-dismiss">{ renderSVG( icon ) }</span>
		);
	}
	return (
		<div
			className={ classnames(
				className,
				'uagb-inline_notice__outer-wrap',
				`${ noticeDismiss }`,
				`uagb-inline_notice__align-${ noticeAlignment }`,
				`uagb-block-${ block_id }`
			) }
		>
			{ imageIconHtml }
			<RichText
				tagName={ headingTag }
				placeholder={ __(
					'Notice Title',
					'ultimate-addons-for-gutenberg'
				) }
				keepPlaceholderOnFocus
				value={ noticeTitle }
				className="uagb-notice-title"
				onChange={ ( value ) =>
					setAttributes( { noticeTitle: value } )
				}
			/>
			<RichText
				tagName="div"
				multiline="p"
				placeholder={ __(
					'Add notice text…',
					'ultimate-addons-for-gutenberg'
				) }
				value={ noticeContent }
				className="uagb-notice-text"
				onChange={ ( value ) =>
					setAttributes( { noticeContent: value } )
				}
			/>
		</div>
	);
};
export default React.memo( Render );
