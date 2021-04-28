const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;

const {
	createBlock
} = wp.blocks;

class AuthorName extends React.Component {

	render() {

		const {
			attributes,
			setAttributes ,
			props,
			index_value
		} = this.props;

		const test_arr = attributes.test_block[index_value];
		let author_name = "";
		if ( test_arr && typeof test_arr !== "undefined" ){
			author_name = test_arr.name;			
		}

		const data_copy = [...attributes.test_block];

		if ( setAttributes !== "not_set" ){
			return (
				<RichText
					tagName="div"
					value={ author_name }
					placeholder={ __( "Author Name","ultimate-addons-for-gutenberg" ) }
					className='uagb-tm__author-name'
					onChange={ ( value ) => { 
	                	const new_content = { "description" : data_copy[index_value].description, "name":value, "company" : data_copy[index_value].company, "image" : data_copy[index_value].image  };
						data_copy[index_value] = new_content;
						setAttributes( { "test_block": data_copy } );	                	
	                } }     
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
				tagName="span"
				value={ author_name }
				className='uagb-tm__author-name'
	            />
		);
		
	}
}

export default AuthorName;
