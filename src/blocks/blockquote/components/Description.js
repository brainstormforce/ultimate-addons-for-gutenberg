import {DYNAMIC_QUOTE_TEXT} from "../block";

const {
	RichText,
} = wp.editor

const { __ } = wp.i18n

const {
	createBlock
} = wp.blocks

class Description extends React.Component {

	render() {

		const {
			attributes,
			setAttributes ,
			props
		} = this.props

		const hasDynamicQuoteText = !! ( props.attributes.dynamic && props.attributes.dynamic[ DYNAMIC_QUOTE_TEXT ] );

		if( setAttributes !== 'not_set' && hasDynamicQuoteText ) {
			return (
				<div className="editor-rich-text">
					<RichText.Content
						tagName='div'
						value={ attributes.descriptionText }
						className='uagb-blockquote__content editor-rich-text__editable'
					/>
				</div>
			)
		} else if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName='div'
	                value={ attributes.descriptionText }
	                placeholder={ __( "Write a Quote" ) }
	                className='uagb-blockquote__content'
	                onChange={ ( value ) => setAttributes( { descriptionText: value } ) }
	                onMerge = { props.mergeBlocks }
	                unstableOnSplit = {
						props.insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } )
								props.insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] )
							} :
							undefined
					}
					onRemove={ () => props.onReplace( [] ) }
	            />
			)
		}else{
			const dynamicQuoteText = props.attributes.dynamic && props.attributes.dynamic[ DYNAMIC_QUOTE_TEXT ] ? props.attributes.dynamic[ DYNAMIC_QUOTE_TEXT ] : {};
			const quoteTextOrShortcode = ToolsetDynamicSources.getShortcodeOrStatic( dynamicQuoteText, attributes.descriptionText, { repeatableFieldShowOnly: 'first' } );
			return (
				<RichText.Content
	                tagName='div'
	                value={ quoteTextOrShortcode }
	                className='uagb-blockquote__content'
	            />
			)
		}
	}
}

export default Description
