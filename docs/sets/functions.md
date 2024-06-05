---
id: functions
title: Functions
---

(Content adapted from Critchlow & Eck)

Both the real world and the world of mathematics are full of
what are called, in mathematics, "functional relationships."
A functional relationship is a relationship between two sets,
which associates exactly one element from the second set to 
each element of the first set. 

For example, each item for sale in a store has a price.
The first set in this relationship is the set of items in the store. For each
item in the store, there is an associated price, so the
second set in the relationship is the set of possible prices.
The relationship is a functional relationship because 
each item has a price. That is, the question "What is the price
of this item?" has a single, definite answer for each item
in the store.

Similarly, the question "Who is the (biological) mother of this person?" has
a single, definite answer for each person. So, the
relationship "mother of" defines a functional relationship.
In this case, the two sets in the relationship are the same set,
namely the set of people.[^1] On the other hand, the relationship "child of"
is not a functional relationship. The question "Who is the
child of this person?" does not have a single, definite answer for
each person. A given person might not have any child at all.
And a given person might have more than one child. Either of
these cases&mdash;a person with no child or a person with more than
one child&mdash;is enough to show that the relationship
"child of" is not a functional relationship.

[^1]: I'm avoiding here the question
of Adam and Eve or of pre-human ape-like ancestors. (Take your 
pick.)

Or consider an ordinary map, such as a map of New York State or
a street map of Rome. The whole point of the map, if it is
accurate, is that there is a functional relationship between
points on the map and points on the surface of the Earth.
Perhaps because of this example, a functional relationship
is sometimes called a **mapping**.

There are also many natural examples of functional relationships
in mathematics. For example, every rectangle has an associated
area. This fact expresses a functional relationship between the
set of rectangles and the set of numbers. Every natural number $n$
has a square, $n^2$. The relationship "square of" is a functional
relationship from the set of natural numbers to itself. 

In mathematics, of course, we need to work with functional
relationships in the abstract. To do this, we introduce
the idea of **function**. You should think of a function
as a mathematical object that expresses a functional relationship
between two sets. The notation $f\colon A\to B$ expresses
the fact that $f$ is a function from the set $A$ to the
set $B$. That is, $f$ is a name for a mathematical object
that expresses a functional relationship from the set $A$ to the set $B$.
The notation $f\colon A\to B$ is
read as "$f$ is a function from $A$ to $B$" or more simply
as "$f$ maps $A$ to $B$."

If $f\colon A\to B$ and if $a\in A$, the fact that $f$ is
a functional relationship from $A$ to $B$ means that $f$ associates
some element of $B$ to $a$. That element is denoted $f(a)$.
That is, for each $a\in A$, $f(a)\in B$ and $f(a)$ is the single,
definite answer to the question "What element of $B$ is
associated to $a$ by the function $f\,$?" The fact that
$f$ is a function from $A$ to $B$ means that this question
has a single, well-defined answer. Given $a\in A$,
$f(a)$ is called the **value**
of the function $f$ at $a$.

For example, if $I$ is the set of items for sale in a
given store and $M$ is the set of possible prices,
then there is function $c\colon I\to M$ which
is defined by the fact that for each $x\in I$, $c(x)$
is the price of the item $x$. Similarly, if
$P$ is the set of people, then there is a function
$m\colon P\to P$ such that for each person $p$,
$m(p)$ is the mother of $p$. And if $\N$ is the set
of natural numbers, then the formula $s(n) = n^2$
specifies a function $s\colon \N\to\N$. It is in the
form of formulas such as $s(n)=n^2$ or $f(x)=x^3-3x+7$ that
most people first encounter functions. But you should
note that a formula by itself is not a function, although it might
well specify a function between two given sets of numbers.
Functions are much more general than formulas, and they
apply to all kinds of sets, not just to sets of numbers.

## Composition

