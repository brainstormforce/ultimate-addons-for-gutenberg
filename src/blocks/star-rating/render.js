import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import React from 'react';

const Render = ( props ) => {

    const {
		title,
		rating,
		range,
	} = props.attributes
	
	let range_value = parseInt(range);
    var stars = [];
    for (var i = 1; i <= range_value; i++) {
        stars.push(<i class="uag-star">★</i>);
    }
    return (
        <div
            className={ classnames(
                className,
                "uag-star-rating__wrapper",
                `uagb-block-${props.clientId.substr( 0, 8 )}`,
            ) }
        >
            <RichText
                tagName="p"
                placeholder={ __( "Write a title", 'ultimate-addons-for-gutenberg' ) }
                value={ title }
                className='uag-star-rating__title'
                onChange={ ( value ) => setAttributes( { title: value } ) }
            />
            <div class="uag-star-rating" title={`${rating}/${range}`}>
                { stars }
            </div>
        </div>
    )
};
export default React.memo( Render );
