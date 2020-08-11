# Natural Deduction for Predicate Logic

Before seeing the natural deduction rules for handling the quantifiers
($\forall$ and $\exists$), we will need to be careful about how we handle
variables in proofs. We will now have three[^There is also a fourth use, if we
are maintaining a library of previous proofs and applying them by name, such as
"Modus Tollens", to justify steps in later proofs.] different uses of
identifiers in our proofs, representing different entities that we want to be
able to refer to by name:

* Propositions ($p$, $q$, &hellip;) and predicates ($P$, $Q$, &hellip;) stand
  for primitive statements that may be true or false, perhaps depending on the
  values of arguments. When we show that an argument is valid for $p$ and
  $Q(a)$, for example, we have also shown that the argument is valid when those
  propositional and predicate variables are replaced by actual statements, such
  as "It is raining" or "$a$ is an even number". As long as we are consistent
  about replacing variables with the same statement each time they occur, the
  resulting argument will have the same structure and be equally valid. If we
  are careful, we can even perform substitutions such as $p$ becomes $q$ and
  (simultaneously) $q$ becomes $\lnot p$; for example, if we have proven the
  argument $p\rightarrow q, \lnot q\vdash\lnot p$ (Modus Tollens), then applying
  this substitution would allow us to also use the argument $q\rightarrow\lnot
  p, \lnot\lnot p\vdash\lnot q$ as a step in a proof.

* Line labels ($i$, $j$, &hellip;, as well as $\ell_1$, $\ell_2$, &hellip;)
  allow us to name individual steps and assumptions in our proofs. I have been
  following the convention that lines in an actual proof are named $\ell_1$,
  $\ell_2$, &hellip;, although they could be given more meaningful names such as
  _hypothesis_, _first_case_, or _premise2_. When describing the deduction
  rules, I have been using labels such as $i$ and $j$ to emphasize that the line
  being referenced could be anywhere earlier in the proof (as long as it is not
  local to a nested subproof).

* Entity variables ($x$, $y$, &hellip;, as well as $a$, $b$, &hellip;) stand for
  entities from the domain of discourse. I have been using $a$, $b$, &hellip; to
  stand for particular values, such as the number 42 or the student Joe, that
  might be used in an argument, so $Q(a)$ could represent the statement "42 is
  an even number." When the variable is bound by a quantifier, I generally use
  $x$ or $y$ instead, to emphasize that the formula is saying something about
  the full range of values from the domain of discourse, and we are not free to
  interpret it as any particular entity. The actual name of a bound variable
  does not matter, only the association between its uses and the quantifier that
  is binding it. That is, we will consider $\exists xP(x)$ and $\exists yP(y)$
  to be the same (and we may choose the name of the variable to avoid confusion
  with other variables as needed).[^The analogy in programming is to note that
  the index variable for a loop can be anything; although we might usually use
  _i_, we may consistently switch to using _j_ for a given loop if there is
  already a variable named _i_ in that part of the program.]

Just as we can introduce temporary assumptions into subproofs, that are only
available within that nested block of the proof, we will also introduce
temporary entity variables in proofs by writing an assumption such as "fresh
$x_0$" (or $x_1$, &hellip;, as needed). This means that, within that subproof,
the variable $x_0$ will refer to some entity from the domain of discourse.
Unlike the variables ($x$, $y$, &hellip;) bound by quantifiers, such a fresh
variable should be understood as representing a single entity; it can stand
alone in a statement such as $Q(x_0)$. However, unlike the top-level free
variables ($a$, $b$, &hellip;), we do not get to choose a value for a fresh
variable, nor is it allowed to escape from its subproof. That is, no formula
outside of the braces is allowed to refer to $x_0$.

## Universal Quantification

To prove a proposition $\forall xP(x)$, and "introduce" a universal quantifier,
we need to show that $P(x)$ is true
regardless of which entity is substituted for $x$. This is what a subproof with
a fresh variable gives us:

$$ \begin{array}{l}
i: \text{fresh}\ x_0\Rightarrow\{\\
\quad\ldots\\
\quad P(x_0)\\
\}\\ \hline\therefore
\forall xP(x), \quad\forall I\ i
\end{array} $$

The nested proof is a demonstration that $P(x_0)$ is true with no external
assumptions on which entity $x_0$ refers to. The only way we can do this is if
$P(x)$ is actually true for all entities $x$ in the domain of discourse, that
is, $\forall xP(x)$.

Here is an example, proving the validity of the argument
$p\vdash\forall x(Q(x)\rightarrow p\land Q(x))$:

