(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{387:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t.n(n),o=t(77),u=t(1),c=t.n(u),l=t(0),m=wp.components.ToggleControl,i=wp.blockEditor.RichText,p=function(e){var a,t=e=e.parentProps,n=t.attributes,u=t.setAttributes,p=t.isSelected,s=n.block_id,b=n.phoneRequired,d=n.phoneName,g=n.pattern;a=""!=g?c.a.createElement("input",{type:"tel",placeholder:f,pattern:g,required:b,className:"uagb-forms-phone-input uagb-forms-input",name:s}):c.a.createElement("input",{type:"tel",required:b,className:"uagb-forms-phone-input uagb-forms-input",name:s});var f="";"[0-9]{3}-[0-9]{2}-[0-9]{3}"==g?f=Object(l.__)("123-45-678","ultimate-addons-for-gutenberg"):"[0-9]{3}-[0-9]{3}-[0-9]{4}"==g&&(f=Object(l.__)("123-456-6789","ultimate-addons-for-gutenberg"));var h=b?Object(l.__)("required","ultimate-addons-for-gutenberg"):"";return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:r()("uagb-forms-phone-wrap","uagb-forms-field-set","uagb-block-".concat(s))},p&&c.a.createElement("div",{className:"uagb-forms-required-wrap"},c.a.createElement(m,{label:Object(l.__)("Required","ultimate-addons-for-gutenberg"),checked:b,onChange:function(){return u({phoneRequired:!b})}})),c.a.createElement(i,{tagName:"div",placeholder:Object(l.__)("Phone Name","ultimate-addons-for-gutenberg"),value:d,onChange:function(e){return u({phoneName:e})},className:"uagb-forms-phone-label ".concat(h," uagb-forms-input-label"),multiline:!1,id:s}),c.a.createElement("select",{className:"uagb-forms-input uagb-form-phone-country uagb-form-phone-country-editor",id:"uagb-form-country-".concat(s),name:"".concat(d,"[]")},o.a.map((function(e,a){return c.a.createElement("option",{value:e.props.value,key:a},e.props.children)}))),a))};a.default=c.a.memo(p)}}]);