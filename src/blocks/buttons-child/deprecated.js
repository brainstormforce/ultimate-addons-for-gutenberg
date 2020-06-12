/**
 * BLOCK: Multi Buttons - Deprecated Block
 */

import classnames from "classnames"
import times from "lodash/times"
import attributes from "./attributes"

const { __ } = wp.i18n

const {
	RichText
} = wp.blockEditor

const deprecated = [
    {
        attributes,
        save: props => {
            const { attributes, className } = props

            const {
                block_id,
                target,
                link,
                label,
                inheritFromTheme
            } = attributes

            return (
                <div className={ classnames(
                    className,
                    "uagb-buttons__outer-wrap",
                    `uagb-block-${ block_id }`,
                    ( inheritFromTheme ) ? "wp-block-button" : null
                    ) }>
                    <div className="uagb-button__wrapper">
                        <div className="uagb-buttons-repeater">
                            <RichText.Content
                                value={ label }
                                tagName='a'
                                className={classnames( 'uagb-button__link', ( inheritFromTheme ) ? "wp-block-button__link" : null ) }
                                href={ link }
                                rel ="noopener noreferrer"
                                target={ target }
                            />
                        </div>
                    </div>
                </div>
                
            )
        }
    }
]


export default deprecated;