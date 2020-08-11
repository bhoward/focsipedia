# Boolean Algebra of Sets

(Content adapted from Critchlow & Eck)

It is clear that set theory is closely related to logic.
The intersection and union
of sets can be defined in terms of the logical "and"
and logical "or" operators.
The notation $\{x\mid P(x)\}$ makes it possible to use predicates
to specify sets. And if $A$ is any set, then the formula
$x\in A$ defines a one place predicate that is true for an entity $x$
if and only if $x$ is a member of $A$. So it should not be a
surprise that many of the rules of logic have analogs in
set theory.

For example, we have already noted that $\cup$ and $\cap$ are
commutative operations.  This fact can be verified using the
rules of logic. Let $A$ and $B$ be sets. According to the definition 
of equality of sets, we can show that $A\cup B=B\cup A$ by showing
that $\forall x\,\big((x\in A\cup B)\leftrightarrow(x\in B\cup A)\big)$.
But for any $x$,

| | | |
| -: | :- | :- |
| $x\in A\cup B$ | $\leftrightarrow x\in A \lor x\in B$ | definition of $\cup$ |
| | $\leftrightarrow x\in B \lor x\in A$ | commutativity of $\lor$ |
| | $\leftrightarrow x\in B \cup A$ | definition of $\cup$ |

The commutativity of $\cap$ follows in the same way from the
definition of $\cap$ in terms of $\land$ and the commutativity of $\land$,
and a similar argument shows that union and intersection are
associative operations.

The distributive laws for propositional logic give rise to two
similar rules in set theory. Let $A$, $B$, and $C$ be any sets.
Then

| |
| :-: |
| $A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$ |
| $A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$ |

These rules are called the distributive laws for
set theory. To verify the first of these laws, we just have to
note that for any $x$,

| | | |
| -: | :- | :- |
| $x\in A\cup(B\cap C)$ | $\leftrightarrow (x\in A)\lor((x\in B)\land (x\in C))$ | definition of $\cup$, $\cap$ |
| | $\leftrightarrow ((x\in A)\lor(x\in B)) \land((x \in A)\lor (x\in C))$ | distributivity of $\lor$ |
| | $\leftrightarrow (x\in A\cup B) \land (x \in A\cup C)$ | definition of $\cup$ |
| | $\leftrightarrow x\in ((A\cup B)\cap(A\cup C))$ | definition of $\cap$ |

The second distributive law for sets follows in exactly the
same way.

## Complement

While $\cup$ is analogous to $\lor$ and $\cap$ is analogous to
$\land$, we have not yet seen any operation in set theory that
is analogous to the logical "not" operator, $\lnot$. Given a
set $A$, it is tempting to try to define $\{x\mid \lnot(x\in A)\}$,
the set that contains everything that does not belong to $A$. 
Unfortunately, the rules of set theory do not allow us to define 
such a set. The notation $\{x\mid P(x)\}$ can only be used when
the domain of discourse of $P$ is a set, so there must be an underlying
set from which the elements that are/are not in $A$ are chosen,
_i.e._ some underlying set of which $A$ is a subset. We can get around
this problem by restricting the discussion to subsets of
some fixed set. This set will be known as the **universal set**.
Keep in mind that the universal set is only universal for some
particular discussion. It is simply some set that is large 
enough to contain all the sets under discussion as subsets.
Given a universal set $U$ and any subset $A$ of $U$,
we can define the set $\{x\in U\mid \lnot(x\in A)\}$.

> Let $U$ be a given universal set, and let $A$ be any subset
of $U$. We define the **complement** of $A$ in $U$ to be the
set $\overline{A}$ that is defined by $\overline{A}=\{x\in U\mid x\not\in A\}$.

Usually, we will refer to the complement of $A$ in $U$ simply as
the complement of $A$, but you should remember that whenever complements
of sets are used, there must be some universal set in the background.

Given the complement operation on sets, we can look for
analogs to the rules of logic that involve negation.
For example, we know that $p\land\lnot p=\F$ for any
proposition $p$. It follows that for any subset $A$ of $U$,

