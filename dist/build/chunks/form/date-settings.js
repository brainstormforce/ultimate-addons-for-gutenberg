(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{353:function(e,a,n){"use strict";n.r(a);var t,l=n(3),r=n.n(l),o=n(0),c=wp.components,u=c.PanelBody,i=c.SelectControl,m=c.ToggleControl,s=wp.blockEditor.InspectorControls,b=[{label:"YYYY",value:""}],d=[{label:"MM",value:""}],p=[{label:"DD",value:""}];for(t=1930;t<=2030;t++)b.push({label:"".concat(t),value:"".concat(t)});for(t=1;t<=12;t++){var g=t<10?"0".concat(t):"".concat(t);d.push({label:g,value:g})}for(t=1;t<=31;t++){var f=t<10?"0".concat(t):"".concat(t);p.push({label:f,value:f})}var h=function(e){var a=e=e.parentProps,n=a.attributes,t=a.setAttributes,l=n.dateRequired,c=n.additonalVal,g=n.minYear,f=n.minMonth,h=n.minDay,v=n.maxYear,E=n.maxMonth,D=n.maxDay,w="",M="";g&&f&&h&&(w=g+"-"+f+"-"+h),v&&E&&D&&(M=v+"-"+E+"-"+D);var _="";return Date.parse(w)>Date.parse(M)&&(_=r.a.createElement("p",{className:"uagb-forms-date-invalidate"},Object(o.__)("Invalid date range selected","ultimate-addons-for-gutenberg"))),r.a.createElement(r.a.Fragment,null,r.a.createElement(s,null,r.a.createElement(u,{title:Object(o.__)("General","ultimate-addons-for-gutenberg"),initialOpen:!0,className:"uagb__url-panel-body"},r.a.createElement(m,{label:Object(o.__)("Required","ultimate-addons-for-gutenberg"),checked:l,onChange:function(){return t({dateRequired:!l})}}),r.a.createElement(m,{label:Object(o.__)("Additional Validation","ultimate-addons-for-gutenberg"),checked:c,onChange:function(){return t({additonalVal:!c})},help:Object(o.__)("Helps to set range of calender","ultimate-addons-for-gutenberg")}),c&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,Object(o.__)("From","ultimate-addons-for-gutenberg")," :"),r.a.createElement(i,{className:"minDate",label:"Year",value:g,options:b,onChange:function(e){return t({newMinYear:e})}}),r.a.createElement("b",null," - "),r.a.createElement(i,{className:"minDate",label:"Month",value:f,options:d,onChange:function(e){return t({newMinMonth:e})}}),r.a.createElement("b",null," - "),r.a.createElement(i,{className:"minDate",label:"Date",value:h,options:p,onChange:function(e){return t({newMinDay:e})}}),r.a.createElement("p",null,"To :"),r.a.createElement(i,{className:"maxDate",label:"Year",value:v,options:b,onChange:function(e){return t({newMaxYear:e})}}),r.a.createElement("b",null," - "),r.a.createElement(i,{className:"maxDate",label:"Month",value:E,options:d,onChange:function(e){return t({newMaxMonth:e})}}),r.a.createElement("b",null," - "),r.a.createElement(i,{className:"maxDate",label:"Date",value:D,options:p,onChange:function(e){return t({newMaxDay:e})}}),_))))};a.default=r.a.memo(h)}}]);