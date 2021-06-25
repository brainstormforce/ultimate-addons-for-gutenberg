/**
 * BLOCK: WP Search - Save Block
 */

import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const {
		block_id,
		layout,
		placeholder,
		buttonType,
		buttonText,
	} = props.attributes;

	const renderClassic = () => {
		if ( 'input-button' === layout ) {
			return (
				<form
					className="uagb-search-wrapper"
					role="search"
					action={ uagb_blocks_info.uagb_home_url }
					method="get"
				>
					<div className="uagb-search-form__container" role="tablist">
						<input
							placeholder={ placeholder }
							className="uagb-search-form__input"
							type="search"
							name="s"
							title="Search"
						/>

						<button className="uagb-search-submit" type="submit">
							{ 'icon' === buttonType && (
								<span className="uagb-wp-search-button-icon-wrap">
									{ renderSVG( 'fas fa-search' ) }
								</span>
							) }
							{ 'text' === buttonType && (
								<RichText.Content
									tagName="span"
									value={ buttonText }
									className="uagb-wp-search-button-text"
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
				`uagb-block-${ block_id }`,
				`uagb-layout-${ layout }`
			) }
		>
			{ renderClassic() }
			{ renderMinimal() }
		</div>
	);
}
