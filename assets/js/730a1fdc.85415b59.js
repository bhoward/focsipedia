"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[1613],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=u(n),d=i,m=h["".concat(l,".").concat(d)]||h[d]||p[d]||o;return n?a.createElement(m,r(r({ref:t},c),{},{components:n})):a.createElement(m,r({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var u=2;u<o;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},3483:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return h}});var a=n(7462),i=n(3366),o=(n(7294),n(3905)),r=["components"],s={id:"overview",title:"Overview of Functional Programming"},l=void 0,u={unversionedId:"fp/overview",id:"fp/overview",isDocsHomePage:!1,title:"Overview of Functional Programming",description:"There is a more extensive introduction to FP later, but this section provides an early introduction to some of the concepts and tools that we will be using throughout the course.",source:"@site/docs/fp/overview.md",sourceDirName:"fp",slug:"/fp/overview",permalink:"/focsipedia/docs/fp/overview",editUrl:"https://github.com/bhoward/focsipedia/edit/master/docs/fp/overview.md",tags:[],version:"current",frontMatter:{id:"overview",title:"Overview of Functional Programming"},sidebar:"someSidebar",previous:{title:"Relational Databases",permalink:"/focsipedia/docs/sets/database"},next:{title:"Introduction to Functional Programming",permalink:"/focsipedia/docs/fp/intro"}},c=[{value:"Expressions and the Substitution Model",id:"expressions-and-the-substitution-model",children:[],level:2},{value:"Blocks and Local Values",id:"blocks-and-local-values",children:[],level:2},{value:"Pure Functions and Arguments",id:"pure-functions-and-arguments",children:[],level:2},{value:"Exercises",id:"exercises",children:[],level:2}],p={toc:c};function h(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"There is a more extensive ",(0,o.kt)("a",{parentName:"p",href:"intro"},"introduction to FP")," later, but this section provides an early introduction to some of the concepts and tools that we will be using throughout the course.\nThe language we will be using is called ",(0,o.kt)("a",{parentName:"p",href:"../reason"},"ReasonML"),", and there is an interpreter for it that can be embedded in any page of FoCSipedia.\nWhen you see a block of code like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let answer = 6 * 7;\n")),(0,o.kt)("p",null,"you can edit the code and press the Execute button (or hit CTRL-Enter) to run the modified code and see the output."),(0,o.kt)("h2",{id:"expressions-and-the-substitution-model"},"Expressions and the Substitution Model"),(0,o.kt)("p",null,"One of the core principles of functional programming is that programs are made up of ",(0,o.kt)("strong",{parentName:"p"},"expressions")," that may be evaluated.\nThey are composed of constants, variables, operators, and function calls, as in most languages, plus compound forms such as ",(0,o.kt)("a",{parentName:"p",href:"#blocks-and-local-values"},"blocks")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"if")," statements.\nUnlike most languages you are likely to have worked with, there are no assignment statements","\u2014","the only way to store a value in a variable is to put it there when the variable is created.\nWhen you write ",(0,o.kt)("inlineCode",{parentName:"p"},"let answer = 6 * 7"),", the variable ",(0,o.kt)("inlineCode",{parentName:"p"},"answer")," is created and assigned the value of the expression ",(0,o.kt)("inlineCode",{parentName:"p"},"6 * 7"),", which is ",(0,o.kt)("inlineCode",{parentName:"p"},"42"),".\nFrom then on, whenever you refer to that variable you will get the same value."),(0,o.kt)("p",null,"The ",(0,o.kt)("strong",{parentName:"p"},"Substitution Model"),' arises from this fact about variables: since the value of an expression cannot change, you are free to "substitute equals for equals," just as in algebra.\nIf you see the expression ',(0,o.kt)("inlineCode",{parentName:"p"},"answer + 1"),", you know that this is the same as ",(0,o.kt)("inlineCode",{parentName:"p"},"(6 * 7) + 1"),".\nThis seemingly simple observation is the basis of many of the powerful techniques that are enabled by functional programming; you will learn more about this later, but just one application is in optimizing code to be run in parallel on a multi-processor machine","\u2014","if you know that the substitution model holds, then the compiler has great freedom to rearrange when and where values are computed to maximize the use of the available processors.\nIn a language without the substitution model, where the value of a variable depends on the last time it was changed in an assignment statement, it is much harder to do this kind of optimization."),(0,o.kt)("p",null,"See if you can predict the output of the following code before you hit the Execute button:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit noexec",edit:!0,noexec:!0},"let a = 2;\nlet b = a + 1;\nlet c = if (a < b) { a * b } else { a * a + b };\nlet d = if (a > b) { a * b } else { a * a + b };\nlet e = c * d;\nprint_int(e);\n")),(0,o.kt)("h2",{id:"blocks-and-local-values"},"Blocks and Local Values"),(0,o.kt)("p",null,"The syntax of ReasonML is intentionally designed to be familiar to programmers who are used to C-like languages (C, C++, Java, JavaScript, and many others).\nAs seen in the ",(0,o.kt)("inlineCode",{parentName:"p"},"if")," statements above, curly braces may be used to surround subexpressions (such as ",(0,o.kt)("inlineCode",{parentName:"p"},"{ a * b }"),").\nSince everything is an expression, we could also have used parentheses around the subexpressions as usual.\nHowever, inside curly braces we have an extra option: before getting to the expression itself, we may have a series of ",(0,o.kt)("strong",{parentName:"p"},"local value definitions"),".\nFor example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},'let result = {\n  let local1 = "Hello";\n  let local2 = "World";\n  local1 ++ " " ++ local2\n};\nprint_string(result);\n')),(0,o.kt)("p",null,"The expression in curly braces is called a ",(0,o.kt)("strong",{parentName:"p"},"block"),".\nThe value of the expression (which is then bound as the value of ",(0,o.kt)("inlineCode",{parentName:"p"},"result"),") is the value of the last expression, ",(0,o.kt)("inlineCode",{parentName:"p"},'local1 ++ " " ++ local2')," (note that ",(0,o.kt)("inlineCode",{parentName:"p"},"++")," is the string concatenation operator in ReasonML).\nBefore it evaluates that expression, however, it first evaluates each of the ",(0,o.kt)("inlineCode",{parentName:"p"},"let")," statements (in order), temporarily binding those values to the given local variables.\nIn the example, ",(0,o.kt)("inlineCode",{parentName:"p"},"local1")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"local2")," are each bound to their corresponding string values, and then the final expression is evaluated relative to those variable bindings."),(0,o.kt)("p",null,"The names of variables within a block are completely invisible outside their block.\nAfter the block is finished, it is as if those local bindings never took place.\nThis allows us to use local reasoning about the value of an expression, without having to know what might have happened in other blocks (which might have coincidentally used the same variable names)."),(0,o.kt)("p",null,"Predict the result bound to the outer ",(0,o.kt)("inlineCode",{parentName:"p"},"x")," in this code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit noexec",edit:!0,noexec:!0},"let x = {\n  let x = 3;\n  x + x\n} * {\n  let x = 4;\n  x + x\n};\n")),(0,o.kt)("h2",{id:"pure-functions-and-arguments"},"Pure Functions and Arguments"),(0,o.kt)("p",null,"So far, we have only talked about expressions and variables.\nThe heart of functional programming, of course, is the ",(0,o.kt)("strong",{parentName:"p"},"function"),".\nIn ReasonML, functions are just another type of value, along with integers, strings, ",(0,o.kt)("em",{parentName:"p"},"etc."),"\nWe write the function value that takes arguments ",(0,o.kt)("inlineCode",{parentName:"p"},"a"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"b"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"c")," and returns the expression ",(0,o.kt)("inlineCode",{parentName:"p"},"e")," using the syntax ",(0,o.kt)("inlineCode",{parentName:"p"},"(a, b, c) => e"),".\nThis value is what is known as an ",(0,o.kt)("strong",{parentName:"p"},"anonymous function"),"; to give it a name, we bind it to a variable, just like any other value:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let area = (width, height) => { width * height };\nprint_int(area(6, 7));\n")),(0,o.kt)("p",null,"It is very common for the body to be a block expression, so we will always enclose it in curly braces for consistency.\nIn the second line of this example, after assigning the function value to ",(0,o.kt)("inlineCode",{parentName:"p"},"area"),", we are able to use ",(0,o.kt)("inlineCode",{parentName:"p"},"area")," as the name of a function just like the built-in functions (such as ",(0,o.kt)("inlineCode",{parentName:"p"},"print_int"),").\nNote that when ReasonML reports the bindings that result from this code, it says that ",(0,o.kt)("inlineCode",{parentName:"p"},"area")," has the ",(0,o.kt)("strong",{parentName:"p"},"type")," ",(0,o.kt)("inlineCode",{parentName:"p"},"(int, int) => int"),"\u2014","we will talk more about ",(0,o.kt)("a",{parentName:"p",href:"types"},"types")," later, but for now you can just think of it as giving a picture of a typical use of the function: when applied to two ",(0,o.kt)("inlineCode",{parentName:"p"},"int")," arguments, it returns an ",(0,o.kt)("inlineCode",{parentName:"p"},"int")," result."),(0,o.kt)("p",null,"Since functions are just another kind of value, they may themselves be passed as arguments to functions, or returned as results; we will explore these ",(0,o.kt)("strong",{parentName:"p"},"higher-order")," functions later."),(0,o.kt)("p",null,"Since expressions are evaluated according to the substitution model, where we do not have to worry about a variable changing its value between the time is was declared (",(0,o.kt)("strong",{parentName:"p"},"bound"),") and used, we know several very useful facts about functions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Functions in ReasonML are ",(0,o.kt)("strong",{parentName:"li"},"pure"),": the output only depends on the inputs, so calling a function twice with the same arguments will always produce the same result.\nFurthermore, we know that calling a function will not have any ",(0,o.kt)("strong",{parentName:"li"},"side-effects"),"\u2014","that is, it will not cause the bindings of any other variables to change.",(0,o.kt)("sup",{parentName:"li",id:"fnref-1"},(0,o.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),"\nIf a program uses only pure functions, then the compiler is free to optimize code in various ways: it may rearrange when functions are called; it may combine multiple calls with the same arguments into one, or split a single call into several; and if it detects that the result of a function call is not needed, it may omit the call entirely.\nNone of these optimizations are guaranteed to preserve program behavior if a function is not known to be pure, which is the case in most non-functional languages."),(0,o.kt)("li",{parentName:"ul"},"When an argument is passed to a function, the value (such as ",(0,o.kt)("inlineCode",{parentName:"li"},"6"),") is bound to the parameter name (such as ",(0,o.kt)("inlineCode",{parentName:"li"},"width"),") using the same mechanism as binding local variables in a block.\nTherefore, the function call in the example above could be rewritten as")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"print_int({\n  let width = 6;\n  let height = 7;\n  width * height\n});\n")),(0,o.kt)("h2",{id:"exercises"},"Exercises"),(0,o.kt)("div",{className:"footnotes"},(0,o.kt)("hr",{parentName:"div"}),(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol",id:"fn-1"},"Technically, some ReasonML functions ",(0,o.kt)("em",{parentName:"li"},"do")," have a side-effect, if they call input/output functions such as ",(0,o.kt)("inlineCode",{parentName:"li"},"print_int"),".\nThat is, you can tell the difference between calling such a function once, twice, or not at all, by looking at the output that is printed to the console.\nWe will consider this sort of side-effect to be benign, however, and we will generally use such functions only in very controlled places in a program, or only when tracing or debugging code.",(0,o.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}h.isMDXComponent=!0}}]);