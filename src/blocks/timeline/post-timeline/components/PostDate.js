const { dateI18n, format } = wp.date;
const { Fragment } = wp.element;
class PostDate extends React.Component {

	render() {

		const { post, attributes, dateClass } = this.props;

		return (
			<Fragment>				
				{ attributes.displayPostDate && post.date_gmt &&
					<time dateTime={ format( "c", post.date_gmt ) } className={ dateClass } style={ {
						color: attributes.dateColor
					} }>						
						{ dateI18n( attributes.dateFormat, post.date_gmt ) }
					</time>
				}				
			</Fragment>
		);
	}
}

export default PostDate;