Suppose that $f\colon A\to B$ and $g\colon B\to C$ are functions.
Given $a\in A$, there is an associated element $f(a)\in B$.
Since $g$ is a function from $B$ to $C$, and since $f(a)\in B$,
$g$ associates some element of $C$ to $f(a)$. That element
is $g(f(a))$. Starting with an element $a$ of $A$, we have
produced an associated element $g(f(a))$ of $C$. This means
that we have defined a new function from the set $A$ to
the set $C$. This function is called the **composition**
of $g$ with $f$, and it is denoted by $g\circ f$. 
That is, if $f\colon A\to B$ and $g\colon B\to C$ are functions,
then $g\circ f\colon A\to C$ is the function which is defined
by
$$
(g\circ f)(a) = g(f(a))
$$
for each $a\in A$. For example, suppose that $p$ is the function
that associates to each item in a store the price of the item,
and suppose that $t$ is a function that associates the amount of
tax on a price to each possible price. The composition,
$t\circ p$, is the function that associates to each item the
amount of tax on that item. Or suppose that 
$s\colon\N\to\N$ and $r\colon\N\to\N$ are the functions
defined by the formulas $s(n)=n^2$ and $r(n)=3n+1$, for each
$n\in\N$. Then $r\circ s$ is a function from $\N$ to $\N$,
and for $n\in\N$, $(r\circ s)(n) = r(s(n)) = r(n^2) = 3n^2+1$.
In this case, we also have the function $s\circ r$, which 
satisfies $(s\circ r)(n) = s(r(n)) = s(3n+1) = (3n+1)^2 = 9n^2+6n+1$.
Note in particular that $r\circ s$ and $s\circ r$ are not
the same function. The operation $\circ$ is not commutative.

If $A$ is a set and $f\colon A\to A$, then $f\circ f$,
the composition of $f$ with itself, is defined. For example,
using the function $s$ from the preceding example,
$s\circ s$ is the function from $\N$ to $\N$ given by
the formula $(s\circ s)(n) = s(s(n))= s(n^2) = (n^2)^2 = n^4$.
If $m$ is the function from the set of people to itself which
associates to each person that person's mother, then
$m\circ m$ is the function that associates to each person
that person's maternal grandmother.


## Pairs

If $a$ and $b$ are entities, then $(a,b)$ denotes the
**ordered pair** containing $a$ and $b$. The ordered pair
$(a,b)$ differs from the set $\{a,b\}$ because a set is
not ordered. That is, $\{a,b\}$ and $\{b,a\}$ denote the
same set, but if $a\not=b$, then $(a,b)$ and $(b,a)$ are
different ordered pairs. More generally, two
ordered pairs $(a,b)$ and $(c,d)$ are equal if and only if
both $a=c$ and $b=d$. If $(a,b)$ is an ordered pair,
then $a$ and $b$ are referred to as the **coordinates** of the
ordered pair. In particular, $a$ is the first coordinate and
$b$ is the second coordinate.

If $A$ and $B$ are sets, then we can form the set
$A\times B$ which is defined by
$$
A\times B=
\{(a,b)\mid a\in A \text{ and } b\in B\}.
$$
This set is called the **cross product** or
**Cartesian product** of the sets $A$ and $B$.
The set $A\times B$ contains every ordered pair whose first
coordinate is an element of $A$ and whose second coordinate is
an element of $B$. For example, if $X=\{c,d\}$ and
$Y=\{1,2,3\}$, then $X\times Y=\{(c,1), (c,2), (c,3), (d,1),(d,2), (d,3)\}$.
It is possible to extend this idea to the cross product
of more than two sets. The cross product of the three sets
$A$, $B$, and $C$ is denoted $A\times B\times C$. It consists
of all **ordered triples** $(a,b,c)$
where $a\in A$, $b\in B$, and $c\in C$. The definition for
four or more sets is similar. The general term for a member
of a cross product is **tuple** or, more specifically,
**ordered n-tuple**. For example, $(a,b,c,d,e)$ is
an ordered 5-tuple.

Given a function $f\colon A\to B$, consider the
set $\{(a,b)\in A\times B\mid a\in A \text{ and } b=f(a)\}$. 
This set of ordered pairs consists
of all pairs $(a,b)$ such that $a\in A$ and $b$ is the element of
$B$ that is associated to $a$ by the function $f$. The set
$\{(a,b)\in A\times B\mid a\in A \text{ and } b=f(a)\}$ is called the
**graph** of the function $f$. Since $f$ is a function,
each element $a\in A$ occurs once and only once as a first coordinate
among the ordered pairs in the graph of $f$. Given $a\in A$, we
can determine $f(a)$ by finding that ordered pair and looking
at the second coordinate. In fact, it is convenient to consider
the function and its graph to be the same thing, and to use
this as our official mathematical definition.[^2]

