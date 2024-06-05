---
id: props
title: Propositional Logic
---

(Content adapted from Critchlow & Eck)

## Propositions

A proposition is a statement which is either true or false.
In propositional logic, we take propositions as basic and
see what we can do with them. Since this is mathematics, we
need to be able to talk about propositions without saying
which particular propositions we are talking about, so we 
use symbolic names to represent them. We will always use
lowercase letters such as $p$, $q$, and $r$ to represent
propositions. A letter used in this way is called a
**propositional variable**. Remember that when I say
something like "Let $p$ be a proposition," I mean "For the rest of
this discussion, let the symbol $p$ stand for some particular
statement, which is either true or false (although I am not
at the moment making any assumption about which it is)."
The discussion has **mathematical generality** in that
$p$ can represent any statement, and the discussion will be
valid no matter which statement it represents.

## Operators: And, Or, Not

What we do with propositions is combine them with
**logical operators**. A logical operator can be
applied to one or more propositions to produce a new proposition.
The truth value of the new proposition is completely determined
by the operator and by the truth values of the propositions
to which it is applied.[^1]
In English, logical operators are represented by words such
as "and," "or," and "not." For example, the
proposition "I wanted to leave and I left" is formed from
two simpler propositions joined by the word "and." Adding
the word "not" to the proposition "I left" gives
"I did not leave" (after a bit of necessary grammatical adjustment).

[^1]: It is not always true that the truth value
of a sentence can be determined from the truth values of its component
parts. For example, if $p$ is a proposition, then "Sarah Palin believes
$p$" is also a proposition, so "Sarah Palin believes" is some kind of
operator. However, it does not count as a _logical_ operator because
just from knowing whether or not $p$ is true, we get no information at
all about whether "Sarah Palin believes $p$" is true.

But English is a little too rich for mathematical logic.
When you read the sentence "I wanted to leave and I left,"
you probably see a connotation of causality: I left _because_
I wanted to leave. This implication does not follow from the
logical combination of the truth values of the two propositions
"I wanted to leave" and "I left." Or consider the
proposition "I wanted to leave but I did not leave."
Here, the word "but" has the same _logical_ meaning
as the word "and," but the connotation is very different.
So, in mathematical logic, we use _symbols_ to represent
logical operators. These symbols do not carry any connotation
beyond their defined logical meaning. The logical operators
corresponding to the English words "and," "or," and "not" 
are $\land$, $\lor$, and $\lnot$.

> Let $p$ and $q$ be propositions. Then $p\lor q$, $p \land q$, and
$\lnot p$ are propositions, whose truth values are given by the
rules:
>
> * $p\land q$ is true when both $p$ is true and $q$ is true, and in 
no other case.
> * $p\lor q$ is true when either $p$ is true, or $q$ is true, or both
$p$ and $q$ are true, and in no other case.
> * $\lnot p$ is true when $p$ is false, and in no other case.
>
> The operators $\land$, $\lor$, and $\lnot$ are referred to as **conjunction**,
**disjunction**, and **negation**, respectively.
(Note that $p\land q$ is read as "$p$ and $q$," $p\lor q$ is read
as "$p$ or $q$," and $\lnot p$ is read as "not $p$.")

### Precedence and Associativity

These operators can be used in more complicated expressions,
such as $p\land(\lnot q)$ or $(p\lor q)\land(q\lor r)$. A
proposition made up of simpler propositions and logical operators
is called a **compound proposition**. Parentheses can be used
in compound expressions to indicate the order in which the
operators are to be evaluated. In the absence of parentheses,
the order of evaluation is determined by **precedence rules**.
For the logical operators defined above, the rules are that
$\lnot$ has higher precedence than $\land$, and $\land$ has precedence
over $\lor$. This means that in the absence of parentheses,
any $\lnot$ operators are evaluated first, followed by any
$\land$ operators, followed by any $\lor$ operators.

For example, the expression $\lnot p \lor q \land r$ is
equivalent to the expression $(\lnot p)\lor (q\land r)$,
while $p\lor q \land q \lor r$ is equivalent to
$p \lor (q \land q) \lor r$. As a practical matter, when you make
up your own expressions, it is usually better to put in parentheses
to make your meaning clear. Remember that even if you leave out
parentheses, your expression has an unambiguous meaning.
If you say "$\lnot p \land q$" when what you meant was
"$\lnot (p\land q)$," you've got it wrong!

