import classnames from "classnames"
import Prefix from "./components/Prefix"
import Title from "./components/Title"
import Icon from "./components/Icon"
import InfoBoxDesc from "./components/InfoBoxDesc"
import InfoBoxPositionClasses from "./classes"
import InfoBoxSeparator from "./components/InfoBoxSeparator"
import InfoBoxCta from "./components/CallToAction"
import InfoBoxIconImage from "./components/IconImage"
const { Fragment } = wp.element

export default function InfoBoxRender(props){
   
    const { className, attributes } = props

    // Setup the attributes.
    const {
        icon,
        iconimgPosition,
        source_type,
        seperatorPosition,
        seperatorStyle,
        ctaType,
        showPrefix,
        showTitle,
        showDesc
    } = attributes

    // Get icon/Image components.
    let is_image = ""

    if( source_type === "icon" && icon !== "" ) {
        is_image =  Icon(props)
    }else{
        is_image = InfoBoxIconImage(props)
    }

    var icon_image_html = is_image
    var seperator_position = seperatorPosition
    var seperator_html = InfoBoxSeparator()
    var show_seperator = true

    if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition =="below-title" ) ){
        show_seperator = false
        icon_image_html = (
            <Fragment>
                { is_image }
                { "none" !== seperatorStyle && seperator_html }
            </Fragment>
        )
    }

    if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
        seperator_position = "after_title"
    }

    if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
        show_seperator = false
        icon_image_html = (
            <Fragment>
                { "none" !== seperatorStyle && seperator_html }
                { is_image }
            </Fragment>
        )
    }

    // Get description and seperator components.
    const desc = () => {
        return <Fragment>
            { "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
            <div className = "uagb-ifb-text-wrap">
                { showDesc && InfoBoxDesc(props)}
                { "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
                {InfoBoxCta(props)}
            </div>
        </Fragment>
    }

    // Get Title and Prefix components.
    const title_text = () => {
        return <Fragment>
                    <div className = "uagb-ifb-title-wrap">
                        { showPrefix && Prefix(props) }
                        { "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
                        { showTitle && Title(props) }
                    </div>
                </Fragment>
    }

    const output = () => {
        return <div className = { classnames( "uagb-infobox__content-wrap",
                ( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
                ...InfoBoxPositionClasses( attributes ) ) }>
                <div className = "uagb-ifb-left-right-wrap">
                    { ( iconimgPosition == "left" ) &&
                            icon_image_html
                    }
                    <div className = "uagb-ifb-content">

                        {  iconimgPosition == "above-title" && icon_image_html }

                        { ( iconimgPosition == "above-title" || iconimgPosition == "below-title" ) && title_text() }

                        { iconimgPosition == "below-title"  && icon_image_html }

                        { ( iconimgPosition == "above-title" || iconimgPosition == "below-title" ) && desc() }

                        { ( iconimgPosition === "left-title" ) &&
                                <Fragment>
                                    <div className = "uagb-ifb-left-title-image">
                                        { icon_image_html }
                                        { title_text() }
                                    </div>
                                    { desc() }
                                </Fragment>
                        }

                        { ( iconimgPosition === "right-title" ) &&
                                <Fragment>
                                    <div className = "uagb-ifb-right-title-image">
                                        { title_text() }
                                        { icon_image_html }
                                    </div>
                                    { desc() }
                                </Fragment>
                        }

                        { ( iconimgPosition == "left" || iconimgPosition == "right" ) &&
                                <Fragment>
                                    { title_text() }
                                    { desc() }
                                </Fragment>
                        }

                    </div>

                    { ( iconimgPosition == "right" ) && icon_image_html	}
                </div>
            </div>
    }

    return <div className={ classnames(
                className,
                "uagb-infobox__outer-wrap",
                `uagb-block-${ props.clientId.substr( 0, 8 ) }`
            ) }
            >
                { ( ctaType == "all" ) &&<Fragment>
                    <a className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" aria-label={"Infobox Link"} rel ="noopener noreferrer"></a>
                    {output()}
                </Fragment>
                }
                { ( ctaType !== "all" ) && output() }
            </div>
}