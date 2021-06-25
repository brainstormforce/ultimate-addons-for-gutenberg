import classnames from 'classnames';
import { SelectControl, Placeholder, Spinner } from '@wordpress/components';
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
	const { className, attributes, setAttributes } = props;
	// Setup the attributes.
	const {
		formId,
		align,
		isHtml,
		formJson,
		titleDescStyle,
		fieldStyle,
		buttonAlignment,
		enableLabel,
		enableOveride,
		advancedValidationSettings,
	} = attributes;

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectForm = ( id ) => {
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
					'Select a Gravity Form',
					'ultimate-addons-for-gutenberg'
				) }
			>
				<SelectControl
					value={ formId }
					onChange={ onSelectForm }
					options={ uagb_blocks_info.gf_forms }
				/>
			</Placeholder>
		);
	}
	return (
		<div
			className={ classnames(
				className,
				'uagb-gf-styler__outer-wrap',
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<div
				className={ classnames(
					`uagb-gf-styler__align-${ align }`,
					`uagb-gf-styler__field-style-${ fieldStyle }`,
					`uagb-gf-styler__btn-align-${ buttonAlignment }`,
					`uagb-gf-styler__gform-heading-${ titleDescStyle }`,
					enableOveride ? 'uagb-gf-styler__check-style-enabled' : '',
					enableLabel ? 'uagb-gf-styler__hide-label' : '',
					advancedValidationSettings
						? 'uagb-gf-styler__error-yes'
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
