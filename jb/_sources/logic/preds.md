# Predicates and Quantifiers

(Content adapted from Critchlow & Eck)

In propositional logic, we can let $p$ stand for "Roses are red" and
$q$ stand for "Violets are blue."  Then $p\land q$ will stand for
"Roses are red and violets are blue."  But we lose a lot in the
translation into logic.  Since propositional logic only deals with
truth values, there's nothing we can do with $p$ and $q$ in propositional
logic that has anything to do with roses, violets, or color.
To apply logic to such things, we need **predicates**.
The type of logic that uses predicates is called **predicate
logic**, or, when the emphasis is on manipulating and reasoning
with predicates, **predicate calculus**.

A predicate is a kind of incomplete proposition, which becomes
a proposition when it is applied to some entity (or, as we'll see later,
to several entities).  In the proposition "the rose is red," the
predicate is _is red_.  By itself, "is red" is not a proposition.
Think of it as having an empty slot, that needs to be filled in
to make a proposition: "&mdash; is red."  In the proposition
"the rose is red," the slot is filled by the entity "the rose,"
but it could just as well be filled by other entities:
"the barn is red"; "the wine is red"; "the banana is red."
Each of these propositions uses the same predicate, but they are
different propositions and they can have different truth values.

If $P$ is a predicate and $a$ is an entity, then $P(a)$ stands for
the proposition that is formed when $P$ is applied to $a$.  If $P$
represents "is red" and $a$ stands for "the rose," then
$P(a)$ is "the rose is red."  If $M$ is the predicate
"is mortal" and $s$ is "Socrates," then $M(s)$ is the proposition
"Socrates is mortal." 

Now, you might be asking, just what is an _entity_ anyway?
I am using the term here to mean some specific, identifiable thing
to which a predicate can be applied.  Generally, it doesn't make
sense to apply a given predicate to every possible entity, but only
to entities in a certain category.  For example, it probably doesn't
make sense to apply the predicate "is mortal" to your living room
sofa.  This predicate only applies to entities in the category of
living things, since there is no way something can be mortal unless it
is alive.  This category is called the domain of discourse for
the predicate.[^In the language
of set theory, which will be introduced in the next chapter,
we would say that a domain of discourse is a set, $U$, and
a predicate is a function from $U$ to the set of truth values.
The definition should be clear enough without the formal language
of set theory, and in fact you should think of this definition&mdash;and
many others&mdash;as motivation for that language.]

We are now ready for a formal definition of one-place
predicates.  A one-place
predicate, like all the examples we have seen so far, has a single
slot which can be filled in with one entity:

> A **one-place predicate** associates a proposition with each entity in some
collection of entities.  This collection is called the **domain
of discourse** for the predicate.  If $P$ is a predicate and $a$ is
an entity in the domain of discourse for $P$, then $P(a)$ denotes
the proposition that is associated with $a$ by $P$.  We say that $P(a)$
is the result of **applying** $P$ to $a$.

We can obviously extend this to predicates that can be applied to
two or more entities.  In the proposition "John loves Mary,"
_loves_ is a two-place predicate.  Besides John and Mary,
it could be applied to other pairs of entities:  "John loves Jane,"
"Bill loves Mary," "John loves Bill,"  "John loves John."
If $Q$ is a two-place
predicate, then $Q(a,b)$ denotes the proposition that is obtained
when $Q$ is applied to the entities $a$ and $b$.  Note that each of
the "slots" in a two-place predicate can have its own domain of
discourse.  For example, if $Q$ represents the predicate "owns,"
then $Q(a,b)$ will only make sense when $a$ is a person and $b$ is an
inanimate object.  An example of a three-place predicate is
"$a$ gave $b$ to $c$," and a four-place predicate would be
"$a$ bought $b$ from $c$ for $d$ dollars."  But keep in mind that
not every predicate has to correspond to an English sentence.

When predicates are applied to entities, the results are propositions,
and all the operators of propositional logic can be applied to these
propositions just as they can to any propositions.  Let $R$ be the
predicate "is red," and let $L$ be the two-place predicate "loves."
If $a$, $b$, $j$, $m$, and $b$ are entities belonging to the 
appropriate categories, then we can form compound propositions such
as:

