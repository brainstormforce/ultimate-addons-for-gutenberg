(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{360:function(e,a,t){"use strict";t.r(a);var r=t(2),n=t.n(r),l=t(1),o=t.n(l),u=t(0),i=wp.blockEditor.RichText,c=wp.components.ToggleControl,m=function(e){var a=e=e.parentProps,t=a.attributes,r=a.setAttributes,l=a.isSelected,m=t.block_id,s=t.name,d=t.required,b=t.placeholder,g=d?Object(u.__)("required","ultimate-addons-for-gutenberg"):"";return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:n()("uagb-forms-email-wrap","uagb-forms-field-set","uagb-block-".concat(m))},l&&o.a.createElement("div",{className:"uagb-forms-required-wrap"},o.a.createElement(c,{label:Object(u.__)("Required","ultimate-addons-for-gutenberg"),checked:d,onChange:function(){return r({required:!d})}})),o.a.createElement(i,{tagName:"div",placeholder:Object(u.__)("Email","ultimate-addons-for-gutenberg"),value:s,onChange:function(e){return r({name:e})},className:"uagb-forms-email-label ".concat(g," uagb-forms-input-label"),multiline:!1,id:m}),o.a.createElement("input",{type:"text",className:"uagb-forms-email-input uagb-forms-input",placeholder:b,required:d,name:m})))};a.default=o.a.memo(m)}}]);