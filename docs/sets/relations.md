---
id: relations
title: Relations
---

(Content adapted from Critchlow &amp; Eck)

In the [Functions section](functions.md), we saw that "mother of" is a functional
relationship because every person has one and only one mother,
but that "child of" is not a functional relationship,
because a person can have no children or more than one child.
However, the relationship expressed by "child of" is certainly 
one that we have a right to be interested in and one
that we should be able to deal with mathematically.

There are many examples of relationships that are not functional
relationships. The relationship that holds between two 
natural numbers $n$ and $m$ when $n\le m$ is an example in mathematics.
The relationship between a person and a book that that person has
on loan from the library is another. Some relationships
involve more than two entities, such as the relationship
that associates a name, an address, and a phone number in
an address book or the relationship that holds among three
real numbers $x$, $y$, and $z$ if $x^2+y^2+z^2=1$. Each of
these relationships can be represented mathematically by
what is called a "relation."

A **relation** on two sets, $A$ and $B$, is defined to be a subset
of $A\times B$. Since a function from $A$ to $B$ is defined, formally, as
a subset of $A\times B$ that satisfies certain properties, a function
is a relation. However, relations are more general than functions,
since _any_ subset of $A\times B$ is a relation. We also
define a relation among three or more sets to be a subset of the
cross product of those sets. In particular, a relation on
$A$, $B$, and $C$ is a subset of $A\times B\times C$.

For example, if $P$ is the set of people and $B$ is the set of books owned
by a library, then we can define a relation ${\mathscr R}$ on the sets
$P$ and $B$ to be the set ${\mathscr R}=\{(p,b)\in P\times B\mid p\text{ has }b\text{ out on loan}\}$.
The fact that a particular $(p,b)\in{\mathscr R}$ is a fact about the world that the library
will certainly want to keep track of. When a collection of
facts about the world is stored on a computer, it is called
a **database**. We'll see in the next section that
relations are the most common means of representing data in
databases.

If $A$ is a set and ${\mathscr R}$ is a relation on the sets $A$ and
$A$ (that is, on two copies of $A$), then $\mathscr R$ is said to be a **binary relation** on
$A$. That is, a binary relation on the set $A$ is a subset of
$A\times A$. The relation consisting of all ordered pairs
$(c,p)$ of people such that $c$ is a child of $p$ is a binary
relation on the set of people. The set $\{(n,m)\in\N\times\N\mid n\le m\}$
is a binary relation on $\N$. Similarly, we define
a **ternary relation** on a set $A$ to be a subset of $A\times A\times A$.
The set $\{(x,y,z)\in\R\times\R\times\R\mid x^2+y^2+z^2=1\}$ is
a ternary relation on $\R$. For complete generality, we can
define an **$n$-ary relation** on $A$, for any positive integer $n$,
to be a subset of $A\times A\times\dots\times A$, where
$A$ occurs $n$ times in the cross product.

For the rest of this section, we will be working exclusively with binary
relations. Suppose that ${\mathscr R}\subseteq A\times A$. That is, suppose
that ${\mathscr R}$ is a binary relation on a set $A$.
If $(a,b)\in{\mathscr R}$, then we say that $a$ is related to
$b$ by ${\mathscr R}$. Instead of writing "$(a,b)\in {\mathscr R}$",
we will often write "$a\,{\mathscr R}\,b$". This notation is
used in analogy to the notation $n\le m$ to express the relation
that $n$ is less than or equal to $m$. Remember that
$a\,{\mathscr R}\,b$ is just an alternative way of writing $(a,b)\in{\mathscr R}$.
In fact, we could consider the relation $\le$ to be a set of
ordered pairs and write $(n,m)\in\,\le$ in place of the notation $n\le m$.

## Properties of Relations

In many applications, attention is restricted to relations that
satisfy some property or set of properties. (This is, of course,
just what we do when we study functions.) We begin our discussion
of binary relations by considering several important properties.
In this discussion, let $A$ be a set and let ${\mathscr R}$
be a binary relation on $A$, that is, a subset of $A\times A$.

$\mathscr R$ is said to be **reflexive** if
$\forall a\in A\,(a \,{\mathscr R}\, a)$. That is, a binary relation
on a set is reflexive if every element of the set is related
to itself. This is true, for example, for the relation $\le$ 
on the set $\N$, since $n\le n$ for every $n\in\N$. On the other
hand, it is not true for the relation $<$ on $\N$, since, for
example, the statement $17<17$ is false.[^1]

