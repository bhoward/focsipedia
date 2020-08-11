# Set Concepts

(Content adapted from Critchlow & Eck)

We deal with the complexity of the world by putting
things into categories. There are not just hordes of individual
creatures. There are dogs, cats, elephants, and mice. There are
mammals, insects, and fish. Animals, vegetables, and minerals.
Solids, liquids, and gases. Things that are red. Big cities.
Pleasant memories&hellip;. Categories build on categories. They are the
subject and the substance of thought.

In mathematics, which operates in its own abstract and rigorous world,
categories are modeled by **sets**. A set is just a collection of
elements. Along with logic, sets form the "foundation" of
mathematics, just as categories are part of the foundation of
day-to-day thought. In this chapter, we study sets and relationships
among sets.

## Basic Concepts

A **set** is a collection of **elements**.
A set is defined entirely by the elements that it contains.
An element can be anything, including another set. You will notice
that this is not a precise mathematical definition. Instead, it is
an intuitive description of what the word "set" is supposed to mean:
Any time you have a bunch of entities and you consider them as a unit,
you have a set. Mathematically, sets are really defined by the operations
that can be performed on them. These operations model things that
can be done with collections of objects in the real world. These operations
are the subject of the branch of mathematics known as **set theory**.

The most basic operation in set theory is forming a set from a given
list of specific entities. The set that is formed in this way is denoted
by enclosing the list of entities between a left brace, "$\{$", and
a right brace, "$\}$". The entities in the list are separated by
commas. For example, the set denoted by

$$\{\ 17,\ \pi,\ \texttt{New York City},\ \texttt{Barack Obama},\ \texttt{Big Ben}\ \}$$

is the set that contains the entities 17, $\pi$, New York City, Barack Obama,
and Big Ben. These entities are the elements of the set. Since we assume
that a set is completely defined by the elements that it contains, the
set is well-defined. Of course, we still haven't said what it means to
be an "entity." Something as definite as "New York City" should qualify,
except that it doesn't seem like New York City really belongs in the world
of Mathematics. The problem is that mathematics is supposed to be its own
self-contained world, but it is supposed to model the real world. When we 
use mathematics to model the real world, we admit entities such as New
York City and even Big Ben. But when we are doing mathematics _per se_,
we'll generally stick to obviously mathematical entities such as the
integer 17 or the real number $\pi$. We will also use letters such
as $a$ and $b$ to refer to entities. For example, when I say
something like "Let $A$ be the set $\{a,b,c\}$," I mean $a$, $b$, and
$c$ to be particular, but unspecified, entities.

It's important to understand that a set is defined by the elements that
it contains, and not by the order in which those elements might be listed.
For example, the notations $\{a,b,c,d\}$ and $\{b,c,a,d\}$ define the same
set. Furthermore, a set can only contain one copy of a given element,
even if the notation that specifies the set lists the element twice.
This means that $\{a,b,a,a,b,c,a\}$ and $\{a,b,c\}$ specify exactly the
same set. Note in particular that it's incorrect to say that
the set $\{a,b,a,a,b,c,a\}$ contains seven elements, since some of the
elements in the list are identical. The notation $\{a,b,c\}$ can lead
to some confusion, since it might not be clear whether the letters $a$,
$b$, and $c$ are assumed to refer to three \emph{different} entities.
A mathematician would generally \emph{not} make this assumption without
stating it explicitly, so that the set denoted by $\{a,b,c\}$ could
actually contain either one, two, or three elements. When it is important
that different letters refer to different entities, I will say so explicitly,
as in "Consider the set $\{a,b,c\}$, where $a$, $b$, and $c$ are distinct."

The symbol $\in$ is used to express the relation "is an element of."
That is, if $a$ is an entity and $A$ is a set, then $a\in A$ is a statement
that is true if and only if $a$ is one of the elements of $A$. In that
case, we also say that $a$ is a **member** of
the set $A$. The assertion that $a$ is not an element of $A$ is
expressed by the notation $a\mathbin{\not\in} A$. Note that both $a\in A$
and $\mathbin{\not\in} A$ are statements in the sense of propositional logic.
That is, they are assertions which can be either true or false.
The statement $\mathbin{\not\in} A$ is equivalent to $\lnot(a\in A)$.

