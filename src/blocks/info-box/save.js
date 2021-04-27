/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import Prefix from "./components/Prefix"
import Title from "./components/Title"
import InfoBoxDesc from "./components/InfoBoxDesc"
import Icon from "./components/Icon"
import InfoBoxPositionClasses from "./classes"
import InfoBoxSeparator from "./components/InfoBoxSeparator"
import InfoBoxCta from "./components/CallToAction"
import InfoBoxIconImage from "./components/IconImage"

export default function save( props ) {
	
	const { className, attributes } = props
	const {
		iconimgPosition,
		block_id,
		source_type,
		seperatorStyle,
		ctaType,
		ctaLink,
		ctaTarget,
		prefixTitle,
		infoBoxTitle,
		headingDesc,
		showPrefix,
		showTitle,
		showDesc,
		icon,
		seperatorPosition
	} = attributes

	// Get icon/Image components.
	let is_image = ""

	if( source_type === "icon" && icon !== "" ) {
        is_image =  Icon(props)
    }else{
        is_image = InfoBoxIconImage(attributes)
    }
    let target ="_self"
	if( ctaTarget ){
		target ="_blank"
	}
    var icon_image_html = is_image
    var seperator_position = seperatorPosition
    var seperator_html = InfoBoxSeparator()
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
    const desc = () => {
        return <>
                    { "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
                    <div className = "uagb-ifb-text-wrap">
                        { showDesc && "" !== headingDesc && InfoBoxDesc(attributes , 'not_set' , props)}
                        { "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
                        { ctaType !== "none" && InfoBoxCta(attributes, 'not_set')}
                    </div>
                </>
    }

    // Get Title and Prefix components.
    const title_text = () => {
        return <div className = "uagb-ifb-title-wrap">
                    { showPrefix && "" !== prefixTitle && Prefix(attributes , 'not_set' , props) }
                    { "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
                    { showTitle && "" !== infoBoxTitle && Title(attributes , 'not_set' , props) }
                </div>
                
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
                                <>
                                    <div className = "uagb-ifb-left-title-image">
                                        { icon_image_html }
                                        { title_text() }
                                    </div>
                                    { desc() }
                                </>
                        }

                        { ( iconimgPosition === "right-title" ) &&
                                <>
                                    <div className = "uagb-ifb-right-title-image">
                                        { title_text() }
                                        { icon_image_html }
                                    </div>
                                    { desc() }
                                </>
                        }

                        { ( iconimgPosition == "left" || iconimgPosition == "right" ) &&
                                <>
                                    { title_text() }
                                    { desc() }
                                </>
                        }

                    </div>

                    { ( iconimgPosition == "right" ) && icon_image_html	}
                </div>
            </div>
    }

    return (<div className={ classnames(
                className,
                "uagb-infobox__outer-wrap",
                `uagb-block-${block_id}`
            ) }
            >
                { ( ctaType == "all") &&
				<a href= {ctaLink} className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" target={target} aria-label={"Infobox Link"} rel ="noopener noreferrer"></a>
			}
			{output}
            </div>)
}