This still leaves open the question of which of the $\land$ operators
in the expression $p\land q \land r$ is evaluated first.
This is settled by the following rule: When several operators
of equal precedence occur in the absence of parentheses, they
are evaluated from left to right. Thus, the expression
$p\land q\land r$ is equivalent to $(p\land q)\land r$
rather than to $p\land(q\land r)$.
In this particular case, as a matter of fact, it doesn't really matter
which $\land$ operator is evaluated first, since 
the two compound propositions $(p\land q)\land r$ and
$p\land (q\land r)$ always have the same value,
no matter what logical values the component propositions $p$,
$q$, and $r$ have. We say that $\land$ is an
**associative** operation. We'll see more about associativity
and other properties of operations in the next section.

### Truth Tables

Suppose we want to verify that, in fact, $(p\land q)\land r$ and
$p\land (q\land r)$ do always have the same value. To do so,
we have to consider all possible combinations of values
of $p$, $q$, and $r$, and check that for all such combinations,
the two compound expressions do indeed have the same value.
It is convenient to organize this computation into a
truth table. A **truth table** is a table that shows the
value of one or more compound propositions for each possible
combination of values of the propositional variables that they contain.
Shown below is a truth table that compares the
value of $(p\land q)\land r$ to the value of $p\land (q\land r)$
for all possible values of $p$, $q$, and $r$. There are
eight rows in the table because there are exactly eight different
ways in which truth values can be assigned to $p$, $q$, and
$r$.[^2] In this
table, we see that the last two columns, representing the values of
$(p\land q)\land r$ and $p\land (q\land r)$, are
identical.

[^2]: In general, if there are $n$ variables, then there are $2^n$
different ways to assign truth values to the variables. This might
become clear to you if you try to come up with a scheme for
systematically listing all possible sets of values. If not, you'll
find a rigorous proof of the fact later in this chapter.

| $p$   | $q$   | $r$   | $p\land q$ | $q\land r$ | $(p\land q)\land r$ | $p\land (q\land r)$ |
| :-:   | :-:   | :-:   | :--------: | :--------: | :-----------------: | :-----------------: |
| false | false | false | false      | false      | false               | false               |
| false | false | true  | false      | false      | false               | false               |
| false | true  | false | false      | false      | false               | false               |
| false | true  | true  | false      | true       | false               | false               |
| true  | false | false | false      | false      | false               | false               |
| true  | false | true  | false      | false      | false               | false               |
| true  | true  | false | true       | false      | false               | false               |
| true  | true  | true  | true       | true       | true                | true                |

More generally, we say that two compound propositions are
**logically equivalent** if they always have the same value,
no matter what truth values are assigned to the propositional
variables that they contain. If the number of propositional
variables is small, it is easy to use a truth table to check
whether or not two propositions are logically equivalent.

---

## Other Operators

There are other logical operators besides $\land$, $\lor$, and
$\lnot$. We will consider the **conditional
operator**, $\rightarrow$, the **biconditional operator**, $\leftrightarrow$,
and the **exclusive or operator**, $\oplus$.[^3] These operators
can be completely defined by a truth table that shows their
values for the four possible combinations
of truth values of $p$ and $q$.

[^3]: Note that the symbols used in
this book for the logical operators are not universal. While $\land$, $\lor$,
and $\rightarrow$ are fairly standard, $\lnot$ is often replaced by $\sim$ and
$\leftrightarrow$ is sometimes represented by $\equiv$ or $\Leftrightarrow$.
There is even less standardization of the exclusive or operator, but that
operator is generally not so important as the others.

