(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{379:function(e,t,a){"use strict";a.r(t);var l=a(1),n=a.n(l),o=a(3),i=a(0),r=a(14),c=a(4),u=a(9),b=a(5),g=a(6),s=Object(l.lazy)((function(){return Promise.resolve().then(a.bind(null,8))})),m=Object(l.lazy)((function(){return Promise.resolve().then(a.bind(null,10))})),d=Object(l.lazy)((function(){return Promise.resolve().then(a.t.bind(null,15,7))})),f=[{value:"thumbnail",label:Object(i.__)("Thumbnail","ultimate-addons-for-gutenberg")},{value:"medium",label:Object(i.__)("Medium","ultimate-addons-for-gutenberg")},{value:"full",label:Object(i.__)("Large","ultimate-addons-for-gutenberg")}],_=function(e){var t,a,_,p=e=e.parentProps,h=p.setAttributes,v=p.attributes,S=v.align,O=v.tag,j=v.titleColor,E=v.prefixColor,F=v.descColor,C=v.titleFontFamily,T=v.titleFontWeight,y=v.titleFontSubset,z=v.titleFontSizeType,L=v.titleFontSize,H=v.titleFontSizeMobile,x=v.titleFontSizeTablet,k=v.titleLineHeightType,M=v.titleLineHeight,I=v.titleLineHeightMobile,R=v.titleLineHeightTablet,w=v.prefixFontFamily,P=v.prefixFontWeight,N=v.prefixFontSubset,B=v.prefixFontSizeType,W=v.prefixFontSize,A=v.prefixFontSizeMobile,G=v.prefixFontSizeTablet,U=v.prefixLineHeightType,D=v.prefixLineHeight,q=v.prefixLineHeightMobile,J=v.prefixLineHeightTablet,V=v.descFontFamily,K=v.descFontWeight,Q=v.descFontSubset,X=v.descFontSizeType,Y=v.descFontSize,Z=v.descFontSizeMobile,$=v.descFontSizeTablet,ee=v.descLineHeightType,te=v.descLineHeight,ae=v.descLineHeightMobile,le=v.descLineHeightTablet,ne=v.socialFontSize,oe=v.socialFontSizeType,ie=v.socialFontSizeMobile,re=v.socialFontSizeTablet,ce=v.titleLoadGoogleFonts,ue=v.prefixLoadGoogleFonts,be=v.descLoadGoogleFonts,ge=v.image,se=v.imgStyle,me=v.imgAlign,de=v.imgSize,fe=v.imgWidth,_e=v.imgPosition,pe=v.titleSpace,he=v.descSpace,ve=v.prefixSpace,Se=v.imgLeftMargin,Oe=v.imgRightMargin,je=v.imgTopMargin,Ee=v.imgBottomMargin,Fe=v.twitterIcon,Ce=v.fbIcon,Te=v.linkedinIcon,ye=v.pinIcon,ze=v.twitterLink,Le=v.fbLink,He=v.linkedinLink,xe=v.pinLink,ke=v.socialColor,Me=v.socialHoverColor,Ie=v.socialSpace,Re=v.socialTarget,we=v.socialEnable,Pe=v.stack,Ne=function(e){var t=[];for(var a in e)t.push({value:a,label:a});return t},Be=Object.keys(r);if(ge&&ge.sizes&&(f=Ne(ge.sizes)),1==ce){var We={google:{families:[C+(T?":"+T:"")]}};t=n.a.createElement(m,{config:We})}if(1==ue){var Ae={google:{families:[w+(P?":"+P:"")]}};a=n.a.createElement(m,{config:Ae})}if(1==be){var Ge={google:{families:[V+(K?":"+K:"")]}};_=n.a.createElement(m,{config:Ge})}return n.a.createElement(n.a.Fragment,null,"above"==_e&&n.a.createElement(b.BlockControls,{key:"controls"},n.a.createElement(b.AlignmentToolbar,{value:S,onChange:function(e){return h({align:e})}})),n.a.createElement(b.InspectorControls,null,n.a.createElement(g.PanelBody,{title:Object(i.__)("Image")},n.a.createElement(g.BaseControl,{id:"team-settings",className:"editor-bg-image-control",label:Object(i.__)("Team Member Image","ultimate-addons-for-gutenberg")},n.a.createElement(b.MediaUpload,{title:Object(i.__)("Select Image","ultimate-addons-for-gutenberg"),onSelect:function(t){var a=e.setAttributes;if(t&&t.url){if(t.type&&"image"==t.type&&(a({image:t}),t.sizes)){var l=Ne(t.sizes);f=l}}else a({image:null})},allowedTypes:["image"],value:ge,render:function(e){var t=e.open;return n.a.createElement(g.Button,{isSecondary:!0,onClick:t},ge?Object(i.__)("Replace image","ultimate-addons-for-gutenberg"):Object(i.__)("Select Image","ultimate-addons-for-gutenberg"))}}),ge&&n.a.createElement(g.Button,{className:"uagb-rm-btn",onClick:function(){h({image:null})},isLink:!0,isDestructive:!0},Object(i.__)("Remove Image","ultimate-addons-for-gutenberg"))),ge&&n.a.createElement(g.SelectControl,{label:Object(i.__)("Position","ultimate-addons-for-gutenberg"),value:_e,onChange:function(e){return h({imgPosition:e})},options:[{value:"above",label:Object(i.__)("Above","ultimate-addons-for-gutenberg")},{value:"left",label:Object(i.__)("Left","ultimate-addons-for-gutenberg")},{value:"right",label:Object(i.__)("Right","ultimate-addons-for-gutenberg")}]}),"above"!=_e&&ge&&n.a.createElement(g.SelectControl,{label:Object(i.__)("Stack on","ultimate-addons-for-gutenberg"),value:Pe,options:[{value:"none",label:Object(i.__)("None","ultimate-addons-for-gutenberg")},{value:"tablet",label:Object(i.__)("Tablet","ultimate-addons-for-gutenberg")},{value:"mobile",label:Object(i.__)("Mobile","ultimate-addons-for-gutenberg")}],help:Object(i.__)("Note: Choose on what breakpoint the Team will stack."),onChange:function(e){return h({stack:e})}}),ge&&n.a.createElement(g.SelectControl,{label:Object(i.__)("Image Style","ultimate-addons-for-gutenberg"),value:se,onChange:function(e){return h({imgStyle:e})},options:[{value:"normal",label:Object(i.__)("Normal","ultimate-addons-for-gutenberg")},{value:"circle",label:Object(i.__)("Circle","ultimate-addons-for-gutenberg")},{value:"square",label:Object(i.__)("Square","ultimate-addons-for-gutenberg")}]}),_e&&"above"!==_e&&ge&&n.a.createElement(g.SelectControl,{label:Object(i.__)("Vertical Alignment","ultimate-addons-for-gutenberg"),value:me,onChange:function(e){return h({imgAlign:e})},options:[{value:"top",label:Object(i.__)("Top","ultimate-addons-for-gutenberg")},{value:"middle",label:Object(i.__)("Middle","ultimate-addons-for-gutenberg")}]}),ge&&n.a.createElement(n.a.Fragment,null,n.a.createElement(g.SelectControl,{label:Object(i.__)("Size","ultimate-addons-for-gutenberg"),options:f,value:de,onChange:function(e){return h({imgSize:e})}}),n.a.createElement(g.RangeControl,{label:Object(i.__)("Width","ultimate-addons-for-gutenberg"),value:fe,onChange:function(e){return h({imgWidth:e})},min:0,max:500,allowReset:!0}))),n.a.createElement(g.PanelBody,{title:Object(i.__)("Social Links","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement(g.ToggleControl,{label:Object(i.__)("Enable Social Links","ultimate-addons-for-gutenberg"),checked:we,onChange:function(){return h({socialEnable:!we})}}),we&&n.a.createElement(n.a.Fragment,null,n.a.createElement(g.ToggleControl,{label:Object(i.__)("Open Links in New Window","ultimate-addons-for-gutenberg"),checked:Re,onChange:function(){return h({socialTarget:!Re})}}),n.a.createElement(g.PanelBody,{title:Object(i.__)("Twitter","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("Icon","ultimate-addons-for-gutenberg")),n.a.createElement(d,{icons:Be,renderFunc:c.a,theme:"default",value:Fe,onChange:function(e){return h({twitterIcon:e})},isMulti:!1,noSelectedPlaceholder:Object(i.__)("Select Icon","ultimate-addons-for-gutenberg")}),n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("URL","ultimate-addons-for-gutenberg")),n.a.createElement(g.TextControl,{value:ze,onChange:function(e){return h({twitterLink:e})},placeholder:Object(i.__)("Enter Twitter URL","ultimate-addons-for-gutenberg")})),n.a.createElement(g.PanelBody,{title:Object(i.__)("Facebook","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("Icon","ultimate-addons-for-gutenberg")),n.a.createElement(d,{icons:Be,renderFunc:c.a,theme:"default",value:Ce,onChange:function(e){return h({fbIcon:e})},isMulti:!1,noSelectedPlaceholder:Object(i.__)("Select Icon","ultimate-addons-for-gutenberg")}),n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("URL","ultimate-addons-for-gutenberg")),n.a.createElement(g.TextControl,{value:Le,onChange:function(e){return h({fbLink:e})},placeholder:Object(i.__)("Enter Facebook URL","ultimate-addons-for-gutenberg")})),n.a.createElement(g.PanelBody,{title:Object(i.__)("LinkedIn","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("Icon","ultimate-addons-for-gutenberg")),n.a.createElement(d,{icons:Be,renderFunc:c.a,noSelectedPlaceholder:Object(i.__)("Select Icon","ultimate-addons-for-gutenberg"),theme:"default",value:Te,onChange:function(e){return h({linkedinIcon:e})},isMulti:!1}),n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("URL","ultimate-addons-for-gutenberg")),n.a.createElement(g.TextControl,{value:He,onChange:function(e){return h({linkedinLink:e})},placeholder:Object(i.__)("Enter LinkedIn URL","ultimate-addons-for-gutenberg")})),n.a.createElement(g.PanelBody,{title:Object(i.__)("Pinterest","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("Icon","ultimate-addons-for-gutenberg")),n.a.createElement(d,{icons:Be,renderFunc:c.a,noSelectedPlaceholder:Object(i.__)("Select Icon","ultimate-addons-for-gutenberg"),theme:"default",value:ye,onChange:function(e){return h({pinIcon:e})},isMulti:!1}),n.a.createElement("p",{className:"components-base-control__label"},Object(i.__)("URL","ultimate-addons-for-gutenberg")),n.a.createElement(g.TextControl,{value:xe,onChange:function(e){return h({pinLink:e})},placeholder:Object(i.__)("Enter Pinterest URL","ultimate-addons-for-gutenberg")})))),n.a.createElement(g.PanelBody,{title:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement(g.SelectControl,{label:Object(i.__)("Title Tag","ultimate-addons-for-gutenberg"),value:O,onChange:function(e){return h({tag:e})},options:[{value:"h1",label:Object(i.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(i.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(i.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(i.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(i.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(i.__)("H6","ultimate-addons-for-gutenberg")}]}),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("h2",null,Object(i.__)("Title","ultimate-addons-for-gutenberg")),n.a.createElement(l.Suspense,{fallback:Object(u.a)()},n.a.createElement(s,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:v,setAttributes:h,loadGoogleFonts:{value:ce,label:"titleLoadGoogleFonts"},fontFamily:{value:C,label:"titleFontFamily"},fontWeight:{value:T,label:"titleFontWeight"},fontSubset:{value:y,label:"titleFontSubset"},fontSizeType:{value:z,label:"titleFontSizeType"},fontSize:{value:L,label:"titleFontSize"},fontSizeMobile:{value:H,label:"titleFontSizeMobile"},fontSizeTablet:{value:x,label:"titleFontSizeTablet"},lineHeightType:{value:k,label:"titleLineHeightType"},lineHeight:{value:M,label:"titleLineHeight"},lineHeightMobile:{value:I,label:"titleLineHeightMobile"},lineHeightTablet:{value:R,label:"titleLineHeightTablet"}})),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("h2",null,Object(i.__)("Prefix","ultimate-addons-for-gutenberg")),n.a.createElement(l.Suspense,{fallback:Object(u.a)()},n.a.createElement(s,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:v,setAttributes:h,loadGoogleFonts:{value:ue,label:"prefixLoadGoogleFonts"},fontFamily:{value:w,label:"prefixFontFamily"},fontWeight:{value:P,label:"prefixFontWeight"},fontSubset:{value:N,label:"prefixFontSubset"},fontSizeType:{value:B,label:"prefixFontSizeType"},fontSize:{value:W,label:"prefixFontSize"},fontSizeMobile:{value:A,label:"prefixFontSizeMobile"},fontSizeTablet:{value:G,label:"prefixFontSizeTablet"},lineHeightType:{value:U,label:"prefixLineHeightType"},lineHeight:{value:D,label:"prefixLineHeight"},lineHeightMobile:{value:q,label:"prefixLineHeightMobile"},lineHeightTablet:{value:J,label:"prefixLineHeightTablet"}})),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("h2",null,Object(i.__)("Description","ultimate-addons-for-gutenberg")),n.a.createElement(l.Suspense,{fallback:Object(u.a)()},n.a.createElement(s,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:v,setAttributes:h,loadGoogleFonts:{value:be,label:"descLoadGoogleFonts"},fontFamily:{value:V,label:"descFontFamily"},fontWeight:{value:K,label:"descFontWeight"},fontSubset:{value:Q,label:"descFontSubset"},fontSizeType:{value:X,label:"descFontSizeType"},fontSize:{value:Y,label:"descFontSize"},fontSizeMobile:{value:Z,label:"descFontSizeMobile"},fontSizeTablet:{value:$,label:"descFontSizeTablet"},lineHeightType:{value:ee,label:"descLineHeightType"},lineHeight:{value:te,label:"descLineHeight"},lineHeightMobile:{value:ae,label:"descLineHeightMobile"},lineHeightTablet:{value:le,label:"descLineHeightTablet"}})),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("h2",null,Object(i.__)("Social Icons","ultimate-addons-for-gutenberg")),n.a.createElement(l.Suspense,{fallback:Object(u.a)()},n.a.createElement(s,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:v,setAttributes:h,fontSizeType:{value:oe,label:"socialFontSizeType"},fontSize:{value:ne,label:"socialFontSize"},fontSizeMobile:{value:ie,label:"socialFontSizeMobile"},fontSizeTablet:{value:re,label:"socialFontSizeTablet"},disableFontFamily:!0,disableLineHeight:!0}))),n.a.createElement(b.PanelColorSettings,{title:Object(i.__)("Color Settings","ultimate-addons-for-gutenberg"),initialOpen:!1,colorSettings:[{value:j,onChange:function(e){return h({titleColor:e})},label:Object(i.__)("Title Color","ultimate-addons-for-gutenberg")},{value:E,onChange:function(e){return h({prefixColor:e})},label:Object(i.__)("Designation Color","ultimate-addons-for-gutenberg")},{value:F,onChange:function(e){return h({descColor:e})},label:Object(i.__)("Description Color","ultimate-addons-for-gutenberg")},{value:ke,onChange:function(e){return h({socialColor:e})},label:Object(i.__)("Social Icon Color","ultimate-addons-for-gutenberg")},{value:Me,onChange:function(e){return h({socialHoverColor:e})},label:Object(i.__)("Social Icon Hover Color","ultimate-addons-for-gutenberg")}]}),n.a.createElement(g.PanelBody,{title:Object(i.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},n.a.createElement(g.RangeControl,{label:Object(i.__)("Title Bottom Spacing","ultimate-addons-for-gutenberg"),value:pe,onChange:function(e){return h({titleSpace:e})},min:0,max:50,allowReset:!0,initialPosition:0}),n.a.createElement(g.RangeControl,{label:Object(i.__)("Designation Bottom Spacing","ultimate-addons-for-gutenberg"),value:ve,onChange:function(e){return h({prefixSpace:e})},min:0,max:50,allowReset:!0,initialPosition:0}),n.a.createElement(g.RangeControl,{label:Object(i.__)("Description Bottom Spacing","ultimate-addons-for-gutenberg"),value:he,onChange:function(e){return h({descSpace:e})},min:0,max:50,allowReset:!0}),n.a.createElement(g.RangeControl,{label:Object(i.__)("Inter Social Icon Spacing","ultimate-addons-for-gutenberg"),value:Ie,onChange:function(e){return h({socialSpace:e})},min:0,max:50,allowReset:!0}),ge&&n.a.createElement(n.a.Fragment,null,n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("h2",null,Object(i.__)("Image Margin (px)","ultimate-addons-for-gutenberg")),"above"!=_e&&n.a.createElement(g.RangeControl,{label:o.a.left_margin,className:"uagb-margin-control",value:Se,onChange:function(e){return h({imgLeftMargin:e})},min:0,max:50,allowReset:!0}),"above"!=_e&&n.a.createElement(g.RangeControl,{label:o.a.right_margin,className:"uagb-margin-control",value:Oe,onChange:function(e){return h({imgRightMargin:e})},min:0,max:50,allowReset:!0}),n.a.createElement(g.RangeControl,{label:o.a.top_margin,className:"uagb-margin-control",value:je,onChange:function(e){return h({imgTopMargin:e})},min:0,max:50,allowReset:!0}),n.a.createElement(g.RangeControl,{label:o.a.bottom_margin,className:"uagb-margin-control",value:Ee,onChange:function(e){return h({imgBottomMargin:e})},min:0,max:50,allowReset:!0})))),n.a.createElement(l.Suspense,{fallback:Object(u.a)()},t,a,_))};t.default=n.a.memo(_)}}]);