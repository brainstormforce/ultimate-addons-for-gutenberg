(window.webpackJsonp_ultimate_addons_for_gutenberg=window.webpackJsonp_ultimate_addons_for_gutenberg||[]).push([[76],{325:function(e,a,t){"use strict";t.r(a);var o=t(3),n=t.n(o),s=t(1),c=t(8),l=t(134),r=Object(s.lazy)((function(){return Promise.all([t.e(108),t.e(76)]).then(t.t.bind(null,341,7))}));a.default=function(e){var a=e.attributes,t=e.className,o=e.latestPosts,i=e.block_id,u=e.deviceType,m=a.columns,b=a.tcolumns,p=a.mcolumns,g=a.imgPosition,d=a.postsToShow,_=a.paginationEventType,f=a.buttonText,E=a.paginationType,N=a.layoutConfig,R=o.length>d?o.slice(0,d):o;return React.createElement("div",{className:n()(t,"uagb-post-grid","uagb-post__arrow-outside","uagb-post__image-position-".concat(g),"uagb-editor-preview-mode-".concat(u.toLowerCase()),"uagb-block-".concat(i)),"data-blog-id":i},React.createElement(s.Suspense,{fallback:Object(c.a)()},React.createElement(r,{className:n()("is-masonry","uagb-post__columns-".concat(m),"uagb-post__columns-tablet-".concat(b),"uagb-post__columns-mobile-".concat(p),"uagb-post__items")},React.createElement(l.b,{parentName:"uagb/post-masonry",parentClassName:"uagb-block-grid"},R.map((function(a,t){return React.createElement("article",{key:t},React.createElement("div",{key:t,className:"uagb-post__inner-wrap"},Object(l.e)("uagb/post-masonry",a,N,e.attributes,e.categoriesList)))}))))),function(){if("infinite"===E){if("scroll"===_)return React.createElement("div",{className:"uagb-post-inf-loader"},React.createElement("div",{className:"uagb-post-loader-1"}),React.createElement("div",{className:"uagb-post-loader-2"}),React.createElement("div",{className:"uagb-post-loader-3"}));if("button"===_)return React.createElement("div",{className:"uagb-post__load-more-wrap"},React.createElement("span",{className:"uagb-post-pagination-button"},React.createElement("a",{className:"uagb-post__load-more"},f)))}}())}}}]);