(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[4],{127:function(e,t,n){"use strict";var a=n(11),o=n(27),i=n.n(o),l=n(128),r=n.n(l);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}if(void 0===p)var p=[];var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(l,e);var t,n,a,o,i=(a=l,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(a);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e)).state={status:void 0},t.handleLoading=function(){t.setState({status:"loading"})},t.addFont=function(e){p.includes(e)||p.push(e)},t.handleActive=function(){t.setState({status:"active"})},t.handleInactive=function(){t.setState({status:"inactive"})},t.loadFonts=function(){p.includes(t.props.config.google.families[0])||(r.a.load(c(c({},t.props.config),{},{loading:t.handleLoading,active:t.handleActive,inactive:t.handleInactive})),t.addFont(t.props.config.google.families[0]))},t}return t=l,(n=[{key:"componentDidMount",value:function(){this.loadFonts()}},{key:"componentDidUpdate",value:function(e,t){var n=this.props,a=n.onStatus,o=n.config;t.status!==this.state.status&&a(this.state.status),e.config!==o&&this.loadFonts()}},{key:"render",value:function(){return this.props.children||null}}])&&h(t.prototype,n),l}(a.Component);m.propTypes={config:i.a.object.isRequired,children:i.a.element,onStatus:i.a.func.isRequired},m.defaultProps={onStatus:function(){}},t.a=m},128:function(e,t,n){var a;!function(){function o(e,t,n){return e.call.apply(e.bind,arguments)}function i(e,t,n){if(!e)throw Error();if(2<arguments.length){var a=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,a),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function l(e,t,n){return(l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?o:i).apply(null,arguments)}var r=Date.now||function(){return+new Date};function s(e,t){this.a=e,this.o=t||e,this.c=this.o.document}var u=!!window.FontFace;function c(e,t,n,a){if(t=e.c.createElement(t),n)for(var o in n)n.hasOwnProperty(o)&&("style"==o?t.style.cssText=n[o]:t.setAttribute(o,n[o]));return a&&t.appendChild(e.c.createTextNode(a)),t}function f(e,t,n){(e=e.c.getElementsByTagName(t)[0])||(e=document.documentElement),e.insertBefore(n,e.lastChild)}function h(e){e.parentNode&&e.parentNode.removeChild(e)}function g(e,t,n){t=t||[],n=n||[];for(var a=e.className.split(/\s+/),o=0;o<t.length;o+=1){for(var i=!1,l=0;l<a.length;l+=1)if(t[o]===a[l]){i=!0;break}i||a.push(t[o])}for(t=[],o=0;o<a.length;o+=1){for(i=!1,l=0;l<n.length;l+=1)if(a[o]===n[l]){i=!0;break}i||t.push(a[o])}e.className=t.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function b(e,t){for(var n=e.className.split(/\s+/),a=0,o=n.length;a<o;a++)if(n[a]==t)return!0;return!1}function d(e,t,n){function a(){r&&o&&i&&(r(l),r=null)}t=c(e,"link",{rel:"stylesheet",href:t,media:"all"});var o=!1,i=!0,l=null,r=n||null;u?(t.onload=function(){o=!0,a()},t.onerror=function(){o=!0,l=Error("Stylesheet failed to load"),a()}):setTimeout((function(){o=!0,a()}),0),f(e,"head",t)}function p(e,t,n,a){var o=e.c.getElementsByTagName("head")[0];if(o){var i=c(e,"script",{src:t}),l=!1;return i.onload=i.onreadystatechange=function(){l||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(l=!0,n&&n(null),i.onload=i.onreadystatechange=null,"HEAD"==i.parentNode.tagName&&o.removeChild(i))},o.appendChild(i),setTimeout((function(){l||(l=!0,n&&n(Error("Script load timeout")))}),a||5e3),i}return null}function m(){this.a=0,this.c=null}function v(e){return e.a++,function(){e.a--,_(e)}}function y(e,t){e.c=t,_(e)}function _(e){0==e.a&&e.c&&(e.c(),e.c=null)}function w(e){this.a=e||"-"}function S(e,t){this.c=e,this.f=4,this.a="n";var n=(t||"n4").match(/^([nio])([1-9])$/i);n&&(this.a=n[1],this.f=parseInt(n[2],10))}function j(e){var t=[];e=e.split(/,\s*/);for(var n=0;n<e.length;n++){var a=e[n].replace(/['"]/g,"");-1!=a.indexOf(" ")||/^\d/.test(a)?t.push("'"+a+"'"):t.push(a)}return t.join(",")}function E(e){return e.a+e.f}function O(e){var t="normal";return"o"===e.a?t="oblique":"i"===e.a&&(t="italic"),t}function C(e){var t=4,n="n",a=null;return e&&((a=e.match(/(normal|oblique|italic)/i))&&a[1]&&(n=a[1].substr(0,1).toLowerCase()),(a=e.match(/([1-9]00|normal|bold)/i))&&a[1]&&(/bold/i.test(a[1])?t=7:/[1-9]00/.test(a[1])&&(t=parseInt(a[1].substr(0,1),10)))),n+t}function H(e,t){this.c=e,this.f=e.o.document.documentElement,this.h=t,this.a=new w("-"),this.j=!1!==t.events,this.g=!1!==t.classes}function T(e){if(e.g){var t=b(e.f,e.a.c("wf","active")),n=[],a=[e.a.c("wf","loading")];t||n.push(e.a.c("wf","inactive")),g(e.f,n,a)}F(e,"inactive")}function F(e,t,n){e.j&&e.h[t]&&(n?e.h[t](n.c,E(n)):e.h[t]())}function k(){this.c={}}function x(e,t){this.c=e,this.f=t,this.a=c(this.c,"span",{"aria-hidden":"true"},this.f)}function P(e){f(e.c,"body",e.a)}function z(e){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+j(e.c)+";font-style:"+O(e)+";font-weight:"+e.f+"00;"}function N(e,t,n,a,o,i){this.g=e,this.j=t,this.a=a,this.c=n,this.f=o||3e3,this.h=i||void 0}function R(e,t,n,a,o,i,l){this.v=e,this.B=t,this.c=n,this.a=a,this.s=l||"BESbswy",this.f={},this.w=o||3e3,this.u=i||null,this.m=this.j=this.h=this.g=null,this.g=new x(this.c,this.s),this.h=new x(this.c,this.s),this.j=new x(this.c,this.s),this.m=new x(this.c,this.s),e=z(e=new S(this.a.c+",serif",E(this.a))),this.g.a.style.cssText=e,e=z(e=new S(this.a.c+",sans-serif",E(this.a))),this.h.a.style.cssText=e,e=z(e=new S("serif",E(this.a))),this.j.a.style.cssText=e,e=z(e=new S("sans-serif",E(this.a))),this.m.a.style.cssText=e,P(this.g),P(this.h),P(this.j),P(this.m)}w.prototype.c=function(e){for(var t=[],n=0;n<arguments.length;n++)t.push(arguments[n].replace(/[\W_]+/g,"").toLowerCase());return t.join(this.a)},N.prototype.start=function(){var e=this.c.o.document,t=this,n=r(),a=new Promise((function(a,o){!function i(){r()-n>=t.f?o():e.fonts.load(function(e){return O(e)+" "+e.f+"00 300px "+j(e.c)}(t.a),t.h).then((function(e){1<=e.length?a():setTimeout(i,25)}),(function(){o()}))}()})),o=null,i=new Promise((function(e,n){o=setTimeout(n,t.f)}));Promise.race([i,a]).then((function(){o&&(clearTimeout(o),o=null),t.g(t.a)}),(function(){t.j(t.a)}))};var L={D:"serif",C:"sans-serif"},A=null;function B(){if(null===A){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);A=!!e&&(536>parseInt(e[1],10)||536===parseInt(e[1],10)&&11>=parseInt(e[2],10))}return A}function W(e,t,n){for(var a in L)if(L.hasOwnProperty(a)&&t===e.f[L[a]]&&n===e.f[L[a]])return!0;return!1}function I(e,t){setTimeout(l((function(){h(this.g.a),h(this.h.a),h(this.j.a),h(this.m.a),t(this.a)}),e),0)}function M(e,t,n){this.c=e,this.a=t,this.f=0,this.m=this.j=!1,this.s=n}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.m.a.offsetWidth,this.A=r(),function e(t){var n,a=t.g.a.offsetWidth,o=t.h.a.offsetWidth;(n=a===t.f.serif&&o===t.f["sans-serif"])||(n=B()&&W(t,a,o)),n?r()-t.A>=t.w?B()&&W(t,a,o)&&(null===t.u||t.u.hasOwnProperty(t.a.c))?I(t,t.v):I(t,t.B):function(t){setTimeout(l((function(){e(this)}),t),50)}(t):I(t,t.v)}(this)};var G=null;function D(e){0==--e.f&&e.j&&(e.m?((e=e.a).g&&g(e.f,[e.a.c("wf","active")],[e.a.c("wf","loading"),e.a.c("wf","inactive")]),F(e,"active")):T(e.a))}function q(e){this.j=e,this.a=new k,this.h=0,this.f=this.g=!0}function $(e,t,n,a,o){var i=0==--e.h;(e.f||e.g)&&setTimeout((function(){var e=o||null,r=a||{};if(0===n.length&&i)T(t.a);else{t.f+=n.length,i&&(t.j=i);var s,u=[];for(s=0;s<n.length;s++){var c=n[s],f=r[c.c],h=t.a,b=c;if(h.g&&g(h.f,[h.a.c("wf",b.c,E(b).toString(),"loading")]),F(h,"fontloading",b),h=null,null===G)if(window.FontFace){b=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);var d=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);G=b?42<parseInt(b[1],10):!d}else G=!1;h=G?new N(l(t.g,t),l(t.h,t),t.c,c,t.s,f):new R(l(t.g,t),l(t.h,t),t.c,c,t.s,e,f),u.push(h)}for(s=0;s<u.length;s++)u[s].start()}}),0)}function U(e,t){this.c=e,this.a=t}function J(e,t){this.c=e,this.a=t}function V(e,t){this.c=e||K,this.a=[],this.f=[],this.g=t||""}M.prototype.g=function(e){var t=this.a;t.g&&g(t.f,[t.a.c("wf",e.c,E(e).toString(),"active")],[t.a.c("wf",e.c,E(e).toString(),"loading"),t.a.c("wf",e.c,E(e).toString(),"inactive")]),F(t,"fontactive",e),this.m=!0,D(this)},M.prototype.h=function(e){var t=this.a;if(t.g){var n=b(t.f,t.a.c("wf",e.c,E(e).toString(),"active")),a=[],o=[t.a.c("wf",e.c,E(e).toString(),"loading")];n||a.push(t.a.c("wf",e.c,E(e).toString(),"inactive")),g(t.f,a,o)}F(t,"fontinactive",e),D(this)},q.prototype.load=function(e){this.c=new s(this.j,e.context||this.j),this.g=!1!==e.events,this.f=!1!==e.classes,function(e,t,n){var a=[],o=n.timeout;!function(e){e.g&&g(e.f,[e.a.c("wf","loading")]),F(e,"loading")}(t),a=function(e,t,n){var a,o=[];for(a in t)if(t.hasOwnProperty(a)){var i=e.c[a];i&&o.push(i(t[a],n))}return o}(e.a,n,e.c);var i=new M(e.c,t,o);for(e.h=a.length,t=0,n=a.length;t<n;t++)a[t].load((function(t,n,a){$(e,i,t,n,a)}))}(this,new H(this.c,e),e)},U.prototype.load=function(e){var t=this,n=t.a.projectId,a=t.a.version;if(n){var o=t.c.o;p(this.c,(t.a.api||"https://fast.fonts.net/jsapi")+"/"+n+".js"+(a?"?v="+a:""),(function(a){a?e([]):(o["__MonotypeConfiguration__"+n]=function(){return t.a},function t(){if(o["__mti_fntLst"+n]){var a,i=o["__mti_fntLst"+n](),l=[];if(i)for(var r=0;r<i.length;r++){var s=i[r].fontfamily;null!=i[r].fontStyle&&null!=i[r].fontWeight?(a=i[r].fontStyle+i[r].fontWeight,l.push(new S(s,a))):l.push(new S(s))}e(l)}else setTimeout((function(){t()}),50)}())})).id="__MonotypeAPIScript__"+n}else e([])},J.prototype.load=function(e){var t,n,a=this.a.urls||[],o=this.a.families||[],i=this.a.testStrings||{},l=new m;for(t=0,n=a.length;t<n;t++)d(this.c,a[t],v(l));var r=[];for(t=0,n=o.length;t<n;t++)if((a=o[t].split(":"))[1])for(var s=a[1].split(","),u=0;u<s.length;u+=1)r.push(new S(a[0],s[u]));else r.push(new S(a[0]));y(l,(function(){e(r,i)}))};var K="https://fonts.googleapis.com/css";function X(e){this.f=e,this.a=[],this.c={}}var Q={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},Y={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Z={i:"i",italic:"i",n:"n",normal:"n"},ee=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function te(e,t){this.c=e,this.a=t}var ne={Arimo:!0,Cousine:!0,Tinos:!0};function ae(e,t){this.c=e,this.a=t}function oe(e,t){this.c=e,this.f=t,this.a=[]}te.prototype.load=function(e){var t=new m,n=this.c,a=new V(this.a.api,this.a.text),o=this.a.families;!function(e,t){for(var n=t.length,a=0;a<n;a++){var o=t[a].split(":");3==o.length&&e.f.push(o.pop());var i="";2==o.length&&""!=o[1]&&(i=":"),e.a.push(o.join(i))}}(a,o);var i=new X(o);!function(e){for(var t=e.f.length,n=0;n<t;n++){var a=e.f[n].split(":"),o=a[0].replace(/\+/g," "),i=["n4"];if(2<=a.length){var l;if(l=[],r=a[1])for(var r,s=(r=r.split(",")).length,u=0;u<s;u++){var c;if((c=r[u]).match(/^[\w-]+$/))if(null==(f=ee.exec(c.toLowerCase())))c="";else{if(c=null==(c=f[2])||""==c?"n":Z[c],null==(f=f[1])||""==f)f="4";else var f=Y[f]||(isNaN(f)?"4":f.substr(0,1));c=[c,f].join("")}else c="";c&&l.push(c)}0<l.length&&(i=l),3==a.length&&(l=[],0<(a=(a=a[2])?a.split(","):l).length&&(a=Q[a[0]])&&(e.c[o]=a))}for(e.c[o]||(a=Q[o])&&(e.c[o]=a),a=0;a<i.length;a+=1)e.a.push(new S(o,i[a]))}}(i),d(n,function(e){if(0==e.a.length)throw Error("No fonts to load!");if(-1!=e.c.indexOf("kit="))return e.c;for(var t=e.a.length,n=[],a=0;a<t;a++)n.push(e.a[a].replace(/ /g,"+"));return t=e.c+"?family="+n.join("%7C"),0<e.f.length&&(t+="&subset="+e.f.join(",")),0<e.g.length&&(t+="&text="+encodeURIComponent(e.g)),t}(a),v(t)),y(t,(function(){e(i.a,i.c,ne)}))},ae.prototype.load=function(e){var t=this.a.id,n=this.c.o;t?p(this.c,(this.a.api||"https://use.typekit.net")+"/"+t+".js",(function(t){if(t)e([]);else if(n.Typekit&&n.Typekit.config&&n.Typekit.config.fn){t=n.Typekit.config.fn;for(var a=[],o=0;o<t.length;o+=2)for(var i=t[o],l=t[o+1],r=0;r<l.length;r++)a.push(new S(i,l[r]));try{n.Typekit.load({events:!1,classes:!1,async:!0})}catch(e){}e(a)}}),2e3):e([])},oe.prototype.load=function(e){var t=this.f.id,n=this.c.o,a=this;t?(n.__webfontfontdeckmodule__||(n.__webfontfontdeckmodule__={}),n.__webfontfontdeckmodule__[t]=function(t,n){for(var o=0,i=n.fonts.length;o<i;++o){var l=n.fonts[o];a.a.push(new S(l.name,C("font-weight:"+l.weight+";font-style:"+l.style)))}e(a.a)},p(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+function(e){return e.o.location.hostname||e.a.location.hostname}(this.c)+"/"+t+".js",(function(t){t&&e([])}))):e([])};var ie=new q(window);ie.a.c.custom=function(e,t){return new J(t,e)},ie.a.c.fontdeck=function(e,t){return new oe(t,e)},ie.a.c.monotype=function(e,t){return new U(t,e)},ie.a.c.typekit=function(e,t){return new ae(t,e)},ie.a.c.google=function(e,t){return new te(t,e)};var le={load:l(ie.load,ie)};void 0===(a=function(){return le}.call(t,n,t,e))||(e.exports=a)}()},456:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(9),l=n(19),r=n(127),s=n(2),u=n(4),c=n(5),f=function(e){var t,n,f=e=e.parentProps,h=f.attributes,g=f.setAttributes,b=h.headingAlign,d=h.headingColor,p=h.subHeadingColor,m=h.separatorColor,v=h.headingTag,y=h.headFontFamily,_=h.headFontWeight,w=h.headFontSubset,S=h.headFontSizeType,j=h.headFontSize,E=h.headFontSizeMobile,O=h.headFontSizeTablet,C=h.headLineHeightType,H=h.headLineHeight,T=h.headLineHeightMobile,F=h.headLineHeightTablet,k=h.subHeadFontFamily,x=h.subHeadFontWeight,P=h.subHeadFontSubset,z=h.subHeadFontSize,N=h.subHeadFontSizeType,R=h.subHeadFontSizeMobile,L=h.subHeadFontSizeTablet,A=h.subHeadLineHeight,B=h.subHeadLineHeightType,W=h.subHeadLineHeightMobile,I=h.subHeadLineHeightTablet,M=h.separatorWidth,G=h.separatorWidthType,D=h.seperatorStyle,q=h.separatorHeight,$=h.headSpace,U=h.separatorSpace,J=h.headLoadGoogleFonts,V=h.subHeadLoadGoogleFonts;if(!0===J){var K={google:{families:[y+(_?":"+_:"")]}};t=o.a.createElement(r.a,{config:K})}if(!0===V){var X={google:{families:[k+(x?":"+x:"")]}};n=o.a.createElement(r.a,{config:X})}return o.a.createElement("div",null,o.a.createElement(u.BlockControls,{key:"controls"},o.a.createElement(u.AlignmentToolbar,{value:b,onChange:function(e){return g({headingAlign:e})}})),o.a.createElement(u.InspectorControls,null,o.a.createElement(c.PanelBody,{title:Object(s.__)("Advanced Heading","ultimate-addons-for-gutenberg")},o.a.createElement("h2",null,Object(s.__)("Heading","ultimate-addons-for-gutenberg")),o.a.createElement(c.SelectControl,{label:Object(s.__)("Heading Tag","ultimate-addons-for-gutenberg"),value:v,onChange:function(e){g({headingTag:e})},options:[{value:"h1",label:Object(s.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(s.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(s.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(s.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(s.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(s.__)("H6","ultimate-addons-for-gutenberg")}]}),o.a.createElement(l.a,{label:Object(s.__)("Typography","ultimate-addons-for-gutenberg"),attributes:h,setAttributes:g,loadGoogleFonts:{value:J,label:"headLoadGoogleFonts"},fontFamily:{value:y,label:"headFontFamily"},fontWeight:{value:_,label:"headFontWeight"},fontSubset:{value:w,label:"headFontSubset"},fontSizeType:{value:S,label:"headFontSizeType"},fontSize:{value:j,label:"headFontSize"},fontSizeMobile:{value:E,label:"headFontSizeMobile"},fontSizeTablet:{value:O,label:"headFontSizeTablet"},lineHeightType:{value:C,label:"headLineHeightType"},lineHeight:{value:H,label:"headLineHeight"},lineHeightMobile:{value:T,label:"headLineHeightMobile"},lineHeightTablet:{value:F,label:"headLineHeightTablet"}}),o.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Heading Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:d}}))),o.a.createElement(u.ColorPalette,{value:d,onChange:function(e){return g({headingColor:e})},allowReset:!0}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(s.__)("Sub-Heading","ultimate-addons-for-gutenberg")),o.a.createElement(a.Suspense,{fallback:Object(i.a)()},o.a.createElement(l.a,{label:Object(s.__)("Typography","ultimate-addons-for-gutenberg"),attributes:h,setAttributes:g,loadGoogleFonts:{value:V,label:"subHeadLoadGoogleFonts"},fontFamily:{value:k,label:"subHeadFontFamily"},fontWeight:{value:x,label:"subHeadFontWeight"},fontSubset:{value:P,label:"subHeadFontSubset"},fontSizeType:{value:N,label:"subHeadFontSizeType"},fontSize:{value:z,label:"subHeadFontSize"},fontSizeMobile:{value:R,label:"subHeadFontSizeMobile"},fontSizeTablet:{value:L,label:"subHeadFontSizeTablet"},lineHeightType:{value:B,label:"subHeadLineHeightType"},lineHeight:{value:A,label:"subHeadLineHeight"},lineHeightMobile:{value:W,label:"subHeadLineHeightMobile"},lineHeightTablet:{value:I,label:"subHeadLineHeightTablet"}})),o.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Sub Heading Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:p}}))),o.a.createElement(u.ColorPalette,{value:p,onChange:function(e){return g({subHeadingColor:e})},allowReset:!0})),o.a.createElement(c.PanelBody,{title:Object(s.__)("Separator","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c.SelectControl,{label:Object(s.__)("Style","ultimate-addons-for-gutenberg"),value:D,onChange:function(e){return g({seperatorStyle:e})},options:[{value:"none",label:Object(s.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(s.__)("Solid","ultimate-addons-for-gutenberg")},{value:"double",label:Object(s.__)("Double","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(s.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(s.__)("Dotted","ultimate-addons-for-gutenberg")}]}),"none"!==D&&o.a.createElement(o.a.Fragment,null,o.a.createElement(c.RangeControl,{label:Object(s.__)("Thickness (px)","ultimate-addons-for-gutenberg"),value:q,onChange:function(e){return g({separatorHeight:e})},min:0,max:20,beforeIcon:"",allowReset:!0,initialPosition:3}),o.a.createElement(c.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(s.__)("Size Type","ultimate-addons-for-gutenberg")},o.a.createElement(c.Button,{key:"px",className:"uagb-size-btn",isSmall:!0,isPrimary:"px"===G,"aria-pressed":"px"===G,onClick:function(){return g({separatorWidthType:"px"})}},"px"),o.a.createElement(c.Button,{key:"%",className:"uagb-size-btn",isSmall:!0,isPrimary:"%"===G,"aria-pressed":"%"===G,onClick:function(){return g({separatorWidthType:"%"})}},"%")),o.a.createElement(c.RangeControl,{label:Object(s.__)("Width","ultimate-addons-for-gutenberg"),value:M,onChange:function(e){return g({separatorWidth:e})},min:0,max:"%"===G?100:500,beforeIcon:"",allowReset:!0,initialPosition:20}),"none"!==D&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Separator Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:m}}))),o.a.createElement(u.ColorPalette,{value:m,onChange:function(e){return g({separatorColor:e})},allowReset:!0})))),o.a.createElement(c.PanelBody,{title:Object(s.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c.RangeControl,{label:Object(s.__)("Heading Bottom Spacing (px)","ultimate-addons-for-gutenberg"),value:$,onChange:function(e){return g({headSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0,initialPosition:0}),"none"!==D&&o.a.createElement(c.RangeControl,{label:Object(s.__)("Separator Bottom Spacing (px)","ultimate-addons-for-gutenberg"),value:U,onChange:function(e){return g({separatorSpace:e})},min:0,max:500,beforeIcon:"",allowReset:!0,initialPosition:0}))),o.a.createElement(a.Suspense,{fallback:Object(i.a)()},t,n))};t.default=o.a.memo(f)},516:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(9),l=n(19),r=n(127),s=n(2),u=n(4),c=n(5),f=n(11),h=function(e){var t,n=e=e.parentProps,h=n.attributes,g=n.setAttributes,b=n.attributes,d=b.rating,p=b.range,m=b.align,v=b.size,y=b.gap,_=b.unmarkedColor,w=b.color,S=b.title,j=b.loadGoogleFonts,E=b.fontFamily,O=b.fontWeight,C=b.fontSubset,H=b.fontSizeType,T=b.fontSize,F=b.fontSizeMobile,k=b.fontSizeTablet,x=b.lineHeightType,P=b.lineHeight,z=b.lineHeightMobile,N=b.lineHeightTablet,R=b.titleColor,L=b.titleGap;if(1==j){var A={google:{families:[E+(O?":"+O:"")]}};t=o.a.createElement(r.a,{config:A})}return o.a.createElement("div",null,o.a.createElement(u.InspectorControls,null,o.a.createElement(c.PanelBody,{title:Object(s.__)("General","ultimate-addons-for-gutenberg")},o.a.createElement(c.SelectControl,{label:Object(s.__)("Range","ultimate-addons-for-gutenberg"),value:p,onChange:function(e){return g({range:e})},options:[{value:"5",label:Object(s.__)("1-5","ultimate-addons-for-gutenberg")},{value:"10",label:Object(s.__)("1-10","ultimate-addons-for-gutenberg")}]}),o.a.createElement(c.RangeControl,{label:Object(s.__)("Rating","ultimate-addons-for-gutenberg"),value:d,onChange:function(e){return g({rating:e})},min:0,max:p,beforeIcon:"",allowReset:!0,step:.1,initialPosition:0}),o.a.createElement("hr",null),o.a.createElement(c.BaseControl,null,o.a.createElement(c.BaseControl.VisualLabel,null,Object(s.__)("Alignment","ultimate-addons-for-gutenberg")),o.a.createElement(u.BlockAlignmentToolbar,{value:m,onChange:function(e){return g({align:e})},controls:["left","center","right","full"],isCollapsed:!1})),o.a.createElement(c.RangeControl,{label:Object(s.__)("Size","ultimate-addons-for-gutenberg"),value:v,onChange:function(e){return g({size:e})},min:0,max:100,beforeIcon:"",allowReset:!0,initialPosition:0}),o.a.createElement(c.RangeControl,{label:Object(s.__)("Spacing","ultimate-addons-for-gutenberg"),value:y,onChange:function(e){return g({gap:e})},min:0,max:50,beforeIcon:"",allowReset:!0,initialPosition:0})),o.a.createElement(c.PanelBody,{title:Object(s.__)("Design","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement("h3",null,Object(s.__)("Star","ultimate-addons-for-gutenberg")),o.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:w}}))),o.a.createElement(u.ColorPalette,{value:w,onChange:function(e){return g({color:e})},allowReset:!0}),o.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Unmarked Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:_}}))),o.a.createElement(u.ColorPalette,{value:_,onChange:function(e){return g({unmarkedColor:e})},allowReset:!0}),o.a.createElement("hr",null),""!==S&&o.a.createElement(f.Fragment,null,o.a.createElement("h3",null,Object(s.__)("Title","ultimate-addons-for-gutenberg")),o.a.createElement(l.a,{label:Object(s.__)("Typography","ultimate-addons-for-gutenberg"),attributes:h,setAttributes:g,loadGoogleFonts:{value:j,label:"loadGoogleFonts"},fontFamily:{value:E,label:"fontFamily"},fontWeight:{value:O,label:"fontWeight"},fontSubset:{value:C,label:"fontSubset"},fontSizeType:{value:H,label:"fontSizeType"},fontSize:{value:T,label:"fontSize"},fontSizeMobile:{value:F,label:"fontSizeMobile"},fontSizeTablet:{value:k,label:"fontSizeTablet"},lineHeightType:{value:x,label:"lineHeightType"},lineHeight:{value:P,label:"lineHeight"},lineHeightMobile:{value:z,label:"lineHeightMobile"},lineHeightTablet:{value:N,label:"lineHeightTablet"}}),o.a.createElement("p",{className:"uagb-setting-label"},Object(s.__)("Title Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:R}}))),o.a.createElement(u.ColorPalette,{value:R,onChange:function(e){return g({titleColor:e})},allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(s.__)("Title Gap","ultimate-addons-for-gutenberg"),value:L,onChange:function(e){return g({titleGap:e})},min:0,max:50,beforeIcon:"",allowReset:!0,initialPosition:0})))),o.a.createElement(a.Suspense,{fallback:Object(i.a)()},t))};t.default=o.a.memo(h)}}]);