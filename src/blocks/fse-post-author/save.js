/**
 * BLOCK: Fse Post Author - Save Block
 */

const { __ } = wp.i18n

export default function save( props ) {
    const { attributes } = props

    const {
		block_id,
    authorName,
    authorLink,
    iconPosition
    } = attributes
                       

      return <div className={`uagb-post-author__wrap uagb-block-${ block_id }`}>
                {(iconPosition === 'before' &&
                  <span className="dashicons-admin-users dashicons"></span>
                )}
                  <a className="uagb-post-author__name" target="_blank" href={ authorLink } rel ="noopener noreferrer">
                    { authorName }
                  </a>
                  {(iconPosition === 'after' &&
                  <span className="dashicons-admin-users dashicons"></span>
                )}
              </div>          
}
