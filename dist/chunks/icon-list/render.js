(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[61],{239:function(t,n,e){"use strict";var o=e(18),a=e.n(o)()((function(t){return t[1]}));a.push([t.i,'/**\r\n * Editor styles for the admin\r\n */\n#wpwrap .edit-post-visual-editor a.uagb-icon-list__link {\n  color: #3a3a3a; }\n\n#wpwrap .uagb-icon-list__outer-wrap .uagb-icon-list__label-wrap {\n  cursor: text; }\n\n[data-type="uagb/icon-list"] .uagb-icon-list__layout-horizontal .block-editor-inner-blocks > .block-editor-block-list__layout {\n  display: flex; }\n\n[data-type="uagb/icon-list"] .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block {\n  width: auto;\n  padding-left: 0;\n  padding-right: 0;\n  margin-left: 0;\n  margin-right: 0; }\n',""]),n.a=a},526:function(t,n,e){"use strict";e.r(n);var o,a=e(3),i=e.n(a),l=e(4),c=e(1),r=e.n(c),u=e(17),s=e.n(u),b=e(239),d=0,_={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},p={};p.locals=b.a.locals||{},p.use=function(){return d++||(o=s()(b.a,_)),p},p.unuse=function(){d>0&&!--d&&(o(),o=null)};var g=p,f=["uagb/icon-list-child"],w=function(t){Object(c.useLayoutEffect)((function(){return g.use(),function(){g.unuse()}}),[]);var n=t=t.parentProps,e=n.attributes,o=n.deviceType,a=e.className,u=e.icon_count,s=e.icon_layout,b=e.iconPosition,d=e.hideLabel,_=e.block_id,p=d?"uagb-icon-list__no-label":"",w=Object(c.useMemo)((function(){for(var t=[],n=0;n<u;n++)t.push(["uagb/icon-list-child",{id:n+1}]);return t}),[u]);return r.a.createElement("div",{className:i()(a,"uagb-icon-list__outer-wrap","uagb-icon-list__layout-".concat(s),"top"==b?"uagb-icon-list__icon-at-top":"",p,"uagb-editor-preview-mode-".concat(o.toLowerCase()),"uagb-block-".concat(_))},r.a.createElement("div",{className:"uagb-icon-list__wrap"},r.a.createElement(l.InnerBlocks,{template:w,templateLock:!1,allowedBlocks:f,__experimentalMoverDirection:s})))};n.default=r.a.memo(w)}}]);