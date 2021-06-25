// Import classes
import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
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
	const { attributes, setAttributes } = props;
	const {
		className,
		label,
		image_icon,
		icon,
		image,
		block_id,
		link,
		target,
		disableLink,
		hideLabel,
	} = attributes;

	let imageIconHtml = '';

	if ( image_icon == 'icon' ) {
		if ( icon ) {
			imageIconHtml = (
				<span className="uagb-icon-list__source-icon">
					{ renderSVG( icon ) }
				</span>
			);
		}
	} else if ( image && image.url ) {
		imageIconHtml = (
			<img
				className="uagb-icon-list__source-image"
				alt=""
				src={ image.url }
			/>
		);
	}

	const targetVal = target ? '_blank' : '_self';
	const linkUrl = ! disableLink ? link : '/';

	return (
		<div
			className={ classnames(
				`uagb-icon-list-repeater`,
				'uagb-icon-list__wrapper',
				className,
				`uagb-block-${ block_id }`
			) }
		>
			{ ! disableLink && (
				<a
					target={ targetVal }
					rel="noopener noreferrer"
					aria-label={ label }
					href={ linkUrl }
				>
					{ ' ' }
				</a>
			) }
			<div className="uagb-icon-list__content-wrap">
				<span className="uagb-icon-list__source-wrap">
					{ imageIconHtml }
				</span>
				{ ! hideLabel && '' != label && (
					<div className="uagb-icon-list__label-wrap">
						<RichText
							tagName="div"
							placeholder={ __(
								'Label Name',
								'ultimate-addons-for-gutenberg'
							) }
							value={ label }
							onChange={ ( value ) =>
								setAttributes( { label: value } )
							}
							className="uagb-icon-list__label"
							placeholder={ __( 'Description' ) }
							multiline={ false }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/strikethrough',
							] }
						/>
					</div>
				) }
			</div>
		</div>
	);
};
export default React.memo( Render );