[^2]: This is a convenient definition for the mathematical world, but as is often
the case in mathematics, it leaves out an awful lot of the real
world. Functional relationships in the real world are _meaningful_,
but we model them in mathematics with meaningless sets of ordered
pairs. We do this for the usual reason: to have something precise
and rigorous enough that we can make logical deductions and prove
things about it.

> Let $A$ and $B$ be sets. A **function** from $A$ to
$B$ is a subset of $A\times B$ which has the property that
for each $a\in A$, the set contains one and only one ordered
pair whose first coordinate is $a$. If $(a,b)$ is that
ordered pair, then $b$ is called the value of the function at $a$
and is denoted $f(a)$. If $b=f(a)$, then we also say that the
function $f$ **maps** $a$ to $b$.
The fact that $f$ is a function from
$A$ to $B$ is indicated by the notation $f\colon A\to B$.

For example, if $X=\{a,b\}$ and $Y=\{1,2,3\}$, then the
set $\{(a,2), (b,1)\}$ is a function from $X$ to $Y$,
and $\{(1,a), (2,a), (3,b)\}$ is a function from $Y$ to $X$.
On the other hand, $\{(1,a),(2,b)\}$ is not a function from
$Y$ to $X$, since it does not specify any value for 3.
And $\{(a,1),(a,2),(b,3)\}$ is not a function from $X$ to
$Y$ because it specifies two different values, 1 and 2, 
associated with the same element, $a$, of $X$.

Even though the technical definition of a function is a set
of ordered pairs, it's usually better to think of a function
from $A$ to $B$ as something that associates some element of
$B$ to every element of $A$. The set of ordered pairs is one
way of expressing this association. If the association is
expressed in some other way, it's easy to write down the
set of ordered pairs. For example, the function
$s\colon\N\to\N$ which is specified by the formula
$s(n)=n^2$ can be written as the set of ordered
pairs $\{(n,n^2)\mid n\in \N\}$.

## Additional Concepts

Suppose that $f\colon A\to B$ is a function from the set
$A$ to the set $B$. We say that $A$ is the **domain** of
the function $f$ and that $B$ is the **range** of the function.
We define the **image** of the function $f$ to be the
set $\{b\in B\mid \exists a\in A\,(b=f(a))\}$. Put
more simply, the image of $f$ is the set $\{f(a)\mid a\in A\}$.
That is, the image is the set of all values, $f(a)$, of the
function, for all $a\in A$. (You should note that in some
cases&mdash;particularly in calculus courses&mdash;the term "range"
is used to refer to what I am calling the image.)
For example, for the function $s\colon\N\to\N$ that is specified
by $s(n)=n^2$, both the domain and the range are $\N$, and
the image is the set $\{n^2\mid n\in\N\}$, or $\{0,1,4,9,16,\dots\}$.

Note that the image of a function is a subset of its range.
It can be a proper subset, as in the above example, but it is
also possible for the image of a function to be equal to
the range. In that case, the function is said to be
**onto**. Sometimes, the fancier term
**surjective** is used instead. Formally, a function
$f\colon A\to B$ is said to be onto (or surjective) if
every element of $B$ is equal to $f(a)$ for some element of
$A$. In terms of logic, $f$ is onto if and only if
$$
\forall b\in B\,\big(\exists a\in A\, (b=f(a))\big).
$$
For example, let $X=\{a,b\}$ and $Y=\{1,2,3\}$, and consider
the function from $Y$ to $X$ specified by the set of ordered
pairs $\{(1,a),(2,a),(3,b)\}$. This function is onto because
its image, $\{a,b\}$, is equal to the range, $X$. However,
the function from $X$ to $Y$ given by $\{(a,1),(b,3)\}$ is not
onto, because its image, $\{1,3\}$, is a proper subset of
its range, $Y$. As a further example, consider the function
$f$ from $\Z$ to $\Z$ given by $f(n) = n-52$. To show that $f$
is onto, we need to pick an arbitrary $b$ in the range $\Z$
and show that there is some number $a$ in the domain $\Z$
such that $f(a) = b$. So let $b$ be an arbitrary integer;
we want to find an $a$ such that $a-52=b$. Clearly this equation
will be true when $a=b+52$. So every element $b$ is the image
of the number $a=b+52$, and $f$ is therefore onto. Note that if
$f$ had been specified to have domain $\N$, then $f$ would
_not_ be onto, as for some $b \in \Z$ the number $a=b+52$
is not in the domain $\N$ (for example, the integer $-73$ is
not in the image of $f$, since $-21$ is not in $\N$.)

