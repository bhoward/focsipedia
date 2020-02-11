---
id: deduction
title: Deduction
---
import useBaseUrl from '@docusaurus/useBaseUrl';

(Content adapted from Critchlow & Eck)

## Arguments

Logic can be applied to draw conclusions from a set of premises.
A premise is just a proposition that is known to be true or that
has been accepted to be true for the sake of argument, and a conclusion
is a proposition that can be deduced logically from the premises.
The idea is that if you believe that the premises are true,
then logic forces you to accept that the conclusion is true.
An "argument" is a claim that a certain conclusion follows from
a given set of premises.  Here is an argument laid out in
a traditional format:

$$
\begin{array}{l}
\text{If today is Tuesday, then this is Belgium}\\
\text{Today is Tuesday}\\ \hline\therefore
\text{This is Belgium}
\end{array}
$$

The premises of the argument are shown above the line, and the conclusion
below.  The symbol $\therefore$ is read "therefore."  The claim is that
the conclusion, "This is Belgium," can be deduced logically from the two
premises, "If today is Tuesday, then this is Belgium" and "Today is Tuesday."
In fact, this claim is true.  Logic forces you to accept this argument.
Why is that?

Let $p$ stand for the proposition "Today is Tuesday," and let $q$ stand for the
proposition "This is Belgium."  Then the above argument has the form

$$
\begin{array}{l}
p\rightarrow q\\
p\\ \hline\therefore
q
\end{array}
$$

Now, for _any_ propositions $p$ and $q$&mdash;not just the ones in this particular
argument&mdash;if $p\rightarrow q$ is true and $p$ is true, then $q$ must also be true.
This is easy to check in a truth table:

| $p$ | $q$ | $p\rightarrow q$ |
| :-: | :-: | :-: |
| false | false | true |
| false | true  | true |
| true  | false | false |
| true  | true  | true |
 
The only case where both $p\rightarrow q$ and $p$ are true is on
the last line of the table, and in this case, $q$ is also true.
If you believe that
$p\rightarrow q$ and $p$ are true, you have no logical choice but to believe $q$.
This applies no matter what $p$ and $q$ represent.  For example,
if you believe "If Jill is breathing, then Jill pays taxes," 
and you believe that "Jill is breathing," logic forces you to believe that
"Jill pays taxes."  Note that we can't say for sure that the
conclusion is true, only that _if_ the premises are true,
_then_ the conclusion must be true.

This fact can be rephrased by saying that $\big((p\rightarrow q)\land
p\big)\rightarrow q$ is a tautology. More generally, for any compound
propositions $\mathscr{P}$ and $\mathscr{Q}$, saying "$\mathscr{P}\rightarrow
\mathscr{Q}$ is a tautology" is the same as saying that "in all cases where
$\mathscr{P}$ is true, $\mathscr{Q}$ is also true".[^Here, "in all cases" means
for all combinations of truth values of the propositional variables in
$\mathscr{P}$ and $\mathscr{Q}$. Saying $\mathscr{P}\rightarrow \mathscr{Q}$ is
a tautology means it is true in all cases. But by definition of $\rightarrow$,
it is automatically true in cases where $\mathscr{P}$ is false. In cases where
$\mathscr{P}$ is true, $\mathscr{P}\rightarrow \mathscr{Q}$ will be true if and
only if $\mathscr{Q}$ is true.] We will use the notation
$\mathscr{P}\vdash\mathscr{Q}$ to mean that $\mathscr{P}\rightarrow \mathscr{Q}$
is a tautology. Think of $\mathscr{P}$ as being the premise of an argument. To
say $\mathscr{P}\vdash\mathscr{Q}$ is to say that $\mathscr{Q}$ follows
logically from $\mathscr{P}$. We will use the same notation in both
propositional logic and predicate logic. (Note that the relation of $\vdash$ to
$\rightarrow$ is the same as the relation of $\equiv$ to $\leftrightarrow$.)


> Let $\mathscr{P}$ and $\mathscr{Q}$ be any formulas in either
propositional logic or predicate logic.  The notation
$\mathscr{P}\vdash\mathscr{Q}$ is used to mean that
$\mathscr{P}\rightarrow\mathscr{Q}$ is a tautology.  That is,
in all cases where $\mathscr{P}$ is true, $\mathscr{Q}$ is
also true.  We then say that $\mathscr{Q}$ can be
**logically deduced** from $\mathscr{P}$ or that
$\mathscr{P}$ **logically implies** $\mathscr{Q}$.

> More generally, if $\mathscr{P}_1, \ldots, \mathscr{P}_n$ and
$\mathscr{Q}$ are formulas, then we say that $\mathscr{Q}$ can be
**logically deduced** from the premises $\mathscr{P}_1$ through
$\mathscr{P}_n$, and write
$\mathscr{P}_1, \ldots, \mathscr{P}_n\vdash\mathscr{Q}$, if
$\mathscr{P}_1\land\ldots\land\mathscr{P}_n\rightarrow\mathscr{Q}$ is
a tautology.

