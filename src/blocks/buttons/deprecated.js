/**
 * BLOCK: Buttons - Deprecated Block
 */

import classnames from "classnames";
import times from "lodash/times";
import attributes from "./attributes";

const { __ } = wp.i18n;

const {
	RichText
} = wp.blockEditor;

const deprecated = [
	{
		attributes,
		save: props => {

			const { attributes, className } = props;

			const {
				block_id,
				align,
				items,
				buttons,
				btn_count,
			} = props.attributes;

			const renderButtons = ( index ) => {

				if ( "undefined" !== typeof buttons[index] ) {

					return (
						<div
							className={ classnames(
								`uagb-buttons-repeater-${index}`,
								"uagb-button__wrapper"
							) }
							key={ index }
						>
							<RichText.Content
								placeholder={ __( "Click Here" ) }
								value={ buttons[index].label }
								tagName='a'
								className='uagb-button__link'
								href={ buttons[index].link }
								rel="noopener noreferrer"
								target={ buttons[index].target }
							/>
						</div>
					);
				}
			};

			return (
				<div className={ classnames(
					className,
					"uagb-buttons__outer-wrap"
				) }
				id={ `uagb-buttons-${ block_id }` }
				>
					<div className="uagb-buttons__wrap">
						{ times( btn_count, n => renderButtons( n ) ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save: props => {
			const { attributes, className } = props;

			const {
				block_id,
				align,
				items,
				buttons,
				btn_count,
			} = props.attributes;

			const renderButtons = ( index ) => {

				if ( "undefined" !== typeof buttons[index] ) {

					return (
						<div
							className={ classnames(
								`uagb-buttons-repeater-${index}`,
								"uagb-button__wrapper"
							) }
							key={ index }
						>
							<RichText.Content
								value={ buttons[index].label }
								tagName='a'
								className='uagb-button__link'
								href={ buttons[index].link }
								rel="noopener noreferrer"
								target={ buttons[index].target }
							/>
						</div>
					);
				}
			};

			return (
				<div className={ classnames(
					className,
					"uagb-buttons__outer-wrap"
				) }
				id={ `uagb-buttons-${ block_id }` }
				>
					<div className="uagb-buttons__wrap">
						{ times( btn_count, n => renderButtons( n ) ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes,
		save: props => {
			const { attributes, className } = props;

			const {
				block_id,
				align,
				items,
				buttons,
				btn_count,
			} = props.attributes;

			const renderButtons = ( index ) => {

				if ( "undefined" !== typeof buttons[index] ) {

					return (
						<div
							className={ classnames(
								`uagb-buttons-repeater-${index}`,
								"uagb-button__wrapper"
							) }
							key={ index }
						>
							<RichText.Content
								value={ buttons[index].label }
								tagName='a'
								className='uagb-button__link'
								href={ buttons[index].link }
								rel="noopener noreferrer"
								target={ buttons[index].target }
							/>
						</div>
					);
				}
			};

			return (
				<div className={ classnames(
					className,
					"uagb-buttons__outer-wrap",
					`uagb-block-${ block_id }`
				) }
				>
					<div className="uagb-buttons__wrap">
						{ times( btn_count, n => renderButtons( n ) ) }
					</div>
				</div>
			);
		}
	}
];

export default deprecated;