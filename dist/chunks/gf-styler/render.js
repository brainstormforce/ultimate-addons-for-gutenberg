(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{408:function(e,t,a){"use strict";a.r(t);var l=a(3),n=a.n(l),r=a(5),c=a(1);t.default=React.memo((function(e){var t=e=e.parentProps,a=t.className,l=t.attributes,o=t.setAttributes,s=l.formId,i=l.align,g=l.isHtml,d=l.formJson,u=l.titleDescStyle,b=l.fieldStyle,m=l.buttonAlignment,f=l.enableLabel,_=l.enableOveride,y=l.advancedValidationSettings,p="";return d&&d.data.html&&(p=d.data.html),0==s?React.createElement(r.Placeholder,{icon:"admin-post",label:Object(c.__)("Select a Gravity Form","ultimate-addons-for-gutenberg")},React.createElement(r.SelectControl,{value:s,onChange:function(e){if(!e)return o({isHtml:!1}),void o({formId:null});o({isHtml:!1}),o({formId:e})},options:uagb_blocks_info.gf_forms})):React.createElement("div",{className:n()(a,"uagb-gf-styler__outer-wrap","uagb-block-".concat(e.clientId.substr(0,8)))},React.createElement("div",{className:n()("uagb-gf-styler__align-".concat(i),"uagb-gf-styler__field-style-".concat(b),"uagb-gf-styler__btn-align-".concat(m),"uagb-gf-styler__gform-heading-".concat(u),_?"uagb-gf-styler__check-style-enabled":"",f?"uagb-gf-styler__hide-label":"",y?"uagb-gf-styler__error-yes":"")},g&&React.createElement("div",{dangerouslySetInnerHTML:{__html:p}}),0==g&&React.createElement(r.Placeholder,{icon:"admin-post",label:Object(c.__)("Loading","ultimate-addons-for-gutenberg")},React.createElement(r.Spinner,null))))}))}}]);