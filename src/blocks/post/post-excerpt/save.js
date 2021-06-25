import { __ } from '@wordpress/i18n';
export default function save() {
	return (
		<div className="uagb-post__excerpt uagb-full_post">
			{ __(
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
			) }
		</div>
	);
}