An argument in which the conclusion follows logically from the
premises is said to be a **valid argument**.  To test whether
an argument is valid, you have to replace the particular propositions
or predicates that it contains with variables, and then test
whether the conjunction of the premises logically implies the
conclusion.  We have seen that any argument of the form

$$
\begin{array}{l}
p\rightarrow q\\
p\\ \hline\therefore
q
\end{array}
$$

is valid, since $\big((p\rightarrow q)\land p\big)\rightarrow q$ is a tautology.
This rule of deduction is called **modus ponens**.  It plays a central
role in logic.  Another, closely related rule is **modus tollens**,
which applies to arguments of the form

$$
\begin{array}{l}
p\rightarrow q\\
\lnot q\\ \hline\therefore
\lnot p
\end{array}
$$

To verify that this is a valid argument, just check that
$p\rightarrow q, \lnot q\vdash \lnot p$, that is, that
$\big((p\rightarrow q)\land \lnot q\big)\rightarrow \lnot p$ is a tautology.
As an example, the following argument has the form of _modus tollens_
and is therefore a valid argument:

$$
\begin{array}{l}
\text{If Keanu Reeves is a good actor, then I'm the king of France}\\
\text{I am not the king of France}\\ \hline\therefore
\text{Keanu Reeves in not a good actor}
\end{array}
$$

You should note carefully that the validity of this argument has nothing
to do with whether or not Keanu Reeves can act well.  The argument forces
you to accept the conclusion _only if_ you accept the premises.
You can logically believe that the conclusion is false, as long as
you believe that at least one of the premises is false.

Another named rule of deduction is the **Law of Syllogism**, which has the form

$$
\begin{array}{l}
p\rightarrow q\\
q\rightarrow r\\ \hline\therefore
p\rightarrow r
\end{array}
$$

For example:

$$
\begin{array}{l}
\text{If you study hard, you do well in school}\\
\text{If you do well in school, you get a good job}\\ \hline\therefore
\text{If you study hard, you get a good job}
\end{array}
$$

There are many other possible rules that have been identified by
logicians over the centuries. Below we will look at one particular
set of rules known as **natural deduction** that may be used to
derive all of the others in a fairly systematic way.

Logical deduction is related to logical equivalence.
We defined $\mathscr{P}$ and $\mathscr{Q}$ to be
logically equivalent if $\mathscr{P}\leftrightarrow\mathscr{Q}$ is
a tautology.  Since $\mathscr{P}\leftrightarrow\mathscr{Q}$ is equivalent
to $(\mathscr{P}\rightarrow\mathscr{Q})\land(\mathscr{Q}\rightarrow\mathscr{P})$,
we see that  $\mathscr{P}\equiv \mathscr{Q}$ if and only if both
$\mathscr{Q}\vdash\mathscr{P}$ and $\mathscr{P}\vdash\mathscr{Q}$.
Thus, we can show that two statements are logically equivalent if
we can show that each of them can be logically deduced from the
other.

## Natural Deduction

In general, arguments are more complicated that those we've considered
so far.  Here, for example, is an argument that has five premises:

$$
\begin{array}{l}
(p\land r)\rightarrow s\\
q\rightarrow p\\
t\rightarrow r\\
q\\
t\\ \hline\therefore
s
\end{array}
$$

Is this argument valid?  Of course, you could use a truth table
to check whether the conjunction of the premises logically implies
the conclusion.  But with five propositional variables, the table
would have 32 lines, and the size of the table grows quickly when
more propositional variables are used.  So, in general, truth
tables are not practical.  

Fortunately, there is another way to proceed, based on the fact that
it is possible to chain several logical deductions together.
That is, if $\mathscr{P}\vdash\mathscr{Q}$ and
$\mathscr{Q}\vdash\mathscr{R}$, it follows that
$\mathscr{P}\vdash\mathscr{R}$.  This means we can demonstrate the
validity of an argument by deducing the conclusion from the
premises in a sequence of steps.  These steps can be presented
in the form of a proof:

> A **formal proof** that an argument is valid consists of a
sequence of propositions such that the last proposition in the
sequence is the conclusion of the argument, and every proposition
in the sequence is either a premise of the argument or follows
by logical deduction from propositions that precede it in the list.

The deduction rules, the primitive argument forms that we will chain
together into complete proofs, are described in more detail below.
One of the characteristics of natural deduction is that there are
rules associated with each logical operator that determine how to
either _introduce_ or _eliminate_ the operator. This can provide
a great deal of guidance when writing a proof, because as you fill
in the steps you can look at the main operators of the current goal(s)
and the available premises&mdash;either you will work backwards from
a goal by use of an introduction rule or you will work
forwards from a premise by use of an elimination rule.

The existence of such a proof shows that the conclusion follows
logically from the premises, and therefore that the argument is 
valid.  Here is a formal proof that the argument given above is valid.
The propositions in the proof are labeled, and each proposition
has a justification.

$$
\begin{array}{l|l}
\ell_1: q\rightarrow p & \text{premise}\\
\ell_2: q & \text{premise}\\
\ell_3: p & \rightarrow E\ \ell_1, \ell_2\\
\ell_4: t\rightarrow r & \text{premise}\\
\ell_5: t & \text{premise}\\
\ell_6: r & \rightarrow E\ \ell_4, \ell_5\\
\ell_7: p\land r & \land I\ \ell_3, \ell_6\\
\ell_8: p\land r\rightarrow s & \text{premise}\\
\ell_9: s & \rightarrow E\ \ell_8, \ell_7
\end{array}
$$

Once a formal proof has been constructed, it is convincing.  Unfortunately,
it's not necessarily easy to come up with the proof.  Usually, the best
method is a combination of working forward ("Here's what I know, what
can I deduce from that?") and working backwards ("Here's what I
need to prove, what other things would imply that?").  For this proof,
I might have thought:  I want to prove $s$.  I know that
$p\land r$ implies $s$, so if I can prove $p\land r$, I'm OK.
But to prove $p\land r$, it'll be enough to prove $p$ and $r$ 
separately&hellip;.

## Natural Deduction Rules

As mentioned above, the particular set of primitive argument forms that
we will use are grouped into **introduction** and **elimination** rules
for each of the logical operators. Here we will explain each deduction
rule, justify it, and show examples of how they may be used in proofs.
At the end of this section is a table summarizing all of the rules.

### Conjunction

The conjunction $p\land q$ is true when both $p$ and $q$ are true. Therefore,
to introduce the conjunction $p\land q$ in a proof we need to first establish
the premises $p$ and $q$ individually:

$$ \begin{array}{l}
x: p\\
y: q\\ \hline\therefore
p\land q, \quad\land I\ x,y
\end{array} $$

The $x$ and $y$ labels on the premises are shown here to allow us to refer to
them in the "justification" attached to the conclusion: $\land I\ x, y$ stands
for "AND introduction from premises labeled $x$ and $y$." Here is an example of
how this rule might be used in the proof of
$\lnot p, p\lor q\vdash\lnot p\land(p\lor q)$:

$$ \begin{array}{l|l}
\ell_1: \lnot p & \text{premise}\\
\ell_2: p\lor q & \text{premise}\\
\ell_3: \lnot p\land(p\lor q) & \land I\ \ell_1, \ell_2
\end{array} $$

The elimination rules for conjunction allow us to move from the premise $p\land q$
to either the conclusion $p$ or the conclusion $q$:

$$ \begin{array}{l}
x: p\land q\\ \hline\therefore
p, \quad\land E_1\ x
\end{array} $$

$$ \begin{array}{l}
x: p\land q\\ \hline\therefore
q, \quad\land E_2\ x
\end{array} $$

Here is a proof that combines the introduction and elimination rules for conjunction
to prove $p\land q\vdash q\land p$, _i.e._, that AND is commutative:

$$ \begin{array}{l|l}
\ell_1: p\land q & \text{premise}\\
\ell_2: q & \land E_2\ \ell_1\\
\ell_3: p & \land E_1\ \ell_1\\
\ell_4: q\land p & \land I\ \ell_2, \ell_3
\end{array} $$

Note that we used the second elimination rule in step $\ell_2$ and the first in $\ell_3$,
to extract respectively the second and the first terms of the conjunction. Here is an
equivalent proof using the rules in the other order:

$$ \begin{array}{l|l}
\ell_1: p\land q & \text{premise}\\
\ell_2: p & \land E_1\ \ell_1\\
\ell_3: q & \land E_2\ \ell_1\\
\ell_4: q\land p & \land I\ \ell_3, \ell_2
\end{array} $$

In the justification for step $\ell_4$, we specify that the term from $\ell_3$ 
($q$) is used first in the conclusion. Although we have just proved that conjunction
is commutative, it is important for a careful proof to keep track of this sort of
distinction.

### Implication

The implication $p\rightarrow q$ says that whenever $p$ is true, $q$ must also be true.
To introduce an implication in a proof, we will temporarily assume $p$ and show that,
based on that assumption, we are then able to conclude $q$.
As a deduction rule, this argument will take the form of a _nested_ proof, analogous to
a nested block of code that may introduce temporary local variables, or a function
definition that may use parameters. The notation we will use for this is inspired by the
notation for an anonymous function block in languages such as JavaScript, Scala, and
ReasonML:

$$ \begin{array}{l}
x: p \Rightarrow\{\\
\quad\ldots\\
\quad q\\
\}\\ \hline\therefore
p\rightarrow q, \quad\rightarrow I\ x
\end{array} $$

The curly braces around the nested proof (which is also indented for clarity) emphasize
that the temporary assumption that $p$ is true, labeled $x$, is only available within
that section of the proof. No conclusion within the braces should be referred to from
outside that section (just as you cannot access local variables from a block or function
definition when programming); at the end of the subproof, we extract the last conclusion
($q$) but only in the form of the implication $p\rightarrow q$&mdash;_if_ $p$ is true,
_then_ $q$ is also true.

Here is an example of a proof of the tautology (since a tautology may be viewed as an argument
with no premises) $p\land q\rightarrow q\land p$:

$$ \begin{array}{l|l}
\ell_1: p\land q\Rightarrow\{ & \\
\quad\ell_2: q & \land E_2\ \ell_1\\
\quad\ell_3: p & \land E_1\ \ell_1\\
\quad\ell_4: q\land p & \land I\ \ell_2, \ell_3\\
\}\\
\ell_5: p\land q\rightarrow q\land p & \rightarrow I\ \ell_1
\end{array} $$

Note that when the justification in step $\ell_5$ refers to $\ell_1$, it means the
entire subproof. However, the reference to $\ell_1$ in the justifications for $\ell_2$
and $\ell_3$ is to the premise $p$. The premise $p$ is only available within the braces,
as are each of the conclusions $\ell_2$ through $\ell_4$ which rely on that temporary
assumption. 

The analogy with defining a function taking the hypothesis $p$ as a parameter and returning
the conclusion $q$ is not accidental. The elimination rule, which you may recognize as our
old friend modus ponens, is very much like function application: if we have a proof of
$p\rightarrow q$, and we can also supply an argument that $p$ is true, then we may conclude
that $q$ is true. Just as a function body describes how to takes an argument passed in through
its parameter and compute a result, the subproof that establishes $p\rightarrow q$ tells us
how to take an argument (!) for $p$ and produce the extra steps needed to conclude $q$.

$$ \begin{array}{l}
x: p\rightarrow q\\
y: p\\ \hline\therefore
q, \quad\rightarrow E\ x,y
\end{array} $$

Here is a proof of the argument $p\rightarrow q\vdash p\rightarrow p\land q$:

$$ \begin{array}{l|l}
\ell_1: p\rightarrow q & \text{premise}\\
\ell_2: p\Rightarrow\{ & \\
\quad\ell_3: q & \rightarrow E\ \ell_1, \ell_2\\
\quad\ell_4: p\land q & \land I\ \ell_2, \ell_3\\
\}\\
\ell_5: p\rightarrow p\land q & \rightarrow I\ \ell_2
\end{array} $$

### Disjunction

To prove the disjunction $p\lor q$, it is enough to prove either $p$ or $q$
alone. This leads to two obvious introduction rules:

$$ \begin{array}{l}
x: p\\ \hline\therefore
p\lor q, \quad\lor I_1\ x
\end{array} $$

$$ \begin{array}{l}
x: q\\ \hline\therefore
p\lor q, \quad\lor I_2\ x
\end{array} $$

Here are two distinct proofs of the argument $p\land q\vdash p\lor q$:

Proof 1:
$$ \begin{array}{l|l}
\ell_1: p\land q & \text{premise}\\
\ell_2: p & \land E_1\ \ell_1\\
\ell_3: p\lor q & \lor I_1\ \ell_2
\end{array} $$

Proof 2:
$$ \begin{array}{l|l}
\ell_1: p\land q & \text{premise}\\
\ell_2: q & \land E_2\ \ell_1\\
\ell_3: p\lor q & \lor I_2\ \ell_2
\end{array} $$

Although they have the same premises and conclusions, these two proofs are
giving fundamentally different reasons why the conclusion follows from the
premise. Note that in the introduction rules for disjunction, one of the terms
in the disjunction appears "from nowhere". The argument in proof 1 could
equally well conclude $p\lor r$ from the premise $p\land q$, where $r$ could
be anything; however, the argument in proof 2 would allow us to conclude
instead $r\lor q$ for any proposition $r$.

This peculiar behavior of disjunction extends to the elimination rule. Whereas
the introduction rules appear to be duals of the elimination rules for conjunction,
the elimination rule for disjunction is significantly more complicated that just
a dual of the introduction for conjunction.[^Part of this complication is an
inherent asymmetry in deduction: while our arguments may have multiple premises,
they may only have one conclusion. A rule that was somehow "dual" to $\land I$
would need to have two conclusions. There is another formulation of logic, known
as the "sequent calculus" (see https://en.wikipedia.org/wiki/Sequent_calculus), where
arguments may have multiple conclusions, and this asymmetry disappears. However,
natural deduction has a cleaner connection to functional programming, as we will
see later on.] What we have is essentially a **case analysis**&mdash;to eliminate
an OR, we need to conduct two subproofs (just as in the $\rightarrow I$ rule), one
for each possible case. Here is the rule:

$$ \begin{array}{l}
x: p\lor q\\
y: p\Rightarrow\{\\
\quad\ldots\\
\quad r\\
\}\\
z: q\Rightarrow\{\\
\quad\ldots\\
\quad r\\
\}\\ \hline\therefore
r, \quad\lor E\ x, y, z
\end{array} $$

In words, this says that we have our disjunction, $p\lor q$, labeled $x$, plus two
nested subproofs, labeled $y$ and $z$ (as always, in an actual proof, these parts
may be laid out in any order, with other parts of the proof in between; however,
for readability it is suggested that the proof be structured just as shown). The
subproof $y$ concludes some proposition $r$ from the additional premise $p$, while
the subproof $z$ concludes the same $r$ from the alternate premise $q$. Since we
know that either $p$ or $q$ is true at this point in the proof, we are able to
conclude $r$ regardless of which it is.

Here is a proof that OR is commutative ($p\lor q\vdash q\lor p$):

$$ \begin{array}{l|l}
\ell_1: p\lor q & \text{premise}\\
\ell_2: p\Rightarrow\{\\
\quad\ell_3: q\lor p & \lor I_2\ \ell_2\\
\}\\
\ell_4: q\Rightarrow\{\\
\quad\ell_5: q\lor p & \lor I_1\ \ell_2\\
\}\\
\ell_6: q\lor p & \lor E\ \ell_1, \ell_2, \ell_4
\end{array} $$

### True and False

We may think of $\T$ as a conjunction of zero things: it is true whenever all of
those (zero) things are true, _i.e._, it is always true. Compare this with taking
the sum of an empty set of numbers: the result is 0, which is the identity for $+$,
just as $\T$ is the identity for $\land$. Using this analogy, we get one introduction
rule for $\T$ (with zero premises) and zero elimination rules:

$$ \begin{array}{l} \hline\therefore
\T, \quad\T I
\end{array} $$

In words, we may conclude $\T$ at any time with no premises. This is not generally
useful, but we include it for completeness.

Similarly, we may think of $\F$ as a disjunction of zero things, noting as above that
$\F$ is the identity for $\lor$. It is false unless at least one of those zero things
is true&hellip;. This suggests that we get zero introduction rules and
one elimination rule, which just has the premise $\F$ and zero nested subproofs:

$$ \begin{array}{l}
x: \F\\ \hline\therefore
r, \quad\F E\ x
\end{array} $$

That is, if we have a proof of $\F$, labeled $x$, then we can produce a proof of
any arbitrary proposition $r$! Logicians like to refer to this as _ex falso quodlibet_,
"from falsehood, anything." If your premises are consistent, you should never be able
to prove $\F$ at the top level of a proof; if you could do that, then you could use
this rule to prove anything whatsoever. This rule is useful in nested proofs (for
example in disjunction elimination, doing a case analysis), where if temporary
assumption leads to a contradiction then we can conclude anything in that subproof,
secure in the belief that that assumption will never actually be true.

Here is an example, where we validate the common argument that if we know that either
$p$ or $q$ is true, and we know that $p$ implies false, then $q$ must actually be true:

$$ \begin{array}{l|l}
\ell_1: p\lor q & \text{premise}\\
\ell_2: p\rightarrow\F & \text{premise}\\
\ell_3: p\Rightarrow\{\\
\quad\ell_4: \F & \rightarrow E\ \ell_2, \ell_3\\
\quad\ell_5: q & \F E\ \ell_4\\
\}\\
\ell_6: q\Rightarrow\{\\
\quad\ell_7: q & \ell_6\text{ (see below)}\\
\}\\
\ell_8: q & \lor E\ \ell_1, \ell_3, \ell_6
\end{array} $$

Note that step $\ell_7$ is justified by simply copying the proposition from $\ell_6$;
this will be discussed further in the [Miscellaneous](#miscellaneous) section below.

### Negation

Since $\lnot p\equiv p\rightarrow\F$, we could simply derive the rules for negation
from those for implication, specialized to the conclusion $\F$. However, it is
convenient to have rules explicitly to deal with negation, and there is an
additional rule for negation that does not fit the pattern of the rest of the rules
(see below).

Accordingly, here is the introduction rule for negation:

$$ \begin{array}{l}
x: p \Rightarrow\{\\
\quad\ldots\\
\quad \F\\
\}\\ \hline\therefore
\lnot p, \quad\lnot I\ x
\end{array} $$

In words, if we give a nested subproof that arrives at a contradiction (_i.e._,
a proof of $\F$) from the assumption that $p$ is true, then $p$ must actually
be false.

Similarly, here is the elimination rule for negation:

$$ \begin{array}{l}
x: \lnot p\\
y: p\\ \hline\therefore
\F, \quad\lnot E\ x,y
\end{array} $$

That is, one way to demonstrate a contradiction is to have proofs ($x$ and $y$)
of both $\lnot p$ and $p$. Compare these rules to $\rightarrow I$ and $\rightarrow E$,
and confirm that they are just the special case of rules for $p\rightarrow q$ where
$q$ is $\F$.

Using these, here is a proof of one direction of the equivalence between
$p\rightarrow q$ and its contrapositive $\lnot q\rightarrow\lnot p$:

$$ \begin{array}{l|l}
\ell_1: p\rightarrow q & \text{premise}\\
\ell_2: \lnot q\Rightarrow\{\\
\quad\ell_3: p\Rightarrow\{\\
\quad\quad\ell_4: q & \rightarrow E\ \ell_1, \ell_3\\
\quad\quad\ell_5: \F & \lnot E\ \ell_2, \ell_4\\
\quad\}\\
\quad\ell_6: \lnot p & \lnot I\ \ell_3\\
\}\\
\ell_7: \lnot q\rightarrow\lnot p & \rightarrow I\ \ell_2
\end{array} $$

If you try to prove the other direction of this equivalence, you will
have a surprisingly difficult time. In fact, it is possible to show that
there is _no_ proof of the argument $\lnot q\rightarrow\lnot p\vdash p\rightarrow q$
using the rules seen so far.[^Logicians have taken this observation and built an
entire system of logic known as **intuitionistic logic**, on the grounds that there
is something unusual with the rule of double negation elimination. As computer
scientists, this should actually make sense: if we think of a proof as showing how
to compute something, then all of the rest of the deduction rules are reasonable.
However, the double negation rule says that if we don't have a way of showing that
something is false, then somehow we get a proof that it is true&mdash;just because
we run a program and it doesn't print out the wrong answer doesn't mean that it
will print out the correct answer, because maybe the program will never print out
an answer at all!] The closest you will be able to get starting from
the premise $\lnot q\rightarrow\lnot p$ is to conclude $p\rightarrow\lnot\lnot q$:

$$ \begin{array}{l|l}
\ell_1: \lnot q\rightarrow\lnot p & \text{premise}\\
\ell_2: p\Rightarrow\{\\
\quad\ell_3: \lnot q\Rightarrow\{\\
\quad\quad\ell_4: \lnot p & \rightarrow E\ \ell_1, \ell_3\\
\quad\quad\ell_5: \F & \lnot E\ \ell_4, \ell_2\\
\quad\}\\
\quad\ell_6: \lnot\lnot q & \lnot I\ \ell_3\\
\}\\
\ell_7: p\rightarrow\lnot\lnot q & \rightarrow I\ \ell_2
\end{array} $$

Although you may be tempted to just erase the double negation, in a formal proof you
need to justify every step, and it turns out that we do not have any way yet to
prove $\lnot\lnot q\vdash q$! Therefore, the very last rule we will add (apart from
wrapping up some loose ends in the next section) is the rule of double negation
elimination:

$$ \begin{array}{l}
x: \lnot\lnot p\\ \hline\therefore
p, \quad\lnot\lnot E\ x
\end{array} $$

With this additional rule, we may finish the proof of the equivalence of the
contrapositive:

$$ \begin{array}{l|l}
\ell_1: \lnot q\rightarrow\lnot p & \text{premise}\\
\ell_2: p\Rightarrow\{\\
\quad\ell_3: \lnot q\Rightarrow\{\\
\quad\quad\ell_4: \lnot p & \rightarrow E\ \ell_1, \ell_3\\
\quad\quad\ell_5: \F & \lnot E\ \ell_4, \ell_2\\
\quad\}\\
\quad\ell_6: \lnot\lnot q & \lnot I\ \ell_3\\
\quad\ell_7: q & \lnot\lnot E\ \ell_6\\
\}\\
\ell_8: p\rightarrow q & \rightarrow I\ \ell_2
\end{array} $$

### Miscellaneous

As mentioned above, it is sometimes useful in a proof to repeat
a proposition from earlier (always remembering that we do not
have access to propositions from nested proofs from the outside).
This leads to the trivial rule

$$ \begin{array}{l}
x: p\\ \hline\therefore
p, \quad x
\end{array} $$

The justification for $p$ is simply the label of the previous line
where $p$ was established.

Here is an example of using this to prove the tautology $p\rightarrow p$:

$$ \begin{array}{l|l}
\ell_1: p\Rightarrow\{\\
\quad\ell_2: p & \ell_1\\
\}\\
\ell_3: p\rightarrow p & \rightarrow I\ \ell_1
\end{array} $$

As another convenience, once we have proven the validity of some
argument $p_1,\ldots,p_n\vdash q$, we may reuse that proof in
future proofs as if it were another deduction rule:

$$ \begin{array}{l}
x_1: p_1\\
\ldots\\
x_n: p_n\\ \hline\therefore
q, \quad (p_1,\ldots,p_n\vdash q)\ x_1,\ldots,x_n
\end{array} $$

Instead of citing the argument like that in the justification, it
is common to give names to useful results (such as the modus tollens
and syllogism arguments discussed earlier). Also note that we may
perform any consistent substitution for the propositional variables
in the argument.

As an example, here is a use of the modus tollens law,
$p\rightarrow q, \lnot q\vdash\lnot p$, to prove an extended version:

$$ \begin{array}{l|l}
\ell_1: p\rightarrow q & \text{premise}\\
\ell_2: q\rightarrow r & \text{premise}\\
\ell_3: \lnot r & \text{premise}\\
\ell_4: \lnot q & \text{modus tollens}\ \ell_2, \ell_3\\
\ell_5: \lnot p & \text{modus tollens}\ \ell_1, \ell_4
\end{array} $$

Given a proof of the law of syllogism,
$p\rightarrow q, q\rightarrow r\vdash p\rightarrow r$, we could also
prove the above as follows:

$$ \begin{array}{l|l}
\ell_1: p\rightarrow q & \text{premise}\\
\ell_2: q\rightarrow r & \text{premise}\\
\ell_3: p\rightarrow r & \text{syllogism}\ \ell_1, \ell_2\\
\ell_4: \lnot r & \text{premise}\\
\ell_5: \lnot p & \text{modus tollens}\ \ell_3, \ell_4
\end{array} $$

In programming terms, using an already proven theorem like this is
analogous to calling an already written function out of a library.

### Summary of Natural Deduction Rules

---
**Conjunction:**

$$ \begin{array}{ll|ll|l}
x: p & \qquad & & \qquad & \\
y: q & & x: p\land q & & x: p\land q\\ \hline
\therefore p\land q, \quad\land I\ x, y & & \therefore p, \quad\land E_1\ x & & \therefore q, \quad\land E_2\ x
\end{array} $$

---
**Implication, Reference:**

$$ \begin{array}{ll|ll|l}
x: p \Rightarrow\{ & \qquad & & \qquad & \\
\quad\ldots\\
\quad q & & x: p\rightarrow q\\
\} & & y: p & & x: p\\ \hline
\therefore p\rightarrow q, \quad\rightarrow I\ x & & \therefore q, \quad\rightarrow E\ x,y & & \therefore p, \quad x
\end{array} $$

---
**Disjunction:**

$$ \begin{array}{ll|ll|l}
& \qquad & & \qquad & x: p\lor q\\
& & & & y: p\Rightarrow\{\\
& & & & \quad\ldots\\
& & & & \quad r\\
& & & & \}\\
& & & & z: q\Rightarrow\{\\
& & & & \quad\ldots\\
& & & & \quad r\\
x: p & & x: q & & \}\\ \hline
\therefore p\lor q, \quad\lor I_1\ x & & \therefore p\lor q, \quad\lor I_2\ x & & \therefore r, \quad\lor E\ x, y, z
\end{array} $$

---
**True, False, Theorem:**

$$ \begin{array}{ll|ll|l}
& \qquad & & \qquad & x_1: p_1\\
& & & & \ldots\\
& & x: \F & & x_n: p_n\\ \hline
\therefore\T, \quad\T I & & \therefore r, \quad\F E\ x & & \therefore q, \quad (p_1,\ldots,p_n\vdash q)\ x_1,\ldots,x_n
\end{array} $$

---
**Negation:**

$$ \begin{array}{ll|ll|l}
x: p \Rightarrow\{ & \qquad & & \qquad & \\
\quad\ldots\\
\quad \F & & x: \lnot p\\
\} & & y: p & & x: \lnot\lnot p\\ \hline
\therefore\lnot p, \quad\lnot I\ x & & \therefore\F, \quad\lnot E\ x,y & & \therefore p, \quad\lnot\lnot E\ x
\end{array} $$

## Invalid Arguments

Of course, not every argument is valid, so the question also
arises, how can we show that an argument is invalid?  Let's
assume that the argument has been put into general form, with
all the specific propositions replaced by propositional variables.
The argument is valid if in all cases where all the premises are
true, the conclusion is also true.  The argument is invalid if
there is even one case where all the premises are true and the
conclusion is false.  We can prove that an argument is invalid
by finding an assignment of truth values to the propositional variables
which makes all the premises true but makes the conclusion false.
For example, consider an argument of the form:

$$
\begin{array}{l}
p\rightarrow q\\
q\rightarrow (p\land r)\\
r\\ \hline\therefore
p
\end{array}
$$

In the case where $p$ is false, $q$ is false, and $r$ is true,
the three premises of this argument are all true, but the conclusion
is false.  This shows that the argument is invalid.

## Example

To apply all this to arguments stated in English, we have to
introduce propositional variables to represent all the propositions
in the argument.  For example, consider:

> John will be at the party if Mary is there and Bill is not there.
Mary will be at the party if it's on Friday or Saturday.
If Bill is at the party, Tom will be there.  Tom won't be at
the party if it's on Friday.  The party is on Friday.
Therefore, John will be at the party.

Let $j$ stand for "John will be at the party," $m$ for
"Mary will be there," $b$ for "Bill will be there,"
$t$ for "Tom will be there," $f$ for "The party is on Friday,"
and $s$ for "The party is on Saturday."  Then this argument has
the form

$$
\begin{array}{l}
(m\land \lnot b)\rightarrow j\\
(f\lor s)\rightarrow m\\
b\rightarrow t\\
f\rightarrow \lnot t\\
f\\ \hline\therefore
j
\end{array}
$$

This is a valid argument, as the following proof shows:
$$ \begin{array}{l|l}
\ell_1: f\rightarrow\lnot t & \text{premise}\\
\ell_2: f & \text{premise}\\
\ell_3: \lnot t & \rightarrow E\ \ell_1, \ell_2\\
\ell_4: b\rightarrow t & \text{premise}\\
\ell_5: \lnot b & \text{modus tollens}\ \ell_4, \ell_3\\
\ell_6: f\lor s & \lor I_1\ \ell_2\\
\ell_7: (f\lor s)\rightarrow m & \text{premise}\\
\ell_8: m & \rightarrow E\ \ell_7, \ell_6\\
\ell_9: m\land\lnot b & \land I\ \ell_8, \ell_5\\
\ell_{10}: (m\land\lnot b)\rightarrow j & \text{premise}\\
\ell_{11}: j & \rightarrow E\ \ell_{10}, \ell_9
\end{array} $$

## Predicate Logic

So far in this section, we have been working mostly with propositional
logic.  But the definitions of valid argument and logical deduction
apply to predicate logic as well.  One of the most basic rules of
deduction in predicate logic says that $(\forall xP(x))\vdash P(a)$
for any entity $a$ in the domain of discourse of the predicate $P$.
That is, if a predicate is true of all entities, then it is true of
any given particular entity.  This rule can be combined with 
rules of deduction for propositional logic to give the following
valid arguments

$$ \begin{array}{l}
\forall x(P(x)\rightarrow Q(x))\\
P(a)\\ \hline\therefore
Q(a)
\end{array} $$

$$ \begin{array}{l}
\forall x(P(x)\rightarrow Q(x))\\
\lnot Q(a)\\ \hline\therefore
\lnot P(a)
\end{array} $$

These valid arguments go by the names of _modus ponens_ and
_modus tollens_ for predicate logic.
Note that from the premise $\forall x(P(x)\rightarrow Q(x))$ we can deduce
$P(a)\rightarrow Q(a)$.  From this and from the premise that $P(a)$, we
can deduce $Q(a)$ by _modus ponens_.  So the first argument
above is valid.  The second argument is similar, using 
_modus tollens_.

The most famous logical deduction of them all is an application
of _modus ponens_ for predicate logic:

$$ \begin{array}{l}
\text{All humans are mortal}\\
\text{Socrates is human}\\ \hline\therefore
\text{Socrates is mortal}
\end{array} $$

This has the form of _modus ponens_ with $P(x)$ standing
for "$x$ is human," $Q(x)$ standing for "$x$ is mortal," and
$a$ standing for the noted entity, Socrates.

There is a lot more to say about logical deduction and
proof in predicate logic, and we'll spend the rest of this chapter
on the subject.

## Exercises

1. Verify the validity of _modus tollens_ and the Law of
Syllogism.

2. Each of the following is a valid rule of deduction.
For each one, give an example of a valid argument in English that
uses that rule.

$$ \begin{array}{l}
p\lor q\\
\lnot p\\ \hline\therefore
q
\end{array} $$

$$ \begin{array}{l}
p\\
q\\ \hline\therefore
p\land q
\end{array} $$

$$ \begin{array}{l}
p\land q\\ \hline\therefore
p
\end{array} $$

$$ \begin{array}{l}
p\\ \hline\therefore
p\lor q
\end{array} $$

3. There are two notorious invalid arguments that look
deceptively like _modus ponens_ and _modus tollens_:

$$ \begin{array}{l}
p\rightarrow q\\
q\\ \hline\therefore
p
\end{array} $$

$$ \begin{array}{l}
p\rightarrow q\\
\lnot p\\ \hline\therefore
\lnot q
\end{array} $$

Show that each of these arguments is invalid.  Give an English
example that uses each of these arguments.

4. Decide whether each of the following arguments is valid.
If it is valid, give a formal proof.  If it is invalid, show that
it is invalid by finding an appropriate assignment of truth values
to propositional variables.

   1. $$ \begin{array}{l}
   p\rightarrow q\\
   q\rightarrow s\\ \hline\therefore
   p
   \end{array} $$

   2. $$ \begin{array}{l}
   p\land q\\
   q\rightarrow (r\lor s)\\
   \lnot r\\ \hline\therefore
   s
   \end{array} $$
   
   3. $$ \begin{array}{l}
   p\lor q\\
   q\rightarrow (r\land s)\\
   \lnot p\\ \hline\therefore
   s
   \end{array} $$
   
   4. $$ \begin{array}{l}
   (\lnot p)\rightarrow t\\
   q\rightarrow s\\
   r\rightarrow q\\
   \lnot(q\lor t)\\ \hline\therefore
   p
   \end{array} $$
   
   5. $$ \begin{array}{l}
   p\\
   s\rightarrow r\\
   q\lor r\\
   q\rightarrow\lnot p\\ \hline\therefore
   \lnot s
   \end{array} $$
   
   6. $$ \begin{array}{l}
   q\rightarrow t\\
   p\rightarrow(t\rightarrow s)\\
   p\\ \hline\therefore
   q\rightarrow s
   \end{array} $$

5. For each of the following English arguments, express the
argument in terms of propositional logic and determine whether the
argument is valid or invalid.

   * If it is Sunday, it rains or snows.  Today, it is Sunday
and it's not raining.  Therefore, it must be snowing.

   * If there are anchovies on the pizza, Jack won't eat it.
If Jack doesn't eat pizza, he gets angry.  Jack is angry.
Therefore, there were anchovies on the pizza.

   * At 8:00, Jane studies in the library or works at home.
It's 8:00 and Jane is not studying in the library.  So she must
be working at home.
