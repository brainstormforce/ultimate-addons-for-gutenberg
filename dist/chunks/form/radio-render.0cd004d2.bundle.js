(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{350:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(3),i=n.n(o),l=n(0);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=wp.components,m=s.Button,b=s.ToggleControl,d=wp.blockEditor.RichText,g=function(e){var t=e.setState,n=e=e.parentProps,a=n.attributes,o=n.setAttributes,u=n.isSelected,p=a.block_id,s=a.radioRequired,g=a.options,f=a.radioName,v=g.map((function(e,t){return i.a.createElement("div",{key:t,className:"uagb-form-radio-option"},i.a.createElement("input",{type:"radio",name:"radio-".concat(p),value:e.optiontitle,id:e.optiontitle}),i.a.createElement("label",{htmlFor:e.optiontitle}),i.a.createElement("input",{className:"uagb-inner-input-view","aria-label":e.optiontitle,onChange:function(e){return E({optiontitle:e.target.value,optionvalue:e.target.value},t)},type:"text",value:e.optiontitle}),i.a.createElement("input",{className:"uagb-inner-input-view","aria-label":e.optionvalue,onChange:function(e){return E({optionvalue:e.target.value},t)},type:"text",value:e.optionvalue}),i.a.createElement(m,{className:"uagb-form-radio-option-delete",icon:"trash",label:"Remove",onClick:function(){return w(t)}}))})),O=function(){return g.map((function(e,t){var n=e.optionvalue,a=n.replace(/\s+/g,"-").toLowerCase();return i.a.createElement(i.a.Fragment,null,i.a.createElement("input",{type:"radio",id:a,name:p,value:n,required:s}),i.a.createElement("label",{htmlFor:a},e.optiontitle),i.a.createElement("br",null))}))},E=function(e,n){var a=g.map((function(t,a){return n===a&&(t=c(c({},t),e)),t}));o({options:a}),t({optionsstate:a})},w=function(e){var n=g.map((function(t,n){return e===n&&(g.splice(e,1),t={options:g}),t}));t({optionsstate:n}),o({deleteOptions:n})},h=s?Object(l.__)("required","ultimate-addons-for-gutenberg"):"";return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:r()("uagb-forms-radio-wrap","uagb-forms-field-set","uagb-block-".concat(p))},u&&i.a.createElement("div",{className:"uagb-forms-required-wrap"},i.a.createElement(b,{label:Object(l.__)("Required","ultimate-addons-for-gutenberg"),checked:s,onChange:function(){return o({radioRequired:!s})}})),i.a.createElement(d,{tagName:"div",placeholder:Object(l.__)("Radio Title","ultimate-addons-for-gutenberg"),value:f,onChange:function(e){return o({radioName:e})},className:"uagb-forms-radio-label ".concat(h," uagb-forms-input-label"),multiline:!1,id:p}),u&&i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"uagb-forms-radio-controls"},v,i.a.createElement("div",null,i.a.createElement(m,{isSecondary:!0,onClick:function(){var e={optiontitle:Object(l.__)("Option Name ","ultimate-addons-for-gutenberg")+"".concat(g.length+1),optionvalue:Object(l.__)("Option Value ","ultimate-addons-for-gutenberg")+"".concat(g.length+1)};g[g.length]=e;var n=g.map((function(e){return e}));o({options:n}),t({optionsstate:n})}},Object(l.__)(" + Add Option ","ultimate-addons-for-gutenberg"))))),!u&&i.a.createElement(O,null)))};t.default=i.a.memo(g)}}]);