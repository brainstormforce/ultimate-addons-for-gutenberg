/**
 * BLOCK: Post Title - Save Block
 */

import classnames from "classnames"

export default function save( props ) {

    const {
		block_id,
		titleTag,
        titleText
	} = props.attributes
    var Tag = titleTag;
    return(
        <div className={ classnames(
				props.className,
				`uagb-block-${block_id}`,					
			) }
        >
            <div className="uagb-post-title__wrap">
                <Tag className="uagb-post-title__text">
                    { titleText }
                </Tag>
            </div>
        </div>
    );
}