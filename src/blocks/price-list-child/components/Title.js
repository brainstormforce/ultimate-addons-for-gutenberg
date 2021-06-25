import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const Title = ( props ) => {
	const { attributes, setAttributes, index_value } = props;
	let authorTitle = '';

	if ( typeof index_value !== 'undefined' ) {
		const testArr = attributes.rest_menu_item_arr[ index_value ];
		if ( testArr ) {
			if ( typeof testArr !== 'undefined' ) {
				authorTitle = testArr.title;
			}
		}
	} else {
		authorTitle = attributes.title;
	}

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName={ attributes.headingTag }
				value={ authorTitle }
				placeholder={ __( 'Write a Title' ) }
				className="uagb-rm__title"
				onChange={ ( value ) => {
					setAttributes( { title: value } );
				} }
			/>
		);
	}
	return (
		<RichText.Content
			tagName={ attributes.headingTag }
			value={ authorTitle }
			className="uagb-rm__title"
		/>
	);
};

export default Title;
