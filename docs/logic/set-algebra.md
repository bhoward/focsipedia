---
id: set-algebra
title: Boolean Algebra of Sets
---
import useBaseUrl from '@docusaurus/useBaseUrl';

(Content adapted from Critchlow & Eck)

It is clear that set theory is closely related to logic.
The intersection\index{intersection} and union\index{union}
of sets can be defined in terms of the logical ``and''\index{and (logical operator)}
and logical ``or''\index{or (logical operator)} operators.
The notation $\{x\st P(x)\}$ makes it possible to use predicates
to specify sets.  And if $A$ is any set, then the formula
$x\in A$ defines a one place predicate that is true for an entity $x$
if and only if $x$ is a member of~$A$.  So it should not be a
surprise that many of the rules of logic have analogs in
set theory.

For example, we have already noted that $\cup$ and $\cap$ are
commutative operations.   This fact can be verified using the
rules of logic.  Let $A$ and $B$ be sets.  According to the definition 
of equality of sets, we can show that $A\cup B=B\cup A$ by showing
that $\forall x\,\big((x\in A\cup B)\IFF(x\in B\cup A)\big)$.
But for any $x$,
\begin{align*}
x\in A\cup B &\IFF x\in A \OR x\in B  &&\text{(definition of $\cup$)}\\
             &\IFF x\in B \OR x\in A  &&\text{(commutativity of $\OR$)}\\
             &\IFF x\in B \cup A      &&\text{(definition of $\cup$)}
\end{align*}
The commutativity of $\cap$ follows in the same way from the
definition of $\cap$ in terms of~$\AND$ and the commutativity of~$\AND$,
and a similar argument shows that union and intersection are
associative operations.

The distributive laws for propositional logic give rise to two
similar rules in set theory.  Let $A$, $B$, and $C$ be any sets.
Then
\begin{align*}
A\cup(B\cap C)&=(A\cup B)\cap(A\cup C)\\
\intertext{and}
A\cap(B\cup C)&=(A\cap B)\cup(A\cap C)
\end{align*}
These rules are called the distributive laws\index{distributive law} for
set theory.  To verify the first of these laws, we just have to
note that for any~$x$,
\begin{align*}
x\in A&\cup(B\cap C) \\
                    &\IFF (x\in A)\OR((x\in B)\AND (x\in C))  
                              &&\text{(definition of $\cup$, $\cap$)}\\
                    &\IFF ((x\in A)\OR(x\in B)) \AND((x \in A)\OR (x\in C))
                              &&\text{(distributivity of $\OR$)}\\
                    &\IFF (x\in A\cup B) \AND (x \in A\cup C)
                              &&\text{(definition of $\cup$)}\\
                    &\IFF x\in ((A\cup B)\cap(A\cup C))
                              &&\text{(definition of $\cap$)}
\end{align*}
The second distributive law for sets follows in exactly the
same way.

\medbreak

While $\cup$ is analogous to $\OR$ and $\cap$ is analogous to
$\AND$, we have not yet seen any operation is set theory that
is analogous to the logical ``not'' operator,$\NOT$.  Given a
set $A$, it is tempting to try to define $\{x\st \NOT(x\in A)\}$,
the set that contains everything that does not belong to~$A$. 
Unfortunately, the rules of set theory do not allow us to define 
such a set.  The notation $\{x\st P(x)\}$ can only be used when
the domain of discourse of $P$ is a set, so there must be an underlying
set from which the elements that are/are not in $A$ are chosen,
i.e. some underlying set of which $A$ is a subset.  We can get around
this problem by restricting the discussion to subsets of
some fixed set.  This set will be known as the \nw{universal set}.
Keep in mind that the universal set is only universal for some
particular discussion.  It is simply some set that is large 
enough to contain all the sets under discussion as subsets.
Given a universal set $U$ and any subset $A$ of $U$,
we can define the set $\{x\in U\st \NOT(x\in A)\}$.

\begin{definition}
Let $U$ be a given universal set, and let $A$ be any subset
of $U$.  We define the \nw{complement} of $A$ in $U$ to be the
set $\overline{A}$ that is defined by $\overline{A}=\{x\in U\st x\not\in A\}$.
\end{definition}

