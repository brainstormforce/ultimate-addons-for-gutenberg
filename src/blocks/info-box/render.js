import classnames from "classnames"
import Prefix from "./components/Prefix"
import Title from "./components/Title"
import Icon from "./components/Icon"
import InfoBoxDesc from "./components/InfoBoxDesc"
import InfoBoxPositionClasses from "./classes"
import InfoBoxSeparator from "./components/InfoBoxSeparator"
import CallToAction from "./components/CallToAction"
import InfoBoxIconImage from "./components/IconImage"

const infoBoxRender = props =>{
   
    const { className, attributes , setAttributes } = props

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
        showDesc,
        block_id
    } = attributes
    // Get icon/Image components.
    let is_image = ""
    if( source_type === "icon" && icon !== "" ) {
        is_image =  <Icon attributes={attributes}/>
    }else{
        is_image = <InfoBoxIconImage attributes={attributes} />
    }

    var icon_image_html = is_image
    var seperator_position = seperatorPosition
    var seperator_html = <InfoBoxSeparator attributes={attributes} />
    var show_seperator = true

    if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition =="below-title" ) ){
        show_seperator = false
        icon_image_html = (
            <>
                { is_image }
                { "none" !== seperatorStyle && seperator_html }
            </>
        )
    }

    if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
        seperator_position = "after_title"
    }

    if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
        show_seperator = false
        icon_image_html = (
            <>
                { "none" !== seperatorStyle && seperator_html }
                { is_image }
            </>
        )
    }

    // Get description and seperator components.
    const desc = (
        <>
            { "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
            <div className = "uagb-ifb-text-wrap">
                { showDesc && <InfoBoxDesc attributes={attributes} setAttributes = { setAttributes } props = { props } />}
                { "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
                <CallToAction attributes={attributes} setAttributes = { setAttributes } />
            </div>
        </>
    )

    // Get Title and Prefix components.
    const title_text = (
        <>
            <div className = "uagb-ifb-title-wrap">
                { showPrefix && <Prefix attributes={attributes} setAttributes = { setAttributes } props = { props } /> }
                { "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
                { showTitle && <Title attributes={attributes} setAttributes = { setAttributes } props = { props } /> }
            </div>
        </>
    )

    const output = (
        <div className = { classnames( "uagb-infobox__content-wrap",
            ( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
            ...InfoBoxPositionClasses( attributes ) ) }>
            <div className = "uagb-ifb-left-right-wrap">
                { ( iconimgPosition == "left") &&
                        icon_image_html
                }
                <div className = "uagb-ifb-content">

                    {  iconimgPosition == "above-title" && icon_image_html }

                    { ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

                    { iconimgPosition == "below-title"  && icon_image_html }

                    { ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

                    { ( iconimgPosition === "left-title") &&
                            <>
                                <div className = "uagb-ifb-left-title-image">
                                    { icon_image_html }
                                    { title_text }
                                </div>
                                { desc }
                            </>
                    }

                    { ( iconimgPosition === "right-title") &&
                            <>
                                <div className = "uagb-ifb-right-title-image">
                                    { title_text }
                                    { icon_image_html }
                                </div>
                                { desc }
                            </>
                    }

                    { ( iconimgPosition == "left" || iconimgPosition == "right") &&
                            <>
                                { title_text }
                                { desc }
                            </>
                    }

                </div>

                { ( iconimgPosition == "right") && icon_image_html	}
            </div>
        </div>
    )

    return <div className={ classnames(
                className,
                "uagb-infobox__outer-wrap",
                `uagb-block-${block_id}`
            ) }
            >
                { ( ctaType == "all") &&
                <>
                    <a className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" aria-label={"Infobox Link"} rel ="noopener noreferrer"></a>
                    {output}
                </>
                }
                { ( ctaType !== "all") && output }
            </div>
}
export default infoBoxRender