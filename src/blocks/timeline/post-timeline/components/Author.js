const { Fragment } = wp.element;
class Author extends React.Component {

	render() {

		const { post, attributes } = this.props;

		let target ="_self";
		if ( attributes.linkTarget ){
			target ="_blank";
		}
		return (
			<Fragment>
				{ attributes.displayPostAuthor && undefined !== post.uagb_author_info &&
					<div className='uagb-timeline__author' >
						<span className="dashicons-admin-users dashicons"></span>
						<a className="uagb-timeline__author-link" target={ target } href={ post.uagb_author_info.author_link } rel="noopener noreferrer"
						>
							{ post.uagb_author_info.display_name }
						</a>
					</div>
				}
			</Fragment>
		);
	}
}

export default Author;
