(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{395:function(e,a,t){"use strict";t.r(a);var n=t(4),l=t(2),o=t.n(l),r=t(10),i=t(0),u=t(6),g=t(7),b=Object(l.lazy)((function(){return t.e(1).then(t.bind(null,306))})),c=Object(l.lazy)((function(){return Promise.resolve().then(t.bind(null,17))})),d=function(e){var a=e.parentProps,t=a.attributes,d=t.topPadding,m=t.bottomPadding,s=t.leftPadding,_=t.rightPadding,f=t.topPaddingTablet,p=t.bottomPaddingTablet,C=t.leftPaddingTablet,v=t.rightPaddingTablet,O=t.topPaddingMobile,E=t.bottomPaddingMobile,h=t.leftPaddingMobile,y=t.rightPaddingMobile,j=t.backgroundType,P=t.backgroundImage,R=t.backgroundColor,k=t.backgroundPosition,x=t.backgroundAttachment,N=t.backgroundRepeat,T=t.backgroundSize,S=t.backgroundOpacity,B=t.backgroundImageColor,w=t.borderStyle,z=t.borderWidth,I=t.borderRadius,L=t.borderColor,M=t.overlayType,W=t.gradientOverlayColor1,A=t.gradientOverlayColor2,F=t.gradientOverlayType,D=t.gradientOverlayLocation1,G=t.gradientOverlayLocation2,J=t.gradientOverlayAngle,U=t.mobilePaddingType,q=t.tabletPaddingType,H=t.desktopPaddingType,K=t.colWidthMobile,Q=t.colWidthTablet,V=t.colWidth,X=a.setAttributes,Y=a.deviceType;return o.a.createElement(l.Suspense,{fallback:Object(r.a)()},o.a.createElement(u.InspectorControls,null,o.a.createElement(g.PanelBody,{title:Object(i.__)("Layout","ultimate-addons-for-gutenberg")},o.a.createElement(g.TabPanel,{className:"uagb-size-type-field-tabs uagb-without-size-type",activeClass:"active-tab",tabs:[{name:"desktop",title:o.a.createElement(g.Dashicon,{icon:"desktop"}),className:"uagb-desktop-tab uagb-responsive-tabs"},{name:"tablet",title:o.a.createElement(g.Dashicon,{icon:"tablet"}),className:"uagb-tablet-tab uagb-responsive-tabs"},{name:"mobile",title:o.a.createElement(g.Dashicon,{icon:"smartphone"}),className:"uagb-mobile-tab uagb-responsive-tabs"}]},(function(e){var a;return a="mobile"===e.name?o.a.createElement(g.RangeControl,{label:Object(i.__)("Content Width (%)","ultimate-addons-for-gutenberg"),value:K,onChange:function(e){X({colWidthMobile:e})},min:0,max:100}):"tablet"===e.name?o.a.createElement(g.RangeControl,{label:Object(i.__)("Content Width (%)","ultimate-addons-for-gutenberg"),value:Q,onChange:function(e){X({colWidthTablet:e})},min:0,max:100}):o.a.createElement(g.RangeControl,{label:Object(i.__)("Content Width (%)","ultimate-addons-for-gutenberg"),value:V,onChange:function(e){X({colWidth:e})},min:0,max:100}),o.a.createElement("div",null,a)}))),o.a.createElement(g.PanelBody,{title:Object(i.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c,null),"Desktop"===Y&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(i.__)("Size Type","ultimate-addons-for-gutenberg")},o.a.createElement(g.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===H,"aria-pressed":"px"===H,onClick:function(){return X({desktopPaddingType:"px"})}},"px"),o.a.createElement(g.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===H,"aria-pressed":"%"===H,onClick:function(){return X({desktopPaddingType:"%"})}},"%")),o.a.createElement("h2",null,Object(i.__)("Padding","ultimate-addons-for-gutenberg")),o.a.createElement(g.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:d,onChange:function(e){return X({topPadding:e})},min:0,max:"%"==H?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:m,onChange:function(e){return X({bottomPadding:e})},min:0,max:"%"==H?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.left_margin,className:"uagb-margin-control",value:s,onChange:function(e){return X({leftPadding:e})},min:0,max:"%"==H?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.right_margin,className:"uagb-margin-control",value:_,onChange:function(e){return X({rightPadding:e})},min:0,max:"%"==H?100:2e3,allowReset:!0})),"Tablet"===Y&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(i.__)("Size Type","ultimate-addons-for-gutenberg")},o.a.createElement(g.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===q,"aria-pressed":"px"===q,onClick:function(){return X({tabletPaddingType:"px"})}},"px"),o.a.createElement(g.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===q,"aria-pressed":"%"===q,onClick:function(){return X({tabletPaddingType:"%"})}},"%")),o.a.createElement("h2",null,Object(i.__)("Padding","ultimate-addons-for-gutenberg")),o.a.createElement(g.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:f,onChange:function(e){return X({topPaddingTablet:e})},min:0,max:"%"==q?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:p,onChange:function(e){return X({bottomPaddingTablet:e})},min:0,max:"%"==q?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.left_margin,className:"uagb-margin-control",value:C,onChange:function(e){return X({leftPaddingTablet:e})},min:0,max:"%"==q?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.right_margin,className:"uagb-margin-control",value:v,onChange:function(e){return X({rightPaddingTablet:e})},min:0,max:"%"==q?100:2e3,allowReset:!0})),"Mobile"===Y&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(i.__)("Size Type")},o.a.createElement(g.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===U,"aria-pressed":"px"===U,onClick:function(){return X({mobilePaddingType:"px"})}},"px"),o.a.createElement(g.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===U,"aria-pressed":"%"===U,onClick:function(){return X({mobilePaddingType:"%"})}},"%")),o.a.createElement("h2",null,Object(i.__)("Padding","ultimate-addons-for-gutenberg")),o.a.createElement(g.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:O,onChange:function(e){return X({topPaddingMobile:e})},min:0,max:"%"==U?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:E,onChange:function(e){return X({bottomPaddingMobile:e})},min:0,max:"%"==U?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.left_margin,className:"uagb-margin-control",value:h,onChange:function(e){return X({leftPaddingMobile:e})},min:0,max:"%"==U?100:2e3,allowReset:!0}),o.a.createElement(g.RangeControl,{label:n.a.right_margin,className:"uagb-margin-control",value:y,onChange:function(e){return X({rightPaddingMobile:e})},min:0,max:"%"==U?100:2e3,allowReset:!0}))),o.a.createElement(g.PanelBody,{title:Object(i.__)("Background","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(g.SelectControl,{label:Object(i.__)("Background Type","ultimate-addons-for-gutenberg"),value:j,onChange:function(e){return X({backgroundType:e})},options:[{value:"none",label:Object(i.__)("None","ultimate-addons-for-gutenberg")},{value:"color",label:Object(i.__)("Color","ultimate-addons-for-gutenberg")},{value:"gradient",label:Object(i.__)("Gradient","ultimate-addons-for-gutenberg")},{value:"image",label:Object(i.__)("Image","ultimate-addons-for-gutenberg")}]}),"color"==j&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Background Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:R}}))),o.a.createElement(u.ColorPalette,{value:R,onChange:function(e){return X({backgroundColor:e})},allowReset:!0})),"image"==j&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g.BaseControl,{className:"editor-bg-image-control",label:Object(i.__)("Background Image","ultimate-addons-for-gutenberg")},o.a.createElement(u.MediaUpload,{title:Object(i.__)("Select Background Image","ultimate-addons-for-gutenberg"),onSelect:function(a){var t=e.parentProps.setAttributes;a&&a.url?a.type&&"image"==a.type&&t({backgroundImage:a}):t({backgroundImage:null})},allowedTypes:["image"],value:P,render:function(e){var a=e.open;return o.a.createElement(g.Button,{isSecondary:!0,onClick:a},P?Object(i.__)("Replace image","ultimate-addons-for-gutenberg"):Object(i.__)("Select Background Image","ultimate-addons-for-gutenberg"))}}),P&&o.a.createElement(g.Button,{className:"uagb-rm-btn",onClick:function(){(0,e.parentProps.setAttributes)({backgroundImage:null})},isLink:!0,isDestructive:!0},Object(i.__)("Remove Image","ultimate-addons-for-gutenberg"))),P&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g.SelectControl,{label:Object(i.__)("Image Position","ultimate-addons-for-gutenberg"),value:k,onChange:function(e){return X({backgroundPosition:e})},options:[{value:"top-left",label:Object(i.__)("Top Left","ultimate-addons-for-gutenberg")},{value:"top-center",label:Object(i.__)("Top Center","ultimate-addons-for-gutenberg")},{value:"top-right",label:Object(i.__)("Top Right","ultimate-addons-for-gutenberg")},{value:"center-left",label:Object(i.__)("Center Left","ultimate-addons-for-gutenberg")},{value:"center-center",label:Object(i.__)("Center Center","ultimate-addons-for-gutenberg")},{value:"center-right",label:Object(i.__)("Center Right","ultimate-addons-for-gutenberg")},{value:"bottom-left",label:Object(i.__)("Bottom Left","ultimate-addons-for-gutenberg")},{value:"bottom-center",label:Object(i.__)("Bottom Center","ultimate-addons-for-gutenberg")},{value:"bottom-right",label:Object(i.__)("Bottom Right","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g.SelectControl,{label:Object(i.__)("Attachment","ultimate-addons-for-gutenberg"),value:x,onChange:function(e){return X({backgroundAttachment:e})},options:[{value:"fixed",label:Object(i.__)("Fixed","ultimate-addons-for-gutenberg")},{value:"scroll",label:Object(i.__)("Scroll","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g.SelectControl,{label:Object(i.__)("Repeat","ultimate-addons-for-gutenberg"),value:N,onChange:function(e){return X({backgroundRepeat:e})},options:[{value:"no-repeat",label:Object(i.__)("No Repeat","ultimate-addons-for-gutenberg")},{value:"repeat",label:Object(i.__)("Repeat","ultimate-addons-for-gutenberg")},{value:"repeat-x",label:Object(i.__)("Repeat-x","ultimate-addons-for-gutenberg")},{value:"repeat-y",label:Object(i.__)("Repeat-y","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g.SelectControl,{label:Object(i.__)("Size","ultimate-addons-for-gutenberg"),value:T,onChange:function(e){return X({backgroundSize:e})},options:[{value:"auto",label:Object(i.__)("Auto","ultimate-addons-for-gutenberg")},{value:"cover",label:Object(i.__)("Cover","ultimate-addons-for-gutenberg")},{value:"contain",label:Object(i.__)("Contain","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g.SelectControl,{label:Object(i.__)("Image Overlay Type","ultimate-addons-for-gutenberg"),value:M,onChange:function(e){return X({overlayType:e})},options:[{value:"color",label:Object(i.__)("Color","ultimate-addons-for-gutenberg")},{value:"gradient",label:Object(i.__)("Gradient","ultimate-addons-for-gutenberg")}]}),"color"==M&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Image Overlay Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:B}}))),o.a.createElement(u.ColorPalette,{value:B,onChange:function(e){return X({backgroundImageColor:e})},allowReset:!0})),"gradient"==M&&o.a.createElement(o.a.Fragment,null,o.a.createElement(u.PanelColorSettings,{title:Object(i.__)("Color Settings","ultimate-addons-for-gutenberg"),colorSettings:[{value:A,onChange:function(e){return X({gradientOverlayColor2:e})},label:Object(i.__)("Color 1","ultimate-addons-for-gutenberg")},{value:W,onChange:function(e){return X({gradientOverlayColor1:e})},label:Object(i.__)("Color 2","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g.SelectControl,{label:Object(i.__)("Type","ultimate-addons-for-gutenberg"),value:F,onChange:function(e){return X({gradientOverlayType:e})},options:[{value:"linear",label:Object(i.__)("Linear","ultimate-addons-for-gutenberg")},{value:"radial",label:Object(i.__)("Radial","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g.RangeControl,{label:Object(i.__)("Location 1","ultimate-addons-for-gutenberg"),value:D,onChange:function(e){return X({gradientOverlayLocation1:e})},min:0,max:100,allowReset:!0}),o.a.createElement(g.RangeControl,{label:Object(i.__)("Location 2","ultimate-addons-for-gutenberg"),value:G,onChange:function(e){return X({gradientOverlayLocation2:e})},min:0,max:100,allowReset:!0}),o.a.createElement(g.RangeControl,{label:Object(i.__)("Angle","ultimate-addons-for-gutenberg"),value:J,onChange:function(e){return X({gradientOverlayAngle:e})},min:0,max:360,allowReset:!0})))),"gradient"==j&&o.a.createElement(o.a.Fragment,null,o.a.createElement(b,{attributes:e.parentProps.attributes,setAttributes:X})),("color"==j||"image"==j&&P||"gradient"==j)&&o.a.createElement(g.RangeControl,{label:Object(i.__)("Opacity"),value:S,onChange:function(e){return X({backgroundOpacity:e})},min:0,max:100,allowReset:!0,initialPosition:0})),o.a.createElement(g.PanelBody,{title:Object(i.__)("Border","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(g.SelectControl,{label:Object(i.__)("Border Style","ultimate-addons-for-gutenberg"),value:w,onChange:function(e){return X({borderStyle:e})},options:[{value:"none",label:Object(i.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(i.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(i.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(i.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(i.__)("Double","ultimate-addons-for-gutenberg")},{value:"groove",label:Object(i.__)("Groove","ultimate-addons-for-gutenberg")},{value:"inset",label:Object(i.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(i.__)("Outset","ultimate-addons-for-gutenberg")},{value:"ridge",label:Object(i.__)("Ridge","ultimate-addons-for-gutenberg")}]}),"none"!=w&&o.a.createElement(g.RangeControl,{label:Object(i.__)("Border Width","ultimate-addons-for-gutenberg"),value:z,onChange:function(e){return X({borderWidth:e})},min:0,max:50,allowReset:!0}),o.a.createElement(g.RangeControl,{label:Object(i.__)("Border Radius","ultimate-addons-for-gutenberg"),value:I,onChange:function(e){return X({borderRadius:e})},min:0,max:100,allowReset:!0}),"none"!=w&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Border Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:L}}))),o.a.createElement(u.ColorPalette,{value:L,onChange:function(e){return X({borderColor:e})},allowReset:!0})))))};a.default=o.a.memo(d)}}]);