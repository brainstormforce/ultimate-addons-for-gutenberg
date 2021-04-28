const { __ } = wp.i18n;
export default function save() {
	return <h3 className="uagb-post__text uagb-post__title">
		<a href='#' target='_blank' rel="noopener noreferrer"> { __( "Wordpress Post Title" ) }</a>
	</h3>;
}