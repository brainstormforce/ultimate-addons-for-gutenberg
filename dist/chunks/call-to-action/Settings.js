(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{394:function(e,t,a){"use strict";a.r(t);var n=a(20),l=a.n(n),o=a(4),r=a(0),c=a(8),i=a(18),u=a(2),b=a.n(u),s=a(10),g=a(6),m=a(7),d=Object(u.lazy)((function(){return Promise.resolve().then(a.bind(null,12))})),_=Object(u.lazy)((function(){return Promise.resolve().then(a.bind(null,13))})),f=Object.keys(i),h=function(e){var t,a,n,i=e=e.parentProps,h=i.setAttributes,p=i.attributes,v=p.textAlign,C=p.titleColor,E=p.descColor,O=p.titleTag,F=p.titleFontSize,j=p.titleFontSizeType,S=p.titleFontSizeMobile,T=p.titleFontSizeTablet,y=p.titleFontFamily,N=p.titleFontWeight,H=p.titleFontSubset,B=p.titleLineHeightType,z=p.titleLineHeight,L=p.titleLineHeightTablet,R=p.titleLineHeightMobile,k=p.titleLoadGoogleFonts,P=p.descFontSize,w=p.descFontSizeType,x=p.descFontSizeMobile,M=p.descFontSizeTablet,I=p.descFontFamily,W=p.descFontWeight,A=p.descFontSubset,G=p.descLineHeightType,D=p.descLineHeight,V=p.descLineHeightTablet,J=p.descLineHeightMobile,q=p.descLoadGoogleFonts,K=p.titleSpace,Q=p.descSpace,U=p.ctaPosition,X=p.buttonAlign,Y=p.ctaType,Z=p.ctaText,$=p.ctaLink,ee=p.ctaTarget,te=p.ctaIcon,ae=p.ctaIconPosition,ne=p.ctaIconSpace,le=p.ctaFontSize,oe=p.ctaFontSizeType,re=p.ctaFontSizeMobile,ce=p.ctaFontSizeTablet,ie=p.ctaFontFamily,ue=p.ctaFontWeight,be=p.ctaFontSubset,se=p.ctaLoadGoogleFonts,ge=p.contentWidth,me=p.ctaBtnLinkColor,de=p.ctaBgHoverColor,_e=p.ctaBgColor,fe=p.ctaBtnVertPadding,he=p.ctaBtnHrPadding,pe=p.ctaBorderStyle,ve=p.ctaBorderColor,Ce=p.ctaBorderhoverColor,Ee=p.ctaBorderWidth,Oe=p.ctaBorderRadius,Fe=p.stack,je=p.ctaLeftSpace,Se=p.ctaRightSpace,Te=p.ctaLinkHoverColor,ye=p.inheritFromTheme;if(1==se){var Ne={google:{families:[ie+(ue?":"+ue:"")]}};t=b.a.createElement(_,{config:Ne})}if(1==k){var He={google:{families:[y+(N?":"+N:"")]}};a=b.a.createElement(_,{config:He})}if(1==q){var Be={google:{families:[I+(W?":"+W:"")]}};n=b.a.createElement(_,{config:Be})}var ze={icons:f,value:te,onChange:function(e){h({ctaIcon:e})},isMulti:!1,renderFunc:c.a,noSelectedPlaceholder:Object(r.__)("Select Icon","ultimate-addons-for-gutenberg")};return b.a.createElement(u.Suspense,{fallback:Object(s.a)()},b.a.createElement(g.BlockControls,{key:"controls"},b.a.createElement(g.AlignmentToolbar,{value:v,onChange:function(e){return h({textAlign:e})}})),b.a.createElement(g.InspectorControls,null,"all"!==Y&&"none"!==Y&&b.a.createElement(m.PanelBody,{title:Object(r.__)("Layout","ultimate-addons-for-gutenberg"),initialOpen:!0},b.a.createElement(m.SelectControl,{label:Object(r.__)("Button Position","ultimate-addons-for-gutenberg"),value:U,onChange:function(e){return h({ctaPosition:e})},options:[{value:"right",label:Object(r.__)("Normal","ultimate-addons-for-gutenberg")},{value:"below-title",label:Object(r.__)("Stack","ultimate-addons-for-gutenberg")}]}),"right"==U&&b.a.createElement(m.SelectControl,{label:Object(r.__)("Stack on","ultimate-addons-for-gutenberg"),value:Fe,options:[{value:"none",label:Object(r.__)("None","ultimate-addons-for-gutenberg")},{value:"tablet",label:Object(r.__)("Tablet","ultimate-addons-for-gutenberg")},{value:"mobile",label:Object(r.__)("Mobile","ultimate-addons-for-gutenberg")}],help:Object(r.__)("Note: Choose on what breakpoint the CTA button will stack.","ultimate-addons-for-gutenberg"),onChange:function(e){return h({stack:e})}}),("text"===Y||"button"===Y)&&b.a.createElement(b.a.Fragment,null,"right"===U&&b.a.createElement(m.RangeControl,{label:Object(r.__)("Content Width (%)","ultimate-addons-for-gutenberg"),value:ge,onChange:function(e){return h({contentWidth:e})},min:0,max:100,initialPosition:70,allowReset:!0})),U&&"right"===U&&b.a.createElement(m.SelectControl,{label:Object(r.__)("Verticle Alignment","ultimate-addons-for-gutenberg"),value:X,onChange:function(e){return h({buttonAlign:e})},options:[{value:"top",label:Object(r.__)("Top","ultimate-addons-for-gutenberg")},{value:"middle",label:Object(r.__)("Middle","ultimate-addons-for-gutenberg")}]})),b.a.createElement(m.PanelBody,{title:Object(r.__)("Content","ultimate-addons-for-gutenberg"),initialOpen:!1},b.a.createElement("h2",null,Object(r.__)("Heading","ultimate-addons-for-gutenberg")),b.a.createElement(m.SelectControl,{label:Object(r.__)("Tag","ultimate-addons-for-gutenberg"),value:O,onChange:function(e){return h({titleTag:e})},options:[{value:"h1",label:Object(r.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(r.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(r.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(r.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(r.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(r.__)("H6","ultimate-addons-for-gutenberg")}]}),b.a.createElement(d,{label:Object(r.__)("Typography","ultimate-addons-for-gutenberg"),attributes:p,setAttributes:h,loadGoogleFonts:{value:k,label:"titleLoadGoogleFonts"},fontFamily:{value:y,label:"titleFontFamily"},fontWeight:{value:N,label:"titleFontWeight"},fontSubset:{value:H,label:"titleFontSubset"},fontSizeType:{value:j,label:"titleFontSizeType"},fontSize:{value:F,label:"titleFontSize"},fontSizeMobile:{value:S,label:"titleFontSizeMobile"},fontSizeTablet:{value:T,label:"titleFontSizeTablet"},lineHeightType:{value:B,label:"titleLineHeightType"},lineHeight:{value:z,label:"titleLineHeight"},lineHeightMobile:{value:R,label:"titleLineHeightMobile"},lineHeightTablet:{value:L,label:"titleLineHeightTablet"}}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:C}}))),b.a.createElement(g.ColorPalette,{value:C,onChange:function(e){return h({titleColor:e})},allowReset:!0}),b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Description","ultimate-addons-for-gutenberg")),b.a.createElement(d,{label:Object(r.__)("Typography","ultimate-addons-for-gutenberg"),attributes:p,setAttributes:h,loadGoogleFonts:{value:q,label:"descLoadGoogleFonts"},fontFamily:{value:I,label:"descFontFamily"},fontWeight:{value:W,label:"descFontWeight"},fontSubset:{value:A,label:"descFontSubset"},fontSizeType:{value:w,label:"descFontSizeType"},fontSize:{value:P,label:"descFontSize"},fontSizeMobile:{value:x,label:"descFontSizeMobile"},fontSizeTablet:{value:M,label:"descFontSizeTablet"},lineHeightType:{value:G,label:"descLineHeightType"},lineHeight:{value:D,label:"descLineHeight"},lineHeightMobile:{value:J,label:"descLineHeightMobile"},lineHeightTablet:{value:V,label:"descLineHeightTablet"}}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:E}}))),b.a.createElement(g.ColorPalette,{value:E,onChange:function(e){return h({descColor:e})},allowReset:!0})),b.a.createElement(m.PanelBody,{title:Object(r.__)("Button","ultimate-addons-for-gutenberg"),initialOpen:!1},b.a.createElement(m.SelectControl,{label:Object(r.__)("Type","ultimate-addons-for-gutenberg"),value:Y,onChange:function(e){return h({ctaType:e})},options:[{value:"none",label:Object(r.__)("None","ultimate-addons-for-gutenberg")},{value:"text",label:Object(r.__)("Text","ultimate-addons-for-gutenberg")},{value:"button",label:Object(r.__)("Button","ultimate-addons-for-gutenberg")},{value:"all",label:Object(r.__)("Complete Box","ultimate-addons-for-gutenberg")}]}),("text"===Y||"button"===Y)&&b.a.createElement(b.a.Fragment,null,b.a.createElement(m.TextControl,{label:Object(r.__)("Text","ultimate-addons-for-gutenberg"),value:Z,onChange:function(e){return h({ctaText:e})}}),"button"===Y&&b.a.createElement(m.ToggleControl,{label:Object(r.__)("Inherit from Theme","ultimate-addons-for-gutenberg"),checked:ye,onChange:function(e){return h({inheritFromTheme:!ye})}}),!ye&&"button"===Y||"text"===Y&&b.a.createElement(d,{label:Object(r.__)("Typography","ultimate-addons-for-gutenberg"),attributes:p,setAttributes:h,loadGoogleFonts:{value:se,label:"ctaLoadGoogleFonts"},fontFamily:{value:ie,label:"ctaFontFamily"},fontWeight:{value:ue,label:"ctaFontWeight"},fontSubset:{value:be,label:"ctaFontSubset"},fontSizeType:{value:oe,label:"ctaFontSizeType"},fontSize:{value:le,label:"ctaFontSize"},fontSizeMobile:{value:re,label:"ctaFontSizeMobile"},fontSizeTablet:{value:ce,label:"ctaFontSizeTablet"},disableLineHeight:!0})),"none"!==Y&&b.a.createElement(b.a.Fragment,null,b.a.createElement(m.TextControl,{label:Object(r.__)("Link","ultimate-addons-for-gutenberg"),value:$,onChange:function(e){return h({ctaLink:e})}}),b.a.createElement(m.ToggleControl,{label:Object(r.__)("Open in new Window","ultimate-addons-for-gutenberg"),checked:ee,onChange:function(e){return h({ctaTarget:!ee})}})),"all"!==Y&&"none"!==Y&&b.a.createElement(b.a.Fragment,null,b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Button Icon")),b.a.createElement(l.a,ze),""!==te&&b.a.createElement(b.a.Fragment,null,b.a.createElement(m.SelectControl,{label:Object(r.__)("Icon Position","ultimate-addons-for-gutenberg"),value:ae,onChange:function(e){return h({ctaIconPosition:e})},options:[{value:"before",label:Object(r.__)("Before Text","ultimate-addons-for-gutenberg")},{value:"after",label:Object(r.__)("After Text","ultimate-addons-for-gutenberg")}]}),b.a.createElement(m.RangeControl,{label:Object(r.__)("Icon Spacing","ultimate-addons-for-gutenberg"),value:ne,onChange:function(e){return h({ctaIconSpace:e})},min:0,max:50,beforeIcon:"",allowReset:!0}))),"button"==Y&&!ye&&b.a.createElement(b.a.Fragment,null,b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Button Padding (px)","ultimate-addons-for-gutenberg")),b.a.createElement(m.RangeControl,{label:o.a.vertical_spacing,className:"uagb-margin-control",value:fe,onChange:function(e){return h({ctaBtnVertPadding:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),b.a.createElement(m.RangeControl,{label:o.a.horizontal_spacing,className:"uagb-margin-control",value:he,onChange:function(e){return h({ctaBtnHrPadding:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),b.a.createElement("hr",{className:"uagb-editor__separator"}),b.a.createElement("h2",null,Object(r.__)("Button Border","ultimate-addons-for-gutenberg")),b.a.createElement(m.SelectControl,{label:Object(r.__)("Style"),value:pe,onChange:function(e){return h({ctaBorderStyle:e})},options:[{value:"none",label:Object(r.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(r.__)("Solid","ultimate-addons-for-gutenberg")},{value:"double",label:Object(r.__)("Double","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(r.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(r.__)("Dotted","ultimate-addons-for-gutenberg")}]}),"none"!==pe&&b.a.createElement(b.a.Fragment,null,b.a.createElement(m.RangeControl,{label:Object(r.__)("Width","ultimate-addons-for-gutenberg"),value:Ee,onChange:function(e){return h({ctaBorderWidth:e})},min:0,max:10,beforeIcon:"",allowReset:!0}),b.a.createElement(m.RangeControl,{label:Object(r.__)("Rounded Corner","ultimate-addons-for-gutenberg"),value:Oe,onChange:function(e){return h({ctaBorderRadius:e})},min:0,max:100,beforeIcon:"",allowReset:!0}))),"text"===Y&&b.a.createElement(m.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"normal",title:Object(r.__)("Normal","ultimate-addons-for-gutenberg"),className:"uagb-normal-tab"},{name:"hover",title:Object(r.__)("Hover","ultimate-addons-for-gutenberg"),className:"uagb-hover-tab"}]},(function(e){var t;return t="normal"===e.name?b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("CTA Text Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:me}}))),b.a.createElement(g.ColorPalette,{value:me,onChange:function(e){return h({ctaBtnLinkColor:e})},allowReset:!0})):b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("CTA Text Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Te}}))),b.a.createElement(g.ColorPalette,{value:Te,onChange:function(e){return h({ctaLinkHoverColor:e})},allowReset:!0})),b.a.createElement("div",null,t)})),"button"===Y&&!ye&&b.a.createElement(m.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"normal",title:Object(r.__)("Normal","ultimate-addons-for-gutenberg"),className:"uagb-normal-tab"},{name:"hover",title:Object(r.__)("Hover","ultimate-addons-for-gutenberg"),className:"uagb-focus-tab"}]},(function(e){var t;return t="normal"===e.name?b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Text Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:me}}))),b.a.createElement(g.ColorPalette,{value:me,onChange:function(e){return h({ctaBtnLinkColor:e})},allowReset:!0}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Background Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:_e}}))),b.a.createElement(g.ColorPalette,{value:_e,onChange:function(e){return h({ctaBgColor:e})},allowReset:!0}),"none"!==pe&&b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Border Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:ve}}))),b.a.createElement(g.ColorPalette,{value:ve,onChange:function(e){return h({ctaBorderColor:e})},allowReset:!0}))):b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Text Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Te}}))),b.a.createElement(g.ColorPalette,{value:Te,onChange:function(e){return h({ctaLinkHoverColor:e})},allowReset:!0}),b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Background Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:de}}))),b.a.createElement(g.ColorPalette,{value:de,onChange:function(e){return h({ctaBgHoverColor:e})},allowReset:!0}),"none"!==pe&&b.a.createElement(b.a.Fragment,null,b.a.createElement("p",{className:"uagb-setting-label"},Object(r.__)("Border Hover Color","ultimate-addons-for-gutenberg"),b.a.createElement("span",{className:"components-base-control__label"},b.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ce}}))),b.a.createElement(g.ColorPalette,{value:Ce,onChange:function(e){return h({ctaBorderhoverColor:e})},allowReset:!0}))),b.a.createElement("div",null,t)}))),b.a.createElement(m.PanelBody,{title:Object(r.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},b.a.createElement(m.RangeControl,{label:Object(r.__)("Heading Bottom Margin","ultimate-addons-for-gutenberg"),value:K,onChange:function(e){return h({titleSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),b.a.createElement(m.RangeControl,{label:Object(r.__)("Description Bottom Margin","ultimate-addons-for-gutenberg"),value:Q,onChange:function(e){return h({descSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),"left"===v&&"right"===U&&b.a.createElement(m.RangeControl,{label:Object(r.__)("Content Left Margin","ultimate-addons-for-gutenberg"),value:je,onChange:function(e){return h({ctaLeftSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}),"right"===v&&"right"===U&&b.a.createElement(m.RangeControl,{label:Object(r.__)("Content Right Margin","ultimate-addons-for-gutenberg"),value:Se,onChange:function(e){return h({ctaRightSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0}))),t,a,n)};t.default=b.a.memo(h)}}]);