Usually, we will refer to the complement of $A$ in $U$ simply as
the complement of $A$, but you should remember that whenever complements
of sets are used, there must be some universal set in the background.

Given the complement operation on sets, we can look for
analogs to the rules of logic that involve negation.
For example, we know that $p\AND\NOT p=\F$ for any
proposition~$p$.  It follows that for any subset $A$ of $U$,
\begin{align*}
A\cap\overline{A} &= \{x\in U\st (x\in A)\AND (x\in \overline{A})\}
                        &&\text{(definition of $\cap$)}\\
                  &= \{x\in U\st (x\in A)\AND (x\not\in A)\}
                        &&\text{(definition of complement)}\\
                  &= \{x\in U\st (x\in A)\AND \NOT(x\in A)\}
                        &&\text{(definition of $\not\in$)}\\
                  &= \emptyset
\end{align*}
the last equality following because the proposition $(x\in A)\AND \NOT(x\in A)$ is false for
any $x$.  Similarly, we can show that
$A\cup\overline{A}=U$ and that $\overline{\overline{A}}=A$
(where $\overline{\overline{A}}$ is the complement of the
complement of $A$, that is, the set obtained by taking the
complement of~$\overline{A}$.)

The most important laws for working with complements of sets
are DeMorgan's Laws\index{DeMorgan's Laws} for sets.  These
laws, which follow directly from DeMorgan's Laws for logic, state
that for any subsets $A$ and $B$ of a universal set~$U$,
\begin{align*}
\overline{A\cup B}&=\overline{A}\cap\overline{B}\\
\intertext{and}
\overline{A\cap B}&=\overline{A}\cup\overline{B}
\end{align*}
For example, we can verify the first of these laws with the calculation
\begin{align*}
\overline{A\cup B}&= \{x\in U\st x \not\in (A\cup B)\}
                       &&\text{(definition of complement)}\\
                  &= \{x\in U\st \NOT( x\in A\cup B)\}
                       &&\text{(definition of $\not\in$)}\\
                  &= \{x\in U\st \NOT(x\in A \OR x\in B)\}
                       &&\text{(definition of $\cup$)}\\
                  &= \{x\in U\st (\NOT(x\in A))\AND(\NOT(x\in B))\}
                       &&\text{(DeMorgan's Law for logic)}\\
                  &= \{x\in U\st (x\not\in A) \AND (x\not\in B)\}
                       &&\text{(definition of $\not\in$)}\\
                  &= \{x\in U\st (x\in\overline{A}) \AND (x\in\overline{B})\}
                       &&\text{(definition of complement)}\\
                  &= \overline{A}\cap\overline{B}
                       &&\text{(definition of $\cap$)}
\end{align*}


\fig{F-setboole}
  {Some Laws of Boolean Algebra for sets.  $A$, $B$, and $C$ are
  sets.  For the laws that involve the complement operator, 
  they are assumed to be subsets of some universal set,~$U$.
  For the most part, these laws correspond directly to laws
  of Boolean Algebra for propositional logic as given in
  Figure~\ref{F-boole1}.}
  {\begin{tabular}{|l|l|}
      \hline
      \strut Double complement&   \bigstrut$\overline{\overline{A}}=A$\\
      \hline
      \strut Miscellaneous laws&   $A\cup\overline{A}=U$\\
      \strut&    $A\cap\overline{A}=\emptyset$\\
      \strut&    $\emptyset\cup A=A$\\
      \strut&    $\emptyset\cap A=\emptyset$\\
      \hline
      \strut Idempotent laws&    $A\cap A= A$\\
      \strut&                   $A\cup A= A$\\
      \hline
      \strut Commutative laws&   $A\cap B = B\cap A$\\
      \strut&                   $A\cup B=B\cup A$\\
      \hline
      \strut Associative laws&   $A\cap (B\cap C) = (A\cap B)\cap C$\\
      \strut&                   $A\cup (B\cup C) = (A\cup B)\cup C$\\
      \hline
      \strut Distributive laws&  $A\cap(B\cup C) = (A\cap B)\cup (A\cap C)$\\
      \strut&                   $A\cup (B\cap C) = (A\cup B)\cap (A\cup C)$\\
      \hline
      \strut DeMorgan's laws&   $\overline{A\cap B} = \overline{A}\cup\overline{B}$\\
      \strut&                   $\overline{A\cup B} = \overline{A}\cap\overline{B}$\\
      \hline
   \end{tabular}
  }

\medbreak

An easy inductive proof
can be used to verify generalized versions of DeMorgan's Laws
for set theory.  
(In this context, all sets are assumed to be subsets of some unnamed
universal set.)  A simple calculation verifies DeMorgan's
Law for three sets:
\begin{align*}
   \overline{A\cup B\cup C}&=\overline{(A\cup B)\cup C}\\
             &=\overline{(A\cup B)}\cap\overline{C} &\text{(by DeMorgan's Law for two sets)}\\
             &=(\overline{A}\cap\overline{B})\cap\overline{C} &\text{(by DeMorgan's Law for two sets)}\\
             &=\overline{A}\cap\overline{B}\cap\overline{C}
\end{align*}
From there, we can derive similar laws for four sets, five sets, and
so on.  However, just saying ``and so on'' is not a rigorous
proof of this fact.  Here is a rigorous inductive proof of a generalized
DeMorgan's Law:

\begin{theorem}
For any natural number $n\geq 2$ and for any sets $X_1$, $X_2$, \dots, $X_n$,
\[\overline{X_1\cup X_2\cup \cdots \cup X_n} =
     \overline{X_1} \cap \overline{X_2} \cap\cdots\cap \overline{X_2}\]
\end{theorem}
\begin{proof}
We give a proof by induction.  In the base case, $n=2$, the
statement is that $\overline{X_1\cup X_2}=\overline{X_1}\cap\overline{X_n}$.
This is true since it is just an application of DeMorgan's law for two sets.

For the inductive case, suppose that the statement is true for $n=k$.
We want to show that it is true for $n=k+1$. Let $X_1$, $X_2$, 
\dots, $X_{k+1}$ be any $k$ sets.  Then we have:
\begin{align*}
   \overline{X_1\cup X_2\cup \cdots \cup X_{k+1}}
        &= \overline{(X_1\cup X_2\cup \cdots \cup X_k) \cup X_{k+1}}\\
        &= \overline{(X_1\cup X_2\cup \cdots \cup X_k)}\cap\overline{X_{k+1}}\\
        &= (\overline{X_1}\cap\overline{X_2}\cap\cdots\cap\overline{X_k})\cap\overline{X_{k+1}}\\
        &= \overline{X_1}\cap\overline{X_2}\cap\cdots\cap\overline{X_{k+1}}
\end{align*}
In this computation, the second step follows by DeMorgan's Law for
two sets, while the third step follows from the induction hypothesis.
\end{proof}

Just as the laws of logic allow us to do algebra with logical formulas,
the laws of set theory allow us to do algebra\index{algebra} with sets.
Because of the close relationship between logic and set theory,
their algebras are very similar.  The algebra of sets,
like the algebra of logic, is Boolean algebra.\index{Boolean algebra!in set theory}
When George Boole wrote his 1854 book about logic, it was really as
much about set theory as logic.  In fact, Boole did not make a
clear distinction between a predicate and the set of objects
for which that predicate is true.  His algebraic laws and formulas
apply equally to both cases.  More exactly, if we consider only
subsets of some given universal set $U$, then there is a direct
correspondence between the basic symbols and operations of propositional
logic and certain symbols and operations in set theory, as shown in this
table:

\begin{center}
   \begin{tabular}{|c|c|}
      \hline
      \strut \textbf{Logic}& \textbf{Set Theory}\cr
      \hline
      \strut $\T$& $U$\cr
      \strut $\F$& $\emptyset$\cr
      \strut $p\AND q$& $A\cap B$\cr
      \strut $p\OR q$& $A\cup B$\cr
      \strut $\NOT p$& $\overline{A}$\cr
      \hline
   \end{tabular}
\end{center}

\noindent Any valid logical formula or computation involving
propositional variables and the symbols $\T$, $\F$, $\AND$, $\OR$,
and~$\NOT$ can be transformed into a valid formula or computation in
set theory by replacing the propositions in the formula with subsets of $U$ and
replacing the logical symbols with $U$, $\emptyset$, $\cap$, $\cup$, and the
complement operator.  

Just as in logic, the operations of set theory can be combined
to form complex expressions such as $(A\cup C)\cap\overline{(B\cup \overline{C} \cup D)}$.
Parentheses can always be used in such expressions to specify the
order in which the operations are to be performed.  In the absence of
parentheses, we need precedence\index{precedence rule} rules to determine
the order of operation.  The precedence rules for the Boolean algebra
of sets are carried over directly from the Boolean algebra of
propositions.  When union and intersection are used together without
parentheses, intersection has precedence over union.  Furthermore,
when several operators of the same type are used without parentheses,
then they are evaluated in order from left to right.
(Of course, since $\cup$ and $\cap$ are both associative operations,
it really doesn't matter whether the order of evaluation is left-to-right
or right-to-left.)  For example, $A\cup B\cap C \cup D$ is evaluated as 
$(A\cup((B\cap C))\cup D$.  The complement operation is a special case.
Since it is denoted by drawing a line over its operand, there is
never any ambiguity about which part of a formula it applies to.

The laws of set theory can be used to simplify complex expressions
involving sets.  (As usual, of course, the meaning of ``simplification'' is
partly in the eye of the beholder.)  For example, for any sets $X$
and~$Y$,
\begin{align*}
(X\cup Y)\cap(Y\cup X)&=(X\cup Y)\cap(X\cup Y) &&\text{(Commutative Law)}\\
                      &=(X\cup Y)              &&\text{(Idempotent Law)}
\end{align*}
where in the second step, the Idempotent Law, which says that
$A\cap A=A$, is applied with $A=X\cup Y$.  For expressions that
use the complement operation, it is usually considered to be simpler
to apply the operation to an individual set, as in~$\overline{A}$,
rather than to a formula, as in $\overline{A\cap B}$.  DeMorgan's
Laws can always be used to simplify an expression in which the 
complement operation is applied to a formula.  For example,
\begin{align*}
A\cap \overline{B\cup\overline{A}}
        &= A\cap (\overline{B}\cap\overline{\overline{A}})   && \text{(DeMorgan's Law)}\\
        &= A\cap (\overline{B}\cap A)   && \text{(Double Complement)}\\
        &= A\cap (A\cap\overline{B})    && \text{(Commutative Law)}\\
        &= (A\cap A)\cap \overline{B})  && \text{(Associative Law)}\\
        &= A \cap \overline{B}          && \text{(Idempotent Law)}
\end{align*}

\medbreak

As a final example of the relationship between set theory and logic,
consider the set-theoretical expression $A\cap (A\cup B)$ and
the corresponding compound proposition $p\AND(p\OR q)$.  (These
correspond since for any $x$, $x\in A\cap(A\cup B) \equiv
(x\in A)\AND ((x\in A)\OR (x\in B))$.)  You might find it intuitively
clear that $A\cap(A\cup B)=A$.  Formally, this follows from the
fact that $p\AND(p\OR q)\equiv p$, which might be less intuitively
clear and is surprising difficult to prove algebraically from the laws
of logic.  However, there is another way to check that a logical
equivalence is valid: Make a truth table.  Consider a truth table
for $p\AND(p\OR q)$:
   \begin{center}
     \begin{tabular}{|c|c||c|c|}
        \hline
        $p$& $q$& $p\OR q$& $p\AND (p\OR q)$\\
        \hline
        \strut 
        false&  false&  false&  false\\
        false&  true&   true&   false \\
        true&   false&  true&   true \\
        true&   true&   true&   true  \\
        \hline
      \end{tabular}
   \end{center}
The fact that the first column and the last column of this table are
identical shows that $p\AND(p\OR q)\equiv p$.  Taking $p$ to 
be the proposition $x\in A$ and $q$ to be the proposition $x\in B$,
it follows that the sets $A$ and $A\cap (A\cup B)$ have the same
members and therefore are equal.


\begin{exercises}

\problem Use the laws of logic to verify the associative laws for
union and intersection.  That is, show that if $A$, $B$, and $C$ are
sets, then $A\cup(B\cup C)= (A\cup B)\cup C$ and
$A\cap(B\cap C)= (A\cap B)\cap C$.

\problem Show that for any sets $A$ and $B$, $A\SUB A\cup B$
and $A\cap B\SUB A$.

\problem Recall that the symbol $\XOR$ denotes the logical
exclusive or operation.  If $A$ and $B$ sets, define the
set $A\bigtriangleup B$ by $A\bigtriangleup B = \{x\st (x\in A)\XOR (x\in B)\}$.
Show that $A\bigtriangleup B = (A\SETDIFF B)\cup(B\SETDIFF A)$.
($A\bigtriangleup B$ is known as the \nw{symmetric difference} of
$A$ and $B$.)

\problem Let $A$ be a subset of some given universal set $U$.
Verify that $\overline{\overline{A}}=A$ and that
$A\cup\overline{A}=U$.

\problem Verify the second of DeMorgan's Laws for sets, 
$\overline{A\cap B}=\overline{A}\cup\overline{B}$.  For each step
in your verification, state why that step is valid.

\problem The subset operator, $\SUB$, is defined in terms of
the logical implication operator,~$\IMP$.  However, $\SUB$
differs from the $\cap$ and $\cup$ operators in that $A\cap B$ 
and $A\cup B$ are \emph{sets}, while $A\SUB B$ is a \emph{statement}.
So the relationship between $\SUB$ and $\IMP$ isn't quite the same
as the relationship between $\cup$ and $\OR$ or between $\cap$ and~$\AND$.
Nevertheless, $\SUB$ and $\IMP$ do share some similar properties.
This problem shows one example.
\ppart Show that the following three compound propositions are
logically equivalent: $p\IMP q$, $(p\AND q)\IFF p$, and $(p\OR q)\IFF q$.
\ppart Show that for any sets $A$ and $B$, the following three statements
are equivalent: $A\SUB B$, $A\cap B = A$, and $A\cup B = B$.

\problem DeMorgan's Laws apply to subsets of some given universal
set~$U$.  Show that for a subset $X$ of~$U$, $\overline{X}=U\SETDIFF X$.
It follows that DeMorgan's Laws can be written as
$U\SETDIFF(A\cup B)=(U\SETDIFF A)\cap(U\SETDIFF B)$ and
$U\SETDIFF(A\cap B)=(U\SETDIFF A)\cup(U\SETDIFF B)$.  Show that
these laws hold whether or not $A$ and $B$ are subsets of $U$.
That is, show that for any sets $A$, $B$, and $C$,
$C\SETDIFF(A\cup B)=(C\SETDIFF A)\cap(C\SETDIFF B)$ and
$C\SETDIFF(A\cap B)=(C\SETDIFF A)\cup(C\SETDIFF B)$.  


\problem Show that $A\cup (A\cap B)= A$ for any sets $A$ and $B$.

\problem Let $X$ and $Y$ be sets.  Simplify each of the
following expressions.  Justify each step in the simplification
with one of the rules of set theory.
\pparts{
    X\cup (Y\cup X)               & (X\cap Y) \cap \overline{X} \cr
    (X\cup Y)\cap \overline{Y}    & (X\cup Y) \cup (X\cap Y)
}

\problem Let $A$, $B$, and $C$ be sets.  Simplify each of the following
expressions.  In your answer, the complement operator should only
be applied to the individual sets $A$, $B$, and~$C$.
\pparts{
    \overline{A\cup B \cup C}       & 
    \overline{A\cup B \cap C}       &
    \overline{\overline{A\cup B}}   \cr\noalign{\smallskip}
    \overline{B\cap \overline{C}}   &
    \overline{A\cap \overline{B\cap \overline C}} &
    A\cap \overline{A\cup B}
}

\problem Use induction to prove the following generalized DeMorgan's Law
for set theory: 
For any natural number $n\geq 2$ and for any sets $X_1$, $X_2$, \dots, $X_n$,
\[\overline{X_1\cap X_2\cap \cdots \cap X_n} =
     \overline{X_1} \cup \overline{X_2} \cup\cdots\cup \overline{X_n}\]

\problem State and prove generalized distributive laws for set theory.
