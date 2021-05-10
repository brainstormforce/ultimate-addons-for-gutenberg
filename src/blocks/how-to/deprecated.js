/**
 * BLOCK: How To Schema - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import attributes from "./attributes"

const {
	RichText,
	InnerBlocks
} = wp.blockEditor

const {  
	Fragment 
} = wp.element
const deprecated = [
	{
        attributes,
        save: function( props ) {

            const { attributes, className } = props
            
            const {
                block_id,
                headingTitle,
                headingDesc,
                headingTag,
                timeNeeded,
                time,
                timeIn,
                estCost,
                cost,
                currencyType,
                mainimage,
                toolsTitle,
                stepsTitle,
                materialTitle,
                tools,
                materials,
                schema,
                showTotaltime,
                showEstcost,
                showTools,
                showMaterials,
            } = attributes
        
            let url_chk = ''
            let title = ''
                if( "undefined" !== typeof attributes.mainimage && null !== attributes.mainimage && "" !== attributes.mainimage ){
                    url_chk = attributes.mainimage.url
                    title = attributes.mainimage.title
                }
                
                let url = ''
                if( '' !== url_chk ){
                    let size = attributes.mainimage.sizes
                    let imageSize = attributes.imgSize
        
                    if ( "undefined" !== typeof size && "undefined" !== typeof size[imageSize] ) {
                        url = size[imageSize].url 
                    }else{
                        url = url_chk 
                    }
            }
        
            let image_icon_html = ''
        
            if ( mainimage && mainimage.url ) {
        
                image_icon_html = <img className="uagb-howto__source-image" src={url} title={title}/>
        
            }
        
            return (
                <div
                    className={ classnames(
                        className,
                        `uagb-block-${ block_id }`,					
                    ) }
                >
                    <script type="application/ld+json">
                        { schema }
                    </script>
                <div className="uagb-how-to-main-wrap">
                    <div className="uagb-howto__wrap">
                        <RichText.Content
                            value={ headingTitle }
                            tagName={ headingTag }
                            className='uagb-howto-heading-text'
                        />
                        <RichText.Content
                            value={ headingDesc }
                            tagName='p'
                            className='uagb-howto-desc-text'
                        />
                        { mainimage.url &&
                            <div className="uagb-howto__source-wrap">{image_icon_html}</div>
                        }
                        { showTotaltime &&
                        <span className="uagb-howto__time-wrap">
                            <RichText.Content
                                value={ timeNeeded }
                                tagName='h4'
                                className='uagb-howto-timeNeeded-text'
                            />
                            <RichText.Content
                                value={ time }
                                tagName='p'
                                className='uagb-howto-timeNeeded-value'
                            />
                            <RichText.Content
                                tagName="p"
                                value={ timeIn }
                                className='uagb-howto-timeINmin-text'
                            />
                        </span>
                        }
                        { showEstcost &&
                        <span className="uagb-howto__cost-wrap">
                            <RichText.Content
                                value={ estCost }
                                tagName='h4'
                                className='uagb-howto-estcost-text'
                            />
                            <RichText.Content
                                value={ cost }
                                tagName='p'
                                className='uagb-howto-estcost-value'
                            />
                            <RichText.Content
                                tagName="p"
                                value={ currencyType }
                                className='uagb-howto-estcost-type'
                            />
                        </span>
                        }
                    </div>
                    { showTools &&
                        <div className="uagb-how-to-tools__wrap">
                            <RichText.Content
                                value={ toolsTitle }
                                tagName='h4'
                                className='uagb-howto-req-tools-text'
                            />
                        </div>
                    }
                    { showTools &&
                        <div className="uagb-tools__wrap">
                            {
                                tools.map( ( tools, index ) => {
                                    return (
                                        <div
                                            className={ classnames(
                                                `uagb-how-to-tools-${index}`,
                                                "uagb-how-to-tools-child__wrapper",
                                            ) }
                                            key={ index }
                                        >
                                            <div className="uagb-tools">
                                                <RichText.Content
                                                    tagName="div"
                                                    value={ tools.add_required_tools }
                                                    className='uagb-tools__label'
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    { showMaterials &&
                        <div className="uagb-how-to-materials__wrap">
                            <RichText.Content
                                value={ materialTitle }
                                tagName='h4'
                                className='uagb-howto-req-materials-text'
                            />
                        </div>
                    }
                    { showMaterials &&
                        <div className="uagb-how-to-materials">
                        {
                            materials.map( ( materials, index ) => {
                            return (
                                    <div
                                        className={ classnames(
                                            `uagb-how-to-materials-${index}`,
                                            "uagb-how-to-materials-child__wrapper",
                                        ) }
                                    >
                                        <div className="uagb-materials">
                                            <RichText.Content
                                                tagName="div"
                                                value={ materials.add_required_materials }
                                                className='uagb-materials__label'
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    }
                    <div className="uagb-how-to-steps__wrap">
                        <RichText.Content
                            value={ stepsTitle }
                            tagName='h4'
                            className='uagb-howto-req-steps-text'
                        />
                        <div className="uagb-howto-steps__wrap">
                            <InnerBlocks.Content />
                        </div>	
                    </div>
                </div>
            </div>
            )
        },
	},
    {
        attributes,
        save: function( props ) {
            const { attributes, className } = props
	
            const {
                block_id,
                headingTitle,
                headingDesc,
                headingTag,
                timeNeeded,
                time,
                timeIn,
                estCost,
                cost,
                currencyType,
                mainimage,
                toolsTitle,
                stepsTitle,
                materialTitle,
                tools,
                materials,
                schema,
                showTotaltime,
                showEstcost,
                showTools,
                showMaterials,
                timeInMins,
                timeInHours,
                timeInDays,
                timeInMonths,
                timeInYears,
            } = attributes
        
            let url_chk = ''
            let title = ''
            if( "undefined" !== typeof attributes.mainimage && null !== attributes.mainimage && "" !== attributes.mainimage ){
                url_chk = attributes.mainimage.url
                title = attributes.mainimage.title
            }
            
            let url = ''
            if( '' !== url_chk ){
                    let size = attributes.mainimage.sizes
                    let imageSize = attributes.imgSize
        
                    if ( "undefined" !== typeof size && "undefined" !== typeof size[imageSize] ) {
                      url = size[imageSize].url 
                    }else{
                      url = url_chk 
                    }
            }
        
            let image_icon_html = ''
        
            if ( mainimage && mainimage.url ) {
        
                image_icon_html = <img className="uagb-howto__source-image" src={url} title={title}/>
        
            }
        
            //Time Labels
            var yearlabel = (timeInYears > 1) ? " Years " : " Year ";
            var monthlabel = (timeInMonths > 1) ? " Months " : " Month ";
            var daylabel = (timeInDays > 1) ? " Days " : " Day ";
            var hourlabel = (timeInHours > 1) ? "Hours " : " Hour ";
        
            var minsValue = (timeInMins) ? timeInMins : time;
            var minslabel = (minsValue > 1) ? " Minutes " : " Minute ";		
        
            return (
                <div
                    className={ classnames(
                        className,
                        `uagb-block-${ block_id }`,					
                    ) }
                >
                    <script type="application/ld+json">
                        { schema }
                    </script>
                <div className="uagb-how-to-main-wrap">
                    <div className="uagb-howto__wrap">
                        <RichText.Content
                            value={ headingTitle }
                            tagName={ headingTag }
                            className='uagb-howto-heading-text'
                        />
                        <RichText.Content
                            value={ headingDesc }
                            tagName='p'
                            className='uagb-howto-desc-text'
                        />
                        { mainimage.url &&
                            <div className="uagb-howto__source-wrap">{image_icon_html}</div>
                        }
                        { showTotaltime &&
                        <span className="uagb-howto__time-wrap">
                            <RichText.Content
                                value={ timeNeeded }
                                tagName='h4'
                                className='uagb-howto-timeNeeded-text'
                            />
                            <Fragment>							
                                    {timeInYears && ( <Fragment><p className='uagb-howto-timeNeeded-value'> {timeInYears}</p><p className='uagb-howto-timeINmin-text'>  {yearlabel}</p></Fragment> )}							
                                    {timeInMonths && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{timeInMonths}</p><p className='uagb-howto-timeINmin-text'>{monthlabel}</p></Fragment> )}							
                                    {timeInDays && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{timeInDays}</p><p className='uagb-howto-timeINmin-text'>{daylabel}</p></Fragment> )}							
                                    {timeInHours && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{timeInHours}</p><p className='uagb-howto-timeINmin-text'>{hourlabel}</p></Fragment> )}							
                                    {minsValue && ( <Fragment><p className='uagb-howto-timeNeeded-value'>{minsValue}</p><p className='uagb-howto-timeINmin-text'>{minslabel}</p></Fragment> )}								
                            </Fragment>					
                        </span>
                        }
                        { showEstcost &&
                        <span className="uagb-howto__cost-wrap">
                            <RichText.Content
                                value={ estCost }
                                tagName='h4'
                                className='uagb-howto-estcost-text'
                            />
                            <RichText.Content
                                value={ cost }
                                tagName='p'
                                className='uagb-howto-estcost-value'
                            />
                            <RichText.Content
                                tagName="p"
                                value={ currencyType }
                                className='uagb-howto-estcost-type'
                            />
                        </span>
                        }
                    </div>
                    { showTools &&
                        <div className="uagb-how-to-tools__wrap">
                            <RichText.Content
                                value={ toolsTitle }
                                tagName='h4'
                                className='uagb-howto-req-tools-text'
                            />
                        </div>
                    }
                    { showTools &&
                        <div className="uagb-tools__wrap">
                            {
                                tools.map( ( tools, index ) => {
                                    return (
                                        <div
                                            className={ classnames(
                                                `uagb-how-to-tools-${index}`,
                                                "uagb-how-to-tools-child__wrapper",
                                            ) }
                                            key={ index }
                                        >
                                            <div className="uagb-tools">
                                                <RichText.Content
                                                    tagName="div"
                                                    value={ tools.add_required_tools }
                                                    className='uagb-tools__label'
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    { showMaterials &&
                        <div className="uagb-how-to-materials__wrap">
                            <RichText.Content
                                value={ materialTitle }
                                tagName='h4'
                                className='uagb-howto-req-materials-text'
                            />
                        </div>
                    }
                    { showMaterials &&
                        <div className="uagb-how-to-materials">
                        {
                            materials.map( ( materials, index ) => {
                            return (
                                    <div
                                        className={ classnames(
                                            `uagb-how-to-materials-${index}`,
                                            "uagb-how-to-materials-child__wrapper",
                                        ) }
                                    >
                                        <div className="uagb-materials">
                                            <RichText.Content
                                                tagName="div"
                                                value={ materials.add_required_materials }
                                                className='uagb-materials__label'
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    }
                    <div className="uagb-how-to-steps__wrap">
                        <RichText.Content
                            value={ stepsTitle }
                            tagName='h4'
                            className='uagb-howto-req-steps-text'
                        />
                        <div className="uagb-howto-steps__wrap">
                            <InnerBlocks.Content />
                        </div>	
                    </div>
                </div>
            </div>
            )
        }
          
	},
]

export default deprecated;