(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{368:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t(3),o=t(4),r=t(14),i=t(1),c=t.n(i),s=t(8),u=t(9),m=t(261);function g(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,a){if(e){if("string"==typeof e)return b(e,void 0);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?b(e,void 0):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}var d=Object(i.lazy)((function(){return Promise.resolve().then(t.bind(null,5))})),p=Object(i.lazy)((function(){return Promise.resolve().then(t.t.bind(null,15,7))})),h=Object(i.lazy)((function(){return Promise.resolve().then(t.bind(null,10))})),f=Object(i.lazy)((function(){return Promise.resolve().then(t.bind(null,6))})),_=function(e){var a,t,b=e=e.parentProps,_=b.attributes,C=b.setAttributes,y=b.deviceType,E=_.align,T=_.disableBullets,v=_.makeCollapsible,k=_.initialCollapse,S=_.icon,O=_.iconColor,x=_.bulletColor,j=_.iconSize,z=_.smoothScroll,N=_.smoothScrollOffset,P=_.smoothScrollDelay,w=_.scrollToTop,R=_.scrollToTopColor,B=_.scrollToTopBgColor,M=_.customWidth,F=_.widthDesktop,D=_.widthTablet,H=_.widthMobile,G=_.widthTypeMobile,A=_.widthTypeTablet,L=_.widthTypeDesktop,W=_.tColumnsDesktop,I=_.tColumnsTablet,J=_.tColumnsMobile,K=_.backgroundColor,U=_.linkColor,$=_.linkHoverColor,q=_.headingColor,Q=_.vPaddingDesktop,V=_.vPaddingTablet,X=_.vPaddingMobile,Y=_.hPaddingDesktop,Z=_.hPaddingTablet,ee=_.hPaddingMobile,ae=_.paddingTypeMobile,te=_.paddingTypeTablet,ne=_.paddingTypeDesktop,le=_.vMarginDesktop,oe=_.vMarginTablet,re=_.vMarginMobile,ie=_.hMarginDesktop,ce=_.hMarginTablet,se=_.hMarginMobile,ue=_.marginTypeMobile,me=_.marginTypeTablet,ge=_.marginTypeDesktop,be=_.headingBottom,de=_.contentPaddingDesktop,pe=_.contentPaddingTablet,he=_.contentPaddingMobile,fe=_.contentPaddingTypeMobile,_e=_.contentPaddingTypeTablet,Ce=_.contentPaddingTypeDesktop,ye=_.borderStyle,Ee=_.borderWidth,Te=_.borderRadius,ve=_.borderColor,ke=_.loadGoogleFonts,Se=_.fontFamily,Oe=_.fontWeight,xe=_.fontSubset,je=_.fontSize,ze=_.fontSizeType,Ne=_.fontSizeTablet,Pe=_.fontSizeMobile,we=_.lineHeightType,Re=_.lineHeight,Be=_.lineHeightTablet,Me=_.lineHeightMobile,Fe=_.headingLoadGoogleFonts,De=_.headingFontFamily,He=_.headingFontWeight,Ge=_.headingFontSubset,Ae=_.headingFontSize,Le=_.headingFontSizeType,We=_.headingFontSizeTablet,Ie=_.headingFontSizeMobile,Je=_.headingLineHeightType,Ke=_.headingLineHeight,Ue=_.headingLineHeightTablet,$e=_.headingLineHeightMobile,qe=_.mappingHeaders,Qe=_.headingAlignment,Ve={icons:Object.keys(r),value:S,onChange:function(a){e.setAttributes({icon:a})},isMulti:!1,renderFunc:o.a,noSelectedPlaceholder:Object(n.__)("Select Icon","ultimate-addons-for-gutenberg")};if(1==ke){var Xe={google:{families:[Se+(Oe?":"+Oe:"")]}};a=c.a.createElement(f,{config:Xe})}if(1==Fe){var Ye={google:{families:[De+(He?":"+He:"")]}};t=c.a.createElement(f,{config:Ye})}return c.a.createElement(i.Suspense,{fallback:Object(s.a)()},c.a.createElement(u.BlockControls,null,c.a.createElement(u.BlockAlignmentToolbar,{value:E,onChange:function(e){C({align:e})},controls:["left","center","right"]})),c.a.createElement(u.InspectorControls,null,c.a.createElement(m.PanelBody,{title:Object(n.__)("General","ultimate-addons-for-gutenberg"),initialOpen:!0},c.a.createElement("h2",null,Object(n.__)("Select the heading to consider when generating the table","ultimate-addons-for-gutenberg")),qe.map((function(e,a){return c.a.createElement(m.PanelRow,{key:a},c.a.createElement("label",{htmlFor:"ub_toggle_h".concat(a+1)},"H".concat(a+1)),c.a.createElement(m.ToggleControl,{id:"ub_toggle_h".concat(a+1),checked:e,onChange:function(){return C({mappingHeaders:[].concat(g(qe.slice(0,a)),[!qe[a]],g(qe.slice(a+1)))})}}))}))),c.a.createElement(m.PanelBody,{title:Object(n.__)("Scroll","ultimate-addons-for-gutenberg"),initialOpen:!1},c.a.createElement(m.ToggleControl,{label:Object(n.__)("Smooth Scroll","ultimate-addons-for-gutenberg"),checked:z,help:Object(n.__)("This will be in Action only in Front End.","ultimate-addons-for-gutenberg"),onChange:function(){return C({smoothScroll:!z})}}),z&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.RangeControl,{label:Object(n.__)("Smooth Scroll Offset (px)","ultimate-addons-for-gutenberg"),value:N,onChange:function(e){return C({smoothScrollOffset:e})},min:0,max:1e3}),c.a.createElement(m.RangeControl,{label:Object(n.__)("Scroll Animation Delay (ms)","ultimate-addons-for-gutenberg"),value:P,onChange:function(e){return C({smoothScrollDelay:e})},min:100,max:5e3})),c.a.createElement("hr",{className:"uagb-editor__separator"}),c.a.createElement(m.ToggleControl,{label:Object(n.__)("Show Scroll To Top","ultimate-addons-for-gutenberg"),checked:w,help:Object(n.__)("This will add a Scroll to Top arrow at the bottom of page.","ultimate-addons-for-gutenberg"),onChange:function(){return C({scrollToTop:!w})}}),w&&c.a.createElement(c.a.Fragment,null,c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Icon Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:R}}))),c.a.createElement(u.ColorPalette,{value:R,onChange:function(e){return C({scrollToTopColor:e})},allowReset:!0}),c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Background Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:B}}))),c.a.createElement(u.ColorPalette,{value:B,onChange:function(e){return C({scrollToTopBgColor:e})},allowReset:!0}))),c.a.createElement(m.PanelBody,{title:Object(n.__)("Content","ultimate-addons-for-gutenberg"),initialOpen:!1},c.a.createElement("h2",null,Object(n.__)("Heading","ultimate-addons-for-gutenberg")),c.a.createElement(m.SelectControl,{label:Object(n.__)("Alignment","ultimate-addons-for-gutenberg"),value:Qe,onChange:function(e){return C({headingAlignment:e})},options:[{value:"left",label:Object(n.__)("Left","ultimate-addons-for-gutenberg")},{value:"center",label:Object(n.__)("Center","ultimate-addons-for-gutenberg")},{value:"right",label:Object(n.__)("Right","ultimate-addons-for-gutenberg")}]}),c.a.createElement(m.RangeControl,{label:Object(n.__)("Bottom Space","ultimate-addons-for-gutenberg"),value:be,onChange:function(e){return C({headingBottom:e})},min:0,max:50,allowReset:!0}),c.a.createElement(d,{label:Object(n.__)("Typography","ultimate-addons-for-gutenberg"),attributes:_,setAttributes:C,loadGoogleFonts:{value:Fe,label:"headingLoadGoogleFonts"},fontFamily:{value:De,label:"headingFontFamily"},fontWeight:{value:He,label:"headingFontWeight"},fontSubset:{value:Ge,label:"headingFontSubset"},fontSizeType:{value:Le,label:"headingFontSizeType"},fontSize:{value:Ae,label:"headingFontSize"},fontSizeMobile:{value:Ie,label:"headingFontSizeMobile"},fontSizeTablet:{value:We,label:"headingFontSizeTablet"},lineHeightType:{value:Je,label:"headingLineHeightType"},lineHeight:{value:Ke,label:"headingLineHeight"},lineHeightMobile:{value:$e,label:"headingLineHeightMobile"},lineHeightTablet:{value:Ue,label:"headingLineHeightTablet"}}),c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Heading Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:q}}))),c.a.createElement(u.ColorPalette,{value:q,onChange:function(e){return C({headingColor:e})},allowReset:!0}),c.a.createElement("hr",{className:"uagb-editor__separator"}),c.a.createElement("h2",null,Object(n.__)("Collapsible","ultimate-addons-for-gutenberg")),c.a.createElement(m.ToggleControl,{label:Object(n.__)("Make Content Collapsible","ultimate-addons-for-gutenberg"),checked:v,onChange:function(){return C({makeCollapsible:!v})}}),v&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ToggleControl,{label:Object(n.__)("Keep Collapsed Initially","ultimate-addons-for-gutenberg"),checked:k,onChange:function(){return C({initialCollapse:!k})}}),c.a.createElement(p,Ve),c.a.createElement(m.RangeControl,{label:Object(n.__)("Icon Size","ultimate-addons-for-gutenberg"),value:j,onChange:function(e){return C({iconSize:e})},min:0,max:300,beforeIcon:"",allowReset:!0}),c.a.createElement(u.ColorPalette,{value:O,onChange:function(e){return C({iconColor:e})},allowReset:!0})),c.a.createElement("hr",{className:"uagb-editor__separator"}),c.a.createElement("h2",null,Object(n.__)("Content","ultimate-addons-for-gutenberg")),c.a.createElement(m.ToggleControl,{label:Object(n.__)("Disable Bullet Points","ultimate-addons-for-gutenberg"),checked:T,onChange:function(){return C({disableBullets:!T})}}),!T&&c.a.createElement(c.a.Fragment,null,c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Bullet Points Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:x}}))),c.a.createElement(u.ColorPalette,{value:x,onChange:function(e){return C({bulletColor:e})},allowReset:!0})),c.a.createElement(h,null),"Desktop"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===Ce,"aria-pressed":"px"===Ce,onClick:function(){return C({contentPaddingTypeDesktop:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===Ce,"aria-pressed":"%"===Ce,onClick:function(){return C({contentPaddingTypeDesktop:"%"})}},"%")),c.a.createElement("h2",{className:"uagb-light-font-weight"},Object(n.__)("Gap Between Lists")),c.a.createElement(m.RangeControl,{className:"uagb-gap-control",value:de,onChange:function(e){return C({contentPaddingDesktop:e})},min:0,max:100,allowReset:!0})),"Tablet"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===_e,"aria-pressed":"px"===_e,onClick:function(){return C({contentPaddingTypeTablet:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===_e,"aria-pressed":"%"===_e,onClick:function(){return C({contentPaddingTypeTablet:"%"})}},"%")),c.a.createElement("h2",{className:"uagb-lighter-font-weight"},Object(n.__)("Gap Between Lists")),c.a.createElement(m.RangeControl,{className:"uagb-margin-control",value:pe,onChange:function(e){return C({contentPaddingTablet:e})},min:0,max:100,allowReset:!0})),"Mobile"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===fe,"aria-pressed":"px"===fe,onClick:function(){return C({contentPaddingTypeMobile:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===fe,"aria-pressed":"%"===fe,onClick:function(){return C({contentPaddingTypeMobile:"%"})}},"%")),c.a.createElement("h2",{className:"uagb-light-font-weight"},Object(n.__)("Gap Between Lists")),c.a.createElement(m.RangeControl,{className:"uagb-margin-control",value:he,onChange:function(e){return C({contentPaddingMobile:e})},min:0,max:100,allowReset:!0})),c.a.createElement(d,{label:Object(n.__)("Typography","ultimate-addons-for-gutenberg"),attributes:_,setAttributes:C,loadGoogleFonts:{value:ke,label:"loadGoogleFonts"},fontFamily:{value:Se,label:"fontFamily"},fontWeight:{value:Oe,label:"fontWeight"},fontSubset:{value:xe,label:"fontSubset"},fontSizeType:{value:ze,label:"fontSizeType"},fontSize:{value:je,label:"fontSize"},fontSizeMobile:{value:Pe,label:"fontSizeMobile"},fontSizeTablet:{value:Ne,label:"fontSizeTablet"},lineHeightType:{value:we,label:"lineHeightType"},lineHeight:{value:Re,label:"lineHeight"},lineHeightMobile:{value:Me,label:"lineHeightMobile"},lineHeightTablet:{value:Be,label:"lineHeightTablet"}}),c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Content Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:U}}))),c.a.createElement(u.ColorPalette,{value:U,onChange:function(e){return C({linkColor:e})},allowReset:!0}),c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Content Hover Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:$}}))),c.a.createElement(u.ColorPalette,{value:$,onChange:function(e){return C({linkHoverColor:e})},allowReset:!0})),c.a.createElement(m.PanelBody,{title:Object(n.__)("Style","ultimate-addons-for-gutenberg"),initialOpen:!1},c.a.createElement("h2",null,Object(n.__)("Background","ultimate-addons-for-gutenberg")),c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Background Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:K}}))),c.a.createElement(u.ColorPalette,{value:K,onChange:function(e){return C({backgroundColor:e})},allowReset:!0}),c.a.createElement("hr",{className:"uagb-editor__separator"}),c.a.createElement(m.ToggleControl,{label:Object(n.__)("Custom Width","ultimate-addons-for-gutenberg"),checked:M,onChange:function(){return C({customWidth:!M})},help:Object(n.__)("Table's width will be auto if this is kept off.","ultimate-addons-for-gutenberg")}),M&&c.a.createElement(h,null),"Desktop"===y&&M&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===L,"aria-pressed":"px"===L,onClick:function(){return C({widthTypeDesktop:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===L,"aria-pressed":"%"===L,onClick:function(){return C({widthTypeDesktop:"%"})}},"%")),c.a.createElement(m.RangeControl,{label:Object(n.__)("Width"),value:F,onChange:function(e){return C({widthDesktop:e})},min:0,max:"%"==L?100:1e3,beforeIcon:"",allowReset:!0})),"Tablet"===y&&M&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===A,"aria-pressed":"px"===A,onClick:function(){return C({widthTypeTablet:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===A,"aria-pressed":"%"===A,onClick:function(){return C({widthTypeTablet:"%"})}},"%")),c.a.createElement(m.RangeControl,{label:Object(n.__)("Width"),value:D,onChange:function(e){return C({widthTablet:e})},min:0,max:"%"==A?100:1e3,beforeIcon:"",allowReset:!0})),"Mobile"===y&&M&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===G,"aria-pressed":"px"===G,onClick:function(){return C({widthTypeMobile:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===G,"aria-pressed":"%"===G,onClick:function(){return C({widthTypeMobile:"%"})}},"%")),c.a.createElement(m.RangeControl,{label:Object(n.__)("Width"),value:H,onChange:function(e){return C({widthMobile:e})},min:0,max:"%"==G?100:1e3,beforeIcon:"",allowReset:!0})),c.a.createElement(h,null),"Desktop"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.RangeControl,{label:Object(n.__)("Columns"),value:W,onChange:function(e){return C({tColumnsDesktop:e})},min:1,max:10})),"Tablet"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.RangeControl,{label:Object(n.__)("Columns"),value:I,onChange:function(e){return C({tColumnsTablet:e})},min:1,max:10})),"Mobile"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.RangeControl,{label:Object(n.__)("Columns"),value:J,onChange:function(e){return C({tColumnsMobile:e})},min:1,max:10})),c.a.createElement("hr",{className:"uagb-editor__separator"}),c.a.createElement(h,null),"Desktop"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ne,"aria-pressed":"px"===ne,onClick:function(){return C({paddingTypeDesktop:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ne,"aria-pressed":"%"===ne,onClick:function(){return C({paddingTypeDesktop:"%"})}},"%")),c.a.createElement("h2",null,Object(n.__)("Padding")),c.a.createElement(m.RangeControl,{label:l.a.vertical_spacing,className:"uagb-margin-control",value:Q,onChange:function(e){return C({vPaddingDesktop:e})},min:0,max:100,allowReset:!0}),c.a.createElement(m.RangeControl,{label:l.a.horizontal_spacing,className:"uagb-margin-control",value:Y,onChange:function(e){return C({hPaddingDesktop:e})},min:0,max:100,allowReset:!0})),"Tablet"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===te,"aria-pressed":"px"===te,onClick:function(){return C({paddingTypeTablet:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===te,"aria-pressed":"%"===te,onClick:function(){return C({paddingTypeTablet:"%"})}},"%")),c.a.createElement("h2",null,Object(n.__)("Padding")),c.a.createElement(m.RangeControl,{label:l.a.vertical_spacing,className:"uagb-margin-control",value:V,onChange:function(e){return C({vPaddingTablet:e})},min:0,max:100,allowReset:!0}),c.a.createElement(m.RangeControl,{label:l.a.horizontal_spacing,className:"uagb-margin-control",value:Z,onChange:function(e){return C({hPaddingTablet:e})},min:0,max:100,allowReset:!0})),"Mobile"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ae,"aria-pressed":"px"===ae,onClick:function(){return C({paddingTypeMobile:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ae,"aria-pressed":"%"===ae,onClick:function(){return C({paddingTypeMobile:"%"})}},"%")),c.a.createElement("h2",null,Object(n.__)("Padding")),c.a.createElement(m.RangeControl,{label:l.a.vertical_spacing,className:"uagb-margin-control",value:X,onChange:function(e){return C({vPaddingMobile:e})},min:0,max:100,allowReset:!0}),c.a.createElement(m.RangeControl,{label:l.a.horizontal_spacing,className:"uagb-margin-control",value:ee,onChange:function(e){return C({hPaddingMobile:e})},min:0,max:100,allowReset:!0})),c.a.createElement(h,null),"Desktop"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ge,"aria-pressed":"px"===ge,onClick:function(){return C({marginTypeDesktop:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ge,"aria-pressed":"%"===ge,onClick:function(){return C({marginTypeDesktop:"%"})}},"%")),c.a.createElement("h2",null,Object(n.__)("List Margin")),c.a.createElement(m.RangeControl,{label:l.a.vertical_spacing,className:"uagb-margin-control",value:le,onChange:function(e){return C({vMarginDesktop:e})},min:0,max:100,allowReset:!0}),c.a.createElement(m.RangeControl,{label:l.a.horizontal_spacing,className:"uagb-margin-control",value:ie,onChange:function(e){return C({hMarginDesktop:e})},min:0,max:100,allowReset:!0})),"Tablet"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===me,"aria-pressed":"px"===me,onClick:function(){return C({marginTypeTablet:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===me,"aria-pressed":"%"===me,onClick:function(){return C({marginTypeTablet:"%"})}},"%")),c.a.createElement("h2",null,Object(n.__)("List Margin")),c.a.createElement(m.RangeControl,{label:l.a.vertical_spacing,className:"uagb-margin-control",value:oe,onChange:function(e){return C({vMarginTablet:e})},min:0,max:100,allowReset:!0}),c.a.createElement(m.RangeControl,{label:l.a.horizontal_spacing,className:"uagb-margin-control",value:ce,onChange:function(e){return C({hMarginTablet:e})},min:0,max:100,allowReset:!0})),"Mobile"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(n.__)("Size Type")},c.a.createElement(m.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ue,"aria-pressed":"px"===ue,onClick:function(){return C({marginTypeMobile:"px"})}},"px"),c.a.createElement(m.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ue,"aria-pressed":"%"===ue,onClick:function(){return C({marginTypeMobile:"%"})}},"%")),c.a.createElement("h2",null,Object(n.__)("List Margin")),c.a.createElement(m.RangeControl,{label:l.a.vertical_spacing,className:"uagb-margin-control",value:re,onChange:function(e){return C({vMarginMobile:e})},min:0,max:100,allowReset:!0}),c.a.createElement(m.RangeControl,{label:l.a.horizontal_spacing,className:"uagb-margin-control",value:se,onChange:function(e){return C({hMarginMobile:e})},min:0,max:100,allowReset:!0})),c.a.createElement("hr",{className:"uagb-editor__separator"}),c.a.createElement("h2",null,Object(n.__)("Border","ultimate-addons-for-gutenberg")),c.a.createElement(m.SelectControl,{label:Object(n.__)("Border Style","ultimate-addons-for-gutenberg"),value:ye,onChange:function(e){return C({borderStyle:e})},options:[{value:"none",label:Object(n.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(n.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(n.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(n.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(n.__)("Double","ultimate-addons-for-gutenberg")},{value:"groove",label:Object(n.__)("Groove","ultimate-addons-for-gutenberg")},{value:"inset",label:Object(n.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(n.__)("Outset","ultimate-addons-for-gutenberg")},{value:"ridge",label:Object(n.__)("Ridge","ultimate-addons-for-gutenberg")}]}),"none"!=ye&&c.a.createElement(m.RangeControl,{label:Object(n.__)("Border Width","ultimate-addons-for-gutenberg"),value:Ee,onChange:function(e){return C({borderWidth:e})},min:0,max:50,allowReset:!0}),c.a.createElement(m.RangeControl,{label:Object(n.__)("Border Radius","ultimate-addons-for-gutenberg"),value:Te,onChange:function(e){return C({borderRadius:e})},min:0,max:1e3,allowReset:!0}),"none"!=ye&&c.a.createElement(c.a.Fragment,null,c.a.createElement("p",{className:"uagb-setting-label"},Object(n.__)("Border Color","ultimate-addons-for-gutenberg"),c.a.createElement("span",{className:"components-base-control__label"},c.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:ve}}))),c.a.createElement(u.ColorPalette,{value:ve,onChange:function(e){return C({borderColor:e})},allowReset:!0})))),a,t)};a.default=c.a.memo(_)}}]);