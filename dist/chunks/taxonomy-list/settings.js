(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{211:function(e,t,a){"use strict";var l=a(0);function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?c(e):t}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=wp.blockEditor.ColorPalette,m=wp.components,g=m.Button,d=m.SelectControl,f=m.RangeControl,p=m.Dashicon,_=wp.element,h=_.Component,v=_.Fragment,y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(h,e);var t,a,n,m,_=(n=h,m=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(n);if(m){var a=s(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return u(this,e)});function h(){var e;return o(this,h),(e=_.apply(this,arguments)).onAdvancedControlClick=e.onAdvancedControlClick.bind(c(e)),e.onAdvancedControlReset=e.onAdvancedControlReset.bind(c(e)),e}return t=h,(a=[{key:"onAdvancedControlClick",value:function(){var e=!0,t=Object(l.__)("Hide Advanced","ultimate-addons-for-gutenberg");null!==this.state&&!0===this.state.showAdvancedControls&&(e=!1,t=Object(l.__)("Advanced","ultimate-addons-for-gutenberg")),this.setState({showAdvancedControls:e,showAdvancedControlsLabel:t})}},{key:"onAdvancedControlReset",value:function(){var e=this.props.setAttributes;e({boxShadowColor:""}),e({boxShadowHOffset:""}),e({boxShadowVOffset:""}),e({boxShadowBlur:""}),e({boxShadowSpread:""}),e({boxShadowPosition:""})}},{key:"render",value:function(){var e,t,a,n=this.props,o=n.setAttributes,r=n.boxShadowColor,i=n.boxShadowHOffset,u=n.boxShadowVOffset,c=n.boxShadowBlur,s=n.boxShadowSpread,m=n.boxShadowPosition;return null!==this.state&&!0===this.state.showAdvancedControls&&(e=React.createElement("div",{className:"uagb-box-shadow-advanced"},React.createElement(v,null,React.createElement("p",{className:"uagb-setting-label"},r.label,React.createElement("span",{className:"components-base-control__label"},React.createElement("span",{className:"component-color-indicator",style:{backgroundColor:r.value}}))),React.createElement(b,{value:r.value,onChange:function(e){return o({boxShadowColor:e})},allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,i.label),React.createElement(f,{value:i.value,onChange:function(e){return o({boxShadowHOffset:e})},min:-100,max:100,allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,u.label),React.createElement(f,{value:u.value,onChange:function(e){return o({boxShadowVOffset:e})},min:-100,max:100,allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,c.label),React.createElement(f,{value:c.value,onChange:function(e){return o({boxShadowBlur:e})},min:0,max:100,allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,s.label),React.createElement(f,{value:s.value,onChange:function(e){return o({boxShadowSpread:e})},min:0,max:100,allowReset:!0})),React.createElement(v,null,React.createElement(d,{label:m.label,value:m.value,onChange:function(e){return o({boxShadowPosition:e})},options:[{value:"inset",label:Object(l.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(l.__)("Outset","ultimate-addons-for-gutenberg")}]})))),a=React.createElement(g,{className:"uagb-size-btn uagb-typography-reset-btn",isSmall:!0,"aria-pressed":null!==this.state,onClick:this.onAdvancedControlReset},React.createElement(p,{icon:"image-rotate"})),t=React.createElement(g,{className:"uagb-size-btn uagb-typography-control-btn",isSmall:!0,"aria-pressed":null!==this.state,onClick:this.onAdvancedControlClick},React.createElement(p,{icon:"admin-tools"})),React.createElement("div",{className:"uag-typography-option-actions"},React.createElement("span",null,this.props.label),t,a,e)}}])&&r(t.prototype,a),h}(h);t.a=y},402:function(e,t,a){"use strict";a.r(t);var l=a(2),n=a.n(l),o=a(0),r=a(10),i=a(14),u=a(16),c=a(12),s=a(211),b=a(5),m=a(7),g=function(e){var t,a,g,d=e=e.parentProps,f=d.attributes,p=d.setAttributes,_=d.taxonomyList,h=d.termsList,v=d.deviceType,y=f.postType,C=f.taxonomyType,E=f.layout,S=f.columns,O=f.tcolumns,j=f.mcolumns,w=f.bgColor,F=f.titleColor,T=f.countColor,R=f.rowGap,x=f.columnGap,N=f.contentPadding,k=f.contentPaddingMobile,H=f.contentPaddingTablet,P=f.titleBottomSpace,L=f.alignment,z=f.listStyle,B=f.seperatorStyle,M=f.seperatorWidth,A=f.seperatorThickness,D=f.seperatorColor,G=f.listTextColor,W=f.hoverlistTextColor,V=f.listBottomMargin,I=f.listStyleColor,J=f.hoverlistStyleColor,q=f.noTaxDisplaytext,K=f.boxShadowColor,Q=f.boxShadowHOffset,U=f.boxShadowVOffset,X=f.boxShadowBlur,Y=f.boxShadowSpread,Z=f.boxShadowPosition,$=f.showCount,ee=f.titleFontSize,te=f.titleFontSizeType,ae=f.titleFontSizeMobile,le=f.titleFontSizeTablet,ne=f.titleFontFamily,oe=f.titleFontWeight,re=f.titleFontSubset,ie=f.titleLineHeightType,ue=f.titleLineHeight,ce=f.titleLineHeightTablet,se=f.titleLineHeightMobile,be=f.titleLoadGoogleFonts,me=f.countFontSize,ge=f.countFontSizeType,de=f.countFontSizeMobile,fe=f.countFontSizeTablet,pe=f.countFontFamily,_e=f.countFontWeight,he=f.countFontSubset,ve=f.countLineHeightType,ye=f.countLineHeight,Ce=f.countLineHeightTablet,Ee=f.countLineHeightMobile,Se=f.countLoadGoogleFonts,Oe=f.listFontSize,je=f.listFontSizeType,we=f.listFontSizeMobile,Fe=f.listFontSizeTablet,Te=f.listFontFamily,Re=f.listFontWeight,xe=f.listFontSubset,Ne=f.listLineHeightType,ke=f.listLineHeight,He=f.listLineHeightTablet,Pe=f.listLineHeightMobile,Le=f.listLoadGoogleFonts,ze=f.showEmptyTaxonomy,Be=f.borderStyle,Me=f.borderThickness,Ae=f.borderColor,De=f.borderRadius,Ge=f.listDisplayStyle,We=f.showhierarchy,Ve=f.titleTag,Ie=ze?_:h,Je=[{value:"",label:Object(o.__)("Select Taxonomy","ultimate-addons-for-gutenberg")}];if(""!=Ie&&null!=Ie&&Object.keys(Ie).map((function(e,t){return Je.push({value:_[e].name,label:_[e].label})})),1==be){var qe={google:{families:[ne+(oe?":"+oe:"")]}};t=n.a.createElement(i.a,{config:qe})}if(1==Se){var Ke={google:{families:[pe+(_e?":"+_e:"")]}};a=n.a.createElement(i.a,{config:Ke})}if(1==Le){var Qe={google:{families:[Te+(Re?":"+Re:"")]}};g=n.a.createElement(i.a,{config:Qe})}var Ue=n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",{className:"uagb-setting-label"},Object(o.__)("Text Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:G}}))),n.a.createElement(m.ColorPalette,{value:G,onChange:function(e){return p({listTextColor:e})},allowReset:!0}),n.a.createElement("br",null),"none"!=z&&n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",{className:"uagb-setting-label"},Object(o.__)("Bullet/Numbers Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:I}}))),n.a.createElement(m.ColorPalette,{value:I,onChange:function(e){return p({listStyleColor:e})},allowReset:!0}))),Xe=n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",{className:"uagb-setting-label"},Object(o.__)("Text Hover Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:W}}))),n.a.createElement(m.ColorPalette,{value:W,onChange:function(e){return p({hoverlistTextColor:e})},allowReset:!0}),n.a.createElement("br",null),"none"!=z&&n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",{className:"uagb-setting-label"},Object(o.__)("Bullet/Numbers Hover Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:J}}))),n.a.createElement(m.ColorPalette,{value:J,onChange:function(e){return p({hoverlistStyleColor:e})},allowReset:!0}))),Ye=n.a.createElement(m.InspectorControls,null,n.a.createElement(b.PanelBody,{title:Object(o.__)("General","ultimate-addons-for-gutenberg")},n.a.createElement(b.SelectControl,{label:Object(o.__)("Heading Tag","ultimate-addons-for-gutenberg"),value:Ve,onChange:function(e){return p({titleTag:e})},options:[{value:"div",label:Object(o.__)("Div","ultimate-addons-for-gutenberg")},{value:"h1",label:Object(o.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(o.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(o.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(o.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(o.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(o.__)("H6","ultimate-addons-for-gutenberg")}]}),n.a.createElement(b.SelectControl,{label:Object(o.__)("Layout","ultimate-addons-for-gutenberg"),value:E,onChange:function(e){return p({layout:e})},options:[{value:"grid",label:Object(o.__)("Grid","ultimate-addons-for-gutenberg")},{value:"list",label:Object(o.__)("List","ultimate-addons-for-gutenberg")}]}),"grid"===E&&n.a.createElement(u.a,null),"Desktop"===v&&"grid"===E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Desktop Columns","ultimate-addons-for-gutenberg"),value:S,onChange:function(e){return p({columns:e})},min:1,max:4})),"Tablet"===v&&"grid"===E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Tab Columns","ultimate-addons-for-gutenberg"),value:O,onChange:function(e){return p({tcolumns:e})},min:1,max:3})),"Mobile"===v&&"grid"===E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Mobile Columns","ultimate-addons-for-gutenberg"),value:j,onChange:function(e){return p({mcolumns:e})},min:1,max:2})),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement(b.SelectControl,{label:Object(o.__)("Post Type","ultimate-addons-for-gutenberg"),value:y,onChange:function(t){return function(t){var a=e.setAttributes;a({postType:t}),a({categories:""}),a({taxonomyType:""})}(t)},options:uagb_blocks_info.post_types}),""!=_&&n.a.createElement(b.SelectControl,{label:Object(o.__)("Taxonomy","ultimate-addons-for-gutenberg"),value:C,onChange:function(t){return function(t){var a=e.setAttributes;a({taxonomyType:t}),a({categories:""})}(t)},options:Je}),""==_&&n.a.createElement(b.TextControl,{autoComplete:"off",label:Object(o.__)("Display Message","ultimate-addons-for-gutenberg"),value:q,onChange:function(e){return p({noTaxDisplaytext:e})},help:Object(o.__)("If Taxonomy Not Found","ultimate-addons-for-gutenberg")}),"list"==E&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Display Style","ultimate-addons-for-gutenberg")),n.a.createElement(b.ButtonGroup,{className:"uagb-list-display-style-group"},n.a.createElement(b.Button,{key:"list",label:"List",onClick:function(){return p({listDisplayStyle:"list"})},"aria-pressed":"list"===Ge,isPrimary:"list"===Ge},"List"),n.a.createElement(b.Button,{key:"dropdown",label:"Dropdown",onClick:function(){return p({listDisplayStyle:"dropdown"})},"aria-pressed":"dropdown"===Ge,isPrimary:"dropdown"===Ge},"Dropdown"))),n.a.createElement(b.ToggleControl,{label:Object(o.__)("Show Empty Taxonomy","ultimate-addons-for-gutenberg"),checked:ze,onChange:function(){return p({showEmptyTaxonomy:!ze})},help:Object(o.__)("Show Empty Taxonomy in list ")}),n.a.createElement(b.ToggleControl,{label:Object(o.__)("Show Posts Count","ultimate-addons-for-gutenberg"),checked:$,onChange:function(){return p({showCount:!$})},help:Object(o.__)("Show Count of taxonomy ","ultimate-addons-for-gutenberg")}),"list"==E&&"list"==Ge&&"post_tag"!==C&&n.a.createElement(b.ToggleControl,{label:Object(o.__)("Show Hierarchy","ultimate-addons-for-gutenberg"),checked:We,onChange:function(){return p({showhierarchy:!We})},help:Object(o.__)("Show Hierarchy of taxonomy ","ultimate-addons-for-gutenberg")}),"grid"==E&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Alignment","ultimate-addons-for-gutenberg")),n.a.createElement(b.Button,{key:"left",icon:"editor-alignleft",label:"Left",onClick:function(){return p({alignment:"left"})},"aria-pressed":"left"===L,isPrimary:"left"===L}),n.a.createElement(b.Button,{key:"center",icon:"editor-aligncenter",label:"Center",onClick:function(){return p({alignment:"center"})},"aria-pressed":"center"===L,isPrimary:"center"===L}),n.a.createElement(b.Button,{key:"right",icon:"editor-alignright",label:"Right",onClick:function(){return p({alignment:"right"})},"aria-pressed":"right"===L,isPrimary:"right"===L})),"list"==E&&"dropdown"!==Ge&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("List Style","ultimate-addons-for-gutenberg")),n.a.createElement(b.Button,{key:"bullet",icon:"editor-ul",label:"Bullet",onClick:function(){return p({listStyle:"disc"})},"aria-pressed":"disc"===z,isPrimary:"disc"===z}),n.a.createElement(b.Button,{key:"numbers",icon:"editor-ol",label:"Numbers",onClick:function(){return p({listStyle:"decimal"})},"aria-pressed":"decimal"===z,isPrimary:"decimal"===z}),n.a.createElement(b.Button,{key:"none",icon:"menu",label:"None",onClick:function(){return p({listStyle:"none"})},"aria-pressed":"none"===z,isPrimary:"none"===z}))),"dropdown"!==Ge&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.PanelBody,{title:Object(o.__)("Color","ultimate-addons-for-gutenberg"),initialOpen:!1},"grid"==E&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Background Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:w}}))),n.a.createElement(m.ColorPalette,{value:w,onChange:function(e){return p({bgColor:e})},allowReset:!0}),n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Title Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:F}}))),n.a.createElement(m.ColorPalette,{value:F,onChange:function(e){return p({titleColor:e})},allowReset:!0}),$&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Count Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:T}}))),n.a.createElement(m.ColorPalette,{value:T,onChange:function(e){return p({countColor:e})},allowReset:!0}))),"list"==E&&n.a.createElement(b.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"normal",title:Object(o.__)("Normal","ultimate-addons-for-gutenberg"),className:"uagb-normal-tab"},{name:"hover",title:Object(o.__)("Hover","ultimate-addons-for-gutenberg"),className:"uagb-hover-tab"}]},(function(e){var t;return t="normal"===e.name?Ue:Xe,n.a.createElement("div",null,t)}))),n.a.createElement(b.PanelBody,{title:Object(o.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},"grid"==E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Row Gap","ultimate-addons-for-gutenberg"),value:R,onChange:function(e){return p({rowGap:e})},min:0,max:50,allowReset:!0}),n.a.createElement(b.RangeControl,{label:Object(o.__)("Column Gap","ultimate-addons-for-gutenberg"),value:x,onChange:function(e){return p({columnGap:e})},min:0,max:50,allowReset:!0}),n.a.createElement("hr",{className:"uagb-editor__separator"}),"grid"===E&&n.a.createElement(u.a,null),"Desktop"===v&&"grid"===E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Content Padding"),value:N,onChange:function(e){return p({contentPadding:e})},min:10,max:100})),"Tablet"===v&&"grid"===E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Content Padding"),value:H,onChange:function(e){return p({contentPaddingTablet:e})},min:0,max:100})),"Mobile"===v&&"grid"===E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Content Padding"),value:k,onChange:function(e){return p({contentPaddingMobile:e})},min:0,max:100})),$&&n.a.createElement(n.a.Fragment,null,n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement(b.RangeControl,{label:Object(o.__)("Title Bottom Spacing","ultimate-addons-for-gutenberg"),value:P,onChange:function(e){return p({titleBottomSpace:e})},min:0,max:50,allowReset:!0}))),"list"==E&&n.a.createElement(b.RangeControl,{label:Object(o.__)("Bottom Margin","ultimate-addons-for-gutenberg"),value:V,onChange:function(e){return p({listBottomMargin:e})},min:0,max:100,allowReset:!0})),n.a.createElement(b.PanelBody,{title:Object(o.__)("Style","ultimate-addons-for-gutenberg"),initialOpen:!1},"grid"==E&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Title ","ultimate-addons-for-gutenberg")),n.a.createElement(c.a,{label:Object(o.__)("Typography","ultimate-addons-for-gutenberg"),attributes:f,setAttributes:p,loadGoogleFonts:{value:be,label:"titleLoadGoogleFonts"},fontFamily:{value:ne,label:"titleFontFamily"},fontWeight:{value:oe,label:"titleFontWeight"},fontSubset:{value:re,label:"titleFontSubset"},fontSizeType:{value:te,label:"titleFontSizeType"},fontSize:{value:ee,label:"titleFontSize"},fontSizeMobile:{value:ae,label:"titleFontSizeMobile"},fontSizeTablet:{value:le,label:"titleFontSizeTablet"},lineHeightType:{value:ie,label:"titleLineHeightType"},lineHeight:{value:ue,label:"titleLineHeight"},lineHeightMobile:{value:se,label:"titleLineHeightMobile"},lineHeightTablet:{value:ce,label:"titleLineHeightTablet"}}),$&&n.a.createElement(n.a.Fragment,null,n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Count ","ultimate-addons-for-gutenberg")),n.a.createElement(c.a,{label:Object(o.__)("Typography","ultimate-addons-for-gutenberg"),attributes:f,setAttributes:p,loadGoogleFonts:{value:Se,label:"countLoadGoogleFonts"},fontFamily:{value:pe,label:"countFontFamily"},fontWeight:{value:_e,label:"countFontWeight"},fontSubset:{value:he,label:"countFontSubset"},fontSizeType:{value:ge,label:"countFontSizeType"},fontSize:{value:me,label:"countFontSize"},fontSizeMobile:{value:de,label:"countFontSizeMobile"},fontSizeTablet:{value:fe,label:"countFontSizeTablet"},lineHeightType:{value:ve,label:"countLineHeightType"},lineHeight:{value:ye,label:"countLineHeight"},lineHeightMobile:{value:Ee,label:"countLineHeightMobile"},lineHeightTablet:{value:Ce,label:"countLineHeightTablet"}})),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement(s.a,{setAttributes:p,label:Object(o.__)("Box Shadow","ultimate-addons-for-gutenberg"),boxShadowColor:{value:K,label:Object(o.__)("Color","ultimate-addons-for-gutenberg")},boxShadowHOffset:{value:Q,label:Object(o.__)("Horizontal","ultimate-addons-for-gutenberg")},boxShadowVOffset:{value:U,label:Object(o.__)("Vertical","ultimate-addons-for-gutenberg")},boxShadowBlur:{value:X,label:Object(o.__)("Blur","ultimate-addons-for-gutenberg")},boxShadowSpread:{value:Y,label:Object(o.__)("Spread","ultimate-addons-for-gutenberg")},boxShadowPosition:{value:Z,label:Object(o.__)("Position","ultimate-addons-for-gutenberg")}}),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement(b.SelectControl,{label:Object(o.__)("Border Style","ultimate-addons-for-gutenberg"),value:Be,onChange:function(e){return p({borderStyle:e})},options:[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(o.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(o.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(o.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(o.__)("Double","ultimate-addons-for-gutenberg")},{value:"groove",label:Object(o.__)("Groove","ultimate-addons-for-gutenberg")},{value:"inset",label:Object(o.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(o.__)("Outset","ultimate-addons-for-gutenberg")},{value:"ridge",label:Object(o.__)("Ridge","ultimate-addons-for-gutenberg")}]}),"none"!=Be&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Border Thickness","ultimate-addons-for-gutenberg"),value:Me,onChange:function(e){return p({borderThickness:e})},min:0,max:10,allowReset:!0}),n.a.createElement(b.RangeControl,{label:Object(o.__)("Rounded Corners (px)","ultimate-addons-for-gutenberg"),value:De,onChange:function(e){p({borderRadius:e})},min:0,max:50,allowReset:!0}),n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Border Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ae}}))),n.a.createElement(m.ColorPalette,{value:Ae,onChange:function(e){return p({borderColor:e})},allowReset:!0}))),"list"==E&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.SelectControl,{label:Object(o.__)("Separator Style","ultimate-addons-for-gutenberg"),value:B,onChange:function(e){return p({seperatorStyle:e})},options:[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(o.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(o.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(o.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(o.__)("Double","ultimate-addons-for-gutenberg")},{value:"groove",label:Object(o.__)("Groove","ultimate-addons-for-gutenberg")},{value:"inset",label:Object(o.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(o.__)("Outset","ultimate-addons-for-gutenberg")},{value:"ridge",label:Object(o.__)("Ridge","ultimate-addons-for-gutenberg")}]}),"none"!=B&&n.a.createElement(n.a.Fragment,null,n.a.createElement(b.RangeControl,{label:Object(o.__)("Separator Width (%)","ultimate-addons-for-gutenberg"),value:M,onChange:function(e){return p({seperatorWidth:e})},min:0,max:100,allowReset:!0}),n.a.createElement(b.RangeControl,{label:Object(o.__)("Separator Thickness","ultimate-addons-for-gutenberg"),value:A,onChange:function(e){return p({seperatorThickness:e})},min:0,max:20,allowReset:!0}),n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Separator Color","ultimate-addons-for-gutenberg"),n.a.createElement("span",{className:"components-base-control__label"},n.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:D}}))),n.a.createElement(m.ColorPalette,{value:D,onChange:function(e){return p({seperatorColor:e})},allowReset:!0}))),n.a.createElement("hr",{className:"uagb-editor__separator"}),n.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("List ","ultimate-addons-for-gutenberg")),n.a.createElement(c.a,{label:Object(o.__)("Typography","ultimate-addons-for-gutenberg"),attributes:f,setAttributes:p,loadGoogleFonts:{value:Le,label:"listLoadGoogleFonts"},fontFamily:{value:Te,label:"listFontFamily"},fontWeight:{value:Re,label:"listFontWeight"},fontSubset:{value:xe,label:"listFontSubset"},fontSizeType:{value:je,label:"listFontSizeType"},fontSize:{value:Oe,label:"listFontSize"},fontSizeMobile:{value:we,label:"listFontSizeMobile"},fontSizeTablet:{value:Fe,label:"listFontSizeTablet"},lineHeightType:{value:Ne,label:"listLineHeightType"},lineHeight:{value:ke,label:"listLineHeight"},lineHeightMobile:{value:Pe,label:"listLineHeightMobile"},lineHeightTablet:{value:He,label:"listLineHeightTablet"}})))));return n.a.createElement(n.a.Fragment,null,n.a.createElement(l.Suspense,{fallback:Object(r.a)()},Ye,t,a,g))};t.default=n.a.memo(g)}}]);