(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[63],{233:function(e,t,a){"use strict";var r=a(18),n=a.n(r)()((function(e){return e[1]}));n.push([e.i,"/**\r\n * #.# Editor Styles\r\n *\r\n * CSS for just Backend enqueued after style.scss\r\n * which makes it higher in priority.\r\n */\n.block-editor-page #wpwrap .edit-post-visual-editor a.uagb-infobox-link-wrap {\n  z-index: -1;\n  color: inherit; }\n\n.block-editor-page #wpwrap .uagb-ifb-title, .block-editor-page #wpwrap p.uagb-ifb-desc {\n  margin: 0; }\n",""]),t.a=n},520:function(e,t,a){"use strict";a.r(t);var r,n=a(3),i=a.n(n),l=a(24),o=a(1),c=a.n(o),s=a(22),u=a(23),b=a(33),m=a(25),f=a(32),p=a(35),g=a(21),d=a(17),w=a.n(d),v=a(233),y=0,E={injectType:"lazySingletonStyleTag",attributes:{id:"uagb-editor-styles"},insert:"head",singleton:!0},_={};_.locals=v.a.locals||{},_.use=function(){return y++||(r=w()(v.a,E)),_},_.unuse=function(){y>0&&!--y&&(r(),r=null)};var h=_;function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var A=function(e){Object(o.useLayoutEffect)((function(){return h.use(),function(){h.unuse()}}),[]);var t,a=e=e.parentProps,r=a.className,n=a.attributes,d=a.setAttributes,w=a.deviceType,v=n.icon,y=n.iconimgPosition,E=n.source_type,_=n.seperatorPosition,A=n.seperatorStyle,x=n.ctaType,S=n.showPrefix,N=n.showTitle,F=n.showDesc,j=n.block_id,T=t="icon"===E&&""!==v?c.a.createElement(f.a,{attributes:n}):c.a.createElement(p.a,{attributes:n}),I=_,O=c.a.createElement(m.a,{attributes:n}),P=!0;"after_icon"!=_||"above-title"!=y&&"below-title"!=y||(P=!1,T=c.a.createElement(c.a.Fragment,null,t,"none"!==A&&O)),"after_icon"!=_||"above-title"===y&&"below-title"===y||(I="after_title"),"below-title"==y&&"after_title"==_&&(P=!1,T=c.a.createElement(c.a.Fragment,null,"none"!==A&&O,t));var C,L=c.a.createElement(c.a.Fragment,null,"none"!==A&&"after_title"==I&&P&&O,c.a.createElement("div",{className:"uagb-ifb-text-wrap"},F&&c.a.createElement(u.a,{attributes:n,setAttributes:d,props:e}),"none"!==A&&"after_desc"==I&&O,c.a.createElement(b.a,{attributes:n,setAttributes:d}))),z=c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"uagb-ifb-title-wrap"},S&&c.a.createElement(g.a,{attributes:n,setAttributes:d,props:e}),"none"!==A&&"after_prefix"==I&&O,N&&c.a.createElement(s.a,{attributes:n,setAttributes:d,props:e}))),J=c.a.createElement("div",{className:i.a.apply(void 0,["uagb-infobox__content-wrap","all"==x?" uagb-infobox_cta-type-all":""].concat((C=Object(l.a)(n),function(e){if(Array.isArray(e))return k(e)}(C)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(C)||function(e,t){if(e){if("string"==typeof e)return k(e,void 0);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?k(e,void 0):void 0}}(C)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())))},c.a.createElement("div",{className:"uagb-ifb-left-right-wrap"},"left"==y&&T,c.a.createElement("div",{className:"uagb-ifb-content"},"above-title"==y&&T,("above-title"==y||"below-title"==y)&&z,"below-title"==y&&T,("above-title"==y||"below-title"==y)&&L,"left-title"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"uagb-ifb-left-title-image"},T,z),L),"right-title"===y&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"uagb-ifb-right-title-image"},z,T),L),("left"==y||"right"==y)&&c.a.createElement(c.a.Fragment,null,z,L)),"right"==y&&T));return c.a.createElement("div",{className:i()(r,"uagb-infobox__outer-wrap","uagb-block-".concat(j),"uagb-editor-preview-mode-".concat(w.toLowerCase()))},"all"==x&&c.a.createElement(c.a.Fragment,null,c.a.createElement("a",{className:"uagb-infobox-link-wrap uagb-infbox__link-to-all","aria-label":"Infobox Link",rel:"noopener noreferrer",href:"/"}),J),"all"!==x&&J)};t.default=c.a.memo(A)}}]);