(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{347:function(e,a,t){"use strict";t.r(a);var n=t(2),l=t.n(n),d=t(1),i=t.n(d),r=function(e){var a=(e=e.parentProps).attributes,t=a.block_id,n=a.hidden_field_name,d=a.hidden_field_value,r=n.replace(/\s+/g,"-").toLowerCase();return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:l()("uagb-forms-hidden-wrap","uagb-block-".concat(t))},e.isSelected&&i.a.createElement("input",{type:"text",className:"uagb-forms-hidden-input",onChange:function(a){(0,e.setAttributes)({hidden_field_name:a.target.value})},value:n}),!e.isSelected&&i.a.createElement(i.a.Fragment,null,i.a.createElement("label",{className:"uagb-forms-hidden-label uagb-form-hidden-".concat(r)},n),i.a.createElement("input",{type:"hidden",className:"uagb-forms-hidden-input",value:d}))))};a.default=i.a.memo(r)}}]);