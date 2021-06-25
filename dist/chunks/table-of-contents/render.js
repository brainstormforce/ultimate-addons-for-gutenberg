(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[93],{252:function(t,e,a){"use strict";var n=a(17),l=a.n(n)()((function(t){return t[1]}));l.push([t.i,"/**\n * Editor styles for the admin\n */\n.uagb-toc__list > p {\n  color: #666;\n  font-size: 13px;\n  font-style: italic; }\n\n.block-editor-page .uagb-toc__scroll-top {\n  position: fixed;\n  right: 343px;\n  bottom: 50px;\n  display: none;\n  padding: 10px;\n  background: #ccd0d4;\n  cursor: pointer;\n  font-size: 1rem;\n  line-height: 1.85714285714286; }\n  .block-editor-page .uagb-toc__scroll-top svg {\n    width: 1.6em;\n    height: 0.6em;\n    margin-left: 0;\n    transform: translate(0, -20%) rotate(180deg);\n    fill: currentColor; }\n  .block-editor-page .uagb-toc__scroll-top.uagb-toc__show-scroll {\n    display: inline-table; }\n\n.uagb-light-font-weight {\n  font-weight: 400; }\n\n.block-editor-block-list__block .wp-block-uagb-table-of-contents ol.uagb-toc__list li.uagb-toc__list ul,\n.block-editor-block-list__block .wp-block-uagb-table-of-contents ol.uagb-toc__list ul.uagb-toc__list ul {\n  list-style-type: circle; }\n\n.block-editor-block-list__block .wp-block-uagb-table-of-contents ol.uagb-toc__list > ul,\n.block-editor-block-list__block .wp-block-uagb-table-of-contents ol.uagb-toc__list > li {\n  list-style-type: disc; }\n",""]),e.a=l},520:function(t,e,a){"use strict";a.r(e);var n,l=a(3),o=a.n(l),c=a(2),i=function(t){var e,a=t.mappingHeaders,n=t.headers;return"undefined"!=a&&n&&n.length>0&&n.filter((function(t){return a[t.tag-1]})).length>0?React.createElement("div",{className:"uagb-toc__list-wrap"},function(t){var e="",a="",n="",l="",o="</li></ul>",c=0,i={1:0,2:0,3:0,4:0,5:0,6:0};return t.forEach((function(t,s){var r=t.tag,u=t.content;if(0===s&&(n=r),!(r<n)){if((""===a||r<a)&&(a=r),""!==e)if(r>e)l+='<ul class="uagb-toc__list">',c++,i[r]=c;else if(r===e&&r!==a)l+='<li class="uagb-toc__list">',i[r]=c;else if(r<e){var b=Math.abs(c-i[r]);r>a?(l+=o.repeat(b),c=Math.abs(c-b)):r===a&&(l+=o.repeat(b),l+="</li>")}l+='<li class="uagb-toc__list"><a href="#">'+u+"</a>",e=r}})),l+=o.repeat(e),React.createElement("ol",{className:"uagb-toc__list",dangerouslySetInnerHTML:{__html:l}})}((e=[],n.forEach((function(t){a[t.tag-1]&&e.push(t)})),e))):React.createElement("p",{className:"uagb_table-of-contents-placeholder"},Object(c.__)("Add a header to begin generating the table of contents"))},s=a(1),r=a.n(s),u=a(12),b=a(4),g=a(16),_=a.n(g),d=a(252),p=0,f={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},m={};m.locals=d.a.locals||{},m.use=function(){return p++||(n=_()(d.a,f)),m},m.unuse=function(){p>0&&!--p&&(n(),n=null)};var h=m,k=function(t){Object(s.useLayoutEffect)((function(){return h.use(),function(){h.unuse()}}),[]);var e=t=t.parentProps,a=e.attributes,n=e.setAttributes,l=e.className,g=e.headers,_=e.deviceType,d=a.align,p=a.makeCollapsible,f=a.initialCollapse,m=a.icon,k=a.tColumnsDesktop,w=a.mappingHeaders,v=a.headingTitle,y="";return p&&m&&(y=r.a.createElement("span",{className:"uag-toc__collapsible-wrap"},Object(u.a)(m))),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:o()(l,"uagb-toc__align-".concat(d),"uagb-toc__columns-".concat(k),f?"uagb-toc__collapse":"","uagb-editor-preview-mode-".concat(_.toLowerCase()),"uagb-block-".concat(t.clientId.substr(0,8)))},r.a.createElement("div",{className:"uagb-toc__wrap"},r.a.createElement("div",{className:"uagb-toc__title-wrap"},r.a.createElement(b.RichText,{tagName:"div",placeholder:Object(c.__)("Table Of Contents","ultimate-addons-for-gutenberg"),value:v,className:"uagb-toc__title",onChange:function(t){return n({headingTitle:t})},multiline:!1,onRemove:function(){return t.onReplace([])}}),y),r.a.createElement(i,{mappingHeaders:w,headers:g}))))};e.default=r.a.memo(k)}}]);