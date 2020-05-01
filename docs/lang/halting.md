---
id: halting
title: The Halting Problem
---

As suggested in the previous section, there is an important distinction between a language being recursive and being recursively enumerable.
For a recursive language $L$, the question whether a particular word $w$ is contained in $L$ is decidable: if you wait long enough, the machine
is guaranteed to tell you yes or no.
For a recursively enumerable language, however, you have to allow the third possibility that the machine will never give an answer.
When dealing with a computer, that extra option is essential to consider for certain kinds of problems&mdash;you might have a test suite that
checks that your program gives the correct output for each provided input, but how long do you have to wait for the output before you decide that
the program has gone into an infinite loop?

It would be very useful when debugging programs to have a tool that can decide whether a given program will halt on some input.
Suppose we had such a tool, that is, a function $P:\textrm{string}\times\textrm{string}\rightarrow\{\textrm{Good}, \textrm{Bad}\}$.
Given string inputs $x$ and $y$, where $x$ is a (string representation of a) program and $y$ is its input, $P(x, y)$ decides (by returning Good
or Bad) whether $x$ will halt when run on input $y$.

Now, since $P$ is just some computer program, we can use it to build another program, call it $Q$, that behaves as follows:
   * $Q$ takes as input a string $A$, and executes $P(A, A)$, which eventually returns an answer (either Good or Bad).
   * If $P(A, A)$ returns Bad, then $Q$ stops.
   * If $P(A, A)$ returns Good, then $Q$ goes into an infinite loop.

Unfortunately, consider what happens when we run $Q$ on itself (since we can give the source code for $Q$ as the input string $A$).
If $P(Q, Q)$ returns Bad, that means that $P$ thinks that $Q$ on input $Q$ will never halt; but by the definition of $Q$, it halts as soon as $P$ is done.
Conversely, if $P(Q, Q)$ returns Good, that means that $P$ thinks $Q(Q)$ halts; again, the construction of $Q$ contradicts this.

Since we arrive at a contradiction in either case, we have proven that the only outstanding assumption, that there is such a tool $P$ that can decide whether programs halt, must be false. Therefore, the **halting problem** is an example of a question for which there is no guarantee of a yes or no answer; _i.e._, it is not Turing-decidable.

Although the set of (string representations of) halting programs is not recursive, it is easy to see that it is recursively enumerable: consider the machine
$M$ that takes a program in some language as input and proceeds to **interpret** that program, step by step. If the program interpretation ever terminates, then $M$ will halt and accept that input string. When the machine $M$ is interpreting descriptions of Turing machine programs, it is often called a **universal Turing machine**; Alan Turing's description of such a machine in his [1936 paper](http://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf) is in a sense the first example of a "stored-program" computer, where the program and its data are both present in a single storage medium (symbols on the tape).

What this suggests for software development is that there can be no hope of a tool that can automatically detect all bugs in computer programs, which makes it
all the more important for developers to be able to reason about their software and work with tools to develop proofs that their code is correct.

The above argument has been expressed as an entertaining poem in the style of Dr. Seuss by Geoffrey K. Pullum of the University of Edinburgh, called "[Scooping the Loop Snooper](http://www.lel.ed.ac.uk/~gpullum/loopsnoop.html)".