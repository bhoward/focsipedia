"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[2758],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),f=a,d=u["".concat(c,".").concat(f)]||u[f]||m[f]||o;return n?r.createElement(d,i(i({ref:t},s),{},{components:n})):r.createElement(d,i({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2886:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={id:"ocaml",title:"OCaml"},c="OCaml",p={unversionedId:"ocaml",id:"ocaml",isDocsHomePage:!1,title:"OCaml",description:"OCaml is a functional programming language developed at Inria over the past thirty years.",source:"@site/docs/ocaml.mdx",sourceDirName:".",slug:"/ocaml",permalink:"/focsipedia/docs/ocaml",editUrl:"https://github.com/bhoward/focsipedia/edit/master/docs/ocaml.mdx",tags:[],version:"current",frontMatter:{id:"ocaml",title:"OCaml"},sidebar:"someSidebar",previous:{title:"ReasonML",permalink:"/focsipedia/docs/reason"},next:{title:"Style Guide",permalink:"/focsipedia/docs/styleGuide"}},s=[],m={toc:s};function u(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"ocaml"},"OCaml"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ocaml.org/"},"OCaml")," is a functional programming language developed at ",(0,o.kt)("a",{parentName:"p",href:"https://www.inria.fr/en"},"Inria")," over the past thirty years.\nIt belongs to the ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/ML_(programming_language)"},"ML")," family of statically-typed\nfunctional languages, which includes ",(0,o.kt)("a",{parentName:"p",href:"http://sml-family.org/"},"Standard ML"),",\n",(0,o.kt)("a",{parentName:"p",href:"https://reasonml.github.io/"},"ReasonML"),", and Microsoft's ",(0,o.kt)("a",{parentName:"p",href:"https://fsharp.org/"},"F#"),". ML was originally\ndeveloped as the ",(0,o.kt)("strong",{parentName:"p"},"M"),"eta ",(0,o.kt)("strong",{parentName:"p"},"L"),"anguage for the LCF theorem prover at the University of\nEdinburgh, and has long been a valuable tool for programmers working with formal logic or\ndeveloping other programming languages. It was a major influence in the design of the\nfunctional languages ",(0,o.kt)("a",{parentName:"p",href:"https://www.haskell.org/"},"Haskell")," and\n",(0,o.kt)("a",{parentName:"p",href:"https://www.scala-lang.org/"},"Scala"),", and more recently it has seen adoption in financial\nservices (for example, ",(0,o.kt)("a",{parentName:"p",href:"https://bloomberg.com/"},"Bloomberg")," and\n",(0,o.kt)("a",{parentName:"p",href:"https://janestreet.com"},"Jane Street"),") and web development (particularly at\n",(0,o.kt)("a",{parentName:"p",href:"https://facebook.com"},"Facebook"),")."),(0,o.kt)("p",null,"One advantage of OCaml is that its compiler is remarkably fast and sophisticated, and it can\ngenerate JavaScript output for running programs in a web browser. In fact, since the\ncompiler itself is written in OCaml, it is possible to compile the entire system to\nJavaScript and run it in the browser."),(0,o.kt)("p",null,"Here is an editor where you can type in OCaml code and execute it (click the button\nor type Ctrl-Enter):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml",metastring:"edit",edit:!0},"let x = 6\nlet y = x * 7\nlet rec fact x = if x <= 1 then 1 else x * (fact (x - 1))\nlet _ = fact 5\n")),(0,o.kt)("p",null,"If for some reason you want to reset the interpreter before executing the code (so that\nit will forget previous bindings), press the Shift key plus Ctrl-Enter."))}u.isMDXComponent=!0}}]);