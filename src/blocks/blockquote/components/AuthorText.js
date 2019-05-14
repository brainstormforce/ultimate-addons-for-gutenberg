import {DYNAMIC_QUOTE_AUTHOR, DYNAMIC_QUOTE_TEXT} from "../block";

const {
	RichText,
} = wp.editor

const { __ } = wp.i18n

const {
	createBlock
} = wp.blocks

class AuthorText extends React.Component {

	render() {

		const {
			attributes,
			setAttributes ,
			props
		} = this.props

		const hasDynamicQuoteAuthor = !! ( props.attributes.dynamic && props.attributes.dynamic[ DYNAMIC_QUOTE_AUTHOR ] );

		if( setAttributes !== 'not_set' && hasDynamicQuoteAuthor ) {
			return (
				<div className="editor-rich-text">
					<RichText.Content
						tagName='cite'
						value={ attributes.author }
						className='uagb-blockquote__author editor-rich-text__editable'
					/>
				</div>
			);
		}else if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName='div'
	                value={ attributes.author }
	                placeholder={ __( "Author" ) }
	                className='uagb-blockquote__author'
	                onChange={ ( value ) => setAttributes( { author: value } ) }
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
			const dynamicQuoteAuthor = props.attributes.dynamic && props.attributes.dynamic[ DYNAMIC_QUOTE_AUTHOR ] ? props.attributes.dynamic[ DYNAMIC_QUOTE_AUTHOR ] : {};
			const quoteAuthorOrShortcode = ToolsetDynamicSources.getShortcodeOrStatic( dynamicQuoteAuthor, attributes.author, { repeatableFieldShowOnly: 'first' } );

			return (
				<RichText.Content
	                tagName='cite'
	                value={ quoteAuthorOrShortcode }
	                className='uagb-blockquote__author'
	            />
			)
		}
	}
}

export default AuthorText