It is possible for a set to be empty, that is, to contain no elements
whatsoever. Since a set is completely determined by the elements
that it contains, there is only one set that contains no elements.
This set is called the **empty set**, and it is denoted by the
symbol $\emptyset$. Note that for any element $a$, the
statement $a\in\emptyset$ is false. The empty set, $\emptyset$, can also
be denoted by an empty pair of braces, $\{\ \}$.

If $A$ and $B$ are sets, then, by definition, $A$ is equal to $B$ if and only
if they contain exactly the same elements. In this case, we write $A=B$.
Using the notation of predicate logic, we can say that $A=B$ if and only
if $\forall x(x\in A \leftrightarrow x\in B)$. 

Suppose now that $A$ and $B$ are sets such that every element of $A$ is
an element of $B$. 
In that case, we say that $A$ is a **subset** of $B$, i.e. $A$ is a subset
of $B$ if and only if $\forall x(x\in A \rightarrow x\in B)$. The fact that 
$A$ is a subset of $B$ is denoted by $A\subseteq B$. Note that $\emptyset$ is a
subset of every set $B$: $x \in \emptyset$ is false for any $x$, and so given
any $B$, $(x\in \emptyset \rightarrow x\in B)$ is true for all $x$.

If $A=B$, then it is automatically true that $A\subseteq B$ and that
$B\subseteq A$. The converse is also true: If $A\subseteq B$ and $B\subseteq A$,
then $A=B$. This follows from the fact that for any $x$, the statement 
$(x\in A \leftrightarrow x\in B)$ is logically equivalent to the statement $(x\in A\rightarrow x\in B)
\land (x\in B\rightarrow x\in A)$. This fact is important enough to state as a
theorem.

> **Theorem: Set Equality**  
Let $A$ and $B$ be sets. Then $A=B$ if and only if both $A\subseteq B$ and $B\subseteq A$.

This theorem expresses the following advice: If you want to check that two
sets, $A$ and $B$, are equal, you can do so in two steps. First check that
every element of $A$ is also an element of $B$, and then check that every 
element of $B$ is also an element of $A$.

If $A\subseteq B$ but $A\not= B$, we say that $A$ is a \nw{proper subset} of $B$.
We use the notation $A\varsubsetneq B$ to mean that $A$ is a proper subset of $B$.
That is, $A\varsubsetneq B$ if and only if $A\subseteq B \land A\not= B$. We will sometimes
use $A\supseteq B$ as an equivalent notation for $B\subseteq A$, and $A\varsupsetneq B$ as
an equivalent for $B\varsubsetneq A$.

## Predicates

A set can contain an infinite number of elements. In such a case, it
is not possible to list all the elements in the set. Sometimes the
ellipsis "&hellip;" is used to indicate a list that continues on infinitely.
For example, $\N$, the set of natural numbers, can be specified as

$$\N = \{ 0, 1, 2, 3, \dots \}$$

However, this is an informal notation, which is not really well-defined,
and it should only be used in cases where it is clear what it means.
It's not very useful to say that "the set of prime numbers is
$\{2,3,5,7,11,13,\dots\}$," and it is completely meaningless to talk
about "the set $\{17,42,105,\dots\}$." Clearly, we need another way to
specify sets besides listing their elements. The need is fulfilled
by predicates.

If $P(x)$ is a predicate, then we can form the set that contains all entities $a$ such
that $a$ is in the domain of discourse for $P$ and $P(a)$ is true. The
notation $\{x \mid P(x)\}$ is used to denote this set. The name of the variable,
$x$, is arbitrary, so the same set could equally well be denoted as 
$\{z\mid P(z)\}$ or $\{r\mid P(r)\}$. The notation $\{x\mid P(x)\}$ can be read
"the set of $x$ such that $P(x)$." For example, if $E(x)$ is the predicate
"$x$ is an even number," and if the domain of discourse for $E$ is the 
set $\N$ of natural numbers, then the notation $\{x\mid E(x)\}$ specifies the 
set of even natural numbers. That is,

