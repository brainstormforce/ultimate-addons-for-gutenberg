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
			props,
			index_value		
		} = this.props;
			
		const test_arr = attributes.test_block[index_value];
		let description = "";
		if ( test_arr && typeof test_arr !== "undefined" ){
			description = test_arr.description;			
		}

		const data_copy = [...attributes.test_block];
		
		if ( setAttributes !== "not_set" ){
			return (
				<RichText
					tagName='div'
					value={ description }
					placeholder={ __( "Write Description","ultimate-addons-for-gutenberg" ) }
					className='uagb-tm__desc'
					onChange={ ( value ) => { 

	                	const new_content = { "description" : value, "name":data_copy[index_value].name, "company" : data_copy[index_value].company, "image" : data_copy[index_value].image  };
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
				tagName='div'
				value={ description }
				className='uagb-tm__desc'
	            />			
		);
		
	}
}

export default Description;
