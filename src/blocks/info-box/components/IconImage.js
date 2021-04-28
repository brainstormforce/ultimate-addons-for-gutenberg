
const { __ } = wp.i18n;

const InfoBoxIconImage = props =>{
		const { attributes } = props 

		let url_chk = "";
		if ( typeof attributes.iconImage !== "undefined" && attributes.iconImage !== null && attributes.iconImage !=="" ){
			url_chk = attributes.iconImage.url;
		}
		
		let url = "";
		if ( url_chk !== "" ){
			const size = attributes.iconImage.sizes;
			const imageSize = attributes.imageSize;

			if ( typeof size !== "undefined" && typeof size[imageSize] !== "undefined" ) {
			  url = size[imageSize].url; 
			} else {
			  url = url_chk; 
			}

			return (
				<div className="uagb-ifb-image-icon-content uagb-ifb-imgicon-wrap" >
					<div className="uagb-ifb-image">
						<div className="uagb-ifb-image-content">
							<img
								className="uagb-ifb-img-src"
								src={ url }                        
								alt={ attributes.iconImage.alt }                    
							/>
						</div>
					</div>
				</div>                      
			);
		}
		return null;
		       
		
}

export default InfoBoxIconImage
