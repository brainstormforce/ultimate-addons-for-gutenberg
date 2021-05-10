class AuthorImageNew extends React.Component {

	render() {

		const { attributes } = this.props 

		let url_chk = ""
		if( typeof attributes.authorImage !== "undefined" && attributes.authorImage !== null && attributes.authorImage !=="" ){
			url_chk = attributes.authorImage.url
		}
		
		let url = ""
		if( url_chk !== "" ){
			let size = attributes.authorImage.sizes
			let authorImageSize = attributes.authorImageSize

			if ( typeof size !== "undefined" && typeof size[authorImageSize] !== "undefined" ) {
			  url = size[authorImageSize].url 
			}else{
			  url = url_chk 
			}

			return (				
				<div className="uagb-blockquote__author-image">
					<img
						className =""
						src = { url }                        
						alt = { attributes.authorImage.alt }     
						width="640" height="360"               
					/>						
				</div>				                 
			)
		}else{
			return null
		}       
		
	}
}

export default AuthorImageNew