[^1]: Note that to show
that the relation ${\mathscr R}$ is _not_ reflexive, you only need to
find one $a$ such that $a\,{\mathscr R}\,a$ is false. This
follows from the fact that $\lnot\big(\forall a\in A\,(a \,{\mathscr R}\, a)\big)
\equiv \exists a\in A\,\big(\lnot(a \,{\mathscr R}\, a)\big)$.
A similar remark holds for each of the properties of relations
that are discussed here.

$\mathscr R$ is called **transitive** if
$\forall a\in A,\,\forall b\in A,\,\forall c\in A\,
\big((a\,{\mathscr R}\,b \land b\,{\mathscr R}\,c)\rightarrow (a\,{\mathscr R}\,c)\big)$.
Transitivity allows us to "chain together" two true
statements $a\,{\mathscr R}\,b$ and $b\,{\mathscr R}\,c$,
which are "linked" by the $b$ that occurs in each statement, to
deduce that $a\,{\mathscr R}\,c$. For example, suppose
$P$ is the set of people, and define the relation ${\mathscr C}$
on $P$ such that $x\,{\mathscr P}\,y$ if and only if $x$ is a
child of $y$. The relation ${\mathscr P}$ is not transitive
because the child of a child of a person is not a child of
that person. Suppose, on the other hand, that we define
a relation ${\mathscr D}$ on $P$ such that $x\,{\mathscr D}\,y$
if and only if $x$ is a descendent of $y$. Then $D$ is a
transitive relation on the set of people, since a descendent of
a descendent of a person is a descendent of that person.
That is, from the facts that Elizabeth is a descendent of Victoria
and Victoria is a descendent of James, we can deduce that
Elizabeth is a descendent of James. In the mathematical world,
the relations $\le$ and $<$ on the set $\N$ are both transitive.

${\mathscr R}$ is said to be **symmetric** if 
$\forall a\in A,\,\forall b\in B\, (a\,{\mathscr R}\,b\rightarrow b\,{\mathscr R}\,a)$.
That is, whenever $a$ is related to $b$, it follows that $b$ is related to $a$.
The relation "is a first cousin of" on the set of people is
symmetric, since whenever $x$ is a first cousin of $y$, we have
automatically that $y$ is a first cousin of $x$. On the other hand,
the "child of" relation is certainly not symmetric. The relation
$\le$ on $\N$ is not symmetric. From the fact that $n\le m$,
we cannot conclude that $m\le n$. It is true for _some_
$n$ and $m$ in $\N$ that $n\le m\rightarrow m\le n$, but it is not true
for _all_ $n$ and $m$ in $\N$.

Finally, $\mathscr R$ is **antisymmetric**
if $\forall a\in A,\,\forall b\in B\, \big((a\,{\mathscr R}\,b\land b\,{\mathscr R}\,a)\rightarrow a=b\big)$.
The relation $\mathscr R$ is antisymmetric if for any two
_distinct_ elements $x$ and $y$ of $A$, we can't have both
$x\,{\mathscr R}\,y$ and $y\,{\mathscr R}\,x$. The relation
$\le$ on $\N$ is antisymmetric because from the facts that
$n\le m$ and $m\le n$, we can deduce that $n=m$. The relation
"child of" on the set of people is antisymmetric since 
it's impossible to have both that $x$ is a child of $y$ and
$y$ is a child of $x$.

## Ordering Relations

There are a few combinations of properties that define particularly
useful types of binary relations.
The relation $\le$ on the set $\N$ is reflexive, antisymmetric, and
transitive. These properties define what is called a partial order:
A **partial order** on a set $A$ is a binary relation on $A$ that
is reflexive, antisymmetric, and transitive. 

Another example of a partial order is the subset relation, $\subseteq$,
on the power set of any set. If $X$ is a set, then of course
${\mathscr P}(X)$ is a set in its own right, and $\subseteq$ can be considered to
be a binary relation on this set. Two elements $A$ and $B$ of
${\mathscr P}(X)$ are related by $\subseteq$ if and only if $A\subseteq B$. This
relation is reflexive since every set is a subset of itself.
The fact that it is antisymmetric follows from the Set Equality Theorem.
The fact that it is transitive was Exercise 11 in the [Set Concepts](concepts.md) section.

