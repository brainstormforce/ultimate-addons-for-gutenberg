/**
 * External dependencies
 */
 import classnames from 'classnames';
 import map from 'lodash/map';
 
 /**
  * Import Css
  */
  import './editor.scss';
 
 /**
  * WordPress dependencies
  */
 import { __, sprintf } from '@wordpress/i18n';
 import { Fragment } from '@wordpress/element';
 import { ButtonGroup, Button, TabPanel, Tooltip, Dashicon } from '@wordpress/components';
 
const DimensionsControl = props => {

	const onChangeTop = ( value, device )  => {
		if ( props.type === 'padding' ) {
			props.setAttributes( { [ 'paddingTop' + device  ]: value } );
		} else {
			props.setAttributes( { [ 'marginTop' + device  ]: value } );
		}
	}

	const onChangeRight = ( value, device ) => {
		if ( props.type === 'padding' ) {
			props.setAttributes( { [ 'paddingRight' + device  ]: value } );
		} else {
			props.setAttributes( { [ 'marginRight' + device  ]: value } );
		}
	}

	const onChangeBottom = ( value, device ) => {
		if ( props.type === 'padding' ) {
			props.setAttributes( { [ 'paddingBottom' + device  ]: value } );
		} else {
			props.setAttributes( { [ 'marginBottom' + device  ]: value } );
		}
	}

	const onChangeLeft = ( value, device ) => {
	   if ( props.type === 'padding' ) {
		   props.setAttributes( { [ 'paddingLeft' + device ]: value } );
	   } else {
		   props.setAttributes( { [ 'marginLeft' + device ]: value } );
	   }
	}

	const onChangeUnits = ( value ) => {
		if ( props.type === 'padding' ) {
			props.setAttributes( { paddingUnit: value } );
		} else {
			props.setAttributes( { marginUnit: value } );
		}

	}

	const onChangeSize = ( value, size ) => {
		if ( props.type === 'padding' ) {
			props.setAttributes( { paddingSyncUnits: true } );
			props.setAttributes( { paddingSize: value } );
			if ( size ) {
				if ( size < 0 ) {
					size = '';
				}
				props.setAttributes( { paddingTop: size, paddingRight: size, paddingBottom: size, paddingLeft: size, paddingUnit: 'px' } );
			}
		} else {
			props.setAttributes( { marginSize: value } );
			if ( size ) {
				if ( size < 0 ) {
					size = '';
				}
				props.setAttributes( { marginTop: size, marginRight: 0, marginBottom: size, marginLeft: 0, marginUnit: 'px' } );
			}
		}

	}

         const {
             help,
             instanceId,
             label = __( 'Margin', 'ultimate-addons-for-gutenberg' ),
             type = 'margin',
             unit,
             valueBottom,
             valueLeft,
             valueRight,
             valueTop,
             valueBottomTablet,
             valueLeftTablet,
             valueRightTablet,
             valueTopTablet,
             valueBottomMobile,
             valueLeftMobile,
             valueRightMobile,
             valueTopMobile,
             setAttributes,
         } = props;
 
         const { paddingSize, marginSize } = props.attributes;
 
         const classes = classnames(
             'components-base-control',
             'uagb-dimensions-control', {
             }
         );
 
         const id = `inspector-uagb-dimensions-control-${ instanceId }`;
 
         const onChangeTopValue = ( event ) => {
             const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
                
             let device = '';
             if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
                 device = event.target.getAttribute( 'data-device-type' );
             }
 
                 onChangeTop( newValue, device );
         };
 
         const onChangeRightValue = ( event ) => {
             const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

             let device = '';
             if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
                 device = event.target.getAttribute( 'data-device-type' );
             }
 
                 onChangeRight( newValue, device );
         };
 
         const onChangeBottomValue = ( event ) => {
             const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

            let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}
 
                 onChangeBottom( newValue, device );
         };
 
         const onChangeLeftValue = ( event ) => {
            const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

            onChangeLeft( newValue, device );
         };
 
         const unitSizes = [
             {
                 /* translators: a unit of size (px) for css markup */
                 name: __( 'Pixel', 'ultimate-addons-for-gutenberg' ),
                 unitValue: 'px',
             },
             {
                 /* translators: a unit of size (em) for css markup */
                 name: __( 'Em', 'ultimate-addons-for-gutenberg' ),
                 unitValue: 'em',
             },
             {
                 /* translators: a unit of size (vw) for css markup */
                 name: __( 'Viewport width', 'ultimate-addons-for-gutenberg' ),
                 unitValue: 'vw',
             },
             {
                 /* translators: a unit of size (vh) for css markup */
                 name: __( 'Viewport height', 'ultimate-addons-for-gutenberg' ),
                 unitValue: 'vh',
             },
             {
                 /* translators: a unit of size for css markup */
                 name: __( 'Percentage', 'ultimate-addons-for-gutenberg' ),
                 unitValue: '%',
             },
         ];

         const onSelect = ( tabName ) => {
			let selected = 'desktop';

			switch ( tabName ) {
				case 'desktop':
					selected = 'tablet';
					break;
				case 'tablet':
					selected = 'mobile';
					break;
				case 'mobile':
					selected = 'desktop';
					break;
				default:
					break;
			}

			//Reset z-index
			const buttons = document.getElementsByClassName( `uagb-dimensions-control__mobile-controls-item--${ props.type }` );

			for ( let i = 0; i < buttons.length; i++ ) {
				buttons[ i ].style.display = 'none';
			}
			if ( tabName === 'default' ) {
				const button = document.getElementsByClassName( `uagb-dimensions-control__mobile-controls-item-${ props.type }--tablet` );
				button[ 0 ].click();
			} else {
				const button = document.getElementsByClassName( `uagb-dimensions-control__mobile-controls-item-${ props.type }--${ selected }` );
				button[ 0 ].style.display = 'block';
			}
		};

 
         return (
             <Fragment>
                 <div className={ classes }>
                         <Fragment>
                             <div className="uagb-dimensions-control__header">
                                 { label && <p className={ 'uagb-dimensions-control__label' }>{ label }</p> }
                                 <div className="uagb-dimensions-control__actions">
                                     <ButtonGroup className="uagb-dimensions-control__units" aria-label={ __( 'Select Units', 'ultimate-addons-for-gutenberg' ) }>
                                         { map( unitSizes, ( { unitValue, name } ) => (
                                             <Tooltip text={ sprintf(
                                                 /* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
                                                 __( '%s units', 'ultimate-addons-for-gutenberg' ),
                                                 name
                                             ) }>
                                                 <Button
                                                     key={ unitValue }
                                                     className={ 'uagb-dimensions-control__units--' + name }
                                                     isSmall
                                                     isPrimary={ unit === unitValue }
                                                     isSecondary={ unit !== unitValue }
                                                     aria-pressed={ unit === unitValue }
                                                     aria-label={ sprintf(
                                                         /* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
                                                         __( '%s units', 'ultimate-addons-for-gutenberg' ),
                                                         name
                                                     ) }
                                                     onClick={ () => onChangeUnits( unitValue ) }
                                                 >
                                                     { unitValue }
                                                 </Button>
                                             </Tooltip>
                                         ) ) }
                                     </ButtonGroup>
									 { ( !props.valueTop && !props.valueRight && !props.valueBottom && !props.valueLeft ) && (
                                     <Button
                                         className="uagb-spacing-reset"
                                         type="button"
                                         onClick={ () => onChangeSize( 'no', -1 ) }
                                         isSmall
                                         isSecondary
										 disabled
                                     >
                                        <Dashicon icon="image-rotate" />
                                     </Button>
									 )}
									 { ( props.valueTop || props.valueRight || props.valueBottom || props.valueLeft ) && (
									 <Button
                                         className="uagb-spacing-reset"
                                         type="button"
                                         onClick={ () => onChangeSize( 'no', -1 ) }
                                         isSmall
                                         isSecondary
                                     >
                                        <Dashicon icon="image-rotate" />
                                     </Button>
									 ) }
                                 </div>
                             </div>
                             <TabPanel
								className="uagb-dimensions-control__mobile-controls"
								activeClass="is-active"
								initialTabName="default"
								onSelect={ onSelect }
								tabs={ [
									{
										name: 'default',
										title: <Dashicon icon="desktop" />,
										className: `uagb-dimensions-control__mobile-controls-item uagb-dimensions-control__mobile-controls-item--${ props.type } components-button is-button is-default is-secondary uagb-dimensions-control__mobile-controls-item--default uagb-dimensions-control__mobile-controls-item-${ props.type }--default`,
									},
									{
										name: 'desktop',
										title: <Dashicon icon="desktop" />,
										className: `uagb-dimensions-control__mobile-controls-item uagb-dimensions-control__mobile-controls-item--${ props.type } components-button is-button is-default is-secondary uagb-dimensions-control__mobile-controls-item--desktop uagb-dimensions-control__mobile-controls-item-${ props.type }--desktop`,
									},
									{
										name: 'tablet',
										title: <Dashicon icon="tablet" />,
										className: `uagb-dimensions-control__mobile-controls-item uagb-dimensions-control__mobile-controls-item--${ props.type } components-button is-button is-default is-secondary uagb-dimensions-control__mobile-controls-item--tablet uagb-dimensions-control__mobile-controls-item-${ props.type }--tablet`,
									},
									{
										name: 'mobile',
										title: <Dashicon icon="smartphone" />,
										className: `uagb-dimensions-control__mobile-controls-item uagb-dimensions-control__mobile-controls-item--${ props.type } components-button is-button is-default is-secondary uagb-dimensions-control__mobile-controls-item--mobile uagb-dimensions-control__mobile-controls-item-${ props.type }--mobile`,
									},
								] }>
								{
								( tab ) => {
									let tabout

									if ( "mobile" === tab.name ) {
										tabout = (
											<div className="uagb-dimensions-control__inputs">
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeTopValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s top', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueTopMobile !== '' ? valueTopMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeRightValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s right', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueRightMobile !== '' ? valueRightMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeBottomValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s bottom', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueBottomMobile !== '' ? valueBottomMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeLeftValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s left', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueLeftMobile !== '' ? valueLeftMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
													</div>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<div className="uagb-dimensions-control__inputs">
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeTopValue }
															aria-label={ sprintf(
																/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s top', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueTopTablet !== '' ? valueTopTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeRightValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s right', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueRightTablet !== '' ? valueRightTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeBottomValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s bottom', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueBottomTablet !== '' ? valueBottomTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="uagb-dimensions-control__number"
															type="number"
															onChange={ onChangeLeftValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s left', 'ultimate-addons-for-gutenberg' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueLeftTablet !== '' ? valueLeftTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
													</div>
										)
									} else {
										tabout = (
											<div className="uagb-dimensions-control__inputs">
													<input
														className="uagb-dimensions-control__number"
														type="number"
														onChange={ onChangeTopValue }
														aria-label={ sprintf(
															/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s top', 'ultimate-addons-for-gutenberg' ),
															label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueTop !== '' ? valueTop : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="uagb-dimensions-control__number"
														type="number"
														onChange={ onChangeRightValue }
														aria-label={ sprintf(
															/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s right', 'ultimate-addons-for-gutenberg' ),
															label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueRight !== '' ? valueRight : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="uagb-dimensions-control__number"
														type="number"
														onChange={ onChangeBottomValue }
														aria-label={ sprintf(
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s bottom', 'ultimate-addons-for-gutenberg' ),
															label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueBottom !== '' ? valueBottom : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="uagb-dimensions-control__number"
														type="number"
														onChange={ onChangeLeftValue }
														aria-label={ sprintf(
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s left', 'ultimate-addons-for-gutenberg' ), label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueLeft !== '' ? valueLeft : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
												</div>
										)
									}

									return <div>{ tabout }</div>
								}
							}
							</TabPanel>
                             <div className="uagb-dimensions-control__input-labels">
                                 <span className="uagb-dimensions-control__number-label">{ __( 'Top', 'ultimate-addons-for-gutenberg' ) }</span>
                                 <span className="uagb-dimensions-control__number-label">{ __( 'Right', 'ultimate-addons-for-gutenberg' ) }</span>
                                 <span className="uagb-dimensions-control__number-label">{ __( 'Bottom', 'ultimate-addons-for-gutenberg' ) }</span>
                                 <span className="uagb-dimensions-control__number-label">{ __( 'Left', 'ultimate-addons-for-gutenberg' ) }</span>
                                 <span className="uagb-dimensions-control__number-label-blank"></span>
                             </div>
                         </Fragment>
                </div>
            </Fragment>
         );
     }
//  }
 
//  export default withInstanceId( DimensionsControl );
export default DimensionsControl