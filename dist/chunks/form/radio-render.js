(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[40],{267:function(e,t,n){"use strict";var a=n(19),r=n.n(a)()((function(e){return e[1]}));r.push([e.i,"",""]),t.a=r},552:function(e,t,n){"use strict";n.r(t);var a,r=n(15),o=n.n(r),i=n(3),l=n.n(i),u=n(2),c=n(18),s=n.n(c),p=n(267),m=0,d={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},b={};b.locals=p.a.locals||{},b.use=function(){return m++||(a=s()(p.a,d)),b},b.unuse=function(){m>0&&!--m&&(a(),a=null)};var f=b;function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=wp.components,y=E.Button,_=E.ToggleControl,h=wp.blockEditor.RichText,j=function(e){Object(i.useLayoutEffect)((function(){return f.use(),function(){f.unuse()}}),[]);var t=e.setState,n=e=e.parentProps,a=n.attributes,r=n.setAttributes,c=n.isSelected,s=a.block_id,p=a.radioRequired,m=a.options,d=a.radioName,b=m.map((function(e,t){return l.a.createElement("div",{key:t,className:"uagb-form-radio-option"},l.a.createElement("input",{type:"radio",name:"radio-".concat(s),value:e.optiontitle,id:e.optiontitle}),l.a.createElement("label",{htmlFor:e.optiontitle}),l.a.createElement("input",{className:"uagb-inner-input-view","aria-label":e.optiontitle,onChange:function(e){return O({optiontitle:e.target.value,optionvalue:e.target.value},t)},type:"text",value:e.optiontitle}),l.a.createElement("input",{className:"uagb-inner-input-view","aria-label":e.optionvalue,onChange:function(e){return O({optionvalue:e.target.value},t)},type:"text",value:e.optionvalue}),l.a.createElement(y,{className:"uagb-form-radio-option-delete",icon:"trash",label:"Remove",onClick:function(){return E(t)}}))})),g=function(){return m.map((function(e,t){var n=e.optionvalue,a=n.replace(/\s+/g,"-").toLowerCase();return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"radio",id:a,name:s,value:n,required:p}),l.a.createElement("label",{htmlFor:a},e.optiontitle),l.a.createElement("br",null))}))},O=function(e,n){var a=m.map((function(t,a){return n===a&&(t=v(v({},t),e)),t}));r({options:a}),t({optionsstate:a})},E=function(e){var n=m.map((function(t,n){return e===n&&(m.splice(e,1),t={options:m}),t}));t({optionsstate:n}),r({deleteOptions:n})},j=p?Object(u.__)("required","ultimate-addons-for-gutenberg"):"";return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:o()("uagb-forms-radio-wrap","uagb-forms-field-set","uagb-block-".concat(s))},c&&l.a.createElement("div",{className:"uagb-forms-required-wrap"},l.a.createElement(_,{label:Object(u.__)("Required","ultimate-addons-for-gutenberg"),checked:p,onChange:function(){return r({radioRequired:!p})}})),l.a.createElement(h,{tagName:"div",placeholder:Object(u.__)("Radio Title","ultimate-addons-for-gutenberg"),value:d,onChange:function(e){return r({radioName:e})},className:"uagb-forms-radio-label ".concat(j," uagb-forms-input-label"),multiline:!1,id:s}),c&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"uagb-forms-radio-controls"},b,l.a.createElement("div",null,l.a.createElement(y,{isSecondary:!0,onClick:function(){var e={optiontitle:Object(u.__)("Option Name ","ultimate-addons-for-gutenberg")+"".concat(m.length+1),optionvalue:Object(u.__)("Option Value ","ultimate-addons-for-gutenberg")+"".concat(m.length+1)};m[m.length]=e;var n=m.map((function(e){return e}));r({options:n}),t({optionsstate:n})}},Object(u.__)(" + Add Option ","ultimate-addons-for-gutenberg"))))),!c&&l.a.createElement(g,null)))};t.default=l.a.memo(j)}}]);