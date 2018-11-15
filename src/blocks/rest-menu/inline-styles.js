/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */
function RestMenuStyle( props ) {
    const {
            headingAlign,
            priceColor,
            descColor,
            titleColor,
            titleFontSize,
            priceFontSize,
            descFontSize,
            descSpace,
            block_id,
            titleSpace,
            imgVrPadding,
            imgHrPadding,
            imageWidth,  
            rowGap,
            columnGap,
            contentPadding,
            seperatorStyle,
            seperatorWidth ,
            borderRadius,
            seperatorColor,                  
        } = props.attributes;        

        if( props.clientId ){
            var clientId = 'uagb-rm-'+props.clientId;
        }else{
            var clientId = 'uagb-rm-'+block_id;
        }

        var selectors = {};

            selectors['.uagb-rest_menu__wrap'] = {
                    'padding-left' : rowGap/2+'px',
                    'padding-right' : rowGap/2+'px',                                
                    'margin-bottom' : columnGap+'px',
                }; 
            
            selectors['.uagb-rest_menu__wrap .uagb-rm__image-content'] = {
                    'padding-left' : imgHrPadding+'px',
                    'padding-right' : imgHrPadding+'px',                                
                    'padding-top' : imgVrPadding+'px',
                    'padding-bottom' : imgVrPadding+'px',
                }; 

            // Image
            selectors['.uagb-rm__image img'] = {
                    'width': imageWidth+'px',
                    'max-width': imageWidth+'px',                         
                }; 
            
            selectors['.uagb-rm__content'] = {                    
                    'text-align' : headingAlign, 
                    'padding' : contentPadding+'px',                  
                };                       

            // Prefix Style
            selectors['.uagb-rm__title'] = {
                    'font-size' : titleFontSize+'px',
                    'color': titleColor,
                    'margin-bottom': titleSpace+'px',
                };

            // Title Style
            selectors['.uagb-rm__price'] = {
                    'font-size' : priceFontSize+'px',
                    'color': priceColor,
                };

            // Description Style
            selectors['.uagb-rm__desc'] = {
                    'font-size' : descFontSize+'px',
                    'color': descColor,
                    'margin-bottom': descSpace+'px',
                };    
                     
            if ( seperatorStyle != "none" ) {
                selectors['.uagb-rest_menu__wrap .uagb-rm__content'] = {
                    'border-bottom-color': seperatorColor,
                    'border-bottom-style':seperatorStyle,
                    'border-bottom-width':seperatorWidth + "px",
                    'border-radius':borderRadius + "px",                    
                };                 
            }

        var styling_css = '';

        for( var i in selectors ) {
           
            styling_css += '#wpwrap #'+clientId+' '+i + ' { ';
            
            
            var sel = selectors[i];
            var css = '';

            for( var j in sel ) {

                css += j + ': ' + sel[j] + ';';
            }

            styling_css += css + ' } ';
        }       

        return styling_css;

}

export default RestMenuStyle;
