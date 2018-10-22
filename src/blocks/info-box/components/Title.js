const {
	RichText,
} = wp.editor

const {
	createBlock
} = wp.blocks

const { __ } = wp.i18n

class Title extends React.Component {

	render() {

		//const { attributes, setAttributes , props } = this.props;
		const {	
			attributes, 
			setAttributes , 
			props		
		} = this.props

		if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName= { attributes.headingTag }
	                value={ attributes.infoBoxTitle }
	                className = 'uagb-infobox-title entry-title'
	                onChange = { ( value ) => setAttributes( { infoBoxTitle: value } ) }
	                multiline={ false }
	                placeholder={ __( "Write a Heading" ) }
	                onMerge = { props.mergeBlocks }		
	                onSplit = {
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
			return (
				<RichText.Content
	                tagName= { attributes.headingTag }
	                value={ attributes.infoBoxTitle }
	                className='uagb-infobox-title entry-title'
	            />			
			)
		}
	}
}

export default Title
