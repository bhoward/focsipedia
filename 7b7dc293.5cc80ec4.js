(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{172:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return p}));var r=n(1),a=n(6),i=(n(0),n(255)),o=(n(257),{id:"mapreduce",title:"MapReduce",author:"Brian Howard"}),c={permalink:"/focsipedia/blog/mapreduce",source:"@site/blog/2020-02-28-mapreduce.md",description:"No reading for today. We will talk about the map and reduce functions on lists, and how they made Google what it is today.",date:"2020-02-28T00:00:00.000Z",tags:[],title:"MapReduce",readingTime:.74,truncated:!0,prevItem:{title:"Exam 1 Review",permalink:"/focsipedia/blog/exam1-review"},nextItem:{title:"Types and Functional Programming, Continued",permalink:"/focsipedia/blog/types2"}},u=[],l={rightToc:u};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"No reading for today. We will talk about the ",Object(i.b)("inlineCode",{parentName:"p"},"map")," and ",Object(i.b)("inlineCode",{parentName:"p"},"reduce")," functions on lists, and how they made Google what it is today."),Object(i.b)("p",null,"For reference, here are the definitions of ",Object(i.b)("inlineCode",{parentName:"p"},"map")," and ",Object(i.b)("inlineCode",{parentName:"p"},"reduce")," developed in class (this version of ",Object(i.b)("inlineCode",{parentName:"p"},"reduce")," is often called ",Object(i.b)("inlineCode",{parentName:"p"},"foldLeft"),"):"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-reason",metastring:"edit",edit:!0}),'let rec map = (f, aList) => {\n  switch (aList) {\n  | [] => []\n  | [head, ...tail] => [f(head), ...map(f, tail)]\n  }\n};\n\nlet rec reduce = (g, init, aList) => {\n  switch (aList) {\n  | [] => init\n  | [head, ...tail] => reduce(g, g(init, head), tail)\n  }\n};\n\nmap(n => {2 * n}, [1, 2, 3, 4]);\nreduce((+), 0, [1, 2, 3, 4]);\nreduce((*), 1, [1, 2, 3, 4]);\nreduce((summary, n) => {summary ++ "," ++ string_of_int(n)}, "", [1, 2, 3, 4]);\nreduce((+), 0, map(n => {2 * n}, [1, 2, 3, 4]));\n')))}p.isMDXComponent=!0},255:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},d=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),d=p(n),f=r,m=d["".concat(o,".").concat(f)]||d[f]||s[f]||i;return n?a.a.createElement(m,c({ref:t},l,{components:n})):a.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},256:function(e,t,n){"use strict";var r=n(0),a=n(35);t.a=function(){return Object(r.useContext)(a.a)}},257:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(256),a=n(258);function i(e,{forcePrependBaseUrl:t=!1,absolute:n=!1}={}){const{siteConfig:{baseUrl:i="/",url:o}={}}=Object(r.a)();if(!e)return e;if(t)return i+e;if(!Object(a.a)(e))return e;const c=i+e.replace(/^\//,"");return n?o+c:c}},258:function(e,t,n){"use strict";function r(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}n.d(t,"a",(function(){return r}))}}]);