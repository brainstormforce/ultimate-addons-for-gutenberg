(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{388:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n.n(a),i=n(37),o=n(2),c=n.n(o),l=(n(0),n(6));function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var u=["uagb/content-timeline-child"],s=function(e){var t,n=e=e.parentProps,a=n.className,s=n.deviceType,d=n.attributes,b=d.tm_content,p=d.timelineItem,f=Object(o.useMemo)((function(){for(var e=[],t=0;t<p;t++)e.push(["uagb/content-timeline-child",b[t]]);return e}),[p,b]);return c.a.createElement("div",{className:r.a.apply(void 0,[a,"uagb-timeline__outer-wrap","uagb-editor-preview-mode-".concat(s.toLowerCase()),"uagb-block-".concat(e.clientId),"uagb-timeline__content-wrap"].concat((t=Object(i.a)(e.attributes),function(e){if(Array.isArray(e))return m(e)}(t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return m(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,void 0):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())))},c.a.createElement("div",{className:"uagb-timeline__main"},c.a.createElement("div",{className:"uagb-timeline__days"},c.a.createElement(l.InnerBlocks,{template:f,templateLock:!1,allowedBlocks:u})),c.a.createElement("div",{className:"uagb-timeline__line"},c.a.createElement("div",{className:"uagb-timeline__line__inner"}))))};t.default=c.a.memo(s)}}]);