| | | |
| -: | :- | :- |
| $A\cap\overline{A}$ | $= \{x\in U\mid (x\in A)\land (x\in \overline{A})\}$ | definition of $\cap$ |
| | $= \{x\in U\mid (x\in A)\land (x\not\in A)\}$ | definition of complement |
| | $= \{x\in U\mid (x\in A)\land \lnot(x\in A)\}$ | definition of $\not\in$) |
| | $= \emptyset$ | |

the last equality following because the proposition $(x\in A)\land \lnot(x\in A)$ is false for
any $x$. Similarly, we can show that
$A\cup\overline{A}=U$ and that $\overline{\overline{A}}=A$
(where $\overline{\overline{A}}$ is the complement of the
complement of $A$, that is, the set obtained by taking the
complement of $\overline{A}$.)

The most important laws for working with complements of sets
are De Morgan's Laws for sets. These
laws, which follow directly from De Morgan's Laws for logic, state
that for any subsets $A$ and $B$ of a universal set $U$,

| |
| :-: |
| $\overline{A\cup B}=\overline{A}\cap\overline{B}$ |
| $\overline{A\cap B}=\overline{A}\cup\overline{B}$ |

For example, we can verify the first of these laws with the calculation

| | | |
| -: | :- | :- |
| $\overline{A\cup B}$ | $= \{x\in U\mid x \not\in (A\cup B)\}$ | definition of complement |
| | $= \{x\in U\mid \lnot( x\in A\cup B)\}$ | definition of $\not\in$ |
| | $= \{x\in U\mid \lnot(x\in A \lor x\in B)\}$ | definition of $\cup$ |
| | $= \{x\in U\mid (\lnot(x\in A))\land(\lnot(x\in B))\}$ | De Morgan's Law for logic |
| | $= \{x\in U\mid (x\not\in A) \land (x\not\in B)\}$ | definition of $\not\in$ |
| | $= \{x\in U\mid (x\in\overline{A}) \land (x\in\overline{B})\}$ | definition of complement |
| | $= \overline{A}\cap\overline{B}$ | definition of $\cap$ |

## Comparison with Propositional Boolean Algebra

Just as the laws of logic allow us to do algebra with logical formulas,
the laws of set theory allow us to do algebra with sets.
Because of the close relationship between logic and set theory,
their algebras are very similar. The algebra of sets,
like the algebra of logic, is Boolean algebra.
When George Boole wrote his 1854 book about logic, it was really as
much about set theory as logic. In fact, Boole did not make a
clear distinction between a predicate and the set of objects
for which that predicate is true. His algebraic laws and formulas
apply equally to both cases. More exactly, if we consider only
subsets of some given universal set $U$, then there is a direct
correspondence between the basic symbols and operations of propositional
logic and certain symbols and operations in set theory, as shown in this
table:

| **Logic** | **Set Theory** |
| :-: | :-: |
| $\T$ | $U$ |
| $\F$ | $\emptyset$ |
| $p\land q$ | $A\cap B$ |
| $p\lor q$ | $A\cup B$ |
| $\lnot p$ | $\overline{A}$ |

Any valid logical formula or computation involving
propositional variables and the symbols $\T$, $\F$, $\land$, $\lor$,
and $\lnot$ can be transformed into a valid formula or computation in
set theory by replacing the propositions in the formula with subsets of $U$ and
replacing the logical symbols with $U$, $\emptyset$, $\cap$, $\cup$, and the
complement operator. 

