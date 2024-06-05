---
id: boolean
title: Boolean Algebra
---

(Content adapted from Critchlow & Eck)

So far we have discussed how to write and interpret propositions.
This section deals with _manipulating_ them. For this,
we need algebra. Ordinary algebra, of the sort taught in high
school, is about manipulating numbers, variables that represent numbers,
and operators such as $+$ and $\times$ that apply to numbers.
Now, we need an algebra that applies to logical values, propositional
variables, and logical operators. The first person to think of
logic in terms of algebra was the mathematician, George Boole,
who introduced the idea in a book that he
published in 1854. The algebra of logic is now called 
**Boolean algebra** in his honor.

The algebra of numbers includes a large number of rules for
manipulating expressions. The distributive law, for example,
says that $x(y+z)=xy+xz$, where $x$, $y$, and $z$ are variables
that stand for any numbers or numerical expressions. This law
means that whenever you see something of the form $xy+xz$
in a numerical expression, you can substitute $x(y+z)$ without
changing the value of the expression, and _vice versa_. Note that
the equals sign in $x(y+z)=xy+xz$ means "has the same value as,
no matter what numerical values $x$, $y$, and $z$ have."

## Laws

In Boolean algebra, we work with logical values instead of
numerical values. There are only two logical values, true
and false. We will write these values as $\T$ and $\F$.
The symbols $\T$ and $\F$ play a similar role in Boolean algebra
to the role that constant numbers such as 1 and 3.14159 play 
in ordinary algebra. Instead of the equals sign, Boolean algebra
uses logical equivalence, $\equiv$, which has essentially the
same meaning.[^1]
For example, for propositions $p$, $q$, and $r$, the $\equiv$ operator
in $p\land(q\land r)\equiv(p\land q)\land r$ means "has the same value as,
no matter what logical values $p$, $q$, and $r$ have."

[^1]: In ordinary algebra, it's easy to be confused
by the equals sign, because it has two very different roles.
In an identity such as the distributive law, it means
"is always equal to." On the other hand, an equation such as $x^2+3x=4$ is
a statement that might or might not be true, depending on the value of $x$.
Boolean algebra has two operators, $\equiv$ and $\leftrightarrow$, that play
roles similar to the two roles of the equals sign.

Many of the rules of Boolean algebra are fairly obvious, if you think
a bit about what they mean. Even those that are not obvious can
be verified easily by using a truth table. Below we
list the most important of these laws. You will
notice that all these laws, except the first, come in pairs: Each 
law in the pair can be obtained from the other
by interchanging $\land$ with $\lor$ and $\T$ with $\F$. This cuts down
on the number of facts you have to remember.[^2]

[^2]: It is also an
example of a more general fact known as **duality**, which asserts
that given any tautology that uses only
the operators $\land$, $\lor$, and $\lnot$, another tautology can be
obtained from it by interchanging $\land$ with $\lor$ and $\T$ with $\F$.
We won't attempt to prove this here.

| Name              | Law                                               |
| ----------------: | :-----------------------------------------------: |
| Double negation   | $\lnot(\lnot p)\equiv p$                          |
| Excluded middle   | $p\lor\lnot p\equiv\T$                            |
| Contradiction     | $p\land\lnot p\equiv\F$                           |
| Identity laws     | $\T\land p\equiv p$ <br /> $\F\lor p \equiv p$    |
| Annihiliator laws | $\F\land p\equiv \F$ <br /> $\T\lor p \equiv \T$  |
| Idempotent laws   | $p\land p\equiv p$ <br /> $p\lor p\equiv p$       |
| Commutative laws  | $p\land q\equiv q\land p$ <br /> $p\lor q\equiv q\lor p$ |
| Associative laws  | $(p\land q)\land r\equiv p\land(q\land r)$ <br /> $(p\lor q)\lor r\equiv p\lor(q\lor r)$ |
| Distributive laws | $p\land(q\lor r)\equiv (p\land q)\lor (p\land r)$ <br /> $p\lor(q\land r)\equiv (p\lor q)\land (p\lor r)$ |
| De Morgan's laws  | $\lnot(p\land q)\equiv (\lnot p)\lor(\lnot q)$ <br /> $\lnot(p\lor q)\equiv (\lnot p)\land(\lnot q)$ |

