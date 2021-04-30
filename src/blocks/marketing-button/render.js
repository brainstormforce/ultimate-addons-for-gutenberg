
import classnames from "classnames";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";

const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;

const marketingButtonRender = (props) => {
    
	const { attributes, setAttributes, className, deviceType , mergeBlocks , insertBlocksAfter , onReplace} = props;

    const {
        block_id,
        align,
        textAlign,
        heading,
        prefix,
        icon,
        iconPosition,
        titleTag
    } = attributes;

    return <div className={ classnames(
                className,
                "uagb-marketing-btn__outer-wrap",
                `uagb-marketing-btn__align-${ align }`,
                `uagb-marketing-btn__align-text-${ textAlign }`,
                `uagb-marketing-btn__icon-${ iconPosition }`,
                `uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
                `uagb-block-${ block_id }`
            ) }>
                <div className="uagb-marketing-btn__wrap">
                    <a className="uagb-marketing-btn__link">
                        <div className="uagb-marketing-btn__title-wrap">
                            { "" !== icon &&
                                <div className="uagb-marketing-btn__icon-wrap">
                                    { renderSVG( icon ) }
                                </div>
                            }
                            <RichText
                                placeholder={ __( "Add Button Title…", "ultimate-addons-for-gutenberg" ) }
                                value={ heading }
                                tagName={ titleTag }
                                onChange={ ( value ) => setAttributes( { heading: value } ) }
                                allowedFormats={ [ "bold", "italic", "strikethrough" ] }
                                className='uagb-marketing-btn__title'
                                onRemove={ () => onReplace( [] ) }
                                multiline={ false }
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
                            />
                        </div>
                        <div className="uagb-marketing-btn__prefix-wrap">
                            <RichText
                                placeholder={ __( "Add Button Description…", "ultimate-addons-for-gutenberg" ) }
                                value={ prefix }
                                tagName='p'
                                onChange={ ( value ) => setAttributes( { prefix: value } ) }
                                allowedFormats={ [ "bold", "italic", "strikethrough" ] }
                                className='uagb-marketing-btn__prefix'
                                onRemove={ () => onReplace( [] ) }
                                multiline={ false }
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
                            />
                        </div>
                    </a>
                </div>
            </div>
}
export default marketingButtonRender