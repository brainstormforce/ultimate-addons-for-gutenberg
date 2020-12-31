const {
    ToggleControl,
    SelectControl
} = wp.components


const { __ } = wp.i18n

const UserConditionOptions = ( props ) => {
    
    const { attributes, setAttributes } = props;
    const { Fragment } = wp.element;
    const { 
        UAGloggedIn,
        UAGloggedOut,
        DisplayConditions,
        UAGHideDesktop,
        UAGHideMob,
        UAGHideTab,
        UAGSystem,
        UAGBrowser,
        UAGUserRole
    } = attributes;
 
    const user_role = uagb_blocks_info.user_role;

    return(
        <Fragment>
            <SelectControl
				label={ __( "Display Conditions" ) }
				value={ DisplayConditions }
				onChange={ ( value ) => setAttributes( { DisplayConditions: value } ) }
				options={ [
                    { value: "none", label: __( "None" ) },
                    { value: "userstate", label: __( "User State" ) },
                    { value: "responsiveVisibility", label: __( "Responsive Visibility" ) },
                    { value: "userRole", label: __( "User Role" ) },
                    { value: "browser", label: __( "Browser" ) },
                    { value: "os", label: __( "Operating System" ) },
                ]}
			/> 
            { DisplayConditions == "userstate" && 
                <Fragment>
                    <ToggleControl
                        label={ __('Hide From Logged In Users')}
                        checked={UAGloggedIn}
                        onChange={(value) => setAttributes({ UAGloggedIn: !attributes.UAGloggedIn })}
                    />
                    <ToggleControl
                        label={ __('Hide From Logged Out Users' ) }
                        checked={UAGloggedOut}
                        onChange={(value) => setAttributes({ UAGloggedOut: !attributes.UAGloggedOut })}
                    />
                </Fragment>
            }
            { DisplayConditions == "responsiveVisibility" && 
                <Fragment>
                    <ToggleControl
                        label={ __('Hide on Desktop')}
                        checked={UAGHideDesktop}
                        onChange={(value) => setAttributes({ UAGHideDesktop: !attributes.UAGHideDesktop })}
                    />
                    <ToggleControl
                        label={ __('Hide on Tablet' ) }
                        checked={UAGHideTab}
                        onChange={(value) => setAttributes({ UAGHideTab: !attributes.UAGHideTab })}
                    />
                    <ToggleControl
                        label={ __('Hide on Mobile' ) }
                        checked={UAGHideMob}
                        onChange={(value) => setAttributes({ UAGHideMob: !attributes.UAGHideMob })}
                    />
                </Fragment>
            }
            { DisplayConditions == "os" && 
                <Fragment>
                    <SelectControl
                        label={ __( "Hide on Operating System" ) }
                        value={ UAGSystem }
                        onChange={ ( value ) => setAttributes( { UAGSystem: value } ) }
                        options={ [
                            { value: '', label: __( "None" ) },
                            { value: 'iphone', label: __( "IOS" ) },
                            { value: "android", label: __( "Android" ) },
                            { value: "windows", label: __( "Windows" ) },
                            { value: "open_bsd", label: __( "OpenBSD" ) },
                            { value: "sun_os", label: __( "SunOS" ) },
                            { value: "linux", label: __( "Linux" ) },
                            { value: "mac_os", label: __( "Mac OS" ) },
                        ]}
			        />
                </Fragment>
            }
            { DisplayConditions == "browser" && 
                <Fragment>
                    <SelectControl
                        label={ __( "Hide on Browser" ) }
                        value={ UAGBrowser }
                        onChange={ ( value ) => setAttributes( { UAGBrowser: value } ) }
                        options={ [
                            { value: '', label: __( "None" ) },
                            { value: 'ie', label: __( "Internet Explorer" ) },
                            { value: "firefox", label: __( "Mozilla Firefox" ) },
                            { value: "chrome", label: __( "Google Chrome" ) },
                            { value: "opera_mini", label: __( "Opera Mini" ) },
                            { value: "opera", label: __( "Opera" ) },
                            { value: "safari", label: __( "Safari" ) },
                            { value: "edge", label: __( "Microsoft Edge" ) },
                        ]}
			        />
                </Fragment>
            }
            { DisplayConditions == "userRole" && 
                <Fragment>
                    <SelectControl
                        label={ __( "Hide for User Role" ) }
                        value={ UAGUserRole }
                        onChange={ ( value ) => setAttributes( { UAGUserRole: value } ) }
                        options={ uagb_blocks_info.user_role }
			        />
                </Fragment>
            }
        </Fragment>
    );
}

export default UserConditionOptions;