The ordering imposed on $\N$ by $\le$ has one important property
that the ordering of subsets by $\subseteq$ does not share. If $n$ and
$m$ are natural numbers, then at least one of the statements
$n\le m$ and $m\le n$ must be true. However, if $A$ and $B$ are
subsets of a set $X$, it is certainly possible that both
$A\subseteq B$ and $B\subseteq A$ are false. A binary relation $\mathscr R$ on a set $A$ is said to
be a **total order** if it is a partial order and furthermore
for any two elements $a$ and $b$ of $A$, either $a\,{\mathscr R}\,b$
or $b\,{\mathscr R}\,a$. The relation $\le$ on the set $\N$ is
a total order. The relation $\subseteq$ on ${\mathscr P}(X)$ is not.
(Note once again the slightly odd mathematical language:
A total order is a kind of partial order&mdash;not, as you might
expect, the opposite of a partial order.)

For another example of ordering, let $L$ be the set of strings
that can be made from lowercase letters. $L$ contains both
English words and nonsense strings such as "sxjja". There is
a commonly used total order on the set $L$, namely alphabetical
order.

## Equivalence Relations and Partitions

We'll approach another important kind of binary relation indirectly,
through what might at first appear to be an unrelated idea.
Let $A$ be a set. A **partition** of $A$ is defined to
be a collection of non-empty subsets of $A$ such that each pair of distinct
subsets in the collection is disjoint and the union of all the subsets
in the collection is $A$. A partition of $A$ is just a division
of all the elements of $A$ into non-overlapping subsets.
For example, the sets $\{1,2,6\}$, $\{3,7\}$, $\{4,5,8,10\}$,
and $\{9\}$ form a partition of the set $\{1,2,\dots,10\}$. 
Each element of $\{1,2,\dots,10\}$ occurs in exactly one
of the sets that make up the partition. As another example,
we can partition the set of all people into two sets,
the set of those who have taken Foundations and the set of those who have not.
Biologists try to partition the set of all organisms into different species.
Librarians try to partition books into various categories such
as fiction, biography, and poetry. 
In the real world, classifying things into categories is an essential
activity, although the boundaries between categories are not
always well-defined. The abstract mathematical notion of
a partition of a set models the real-world notion of classification.
In the mathematical world, though, the categories are sets
and the boundary between two categories is sharp.

In the real world, items are classified in the same category
because they are related in some way. This leads us from
partitions back to relations. Suppose that we have a partition of
a set $A$. We can define a relation $\mathscr R$ on $A$ by
declaring that for any $a$ and $b$ in $A$, $a\,{\mathscr R}\,b$
if and only if $a$ and $b$ are members of the same subset in the
partition. That is, two elements of $A$ are related if they
are in the same category. It is clear that the relation defined
in this way is reflexive, symmetric, and transitive.

An **equivalence relation** is defined to be a binary relation
that is reflexive, symmetric, and transitive. Any relation defined,
as above, from a partition is an equivalence relation. Conversely,
we can show that any equivalence relation defines a partition.
Suppose that $\mathscr R$ is an equivalence relation on a set $A$.
Let $a\in A$. We define the **equivalence class** of $a$
under the equivalence relation $\mathscr R$ to be the subset
$[a]_{\mathscr R}$ defined as $[a]_{\mathscr R}=\{b\in A\mid b\,{\mathscr R}\,a\}$.
That is, the equivalence class of $a$ is the set of all elements of
$A$ that are related to $a$. In most cases, we'll assume that the
relation in question is understood, and we'll write $[a]$
instead of $[a]_{\mathscr R}$. Note that each equivalence
class is a subset of $A$. The following theorem shows that the
collection of equivalence classes form a partition of $A$.

> **Theorem: Partitions**
Let $A$ be a set and let $\mathscr R$ be an equivalence relation
on $A$. Then the collection of all equivalence classes under
$\mathscr R$ is a partition of $A$.

