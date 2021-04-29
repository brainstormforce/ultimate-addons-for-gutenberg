import classnames from "classnames"
const {
	RichText
} = wp.blockEditor

const { __ } = wp.i18n

export default function renderHeading( props ) {
   const {
        attributes:{
            block_id,
            headingTitle,
            headingDesc,
            headingTag,
            seperatorStyle
        },
        insertBlocksAfter,
        mergeBlocks,
        onReplace,
        setAttributes,
        className,
        deviceType
    } = props;

    const heading_html = (
        <RichText
            tagName={ headingTag }
            placeholder={ __( "Write a Heading", "ultimate-addons-for-gutenberg" ) }
            value={ headingTitle }
            className='uagb-heading-text'
            multiline={ false }
            onChange={ ( value ) => {
                setAttributes( { headingTitle: value } ) 
            }}
            onMerge={ mergeBlocks }
            onSplit={
                insertBlocksAfter ?
                    ( before, after, ...blocks ) => {
                        setAttributes( { content: before } );
                        insertBlocksAfter( [
                            ...blocks,
                            createBlock( "core/paragraph", { content: after } ),
                        ] );
                    } :
                    undefined
            }
            onRemove={ () => onReplace }
        />
    )

    const separator_html = (
        seperatorStyle !== "none" && (
            <div className="uagb-separator-wrap" >
                <div className="uagb-separator"></div>
            </div> 
        )
    )

    const desc_html = (
        <RichText
            tagName="p"
            placeholder={ __( "Write a Description", "ultimate-addons-for-gutenberg" ) }
            value={ headingDesc }
            className='uagb-desc-text'
            onChange={ ( value ) => setAttributes( { headingDesc: value } ) }
            onMerge={ mergeBlocks }
            onSplit={
                insertBlocksAfter ?
                    ( before, after, ...blocks ) => {
                        setAttributes( { content: before } );
                        insertBlocksAfter( [
                            ...blocks,
                            createBlock( "core/paragraph", { content: after } ),
                        ] );
                    } :
                    undefined
            }
            onRemove={ () => onReplace }
        />
    )

    return (  
        <div
            className={ classnames(
                className,
                `uagb-editor-preview-mode-${deviceType.toLowerCase()}`,
                `uagb-block-${block_id}`,					
            ) }>                                                                             
            {heading_html}
            {separator_html}
            {desc_html}
        </div>
    );
}