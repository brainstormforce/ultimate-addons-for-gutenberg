import { __ } from '@wordpress/i18n';
export default function save() {
	return (
		<h3 className="uagb-post__text uagb-post__title">
			<a href="/" target="_blank" rel="noopener noreferrer" alt="">
				{ ' ' }
				{ __( 'Wordpress Post Title' ) }
			</a>
		</h3>
	);
}
