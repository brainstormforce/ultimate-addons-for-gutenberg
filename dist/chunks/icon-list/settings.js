(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{394:function(e,t,a){"use strict";a.r(t);var n=a(21),l=a.n(n),o=a(2),i=a.n(o),r=a(8),u=a(29),b=a(18),c=a(15),g=a(1),s=a(12),d=a(5),m=a(4),f=function(e){var t,a=e=e.parentProps,n=a.attributes,f=a.setAttributes,_=a.deviceType,h=a.clientId,p=n.align,v=n.gap,z=n.inner_gap,O=n.stack,j=n.icon_layout,E=n.iconPosition,C=n.size,S=n.sizeType,y=n.sizeMobile,T=n.sizeTablet,k=n.hideLabel,w=n.borderRadius,R=n.bgSize,H=n.border,N=n.fontSize,B=n.fontSizeType,x=n.fontSizeMobile,F=n.fontSizeTablet,M=n.fontFamily,P=n.fontWeight,I=n.fontSubset,G=n.lineHeight,L=n.lineHeightType,A=n.lineHeightMobile,W=n.lineHeightTablet,J=n.loadGoogleFonts;if(1==J){var V={google:{families:[M+(P?":"+P:"")]}};t=i.a.createElement(b.a,{config:V})}var D=[{key:"px",name:Object(g.__)("px","ultimate-addons-for-gutenberg")},{key:"em",name:Object(g.__)("em","ultimate-addons-for-gutenberg")}],q=i.a.createElement(m.ButtonGroup,{className:"uagb-size-type-field","aria-label":Object(g.__)("Size Type","ultimate-addons-for-gutenberg")},l()(D,(function(e){var t=e.name,a=e.key;return i.a.createElement(m.Button,{key:a,className:"uagb-size-btn",isSmall:!0,isPrimary:S===a,"aria-pressed":S===a,onClick:function(){return f({sizeType:a})}},t)})));return i.a.createElement(o.Suspense,{fallback:Object(r.a)()},i.a.createElement(d.BlockControls,null,i.a.createElement(d.BlockAlignmentToolbar,{value:p,onChange:function(e){f({align:e})},controls:["left","center","right"]})),i.a.createElement(d.InspectorControls,null,i.a.createElement(m.PanelBody,{title:Object(g.__)("General","ultimate-addons-for-gutenberg"),initialOpen:!0},i.a.createElement(m.SelectControl,{label:Object(g.__)("Layout","ultimate-addons-for-gutenberg"),value:j,options:[{value:"horizontal",label:Object(g.__)("Horizontal","ultimate-addons-for-gutenberg")},{value:"vertical",label:Object(g.__)("Vertical","ultimate-addons-for-gutenberg")}],onChange:function(e){return f({icon_layout:e})}}),"horizontal"==j&&i.a.createElement(i.a.Fragment,null,i.a.createElement(m.SelectControl,{label:Object(g.__)("Stack on"),value:O,options:[{value:"none",label:Object(g.__)("None","ultimate-addons-for-gutenberg")},{value:"tablet",label:Object(g.__)("Tablet","ultimate-addons-for-gutenberg")},{value:"mobile",label:Object(g.__)("Mobile","ultimate-addons-for-gutenberg")}],onChange:function(e){return f({stack:e})},help:Object(g.__)("Note: Choose on what breakpoint the Icons will stack.","ultimate-addons-for-gutenberg")})),i.a.createElement(m.ToggleControl,{label:Object(g.__)("Hide Labels","ultimate-addons-for-gutenberg"),checked:k,onChange:function(e){return function(e){Object(s.select)("core/block-editor").getBlocks(h).forEach((function(t,a){t.attributes.hideLabel=e})),f({hideLabel:e})}(e)}}),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement(m.RangeControl,{label:Object(g.__)("Gap between Items","ultimate-addons-for-gutenberg"),value:v,onChange:function(e){return f({gap:e})},help:Object(g.__)("Note: For better editing experience, the gap between items might look larger than applied.  Viewing in frontend will show the actual results.","ultimate-addons-for-gutenberg"),min:0,max:100}),!k&&i.a.createElement(m.RangeControl,{label:Object(g.__)("Gap between Icon and Label","ultimate-addons-for-gutenberg"),value:z,onChange:function(e){return f({inner_gap:e})},min:0,max:100}),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement(m.SelectControl,{label:Object(g.__)("Icon Alignment","ultimate-addons-for-gutenberg"),value:E,options:[{value:"top",label:Object(g.__)("Top","ultimate-addons-for-gutenberg")},{value:"middle",label:Object(g.__)("Middle","ultimate-addons-for-gutenberg")}],onChange:function(e){return f({iconPosition:e})},help:Object(g.__)("Note: This manages the Icon Position with respect to the Label.","ultimate-addons-for-gutenberg")}),i.a.createElement(u.default,null),"Desktop"===_&&i.a.createElement(i.a.Fragment,null,q,i.a.createElement(m.RangeControl,{label:Object(g.__)("Icon Size"),value:C,onChange:function(e){return f({size:e})},min:0,max:500,allowReset:!0,initialPosition:40})),"Tablet"===_&&i.a.createElement(i.a.Fragment,null,q,i.a.createElement(m.RangeControl,{label:Object(g.__)("Size"),value:T,onChange:function(e){return f({sizeTablet:e})},min:0,max:500,allowReset:!0,initialPosition:40})),"Mobile"===_&&i.a.createElement(i.a.Fragment,null,q,i.a.createElement(m.RangeControl,{label:Object(g.__)("Size"),value:y,onChange:function(e){return f({sizeMobile:e})},min:0,max:500,allowReset:!0,initialPosition:40})),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement(c.default,{label:Object(g.__)("Typography","ultimate-addons-for-gutenberg"),attributes:n,setAttributes:f,loadGoogleFonts:{value:J,label:"loadGoogleFonts"},fontFamily:{value:M,label:"fontFamily"},fontWeight:{value:P,label:"fontWeight"},fontSubset:{value:I,label:"fontSubset"},fontSizeType:{value:B,label:"fontSizeType"},fontSize:{value:N,label:"fontSize"},fontSizeMobile:{value:x,label:"fontSizeMobile"},fontSizeTablet:{value:F,label:"fontSizeTablet"},lineHeightType:{value:L,label:"lineHeightType"},lineHeight:{value:G,label:"lineHeight"},lineHeightMobile:{value:A,label:"lineHeightMobile"},lineHeightTablet:{value:W,label:"lineHeightTablet"}}),i.a.createElement("hr",{className:"uagb-editor__separator"}),i.a.createElement(m.RangeControl,{label:Object(g.__)("Background Size","ultimate-addons-for-gutenberg"),value:R,onChange:function(e){return f({bgSize:e})},help:Object(g.__)("Note: Background Size option is useful when one adds background color to the icons.","ultimate-addons-for-gutenberg"),min:0,max:500}),i.a.createElement(m.RangeControl,{label:Object(g.__)("Border","ultimate-addons-for-gutenberg"),value:H,onChange:function(e){return f({border:e})},help:Object(g.__)("Note: Border option is useful when one adds border color to the icons.","ultimate-addons-for-gutenberg"),min:0,max:10}),i.a.createElement(m.RangeControl,{label:Object(g.__)("Border Radius","ultimate-addons-for-gutenberg"),value:w,onChange:function(e){return f({borderRadius:e})},help:Object(g.__)("Note: Border Radius option is useful when one adds background color to the icons.","ultimate-addons-for-gutenberg"),min:0,max:500}))),t)};t.default=i.a.memo(f)}}]);