$$ \begin{array}{l|l}
\ell_1: p & \text{premise}\\
\ell_2: \text{fresh}\ x_0\Rightarrow\{\\
\quad\ell_3: Q(x_0)\Rightarrow\{\\
\quad\quad\ell_4: p\land Q(x_0) & \land I\ \ell_1, \ell_3\\
\quad\}\\
\quad\ell_5: Q(x_0)\rightarrow p\land Q(x_0) & \rightarrow I\ \ell_2\\
\}\\
\ell_6: \forall x(Q(x)\rightarrow p\land Q(x)) & \forall I\ \ell_1
\end{array} $$

At step $\ell_5$, we are asserting that $Q(x_0)\rightarrow p\land Q(x_0)$
is true for _some_ entity $x_0$, but since we were able to conclude this with
no extra conditions on which entity that is, in $\ell_6$ we can introduce the
universal quantifier. At this point, there are no remaining references to $x_0$,
so nothing about the result can depend on which entity we use&mdash;it must be
true for all of them.

The corresponding elimination rule for the universal quantifier is simple:
from the premise $\forall xP(x)$ we may conclude that the predicate $P$ holds
for _any_ entity $a$ in the domain of discourse:

$$ \begin{array}{l}
i: \forall xP(x)\\ \hline\therefore
P(a), \quad\forall E\ i, a
\end{array} $$

For example, we can use this to prove the following quantified version of
modus ponens: $\forall x(P(x)\rightarrow Q(x)), P(a)\vdash Q(a)$. That is, if
$P(x)$ implies $Q(x)$ for each $x$, then knowing that $P(a)$ holds for some $a$
lets us conclude that also $Q(a)$ holds. Here is the proof:

$$ \begin{array}{l|l}
\ell_1: \forall x(P(x)\rightarrow Q(x)) & \text{premise}\\
\ell_2: P(a)\rightarrow Q(a) & \forall E\ \ell_1, a\\
\ell_3: P(a) & \text{premise}\\
\ell_4: Q(a) & \rightarrow E\ \ell_2, \ell_3
\end{array} $$

Here is a longer example showing a quantified version of the law of syllogism,
$\forall x(P(x)\rightarrow Q(x)), \forall x(Q(x)\rightarrow R(x))\vdash\forall
x(P(x)\rightarrow R(x))$:

$$ \begin{array}{l|l}
\ell_1: \text{fresh}\ x_0\Rightarrow\{\\
\quad\ell_2: P(x_0)\Rightarrow\{\\
\quad\quad\ell_3: \forall x(P(x)\rightarrow Q(x)) & \text{premise}\\
\quad\quad\ell_4: P(x_0)\rightarrow Q(x_0) & \forall E\ \ell_3, x_0\\
\quad\quad\ell_5: Q(x_0) & \rightarrow E\ \ell_4, \ell_2\\
\quad\quad\ell_6: \forall x(Q(x)\rightarrow R(x)) & \text{premise}\\
\quad\quad\ell_7: Q(x_0)\rightarrow R(x_0) & \forall E\ \ell_6, x_0\\
\quad\quad\ell_8: R(x_0) & \rightarrow E\ \ell_7, \ell_5\\
\quad\}\\
\quad\ell_9: P(x_0)\rightarrow R(x_0) & \rightarrow I\ \ell_2\\
\}\\
\ell_{10}: \forall x(P(x)\rightarrow R(x)) & \forall I\ \ell_1
\end{array} $$

## Existential Quantification

Extending the analogy between the conjunction/disjunction operators and the
universal/existential quantifiers, we find that the rule for introducing an
existential is the dual of the universal elimination rule:

$$ \begin{array}{l}
i: P(a)\\ \hline\therefore
\exists xP(x), \quad\exists I\ i, a
\end{array} $$

That is, to show that there exists some $x$ making $P(x)$ true it is enough
to show a specific $a$ in the domain of discourse such that $P(a)$ holds.

For example, we may prove the validity of the argument $\forall
xP(x)\vdash\exists xP(x)$, as long as we are able to name some element $a$ of
the domain of discourse:

$$ \begin{array}{l|l}
\ell_1: \forall xP(x) & \text{premise}\\
\ell_2: P(a) & \forall E\ \ell_1, a\\
\ell_3: \exists xP(x) & \exists I\ \ell_2, a
\end{array} $$

For a different sort of example, suppose we are proving statements of
arithmetic, and we have some means of deriving various equations and inequations
about integers. Then we might see the following in a proof:

$$ \begin{array}{l|l}
\ell_1: 6\cdot 7=42 & \text{arithmetic}\\
\ell_2: 7>1 & \text{arithmetic}\\
\ell_3: 7>1 \land 6\cdot 7=42 & \land I\ \ell_2, \ell_1\\
\ell_4: \exists n(n>1 \land 6\cdot n=42) & \exists I\ \ell_3, 7\\
\ell_5: 6>1 & \text{arithmetic}\\
\ell_6: 6>1 \land \exists n(n>1 \land 6\cdot n=42) & \land I\ \ell_5, \ell_4\\
\ell_7: \exists m(m>1 \land \exists n(n>1 \land m\cdot n=42)) & \exists I\ \ell_6, 6
\end{array} $$

