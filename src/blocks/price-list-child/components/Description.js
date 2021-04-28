const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;

class Description extends React.Component {

	render() {

		const {	
			attributes, 
			setAttributes , 
			index_value		
		} = this.props;
		
		let description = "";
		if ( typeof index_value !== "undefined" ){
			const rest_arr = attributes.rest_menu_item_arr[index_value];
			if ( rest_arr ){
				if ( typeof rest_arr !== "undefined" ){		
					description = rest_arr.description;	
				}
			}
		} else {
			description = attributes.description;
		}
		
		if ( setAttributes !== "not_set" ){
			return (
				<RichText
					tagName='div'
					value={ description }
					placeholder={ __( "Write a Description" ) }
					className='uagb-rm__desc'
					onChange={ ( value ) => { 
						setAttributes( { "description": value } );
	                } }                 
	            />			
			);
		}
		return (
			<RichText.Content
				tagName='div'
				value={ description }
				className='uagb-rm__desc'
	            />			
		);
		
	}
}

export default Description;