> **Proof:**
To show that a collection of subsets of $A$ is a partition, we
must show that each subset is non-empty, that the intersection
of two distinct subsets is empty, and that the union of all the
subsets is $A$.
>
> If $[a]$ is one of the equivalence classes, it is certainly
non-empty, since $a\in[a]$. (This follows from the fact that
$\mathscr R$ is reflexive, and hence $a\,{\mathscr R}\,a$.)
To show that $A$ is the union of
all the equivalence classes, we just have to show that each
element of $A$ is a member of one of the equivalence classes.
Again, the fact that $a\in[a]$ for each $a\in A$ shows that this
is true.
>
> Finally, we have to show that the intersection of two distinct
equivalence classes is empty. Suppose that $a$ and $b$ are elements
of $A$ and consider the equivalence classes $[a]$ and $[b]$.
We have to show that if $[a]\not=[b]$, then $[a]\cap[b]=\emptyset$.
Equivalently, we can show the converse: If $[a]\cap[b]\not=\emptyset$
then $[a]=[b]$. So, assume that $[a]\cap[b]\not=\emptyset$.
Saying that a set is not empty just means that the set contains some
element, so there must be an $x\in A$ such that $x\in[a]\cap[b]$.
Since $x\in[a]$, $x\,{\mathscr R}\,a$. Since $\mathscr R$ is symmetric,
we also have $a\,{\mathscr R}\,x$. Since $x\in[b]$, $x\,{\mathscr R}\,b$.
Since $\mathscr R$ is transitive and since $(a\,{\mathscr R}\,x)\land (x\,{\mathscr R}\,b)$,
it follows that $a\,{\mathscr R}\,b$.
>
> Our object is to deduce that $[a]=[b]$. Since $[a]$ and $[b]$
are sets, they are equal if and only if $[a]\subseteq[b]$ and
$[b]\subseteq[a]$. To show that $[a]\subseteq[b]$, let $c$ be an arbitrary
element of $[a]$. We must show that $c\in[b]$. Since
$c\in[a]$, we have that $c\,{\mathscr R}\,a$. And we have already shown
that $a\,{\mathscr R}\,b$. From these two facts and the transitivity
of $\mathscr R$, it follows that $c\,{\mathscr R}\,b$. By
definition, this means that $c\in[b]$. We have shown that
any member of $[a]$ is a member of $[b]$ and therefore that
$[a]\subseteq[b]$. The fact that $[b]\subseteq[a]$ can be shown in the
same way. We deduce that $[a]=[b]$, which proves the theorem.

The point of this theorem is that if we can find a binary relation
that satisfies certain properties, namely the properties of
an equivalence relation, then we can classify things
into categories, where the categories are the equivalence classes.

For example, suppose that $U$ is a possibly infinite set. Define a binary relation
$\sim$ on ${\mathscr P}(U)$ as follows: For $X$ and $Y$ in ${\mathscr P}(U)$,
$X\sim Y$ if and only if there is a bijective function
from the set $X$ to the set $Y$. In other words, $X\sim Y$
means that $X$ and $Y$ have the same cardinality. Then
$\sim$ is an equivalence relation on ${\mathscr P}(U)$. (The symbol
$\sim$ is often used to denote equivalence relations. It is
usually read "is equivalent to.") If $X\in{\mathscr P}(U)$, then
the equivalence class $[X]_{\sim}$ consists of all the subsets
of $U$ that have the same cardinality as $X$. We have classified
all the subsets of $U$ according to their cardinality&mdash;even though
we have never said what an infinite cardinality _is_. (We
have only said what it means to have the same cardinality.)

You might remember a popular puzzle called Rubik's Cube,
a cube made of smaller cubes with colored sides that could
be manipulated by twisting layers of little cubes. The object
was to manipulate the cube so that the colors of the little cubes
formed a certain configuration. Define two configurations
of the cube to be equivalent if it's possible to manipulate one
configuration into the other by a sequence of twists. This is,
in fact, an equivalence relation on the set of possible configurations.
(Symmetry follows from the fact that each move is reversible.)
It has been shown that this equivalence relation has exactly twelve
equivalence classes. The interesting fact is that it has more
than one equivalence class: If the configuration that the cube
is in and the configuration that you want to achieve are not
in the same equivalence class, then you are doomed to failure.

## Transitive Closure

Suppose that $\mathscr R$ is a binary relation on a set $A$.
Even though $\mathscr R$ might not be transitive, it is always
possible to construct a transitive relation from $\mathscr R$ in
a natural way. If we think of $a\,{\mathscr R}\,b$ as meaning
that $a$ is related by $\mathscr R$ to $b$ "in one step," then
we consider the relationship that holds between two elements 
$x$ and $y$ when $x$ is related by $\mathscr R$ to $y$ "in one 
or more steps." This relationship defines a binary relation
on $A$ that is called the **transitive closure** of $\mathscr R$.
The transitive closure of $\mathscr R$ is denoted ${\mathscr R}^*$.
Formally, ${\mathscr R}^*$ is defined as follows: For $a$ and $b$ in $A$, 
$a\,{\mathscr R}^*\,b$ if there is a sequence $x_0,x_1,\dots x_n$
of elements of $A$, where $n>0$ and $x_0=a$ and $x_n=b$,
such that $x_0\,{\mathscr R}\,x_1$, 
$x_1\,{\mathscr R}\,x_2$, \dots, and $x_{n-1}\,{\mathscr R}\,x_n$.

