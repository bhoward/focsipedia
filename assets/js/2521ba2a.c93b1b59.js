"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[169],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,s=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(a),d=i,u=m["".concat(l,".").concat(d)]||m[d]||h[d]||s;return a?n.createElement(u,r(r({ref:t},c),{},{components:a})):n.createElement(u,r({ref:t},c))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=a.length,r=new Array(s);r[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[m]="string"==typeof e?e:i,r[1]=o;for(var p=2;p<s;p++)r[p]=a[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},1988:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var n=a(7462),i=(a(7294),a(3905));const s={id:"state",title:"State Machines in Java and ReasonML"},r=void 0,o={unversionedId:"fp/state",id:"fp/state",title:"State Machines in Java and ReasonML",description:"There are many ways to implement the state machine concept in code. The essence is that",source:"@site/docs/fp/state.md",sourceDirName:"fp",slug:"/fp/state",permalink:"/focsipedia/docs/fp/state",draft:!1,editUrl:"https://github.com/bhoward/focsipedia/edit/master/docs/fp/state.md",tags:[],version:"current",frontMatter:{id:"state",title:"State Machines in Java and ReasonML"},sidebar:"someSidebar",previous:{title:"DPoodle Graphics",permalink:"/focsipedia/docs/fp/doodle"},next:{title:"Recursive Descent and Parser Combinators",permalink:"/focsipedia/docs/fp/parser-comb"}},l={},p=[{value:"Strings containing &quot;aeiou&quot;",id:"strings-containing-aeiou",level:2},{value:"State implicit in conditional statements",id:"state-implicit-in-conditional-statements",level:3},{value:"Integer state with transitions in a graph",id:"integer-state-with-transitions-in-a-graph",level:3},{value:"Object-oriented state and transitions",id:"object-oriented-state-and-transitions",level:3},{value:"Functional state and transitions",id:"functional-state-and-transitions",level:3},{value:"Vending Machine",id:"vending-machine",level:2},{value:"Integer state with transitions in a graph",id:"integer-state-with-transitions-in-a-graph-1",level:3},{value:"Object-oriented approach with encapsulated state",id:"object-oriented-approach-with-encapsulated-state",level:3},{value:"Exercises",id:"exercises",level:2}],c={toc:p},m="wrapper";function h(e){let{components:t,...a}=e;return(0,i.kt)(m,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,'There are many ways to implement the state machine concept in code. The essence is that\nthe input is processed one item at a time, in order, with only a fixed amount of\ninformation (the "state") preserved from one item to the next. The iteration over the\nitems may be performed by a loop or recursion; the state may be maintained explicitly\nin variables or hidden in an object, or it may be implicit in the current section of\ncode being executed; the transition from one state to the next may be controlled by a\nseries of conditional statements, a data structure representing the transition graph,\nor a function which encapsulates the required logic. Here are some examples:'),(0,i.kt)("h2",{id:"strings-containing-aeiou"},'Strings containing "aeiou"'),(0,i.kt)("p",null,"This is an example from Section 10.2 of ",(0,i.kt)("a",{parentName:"p",href:"http://infolab.stanford.edu/~ullman/focs.html"},"Aho ","&"," Ullman"),".\nA string of lower-case letters will be accepted if it contains the vowels ",(0,i.kt)("em",{parentName:"p"},"a"),", ",(0,i.kt)("em",{parentName:"p"},"e"),", ",(0,i.kt)("em",{parentName:"p"},"i"),", ",(0,i.kt)("em",{parentName:"p"},"o"),", and ",(0,i.kt)("em",{parentName:"p"},"u"),', in that order\n(the vowels may occur in other positions as well, as in "sacrilegious").'),(0,i.kt)("h3",{id:"state-implicit-in-conditional-statements"},"State implicit in conditional statements"),(0,i.kt)("p",null,"Here to start is a Java version of Aho ","&"," Ullman's Figure 10.2 (the original was in C):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public class ContainsAEIOU {\n  private String word;\n  private int index;\n\n  private boolean findChar(char c) {\n    while (index < word.length() && word.charAt(index) != c) {\n      index++;\n    }\n\n    if (index < word.length()) {\n      // character c found at position index; prepare for next call\n      index++;\n      return true;\n    } else {\n      // character not found in rest of word\n      return false;\n    }\n  }\n\n  public boolean test(String word) {\n    this.word = word;\n    this.index = 0;\n    /* state 0 */\n    if (findChar('a'))\n      /* state 1 */\n      if (findChar('e'))\n        /* state 2 */\n        if (findChar('i'))\n          /* state 3 */\n          if (findChar('o'))\n            /* state 4 */\n            if (findChar('u'))\n              /* state 5 */\n              return true;\n    /* error state */\n    return false;\n  }\n\n  public static void main(String[] args) {\n    ContainsAEIOU c = new ContainsAEIOU();\n    System.out.println(c.test(\"abstemious\")); // should be true\n    System.out.println(c.test(\"sacrilegious\")); // should be true\n    System.out.println(c.test(\"undercoating\")); // should be false -- not in order\n    System.out.println(c.test(\"religious\")); // should be false -- no a\n    System.out.println(c.test(\"aeiou\")); // should be true\n  }\n}\n")),(0,i.kt)("p",null,"The input is processed in this version by the ",(0,i.kt)("inlineCode",{parentName:"p"},"while")," loop in the ",(0,i.kt)("inlineCode",{parentName:"p"},"findChar"),"\nmethod; the variable ",(0,i.kt)("inlineCode",{parentName:"p"},"index")," (which is a class instance variable so that its value\nwill persist between calls to ",(0,i.kt)("inlineCode",{parentName:"p"},"findChar"),') is used to step through the characters in the word.\nThe current "state" is reflected in how far the execution has progressed through\nthe nested ',(0,i.kt)("inlineCode",{parentName:"p"},"if")," statements in ",(0,i.kt)("inlineCode",{parentName:"p"},"test"),"; after reading characters for a while in\nstate 0, it transitions to state 1 when the first ",(0,i.kt)("em",{parentName:"p"},"a")," is seen, then to state 2 upon\nseeing a following ",(0,i.kt)("em",{parentName:"p"},"e"),", ",(0,i.kt)("em",{parentName:"p"},"etc"),". If any of the calls to ",(0,i.kt)("inlineCode",{parentName:"p"},"findChar")," return false, meaning\nthe end of the string has been reached while looking for one of the vowels, then the\nmachine enters an error state (",(0,i.kt)("em",{parentName:"p"},"i.e."),", it falls through to the ",(0,i.kt)("inlineCode",{parentName:"p"},"return false")," at the end).\nIf all of the calls to ",(0,i.kt)("inlineCode",{parentName:"p"},"findChar")," succeed, then the\nmachine reaches state 5 and immediately returns true (without looking at the rest\nof the string)."),(0,i.kt)("p",null,"Given the way the ",(0,i.kt)("inlineCode",{parentName:"p"},"&&")," operator is evaluated from left to right, the sequence of ",(0,i.kt)("inlineCode",{parentName:"p"},"if")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"return")," statements in the ",(0,i.kt)("inlineCode",{parentName:"p"},"test")," method could also be written"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"return findChar('a') && findChar('e') && findChar('i') && findChar('o') && findChar('u');\n")),(0,i.kt)("p",null,"This is completely equivalent (and likely even generates the same compiled code), although\nit might be harder to see which point in the code corresponds to each state."),(0,i.kt)("p",null,"The Java version is a very imperative approach to the problem, depending as it does on changes\nto the variable ",(0,i.kt)("inlineCode",{parentName:"p"},"index")," as it traces through the sequence of method calls and loops. Here is a\nmore functional equivalent in ReasonML, where indexing into a string is replaced by traversing\nthrough a list of characters, and the ",(0,i.kt)("inlineCode",{parentName:"p"},"findChar")," method returns a pair of a boolean plus the\nlist of the remaining unsearched characters:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let rec findChar = (chars, c) => {\n  switch (chars) {\n  | [] => (false, [])\n  | [head, ...tail] => if (head == c) {\n      (true, tail)\n    } else {\n      findChar(tail, c)\n    }\n  }\n};\n\nlet test = word => {\n  /* expand a string to a list of characters */\n  let chars = List.init(String.length(word), String.get(word));\n  /* state 0 */\n  let (foundA, rest) = findChar(chars, 'a');\n  if (foundA) {\n    /* state 1 */\n    let (foundE, rest) = findChar(rest, 'e');\n    if (foundE) {\n      /* state 2 */\n      let (foundI, rest) = findChar(rest, 'i');\n      if (foundI) {\n        /* state 3 */\n        let (foundO, rest) = findChar(rest, 'o');\n        if (foundO) {\n          /* state 4 */\n          let (foundU, rest) = findChar(rest, 'u');\n          if (foundU) {\n            /* state 5 */\n            true\n          } else false\n        } else false\n      } else false\n    } else false\n  } else false\n};\n\ntest(\"abstemious\"); /* should be true */\ntest(\"sacrilegious\"); /* should be true */\ntest(\"undercoating\"); /* should be false -- not in order */\ntest(\"religious\"); /* should be false -- no a */\ntest(\"aeiou\"); /* should be true */\n")),(0,i.kt)("h3",{id:"integer-state-with-transitions-in-a-graph"},"Integer state with transitions in a graph"),(0,i.kt)("p",null,"Here is the same state machine, with the state explicitly represented by an integer\nin the range 0 to 5. The transitions are stored in an array of functions: ",(0,i.kt)("inlineCode",{parentName:"p"},"trans[i]")," is the\nfunction, for state ",(0,i.kt)("inlineCode",{parentName:"p"},"i"),", from the current character to the next state.\nNote that this is similar to the adjacency matrix representation of a graph, except here\nwe are looking up a node (",(0,i.kt)("inlineCode",{parentName:"p"},"i"),") and an input symbol (",(0,i.kt)("inlineCode",{parentName:"p"},"c"),") to select an adjacent node, instead\nof looking up two nodes to see whether they are adjacent.\nEach of the functions in\nthis case is particularly simple, since at most one edge leads away from each state\nto another. See below for other examples using more complicated graphs."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let trans = [|\n  (c) => if (c == 'a') 1 else 0, /* state 0 */\n  (c) => if (c == 'e') 2 else 1, /* state 1 */\n  (c) => if (c == 'i') 3 else 2, /* state 2 */\n  (c) => if (c == 'o') 4 else 3, /* state 3 */\n  (c) => if (c == 'u') 5 else 4, /* state 4 */\n  (c) => 5 /* state 5 */\n|];\n\nlet test = word => {\n  let chars = List.init(String.length(word), String.get(word));\n  /* List.fold_left is our reduce function */\n    let final_state = List.fold_left((state, c) => trans[state](c), 0, chars);\n  final_state == 5 /* returns true if accepting state reached */\n}\n\ntest(\"abstemious\"); /* should be true */\ntest(\"sacrilegious\"); /* should be true */\ntest(\"undercoating\"); /* should be false -- not in order */\ntest(\"religious\"); /* should be false -- no a */\ntest(\"aeiou\"); /* should be true */\n")),(0,i.kt)("p",null,"Walking over a list and applying a transition function from the current state and input\nitem to get the next state is just a direct application of our ",(0,i.kt)("inlineCode",{parentName:"p"},"reduce")," function on\nlists; the ReasonML library calls it ",(0,i.kt)("inlineCode",{parentName:"p"},"List.fold_left"),"."),(0,i.kt)("h3",{id:"object-oriented-state-and-transitions"},"Object-oriented state and transitions"),(0,i.kt)("p",null,"Instead of assigning arbitrary numbers to the states, and collecting all of the\ntransition information into a global graph data structure, a more object-oriented\napproach associates an object with each state. Here is a Java implementation of this idea:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"package edu.depauw.csc233;\n\npublic class ContainsAEIOU2 {\n  private interface State {\n    State trans(char c);\n    default boolean accept() { return false; }\n  }\n\n  private static class InitialState implements State {\n    public State trans(char c) {\n      if (c == 'a') {\n        return new AState();\n      } else {\n        return this;\n      }\n    }\n  }\n\n  private static class AState implements State {\n    public State trans(char c) {\n      if (c == 'e') {\n        return new AEState();\n      } else {\n        return this;\n      }\n    }\n  }\n\n  private static class AEState implements State {\n    public State trans(char c) {\n      if (c == 'i') {\n        return new AEIState();\n      } else {\n        return this;\n      }\n    }\n  }\n\n  private static class AEIState implements State {\n    public State trans(char c) {\n      if (c == 'o') {\n        return new AEIOState();\n      } else {\n        return this;\n      }\n    }\n  }\n\n  private static class AEIOState implements State {\n    public State trans(char c) {\n      if (c == 'u') {\n        return new AEIOUState();\n      } else {\n        return this;\n      }\n    }\n  }\n\n  private static class AEIOUState implements State {\n    public State trans(char c) {\n      return this;\n    }\n\n    public boolean accept() {\n      return true;\n    }\n  }\n\n  public static boolean test(String word) {\n    State state = new InitialState();\n    for (int i = 0; i < word.length(); i++) {\n      state = state.trans(word.charAt(i));\n    }\n    return state.accept();\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(test(\"abstemious\")); // should be true\n    System.out.println(test(\"sacrilegious\")); // should be true\n    System.out.println(test(\"undercoating\")); // should be false -- not in order\n    System.out.println(test(\"religious\")); // should be false -- no a\n    System.out.println(test(\"aeiou\")); // should be true\n  }\n}\n")),(0,i.kt)("p",null,"Each of the state classes implements the ",(0,i.kt)("inlineCode",{parentName:"p"},"State")," interface, which bundles both a\ntransition method, ",(0,i.kt)("inlineCode",{parentName:"p"},"trans")," (it computes the next state for a given input character),\nand an ",(0,i.kt)("inlineCode",{parentName:"p"},"accept")," method (it returns true if the state is accepting; the interface\nprovides a default implementation that returns false). The ",(0,i.kt)("inlineCode",{parentName:"p"},"test")," function now only\nneeds to know the initial state; it would be written in exactly the same way for\nany machine that processes the characters in a string."),(0,i.kt)("h3",{id:"functional-state-and-transitions"},"Functional state and transitions"),(0,i.kt)("p",null,"An interesting functional equivalent to the previous object-oriented version\nrepresents each state by a pair of a boolean and a function from characters to states.\nSince the ",(0,i.kt)("inlineCode",{parentName:"p"},"state")," type is defined in terms of itself, we need to wrap it up in a\nconstructor:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-reason",metastring:"demo",demo:!0},"type state = State(bool, char => state);\n")),(0,i.kt)("p",null,'Here is the code for our "aeiou" machine:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let rec initialState = State(false, c => if (c == 'a') aState else initialState)\nand aState = State(false, c => if (c == 'e') aeState else aState)\nand aeState = State(false, c => if (c == 'i') aeiState else aeState)\nand aeiState = State(false, c => if (c == 'o') aeioState else aeiState)\nand aeioState = State(false, c => if (c == 'u') aeiouState else aeioState)\nand aeiouState = State(true, _ => aeiouState);\n\nlet test = word => {\n  let chars = List.init(String.length(word), String.get(word));\n  let State(accept, _) =\n    List.fold_left((State(_, trans), c) => trans(c), initialState, chars);\n  accept\n};\n\ntest(\"abstemious\"); /* should be true */\ntest(\"sacrilegious\"); /* should be true */\ntest(\"undercoating\"); /* should be false -- not in order */\ntest(\"religious\"); /* should be false -- no a */\ntest(\"aeiou\"); /* should be true */\n")),(0,i.kt)("h2",{id:"vending-machine"},"Vending Machine"),(0,i.kt)("p",null,"Suppose we want to model a vending machine which accepts nickels, dimes, and quarters,\nand dispenses a piece of candy when 25 cents has been deposited. If more than 25 cents\nis put in (for example, three dimes), then after dispensing the candy the remaining\namount is applied toward the next transaction (that is, it doesn't give any change)."),(0,i.kt)("p",null,'This use of a finite state machine is a bit different from what we have seen before, since\nthere is no notion of an "accepting" state. Instead, we imagine that the machine is\nperforming a long-running computation (in this case, it runs as long as the vending\nmachine is in service, potentially for years).\nIt is customary for this kind of machine to add a notion of "output," so that the\nmachine can give feedback after each transition instead of just at the end (which may\nnever come). There are two standard models for doing this:'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"A ",(0,i.kt)("strong",{parentName:"p"},"Mealy Machine")," is a finite state machine where each transition has an associated\noutput. We annotate each transition with a label such as ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"a"),(0,i.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"/"),(0,i.kt)("mi",{parentName:"mrow"},"x")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"a/x")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"a"),(0,i.kt)("span",{parentName:"span",className:"mord"},"/"),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"x"))))),", meaning that it takes the\ntransition if the input is ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"a")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"a")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"a"))))),", and as it does so it produces output ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"x")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"x")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"x"))))),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"A ",(0,i.kt)("strong",{parentName:"p"},"Moore Machine")," is a finite state machine where the output after each transition is\ndetermined by the new state. Each state has a label such as ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"A"),(0,i.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"/"),(0,i.kt)("mi",{parentName:"mrow"},"x")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A/x")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"A"),(0,i.kt)("span",{parentName:"span",className:"mord"},"/"),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"x"))))),", meaning that when the\nmachine transitions to state ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"A")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"A")))))," it will also produce output ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"x")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"x")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"x"))))),"."))),(0,i.kt)("p",null,"For both kinds of machines, the output may be ",(0,i.kt)("span",{parentName:"p",className:"math math-inline"},(0,i.kt)("span",{parentName:"span",className:"katex"},(0,i.kt)("span",{parentName:"span",className:"katex-mathml"},(0,i.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,i.kt)("semantics",{parentName:"math"},(0,i.kt)("mrow",{parentName:"semantics"},(0,i.kt)("mi",{parentName:"mrow"},"\u03b5")),(0,i.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\varepsilon")))),(0,i.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,i.kt)("span",{parentName:"span",className:"base"},(0,i.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,i.kt)("span",{parentName:"span",className:"mord mathdefault"},"\u03b5")))))," if no output is desired at that time.\nIt is not very difficult to see that Mealy and Moore machines have equivalent power, by showing\nhow to construct each from the other; the choice is often a matter of convenience. For example,\nin constructing a sequential circuit implementation, the Moore machine has the advantage that\nthe output part of the circuit only needs lines connecting to the current state (the outputs\nof the flip-flops), while the Mealy machine may require fewer states (and hence fewer flip-flops)\nin some cases."),(0,i.kt)("h3",{id:"integer-state-with-transitions-in-a-graph-1"},"Integer state with transitions in a graph"),(0,i.kt)("p",null,"We will adopt a similar solution as for the second version of the vowel problem. This\ntime, the integer state numbers will be more meaningful: they will be 0, 5, 10, 15,\nand 20, representing the amount of money which has been deposited so far. Since these\nare not consecutive, the graph will be represented by a function with two inputs instead of an\narray of functions. Also, there will be no need for default transitions, since each of the\nthree possible inputs ('N', 'D', or 'Q', for nickel, dime, and quarter) will cause a\ndifferent change of state. One further difference is that each edge in the graph will\ngive not only a new state but also an indication of whether candy was given out on\nthe transition (this means that it is a Mealy machine). Finally, there is no accepting state, since the machine will keep\nrunning as long as there is input; in the example below, we will print \"Candy!\"\nwhenever it produces a piece of candy."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-reason",metastring:"edit",edit:!0},"let vtrans = (amount, input) => {\n  switch (amount, input) {\n  | (0, 'N') => (5, false)\n  | (0, 'D') => (10, false)\n  | (0, 'Q') => (0, true)\n  | (5, 'N') => (10, false)\n  | (5, 'D') => (15, false)\n  | (5, 'Q') => (5, true)\n  | (10, 'N') => (15, false)\n  | (10, 'D') => (20, false)\n  | (10, 'Q') => (10, true)\n  | (15, 'N') => (20, false)\n  | (15, 'D') => (0, true)\n  | (15, 'Q') => (15, true)\n  | (20, 'N') => (0, true)\n  | (20, 'D') => (5, true)\n  | (20, 'Q') => (20, true)\n  | _ => failwith(\"Invalid state or input\")\n  }\n}\n\nlet vend = coins => {\n  let rec aux = (coins, state) => {\n    switch (coins) {\n    | [] => state\n    | [head, ...tail] => {\n        let (state', candy) = vtrans(state, head);\n        if (candy) print_string(\"Candy! \");\n        aux(tail, state')\n      }\n    }\n  };\n  aux(coins, 0)\n};\n\nvend(['N', 'N', 'N', 'N', 'Q', 'D', 'N', 'N', 'D']); /* Should print Candy! three times */\n")),(0,i.kt)("h3",{id:"object-oriented-approach-with-encapsulated-state"},"Object-oriented approach with encapsulated state"),(0,i.kt)("p",null,"Instead of exposing an explicit state, we can wrap it up inside an object with\n(mutable) internal state. Here is a Java version of the vending machine, which also\nreplaces the discrete transition graph with a calculated transition function:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public class VendingMachine {\n  private int price;\n  private int balance;\n  \n  public VendingMachine(int price) {\n    this.price = price;\n    this.balance = 0;\n  }\n  \n  /**\n   * Insert the given amount of money; returns true if an item is vended.\n   */\n  public boolean deposit(int amount) {\n    balance += amount;\n    if (balance >= price) {\n      balance -= price;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  public static void main(String[] args) {\n    VendingMachine machine = new VendingMachine(25);\n    String input = \"NNNNQDNND\"; // Should print Candy! three times\n    for (int i = 0; i < input.length(); i++) {\n      boolean candy = false;\n      switch (input.charAt(i)) {\n        case 'N': candy = machine.deposit(5); break;\n        case 'D': candy = machine.deposit(10); break;\n        case 'Q': candy = machine.deposit(25); break;\n        default: throw new RuntimeException(\"Invalid input\");\n      }\n      if (candy) System.out.println(\"Candy!\");\n    }\n  }\n}\n")),(0,i.kt)("h2",{id:"exercises"},"Exercises"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Sketch the process of constructing a Mealy machine from a Moore machine, and ",(0,i.kt)("em",{parentName:"p"},"vice versa"),".")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Give at least two implementations of a state machine that recognizes valid floating-point literals in Java.\nYou will first need to research the Java language definition to learn what constitutes a valid literal.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},'Give at least two implementations of a state machine (expressed as either a Mealy or Moore machine) that\nsimulates the operation of a keypad-based lock. There should be ten input buttons, one for each decimal digit,\nand two output signals, "lock" and "unlock." If the code 1234 in sequence is ever entered on the keypad, then the unlock\nsignal should be produced. After any other key press (that is, if the last four digits entered at any point were\nnot 1234), the output should be "lock".'))))}h.isMDXComponent=!0}}]);