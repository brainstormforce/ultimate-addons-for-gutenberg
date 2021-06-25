import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const Price = ( props ) => {
	const { attributes, setAttributes, index_value } = props;

	let price = '';
	if ( typeof index_value !== 'undefined' ) {
		const restArray = attributes.rest_menu_item_arr[ index_value ];
		if ( restArray ) {
			if ( typeof restArray !== 'undefined' ) {
				price = restArray.price;
			}
		}
	} else {
		price = attributes.price;
	}

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="div"
				value={ price }
				className="uagb-rm__price"
				placeholder={ __( 'Price' ) }
				onChange={ ( value ) => {
					setAttributes( { price: value } );
				} }
			/>
		);
	}
	return (
		<RichText.Content
			tagName="span"
			value={ price }
			className="uagb-rm__price"
		/>
	);
};

export default Price;
