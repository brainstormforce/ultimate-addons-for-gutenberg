(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{427:function(e,a,t){"use strict";t.r(a);var r=t(3),n=t.n(r),u=t(2),l=t.n(u),o=t(0),c=wp.components.ToggleControl,i=wp.blockEditor.RichText,m=function(e){var a=e=e.parentProps,t=a.attributes,r=a.setAttributes,u=a.isSelected,m=t.block_id,s=t.required,d=t.name,b=t.placeholder,g=s?Object(o.__)("required","ultimate-addons-for-gutenberg"):"";return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:n()("uagb-forms-url-wrap","uagb-forms-field-set","uagb-block-".concat(m))},u&&l.a.createElement("div",{className:"uagb-forms-required-wrap"},l.a.createElement(c,{label:Object(o.__)("Required","ultimate-addons-for-gutenberg"),checked:s,onChange:function(){return r({required:!s})}})),l.a.createElement(i,{tagName:"div",placeholder:Object(o.__)("URL Name","ultimate-addons-for-gutenberg"),value:d,onChange:function(e){return r({name:e})},className:"uagb-forms-url-label ".concat(g," uagb-forms-input-label"),multiline:!1,id:m}),l.a.createElement("input",{type:"url",name:m,placeholder:b,required:s,className:"uagb-forms-url-input uagb-forms-input"})))};a.default=l.a.memo(m)}}]);