$$
\begin{array}{ll}
   R(a)\land R(b)         &\text{$a$ is red and $b$ is red}\\
   \lnot R(a)             &\text{$a$ is not red}\\
   L(j,m)\land\lnot L(m,j) &\text{$j$ loves $m$, and $m$ does not love $j$}\\
   L(j,m)\rightarrow L(b,m)     &\text{if $j$ loves $m$ then $b$ loves $m$}\\
   R(a)\leftrightarrow L(j,j)       &\text{$a$ is red if and only if $j$ loves $j$}\\
\end{array}
$$

## Quantifiers

Let's go back to the proposition with which we started this section:
"Roses are red."  This sentence is more difficult to handle than
it might appear.  We still can't express it properly in logic.
The problem is that this proposition is not saying something about
some particular entity.  It really says that _all_ roses are red 
(which happens to be a false statement, but that's what it means).
Predicates can only be applied to individual entities.

Many other sentences raise similar difficulties:
"All persons are mortal."  "Some roses are red, but no roses are black."
"All math courses are interesting."  "Every prime number greater than two
is odd."  Words like _all_, _no_, _some_, and _every_
are called **quantifiers**.  We need to be able to express similar concepts
in logic.

Suppose that $P$ is a predicate, and we want to express the proposition that
$P$ is true when applied to any entity in the domain of discourse.
That is, we want to say "for any entity $x$ in the domain of discourse,
$P(x)$ is true."  In predicate logic, we write this in symbols as
$\forall x(P(x))$.  The $\forall$ symbol, which looks like an
upside-down A, is usually read "for all," so that $\forall x(P(x))$
is read as "for all $x$, $P(x)$."  (It is understood that this means
for all $x$ in the domain of discourse for $P$.)  For example,
if $R$ is the predicate "is red" and the domain of discourse consists
of all roses, then $\forall x(R(x))$ expresses the proposition
"All roses are red."  Note that the same proposition could be
expressed in English as "Every rose is red" or "Any rose is red."
 
Now, suppose we want to say that a predicate, $P$, is true for _some_
entity in its domain of discourse.  This is expressed in predicate
logic as $\exists x(P(x))$.  The $\exists$ symbol, which looks like a
backwards E, is usually read "there exists," but a more exact reading
would be "there is at least one." Thus, $\exists x(P(x))$ is read
as "There exists an $x$ such that $P(x)$," and it means "there is
at least one $x$ in the domain of discourse for $P$ for which $P(x)$
is true."  If, once again, $R$ stands for "is red" and the domain
of discourse is "roses," then $\exists x(R(x))$ could be expressed
in English as "There is a red rose" or "At least one rose is red"
or "Some rose is red."  It might also be expressed as "Some roses
are red," but the plural is a bit misleading since $\exists x(R(x))$
is true even if there is only one red rose.
We can now give the formal definitions:

> Suppose that $P$ is a one-place predicate.  Then $\forall x(P(x))$ is
a proposition, which is true if and only if $P(a)$ is true for every
entity $a$ in the domain of discourse for $P$.  And $\exists x(P(x))$
is a proposition which is true if and only if there is at least one
entity, $a$, in the domain of discourse for $P$ for which $P(a)$ is
true.  The $\forall$ symbol is called the **universal quantifier**,
and $\exists$ is called the **existential quantifier**.

The $x$ in $\forall x(P(x))$ and $\exists x(P(x))$ is a variable.
(More precisely, it is an _entity_ variable, since its value
can only be an entity.)
Note that a plain $P(x)$&mdash;without the $\forall x$ or $\exists x$&mdash;is
not a proposition.  $P(x)$ is neither true nor false because $x$
is not some particular entity, but just a placeholder in a slot that
can be filled in with an entity.  $P(x)$ would stand for
something like the statement "$x$ is red," which is not really a
statement in English at all.  But it becomes a statement when
the $x$ is replaced by some particular entity, such as "the rose."
Similarly, $P(x)$ becomes a proposition if some entity $a$ is substituted
for the $x$, giving $P(a)$.[^There is certainly room for confusion
about names here.  In this discussion, $x$ is a variable and $a$ is 
an entity.  But that's only because I said so.  Any letter could be used
in either role, and you have to pay attention to the context to
figure out what is going on.  Usually, $x$, $y$, and $z$ will be variables.]

An **open statement** is an expression that contains one or more entity
variables, which becomes a proposition when entities are substituted
for the variables.  (An open statement has open "slots" that need to
be filled in.)  $P(x)$ and "$x$ is red" are examples of open 
statements that contain one variable.  If $L$ is a two-place predicate
and $x$ and $y$ are variables, then $L(x,y)$ is an open statement
containing two variables.  An example in English would be
"$x$ loves $y$."  The variables in an open statement are called 
**free variables**.  An open statement that contains $x$ as a free
variable can be quantified with $\forall x$ or $\exists x$.
The variable $x$ is then said to be **bound**.  For example,
$x$ is free in $P(x)$ and is bound in $\forall x(P(x))$ and
$\exists x(P(x))$.  The free variable $y$ in $L(x,y)$ becomes
bound in $\forall y(L(x,y))$ and in $\exists y(L(x,y))$.

Note that $\forall y(L(x,y))$ is still an open statement, since
it contains $x$ as a free variable.
Therefore, it is possible to
apply the quantifier $\forall x$ or $\exists x$ to $\forall y(L(x,y))$,
giving $\forall x\big(\forall y(L(x,y))\big)$ and
$\exists x\big(\forall y(L(x,y))\big)$.  Since all the variables are
bound in these expressions, they are propositions.  If $L(x,y)$ represents
"$x$ loves $y$," then $\forall y(L(x,y))$ is something like "$x$ loves
everyone,"  and $\exists x\big(\forall y(L(x,y))\big)$ is the
proposition, "There is someone who loves everyone."  Of course, we
could also have started with $\exists x(L(x,y))$: "There is someone
who loves $y$."  Applying $\forall y$ to this gives 
$\forall y\big(\exists x(L(x,y))\big)$,
which means "For every person, there is someone who loves that person."
Note in particular that $\exists x\big(\forall y(L(x,y))\big)$ and
$\forall y\big(\exists x(L(x,y))\big)$ do _not_ mean the same thing.
Altogether, there are eight different propositions that can
be obtained from $L(x,y)$ by applying quantifiers, with six distinct
meanings among them.

(From now on, I will leave out parentheses when there is no ambiguity.
For example, I will write $\forall x\, P(x)$ instead of $\forall x(P(x))$
and $\exists x\,\exists y\,L(x,y)$ instead of
$\exists x\big(\exists y(L(x,y))\big)$.  Furthermore, I will
sometimes give predicates and entities names that are complete words
instead of just letters, as in  $Red(x)$ and $Loves(john,mary)$.
This might help to make examples more readable.)

## Translating between Predicate Logic and English

In predicate logic, the operators and laws of Boolean algebra still
apply.  For example, if $P$ and $Q$ are one-place predicates and
$a$ is an entity in the domain of discourse, then $P(a)\rightarrow Q(a)$
is a proposition, and it is logically equivalent to $\lnot P(a)\lor Q(a)$.
Furthermore, if $x$ is a variable, then $P(x)\rightarrow Q(x)$ is an open
statement, and $\forall x(P(x)\rightarrow Q(x))$ is a proposition.
So are $P(a)\land(\exists x\,Q(x))$ and $(\forall x\,P(x))\rightarrow(\exists xP(x))$.
Obviously, predicate logic can be very expressive.  Unfortunately,
the translation between predicate logic and English sentences is not
always obvious.

Let's look one more time at the proposition "Roses are red."
If the domain of discourse consists of roses, this translates into
predicate logic as $\forall x\, Red(x)$.  However, the sentence makes
more sense if the domain of discourse is larger&mdash;for example if it
consists of all flowers.  Then "Roses are red" has to be read as
"All flowers which are roses are red," or "For any flower,
if that flower is a rose, then it is red." The last form translates
directly into logic as $\forall x\big(Rose(x)\rightarrow Red(x)\big)$.
Suppose we want to say that all red roses are pretty.  The phrase
"red rose" is saying both that the flower is a rose and that it is
red, and it must be translated as a conjunction, $Rose(x)\land Red(x)$.
So, "All red roses are pretty" can be rendered as
$\forall x\big((Rose(x)\land Red(x))\rightarrow Pretty(x)\big)$.

Here are a few more examples of translations from predicate logic
to English.  Let $H(x)$ represent "$x$ is happy," let
$C(y)$ represent "$y$ is a computer," and let $O(x,y)$ represent
"$x$ owns $y$."  (The domain of discourse for $x$ consists of 
people, and the domain for $y$ consists of inanimate objects.)
Then we have the following translations:

* Jack owns a computer: $\exists x\big(O(jack,x)\land C(x)\big)$.
(That is, there is at least one thing such that Jack owns that thing and that thing
is a computer.)
* Everything Jack owns is a computer: $\forall x\big(O(jack,x)\rightarrow C(x)\big)$.
* If Jack owns a computer, then he's happy: $\big(\exists y(O(jack,y)\land C(y))\big)\rightarrow H(jack)$.
* Everyone who owns a computer is happy: $\forall x\big(\,\big(\exists y(O(x,y)\land C(y)\big)\rightarrow H(x)\big)\,\big)$.
* Everyone owns a computer: $\forall x\,\exists y\big(C(y)\land O(x,y)\big)$.
(Note that this allows each person to own a different computer.
The proposition $\exists y\,\forall x\big(C(y)\land O(x,y)\big)$
would mean that there is a single computer which is owned by
everyone.)
* Everyone is happy: $\forall xH(x)$.
* Everyone is unhappy: $\forall x(\lnot H(x))$.
* Someone is unhappy: $\exists x(\lnot H(x))$.
* At least two people are happy:
 $\exists x \exists y\big(H(x) \land H(y) \land (x\ne y)\big)$.  (The stipulation
 that $x\ne y$ is necessary because two different variables can refer to
 the same entity.  The proposition $\exists x\exists y(H(x)\land H(y))$ is
 true even if there is only one happy person.)
* There is exactly one happy person: $\big(\exists x H(x)\big)) \land \big(\forall y \forall z((H(y)\land H(z))\rightarrow (y=z))\big)$.
 (The first part of this conjunction says that there is at least one happy person.
 The second part says that if $y$ and $z$ are both happy people, then they are actually
 the same person. That is, it's not possible to find two \emph{different} people who
 are happy.)

