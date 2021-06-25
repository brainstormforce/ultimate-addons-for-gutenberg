import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const Description = ( props ) => {
	const { attributes, setAttributes, index_value } = props;

	let description = '';
	if ( typeof index_value !== 'undefined' ) {
		const restArray = attributes.rest_menu_item_arr[ index_value ];
		if ( restArray ) {
			if ( typeof restArray !== 'undefined' ) {
				description = restArray.description;
			}
		}
	} else {
		description = attributes.description;
	}

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="div"
				value={ description }
				placeholder={ __( 'Write a Description' ) }
				className="uagb-rm__desc"
				onChange={ ( value ) => {
					setAttributes( { description: value } );
				} }
			/>
		);
	}
	return (
		<RichText.Content
			tagName="div"
			value={ description }
			className="uagb-rm__desc"
		/>
	);
};

export default Description;
