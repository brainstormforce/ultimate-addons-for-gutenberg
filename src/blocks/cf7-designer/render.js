import classnames from 'classnames';
import React, { useLayoutEffect } from 'react';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';
import { SelectControl, Placeholder, Spinner } from '@wordpress/components';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const { className, attributes } = props;

	const {
		formId,
		align,
		isHtml,
		formJson,
		fieldStyle,
		buttonAlignment,
		enableOveride,
		validationMsgPosition,
		enableHighlightBorder,
	} = attributes;

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectForm = ( id ) => {
		const { setAttributes } = props;

		if ( ! id ) {
			setAttributes( { isHtml: false } );
			setAttributes( { formId: null } );
			return;
		}

		setAttributes( { isHtml: false } );
		setAttributes( { formId: id } );
	};

	let html = '';

	if ( formJson && formJson.data.html ) {
		html = formJson.data.html;
	}

	if ( formId == 0 ) {
		return (
			<Placeholder
				icon="admin-post"
				label={ __(
					'Select a Contact Form 7',
					'ultimate-addons-for-gutenberg'
				) }
			>
				<SelectControl
					value={ formId }
					onChange={ onSelectForm }
					options={ uagb_blocks_info.cf7_forms }
				/>
			</Placeholder>
		);
	}

	return (
		<div
			className={ classnames(
				className,
				'uagb-cf7-styler__outer-wrap',
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<div
				className={ classnames(
					`uagb-cf7-styler__align-${ align }`,
					`uagb-cf7-styler__field-style-${ fieldStyle }`,
					`uagb-cf7-styler__btn-align-${ buttonAlignment }`,
					`uagb-cf7-styler__highlight-style-${ validationMsgPosition }`,
					enableOveride ? 'uagb-cf7-styler__check-style-enabled' : '',
					enableHighlightBorder
						? 'uagb-cf7-styler__highlight-border'
						: ''
				) }
			>
				{ isHtml && (
					<div dangerouslySetInnerHTML={ { __html: html } } />
				) }
				{ isHtml == false && (
					<Placeholder
						icon="admin-post"
						label={ __(
							'Loading',
							'ultimate-addons-for-gutenberg'
						) }
					>
						<Spinner />
					</Placeholder>
				) }
			</div>
		</div>
	);
};

export default React.memo( Render );