> For any propositions $p$ and $q$, we define the propositions
$p\rightarrow q$, $p\leftrightarrow q$, and $p\oplus q$ according to the truth table:
>
> | $p$   | $q$   | $p\rightarrow q$ | $p\leftrightarrow q$ | $p\oplus q$ |
> | :---: | :---: | :--------------: | :------------------: | :---------: |
> | false | false | true             | true                 | false       |
> | false | true  | true             | false                | true        |
> | true  | false | false            | false                | true        |
> | true  | true  | true             | true                 | false       |
>
>When these operators are used in expressions, in the absence of parentheses
to indicate order of evaluation, we use the following precedence rules:
The exclusive or operator, $\oplus$, has the same precedence as $\lor$. The
conditional operator, $\rightarrow$, has lower precedence than
$\land$, $\lor$, $\lnot$, and $\oplus$, and is therefore evaluated after
them. Finally, the biconditional operator, $\leftrightarrow$, has the lowest
precedence and is therefore evaluated last. For example,
the expression "$p\rightarrow q \land r \leftrightarrow \lnot p \oplus s$" is evaluated
as if it were written "$(p\rightarrow (q\land r))\leftrightarrow((\lnot p) \oplus s)$."

In order to work effectively with the logical operators, you need
to know more about their meaning and how they relate to ordinary 
English expressions.

### Implication

The proposition $p\rightarrow q$ is called
an **implication** or a **conditional**. It is usually
read as "$p$ implies $q$."
In English, $p\rightarrow q$ is often expressed as "if $p$ then $q$."
For example, if $p$ represents the proposition "Bill Gates is poor"
and $q$ represents "the moon is made of green cheese," then $p\rightarrow q$
could be expressed in English as "If Bill Gates is poor,
then the moon is made of green cheese." In this example, $p$ is
false and $q$ is also false. Checking the definition of $p\rightarrow q$,
we see that $p\rightarrow q$ is a true statement. Most people would agree
with this. It's worth looking at a similar example in more detail.
Suppose that I assert that "If the Mets are a great team, then
I'm the king of France." This statement has the form $m\rightarrow k$
where $m$ is the proposition "the Mets are a great team" and $k$
is the proposition "I'm the king of France." Now, demonstrably
I am not the king of France, so $k$ is false. Since $k$ is false,
the only way for $m\rightarrow k$ to be true is for $m$ to be false as well.
(Check the definition of $\rightarrow$ in the table!)
So, by asserting $m\rightarrow k$, I am really asserting that the Mets are
_not_ a great team.

Or consider the statement, "If the party is on Tuesday, then I'll
be there." What am I trying to say if I assert this statement?
I am asserting that $p\rightarrow q$ is true, where $p$ represents "The party
is on Tuesday" and $q$ represents "I will be at the party."
Suppose that $p$ is true, that is, the party does in fact take place
on Tuesday. Checking the definition of $\rightarrow$, we see that in the
only case where $p$ is true and $p\rightarrow q$ is true, $q$ is also true.
So from the truth of "If the party is on Tuesday, then I will be at the party"
and "The party is in fact on Tuesday," you can deduce that
"I will be at the party" is also true. But suppose, on the other
hand, that the party is actually on Wednesday. Then $p$ is false.
When $p$ is false and $p\rightarrow q$ is true, the definition of $p\rightarrow q$ 
allows $q$ to be either true or false. So, in this case, you can't
make any deduction about whether or not I will be at the party.
The statement "If the party is on Tuesday, then I'll be there"
doesn't assert anything about what will happen if the party is on
some other day than Tuesday.

The implication $(\lnot q)\rightarrow(\lnot p)$ is called the **contrapositive**
of $p\rightarrow q$. An implication is logically equivalent
to its contrapositive. The contrapositive of "If this is Tuesday,
then we are in Belgium" is "If we aren't in Belgium, then this
isn't Tuesday." These two sentences assert exactly the same
thing.

Note that $p\rightarrow q$ is _not_ logically equivalent to
$q\rightarrow p$. The implication $q\rightarrow p$ is called the
**converse** of $p\rightarrow q$. The converse of "If this is
Tuesday, then we are in Belgium" is "If we are in Belgium,
then this is Tuesday." Note that it is possible for either
one of these statements to be true while the other is false.
In English, I might express the fact that both
statements are true by saying "If this is Tuesday, then we are
in Belgium, _and conversely_." In logic, this would be expressed
with a proposition of the form $(p\rightarrow q)\land(q\rightarrow p)$.

### Biconditional