For example, if $a\,{\mathscr R}\,c$, $c\,{\mathscr R}\,d$, and
$d\,{\mathscr R}\,b$, then we would have that $a\,{\mathscr R}^*\,b$.
Of course, we would also have that $a\,{\mathscr R}^*\,c$, and
$a\,{\mathscr R}^*\,d$.

For a practical example, suppose that $C$ is the set of all cities
and let $\mathscr A$ be the binary relation on $C$ such that
for $x$ and $y$ in $C$, $x\,{\mathscr A}\,y$ if there is a
regularly scheduled airline flight from $x$ to $y$.
Then the transitive closure ${\mathscr A}^*$ has a natural
interpretation: $x\,{\mathscr A}^*\,y$ if it's possible
to get from $x$ to $y$ by a sequence of one or more regularly
scheduled airline flights. You'll find a few more examples
of transitive closures in the exercises.

## Exercises

1. For a finite set, it is possible to define a binary relation on
the set by listing the elements of the relation, considered as a set
of ordered pairs. Let $A$ be the set $\{a,b,c,d\}$, where $a$,
$b$, $c$, and $d$ are distinct. Consider
each of the following binary relations on $A$. Is the relation
reflexive? Symmetric? Antisymmetric? Transitive? Is it a 
partial order? An equivalence relation?
   * ${\mathscr R}=\{ (a,b),\, (a,c),\, (a,d) \}$.
   <details>
     <summary>Answer</summary>

     Antisymmetric and transitive.
   </details>

   * ${\mathscr S}=\{ (a,a),\, (b,b),\, (c,c),\, (d,d),\, (a,b),\, (b,a) \}$.
   <details>
     <summary>Answer</summary>

     Reflexive, symmetric, transitive, hence equivalence relation.
   </details>

   * ${\mathscr T}=\{ (b,b),\, (c,c),\, (d,d)\}$.
   <details>
     <summary>Answer</summary>

     Antisymmetric, symmetric and transitive. It is an equivalence relation on the subset $\{b,c,d\}$, but not on the full set $A$.
   </details>

   * ${\mathscr C}=\{ (a,b),\, (b,c),\, (a,c),\, (d,d)\}$.
   <details>
     <summary>Answer</summary>

     Antisymmetric and transitive only.
   </details>

   * ${\mathscr D}=\{ (a,b),\, (b,a),\, (c,d),\, (d,c)\}$.
   <details>
     <summary>Answer</summary>

     Symmetric only.
   </details>

2. Let $A$ be the set $\{1,2,3,4,5,6\}$. Consider the
partition of $A$ into the subsets $\{1,4,5\}$, $\{3\}$, and $\{2,6\}$.
Write out the associated equivalence relation on $A$ as a set
of ordered pairs.
<details>
  <summary>Answer</summary>

  $\{(1,1), (1,4), (1,5), (4,1), (4,4), (4,5), (5,1), (5,4), (5,5), (3,3), (2,2), (2,6), (6,2), (6,6)\}$
</details>

3. Consider each of the following relations on the set of people.
Is the relation reflexive? Symmetric? Transitive?
Is it an equivalence relation?
   * $x$ is related to $y$ if $x$ and $y$ have the same biological parents.
   <details>
     <summary>Answer</summary>

     This is reflexive, symmetric, transitive, and hence an equivalence relation.
   </details>

   * $x$ is related to $y$ if $x$ and $y$ have at least one biological parent in common.
   <details>
     <summary>Answer</summary>

     This is reflexive and symmetric, but not transitive (Alice and Bob might share a mother, while Bob and Carla share a father, while Alice and Carla have no parent in common).
   </details>

   * $x$ is related to $y$ if $x$ and $y$ were born in the same year.
   <details>
     <summary>Answer</summary>

     This is reflexive, symmetric, transitive, and hence an equivalence relation.
   </details>

   * $x$ is related to $y$ if $x$ is taller than $y$.
   <details>
     <summary>Answer</summary>

     This is transitive only.
   </details>

   * $x$ is related to $y$ if $x$ and $y$ have both visited Honolulu.
   <details>
     <summary>Answer</summary>

     This is reflexive, symmetric, transitive, and hence an equivalence relation.
   </details>

