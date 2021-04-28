class Excerpt extends React.Component {

	render() {

		const { post, attributes } = this.props;

		if (
			attributes.displayPostExcerpt &&
			undefined !== post.uagb_excerpt
		) {

			if ( attributes.displayPostExcerpt && post.uagb_excerpt ){
				var trimmed_excerpt =  ( post.uagb_excerpt ).split( /\s+/ ).slice( 0,attributes.exerptLength ).join( " " );
			}

			let margin_var = "";
			if ( attributes.displayPostLink ){
            	margin_var = attributes.contentSpace+"px";
			}
			return (
				<div className="uagb-timeline-desc-content" dangerouslySetInnerHTML={ { __html: trimmed_excerpt } } style={ {
					marginBottom: margin_var
				} } />
			);

		} 
		return null;
		
	}
}

export default Excerpt;
