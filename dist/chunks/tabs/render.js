(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{461:function(e,t,a){"use strict";a.r(t);var r=a(3),c=a.n(r),o=a(12),n=a(2),l=a(1),i=a.n(l),b=a(5),s=a(4),d=a(9),u=a(11);function m(e){return function(e){if(Array.isArray(e))return g(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return g(e,void 0);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?g(e,void 0):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var p=function(e){var t=e=e.parentProps,a=t.attributes,r=t.setAttributes,l=t.className,g=t.deviceType,p=t.clientId,f=a.tabsStyleD,_=a.tabsStyleM,h=a.tabsStyleT,k=(a.tabActiveFrontend,a.tabHeaders),v=a.tabActive,E=a.tabAlign,O=a.showIcon,j=a.icon,w=a.iconPosition,y=function(e,t){return function(){e!==t-1&&A(e,e+1)}},A=function(t,c){var o=a.tabHeaders,n=a.tabActiveFrontend,l=(0,(wp.blockEditor?Object(u.select)("core/block-editor"):Object(u.select)("core/editor")).getBlock)(p),i=m(o);i.splice(c,1,o[t]),i.splice(t,1,o[c]),r({tabHeaders:i}),n===t+1?r({tabActiveFrontend:c+1}):n===c+1&&r({tabActiveFrontend:t+1}),e.moveTab(l.innerBlocks[t].clientId,c),e.resetTabOrder()};return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:c()(l,"uagb-editor-preview-mode-".concat(g.toLowerCase()),"uagb-block-".concat(e.clientId.substr(0,8)),"uagb-tabs__wrap","uagb-tabs__".concat(f,"-desktop"),"uagb-tabs__".concat(h,"-tablet"),"uagb-tabs__".concat(_,"-mobile"))},i.a.createElement("ul",{className:"uagb-tabs__panel uagb-tabs__align-".concat(E)},k.map((function(t,c){return i.a.createElement("li",{key:c,className:"uagb-tab ".concat(v===c?"uagb-tabs__active":""," "),id:"uagb-tabs__tab".concat(c)},k.length>0&&i.a.createElement("div",{className:"uagb-tabs-editor-controls"},0!==c&&i.a.createElement(s.Tooltip,{text:Object(n.__)("Move Item Back","ultimate-addons-for-gutenberg")},i.a.createElement("span",{className:"uagb-tab-item__move-back",onClick:0===c?" ":(l=c,k.length,function(){l<0||A(l,l-1)}),"aria-disabled":c===k.length,disabled:c===k.length},i.a.createElement(s.Dashicon,{icon:"arrow-left"}))),c+1!==k.length&&i.a.createElement(s.Tooltip,{text:Object(n.__)("Move Item Forward","ultimate-addons-for-gutenberg")},i.a.createElement("span",{className:"uagb-tab-item__move-forward",onClick:c===k.length?" ":y(c,k.length),"aria-disabled":c===k.length,disabled:c===k.length},i.a.createElement(s.Dashicon,{icon:"arrow-right"}))),i.a.createElement(s.Tooltip,{text:Object(n.__)("Remove tab","ultimate-addons-for-gutenberg")},i.a.createElement("span",{className:"uagb-tabs__remove",onClick:function(){return function(t){var c,o,n;(0,(wp.blockEditor?Object(u.dispatch)("core/block-editor"):Object(u.dispatch)("core/editor")).removeBlock)((0,(wp.blockEditor?Object(u.select)("core/block-editor"):Object(u.select)("core/editor")).getBlockOrder)(p)[t],!1),r({tabHeaders:a.tabHeaders.filter((function(e,a){return a!==t}))}),c={tabActive:0},o=(wp.blockEditor?Object(u.dispatch)("core/block-editor"):Object(u.dispatch)("core/editor")).updateBlockAttributes,n=(0,(wp.blockEditor?Object(u.select)("core/block-editor"):Object(u.select)("core/editor")).getBlockOrder)(p),r(c),n.forEach((function(e){return o(e,c)})),e.resetTabOrder()}(c)}},i.a.createElement(s.Dashicon,{icon:"no"})))),i.a.createElement("a",{className:"uagb-tabs__icon-position-".concat(w," uagb-tabs-list"),onClick:function(){e.updateActiveTab(c)},"data-tab":c},O&&j&&("left"===w||"top"===w)&&i.a.createElement("span",{className:"uagb-tabs__icon"},Object(o.a)(j)),i.a.createElement(b.RichText,{tagName:"p",value:t,onChange:function(e){return function(e,t){var a=Object(b.getBlockOrder)(p),c=k.map((function(a,r){return t===r&&(a=e),a}));r({tabHeaders:c}),Object(b.updateBlockAttributes)(a[t],{header:e}),Object(b.getBlockOrder)(p).forEach((function(e){return Object(b.updateBlockAttributes)(e,{tabHeaders:k})}))}(e,c)},onSplit:function(){return null},placeholder:Object(n.__)("Title…","ultimate-addons-for-gutenberg")}),O&&j&&("right"===w||"bottom"===w)&&i.a.createElement("span",{className:"uagb-tabs__icon"},Object(o.a)(j))));var l})),i.a.createElement("li",{className:"uagb-tab uagb-tabs__add-tab"},i.a.createElement(s.Tooltip,{text:Object(n.__)("Add tab","ultimate-addons-for-gutenberg")},i.a.createElement("span",{onClick:function(){return(0,(wp.blockEditor?Object(u.dispatch)("core/block-editor"):Object(u.dispatch)("core/editor")).insertBlock)(Object(d.createBlock)("uagb/tabs-child"),a.tabHeaders.length,p),r({tabHeaders:[].concat(m(a.tabHeaders),["New Tab"])}),void e.resetTabOrder()}},i.a.createElement(s.Dashicon,{icon:"plus"}))))),i.a.createElement("div",{className:"uagb-tabs__body-wrap"},i.a.createElement(b.InnerBlocks,{template:[["uagb/tabs-child"],["uagb/tabs-child"],["uagb/tabs-child"]],templateLock:!1,allowedBlocks:["uagb/tabs-child"]}))))};t.default=i.a.memo(p)}}]);