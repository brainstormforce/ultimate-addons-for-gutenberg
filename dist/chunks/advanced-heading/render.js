(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[3],{457:function(e,a,t){"use strict";t.r(a);var n=t(3),r=t.n(n),c=t(4),s=t(2),i=t(1),l=t.n(i),o=function(e){var a=e=e.parentProps,t=a.attributes,n=t.block_id,i=t.headingTitle,o=t.headingDesc,u=t.headingTag,g=t.seperatorStyle,d=a.setAttributes,m=a.className,p=a.deviceType,b=l.a.createElement(c.RichText,{tagName:u,placeholder:Object(s.__)("Write a Heading","ultimate-addons-for-gutenberg"),value:i,className:"uagb-heading-text",multiline:!1,onChange:function(e){d({headingTitle:e})}}),_="none"!==g&&l.a.createElement("div",{className:"uagb-separator-wrap"},l.a.createElement("div",{className:"uagb-separator"})),h=l.a.createElement(c.RichText,{tagName:"p",placeholder:Object(s.__)("Write a Description","ultimate-addons-for-gutenberg"),value:o,className:"uagb-desc-text",onChange:function(e){return d({headingDesc:e})}});return l.a.createElement("div",{className:r()(m,"uagb-editor-preview-mode-".concat(p.toLowerCase()),"uagb-block-".concat(n))},b,_,h)};a.default=l.a.memo(o)},517:function(e,a,t){"use strict";t.r(a);var n=t(3),r=t.n(n),c=t(4),s=t(2),i=t(1),l=t.n(i),o=function(e){for(var a=e=e.parentProps,t=a.setAttributes,n=a.attributes,i=n.className,o=n.title,u=n.rating,g=n.range,d=parseInt(g),m=[],p=1;p<=d;p++)m.push(l.a.createElement("span",{key:p,class:"uag-star"},"★"));return l.a.createElement("div",{className:r()(i,"uag-star-rating__wrapper","uagb-block-".concat(e.clientId.substr(0,8)))},l.a.createElement(c.RichText,{tagName:"p",placeholder:Object(s.__)("Write a title","ultimate-addons-for-gutenberg"),value:o,className:"uag-star-rating__title",onChange:function(e){return t({title:e})}}),l.a.createElement("div",{class:"uag-star-rating",title:"".concat(u,"/").concat(g)},m))};a.default=l.a.memo(o)}}]);