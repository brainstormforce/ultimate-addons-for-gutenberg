(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{390:function(e,a,o){"use strict";o.r(a);var n=o(2),t=o.n(n),c=o(30),l=o(1),s=o.n(l),u=o(5),m=["uagb/column"],r=function(e){var a=e.parentProps,o=a.attributes,n=a.isSelected,r=a.className,b=a.deviceType,p=o.stack,i=o.align,_=o.vAlign,g=o.tag,v=o.columnGap,d=o.backgroundType,h=o.backgroundVideo,k=o.columns,w=o.bottomType,f=o.topType,y=o.bottomFlip,E=o.topFlip,N=o.reverseTablet,T=o.reverseMobile,A=o.topContentAboveShape,C=o.bottomContentAboveShape,P=Object(l.useMemo)((function(){for(var e=[],a=0;a<k;a++)e.push(["uagb/column",{id:a+1}]);return e}),[k]),S="none"!=f&&s.a.createElement("div",{className:t()("uagb-columns__shape","uagb-columns__shape-top",{"uagb-columns__shape-flip":!0===E},{"uagb-columns__shape-above-content":!0===A})},c.a[f]),B="none"!=w&&s.a.createElement("div",{className:t()("uagb-columns__shape","uagb-columns__shape-bottom",{"uagb-columns__shape-flip":!0===y},{"uagb-columns__shape-above-content":!0===C}),"data-negative":"false"},c.a[w]),F=N?"uagb-columns__reverse-tablet":"",I=T?"uagb-columns__reverse-mobile":"",J="".concat(g),L=n?"active":"not-active";return s.a.createElement(J,{className:t()(r,"uagb-columns__wrap","uagb-columns__background-".concat(d),"uagb-columns__edit-".concat(L),"uagb-editor-preview-mode-".concat(b.toLowerCase()),"uagb-columns__stack-".concat(p),"uagb-columns__valign-".concat(_),"uagb-columns__gap-".concat(v),"align".concat(i),F,I,"uagb-block-".concat(e.parentProps.clientId.substr(0,8)),"uagb-columns__columns-".concat(k))},s.a.createElement("div",{className:"uagb-columns__overlay"}),S,"video"==d&&s.a.createElement("div",{className:"uagb-columns__video-wrap"},h&&s.a.createElement("video",{autoPlay:!0,loop:!0,muted:!0,playsinline:!0},s.a.createElement("source",{src:h.url,type:"video/mp4"}))),s.a.createElement(u.InnerBlocks,{template:P,templateLock:"all",allowedBlocks:m}),B)};a.default=s.a.memo(r)}}]);