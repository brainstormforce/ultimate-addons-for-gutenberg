/**
 * BLOCK: Advanced Heading - Save Block
 */

import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

export default function save( props ) {
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
			className={ classnames(
				props.className,
				`uagb-block-${ block_id }`
			) }
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
}
