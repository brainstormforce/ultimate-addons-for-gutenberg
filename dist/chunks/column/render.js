(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[15],{244:function(n,t,e){"use strict";var o=e(18),a=e.n(o)()((function(n){return n[1]}));a.push([n.i,'/**\r\n * #.# Editor Styles\r\n *\r\n * CSS for just Backend enqueued after style.scss\r\n * which makes it higher in priority.\r\n */\n.wp-block[data-type="uagb/column"]::before {\n  content: "";\n  position: absolute;\n  border: 1px dashed #a3aeb6;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%; }\n\n.is-selected.wp-block[data-type="uagb/column"]::before {\n  border-color: #59646c; }\n\n.editor-bg-image-control .components-button,\n.editor-bg-video-control .components-button {\n  vertical-align: middle; }\n\n.editor-bg-image-control .components-button:last-child,\n.editor-bg-video-control .components-button:last-child {\n  margin-left: 10px; }\n\n.wp-block[data-type="uagb/column"] .block-editor-block-list__block-edit {\n  height: 100%; }\n\n.uagb-column__inner-wrap .block-editor-block-list__block {\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%; }\n\n.wp-block-uagb-column.uagb-column__wrap .uagb-column__inner-wrap {\n  width: 100%; }\n\n.edit-post-visual-editor .uagb-column__inner-wrap .block-editor-block-list__block > .editor-block-mover {\n  left: -30px; }\n\n@media (max-width: 449px) {\n  .block-editor-page #wpwrap .uagb-columns__inner-wrap .block-editor-block-list__block {\n    background-attachment: scroll !important; } }\n',""]),t.a=a},530:function(n,t,e){"use strict";e.r(t);var o,a=e(3),c=e.n(a),l=e(4),i=e(1),r=e.n(i),u=e(17),b=e.n(u),s=e(244),d=0,g={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},m={};m.locals=s.a.locals||{},m.use=function(){return d++||(o=b()(s.a,g)),m},m.unuse=function(){d>0&&!--d&&(o(),o=null)};var p=m,_=function(n){Object(i.useLayoutEffect)((function(){return p.use(),function(){p.unuse()}}),[]);var t=n.parentProps,e=t.attributes,o=e.align,a=e.backgroundType,u=e.alignMobile,b=e.alignTablet,s=t.deviceType,d=t.isSelected,g=t.className,m=d?"active":"not-active",_="center"==o?"":"uagb-column__align-".concat(o),k=""==u?"":"uagb-column__align-mobile-".concat(u),w=""==b?"":"uagb-column__align-tablet-".concat(b);return r.a.createElement("div",{className:c()(g,"uagb-column__wrap","uagb-column__background-".concat(a),"uagb-column__edit-".concat(m),_,k,w,"uagb-editor-preview-mode-".concat(s.toLowerCase()),"uagb-block-".concat(n.parentProps.clientId.substr(0,8)))},r.a.createElement("div",{className:"uagb-column__overlay"}),r.a.createElement(l.InnerBlocks,{templateLock:!1}))};t.default=r.a.memo(_)}}]);