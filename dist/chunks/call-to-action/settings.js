(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{414:function(e,t,a){"use strict";a.r(t);var l=a(196),n=a.n(l),o=a(6),r=a(2),c=a(12),i=a(62),u=a(1),b=a.n(u),s=a(8),g=a(15),m=a(29),d=a(4),_=a(5),f=Object.keys(i),p=function(e){var t,a,l,i=e=e.parentProps,p=i.setAttributes,h=i.attributes,v=h.textAlign,C=h.titleColor,E=h.descColor,O=h.titleTag,F=h.titleFontSize,j=h.titleFontSizeType,S=h.titleFontSizeMobile,T=h.titleFontSizeTablet,y=h.titleFontFamily,N=h.titleFontWeight,H=h.titleFontSubset,B=h.titleLineHeightType,z=h.titleLineHeight,L=h.titleLineHeightTablet,R=h.titleLineHeightMobile,k=h.titleLoadGoogleFonts,w=h.descFontSize,x=h.descFontSizeType,P=h.descFontSizeMobile,M=h.descFontSizeTablet,I=h.descFontFamily,W=h.descFontWeight,A=h.descFontSubset,G=h.descLineHeightType,D=h.descLineHeight,V=h.descLineHeightTablet,J=h.descLineHeightMobile,q=h.descLoadGoogleFonts,K=h.titleSpace,Q=h.descSpace,U=h.ctaPosition,X=h.buttonAlign,Y=h.ctaType,Z=h.ctaText,$=h.ctaLink,ee=h.ctaTarget,te=h.ctaIcon,ae=h.ctaIconPosition,le=h.ctaIconSpace,ne=h.ctaFontSize,oe=h.ctaFontSizeType,re=h.ctaFontSizeMobile,ce=h.ctaFontSizeTablet,ie=h.ctaFontFamily,ue=h.ctaFontWeight,be=h.ctaFontSubset,se=h.ctaLoadGoogleFonts,ge=h.contentWidth,me=h.ctaBtnLinkColor,de=h.ctaBgHoverColor,_e=h.ctaBgColor,fe=h.ctaBtnVertPadding,pe=h.ctaBtnHrPadding,he=h.ctaBorderStyle,ve=h.ctaBorderColor,Ce=h.ctaBorderhoverColor,Ee=h.ctaBorderWidth,Oe=h.ctaBorderRadius,Fe=h.stack,je=h.ctaLeftSpace,Se=h.ctaRightSpace,Te=h.ctaLinkHoverColor,ye=h.inheritFromTheme;if(1==se){var Ne={google:{families:[ie+(ue?":"+ue:"")]}};t=b.a.createElement(m.a,{config:Ne})}if(1==k){var He={google:{families:[y+(N?":"+N:"")]}};a=b.a.createElement(m.a,{config:He})}if(1==q){var Be={google:{families:[I+(W?":"+W:"")]}};l=b.a.createElement(m.a,{config:Be})}var ze={icons:f,value:te,onChange:function(e){p({ctaIcon:e})},isMulti:!1,renderFunc:c.a,noSelectedPlaceholder:Object(r.__)("Select Icon","ultimate-addons-for-gutenberg")};return b.a.createElement(u.Suspense,{fallback:Object(s.a)()},b.a.createElement(d.BlockControls,{key:"controls"},b.a.createElement(d.AlignmentToolbar,{value:v,onChange:function(e){return p({textAlign:e})}})),b.a.createElement(d.InspectorControls,null,"all"!==Y&&"none"!==Y&&b.a.createElement(_.PanelBody,{title:Object(r.__)("Layout","ultimate-addons-for-gutenberg"),initialOpen:!0},b.a.createElement(_.SelectControl,{label:Object(r.__)("Button Position","ultimate-addons-for-gutenberg"),value:U,onChange:function(e){return p({ctaPosition:e})},options:[{value:"right",label:Object(r.__)("Normal","ultimate-addons-for-gutenberg")},{value:"below-title",label:Object(r.__)("Stack","ultimate-addons-for-gutenberg")}]}),"right"==U&&b.a.createElement(_.SelectControl,{label:Object(r.__)("Stack on","ultimate-addons-for-gutenberg"),value:Fe,options:[{value:"none",label:Object(r.__)("None","ultimate-addons-for-gutenberg")},{value:"tablet",label:Object(r.__)("Tablet","ultimate-addons-for-gutenberg")},{value:"mobile",label:Object(r.__)("Mobile","ultimate-addons-for-gutenberg")}],help:Object(r.__)("Note: Choose on what breakpoint the CTA button will stack.","ultimate-addons-for-gutenberg"),onChange:function(e){return p({stack:e})}}),("text"===Y||"button"===Y)&&b.a.createElement(b.a.Fragment,null,"right"===U&&b.a.createElement(_.RangeControl,{label:Object(r.__)("Content Width (%)","ultimate-addons-for-gutenberg"),value:ge,onChange:function(e){return p({contentWidth:e})},min:0,max:100,initialPosition:70,allowReset:!0})),U&&"right"===U&&b.a.createElement(_.SelectControl,{label:Object(r.__)("Verticle Alignment","ultimate-addons-for-gutenberg"),value:X,onChange:function(e){return p({buttonAlign:e})},options:[{value:"top",label:Object(r.__)("Top","ultimate-addons-for-gutenberg")},{value:"middle",label:Object(r.__)("Middle","ultimate-addons-for-gutenberg")}]})),b.a.createElement(_.PanelBody,{title:Object(r.__)("Content","ultimate-addons-for-gutenberg"),initialOpen:!1},b.a.createElement("h2",null,Object(r.__)("Heading","ultimate-addons-for-gutenberg")),b.a.createElement(_.SelectControl,{label:Object(r.__)("Tag","ultimate-addons-for-gutenberg"),value:O,onChange:function(e){return p({titleTag:e})},options:[{value:"h1",label:Object(r.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(r.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(r.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(r.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(r.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(r.__)("H6","ultimate-addons-for-gutenberg")}]}),b.a.createElement(g.default,{label:Object(r.__)("Typography","ultimate-addons-for-gutenberg"),attributes:h,setAttributes:p,loadGoogleFonts:{value:k,label:"titleLoadGoogleFonts"},fontFamily:{value:y,label:"titleFontFamily"},fontWeight:{value:N,label:"titleFontWeight"},fontSubset:{value:H,label:"titleFontSubset"},fontSizeType:{value:j,label:"titleFontSizeType"},fontSize:{value:F,label:"titleFontSize"},fontSizeMobile:{value:S,label:"titleFontSizeMobile"},fontSizeTablet:{value:T,label:"titleFontSizeTablet"},lineHeightType:{value:B,label:"titleLineHeightType"},lineHeight:{value:z,label:"titleLineHeight"},lineHeightMobile:{value:R,label:"titleLineHeightMobile"},lineHeightTablet:{value:L,label:"titleLineHeightTablet"}}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:C}}))),b.a.createElement(d.ColorPalette,{value:C,onChange:function(e){return p({titleColor:e})},allowReset:!0}),b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Description","ultimate-addons-for-gutenberg")),b.a.createElement(g.default,{label:Object(r.__)("Typography","ultimate-addons-for-gutenberg"),attributes:h,setAttributes:p,loadGoogleFonts:{value:q,label:"descLoadGoogleFonts"},fontFamily:{value:I,label:"descFontFamily"},fontWeight:{value:W,label:"descFontWeight"},fontSubset:{value:A,label:"descFontSubset"},fontSizeType:{value:x,label:"descFontSizeType"},fontSize:{value:w,label:"descFontSize"},fontSizeMobile:{value:P,label:"descFontSizeMobile"},fontSizeTablet:{value:M,label:"descFontSizeTablet"},lineHeightType:{value:G,label:"descLineHeightType"},lineHeight:{value:D,label:"descLineHeight"},lineHeightMobile:{value:J,label:"descLineHeightMobile"},lineHeightTablet:{value:V,label:"descLineHeightTablet"}}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:E}}))),b.a.createElement(d.ColorPalette,{value:E,onChange:function(e){return p({descColor:e})},allowReset:!0})),b.a.createElement(_.PanelBody,{title:Object(r.__)("Button","ultimate-addons-for-gutenberg"),initialOpen:!1},b.a.createElement(_.SelectControl,{label:Object(r.__)("Type","ultimate-addons-for-gutenberg"),value:Y,onChange:function(e){return p({ctaType:e})},options:[{value:"none",label:Object(r.__)("None","ultimate-addons-for-gutenberg")},{value:"text",label:Object(r.__)("Text","ultimate-addons-for-gutenberg")},{value:"button",label:Object(r.__)("Button","ultimate-addons-for-gutenberg")},{value:"all",label:Object(r.__)("Complete Box","ultimate-addons-for-gutenberg")}]}),("text"===Y||"button"===Y)&&b.a.createElement(b.a.Fragment,null,b.a.createElement(_.TextControl,{label:Object(r.__)("Text","ultimate-addons-for-gutenberg"),value:Z,onChange:function(e){return p({ctaText:e})}}),"button"===Y&&b.a.createElement(_.ToggleControl,{label:Object(r.__)("Inherit from Theme","ultimate-addons-for-gutenberg"),checked:ye,onChange:function(e){return p({inheritFromTheme:!ye})}}),!ye&&"button"===Y||"text"===Y&&b.a.createElement(g.default,{label:Object(r.__)("Typography","ultimate-addons-for-gutenberg"),attributes:h,setAttributes:p,loadGoogleFonts:{value:se,label:"ctaLoadGoogleFonts"},fontFamily:{value:ie,label:"ctaFontFamily"},fontWeight:{value:ue,label:"ctaFontWeight"},fontSubset:{value:be,label:"ctaFontSubset"},fontSizeType:{value:oe,label:"ctaFontSizeType"},fontSize:{value:ne,label:"ctaFontSize"},fontSizeMobile:{value:re,label:"ctaFontSizeMobile"},fontSizeTablet:{value:ce,label:"ctaFontSizeTablet"},disableLineHeight:!0})),"none"!==Y&&b.a.createElement(b.a.Fragment,null,b.a.createElement(_.TextControl,{label:Object(r.__)("Link","ultimate-addons-for-gutenberg"),value:$,onChange:function(e){return p({ctaLink:e})}}),b.a.createElement(_.ToggleControl,{label:Object(r.__)("Open in new Window","ultimate-addons-for-gutenberg"),checked:ee,onChange:function(e){return p({ctaTarget:!ee})}})),"all"!==Y&&"none"!==Y&&b.a.createElement(b.a.Fragment,null,b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Button Icon")),b.a.createElement(n.a,ze),""!==te&&b.a.createElement(b.a.Fragment,null,b.a.createElement(_.SelectControl,{label:Object(r.__)("Icon Position","ultimate-addons-for-gutenberg"),value:ae,onChange:function(e){return p({ctaIconPosition:e})},options:[{value:"before",label:Object(r.__)("Before Text","ultimate-addons-for-gutenberg")},{value:"after",label:Object(r.__)("After Text","ultimate-addons-for-gutenberg")}]}),b.a.createElement(_.RangeControl,{label:Object(r.__)("Icon Spacing","ultimate-addons-for-gutenberg"),value:le,onChange:function(e){return p({ctaIconSpace:e})},min:0,max:50,beforeIcon:"",allowReset:!0}))),"button"==Y&&!ye&&b.a.createElement(b.a.Fragment,null,b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Button Padding (px)","ultimate-addons-for-gutenberg")),b.a.createElement(_.RangeControl,{label:o.a.vertical_spacing,className:"uagb-margin-control",value:fe,onChange:function(e){return p({ctaBtnVertPadding:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),b.a.createElement(_.RangeControl,{label:o.a.horizontal_spacing,className:"uagb-margin-control",value:pe,onChange:function(e){return p({ctaBtnHrPadding:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Button Border","ultimate-addons-for-gutenberg")),b.a.createElement(_.SelectControl,{label:Object(r.__)("Style"),value:he,onChange:function(e){return p({ctaBorderStyle:e})},options:[{value:"none",label:Object(r.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(r.__)("Solid","ultimate-addons-for-gutenberg")},{value:"double",label:Object(r.__)("Double","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(r.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(r.__)("Dotted","ultimate-addons-for-gutenberg")}]}),"none"!==he&&b.a.createElement(b.a.Fragment,null,b.a.createElement(_.RangeControl,{label:Object(r.__)("Width","ultimate-addons-for-gutenberg"),value:Ee,onChange:function(e){return p({ctaBorderWidth:e})},min:0,max:10,beforeIcon:"",allowReset:!0}),b.a.createElement(_.RangeControl,{label:Object(r.__)("Rounded Corner","ultimate-addons-for-gutenberg"),value:Oe,onChange:function(e){return p({ctaBorderRadius:e})},min:0,max:100,beforeIcon:"",allowReset:!0}))),"text"===Y&&b.a.createElement(_.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"normal",title:Object(r.__)("Normal","ultimate-addons-for-gutenberg"),className:"uagb-normal-tab"},{name:"hover",title:Object(r.__)("Hover","ultimate-addons-for-gutenberg"),className:"uagb-hover-tab"}]},(function(e){var t;return t="normal"===e.name?b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("CTA Text Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:me}}))),b.a.createElement(d.ColorPalette,{value:me,onChange:function(e){return p({ctaBtnLinkColor:e})},allowReset:!0})):b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("CTA Text Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Te}}))),b.a.createElement(d.ColorPalette,{value:Te,onChange:function(e){return p({ctaLinkHoverColor:e})},allowReset:!0})),b.a.createElement("div",null,t)})),"button"===Y&&!ye&&b.a.createElement(_.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"normal",title:Object(r.__)("Normal","ultimate-addons-for-gutenberg"),className:"uagb-normal-tab"},{name:"hover",title:Object(r.__)("Hover","ultimate-addons-for-gutenberg"),className:"uagb-focus-tab"}]},(function(e){var t;return t="normal"===e.name?b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Text Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:me}}))),b.a.createElement(d.ColorPalette,{value:me,onChange:function(e){return p({ctaBtnLinkColor:e})},allowReset:!0}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Background Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:_e}}))),b.a.createElement(d.ColorPalette,{value:_e,onChange:function(e){return p({ctaBgColor:e})},allowReset:!0}),"none"!==he&&b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Border Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:ve}}))),b.a.createElement(d.ColorPalette,{value:ve,onChange:function(e){return p({ctaBorderColor:e})},allowReset:!0}))):b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Text Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Te}}))),b.a.createElement(d.ColorPalette,{value:Te,onChange:function(e){return p({ctaLinkHoverColor:e})},allowReset:!0}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Background Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:de}}))),b.a.createElement(d.ColorPalette,{value:de,onChange:function(e){return p({ctaBgHoverColor:e})},allowReset:!0}),"none"!==he&&b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Border Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ce}}))),b.a.createElement(d.ColorPalette,{value:Ce,onChange:function(e){return p({ctaBorderhoverColor:e})},allowReset:!0}))),b.a.createElement("div",null,t)}))),b.a.createElement(_.PanelBody,{title:Object(r.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},b.a.createElement(_.RangeControl,{label:Object(r.__)("Heading Bottom Margin","ultimate-addons-for-gutenberg"),value:K,onChange:function(e){return p({titleSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),b.a.createElement(_.RangeControl,{label:Object(r.__)("Description Bottom Margin","ultimate-addons-for-gutenberg"),value:Q,onChange:function(e){return p({descSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),"left"===v&&"right"===U&&b.a.createElement(_.RangeControl,{label:Object(r.__)("Content Left Margin","ultimate-addons-for-gutenberg"),value:je,onChange:function(e){return p({ctaLeftSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),"right"===v&&"right"===U&&b.a.createElement(_.RangeControl,{label:Object(r.__)("Content Right Margin","ultimate-addons-for-gutenberg"),value:Se,onChange:function(e){return p({ctaRightSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}))),t,a,l)};t.default=b.a.memo(p)}}]);