Just as an example, let's verify the first rule in the table,
the Law of Double Negation. 
This law is just the old, basic grammar rule
that two negatives make a positive. Although this rule is questionable
as it applies to English as it is actually used&mdash;no matter what the
grammarian says, "I can't get no satisfaction" doesn't really
mean "I can get satisfaction"&mdash;the validity of the rule in logic
can be verified just by computing the two possible cases: when $p$
is true and when $p$ is false. When $p$ is true, then by the definition
of the $\lnot$ operator, $\lnot p$ is false. But then, again by the
definition of $\lnot$, the value of $\lnot(\lnot p)$ is true, which is
the same as the value of $p$. Similarly, in the case where 
$p$ is false, $\lnot(\lnot p)$ is also false. Organized into a truth
table, this argument takes the rather simple form

| $p$   | $\lnot p$ | $\lnot(\lnot p)$ |
| :-:   | :-------: | :--------------: |
| true  | false     | true             |
| false | true      | false            |

The fact that the first and last columns are identical shows the
logical equivalence of $p$ and $\lnot(\lnot p)$. The point here is not
just that $\lnot(\lnot p)\equiv p$, but also that this logical
equivalence is valid because it can be verified computationally
based just on the relevant definitions. Its validity does _not_
follow from the fact that "it's obvious" or "it's a well-known
rule of grammar." Students often ask "Why do I have to prove
something when it's obvious." The point is that logic&mdash;and mathematics
more generally&mdash;is its own little world with its own set of rules.
Although this world is related somehow to the real world, when you
say that something is obvious (in the real world), you aren't playing
by the rules of the world of logic. The real _magic_ of mathematics
is that by playing by its rules, you can come up with things that are
decidedly not obvious, but that still say something about the real
world&mdash;often, something interesting and important.