The biconditional operator is closely related to the
conditional operator. In fact, $p\leftrightarrow q$ is logically
equivalent to $(p\rightarrow q)\land (q\rightarrow p)$.
The proposition $p\leftrightarrow q$ is usually read as "$p$ if and only if $q$."
(The "$p$ if $q$" part represents $q\rightarrow p$, while "$p$ only if $q$"
is another way of asserting that $p\rightarrow q$.) 
It could also be expressed as "if $p$ then $q$, and conversely."
Occasionally in English, "if ... then" is used when what is
really meant is "if and only if." For example, if a parent tells
a child, "If you are good, then Santa will bring you toys,"
the parent probably really means to say "Santa will bring you toys
if and only if you are good." (The parent would probably not
respond well to the child's perfectly logical plea "But you never said
what would happen if I wasn't good!")

### Exclusive Or

Finally, we turn to the exclusive or operator. The English word
"or" is actually somewhat ambiguous. The two operators $\oplus$
and $\lor$ express the two possible meanings of this word.
The proposition $p\lor q$ can be expressed unambiguously as
"$p$ or $q$, _or both_," while $p\oplus q$ stands for
"$p$ or $q$, _but not both_." If a menu says that you can
choose soup or salad, it doesn't mean that you can have both. In
this case, "or" is an exclusive or. On the other hand, in
"You are at risk of heart disease if you smoke or drink," the
or is inclusive since you certainly don't get off the hook if you
both smoke and drink. In mathematics, the word "or" is always
taken in the inclusive sense of $p\lor q$.

## Functional Completeness of And, Or, Not

