/**
 * BLOCK: Buttons Child - Edit Class
 */

// Import classes
import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import React from 'react';

const Render = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		className,
		label,
		inheritFromTheme,
		icon,
		iconPosition,
	} = attributes;

	const iconHtml = ( curr_position ) => {
		if ( '' !== icon && curr_position === iconPosition ) {
			return (
				<span
					className={ classnames(
						`uagb-button__icon`,
						`uagb-button__icon-position-${ iconPosition }`
					) }
				>
					{ renderSVG( icon ) }
				</span>
			);
		}
		return null;
	};

	return (
		<div
			className={ classnames(
				className,
				'uagb-buttons__outer-wrap',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`,
				inheritFromTheme ? 'wp-block-button' : null
			) }
		>
			<div className="uagb-button__wrapper">
				<div
					className={ classnames(
						'uagb-buttons-repeater',
						inheritFromTheme ? 'wp-block-button__link' : null
					) }
				>
					{ iconHtml( 'before' ) }
					<RichText
						placeholder={ __( 'Add text…' ) }
						value={ label }
						tagName="div"
						onChange={ ( value ) => {
							setAttributes( { label: value } );
						} }
						allowedFormats={ [ 'bold', 'italic', 'strikethrough' ] }
						className="uagb-button__link"
						rel="noopener noreferrer"
						keepPlaceholderOnFocus
					/>
					{ iconHtml( 'after' ) }
				</div>
			</div>
		</div>
	);
};

export default React.memo( Render );
