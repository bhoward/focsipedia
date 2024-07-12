---
id: algoverview
title: Overview of Algorithmic Foundations
---

The Foundations of Computer Science come from mathematics, although they are not limited to the sorts of mathematics conventionally studied in elementary and secondary schools.
Calculations on numbers and manipulations of numeric formulas, familiar from arithmetic, algebra, trigonometry, and calculus, are certainly important in many applications of computers, but they do not directly form the foundations that we will study.
Part of the reason for this is that (digital) computers are inherently _discrete_; everything is represented as zero/one bits in memory, and the values of those bits can change only at fixed time steps.
This is in contrast to the classical mathematical focus on real numbers and formulas that relate continously varying quantities; while these are essential for physics, they are less fundamental for computation.

Instead, our foundations come from logic, set theory, and abstract algebra: how can we express operations on collections of bits? how can we use those operations to build common data structures and algorithms? how can we verify that our programs build on these structures are correct, and analyze their behavior?
A large part of this course is organized around a variety of _models_ of computation: discrete structures such as lists, trees, and graphs; formal languages and machines; and functional programming as a disciplined way of working with these models.

## Example: The Web

Consider the foundations needed for the world wide web:
* A typical web page is a combination of [HTML](https://html.spec.whatwg.org/dev/) (HyperText Markup Language), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Cascading Style Sheets), and [JavaScript](https://ecma-international.org/publications-and-standards/standards/ecma-262/).
Each of these languages has a specification that determines how valid programs are structured (in terms of regular expressions and grammar rules), as well as how the programs should be interpreted to produce the pages that you see and interact with.
* HTML and CSS are special-purpose "declarative" languages that describe how to compose the visible aspects of a web page out of primitive elements such as individual characters from a font or boxes of various sizes.
The page is hierarchically represented in a tree-like data structure known as the DOM (Document Object Model); the rules of CSS interact with this model to apply relevant styles to particular nodes and subtrees.
* JavaScript is a general-purpose programming language that can be used to attach behavior to various events (such as hovering, clicking, or typing) that occur while interacting with a web page.
As interactions have become more demanding (think Google Docs, or Facebook), there has been much work on improving the speed and power of the language's implementation in the browser, as well as on sophisticated frameworks and even entirely new languages layered on top of JavaScript to make developers more productive and able to produce reliable code.
For example, a programmer at Facebook might build a component using the functional language ReasonML; it gets compiled to JavaScript and downloaded to a browser along with supporting code from the React framework (which applies functional programming techniques to JavaScript and the DOM); as the browser runs all of this JavaScript, it may identify portions of the program graph that can be compiled to native code to speed things up.
* Web pages are the result of sending requests to a server, which may be running any of a large number of general-purpose languages to satisfy page requests and other interactions.
Companies such as Google, Twitter, and Facebook have made good use of functional programming techniques to improve the performance of their server-side code.
Servers also typically interact with databases (see below) to efficiently query large amounts of data.
* The hyperlinks between web pages form a vast graph that needs to be traversed by web crawlers to support search engines.
At a lower level, the internet itself is a graph with billions of devices, each directly connected to no more than a few other nodes but all of them able to exchange messages thanks to the graph algorithms powering the network protocols.
* Finally, those network protocols themselves are described using techniques from formal languages and state machines; those protocols may be implemented in machine code or directly in digital logic circuits.

## Example: Database Management Systems

The enormous amounts of data produced and consumed by the modern world are stored in a wide variety of forms, from simple text files to cloud-based systems distributed around the world.
The ability to maintain and access this data efficiently depends on many of the foundational topics that we will study.
* Common data structures and algorithms, such as sorting and searching arrays and lists, or traversing trees and graphs, form the basic operations on database tables.
* The declarative language SQL, which has direct roots in logic and set theory, works by converting high-level queries into efficient plans of execution that consist of these basic table operations.
* Alternatives to relational databases have been based on techniques such as [MapReduce](https://static.googleusercontent.com/media/research.google.com/es/us/archive/mapreduce-osdi04.pdf), which has origins in functional programming, and graph queries, which are often a better match for data that has a natural representation in the form of a graph.
* In addition to knowing how to manage data efficiently, a careful study of foundations allows one to recognize what _cannot_ be done efficiently, either because it would take too long (for example, finding a query execution plan that is guaranteed optimal) or because it might take forever (for example, determing whether two queries will give the same results on all databases).

## Example: Processor Design

At the level of individual microprocessors, there are several further applications of the ideas we study in Systems[^1] and Foundations:
* Just above the level of the individual transistors etched in silicon chips is the abstraction of digital logic gates.
These are a direct implementation of logical operations such as AND, OR, and NOT, and they may be effectively designed through the techniques of combinational and sequential circuits.
* One tool for modeling the behavior of a sequential circuit is a finite state machine, which is a very simple model of computation that guarantees an efficient implementation.
By adding more capabilities to this model (generally expressed in the form of data structures such as stacks, queues, and arrays), we can model the entire behavior of a computer's processor.
* One benefit of a formal model of the processor is that its operation may be verified correct relative to a specification.
This is essential at the level of hardware, where a single bug may make the processor useless.
Verification typically takes the form of providing formal, machine-checked proofs of properties expressed in logic.

[^1]: The material on digital logic was moved from Foundations ([CSC 233](233topics.md)) to Systems (CSC 231) in 2024.