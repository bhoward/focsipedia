# Logic

(Adapted from Critchlow & Eck)

In a sense, we know a lot more than we realize,
because everything that we know has consequences---_logical_ 
consequences---that follow automatically.  If you know that all
humans are mortal, and you know that you are human, then in a
sense you know that you are mortal, whether or not you have ever
considered or wanted to consider that fact.  This is an example
of logical **deduction**: From the **premises** that "All
humans are mortal: and "I am human," the **conclusion**
that "I am mortal" can be deduced by logic.

Logical deduction is a kind of computation.  By applying rules
of logic to a given set of premises, conclusions that follow
from those premises can be generated automatically, by a
computational process which could be carried out by a computer.
Once you know the premises, or are willing to accept them for
the sake of argument, you are forced---by logic---to accept
the conclusions.  Still, to say that you "know" those conclusions
would be misleading.  The problem is that there are too many of
them (infinitely many), and, in general, most of them are not
particularly interesting.  Until you have actually made the 
deduction, you don't _really_ know the conclusion, and 
knowing which of the possible chains of deduction to follow
is not easy.  The _art_ of logic is to find
an interesting conclusion and a chain of logical deductions that
leads from the premises to that conclusion.  Checking that the
deductions are valid is the mechanical, computational side of
logic.

This chapter is mostly about the mechanics of logic.  We will 
investigate logic as a branch of mathematics, with its own
symbols, formulas, and rules of computation.  Your object is
to learn the rules of logic, to understand why they are valid,
and to develop skill in applying them.  As with any branch of
mathematics, there is a certain beauty to the symbols and formulas
themselves.  But it is the applications that bring the subject to
life for most people.  We will, of course, cover some applications
as we go along.   In a sense, though, the real applications of
logic include much of computer science and of mathematics itself.

Among the fundamental elements of thought, and therefore of logic, are
propositions.  A **proposition** is a statement that has a truth
value:  It is either true or false.
"Grass is green" and "$2 + 2 = 5$"
are propositions.  In the first part of this chapter, we will
study **propositional logic**, which takes propositions as basic
and considers how they can be combined and manipulated.  This 
branch of logic has surprising application to the design of
the electronic circuits that make up computers.

Logic gets more interesting when we consider the internal
structure of propositions.  In English, a proposition is expressed as
a sentence, and, as you know from studying grammar, sentences have
parts.  A simple sentence like "Grass is green" has a
**subject** and a **predicate**.  The sentence says something
about its subject.  The subject of "Grass is green" is grass.
The sentence says something about grass.  The _something_
that the sentence says about its subject is the predicate.
In the example, the predicate is the phrase "is green."
Once we start working with predicates, we can create propositions
using **quantifiers** like "all," "some," and "no."
For example, working with the predicate "is above average,"
we can move from simple propositions like "Johnny is above
average" to "All children are above average" or to
"No child is above average" or to the rather more realistic
"Some children are above average."  Logical deduction usually
deals with quantified statements, as shown by the basic example of
human mortality with which we began this chapter.  Logical deduction
will be a major topic of this chapter;  under the name of
**proof**, it will be the last major topic of this chapter,
and a major tool for the
rest of this book.