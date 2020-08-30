---
id: overview
title: Overview of Foundations
---

The Foundations of Computer Science come from mathematics, although they are not limited to the sorts of mathematics conventionally studied in elementary and secondary schools.
Calculations on numbers and manipulations of numeric formulas, familiar from arithmetic, algebra, trigonometry, and calculus, are certainly important in many applications of computers, but they do not directly form the foundations that we will study.
Part of the reason for this is that (digital) computers are inherently _discrete_; everything is represented as zero/one bits in memory, and the values of those bits can change only at fixed time steps.
This is in contrast to the classical mathematical focus on real numbers and formulas that relate continously varying quantities; while these are essential for physics, they are less fundamental for computation.

Instead, our foundations come from logic, set theory, and abstract algebra: how can we express operations on collections of bits? how can we use those operations to build common data structures and algorithms? how can we verify that our programs build on these structures are correct, and analyze their behavior?
A large part of this course is organized around a variety of _models_ of computation: circuit-level logic gates; discrete structures such as lists, trees, and graphs; formal languages and machines; and functional programming as a disciplined way of working with these models.

## Example: The Web

Consider the foundations needed for the world wide web:
* A typical web page is a combination of HTML (HyperText Markup Language), CSS (Cascading Style Sheets), and JavaScript.
Each of these languages has a specification that determines how valid programs are structured (in terms of regular expressions and grammar rules), as well as how the programs should be interpreted to produce the pages that you see and interact with.
* HTML and CSS are special-purpose "declarative" languages that describe how to compose the visible aspects of a web page from primitive elements such as individual characters from a font or boxes of various sizes.
The page is hierarchically represented in a tree-like data structure known as the DOM (Document Object Model); the rules of CSS interact with this model to apply relevant styles to particular nodes and subtrees.
* JavaScript is a general-purpose programming language that can be used to attach behavior to various events (such as hovering, clicking, or typing) that occur while interacting with a web page.
As interactions have become more demanding (think Google Docs, or Facebook), there has been much work on improving the speed and power of the language's implementation in the browser, as well as on sophisticated frameworks and even entirely new languages layered on top of JavaScript to make developers more productive and able to produce reliable code.
For example, a programmer at Facebook might build a component using the functional language ReasonML; it gets compiled to JavaScript and downloaded to a browser along with supporting code from the React framework (which applies functional programming techniques to JavaScript and the DOM); as the browser runs all of this JavaScript, it may identify portions of the program that can be compiled to native code to speed things up.
* communication with server and database
* hyperlink graph
* network graph
* network protocols

## Example: CPU Design

* Combinatory and sequential logic
* State machines
* Graph layout
* Verification
