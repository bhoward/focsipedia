(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{190:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return u})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return l}));var r=n(1),a=n(6),o=(n(0),n(256)),i=n(258),c={id:"fsa",title:"Finite-State Automata",author:"Brian Howard"},u={permalink:"/focsipedia/blog/fsa",source:"@site/blog/2020-04-10-fsa.md",description:"Read about finite-state automata, and try the exercises in that section.",date:"2020-04-10T00:00:00.000Z",tags:[],title:"Finite-State Automata",readingTime:.495,truncated:!1,prevItem:{title:"Nondeterministic Finite-State Automata",permalink:"/focsipedia/blog/nfa"},nextItem:{title:"Languages",permalink:"/focsipedia/blog/languages"}},p=[],s={rightToc:p};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Read about ",Object(o.b)("a",{href:Object(i.a)("docs/lang/fsa")},"finite-state automata"),", and try the exercises in that section."),Object(o.b)("p",null,"Watch this ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://drive.google.com/file/d/1eQM-pgBE6BQtjOWTpUycLHTflvIopSMy/view"}),"video")," (and ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://drive.google.com/open?id=1-mvty5DQoMbo7I6MbvfgCuuJa1WhIu_-"}),"DyKnow"),") of my toy telephone. Here is a ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://drive.google.com/file/d/1kI7JeF6LzXlE02I37uekmQhYi4XFvzv4/view"}),"video")," of the telephone itself, which was mistakenly not captured when I recorded the session."),Object(o.b)("p",null,"Here is the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://drive.google.com/file/d/1XGh1fOvJDv5HbNDafolK1kRlrEmr_tDs/view"}),"video")," and ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://drive.google.com/open?id=1-p5DK4hJ08pUPITG9oYUc8YtQ8Docofi"}),"DyKnow")," from the section A class session."),Object(o.b)("p",null,"(",Object(o.b)("strong",{parentName:"p"},"Optional"),") The paper by E.F. Moore I mention in the first video is:"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},'Moore, Edward F (1956). "Gedanken-experiments on Sequential Machines". Automata Studies, Annals of Mathematical Studies. Princeton, N.J.: Princeton University Press (34): 129\u2013153.')),Object(o.b)("p",null,"You can read it on the Internet Archive ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://web.archive.org/web/20120216141113/http://people.mokk.bme.hu/~kornai/termeszetes/moore_1956.pdf"}),"here"),"."))}l.isMDXComponent=!0},256:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),s=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},l=function(e){var t=s(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),l=s(n),b=r,m=l["".concat(i,".").concat(b)]||l[b]||f[b]||o;return n?a.a.createElement(m,c({ref:t},p,{components:n})):a.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},257:function(e,t,n){"use strict";var r=n(0),a=n(35);t.a=function(){return Object(r.useContext)(a.a)}},258:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(257),a=n(259);function o(e,{forcePrependBaseUrl:t=!1,absolute:n=!1}={}){const{siteConfig:{baseUrl:o="/",url:i}={}}=Object(r.a)();if(!e)return e;if(t)return o+e;if(!Object(a.a)(e))return e;const c=o+e.replace(/^\//,"");return n?i+c:c}},259:function(e,t,n){"use strict";function r(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}n.d(t,"a",(function(){return r}))}}]);