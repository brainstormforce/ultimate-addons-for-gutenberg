(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{414:function(e,t,n){"use strict";n.r(t);var a=n(2),l=n.n(a),o=n(0),r=wp.components,u=r.PanelBody,c=r.ToggleControl,i=r.SelectControl,b=wp.blockEditor.InspectorControls,s=function(e){var t=e=e.parentProps,n=t.attributes,a=t.setAttributes,r=n.phoneRequired,s=n.pattern;return l.a.createElement(l.a.Fragment,null,l.a.createElement(b,null,l.a.createElement(u,{title:Object(o.__)("General","ultimate-addons-for-gutenberg"),initialOpen:!0,className:"uagb__url-panel-body"},l.a.createElement(c,{label:Object(o.__)("Required","ultimate-addons-for-gutenberg"),checked:r,onChange:function(){return a({phoneRequired:!r})}}),l.a.createElement(i,{label:Object(o.__)("Pattern"),value:s,options:[{label:"None",value:""},{label:"123-45-678",value:Object(o.__)("[0-9]{3}-[0-9]{2}-[0-9]{3}","ultimate-addons-for-gutenberg")},{label:"123-456-6789",value:Object(o.__)("[0-9]{3}-[0-9]{3}-[0-9]{4}","ultimate-addons-for-gutenberg")}],onChange:function(e){a({new_pattern:e})}}))))};t.default=l.a.memo(s)}}]);