Each of the rules in the [figure](#laws) above can be verified in the same
way, by making a truth table to check all the possible cases.

## Substitution

It's important to understand that the propositional variables in the laws of
Boolean algebra can stand for any propositions, including compound propositions.
It is not just true, as the Double Negation Law states, that
$\lnot(\lnot p)\equiv p$. It is also true that $\lnot(\lnot q)\equiv q$, that
$\lnot(\lnot(p\land q))\equiv (p\land q)$, that
$\lnot(\lnot(p\rightarrow(q\land\lnot p)))\equiv(p\rightarrow (q\land\lnot p))$,
and an infinite number of other statements of the same form. Here, a "statement
of the same form" is one that can be obtained by substituting something for $p$
in both places where it occurs in $\lnot(\lnot p)\equiv p$. How can I be sure
that all these infinitely many statements are valid when all that I've checked
is one little two-line truth table? The answer is that any given proposition,
$Q$, no matter how complicated, has a particular truth value, either true or
false. So, the question of the validity of $\lnot(\lnot Q)\equiv Q$ always
reduces to one of the two cases I already checked in the truth table. (Note that
for this argument to be valid, the same $Q$ must be substituted for $p$ in every
position where it occurs.) While this argument may be "obvious," it is not
exactly a proof, but for now we will just accept the validity of the following
theorem:

> **Theorem: First Substitution Law**  
Suppose that $Q$ is any proposition, and that $p$ is a propositional
variable. Consider any tautology. If $(Q)$ is substituted
for $p$ in all places where $p$ occurs in the tautology,
then the result is also a tautology.


Since logical equivalence is defined in terms of tautology,
it is also true that when $(Q)$ is substituted for $p$ in a logical equivalence,
the result is again a logical equivalence.[^3]

[^3]: I've added parentheses around 
$Q$ here for technical reasons. Sometimes, the parentheses are necessary
to make sure that $Q$ is evaluated as a whole, so that its final value is used in place
of $p$. As an example of what can go wrong, consider $q\land r$. If this is
substituted literally for $p$ in $\lnot(\lnot p)$, without
parentheses, the result is $\lnot(\lnot q \land r)$. But this expression
means $\lnot((\lnot q)\land r)$, which is _not_ equivalent to
$q\land r$.

The First Substitution Law lets you do algebra! For example, you can substitute
$p\rightarrow q$ for $p$ in the law of double negation, $\lnot(\lnot p)\equiv p$.
This allows you to "simplify" the expression $\lnot(\lnot(p\rightarrow q))$
to $p\rightarrow q$ with confidence that the resulting expression has the same
logical value as the expression you started with. (That's what it means for
$\lnot(\lnot(p\rightarrow q))$ and $p\rightarrow q$ to be logically equivalent.)
You can play similar tricks with all the laws in the [table](#laws) above. Even
more important is the Second Substitution Law, which says that you can
substitute an expression for a logically equivalent expression, wherever it
occurs. Once again, we will accept this as a theorem without trying to prove it
here. It is surprisingly hard to put this law into words:

> **Theorem: Second Substitution Law**  
Suppose that $P$ and $Q$ are any propositions such that $P\equiv Q$.
Suppose that $R$ is any compound proposition in which $(P)$
occurs as a subproposition. Let $R'$ be the proposition that is
obtained by substituting $(Q)$ for that occurrence of $(P)$ in $R$.
Then $R\equiv R'$.

Note that in this case, the theorem does not require $(Q)$ to be
substituted for _every_ occurrence of $(P)$ in $R$. You are free
to substitute for one, two, or as many occurrences of $(P)$ as you like,
and the result is still logically equivalent to $R$.

The Second Substitution Law allows us to use the 
logical equivalence $\lnot(\lnot p)\equiv p$ to
"simplify" the expression $q\rightarrow (\lnot(\lnot p))$ by substituting
$(p)$ for $(\lnot(\lnot p))$. The resulting expression, $q\rightarrow(p)$,
or just $q \rightarrow p$ without the parentheses,
is logically equivalent to the original $q\rightarrow (\lnot(\lnot p))$.
Once again, we have to be careful about parentheses: The fact that
$p\lor p\equiv p$ does _not_ allow us to rewrite $q\land p\lor p\land r$
as $q\land p\land r$. The problem is that $q\land p\lor p\land r$
means $(q\land p)\lor (p\land r)$, so that $(p\lor p)$ is not a subexpression.
So even though in practice we won't always write all the parentheses,
you always have to be aware of where the parentheses belong.

The final piece of algebra in Boolean algebra is the observation
that we can chain logical equivalences together. That is,
from $P\equiv Q$ and $Q\equiv R$, it follows that $P\equiv R$.
This is really just a consequence of the Second Substitution
Law: The equivalence $Q\equiv R$ allows us to substitute $R$ for $Q$ in
the statement $P\equiv Q$, giving $P\equiv R$.
(Remember that logical equivalence is defined in 
terms of a proposition.)
This means that we can show that two compound propositions are
logically equivalent by finding a chain of logical equivalences that
lead from one to the other. For example:

|    |    |    |
| -: | :- | :- |
| $p\land(p\rightarrow q)$ | $\equiv p\land(\lnot p\lor q)$ | definition of $p\rightarrow q$, 2nd Subst. Law |
| | $\equiv (p\land \lnot p)\lor (p\land q)$ | Distributive Law |
| | $\equiv \F\lor(p\land q)$ | Law of Contradiction, 2nd Subst. Law |
| | $\equiv (p\land q)$ | Identity Law |

Each step in the chain has its own justification. In several cases,
a substitution law is used without stating as much. In the first line,
for example, the definition of $p\rightarrow q$ is that $p\rightarrow q\equiv \lnot p\lor q$.
The Second Substitution Law allows us to substitute $(\lnot p\lor q)$ for
$(p\rightarrow q)$. In the last line, we implicitly applied the First
Substitution Law to the Identity Law, $\F\lor p\equiv p$, to obtain
$\F\lor(p\land q)\equiv (p\land q)$. 

The chain of equivalences in the above example allows us to conclude
that $p\land(p\rightarrow q)$ is logically equivalent to $p\land q$.
This means that if you were to make a truth table for these two
expressions, the truth values in the column for $p\land(p\rightarrow q)$
would be identical to those in the column for $p\land q$. We know
this without actually making the table. In this case, the table
would only be four lines long and easy enough to make. But Boolean
algebra can be applied in cases where the number of propositional
variables is too large for a truth table to be practical. 

Let's do another example. Recall that a compound proposition is a
tautology if it is true for all possible combinations of truth values
of the propositional variables that it contains. But another way
of saying the same thing is that $P$ is a tautology if $P\equiv\T$.
So, we can prove that a compound proposition, $P$, is a tautology by
finding a chain of logical equivalences leading from $P$ to $\T$.
For example:

|    |    |    |
| -: | :- | :- |
| $((p\lor q)\land \lnot p)\rightarrow q$ | $\equiv (\lnot((p\lor q)\land\lnot p))\lor q$ | definition of $\rightarrow$ |
| | $\equiv (\lnot(p\lor q) \lor \lnot (\lnot p))\lor q$ | DeMorgan's Law, 2nd Subst. Law |
| | $\equiv (\lnot(p\lor q) \lor p)\lor q$ | Double Negation, 2nd Subst. Law |
| | $\equiv (\lnot (p\lor q)) \lor (p\lor q)$ | Associative Law for $\lor$ |
| | $\equiv \T$ | Law of Excluded Middle |

From this chain of equivalences, we can conclude that $((p\lor q) \land \lnot p)\rightarrow q$
is a tautology.

Now, it takes some practice to look at an expression and see which
rules can be applied to it; to see $(\lnot (p\lor q)) \lor (p\lor q)$
as an application of the law of the excluded middle for example,
you need to mentally substitute $(p\lor q)$ for $p$ in the law as it is stated
in the [table](#laws). Often, there are several rules that
apply, and there are no definite guidelines about which one you
should try. This is what makes algebra something of an art.

## Additional Laws

It is certainly not true that all possible rules of Boolean algebra are given
in the [figure](#laws). For one thing, there are many rules that are easy
consequences of the rules that are listed there. For example, although the
table asserts only that $\F\lor p\equiv p$, it is also true that
$p\lor\F\equiv p$. This can be checked directly or by a simple calculation:

| | | |
| -: | :- | :- |
| $p\lor\F$ | $\equiv \F\lor p$ | Commutative Law |
| | $\equiv p$ | Identity Law as given in the table |

Additional rules can be obtained by applying the Commutative Law to other
rules in the table, and we will use such rules freely in the future.

Another sort of easy extension can be applied to the Associative Law,
$(p\lor q)\lor r\equiv p\lor(q\lor r)$. The law is stated for the $\lor$ operator
applied to three terms, but it generalizes to four or more terms. For example

| | | |
| -: | :- | :- |
| $((p\lor q)\lor r)\lor s$ | $\equiv (p\lor q)\lor (r\lor s)$ | by the Associative Law for three terms |
| | $\equiv p\lor(q\lor (r\lor s))$ | by the Associative Law for three terms|

We will, of course, often write this expression as $p\lor q\lor r\lor s$, with no
parentheses at all, knowing that wherever we put the parentheses the value is the
same.

One other thing that you should keep in mind is that rules can be applied in
either direction. The Distributive Law, for example, allows you to
distribute the $p$ in $p\lor(q\land\lnot p)$ to get $(p\lor q)\land(p\lor\lnot p)$.
But it can also be used in reverse to "factor out" a term, as when you
start with $(q\lor(p\rightarrow q))\land(q\lor(q\rightarrow p))$ and factor out the $q$
to get $q\lor((p\rightarrow q)\land(q\rightarrow p))$.


## Understanding the Laws

So far in this section, I have been working with the laws of Boolean
algebra without saying much about what they mean or why they are
reasonable. Of course, you can apply the laws in calculations without
understanding them. But if you want to figure out _which_
calculations to do, you need some understanding. Most of the laws
are clear enough with a little thought. For example, if we already
know that $q$ is false, then $p\lor q$ will be true when $p$ is true
and false when $p$ is false. That is, $p\lor\F$ has the same logical
value as $p$. But that's just what the Identity Law for $\lor$ says.
A few of the laws need more discussion.

The Law of the Excluded Middle, $p\lor\lnot p\equiv \T$,
says that given any proposition $p$, at
least one of $p$ or $\lnot p$ must be true. Since $\lnot p$ is true 
exactly when $p$ is false, this is the same as saying that
$p$ must be either true or false. There is no middle
ground.[^4] The Law of Contradiction,
$p\land\lnot p\equiv\F$, says that it is not possible for 
_both_ $p$ and $\lnot p$ to be true. Both of these rules are obvious.

[^4]: In propositional logic, this is easily verified with
a small truth table. But there is a surprising amount of argument about
whether this law is valid in all situations. In the real world, there often
seems to be a gray area between truth and falsity. Even in mathematics,
there are some people who think there should be a third truth value,
one that means something like "unknown" or "not proven." But the
mathematicians who think this way tend to be considered a bit odd
by most other mathematicians.

The Distributive Laws cannot be called obvious, but a few
examples can show that they are reasonable. Consider the statement, "This 
card is the ace of spades or clubs." Clearly, this is equivalent to "This
card is the ace of spaces or this card is the ace of clubs." But this is
just an example of the first distributive law! For, let $a$ represent the
proposition "This card is an ace," let $s$ represent "This card is a spade,"
and let $c$ represent "This card is a club." Then "This card is the ace of
spades or clubs" can be translated into logic as $a\land(s\lor c)$, while
"This card is the ace of spades or this card is the ace of clubs" becomes
$(a\land s)\lor (a\land c)$. And the distributive law assures us that
$a\land(s\lor c)\equiv(a\land s)\lor (a\land c)$. The second distributive
law tells us, for example, that "This card is either a joker or is the ten of diamonds"
is logically equivalent to "This card is either a joker or a ten, and it is either
a joker or a diamond." That is, $j\lor(t\land d)\equiv(j\lor t)\land(j\lor d)$.
The distributive laws are powerful
tools and you should keep them in mind whenever you are faced with a
mixture of $\land$ and $\lor$ operators.

De Morgan's Laws must also be less than obvious, since people often get
them wrong. But they do make sense. When considering $\lnot(p\land q)$,
you should ask yourself, how can "$p$ and $q$" _fail_ to be true.
It will fail to be true if either $p$ is false _or_ if $q$ is false (or both).
That is, $\lnot(p \land q)$ is equivalent to $(\lnot p)\lor(\lnot q)$. Consider
the sentence "A raven is large and black." If a bird is _not_ large and black,
then it is not a raven. But what exactly does it mean to be
"_not (large and black)_"? How can you tell whether the assertion "not (large
and black)" is true of something? This will be true if it is either
not large _or_ not black. (It doesn't have to be both&mdash;it could be
large and white, it could be small and black.) Similarly, for "$p$ or $q$"
to fail to be true, _both_ $p$ and $q$ must be false. That
is, $\lnot(p\lor q)$ is equivalent to $(\lnot p)\land (\lnot q)$. This is De Morgan's
second law.

Recalling that $p\rightarrow q$ is equivalent to $(\lnot p)\lor q$, we can apply De Morgan's
law to obtain a formula for the negation an implication:

| | |
| -: | :- |
| $\lnot(p\rightarrow q)$ | $\equiv \lnot((\lnot p)\lor q)$ |
| | $\equiv (\lnot(\lnot p))\land(\lnot q)$ |
| | $\equiv p\land\lnot q$ |

That is, $p\rightarrow q$ is false exactly when both $p$ is true and $q$ is false.
For example, the negation of "If you have an ace, you win" is
"You have an ace, and you don't win." Think of it this way: if you had an
ace and you didn't win, then the statement "If you have an ace, you win"
was not true.


## Exercises

1. Construct truth tables to demonstrate the validity of
each of the distributive laws.

2. Construct the following truth tables:
   * Construct truth tables to demonstrate that $\lnot (p \land q)$ is **not**
logically equivalent to $(\lnot p) \land (\lnot q)$.
   * Construct truth tables to demonstrate that $\lnot (p \lor q)$ is **not**
logically equivalent to $(\lnot p) \lor (\lnot q)$. 
   * Construct truth tables to demonstrate the validity of both
De Morgan's Laws.

3. Construct truth tables to demonstrate that $\lnot(p\rightarrow q)$ is **not**
logically equivalent to any of the following.
   * $(\lnot p) \rightarrow (\lnot q)$
   <details>
    <summary>Answer</summary>

     | $p$ | $q$ | $\lnot(p\rightarrow q)$ | $(\lnot p) \rightarrow (\lnot q)$ |
     | :-: | :-: | :-: | :-: |
     | $\F$ | $\F$ | $\F$ | $\T$ |
     | $\F$ | $\T$ | $\F$ | $\F$ |
     | $\T$ | $\F$ | $\T$ | $\T$ |
     | $\T$ | $\T$ | $\F$ | $\T$ |
   </details>

   * $(\lnot p) \rightarrow q$
   <details>
    <summary>Answer</summary>

     | $p$ | $q$ | $\lnot(p\rightarrow q)$ | $(\lnot p) \rightarrow q$ |
     | :-: | :-: | :-: | :-: |
     | $\F$ | $\F$ | $\F$ | $\F$ |
     | $\F$ | $\T$ | $\F$ | $\T$ |
     | $\T$ | $\F$ | $\T$ | $\T$ |
     | $\T$ | $\T$ | $\F$ | $\T$ |
   </details>

   * $p \rightarrow (\lnot q)$
   <details>
    <summary>Answer</summary>

     | $p$ | $q$ | $\lnot(p\rightarrow q)$ | $p \rightarrow (\lnot q)$ |
     | :-: | :-: | :-: | :-: |
     | $\F$ | $\F$ | $\F$ | $\T$ |
     | $\F$ | $\T$ | $\F$ | $\T$ |
     | $\T$ | $\F$ | $\T$ | $\T$ |
     | $\T$ | $\T$ | $\F$ | $\F$ |
   </details>

   * Refer back to this section for a formula that **is** logically equivalent to
$\lnot(p\rightarrow q)$.
<details>
  <summary>Answer</summary>

  Just before the exercises it was shown that $\lnot(p\rightarrow q)$ is equivalent to $p\land\lnot q$.
</details>

4. Is $\lnot(p\leftrightarrow q)$ 
logically equivalent to $(\lnot p) \leftrightarrow (\lnot q)$?
<details>
  <summary>Answer</summary>

  No, since $(\lnot p) \leftrightarrow (\lnot q)$ is equivalent to $p\leftrightarrow q$ (either check
  the truth tables, or expand out both exressions using the definition of $\leftrightarrow$ and then use
  the fact that an implication is equivalent to its contrapositive). Instead, $\lnot(p\leftrightarrow q)$
  is equivalent to $p\oplus q$ (again, check the truth tables or expand the definitions).
</details>

1. In the algebra of numbers, there is a distributive
law of multiplication over addition: $x(y+z)=xy+xz$.
What would a distributive law of addition over multiplication
look like? Is it a valid law in the algebra of numbers?
<details>
  <summary>Answer</summary>

  If addition distributed over multiplication, then we would have $x+yz=(x+y)(x+z)$, but this is not true
  (for example, take $x=1$, $y=2$, and $z=3$; then $x+yz=7$, but $(x+y)(x+z)=12$).
</details>

6. The distributive laws given in the [table](#laws) are sometimes
called the _left_ distributive laws. The **right distributive laws**
say that $(p\lor q)\land r\equiv (p\land r)\lor (q\land r)$ and
that $(p\land q)\lor r\equiv (p\lor r)\land (q \lor r)$. Show that
the right distributive laws are also valid laws of Boolean algebra.
(Note: In practice, both the left and the right distributive laws
are referred to simply as the distributive laws, and both can be used
freely in proofs.)
<details>
  <summary>Answer</summary>

  The commutative laws are enough to show that these are also true, since the
  left and right arguments may be swapped on each of the operations.
</details>

7. Show that $p\land(q\lor r\lor s)\equiv (p\land q)\lor(p\land r)\lor(p\land s)$
for any propositions $p$, $q$, $r$, and $s$. In words, 
we can say that conjunction distributes over a disjunction of
three terms. (Recall that the $\land$ operator is called conjunction and $\lor$
is called disjunction.)
Translate into logic and verify the fact that
conjunction distributes over a disjunction of four terms. Argue that,
in fact, conjunction distributes over a disjunction of any number
of terms.

8. There are two additional basic laws of logic, involving the
two expression $p\land\F$ and $p\lor\T$. What are the missing laws?
Show that your answers are, in fact, laws.
<details>
  <summary>Answer</summary>

  The laws are $p\land\F\equiv\F$ and $p\lor\T\equiv\T$. These are sometimes
  called the "annihilation" or "annulment" laws, and they are akin to the
  property $x\cdot 0=0$ in ordinary algebra.

  If you think of $\F$ as being the disjunction of zero terms, and $\T$ as the
  conjunction of zero terms (just as $0$ is the sum of zero numbers), then these
  laws extend the previous exercise to the case of distributing over zero terms.
</details>

9. For each of the following pairs of propositions, show that
the two propositions are logically equivalent by finding a chain of
equivalences from one to the other.
State which definition or law of logic justifies each equivalence in the chain.
   * $p\land (q\land p),\quad p\land q$
   * $(\lnot p)\rightarrow q,\quad p\lor q$
   * $(p\lor q)\land\lnot q,\quad p\land \lnot q$
   * $p\rightarrow(q\rightarrow r),\quad (p\land q)\rightarrow r$
   * $(p\rightarrow r)\land(q\rightarrow r),\quad (p\lor q)\rightarrow r$
   * $p\rightarrow(p\land q),\quad p\rightarrow q$

1. For each of the following compound propositions, find a 
simpler proposition that is logically equivalent. Try to find a proposition
that is as simple as possible.
   * $(p\land q)\lor\lnot q$
   <details>
    <summary>Answer</summary>

     $p\lor\lnot q$, or $q\rightarrow p$
   </details>

   * $\lnot(p\lor q)\land p$
   <details>
    <summary>Answer</summary>

     $\F$
   </details>

   * $p\rightarrow\lnot p$
   <details>
    <summary>Answer</summary>

     $\lnot p$
   </details>

   * $\lnot p\land(p\lor q)$
   <details>
    <summary>Answer</summary>

     $\lnot p\land q$
   </details>

   * $(q\land p)\rightarrow q$
   <details>
    <summary>Answer</summary>

     $\T$
   </details>

   * $(p\rightarrow q)\land(\lnot p\rightarrow q)$
   <details>
    <summary>Answer</summary>

     $q$
   </details>

1. Express the negation of each of the following sentences in
natural English:
   * It is sunny and cold.
   <details>
    <summary>Answer</summary>

     It is not sunny, or it is not cold.
   </details>

   * I will have cake or I will have pie.
   <details>
    <summary>Answer</summary>

     I will not have cake and I will not have pie.
   </details>

   * If today is Tuesday, this is Belgium.
   <details>
    <summary>Answer</summary>

     Today is Tuesday and this is not Belgium.
   </details>

   * If you pass the final exam, you pass the course.
   <details>
    <summary>Answer</summary>

     You pass the final exam but you do not pass the course.
   </details>

1. Apply one of the laws of logic to each of the
following sentences, and rewrite it as an equivalent sentence.
State which law you are applying.
   * I will have coffee and cake or pie.
   <details>
    <summary>Answer</summary>

     I will have coffee and cake, or I will have coffee and pie (Distributive).
   </details>

   * He has neither talent nor ambition.
   <details>
    <summary>Answer</summary>

     He does not have talent and he does not have ambition (DeMorgan).
   </details>

   * You can have spam, or you can have spam.
   <details>
    <summary>Answer</summary>

     You can have spam (Idempotence).
   </details>

1. Use Boolean algebra to show that the implication operator ($\rightarrow$) is
functionally complete, provided the constant $\F$ is also available (this is not
unreasonable in an electronic circuit, where $\F$ is represented by the ground
voltage). That is, show how to define $p\land q$, $p\lor q$, and $\lnot p$ by
giving equivalent expressions using only $\rightarrow$ and $\F$ in addition to
the input variables $p$ and $q$.
<details>
  <summary>Answer</summary>

  Since $\lnot p\equiv(p\rightarrow\F)$ (check the truth table, or expand
  $p\rightarrow\F$ into $\lnot p\lor\F$ and use the identity law), we may use
  the fact that $(\lnot p)\rightarrow q\equiv(\lnot\lnot p)\lor q\equiv p\lor q$
  to conclude that both $\lnot$ and $\lor$ are expressible with only $\rightarrow$
  and $\F$. We already know that these two together are functionally complete, therefore
  we may convert any boolean expression into one using only $\rightarrow$ and $\F$.
</details>
