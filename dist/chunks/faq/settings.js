(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{421:function(e,a,t){"use strict";t.r(a);var n=t(32),l=t(12),o=t(57),r=t.n(o),i=t(6),s=t(2),u=t.n(s),c=t(8),m=t(1),g=t(11),b=t(4),d=t(5),p=Object(s.lazy)((function(){return Promise.resolve().then(t.bind(null,29))})),f=Object(s.lazy)((function(){return Promise.resolve().then(t.bind(null,17))})),_=Object(s.lazy)((function(){return Promise.resolve().then(t.bind(null,15))})),h=Object.keys(n),E=function(e){var a,t,n=e=e.parentProps,o=n.attributes,E=n.setAttributes,C=n.deviceType,y=o.layout,v=o.inactiveOtherItems,k=o.expandFirstItem,T=o.enableSchemaSupport,P=o.rowsGap,S=o.columnsGap,w=o.align,x=o.enableSeparator,O=o.boxBgColor,z=o.borderStyle,j=o.borderWidth,N=o.borderRadius,R=o.borderColor,q=o.questionTextColor,F=o.questionTextActiveColor,B=o.questionPaddingTypeDesktop,D=o.answerTextColor,H=o.answerPaddingTypeDesktop,M=o.vanswerPaddingMobile,L=o.vanswerPaddingTablet,G=o.vanswerPaddingDesktop,A=o.hanswerPaddingMobile,I=o.hanswerPaddingTablet,W=o.hanswerPaddingDesktop,Q=o.iconColor,J=o.iconActiveColor,U=o.gapBtwIconQUestion,K=o.questionloadGoogleFonts,V=o.questionFontFamily,X=o.questionFontWeight,Y=o.questionFontSubset,Z=o.questionFontSizeType,$=o.questionFontSize,ee=o.questionFontSizeMobile,ae=o.questionFontSizeTablet,te=o.questionLineHeightType,ne=o.questionLineHeight,le=o.questionLineHeightMobile,oe=o.questionLineHeightTablet,re=o.answerloadGoogleFonts,ie=o.answerFontFamily,se=o.answerFontWeight,ue=o.answerFontSubset,ce=o.answerFontSizeType,me=o.answerFontSize,ge=o.answerFontSizeMobile,be=o.answerFontSizeTablet,de=o.answerLineHeightType,pe=o.answerLineHeight,fe=o.answerLineHeightMobile,_e=o.answerLineHeightTablet,he=o.icon,Ee=o.iconActive,Ce=o.iconAlign,ye=o.iconSizeType,ve=o.iconSizeMobile,ke=o.iconSizeTablet,Te=o.iconSize,Pe=o.columns,Se=o.tcolumns,we=o.mcolumns,xe=o.enableToggle,Oe=o.equalHeight,ze=o.questionLeftPaddingTablet,je=o.hquestionPaddingTablet,Ne=o.vquestionPaddingTablet,Re=o.questionBottomPaddingTablet,qe=o.questionLeftPaddingDesktop,Fe=o.hquestionPaddingDesktop,Be=o.vquestionPaddingDesktop,De=o.questionBottomPaddingDesktop,He=o.questionLeftPaddingMobile,Me=o.hquestionPaddingMobile,Le=o.vquestionPaddingMobile,Ge=o.questionBottomPaddingMobile,Ae=o.headingTag;if(1==K){var Ie={google:{families:[V+(X?":"+X:"")]}};a=u.a.createElement(f,{config:Ie})}if(1==re){var We={google:{families:[ie+(se?":"+se:"")]}};t=u.a.createElement(f,{config:We})}return u.a.createElement(s.Suspense,{fallback:Object(c.a)()},u.a.createElement(b.InspectorControls,null,u.a.createElement(d.PanelBody,{title:Object(m.__)("General","ultimate-addons-for-gutenberg"),initialOpen:!0,className:"uagb__url-panel-body"},u.a.createElement(d.SelectControl,{label:Object(m.__)("Layout","ultimate-addons-for-gutenberg"),value:y,options:[{value:"accordion",label:Object(m.__)("Accordion","ultimate-addons-for-gutenberg")},{value:"grid",label:Object(m.__)("Grid","ultimate-addons-for-gutenberg")}],onChange:function(a){return function(a){var t=e.setAttributes;Object(g.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,t){e.attributes.layout=a})),t({layout:a})}(a)}}),"accordion"===y&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ToggleControl,{label:Object(m.__)("Collapse other items","ultimate-addons-for-gutenberg"),checked:v,onChange:function(e){return E({inactiveOtherItems:!v})}}),!0===v&&u.a.createElement(d.ToggleControl,{label:Object(m.__)("Expand First Item","ultimate-addons-for-gutenberg"),checked:k,onChange:function(e){return E({expandFirstItem:!k})}}),u.a.createElement(d.ToggleControl,{label:Object(m.__)("Enable Toggle","ultimate-addons-for-gutenberg"),checked:xe,onChange:function(e){return E({enableToggle:!xe})}})),u.a.createElement(d.ToggleControl,{label:Object(m.__)("Enable Schema Support","ultimate-addons-for-gutenberg"),checked:T,onChange:function(e){return E({enableSchemaSupport:!T})}}),u.a.createElement("hr",{className:"uagb-editor__separator"}),"grid"===y&&u.a.createElement(d.TabPanel,{className:"uagb-size-type-field-tabs uagb-without-size-type",activeClass:"active-tab",tabs:[{name:"desktop",title:u.a.createElement(d.Dashicon,{icon:"desktop"}),className:"uagb-desktop-tab uagb-responsive-tabs"},{name:"tablet",title:u.a.createElement(d.Dashicon,{icon:"tablet"}),className:"uagb-tablet-tab uagb-responsive-tabs"},{name:"mobile",title:u.a.createElement(d.Dashicon,{icon:"smartphone"}),className:"uagb-mobile-tab uagb-responsive-tabs"}]},(function(e){var a;return a="mobile"===e.name?u.a.createElement(d.RangeControl,{label:Object(m.__)("Mobile Columns","ultimate-addons-for-gutenberg"),value:we,onChange:function(e){return E({mcolumns:e})},min:1,max:2}):"tablet"===e.name?u.a.createElement(d.RangeControl,{label:Object(m.__)("Tab Columns","ultimate-addons-for-gutenberg"),value:Se,onChange:function(e){return E({tcolumns:e})},min:1,max:4}):u.a.createElement(d.RangeControl,{label:Object(m.__)("Desktop Columns","ultimate-addons-for-gutenberg"),value:Pe,onChange:function(e){return E({columns:e})},min:1,max:6}),u.a.createElement("div",null,a)})),"grid"===y&&u.a.createElement(u.a.Fragment,null,u.a.createElement("h2",null," ",Object(m.__)("Alignment","ultimate-addons-for-gutenberg")),u.a.createElement(d.Button,{key:"left",icon:"editor-alignleft",label:"Left",onClick:function(){return E({align:"left"})},"aria-pressed":"left"===w,isPrimary:"left"===w}),u.a.createElement(d.Button,{key:"center",icon:"editor-aligncenter",label:"Right",onClick:function(){return E({align:"center"})},"aria-pressed":"center"===w,isPrimary:"center"===w}),u.a.createElement(d.Button,{key:"right",icon:"editor-alignright",label:"Right",onClick:function(){return E({align:"right"})},"aria-pressed":"right"===w,isPrimary:"right"===w})),"accordion"===y&&u.a.createElement(u.a.Fragment,null,u.a.createElement("h2",null," ",Object(m.__)("Icon","ultimate-addons-for-gutenberg")," "),u.a.createElement("p",{className:"components-base-control__label"},Object(m.__)("Expand","ultimate-addons-for-gutenberg")),u.a.createElement(r.a,{icons:h,renderFunc:l.a,theme:"default",value:he,onChange:function(a){return function(a){var t=e.setAttributes;Object(g.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,t){e.attributes.icon=a})),t({icon:a})}(a)},isMulti:!1,noSelectedPlaceholder:Object(m.__)("Select Icon","ultimate-addons-for-gutenberg")}),u.a.createElement("p",{className:"components-base-control__label"},Object(m.__)("Collapse","ultimate-addons-for-gutenberg")),u.a.createElement(r.a,{icons:h,renderFunc:l.a,theme:"default",value:Ee,onChange:function(a){return function(a){var t=e.setAttributes;Object(g.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,t){e.attributes.iconActive=a})),t({iconActive:a})}(a)},isMulti:!1,noSelectedPlaceholder:Object(m.__)("Select Icon","ultimate-addons-for-gutenberg")}),u.a.createElement("h2",null," ",Object(m.__)("Icon Alignment","ultimate-addons-for-gutenberg")),u.a.createElement(d.Button,{key:"row",icon:"editor-alignleft",label:"Left",onClick:function(){return E({iconAlign:"row"})},"aria-pressed":"row"===Ce,isPrimary:"row"===Ce}),u.a.createElement(d.Button,{key:"row-reverse",icon:"editor-alignright",label:"Right",onClick:function(){return E({iconAlign:"row-reverse"})},"aria-pressed":"row-reverse"===Ce,isPrimary:"row-reverse"===Ce}))),u.a.createElement(d.PanelBody,{title:Object(m.__)("Style","ultimate-addons-for-gutenberg"),initialOpen:!1,className:"uagb__url-panel-body"},u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Background Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:O}}))),u.a.createElement(b.ColorPalette,{value:O,onChange:function(e){return E({boxBgColor:e})},allowReset:!0}),u.a.createElement(d.RangeControl,{label:Object(m.__)("Rows Gap (px)","ultimate-addons-for-gutenberg"),value:P,onChange:function(e){return E({rowsGap:e})},min:0,max:50}),"grid"===y&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.RangeControl,{label:Object(m.__)("Columns Gap (px)","ultimate-addons-for-gutenberg"),value:S,onChange:function(e){return E({columnsGap:e})},min:0,max:50}),u.a.createElement(d.ToggleControl,{label:Object(m.__)("Equal Height","ultimate-addons-for-gutenberg"),checked:Oe,onChange:function(e){return E({equalHeight:!Oe})}})),u.a.createElement(d.ToggleControl,{label:Object(m.__)("Enable Separator","ultimate-addons-for-gutenberg"),checked:x,onChange:function(e){return E({enableSeparator:!x})}}),u.a.createElement("hr",{className:"uagb-editor__separator"}),u.a.createElement("h2",null,Object(m.__)("Border","ultimate-addons-for-gutenberg")),u.a.createElement(d.SelectControl,{label:Object(m.__)("Style","ultimate-addons-for-gutenberg"),value:z,options:[{value:"none",label:Object(m.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(m.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(m.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(m.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(m.__)("Double","ultimate-addons-for-gutenberg")}],onChange:function(e){E({borderStyle:e})}}),"none"!==z&&u.a.createElement(d.RangeControl,{label:Object(m.__)("Thickness (px)","ultimate-addons-for-gutenberg"),value:j,onChange:function(e){E({borderWidth:e})},min:0,max:20}),"none"!==z&&u.a.createElement(d.RangeControl,{label:Object(m.__)("Rounded Corners (px)","ultimate-addons-for-gutenberg"),value:N,onChange:function(e){E({borderRadius:e})},min:0,max:50}),u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:R}}))),u.a.createElement(b.ColorPalette,{value:R,onChange:function(e){return E({borderColor:e})},allowReset:!0}),"accordion"===y&&u.a.createElement(u.a.Fragment,null,u.a.createElement("hr",{className:"uagb-editor__separator"}),u.a.createElement("h2",null,Object(m.__)("Icon","ultimate-addons-for-gutenberg")),u.a.createElement(p,null),"Desktop"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ye,"aria-pressed":"px"===ye,onClick:function(){return E({iconSizeType:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ye,"aria-pressed":"%"===ye,onClick:function(){return E({iconSizeType:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Size")),u.a.createElement(d.RangeControl,{value:Te,onChange:function(e){return E({iconSize:e})},min:0,max:100,allowReset:!0})),"Tablet"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ye,"aria-pressed":"px"===ye,onClick:function(){return E({iconSizeType:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ye,"aria-pressed":"%"===ye,onClick:function(){return E({iconSizeType:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Size")),u.a.createElement(d.RangeControl,{value:ke,onChange:function(e){return E({iconSizeTablet:e})},min:0,max:100,allowReset:!0})),"Mobile"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ye,"aria-pressed":"px"===ye,onClick:function(){return E({iconSizeType:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ye,"aria-pressed":"%"===ye,onClick:function(){return E({iconSizeType:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Size")),u.a.createElement(d.RangeControl,{value:ve,onChange:function(e){return E({iconSizeMobile:e})},min:0,max:100,allowReset:!0})),u.a.createElement(d.RangeControl,{label:Object(m.__)("Gap between Icon and Question","ultimate-addons-for-gutenberg"),value:U,onChange:function(e){return E({gapBtwIconQUestion:e})},min:0,max:100}),u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Expand Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Q}}))),u.a.createElement(b.ColorPalette,{value:Q,onChange:function(e){return E({iconColor:e})},allowReset:!0}),u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Collapse Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:J}}))),u.a.createElement(b.ColorPalette,{value:J,onChange:function(e){return E({iconActiveColor:e})},allowReset:!0}))),u.a.createElement(d.PanelBody,{title:Object(m.__)("Question","ultimate-addons-for-gutenberg"),initialOpen:!1,className:"uagb__url-panel-body"},u.a.createElement(d.SelectControl,{label:Object(m.__)("Question Tag","ultimate-addons-for-gutenberg"),value:Ae,onChange:function(a){return function(a){var t=e.setAttributes;Object(g.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,t){e.attributes.headingTag=a})),t({headingTag:a})}(a)},options:[{value:"span",label:Object(m.__)("Span","ultimate-addons-for-gutenberg")},{value:"p",label:Object(m.__)("P","ultimate-addons-for-gutenberg")},{value:"h1",label:Object(m.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(m.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(m.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(m.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(m.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(m.__)("H6","ultimate-addons-for-gutenberg")}]}),u.a.createElement(_,{label:Object(m.__)("Typography","ultimate-addons-for-gutenberg"),attributes:o,setAttributes:E,loadGoogleFonts:{value:K,label:"questionloadGoogleFonts"},fontFamily:{value:V,label:"questionFontFamily"},fontWeight:{value:X,label:"questionFontWeight"},fontSubset:{value:Y,label:"questionFontSubset"},fontSizeType:{value:Z,label:"questionFontSizeType"},fontSize:{value:$,label:"questionFontSize"},fontSizeMobile:{value:ee,label:"questionFontSizeMobile"},fontSizeTablet:{value:ae,label:"questionFontSizeTablet"},lineHeightType:{value:te,label:"questionLineHeightType"},lineHeight:{value:ne,label:"questionLineHeight"},lineHeightMobile:{value:le,label:"questionLineHeightMobile"},lineHeightTablet:{value:oe,label:"questionLineHeightTablet"}}),u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Text Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:q}}))),u.a.createElement(b.ColorPalette,{value:q,onChange:function(e){return E({questionTextColor:e})},allowReset:!0}),u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Text Active/Hover Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:F}}))),u.a.createElement(b.ColorPalette,{value:F,onChange:function(e){return E({questionTextActiveColor:e})},allowReset:!0}),u.a.createElement(p,null),"Desktop"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type","ultimate-addons-for-gutenberg")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===B,"aria-pressed":"px"===B,onClick:function(){return E({questionPaddingTypeDesktop:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===B,"aria-pressed":"%"===B,onClick:function(){return E({questionPaddingTypeDesktop:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Padding")),u.a.createElement(d.RangeControl,{label:i.a.left_margin,className:"uagb-margin-control",value:qe,onChange:function(e){return E({questionLeftPaddingDesktop:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.right_margin,className:"uagb-margin-control",value:Fe,onChange:function(e){return E({hquestionPaddingDesktop:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.top_margin,className:"uagb-margin-control",value:Be,onChange:function(e){return E({vquestionPaddingDesktop:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.bottom_margin,className:"uagb-margin-control",value:De,onChange:function(e){return E({questionBottomPaddingDesktop:e})},min:0,max:50,allowReset:!0})),"Tablet"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type","ultimate-addons-for-gutenberg")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===B,"aria-pressed":"px"===B,onClick:function(){return E({questionPaddingTypeDesktop:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===B,"aria-pressed":"%"===B,onClick:function(){return E({questionPaddingTypeDesktop:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Padding","ultimate-addons-for-gutenberg")),u.a.createElement(d.RangeControl,{label:i.a.left_margin,className:"uagb-margin-control",value:ze,onChange:function(e){return E({questionLeftPaddingTablet:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.right_margin,className:"uagb-margin-control",value:je,onChange:function(e){return E({hquestionPaddingTablet:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.top_margin,className:"uagb-margin-control",value:Ne,onChange:function(e){return E({vquestionPaddingTablet:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.bottom_margin,className:"uagb-margin-control",value:Re,onChange:function(e){return E({questionBottomPaddingTablet:e})},min:0,max:50,allowReset:!0})),"Mobile"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type","ultimate-addons-for-gutenberg")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===B,"aria-pressed":"px"===B,onClick:function(){return E({questionPaddingTypeDesktop:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===B,"aria-pressed":"%"===B,onClick:function(){return E({questionPaddingTypeDesktop:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Padding","ultimate-addons-for-gutenberg")),u.a.createElement(d.RangeControl,{label:i.a.left_margin,className:"uagb-margin-control",value:He,onChange:function(e){return E({questionLeftPaddingMobile:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.right_margin,className:"uagb-margin-control",value:Me,onChange:function(e){return E({hquestionPaddingMobile:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.top_margin,className:"uagb-margin-control",value:Le,onChange:function(e){return E({vquestionPaddingMobile:e})},min:0,max:50,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.bottom_margin,className:"uagb-margin-control",value:Ge,onChange:function(e){return E({questionBottomPaddingMobile:e})},min:0,max:50,allowReset:!0}))),u.a.createElement(d.PanelBody,{title:Object(m.__)("Answer","ultimate-addons-for-gutenberg"),initialOpen:!1,className:"uagb__url-panel-body"},u.a.createElement(_,{label:Object(m.__)("Typography","ultimate-addons-for-gutenberg"),attributes:o,setAttributes:E,loadGoogleFonts:{value:re,label:"answerloadGoogleFonts"},fontFamily:{value:ie,label:"answerFontFamily"},fontWeight:{value:se,label:"answerFontWeight"},fontSubset:{value:ue,label:"answerFontSubset"},fontSizeType:{value:ce,label:"answerFontSizeType"},fontSize:{value:me,label:"answerFontSize"},fontSizeMobile:{value:ge,label:"answerFontSizeMobile"},fontSizeTablet:{value:be,label:"answerFontSizeTablet"},lineHeightType:{value:de,label:"answerLineHeightType"},lineHeight:{value:pe,label:"answerLineHeight"},lineHeightMobile:{value:fe,label:"answerLineHeightMobile"},lineHeightTablet:{value:_e,label:"answerLineHeightTablet"}}),u.a.createElement("p",{className:"uagb-setting-label"},Object(m.__)("Text Color","ultimate-addons-for-gutenberg"),u.a.createElement("span",{className:"components-base-control__label"},u.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:D}}))),u.a.createElement(b.ColorPalette,{value:D,onChange:function(e){return E({answerTextColor:e})},allowReset:!0}),u.a.createElement(p,null),"Desktop"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type","ultimate-addons-for-gutenberg")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===H,"aria-pressed":"px"===H,onClick:function(){return E({answerPaddingTypeDesktop:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===H,"aria-pressed":"%"===H,onClick:function(){return E({answerPaddingTypeDesktop:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Padding","ultimate-addons-for-gutenberg")),u.a.createElement(d.RangeControl,{label:i.a.vertical_spacing,className:"uagb-margin-control",value:G,onChange:function(e){return E({vanswerPaddingDesktop:e})},min:0,max:100,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.horizontal_spacing,className:"uagb-margin-control",value:W,onChange:function(e){return E({hanswerPaddingDesktop:e})},min:0,max:100,allowReset:!0})),"Tablet"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type","ultimate-addons-for-gutenberg")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===H,"aria-pressed":"px"===H,onClick:function(){return E({answerPaddingTypeDesktop:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===H,"aria-pressed":"%"===H,onClick:function(){return E({answerPaddingTypeDesktop:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Padding","ultimate-addons-for-gutenberg")),u.a.createElement(d.RangeControl,{label:i.a.vertical_spacing,className:"uagb-margin-control",value:L,onChange:function(e){return E({vanswerPaddingTablet:e})},min:0,max:100,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.horizontal_spacing,className:"uagb-margin-control",value:I,onChange:function(e){return E({hanswerPaddingTablet:e})},min:0,max:100,allowReset:!0})),"Mobile"===C&&u.a.createElement(u.a.Fragment,null,u.a.createElement(d.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(m.__)("Size Type","ultimate-addons-for-gutenberg")},u.a.createElement(d.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===H,"aria-pressed":"px"===H,onClick:function(){return E({answerPaddingTypeDesktop:"px"})}},"px"),u.a.createElement(d.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===H,"aria-pressed":"%"===H,onClick:function(){return E({answerPaddingTypeDesktop:"%"})}},"%")),u.a.createElement("h2",null,Object(m.__)("Padding","ultimate-addons-for-gutenberg")),u.a.createElement(d.RangeControl,{label:i.a.vertical_spacing,className:"uagb-margin-control",value:M,onChange:function(e){return E({vanswerPaddingMobile:e})},min:0,max:100,allowReset:!0}),u.a.createElement(d.RangeControl,{label:i.a.horizontal_spacing,className:"uagb-margin-control",value:A,onChange:function(e){return E({hanswerPaddingMobile:e})},min:0,max:100,allowReset:!0})))),a,t)};a.default=u.a.memo(E)}}]);