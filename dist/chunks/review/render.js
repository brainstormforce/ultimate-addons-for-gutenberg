(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{557:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),i=a(4),o=a(2),l=a(57);function u(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return c(e,void 0);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?c(e,void 0):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var s=function(e){var t=e.ID,a=e.items,r=e.summaryTitle,n=e.summaryDescription,c=e.starCount,s=e.setItems,m=e.setSummaryDescription,g=e.setSummaryTitle,d=e.setTitle,v=e.setDescription,f=e.setAuthorName,h=e.inactiveStarColor,b=e.activeStarColor,p=e.selectedStarColor,y=e.starOutlineColor,S=e.ctaTarget,_=e.ctaLink,C=e.setActiveStarIndex,w=e.rTitle,E=e.rContent,N=e.rAuthor,R=e.headingTag,T=e.image_icon_html,A=e.showfeature,O=e.imageEnabled,k=e.descriptionEnabled,I=e.showauthor,j=e.state.average,D=a.map((function(e){return e.value})).reduce((function(e,t){return e+t}))/a.length;j!==D&&e.setStateValue({average:D});var V="_self";return S&&(V="_blank"),React.createElement("div",{className:"uagb_review_block"},React.createElement("a",{href:_,className:"uagb-rating-link-wrapper",target:V,rel:"noopener noreferrer"},React.createElement(i.RichText,{tagName:R,placeholder:Object(o.__)("Title of the review","ultimate-addons-for-gutenberg"),keepPlaceholderOnFocus:!0,value:w,className:"uagb-rating-title",onChange:function(e){return d(e)}})),!0===k&&React.createElement(i.RichText,{tagName:"p",placeholder:Object(o.__)("Review Description","ultimate-addons-for-gutenberg"),keepPlaceholderOnFocus:!0,value:E,className:"uagb-rating-desc",onChange:function(e){return v(e)}}),!0===I&&React.createElement(i.RichText,{tagName:"p",placeholder:Object(o.__)("Review Author","ultimate-addons-for-gutenberg"),keepPlaceholderOnFocus:!0,value:N,className:"uagb-rating-author",onChange:function(e){return f(e)}}),!0===O&&React.createElement("div",{className:"uagb-rating__source-wrap"},T),a.map((function(r,n){return!0===A&&React.createElement("div",{className:"uagb_review_entry",key:n},React.createElement(i.RichText,{style:{marginRight:"auto"},placeholder:Object(o.__)("Edit feature"),value:r.label,onChange:function(e){return s([].concat(u(a.slice(0,n)),[{label:e,value:r.value}],u(a.slice(n+1))))}}),React.createElement("div",{style:{marginLeft:"auto",minWidth:a.length>1?120:100}},a.length>1&&React.createElement("div",{className:"dashicons dashicons-trash",onClick:function(){var t=a.slice(0,n).concat(a.slice(n+1,a.length));s(t),e.setStateValue({average:t.map((function(e){return e.value})).reduce((function(e,t){return e+t}))/t.length})}}),React.createElement(l.a,{id:"".concat(t,"-").concat(n),key:n,value:r.value,limit:c,setValue:function(t){var i=[].concat(u(a.slice(0,n)),[{label:r.label,value:t}],u(a.slice(n+1)));s(i),C(n),e.setStateValue({average:i.map((function(e){return e.value})).reduce((function(e,t){return e+t}))/i.length})},inactiveStarColor:h,activeStarColor:b,selectedStarColor:p,starOutlineColor:y,state:e.starState,setStateValue:e.starSetStateValue})))})),!0===A&&React.createElement("div",{title:Object(o.__)("Insert new review entry"),onClick:function(){s([].concat(u(a),[{label:"",value:0}])),e.setStateValue({average:j/(a.length+1)})},className:"uagb_review_add_entry dashicons dashicons-plus-alt"}),React.createElement("div",{className:"uagb_review_summary"},React.createElement(i.RichText,{className:"uagb_review_summary_title",placeholder:Object(o.__)("Title of the summary goes here","ultimate-addons-for-gutenberg"),tagName:"p",onChange:function(e){return g(e)},value:r}),React.createElement("div",{className:"uagb_review_overall_value"},React.createElement(i.RichText,{placeholder:Object(o.__)("Summary of the review goes here","ultimate-addons-for-gutenberg"),onChange:function(e){return m(e)},value:n}),React.createElement("div",{className:"uagb_review_average"},React.createElement("span",{className:"uagb_review_rating"},Math.round(10*j)/10),React.createElement(l.a,{id:"".concat(t,"-average"),className:"uagb_review_average_stars",onHover:function(){return null},onClick:function(){return null},value:j,limit:c,inactiveStarColor:h,activeStarColor:b,selectedStarColor:p,starOutlineColor:y,state:e.starState,setStateValue:e.starSetStateValue})))))},m=a(1),g=a.n(m);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=a){var r,n,i=[],o=!0,l=!1;try{for(a=a.call(e);!(o=(r=a.next()).done)&&(i.push(r.value),!t||i.length!==t);o=!0);}catch(e){l=!0,n=e}finally{try{o||null==a.return||a.return()}finally{if(l)throw n}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?v(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var f=function(e){var t=e=e.parentProps,a=t.attributes,r=a.block_id,i=a.authorName,o=a.itemName,l=a.description,u=a.parts,c=a.starCount,v=a.summaryTitle,f=a.summaryDescription,h=a.inactiveStarColor,b=a.activeStarColor,p=a.ctaLink,y=a.ctaTarget,S=a.rTitle,_=a.rContent,C=a.rAuthor,w=a.headingTag,E=a.mainimage,N=a.imgSize,R=a.showFeature,T=a.showAuthor,A=a.starOutlineColor,O=a.enableDescription,k=a.enableImage,I=t.setAttributes,j=t.isSelected,D=t.className,V={average:e.attributes.parts.map((function(e){return e.value})).reduce((function(e,t){return e+t}))/e.attributes.parts.length},x=d(Object(m.useState)(V),2),F=x[0],L=x[1],z={displayValue:e.value,displayColor:e.activeStarColor},P=d(Object(m.useState)(z),2),M=P[0],U=P[1],J="",$="";void 0!==e.attributes.mainimage&&null!==e.attributes.mainimage&&""!==e.attributes.mainimage&&(J=e.attributes.mainimage.url,$=e.attributes.mainimage.title);var H="";if(""!==J){var W=e.attributes.mainimage.sizes,q=e.attributes.imgSize;H=void 0!==W&&void 0!==W[q]?W[q].url:J}var B="";return E&&E.url&&(B=g.a.createElement("img",{className:"uagb-review__source-image",src:H,title:$})),g.a.createElement("div",{className:n()(D,"uagb-ratings__outer-wrap","uagb-block-".concat(r.substr(0,8)))},g.a.createElement(s,{rTitle:S,setTitle:function(e){return I({rTitle:e})},ctaLink:p,ctaTarget:y,rContent:_,setDescription:function(e){return I({rContent:e})},rAuthor:C,setAuthorName:function(e){return I({rAuthor:e})},headingTag:w,mainimage:E,imgSize:N,image_icon_html:B,isSelected:j,authorName:i,itemName:o,description:l,descriptionEnabled:O,ID:r,imageEnabled:k,items:u,starCount:c,summaryTitle:v,summaryDescription:f,inactiveStarColor:h,activeStarColor:b,selectedStarColor:b,starOutlineColor:A,setItemName:function(e){return I({itemName:e})},setImage:function(e){return I({imgID:e.id,imgURL:e.url,imgAlt:e.alt})},setItems:function(e){return I({parts:e})},setSummaryTitle:function(e){return I({summaryTitle:e})},setSummaryDescription:function(e){return I({summaryDescription:e})},hasFocus:j,setEditable:function(e){return L({editable:e})},setActiveStarIndex:function(e){return L({editedStar:e})},showfeature:R,showauthor:T,state:F,setStateValue:L,starState:M,starSetStateValue:U}))};t.default=g.a.memo(f)}}]);