(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{202:function(e,t,a){"use strict";var n=a(1);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?c(e):t}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=wp.blockEditor.ColorPalette,m=wp.components,d=m.Button,g=m.SelectControl,p=m.RangeControl,f=m.Dashicon,h=wp.element,_=h.Component,v=h.Fragment,E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(_,e);var t,a,l,m,h=(l=_,m=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(l);if(m){var a=s(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return u(this,e)});function _(){var e;return o(this,_),(e=h.apply(this,arguments)).onAdvancedControlClick=e.onAdvancedControlClick.bind(c(e)),e.onAdvancedControlReset=e.onAdvancedControlReset.bind(c(e)),e}return t=_,(a=[{key:"onAdvancedControlClick",value:function(){var e=!0,t=Object(n.__)("Hide Advanced","ultimate-addons-for-gutenberg");null!==this.state&&!0===this.state.showAdvancedControls&&(e=!1,t=Object(n.__)("Advanced","ultimate-addons-for-gutenberg")),this.setState({showAdvancedControls:e,showAdvancedControlsLabel:t})}},{key:"onAdvancedControlReset",value:function(){var e=this.props.setAttributes;e({boxShadowColor:""}),e({boxShadowHOffset:""}),e({boxShadowVOffset:""}),e({boxShadowBlur:""}),e({boxShadowSpread:""}),e({boxShadowPosition:""})}},{key:"render",value:function(){var e,t,a,l=this.props,o=l.setAttributes,r=l.boxShadowColor,i=l.boxShadowHOffset,u=l.boxShadowVOffset,c=l.boxShadowBlur,s=l.boxShadowSpread,m=l.boxShadowPosition;return null!==this.state&&!0===this.state.showAdvancedControls&&(e=React.createElement("div",{className:"uagb-box-shadow-advanced"},React.createElement(v,null,React.createElement("p",{className:"uagb-setting-label"},r.label,React.createElement("span",{className:"components-base-control__label"},React.createElement("span",{className:"component-color-indicator",style:{backgroundColor:r.value}}))),React.createElement(b,{value:r.value,onChange:function(e){return o({boxShadowColor:e})},allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,i.label),React.createElement(p,{value:i.value,onChange:function(e){return o({boxShadowHOffset:e})},min:-100,max:100,allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,u.label),React.createElement(p,{value:u.value,onChange:function(e){return o({boxShadowVOffset:e})},min:-100,max:100,allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,c.label),React.createElement(p,{value:c.value,onChange:function(e){return o({boxShadowBlur:e})},min:0,max:100,allowReset:!0})),React.createElement(v,null,React.createElement("h2",null,s.label),React.createElement(p,{value:s.value,onChange:function(e){return o({boxShadowSpread:e})},min:0,max:100,allowReset:!0})),React.createElement(v,null,React.createElement(g,{label:m.label,value:m.value,onChange:function(e){return o({boxShadowPosition:e})},options:[{value:"inset",label:Object(n.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(n.__)("Outset","ultimate-addons-for-gutenberg")}]})))),a=React.createElement(d,{className:"uagb-size-btn uagb-typography-reset-btn",isSmall:!0,"aria-pressed":null!==this.state,onClick:this.onAdvancedControlReset},React.createElement(f,{icon:"image-rotate"})),t=React.createElement(d,{className:"uagb-size-btn uagb-typography-control-btn",isSmall:!0,"aria-pressed":null!==this.state,onClick:this.onAdvancedControlClick},React.createElement(f,{icon:"admin-tools"})),React.createElement("div",{className:"uag-typography-option-actions"},React.createElement("span",null,this.props.label),t,a,e)}}])&&r(t.prototype,a),_}(_);t.a=E},427:function(e,t,a){"use strict";a.r(t);var n=a(2),l=a.n(n),o=a(1),r=a(6),i=a(8),u=a(29),c=a(15),s=a(202),b=a(17),m=wp.components,d=m.PanelBody,g=m.SelectControl,p=m.RangeControl,f=m.TextControl,h=m.ButtonGroup,_=m.Button,v=wp.blockEditor,E=v.InspectorControls,y=v.ColorPalette,C=function(e){var t,a,m=e=e.parentProps,v=m.attributes,C=m.setAttributes,S=m.deviceType,x=v.layout,O=v.placeholder,w=v.inputSize,T=v.textColor,j=v.inputBgColor,R=v.boxShadowColor,N=v.boxShadowHOffset,k=v.boxShadowVOffset,z=v.boxShadowBlur,F=v.boxShadowSpread,P=v.boxShadowPosition,H=v.borderStyle,B=v.borderWidth,A=v.borderRadius,L=v.borderColor,M=v.buttonBgColor,D=v.buttonBgHoverColor,I=v.buttonIconColor,W=v.buttonIconHoverColor,G=v.buttonWidth,V=v.buttonIconSize,J=v.iconColor,q=v.iconSize,K=v.inputloadGoogleFonts,Q=v.inputFontFamily,U=v.inputFontWeight,X=v.inputFontSubset,Y=v.inputFontSize,Z=v.inputFontSizeType,$=v.inputFontSizeTablet,ee=v.inputFontSizeMobile,te=v.inputLineHeight,ae=v.inputLineHeightType,ne=v.inputLineHeightTablet,le=v.inputLineHeightMobile,oe=v.inputPaddingTypeDesktop,re=v.vinputPaddingMobile,ie=v.vinputPaddingTablet,ue=v.vinputPaddingDesktop,ce=v.hinputPaddingMobile,se=v.hinputPaddingTablet,be=v.hinputPaddingDesktop,me=v.buttonType,de=v.buttonText,ge=v.buttonloadGoogleFonts,pe=v.buttonFontFamily,fe=v.buttonFontWeight,he=v.buttonFontSubset,_e=v.buttonFontSize,ve=v.buttonFontSizeType,Ee=v.buttonFontSizeTablet,ye=v.buttonFontSizeMobile,Ce=v.buttonLineHeight,Se=v.buttonLineHeightType,xe=v.buttonLineHeightTablet,Oe=v.buttonLineHeightMobile,we=v.buttonTextColor,Te=v.buttonTextHoverColor,je=v.inputSizeType;if(1==K){var Re={google:{families:[Q+(U?":"+U:"")]}};t=l.a.createElement(b.default,{config:Re})}if(1==ge){var Ne={google:{families:[pe+(fe?":"+fe:"")]}};a=l.a.createElement(b.default,{config:Ne})}return l.a.createElement(n.Suspense,{fallback:Object(i.a)()},l.a.createElement(E,null,l.a.createElement(d,{title:Object(o.__)("General","ultimate-addons-for-gutenberg"),initialOpen:!0,className:"uagb__url-panel-body"},l.a.createElement(g,{label:Object(o.__)("Layout","ultimate-addons-for-gutenberg"),value:x,options:[{value:"input-button",label:Object(o.__)("Classic","ultimate-addons-for-gutenberg")},{value:"input",label:Object(o.__)("Minimal","ultimate-addons-for-gutenberg")}],onChange:function(e){return C({layout:e})}}),l.a.createElement(l.a.Fragment,null,l.a.createElement(f,{label:Object(o.__)("Placeholder","ultimate-addons-for-gutenberg"),value:O,onChange:function(e){return C({placeholder:e})}}),l.a.createElement(h,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},l.a.createElement(_,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===je,"aria-pressed":"px"===je,onClick:function(){return C({inputSizeType:"px"})}},"px"),l.a.createElement(_,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===je,"aria-pressed":"%"===je,onClick:function(){return C({inputSizeType:"%"})}},"%")),l.a.createElement(p,{label:Object(o.__)("Input Width","ultimate-addons-for-gutenberg"),value:w,onChange:function(e){return C({inputSize:e})},min:0,max:"px"===je?500:100}))),l.a.createElement(d,{title:Object(o.__)("Input Box","ultimate-addons-for-gutenberg"),initialOpen:!1,className:"uagb__url-panel-body"},l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Text Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:T}}))),l.a.createElement(y,{value:T,onChange:function(e){return C({textColor:e})},allowReset:!0}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Background Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:j}}))),l.a.createElement(y,{value:j,onChange:function(e){return C({inputBgColor:e})},allowReset:!0}),l.a.createElement("hr",null),l.a.createElement("h2",null,Object(o.__)("Border","ultimate-addons-for-gutenberg")),l.a.createElement(g,{label:Object(o.__)("Style","ultimate-addons-for-gutenberg"),value:H,options:[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(o.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(o.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(o.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(o.__)("Double","ultimate-addons-for-gutenberg")}],onChange:function(e){C({borderStyle:e})}}),"none"!==H&&l.a.createElement(l.a.Fragment,null,l.a.createElement(p,{label:Object(o.__)("Thickness (px)","ultimate-addons-for-gutenberg"),value:B,onChange:function(e){C({borderWidth:e})},min:0,max:20}),l.a.createElement(p,{label:Object(o.__)("Rounded Corners (px)","ultimate-addons-for-gutenberg"),value:A,onChange:function(e){C({borderRadius:e})},min:0,max:50}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:L}}))),l.a.createElement(y,{value:L,onChange:function(e){return C({borderColor:e})},allowReset:!0})),l.a.createElement("hr",null),l.a.createElement(u.default,null),"Desktop"===S&&l.a.createElement(l.a.Fragment,null,l.a.createElement(h,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},l.a.createElement(_,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===oe,"aria-pressed":"px"===oe,onClick:function(){return C({inputPaddingTypeDesktop:"px"})}},"px"),l.a.createElement(_,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===oe,"aria-pressed":"%"===oe,onClick:function(){return C({inputPaddingTypeDesktop:"%"})}},"%")),l.a.createElement("h2",null,Object(o.__)("Padding","ultimate-addons-for-gutenberg")),l.a.createElement(p,{label:r.a.vertical_spacing,className:"uagb-margin-control",value:ue,onChange:function(e){return C({vinputPaddingDesktop:e})},min:0,max:100,allowReset:!0}),l.a.createElement(p,{label:r.a.horizontal_spacing,className:"uagb-margin-control",value:be,onChange:function(e){return C({hinputPaddingDesktop:e})},min:0,max:100,allowReset:!0})),"Tablet"===S&&l.a.createElement(l.a.Fragment,null,l.a.createElement(h,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},l.a.createElement(_,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===oe,"aria-pressed":"px"===oe,onClick:function(){return C({inputPaddingTypeDesktop:"px"})}},"px"),l.a.createElement(_,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===oe,"aria-pressed":"%"===oe,onClick:function(){return C({inputPaddingTypeDesktop:"%"})}},"%")),l.a.createElement("h2",null,Object(o.__)("Padding","ultimate-addons-for-gutenberg")),l.a.createElement(p,{label:r.a.vertical_spacing,className:"uagb-margin-control",value:ie,onChange:function(e){return C({vinputPaddingTablet:e})},min:0,max:100,allowReset:!0}),l.a.createElement(p,{label:r.a.horizontal_spacing,className:"uagb-margin-control",value:se,onChange:function(e){return C({hinputPaddingTablet:e})},min:0,max:100,allowReset:!0})),"Mobile"===S&&l.a.createElement(l.a.Fragment,null,l.a.createElement(h,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},l.a.createElement(_,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===oe,"aria-pressed":"px"===oe,onClick:function(){return C({inputPaddingTypeDesktop:"px"})}},"px"),l.a.createElement(_,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===oe,"aria-pressed":"%"===oe,onClick:function(){return C({inputPaddingTypeDesktop:"%"})}},"%")),l.a.createElement("h2",null,Object(o.__)("Padding","ultimate-addons-for-gutenberg")),l.a.createElement(p,{label:r.a.vertical_spacing,className:"uagb-margin-control",value:re,onChange:function(e){return C({vinputPaddingMobile:e})},min:0,max:100,allowReset:!0}),l.a.createElement(p,{label:r.a.horizontal_spacing,className:"uagb-margin-control",value:ce,onChange:function(e){return C({hinputPaddingMobile:e})},min:0,max:100,allowReset:!0})),l.a.createElement("hr",null),l.a.createElement(c.default,{label:Object(o.__)("Typography","ultimate-addons-for-gutenberg"),attributes:v,setAttributes:C,loadGoogleFonts:{value:K,label:"inputloadGoogleFonts"},fontFamily:{value:Q,label:"inputFontFamily"},fontWeight:{value:U,label:"inputFontWeight"},fontSubset:{value:X,label:"inputFontSubset"},fontSizeType:{value:Z,label:"inputFontSizeType"},fontSize:{value:Y,label:"inputFontSize"},fontSizeMobile:{value:ee,label:"inputFontSizeMobile"},fontSizeTablet:{value:$,label:"inputFontSizeTablet"},lineHeightType:{value:ae,label:"inputLineHeightType"},lineHeight:{value:te,label:"inputLineHeight"},lineHeightMobile:{value:le,label:"inputLineHeightMobile"},lineHeightTablet:{value:ne,label:"inputLineHeightTablet"}}),l.a.createElement(s.a,{setAttributes:C,label:Object(o.__)("Box Shadow","ultimate-addons-for-gutenberg"),boxShadowColor:{value:R,label:Object(o.__)("Color","ultimate-addons-for-gutenberg")},boxShadowHOffset:{value:N,label:Object(o.__)("Horizontal","ultimate-addons-for-gutenberg")},boxShadowVOffset:{value:k,label:Object(o.__)("Vertical","ultimate-addons-for-gutenberg")},boxShadowBlur:{value:z,label:Object(o.__)("Blur","ultimate-addons-for-gutenberg")},boxShadowSpread:{value:F,label:Object(o.__)("Spread","ultimate-addons-for-gutenberg")},boxShadowPosition:{value:P,label:Object(o.__)("Position","ultimate-addons-for-gutenberg")}})),"input-button"===x?l.a.createElement(d,{title:Object(o.__)("Button","ultimate-addons-for-gutenberg"),initialOpen:!1,className:"uagb__url-panel-body"},l.a.createElement(l.a.Fragment,null,l.a.createElement(g,{label:Object(o.__)("Type","ultimate-addons-for-gutenberg"),value:me,options:[{value:"icon",label:Object(o.__)("Icon","ultimate-addons-for-gutenberg")},{value:"text",label:Object(o.__)("Text","ultimate-addons-for-gutenberg")}],onChange:function(e){C({buttonType:e})}}),"text"===me&&l.a.createElement(l.a.Fragment,null,l.a.createElement(f,{label:"Text",value:de,onChange:function(e){C({buttonText:e})}}),l.a.createElement(c.default,{label:Object(o.__)("Typography","ultimate-addons-for-gutenberg"),attributes:v,setAttributes:C,loadGoogleFonts:{value:ge,label:"buttonloadGoogleFonts"},fontFamily:{value:pe,label:"buttonFontFamily"},fontWeight:{value:fe,label:"buttonFontWeight"},fontSubset:{value:he,label:"buttonFontSubset"},fontSizeType:{value:ve,label:"buttonFontSizeType"},fontSize:{value:_e,label:"buttonFontSize"},fontSizeMobile:{value:ye,label:"buttonFontSizeMobile"},fontSizeTablet:{value:Ee,label:"buttonFontSizeTablet"},lineHeightType:{value:Se,label:"buttonLineHeightType"},lineHeight:{value:Ce,label:"buttonLineHeight"},lineHeightMobile:{value:Oe,label:"buttonLineHeightMobile"},lineHeightTablet:{value:xe,label:"buttonLineHeightTablet"}})),l.a.createElement(p,{label:Object(o.__)("Width","ultimate-addons-for-gutenberg"),value:G,onChange:function(e){C({buttonWidth:e})},min:0,max:500}),l.a.createElement(l.a.Fragment,null,l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Background Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:M}}))),l.a.createElement(y,{value:M,onChange:function(e){return C({buttonBgColor:e})},allowReset:!0}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Background Hover Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:D}}))),l.a.createElement(y,{value:D,onChange:function(e){return C({buttonBgHoverColor:e})},allowReset:!0}),"text"===me&&l.a.createElement(l.a.Fragment,null,l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Text Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:we}}))),l.a.createElement(y,{value:we,onChange:function(e){return C({buttonTextColor:e})},allowReset:!0}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Text Hover Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Te}}))),l.a.createElement(y,{value:Te,onChange:function(e){return C({buttonTextHoverColor:e})},allowReset:!0}))),"icon"===me&&l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",{className:"uagb-editor__separator"}),l.a.createElement("h2",null,Object(o.__)("Icon","ultimate-addons-for-gutenberg")),l.a.createElement(p,{label:Object(o.__)("Size","ultimate-addons-for-gutenberg"),value:V,onChange:function(e){C({buttonIconSize:e})},min:0,max:500}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:I}}))),l.a.createElement(y,{value:I,onChange:function(e){return C({buttonIconColor:e})},allowReset:!0}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Hover Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:W}}))),l.a.createElement(y,{value:W,onChange:function(e){return C({buttonIconHoverColor:e})},allowReset:!0})))):"","input"===x?l.a.createElement(d,{title:Object(o.__)("Icon","ultimate-addons-for-gutenberg"),initialOpen:!1,className:"uagb__url-panel-body"},l.a.createElement(l.a.Fragment,null,l.a.createElement(p,{label:Object(o.__)("Size","ultimate-addons-for-gutenberg"),value:q,onChange:function(e){C({iconSize:e})},min:0,max:500}),l.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Color","ultimate-addons-for-gutenberg"),l.a.createElement("span",{className:"components-base-control__label"},l.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:J}}))),l.a.createElement(y,{value:J,onChange:function(e){return C({iconColor:e})},allowReset:!0}))):""),t,a)};t.default=l.a.memo(C)}}]);