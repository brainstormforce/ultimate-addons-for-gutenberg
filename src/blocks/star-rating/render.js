import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import React from 'react';

const Render = ( props ) => {
    props = props.parentProps;
    const {
        setAttributes,
        attributes: {
            className,
            title,
            rating,
            range,
        }
	} = props
	
	let range_value = parseInt(range);
    var stars = [];
    for (var i = 1; i <= range_value; i++) {
        stars.push(<span key={i} class="uag-star">★</span>);
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
