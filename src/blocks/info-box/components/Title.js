const {
	RichText,
} = wp.blockEditor

const { __ } = wp.i18n

export default function InfoBoxRender(props){
		
		//const { attributes, setAttributes , props } = this.props;
		const {
			attributes,
			setAttributes ,
		} = props

		if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName= { attributes.headingTag }
	                placeholder={ __( "Write a Heading" ) }
	                value={ attributes.infoBoxTitle }
	                className = 'uagb-ifb-title'
	                onChange = { ( value ) => setAttributes( { infoBoxTitle: value } ) }
	                multiline={ false }
	             />
			)
		}else{
			return (
				<RichText.Content
	                tagName= { attributes.headingTag }
	                value={ attributes.infoBoxTitle }
	                className='uagb-ifb-title'
	            />
			)
		}

}

