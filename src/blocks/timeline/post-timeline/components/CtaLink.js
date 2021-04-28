class CtaLink extends React.Component {

	render() {

		const { post, attributes } = this.props;
		let target ="_self";
		if ( attributes.linkTarget ){
			target ="_blank";
		}

		if ( attributes.displayPostLink ) {
			return (
				<div className='uagb-timeline__link_parent'	>
					<a className='uagb-timeline__link' href={ post.link } target={ target } rel="noopener noreferrer">
						{ attributes.readMoreText }
					</a>
				</div>
			);
		} 
		return null;
		
	}
}

export default CtaLink;