## Logical Equivalence

To calculate in predicate logic, we need a notion of logical equivalence.
Clearly, there are pairs of propositions in predicate logic that mean the same
thing.  Consider the propositions $\lnot(\forall x H(x))$ and $\exists x(\lnot H(x))$, where
$H(x)$ represents "$x$ is happy." The first of these propositions means
"Not everyone is happy," and the second means "Someone is not happy."
These statements have the same truth value:  If not everyone is happy, then someone is
unhappy and vice versa.  But logical equivalence is much stronger than just
having the same truth value.  In propositional logic, logical equivalence
is defined in terms of propositional variables:  two compound propositions
are logically equivalent if they have the same truth values for all possible
truth values of the propositional variables they contain.  In predicate logic, two
formulas are logically equivalent
if they have the same truth value for all
possible predicates.

Consider $\lnot(\forall x P(x))$ and $\exists x(\lnot P(x))$.
These formulas make
sense for any predicate $P$, and for any predicate $P$ they have the same truth
value.  Unfortunately, we can't&mdash;as we did in propositional logic&mdash;just check
this fact with a truth table: there are no subpropositions, connected by
$\land$, $\lor$, etc, out of which to build a table.  So, let's reason it out:
To say $\lnot(\forall x P(x))$ is true is just to say that it is not the case that
$P(x)$ is true for all possible entities $x$.  So, there must be some entity $a$
for which $P(a)$ is false.  Since $P(a)$ is false, $\lnot P(a)$ is true.
But saying that there is an $a$ for which $\lnot P(a)$ is true is just saying
that $\exists x(\lnot P(x))$ is true.  So, the truth of $\lnot(\forall x P(x))$
implies the truth of $\exists x (\lnot P(x))$.  On the other hand, if 
$\lnot(\forall x P(x))$ is false, then $\forall x P(x)$ is true.  Since $P(x)$
is true for every $x$, $\lnot P(x)$ is false for every $x$; that is, there is no
entity $a$ for which the statement $\lnot P(a)$ is true.
But this just means that the statement $\exists x(\lnot P(x))$
is false.  In any case, then, the truth values of $\lnot(\forall x P(x))$ and
$\exists x(\lnot P(x))$ are the same.  Since this is true for any predicate $P$,
we will say that these two formulas are logically equivalent and write
$\lnot(\forall x P(x)) \equiv \exists x(\lnot P(x))$.