If $f\colon A\to B$ and if $a\in A$, then $a$ is associated to
only one element of $B$. This is part of the definition of
a function. However, no such restriction holds for elements
of $B$. If $b\in B$, it is possible for $b$ to be associated
to zero, one, two, three, &hellip;, or even to an infinite
number of elements of $A$. In the case where each element of
the range is associated to at most one element of the domain,
the function is said to be **one-to-one**. Sometimes,
the term **injective** is used instead. The function $f$
is one-to-one (or injective) if for any two distinct elements $x$ and $y$ in
the domain of $f$, $f(x)$ and $f(y)$ are also distinct. In
terms of logic, $f\colon A\to B$ is one-to-one if and only if
$$
\forall x\in A\,\,\forall y\in A\,\big(x\not=y\rightarrow f(x)\not=f(y)\big).
$$
Since a proposition is equivalent to its contrapositive,
we can write this condition equivalently as
$$
\forall x\in A\,\,\forall y\in A\,\big(f(x)=f(y)\rightarrow x=y\big).
$$
Sometimes, it is easier to work with the definition of one-to-one
when it is expressed in this form.
The function that associates every person to his or her mother is
not one-to-one because it is possible for two different people
to have the same mother. The function $s\colon\N\to\N$ specified
by $s(n)=n^2$ is one-to-one. However,
we can define a function $r\colon\Z\to\Z$ by the same formula:
$r(n)=n^2$, for $n\in\Z$. The function $r$ is _not_
one-to-one since two different integers can have the same square.
For example, $r(-2)=r(2)$.

A function that is both one-to-one and onto is said to be
**bijective**. The function that associates each point in
a map of New York State to a point in the state itself is
presumably bijective. For each point on the map, there is
a corresponding point in the state, and _vice versa_.
If we specify the function $f$ from the set $\{1,2,3\}$ to the 
set $\{a,b,c\}$ as the set of ordered pairs
$\{(1,b),(2,a),(3,c)\}$, then $f$ is a bijective function.
Or consider the function from $\Z$ to $\Z$ given by $f(n) =
n-52$. We have already shown that $f$ is onto. We can show
that it is also one-to-one: pick an arbitrary $x$ and $y$
in $\Z$ and assume that $f(x) = f(y)$. This means that
$x-52 = y-52$, and adding 52 to both sides of the equation
gives $x=y$. Since $x$ and $y$ were arbitrary, we have proved
$\forall x\in \Z\,\,\forall y\in \Z\,(f(x)=f(y)\rightarrow x=y)$,
that is, that $f$ is one-to-one. Altogether, then, $f$ is a bijection.


## First-Class Functions

One difficulty that people sometimes have with mathematics
is its generality. A set is a collection of entities, but
an "entity" can be anything at all, including other sets.
Once we have defined ordered pairs, we can use ordered pairs as elements
of sets. We could also make ordered pairs of sets.
Now that we have defined functions, every function is itself
an entity. This means that we can have sets that contain
functions. We can even have a function whose domain and
range are sets of functions. Similarly, the domain or
range of a function might be a set of sets, or a set of
ordered pairs. Computer scientists
have a good name for this. They would say that sets, ordered pairs, and
functions are first-class objects. Once a set, ordered pair, or function
has been defined, it can be used just like any other entity.
If they were not first-class objects, there could be restrictions
on the way they can be used. For example, it might not be
possible to use functions as members of sets. (This would make them
"second class.")

For example, suppose that $A$, $B$, and $C$ are sets. Then
since $A\times B$ is a set, we might have a function
$f\colon A\times B\to C$. If $(a,b)\in A\times B$, then
the value of $f$ at $(a,b)$ would be denoted $f((a,b))$.
In practice, though, one set of parentheses is usually dropped,
and the value of $f$ at $(a,b)$ is denoted $f(a,b)$.
As a particular example, we might define a function
$p\colon \N\times\N\to\N$ with the formula $p(n,m)=nm+1$.
Similarly, we might define a function
$q\colon \N\times\N\times\N\to\N\times\N$ by
$q(n,m,k)=(nm-k,nk-n)$.

