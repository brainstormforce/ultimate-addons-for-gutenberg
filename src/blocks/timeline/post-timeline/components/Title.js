const { decodeEntities } = wp.htmlEntities;
const { __ } = wp.i18n;

class Title extends React.Component {

	render() {

		const Tag = this.props.attributes.headingTag;

		const { post, attributes } = this.props;

		let target ="_self";
		if ( attributes.linkTarget ){
			target ="_blank";
		}
		return (			
			<div className="uagb-timeline__heading-text"> 
				<Tag  className='uagb-timeline__heading'>
					<a href={ post.link } target={ target } rel="noopener noreferrer" >   
						{ decodeEntities( post.title.rendered.trim() ) || __( "(Untitled)" ) }                                                                    
					</a>
				</Tag>
			</div>
		);
	}
}

export default Title;
