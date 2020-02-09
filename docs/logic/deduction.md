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
\begin{array}{ll}
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

$$ \begin{array}{ll}
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

$$ \begin{array}{ll}
\ell_1: p\land q & \text{premise}\\
\ell_2: q & \land E_2\ \ell_1\\
\ell_3: p & \land E_1\ \ell_1\\
\ell_4: q\land p & \land I\ \ell_2, \ell_3
\end{array} $$

Note that we used the second elimination rule in step $\ell_2$ and the first in $\ell_3$,
to extract respectively the second and the first terms of the conjunction. Here is an
equivalent proof using the rules in the other order:

$$ \begin{array}{ll}
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

$$ \begin{array}{ll}
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

$$ \begin{array}{ll}
\ell_1: p\rightarrow q & \text{premise}\\
\ell_2: p\Rightarrow\{ & \\
\quad\ell_3: q & \rightarrow E\ \ell_1, \ell_2\\
\quad\ell_4: p\land q & \land I\ \ell_2, \ell_3\\
\}\\
\ell_5: p\rightarrow p\land q & \rightarrow I\ \ell_2
\end{array} $$

### Disjunction

### Negation

### Miscellaneous

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

EDITING IN PROGRESS

This is a valid argument, as the following proof shows:
\begin{center}
  \begin{tabular}{r@{\ \ }l@{\qquad}l}
     1.&$f\rightarrow\lnot t$&premise\\
     2.&$f$&premise\\
     3.&$\lnot t$&from 1 and 2 (\textit{modus ponens})\\
     4.&$b\rightarrow t$&premise\\
     5.&$\lnot b$&from 4 and 3 (\textit{modus tollens})\\
     6.&$f\lor s$&from 2\\
     7.&$(f\lor s)\rightarrow m$&premise\\
     8.&$m$&from 6 and 7 (\textit{modus ponens})\\
     9.&$m\land\lnot b$&from 8 and 5\\
     10.&$(m\land\lnot b)\rightarrow j$&premise\\
     11.&$j$&from 10 and 9 (\textit{modus ponens})\\
  \end{tabular}
\end{center}

\medskip

So far in this section, we have been working mostly with propositional
logic.  But the definitions of valid argument and logical deduction
apply to predicate logic as well.  One of the most basic rules of
deduction in predicate logic says that $(\forall xP(x))\vdash P(a)$
for any entity $a$ in the domain of discourse of the predicate $P$.
That is, if a predicate is true of all entities, then it is true of
any given particular entity.  This rule can be combined with 
rules of deduction for propositional logic to give the following
valid arguments
\begin{center}
\mbox{
\argument{$\forall x(P(x)\rightarrow Q(x))$\\$P(a)$}{$Q(a)$}\qquad\qquad
\argument{$\forall x(P(x)\rightarrow Q(x))$\\$\lnot Q(a)$}{$\lnot P(a)$}
}
\end{center}
These valid arguments go by the names of \textit{modus ponens}\index{modus ponens} and
\textit{modus tollens}\index{modus tollens} for predicate logic.
Note that from the premise $\forall x(P(x)\rightarrow Q(x))$ we can deduce
$P(a)\rightarrow Q(a)$.  From this and from the premise that $P(a)$, we
can deduce $Q(a)$ by \textit{modus ponens}.  So the first argument
above is valid.  The second argument is similar, using 
\textit{modus tollens}.

The most famous logical deduction of them all is an application
of \textit{modus ponens} for predicate logic:
\begin{center}
\argument{All humans are mortal\\Socrates is human}{Socrates is mortal}
\end{center}
This has the form of \textit{modus ponens} with $P(x)$ standing
for "$x$ is human," $Q(x)$ standing for "$x$ is mortal," and
$a$ standing for the noted entity, Socrates.

There is a lot more to say about logical deduction and
proof in predicate logic, and we'll spend the rest of this chapter
on the subject.

\begin{exercises}

\problem Verify the validity of \textit{modus tollens} and the Law of
Syllogism.

\problem Each of the following is a valid rule of deduction.
For each one, give an example of a valid argument in English that
uses that rule.
\begin{center}
\mbox{\qquad
\argument{$p\lor q$\\$\lnot p$}{$q$}\qquad
\argument{$p$\\$q$}{$p\land q$}\qquad
\argument{$p\land q$}{$p$}\qquad
\argument{$p$}{$p\lor q$}
}
\end{center}

\problem There are two notorious invalid arguments that look
deceptively like \textit{modus ponens} and \textit{modus tollens}:
\begin{center}
\mbox{\qquad
\argument{$p\rightarrow q$\\$q$}{$p$}\qquad
\argument{$p\rightarrow q$\\$\lnot p$}{$\lnot q$}\qquad
}
\end{center}
Show that each of these arguments is invalid.  Give an English
example that uses each of these arguments.

\problem Decide whether each of the following arguments is valid.
If it is valid, give a formal proof.  If it is invalid, show that
it is invalid by finding an appropriate assignment of truth values
to propositional variables.
\smallskip
\tparts{
   \argument{$p\rightarrow q$\\$q\rightarrow s$\\$s$}{$p$}&
   \argument{$p\land q$\\$q\rightarrow (r\lor s)$\\$\lnot r$}{$s$}&
   \argument{$p\lor q$\\$q\rightarrow (r\land s)$\\$\lnot p$}{$s$}\cr\noalign{\smallskip}
   \argument{$(\lnot p)\rightarrow t$\\$q\rightarrow s$\\$r\rightarrow q$\\$\lnot(q\lor t)$}{$p$}&
   \argument{$p$\\$s\rightarrow r$\\$q\lor r$\\$q\rightarrow\lnot p$}{$\lnot s$}&
   \argument{$q\rightarrow t$\\$p\rightarrow(t\rightarrow s)$\\$p$}{$q\rightarrow s$}
}


\problem For each of the following English arguments, express the
argument in terms of propositional logic and determine whether the
argument is valid or invalid.
\ppart If it is Sunday, it rains or snows.  Today, it is Sunday
and it's not raining.  Therefore, it must be snowing.
\ppart If there are anchovies on the pizza, Jack won't eat it.
If Jack doesn't eat pizza, he gets angry.  Jack is angry.
Therefore, there were anchovies on the pizza.
\ppart At 8:00, Jane studies in the library or works at home.
It's 8:00 and Jane is not studying in the library.  So she must
be working at home.



\end{exercises}
