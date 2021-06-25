import React, { Suspense } from 'react';
import lazyLoader from '@Controls/lazy-loader';
import TypographyControl from '@Components/typography';
import WebfontLoader from '@Components/typography/fontloader';
import { __ } from '@wordpress/i18n';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const {
        attributes,
        setAttributes,
        attributes: {
            rating,
            range,
            align,
            size,
            gap,
            unmarkedColor,
            color,
            title,
            loadGoogleFonts,
            fontFamily,
            fontWeight,
            fontSubset,
            fontSizeType,
            fontSize,
            fontSizeMobile,
            fontSizeTablet,
            lineHeightType,
            lineHeight,
            lineHeightMobile,
            lineHeightTablet,
            titleColor,
            titleGap
        },
    } = props

    let loadTitleGoogleFonts;

    if( loadGoogleFonts == true ) {
        
        const hconfig = {
            google: {
                families: [ fontFamily + ( fontWeight ? ':' + fontWeight : '' ) ],
            },
        };

        loadTitleGoogleFonts = (
            <WebfontLoader config={ hconfig }>
            </WebfontLoader>
        )
    }

    /**
     * Adds all Feneral tab controls.
     */
    const generalSettings = () => {
        return (
            <PanelBody title={ __( "General", 'ultimate-addons-for-gutenberg' ) }>
                <SelectControl
                    label={ __( "Range", 'ultimate-addons-for-gutenberg' ) }
                    value={ range }
                    onChange={ ( value ) => setAttributes( { range: value } ) }
                    options={ [
                        { value: "5", label: __( "1-5", 'ultimate-addons-for-gutenberg' ) },
                        { value: "10", label: __( "1-10", 'ultimate-addons-for-gutenberg' ) },
                    ] }
                />
                <RangeControl
                    label={ __( "Rating", 'ultimate-addons-for-gutenberg' ) }
                    value={ rating }
                    onChange={ ( value ) => setAttributes( { rating: value } ) }
                    min={ 0 }
                    max={ range }
                    beforeIcon=""
                    allowReset
                    initialPosition={0}
                />
                <hr/>
                <BaseControl>
                    <BaseControl.VisualLabel>
                        { __( 'Alignment', 'ultimate-addons-for-gutenberg' ) }
                    </BaseControl.VisualLabel>
                    <BlockAlignmentToolbar
                        value={ align }
                        onChange={ ( value ) =>
                            setAttributes( {
                                align: value,
                            } )
                        }
                        controls={ [ 'left', 'center', 'right', 'full' ] }
                        isCollapsed={ false }
                    />
                </BaseControl>
                <RangeControl
                    label={ __( "Size", 'ultimate-addons-for-gutenberg' ) }
                    value={ size }
                    onChange={ ( value ) => setAttributes( { size: value } ) }
                    min={ 0 }
                    max={ 100 }
                    beforeIcon=""
                    allowReset
                    initialPosition={0}
                />
                <RangeControl
                    label={ __( "Spacing", 'ultimate-addons-for-gutenberg' ) }
                    value={ gap }
                    onChange={ ( value ) => setAttributes( { gap: value } ) }
                    min={ 0 }
                    max={ 50 }
                    beforeIcon=""
                    allowReset
                    initialPosition={0}
                />
            </PanelBody>
        )
    }

    /**
     * Adds all Design tab controls.
     */
    const designSettings = () => {
        return (
            <PanelBody title={ __( "Design", 'ultimate-addons-for-gutenberg' ) } initialOpen={false}>
                <h3>{ __( "Star", 'ultimate-addons-for-gutenberg' ) }</h3>
                <p className="uagb-setting-label">{ __( "Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: color }} ></span></span></p>
                <ColorPalette
                    value={ color }
                    onChange={ ( value ) => setAttributes( { color: value } ) }
                    allowReset
                />
                <p className="uagb-setting-label">{ __( "Unmarked Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: unmarkedColor }} ></span></span></p>
                <ColorPalette
                    value={ unmarkedColor }
                    onChange={ ( value ) => setAttributes( { unmarkedColor: value } ) }
                    allowReset
                />
                <hr/>
                { '' !== title &&
                    <Fragment>
                        <h3>{ __( "Title", 'ultimate-addons-for-gutenberg' ) }</h3>
                        <TypographyControl
                            label={ __( "Typography", 'ultimate-addons-for-gutenberg' ) }
                            attributes = { attributes }
                            setAttributes = { setAttributes }
                            loadGoogleFonts = { { value: loadGoogleFonts, label:'loadGoogleFonts'  } }
                            fontFamily = { { value: fontFamily, label:'fontFamily'  } }
                            fontWeight = { { value: fontWeight, label:'fontWeight'  } }
                            fontSubset = { { value: fontSubset, label:'fontSubset'  } }
                            fontSizeType = { { value: fontSizeType, label: 'fontSizeType' } }
                            fontSize = { { value: fontSize, label:'fontSize'  } }
                            fontSizeMobile = { { value: fontSizeMobile, label:'fontSizeMobile'  } }
                            fontSizeTablet= { { value: fontSizeTablet, label:'fontSizeTablet'  } }
                            lineHeightType = { { value: lineHeightType, label: 'lineHeightType' } }
                            lineHeight = { { value: lineHeight, label:'lineHeight'  } }
                            lineHeightMobile = { { value: lineHeightMobile, label:'lineHeightMobile'  } }
                            lineHeightTablet= { { value: lineHeightTablet, label:'lineHeightTablet'  } }
                        />
                        <p className="uagb-setting-label">{ __( "Title Color", 'ultimate-addons-for-gutenberg' ) }
                            <span  className="components-base-control__label">
                                <span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span>
                            </span>
                        </p>
                        <ColorPalette
                            value={ titleColor }
                            onChange={ ( value ) => setAttributes( { titleColor: value } ) }
                            allowReset
                        />
                        <RangeControl
                            label={ __( "Title Gap", 'ultimate-addons-for-gutenberg' ) }
                            value={ titleGap }
                            onChange={ ( value ) => setAttributes( { titleGap: value } ) }
                            min={ 0 }
                            max={ 50 }
                            beforeIcon=""
                            allowReset
                            initialPosition={0}
                        />
                    </Fragment>
                }
            </PanelBody>
        )
    }

	return (
		<div>
			<InspectorControls>
				{ generalSettings() }
				{ designSettings() }
			</InspectorControls>
			<Suspense fallback={ lazyLoader() }>
				{ loadTitleGoogleFonts }
			</Suspense>
		</div>
	);
};
export default React.memo( Settings );