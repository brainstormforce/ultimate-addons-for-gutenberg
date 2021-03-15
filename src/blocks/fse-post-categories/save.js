/**
 * BLOCK: Fse Post Categories - Save Block
 */

const { __ } = wp.i18n

export default function save( props ) {
    const { attributes } = props

    const {
		block_id,
        categories,
        iconPosition
    } = attributes

    if (  categories === undefined || categories === null) {
        return __('No Data Found', 'ultimate-addons-for-gutenberg')
    }else if(categories.length === 0){
        return __('No Data Found', 'ultimate-addons-for-gutenberg')
    }

    return <div className={`uagb-post-categories__wrap uagb-block-${ block_id }`}>
                {(iconPosition === 'before' &&
					<span className="dashicons-tag dashicons"></span>
				)}
                 <div className="uagb-post-categories__name">{categories.join(" ")} </div>
                {(iconPosition === 'after' &&
					<span className="dashicons-tag dashicons"></span>
				)}
            </div>
}