Now, any compound proposition that uses any of the operators
$\rightarrow$, $\leftrightarrow$, and $\oplus$ can be rewritten as a logically
equivalent proposition that uses only $\land$, $\lor$, and $\lnot$.
It is easy to check that $p\rightarrow q$ is logically equivalent
to $\lnot p\lor q$. (Just make a truth table for $\lnot p\lor q$.)
Similarly, $p\leftrightarrow q$ can be expressed as
$(\lnot p \lor q)\land (\lnot q\lor p)$, while $p\oplus q$ is the same as
$(p\lor q)\land\lnot(p\land q)$.
So, in a strict logical sense, $\rightarrow$, $\leftrightarrow$, and $\oplus$ are
unnecessary. (Nevertheless, they are useful and important, and
we won't give them up.)

Even more is true: In a strict logical sense, we could do without
the conjunction operator $\land$. It's easy to check that
$p\land q$ is logically equivalent to $\lnot(\lnot p\lor\lnot q)$,
so any expression that uses $\land$ can be rewritten as one that
uses only $\lnot$ and $\lor$. Alternatively, we could do without
$\lor$ and write everything in terms of $\lnot$ and $\land$.

## Tautologies and Contradictions

Certain types of proposition will play a special role in our
further work with logic. In particular, we define tautologies
and contradictions as follows:

> A compound proposition is said to be a **tautology** if and only if
it is _true_ for all possible combinations of truth values of
the propositional variables which it contains. 
A compound proposition is said to be a **contradiction** if and only if
it is _false_ for all possible combinations of truth values of
the propositional variables which it contains. 

For example, the proposition $((p\lor q)\land \lnot q)\rightarrow p$ is a tautology.
This can be checked with a truth table:

| $p$   | $q$   | $p\lor q$ | $\lnot q$ | $(p\lor q)\land\lnot q$ | $((p\lor q)\land\lnot q)\rightarrow p$ |
| :-:   | :-:   | :-------: | :-------: | :---------------------: | :------------------------------------: |
| false | false | false     | true      | false                   | true                                   |
| false | true  | true      | false     | false                   | true                                   |
| true  | false | true      | true      | true                    | true                                   |
| true  | true  | true      | false     | false                   | true                                   |

The fact that all entries in the last column are true tells us that
this expression is a tautology. Note that for any compound proposition
$P$, $P$ is a tautology if and only if $\lnot P$ is a contradiction.
(Here and in the future, I use uppercase letters to represent
compound propositions. $P$ stands for any formula made up of
simple propositions, propositional variables, and logical operators.)
Logical equivalence can be defined in terms of tautology:

> Two compound propositions, $P$ and $Q$, are said to be **logically equivalent** if
and only if the proposition $P\leftrightarrow Q$ is a tautology.

The assertion that $P$ is logically equivalent to $Q$ will
be expressed symbolically as "$P\equiv Q$." For example,
$(p\rightarrow q)\equiv(\lnot p\lor q)$,
and $p\oplus q\equiv (p\lor q)\land\lnot(p\land q)$.

## Exercises

1. Give the three truth tables that define the logical operators
$\land$, $\lor$, and $\lnot$.
<details>
  <summary>Answer</summary>

  | $p$ | $q$ | $p\land q$ |
  | :-: | :-: | :-: |
  | false | false | false |
  | false | true | false |
  | true | false | false |
  | true | true | true |

  | $p$ | $q$ | $p\lor q$ |
  | :-: | :-: | :-: |
  | false | false | false |
  | false | true | true |
  | true | false | true |
  | true | true | true |

  | $p$ | $\lnot p$ |
  | :-: | :-: |
  | false | true |
  | true | false |
</details>


1. Insert parentheses into the following compound propositions to show
the order in which the operators are evaluated:
   * $\lnot p \lor q$
   <details>
    <summary>Answer</summary>

     $(\lnot p)\lor q$
   </details>

   * $p\land q \lor \lnot p$
   <details>
    <summary>Answer</summary>

     $(p\land q) \lor (\lnot p)$
   </details>

   * $p\lor q \land r$
   <details>
    <summary>Answer</summary>

     $p\lor (q \land r)$
   </details>

   * $p \land \lnot q \lor r$
   <details>
    <summary>Answer</summary>

     $(p \land (\lnot q)) \lor r$
   </details>

3. List the 16 possible combinations of truth values for
the four propositional variables $s$, $p$, $q$, $r$. Try to find
a systematic way to list the values. (Hint: Start with the
eight combinations of values for $p$, $q$, and $r$, as given in
the truth table [above](#truth-tables).) Now, explain why there
are 32 possible combinations of values for five variables, and
describe how they could be listed systematically.
<details>
  <summary>Answer</summary>

  | $s$ | $p$ | $q$ | $r$ |
  | :-: | :-: | :-: | :-: |
  | false | false | false | false |
  | false | false | false | true |
  | false | false | true | false |
  | false | false | true | true |
  | false | true | false | false |
  | false | true | false | true |
  | false | true | true | false |
  | false | true | true | true |
  | true | false | false | false |
  | true | false | false | true |
  | true | false | true | false |
  | true | false | true | true |
  | true | true | false | false |
  | true | true | false | true |
  | true | true | true | false |
  | true | true | true | true |

  The first eight combinations are the eight for $p$, $q$, and $r$, with $s$ false;
  the other eight are the same with $s$ true.

  To list the 32 combinations for five variables systematically, first list the 16
  above combinations with an additional first variable being false, and then list them
  again with that additional variable being true.
</details>

4. Some of the following compound propositions are tautologies,
some are contradictions, and some are neither. In each case, use a
truth table to decide to which of these categories the proposition
belongs:
   * $(p\land (p\rightarrow q))\rightarrow q$
   <details>
     <summary>Answer</summary>

     Tautology
   </details>

   * $((p\rightarrow q)\land(q\rightarrow r))\rightarrow (p\rightarrow r)$
   <details>
     <summary>Answer</summary>

     Tautology
   </details>

   * $p\land(\lnot p)$
   <details>
     <summary>Answer</summary>

     Contradiction
   </details>

   * $(p\lor q)\rightarrow(p\land q)$
   <details>
     <summary>Answer</summary>

     Neither: false when $p$ true and $q$ false, or when $p$ false and $q$ true
     (so this is equivalent to $p\leftrightarrow q$)
   </details>

   * $p\lor(\lnot p)$
   <details>
     <summary>Answer</summary>

     Tautology
   </details>

   * $(p\land q)\rightarrow(p\lor q)$
   <details>
     <summary>Answer</summary>

     Tautology
   </details>

1. Use truth tables to show that each of the following
propositions is logically equivalent to $p\leftrightarrow q$.
   * $(p\rightarrow q)\land (q\rightarrow p)$
   * $(\lnot p)\leftrightarrow(\lnot q)$
   * $(p\rightarrow q)\land((\lnot p)\rightarrow(\lnot q))$
   * $\lnot(p\oplus q)$

6. Is $\rightarrow$ an associative operation? That is,
is $(p\rightarrow q)\rightarrow r$ logically equivalent to
$p\rightarrow(q\rightarrow r)$? Is $\leftrightarrow$ associative?
<details>
  <summary>Answer</summary>

  To show that two expressions are equivalent we need to handle every case
  (by making a truth table). However, to show that they are _not_ equivalent
  we only need to come up with one counter-example. Suppose that $p$ is false:
  then $p\rightarrow(q\rightarrow r)$ is true, regardless of $q$ and $r$.
  However, if $p$ and $r$ are both false, then $(p\rightarrow q)\rightarrow r$
  is false (because $p\rightarrow q$ is true while $r$ is false). Therefore,
  $\rightarrow$ is not associative.

  For the case of $\leftrightarrow$, it is not possible to find such a
  counter-example, because all of the rows are the same. In fact, a little
  reflection shows that, for both $(p\leftrightarrow q)\leftrightarrow r$ and
  $p\leftrightarrow(q\leftrightarrow r)$, they are true when either all three
  of $p$, $q$, and $r$ are true, or when exactly one of them is true.
  (There is a similar property for $p\oplus q\oplus r$, which is true when exactly
  zero or two of the variables are true. These properties extend to any number of
  variables all combined with $\oplus$ or $\leftrightarrow$; for one operator the combination
  will be true exactly when an even number of variables are true, and for the other when an odd
  number are true, so these operations give a way to compute the even or odd "parity"
  of a set of inputs.)
</details>

1. Let $p$ represent the proposition "You leave" and let
$q$ represent the proposition "I leave." Express the following
sentences as compound propositions using $p$ and $q$, and show
that they are logically equivalent:
   * Either you leave or I do. (Or both!)
   * If you don't leave, I will.
  <details>
    <summary>Answer</summary>

    The first sentence is $p\lor q$, while the second is $\lnot p\rightarrow q$.
    We can show that they are equivalent by making truth tables and showing that they have
    the same truth value in every case. The only case where $p\lor q$ is false is if both
    $p$ and $q$ are false; the only case where $\lnot p\rightarrow q$ is false is if
    $\lnot p$ is true but $q$ is false&mdash;that is, when $p$ and $q$ are both false.
    Therefore, the truth tables will be the same and they are equivalent.
  </details>

1. Suppose that $m$ represents the proposition "The Earth moves,"
$c$ represents "The Earth is the center of the universe," and
$g$ represents "Galileo was railroaded." Translate each of the
following compound propositions into English:
   * $\lnot g\land c$
   <details>
     <summary>Answer</summary>

     Galileo was not railroaded and the Earth is the center of the universe.
   </details>

   * $m\rightarrow\lnot c$
   <details>
     <summary>Answer</summary>

     If the Earth moves then the Earth is not the center of the universe.
   </details>

   * $m\leftrightarrow\lnot c$
   <details>
     <summary>Answer</summary>

     The Earth moves if and only if the Earth is not the center of the universe.
   </details>

   * $(m\rightarrow g)\land (c\rightarrow \lnot g)$
   <details>
     <summary>Answer</summary>

     If the Earth moves then Galileo was railroaded, and if the Earth is the center of the universe then Galileo was not railroaded.
   </details>
   
9. Give the converse and the contrapositive of each of
the following English sentences:
   * If you are good, Santa brings you toys.
   <details>
     <summary>Answer</summary>

     Converse: If Santa brings you toys, then you are good.
   
     Contrapositive: If Santa does not bring you toys, then you are not good.
   </details>

   * If the package weighs more than one ounce, then you need extra postage.
   <details>
     <summary>Answer</summary>

     Converse: If you need extra postage, then the package weighs more than one ounce.
   
     Contrapositive: If you do not need extra postage, then the package weighs no more than one ounce.
   </details>

   * If I have a choice, I don't eat eggplant.
   <details>
     <summary>Answer</summary>

     Converse: If I don't eat eggplant, then I have a choice.
   
     Contrapositive: If I eat eggplant, then I don't have a choice.
   </details>

1. In an ordinary deck of fifty-two playing cards, for how many cards is it true 
   * that "This card is a ten and this card is a heart"?
   <details>
     <summary>Answer</summary>

     Only one card: the ten of hearts.
   </details>

   * that "This card is a ten or this card is a heart"?
   <details>
     <summary>Answer</summary>

     The 13 heart cards (including the 10 of hearts) plus the other three tens satisfy this, for a total of 16.
   </details>

   * that "If this card is a ten, then this card is a heart"?
   <details>
     <summary>Answer</summary>

     It is true for the 10 of hearts, but it is also true for the 48 cards that are not tens, for a total of 49.
   </details>

   * that "This card is a ten if and only if this card is a heart"?
   <details>
     <summary>Answer</summary>

     This is true for the 10 of hearts, as well as for all of the non-tens that are also not hearts;
     there are 36 cards that are neither tens nor hearts, for a total of 37 cards making this true.
   </details>

2. Define a logical operator $\downarrow$ so that $p\downarrow q$ is logically
   equivalent to $\lnot(p\lor q)$. (This operator, known as the **Peirce
   Arrow**,[^4]
   is usually referred to as "NOR," short for "not or"). Show that each of the
   propositions $\lnot p$, $p\land q$, $p\lor q$, $p\rightarrow q$,
   $p\leftrightarrow q$, and $p\oplus q$ can be rewritten as a logically
   equivalent proposition that uses $\downarrow$ as its only operator; we say
   that $\downarrow$ is a **functionally complete** operator, since it may be
   used to express all of the other operations.

   <details>
     <summary>Answer</summary>

     Notice that $(p\downarrow p)\equiv\lnot p$. Since $(p\downarrow q)\equiv\lnot(p\lor q)$,
     this means that $p\lor q$ is equivalent to $\lnot(p\downarrow q)$, which in turn can
     be expressed as $(p\downarrow q)\downarrow(p\downarrow q)$. Since we saw above that
     $(p\land q)\equiv\lnot(\lnot p\lor\lnot q)$, we may also express $\land$ in terms of
     $\downarrow$ (although it isn't pretty&hellip;). As observed before, $\land$, $\lor$, and
     $\lnot$ are functionally complete, so we can also express $\rightarrow$, $\leftrightarrow$,
     and $\oplus$ using $\downarrow$.
   </details>

[^4]: Wikipedia helpfully points out that this is not to be confused with
the Pierce-Arrow automobile; Google, as I was writing this, repeatedly
insisted on correcting Peirce to Pierce&hellip;. Charles Sanders Peirce, pronounced
"Purse" (1839&ndash;1914), was an American scientist and philosopher who wrote
many influential papers, and many more that would have been influential if they
had been published during his lifetime. In addition to the functional completeness
result mentioned here, he helped develop and promote modern logical notation and
the use of truth tables, and he worked out the foundations of what became
relational database theory a century later. Arthur Burks, a 1936 DePauw graduate
who went on to help build ENIAC, credited Peirce with having the idea of building
an electrical computing machine, based on wiring up switches to perform logical
operations, fifty years before such a machine was built!

3. Show that the **Sheffer Stroke** operator $\uparrow$, defined so that
   $p\uparrow q$ is logically equivalent to $\lnot(p\land q)$, is also
   functionally complete.[^5] This operator is also known as
   "NAND," short for "not and."

   <details>
     <summary>Answer</summary>

     Since $\lnot p\equiv(p\uparrow p)$ and $(p\land q)\equiv(p\uparrow q)\uparrow(p\uparrow q)$,
     and $\{\lnot,\land\}$ is a functionally complete set, we are done.
   </details>


[^5]: Functional completeness is not merely an academic
curiosity. The NAND and NOR gates are particularly simple to implement in
silicon (each needs essentially one transistor per input), and building an
entire circuit out of identical building blocks makes both design and
fabrication easier. Indeed, the very first computer built from integrated
circuits was the Apollo Guidance Computer, which used about 5600 three-input
NOR gates to help Apollo 11 land on the moon.