4. It is possible for a relation to be both symmetric and
antisymmetric. For example, the equality relation, $=$, is
a relation on any set which is both symmetric and antisymmetric.
Suppose that $A$ is a set and $\mathscr R$ is a relation on $A$ that
is both symmetric and antisymmetric. Show that $\mathscr R$ is
a subset of $=$ (when both relations are considered as sets of
ordered pairs). That is, show that for any $a$ and $b$ in $A$,
$(a\,{\mathscr R}\,b)\rightarrow (a=b)$.
<details>
  <summary>Answer</summary>

  If we have $a\,{\mathscr R}\,b$, then we also know $b\,{\mathscr R}\,a$, because
  $\mathscr R$ is symmetric. However, that can only be true if $a=b$, because $\mathscr R$
  is antisymmetric. The relation $\mathscr R$ may be a proper subset of $=$ because
  there may be some $a\in A$ that are not related to anything by $\mathscr R$. In fact,
  _every_ subset of $=$ is a symmetric and antisymmetric relation, including the empty set.
</details>


5. Let $\sim$ be the relation on $\R$, the set of real numbers,
such that for $x$ and $y$ in $\R$, $x\sim y$ if and only if
$x-y\in\Z$. For example, $\sqrt{2\,}-1\sim\sqrt{2\,}+17$
because the difference, $(\sqrt{2\,}-1)-(\sqrt{2\,}+17)$,
is $-18$, which is an integer. Show that $\sim$ is an equivalence
relation. Show that each equivalence class $[x]_{\sim}$ contains
exactly one number $a$ which satisfies $0\le a<1$. (Thus,
the set of equivalence classes under $\sim$ is in one-to-one
correspondence with the half-open interval $[0,1)$.)
<details>
  <summary>Answer</summary>

  * $\sim$ is reflexive because for any $x\in\R$, $x-x=0\in\Z$, so $x\sim x$.
  * $\sim$ is symmetric because if $x\sim y$, then $x-y=n$ for some $n\in\Z$.
    But $y-x=-(x-y)=-n$, which is also in $\Z$, so $y\sim x$.
  * $\sim$ is transitive because if $x\sim y$ and $y\sim z$, then we know
    $x-y=m$ and $y-z=n$ for some $m,n\in\Z$. But $x-z=(x-y)+(y-z)=m+n$, which is also in $\Z$, so $x\sim z$.

  Therefore $\sim$ is an equivalence relation.

  Given any $x\in\R$, we may find an $a\in\R$ such that $x\sim a$ and $0\le a<1$: let $n$
  be the largest integer less than or equal to $x$ (the **floor** of $x$, often written $\lfloor x\rfloor$),
  and take $a=x-n$. Then $x-a=n\in\Z$ (so $x\sim a$), $0\le a$ (because $n\le x$), and $a<1$ (because if not,
  then $n+1\le x$, contradicting the choice of $n$ as the largest such integer).
  Therefore $a\in[x]_{\sim}$ has the stated property. If there were another $b\in[x]_{\sim}$ such that
  $0\le b<1$, then we would also have $a\sim b$, hence $a-b\in\Z$. But if $a$ and $b$ are different, then
  $a-b$ must be a non-zero integer, and either $b<0$ or $b\ge 1$, which is a contradiction. Therefore, $a$ is unique.
</details>


6. Let $A$ and $B$ be any sets, and suppose $f\colon A\to B$.
Define a relation $\sim$ on $A$ such that for any $x$ and $y$ in $A$,
$x\sim y$ if and only if $f(x)=f(y)$. Show that $\sim$ is an
equivalence relation on $A$.
<details>
  <summary>Answer</summary>

  * For any $x$, obviously $f(x)=f(x)$, so $x\sim x$.
  * If $x\sim y$, then we know $f(x)=f(y)$. This is the same as saying $f(y)=f(x)$, so we also find $y\sim x$.
  * If $x\sim y$ and $y\sim z$, then $f(x)=f(y)$ and $f(y)=f(z)$. Therefore $f(x)=f(z)$, so $x\sim z$.

  Thus $\sim$ is reflexive, symmetric, and transitive, so it is an equivalence relation.
</details>


