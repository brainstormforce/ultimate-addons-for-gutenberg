
class RestMenuImage extends React.Component {

	render() {

		const { attributes , index_value } = this.props
		let url_check = ""
		let image_arr = ""

		if( typeof index_value !== "undefined" ){
			const image_array = attributes.rest_menu_item_arr[index_value]	
			if( typeof image_array !== "undefined"){		
				image_arr = image_array['image']		
			}     
		}else{
			if(attributes.image !== ""){
				image_arr = attributes.image
		   }
		}
		
		if( image_arr && typeof image_arr !== "undefined"){
			let image = '';
			if(  typeof image_arr !== "undefined" ){
				image = image_arr;
			}else{
				image = attributes.image;
			}
			let url = ""
			  
			if( typeof image !== "undefined" && image !== null && image !=="" ){
				url_check = image.url
			}   
			 
			if( url_check !== "" ){
				let size = image.sizes
				let imageSize = attributes.imageSize
				if ( typeof size !== "undefined" && typeof size[imageSize] !== "undefined") {
					url = size[imageSize].url 
				}else{
					url = url_check 
				}
                
				return (     
					<div className ="uagb-rm__image-content" >           
						<div className="uagb-rm__image" >                        
							<img
								className =""
								src = { url }                        
								alt = { image.alt }  
								width="640" height="360"                  
							/>                        
						</div>  
					</div>                                 
				)
			}else{
				return null
			}     

		}else{
			return null
		}
	}
}

export default RestMenuImage
