(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{384:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n(2),o=n.n(l),c=n(7),r=n(5),i=function(e){var t=e=e.parentProps,n=t.setAttributes,l=t.attributes,i=l.headingAlign,m=l.imagePosition,s=l.image;return o.a.createElement(o.a.Fragment,null,o.a.createElement(o.a.Fragment,null,"top"==m&&o.a.createElement(c.BlockControls,{key:"controls"},o.a.createElement(c.AlignmentToolbar,{value:i,onChange:function(e){return n({headingAlign:e})}}))),o.a.createElement(c.InspectorControls,null,o.a.createElement("p",{className:"uagb-settings-notice"},Object(a.__)("For the common styling options please select the Parent Block of this Price List Item.")),o.a.createElement(r.PanelBody,{title:Object(a.__)("Image"),initialOpen:!0},o.a.createElement(r.BaseControl,{className:"editor-bg-image-control",label:Object(a.__)("")},o.a.createElement(c.MediaUpload,{title:Object(a.__)("Select Image"),onSelect:function(e){!function(e){var t=null;t=e&&e.url?e:null,e.type&&"image"===e.type||(t=null),n({image:t})}(e)},allowedTypes:["image"],value:s,render:function(e){var t,n,l=e.open;return o.a.createElement(r.Button,{isSecondary:!0,onClick:l},(t=s,n=Object(a.__)("Select Image"),t&&(n=null==t.url||""==t.url?Object(a.__)("Select Image"):Object(a.__)("Replace Image")),n))}}),s&&o.a.createElement(r.Button,{className:"uagb-rm-btn",onClick:function(){n({image:null})},isLink:!0,isDestructive:!0},Object(a.__)("Remove Image"))))))};t.default=o.a.memo(i)}}]);