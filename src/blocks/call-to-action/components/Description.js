const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;

const {
	createBlock
} = wp.blocks;

class Description extends React.Component {

	render() {

		const {
			attributes,
			setAttributes ,
			props
		} = this.props;

		if ( setAttributes !== "not_set" ){
			return (
				<RichText
					tagName='p'
					value={ attributes.description }
					placeholder={ __( "Write a Description" ) }
					className='uagb-cta__desc'
					onChange={ ( value ) => setAttributes( { description: value } ) }
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
				tagName='p'
				value={ attributes.description }
				className='uagb-cta__desc'
	            />
		);
		
	}
}

export default Description;
