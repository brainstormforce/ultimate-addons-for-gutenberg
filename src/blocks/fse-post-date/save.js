/**
 * BLOCK: Post Date - Save Block
 */

const { __ } = wp.i18n
const { dateI18n, format , __experimentalGetSettings} = wp.date
export default function save( props ) {
    const { attributes } = props

    const {
		block_id,
        date,
        iconPosition
    } = attributes

	const dateFormat = __experimentalGetSettings().formats.date 
    if ( date === null || date === undefined) {
        return __('No Data Found', 'ultimate-addons-for-gutenberg')
    }
   
    return <div className={ `uagb-post-date__wrap uagb-block-${block_id}`}>
                {(iconPosition === 'before' &&
                <span className="dashicons-calendar dashicons"></span>
                )}
                <time dateTime={ format( "c", date ) }> 
                    { dateI18n( dateFormat, date ) }
                </time>
                {(iconPosition === 'after' &&
                <span className="dashicons-calendar dashicons"></span>
                )}
            </div>
             
}
