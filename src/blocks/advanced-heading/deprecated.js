/**
 * BLOCK: Advanced Heading - Deprecated Block
 */

import attributes from './attributes';

import { RichText } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes,
		save( props ) {
			const {
				block_id,
				headingTitle,
				headingDesc,
				headingTag,
				seperatorStyle,
			} = props.attributes;

			let seprator_output = '';
			if ( seperatorStyle !== 'none' ) {
				seprator_output = (
					<div className="uagb-separator-wrap">
						<div className="uagb-separator"></div>
					</div>
				);
			}
			return (
				<div
					className={ props.className }
					id={ `uagb-adv-heading-${ block_id }` }
				>
					<RichText.Content
						tagName={ headingTag }
						value={ headingTitle }
						className="uagb-heading-text"
					/>
					{ seprator_output }
					<RichText.Content
						tagName="p"
						value={ headingDesc }
						className="uagb-desc-text"
					/>
				</div>
			);
		},
	},
	{
		attributes,
		save( props ) {
			const {
				block_id,
				headingTitle,
				headingDesc,
				headingTag,
				seperatorStyle,
				headingId,
			} = props.attributes;

			let seprator_output = '';
			if ( seperatorStyle !== 'none' ) {
				seprator_output = (
					<div className="uagb-separator-wrap">
						<div className="uagb-separator"></div>
					</div>
				);
			}
			return (
				<div
					className={ props.className }
					id={ `uagb-adv-heading-${ block_id }` }
				>
					<RichText.Content
						tagName={ headingTag }
						value={ headingTitle }
						className="uagb-heading-text"
						id={ headingId }
					/>
					{ seprator_output }
					<RichText.Content
						tagName="p"
						value={ headingDesc }
						className="uagb-desc-text"
					/>
				</div>
			);
		},
	},
];

export default deprecated;
