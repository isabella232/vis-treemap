!function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);e(1);const r=e(5),i={showSubHeaders:{section:"Data",type:"boolean",label:"Show Sub Headers",default:"true"},cellColor:{section:"Data",type:"array",display:"colors",label:"Color Palette - Razorhorse",default:["#aa4336","#b04f43","#b4574c","#b86157","#bc6960","#c07169","#c47b73","#c8837c","#cc8c86","#d09590","#d59f9b","#daaaa8"]},breadcrumbs:{type:"array",default:[]}},o=function(t){return parseInt(t)},a={options:i,create:function(t,n){this.style=document.createElement("style"),document.head.appendChild(this.style),this.container=r.select(t).append("div").attr("id","treemapContainer"),this.tooltip=r.select(t).append("div").attr("class","hidden").attr("id","tooltip")},updateAsync:function(t,n,e,u,s,c){this.clearErrors(),console.log("data",t),console.log("config",e),console.log("queryResponse",u);const l=n.clientWidth,f=n.clientHeight-16,h=n.getBoundingClientRect(),p=h.x+h.width/2,d=h.y+h.height/2,v=u.fields.dimension_like,y=u.fields.measure_like,g=function(t,n){for(var e=i,r=[],o=0;o<n.length;o++){(u={})[n[o].label]=n[o].name,r.push(u)}e.sizeBy={section:"Data",type:"string",label:"Size By",display:"select",values:r,default:"0"};var a=[];for(o=0;o<t.length;o++){var u;(u={})[t[o].label]=t[o].name,a.push(u)}return e.colorBy={section:"Data",type:"string",label:"Color By",display:"select",values:a,default:"0"},e}(v,y);a.trigger("registerOptions",g);const m=function(t,n){var e=[];return t.forEach(t=>{var r={},i=0;for(var[o,a]of(r.metadata={},Object.entries(t))){if(r[o]=a.value,i<n.fields.dimension_like.length)var u=n.fields.dimension_like[i].label_short;else u=n.fields.measure_like[i-n.fields.dimension_like.length].label_short;if(void 0!==a.rendered)var s=a.rendered;else s=a.value;r.metadata[o]={label:u,rendered:s,links:a.links},i+=1}e.push(r)}),e}(t,u),_=function(t){var n=[];return t.fields.dimension_like.forEach(t=>{n.push(t.name)}),n}(u),b=function(t){var n=[];return t.fields.measure_like.forEach(t=>{n.push(t.name)}),n}(u),w=r.scaleOrdinal().range(e.cellColor);var x,k=r.treemap().size([l,f]).padding(t=>1===t.depth?2:0).paddingTop(t=>e.showSubHeaders?t.depth<2?16:0:0===t.depth?16:0).round(!0);const A=function(t,n){if(0===n.length)x=t;else{var e=n.shift();for(var r in t.values)void 0!==t&&t.values[r].key===e&&(t=A(t.values[r],n))}},S=function(t){if("count_of_rows"==e.sizeBy)return t.key?0:1;{let n=e.sizeBy;return parseFloat(t[n])}},C=function(t){var n="";if(0===t.height){for(var e in _){null!=(i=t.data.metadata[_[e]]).rendered&&(n+=" "+i.rendered)}for(var r in n+="<br>",y){var i;null!=(i=t.data.metadata[b[r]]).rendered&&(n+="<p><em>"+i.label+":</em> <b>"+i.rendered+"</b></p>")}}else"null"==t.data.key?n+="":n+=t.data.key;return n};!function(t){var n=r.nest();v.forEach(t=>n=n.key(n=>n[t.name])),n={key:"root",values:n=n.entries(t)};var i=k(r.hierarchy(n,t=>t.values).sum(t=>S(t)).sort((function(t,n){return n.height-t.height||S(n)-S(t)})));const a=function(t){r.select("#treemapSVG").remove();var u=r.select("#treemapContainer").append("svg").attr("id","treemapSVG").attr("width",l).attr("height",f).append("g").datum(t).attr("class","treemapArea").selectAll("g").data(i.descendants()).enter();function c(t){if(0===t.depth)0===e.breadcrumbs.length||(e.breadcrumbs.pop(),A(n,e.breadcrumbs.slice(0)),i=k(r.hierarchy(x,t=>t.values).sum(t=>S(t))),a(i));else{for(;t.depth>1;)t=t.parent;null!=t.data.key&&(e.breadcrumbs.push(t.data.key),i=k(r.hierarchy(t.data,t=>t.values).sum(t=>S(t))),a(i))}}u.append("rect").attr("x",t=>t.x0).attr("y",t=>t.y0).attr("width",t=>Math.max(0,t.x1-t.x0)).attr("height",t=>Math.max(0,t.y1-t.y0)).attr("fill",t=>function(t){return 0===t.height?e.takeColorFromCellValue?t.data[e.colorBy]:w(t.data[e.colorBy]):0===t.depth?"#edd0ce":"white"}(t)).attr("stroke","white").on("mouseover",(function(t){console.log("mouseover",r.event);parseFloat(r.select(this).attr("x")),parseFloat(r.select(this).attr("y"));var n=r.event.pageX,e=r.event.pageY;r.select("#tooltip").style("left",n+"px").style("top",e+"px").html(C(t)),r.select("#tooltip").classed("hidden",!1)})).on("mousemove",(function(){var t=r.event.pageX<p?r.event.pageX:r.event.pageX-210,n=r.event.pageY<d?r.event.pageY:r.event.pageY-120;t&&r.select("#tooltip").style("left",t+"px").style("top",n+"px")})).on("mouseout",(function(){r.select("#tooltip").classed("hidden",!0)})).on("click",(function(t){s.crossfilterEnabled?(LookerCharts.Utils.toggleCrossfilter({row:t.row,event:r.event}),c(t)):c(t)})),u.append("foreignObject").attr("x",t=>t.x0+3).attr("y",t=>t.y0).attr("width",t=>Math.max(0,t.x1-t.x0-3)).attr("height",t=>Math.max(0,t.y1-t.y0)).attr("fill","#bbbbbb").attr("class","foreignobj").attr("pointer-events","none").attr("white-space","nowrap").append("xhtml:div").html(t=>function(t){var n="";if(0===t.depth){var r=o(t.value);n=0===e.breadcrumbs.length?"Top Level. Click on cells to zoom IN, or click on this bar to zoom OUT.":"null"==t.value?"":"&#171; "+e.breadcrumbs.join(" – ")+" ("+r+")"}else t.depth<2&&e.showSubHeaders?(r=o(t.value),n=null==t.data.key||"null"==t.data.key?"":"&#187; "+t.data.key+" ("+r+")"):0===t.height&&(n="count_of_rows"===e.sizeBy?"1":C(t));return n}(t)).attr("class","textdiv")};a(i)}(m),c()}};looker.plugins.visualizations.add(a)},function(t,n,e){var r=e(2),i=e(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};r(i,o);t.exports=i.locals||{}},function(t,n,e){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var t={};return function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}t[n]=e}return t[n]}}(),a=[];function u(t){for(var n=-1,e=0;e<a.length;e++)if(a[e].identifier===t){n=e;break}return n}function s(t,n){for(var e={},r=[],i=0;i<t.length;i++){var o=t[i],s=n.base?o[0]+n.base:o[0],c=e[s]||0,l="".concat(s," ").concat(c);e[s]=c+1;var f=u(l),h={css:o[1],media:o[2],sourceMap:o[3]};-1!==f?(a[f].references++,a[f].updater(h)):a.push({identifier:l,updater:y(h,n),references:1}),r.push(l)}return r}function c(t){var n=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var i=e.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(t){n.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(n);else{var a=o(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var l,f=(l=[],function(t,n){return l[t]=n,l.filter(Boolean).join("\n")});function h(t,n,e,r){var i=e?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=f(n,i);else{var o=document.createTextNode(i),a=t.childNodes;a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(o,a[n]):t.appendChild(o)}}function p(t,n,e){var r=e.css,i=e.media,o=e.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var d=null,v=0;function y(t,n){var e,r,i;if(n.singleton){var o=v++;e=d||(d=c(n)),r=h.bind(null,e,o,!1),i=h.bind(null,e,o,!0)}else e=c(n),r=p.bind(null,e,n),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)};return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else i()}}t.exports=function(t,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i());var e=s(t=t||[],n);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<e.length;r++){var i=u(e[r]);a[i].references--}for(var o=s(t,n),c=0;c<e.length;c++){var l=u(e[c]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}e=o}}}},function(t,n,e){(n=e(4)(!1)).push([t.i,"rect:hover {\n    fill: #edd0ce;\n}\n\n\n#tooltip {\n    position: absolute;\n    width: auto;\n    height: auto;\n    padding: 5px;\n    background-color: white;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n    -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    pointer-events: none;\n    font-family: sans-serif;\n    font-size: 12px;\n}\n\n#tooltip:hover {\n    background-color: #aa4336;\n}\n\n\n#tooltip.hidden {\n    display: none;\n}\n\n#tooltip p {\n    margin: 0;\n    font-family: sans-serif;\n    font-size: 12px;\n    line-height: 15px;\n}\n\n.textdiv {\n    font-family: 'Roboto', \"Open Sans\",Helvetica,Arial,sans-serif;\n    font-size: 11px;\n    pointer-events: none;\n    overflow: none;\n    white-space: nowrap;\n}\n\n.foreignobj{\n    padding-left: 5px;\n    padding-top: 2px;\n    margin-top: 5px;\n}",""]),t.exports=n},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e=t[1]||"",r=t[3];if(!r)return e;if(n&&"function"==typeof btoa){var i=(a=r,u=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(s," */")),o=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[e].concat(o).concat([i]).join("\n")}var a,u,s;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,r){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var u=0;u<t.length;u++){var s=[].concat(t[u]);r&&i[s[0]]||(e&&(s[2]?s[2]="".concat(e," and ").concat(s[2]):s[2]=e),n.push(s))}},n}},function(t,n,e){"use strict";function r(){}e.r(n),e.d(n,"select",(function(){return lt})),e.d(n,"event",(function(){return Q})),e.d(n,"hierarchy",(function(){return ht})),e.d(n,"treemap",(function(){return At})),e.d(n,"nest",(function(){return Bt})),e.d(n,"scaleOrdinal",(function(){return $t}));var i=function(t){return null==t?r:function(){return this.querySelector(t)}};function o(){return[]}var a=function(t){return new Array(t.length)};function u(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}u.prototype={constructor:u,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function s(t,n,e,r,i,o){for(var a,s=0,c=n.length,l=o.length;s<l;++s)(a=n[s])?(a.__data__=o[s],r[s]=a):e[s]=new u(t,o[s]);for(;s<c;++s)(a=n[s])&&(i[s]=a)}function c(t,n,e,r,i,o,a){var s,c,l,f={},h=n.length,p=o.length,d=new Array(h);for(s=0;s<h;++s)(c=n[s])&&(d[s]=l="$"+a.call(c,c.__data__,s,n),l in f?i[s]=c:f[l]=c);for(s=0;s<p;++s)(c=f[l="$"+a.call(t,o[s],s,o)])?(r[s]=c,c.__data__=o[s],f[l]=null):e[s]=new u(t,o[s]);for(s=0;s<h;++s)(c=n[s])&&f[d[s]]===c&&(i[s]=c)}function l(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}var f="http://www.w3.org/1999/xhtml",h={svg:"http://www.w3.org/2000/svg",xhtml:f,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},p=function(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),h.hasOwnProperty(n)?{space:h[n],local:t}:t};function d(t){return function(){this.removeAttribute(t)}}function v(t){return function(){this.removeAttributeNS(t.space,t.local)}}function y(t,n){return function(){this.setAttribute(t,n)}}function g(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function m(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function _(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}var b=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView};function w(t){return function(){this.style.removeProperty(t)}}function x(t,n,e){return function(){this.style.setProperty(t,n,e)}}function k(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function A(t,n){return t.style.getPropertyValue(n)||b(t).getComputedStyle(t,null).getPropertyValue(n)}function S(t){return function(){delete this[t]}}function C(t,n){return function(){this[t]=n}}function M(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function B(t){return t.trim().split(/^|\s+/)}function E(t){return t.classList||new O(t)}function O(t){this._node=t,this._names=B(t.getAttribute("class")||"")}function N(t,n){for(var e=E(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function j(t,n){for(var e=E(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function z(t){return function(){N(this,t)}}function T(t){return function(){j(this,t)}}function L(t,n){return function(){(n.apply(this,arguments)?N:j)(this,t)}}O.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function P(){this.textContent=""}function R(t){return function(){this.textContent=t}}function $(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function D(){this.innerHTML=""}function I(t){return function(){this.innerHTML=t}}function H(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function U(){this.nextSibling&&this.parentNode.appendChild(this)}function q(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function V(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===f&&n.documentElement.namespaceURI===f?n.createElement(t):n.createElementNS(e,t)}}function F(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}var X=function(t){var n=p(t);return(n.local?F:V)(n)};function Y(){return null}function G(){var t=this.parentNode;t&&t.removeChild(this)}function J(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function K(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}var W={},Q=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(W={mouseenter:"mouseover",mouseleave:"mouseout"}));function Z(t,n,e){return t=tt(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function tt(t,n,e){return function(r){var i=Q;Q=r;try{t.call(this,this.__data__,n,e)}finally{Q=i}}}function nt(t){return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}function et(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function rt(t,n,e){var r=W.hasOwnProperty(t.type)?Z:tt;return function(i,o,a){var u,s=this.__on,c=r(n,o,a);if(s)for(var l=0,f=s.length;l<f;++l)if((u=s[l]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),this.addEventListener(u.type,u.listener=c,u.capture=e),void(u.value=n);this.addEventListener(t.type,c,e),u={type:t.type,name:t.name,value:n,listener:c,capture:e},s?s.push(u):this.__on=[u]}}function it(t,n,e){var r=b(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function ot(t,n){return function(){return it(this,t,n)}}function at(t,n){return function(){return it(this,t,n.apply(this,arguments))}}var ut=[null];function st(t,n){this._groups=t,this._parents=n}function ct(){return new st([[document.documentElement]],ut)}st.prototype=ct.prototype={constructor:st,select:function(t){"function"!=typeof t&&(t=i(t));for(var n=this._groups,e=n.length,r=new Array(e),o=0;o<e;++o)for(var a,u,s=n[o],c=s.length,l=r[o]=new Array(c),f=0;f<c;++f)(a=s[f])&&(u=t.call(a,a.__data__,f,s))&&("__data__"in a&&(u.__data__=a.__data__),l[f]=u);return new st(r,this._parents)},selectAll:function(t){var n;"function"!=typeof t&&(t=null==(n=t)?o:function(){return this.querySelectorAll(n)});for(var e=this._groups,r=e.length,i=[],a=[],u=0;u<r;++u)for(var s,c=e[u],l=c.length,f=0;f<l;++f)(s=c[f])&&(i.push(t.call(s,s.__data__,f,c)),a.push(s));return new st(i,a)},filter:function(t){var n;"function"!=typeof t&&(n=t,t=function(){return this.matches(n)});for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o)for(var a,u=e[o],s=u.length,c=i[o]=[],l=0;l<s;++l)(a=u[l])&&t.call(a,a.__data__,l,u)&&c.push(a);return new st(i,this._parents)},data:function(t,n){if(!t)return y=new Array(this.size()),h=-1,this.each((function(t){y[++h]=t})),y;var e,r=n?c:s,i=this._parents,o=this._groups;"function"!=typeof t&&(e=t,t=function(){return e});for(var a=o.length,u=new Array(a),l=new Array(a),f=new Array(a),h=0;h<a;++h){var p=i[h],d=o[h],v=d.length,y=t.call(p,p&&p.__data__,h,i),g=y.length,m=l[h]=new Array(g),_=u[h]=new Array(g);r(p,d,m,_,f[h]=new Array(v),y,n);for(var b,w,x=0,k=0;x<g;++x)if(b=m[x]){for(x>=k&&(k=x+1);!(w=_[k])&&++k<g;);b._next=w||null}}return(u=new st(u,i))._enter=l,u._exit=f,u},enter:function(){return new st(this._enter||this._groups.map(a),this._parents)},exit:function(){return new st(this._exit||this._groups.map(a),this._parents)},join:function(t,n,e){var r=this.enter(),i=this,o=this.exit();return r="function"==typeof t?t(r):r.append(t+""),null!=n&&(i=n(i)),null==e?o.remove():e(o),r&&i?r.merge(i).order():i},merge:function(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var s,c=n[u],l=e[u],f=c.length,h=a[u]=new Array(f),p=0;p<f;++p)(s=c[p]||l[p])&&(h[p]=s);for(;u<r;++u)a[u]=n[u];return new st(a,this._parents)},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,a=i[o];--o>=0;)(r=i[o])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),a=r);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=l);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var a,u=e[o],s=u.length,c=i[o]=new Array(s),f=0;f<s;++f)(a=u[f])&&(c[f]=a);c.sort(n)}return new st(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),n=-1;return this.each((function(){t[++n]=this})),t},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var a=r[i];if(a)return a}return null},size:function(){var t=0;return this.each((function(){++t})),t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],a=0,u=o.length;a<u;++a)(i=o[a])&&t.call(i,i.__data__,a,o);return this},attr:function(t,n){var e=p(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?v:d:"function"==typeof n?e.local?_:m:e.local?g:y)(e,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?w:"function"==typeof n?k:x)(t,n,null==e?"":e)):A(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?S:"function"==typeof n?M:C)(t,n)):this.node()[t]},classed:function(t,n){var e=B(t+"");if(arguments.length<2){for(var r=E(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?L:n?z:T)(e,n))},text:function(t){return arguments.length?this.each(null==t?P:("function"==typeof t?$:R)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?D:("function"==typeof t?H:I)(t)):this.node().innerHTML},raise:function(){return this.each(U)},lower:function(){return this.each(q)},append:function(t){var n="function"==typeof t?t:X(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var e="function"==typeof t?t:X(t),r=null==n?Y:"function"==typeof n?n:i(n);return this.select((function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(G)},clone:function(t){return this.select(t?K:J)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var r,i,o=nt(t+""),a=o.length;if(!(arguments.length<2)){for(u=n?rt:et,null==e&&(e=!1),r=0;r<a;++r)this.each(u(o[r],n,e));return this}var u=this.node().__on;if(u)for(var s,c=0,l=u.length;c<l;++c)for(r=0,s=u[c];r<a;++r)if((i=o[r]).type===s.type&&i.name===s.name)return s.value},dispatch:function(t,n){return this.each(("function"==typeof n?at:ot)(t,n))}};var lt=function(t){return"string"==typeof t?new st([[document.querySelector(t)]],[document.documentElement]):new st([[t]],ut)};function ft(t){var n=0,e=t.children,r=e&&e.length;if(r)for(;--r>=0;)n+=e[r].value;else n=1;t.value=n}function ht(t,n){var e,r,i,o,a,u=new yt(t),s=+t.value&&(u.value=t.value),c=[u];for(null==n&&(n=pt);e=c.pop();)if(s&&(e.value=+e.data.value),(i=n(e.data))&&(a=i.length))for(e.children=new Array(a),o=a-1;o>=0;--o)c.push(r=e.children[o]=new yt(i[o])),r.parent=e,r.depth=e.depth+1;return u.eachBefore(vt)}function pt(t){return t.children}function dt(t){t.data=t.data.data}function vt(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function yt(t){this.data=t,this.depth=this.height=0,this.parent=null}yt.prototype=ht.prototype={constructor:yt,count:function(){return this.eachAfter(ft)},each:function(t){var n,e,r,i,o=this,a=[o];do{for(n=a.reverse(),a=[];o=n.pop();)if(t(o),e=o.children)for(r=0,i=e.length;r<i;++r)a.push(e[r])}while(a.length);return this},eachAfter:function(t){for(var n,e,r,i=this,o=[i],a=[];i=o.pop();)if(a.push(i),n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e]);for(;i=a.pop();)t(i);return this},eachBefore:function(t){for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this},sum:function(t){return this.eachAfter((function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e}))},sort:function(t){return this.eachBefore((function(n){n.children&&n.children.sort(t)}))},path:function(t){for(var n=this,e=function(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;t=e.pop(),n=r.pop();for(;t===n;)i=t,t=e.pop(),n=r.pop();return i}(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},descendants:function(){var t=[];return this.each((function(n){t.push(n)})),t},leaves:function(){var t=[];return this.eachBefore((function(n){n.children||t.push(n)})),t},links:function(){var t=this,n=[];return t.each((function(e){e!==t&&n.push({source:e.parent,target:e})})),n},copy:function(){return ht(this).eachBefore(dt)}};var gt=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)},mt=function(t,n,e,r,i){for(var o,a=t.children,u=-1,s=a.length,c=t.value&&(r-n)/t.value;++u<s;)(o=a[u]).y0=e,o.y1=i,o.x0=n,o.x1=n+=o.value*c},_t=function(t,n,e,r,i){for(var o,a=t.children,u=-1,s=a.length,c=t.value&&(i-e)/t.value;++u<s;)(o=a[u]).x0=n,o.x1=r,o.y0=e,o.y1=e+=o.value*c};var bt=function t(n){function e(t,e,r,i,o){!function(t,n,e,r,i,o){for(var a,u,s,c,l,f,h,p,d,v,y,g=[],m=n.children,_=0,b=0,w=m.length,x=n.value;_<w;){s=i-e,c=o-r;do{l=m[b++].value}while(!l&&b<w);for(f=h=l,y=l*l*(v=Math.max(c/s,s/c)/(x*t)),d=Math.max(h/y,y/f);b<w;++b){if(l+=u=m[b].value,u<f&&(f=u),u>h&&(h=u),y=l*l*v,(p=Math.max(h/y,y/f))>d){l-=u;break}d=p}g.push(a={value:l,dice:s<c,children:m.slice(_,b)}),a.dice?mt(a,e,r,i,x?r+=c*l/x:o):_t(a,e,r,x?e+=s*l/x:i,o),x-=l,_=b}}(n,t,e,r,i,o)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}((1+Math.sqrt(5))/2);function wt(t){if("function"!=typeof t)throw new Error;return t}function xt(){return 0}var kt=function(t){return function(){return t}},At=function(){var t=bt,n=!1,e=1,r=1,i=[0],o=xt,a=xt,u=xt,s=xt,c=xt;function l(t){return t.x0=t.y0=0,t.x1=e,t.y1=r,t.eachBefore(f),i=[0],n&&t.eachBefore(gt),t}function f(n){var e=i[n.depth],r=n.x0+e,l=n.y0+e,f=n.x1-e,h=n.y1-e;f<r&&(r=f=(r+f)/2),h<l&&(l=h=(l+h)/2),n.x0=r,n.y0=l,n.x1=f,n.y1=h,n.children&&(e=i[n.depth+1]=o(n)/2,r+=c(n)-e,l+=a(n)-e,(f-=u(n)-e)<r&&(r=f=(r+f)/2),(h-=s(n)-e)<l&&(l=h=(l+h)/2),t(n,r,l,f,h))}return l.round=function(t){return arguments.length?(n=!!t,l):n},l.size=function(t){return arguments.length?(e=+t[0],r=+t[1],l):[e,r]},l.tile=function(n){return arguments.length?(t=wt(n),l):t},l.padding=function(t){return arguments.length?l.paddingInner(t).paddingOuter(t):l.paddingInner()},l.paddingInner=function(t){return arguments.length?(o="function"==typeof t?t:kt(+t),l):o},l.paddingOuter=function(t){return arguments.length?l.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):l.paddingTop()},l.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:kt(+t),l):a},l.paddingRight=function(t){return arguments.length?(u="function"==typeof t?t:kt(+t),l):u},l.paddingBottom=function(t){return arguments.length?(s="function"==typeof t?t:kt(+t),l):s},l.paddingLeft=function(t){return arguments.length?(c="function"==typeof t?t:kt(+t),l):c},l};function St(){}function Ct(t,n){var e=new St;if(t instanceof St)t.each((function(t,n){e.set(n,t)}));else if(Array.isArray(t)){var r,i=-1,o=t.length;if(null==n)for(;++i<o;)e.set(i,t[i]);else for(;++i<o;)e.set(n(r=t[i],i,t),r)}else if(t)for(var a in t)e.set(a,t[a]);return e}St.prototype=Ct.prototype={constructor:St,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,n){return this["$"+t]=n,this},remove:function(t){var n="$"+t;return n in this&&delete this[n]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)"$"===n[0]&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)"$"===n[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var n in this)"$"===n[0]&&t(this[n],n.slice(1),this)}};var Mt=Ct,Bt=function(){var t,n,e,r=[],i=[];function o(e,i,a,u){if(i>=r.length)return null!=t&&e.sort(t),null!=n?n(e):e;for(var s,c,l,f=-1,h=e.length,p=r[i++],d=Mt(),v=a();++f<h;)(l=d.get(s=p(c=e[f])+""))?l.push(c):d.set(s,[c]);return d.each((function(t,n){u(v,n,o(t,i,a,u))})),v}return e={object:function(t){return o(t,0,Et,Ot)},map:function(t){return o(t,0,Nt,jt)},entries:function(t){return function t(e,o){if(++o>r.length)return e;var a,u=i[o-1];return null!=n&&o>=r.length?a=e.entries():(a=[],e.each((function(n,e){a.push({key:e,values:t(n,o)})}))),null!=u?a.sort((function(t,n){return u(t.key,n.key)})):a}(o(t,0,Nt,jt),0)},key:function(t){return r.push(t),e},sortKeys:function(t){return i[r.length-1]=t,e},sortValues:function(n){return t=n,e},rollup:function(t){return n=t,e}}};function Et(){return{}}function Ot(t,n,e){t[n]=e}function Nt(){return Mt()}function jt(t,n,e){t.set(n,e)}function zt(){}var Tt=Mt.prototype;function Lt(t,n){var e=new zt;if(t instanceof zt)t.each((function(t){e.add(t)}));else if(t){var r=-1,i=t.length;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e}zt.prototype=Lt.prototype={constructor:zt,has:Tt.has,add:function(t){return this["$"+(t+="")]=t,this},remove:Tt.remove,clear:Tt.clear,values:Tt.keys,size:Tt.size,empty:Tt.empty,each:Tt.each};function Pt(t,n){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(n).domain(t)}return this}const Rt=Symbol("implicit");function $t(){var t=new Map,n=[],e=[],r=Rt;function i(i){var o=i+"",a=t.get(o);if(!a){if(r!==Rt)return r;t.set(o,a=n.push(i))}return e[(a-1)%e.length]}return i.domain=function(e){if(!arguments.length)return n.slice();n=[],t=new Map;for(const r of e){const e=r+"";t.has(e)||t.set(e,n.push(r))}return i},i.range=function(t){return arguments.length?(e=Array.from(t),i):e.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return $t(n,e).unknown(r)},Pt.apply(i,arguments),i}}]);
//# sourceMappingURL=treemap.js.map