Here are some of the laws of Boolean Algebra for sets. $A$, $B$, and $C$ are
sets. For the laws that involve the complement operator, 
they are assumed to be subsets of some universal set, $U$.
For the most part, these laws correspond directly to [laws
of Boolean Algebra for propositional logic](./boolean#laws).

+--------------------+-----------------------------------------------------+
| Name               | Law                                                 |
+====================+=====================================================+
| Double complement  | $\overline{\overline{A}}=A$                         |
+--------------------+-----------------------------------------------------+
| Miscellaneous laws | $A\cup\overline{A}=U$                               |
+                    +-----------------------------------------------------+
|                    | $A\cap\overline{A}=\emptyset$                       |
+                    +-----------------------------------------------------+
|                    | $\emptyset\cap A=\emptyset$                         |
|                    +-----------------------------------------------------+
|                    | $\emptyset\cup A=A$                                 |
+--------------------+-----------------------------------------------------+
| Idempotent laws    | $A\cap A= A$                                        |
|                    +-----------------------------------------------------+
|                    | $A\cup A= A$                                        |
+--------------------+-----------------------------------------------------+
| Commutative laws   | $A\cap B = B\cap A$                                 |
|                    +-----------------------------------------------------+
|                    | $A\cup B=B\cup A$                                   |
+--------------------+-----------------------------------------------------+
| Associative laws   | $A\cap (B\cap C) = (A\cap B)\cap C$                 |
|                    +-----------------------------------------------------+
|                    | $A\cup (B\cup C) = (A\cup B)\cup C$                 |
+--------------------+-----------------------------------------------------+
| Distributive laws  | $A\cap(B\cup C) = (A\cap B)\cup (A\cap C)$          |
|                    +-----------------------------------------------------+
|                    | $A\cup (B\cap C) = (A\cup B)\cap (A\cup C)$         |
+--------------------+-----------------------------------------------------+
| De Morgan's laws   | $\overline{A\cap B} = \overline{A}\cup\overline{B}$ |
|                    +-----------------------------------------------------+
|                    | $\overline{A\cup B} = \overline{A}\cap\overline{B}$ |
+--------------------+-----------------------------------------------------+

## Precedence

Just as in logic, the operations of set theory can be combined
to form complex expressions such as $(A\cup C)\cap\overline{(B\cup \overline{C} \cup D)}$.
Parentheses can always be used in such expressions to specify the
order in which the operations are to be performed. In the absence of
parentheses, we need precedence rules to determine
the order of operation. The precedence rules for the Boolean algebra
of sets are carried over directly from the Boolean algebra of
propositions. When union and intersection are used together without
parentheses, intersection has precedence over union. Furthermore,
when several operators of the same type are used without parentheses,
then they are evaluated in order from left to right.
(Of course, since $\cup$ and $\cap$ are both associative operations,
it really doesn't matter whether the order of evaluation is left-to-right
or right-to-left.) For example, $A\cup B\cap C \cup D$ is evaluated as 
$(A\cup((B\cap C))\cup D$. The complement operation is a special case.
Since it is denoted by drawing a line over its operand, there is
never any ambiguity about which part of a formula it applies to.

## Simplification

The laws of set theory can be used to simplify complex expressions
involving sets. (As usual, of course, the meaning of "simplification" is
partly in the eye of the beholder.) For example, for any sets $X$
and $Y$,

| | | |
| -: | :- | :- |
| $(X\cup Y)\cap(Y\cup X)$ | $=(X\cup Y)\cap(X\cup Y)$ | Commutative Law |
| | $=(X\cup Y)$ | Idempotent Law |

where in the second step, the Idempotent Law, which says that
$A\cap A=A$, is applied with $A=X\cup Y$. For expressions that
use the complement operation, it is usually considered to be simpler
to apply the operation to an individual set, as in $\overline{A}$,
rather than to a formula, as in $\overline{A\cap B}$. De Morgan's
Laws can always be used to simplify an expression in which the 
complement operation is applied to a formula. For example,

| | | |
| -: | :- | :- |
| $A\cap \overline{B\cup\overline{A}}$ | $= A\cap (\overline{B}\cap\overline{\overline{A}})$ | De Morgan's Law |
| | $= A\cap (\overline{B}\cap A)$ | Double Complement |
| | $= A\cap (A\cap\overline{B})$ | Commutative Law |
| | $= (A\cap A)\cap \overline{B})$ | Associative Law |
| | $= A \cap \overline{B}$ | Idempotent Law |\end{align*}

As a final example of the relationship between set theory and logic,
consider the set-theoretical expression $A\cap (A\cup B)$ and
the corresponding compound proposition $p\land(p\lor q)$. (These
correspond since for any $x$, $x\in A\cap(A\cup B) \equiv
(x\in A)\land ((x\in A)\lor (x\in B))$.) You might find it intuitively
clear that $A\cap(A\cup B)=A$. Formally, this follows from the
fact that $p\land(p\lor q)\equiv p$, which might be less intuitively
clear and is surprising difficult to prove algebraically from the laws
of logic. However, there is another way to check that a logical
equivalence is valid: Make a truth table. Consider a truth table
for $p\land(p\lor q)$:

| $p$ | $q$ | $p\lor q$ | $p\land (p\lor q)$ |
| :-: | :-: | :-: | :-: |
| false | false | false | false |
| false | true  | true  | false |
| true  | false | true  | true  |
| true  | true  | true  | true  |

The fact that the first column and the last column of this table are
identical shows that $p\land(p\lor q)\equiv p$. Taking $p$ to 
be the proposition $x\in A$ and $q$ to be the proposition $x\in B$,
it follows that the sets $A$ and $A\cap (A\cup B)$ have the same
members and therefore are equal.

## Exercises

1. Use the laws of logic to verify the associative laws for
union and intersection. That is, show that if $A$, $B$, and $C$ are
sets, then $A\cup(B\cup C)= (A\cup B)\cup C$ and
$A\cap(B\cap C)= (A\cap B)\cap C$.

2. Show that for any sets $A$ and $B$, $A\subseteq A\cup B$
and $A\cap B\subseteq A$.

3. Recall that the symbol $\oplus$ denotes the logical
exclusive or operation. If $A$ and $B$ sets, define the
set $A\bigtriangleup B$ by $A\bigtriangleup B = \{x\mid (x\in A)\oplus (x\in B)\}$.
Show that $A\bigtriangleup B = (A\smallsetminus B)\cup(B\smallsetminus A)$.
($A\bigtriangleup B$ is known as the **symmetric difference** of
$A$ and $B$.)

4. Let $A$ be a subset of some given universal set $U$.
Verify that $\overline{\overline{A}}=A$ and that
$A\cup\overline{A}=U$.

5. Verify the second of De Morgan's Laws for sets, 
$\overline{A\cap B}=\overline{A}\cup\overline{B}$. For each step
in your verification, state why that step is valid.

6. The subset operator, $\subseteq$, is defined in terms of
the logical implication operator, $\rightarrow$. However, $\subseteq$
differs from the $\cap$ and $\cup$ operators in that $A\cap B$ 
and $A\cup B$ are _sets_, while $A\subseteq B$ is a _statement_.
So the relationship between $\subseteq$ and $\rightarrow$ isn't quite the same
as the relationship between $\cup$ and $\lor$ or between $\cap$ and $\land$.
Nevertheless, $\subseteq$ and $\rightarrow$ do share some similar properties.
This problem shows one example.

   * Show that the following three compound propositions are
logically equivalent: $p\rightarrow q$, $(p\land q)\leftrightarrow p$, and $(p\lor q)\leftrightarrow q$.

   * Show that for any sets $A$ and $B$, the following three statements
are equivalent: $A\subseteq B$, $A\cap B = A$, and $A\cup B = B$.

7. De Morgan's Laws apply to subsets of some given universal
set $U$. Show that for a subset $X$ of $U$, $\overline{X}=U\smallsetminus X$.
It follows that De Morgan's Laws can be written as
$U\smallsetminus(A\cup B)=(U\smallsetminus A)\cap(U\smallsetminus B)$ and
$U\smallsetminus(A\cap B)=(U\smallsetminus A)\cup(U\smallsetminus B)$. Show that
these laws hold whether or not $A$ and $B$ are subsets of $U$.
That is, show that for any sets $A$, $B$, and $C$,
$C\smallsetminus(A\cup B)=(C\smallsetminus A)\cap(C\smallsetminus B)$ and
$C\smallsetminus(A\cap B)=(C\smallsetminus A)\cup(C\smallsetminus B)$. 

8. Show that $A\cup (A\cap B)= A$ for any sets $A$ and $B$.

9. Let $X$ and $Y$ be sets. Simplify each of the
following expressions. Justify each step in the simplification
with one of the rules of set theory.

   * $X\cup (Y\cup X)$
   * $(X\cap Y) \cap \overline{X}$
   * $(X\cup Y)\cap \overline{Y}$
   * $(X\cup Y) \cup (X\cap Y)$

9. Let $A$, $B$, and $C$ be sets. Simplify each of the following
expressions. In your answer, the complement operator should only
be applied to the individual sets $A$, $B$, and $C$.

   * $\overline{A\cup B \cup C}$
   * $\overline{A\cup B \cap C}$
   * $\overline{\overline{A\cup B}}$
   * $\overline{B\cap \overline{C}}$
   * $\overline{A\cap \overline{B\cap \overline C}}$
   * $A\cap \overline{A\cup B}$
