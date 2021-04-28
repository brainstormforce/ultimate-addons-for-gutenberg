const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;

class Title extends React.Component {
	
	render() {

		const {
			attributes,
			setAttributes,
			index_value
		} = this.props;
		let author_title = "";
		
		if ( typeof index_value !== "undefined" ){
			const test_arr = attributes.rest_menu_item_arr[index_value];
			if ( test_arr ){
				if ( typeof test_arr !== "undefined" ){		
					author_title = test_arr.title;		
				}
			}
		} else {
			author_title = attributes.title;	
		}

		if ( setAttributes !== "not_set" ){
		
			return (
				<RichText
					tagName={ attributes.headingTag }
					value={ author_title }
					placeholder={ __( "Write a Title" ) }
					className='uagb-rm__title'
					onChange={ ( value ) => { 
						setAttributes( { "title": value } );	                	
	                } }     
	            />
			);
		}
		return (
			<RichText.Content
				tagName={ attributes.headingTag }
				value={ author_title }
				className='uagb-rm__title'
	            />
		);
		
	}
}

export default Title;