$$\{x\mid E(x)\} = \{0,2,4,6,8,\dots\}$$

It turns out, for deep and surprising reasons that we will discuss later in this
section, 
that we have to be a little careful about what
counts as a predicate. 
In order for the notation $\{x\mid P(x)\}$ to be valid,
we have to assume that the domain of discourse of $P$ is in fact a set. 
(You might wonder how it could be anything else. That's the surprise!)
Often, it is useful to specify the domain of discourse explicitly in 
the notation that defines a set. In the above example, to make it clear that $x$ must 
be a natural number, we could write the set as $\{x\in\N \mid E(x)\}$. This notation 
can be read as "the set of all $x$ in $\N$ such that $E(x)$." More generally,
if $X$ is a set and $P$ is a predicate whose domain of discourse includes
all the elements of $X$, then the notation

$$\{x\in X\mid P(x)\}$$

is the set that consists of all entities $a$ that are members of the set $X$ and
for which $P(a)$ is true. In this notation, we don't have to assume that the
domain of discourse for $P$ is a set, since we are effectively limiting the
domain of discourse to the set $X$. The set denoted by $\{x\in X\mid P(x)\}$ could
also be written as $\{x\mid x\in X\land P(x)\}$.

We can use this notation to define the set of prime numbers in a rigorous
way. A prime number is a natural number $n$ which is greater than 1 and which
satisfies the property that for any factorization $n=xy$, where $x$ and $y$ are
natural numbers, either $x$ or $y$ must be $n$. We can express this definition
as a predicate and define the set of prime numbers as

$$\{n\in\N\mid (n>1)\land\forall x\forall y\big((x\in\N\land y\in\N\land n=xy)\rightarrow(x=n\lor y=n)\big)\}.$$

Admittedly, this definition is hard to take in in one gulp. But this example
shows that it is possible to define complex sets using predicates.

## Operations

Now that we have a way to express a wide variety of sets, we turn to operations that
can be performed on sets. The most basic operations on sets are 
**union** and **intersection**. If $A$ and $B$ are sets, then we define
the union of $A$ and $B$ to be the set that contains all the elements of
$A$ together with all the elements of $B$. The union of $A$ and $B$ is
denoted by $A\cup B$. The union can be defined formally as

$$A\cup B = \{x\mid x\in A \lor x\in B\}.$$

The intersection of $A$ and $B$ is defined to be the set that contains
every entity that is both a member of $A$ and a member of $B$. The intersection
of $A$ and $B$ is denoted by $A\cap B$. Formally,

$$A\cap B = \{x\mid x\in A \land x\in B\}.$$

An entity gets into $A\cup B$ if it is in _either_ $A$ or $B$.
It gets into $A\cap B$ if it is in _both_ $A$ and $B$. Note that
the symbol for the logical "or" operator, $\lor$, is similar to the
symbol for the union operator, $\cup$, while the logical "and" operator,
$\land$, is similar to the intersection operator, $\cap$.

The **set difference** of two sets, $A$ and $B$, is defined to be
the set of all entities that are members of $A$ but are not members
of $B$. The set difference of $A$ and $B$ is denoted $A\smallsetminus B$.
The idea is that $A\smallsetminus B$ is formed by starting with
$A$ and then removing any element that is also found in $B$. Formally,

$$A\smallsetminus B = \{x\mid x\in A \land x\mathbin{\not\in} B\}.$$

Union and intersection are clearly commutative operations. That
is, $A\cup B=B\cup A$ and $A\cap B=B\cap A$ for any sets $A$ and $B$.
However, set difference is not commutative. In general,
$A\smallsetminus B \not= B\smallsetminus A$.

Suppose that $A=\{a,b,c\}$, that $B=\{b,d\}$, and
that $C=\{d,e,f\}$. Then we can apply the definitions of
union, intersection, and set difference to compute, for example,
that:

|                             |                       |                                 |
| :-------------------------- | :-------------------- | :------------------------------ |
| $A\cup B = \{a,b,c,d\}$     | $A\cap B = \{b\}$     | $A\smallsetminus B = \{a,c\}$   |
| $A\cup C = \{a,b,c,d,e,f\}$ | $A\cap C = \emptyset$ | $A\smallsetminus C = \{a,b,c\}$ |

In this example, the sets $A$ and $C$ have no elements in common, so
that $A\cap C=\emptyset$. There is a term for this:
Two sets are said to be **disjoint** if they
have no elements in common. That is, for any sets $A$ and $B$,
$A$ and $B$ are said to be disjoint if and only if $A\cap B=\emptyset$.

Of course, the set operations can also be applied to sets
that are defined by predicates. For example, let 
$L(x)$ be the predicate "$x$ is lucky," and let $W(x)$ be
the predicate "$x$ is wise," where the domain of discourse for
each predicate is the set of people. Let $X = \{x\mid L(x)\}$,
and let $Y=\{x\mid W(x)\}$. Then

| |
| :- |
| $X\cup Y = \{x\mid L(x)\lor W(x)\} = \{\text{people who are lucky or wise}\}$ |
| $X\cap Y = \{x\mid L(x)\land W(x)\} = \{\text{people who are lucky and wise}\}$ |
| $X\smallsetminus Y = \{x\mid L(x)\land \lnot W(x)\} = \{\text{people who are lucky but not wise}\}$ |
| $Y\smallsetminus X = \{x\mid W(x)\land \lnot L(x)\} = \{\text{people who are wise but not lucky}\}$ |

You have to be a little careful with the English word "and." We might say that
the set $X\cup Y$ contains people who are lucky _and_ people who are
wise. But what this means is that a person gets into the set
$X\cup Y$ either by being lucky _or_ by being wise, so
$X\cup Y$ is defined using the logical "or" operator, $\lor$.

Sets can contain other sets as elements. For example, the notation $\{a,\{b\}\}$
defines a set that contains two elements, the entity $a$ and the set $\{b\}$.
Since the set $\{b\}$ is a 
member of the set $\{a,\{b\}\}$, we have that $\{b\}\in\{a,\{b\}\}$.
On the other hand, provided that $a\not=b$, the statement $\{b\}\subseteq\{a,\{b\}\}$
is false, since saying $\{b\}\subseteq\{a,\{b\}\}$ is equivalent to saying that
$b\in\{a,\{b\}\}$, and the entity $b$ is not one of the two members
of $\{a,\{b\}\}$. For the entity $a$, it is true that $\{a\}\subseteq\{a,\{b\}\}$.

Given a set $A$, we can construct the set that contains all the
subsets of $A$. This set is called the **power set** of $A$, and
is denoted ${\mathscr P}(A)$. Formally, we define

$${\mathscr P}(A)=\{X\mid X\subseteq A\}.$$

For example, if $A=\{a,b\}$, then the subsets of $A$ are the empty set,
$\{a\}$, $\{b\}$, and $\{a,b\}$, so the power set of $A$ is set given by

$${\mathscr P}(A) = \{\,\emptyset,\,\{a\},\,\{b\},\,\{a,b\}\,\}.$$

Note that since the empty set is a _subset_ of any set, the empty
set is an _element_ of the power set of any set. That is, for
any set $A$, $\emptyset\subseteq A$ and $\emptyset\in{\mathscr P}(A)$. Since the
empty set is a subset of itself, and is its only subset, we have
that ${\mathscr P}(\emptyset) = \{\emptyset\}$. The set $\{\emptyset\}$ is not
empty. It contains one element, namely $\emptyset$.

Here is a summary of some of the notations that are defined in this section. $A$ and $B$ are
sets, and $a$ is an entity.

| **Notation** | **Definition** |
| :----------: | :------------- |
| $a\in A$     | $a$ is a member (or element) of $A$ |
| $a\mathbin{\not\in} A$ | $\lnot(a\in A)$, $a$ is not a member of $A$ |
| $\emptyset$  | the empty set, which contains no elements |
| $A\subseteq B$ | $A$ is a subset of $B$, $\forall x(x\in A\rightarrow x\in B)$ |
| $A\varsubsetneq B$ | $A$ is a proper subset of $B$, $A\subseteq B \land A\not=B$ |
| $A\supseteq B$ | $A$ is a superset of $B$, same as $B\subseteq A$ |
| $A\varsupsetneq B$ | $A$ is a proper superset of $B$, same as $B\varsubsetneq A$ |
| $A=B$        | $A$ and $B$ have the same members, $A\subseteq B\land B\subseteq A$ |
| $A\cup B$    | union of $A$ and $B$, $\{x\mid x\in A\lor x\in B\}$ |
| $A\cap B$    | intersection of $A$ and $B$, $\{x\mid x\in A\land x\in B\}$ |
| $A\smallsetminus B$ | set difference of $A$ and $B$, $\{x\mid x\in A\land x\mathbin{\not\in} B\}$ |
| ${\mathscr P}(A)$ | power set of $A$, $\{X\mid X\subseteq A\}$ |

## Russell's Paradox

We remarked earlier in this section that the notation $\{x \mid P(x)\}$
is only valid if the domain of discourse of $P$ is a set. This might
seem a rather puzzling thing to say&mdash;after all, why and how would
the domain of discourse be anything else? The answer is related to
Russell's Paradox, which shows that it is logically impossible for the
set of all sets to exist. This impossibility can be demonstrated using a proof by 
contradiction. In the proof, we use the existence of the set of
all sets to define another set which cannot exist because
its existence would lead to a logical contradiction.

> **Theorem: Russell**  
There is no set of all sets.

> **Proof** 
Suppose that the set of all sets exists. We will show that this
assumption leads to a contradiction. Let $V$ be the set of all
sets. We can then define the set $R$ to be the set which contains
every set that does not contain itself. That is,
>
> $$R=\{X\in V\mid X\mathbin{\not\in} X\}$$
>
> Now, we must have either $R\in R$ or $R\mathbin{\not\in} R$. We will show
that either case leads to a contradiction.
>
> Consider the case where $R\in R$. Since $R\in R$, $R$ must satisfy the
condition for membership in $R$. A set $X$ is in $R$ iff $X\mathbin{\not\in} X$.
To say that $R$ satisfies this condition means that $R\mathbin{\not\in} R$.
That is, from the fact that $R\in R$, we deduce the contradiction
that $R\mathbin{\not\in} R$.
>
> Now consider the remaining case, where $R\mathbin{\not\in} R$. Since
$R\mathbin{\not\in} R$, $R$ does not satisfy the condition for membership
in $R$. Since the condition for membership is that $R\mathbin{\not\in} R$,
and this condition is false,
the statement $R\mathbin{\not\in} R$ must be false.
But this means that the statement $R\in R$ is true. From the
fact that $R\mathbin{\not\in} R$, we deduce the contradiction that $R\in R$.
>
> Since both possible cases, $R\in R$ and $R\mathbin{\not\in} R$, lead to contradictions,
we see that it is not possible for $R$ to exist. Since the existence of
$R$ follows from the existence of $V$, we see that $V$ also cannot
exist.

To avoid Russell's paradox, we must put limitations on the construction
of new sets. We can't force the set of all sets into existence
simply by thinking of it. We can't form the set $\{x\mid P(x)\}$
unless the domain of discourse of $P$ is a set. Any predicate $Q$
can be used to form a set $\{x\in X\mid Q(x)\}$, but this notation
requires a pre-existing set $X$.
Predicates can be used to form subsets of existing sets, but they
can't be used to form new sets completely from scratch.

The notation $\{x\in A\mid P(x)\}$ is a convenient way to effectively limit
the domain of discourse of a predicate, $P$, to members of a set, $A$, that
we are actually interested in. We will use a similar notation with the
quantifiers $\forall$ and $\exists$. The proposition $(\forall x\in A)(P(x))$
is true if and only if $P(a)$ is true for every element $a$ of the set $A$.
And the proposition $(\exists x\in A)(P(x))$ is true if and only if there
is some element $a$ of the set $A$ for which $P(a)$ is true. These notations
are valid only when $A$ is contained in the domain of discourse for $P$.
As usual, we can leave out parentheses when doing so introduces no
ambiguity. So, for example, we might write $\forall x\in A\;P(x)$.

## Exercises

1. If we don't make the assumption that $a$, $b$, and $c$ are distinct,
then the set denoted by $\{a,b,c\}$ might actually contain either 1, 2, or 3 
elements. How many different elements might the set
$\{\,a,\,b,\,\{a\},\,\{a,c\},\,\{a,b,c\}\,\}$
contain? Explain your answer.

2. Compute $A\cup B$, $A\cap B$, and $A\smallsetminus B$ for each of the following
pairs of sets

   * $A =\{a,b,c\},\ B=\emptyset$
   * $A =\{1,2,3,4,5\},\ B=\{2,4,6,8,10\}$
   * $A =\{a,b\},\ B=\{a,b,c,d\}$
   * $A =\{a,b,\{a,b\}\},\ B=\{\{a\},\{a,b\}\}$

3. Recall that $\N$ represents the set of natural numbers. That is,
$\N=\{0,1,2,3,\dots\}$. Let $X=\{n\in\N\mid n\ge 5\}$,
let $Y=\{n\in\N\mid n\le10\}$, and let $Z=\{n\in\N\mid \text{\textit{n} is an even number}\}$.
Find each of the following sets:

   * $X\cap Y$
   * $X\cup Y$
   * $X\smallsetminus Y$
   * $\N\smallsetminus Z$
   * $X\cap Z$
   * $Y\cap Z$
   * $Y\cup Z$
   * $Z\smallsetminus\N$

4. Find ${\mathscr P}\big(\{1,2,3\}\big)$. (It has eight elements.)

5. Assume that $a$ and $b$ are entities and that $a\not=b$. Let $A$ and $B$ be the sets defined by
$A=\{\,a,\,\{b\},\,\{a,b\}\,\}$ and $B=\{\,a,\,b,\,\{a,\{b\}\}\,\}$.
Determine whether each of the following statements is true or false. Explain
your answers.

   * $b\in A$
   * $\{a,b\}\subseteq A$
   * $\{a,b\}\subseteq B$
   * $\{a,b\}\in B$
   * $\{a,\{b\}\}\in A$
   * $\{a,\{b\}\}\in B$

6. Since ${\mathscr P}(A)$ is a set, it is possible to form the set
${\mathscr P}\big({\mathscr P}(A)\big)$. What is ${\mathscr P}\big({\mathscr P}(\emptyset)\big)\,$?
What is ${\mathscr P}\big({\mathscr P}(\{a,b\})\big)\,$? (It has sixteen elements.)

7. In the English sentence, "She likes men who are tall, dark, and
handsome," does she like an intersection or a union of sets of men?
How about in the sentence, "She likes men who are tall, men who are dark,
and men who are handsome?"

8. If $A$ is any set, what can you say about $A\cup A\,$?
About $A\cap A\,$? About $A\smallsetminus A\,$? Why?

9. Suppose that $A$ and $B$ are sets such that $A\subseteq B$.
What can you say about $A\cup B\,$? About $A\cap B\,$?
About $A\smallsetminus B\,$? Why?

1. Suppose that $A$, $B$, and $C$ are sets. Show that
$C\subseteq A\cap B$ if and only if $(C\subseteq A)\land (C\subseteq B)$.

1. Suppose that $A$, $B$, and $C$ are sets, and that
$A\subseteq B$ and $B\subseteq C$. Show that $A\subseteq C$.

1. Suppose that $A$ and $B$ are sets such that $A\subseteq B$.
Is it necessarily true that ${\mathscr P}(A)\subseteq {\mathscr P}(B)\,$?
Why or why not?
