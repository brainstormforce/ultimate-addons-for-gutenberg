(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[83],{20:function(e,t,n){"use strict";var a=n(6),i=n(22),o=n.n(i),l=n(21),r=n.n(l);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}if(void 0===m)var m=[];var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(l,e);var t,n,a,i,o=(a=l,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(a);if(i){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=o.call(this,e)).state={status:void 0},t.handleLoading=function(){t.setState({status:"loading"})},t.addFont=function(e){m.includes(e)||m.push(e)},t.handleActive=function(){t.setState({status:"active"})},t.handleInactive=function(){t.setState({status:"inactive"})},t.loadFonts=function(){m.includes(t.props.config.google.families[0])||(r.a.load(u(u({},t.props.config),{},{loading:t.handleLoading,active:t.handleActive,inactive:t.handleInactive})),t.addFont(t.props.config.google.families[0]))},t}return t=l,(n=[{key:"componentDidMount",value:function(){this.loadFonts()}},{key:"componentDidUpdate",value:function(e,t){var n=this.props,a=n.onStatus,i=n.config;t.status!==this.state.status&&a(this.state.status),e.config!==i&&this.loadFonts()}},{key:"render",value:function(){return this.props.children||null}}])&&h(t.prototype,n),l}(a.Component);d.propTypes={config:o.a.object.isRequired,children:o.a.element,onStatus:o.a.func.isRequired},d.defaultProps={onStatus:function(){}},t.a=d},21:function(e,t,n){var a;!function(){function i(e,t,n){return e.call.apply(e.bind,arguments)}function o(e,t,n){if(!e)throw Error();if(2<arguments.length){var a=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,a),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function l(e,t,n){return(l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?i:o).apply(null,arguments)}var r=Date.now||function(){return+new Date};function c(e,t){this.a=e,this.o=t||e,this.c=this.o.document}var s=!!window.FontFace;function u(e,t,n,a){if(t=e.c.createElement(t),n)for(var i in n)n.hasOwnProperty(i)&&("style"==i?t.style.cssText=n[i]:t.setAttribute(i,n[i]));return a&&t.appendChild(e.c.createTextNode(a)),t}function f(e,t,n){(e=e.c.getElementsByTagName(t)[0])||(e=document.documentElement),e.insertBefore(n,e.lastChild)}function h(e){e.parentNode&&e.parentNode.removeChild(e)}function g(e,t,n){t=t||[],n=n||[];for(var a=e.className.split(/\s+/),i=0;i<t.length;i+=1){for(var o=!1,l=0;l<a.length;l+=1)if(t[i]===a[l]){o=!0;break}o||a.push(t[i])}for(t=[],i=0;i<a.length;i+=1){for(o=!1,l=0;l<n.length;l+=1)if(a[i]===n[l]){o=!0;break}o||t.push(a[i])}e.className=t.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function p(e,t){for(var n=e.className.split(/\s+/),a=0,i=n.length;a<i;a++)if(n[a]==t)return!0;return!1}function b(e,t,n){function a(){r&&i&&o&&(r(l),r=null)}t=u(e,"link",{rel:"stylesheet",href:t,media:"all"});var i=!1,o=!0,l=null,r=n||null;s?(t.onload=function(){i=!0,a()},t.onerror=function(){i=!0,l=Error("Stylesheet failed to load"),a()}):setTimeout((function(){i=!0,a()}),0),f(e,"head",t)}function m(e,t,n,a){var i=e.c.getElementsByTagName("head")[0];if(i){var o=u(e,"script",{src:t}),l=!1;return o.onload=o.onreadystatechange=function(){l||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(l=!0,n&&n(null),o.onload=o.onreadystatechange=null,"HEAD"==o.parentNode.tagName&&i.removeChild(o))},i.appendChild(o),setTimeout((function(){l||(l=!0,n&&n(Error("Script load timeout")))}),a||5e3),o}return null}function d(){this.a=0,this.c=null}function v(e){return e.a++,function(){e.a--,y(e)}}function _(e,t){e.c=t,y(e)}function y(e){0==e.a&&e.c&&(e.c(),e.c=null)}function w(e){this.a=e||"-"}function j(e,t){this.c=e,this.f=4,this.a="n";var n=(t||"n4").match(/^([nio])([1-9])$/i);n&&(this.a=n[1],this.f=parseInt(n[2],10))}function S(e){var t=[];e=e.split(/,\s*/);for(var n=0;n<e.length;n++){var a=e[n].replace(/['"]/g,"");-1!=a.indexOf(" ")||/^\d/.test(a)?t.push("'"+a+"'"):t.push(a)}return t.join(",")}function O(e){return e.a+e.f}function E(e){var t="normal";return"o"===e.a?t="oblique":"i"===e.a&&(t="italic"),t}function T(e){var t=4,n="n",a=null;return e&&((a=e.match(/(normal|oblique|italic)/i))&&a[1]&&(n=a[1].substr(0,1).toLowerCase()),(a=e.match(/([1-9]00|normal|bold)/i))&&a[1]&&(/bold/i.test(a[1])?t=7:/[1-9]00/.test(a[1])&&(t=parseInt(a[1].substr(0,1),10)))),n+t}function C(e,t){this.c=e,this.f=e.o.document.documentElement,this.h=t,this.a=new w("-"),this.j=!1!==t.events,this.g=!1!==t.classes}function F(e){if(e.g){var t=p(e.f,e.a.c("wf","active")),n=[],a=[e.a.c("wf","loading")];t||n.push(e.a.c("wf","inactive")),g(e.f,n,a)}k(e,"inactive")}function k(e,t,n){e.j&&e.h[t]&&(n?e.h[t](n.c,O(n)):e.h[t]())}function P(){this.c={}}function H(e,t){this.c=e,this.f=t,this.a=u(this.c,"span",{"aria-hidden":"true"},this.f)}function x(e){f(e.c,"body",e.a)}function z(e){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+S(e.c)+";font-style:"+E(e)+";font-weight:"+e.f+"00;"}function L(e,t,n,a,i,o){this.g=e,this.j=t,this.a=a,this.c=n,this.f=i||3e3,this.h=o||void 0}function R(e,t,n,a,i,o,l){this.v=e,this.B=t,this.c=n,this.a=a,this.s=l||"BESbswy",this.f={},this.w=i||3e3,this.u=o||null,this.m=this.j=this.h=this.g=null,this.g=new H(this.c,this.s),this.h=new H(this.c,this.s),this.j=new H(this.c,this.s),this.m=new H(this.c,this.s),e=z(e=new j(this.a.c+",serif",O(this.a))),this.g.a.style.cssText=e,e=z(e=new j(this.a.c+",sans-serif",O(this.a))),this.h.a.style.cssText=e,e=z(e=new j("serif",O(this.a))),this.j.a.style.cssText=e,e=z(e=new j("sans-serif",O(this.a))),this.m.a.style.cssText=e,x(this.g),x(this.h),x(this.j),x(this.m)}w.prototype.c=function(e){for(var t=[],n=0;n<arguments.length;n++)t.push(arguments[n].replace(/[\W_]+/g,"").toLowerCase());return t.join(this.a)},L.prototype.start=function(){var e=this.c.o.document,t=this,n=r(),a=new Promise((function(a,i){!function o(){r()-n>=t.f?i():e.fonts.load(function(e){return E(e)+" "+e.f+"00 300px "+S(e.c)}(t.a),t.h).then((function(e){1<=e.length?a():setTimeout(o,25)}),(function(){i()}))}()})),i=null,o=new Promise((function(e,n){i=setTimeout(n,t.f)}));Promise.race([o,a]).then((function(){i&&(clearTimeout(i),i=null),t.g(t.a)}),(function(){t.j(t.a)}))};var B={D:"serif",C:"sans-serif"},M=null;function N(){if(null===M){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);M=!!e&&(536>parseInt(e[1],10)||536===parseInt(e[1],10)&&11>=parseInt(e[2],10))}return M}function A(e,t,n){for(var a in B)if(B.hasOwnProperty(a)&&t===e.f[B[a]]&&n===e.f[B[a]])return!0;return!1}function I(e,t){setTimeout(l((function(){h(this.g.a),h(this.h.a),h(this.j.a),h(this.m.a),t(this.a)}),e),0)}function G(e,t,n){this.c=e,this.a=t,this.f=0,this.m=this.j=!1,this.s=n}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.m.a.offsetWidth,this.A=r(),function e(t){var n,a=t.g.a.offsetWidth,i=t.h.a.offsetWidth;(n=a===t.f.serif&&i===t.f["sans-serif"])||(n=N()&&A(t,a,i)),n?r()-t.A>=t.w?N()&&A(t,a,i)&&(null===t.u||t.u.hasOwnProperty(t.a.c))?I(t,t.v):I(t,t.B):function(t){setTimeout(l((function(){e(this)}),t),50)}(t):I(t,t.v)}(this)};var W=null;function D(e){0==--e.f&&e.j&&(e.m?((e=e.a).g&&g(e.f,[e.a.c("wf","active")],[e.a.c("wf","loading"),e.a.c("wf","inactive")]),k(e,"active")):F(e.a))}function V(e){this.j=e,this.a=new P,this.h=0,this.f=this.g=!0}function U(e,t,n,a,i){var o=0==--e.h;(e.f||e.g)&&setTimeout((function(){var e=i||null,r=a||{};if(0===n.length&&o)F(t.a);else{t.f+=n.length,o&&(t.j=o);var c,s=[];for(c=0;c<n.length;c++){var u=n[c],f=r[u.c],h=t.a,p=u;if(h.g&&g(h.f,[h.a.c("wf",p.c,O(p).toString(),"loading")]),k(h,"fontloading",p),h=null,null===W)if(window.FontFace){p=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);var b=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);W=p?42<parseInt(p[1],10):!b}else W=!1;h=W?new L(l(t.g,t),l(t.h,t),t.c,u,t.s,f):new R(l(t.g,t),l(t.h,t),t.c,u,t.s,e,f),s.push(h)}for(c=0;c<s.length;c++)s[c].start()}}),0)}function q(e,t){this.c=e,this.a=t}function $(e,t){this.c=e,this.a=t}function J(e,t){this.c=e||K,this.a=[],this.f=[],this.g=t||""}G.prototype.g=function(e){var t=this.a;t.g&&g(t.f,[t.a.c("wf",e.c,O(e).toString(),"active")],[t.a.c("wf",e.c,O(e).toString(),"loading"),t.a.c("wf",e.c,O(e).toString(),"inactive")]),k(t,"fontactive",e),this.m=!0,D(this)},G.prototype.h=function(e){var t=this.a;if(t.g){var n=p(t.f,t.a.c("wf",e.c,O(e).toString(),"active")),a=[],i=[t.a.c("wf",e.c,O(e).toString(),"loading")];n||a.push(t.a.c("wf",e.c,O(e).toString(),"inactive")),g(t.f,a,i)}k(t,"fontinactive",e),D(this)},V.prototype.load=function(e){this.c=new c(this.j,e.context||this.j),this.g=!1!==e.events,this.f=!1!==e.classes,function(e,t,n){var a=[],i=n.timeout;!function(e){e.g&&g(e.f,[e.a.c("wf","loading")]),k(e,"loading")}(t),a=function(e,t,n){var a,i=[];for(a in t)if(t.hasOwnProperty(a)){var o=e.c[a];o&&i.push(o(t[a],n))}return i}(e.a,n,e.c);var o=new G(e.c,t,i);for(e.h=a.length,t=0,n=a.length;t<n;t++)a[t].load((function(t,n,a){U(e,o,t,n,a)}))}(this,new C(this.c,e),e)},q.prototype.load=function(e){var t=this,n=t.a.projectId,a=t.a.version;if(n){var i=t.c.o;m(this.c,(t.a.api||"https://fast.fonts.net/jsapi")+"/"+n+".js"+(a?"?v="+a:""),(function(a){a?e([]):(i["__MonotypeConfiguration__"+n]=function(){return t.a},function t(){if(i["__mti_fntLst"+n]){var a,o=i["__mti_fntLst"+n](),l=[];if(o)for(var r=0;r<o.length;r++){var c=o[r].fontfamily;null!=o[r].fontStyle&&null!=o[r].fontWeight?(a=o[r].fontStyle+o[r].fontWeight,l.push(new j(c,a))):l.push(new j(c))}e(l)}else setTimeout((function(){t()}),50)}())})).id="__MonotypeAPIScript__"+n}else e([])},$.prototype.load=function(e){var t,n,a=this.a.urls||[],i=this.a.families||[],o=this.a.testStrings||{},l=new d;for(t=0,n=a.length;t<n;t++)b(this.c,a[t],v(l));var r=[];for(t=0,n=i.length;t<n;t++)if((a=i[t].split(":"))[1])for(var c=a[1].split(","),s=0;s<c.length;s+=1)r.push(new j(a[0],c[s]));else r.push(new j(a[0]));_(l,(function(){e(r,o)}))};var K="https://fonts.googleapis.com/css";function X(e){this.f=e,this.a=[],this.c={}}var Q={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},Y={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Z={i:"i",italic:"i",n:"n",normal:"n"},ee=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function te(e,t){this.c=e,this.a=t}var ne={Arimo:!0,Cousine:!0,Tinos:!0};function ae(e,t){this.c=e,this.a=t}function ie(e,t){this.c=e,this.f=t,this.a=[]}te.prototype.load=function(e){var t=new d,n=this.c,a=new J(this.a.api,this.a.text),i=this.a.families;!function(e,t){for(var n=t.length,a=0;a<n;a++){var i=t[a].split(":");3==i.length&&e.f.push(i.pop());var o="";2==i.length&&""!=i[1]&&(o=":"),e.a.push(i.join(o))}}(a,i);var o=new X(i);!function(e){for(var t=e.f.length,n=0;n<t;n++){var a=e.f[n].split(":"),i=a[0].replace(/\+/g," "),o=["n4"];if(2<=a.length){var l;if(l=[],r=a[1])for(var r,c=(r=r.split(",")).length,s=0;s<c;s++){var u;if((u=r[s]).match(/^[\w-]+$/))if(null==(f=ee.exec(u.toLowerCase())))u="";else{if(u=null==(u=f[2])||""==u?"n":Z[u],null==(f=f[1])||""==f)f="4";else var f=Y[f]||(isNaN(f)?"4":f.substr(0,1));u=[u,f].join("")}else u="";u&&l.push(u)}0<l.length&&(o=l),3==a.length&&(l=[],0<(a=(a=a[2])?a.split(","):l).length&&(a=Q[a[0]])&&(e.c[i]=a))}for(e.c[i]||(a=Q[i])&&(e.c[i]=a),a=0;a<o.length;a+=1)e.a.push(new j(i,o[a]))}}(o),b(n,function(e){if(0==e.a.length)throw Error("No fonts to load!");if(-1!=e.c.indexOf("kit="))return e.c;for(var t=e.a.length,n=[],a=0;a<t;a++)n.push(e.a[a].replace(/ /g,"+"));return t=e.c+"?family="+n.join("%7C"),0<e.f.length&&(t+="&subset="+e.f.join(",")),0<e.g.length&&(t+="&text="+encodeURIComponent(e.g)),t}(a),v(t)),_(t,(function(){e(o.a,o.c,ne)}))},ae.prototype.load=function(e){var t=this.a.id,n=this.c.o;t?m(this.c,(this.a.api||"https://use.typekit.net")+"/"+t+".js",(function(t){if(t)e([]);else if(n.Typekit&&n.Typekit.config&&n.Typekit.config.fn){t=n.Typekit.config.fn;for(var a=[],i=0;i<t.length;i+=2)for(var o=t[i],l=t[i+1],r=0;r<l.length;r++)a.push(new j(o,l[r]));try{n.Typekit.load({events:!1,classes:!1,async:!0})}catch(e){}e(a)}}),2e3):e([])},ie.prototype.load=function(e){var t=this.f.id,n=this.c.o,a=this;t?(n.__webfontfontdeckmodule__||(n.__webfontfontdeckmodule__={}),n.__webfontfontdeckmodule__[t]=function(t,n){for(var i=0,o=n.fonts.length;i<o;++i){var l=n.fonts[i];a.a.push(new j(l.name,T("font-weight:"+l.weight+";font-style:"+l.style)))}e(a.a)},m(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+function(e){return e.o.location.hostname||e.a.location.hostname}(this.c)+"/"+t+".js",(function(t){t&&e([])}))):e([])};var oe=new V(window);oe.a.c.custom=function(e,t){return new $(t,e)},oe.a.c.fontdeck=function(e,t){return new ie(t,e)},oe.a.c.monotype=function(e,t){return new q(t,e)},oe.a.c.typekit=function(e,t){return new ae(t,e)},oe.a.c.google=function(e,t){return new te(t,e)};var le={load:l(oe.load,oe)};void 0===(a=function(){return le}.call(t,n,t,e))||(e.exports=a)}()},477:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n.n(a),o=n(16),l=n(25),r=n(20),c=n(26),s=n(2),u=n(7),f=n(4),h=n(5),g=function(e){var t,n,g,p=e=e.parentProps,b=p.setAttributes,m=p.attributes,d=p.deviceType,v=m.menu_item_count,_=m.titleSpace,y=m.imgHrPadding,w=m.imgVrPadding,j=m.columns,S=m.tcolumns,O=m.mcolumns,E=m.rowGap,T=m.columnGap,C=m.contentHrPadding,F=m.contentVrPadding,k=m.priceColor,P=m.descColor,H=m.titleColor,x=m.seperatorStyle,z=m.seperatorWidth,L=m.seperatorThickness,R=m.seperatorColor,B=m.priceLoadGoogleFonts,M=m.titleLoadGoogleFonts,N=m.descLoadGoogleFonts,A=m.titleFontSizeType,I=m.titleFontSize,G=m.titleFontSizeTablet,W=m.titleFontSizeMobile,D=m.titleFontFamily,V=m.titleFontWeight,U=m.titleFontSubset,q=m.titleLineHeightType,$=m.titleLineHeight,J=m.titleLineHeightTablet,K=m.titleLineHeightMobile,X=m.priceFontSizeType,Q=m.priceFontSize,Y=m.priceFontSizeTablet,Z=m.priceFontSizeMobile,ee=m.priceFontFamily,te=m.priceFontWeight,ne=m.priceFontSubset,ae=m.priceLineHeightType,ie=m.priceLineHeight,oe=m.priceLineHeightTablet,le=m.priceLineHeightMobile,re=m.descFontSizeType,ce=m.descFontSize,se=m.descFontSizeTablet,ue=m.descFontSizeMobile,fe=m.descFontFamily,he=m.descFontWeight,ge=m.descFontSubset,pe=m.descLineHeightType,be=m.descLineHeight,me=m.descLineHeightTablet,de=m.descLineHeightMobile,ve=m.headingTag,_e=m.imagePosition,ye=m.imageAlignment,we=m.imageSize,je=m.imageWidth,Se=m.stack,Oe=function(t){Object(u.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,n){e.attributes.imagePosition=t})),b({imagePosition:t})};if(1==M){var Ee={google:{families:[D+(V?":"+V:"")]}};t=i.a.createElement(r.a,{config:Ee})}if(1==N){var Te={google:{families:[fe+(he?":"+he:"")]}};n=i.a.createElement(r.a,{config:Te})}if(1==B){var Ce={google:{families:[ee+(te?":"+te:"")]}};g=i.a.createElement(r.a,{config:Ce})}var Fe=[{value:"thumbnail",label:Object(s.__)("Thumbnail")},{value:"medium",label:Object(s.__)("Medium")},{value:"full",label:Object(s.__)("Large")}],ke=i.a.createElement(h.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},i.a.createElement(h.Path,{d:"M9 20h6V9H9v11zM4 4v1.5h16V4H4z"}));return i.a.createElement(i.a.Fragment,null,i.a.createElement(f.InspectorControls,null,i.a.createElement(h.PanelBody,{title:Object(s.__)("General"),initialOpen:!0},i.a.createElement(c.a,null),"Desktop"===d&&i.a.createElement(i.a.Fragment,null,i.a.createElement(h.RangeControl,{label:Object(s.__)("Columns"),value:j,onChange:function(t){Object(u.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,n){e.attributes.columns=t})),b({columns:t})},min:1,max:Math.min(3,v)})),"Tablet"===d&&i.a.createElement(i.a.Fragment,null,i.a.createElement(h.RangeControl,{label:Object(s.__)("Columns"),value:S,onChange:function(e){return b({tcolumns:e})},min:1,max:Math.min(3,v)})),"Mobile"===d&&i.a.createElement(i.a.Fragment,null,i.a.createElement(h.RangeControl,{label:Object(s.__)("Columns"),value:O,onChange:function(e){return b({mcolumns:e})},min:1,max:Math.min(3,v)})),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,i.a.createElement("strong",null,Object(s.__)("Image Settings"))),i.a.createElement("h2",null," ",Object(s.__)("Image Position")),i.a.createElement(h.ButtonGroup,{className:"uagb-editor_imgpos_group"},i.a.createElement(h.Button,{key:"left",icon:"editor-alignleft",label:"Left",onClick:function(){return Oe("left")},"aria-pressed":"left"===_e,isPrimary:"left"===_e}),i.a.createElement(h.Button,{key:"top",icon:ke,label:"Top",onClick:function(){return Oe("top")},"aria-pressed":"top"===_e,isPrimary:"top"===_e}),i.a.createElement(h.Button,{key:"right",icon:"editor-alignright",label:"Right",onClick:function(){return Oe("right")},"aria-pressed":"right"===_e,isPrimary:"right"===_e})),("left"==_e||"right"==_e)&&i.a.createElement(i.a.Fragment,null,i.a.createElement(h.SelectControl,{label:Object(s.__)("Vertical Alignment"),value:ye,onChange:function(t){Object(u.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,n){e.attributes.imageAlignment=t})),b({imageAlignment:t})},options:[{value:"top",label:Object(s.__)("Top")},{value:"middle",label:Object(s.__)("Middle")}]}),i.a.createElement(h.SelectControl,{label:Object(s.__)("Stack on"),value:Se,options:[{value:"none",label:Object(s.__)("None")},{value:"tablet",label:Object(s.__)("Tablet")},{value:"mobile",label:Object(s.__)("Mobile")}],help:Object(s.__)("Note: Choose on what breakpoint the Images will stack."),onChange:function(e){return b({stack:e})}})),i.a.createElement(h.SelectControl,{label:Object(s.__)("Image Size"),options:Fe,value:we,onChange:function(t){Object(u.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,n){e.attributes.imageSize=t})),b({imageSize:t})}}),i.a.createElement(h.RangeControl,{label:Object(s.__)("Width"),value:je,onChange:function(e){return b({imageWidth:e})},min:0,max:500,allowReset:!0})),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,i.a.createElement("strong",null,"Separator Settings")),i.a.createElement(h.SelectControl,{label:Object(s.__)("Separator Style"),value:x,onChange:function(e){return b({seperatorStyle:e})},options:[{value:"none",label:Object(s.__)("None")},{value:"solid",label:Object(s.__)("Solid")},{value:"dotted",label:Object(s.__)("Dotted")},{value:"dashed",label:Object(s.__)("Dashed")},{value:"double",label:Object(s.__)("Double")},{value:"groove",label:Object(s.__)("Groove")},{value:"inset",label:Object(s.__)("Inset")},{value:"outset",label:Object(s.__)("Outset")},{value:"ridge",label:Object(s.__)("Ridge")}]}),"none"!=x&&i.a.createElement(i.a.Fragment,null,i.a.createElement(h.RangeControl,{label:Object(s.__)("Separator Width (%)"),value:z,onChange:function(e){return b({seperatorWidth:e})},min:0,max:100,allowReset:!0}),i.a.createElement(h.RangeControl,{label:Object(s.__)("Separator Thickness"),value:L,onChange:function(e){return b({seperatorThickness:e})},min:0,max:20,allowReset:!0}),i.a.createElement(i.a.Fragment,null,i.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Separator Color"),i.a.createElement("span",{className:"components-base-control__label"},i.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:R}}))),i.a.createElement(f.ColorPalette,{value:R,onChange:function(e){return b({seperatorColor:e})},allowReset:!0}))))),i.a.createElement(h.PanelBody,{title:Object(s.__)("Spacing"),initialOpen:!1},i.a.createElement(h.RangeControl,{label:Object(s.__)("Row Gap"),value:E,onChange:function(e){return b({rowGap:e})},min:0,max:50,allowReset:!0}),i.a.createElement(h.RangeControl,{label:Object(s.__)("Column Gap"),value:T,onChange:function(e){return b({columnGap:e})},min:0,max:50,allowReset:!0}),i.a.createElement(h.RangeControl,{label:Object(s.__)("Title Bottom Margin"),value:_,onChange:function(e){return b({titleSpace:e})},min:0,max:50,allowReset:!0}),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement("h2",null,Object(s.__)("Item Padding (px)")),i.a.createElement(h.RangeControl,{label:wp.UAGBBlockIcons.vertical_spacing,className:"uagb-margin-control",value:F,onChange:function(e){return b({contentVrPadding:e})},min:0,max:50,allowReset:!0}),i.a.createElement(h.RangeControl,{label:wp.UAGBBlockIcons.horizontal_spacing,className:"uagb-margin-control",value:C,onChange:function(e){return b({contentHrPadding:e})},min:0,max:50,allowReset:!0}),i.a.createElement(i.a.Fragment,null,i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement("h2",null,Object(s.__)("Image Padding (px)")),i.a.createElement(h.RangeControl,{label:wp.UAGBBlockIcons.vertical_spacing,className:"uagb-margin-control",value:w,onChange:function(e){return b({imgVrPadding:e})},min:0,max:50,allowReset:!0}),i.a.createElement(h.RangeControl,{label:wp.UAGBBlockIcons.horizontal_spacing,className:"uagb-margin-control",value:y,onChange:function(e){return b({imgHrPadding:e})},min:0,max:50,allowReset:!0}))),i.a.createElement(f.PanelColorSettings,{title:Object(s.__)("Color Settings"),initialOpen:!1,colorSettings:[{value:H,onChange:function(e){return b({titleColor:e})},label:Object(s.__)("Title Color")},{value:P,onChange:function(e){return b({descColor:e})},label:Object(s.__)("Content Color")},{value:k,onChange:function(e){return b({priceColor:e})},label:Object(s.__)("Price Color")}]}),i.a.createElement(h.PanelBody,{title:Object(s.__)("Typography"),initialOpen:!1},i.a.createElement("h2",null,Object(s.__)("Title")),i.a.createElement(h.SelectControl,{label:Object(s.__)("Title Tag"),value:ve,onChange:function(t){Object(u.select)("core/block-editor").getBlocks(e.clientId).forEach((function(e,n){e.attributes.headingTag=t})),b({headingTag:t})},options:[{value:"h1",label:Object(s.__)("H1")},{value:"h2",label:Object(s.__)("H2")},{value:"h3",label:Object(s.__)("H3")},{value:"h4",label:Object(s.__)("H4")},{value:"h5",label:Object(s.__)("H5")},{value:"h6",label:Object(s.__)("H6")},{value:"p",label:Object(s.__)("P")},{value:"span",label:Object(s.__)("SPAN")}]}),i.a.createElement(a.Suspense,{fallback:Object(o.a)()},i.a.createElement(l.a,{label:Object(s.__)("Typography"),attributes:m,setAttributes:b,loadGoogleFonts:{value:M,label:"titleLoadGoogleFonts"},fontFamily:{value:D,label:"titleFontFamily"},fontWeight:{value:V,label:"titleFontWeight"},fontSubset:{value:U,label:"titleFontSubset"},fontSizeType:{value:A,label:"titleFontSizeType"},fontSize:{value:I,label:"titleFontSize"},fontSizeMobile:{value:W,label:"titleFontSizeMobile"},fontSizeTablet:{value:G,label:"titleFontSizeTablet"},lineHeightType:{value:q,label:"titleLineHeightType"},lineHeight:{value:$,label:"titleLineHeight"},lineHeightMobile:{value:K,label:"titleLineHeightMobile"},lineHeightTablet:{value:J,label:"titleLineHeightTablet"}}),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement("h2",null,Object(s.__)("Content")),i.a.createElement(l.a,{label:Object(s.__)("Typography"),attributes:m,setAttributes:b,loadGoogleFonts:{value:N,label:"descLoadGoogleFonts"},fontFamily:{value:fe,label:"descFontFamily"},fontWeight:{value:he,label:"descFontWeight"},fontSubset:{value:ge,label:"descFontSubset"},fontSizeType:{value:re,label:"descFontSizeType"},fontSize:{value:ce,label:"descFontSize"},fontSizeMobile:{value:ue,label:"descFontSizeMobile"},fontSizeTablet:{value:se,label:"descFontSizeTablet"},lineHeightType:{value:pe,label:"descLineHeightType"},lineHeight:{value:be,label:"descLineHeight"},lineHeightMobile:{value:de,label:"descLineHeightMobile"},lineHeightTablet:{value:me,label:"descLineHeightTablet"}}),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement("h2",null,Object(s.__)("Price")),i.a.createElement(l.a,{label:Object(s.__)("Typography"),attributes:m,setAttributes:b,loadGoogleFonts:{value:B,label:"priceLoadGoogleFonts"},fontFamily:{value:ee,label:"priceFontFamily"},fontWeight:{value:te,label:"priceFontWeight"},fontSubset:{value:ne,label:"priceFontSubset"},fontSizeType:{value:X,label:"priceFontSizeType"},fontSize:{value:Q,label:"priceFontSize"},fontSizeMobile:{value:Z,label:"priceFontSizeMobile"},fontSizeTablet:{value:Y,label:"priceFontSizeTablet"},lineHeightType:{value:ae,label:"priceLineHeightType"},lineHeight:{value:ie,label:"priceLineHeight"},lineHeightMobile:{value:le,label:"priceLineHeightMobile"},lineHeightTablet:{value:oe,label:"priceLineHeightTablet"}})))),i.a.createElement(a.Suspense,{fallback:Object(o.a)()},t,n,g))};t.default=i.a.memo(g)}}]);