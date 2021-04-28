const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;

class Price extends React.Component {

	render() {

		const {	
			attributes, 
			setAttributes , 
			index_value	
		} = this.props;

		let price = "";
		if ( typeof index_value !== "undefined" ){
			const rest_arr = attributes.rest_menu_item_arr[index_value];
			if ( rest_arr ){
				if ( typeof rest_arr !== "undefined" ){		
					price = rest_arr.price;	
				}
			}
		} else {
			price = attributes.price;
		}

		if ( setAttributes !== "not_set" ){
			return (
				<RichText
					tagName='div'
					value={ price }
					className='uagb-rm__price'
					placeholder={ __( "Price" ) }
					onChange={ ( value ) => { 
						setAttributes( { "price": value } );	                	
	                } }                   
	            />			
			);
		}
		return (
			<RichText.Content
				tagName='span'
				value={ price }
				className='uagb-rm__price'
	            />			
		);
		
	}
}

export default Price;