The conclusion on the last line shows that the number 42 is composite. There are other
proofs of this fact (for example, starting from $3\cdot 14=42$); to show that 42 is
composite, we only have to come up with one way of factoring it into numbers greater than 1.

Finally, just as with the elimination rule for disjunction, the elimination rule for
the existential is somewhat more complicated. However, instead of doing a case
analysis of the two ways that $p\lor q$ could be true, and show that we can conclude
a common result $r$ in either case, for the existential we must analyze the
potentially infinite number of cases (over all of the entities in our domain of
discourse) and show that in each case we may conclude the same common result. The
idea of conducting a subproof with extra assumptions, including a fresh variable
to stand for whatever entity it is that "witnesses" the truth of the existential,
captures what we need here:

$$ \begin{array}{l}
i: \exists xP(x)\\
j: \text{fresh}\ x_0, P(x_0)\Rightarrow\{\\
\quad\ldots\\
\quad r\\
\}\\ \hline\therefore
r, \quad\exists E\ i, j
\end{array} $$

In the nested proof, we assume _two_ additional pieces of information: first, that
$x_0$ is the name of a value in the domain of discourse, and second, that we have
the additional fact that $P(x_0)$ is true. Within the subproof, we may use this extra
knowledge to prove our conclusion $r$. However, since $x_0$ needs to be "fresh" to
the subproof, the identity of the witnessing entity is not allowed to escape from the
block[^There is some sort of "witness protection program" analogy to be made here&hellip;.]
This meshes with our understanding of the existential&mdash;it tells us that there is
_some_ $x$ making $P(x)$ true, but it doesn't tell us which entity it is.

We may now prove a law about the interaction of the existential and conjunction:
$\exists x(P(x)\land Q(x))\vdash(\exists xP(x))\land(\exists xQ(x))$.

$$ \begin{array}{l|l}
\ell_1: \exists x(P(x)\land Q(x)) & \text{premise}\\
\ell_2: \text{fresh}\ x_0, P(x_0)\land Q(x_0)\Rightarrow\{\\
\quad\ell_3: P(x_0) & \land E_1\ \ell_2\\
\quad\ell_4: \exists xP(x) & \exists I\ \ell_3, x_0\\
\quad\ell_5: Q(x_0) & \land E_2\ \ell_2\\
\quad\ell_6: \exists xQ(x) & \exists I\ \ell_5, x_0\\
\quad\ell_7: (\exists xP(x))\land(\exists xQ(x)) & \land I\ \ell_4, \ell_6\\
\}\\
\ell_8: (\exists xP(x))\land(\exists xQ(x)) & \exists E\ \ell_1, \ell_2
\end{array} $$

It is instructive to see where the proof attempt fails if we try to go the other
direction and show $(\exists xP(x))\land(\exists xQ(x))\vdash\exists x(P(x)\land Q(x))$:

$$ \begin{array}{l|l}
\ell_1: (\exists xP(x))\land(\exists xQ(x)) & \text{premise}\\
\ell_2: \exists xP(x) & \land E_1\ \ell_1\\
\ell_3: \text{fresh}\ x_0, P(x_0)\Rightarrow\{\\
\quad\ell_4: \exists xQ(x) & \land E_2\ \ell_1\\
\quad\ell_5: \text{fresh}\ x_1, Q(x_1)\Rightarrow\{\\
\quad\quad\ell_6: P(x_0)\land Q(x_1) & \land I\ \ell_3, \ell_5\\
\quad\quad\ldots?
\end{array} $$

The problem comes in step $\ell_5$, where we must introduce a _different_
variable, $x_1$, as the witness for $\exists xQ(x)$, because of the requirement
that the variable be fresh. This should match your intuition for why the claim
failed: although there exists an $x$ making $P(x)$ true and there also exists
an $x$ making $Q(x)$ true, there is no reason to believe that they are the same
entities. Indeed, if $P(x)$ says "$x$ is odd" and $Q(x)$ says "$x$ is even", then
there will be no overlap in the entities making each true. There are odd numbers,
and there are even numbers, but there are no numbers that are both odd and even.

## Exercises

1. Prove a similar result to the one just above, showing the interaction of
the existential and the universal quantifiers:

$$\exists x\forall yP(x, y)\vdash\forall y\exists xP(x, y)$$

2. Discuss why the opposite direction of the previous problem is not a valid argument:

$$\forall y\exists xP(x, y)\vdash\exists x\forall yP(x, y)$$
