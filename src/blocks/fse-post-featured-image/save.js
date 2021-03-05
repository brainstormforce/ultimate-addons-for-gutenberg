/**
 * BLOCK: FSE Featured Image - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
const { __ } = wp.i18n
export default function save( props ) {

	const {
		block_id,
		src
	} = props.attributes
	
	if('#' === src){
		return (
			<div className={ classnames(
				`uagb-block-${ block_id }`,
				"uagb-fse-featured-image__wrap",
			) }>
				{__('This page does not have featured image. Please add Featured Image to display.', 'ultimate-addons-for-gutenberg')}
			</div>
		)
	}else{
		return (
			<div className={ classnames(
				`uagb-block-${ block_id }`,
				"uagb-fse-featured-image__wrap",
			) }>
				<img src={ src }/>
			</div>
		)
	}
}
