/**
 * BLOCK: Lottie Edit
 */

import classnames from "classnames"
import styling from "./styling"
import Lottie from 'react-lottie';

import { __ } from '@wordpress/i18n';

const {
	BlockAlignmentToolbar,
	InspectorControls,
    ColorPalette,
    MediaPlaceholder,
    BlockControls,
    MediaReplaceFlow
} = wp.blockEditor

const {
    PanelBody,
	RangeControl,
    ToggleControl,
    TabPanel,
    Dashicon,
    SelectControl,
    ToolbarGroup,
} = wp.components

const { Component, Fragment } = wp.element


class UAGBLottie extends Component {

    constructor() {
        super( ...arguments )
        this.lottieplayer = React.createRef();
        this.state = {  direction: 1,  loopState: true,};
        this.onSelectLottieJSON    = this.onSelectLottieJSON.bind( this )
        this.reverseDirection    = this.reverseDirection.bind( this )
        this.loopLottie    = this.loopLottie.bind( this )        
	}
    
    componentDidMount() {
        
        // Assigning block_id in the attribute.
        this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )
        this.props.setAttributes( { classMigrate: true } );

        // Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-lottie-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
    }

    componentDidUpdate(prevProps, prevState) {
		var element = document.getElementById( "uagb-lottie-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

    onSelectLottieJSON( media ) {

        const { setAttributes } = this.props
        
		if ( ! media || ! media.url ) {
			setAttributes( { jsonLottie: null } )
			return
		}
		
        setAttributes( { jsonLottie: media } )
		setAttributes( { lottieURl: media.url } )      
		
    }
    
    

    loopLottie() {
        const { setAttributes } = this.props
        const { loop } = this.props.attributes  
        const { loopState } = this.state

        setAttributes( { loop: ! loop } )
		this.setState({ loopState :! loopState});
		
    }

    reverseDirection() {
        const { setAttributes } = this.props
        const { reverse } = this.props.attributes  
        const { direction } = this.state

        setAttributes( { reverse: ! reverse } )
		this.setState({ direction : direction * -1 });
		
    }
      
    render() {
        const { className, setAttributes, attributes } = this.props
        
        const {
            align,
            height,
            heightTablet,
            heightMob,
            width,
            widthTablet,
            widthMob,
            backgroundColor,
            loop,            
            speed,
            reverse,
            jsonLottie,
            lottieURl,
            playOn,
            backgroundHColor
        } = attributes

       
        const controlsSettings = (
            <PanelBody
                title={ __( "Controls", 'ultimate-addons-for-gutenberg' ) }
                initialOpen={ true }>
                <SelectControl
					label={ __( "Play On", 'ultimate-addons-for-gutenberg' ) }
					value={ playOn }
                    onChange={ ( value ) => setAttributes( { playOn: value } ) }
					options={ [
						{ value: 'none', label: __( "None", 'ultimate-addons-for-gutenberg' ) },
						{ value: "hover", label: __( "On Hover", 'ultimate-addons-for-gutenberg' ) },
						{ value: "click", label: __( "On Click", 'ultimate-addons-for-gutenberg' ) },
                        { value: "scroll", label: __( "Viewport", 'ultimate-addons-for-gutenberg' ) },
                    ] }
                    help={ ( 'scroll' === playOn ) ? __( "This setting will only take effect once you are on the live page, and not while you're editing.", 'ultimate-addons-for-gutenberg' ) : '' }
				/> 
                <ToggleControl
                    label={ __( "Loop", 'ultimate-addons-for-gutenberg' ) }
                    checked={ loop }
                    onChange={ this.loopLottie }
                    help={ __( "Enabling this will show the animation in the loop. This setting will only take effect once you are on the live page, and not while you're editing." ) }
                    />
                <RangeControl
                    label={ __( "Speed", 'ultimate-addons-for-gutenberg' ) }
                    value={ speed }
                    onChange={ ( value ) => setAttributes( { speed: value } ) }
                    min={ 1 }
                    max={ 50 }
                    allowReset
                    />
                { loop && 
                <ToggleControl
                    label={ __( "Reverse", 'ultimate-addons-for-gutenberg' ) }
                    checked={ reverse }
                    onChange={this.reverseDirection}
                    help={ __( 'Direction of animation.', 'ultimate-addons-for-gutenberg' ) }
                    />
                }                
            </PanelBody>
        )
        
        const styleSettings = (
            <PanelBody
                title={ __( "Style", 'ultimate-addons-for-gutenberg' ) }
                initialOpen={ false }>
                <TabPanel className="uagb-size-type-field-tabs uagb-without-size-type" activeClass="active-tab"
                    tabs={ [
                        {
                            name: "desktop",
                            title: <Dashicon icon="desktop" />,
                            className: "uagb-desktop-tab uagb-responsive-tabs",
                        },
                        {
                            name: "tablet",
                            title: <Dashicon icon="tablet" />,
                            className: "uagb-tablet-tab uagb-responsive-tabs",
                        },
                        {
                            name: "mobile",
                            title: <Dashicon icon="smartphone" />,
                            className: "uagb-mobile-tab uagb-responsive-tabs",
                        },
                    ] }>
                    {
                        ( tab ) => {
                            let tabout

                            if ( "mobile" === tab.name ) {
                                tabout = (
                                    <RangeControl
                                        label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
                                        value={ widthMob }
                                        onChange={ ( value ) => setAttributes( { widthMob: value } ) }
                                        min={ 0 }
                                        max={ 1000 }
                                        allowReset
                                    />
                                )
                            } else if ( "tablet" === tab.name ) {
                                tabout = (
                                    <RangeControl
                                        label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
                                        value={ widthTablet }
                                        onChange={ ( value ) => setAttributes( { widthTablet: value } ) }
                                        min={ 0 }
                                        max={ 1000 }
                                        allowReset
                                    />
                                )
                            } else {
                                tabout = (
                                    <RangeControl
                                        label={ __( "Width", 'ultimate-addons-for-gutenberg' ) }
                                        value={ width }
                                        onChange={ ( value ) => setAttributes( { width: value } ) }
                                        min={ 0 }
                                        max={ 1000 }
                                        allowReset
                                    />
                                )
                            }

                            return <div>{ tabout }</div>
                        }
                    }
				</TabPanel>
                <TabPanel className="uagb-size-type-field-tabs uagb-without-size-type" activeClass="active-tab"
                    tabs={ [
                        {
                            name: "desktop",
                            title: <Dashicon icon="desktop" />,
                            className: "uagb-desktop-tab uagb-responsive-tabs",
                        },
                        {
                            name: "tablet",
                            title: <Dashicon icon="tablet" />,
                            className: "uagb-tablet-tab uagb-responsive-tabs",
                        },
                        {
                            name: "mobile",
                            title: <Dashicon icon="smartphone" />,
                            className: "uagb-mobile-tab uagb-responsive-tabs",
                        },
                    ] }>
                    {
                        ( tab ) => {
                            let tabout

                            if ( "mobile" === tab.name ) {
                                tabout = (
                                    <RangeControl
                                        label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
                                        value={ heightMob }
                                        onChange={ ( value ) => setAttributes( { heightMob: value } ) }
                                        min={ 0 }
                                        max={ 1000 }
                                        allowReset
                                    />
                                )
                            } else if ( "tablet" === tab.name ) {
                                tabout = (
                                    <RangeControl
                                        label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
                                        value={ heightTablet }
                                        onChange={ ( value ) => setAttributes( { heightTablet: value } ) }
                                        min={ 0 }
                                        max={ 1000 }
                                        allowReset
                                    />
                                )
                            } else {
                                tabout = (
                                    <RangeControl
                                        label={ __( "Height", 'ultimate-addons-for-gutenberg' ) }
                                        value={ height }
                                        onChange={ ( value ) => setAttributes( { height: value } ) }
                                        min={ 0 }
                                        max={ 1000 }
                                        allowReset
                                    />
                                )
                            }

                            return <div>{ tabout }</div>
                        }
                    }
                </TabPanel>          
                <br></br>
                <h2>{ __( "Alignment"  , 'ultimate-addons-for-gutenberg') }</h2>
                <BlockAlignmentToolbar
                    value={ align }
                    onChange={ ( value ) =>
                        setAttributes( {
                            align: value,
                        } )
                    }
                    controls={ [ 'left', 'center', 'right' ] }
                    isCollapsed={ false }
                />	
                <br></br>
                    <p className="uagb-setting-label">{ __( "Background Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
                    <ColorPalette
                        value={ backgroundColor }
                        onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
                        allowReset
                        />
                    <p className="uagb-setting-label">{ __( "Background Hover Color", 'ultimate-addons-for-gutenberg' ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundHColor }} ></span></span></p>
                    <ColorPalette
                        value={ backgroundHColor }
                        onChange={ ( value ) => setAttributes( { backgroundHColor: value } ) }
                        allowReset
                    />
                
            </PanelBody>
        )

        //Check if given url is valid or not for json extension.
        var validJsonPath = 'invalid';
        if( lottieURl && lottieURl.endsWith('.json') ){
             validJsonPath = 'valid' 
        }       
        if ( ! uagb_blocks_info.uagb_mime_type ) {

            return(
                <div className="uagb-show-notice">
                    <span> 
                        {__('Lottie block requires the file type JSON to be uploaded to media files. Seems like your website has disabled this file type. Please refer', 'ultimate-addons-for-gutenberg' )}
                            <a href={`${uagb_blocks_info.uagb_site_url}/docs/lottie/?utm_source=uagb-dashboard&utm_medium=uagb-editor-page&utm_campaign=uagb-plugin`} target="__blank"> { __( 'this document' ) } </a>
                            {__('to know more about it.')}
                    </span>
                </div>
            ); 
        }

        if ( validJsonPath === 'invalid' ) {

            const lottie_url = <span> {__('Allows you to add fancy animation i.e Lottie to your website. You can see sample Lottie animations', 'ultimate-addons-for-gutenberg' )}
                <a href="https://lottiefiles.com/" target="__blank"> { __( 'here on this' ) } </a>{__('website.')}</span>;

            return (               
				<div className="uagb-lottie_upload_wrap">                    
                    <MediaPlaceholder
                        labels={ {
                            title: __( 'Lottie', 'ultimate-addons-for-gutenberg' ),
                            instructions: lottie_url,
                        } }                        
                        allowedTypes={ [ 'application/json' ] }
                        accept={ [ 'application/json' ] }
                        value={jsonLottie }
                        onSelectURL={ ( value ) => setAttributes( { lottieURl: value } )  }
                        onSelect={ this.onSelectLottieJSON }
                    />
                </div>				
			)
        }
       
       
        const handleLottieMouseEnter = () => {  
            this.lottieplayer.current.anim.play();
        };

        const handleLottieMouseLeave = () => {
            this.lottieplayer.current.anim.stop();
        };

        const reversedir = (reverse && loop ) ? -1 : 1

        var play_animation = true;

        if ( 'none' === playOn || 'scroll' === playOn || 'undefined' === typeof playOn ) {
            play_animation = false;
        }

        return (
            <Fragment>
                { validJsonPath === 'valid' && 
                    <BlockControls>
                        <ToolbarGroup>
                            <MediaReplaceFlow
                                mediaURL={ lottieURl }
                                allowedTypes={ [ 'application/json' ] }
                                accept={ [ 'application/json' ] }
                                onSelectURL={ ( value ) => setAttributes( { lottieURl: value } )  }
                                onSelect={ this.onSelectLottieJSON }
                            />
                        </ToolbarGroup>
                    </BlockControls>
                }
                <InspectorControls>
                    { controlsSettings }
                    { styleSettings }
                </InspectorControls>
                
                <div
                className={ classnames(
                    className,
                    `uagb-block-${this.props.clientId.substr( 0, 8 )}`,
                    "uagb-lottie__outer-wrap",
                    `uagb-lottie__${align}`
                ) }
                onMouseEnter={ 'hover' === playOn ? handleLottieMouseEnter : ()=> play_animation = true }
                onMouseLeave={ 'hover' === playOn ? handleLottieMouseLeave : ()=> play_animation = true } 
                onClick = { 'click' === playOn ? handleLottieMouseEnter : ()=> play_animation = true }
                >
                    <Lottie
                        key={ lottieURl } 
                        ref={this.lottieplayer}
                        options={{                            
                            loop: loop,
                            path: lottieURl,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid',
                                className:"uagb-lottie-inner-wrap"
                            }
                        }}
                        isStopped={play_animation}                        
                        speed={speed}
                        isClickToPauseDisabled = {true}
                        direction={reversedir}                       
                    />
                </div>
            </Fragment>
        );
    }
}

export default UAGBLottie
