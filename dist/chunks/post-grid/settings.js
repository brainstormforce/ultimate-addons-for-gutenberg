(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{369:function(e,t,a){"use strict";a.r(t);var n=a(4),l=a(2),o=a.n(l),r=a(10),i=a(0),c=a(7),u=a(6),g=Object(l.lazy)((function(){return Promise.resolve().then(a.bind(null,19))})),s=Object(l.lazy)((function(){return Promise.resolve().then(a.bind(null,13))})),m=Object(l.lazy)((function(){return Promise.resolve().then(a.bind(null,12))})),b=function(e){var t=e.parentProps,a=t.attributes,b=t.setAttributes,d=t.latestPosts,p=t.categoriesList,_=t.deviceType,f=t.taxonomyList,h=(a.block_id,a.displayPostTitle),C=a.displayPostDate,E=a.displayPostComment,v=a.displayPostExcerpt,y=a.displayPostAuthor,O=a.displayPostImage,j=a.displayPostTaxonomy,T=a.imgSize,S=a.imgPosition,F=a.displayPostLink,x=a.newTab,P=a.ctaText,N=a.borderWidth,k=a.borderStyle,B=a.borderColor,H=a.borderHColor,R=a.borderRadius,z=a.btnVPadding,L=a.btnHPadding,w=a.align,M=a.columns,A=a.tcolumns,G=a.mcolumns,W=a.order,D=a.orderBy,I=a.categories,q=a.postsToShow,V=a.rowGap,J=a.columnGap,K=a.bgColor,Q=a.contentPadding,U=a.contentPaddingMobile,X=a.titleColor,Y=a.titleTag,Z=a.titleFontSize,$=a.titleFontSizeType,ee=a.titleFontSizeMobile,te=a.titleFontSizeTablet,ae=a.titleFontFamily,ne=a.titleFontWeight,le=a.titleFontSubset,oe=a.titleLineHeightType,re=a.titleLineHeight,ie=a.titleLineHeightTablet,ce=a.titleLineHeightMobile,ue=a.titleLoadGoogleFonts,ge=a.metaFontSize,se=a.metaFontSizeType,me=a.metaFontSizeMobile,be=a.metaFontSizeTablet,de=a.metaFontFamily,pe=a.metaFontWeight,_e=a.metaFontSubset,fe=a.metaLineHeightType,he=a.metaLineHeight,Ce=a.metaLineHeightTablet,Ee=a.metaLineHeightMobile,ve=a.metaLoadGoogleFonts,ye=a.excerptFontSize,Oe=a.excerptFontSizeType,je=a.excerptFontSizeTablet,Te=a.excerptFontSizeMobile,Se=a.excerptFontFamily,Fe=a.excerptFontWeight,xe=a.excerptFontSubset,Pe=a.excerptLineHeightType,Ne=a.excerptLineHeight,ke=a.excerptLineHeightTablet,Be=a.excerptLineHeightMobile,He=a.excerptLoadGoogleFonts,Re=a.ctaFontSize,ze=a.ctaFontSizeType,Le=a.ctaFontSizeTablet,we=a.ctaFontSizeMobile,Me=a.ctaFontFamily,Ae=a.ctaFontWeight,Ge=a.ctaFontSubset,We=a.ctaLineHeightType,De=a.ctaLineHeight,Ie=a.ctaLineHeightTablet,qe=a.ctaLineHeightMobile,Ve=a.ctaLoadGoogleFonts,Je=a.metaColor,Ke=a.excerptColor,Qe=a.ctaColor,Ue=a.ctaBgColor,Xe=a.ctaHColor,Ye=a.ctaBgHColor,Ze=a.imageBottomSpace,$e=a.titleBottomSpace,et=a.metaBottomSpace,tt=a.excerptBottomSpace,at=a.ctaBottomSpace,nt=a.equalHeight,lt=a.excerptLength,ot=a.overlayOpacity,rt=a.bgOverlayColor,it=a.linkBox,ct=a.postType,ut=a.taxonomyType,gt=a.postPagination,st=a.pageLimit,mt=a.paginationColor,bt=a.paginationBgColor,dt=a.paginationActiveColor,pt=a.paginationBgActiveColor,_t=a.paginationLayout,ft=a.paginationBorderSize,ht=a.paginationBorderRadius,Ct=a.paginationBorderColor,Et=a.paginationBorderActiveColor,vt=a.paginationSpacing,yt=a.paginationAlignment,Ot=a.paginationPrevText,jt=a.paginationNextText,Tt=a.inheritFromTheme,St=a.postDisplaytext,Ft=a.displayPostContentRadio,xt=a.excludeCurrentPost,Pt=(a.layoutConfig,Array.isArray(d)&&d.length),Nt=function(t){var a=e.parentProps.setAttributes;a({postPagination:t}),a({paginationMarkup:"empty"})},kt=function(t){var a=e.parentProps.setAttributes;a({postsToShow:t}),a({paginationMarkup:"empty"})},Bt=function(t){var a=e.parentProps.setAttributes;a({pageLimit:t}),a({paginationMarkup:"empty"})},Ht=function(t){var a=e.parentProps.setAttributes;a({paginationPrevText:t}),a({paginationMarkup:"empty"})},Rt=function(t){var a=e.parentProps.setAttributes;a({paginationNextText:t}),a({paginationMarkup:"empty"})},zt=[],Lt=[{value:"",label:Object(i.__)("All","ultimate-addons-for-gutenberg")}];""!=f&&Object.keys(f).map((function(e,t){return zt.push({value:f[e].name,label:f[e].label})})),""!=p&&Object.keys(p).map((function(e,t){return Lt.push({value:p[e].id,label:p[e].name})}));var wt,Mt,At,Gt,Wt,Dt=function(){return o.a.createElement(u.InspectorControls,null,o.a.createElement(c.PanelBody,{title:Object(i.__)("General","ultimate-addons-for-gutenberg")},o.a.createElement(c.SelectControl,{label:Object(i.__)("Post Type","ultimate-addons-for-gutenberg"),value:ct,onChange:function(t){return function(t){var a=e.parentProps.setAttributes;a({postType:t}),a({categories:""})}(t)},options:uagb_blocks_info.post_types}),o.a.createElement("hr",{className:"uagb-editor__separator"}),""!=f&&o.a.createElement(c.SelectControl,{label:Object(i.__)("Taxonomy","ultimate-addons-for-gutenberg"),value:ut,onChange:function(t){return function(t){var a=e.parentProps.setAttributes;a({taxonomyType:t}),a({categories:""})}(t)},options:zt}),""!=p&&o.a.createElement(o.a.Fragment,null,o.a.createElement(c.SelectControl,{label:f[ut].label,value:I,onChange:function(e){return b({categories:e})},options:Lt}),o.a.createElement("hr",{className:"uagb-editor__separator"})),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Exclude Current Post","ultimate-addons-for-gutenberg"),checked:xt,onChange:function(e){return b({excludeCurrentPost:!xt})}}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Posts Per Page","ultimate-addons-for-gutenberg"),value:q,onChange:kt,min:0,max:500}),o.a.createElement(c.SelectControl,{label:Object(i.__)("Order By"),value:D,onChange:function(e){return b({orderBy:e})},options:[{value:"date",label:Object(i.__)("Date","ultimate-addons-for-gutenberg")},{value:"title",label:Object(i.__)("Title","ultimate-addons-for-gutenberg")},{value:"rand",label:Object(i.__)("Random","ultimate-addons-for-gutenberg")},{value:"menu_order",label:Object(i.__)("Menu Order","ultimate-addons-for-gutenberg")}]}),o.a.createElement(c.SelectControl,{label:Object(i.__)("Order"),value:W,onChange:function(e){return b({order:e})},options:[{value:"desc",label:Object(i.__)("Descending","ultimate-addons-for-gutenberg")},{value:"asc",label:Object(i.__)("Ascending","ultimate-addons-for-gutenberg")}]}),o.a.createElement(g,null),"Desktop"===_&&o.a.createElement(c.RangeControl,{label:Object(i.__)("Columns"),value:M,onChange:function(e){return b({columns:e})},min:1,max:Pt?Math.min(8,d.length):8}),"Tablet"===_&&o.a.createElement(c.RangeControl,{label:Object(i.__)("Columns"),value:A,onChange:function(e){return b({tcolumns:e})},min:1,max:Pt?Math.min(8,d.length):8}),"Mobile"===_&&o.a.createElement(c.RangeControl,{label:Object(i.__)("Columns"),value:G,onChange:function(e){return b({mcolumns:e})},min:1,max:Pt?Math.min(8,d.length):8}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Equal Height","ultimate-addons-for-gutenberg"),checked:nt,onChange:function(e){return b({equalHeight:!nt})}}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Post Pagination","ultimate-addons-for-gutenberg"),checked:gt,onChange:Nt}),1==gt&&o.a.createElement(c.RangeControl,{label:Object(i.__)("Page Limit","ultimate-addons-for-gutenberg"),value:st,onChange:Bt,min:0,max:100}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("If Posts Not Found","ultimate-addons-for-gutenberg")),o.a.createElement(c.TextControl,{autoComplete:"off",label:Object(i.__)("Display Message","ultimate-addons-for-gutenberg"),value:St,onChange:function(e){return b({postDisplaytext:e})}}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Inherit Styling from Theme","ultimate-addons-for-gutenberg"),checked:Tt,onChange:function(e){return b({inheritFromTheme:!Tt})},help:Object(i.__)("This will inherit all the Typography and colors for Title, Meta, Excerpt and Read More button from the theme.","ultimate-addons-for-gutenberg")})),function(){if(!0===gt)return o.a.createElement(c.PanelBody,{title:Object(i.__)("Pagination","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(o.a.Fragment,null,o.a.createElement(c.SelectControl,{label:Object(i.__)("Pagination Layout","ultimate-addons-for-gutenberg"),value:_t,onChange:function(e){return b({paginationLayout:e})},options:[{value:"border",label:Object(i.__)("Border","ultimate-addons-for-gutenberg")},{value:"filled",label:Object(i.__)("Filled","ultimate-addons-for-gutenberg")}]}),o.a.createElement("h2",null," ",Object(i.__)("Pagination Alignment","ultimate-addons-for-gutenberg")),o.a.createElement(c.Button,{key:"left",icon:"editor-alignleft",label:"Left",onClick:function(){return b({paginationAlignment:"left"})},"aria-pressed":"left"===yt,isPrimary:"left"===yt}),o.a.createElement(c.Button,{key:"center",icon:"editor-aligncenter",label:"Right",onClick:function(){return b({paginationAlignment:"center"})},"aria-pressed":"center"===yt,isPrimary:"center"===yt}),o.a.createElement(c.Button,{key:"right",icon:"editor-alignright",label:"Right",onClick:function(){return b({paginationAlignment:"right"})},"aria-pressed":"right"===yt,isPrimary:"right"===yt}),o.a.createElement("hr",{className:"uagb-editor__separator"}),"filled"==_t&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Background Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:bt}}))),o.a.createElement(u.ColorPalette,{value:bt,onChange:function(e){return b({paginationBgColor:e})}}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Background Active Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:pt}}))),o.a.createElement(u.ColorPalette,{value:pt,onChange:function(e){return b({paginationBgActiveColor:e})}})),"border"==_t&&o.a.createElement(o.a.Fragment,null,o.a.createElement(c.RangeControl,{label:Object(i.__)("Border Size","ultimate-addons-for-gutenberg"),value:ft,onChange:function(e){return b({paginationBorderSize:e})},min:0,max:10}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Border Radius","ultimate-addons-for-gutenberg"),value:ht,onChange:function(e){return b({paginationBorderRadius:e})},min:0,max:500}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Border Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ct}}))),o.a.createElement(u.ColorPalette,{value:Ct,onChange:function(e){return b({paginationBorderColor:e})}}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Border Active Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Et}}))),o.a.createElement(u.ColorPalette,{value:Et,onChange:function(e){return b({paginationBorderActiveColor:e})}})),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Text Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:mt}}))),o.a.createElement(u.ColorPalette,{value:mt,onChange:function(e){return b({paginationColor:e})}}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Text Active Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:dt}}))),o.a.createElement(u.ColorPalette,{value:dt,onChange:function(e){return b({paginationActiveColor:e})}}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Spacing","ultimate-addons-for-gutenberg"),value:vt,onChange:function(e){return b({paginationSpacing:e})},help:Object(i.__)("This spacing is between the Post Grid and the Pagination","ultimate-addons-for-gutenberg"),min:0,max:500}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement(c.TextControl,{label:Object(i.__)("Previous Text","ultimate-addons-for-gutenberg"),value:Ot,onChange:Ht}),o.a.createElement(c.TextControl,{label:Object(i.__)("Next Text","ultimate-addons-for-gutenberg"),value:jt,onChange:Rt})))}(),o.a.createElement(c.PanelBody,{title:Object(i.__)("Image","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Featured Image","ultimate-addons-for-gutenberg"),checked:O,onChange:function(e){return b({displayPostImage:!O})}}),1==O&&o.a.createElement(c.SelectControl,{label:Object(i.__)("Image Sizes","ultimate-addons-for-gutenberg"),value:T,onChange:function(e){return b({imgSize:e})},options:uagb_blocks_info.image_sizes}),1==O&&o.a.createElement(c.SelectControl,{label:Object(i.__)("Image Position","ultimate-addons-for-gutenberg"),value:S,onChange:function(e){return b({imgPosition:e})},options:[{value:"top",label:Object(i.__)("Top","ultimate-addons-for-gutenberg")},{value:"background",label:Object(i.__)("Background","ultimate-addons-for-gutenberg")}]}),1==O&&"background"==S&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Background Overlay Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:rt}}))),o.a.createElement(u.ColorPalette,{value:rt,onChange:function(e){return b({bgOverlayColor:e})},allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Overlay Opacity","ultimate-addons-for-gutenberg"),value:ot,onChange:function(e){return b({overlayOpacity:e})},min:0,max:100,allowReset:!0}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Link Complete Box","ultimate-addons-for-gutenberg"),checked:it,onChange:function(e){return b({linkBox:!it})}}))),o.a.createElement(c.PanelBody,{title:Object(i.__)("Content","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Title","ultimate-addons-for-gutenberg"),checked:h,onChange:function(e){return b({displayPostTitle:!h})}}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Author","ultimate-addons-for-gutenberg"),checked:y,onChange:function(e){return b({displayPostAuthor:!y})}}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Date","ultimate-addons-for-gutenberg"),checked:C,onChange:function(e){return b({displayPostDate:!C})}}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Comment","ultimate-addons-for-gutenberg"),checked:E,onChange:function(e){return b({displayPostComment:!E})}}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Taxonomy","ultimate-addons-for-gutenberg"),checked:j,onChange:function(e){return b({displayPostTaxonomy:!j})}}),o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Excerpt","ultimate-addons-for-gutenberg"),checked:v,onChange:function(e){return b({displayPostExcerpt:!v})}}),v&&o.a.createElement(c.RadioControl,{label:Object(i.__)("Show:","ultimate-addons-for-gutenberg"),selected:Ft,options:[{label:Object(i.__)("Excerpt","ultimate-addons-for-gutenberg"),value:"excerpt"},{label:Object(i.__)("Full post","ultimate-addons-for-gutenberg"),value:"full_post"}],onChange:function(e){return b({displayPostContentRadio:e})}}),v&&"excerpt"===Ft&&o.a.createElement(c.RangeControl,{label:Object(i.__)("Max number of words in excerpt","ultimate-addons-for-gutenberg"),value:lt,onChange:function(e){return b({excerptLength:e})},min:1,max:100,allowReset:!0})),(t=o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Hover Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Xe}}))),o.a.createElement(u.ColorPalette,{value:Xe,onChange:function(e){return b({ctaHColor:e})},allowReset:!0}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Background Hover Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ye}}))),o.a.createElement(u.ColorPalette,{value:Ye,onChange:function(e){return b({ctaBgHColor:e})},allowReset:!0}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Border Hover Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:H}}))),o.a.createElement(u.ColorPalette,{value:H,onChange:function(e){return b({borderHColor:e})},allowReset:!0})),l=o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Qe}}))),o.a.createElement(u.ColorPalette,{value:Qe,onChange:function(e){return b({ctaColor:e})},allowReset:!0}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Background Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ue}}))),o.a.createElement(u.ColorPalette,{value:Ue,onChange:function(e){return b({ctaBgColor:e})},allowReset:!0}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Border Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:B}}))),o.a.createElement(u.ColorPalette,{value:B,onChange:function(e){return b({borderColor:e})},allowReset:!0})),o.a.createElement(c.PanelBody,{title:Object(i.__)("Read More Link","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c.ToggleControl,{label:Object(i.__)("Show Read More Link","ultimate-addons-for-gutenberg"),checked:F,onChange:function(e){return b({displayPostLink:!F})}}),F&&o.a.createElement(o.a.Fragment,null,o.a.createElement(c.ToggleControl,{label:Object(i.__)("Open links in New Tab","ultimate-addons-for-gutenberg"),checked:x,onChange:function(e){return b({newTab:!x})}}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("Button Text","ultimate-addons-for-gutenberg")),o.a.createElement(c.TextControl,{label:Object(i.__)("Text","ultimate-addons-for-gutenberg"),value:P,onChange:function(e){return b({ctaText:e})}}),!Tt&&o.a.createElement(o.a.Fragment,null,o.a.createElement(m,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:a,setAttributes:b,loadGoogleFonts:{value:Ve,label:"ctaLoadGoogleFonts"},fontFamily:{value:Me,label:"ctaFontFamily"},fontWeight:{value:Ae,label:"ctaFontWeight"},fontSubset:{value:Ge,label:"ctaFontSubset"},fontSizeType:{value:ze,label:"ctaFontSizeType"},fontSize:{value:Re,label:"ctaFontSize"},fontSizeMobile:{value:we,label:"ctaFontSizeMobile"},fontSizeTablet:{value:Le,label:"ctaFontSizeTablet"},lineHeightType:{value:We,label:"ctaLineHeightType"},lineHeight:{value:De,label:"ctaLineHeight"},lineHeightMobile:{value:qe,label:"ctaLineHeightMobile"},lineHeightTablet:{value:Ie,label:"ctaLineHeightTablet"}}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("Button Border","ultimate-addons-for-gutenberg")),o.a.createElement(c.SelectControl,{label:Object(i.__)("Style","ultimate-addons-for-gutenberg"),value:k,onChange:function(e){return b({borderStyle:e})},options:[{value:"none",label:Object(i.__)("None","ultimate-addons-for-gutenberg")},{value:"solid",label:Object(i.__)("Solid","ultimate-addons-for-gutenberg")},{value:"dashed",label:Object(i.__)("Dashed","ultimate-addons-for-gutenberg")},{value:"dotted",label:Object(i.__)("Dotted","ultimate-addons-for-gutenberg")},{value:"double",label:Object(i.__)("Double","ultimate-addons-for-gutenberg")}]}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Width","ultimate-addons-for-gutenberg"),value:N,onChange:function(e){return b({borderWidth:e})},min:0,max:10,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Rounded Corner","ultimate-addons-for-gutenberg"),value:R,onChange:function(e){return b({borderRadius:e})},min:0,max:50,allowReset:!0}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("Button Padding (px)","ultimate-addons-for-gutenberg")),o.a.createElement(c.RangeControl,{label:n.a.vertical_spacing,className:"uagb-margin-control",value:z,onChange:function(e){return b({btnVPadding:e})},min:0,max:50,allowReset:!0}),o.a.createElement(c.RangeControl,{label:n.a.horizontal_spacing,className:"uagb-margin-control",value:L,onChange:function(e){return b({btnHPadding:e})},min:0,max:50,allowReset:!0}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("Button Colors","ultimate-addons-for-gutenberg")),o.a.createElement(c.TabPanel,{className:"uagb-inspect-tabs uagb-inspect-tabs-col-2",activeClass:"active-tab",tabs:[{name:"normal",title:Object(i.__)("Normal","ultimate-addons-for-gutenberg"),className:"uagb-normal-tab"},{name:"hover",title:Object(i.__)("Hover","ultimate-addons-for-gutenberg"),className:"uagb-hover-tab"}]},(function(e){var a;return a="hover"===e.name?t:l,o.a.createElement("div",null,a)})))))),o.a.createElement(c.PanelBody,{title:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement("h2",null,Object(i.__)("Title","ultimate-addons-for-gutenberg")),o.a.createElement(c.SelectControl,{label:Object(i.__)("Title Tag","ultimate-addons-for-gutenberg"),value:Y,onChange:function(e){return b({titleTag:e})},options:[{value:"h1",label:Object(i.__)("H1","ultimate-addons-for-gutenberg")},{value:"h2",label:Object(i.__)("H2","ultimate-addons-for-gutenberg")},{value:"h3",label:Object(i.__)("H3","ultimate-addons-for-gutenberg")},{value:"h4",label:Object(i.__)("H4","ultimate-addons-for-gutenberg")},{value:"h5",label:Object(i.__)("H5","ultimate-addons-for-gutenberg")},{value:"h6",label:Object(i.__)("H6","ultimate-addons-for-gutenberg")},{value:"span",label:Object(i.__)("span","ultimate-addons-for-gutenberg")},{value:"p",label:Object(i.__)("p","ultimate-addons-for-gutenberg")}]}),!Tt&&o.a.createElement(o.a.Fragment,null,o.a.createElement(m,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:a,setAttributes:b,loadGoogleFonts:{value:ue,label:"titleLoadGoogleFonts"},fontFamily:{value:ae,label:"titleFontFamily"},fontWeight:{value:ne,label:"titleFontWeight"},fontSubset:{value:le,label:"titleFontSubset"},fontSizeType:{value:$,label:"titleFontSizeType"},fontSize:{value:Z,label:"titleFontSize"},fontSizeMobile:{value:ee,label:"titleFontSizeMobile"},fontSizeTablet:{value:te,label:"titleFontSizeTablet"},lineHeightType:{value:oe,label:"titleLineHeightType"},lineHeight:{value:re,label:"titleLineHeight"},lineHeightMobile:{value:ce,label:"titleLineHeightMobile"},lineHeightTablet:{value:ie,label:"titleLineHeightTablet"}}),(y||C||E||j)&&o.a.createElement(o.a.Fragment,null,o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("Meta","ultimate-addons-for-gutenberg")),o.a.createElement(m,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:a,setAttributes:b,loadGoogleFonts:{value:ve,label:"metaLoadGoogleFonts"},fontFamily:{value:de,label:"metaFontFamily"},fontWeight:{value:pe,label:"metaFontWeight"},fontSubset:{value:_e,label:"metaFontSubset"},fontSizeType:{value:se,label:"metaFontSizeType"},fontSize:{value:ge,label:"metaFontSize"},fontSizeMobile:{value:me,label:"metaFontSizeMobile"},fontSizeTablet:{value:be,label:"metaFontSizeTablet"},lineHeightType:{value:fe,label:"metaLineHeightType"},lineHeight:{value:he,label:"metaLineHeight"},lineHeightMobile:{value:Ee,label:"metaLineHeightMobile"},lineHeightTablet:{value:Ce,label:"metaLineHeightTablet"}})),v&&o.a.createElement(o.a.Fragment,null,o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement("h2",null,Object(i.__)("Excerpt","ultimate-addons-for-gutenberg")),o.a.createElement(m,{label:Object(i.__)("Typography","ultimate-addons-for-gutenberg"),attributes:a,setAttributes:b,loadGoogleFonts:{value:He,label:"excerptLoadGoogleFonts"},fontFamily:{value:Se,label:"excerptFontFamily"},fontWeight:{value:Fe,label:"excerptFontWeight"},fontSubset:{value:xe,label:"excerptFontSubset"},fontSizeType:{value:Oe,label:"excerptFontSizeType"},fontSize:{value:ye,label:"excerptFontSize"},fontSizeMobile:{value:Te,label:"excerptFontSizeMobile"},fontSizeTablet:{value:je,label:"excerptFontSizeTablet"},lineHeightType:{value:Pe,label:"excerptLineHeightType"},lineHeight:{value:Ne,label:"excerptLineHeight"},lineHeightMobile:{value:Be,label:"excerptLineHeightMobile"},lineHeightTablet:{value:ke,label:"excerptLineHeightTablet"}})))),o.a.createElement(c.PanelBody,{title:Object(i.__)("Colors","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Blog Background Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:K}}))),o.a.createElement(u.ColorPalette,{value:K,onChange:function(e){return b({bgColor:e})},allowReset:!0}),!Tt&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Title Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:X}}))),o.a.createElement(u.ColorPalette,{value:X,onChange:function(e){return b({titleColor:e})},allowReset:!0}),o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Meta Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Je}}))),o.a.createElement(u.ColorPalette,{value:Je,onChange:function(e){return b({metaColor:e})}}),1==v&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"uagb-setting-label"},Object(i.__)("Excerpt Color","ultimate-addons-for-gutenberg"),o.a.createElement("span",{className:"components-base-control__label"},o.a.createElement("span",{className:"component-color-indicator",style:{backgroundColor:Ke}}))),o.a.createElement(u.ColorPalette,{value:Ke,onChange:function(e){return b({excerptColor:e})},allowReset:!0})))),o.a.createElement(c.PanelBody,{title:Object(i.__)("Spacing","ultimate-addons-for-gutenberg"),initialOpen:!1},o.a.createElement(c.RangeControl,{label:Object(i.__)("Vertical Spacing","ultimate-addons-for-gutenberg"),value:V,onChange:function(e){return b({rowGap:e})},min:0,max:50,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Horizontal Spacing","ultimate-addons-for-gutenberg"),value:J,onChange:function(e){return b({columnGap:e})},min:0,max:50,allowReset:!0}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Content Padding","ultimate-addons-for-gutenberg"),value:Q,onChange:function(e){return b({contentPadding:e})},min:0,max:500,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Content Padding (Mobile)","ultimate-addons-for-gutenberg"),value:U,onChange:function(e){return b({contentPaddingMobile:e})},min:0,max:500,allowReset:!0}),o.a.createElement("hr",{className:"uagb-editor__separator"}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Image Bottom Spacing","ultimate-addons-for-gutenberg"),value:Ze,onChange:function(e){return b({imageBottomSpace:e})},min:0,max:50,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Title Bottom Spacing","ultimate-addons-for-gutenberg"),value:$e,onChange:function(e){return b({titleBottomSpace:e})},min:0,max:50,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Meta Bottom Spacing","ultimate-addons-for-gutenberg"),value:et,onChange:function(e){return b({metaBottomSpace:e})},min:0,max:50,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("Excerpt Bottom Spacing","ultimate-addons-for-gutenberg"),value:tt,onChange:function(e){return b({excerptBottomSpace:e})},min:0,max:50,allowReset:!0}),o.a.createElement(c.RangeControl,{label:Object(i.__)("CTA Bottom Spacing"),value:at,onChange:function(e){return b({ctaBottomSpace:e})},min:0,max:50,allowReset:!0})));var t,l};if(1==ue){var It={google:{families:[ae+(ne?":"+ne:"")]}};wt=o.a.createElement(s,{config:It})}if(1==ve){var qt={google:{families:[de+(pe?":"+pe:"")]}};Mt=o.a.createElement(s,{config:qt})}if(1==He){var Vt={google:{families:[Se+(Fe?":"+Fe:"")]}};At=o.a.createElement(s,{config:Vt})}if(1==Ve){var Jt={google:{families:[Me+(Ae?":"+Ae:"")]}};Gt=o.a.createElement(s,{config:Jt})}return Pt?o.a.createElement(l.Suspense,{fallback:Object(r.a)()},(Wt=e.state.isEditing,o.a.createElement(u.BlockControls,null,o.a.createElement(u.BlockAlignmentToolbar,{value:w,onChange:function(e){b({align:e})},controls:["left","center","right"]}),o.a.createElement(c.ToolbarGroup,{controls:[{icon:"edit",title:Object(i.__)("Edit"),onClick:function(){return e.togglePreview()},isActive:Wt}]}))),Dt(),wt,Mt,At,Gt):o.a.createElement(o.a.Fragment,null,Dt())};t.default=o.a.memo(b)}}]);