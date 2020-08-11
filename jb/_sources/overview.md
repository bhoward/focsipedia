# Overview of Foundations

The Foundations of Computer Science come from mathematics, although they are not limited to the sorts of mathematics conventionally studied in elementary and secondary schools.
Calculations on numbers and manipulations of numeric formulas, familiar from arithmetic, algebra, trigonometry, and calculus, are certainly important in many applications of computers, but they do not directly form the foundations that we will study.
Part of the reason for this is that (digital) computers are inherently _discrete_; everything is represented as zero/one bits in memory, and the values of those bits can change only at fixed time steps.
This is in contrast to the classical mathematical focus on real numbers and formulas that relate continously varying quantities; while these are essential for physics, they are less fundamental for computation.

Instead, our foundations come from logic, set theory, and abstract algebra: how can we express operations on collections of bits? how can we use those operations to build common data structures and algorithms? how can we verify that our programs build on these structures are correct, and analyze their behavior?
A large part of this course is organized around a variety of _models_ of computation: circuit-level logic gates; discrete structures such as lists, trees, and graphs; formal languages and machines; and functional programming as a disciplined way of working with these models.

Examples of multiple levels: 