7. Let $\Z^+$ be the set of positive integers $\{1,2,3,\dots\}$.
Define a binary relation $\mathscr D$ on $\Z^+$ such
that for $n$ and $m$ in $\Z^+$, $n\,{\mathscr D}\,m$ if
$n$ divides evenly into $m$, with no remainder. Equivalently,
$n\,{\mathscr D}\,m$ if $n$ is a factor of $m$, that is, if
there is a $k$ in $\Z^+$ such that $m=nk$. Show that $\mathscr D$
is a partial order.
<details>
  <summary>Answer</summary>

  * For any $n\in\Z^+$, $n$ evenly divides $n$, so $n\,{\mathscr D}\,n$.
  * If $m\,{\mathscr D}\,n$ and $n\,{\mathscr D}\,m$, then we know that each evenly divides the other.
    However, if one positive integer evenly divides another, it must be less than or equal to the other.
    Therefore, we know $m\le n$ and $n\le m$, so $m=n$.
  * If $m\,{\mathscr D}\,n$ and $n\,{\mathscr D}\,p$, then we know that there exist $j,k\in\Z^+$ such that
    $n=jm$ and $p=kn$. Therefore, $p=(kj)m$, so we also have $m\,{\mathscr D}\,p$.

  Since $\mathscr D$ is reflexive, antisymmetric, and transitive, it is a partial order.
</details>


8. Consider the set $\N\times\N$, which consists of all
ordered pairs of natural numbers. Since $\N\times\N$ is
a set, it is possible to have binary relations on $\N\times\N$.
Such a relation would be a subset of $(\N\times\N)\times(\N\times\N)$.
Define a binary relation $\preceq$ on $\N\times\N$ such that
for $(m,n)$ and $(k,\ell)$ in $\N\times\N$, $(m,n)\preceq(k,\ell)$
if and only if either $m<k$ or $((m=k)\land (n\le\ell))$. Which of the following
are true?
   * $(2,7)\preceq(5,1)$
   <details>
     <summary>Answer</summary>

     True
   </details>

   * $(8,5)\preceq(8,0)$
   <details>
     <summary>Answer</summary>

     False
   </details>

   * $(0,1)\preceq(0,2)$
   <details>
     <summary>Answer</summary>

     True
   </details>

   * $(17,17)\preceq(17,17)$
   <details>
     <summary>Answer</summary>

     True
   </details>
  
   Show that $\preceq$ is a total order on $\N\times\N$.
   <details>
     <summary>Answer</summary>

     This ordering is known as the **lexicographic** ordering on $\N\times\N$, because it is a
     generalization of the way words are ordered in a dictionary (a "lexicon"). Let us first show
     that it is a partial order:
     * For any $(m,n)$, we have $(m,n)\preceq(m,n)$, because $(m=m)\land(n\le n)$.
     * If $(m,n)\preceq(k,\ell)$ and $(k,\ell)\preceq(m,n)$, then it cannot be the case that either $m<k$ or $k<m$, so we know $m=k$.
       Therefore, we know that $n\le\ell$ and $\ell\le n$, hence $n=\ell$ and we have $(m,n)=(k,\ell)$.
     * If $(m,n)\preceq(k,\ell)$ and $(k,\ell)\preceq(p,q)$, then we know that $m\le k$ and $k\le p$, so $m\le p$.
       If it is the case that $m<p$, then we certainly have $(m,n)\preceq(p,q)$, so consider the case when $m=p$.
       When $m=p$ we also know $m=k$ and $k=p$, so we must have $n\le\ell$ and $\ell\le q$. Therefore $n\le q$, and we again find $(m,n)\preceq(p,q)$.
   
     Since $\preceq$ is reflexive, antisymmetric, and transitive, it is a partial order.
     Now suppose that we have two pairs $(m,n)$ and $(k,\ell)$ in $\N\times\N$. We know that $m<k$, $m>k$, or $m=k$; in the first two cases,
     we see that either $(m,n)\preceq(k,\ell)$ or $(k,\ell)\preceq(m,n)$. Therefore, consider the case $m=k$.
     If also $n\le\ell$, then $(m,n)\preceq(k,\ell)$, while if $n>\ell$, then $(k,\ell)\preceq(m,n)$ (and if $n=\ell$ they are both true).
     Therefore in every case either $(m,n)\preceq(k,\ell)$ or $(k,\ell)\preceq(m,n)$, so $\preceq$ is a total order.
   </details>