A similar argument would show that $\lnot(\exists x P(x)) \equiv \forall x(\lnot P(x))$.
These two equivalences, which explicate the relation between negation and quantification,
are known as De Morgan's Laws for predicate logic.  (They are closely related to
De Morgan's Laws for propositional logic; see the exercises.)  These
laws can be used to help simplify expressions.  For example,

| | |
| -: | :- |
| $\lnot\,\forall y (R(y)\lor Q(y))$ | $\equiv \exists y(\lnot(R(y)\lor Q(y)))$ |
| | $\equiv \exists y((\lnot R(y))\land(\lnot Q(y))$ |

It might not be clear exactly why this qualifies as a "simplification,"
but it's generally considered simpler to have the negation operator applied
to basic propositions such as $R(y)$, rather than to quantified expressions
such as $\forall y (R(y)\lor Q(y))$.
For a more complicated example:

| | |
| -: | :- |
| $\lnot\,\exists x\big(P(x)\land (\forall y (Q(y)\rightarrow Q(x)))\big)$ | $\equiv\forall x\big(\lnot\big(P(x)\land (\forall y (Q(y)\rightarrow Q(x)))\big)$ |
| | $\equiv\forall x\big((\lnot P(x))\lor (\lnot \forall y (Q(y)\rightarrow Q(x)))\big)$ |
| | $\equiv\forall x\big((\lnot P(x))\lor (\exists y(\lnot (Q(y)\rightarrow Q(x))))\big)$ |
| | $\equiv\forall x\big((\lnot P(x))\lor (\exists y(\lnot (\lnot Q(y)\lor Q(x))))\big)$ |
| | $\equiv\forall x\big((\lnot P(x))\lor (\exists y(\lnot\lnot Q(y)\land \lnot Q(x)))\big)$ |
| | $\equiv\forall x\big((\lnot P(x))\lor (\exists y(Q(y)\land \lnot Q(x)))\big)$ |

De Morgan's Laws are listed in the following figure along with two
other laws of predicate logic.  The other laws allow you to interchange
the order of the variables when two quantifiers of the same type
(both $\exists$ or $\forall$) occur together. $P$ can be any one-place predicate,
and $Q$ can be any two-place predicate.

+-------------+----------------------------------------------------------------+
| De Morgan   | $\lnot\,(\forall x P(x)) \equiv \exists x(\lnot P(x))$         |
|             +----------------------------------------------------------------+
|             | $\lnot\,(\exists x P(x)) \equiv \forall x(\lnot P(x))$         |
+-------------+----------------------------------------------------------------+
| Interchange | $\forall x \forall y Q(x,y) \equiv \forall y \forall x Q(x,y)$ |
|             +----------------------------------------------------------------+
|             | $\exists x \exists y Q(x,y) \equiv \exists y \exists x Q(x,y)$ |
+-------------+----------------------------------------------------------------+

To define logical equivalence in predicate logic more formally,
we need to talk about formulas that contain predicate variables,
that is, variables that act as place-holders for arbitrary predicates
in the same way that propositional variables are place-holders for
propositions and entity variables are place-holders for
entities.  With this in mind, we can define logical equivalence
and the closely related concept of tautology for predicate logic.

> Let $\mathscr{P}$ be a formula of predicate logic which contains one or more
predicate variables.  $\mathscr{P}$ is said to be a **tautology**
if it is true whenever all the predicate variables that it contains are replaced
by actual predicates.  Two formulas $\mathscr{P}$ and $\mathscr{Q}$ are
said to be **logically equivalent** if $\mathscr{P}\leftrightarrow\mathscr{Q}$ is
a tautology, that is if $\mathscr{P}$ and $\mathscr{Q}$ always have the same
truth value when the predicate variables they contain are replaced by actual
predicates.  The notation $\mathscr{P}\equiv\mathscr{Q}$ asserts that
$\mathscr{P}$ is logically equivalent to $\mathscr{Q}$.

## Exercises

1. Simplify each of the following propositions.  In your answer, the
$\lnot$ operator should be applied only to individual predicates.
   * $\lnot\,\forall x (\lnot P(x))$
   * $\lnot\,\exists x(P(x)\land Q(x))$
   * $\lnot \,\forall z(P(z)\rightarrow Q(z))$
   * $\lnot\big((\forall x P(x))\land \forall y(Q(y))\big)$
   * $\lnot\, \forall x \exists y P(x,y)$
   * $\lnot\,\exists x (R(x)\land \forall y S(x,y))$
   * $\lnot\,\exists y(P(y)\leftrightarrow Q(y))$
   * $\lnot \big(\forall x (P(x)\rightarrow (\exists y Q(x,y)))\big)$

2. Give a careful argument to show that the second of De Morgan's laws for
predicate calculus,
$\lnot(\forall x P(x)) \equiv \exists x(\lnot P(x))$, is valid.

3. Find the negation of each of the following propositions.
Simplify the result; in your answer, the
$\lnot$ operator should be applied only to individual predicates.
   * $\lnot$$\exists n (\forall s C(s,n))$
   * $\lnot$$\exists n (\forall s (L(s,n) \rightarrow P(s)))$
   * $\lnot$$\exists n (\forall s (L(s,n) \rightarrow (\exists x \exists y \exists z Q(x,y,z))))$.
   * $\lnot$$\exists n (\forall s (L(s,n) \rightarrow (\exists x \exists y \exists z (s=xyz \land 
R(x,y) \land T(y) \land U(x,y,z))))$.

4. Suppose that the domain of discourse for a predicate $P$
contains only two entities.  Show that $\forall x\, P(x)$ is equivalent to
a conjunction of two simple propositions, and $\exists x\, P(x)$ is equivalent
to a disjunction.  Show that in this case, De Morgan's Laws for propositional
logic and De Morgan's Laws for predicate logic actually say exactly the same
thing.  Extend the results to a domain of discourse that contains exactly
three entities.

5. Let $H(x)$ stand for "$x$ is happy," where the domain of discourse
consists of people.  Express the proposition "There are exactly three happy
people" in predicate logic.

6. Let $T(x,y)$ stand for "$x$ has taken $y$," where the
domain of discourse for $x$ consists of students and the domain
of discourse for $y$ consists of math courses (at your school).
Translate each of the following propositions into an unambiguous English sentence:
   * $\forall x\,\forall y \,T(x,y)$
   * $\forall x \,\exists y \,T(x,y)$
   * $\forall y \,\exists x \,T(x,y)$
   * $\exists x\,\exists y \,T(x,y)$
   * $\exists x \,\forall y \,T(x,y)$
   * $\exists y \,\forall x \,T(x,y)$

7. Let $F(x,t)$ stand for "You can fool person $x$ at time $t$."
Translate the following sentence into predicate logic:
"You can fool some of the people all of the time, and you can fool
all of the people some of the time, but you can't fool all of the
people all of the time."

8. Translate each of the following sentences into a proposition 
using predicate logic.  Make up any predicates you need.  State what
each predicate means and what its domain of discourse is.
   * All crows are black.
   * Any white bird is not a crow.
   * Not all politicians are honest.
   * All green elephants have purple feet.
   * There is no one who does not like pizza.
   * Anyone who passes the final exam will pass the course.
   * If $x$ is any positive number, then there is a number $y$ such that
$y^2=x$.

9. The sentence "Someone has the answer to every question" is
ambiguous.  Give two translations of this sentence into predicate logic,
and explain the difference in meaning.

9. The sentence "Jane is looking for a dog" is ambiguous.
One meaning is that there is some particular dog&mdash;maybe the one she lost&mdash;that
Jane is looking for.  The other meaning is that Jane is looking for any old
dog&mdash;maybe because she wants to buy one.  Express the first meaning in
predicate logic.  Explain why the second meaning is _not_
expressed by $\forall x(Dog(x)\rightarrow LooksFor(jane,x))$.  In fact, the
second meaning cannot be expressed in predicate logic.  Philosophers
of language spend a lot of time thinking about things like this.
They are especially fond of the sentence "Jane is looking for a unicorn,"
which is not ambiguous when applied to the real world.  Why is that?

