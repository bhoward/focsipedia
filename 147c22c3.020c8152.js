(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{92:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return i})),t.d(a,"metadata",(function(){return c})),t.d(a,"rightToc",(function(){return r})),t.d(a,"default",(function(){return l}));var n=t(1),s=t(6),o=(t(0),t(120)),i={id:"intro",title:"Logic"},c={id:"logic/intro",title:"Logic",description:"(Adapted from Critchlow & Eck)",source:"@site/docs/logic/intro.md",permalink:"/focsipedia/docs/logic/intro",editUrl:"https://github.com/bhoward/focsipedia/edit/master/docs/logic/intro.md",sidebar:"someSidebar",previous:{title:"Topics",permalink:"/focsipedia/docs/topics"},next:{title:"Propositional Logic",permalink:"/focsipedia/docs/logic/props"}},r=[],m={rightToc:r},p="wrapper";function l(e){var a=e.components,t=Object(s.a)(e,["components"]);return Object(o.b)(p,Object(n.a)({},m,t,{components:a,mdxType:"MDXLayout"}),Object(o.b)("p",null,"(Adapted from Critchlow & Eck)"),Object(o.b)("p",null,"In a sense, we know a lot more than we realize,\nbecause everything that we know has consequences---",Object(o.b)("em",{parentName:"p"},"logical"),"\nconsequences---that follow automatically.  If you know that all\nhumans are mortal, and you know that you are human, then in a\nsense you know that you are mortal, whether or not you have ever\nconsidered or wanted to consider that fact.  This is an example\nof logical ",Object(o.b)("strong",{parentName:"p"},"deduction"),": From the ",Object(o.b)("strong",{parentName:"p"},"premises"),' that "All\nhumans are mortal: and "I am human," the ',Object(o.b)("strong",{parentName:"p"},"conclusion"),'\nthat "I am mortal" can be deduced by logic.'),Object(o.b)("p",null,'Logical deduction is a kind of computation.  By applying rules\nof logic to a given set of premises, conclusions that follow\nfrom those premises can be generated automatically, by a\ncomputational process which could be carried out by a computer.\nOnce you know the premises, or are willing to accept them for\nthe sake of argument, you are forced---by logic---to accept\nthe conclusions.  Still, to say that you "know" those conclusions\nwould be misleading.  The problem is that there are too many of\nthem (infinitely many), and, in general, most of them are not\nparticularly interesting.  Until you have actually made the\ndeduction, you don\'t ',Object(o.b)("em",{parentName:"p"},"really")," know the conclusion, and\nknowing which of the possible chains of deduction to follow\nis not easy.  The ",Object(o.b)("em",{parentName:"p"},"art")," of logic is to find\nan interesting conclusion and a chain of logical deductions that\nleads from the premises to that conclusion.  Checking that the\ndeductions are valid is the mechanical, computational side of\nlogic."),Object(o.b)("p",null,"This chapter is mostly about the mechanics of logic.  We will\ninvestigate logic as a branch of mathematics, with its own\nsymbols, formulas, and rules of computation.  Your object is\nto learn the rules of logic, to understand why they are valid,\nand to develop skill in applying them.  As with any branch of\nmathematics, there is a certain beauty to the symbols and formulas\nthemselves.  But it is the applications that bring the subject to\nlife for most people.  We will, of course, cover some applications\nas we go along.   In a sense, though, the real applications of\nlogic include much of computer science and of mathematics itself."),Object(o.b)("p",null,"Among the fundamental elements of thought, and therefore of logic, are\npropositions.  A ",Object(o.b)("strong",{parentName:"p"},"proposition"),' is a statement that has a truth\nvalue:  It is either true or false.\n"Grass is green" and "',Object(o.b)("span",Object(n.a)({parentName:"p"},{className:"math math-inline"}),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"katex"}),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"katex-mathml"}),Object(o.b)("math",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/1998/Math/MathML"}),Object(o.b)("semantics",{parentName:"math"},Object(o.b)("mrow",{parentName:"semantics"},Object(o.b)("mn",{parentName:"mrow"},"2"),Object(o.b)("mo",{parentName:"mrow"},"+"),Object(o.b)("mn",{parentName:"mrow"},"2"),Object(o.b)("mo",{parentName:"mrow"},"="),Object(o.b)("mn",{parentName:"mrow"},"5")),Object(o.b)("annotation",Object(n.a)({parentName:"semantics"},{encoding:"application/x-tex"}),"2 + 2 = 5")))),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"katex-html","aria-hidden":"true"}),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"base"}),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"strut",style:{height:"0.72777em",verticalAlign:"-0.08333em"}})),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mord"}),"2"),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mspace",style:{marginRight:"0.2222222222222222em"}})),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mbin"}),"+"),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mspace",style:{marginRight:"0.2222222222222222em"}}))),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"base"}),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"strut",style:{height:"0.64444em",verticalAlign:"0em"}})),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mord"}),"2"),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mspace",style:{marginRight:"0.2777777777777778em"}})),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mrel"}),"="),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mspace",style:{marginRight:"0.2777777777777778em"}}))),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"base"}),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"strut",style:{height:"0.64444em",verticalAlign:"0em"}})),Object(o.b)("span",Object(n.a)({parentName:"span"},{className:"mord"}),"5"))))),'"\nare propositions.  In the first part of this chapter, we will\nstudy ',Object(o.b)("strong",{parentName:"p"},"propositional logic"),", which takes propositions as basic\nand considers how they can be combined and manipulated.  This\nbranch of logic has surprising application to the design of\nthe electronic circuits that make up computers."),Object(o.b)("p",null,'Logic gets more interesting when we consider the internal\nstructure of propositions.  In English, a proposition is expressed as\na sentence, and, as you know from studying grammar, sentences have\nparts.  A simple sentence like "Grass is green" has a\n',Object(o.b)("strong",{parentName:"p"},"subject")," and a ",Object(o.b)("strong",{parentName:"p"},"predicate"),'.  The sentence says something\nabout its subject.  The subject of "Grass is green" is grass.\nThe sentence says something about grass.  The ',Object(o.b)("em",{parentName:"p"},"something"),'\nthat the sentence says about its subject is the predicate.\nIn the example, the predicate is the phrase "is green."\nOnce we start working with predicates, we can create propositions\nusing ',Object(o.b)("strong",{parentName:"p"},"quantifiers"),' like "all," "some," and "no."\nFor example, working with the predicate "is above average,"\nwe can move from simple propositions like "Johnny is above\naverage" to "All children are above average" or to\n"No child is above average" or to the rather more realistic\n"Some children are above average."  Logical deduction usually\ndeals with quantified statements, as shown by the basic example of\nhuman mortality with which we began this chapter.  Logical deduction\nwill be a major topic of this chapter;  under the name of\n',Object(o.b)("strong",{parentName:"p"},"proof"),", it will be the last major topic of this chapter,\nand a major tool for the\nrest of this book."))}l.isMDXComponent=!0}}]);