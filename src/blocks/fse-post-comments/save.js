/**
 * BLOCK: Post Comment - Save Block
 */

const { __ } = wp.i18n

export default function save( props ) {
    const { attributes } = props

    const {
		block_id,
        postComments
    } = attributes

    if(postComments && postComments.length){
    return (<div className={`uagb-block-${ block_id }`}>
            {postComments.map(( comment , index) =>{
            return <div className="uagb-post-comments__wrap" key={ comment.id }>
                            <div className="uagb-post-comments__author-wrap">
                                <div className="uagb-post-comments__avatar-wrap">
                                    <img className="uagb-post-comments__avatar" src={comment.author_avatar_urls[24]}/>
                                </div>
                                <div className="uagb-post-comments__author">{comment.author_name}{ __('Says :','ultimate-addons-for-gutenberg')}</div>
                            </div>
                            <div className="uagb-post-comments__content" 
                            dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></div>
                        </div>
                })
            }
            </div>);
    }else{
        return __('No Comment','ultimate-addons-for-gutenberg')
    }
}