Suppose that $A$ and $B$ are sets. There are, in general, many
functions that map $A$ to $B$. We can gather all those functions
into a set. This set, whose elements are
all the functions from $A$ to $B$, is denoted $B^A$.
(We'll see later why this notation is reasonable.) Using this notation,
saying $f\colon A\to B$ is exactly the same as saying
$f\in B^A$. Both of these notations assert that $f$ is a function
from $A$ to $B$. Of course, we can also form an unlimited number
of other sets, such as the power set ${\mathscr P}\big(B^A\big)$,
the cross product $B^A\times A$, or the set $A^{A\times A}$,
which contains all the functions from the set $A\times A$
to the set $A$. And of course, any of these sets can be
the domain or range of a function. An example of this
is the function ${\mathscr E}\colon B^A\times A\to B$ defined
by the formula ${\mathscr E}(f,a) = f(a)$. Let's see if
we can make sense of this notation. Since the domain of
${\mathscr E}$ is $B^A\times A$, an element in the domain
is an ordered pair in which the first coordinate is a function
from $A$ to $B$ and the second coordinate is an element of $A$.
Thus, ${\mathscr E}(f,a)$ is defined for a function $f\colon A\to B$
and an element $a\in A$. Given such an $f$ and $a$, the notation
$f(a)$ specifies an element of $B$, so the definition of
${\mathscr E}(f,a)$ as $f(a)$ makes sense. The function ${\mathscr E}$
is called the "evaluation function" since it captures the idea
of evaluating a function at an element of its domain.


## Exercises

1. Let $A=\{1,2,3,4\}$ and let $B=\{a,b,c\}$.
Find the sets $A\times B$ and $B\times A$.
<details>
  <summary>Answer</summary>

  $A\times B=\{(1,a),(1,b),(1,c),(2,a),(2,b),(2,c),(3,a),(3,b),(3,c),(4,a),(4,b),(4,c)\}$

  $B\times A=\{(a,1),(a,2),(a,3),(a,4),(b,1),(b,2),(b,3),(b,4),(c,1),(c,2),(c,3),(c,4)\}$
</details>

2. Let $A$ be the set $\{a,b,c,d\}$. Let $f$ be the
function from $A$ to $A$ given by the set of ordered pairs
$\{(a,b),(b,b),(c,a),(d,c)\}$, and let $g$ be the function
given by the set of ordered pairs $\{(a,b),(b,c),(c,d),(d,d)\}$.
Find the set of ordered pairs for the composition $g\circ f$.
<details>
  <summary>Answer</summary>

  $g(f(a)) = g(b) = c$, $g(f(b)) = g(b) = c$, $g(f(c)) = g(a) = b$, and $g(f(d)) = g(c) = d$, so the
  ordered pairs are $\{(a,c), (b,c), (c,b), (d,d)\}$.
</details>

3. Let $A=\{a,b,c\}$ and let $B=\{0,1\}$. Find all
possible functions from $A$ to $B$. Give each function as
a set of ordered pairs. (Hint: Every such function corresponds
to one of the subsets of $A$.)
<details>
  <summary>Answer</summary>

  Given a subset $S\subseteq A$, the **characteristic function** of $S$ is the
  function $\chi_S$ from $A$ to $\{0,1\}$ defined by $(\chi_S(x)=1)\equiv(x\in A)$.
  Conversely, given a function $f$ from $A$ to $B=\{0,1\}$, we may find a subset of
  $A$ whose characteristic function is $f$ by taking the set of elements of $A$ that
  are mapped to 1 by $f$ (this is known as the **inverse image**, $f^{-1}(1)$).
  Here are the subsets along with their corresponding characteristic functions:

  | $S$ | $\chi_S$ |
  | :-: | :-: |
  | $\{\}$ | $\{(a,0), (b,0), (c,0)\}$ |
  | $\{c\}$ | $\{(a,0), (b,0), (c,1)\}$ |
  | $\{b\}$ | $\{(a,0), (b,1), (c,0)\}$ |
  | $\{b,c\}$ | $\{(a,0), (b,1), (c,1)\}$ |
  | $\{a\}$ | $\{(a,1), (b,0), (c,0)\}$ |
  | $\{a,c\}$ | $\{(a,1), (b,0), (c,1)\}$ |
  | $\{a,b\}$ | $\{(a,1), (b,1), (c,0)\}$ |
  | $\{a,b,c\}$ | $\{(a,1), (b,1), (c,1)\}$ |
</details>

4. Consider the functions from $\Z$ to $\Z$ which are
defined by the following formulas. Decide whether each
function is onto and whether it is one-to-one; prove your answers. 
   * $f(n)=2n$
   <details>
     <summary>Answer</summary>

     $f$ is one-to-one, because if $f(x)=f(y)$, then $2x=2y$, hence $x=y$.
     $f$ is not onto, because the image of $f$ is only the even integers.
   </details>

   * $g(n)=n+1$
   <details>
     <summary>Answer</summary>

     $g$ is both one-to-one and onto; given any $x\in\Z$, there is exactly one
     $n\in\Z$ (namely, $x-1$) such that $g(n) = x$.
   </details>

   * $h(n)=n^2+n+1$
   <details>
     <summary>Answer</summary>

     $h$ is neither one-to-one nor onto. In particular, $h(-1)=h(0)=1$, and there is
     no $n\in\Z$ such that $h(n)=0$.
   </details>

   * $s(n)=n/2$, if $n$ is even, and $s(n)=(n+1)/2$, if $n$ is odd
   <details>
     <summary>Answer</summary>

     $s$ is onto, because given any $x\in\Z$ we may see that $s(2x)=x$.
     $s$ is not one-to-one, because $s(1)=s(2)=1$.
   </details>

5. Prove that composition of functions is an associative
operation. That is, prove that for functions
$f\colon A\to B$, $g\colon B\to C$, and $h\colon C\to D$,
the compositions $(h\circ g)\circ f$ and $h\circ(g\circ f)$
are equal.
<details>
  <summary>Answer</summary>

  It is enough to observe that, for any $x\in A$, the compositions $((h\circ g)\circ f)(x)$
  and $(h\circ(g\circ f))(x)$ both evaluate to $h(g(f(x)))$.
</details>

6. Suppose that $f\colon A\to B$ and $g\colon B\to C$ are
functions and that $g\circ f$ is one-to-one. 
   * Prove that $f$ is one-to-one. (Hint: use a proof by contradiction.)
   <details>
     <summary>Answer</summary>

     Suppose we had distinct elements $x$ and $y$ in $A$ such that $f(x)=f(y)$.
     Then we would also have that $g(f(x))=g(f(y))$, so $g\circ f$ would agree
     on $x$ and $y$. But $g\circ f$ is one-to-one, so that is a contradiction.
     Therefore, there must not be such elements in $A$, hence $f$ is one-to-one.
   </details>

   * Find a specific example that shows that $g$ is not necessarily one-to-one.
   <details>
     <summary>Answer</summary>

     Consider functions on the integers ($\Z$), and let $f(n)=2n$ and $g(n)=n/2$ if $n$ is even, $g(n)=0$ if $n$ is odd.
     Then $g\circ f$ is the identity function, which is one-to-one, but $g$ is clearly not one-to-one.
   </details>

7. Suppose that $f\colon A\to B$ and $g\colon B\to C$,
and suppose that the composition $g\circ f$ is an onto
function. 
   * Prove that $g$ is an onto function. 
   <details>
     <summary>Answer</summary>

     Given any $x\in C$, the fact that $g\circ f$ is onto means that we can find a $y\in A$ such that $g(f(y))=x$.
     But that means that we have an element of $B$, namely $f(y)$, which $g$ maps onto $x$. Since we can do this
     for any element of $C$, the function $g$ is onto.
   </details>

   * Find a specific example that shows that $f$ is not necessarily onto.
   <details>
     <summary>Answer</summary>

     Consider functions on the integers ($\Z$), and let $f(n)=2n$ and $g(n)=n/2$ if $n$ is even, $g(n)=0$ if $n$ is odd.
     Then $g\circ f$ is the identity function, which is onto, but $f$ is clearly not onto.
   </details>
