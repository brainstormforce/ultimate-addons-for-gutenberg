(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[97],{261:function(e,a,t){"use strict";var n=t(19),l=t.n(n)()((function(e){return e[1]}));l.push([e.i,"",""]),a.a=l},546:function(e,a,t){"use strict";t.r(a);var n,l=t(15),c=t.n(l),r=t(3),s=t.n(r),u=t(18),i=t.n(u),o=t(261),m=0,g={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},d={};d.locals=o.a.locals||{},d.use=function(){return m++||(n=i()(o.a,g)),d},d.unuse=function(){m>0&&!--m&&(n(),n=null)};var b=d,p=function(e){Object(r.useLayoutEffect)((function(){return b.use(),function(){b.unuse()}}),[]);var a,t=e=e.parentProps,n=t.attributes,l=t.categoriesList,u=t.deviceType,i=n.layout,o=n.seperatorStyle,m=n.noTaxDisplaytext,g=n.showCount,d=n.listDisplayStyle,p=n.showhierarchy,y=n.titleTag;return"grid"==i?a=y||"H4":"list"==i&&(a=y||"div"),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:c()("uagb-taxonomy__outer-wrap","uagb-editor-preview-mode-".concat(u.toLowerCase()),"uagb-block-".concat(e.clientId.substr(0,8)))},s.a.createElement("div",{className:c()("uagb-taxonomy-wrap","uagb-layout-".concat(i))},"grid"==i&&l.map((function(e,t){return s.a.createElement("div",{className:"uagb-taxomony-box",key:t},s.a.createElement("a",{className:"uagb-tax-link",href:e.link},s.a.createElement(a,{className:"uagb-tax-title",dangerouslySetInnerHTML:{__html:e.name}}),g&&s.a.createElement("div",{className:"uagb-tax-count"},e.count," ",e.count>"1"?"".concat(e.singular_name,"s"):e.singular_name)))})),"list"==i&&"list"==d&&s.a.createElement("ul",{className:"uagb-list-wrap"},l.map((function(e,t){return s.a.createElement("li",{className:"uagb-tax-list",key:t},s.a.createElement(a,{className:"uagb-tax-link-wrap"},s.a.createElement("a",{className:"uagb-tax-link",href:e.link,dangerouslySetInnerHTML:{__html:e.name}}),g&&s.a.createElement("span",{className:"uagb-tax-list-count"}," (".concat(e.count,")")),p&&null!=e.children&&s.a.createElement("ul",{className:"uagb-taxonomy-list-children"},Object.keys(e.children).map((function(a,t){return s.a.createElement("li",{className:"uagb-tax-list",key:t},s.a.createElement("a",{className:"uagb-tax-link",href:"".concat(e.link).concat(e.children[a].slug)},e.children[a].name),g&&s.a.createElement("span",null," (".concat(e.children[a].count,")")))})))),"none"!=o&&s.a.createElement("div",{className:"uagb-tax-separator-wrap"},s.a.createElement("div",{className:"uagb-tax-separator"})))}))),"list"==i&&"dropdown"==d&&s.a.createElement("select",{className:"uagb-list-dropdown-wrap"},l.map((function(e,a){return s.a.createElement("option",{key:a,value:e.link},e.name,g&&" (".concat(e.count,")"))})))),""==l&&s.a.createElement("div",{className:"uagb-tax-not-available"},m)))};a.default=s.a.memo(p)}}]);