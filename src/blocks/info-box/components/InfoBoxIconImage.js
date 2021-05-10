const {
	RichText,
} = wp.blockEditor

import { __ } from '@wordpress/i18n';

class InfoBoxIconImage extends React.Component {

	render() {

		const { attributes } = this.props 

		let url_chk = ""
		if( typeof attributes.iconImage !== "undefined" && attributes.iconImage !== null && attributes.iconImage !=="" ){
			url_chk = attributes.iconImage.url
		}
		
		let url = ""
		if( url_chk !== "" ){
			let size = attributes.iconImage.sizes
			let imageSize = attributes.imageSize

			if ( typeof size !== "undefined" && typeof size[imageSize] !== "undefined" ) {
			  url = size[imageSize].url 
			}else{
			  url = url_chk 
			}

			return (
				<div className="uagb-ifb-image-icon-content uagb-ifb-imgicon-wrap" >
					<div className="uagb-ifb-image">
						<div className="uagb-ifb-image-content">
							<img
								className =""
								src = { url }                        
								alt = { attributes.iconImage.alt }                    
							/>
						</div>
					</div>
				</div>                      
			)
		}else{
			return null
		}       
		
	}
}

export default InfoBoxIconImage
