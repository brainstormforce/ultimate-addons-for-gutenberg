import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';
import { RichText } from '@wordpress/block-editor';
import React, { useLayoutEffect } from 'react';
const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const state = props.state;
	props = props.parentProps;

	const { attributes, setAttributes } = props;
	const {
		question,
		answer,
		icon,
		iconActive,
		layout,
		headingTag,
	} = attributes;

	const faqRenderIcon = () => {
		return (
			<>
				<span className="uagb-icon uagb-faq-icon-wrap">
					{ renderSVG( icon ) }
				</span>
				<span className="uagb-icon-active uagb-faq-icon-wrap">
					{ renderSVG( iconActive ) }
				</span>
			</>
		);
	};

	const faqRenderHtml = () => {
		return (
			<div className="uagb-faq-item" role="tab" tabIndex="0">
				<div className="uagb-faq-questions-button uagb-faq-questions">
					{ 'accordion' === layout && faqRenderIcon() }
					<RichText
						tagName={ 'span' != headingTag ? headingTag : 'div' }
						placeholder={ __( 'Question' ) }
						value={ question }
						onChange={ ( value ) =>
							setAttributes( { question: value } )
						}
						className="uagb-question"
						multiline={ false }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/strikethrough',
						] }
					/>
				</div>
				<div className="uagb-faq-content">
					<span>
						<RichText
							tagName="p"
							placeholder={ __( 'Answer' ) }
							value={ answer }
							onChange={ ( value ) =>
								setAttributes( { answer: value } )
							}
							multiline={ false }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/strikethrough',
								'core/link',
							] }
						/>
					</span>
				</div>
			</div>
		);
	};

	return (
		<div
			className={ classnames(
				'uagb-faq-child__outer-wrap',
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`,
				props.isSelected && false !== state.isFocused
					? 'uagb-faq__active'
					: ''
			) }
		>
			{ faqRenderHtml() }
		</div>
	);
};

export default React.memo( Render );
