(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[64],{258:function(e,t,n){"use strict";var a=n(19),i=n.n(a)()((function(e){return e[1]}));i.push([e.i,"",""]),t.a=i},544:function(e,t,n){"use strict";n.r(t);var a,i=n(15),c=n.n(i),o=n(17),u=n(4),s=n(2),l=n(3),r=n.n(l),g=n(18),d=n.n(g),b=n(258),m=0,_={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},f={};f.locals=b.a.locals||{},f.use=function(){return m++||(a=d()(b.a,_)),f},f.unuse=function(){m>0&&!--m&&(a(),a=null)};var p=f,h=function(e){Object(l.useLayoutEffect)((function(){return p.use(),function(){p.unuse()}}),[]);var t=e=e.parentProps,n=t.attributes,a=n.block_id,i=n.icon,g=n.noticeTitle,d=n.noticeContent,b=n.noticeDismiss,m=n.noticeAlignment,_=n.headingTag,f=t.setAttributes,h=t.className,v="";return b&&(v=r.a.createElement("span",{className:"uagb-notice-dismiss"},Object(o.a)(i))),r.a.createElement("div",{className:c()(h,"uagb-inline_notice__outer-wrap","".concat(b),"uagb-inline_notice__align-".concat(m),"uagb-block-".concat(a))},v,r.a.createElement(u.RichText,{tagName:_,placeholder:Object(s.__)("Notice Title","ultimate-addons-for-gutenberg"),keepPlaceholderOnFocus:!0,value:g,className:"uagb-notice-title",onChange:function(e){return f({noticeTitle:e})}}),r.a.createElement(u.RichText,{tagName:"div",multiline:"p",placeholder:Object(s.__)("Add notice text…","ultimate-addons-for-gutenberg"),value:d,className:"uagb-notice-text",onChange:function(e){return f({noticeContent:e})}}))};t.default=r.a.memo(h)}}]);