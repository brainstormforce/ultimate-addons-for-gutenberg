(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{341:function(e,a,t){"use strict";t.r(a);var n=t(1),c=t.n(n),r=t(17),i=t(0);a.default=React.memo((function(e){var a=e=e.parentProps,t=a.attributes,n=t.block_id,o=t.headingTitle,s=t.headingDesc,l=t.headingTag,d=t.seperatorStyle,u=a.setAttributes,g=a.className,m=a.deviceType,p=React.createElement(r.RichText,{tagName:l,placeholder:Object(i.__)("Write a Heading","ultimate-addons-for-gutenberg"),value:o,className:"uagb-heading-text",multiline:!1,onChange:function(e){u({headingTitle:e})}}),b="none"!==d&&React.createElement("div",{className:"uagb-separator-wrap"},React.createElement("div",{className:"uagb-separator"})),h=React.createElement(r.RichText,{tagName:"p",placeholder:Object(i.__)("Write a Description","ultimate-addons-for-gutenberg"),value:s,className:"uagb-desc-text",onChange:function(e){return u({headingDesc:e})}});return React.createElement("div",{className:c()(g,"uagb-editor-preview-mode-".concat(m.toLowerCase()),"uagb-block-".concat(n))},p,b,h)}))}}]);