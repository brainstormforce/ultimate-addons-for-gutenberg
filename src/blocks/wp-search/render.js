import classnames from 'classnames';
import React, { useLayoutEffect } from 'react';
import renderSVG from '@Controls/renderIcon';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

import { RichText } from '@wordpress/block-editor';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		block_id,
		layout,
		placeholder,
		buttonType,
		buttonText,
	} = attributes;

	const renderClassic = () => {
		if ( 'input-button' === layout ) {
			return (
				<form
					className="uagb-search-wrapper"
					onSubmit={ ( e ) => e.preventDefault() }
					role="search"
					action={ uagb_blocks_info.uagb_home_url }
					method="get"
				>
					<div
						className="uagb-search-form__container wp-block-button"
						role="tablist"
					>
						<input
							placeholder={ placeholder }
							className="uagb-search-form__input"
							type="search"
							name="s"
							title="Search"
						/>

						<button
							className="uagb-search-submit wp-block-button__link"
							type="submit"
						>
							{ 'icon' === buttonType && (
								<span className="uagb-wp-search-button-icon-wrap">
									{ renderSVG( 'fas fa-search' ) }
								</span>
							) }
							{ 'text' === buttonType && (
								<RichText
									tagName="span"
									placeholder={ __(
										'Search',
										'ultimate-addons-for-gutenberg'
									) }
									value={ buttonText }
									onChange={ ( value ) =>
										setAttributes( {
											buttonText: value,
										} )
									}
									className="uagb-wp-search-button-text"
									multiline={ false }
									allowedFormats={ [
										'core/bold',
										'core/italic',
										'core/strikethrough',
									] }
								/>
							) }
						</button>
					</div>
				</form>
			);
		}

		return '';
	};

	const renderMinimal = () => {
		if ( 'input' === layout ) {
			return (
				<form
					className="uagb-search-wrapper"
					onSubmit={ ( e ) => e.preventDefault() }
					role="search"
					action={ uagb_blocks_info.uagb_home_url }
					method="get"
				>
					<div className="uagb-search-form__container" role="tablist">
						<span className="uagb-wp-search-icon-wrap">
							{ renderSVG( 'fas fa-search' ) }
						</span>
						<input
							placeholder={ placeholder }
							className="uagb-search-form__input"
							type="search"
							name="s"
							title="Search"
						/>
					</div>
				</form>
			);
		}

		return '';
	};

	return (
		<div
			className={ classnames(
				'uagb-wp-search__outer-wrap',
				`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
				`uagb-block-${ block_id }`,
				`uagb-layout-${ layout }`
			) }
		>
			{ renderClassic() }
			{ renderMinimal() }
		</div>
	);
};

export default React.memo( Render );
