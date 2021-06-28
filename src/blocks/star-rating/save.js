/**
 * BLOCK: Star Rating - Save Block
 */

import classnames from "classnames"
import { RichText } from "@wordpress/block-editor"

export default function save( props ) {
	
	const {
		block_id,
		title,
		rating,
		range,
	} = props.attributes

	let range_value = parseInt(range);
	var stars = [];
	for (var i = 1; i <= range_value; i++) {
		stars.push(<span class="uag-star">★</span>);
	}
	return (
		<div
			className={ classnames(
				props.className,
				"uag-star-rating__wrapper",
				`uagb-block-${block_id}`,
			) }
		>
			{ title &&
				<RichText.Content
					tagName="p"
					value={ title }
					className='uag-star-rating__title'
				/>
			}
			<div class="uag-star-rating" title={`${rating}/${range}`}>
				{ stars }
			</div>
		</div>
	)
}
