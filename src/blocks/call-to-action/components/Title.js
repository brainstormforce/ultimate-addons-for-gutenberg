const {
	RichText,
} = wp.blockEditor;

const {
	createBlock
} = wp.blocks;

const { __ } = wp.i18n;

class Title extends React.Component {

	render() {

		const {
			attributes,
			setAttributes ,
			props
		} = this.props;

		if ( setAttributes !== "not_set" ){
			return (
				<RichText
					tagName={ attributes.titleTag }
					placeholder={ __( "Write a Heading" ) }
					value={ attributes.ctaTitle }
					className='uagb-cta__title'
					onChange={ ( value ) => setAttributes( { ctaTitle: value } ) }
					multiline={ false }
					onMerge={ props.mergeBlocks }
					onSplit={
						props.insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								props.insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] );
							} :
							undefined
					}
					onRemove={ () => props.onReplace( [] ) }
	            />
			);
		}
		return (
			<RichText.Content
				tagName={ attributes.titleTag }
				value={ attributes.ctaTitle }
				className='uagb-cta__title'
	            />
		);
		
	}
}

export default Title;
