"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[2043],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>f});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},h="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),h=l(a),d=r,f=h["".concat(p,".").concat(d)]||h[d]||c[d]||s;return a?n.createElement(f,i(i({ref:t},m),{},{components:a})):n.createElement(f,i({ref:t},m))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,i=new Array(s);i[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[h]="string"==typeof e?e:r,i[1]=o;for(var l=2;l<s;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2759:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var n=a(7462),r=(a(7294),a(3905));const s={id:"trees",title:"Trees"},i=void 0,o={unversionedId:"ds/trees",id:"ds/trees",title:"Trees",description:"Binary Trees",source:"@site/docs/ds/trees.md",sourceDirName:"ds",slug:"/ds/trees",permalink:"/focsipedia/docs/ds/trees",draft:!1,editUrl:"https://github.com/bhoward/focsipedia/edit/master/docs/ds/trees.md",tags:[],version:"current",frontMatter:{id:"trees",title:"Trees"},sidebar:"someSidebar",previous:{title:"Program Verification",permalink:"/focsipedia/docs/ds/verification"},next:{title:"Binary Search Trees and Heaps",permalink:"/focsipedia/docs/ds/bst"}},p={},l=[{value:"Binary Trees",id:"binary-trees",level:2},{value:"Traversals",id:"traversals",level:3},{value:"Expression Trees",id:"expression-trees",level:3},{value:"Exercises",id:"exercises",level:2}],m={toc:l},h="wrapper";function c(e){let{components:t,...a}=e;return(0,r.kt)(h,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"binary-trees"},"Binary Trees"),(0,r.kt)("p",null,"A ",(0,r.kt)("strong",{parentName:"p"},"binary tree")," is a data structure that is either empty or it consists of a root node with three pieces of data: a value (often a number or a string), and two subtrees, one on the left and one on the right.\nThis can be expressed with the following recursive data type in ReasonML:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"type tree('a) = EmptyTree | TreeNode(tree('a), 'a, tree('a));\n\nlet leaf = a => { TreeNode(EmptyTree, a, EmptyTree) };\nlet demo = TreeNode(leaf(1), 2, TreeNode(leaf(3), 4, leaf(5)));\n")),(0,r.kt)("p",null,"We use a type variable ",(0,r.kt)("inlineCode",{parentName:"p"},"'a")," as a parameter to specify the type of values in the tree.\nThe function ",(0,r.kt)("inlineCode",{parentName:"p"},"leaf")," is a convenience, so that we can write ",(0,r.kt)("inlineCode",{parentName:"p"},"leaf(1)")," for the tree with just the value 1 and two empty children instead of ",(0,r.kt)("inlineCode",{parentName:"p"},"TreeNode(EmptyTree, 1, EmptyTree)"),".\nNote the similarity to a list of type ",(0,r.kt)("inlineCode",{parentName:"p"},"list('a)"),", which is either an empty list or a list node with a head value (of type ",(0,r.kt)("inlineCode",{parentName:"p"},"'a"),") and a sublist of the rest of the elements (the tail)."),(0,r.kt)("p",null,"The natural way to write a function that takes a binary tree is to use (surprise) Pattern Matching, which corresponds to doing structural induction over the construction of the tree.\nFor example, suppose we want to know how many nodes a tree has:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},'let rec size = t => {\n  switch (t) {\n  | EmptyTree => 0\n  | TreeNode(left, _, right) => size(left) + 1 + size(right)\n  }\n};\n\nsize(EmptyTree);\nsize(leaf("hello"));\nsize(demo);\n')),(0,r.kt)("p",null,"If we have a list with integer values, we might want to get the total of all the values in the tree:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let rec total = t => {\n  switch (t) {\n  | EmptyTree => 0\n  | TreeNode(left, value, right) => total(left) + value + total(right)\n  }\n};\n\ntotal(EmptyTree);\ntotal(demo);\n")),(0,r.kt)("p",null,"Note that type inference is able to figure out that the argument must be a ",(0,r.kt)("inlineCode",{parentName:"p"},"tree(int)")," in this case, because we are using integer addition on the values."),(0,r.kt)("p",null,"A useful function on trees will be to have a visualization of the tree.\nHere is a simple rendering of a tree with DPoodle (the second argument, ",(0,r.kt)("inlineCode",{parentName:"p"},"show"),", is a function from ",(0,r.kt)("inlineCode",{parentName:"p"},"'a")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", so that we can visualize trees with any type of value; note that the size of the box around the value will need to be changed if the strings are more than one character):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},'let rec showTree = (t, show) => {\n  switch (t) {\n  | EmptyTree => solid(Color("black"), circle(2.))\n  | TreeNode(lt, value, rt) => {\n      let showLeft = showTree(lt, show);\n      let showRight = showTree(rt, show);\n      let leftShift = right(showLeft) +. 10.;\n      let rightShift = left(showRight) -. 10.;\n      let leftLine = openPath([moveXY(0., 0.), lineXY(leftShift, -30.)]);\n      let rightLine = openPath([moveXY(0., 0.), lineXY(rightShift, -30.)]);\n      let leftImage = focus(TR, showLeft +++ focus(BL, leftLine));\n      let rightImage = focus(TL, showRight +++ focus(BR, rightLine));\n      let valueImage = stroke(Color("none"), fill(Color("black"), text(show(value))))\n        +++ stroke(Color("black"), fill(Color("white"), square(20.)));\n      valueImage +++ leftImage +++ rightImage\n    }\n  }\n};\n\ndraw(showTree(demo, string_of_int));\n')),(0,r.kt)("h3",{id:"traversals"},"Traversals"),(0,r.kt)("p",null,"Processing a binary tree is often expressed as a ",(0,r.kt)("strong",{parentName:"p"},"traversal"),".\nThere are several common tree traversals:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Preorder"),": To process a non-empty tree, first process the value in its root node, then process the left child followed by the right child."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Inorder"),": To process a non-empty tree, first process the left child, then the value in the root node, and finally the right child."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Postorder"),": To process a non-empty tree, first process the left child, then the right child, and finish with the value in the root node."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Level order"),": Process the value in the root node, then process the values in its children from left to right, then process its children's children from left to right, and so on, until there are no more nodes.")),(0,r.kt)("p",null,"The first three traversals have very easy recursive implementations. For example, here is the preorder traversal, which takes a ",(0,r.kt)("inlineCode",{parentName:"p"},"tree('a)")," and a function ",(0,r.kt)("inlineCode",{parentName:"p"},"process: 'a => unit"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let rec preOrder = (t, process) => {\n  switch (t) {\n  | EmptyTree => ()\n  | TreeNode(left, value, right) => {\n      process(value);\n      preOrder(left, process);\n      preOrder(right, process)\n    }\n  }\n};\n\npreOrder(demo, print_int);\n")),(0,r.kt)("p",null,"We will have to wait a bit to see how to do the level order traversal."),(0,r.kt)("p",null,"To see an interesting connection between traversals and programming languages, we will consider a variation on binary trees called ",(0,r.kt)("strong",{parentName:"p"},"expression trees"),"."),(0,r.kt)("h3",{id:"expression-trees"},"Expression Trees"),(0,r.kt)("p",null,"An expression tree represents the structure of an expression.\nThis could be an arithmetic expression, such as ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mi",{parentName:"mrow"},"a"),(0,r.kt)("mo",{parentName:"mrow"},"+"),(0,r.kt)("mi",{parentName:"mrow"},"b"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,r.kt)("mo",{parentName:"mrow"},"\u22c5"),(0,r.kt)("mi",{parentName:"mrow"},"c")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"(a+b)\\cdot c")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord mathdefault"},"a"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"+"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathdefault"},"b"),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u22c5"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathdefault"},"c"))))),", or a boolean expression such as ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mi",{parentName:"mrow"},"p"),(0,r.kt)("mo",{parentName:"mrow"},"\u2228"),(0,r.kt)("mi",{parentName:"mrow"},"q"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,r.kt)("mo",{parentName:"mrow"},"\u2227"),(0,r.kt)("mi",{parentName:"mrow"},"r")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"(p\\lor q)\\land r")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord mathdefault"},"p"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2228"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathdefault",style:{marginRight:"0.03588em"}},"q"),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2227"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathdefault",style:{marginRight:"0.02778em"}},"r"))))),"; it also generalizes to expressions in a programming language, such as ",(0,r.kt)("inlineCode",{parentName:"p"},"if (a < b) c else d")," in ReasonML.\nFor now we will limit our consideration to expressions with boolean operators and integer operands, which can be described by the following recursive type:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},'type expr = Const(int) | BinOp(expr, string, expr);\n\nlet sample = BinOp(BinOp(Const(1), "+", Const(2)), "*", Const(3));\n')),(0,r.kt)("p",null,"Now we may define functions that perform preorder, inorder, and postorder traversals of expression trees to produce string representations of an expression:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},'let rec prefix = e => {\n  switch (e) {\n  | Const(n) => string_of_int(n)\n  | BinOp(left, op, right) => Printf.sprintf("%s(%s, %s)", op, prefix(left), prefix(right))\n  }\n};\n\nlet rec infix = e => {\n  switch (e) {\n  | Const(n) => string_of_int(n)\n  | BinOp(left, op, right) => Printf.sprintf("(%s %s %s)", infix(left), op, infix(right))\n  }\n};\n\nlet rec postfix = e => {\n  switch (e) {\n  | Const(n) => string_of_int(n)\n  | BinOp(left, op, right) => Printf.sprintf("%s %s %s", postfix(left), postfix(right), op)\n  }\n};\n\nprefix(sample);\ninfix(sample);\npostfix(sample);\n')),(0,r.kt)("p",null,"The preorder traversal of an expression tree gives the ",(0,r.kt)("strong",{parentName:"p"},"prefix")," form of the expression, where the operator comes in front of both of its operands.\nWith the extra parentheses and commas added above, you can see that this is our familiar function call notation: ",(0,r.kt)("inlineCode",{parentName:"p"},"+(1, 2)")," is just the application of the addition function to the arguments ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"2"),"."),(0,r.kt)("p",null,"The inorder traversal of an expression tree gives the ",(0,r.kt)("strong",{parentName:"p"},"infix")," form of the expression, where the operator takes its usual position between its operands.\nThe extra parentheses are essential here, to avoid the ambiguity of whether ",(0,r.kt)("inlineCode",{parentName:"p"},"1 + 2 * 3")," is an addition of ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"2 * 3"),", or whether it is a multiplication of ",(0,r.kt)("inlineCode",{parentName:"p"},"1 + 2")," by ",(0,r.kt)("inlineCode",{parentName:"p"},"3"),".\nIn practical use we get around this by adopting conventions of ",(0,r.kt)("strong",{parentName:"p"},"precedence"),", saying for example that multiplication takes precedence over addition, so that ",(0,r.kt)("inlineCode",{parentName:"p"},"1 + 2 * 3")," has an addition operator at the root.\nIn the sample expression tree, however, the multiplication is at the root, so we have to insert at least one pair of parentheses to get the correct expression: ",(0,r.kt)("inlineCode",{parentName:"p"},"(1 + 2) * 3"),"."),(0,r.kt)("p",null,"The postorder traversal of an expression tree gives the ",(0,r.kt)("strong",{parentName:"p"},"postfix")," form of the expression, which may not be as familiar.\nBack in the Dark Ages",(0,r.kt)("sup",{parentName:"p",id:"fnref-1"},(0,r.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))," of computing, Hewlett-Packard made a series of powerful calculators that became very popular, particularly with engineers.\nAt the time, calculators were not able to handle arbitrarily complex infix expressions (many of them didn't even have parentheses","\u2026","), and HP's solution was elegant: use postfix instead of infix!\nThey referred to this as Reverse Polish Notation (RPN) in honor of the logician Jan \u0141ukasiewicz (1878","\u2013","1956), who invented postfix in the 1920's as a way to write logical expressions without parentheses."),(0,r.kt)("p",null,"The key to interpreting a postfix expression is to imagine maintaining a ",(0,r.kt)("strong",{parentName:"p"},"stack")," of values as you read from left to right.\nWhen you see a number, ",(0,r.kt)("em",{parentName:"p"},"push")," that value onto the stack.\nWhen you see an operator, since it must be following its two operands, ",(0,r.kt)("em",{parentName:"p"},"pop")," two values from the stack, perform the operation, and ",(0,r.kt)("em",{parentName:"p"},"push")," the result back on the stack.\nFor the sample above, ",(0,r.kt)("inlineCode",{parentName:"p"},"1 2 + 3 *"),", you can check that the resulting value on the stack at the end of the expression is the expected ",(0,r.kt)("inlineCode",{parentName:"p"},"9"),"."),(0,r.kt)("p",null,"More recent uses of postfix expressions and stack-based evaluation are the PostScript page description language used by many printers (which also forms the basis of the PDF document format), and the Java Virtual Machine code produced by the Java compiler."),(0,r.kt)("h2",{id:"exercises"},"Exercises"),(0,r.kt)("div",{className:"footnotes"},(0,r.kt)("hr",{parentName:"div"}),(0,r.kt)("ol",{parentName:"div"},(0,r.kt)("li",{parentName:"ol",id:"fn-1"},"The 1970's. See ",(0,r.kt)("a",{parentName:"li",href:"https://www.hpmuseum.org/rpn.htm"},"https://www.hpmuseum.org/rpn.htm")," for more details on RPN.",(0,r.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}c.isMDXComponent=!0}}]);