(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{202:function(e,t,a){"use strict";var n=a(1);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?c(e):t}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var s=wp.blockEditor.ColorPalette,g=wp.components,m=g.Button,d=g.SelectControl,f=g.RangeControl,p=g.Dashicon,_=wp.element,v=_.Component,h=_.Fragment,C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(v,e);var t,a,o,g,_=(o=v,g=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(o);if(g){var a=b(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return u(this,e)});function v(){var e;return l(this,v),(e=_.apply(this,arguments)).onAdvancedControlClick=e.onAdvancedControlClick.bind(c(e)),e.onAdvancedControlReset=e.onAdvancedControlReset.bind(c(e)),e}return t=v,(a=[{key:"onAdvancedControlClick",value:function(){var e=!0,t=Object(n.__)("Hide Advanced","ultimate-addons-for-gutenberg");null!==this.state&&!0===this.state.showAdvancedControls&&(e=!1,t=Object(n.__)("Advanced","ultimate-addons-for-gutenberg")),this.setState({showAdvancedControls:e,showAdvancedControlsLabel:t})}},{key:"onAdvancedControlReset",value:function(){var e=this.props.setAttributes;e({boxShadowColor:""}),e({boxShadowHOffset:""}),e({boxShadowVOffset:""}),e({boxShadowBlur:""}),e({boxShadowSpread:""}),e({boxShadowPosition:""})}},{key:"render",value:function(){var e,t,a,o=this.props,l=o.setAttributes,r=o.boxShadowColor,i=o.boxShadowHOffset,u=o.boxShadowVOffset,c=o.boxShadowBlur,b=o.boxShadowSpread,g=o.boxShadowPosition;return null!==this.state&&!0===this.state.showAdvancedControls&&(e=React.createElement("div",{className:"uagb-box-shadow-advanced"},React.createElement(h,null,React.createElement("p",{className:"uagb-setting-label"},r.label,React.createElement("span",{className:"components-base-control__label"},React.createElement("span",{className:"component-color-indicator",style:{backgroundColor:r.value}}))),React.createElement(s,{value:r.value,onChange:function(e){return l({boxShadowColor:e})},allowReset:!0})),React.createElement(h,null,React.createElement("h2",null,i.label),React.createElement(f,{value:i.value,onChange:function(e){return l({boxShadowHOffset:e})},min:-100,max:100,allowReset:!0})),React.createElement(h,null,React.createElement("h2",null,u.label),React.createElement(f,{value:u.value,onChange:function(e){return l({boxShadowVOffset:e})},min:-100,max:100,allowReset:!0})),React.createElement(h,null,React.createElement("h2",null,c.label),React.createElement(f,{value:c.value,onChange:function(e){return l({boxShadowBlur:e})},min:0,max:100,allowReset:!0})),React.createElement(h,null,React.createElement("h2",null,b.label),React.createElement(f,{value:b.value,onChange:function(e){return l({boxShadowSpread:e})},min:0,max:100,allowReset:!0})),React.createElement(h,null,React.createElement(d,{label:g.label,value:g.value,onChange:function(e){return l({boxShadowPosition:e})},options:[{value:"inset",label:Object(n.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(n.__)("Outset","ultimate-addons-for-gutenberg")}]})))),a=React.createElement(m,{className:"uagb-size-btn uagb-typography-reset-btn",isSmall:!0,"aria-pressed":null!==this.state,onClick:this.onAdvancedControlReset},React.createElement(p,{icon:"image-rotate"})),t=React.createElement(m,{className:"uagb-size-btn uagb-typography-control-btn",isSmall:!0,"aria-pressed":null!==this.state,onClick:this.onAdvancedControlClick},React.createElement(p,{icon:"admin-tools"})),React.createElement("div",{className:"uag-typography-option-actions"},React.createElement("span",null,this.props.label),t,a,e)}}])&&r(t.prototype,a),v}(v);t.a=C},211:function(e,t,a){"use strict";var n=a(22),o=a(1),l=wp.blockEditor.__experimentalPanelColorGradientSettings;t.a=function(e){var t=e.attributes,a=e.setAttributes,r=t.gradientValue,i=t.gradientAngle,u=t.gradientColor1,c=t.gradientColor2,b=t.gradientLocation1,s=t.gradientLocation2,g=t.gradientPosition,m=t.gradientType;if(""===r){var d=Object(n.a)(u),f=Object(n.a)(c);if("linear"===m){var p="linear-gradient(".concat(i,"deg,").concat(d," ").concat(b,"%, ").concat(f," ").concat(s,"%)");a({gradientValue:p})}else p="radial-gradient(at ".concat(g,", ").concat(d," ").concat(b,"%, ").concat(f," ").concat(s,"%)"),a({gradientValue:p})}return React.createElement(l,{title:Object(o.__)("Color Settings","ultimate-addons-for-gutenberg"),initialOpen:!0,settings:[{label:Object(o.__)("Overlay Color","ultimate-addons-for-gutenberg"),gradientValue:r,onGradientChange:function(e){a({gradientValue:e}),a({gradientAngle:"",gradientColor1:"",gradientColor2:"",gradientLocation1:"",gradientLocation2:""})}}]})}},463:function(e,t,a){"use strict";a.r(t);var n=a(6),o=a(1),l=a(2),r=a.n(l),i=a(8),u=a(211),c=a(29);function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var _=wp.element,v=_.Component,h=(_.Fragment,wp.components),C=h.BaseControl,O=h.Button,y=h.ButtonGroup,E=h.PanelRow,j=h.RangeControl,R=h.Tooltip,w=[{value:"5",
/* translators: abbreviation for small size */
label:Object(o.__)("S","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Small","ultimate-addons-for-gutenberg")},{value:"15",
/* translators: abbreviation for medium size */
label:Object(o.__)("M","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Medium","ultimate-addons-for-gutenberg")},{value:"20",
/* translators: abbreviation for large size */
label:Object(o.__)("L","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Large","ultimate-addons-for-gutenberg")},{value:"30",
/* translators: abbreviation for extra large size */
label:Object(o.__)("XL","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Extra Large","ultimate-addons-for-gutenberg")}],x={value:"0",label:Object(o.__)("None","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("None","ultimate-addons-for-gutenberg")},k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(r,e);var t,a,n,o,l=(n=r,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=p(n);if(o){var a=p(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return f(this,e)});function r(){return g(this,r),l.apply(this,arguments)}return t=r,(a=[{key:"render",value:function(){var e,t=this.props,a=t.advancedMaxValue,n=t.advancedMinValue,o=t.currentOption,l=t.label,r=t.onChange,i=t.options,u=t.showAdvancedControls,c=t.showIcons,b=t.showNoneOption,g=i||w;return b&&(g=[x].concat(function(e){if(Array.isArray(e))return s(e)}(e=g)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return s(e,void 0);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?s(e,void 0):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())),u&&!1!==n&&!1!==a?React.createElement(j,{label:l,value:o,onChange:function(e){return r(e)},min:n,max:a}):React.createElement(C,{id:"uagb-option-selector-".concat(l),label:l},React.createElement(E,null,React.createElement(y,{"aria-label":l},g.map((function(e){return React.createElement(R,{key:"option-".concat(e.value),text:e.tooltip},React.createElement(O,{isLarge:!0,isSecondary:o!==e.value,isPrimary:o===e.value,"aria-pressed":o===e.value,onClick:function(){return r(e.value)},"aria-label":e.tooltip},c?e.icon:e.label))})))))}}])&&m(t.prototype,a),r}(v),S=a(202),P=a(4),T=a(5),N=function(e){var t,a,b,s=e.parentProps,g=s.attributes,m=s.setAttributes,d=s.deviceType,f=g.stack,p=g.align,_=g.vAlign,v=g.contentWidth,h=g.width,C=g.widthType,O=g.tag,y=g.columnGap,E=g.topMargin,j=g.bottomMargin,R=g.topMarginMobile,w=g.bottomMarginMobile,x=g.topMarginTablet,N=g.bottomMarginTablet,B=g.topPadding,M=g.bottomPadding,A=g.leftPadding,z=g.rightPadding,F=g.topPaddingTablet,V=g.bottomPaddingTablet,H=g.leftPaddingTablet,D=g.rightPaddingTablet,I=g.topPaddingMobile,L=g.bottomPaddingMobile,W=g.leftPaddingMobile,G=g.rightPaddingMobile,U=g.backgroundType,J=g.backgroundImage,X=g.backgroundVideo,Z=g.backgroundColor,$=g.backgroundPosition,q=g.backgroundAttachment,K=g.backgroundRepeat,Q=g.backgroundSize,Y=g.backgroundOpacity,ee=g.backgroundVideoColor,te=g.backgroundVideoOpacity,ae=g.backgroundImageColor,ne=g.borderStyle,oe=g.borderWidth,le=g.borderRadius,re=g.borderColor,ie=g.columns,ue=g.bottomType,ce=g.bottomColor,be=g.bottomHeight,se=g.bottomHeightTablet,ge=g.bottomHeightMobile,me=g.bottomWidth,de=g.topType,fe=g.topColor,pe=g.topHeight,_e=g.topHeightTablet,ve=g.topHeightMobile,he=g.topWidth,Ce=g.bottomFlip,Oe=g.topFlip,ye=g.reverseTablet,Ee=g.reverseMobile,je=g.topDividerOpacity,Re=g.bottomDividerOpacity,we=g.topContentAboveShape,xe=g.bottomContentAboveShape,ke=g.mobileMarginType,Se=g.tabletMarginType,Pe=g.desktopMarginType,Te=g.mobilePaddingType,Ne=g.tabletPaddingType,Be=g.desktopPaddingType,Me=g.boxShadowColor,Ae=g.boxShadowHOffset,ze=g.boxShadowVOffset,Fe=g.boxShadowBlur,Ve=g.boxShadowSpread,He=g.boxShadowPosition;return r.a.createElement(l.Suspense,{fallback:Object(i.a)()},r.a.createElement(P.BlockControls,null,r.a.createElement(P.BlockAlignmentToolbar,{value:p,onChange:function(e){m({align:e})},controls:["wide","full"]}),r.a.createElement(P.BlockVerticalAlignmentToolbar,{value:_,onChange:function(e){m({vAlign:e})}})),r.a.createElement(P.InspectorControls,null,r.a.createElement(T.PanelBody,{title:Object(o.__)("Layout","ultimate-addons-for-gutenberg")},r.a.createElement(T.RangeControl,{label:Object(o.__)("Columns","ultimate-addons-for-gutenberg"),value:ie,min:0,max:6,onChange:function(e){return m({columns:e})}}),r.a.createElement(T.SelectControl,{label:Object(o.__)("Stack on","ultimate-addons-for-gutenberg"),value:f,options:[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"tablet",label:Object(o.__)("Tablet & Mobile","ultimate-addons-for-gutenberg")},{value:"mobile",label:Object(o.__)("Mobile","ultimate-addons-for-gutenberg")}],onChange:function(e){return m({stack:e})},help:Object(o.__)("Note: Choose on what breakpoint the columns will stack.","ultimate-addons-for-gutenberg")}),r.a.createElement(T.SelectControl,{label:Object(o.__)("Container Width","ultimate-addons-for-gutenberg"),value:v,onChange:function(e){return m({contentWidth:e})},options:[{value:"theme",label:Object(o.__)("Theme Container Width","ultimate-addons-for-gutenberg")},{value:"custom",label:Object(o.__)("Custom","ultimate-addons-for-gutenberg")}]}),"custom"==v&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===C,"aria-pressed":"px"===C,min:0,max:2e3,onClick:function(){return m({widthType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===C,"aria-pressed":"%"===C,min:0,max:100,onClick:function(){return m({widthType:"%"})}},"%")),r.a.createElement(T.RangeControl,{label:Object(o.__)("Inner Width","ultimate-addons-for-gutenberg"),value:h,min:0,max:"%"==C?100:2e3,onChange:function(e){return m({width:e})}})),r.a.createElement(k,{label:Object(o.__)("Column Gap","ultimate-addons-for-gutenberg"),currentOption:y,options:[{value:"10",label:Object(o.__)("Default","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Default (10px)","ultimate-addons-for-gutenberg")},{value:"0",label:Object(o.__)("None","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("No Gap (0px)","ultimate-addons-for-gutenberg")},{value:"5",label:Object(o.__)("S","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Narrow (5px)","ultimate-addons-for-gutenberg")},{value:"15",label:Object(o.__)("M","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Extended (15px)","ultimate-addons-for-gutenberg")},{value:"20",label:Object(o.__)("L","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Wide (20px)","ultimate-addons-for-gutenberg")},{value:"30",label:Object(o.__)("XL","ultimate-addons-for-gutenberg"),tooltip:Object(o.__)("Wider (30px)","ultimate-addons-for-gutenberg")}],onChange:function(e){return m({columnGap:e})},help:Object(o.__)("Note: The individual Column Gap can be managed from Column Settings.","ultimate-addons-for-gutenberg")}),r.a.createElement(T.SelectControl,{label:Object(o.__)("HTML Tag","ultimate-addons-for-gutenberg"),value:O,onChange:function(e){return m({tag:e})},options:[{value:"div",label:Object(o.__)("div","ultimate-addons-for-gutenberg")},{value:"header",label:Object(o.__)("header","ultimate-addons-for-gutenberg")},{value:"footer",label:Object(o.__)("footer","ultimate-addons-for-gutenberg")},{value:"main",label:Object(o.__)("main","ultimate-addons-for-gutenberg")},{value:"article",label:Object(o.__)("article","ultimate-addons-for-gutenberg")},{value:"section",label:Object(o.__)("section","ultimate-addons-for-gutenberg")},{value:"aside",label:Object(o.__)("aside","ultimate-addons-for-gutenberg")},{value:"nav",label:Object(o.__)("nav","ultimate-addons-for-gutenberg")}]}),r.a.createElement(T.ToggleControl,{label:Object(o.__)("Reverse Columns (Tablet & Mobile)","ultimate-addons-for-gutenberg"),checked:ye,onChange:function(e){return m({reverseTablet:!ye})}}),r.a.createElement(T.ToggleControl,{label:Object(o.__)("Reverse Columns (Mobile)","ultimate-addons-for-gutenberg"),checked:Ee,onChange:function(e){return m({reverseMobile:!Ee})}})),r.a.createElement(T.PanelBody,{title:Object(o.__)("Spacing"),initialOpen:!1},r.a.createElement(c.default,null),"Desktop"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===Be,"aria-pressed":"px"===Be,onClick:function(){return m({desktopPaddingType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===Be,"aria-pressed":"%"===Be,onClick:function(){return m({desktopPaddingType:"%"})}},"%")),r.a.createElement("h2",null,Object(o.__)("Padding")),r.a.createElement(T.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:B,onChange:function(e){return m({topPadding:e})},min:0,max:"%"==Be?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:M,onChange:function(e){return m({bottomPadding:e})},min:0,max:"%"==Be?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.left_margin,className:"uagb-margin-control",value:A,onChange:function(e){return m({leftPadding:e})},min:0,max:"%"==Be?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.right_margin,className:"uagb-margin-control",value:z,onChange:function(e){return m({rightPadding:e})},min:0,max:"%"==Be?100:2e3,allowReset:!0})),"Tablet"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===Ne,"aria-pressed":"px"===Ne,onClick:function(){return m({tabletPaddingType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===Ne,"aria-pressed":"%"===Ne,onClick:function(){return m({tabletPaddingType:"%"})}},"%")),r.a.createElement("h2",null,Object(o.__)("Padding","ultimate-addons-for-gutenberg")),r.a.createElement(T.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:F,onChange:function(e){return m({topPaddingTablet:e})},min:0,max:"%"==Ne?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:V,onChange:function(e){return m({bottomPaddingTablet:e})},min:0,max:"%"==Ne?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.left_margin,className:"uagb-margin-control",value:H,onChange:function(e){return m({leftPaddingTablet:e})},min:0,max:"%"==Ne?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.right_margin,className:"uagb-margin-control",value:D,onChange:function(e){return m({rightPaddingTablet:e})},min:0,max:"%"==Ne?100:2e3,allowReset:!0})),"Mobile"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===Te,"aria-pressed":"px"===Te,onClick:function(){return m({mobilePaddingType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===Te,"aria-pressed":"%"===Te,onClick:function(){return m({mobilePaddingType:"%"})}},"%")),r.a.createElement("h2",null,Object(o.__)("Padding","ultimate-addons-for-gutenberg")),r.a.createElement(T.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:I,onChange:function(e){return m({topPaddingMobile:e})},min:0,max:"%"==Te?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:L,onChange:function(e){return m({bottomPaddingMobile:e})},min:0,max:"%"==Te?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.left_margin,className:"uagb-margin-control",value:W,onChange:function(e){return m({leftPaddingMobile:e})},min:0,max:"%"==Te?100:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.right_margin,className:"uagb-margin-control",value:G,onChange:function(e){return m({rightPaddingMobile:e})},min:0,max:"%"==Te?100:2e3,allowReset:!0})),r.a.createElement("hr",{className:"uagb-editor__separator"}),r.a.createElement(c.default,null),"Desktop"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===Pe,"aria-pressed":"px"===Pe,onClick:function(){return m({desktopMarginType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===Pe,"aria-pressed":"%"===Pe,onClick:function(){return m({desktopMarginType:"%"})}},"%")),r.a.createElement("h2",null,Object(o.__)("Margin","ultimate-addons-for-gutenberg")),r.a.createElement(T.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:E,onChange:function(e){return m({topMargin:e})},min:-2e3,max:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:j,onChange:function(e){return m({bottomMargin:e})},min:-2e3,max:2e3,allowReset:!0})),"Tablet"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===Se,"aria-pressed":"px"===Se,onClick:function(){return m({tabletMarginType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===Se,"aria-pressed":"%"===Se,onClick:function(){return m({tabletMarginType:"%"})}},"%")),r.a.createElement("h2",null,Object(o.__)("Margin Tablet","ultimate-addons-for-gutenberg")),r.a.createElement(T.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:x,onChange:function(e){return m({topMarginTablet:e})},min:-2e3,max:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:N,onChange:function(e){return m({bottomMarginTablet:e})},min:-2e3,max:2e3,allowReset:!0})),"Mobile"===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(o.__)("Size Type","ultimate-addons-for-gutenberg")},r.a.createElement(T.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===ke,"aria-pressed":"px"===ke,onClick:function(){return m({mobileMarginType:"px"})}},"px"),r.a.createElement(T.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===ke,"aria-pressed":"%"===ke,onClick:function(){return m({mobileMarginType:"%"})}},"%")),r.a.createElement("h2",null,Object(o.__)("Margin Mobile","ultimate-addons-for-gutenberg")),r.a.createElement(T.RangeControl,{label:n.a.top_margin,className:"uagb-margin-control",value:R,onChange:function(e){return m({topMarginMobile:e})},min:-2e3,max:2e3,allowReset:!0}),r.a.createElement(T.RangeControl,{label:n.a.bottom_margin,className:"uagb-margin-control",value:w,onChange:function(e){return m({bottomMarginMobile:e})},min:-2e3,max:2e3,allowReset:!0}))),r.a.createElement(T.PanelBody,{title:Object(o.__)("Background","ultimate-addons-for-gutenberg"),initialOpen:!1},r.a.createElement(T.SelectControl,{label:Object(o.__)("Background Type","ultimate-addons-for-gutenberg"),value:U,onChange:function(e){return m({backgroundType:e})},options:[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"color",label:Object(o.__)("Color","ultimate-addons-for-gutenberg")},{value:"gradient",label:Object(o.__)("Gradient","ultimate-addons-for-gutenberg")},{value:"image",label:Object(o.__)("Image","ultimate-addons-for-gutenberg")},{value:"video",label:Object(o.__)("Video","ultimate-addons-for-gutenberg")}]}),"color"==U&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Background Color","ultimate-addons-for-gutenberg"),r.a.createElement("span",{className:"components-base-control__label"},r.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Z}}))),r.a.createElement(P.ColorPalette,{value:Z,onChange:function(e){return m({backgroundColor:e})},allowReset:!0})),"image"==U&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.BaseControl,{className:"editor-bg-image-control",label:Object(o.__)("Background Image","ultimate-addons-for-gutenberg")},r.a.createElement(P.MediaUpload,{title:Object(o.__)("Select Background Image","ultimate-addons-for-gutenberg"),onSelect:function(t){var a=e.parentProps.setAttributes;t&&t.url?t.type&&"image"==t.type&&a({backgroundImage:t}):a({backgroundImage:null})},allowedTypes:["image"],value:J,render:function(e){var t=e.open;return r.a.createElement(T.Button,{isSecondary:!0,onClick:t},J?Object(o.__)("Replace image","ultimate-addons-for-gutenberg"):Object(o.__)("Select Background Image","ultimate-addons-for-gutenberg"))}}),J&&r.a.createElement(T.Button,{className:"uagb-rm-btn",onClick:function(){(0,e.parentProps.setAttributes)({backgroundImage:null})},isLink:!0,isDestructive:!0},Object(o.__)("Remove Image","ultimate-addons-for-gutenberg"))),J&&r.a.createElement(r.a.Fragment,null,r.a.createElement(T.SelectControl,{label:Object(o.__)("Image Position","ultimate-addons-for-gutenberg"),value:$,onChange:function(e){return m({backgroundPosition:e})},options:[{value:"top-left",label:Object(o.__)("Top Left","ultimate-addons-for-gutenberg")},{value:"top-center",label:Object(o.__)("Top Center","ultimate-addons-for-gutenberg")},{value:"top-right",label:Object(o.__)("Top Right","ultimate-addons-for-gutenberg")},{value:"center-left",label:Object(o.__)("Center Left","ultimate-addons-for-gutenberg")},{value:"center-center",label:Object(o.__)("Center Center","ultimate-addons-for-gutenberg")},{value:"center-right",label:Object(o.__)("Center Right","ultimate-addons-for-gutenberg")},{value:"bottom-left",label:Object(o.__)("Bottom Left","ultimate-addons-for-gutenberg")},{value:"bottom-center",label:Object(o.__)("Bottom Center","ultimate-addons-for-gutenberg")},{value:"bottom-right",label:Object(o.__)("Bottom Right","ultimate-addons-for-gutenberg")}]}),r.a.createElement(T.SelectControl,{label:Object(o.__)("Attachment","ultimate-addons-for-gutenberg"),value:q,onChange:function(e){return m({backgroundAttachment:e})},options:[{value:"fixed",label:Object(o.__)("Fixed","ultimate-addons-for-gutenberg")},{value:"scroll",label:Object(o.__)("Scroll","ultimate-addons-for-gutenberg")}]}),r.a.createElement(T.SelectControl,{label:Object(o.__)("Repeat","ultimate-addons-for-gutenberg"),value:K,onChange:function(e){return m({backgroundRepeat:e})},options:[{value:"no-repeat",label:Object(o.__)("No Repeat","ultimate-addons-for-gutenberg")},{value:"repeat",label:Object(o.__)("Repeat","ultimate-addons-for-gutenberg")},{value:"repeat-x",label:Object(o.__)("Repeat-x","ultimate-addons-for-gutenberg")},{value:"repeat-y",label:Object(o.__)("Repeat-y","ultimate-addons-for-gutenberg")}]}),r.a.createElement(T.SelectControl,{label:Object(o.__)("Size","ultimate-addons-for-gutenberg"),value:Q,onChange:function(e){return m({backgroundSize:e})},options:[{value:"auto",label:Object(o.__)("Auto","ultimate-addons-for-gutenberg")},{value:"cover",label:Object(o.__)("Cover","ultimate-addons-for-gutenberg")},{value:"contain",label:Object(o.__)("Contain","ultimate-addons-for-gutenberg")}]}),r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Image Overlay Color","ultimate-addons-for-gutenberg"),r.a.createElement("span",{className:"components-base-control__label"},r.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:ae}}))),r.a.createElement(P.ColorPalette,{value:ae,onChange:function(e){return m({backgroundImageColor:e})},allowReset:!0})))),"gradient"==U&&r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,{attributes:g,setAttributes:m})),"video"==U&&r.a.createElement(T.BaseControl,{className:"editor-bg-video-control",label:Object(o.__)("Background Video","ultimate-addons-for-gutenberg")},r.a.createElement(P.MediaUpload,{title:Object(o.__)("Select Background Video","ultimate-addons-for-gutenberg"),onSelect:function(t){var a=e.parentProps.setAttributes;t&&t.url?t.type&&"video"==t.type&&a({backgroundVideo:t}):a({backgroundVideo:null})},allowedTypes:["video"],value:X,render:function(e){var t=e.open;return r.a.createElement(T.Button,{isSecondary:!0,onClick:t},X?Object(o.__)("Replace Video","ultimate-addons-for-gutenberg"):Object(o.__)("Select Background Video","ultimate-addons-for-gutenberg"))}}),X&&r.a.createElement(T.Button,{onClick:function(){(0,e.parentProps.setAttributes)({backgroundVideo:null})},isLink:!0,isDestructive:!0},Object(o.__)("Remove Video","ultimate-addons-for-gutenberg"))),("color"==U||"image"==U&&J||"gradient"==U)&&r.a.createElement(T.RangeControl,{label:Object(o.__)("Opacity","ultimate-addons-for-gutenberg"),value:Y,onChange:function(e){return m({backgroundOpacity:e})},min:0,max:100,allowReset:!0,initialPosition:0}),"video"==U&&X&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Video Overlay Color","ultimate-addons-for-gutenberg"),r.a.createElement("span",{className:"components-base-control__label"},r.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:ee}}))),r.a.createElement(P.ColorPalette,{value:ee,onChange:function(e){return m({backgroundVideoColor:e})},allowReset:!0})),"video"==U&&X&&r.a.createElement(T.RangeControl,{label:Object(o.__)("Opacity","ultimate-addons-for-gutenberg"),value:te,onChange:function(e){return m({backgroundVideoOpacity:e})},min:0,max:100,allowReset:!0,initialPosition:50})),(t=[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"tilt",label:Object(o.__)("Tilt","ultimate-addons-for-gutenberg")},{value:"mountains",label:Object(o.__)("Mountains","ultimate-addons-for-gutenberg")},{value:"wave_brush",label:Object(o.__)("Wave Brush","ultimate-addons-for-gutenberg")},{value:"waves",label:Object(o.__)("Waves","ultimate-addons-for-gutenberg")},{value:"wave_pattern",label:Object(o.__)("Waves Pattern","ultimate-addons-for-gutenberg")},{value:"triangle",label:Object(o.__)("Triangle","ultimate-addons-for-gutenberg")},{value:"drops",label:Object(o.__)("Drops","ultimate-addons-for-gutenberg")},{value:"clouds",label:Object(o.__)("Clouds","ultimate-addons-for-gutenberg")},{value:"zigzag",label:Object(o.__)("ZigZag","ultimate-addons-for-gutenberg")},{value:"pyramids",label:Object(o.__)("Pyramids","ultimate-addons-for-gutenberg")},{value:"triangle_asymmetrical",label:Object(o.__)("Triangle Asymmetrical","ultimate-addons-for-gutenberg")},{value:"tilt_opacity",label:Object(o.__)("Tilt Opacity","ultimate-addons-for-gutenberg")},{value:"fan_opacity",label:Object(o.__)("Fan Opacity","ultimate-addons-for-gutenberg")},{value:"curve",label:Object(o.__)("Curve","ultimate-addons-for-gutenberg")},{value:"curve_asymmetrical",label:Object(o.__)("Curve Asymmetrical","ultimate-addons-for-gutenberg")},{value:"curve_reverse",label:Object(o.__)("Curve Reverse","ultimate-addons-for-gutenberg")},{value:"curve_asym_reverse",label:Object(o.__)("Curve Asymmetrical Reverse","ultimate-addons-for-gutenberg")},{value:"arrow",label:Object(o.__)("Arrow","ultimate-addons-for-gutenberg")},{value:"arrow_split",label:Object(o.__)("Arrow Split","ultimate-addons-for-gutenberg")},{value:"book",label:Object(o.__)("Book","ultimate-addons-for-gutenberg")}],a=r.a.createElement(r.a.Fragment,null,r.a.createElement(T.SelectControl,{label:Object(o.__)("Type","ultimate-addons-for-gutenberg"),value:de,onChange:function(e){return m({topType:e})},options:t}),"none"!=de&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Color","ultimate-addons-for-gutenberg"),r.a.createElement("span",{className:"components-base-control__label"},r.a.createElement("span",{className:"component-color-indicator",style:{topColor:fe}}))),r.a.createElement(P.ColorPalette,{value:fe,onChange:function(e){return m({topColor:e})},allowReset:!0}),r.a.createElement(T.RangeControl,{label:Object(o.__)("Opacity","ultimate-addons-for-gutenberg"),value:je,onChange:function(e){return m({topDividerOpacity:e})},min:0,max:100,allowReset:!0}),r.a.createElement(T.RangeControl,{label:Object(o.__)("Width","ultimate-addons-for-gutenberg"),value:he,onChange:function(e){return m({topWidth:e})},min:100,max:2e3,allowReset:!0}),r.a.createElement(T.TabPanel,{className:"uagb-size-type-field-tabs uagb-without-size-type",activeClass:"active-tab",tabs:[{name:"desktop",title:r.a.createElement(T.Dashicon,{icon:"desktop"}),className:"uagb-desktop-tab uagb-responsive-tabs"},{name:"tablet",title:r.a.createElement(T.Dashicon,{icon:"tablet"}),className:"uagb-tablet-tab uagb-responsive-tabs"},{name:"mobile",title:r.a.createElement(T.Dashicon,{icon:"smartphone"}),className:"uagb-mobile-tab uagb-responsive-tabs"}]},(function(e){var t;return t="mobile"===e.name?r.a.createElement(T.RangeControl,{label:Object(o.__)("Height","ultimate-addons-for-gutenberg"),value:ve,onChange:function(e){return m({topHeightMobile:e})},min:0,max:500,allowReset:!0}):"tablet"===e.name?r.a.createElement(T.RangeControl,{label:Object(o.__)("Height","ultimate-addons-for-gutenberg"),value:_e,onChange:function(e){return m({topHeightTablet:e})},min:0,max:500,allowReset:!0}):r.a.createElement(T.RangeControl,{label:Object(o.__)("Height","ultimate-addons-for-gutenberg"),value:pe,onChange:function(e){return m({topHeight:e})},min:0,max:500,allowReset:!0}),r.a.createElement("div",null,t)})),r.a.createElement(T.ToggleControl,{label:Object(o.__)("Flip","ultimate-addons-for-gutenberg"),checked:Oe,onChange:function(e){return m({topFlip:!Oe})}}),r.a.createElement(T.ToggleControl,{label:Object(o.__)("Bring To Front","ultimate-addons-for-gutenberg"),checked:we,onChange:function(e){return m({topContentAboveShape:!we})}}))),b=r.a.createElement(r.a.Fragment,null,r.a.createElement(T.SelectControl,{label:Object(o.__)("Type","ultimate-addons-for-gutenberg"),value:ue,onChange:function(e){return m({bottomType:e})},options:t}),"none"!=ue&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Color","ultimate-addons-for-gutenberg"),r.a.createElement("span",{className:"components-base-control__label"},r.a.createElement("span",{className:"component-color-indicator",style:{bottomColor:ce}}))),r.a.createElement(P.ColorPalette,{value:ce,onChange:function(e){return m({bottomColor:e})},allowReset:!0}),r.a.createElement(T.RangeControl,{label:Object(o.__)("Opacity","ultimate-addons-for-gutenberg"),value:Re,onChange:function(e){return m({bottomDividerOpacity:e})},min:0,max:100,allowReset:!0}),r.a.createElement(T.RangeControl,{label:Object(o.__)("Width","ultimate-addons-for-gutenberg"),value:me,onChange:function(e){return m({bottomWidth:e})},min:100,max:2e3,allowReset:!0}),r.a.createElement(T.TabPanel,{className:"uagb-size-type-field-tabs uagb-without-size-type",activeClass:"active-tab",tabs:[{name:"desktop",title:r.a.createElement(T.Dashicon,{icon:"desktop"}),className:"uagb-desktop-tab uagb-responsive-tabs"},{name:"tablet",title:r.a.createElement(T.Dashicon,{icon:"tablet"}),className:"uagb-tablet-tab uagb-responsive-tabs"},{name:"mobile",title:r.a.createElement(T.Dashicon,{icon:"smartphone"}),className:"uagb-mobile-tab uagb-responsive-tabs"}]},(function(e){var t;return t="mobile"===e.name?r.a.createElement(T.RangeControl,{label:Object(o.__)("Height","ultimate-addons-for-gutenberg"),value:ge,onChange:function(e){return m({bottomHeightMobile:e})},min:0,max:500,allowReset:!0}):"tablet"===e.name?r.a.createElement(T.RangeControl,{label:Object(o.__)("Height","ultimate-addons-for-gutenberg"),value:se,onChange:function(e){return m({bottomHeightTablet:e})},min:0,max:500,allowReset:!0}):r.a.createElement(T.RangeControl,{label:Object(o.__)("Height","ultimate-addons-for-gutenberg"),value:be,onChange:function(e){return m({bottomHeight:e})},min:0,max:500,allowReset:!0}),r.a.createElement("div",null,t)})),r.a.createElement(T.ToggleControl,{label:Object(o.__)("Flip","ultimate-addons-for-gutenberg"),checked:Ce,onChange:function(e){return m({bottomFlip:!Ce})}}),r.a.createElement(T.ToggleControl,{label:Object(o.__)("Bring To Front","ultimate-addons-for-gutenberg"),checked:xe,onChange:function(e){return m({bottomContentAboveShape:!xe})}}))),r.a.createElement(T.PanelBody,{title:Object(o.__)("Shape Dividers","ultimate-addons-for-gutenberg"),initialOpen:!1},r.a.createElement(T.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"top",title:Object(o.__)("Top","ultimate-addons-for-gutenberg"),className:"uagb-top-tab"},{name:"bottom",title:Object(o.__)("Bottom","ultimate-addons-for-gutenberg"),className:"uagb-bottom-tab"}]},(function(e){var t;return t="bottom"===e.name?b:a,r.a.createElement("div",null,t)})))),r.a.createElement(T.PanelBody,{title:Object(o.__)("Border","ultimate-addons-for-gutenberg"),initialOpen:!1},r.a.createElement(T.SelectControl,{label:Object(o.__)("Border Style","ultimate-addons-for-gutenberg"),value:ne,onChange:function(e){return m({borderStyle:e})},options:[{value:"none",label:Object(o.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(o.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(o.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(o.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"double",label:Object(o.__)("Double","ultimate-addons-for-gutenberg")},{value:"groove",label:Object(o.__)("Groove","ultimate-addons-for-gutenberg")},{value:"inset",label:Object(o.__)("Inset","ultimate-addons-for-gutenberg")},{value:"outset",label:Object(o.__)("Outset","ultimate-addons-for-gutenberg")},{value:"ridge",label:Object(o.__)("Ridge","ultimate-addons-for-gutenberg")}]}),"none"!=ne&&r.a.createElement(T.RangeControl,{label:Object(o.__)("Border Width","ultimate-addons-for-gutenberg"),value:oe,onChange:function(e){return m({borderWidth:e})},min:0,max:50,allowReset:!0}),r.a.createElement(T.RangeControl,{label:Object(o.__)("Border Radius","ultimate-addons-for-gutenberg"),value:le,onChange:function(e){return m({borderRadius:e})},min:0,max:1e3,allowReset:!0}),"none"!=ne&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"uagb-setting-label"},Object(o.__)("Border Color","ultimate-addons-for-gutenberg"),r.a.createElement("span",{className:"components-base-control__label"},r.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:re}}))),r.a.createElement(P.ColorPalette,{value:re,onChange:function(e){return m({borderColor:e})},allowReset:!0})),r.a.createElement(S.a,{setAttributes:m,label:Object(o.__)("Box Shadow","ultimate-addons-for-gutenberg"),boxShadowColor:{value:Me,label:Object(o.__)("Color","ultimate-addons-for-gutenberg")},boxShadowHOffset:{value:Ae,label:Object(o.__)("Horizontal","ultimate-addons-for-gutenberg")},boxShadowVOffset:{value:ze,label:Object(o.__)("Vertical","ultimate-addons-for-gutenberg")},boxShadowBlur:{value:Fe,label:Object(o.__)("Blur","ultimate-addons-for-gutenberg")},boxShadowSpread:{value:Ve,label:Object(o.__)("Spread","ultimate-addons-for-gutenberg")},boxShadowPosition:{value:He,label:Object(o.__)("Position","ultimate-addons-for-gutenberg")}}))))};t.default=r.a.memo(N)}}]);