8. Let $\sim$ be the relation defined on $\N\times\N$
such that $(n,m)\sim(k,\ell)$ if and only if $n+\ell=m+k$.
Show that $\sim$ is an equivalence relation.
<details>
  <summary>Answer</summary>

  * For any $(n,m)$, we have $(n,m)\sim(n,m)$, because $n+m=m+n$.
  * If $(n,m)\sim(k,\ell)$, then $n+\ell=m+k$. But this is equivalent to saying $k+m=\ell+n$, which means we also have $(k,\ell)\sim(n,m)$.
  * If $(n,m)\sim(k,\ell)$ and $(k,\ell)\sim(p,q)$, then we know $n+\ell=m+k$ and $k+q=\ell+p$. Therefore $n+\ell+q=m+k+q=m+\ell+p$; subtracting $\ell$
    from both sides gives $n+q=m+p$, which is what we need to show $(n,m)\sim(p,q)$.

  Therefore $\sim$ is an equivalence relation, because it is reflexive, symmetric, and transitive.
  Another way to look at this relation is that $(n,m)\sim(k,\ell)$ if $(n-m)=(k-\ell)$, although we have to be careful to perform the subtraction in $\Z$
  because it is not always defined in $\N$. The equivalence classes of $\sim$ are actually in one-to-one correspondence with the integers ($\Z$), so this
  gives us a way to encode the integers using only the natural numbers.
</details>

9. Let $P$ be the set of people and let $\mathscr C$ be the
"child of" relation. That is $x\,{\mathscr C}\,y$ means that
$x$ is a child of $y$. What is the meaning of the transitive
closure ${\mathscr C}^*$? Explain your answer.
<details>
  <summary>Answer</summary>

  The relation ${\mathscr C}^*$ is the "descendant of" relation.
  That is, $x\,{\mathscr C}^*\,y$ holds if there is a chain of people $p_0$, $p_1$, &hellip;, $p_n$ for some $n>0$
  such that $x=p_0$, $p_n=y$, and for each $i<n$ we have that $p_i$ is a child of $p_{i+1}$.
</details>

9. Let $\mathscr R$ be the binary relation on $\N$ such that
$x\,{\mathscr R}\,y$ if and only if $y=x+1$. Identify the
transitive closure ${\mathscr R}^*$. (It is a well-known relation.)
Explain your answer.
<details>
  <summary>Answer</summary>

  If there is a chain of numbers $x=a_0$, $a_1$, &hellip;, $a_n=y$ for some $n>0$ such that
  $a_{i+1}=a_i+1$ for each $i<n$, then it is easy to check that $a_i=x+i$, so $y=x+n$.
  Therefore, $x\,{\mathscr R}^*\,y$ is equivalent to saying $y=x+n$ for some $n>0$. This is
  true exactly when $x<y$.
</details>

9. Suppose that $\mathscr R$ is a reflexive, symmetric
binary relation on a set $A$. Show that the transitive closure
${\mathscr R}^*$ is an equivalence relation.
<details>
  <summary>Answer</summary>

  * Since $x\,{\mathscr R}\,x$ for every $x\in A$, we also know that $x\,{\mathscr R}^*\,x$
    (take the chain $x=a_0$ and $a_1=x$).
  * Suppose we have $x\,{\mathscr R}^*\,y$ for some $x,y\in A$. Then there is a chain
    $x=a_0$, $a_1$, &hellip;, $a_n=y$ for some $n>0$ such that $a_i\,{\mathscr R}\,a_{i+1}$ for each $i<n$.
    Since $\mathscr R$ is symmetric, this also gives us a chain $y=a_n$, $a_{n-1}$, &hellip;, $a_0=x$ where
    $a_{i+1}\,{\mathscr R}\,a_i$ for each $i<n$. Therefore, $y\,{\mathscr R}^*\,x$.
  * If $x\,{\mathscr R}^*\,y$ and $y\,{\mathscr R}^*\,z$, then we know there are chains
    $x=a_0$, $a_1$, &hellip;, $a_n=y$ and $y=b_0$, $b_1$, &hellip;, $b_m=z$ for some $n,m>0$,
    such that $a_i\,{\mathscr R}\,a_{i+1}$ and $b_j\,{\mathscr R}\,b_{j+1}$ for all $i<n$ and $j<m$.
    These chains may be "pasted together" into a single chain establishing that $x\,{\mathscr R}^*\,z$.

  Therefore, ${\mathscr R}^*$ is reflexive, symmetric, and transitive, so it must be an equivalence relation.
</details>
