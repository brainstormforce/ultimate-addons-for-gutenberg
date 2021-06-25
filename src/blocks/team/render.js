import classnames from 'classnames';
import React, { useLayoutEffect } from 'react';
import { __ } from '@wordpress/i18n';
import renderSVG from '@Controls/renderIcon';
import { createBlock } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
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

	const {
		className,
		setAttributes,
		attributes,
		mergeBlocks,
		insertBlocksAfter,
		onReplace,
		deviceType,
	} = props;

	const {
		align,
		tag,
		title,
		prefix,
		description_text,
		image,
		imgStyle,
		imgSize,
		imgPosition,
		twitterIcon,
		fbIcon,
		linkedinIcon,
		pinIcon,
		twitterLink,
		fbLink,
		linkedinLink,
		pinLink,
		socialTarget,
		socialEnable,
		stack,
	} = attributes;

	const titleHtml = (
		<div className="uagb-team__title-wrap">
			<RichText
				tagName={ tag }
				value={ title }
				className="uagb-team__title"
				onChange={ ( value ) => setAttributes( { title: value } ) }
				multiline={ false }
				placeholder={ __(
					'Write a Title',
					'ultimate-addons-for-gutenberg'
				) }
				onMerge={ mergeBlocks }
				onSplit={
					insertBlocksAfter
						? ( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', {
										content: after,
									} ),
								] );
						  }
						: undefined
				}
				onRemove={ () => onReplace( [] ) }
			/>
			<RichText
				tagName="div"
				value={ prefix }
				className="uagb-team__prefix"
				onChange={ ( value ) => setAttributes( { prefix: value } ) }
				onMerge={ mergeBlocks }
				placeholder={ __(
					'Write a Designation',
					'ultimate-addons-for-gutenberg'
				) }
				onSplit={
					insertBlocksAfter
						? ( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', {
										content: after,
									} ),
								] );
						  }
						: undefined
				}
				onRemove={ () => onReplace( [] ) }
			/>
		</div>
	);

	const socialHtml = ( icon, link, target ) => {
		const target_value = target ? '_blank' : '_self';

		return (
			<li className="uagb-team__social-icon">
				<a
					href={ link }
					aria-label={ icon }
					target={ target_value }
					title=""
					rel="noopener noreferrer"
				>
					{ renderSVG( icon ) }
				</a>
			</li>
		);
	};

	const socialLinks = (
		<div className="uagb-team__social-icon-wrap">
			<ul className="uagb-team__social-list">
				{ '' != twitterIcon &&
					socialHtml( twitterIcon, twitterLink, socialTarget ) }
				{ '' != fbIcon && socialHtml( fbIcon, fbLink, socialTarget ) }
				{ '' != linkedinIcon &&
					socialHtml( linkedinIcon, linkedinLink, socialTarget ) }
				{ '' != pinIcon &&
					socialHtml( pinIcon, pinLink, socialTarget ) }
			</ul>
		</div>
	);

	// Get description and seperator components.
	const descHtml = (
		<div className="uagb-team__desc-wrap">
			<RichText
				tagName="p"
				value={ description_text }
				placeholder={ __(
					'Write a Description',
					'ultimate-addons-for-gutenberg'
				) }
				className="uagb-team__desc"
				onChange={ ( value ) =>
					setAttributes( { description_text: value } )
				}
				onMerge={ mergeBlocks }
				onSplit={
					insertBlocksAfter
						? ( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', {
										content: after,
									} ),
								] );
						  }
						: undefined
				}
				onRemove={ () => onReplace( [] ) }
			/>
		</div>
	);

	let size = '';
	let imgUrl = '';

	if ( image ) {
		size = image.sizes;
		if ( image.sizes ) {
			imgUrl = size[ imgSize ] ? size[ imgSize ].url : image.url;
		} else {
			imgUrl = image.url;
		}
	}

	let imageHtml = '';

	if ( '' != imgUrl ) {
		imageHtml = (
			<div
				className={ classnames(
					'uagb-team__image-wrap',
					`uagb-team__image-crop-${ imgStyle }`
				) }
			>
				<img
					className=""
					src={ imgUrl }
					alt={ image.alt ? image.alt : '' }
				/>
			</div>
		);
	}

	return (
		<>
			<div
				className={ classnames(
					className,
					'uagb-team',
					'uagb-team__outer-wrap',
					`uagb-team__image-position-${ imgPosition }`,
					`uagb-team__align-${ align }`,
					`uagb-team__stack-${ stack }`,
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ props.clientId.substr( 0, 8 ) }`
				) }
			>
				<div className="uagb-team__wrap">
					{ imgPosition == 'left' && imageHtml }

					<div className="uagb-team__content">
						{ imgPosition == 'above' && imageHtml }

						{ titleHtml }

						{ descHtml }

						{ socialEnable && socialLinks }
					</div>

					{ imgPosition == 'right' && imageHtml }
				</div>
			</div>
		</>
	);
};

export default React.memo( Render );
