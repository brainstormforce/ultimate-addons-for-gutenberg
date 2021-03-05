/**
 * BLOCK: FSE Post Content - Save Block
 */
import classnames from "classnames"
export default function save( props ) {

    const { block_id, content } = props.attributes
    
    return  <div className={ classnames(
              `uagb-block-${ block_id }`,
              "uagb-fse-post-content__wrap",
              ) }
                dangerouslySetInnerHTML={{ __html: content }}>
            </div>                      
               
}
